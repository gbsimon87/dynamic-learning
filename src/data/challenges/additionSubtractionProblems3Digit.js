import { shuffleValues } from "./placeValue3Digit.js";

const ONE_STEP = [
  { a: 325, b: 148, operation: "add", prompt: "There are 325 red cards and 148 blue cards. How many cards altogether?" },
  { a: 743, b: 268, operation: "subtract", prompt: "A library had 743 books. 268 were borrowed. How many are left?" },
  { a: 416, b: 257, operation: "add", prompt: "A school collected 416 cans, then 257 more. How many cans in all?" },
  { a: 852, b: 379, operation: "subtract", prompt: "A shop had 852 stickers and sold 379. How many remain?" },
  { a: 284, b: 369, operation: "add", prompt: "One team scored 284 points. Another scored 369. How many altogether?" },
  { a: 691, b: 245, operation: "subtract", prompt: "A box held 691 beads. 245 were used. How many are left?" },
];

const TWO_STEP = [
  { start: 360, first: 125, second: -84, prompt: "A box has 360 cards. It gets 125 more, then gives away 84. How many cards now?" },
  { start: 745, first: -218, second: 136, prompt: "A library has 745 books. 218 are borrowed, then 136 are returned. How many books now?" },
  { start: 428, first: 267, second: -149, prompt: "A school has 428 pencils. It buys 267 more, then uses 149. How many pencils remain?" },
  { start: 832, first: -356, second: 208, prompt: "A shop has 832 stickers. It sells 356, then gets 208 more. How many stickers now?" },
  { start: 517, first: 184, second: -275, prompt: "A museum has 517 tickets. It prints 184 more, then sells 275. How many tickets remain?" },
  { start: 690, first: -235, second: 172, prompt: "A team has 690 points. It spends 235, then earns 172. How many points now?" },
];

const FINAL_STORIES = [
  { start: 536, first: 178, second: -249, prompt: "A gardener has 536 seeds. She gets 178 more and plants 249. How many seeds are left?" },
  { start: 804, first: -367, second: 145, prompt: "A hall has 804 chairs. 367 are moved out and 145 return. How many chairs are there now?" },
  { start: 273, first: 346, second: -185, prompt: "A class makes 273 paper stars on Monday and 346 on Tuesday. It gives away 185. How many stars remain?" },
  { start: 921, first: -485, second: 263, prompt: "A club has 921 badges. It gives away 485, then makes 263 more. How many badges now?" },
  { start: 447, first: 286, second: -158, prompt: "A shop has 447 cards. It receives 286, then sells 158. How many cards remain?" },
  { start: 752, first: -329, second: 216, prompt: "A library has 752 books. 329 are borrowed and 216 are returned. How many books now?" },
];

export function applySteps(start, first, second) {
  return { afterFirst: start + first, answer: start + first + second };
}

export function numberSentence(start, first, second) {
  const format = (change) => `${change < 0 ? "−" : "+"} ${Math.abs(change)}`;
  return `${start} ${format(first)} ${format(second)}`;
}

export function expressionOptions(start, first, second, rng) {
  const expressions = [
    numberSentence(start, first, second),
    numberSentence(start, -first, second),
    numberSentence(start, first, -second),
    numberSentence(start, -first, -second),
  ];
  return shuffleValues(expressions, rng);
}

function answerOptions(answer, rng) {
  return shuffleValues([answer, answer - 10, answer + 10, answer + 100], rng);
}

export function buildAdditionSubtractionProblems(level, rng) {
  if (level === 1) {
    return shuffleValues(ONE_STEP, rng).map((question) => {
      const answer = question.operation === "add"
        ? question.a + question.b : question.a - question.b;
      return { ...question, answer, options: answerOptions(answer, rng) };
    });
  }
  const plans = level === 4 ? FINAL_STORIES : TWO_STEP;
  if (level !== 2 && level !== 3 && level !== 4) {
    throw new RangeError(`Unknown challenge level: ${level}`);
  }
  return shuffleValues(plans, rng).map((plan) => ({
    ...plan,
    ...applySteps(plan.start, plan.first, plan.second),
    expression: numberSentence(plan.start, plan.first, plan.second),
    expressions: level === 3
      ? expressionOptions(plan.start, plan.first, plan.second, rng)
      : null,
  }));
}
