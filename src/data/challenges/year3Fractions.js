import { shuffleValues } from "./placeValue3Digit.js";

export const fractionText = (numerator, denominator) => `${numerator}/${denominator}`;
export const fractionValue = ({ numerator, denominator }) => numerator / denominator;
export const shadedParts = (numerator, denominator) =>
  Array.from({ length: denominator }, (_, index) => index < numerator);

function nearby(answer, minimum, maximum, rng) {
  const others = Array.from({ length: maximum - minimum + 1 }, (_, index) => index + minimum)
    .filter((value) => value !== answer)
    .sort((a, b) => Math.abs(a - answer) - Math.abs(b - answer));
  return shuffleValues([answer, ...others.slice(0, 3)], rng);
}

const TENTHS = [1, 2, 3, 4, 6, 8];
const SETS = [
  { denominator: 2, numerator: 1, total: 8 },
  { denominator: 3, numerator: 1, total: 12 },
  { denominator: 4, numerator: 1, total: 12 },
  { denominator: 3, numerator: 2, total: 15 },
  { denominator: 4, numerator: 3, total: 16 },
  { denominator: 5, numerator: 2, total: 20 },
];
const NUMBER_FRACTIONS = [
  { numerator: 1, denominator: 3 }, { numerator: 2, denominator: 3 },
  { numerator: 3, denominator: 4 }, { numerator: 2, denominator: 5 },
  { numerator: 4, denominator: 5 }, { numerator: 5, denominator: 6 },
];
const BEYOND_ONE = [
  { numerator: 5, denominator: 4 }, { numerator: 6, denominator: 4 },
  { numerator: 4, denominator: 3 }, { numerator: 5, denominator: 3 },
  { numerator: 6, denominator: 5 }, { numerator: 7, denominator: 5 },
];
const EQUIVALENT = [
  { target: [1, 2], match: [2, 4] },
  { target: [1, 3], match: [2, 6] },
  { target: [2, 3], match: [4, 6] },
  { target: [1, 4], match: [2, 8] },
  { target: [3, 4], match: [6, 8] },
  { target: [2, 4], match: [1, 2] },
];
const EQUATIONS = [
  { denominator: 5, first: 1, second: 2, operation: "add" },
  { denominator: 6, first: 2, second: 3, operation: "add" },
  { denominator: 7, first: 3, second: 2, operation: "add" },
  { denominator: 4, first: 1, second: 2, operation: "add" },
  { denominator: 8, first: 3, second: 4, operation: "add" },
  { denominator: 5, first: 2, second: 2, operation: "add" },
];
const SUBTRACTIONS = [
  { denominator: 5, first: 4, second: 2, operation: "subtract" },
  { denominator: 6, first: 5, second: 3, operation: "subtract" },
  { denominator: 7, first: 6, second: 2, operation: "subtract" },
  { denominator: 4, first: 3, second: 1, operation: "subtract" },
  { denominator: 8, first: 7, second: 4, operation: "subtract" },
  { denominator: 5, first: 3, second: 2, operation: "subtract" },
];

function fraction(numerator, denominator) { return { numerator, denominator }; }
function resultOf({ first, second, operation }) {
  return operation === "add" ? first + second : first - second;
}

export function buildTenthsQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown tenths level: ${level}`);
  return shuffleValues(TENTHS, rng).map((numerator) => ({
    type: ["read-bar", "track", "shade", "share-tenths"][level - 1],
    numerator, denominator: 10,
    options: level === 1 ? nearby(numerator, 1, 10, rng).map((n) => fractionText(n, 10)) : null,
  }));
}

export function buildSetQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown set level: ${level}`);
  return shuffleValues(SETS, rng).map(({ numerator, denominator, total }) => ({
    type: ["select-set", "select-set", "read-set", "set-story"][level - 1],
    numerator: level === 1 ? 1 : numerator,
    denominator, total,
    answer: (total / denominator) * (level === 1 ? 1 : numerator),
    groupSize: level === 1 ? total / denominator : undefined,
  }));
}

export function buildNumbersQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown fraction-number level: ${level}`);
  const plans = level >= 3 ? BEYOND_ONE : NUMBER_FRACTIONS;
  return shuffleValues(plans, rng).map(({ numerator, denominator }) => ({
    type: ["read-bar", "track", "track", "mixed-number-story"][level - 1],
    numerator, denominator,
    wholes: level >= 3 ? 2 : 1,
    options: level === 1
      ? nearby(numerator, 1, denominator, rng).map((n) => fractionText(n, denominator))
      : null,
  }));
}

export function buildEquivalentQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown equivalent level: ${level}`);
  return shuffleValues(EQUIVALENT, rng).map(({ target, match }) => {
    const [numerator, denominator] = target;
    const [answer, answerDenominator] = match;
    const wrong = nearby(answer, 1, answerDenominator, rng).filter((n) => n !== answer).slice(0, 2);
    return {
      type: level <= 2 ? "match-bars" : level === 3 ? "shade-equivalent" : "write-equivalent",
      target: fraction(numerator, denominator),
      answer, answerDenominator,
      options: shuffleValues([answer, ...wrong].map((n) => fraction(n, answerDenominator)), rng),
    };
  });
}

