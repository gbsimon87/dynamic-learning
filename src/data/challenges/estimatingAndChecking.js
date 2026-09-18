import { shuffleValues } from "./placeValue3Digit.js";

const ADD_ESTIMATES = [
  [247, 132], [356, 218], [184, 295],
  [428, 163], [273, 346], [512, 274],
];

const SUBTRACT_ESTIMATES = [
  [783, 264], [649, 218], [872, 347],
  [751, 426], [934, 388], [698, 273],
];

const CLAIMS = [
  { a: 264, b: 178, operation: "add", error: 0 },
  { a: 356, b: 227, operation: "add", error: -10 },
  { a: 729, b: 385, operation: "subtract", error: 0 },
  { a: 643, b: 278, operation: "subtract", error: 10 },
  { a: 417, b: 256, operation: "add", error: 0 },
  { a: 852, b: 419, operation: "subtract", error: -10 },
];

export function roundTo(value, place) {
  return Math.round(value / place) * place;
}

export function inverseResult(reported, b, operation) {
  return operation === "add" ? reported - b : reported + b;
}

function estimateOptions(answer, place, rng) {
  const candidates = [answer, answer - place, answer + place, answer + 2 * place];
  return shuffleValues(candidates, rng);
}

export function buildEstimatingQuestions(level, rng) {
  if (level === 1 || level === 2) {
    const place = level === 1 ? 10 : 100;
    const plans = level === 1 ? ADD_ESTIMATES : SUBTRACT_ESTIMATES;
    return shuffleValues(plans, rng).map(([a, b]) => {
      const roundedA = roundTo(a, place);
      const roundedB = roundTo(b, place);
      const answer = level === 1 ? roundedA + roundedB : roundedA - roundedB;
      return {
        a, b, place, roundedA, roundedB, answer,
        operation: level === 1 ? "add" : "subtract",
        options: estimateOptions(answer, place, rng),
      };
    });
  }
  if (level === 3 || level === 4) {
    return shuffleValues(CLAIMS, rng).map(({ a, b, operation, error }) => {
      const exact = operation === "add" ? a + b : a - b;
      const reported = exact + error;
      return {
        a, b, operation, reported,
        inverse: inverseResult(reported, b, operation),
        isCorrect: error === 0,
      };
    });
  }
  throw new RangeError(`Unknown challenge level: ${level}`);
}
