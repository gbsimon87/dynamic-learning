/**
 * Pure question data for "Counting Forwards and Backwards".
 *
 * This topic and "Counting in Steps" share a statutory bullet, so they are
 * deliberately split by difficulty rather than content: Counting in Steps owns
 * the multiples (2s, 3s, 5s, 10s), and this topic owns counting on and back in
 * 1s and 10s — especially across a tens boundary, which is where the count
 * actually breaks down.
 */

/** Where the count lands. Negative `by` counts backwards. */
export function countOn(start, by) {
  return start + by;
}

/**
 * Whether the count steps over (or onto) a multiple of ten.
 *
 * 68 → 72 crosses 70; 61 → 65 does not. Landing exactly on the ten counts,
 * because "sixty-nine, seventy" is the step children lose.
 */
export function crossesTen(start, by) {
  const end = countOn(start, by);
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  // Is there a multiple of ten strictly above `low` and at or below `high`?
  return Math.floor(high / 10) > Math.floor(low / 10);
}

/** Starts that sit within two of a ten, so any small count crosses one. */
export const BOUNDARY_STARTS = [
  8, 9, 18, 19, 28, 31, 39, 41, 48, 52, 59, 61, 68, 72, 79, 81, 88, 91, 98,
];

/**
 * Miscounting shows up as being one or two out — counting the starting number
 * itself, or losing the number at the boundary. Not random values.
 */
export function countingDistractors(answer, count) {
  const candidates = [
    answer + 1,
    answer - 1,
    answer + 2,
    answer - 2,
    answer + 10,
    answer - 10,
  ];

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
    if (candidate < 0 || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}
