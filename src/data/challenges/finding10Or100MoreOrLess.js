/**
 * Finding 10 or 100 More or Less — Year 3.
 *
 * Statutory requirement: "find 10 or 100 more or less than a given number".
 *
 * Deliberately NOT the same topic as "Adding and Subtracting Ones, Tens and
 * Hundreds". That one is arithmetic: any of ±1, ±10, ±100, chained, in stories.
 * This one is place value — only 10 and 100, and every question is about WHICH
 * DIGIT MOVES. The neighbour strip, the "what jump was made?" reading and the
 * counting chains all keep the attention on the columns rather than on the sum.
 *
 * The interesting half is the crossing case: 395 + 10 is 405, so the tens digit
 * goes DOWN and the hundreds digit changes. A learner who has only met
 * non-crossing examples has learned "add one to the tens digit", which is the
 * wrong rule and fails silently until it doesn't.
 *
 * Pure: no React, and `rng` is a parameter so challenges randomise per mount
 * while tests stay deterministic.
 */

import { digitsOf, shuffleValues } from "./placeValue3Digit.js";

export { isCorrectNumber } from "./numbersAndCounting.js";
export { shuffleValues };

/** Only 10 and 100, in both directions — the whole of this topic. */
export const JUMPS = [-100, -10, 10, 100];

/**
 * Every number used here keeps all four neighbours inside three digits, so no
 * question ever shows a 2-digit or 4-digit number.
 */
export const MIN_CENTRE = 200;
export const MAX_CENTRE = 899;

/** "10 more" / "100 less" — the words a teacher would use, never "-100". */
export function jumpLabel(jump) {
  return `${Math.abs(jump)} ${jump > 0 ? "more" : "less"}`;
}

export function applyJump(value, jump) {
  return value + jump;
}

/** Whether a centre number can show all four of its neighbours. */
export function hasWholeStrip(value) {
  return value >= MIN_CENTRE && value <= MAX_CENTRE;
}

/**
 * The neighbour strip: 100 less, 10 less, the number, 10 more, 100 more.
 *
 * Returns null rather than a strip that would run outside three digits — a
 * caller that rendered null as a question would be asking something false.
 */
export function neighbourStrip(value) {
  if (!hasWholeStrip(value)) return null;
  return {
    terms: JUMPS.slice(0, 2)
      .map((jump) => value + jump)
      .concat([value], JUMPS.slice(2).map((jump) => value + jump)),
    captions: ["100 less", "10 less", "", "10 more", "100 more"],
    centreIndex: 2,
    jumps: [-100, -10, null, 10, 100],
  };
}

/**
 * Which jump turns `from` into `to`, or null when no taught jump does.
 *
 * Null matters: it is what stops a question pair being written down wrong and
 * reaching a child as an unanswerable screen.
 */
export function jumpBetween(from, to) {
  const difference = to - from;
  return JUMPS.includes(difference) ? difference : null;
}

/**
 * Does this jump change a digit other than the one it names?
 *
 * 342 + 10 touches only the tens. 395 + 10 touches the tens AND the hundreds,
 * because the tens ran out. The second is the case worth teaching.
 */
export function crossesBoundary(value, jump) {
  const before = digitsOf(value);
  const after = digitsOf(value + jump);
  const named = Math.abs(jump) === 100 ? "hundreds" : "tens";
  return Object.keys(before).some(
    (place) => place !== named && before[place] !== after[place]
  );
}

/**
 * Four numbers: the answer and three real mistakes.
 *
 * Worth offering, in order: the jump made backwards, the other size of jump,
 * and the number left alone. A learner who mis-reads "less" as "more" lands on
 * a button that exists; a random number would be eliminated without counting.
 */
