/**
 * Comparing and Ordering Numbers to 1000 — Year 3.
 *
 * Statutory requirement: "compare and order numbers up to 1,000".
 *
 * Year 2 compared two-digit numbers, where the tens digit almost always
 * settles it. Three digits make the METHOD matter: compare the hundreds, and
 * only look at the tens if the hundreds tie. So every pair here is chosen by
 * which column decides — 428 vs 482 ties on hundreds, 507 vs 570 ties on
 * hundreds and has the deciding digits swapped — rather than by being random
 * numbers that happen to differ.
 *
 * Pure: no React, and `rng` is a parameter so challenges randomise per mount
 * while tests stay deterministic.
 */

import { compareSymbol } from "./comparingNumbers.js";
import { digitsOf, shuffleValues } from "./placeValue3Digit.js";

export { compareSymbol, isTrueStatement, betweenBounds, SYMBOLS } from "./comparingNumbers.js";
export { isCorrectNumber } from "./numbersAndCounting.js";
export { shuffleValues };

/** The three columns of a place value table, largest first — reading order. */
export const PLACE_COLUMNS = [
  { key: "hundreds", label: "100s" },
  { key: "tens", label: "10s" },
  { key: "ones", label: "1s" },
];

/**
 * The column that settles a comparison, or null when the numbers are equal.
 *
 * This is the rule the topic teaches, written down once so a question can be
 * chosen by it and a test can check the choice was right.
 */
export function decidingPlace(a, b) {
  const left = digitsOf(a);
  const right = digitsOf(b);
  for (const { key } of PLACE_COLUMNS) {
    if (left[key] !== right[key]) return key;
  }
  return null;
}

/**
 * Two rows of a place value table, one per number.
 *
 * Rows are labelled "First" and "Second" rather than by their own numerals:
 * an equal pair would otherwise give the table two rows with the same label,
 * and the numbers are already on screen in the statement above it.
 */
export function placeRows(a, b) {
  return [
    { label: "First", cells: digitsOf(a) },
    { label: "Second", cells: digitsOf(b) },
  ];
}

/** Sorted ascending or descending. Never mutates its input. */
export function orderNumbers(values, direction) {
  const sorted = [...values].sort((x, y) => x - y);
  return direction === "largest" ? sorted.reverse() : sorted;
}

/**
 * Whether a set can be ordered with exactly one correct arrangement.
 *
 * A repeated value makes several arrangements right while the challenge
 * accepts one, so a learner who is right is told they are wrong. Ordering sets
 * are checked against this rather than eyeballed.
 */
export function hasDistinctValues(values) {
  return new Set(values).size === values.length;
}

// --- question sets -------------------------------------------------------

/**
 * The gentle set. The place value table is on screen for these, so the pair
 * does not have to be easy — it has to be READABLE off the table. Between them
 * the six pairs are decided by the hundreds, by the tens, by the ones, and once
 * by nothing at all, so every column gets used and "=" is a real answer rather
 * than a button that is never right.
 */
const GENTLE_PAIRS = [
  [248, 613],
  [702, 390],
  [165, 156],
  [534, 534],
  [820, 280],
  [409, 401],
];

/**
 * Harder, and there is no table to read. The hundreds tie on EVERY pair, so
 * the first column never settles anything and the deciding digit has to be
 * found. Four of the pairs are digit swaps (507/570, 692/629, 263/236,
 * 890/809) — the mistake a learner makes when they read left to right without
 * asking what each digit is worth.
 */
const INFERRED_PAIRS = [
  [507, 570],
  [674, 679],
  [692, 629],
  [715, 715],
  [263, 236],
  [890, 809],
];

const ORDER_SETS = [
  { values: [412, 421, 124, 142, 214], direction: "smallest" },
  { values: [608, 680, 806, 860, 68], direction: "largest" },
  { values: [335, 353, 533, 305, 350], direction: "smallest" },
  { values: [199, 919, 991, 109, 190], direction: "largest" },
  { values: [740, 407, 470, 704, 74], direction: "smallest" },
  { values: [561, 516, 651, 615, 165], direction: "largest" },
];

/**
 * Word problems. Every answer is a number already named in its own prompt —
 * the work is choosing WHICH one, which is what comparing and ordering is for.
 * The answers are recomputed from the prompts in the tests rather than trusted.
 */
const PROBLEMS = [
  {
    prompt:
      "Three classes collected bottle tops. Class A collected 428, Class B collected 482 and Class C collected 284. How many did the class with the MOST collect?",
    candidates: [428, 482, 284],
    pick: "largest",
  },
  {
    prompt: "Ben scored 605 points and Mia scored 650 points. Type the SMALLER score.",
    candidates: [605, 650],
    pick: "smallest",
  },
  {
    prompt:
      "A library has 418 story books, 481 fact books and 148 poetry books. Type the SMALLEST of those numbers.",
    candidates: [418, 481, 148],
    pick: "smallest",
  },
  {
    prompt:
      "A farm counted 706 hens, 670 ducks and 760 geese. Type the LARGEST of those numbers.",
    candidates: [706, 670, 760],
    pick: "largest",
  },
  {
    prompt:
      "Three lorries carried 519, 591 and 195 boxes. Type the number of boxes on the MOST loaded lorry.",
    candidates: [519, 591, 195],
    pick: "largest",
  },
  {
    prompt:
      "A shop has 307 pens, 370 pencils and 730 rubbers. Type the SMALLEST of those numbers.",
    candidates: [307, 370, 730],
    pick: "smallest",
  },
];

/** What a word problem's answer must be, derived from its own numbers. */
export function problemAnswer({ candidates, pick }) {
  return pick === "largest" ? Math.max(...candidates) : Math.min(...candidates);
}

/**
 * Questions for one of the four challenges.
 *
 * Levels: 1 compare with a place value table, 2 compare bare numerals,
 * 3 order a set, 4 word problems.
 */
export function buildCompareQuestions(level, rng) {
  if (level === 1 || level === 2) {
    const pairs = level === 1 ? GENTLE_PAIRS : INFERRED_PAIRS;
    return shuffleValues(pairs, rng).map(([left, right]) => ({
      left,
      right,
      answer: compareSymbol(left, right),
      deciding: decidingPlace(left, right),
      rows: placeRows(left, right),
    }));
  }

  if (level === 3) {
    return shuffleValues(ORDER_SETS, rng).map(({ values, direction }) => {
      const answer = orderNumbers(values, direction);
      // Shuffle until it is actually scrambled — handing back the answer
      // already in order is not a question.
      let scrambled = shuffleValues(values, rng);
      let guard = 0;
      while (scrambled.every((v, i) => v === answer[i]) && guard++ < 10) {
        scrambled = shuffleValues(values, rng);
      }
      return {
        values,
        direction,
        answer,
        items: scrambled.map((value) => ({ id: String(value), label: String(value) })),
      };
    });
  }

  if (level === 4) {
    return shuffleValues(PROBLEMS, rng).map((problem) => ({
      ...problem,
      answer: problemAnswer(problem),
    }));
  }

  throw new RangeError(`Unknown challenge level: ${level}`);
}
