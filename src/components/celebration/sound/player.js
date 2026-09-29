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
  return context;
}

if (typeof window !== "undefined") {
  const wake = () => {
    if (context?.state === "suspended") context.resume().catch(() => {});
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

async function playFile(src) {
  let buffer = buffers.get(src);
  if (!buffer) {
    const response = await fetch(src);
    buffer = await context.decodeAudioData(await response.arrayBuffer());
    buffers.set(src, buffer);
  }
  const source = context.createBufferSource();
  source.buffer = buffer;
  source.connect(master);
  source.start();
}

/** Plays a cue by name. Silent — never throwing — when muted or unsupported. */
export function playCue(name) {
  const cue = CUES[name];
  if (!cue || muted || typeof window === "undefined") return;

  try {
    if (!getContext()) return;
    if (context.state === "suspended") context.resume().catch(() => {});
    const synth = () => cue.synth(tone, context.currentTime + 0.02);

    if (cue.src) playFile(cue.src).catch(synth);
    else synth();
  } catch {
    // Sound is decoration: a failure here must never interrupt a child.
  }
}
