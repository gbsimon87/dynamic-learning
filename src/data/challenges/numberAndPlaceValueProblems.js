/**
 * Number and Place Value Problems — Year 3.
 *
 * Statutory requirement: "solve number problems and practical problems
 * involving these ideas" — the synthesis topic for the whole category. Nothing
 * new is taught here; what is new is that the learner has to decide WHICH idea
 * a problem wants, which is the part the other six topics cannot rehearse
 * because each of them announces its own idea in its title.
 *
 * Two things in here exist to keep the questions honest:
 *
 *   solveConstraints  brute-forces a clue puzzle over every 3-digit number, so
 *                     the answer is derived and a puzzle with two solutions —
 *                     or none — cannot reach a child.
 *   evaluateWorking   recomputes a word problem's answer from an expression, so
 *                     no answer is a number somebody typed into this file and
 *                     hoped was right.
 *
 * Pure: no React, and `rng` is a parameter so challenges randomise per mount
 * while tests stay deterministic.
 */

import { digitsOf, shuffleValues } from "./placeValue3Digit.js";

export { isCorrectNumber } from "./numbersAndCounting.js";
export { digitsOf, shuffleValues };

export const PLACES = ["hundreds", "tens", "ones"];

// --- clue puzzles --------------------------------------------------------

/**
 * Does a number satisfy one clue?
 *
 * Every clue is a plain object so that the sentence a child reads and the test
 * a number is judged by come from the SAME data. A hand-written sentence next
 * to a hand-written answer is how a puzzle ends up saying one thing and
 * marking another.
 */
export function satisfiesClue(value, clue) {
  const digits = digitsOf(value);
  switch (clue.kind) {
    case "digit":
      return digits[clue.place] === clue.value;
    case "between":
      return value > clue.low && value < clue.high;
    case "multipleOf":
      return value % clue.value === 0;
    case "digitSum":
      return digits.hundreds + digits.tens + digits.ones === clue.value;
    case "sameDigit":
      return digits[clue.place] === digits[clue.other];
    case "doubleDigit":
      return digits[clue.place] === digits[clue.other] * 2;
    case "moreThanDigit":
      return digits[clue.place] === digits[clue.other] + clue.by;
    default:
      throw new RangeError(`Unknown clue: ${clue.kind}`);
  }
}

export function satisfiesAll(value, clues) {
  return clues.every((clue) => satisfiesClue(value, clue));
}

/**
 * The one 3-digit number a set of clues describes, or null.
 *
 * Null for "no solution" AND for "more than one" — a puzzle with two answers
 * marks a correct child wrong, which is the same failure as a puzzle with
 * none. The question sets are checked against this rather than eyeballed.
 */
export function solveConstraints(clues) {
  let found = null;
  for (let value = 100; value <= 999; value++) {
    if (!satisfiesAll(value, clues)) continue;
    if (found !== null) return null;
    found = value;
  }
  return found;
}

/** The sentence for one clue. Generated, so it cannot drift from the test. */
export function clueText(clue) {
  switch (clue.kind) {
    case "digit":
      return `My ${clue.place} digit is ${clue.value}.`;
    case "between":
      return `I am greater than ${clue.low} and less than ${clue.high}.`;
    case "multipleOf":
      return `I am a multiple of ${clue.value}.`;
    case "digitSum":
      return `My three digits add up to ${clue.value}.`;
    case "sameDigit":
      return `My ${clue.place} digit is the same as my ${clue.other} digit.`;
    case "doubleDigit":
      return `My ${clue.place} digit is double my ${clue.other} digit.`;
    case "moreThanDigit":
      return `My ${clue.place} digit is ${clue.by} more than my ${clue.other} digit.`;
    default:
      throw new RangeError(`Unknown clue: ${clue.kind}`);
  }
}

/**
 * 407 read as if the empty column were not there: 47.
 *
 * This is THE mistake this topic exists to catch, so it is offered as an
 * option rather than left to chance. Returns null when there is no empty
 * column to skip, because then the misreading does not arise.
 */
