import { shuffleValues } from "./placeValue3Digit.js";

const MISSING_ADDEND = [
  [243, 150], [416, 230], [572, 105],
  [284, 340], [365, 124], [508, 271],
];

const MISSING_SUBTRAHEND = [
  [734, 286], [682, 157], [905, 368],
  [641, 229], [853, 417], [790, 255],
];

const FACT_FAMILIES = [
  [734, 286], [615, 178], [903, 457],
  [782, 359], [640, 275], [821, 463],
];

const STORIES = [
  { whole: 468, known: 125, type: "start", prompt: "A club had some badges. It bought 125 more and now has 468. How many did it have before?" },
  { whole: 742, known: 368, type: "taken", prompt: "A box had 742 marbles. Some were taken out, leaving 368. How many were taken?" },
  { whole: 635, known: 257, type: "start", prompt: "A library had some books. It received 257 more and now has 635. How many did it have before?" },
  { whole: 816, known: 479, type: "taken", prompt: "A shop had 816 stickers. Some were sold, leaving 479. How many were sold?" },
  { whole: 904, known: 386, type: "start", prompt: "A school had some pencils. It got 386 more and now has 904. How many did it have before?" },
  { whole: 753, known: 265, type: "taken", prompt: "A team had 753 points. It spent some and has 265 left. How many points did it spend?" },
];

export function missingOptions(answer, rng) {
  return shuffleValues([answer, answer - 10, answer + 10, answer + 100], rng);
}

export function buildMissingNumberQuestions(level, rng) {
  if (level === 1) {
    return shuffleValues(MISSING_ADDEND, rng).map(([known, answer]) => ({
      known,
      whole: known + answer,
      answer,
      options: missingOptions(answer, rng),
    }));
  }
  if (level === 2) {
    return shuffleValues(MISSING_SUBTRAHEND, rng).map(([whole, answer]) => ({
      whole,
      remainder: whole - answer,
      answer,
    }));
  }
  if (level === 3) {
    return shuffleValues(FACT_FAMILIES, rng).map(([whole, known]) => ({
      whole,
      known,
      answer: whole - known,
    }));
  }
  if (level === 4) {
    return shuffleValues(STORIES, rng).map((story) => ({
      ...story,
      answer: story.whole - story.known,
    }));
  }
  throw new RangeError(`Unknown challenge level: ${level}`);
}
