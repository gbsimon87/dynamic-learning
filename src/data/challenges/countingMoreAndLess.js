/**
 * Pure question data for the "Counting More and Less" topic.
 *
 * Year 2 works to 100 and has no negative numbers, so every helper here keeps
 * its output at zero or above.
 */

/** The jumps this topic teaches, in the order a child meets them. */
export const CHANGES = [1, -1, 10, -10, 5, -5];

export function applyChange(start, change) {
  return start + change;
}

/** "10 less" rather than "-10" — the words a teacher would use. */
export function describeChange(change) {
  return `${Math.abs(change)} ${change < 0 ? "less" : "more"}`;
}

/**
 * Five consecutive numbers centred on `n`, shifted right if centring would
 * show negatives.
 */
export function neighbourStrip(n) {
  const start = Math.max(0, n - 2);
  return Array.from({ length: 5 }, (_, i) => start + i);
}

/**
 * The mistakes this topic actually produces: applying the jump backwards, and
 * changing the wrong column (34 + 10 → 35). Random numbers would be discarded
 * without counting.
 */
export function moreLessDistractors(start, change, count) {
  const answer = applyChange(start, change);
  const candidates = [
    applyChange(start, -change), // went the wrong way
    answer + 1,
    answer - 1,
    start + Math.sign(change), // changed the ones instead of the tens
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
