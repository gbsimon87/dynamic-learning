import writtenNumber from "written-number";
import { shuffle } from "./countingInSteps.js";

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

// ---------------------------------------------------------------------------
// Generated questions. Each builder takes `rng` so runs differ per mount while
// tests stay deterministic.
// ---------------------------------------------------------------------------

/** A whole number from `low` to `high`, both included. */
function randInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/** Six different numbers from `low` to `high` that pass `keep`. */
function sixNumbers(rng, low, high, keep = () => true) {
  const used = new Set();
  while (used.size < 6) {
    const n = randInt(rng, low, high);
    if (keep(n)) used.add(n);
  }
  return [...used];
}

const swapDigits = (n) => (n % 10) * 10 + Math.floor(n / 10);

/** Level 1: a run of 8 consecutive numbers with one blank. */
export function buildFillGapQuestions(rng) {
  return sixNumbers(rng, 10, 92).map((start) => {
    const { terms, gaps } = buildSequenceWithGaps(start, 8, 1, rng);
    return { terms, gaps, answer: terms[gaps[0]] };
  });
}

/**
 * Level 2: read a number in words and pick the numeral. The wrong options are
 * the digit swap ("forty-seven" against 74) and the number a ten out, on a
 * side chosen at random.
 */
export function buildWordsToNumeralQuestions(rng) {
  return sixNumbers(rng, 21, 99, (n) => n % 10 !== 0 && n % 10 !== Math.floor(n / 10)).map((value) => {
    const tenOut = value + (rng() < 0.5 || value < 20 ? 10 : -10);
    const options = shuffle([value, swapDigits(value), tenOut <= 100 ? tenOut : value - 10], rng);
    return { value, words: numberInWords(value), options };
  });
}

/**
 * Level 3: which ten is a number closest to? Numbers ending in 5 are left
 * out - they are exactly halfway, so "closest" has no answer. The wrong
 * options are the other ten the number sits between and one further ten,
 * never placed so that the answer is the middle of three neighbouring tens.
 */
export function buildEstimateQuestions(rng) {
  return sixNumbers(rng, 11, 89, (n) => n % 10 !== 0 && n % 10 !== 5).map((value) => {
    const answer = nearestLabel(value);
    const other = answer > value ? answer - 10 : answer + 10;
    const mirror = answer + (answer - other);
    const far = shuffle(estimationScale(), rng).find((t) => t !== answer && t !== other && t !== mirror);
    return { value, answer, options: shuffle([answer, other, far], rng) };
  });
}

/**
 * Level 4: write a number given in words, typed. One may be a whole ten
 * (sixty) and one may be 100.
 */
export function buildWordsToDigitsQuestions(rng) {
  const values = sixNumbers(rng, 11, 99, (n) => n % 10 !== 0);
  if (rng() < 0.5) values[0] = 10 * randInt(rng, 2, 9);
  if (rng() < 0.3) values[1] = 100;
  return shuffle(values, rng).map((value) => ({ value, words: numberInWords(value) }));
}
