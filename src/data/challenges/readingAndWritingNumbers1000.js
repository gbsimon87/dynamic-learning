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
 * to be read before anything can be done with it, and every one then asks for
 * a jump of 10 or 100 — the number is never simply copied out (that is
 * challenge 2). Numbers are generated per mount, half of them with an empty
 * column, so runs differ and the hard case keeps turning up.
 */
const STORIES = [
  { open: "A farm collected", item: "eggs", more: "more are laid", fewer: "are sold", ask: "How many eggs are there now?" },
  { open: "A school has", item: "pupils", more: "more join", fewer: "leave", ask: "How many pupils are there now?" },
  { open: "A shop had", item: "pens", more: "more arrive", fewer: "are sold", ask: "How many pens does it have now?" },
  { open: "A train carried", item: "passengers", more: "more get on", fewer: "get off", ask: "How many passengers are on the train now?" },
  { open: "A library has", item: "books", more: "more arrive", fewer: "are borrowed", ask: "How many books are there now?" },
  { open: "A hall had", item: "seats", more: "more are added", fewer: "are taken away", ask: "How many seats are there now?" },
];

const CHANGES = [10, -10, 100, -100];
const CHANGE_WORDS = { 10: "Ten", 100: "One hundred" };

function randomInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/** A start number from 200 to 899, so any jump of 10 or 100 stays 3-digit. */
function storyStart(rng, wantEmptyColumn) {
  for (let guard = 0; guard < 100; guard++) {
    const value = randomInt(rng, 200, 899);
    if (hasEmptyColumn(value) === wantEmptyColumn) return value;
  }
  return wantEmptyColumn ? 506 : 347;
}

export function buildAppliedWordProblems(rng) {
  return shuffleValues(STORIES, rng).map((story, index) => {
    const start = storyStart(rng, index % 2 === 0);
    const change = CHANGES[Math.floor(rng() * CHANGES.length)];
    const words = numberInWords(start);
    const verb = change > 0 ? story.more : story.fewer;
    return {
      start,
      change,
      words,
      prompt: `${story.open} ${words} ${story.item}. ${CHANGE_WORDS[Math.abs(change)]} ${verb}. ${story.ask}`,
    };
  });
}

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
    return buildAppliedWordProblems(rng).map((problem) => ({
      ...problem,
      answer: problem.start + problem.change,
    }));
  }

  throw new RangeError(`Unknown challenge level: ${level}`);
}
