/**
 * Tiny randomness helpers for the free-play generators. Every one takes `rng`
 * (a `() => [0, 1)` function) so tests can seed it.
 */
export { shuffle } from "../challenges/statistics.js";

/** A whole number from `min` to `max` inclusive. */
export function randInt(rng, min, max) {
  return min + Math.min(max - min, Math.floor(rng() * (max - min + 1)));
}

export function pick(rng, items) {
  return items[Math.min(items.length - 1, Math.floor(rng() * items.length))];
}

/** Every multiple of `step` from `min` to `max`, both ends included. */
export function multiples(min, max, step) {
  const values = [];
  for (let value = Math.ceil(min / step) * step; value <= max; value += step) values.push(value);
  return values;
}

/** Levels are 1 (easier), 2 and 3 (harder); anything else is a caller bug. */
export function assertLevel(level) {
  if (![1, 2, 3].includes(level)) throw new RangeError(`Unknown free-play level: ${level}`);
}

/** A seeded generator for tests: mulberry32. */
export function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