export function jumpOptions(value, jump, rng) {
  const answer = value + jump;
  const otherSize = Math.abs(jump) === 100 ? 10 : 100;

  const candidates = [
    value - jump,
    value + Math.sign(jump) * otherSize,
    value - Math.sign(jump) * otherSize,
    value,
    answer + 1,
  ];

  const options = [answer];
  for (const candidate of candidates) {
    if (options.length === 4) break;
    if (candidate < 100 || candidate > 999) continue;
    if (options.includes(candidate)) continue;
    options.push(candidate);
  }

  return shuffleValues(options, rng);
}

/** Where a chain of jumps lands. */
export function chainAnswer(start, jumps) {
  return jumps.reduce((total, jump) => total + jump, start);
}

/** Every number a chain passes through, so a chain can be shown as a count. */
export function chainSteps(start, jumps) {
  const steps = [start];
  for (const jump of jumps) steps.push(steps[steps.length - 1] + jump);
  return steps;
}

// --- question sets -------------------------------------------------------
//
// Hand-picked rather than generated: each list is chosen so that the crossing
// cases are actually present, which random numbers only manage sometimes.

const ONE_BLANK = [
  { centre: 342, jump: 10 },
  { centre: 476, jump: -100 },
  { centre: 518, jump: 100 },
  { centre: 263, jump: -10 },
  { centre: 395, jump: 10 }, // tens run out: 405
  { centre: 704, jump: -10 }, // borrows from the hundreds: 694
];

const READ_THE_JUMP = [
  { from: 452, to: 462 },
  { from: 638, to: 538 },
  { from: 297, to: 397 },
  { from: 581, to: 571 },
  { from: 396, to: 406 }, // 10 more, though the tens digit went down
  { from: 403, to: 393 }, // 10 less, though the hundreds digit changed
];

const WHOLE_STRIP = [284, 357, 512, 630, 495, 706];

const CHAINS = [
  { start: 276, jumps: [100, 100, 100], story: "Count on in 100s three times from 276." },
  { start: 843, jumps: [-100, -100], story: "Count back in 100s twice from 843." },
  { start: 368, jumps: [10, 10, 10, 10], story: "Count on in 10s four times from 368." },
  { start: 425, jumps: [-10, -10, -10], story: "Count back in 10s three times from 425." },
  { start: 392, jumps: [10, 10], story: "Count on in 10s twice from 392." },
  { start: 508, jumps: [-10, -10], story: "Count back in 10s twice from 508." },
];

/**
 * Questions for one of the four challenges.
 *
 * Levels: 1 one blank in a filled strip, 2 name the jump, 3 fill the whole
 * strip, 4 chains of jumps.
 */
export function buildJumpQuestions(level, rng) {
  if (level === 1) {
    return shuffleValues(ONE_BLANK, rng).map(({ centre, jump }) => {
      const strip = neighbourStrip(centre);
      const gapIndex = strip.jumps.indexOf(jump);
      return {
        centre,
        jump,
        answer: centre + jump,
        strip,
        gapIndex,
        options: jumpOptions(centre, jump, rng),
      };
    });
  }

  if (level === 2) {
    return shuffleValues(READ_THE_JUMP, rng).map(({ from, to }) => {
      const jump = jumpBetween(from, to);
      return {
        from,
        to,
        jump,
        answer: jumpLabel(jump),
        options: JUMPS.map(jumpLabel),
        crossing: crossesBoundary(from, jump),
      };
    });
  }

  if (level === 3) {
    return shuffleValues(WHOLE_STRIP, rng).map((centre) => {
      const strip = neighbourStrip(centre);
      return {
        centre,
        strip,
        gaps: [0, 1, 3, 4],
        answers: { 0: centre - 100, 1: centre - 10, 3: centre + 10, 4: centre + 100 },
      };
    });
  }

  if (level === 4) {
    return shuffleValues(CHAINS, rng).map(({ start, jumps, story }) => ({
      start,
      jumps,
      story,
      steps: chainSteps(start, jumps),
      answer: chainAnswer(start, jumps),
    }));
  }

  throw new RangeError(`Unknown challenge level: ${level}`);
}
