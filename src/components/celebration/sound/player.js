import { CUES } from "./cues";

/**
 * Plays the named celebration cues, and owns the one mute switch.
 *
 * Browsers only let audio start after a user gesture, so the AudioContext is
 * created lazily on the first tap after `preloadSounds()` (or the first cue,
 * which always follows a tap) and resumed on later taps as a backstop.
 *
 * Mute is a DEVICE preference in `localStorage` under `dl.soundMuted`, not
 * learner data: it lives beside the theme, belongs to whoever holds the tablet,
 * and is safe to lose. Every access is wrapped — private mode or blocked
 * storage simply means "sound on, not remembered".
 */

const MUTE_KEY = "dl.soundMuted";

let context = null;
let master = null;
const buffers = new Map();
const listeners = new Set();
const playing = new Set(); // stop functions of files playing or still loading
let muted = readMuted();

function readMuted() {
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
}

export function isMuted() {
  return muted;
}

export function setMuted(value) {
  muted = Boolean(value);
  try {
    window.localStorage.setItem(MUTE_KEY, muted ? "1" : "0");
  } catch {
    // Not remembered; still honoured for this visit.
  }
  // Muting silences what is already playing too, such as a year fanfare.
  if (muted) [...playing].forEach((stop) => stop());
  listeners.forEach((listener) => listener(muted));
}

/** @returns {Function} unsubscribe */
export function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getContext() {
  if (context) return context;
  const AudioContextClass = window.AudioContext ?? window.webkitAudioContext;
  if (!AudioContextClass) return null;
  context = new AudioContextClass();
  master = context.createGain();
  master.gain.value = 0.8;
  master.connect(context.destination);
  if (wanted) decodeAll();
  return context;
}

const bytes = new Map();
let wanted = false;

function allSources() {
  return [...new Set(Object.values(CUES).map((cue) => cue.src).filter(Boolean))];
}

function fetchBytes(src) {
  if (!bytes.has(src)) {
    const pending = fetch(src).then((response) => {
      if (!response.ok) throw new Error(`${src}: ${response.status}`);
      return response.arrayBuffer();
    });
    // A failed download is forgotten, so the next play retries.
    pending.catch(() => bytes.delete(src));
    bytes.set(src, pending);
  }
  return bytes.get(src);
}

/**
 * Starts downloading every sound (~600 KB) — called by the curriculum
 * challenge page, the only place sounds play, so Skills Mode and the homepage
 * never pay for them.
 *
 * Download only: decoding needs an AudioContext, and creating one before the
 * child has tapped anything makes browsers log a warning. The first tap after
 * this creates the context and decodes everything already downloaded, so the
 * first correct answer is never kept waiting.
 */
export function preloadSounds() {
  if (wanted || typeof window === "undefined") return;
  wanted = true;
  allSources().forEach((src) => fetchBytes(src).catch(() => {}));
  if (context) decodeAll();
}

function decodeAll() {
  allSources().forEach((src) => loadBuffer(src).catch(() => {}));
}

function loadBuffer(src) {
  if (!buffers.has(src)) {
    const pending = fetchBytes(src)
      // Callback form: older Safari's decodeAudioData returns no promise.
      .then((data) => new Promise((resolve, reject) => context.decodeAudioData(data, resolve, reject)));
    // decodeAudioData consumes its buffer, so a failed decode must fetch again.
    pending.catch(() => {
      buffers.delete(src);
      bytes.delete(src);
    });
    buffers.set(src, pending);
  }
  return buffers.get(src);
}

if (typeof window !== "undefined") {
  // Browsers only allow audio to start inside a user gesture. Once a
  // challenge page has asked for sound, the first tap creates the audio (and
  // decodes the downloads); on any page it wakes a context that went to sleep.
  const wake = () => {
    if (muted) return;
    try {
      if (!context && !wanted) return;
      if (!getContext()) return;
      if (context.state === "suspended") context.resume().catch(() => {});
    } catch {
      // No audio on this device; every cue is silently skipped.
    }
  };
  window.addEventListener("pointerdown", wake, { passive: true });
  window.addEventListener("keydown", wake);
}

/**
 * One note with a fast attack and a bell-like decay. `soft` low-passes the
 * brighter waveforms so a "brass" square or sawtooth stays friendly, not harsh.
 */
function tone(freq, start, length, { gain = 0.2, type = "triangle", soft = false } = {}) {
  const osc = context.createOscillator();
  const env = context.createGain();
  osc.type = type;
  osc.frequency.value = freq;

  env.gain.setValueAtTime(0.0001, start);
  env.gain.exponentialRampToValueAtTime(gain, start + 0.012);
  env.gain.exponentialRampToValueAtTime(0.0001, start + length);

  let node = osc;
  if (soft) {
    const filter = context.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 1800;
    osc.connect(filter);
    node = filter;
  }
  node.connect(env);
  env.connect(master);
  osc.start(start);
  osc.stop(start + length + 0.05);
}

/** Plays a decoded file through its own gain, so it can be faded out. */
function playBuffer(buffer, handle) {
  if (handle.stopped) return;
  const source = context.createBufferSource();
  const gain = context.createGain();
  source.buffer = buffer;
  source.connect(gain);
  gain.connect(master);
  source.onended = () => handle.done?.();
  source.start();
  handle.fade = () => {
    const now = context.currentTime;
    gain.gain.setValueAtTime(gain.gain.value, now);
    gain.gain.linearRampToValueAtTime(0, now + 0.15);
    source.stop(now + 0.2);
  };
}

const NOOP = () => {};

/**
 * Plays a cue by name. Silent — never throwing — when muted or unsupported.
 *
 * @returns {Function} stop: fades a file out over 150ms. The celebration
 *   calls it when a step is left, so an 8-second finale fanfare never talks
 *   over the next step. Synth fallbacks are short and simply finish.
 */
export function playCue(name) {
  const cue = CUES[name];
  if (!cue || muted || typeof window === "undefined") return NOOP;

  try {
    if (!getContext()) return NOOP;
    if (context.state === "suspended") context.resume().catch(() => {});
    const synth = () => cue.synth(tone, context.currentTime + 0.02);
    if (!cue.src) {
      synth();
      return NOOP;
    }

    const handle = { stopped: false, fade: null, done: null };
    const stop = () => {
      playing.delete(stop);
      handle.stopped = true;
      try {
        handle.fade?.();
      } catch {
        // Already finished.
      }
    };
    handle.done = () => playing.delete(stop);
    playing.add(stop);
    loadBuffer(cue.src)
      .then((buffer) => playBuffer(buffer, handle))
      .catch(() => {
        playing.delete(stop);
        if (!handle.stopped && !muted) synth();
      });
    return stop;
  } catch {
    // Sound is decoration: a failure here must never interrupt a child.
    return NOOP;
  }
}
