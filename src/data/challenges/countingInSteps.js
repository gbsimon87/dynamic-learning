/**
 * Pure question generators for the "Counting in Steps of 2, 3, 5 and 10" topic.
 *
 * No React and no randomness of its own: every function that needs randomness
 * takes a `rng` so the challenges can randomise per mount while the tests stay
 * deterministic.
 *
 * Year 2 works to 100, so callers must keep starts and lengths inside that.
 */

export const STEPS = [2, 3, 5, 10];

/** `length` terms starting at `start`, moving by `step` (negative counts back). */
export function buildSequence(start, step, length) {
  return Array.from({ length }, (_, i) => start + step * i);
}

/**
 * Which slots to blank out.
 *
 * Index 0 and 1 are always left visible: with fewer than two terms on screen
 * there is no step to infer, and the question becomes a guess.
 */
export function pickGapPositions(length, count, rng) {
  const eligible = [];
  for (let i = 2; i < length; i++) eligible.push(i);

  // Fisher-Yates over the eligible slots, then take the first `count`. Asking
  // for more gaps than slots yields every slot rather than looping forever.
  for (let i = eligible.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
  }

  return eligible.slice(0, Math.min(count, eligible.length)).sort((a, b) => a - b);
}

/**
 * Wrong answers a child would plausibly reach: one step short, one step long,
 * and the off-by-ones either side. Random numbers would be trivially
 * eliminated and teach nothing.
 */
export function buildDistractors(answer, step, count) {
  const candidates = [
    answer - step,
    answer + step,
    answer + 1,
    answer - 1,
    answer + 2,
    answer - 2,
  ];

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
    // A negative option is never a plausible Year 2 answer.
    if (candidate < 0) continue;
    if (seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}

/** Shuffles a copy of `items`. */
export function shuffle(items, rng) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
