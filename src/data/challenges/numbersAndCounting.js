import writtenNumber from "written-number";

/**
 * Pure question data for the "Numbers and Counting" topic.
 *
 * Statutory scope (see docs/curriculum/year-2-maths.md): read and write numbers
 * to at least 100 in numerals AND in words, and identify, represent and
 * estimate numbers using different representations including the number line.
 */

/**
 * Judge a typed answer by its value.
 *
 * The original challenge compared strings, so "043" was marked wrong for 43 —
 * visibly the right number, rejected. A child padding a box to the width of its
 * neighbours hits this, and the feedback gives them no way to understand it.
 */
export function isCorrectNumber(typed, expected) {
  const cleaned = String(typed).trim();
  if (cleaned === "" || !/^\d+$/.test(cleaned)) return false;
  return Number(cleaned) === Number(expected);
}

/** `length` consecutive numbers from `start`, with `gapCount` of them blanked. */
export function buildSequenceWithGaps(start, length, gapCount, rng) {
  const terms = Array.from({ length }, (_, i) => start + i);

  // Index 0 and 1 stay visible: with fewer than two numbers on screen there is
  // no sequence to read, only a guess.
  const eligible = [];
  for (let i = 2; i < length; i++) eligible.push(i);
  for (let i = eligible.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [eligible[i], eligible[j]] = [eligible[j], eligible[i]];
  }

  const gaps = eligible
    .slice(0, Math.min(gapCount, eligible.length))
    .sort((a, b) => a - b);

  return { terms, gaps };
}

/** "forty-seven". Used for the "in words" half of the statutory requirement. */
export function numberInWords(n) {
  return writtenNumber(n);
}

/** The labelled ticks of a 0-100 estimation line. */
export function estimationScale() {
  return Array.from({ length: 11 }, (_, i) => i * 10);
}

/** Which labelled ten `n` sits nearest to; ties round up, as children are taught. */
export function nearestLabel(n) {
  return Math.round(n / 10) * 10;
}
