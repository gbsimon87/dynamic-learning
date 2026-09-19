/**
 * Representing and Estimating Numbers — Year 3.
 *
 * Statutory requirement: "identify, represent and estimate numbers using
 * different representations". Three verbs, and they are three different jobs:
 *
 *   identify  read a number off a representation (blocks → 473)
 *   estimate  judge a position that is not written down (a pointer on a
 *             0–1000 line, where only the hundreds are labelled)
 *   represent go the other way, and BUILD the number
 *
 * The non-statutory guidance asks for "a variety of representations, including
 * those related to measure", which is why the word problems count sacks,
 * packs and loose items rather than abstract piles.
 *
 * Pure: no React, and `rng` is a parameter so challenges randomise per mount
 * while tests stay deterministic.
 */

import {
  blockPicture3,
  buildNumberFromBlocks,
  nearMissOptions,
  shuffleValues,
} from "./placeValue3Digit.js";

export { isCorrectNumber } from "./numbersAndCounting.js";
export { blockPicture3, buildNumberFromBlocks, shuffleValues };

/** The estimation line: 0 to 1000 with only the hundreds labelled. */
export const LINE_MIN = 0;
export const LINE_MAX = 1000;
export const LINE_MAJOR_STEP = 100;

/**
 * How far apart two options must be before a learner can tell them apart by
 * eye on a line whose ticks are 100 wide.
 *
 * Offering 470 and 450 for a pointer at 460 is not an estimating question, it
 * is a trick: both are "about right" and only one is accepted. Every generated
 * option set is checked against this.
 */
export const MIN_OPTION_GAP = 100;

/** A block count clamps to 0–9: a tenth piece is an exchange, not a column. */
export const MAX_PER_COLUMN = 9;

export function stepBlocks(blocks, place, delta) {
  return {
    ...blocks,
    [place]: Math.min(MAX_PER_COLUMN, Math.max(0, (blocks[place] ?? 0) + delta)),
  };
}

/** An empty pile, which is where a build starts. */
export function emptyBlocks() {
  return { hundreds: 0, tens: 0, ones: 0 };
}

/**
 * Four numbers to read a pointer as: the answer and three that are a whole
 * hundred or more away, so the one the pointer is nearest to is not a matter
 * of opinion.
 */
export function estimateOptions(value, rng) {
  const candidates = [
    value - 100,
    value + 100,
    value - 200,
    value + 200,
    value - 300,
    value + 300,
  ].filter((candidate) => candidate >= LINE_MIN && candidate <= LINE_MAX);

  const options = [value];
  for (const candidate of shuffleValues(candidates, rng)) {
    if (options.length === 4) break;
    if (options.some((chosen) => Math.abs(chosen - candidate) < MIN_OPTION_GAP)) continue;
    options.push(candidate);
  }

  return shuffleValues(options, rng);
}

// --- question sets -------------------------------------------------------

/** Read the blocks. Every number has a zero somewhere or a digit worth
 * confusing, because a column with nothing in it is what gets skipped. */
const IDENTIFY = [405, 370, 260, 518, 643, 902];

/**
 * Pointer positions. None of them sit on a labelled tick — a pointer parked on
 * the "400" label is not an estimate, it is a reading. 675, 480 and 720 fall
 * between the halfway marks too, so "always halfway" is not a rule that works.
 */
const ESTIMATE = [150, 350, 675, 480, 825, 720];

/** Numbers to build. Zeros are the point: a learner who never meets 307
 * believes every column has something in it. */
const REPRESENT = [307, 450, 236, 520, 814, 609];

/**
 * Practical problems in the shape the guidance asks for. The last two need an
 * exchange — 13 tens is 130 — which is what stops this being "read the digits
 * out in order".
 */
const PROBLEMS = [
  {
    prompt:
      "A shop packs pens in boxes of 100, packs of 10 and singles. It has 4 boxes, 7 packs and 3 single pens. How many pens is that?",
    pieces: { hundreds: 4, tens: 7, ones: 3 },
  },
  {
    prompt:
      "A jar holds 6 bags of 100 beads and 5 loose beads. How many beads are in the jar?",
    pieces: { hundreds: 6, tens: 0, ones: 5 },
  },
  {
    prompt:
      "A hall is set out with 1 block of 100 chairs, 9 rows of 10 chairs and 8 single chairs. How many chairs?",
    pieces: { hundreds: 1, tens: 9, ones: 8 },
  },
  {
    prompt:
      "A library shelves 7 crates of 100 books, no boxes of 10 and 6 single books. How many books?",
    pieces: { hundreds: 7, tens: 0, ones: 6 },
  },
  {
    prompt:
      "Sam counts 2 hundreds, 13 tens and 4 ones. What number has Sam counted?",
    pieces: { hundreds: 2, tens: 13, ones: 4 },
  },
  {
    prompt:
      "A farmer has 3 sacks of 100 potatoes and 12 loose potatoes. How many potatoes?",
    pieces: { hundreds: 3, tens: 0, ones: 12 },
  },
];

/**
 * Questions for one of the four challenges.
 *
 * Levels: 1 read the blocks, 2 read the line, 3 build the number, 4 practical
 * problems.
 */
export function buildRepresentQuestions(level, rng) {
  if (level === 1) {
    return shuffleValues(IDENTIFY, rng).map((value) => ({
      value,
      picture: blockPicture3(value),
      answer: value,
      options: nearMissOptions(value, rng),
    }));
  }

  if (level === 2) {
    return shuffleValues(ESTIMATE, rng).map((value) => ({
      value,
      answer: value,
      options: estimateOptions(value, rng),
    }));
  }

  if (level === 3) {
    return shuffleValues(REPRESENT, rng).map((value) => ({
      target: value,
      answer: value,
      picture: blockPicture3(value),
    }));
  }

  if (level === 4) {
    return shuffleValues(PROBLEMS, rng).map((problem) => ({
      ...problem,
      answer: buildNumberFromBlocks(problem.pieces),
    }));
  }

  throw new RangeError(`Unknown challenge level: ${level}`);
}
