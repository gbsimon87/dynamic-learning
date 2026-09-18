/**
 * Pure question data for the "Number - Addition and Subtraction" category.
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): facts to 20 fluently and
 * related facts to 100; adding and subtracting a two-digit number and 1s, and
 * 10s, and two two-digit numbers; adding 3 one-digit numbers; commutativity of
 * addition but not subtraction; and the inverse relationship used to check
 * calculations and solve missing number problems.
 */

/** The doubles a Year 2 learner is expected to know. */
export const DOUBLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function double(n) {
  return n * 2;
}

export function half(n) {
  return n / 2;
}

/**
 * The related fact up to 100: 3 + 7 = 10 becomes 30 + 70 = 100.
 *
 * This is the statutory "derive and use related facts up to 100", and the
 * point is that the learner already knows the small fact.
 */
export function relatedFactTo100(a, b) {
  return { a: a * 10, b: b * 10, total: (a + b) * 10 };
}

/**
 * Wrong answers for a sum: one or two out from miscounting, and ten out from
 * carrying wrongly. Never random, never negative, never the answer itself.
 */
export function sumDistractors(answer, count) {
  const candidates = [
    answer + 1,
    answer - 1,
    answer + 10,
    answer - 10,
    answer + 2,
    answer - 2,
    answer + 20,
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

/**
 * True when the first two of three addends make ten.
 *
 * Reordering to make ten first is the strategy Year 2 is taught for adding 3
 * one-digit numbers, and it works precisely because addition is commutative.
 * Either order of the pair is accepted - only the pairing matters.
 */
export function makesTenFirst(order) {
  return order[0] + order[1] === 10;
}

/**
 * True when three numbers, in this order, make a true subtraction.
 *
 * Deliberately accepts both valid orders: given 15, 6 and 9 the learner may
 * build 15 - 6 = 9 or 15 - 9 = 6, and both are correct.
 */
export function isTrueSubtraction(order) {
  return order[0] - order[1] === order[2];
}

/** The number that completes `known + ? = total`, found by the inverse. */
export function missingAddend(known, total) {
  return total - known;
}