export function readSkippingZeros(value) {
  const digits = String(value).replace(/0/g, "");
  if (digits.length === String(value).length || digits === "") return null;
  return Number(digits);
}

/** Four numbers: the answer, the zero-skipping misread, a digit swap and a
 * slip of one place. Everything clamped to three digits except the misread,
 * which is shorter on purpose — that is what makes it the wrong answer. */
export function clueOptions(value, rng) {
  const { hundreds, tens, ones } = digitsOf(value);
  const candidates = [
    readSkippingZeros(value),
    ones * 100 + tens * 10 + hundreds, // digits reversed
    hundreds * 100 + ones * 10 + tens, // tens and ones swapped
    value + 10,
    value - 10,
    value + 100,
    value - 100,
  ].filter((candidate) => candidate !== null && candidate > 0 && candidate <= 999);

  const options = [value];
  for (const candidate of candidates) {
    if (options.length === 4) break;
    if (options.includes(candidate)) continue;
    options.push(candidate);
  }

  return shuffleValues(options, rng);
}

// --- word problems -------------------------------------------------------

/**
 * Evaluate "4 * 100 + 7 - 10". Multiplication first, then left to right.
 *
 * Deliberately not `eval`, and deliberately tiny: its only job is to let a
 * problem carry its own working so the answer can be recomputed instead of
 * trusted.
 */
export function evaluateWorking(working) {
  const tokens = working.trim().split(/\s+/);
  const afterProducts = [];
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i] === "*") {
      const left = afterProducts.pop();
      const right = Number(tokens[++i]);
      afterProducts.push(left * right);
    } else {
      afterProducts.push(/^[-+*]$/.test(tokens[i]) ? tokens[i] : Number(tokens[i]));
    }
  }

  let total = afterProducts[0];
  for (let i = 1; i < afterProducts.length; i += 2) {
    total = afterProducts[i] === "+" ? total + afterProducts[i + 1] : total - afterProducts[i + 1];
  }
  return total;
}

// --- question sets -------------------------------------------------------

const digit = (place, value) => ({ kind: "digit", place, value });

/** Every digit stated outright. The work is assembling them into a numeral
 * without dropping the empty column. */
const STATED_CLUES = [
  [digit("hundreds", 4), digit("tens", 0), digit("ones", 7)],
  [digit("hundreds", 7), digit("tens", 2), digit("ones", 0)],
  [digit("hundreds", 3), digit("tens", 0), digit("ones", 5)],
  [digit("hundreds", 6), digit("tens", 1), digit("ones", 9)],
  [digit("hundreds", 9), digit("tens", 0), digit("ones", 4)],
  [digit("hundreds", 2), digit("tens", 5), digit("ones", 8)],
];

/** No digit is given outright in more than one clue; the rest have to be
 * worked out from the others, and every clue has to be used. */
const INFERRED_CLUES = [
  [
    { kind: "between", low: 400, high: 500 },
    digit("tens", 7),
    { kind: "sameDigit", place: "ones", other: "hundreds" },
  ],
  [
    digit("hundreds", 6),
    digit("ones", 4),
    { kind: "doubleDigit", place: "tens", other: "ones" },
  ],
  [
    digit("ones", 0),
    digit("tens", 2),
    { kind: "moreThanDigit", place: "hundreds", other: "tens", by: 3 },
  ],
  [{ kind: "multipleOf", value: 100 }, { kind: "between", low: 600, high: 800 }],
  [digit("hundreds", 5), digit("tens", 0), { kind: "digitSum", value: 6 }],
  [{ kind: "between", low: 250, high: 260 }, digit("ones", 8)],
];

