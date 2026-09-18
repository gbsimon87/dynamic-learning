import { shuffleValues } from "./placeValue3Digit.js";

const NO_EXCHANGE = [
  [758, 324], [694, 251], [887, 465],
  [963, 521], [775, 352], [846, 213],
];

const ONE_EXCHANGE = [
  [542, 316], [671, 245], [835, 417],
  [764, 328], [953, 426], [482, 157],
];

const ACROSS_ZERO = [
  [402, 157], [603, 258], [701, 465],
  [800, 356], [905, 478], [500, 267],
];

const STORIES = [
  { a: 612, b: 278, prompt: "A school had 612 pencils. It gave away 278. How many are left?" },
  { a: 731, b: 486, prompt: "A library had 731 books. 486 were borrowed. How many remain?" },
  { a: 903, b: 457, prompt: "A shop had 903 stickers. It sold 457. How many are left?" },
  { a: 654, b: 287, prompt: "A museum printed 654 tickets. It used 287. How many remain?" },
  { a: 840, b: 365, prompt: "A team had 840 points. It spent 365. How many points remain?" },
  { a: 726, b: 389, prompt: "A box held 726 beads. 389 were taken out. How many are left?" },
];

/** The adjusted top digits children write above a column calculation. */
export function subtractionExchanges(a, b) {
  let hundreds = Math.floor(a / 100);
  let tens = Math.floor((a % 100) / 10);
  let ones = a % 10;
  const bottomTens = Math.floor((b % 100) / 10);
  const bottomOnes = b % 10;
  const marks = {};
  let count = 0;

  if (ones < bottomOnes) {
    if (tens === 0) {
      hundreds -= 1;
      tens += 10;
      marks.hundreds = hundreds;
      count += 1;
    }
    tens -= 1;
    ones += 10;
    marks.tens = tens;
    marks.ones = ones;
    count += 1;
  }
  if (tens < bottomTens) {
    hundreds -= 1;
    tens += 10;
    marks.hundreds = hundreds;
    marks.tens = tens;
    count += 1;
  }

  return { marks, count, adjusted: { hundreds, tens, ones } };
}

export function subtractionOptions(answer, rng) {
  return shuffleValues([answer, answer + 1, answer - 10, answer + 10], rng);
}

export function buildColumnSubtractionQuestions(level, rng) {
  if (level === 4) {
    return shuffleValues(STORIES, rng).map((story) => ({
      ...story,
      answer: story.a - story.b,
      exchanges: subtractionExchanges(story.a, story.b).marks,
    }));
  }
  const plans = [NO_EXCHANGE, ONE_EXCHANGE, ACROSS_ZERO][level - 1];
  if (!plans) throw new RangeError(`Unknown challenge level: ${level}`);
  return shuffleValues(plans, rng).map(([a, b]) => ({
    a,
    b,
    answer: a - b,
    exchanges: subtractionExchanges(a, b).marks,
    options: subtractionOptions(a - b, rng),
  }));
}
