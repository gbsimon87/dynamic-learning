/**
 * Pure question data for the "Place Value" topic (tens and ones, 10 to 99).
 *
 * No React and no randomness: the components decide which numbers to ask
 * about, these functions only take a number apart and put it back together.
 */

/** How many tens are in `n`. */
export function tensOf(n) {
  return Math.floor(n / 10);
}

/** How many ones are left over. */
export function onesOf(n) {
  return n % 10;
}

/** The number those two columns make. */
export function fromParts(tens, ones) {
  return tens * 10 + ones;
}

/**
 * The number drawn as base-ten blocks: one entry per rod and one per unit.
 *
 * Arrays rather than counts, so the component can render each block as its
 * own element with a stable key.
 */
export function blockPicture(n) {
  return {
    tens: Array.from({ length: tensOf(n) }, (_, i) => i),
    ones: Array.from({ length: onesOf(n) }, (_, i) => i),
  };
}

/**
 * Wrong answers that test place value rather than arithmetic.
 *
 * The digit swap leads, because reading 47 as 74 is the mistake this topic
 * exists to correct. The rest walk the two columns one step at a time, so a
 * learner who miscounts a column still recognises their own answer.
 *
 * Candidates are tried in order and the first `count` usable ones are kept,
 * which is what keeps the list full for a palindrome like 44, where the swap
 * is the number itself.
 */
export function placeValueDistractors(n, count) {
  const candidates = [
    fromParts(onesOf(n), tensOf(n)), // the digit swap
    n + 10,
    n - 10,
    n + 1,
    n - 1,
    n + 9,
    n - 9,
  ];

  const seen = new Set([n]);
  const wrong = [];

  for (const candidate of candidates) {
    // Year 2 has no negative numbers.
    if (candidate < 0 || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}
