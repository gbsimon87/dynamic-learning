/**
 * Reading and Writing Numbers to 1000 — Year 3.
 *
 * Statutory requirement: "read and write numbers up to 1,000 in numerals and
 * in words". Both directions are statutory, so both are here: words from a
 * numeral, and a numeral from words.
 *
 * The whole difficulty of this topic is the empty column. "Three hundred and
 * six" is 306, and a learner writing what they hear produces 3006 or 360. Every
 * question set below is stocked with those cases on purpose rather than by
 * chance — a random draw of three-digit numbers gives one about a tenth of the
 * time, which is not often enough to teach anything.
 *
 * Pure: no React, and `rng` is a parameter so challenges randomise per mount
 * while tests stay deterministic.
 */

import { numberInWords } from "./numbersAndCounting.js";
import {
  digitsOf,
  nearMissOptions,
  partitionStandard,
  shuffleValues,
} from "./placeValue3Digit.js";

export { isCorrectNumber, numberInWords } from "./numbersAndCounting.js";
export { partitionStandard, shuffleValues };

/**
 * Whether a number has an empty tens or ones column — the cases that produce
 * "three hundred and six" and "four hundred and twenty".
 *
 * Exported because the question sets are checked against it: a set without one
 * has quietly stopped teaching the hard part.
 */
export function hasEmptyColumn(value) {
  const { tens, ones } = digitsOf(value);
  return tens === 0 || ones === 0;
}

/**
 * Four ways of saying a number, one of them right.
 *
 * The wrong three are the words for near-miss NUMBERS rather than invented
 * phrases, so each option is something a real number is called and none can be
 * dismissed for sounding wrong.
 */
export function wordOptions(value, rng) {
  return nearMissOptions(value, rng).map(numberInWords);
}

// --- question sets -------------------------------------------------------

/** Numeral → words, with the partition on screen as the bridge. */
const READ = [346, 306, 420, 815, 709, 570];

/** Words → numeral, with no bridge. Four of the six have an empty column. */
const WRITE = [306, 420, 913, 405, 268, 870];

/**
 * Sets to order, given only in words. Each set shares a hundreds digit so the
 * cards cannot be sorted on their first word, and each contains a "three
 * hundred and six" alongside a "three hundred and sixty".
 */
const ORDER_SETS = [
  [316, 360, 306, 361],
  [502, 520, 512, 505],
  [740, 704, 714, 741],
  [208, 280, 218, 281],
  [630, 603, 613, 631],
  [907, 970, 917, 971],
];

/**
 * Applied problems. The number arrives in words inside a sentence, so it has
 * to be read before anything can be done with it, and most of them then ask
 * for a jump of 10 or 100 — the number is never simply copied out.
 */
const PROBLEMS = [
  { start: 307, change: 0, prompt: "A farm collected three hundred and seven eggs. Write that number in numerals." },
  { start: 420, change: 10, prompt: "A school has four hundred and twenty pupils. Ten more join. How many pupils are there now?" },
  { start: 650, change: -100, prompt: "A shop had six hundred and fifty pens and sold one hundred of them. How many pens are left?" },
  { start: 209, change: 0, prompt: "A train carried two hundred and nine passengers. Write that number in numerals." },
  { start: 816, change: 100, prompt: "A library has eight hundred and sixteen books. One hundred more arrive. How many books are there now?" },
  { start: 904, change: -10, prompt: "A hall had nine hundred and four seats. Ten were broken and taken away. How many seats are left?" },
];

/**
 * Questions for one of the four challenges.
 *
 * Levels: 1 numeral → words, 2 words → numeral, 3 order words, 4 applied.
 */
export function buildWordQuestions(level, rng) {
  if (level === 1) {
    return shuffleValues(READ, rng).map((value) => ({
      value,
      answer: numberInWords(value),
      parts: partitionStandard(value),
      options: wordOptions(value, rng),
    }));
  }

  if (level === 2) {
    return shuffleValues(WRITE, rng).map((value) => ({
      value,
      words: numberInWords(value),
      answer: value,
    }));
  }

  if (level === 3) {
    return shuffleValues(ORDER_SETS, rng).map((values) => {
      const answer = [...values].sort((a, b) => a - b);
      // Shuffle until it is actually scrambled — handing back the answer
      // already in order is not a question.
      let scrambled = shuffleValues(values, rng);
      let guard = 0;
      while (scrambled.every((v, i) => v === answer[i]) && guard++ < 10) {
        scrambled = shuffleValues(values, rng);
      }
      return {
        values,
        answer,
        items: scrambled.map((value) => ({
          id: String(value),
          label: numberInWords(value),
        })),
      };
    });
  }

  if (level === 4) {
    return shuffleValues(PROBLEMS, rng).map((problem) => ({
      ...problem,
      words: numberInWords(problem.start),
      answer: problem.start + problem.change,
    }));
  }

  throw new RangeError(`Unknown challenge level: ${level}`);
}
