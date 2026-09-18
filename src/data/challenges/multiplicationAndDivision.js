/**
 * Pure question data for "Number - Multiplication and Division".
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): recall and use facts for
 * the 2, 5 and 10 tables including odd and even; write statements with x, / and
 * =; show multiplication is commutative and division is not; and solve problems
 * using arrays, repeated addition and grouping or sharing.
 *
 * Only the 2, 5 and 10 tables are statutory at Year 2, so nothing here reaches
 * beyond them.
 */

export const TABLES = [2, 5, 10];

export function multiply(a, b) {
  return a * b;
}

export function divide(total, parts) {
  return total / parts;
}

export function isEven(n) {
  return n % 2 === 0;
}

/**
 * "4 + 4 + 4" for 4 taken 3 times — how multiplication is introduced before
 * the × sign means anything.
 */
export function repeatedAddition(value, times) {
  return Array.from({ length: times }, () => value).join(" + ");
}

/** An array as rows of equal length, for drawing rows × columns of dots. */
export function arrayRows(rows, columns) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: columns }, (_, c) => `${r}-${c}`)
  );
}

/**
 * Wrong products that come from counting a row too many or too few, then the
 * off-by-ones. A random number would be discarded without doing the
 * multiplication.
 */
export function productDistractors(answer, factor, count) {
  const candidates = [
    answer + factor,
    answer - factor,
    answer + 1,
    answer - 1,
    answer + 2 * factor,
    answer + 2,
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
 * True when three numbers, in this order, make a true multiplication.
 *
 * Accepts both orders of the factors on purpose — that multiplication can be
 * done in any order is itself statutory.
 */
export function isTrueMultiplication(order) {
  const [a, b, product] = order;
  return a * b === product;
}

/**
 * True when three numbers, in this order, make a true division.
 *
 * Unlike multiplication this holds for only one arrangement of the first two,
 * which is the asymmetry the topic exists to teach.
 */
export function isTrueDivision(order) {
  const [total, parts, result] = order;
  if (parts === 0) return false;
  return total / parts === result;
}

/** The factor that completes `known × ? = product`. */
export function missingFactor(product, known) {
  return product / known;
}
