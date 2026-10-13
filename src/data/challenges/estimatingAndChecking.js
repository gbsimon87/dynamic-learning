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

function randomInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/**
 * Slot 4: "estimate the answer to a calculation and use inverse operations to
 * check answers" — both halves of the statutory sentence on one claim. Wrong
 * claims are out by 200, which rounding to the nearest 100 always exposes
 * (an estimate is never more than 100 from the exact answer), so the estimate
 * really is enough to spot them before the inverse confirms it.
 */
export function sensibleClaim(rng, operation, isCorrect) {
  for (let guard = 0; guard < 200; guard++) {
    const a = randomInt(rng, operation === "add" ? 120 : 420, operation === "add" ? 560 : 960);
    const b = randomInt(rng, 110, operation === "add" ? 380 : a - 120);
    if (a % 10 === 0 || b % 10 === 0) continue;
    const exact = operation === "add" ? a + b : a - b;
    const error = isCorrect ? 0 : (rng() < 0.5 ? -200 : 200);
    const reported = exact + error;
    const estimate = operation === "add"
      ? roundTo(a, 100) + roundTo(b, 100)
      : roundTo(a, 100) - roundTo(b, 100);
    const inverse = inverseResult(reported, b, operation);
    const values = [exact, reported, estimate, inverse];
    if (values.some((value) => value < 0 || value > 999)) continue;
    // Keep every estimate choice (estimate − 100 … estimate + 200) inside
    // 0–1000, and keep the exact answer strictly nearer the estimate than a
    // wrong claim can ever be.
    if (estimate < 100 || estimate > 700 || Math.abs(exact - estimate) >= 100) continue;
    return { a, b, operation, reported, estimate, inverse, isCorrect };
  }
  throw new Error("no claim found");
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
  if (level === 4) {
    const plans = shuffleValues([
      ["add", true], ["add", false], ["add", true],
      ["subtract", false], ["subtract", true], ["subtract", false],
    ], rng);
    return plans.map(([operation, isCorrect]) => {
      const claim = sensibleClaim(rng, operation, isCorrect);
      return { ...claim, estimateOptions: estimateOptions(claim.estimate, 100, rng) };
    });
  }
  if (level === 3) {
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
