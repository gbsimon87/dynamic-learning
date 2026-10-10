import { useCallback, useSyncExternalStore } from "react";
import { BREAK_SETTING_KEY, parseBreakSetting } from "../../data/brainBreaks";

/**
 * The brain-break interval as a DEVICE preference in `localStorage`, like the
 * mute switch (sound/player.js): it belongs to whoever holds the tablet, is
 * safe to lose, and every access is wrapped — blocked storage just means the
 * default interval, not remembered.
 */

const listeners = new Set();
let minutes = read();

function read() {
  try {
    return parseBreakSetting(window.localStorage.getItem(BREAK_SETTING_KEY));
  } catch {
    return parseBreakSetting(null);
  }
}

/** Minutes between breaks, or null when a grown-up has turned them off. */
export function getBreakMinutes() {
  return minutes;
}

export function setBreakMinutes(value) {
  minutes = value === null ? null : parseBreakSetting(value);
  try {
    window.localStorage.setItem(BREAK_SETTING_KEY, minutes === null ? "off" : String(minutes));
  } catch {
    // Not remembered; still honoured for this visit.
  }
  listeners.forEach((listener) => listener(minutes));
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** `[minutes, setMinutes]` — minutes is null when breaks are off. */
export function useBreakMinutes() {
  const value = useSyncExternalStore(subscribe, getBreakMinutes, getBreakMinutes);
  const set = useCallback((next) => setBreakMinutes(next), []);
  return [value, set];
}
