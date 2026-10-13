import { shuffleValues } from "./placeValue3Digit.js";

const ONE_STEP = [
  { a: 325, b: 148, operation: "add", prompt: "There are 325 red cards and 148 blue cards. How many cards altogether?" },
  { a: 743, b: 268, operation: "subtract", prompt: "A library had 743 books. 268 were borrowed. How many are left?" },
  { a: 416, b: 257, operation: "add", prompt: "A school collected 416 cans, then 257 more. How many cans in all?" },
  { a: 852, b: 379, operation: "subtract", prompt: "A shop had 852 stickers and sold 379. How many remain?" },
  { a: 284, b: 369, operation: "add", prompt: "One team scored 284 points. Another scored 369. How many altogether?" },
  { a: 691, b: 245, operation: "subtract", prompt: "A box held 691 beads. 245 were used. How many are left?" },
];

/**
 * Two-step story templates, one bank per challenge so slots 2, 3 and 4 never
 * show the same story. `gain`/`loss` are the verb phrases for each change;
 * the numbers are generated per mount by twoStepPlan.
 */
const TWO_STEP_STORIES = [
  { open: "A box has", item: "cards", gain: "gets {n} more", loss: "gives away {n}", ask: "How many cards now?" },
  { open: "A library has", item: "books", gain: "{n} are returned", loss: "{n} are borrowed", ask: "How many books now?" },
  { open: "A school has", item: "pencils", gain: "buys {n} more", loss: "uses {n}", ask: "How many pencils remain?" },
  { open: "A shop has", item: "stickers", gain: "gets {n} more", loss: "sells {n}", ask: "How many stickers now?" },
  { open: "A museum has", item: "tickets", gain: "prints {n} more", loss: "sells {n}", ask: "How many tickets remain?" },
  { open: "A team has", item: "points", gain: "earns {n}", loss: "spends {n}", ask: "How many points now?" },
];

const SENTENCE_STORIES = [
  { open: "A baker has", item: "buns", gain: "bakes {n} more", loss: "sells {n}", ask: "How many buns now?" },
  { open: "A zoo has", item: "visitors", gain: "{n} more arrive", loss: "{n} go home", ask: "How many visitors now?" },
  { open: "A pond has", item: "frogspawn eggs", gain: "{n} more are laid", loss: "{n} hatch", ask: "How many eggs are there now?" },
  { open: "A toy shop has", item: "marbles", gain: "orders {n} more", loss: "sells {n}", ask: "How many marbles now?" },
  { open: "A car park has", item: "cars", gain: "{n} more drive in", loss: "{n} drive out", ask: "How many cars now?" },
  { open: "A farm has", item: "apples", gain: "picks {n} more", loss: "sells {n}", ask: "How many apples now?" },
];

const FINAL_STORIES = [
  { open: "A garden centre has", item: "seeds", gain: "gets {n} more", loss: "plants {n}", ask: "How many seeds are left?" },
  { open: "A hall has", item: "chairs", gain: "{n} are brought in", loss: "{n} are moved out", ask: "How many chairs are there now?" },
  { open: "A class has", item: "paper stars", gain: "makes {n} more", loss: "gives away {n}", ask: "How many stars remain?" },
  { open: "A club has", item: "badges", gain: "makes {n} more", loss: "gives away {n}", ask: "How many badges now?" },
  { open: "A cinema has", item: "popcorn bags", gain: "fills {n} more", loss: "sells {n}", ask: "How many bags are left?" },
  { open: "A lake has", item: "geese", gain: "{n} more land", loss: "{n} fly away", ask: "How many geese are there now?" },
];

const BANKS = { 2: TWO_STEP_STORIES, 3: SENTENCE_STORIES, 4: FINAL_STORIES };

function randomInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/**
 * Numbers for one two-step story. Every quantity a child meets — start, each
 * change, the middle total and the answer — stays between 100 and 999, and the
 * changes are never multiples of 10 so the story needs real column work.
 */
export function twoStepPlan(rng, gainFirst) {
  for (let guard = 0; guard < 200; guard++) {
    const start = randomInt(rng, 200, 800);
    const up = randomInt(rng, 110, 390);
    const down = randomInt(rng, 110, 390);
    if (up % 10 === 0 || down % 10 === 0 || up === down) continue;
    const first = gainFirst ? up : -down;
    const second = gainFirst ? -down : up;
    const middle = start + first;
    const answer = middle + second;
    if (middle >= 100 && middle <= 999 && answer >= 100 && answer <= 999) {
      return { start, first, second };
    }
  }
  return gainFirst ? { start: 428, first: 267, second: -149 } : { start: 745, first: -218, second: 136 };
}

function storyPrompt(story, { start, first, second }) {
  const phrase = (change) => {
    const words = (change > 0 ? story.gain : story.loss).replace("{n}", Math.abs(change));
    // "gets 125 more" needs a subject; "125 are returned" already has one.
    return /^\d/.test(words) ? words : `it ${words}`;
  };
  return `${story.open} ${start} ${story.item}. First, ${phrase(first)}. Then ${phrase(second)}. ${story.ask}`;
}

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
  if (level !== 2 && level !== 3 && level !== 4) {
    throw new RangeError(`Unknown challenge level: ${level}`);
  }
  return shuffleValues(BANKS[level], rng).map((story, index) => {
    const plan = twoStepPlan(rng, index % 2 === 0);
    return { ...plan, prompt: storyPrompt(story, plan) };
  }).map((plan) => ({
    ...plan,
    ...applySteps(plan.start, plan.first, plan.second),
    expression: numberSentence(plan.start, plan.first, plan.second),
    expressions: level === 3
      ? expressionOptions(plan.start, plan.first, plan.second, rng)
      : null,
  }));
}