/**
 * Digit cards. The digits in a set are distinct, so "make the largest" has
 * exactly one right arrangement — a repeated digit would give two and mark a
 * correct child wrong.
 *
 * Three of the sets contain a 0, which is the whole reason this is a problem
 * and not an exercise: the smallest number is 407, not 047, because a 3-digit
 * number cannot start with nothing.
 */
const DIGIT_CARDS = [
  { digits: [4, 0, 7], want: "largest" },
  { digits: [4, 0, 7], want: "smallest" },
  { digits: [3, 8, 1], want: "largest" },
  { digits: [5, 0, 3], want: "smallest" },
  { digits: [6, 2, 9], want: "largest" },
  { digits: [7, 4, 1], want: "smallest" },
];

/** The digits in the order that makes the largest or smallest 3-digit number. */
export function arrangeDigits(digits, want) {
  const sorted = [...digits].sort((a, b) => (want === "largest" ? b - a : a - b));
  // A 3-digit number cannot start with 0, so the leading zero swaps with the
  // first digit that isn't one.
  if (want === "smallest" && sorted[0] === 0) {
    const swapWith = sorted.findIndex((d) => d !== 0);
    [sorted[0], sorted[swapWith]] = [sorted[swapWith], sorted[0]];
  }
  return sorted;
}

export function valueOfDigits(digits) {
  return Number(digits.join(""));
}

/** Multi-step problems that reach across the category: hundreds and tens more
 * or less, counting on in 50s, reading a number out of its packaging, and
 * picking the largest of three. Each carries its own working. */
const PROBLEMS = [
  {
    prompt:
      "A shop has 348 badges. 100 more arrive, then 10 are sold. How many badges are there now?",
    working: "348 + 100 - 10",
  },
  {
    prompt:
      "A hall is set out with 4 rows of 100 chairs and 7 extra chairs. Then 10 chairs are taken away. How many chairs are left?",
    working: "4 * 100 + 7 - 10",
  },
  {
    prompt:
      "Amy starts at 0 and counts on in 50s. What number does she say straight after 400?",
    working: "400 + 50",
  },
  {
    prompt:
      "A box holds 100 crayons. A school has 6 full boxes and 3 loose crayons. How many crayons does the school have?",
    working: "6 * 100 + 3",
  },
  {
    prompt:
      "A ferry carried 605 people on Monday and 10 fewer on Tuesday. How many people did it carry on Tuesday?",
    working: "605 - 10",
  },
  {
    prompt:
      "Three bags hold 205, 250 and 25 marbles. How many marbles are in the bag with the most?",
    working: "250",
  },
];

/**
 * Questions for one of the four challenges.
 *
 * Levels: 1 stated clues, 2 clues to work out, 3 digit cards, 4 word problems.
 */
export function buildProblemQuestions(level, rng) {
  if (level === 1 || level === 2) {
    const sets = level === 1 ? STATED_CLUES : INFERRED_CLUES;
    return shuffleValues(sets, rng).map((clues) => {
      const answer = solveConstraints(clues);
      return {
        clues,
        lines: clues.map(clueText),
        answer,
        options: clueOptions(answer, rng),
      };
    });
  }

  if (level === 3) {
    return shuffleValues(DIGIT_CARDS, rng).map(({ digits, want }) => {
      const order = arrangeDigits(digits, want);
      // Shuffle until the cards are actually scrambled — handing back the
      // answer already arranged is not a question.
      let scrambled = shuffleValues(digits, rng);
      let guard = 0;
      while (scrambled.every((d, i) => d === order[i]) && guard++ < 10) {
        scrambled = shuffleValues(digits, rng);
      }
      return {
        digits,
        want,
        order,
        answer: valueOfDigits(order),
        items: scrambled.map((d) => ({ id: String(d), label: String(d) })),
      };
    });
  }

  if (level === 4) {
    return shuffleValues(PROBLEMS, rng).map((problem) => ({
      ...problem,
      answer: evaluateWorking(problem.working),
    }));
  }

  throw new RangeError(`Unknown challenge level: ${level}`);
}