export function buildArithmeticQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown arithmetic level: ${level}`);
  const plans = level === 3 ? SUBTRACTIONS : EQUATIONS;
  return shuffleValues(plans, rng).map((plan) => {
    const answer = resultOf(plan);
    return {
      ...plan, answer,
      type: level === 1 ? "equation-choice" : level === 4 ? "equation-story" : "equation-build",
      options: level === 1
        ? nearby(answer, 0, plan.denominator, rng).map((n) => fractionText(n, plan.denominator))
        : null,
    };
  });
}

const UNIT_PAIRS = [[2, 3], [3, 4], [2, 5], [4, 6], [3, 5], [4, 7]];
const SAME_DENOMINATOR_PAIRS = [[2, 4, 3], [1, 3, 5], [3, 5, 6], [2, 6, 7], [4, 7, 8], [1, 4, 6]];
const ORDER_SETS = [
  [5, [1, 3, 4]], [6, [2, 3, 5]], [7, [1, 4, 6]],
  [8, [2, 5, 7]], [5, [2, 3, 4]], [6, [1, 4, 5]],
];

export function buildComparingQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown comparing level: ${level}`);
  if (level === 3) {
    return shuffleValues(ORDER_SETS, rng).map(([denominator, numerators]) => {
      const ordered = numerators.map((n) => fractionText(n, denominator));
      const items = shuffleValues(numerators.map((n) => ({
        id: fractionText(n, denominator), label: fractionText(n, denominator), numerator: n,
      })), rng);
      if (items.every((item, index) => item.id === ordered[index])) {
        items.push(items.shift());
      }
      return { type: "order-fractions", denominator, items, ordered };
    });
  }
  const pairs = level === 1 ? UNIT_PAIRS : SAME_DENOMINATOR_PAIRS;
  return shuffleValues(pairs, rng).map((values) => {
    const left = level === 1 ? fraction(1, values[0]) : fraction(values[0], values[2]);
    const right = level === 1 ? fraction(1, values[1]) : fraction(values[1], values[2]);
    return {
      type: level === 4 ? "compare-story" : "compare-pair", left, right,
      answer: fractionValue(left) > fractionValue(right) ? "left" : "right",
    };
  });
}

const MIXED_PROBLEMS = [
  { type: "problem-set", total: 12, numerator: 2, denominator: 3 },
  { type: "problem-set", total: 16, numerator: 3, denominator: 4 },
  { type: "problem-set", total: 15, numerator: 2, denominator: 5 },
  { type: "problem-set", total: 18, numerator: 1, denominator: 3 },
  { type: "problem-set", total: 20, numerator: 3, denominator: 5 },
  { type: "problem-set", total: 24, numerator: 3, denominator: 4 },
];
const STORY_EQUATIONS = [
  [3, 1, 5], [2, 3, 6], [1, 2, 4], [4, 2, 7], [3, 4, 8], [2, 2, 5],
];
const STORY_EQUIVALENTS = EQUIVALENT;
const TWO_STEP_STORIES = [
  [7, 2, 1, 8], [6, 1, 2, 7], [5, 2, 1, 6],
  [4, 1, 2, 5], [6, 2, 2, 8], [5, 1, 2, 7],
];

export function buildFractionProblemQuestions(level, rng) {
  if (level < 1 || level > 4) throw new RangeError(`Unknown fraction problem level: ${level}`);
  if (level === 1) return shuffleValues(MIXED_PROBLEMS, rng).map((plan) => ({
    ...plan, answer: (plan.total / plan.denominator) * plan.numerator,
  }));
  if (level === 2) return shuffleValues(STORY_EQUATIONS, rng).map(([first, second, denominator]) => ({
    type: "problem-add", first, second, denominator, answer: first + second,
  }));
  if (level === 3) return shuffleValues(STORY_EQUIVALENTS, rng).map(({ target, match }) => ({
    type: "problem-equivalent", target: fraction(...target), answer: match[0], answerDenominator: match[1],
  }));
  return shuffleValues(TWO_STEP_STORIES, rng).map(([start, usedFirst, usedSecond, denominator]) => ({
    type: "problem-two-step", start, usedFirst, usedSecond, denominator,
    answer: start - usedFirst - usedSecond,
  }));
}
