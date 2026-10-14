/**
 * Pure question data for the "Place Value" topic (tens and ones, 10 to 99).
 *
 * No React. The helpers take a number apart and put it back together; the
 * `build*` functions generate each level's questions from an `rng`, so runs
 * differ while tests stay deterministic.
 */

import { shuffle } from "./countingInSteps.js";

/** How many tens are in `n`. */
export function tensOf(n) {
  return Math.floor(n / 10);
}

/** How many ones are left over. */
export function onesOf(n) {
  return n % 10;
}

/** The number those two columns make. */
export function fromParts(tens, ones) {
  return tens * 10 + ones;
}

/**
 * The number drawn as base-ten blocks: one entry per rod and one per unit.
 *
 * Arrays rather than counts, so the component can render each block as its
 * own element with a stable key.
 */
export function blockPicture(n) {
  return {
    tens: Array.from({ length: tensOf(n) }, (_, i) => i),
    ones: Array.from({ length: onesOf(n) }, (_, i) => i),
  };
}

/**
 * Wrong answers that test place value rather than arithmetic.
 *
 * The digit swap leads, because reading 47 as 74 is the mistake this topic
 * exists to correct. Next comes a column miscounted by one - a ten out or a
 * one out, chosen by `rng` - so a learner who miscounts still recognises their
 * own answer and the right answer is not always in the same place.
 *
 * Candidates are tried in order and the first `count` usable ones are kept,
 * which is what keeps the list full for a palindrome like 44, where the swap
 * is the number itself.
 */
export function placeValueDistractors(n, count, rng = () => 0) {
  const ten = rng() < 0.5 ? 10 : -10;
  const one = rng() < 0.5 ? 1 : -1;
  const columns = rng() < 0.5 ? [n + ten, n + one] : [n + one, n + ten];
  const candidates = [
    fromParts(onesOf(n), tensOf(n)), // the digit swap
    ...columns,
    n - ten,
    n - one,
    n + 9,
    n - 9,
  ];

  const seen = new Set([n]);
  const wrong = [];

  for (const candidate of candidates) {
    // Year 2 has no negative numbers, and works to 100.
    if (candidate < 0 || candidate > 100 || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}

/** A whole number from `low` to `high`, both included. */
function randInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/** Six different two-digit numbers passing `keep`. */
function sixNumbers(rng, keep) {
  const used = new Set();
  while (used.size < 6) {
    const n = randInt(rng, 11, 99);
    if (keep(n)) used.add(n);
  }
  return [...used];
}

/**
 * Level 1: count the blocks and say how many tens or ones.
 *
 * The other column's digit is always a wrong option - reading the wrong
 * column is the confusion here, not arithmetic - and the third is a digit one
 * or two away, on whichever side keeps the answer out of the middle of three
 * in a row. Three ask for tens and three for ones.
 */
export function buildCountBlocksQuestions(rng) {
  const numbers = sixNumbers(rng, (n) => onesOf(n) !== 0 && onesOf(n) !== tensOf(n));
  const asks = shuffle([true, true, true, false, false, false], rng);
  return numbers.map((value, i) => {
    const asksTens = asks[i];
    const answer = asksTens ? tensOf(value) : onesOf(value);
    const other = asksTens ? onesOf(value) : tensOf(value);
    const near = shuffle([answer + 1, answer - 1, answer + 2, answer - 2], rng).find((d) => {
      if (d < 0 || d > 9 || d === other) return false;
      const sorted = [answer, other, d].sort((x, y) => x - y);
      return !(sorted[1] === answer && sorted[2] - sorted[0] === 2);
    });
    return { value, asksTens, answer, options: shuffle([answer, other, near], rng), picture: blockPicture(value) };
  });
}

/**
 * Level 2: "6 tens and 2 ones" to a number, nothing drawn. The digit swap is
 * always an option. One question in six may have no ones (80), where the
 * swap is the one-digit 8.
 */
export function buildPartsToNumberQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const tens = randInt(rng, 1, 9);
    const ones = questions.some((q) => q.ones === 0) || rng() < 0.8 ? randInt(rng, 1, 9) : 0;
    const answer = fromParts(tens, ones);
    if (tens === ones || used.has(answer)) continue;
    used.add(answer);
    questions.push({ tens, ones, answer, options: shuffle([answer, ...placeValueDistractors(answer, 2, rng)], rng) });
  }
  return questions;
}

/**
 * Level 3: four numbers made from the same two digits (47, 74, 44, 77) to put
 * in order, so the order cannot be found by glancing at the digits.
 */
export function buildOrderDigitsQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const a = randInt(rng, 1, 9);
    const b = randInt(rng, 1, 9);
    const key = [a, b].sort().join();
    if (a === b || used.has(key)) continue;
    used.add(key);
    const terms = [fromParts(a, b), fromParts(b, a), fromParts(a, a), fromParts(b, b)].sort((x, y) => x - y);
    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    questions.push({ terms, cards: solved ? [...cards].reverse() : cards });
  }
  return questions;
}

/**
 * Level 4: partition in more than one way, typed.
 *
 * - "In 73, what is the 7 worth?"   -> 70   (a digit's value)
 * - "73 = 70 + ?"                   -> 3    (tens and ones)
 * - "73 = 60 + ?"                   -> 13   (one ten swapped for ten ones)
 * - "3 tens and 14 ones make?"      -> 44   (regrouping ones into a ten)
 *
 * The statutory guidance asks for 23 as both 20 + 3 and 10 + 13; the last two
 * kinds are that idea, and none of them is the plain "tens and ones" read of
 * level 2.
 */
export function buildPartitionQuestions(rng) {
  const kinds = shuffle(["worth", "split", "regroupSplit", "regroupSplit", "regroupBuild", "regroupBuild"], rng);
  const used = new Set();
  return kinds.map((kind) => {
    let question;
    do {
      question = partitionQuestion(kind, rng);
    } while (used.has(question.prompt));
    used.add(question.prompt);
    return question;
  });
}

function partitionQuestion(kind, rng) {
  const value = randInt(rng, 21, 99);
  const tens = tensOf(value);
  const ones = onesOf(value);
  if (kind === "worth" || ones === 0) {
    return { kind: "worth", value, prompt: `In the number ${value}, what is the ${tens} worth?`, answer: fromParts(tens, 0) };
  }
  if (kind === "split") {
    return { kind, value, prompt: `${value} = ${fromParts(tens, 0)} + ?`, answer: ones };
  }
  if (kind === "regroupSplit") {
    return { kind, value, prompt: `${value} = ${fromParts(tens - 1, 0)} + ?`, answer: ones + 10 };
  }
  return { kind, value, prompt: `What number is ${tens - 1} ${tens - 1 === 1 ? "ten" : "tens"} and ${ones + 10} ones?`, answer: value };
}
