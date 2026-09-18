/**
 * Pure question data for the "Number - Fractions" category.
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): recognise, find, name and
 * write 1/3, 1/4, 2/4 and 3/4 of a length, shape, set of objects or quantity,
 * and recognise that 2/4 and 1/2 are the same. Nothing outside that set — no
 * fifths, eighths or tenths, which belong to later years.
 *
 * Every question must divide exactly: Year 2 does not meet remainders.
 */

/** A fraction is `{ numerator, denominator }` throughout. */
export const FRACTIONS = [
  { numerator: 1, denominator: 2 },
  { numerator: 1, denominator: 3 },
  { numerator: 1, denominator: 4 },
  { numerator: 2, denominator: 4 },
  { numerator: 3, denominator: 4 },
];

export function fractionLabel({ numerator, denominator }) {
  return `${numerator}/${denominator}`;
}

export function fractionValue({ numerator, denominator }) {
  return numerator / denominator;
}

/** `3/4 of 20` = 15. Callers must check `dividesExactly` first. */
export function fractionOf(fraction, total) {
  return (total / fraction.denominator) * fraction.numerator;
}

/** True when the whole splits into equal parts with nothing left over. */
export function dividesExactly(fraction, total) {
  return total % fraction.denominator === 0;
}

/** 2/4 and 1/2 name the same amount — the one equivalence Year 2 must know. */
export function isEquivalent(a, b) {
  return fractionValue(a) === fractionValue(b);
}

/**
 * A bar split into `denominator` parts, the first `numerator` of them shaded.
 *
 * Shaded parts lead so the bar fills from the left, which is how a fraction
 * wall is drawn and makes two bars comparable at a glance.
 */
export function barParts({ numerator, denominator }) {
  return Array.from({ length: denominator }, (_, i) => i < numerator);
}

/**
 * Wrong answers that are other fractions OF THE SAME AMOUNT.
 *
 * A child who takes a quarter instead of a half has made a real mistake and
 * should find their answer offered; a random number teaches nothing.
 */
export function fractionOfDistractors(fraction, total, count) {
  const answer = fractionOf(fraction, total);

  const candidates = FRACTIONS
    .filter((other) => dividesExactly(other, total))
    .map((other) => fractionOf(other, total));

  // Then fall back on near-misses if the fractions alone do not fill the list.
  candidates.push(answer + 1, answer - 1, answer + 2);

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
    if (candidate <= 0 || !Number.isInteger(candidate) || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}
