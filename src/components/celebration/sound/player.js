import { CUES } from "./cues";

/**
 * Plays the named celebration cues, and owns the one mute switch.
 *
 * Browsers only let audio start after a user gesture, so the AudioContext is
 * created lazily on the first cue (every cue follows a tap) and resumed on the
 * first pointer or key press as a backstop.
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
  preloadAll();
  return context;
}

/**
 * Fetches and decodes every cue's file once, as soon as audio is allowed, so
 * the first correct answer is not kept waiting on a download. ~600 KB total.
 */
function preloadAll() {
  const sources = new Set(Object.values(CUES).map((cue) => cue.src).filter(Boolean));
  sources.forEach((src) => loadBuffer(src).catch(() => {}));
}

function loadBuffer(src) {
  if (!buffers.has(src)) {
    const pending = fetch(src)
      .then((response) => {
        if (!response.ok) throw new Error(`${src}: ${response.status}`);
        return response.arrayBuffer();
      })
      // Callback form: older Safari's decodeAudioData returns no promise.
      .then((data) => new Promise((resolve, reject) => context.decodeAudioData(data, resolve, reject)));
    // A failed load is forgotten, so the next play retries rather than
    // falling back to the synth for the rest of the visit.
    pending.catch(() => buffers.delete(src));
    buffers.set(src, pending);
  }
  return buffers.get(src);
}

if (typeof window !== "undefined") {
  // The first tap anywhere creates (and so unlocks and preloads) the audio,
  // well before the first answer that needs it.
  const wake = () => {
    if (muted) return;
    try {
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

    const handle = { stopped: false, fade: null };
    loadBuffer(cue.src)
      .then((buffer) => playBuffer(buffer, handle))
      .catch(() => {
        if (!handle.stopped) synth();
      });
    return () => {
      handle.stopped = true;
      try {
        handle.fade?.();
      } catch {
        // Already finished.
      }
    };
  } catch {
    // Sound is decoration: a failure here must never interrupt a child.
    return NOOP;
  }
}
