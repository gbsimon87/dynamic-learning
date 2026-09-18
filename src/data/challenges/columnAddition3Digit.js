import { shuffleValues } from "./placeValue3Digit.js";

const NO_CARRY = [
  [123, 214], [241, 326], [352, 127],
  [416, 253], [503, 264], [612, 175],
];

const ONE_CARRY = [
  [148, 236], [257, 125], [376, 216],
  [429, 153], [535, 148], [614, 278],
];

const TWO_CARRIES = [
  [168, 257], [276, 185], [358, 276],
  [467, 185], [589, 137], [696, 178],
];

const STORIES = [
  { a: 268, b: 157, prompt: "A school collected 268 shells, then 157 more. How many shells altogether?" },
  { a: 346, b: 278, prompt: "A library has 346 books and gets 278 more. How many books now?" },
  { a: 185, b: 367, prompt: "One class made 185 paper stars. Another made 367. How many stars altogether?" },
  { a: 429, b: 156, prompt: "A team scored 429 points, then 156 more. What is its total?" },
  { a: 358, b: 274, prompt: "A museum sold 358 tickets in the morning and 274 later. How many tickets?" },
  { a: 187, b: 456, prompt: "There are 187 blue beads and 456 red beads. How many beads in all?" },
];

export function additionCarries(a, b) {
  const ones = (a % 10) + (b % 10);
  const carryToTens = Math.floor(ones / 10);
  const tens = Math.floor((a % 100) / 10) + Math.floor((b % 100) / 10) + carryToTens;
  return {
    tens: carryToTens,
    hundreds: Math.floor(tens / 10),
  };
}

export function additionOptions(answer, rng) {
  return shuffleValues([answer, answer - 1, answer - 10, answer + 10], rng);
}

export function buildColumnAdditionQuestions(level, rng) {
  if (level === 4) {
    return shuffleValues(STORIES, rng).map((story) => ({
      ...story,
      answer: story.a + story.b,
      carries: additionCarries(story.a, story.b),
    }));
  }
  const plans = [NO_CARRY, ONE_CARRY, TWO_CARRIES][level - 1];
  if (!plans) throw new RangeError(`Unknown challenge level: ${level}`);
  return shuffleValues(plans, rng).map(([a, b]) => {
    const answer = a + b;
    return { a, b, answer, carries: additionCarries(a, b), options: additionOptions(answer, rng) };
  });
}
