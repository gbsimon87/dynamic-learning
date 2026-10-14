/**
 * Pure question data for the "Counting More and Less" topic.
 *
 * Year 2 works to 100 and has no negative numbers, so every helper here keeps
 * its output at zero or above.
 */

import { shuffle } from "./countingInSteps.js";

/** The jumps this topic teaches, in the order a child meets them. */
export const CHANGES = [1, -1, 10, -10, 5, -5];

export function applyChange(start, change) {
  return start + change;
}

/** "10 less" rather than "-10" — the words a teacher would use. */
export function describeChange(change) {
  return `${Math.abs(change)} ${change < 0 ? "less" : "more"}`;
}

/**
 * Five consecutive numbers centred on `n`, shifted right if centring would
 * show negatives.
 */
export function neighbourStrip(n) {
  const start = Math.max(0, n - 2);
  return Array.from({ length: 5 }, (_, i) => start + i);
}

/**
 * The mistakes this topic actually produces: applying the jump backwards,
 * overshooting by a second jump, changing the wrong column (34 + 10 -> 35) or
 * slipping by one. Random numbers would be discarded without counting.
 *
 * The backwards answer always leads. Which near miss joins it is chosen by
 * `rng`, so the correct answer is not always the same place among the
 * options. Options stay within 0 to 100.
 */
export function moreLessDistractors(start, change, count, rng = () => 0) {
  const answer = applyChange(start, change);
  const step = Math.abs(change);
  const sign = Math.sign(change);
  const slip = answer + (rng() < 0.5 ? 1 : -1);
  const tenOut = answer + (rng() < 0.5 ? 10 : -10);
  const overshoot = applyChange(start, 2 * change);

  let near;
  if (step === 1) near = [overshoot, tenOut];
  else if (step === 10) near = [start + sign, overshoot, slip]; // ones changed instead of tens
  else near = [overshoot, slip, tenOut];
  if (rng() < 0.5) near.reverse();

  const candidates = [
    applyChange(start, -change), // went the wrong way
    ...near,
    answer + 1,
    answer - 1,
    answer + 10,
    answer - 10,
    answer + 2,
    answer - 2,
  ];

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
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

/** Cards for `terms`, shuffled and never already in order. */
function unsolvedCards(terms, rng) {
  const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
  const solved = cards.every((card, i) => card.id === terms[i]);
  return solved ? [...cards].reverse() : cards;
}

/** A two-digit start whose result after `change` is also 10 to 99. */
function startFor(change, rng, used) {
  for (;;) {
    const start = randInt(rng, Math.max(10, 10 - change), Math.min(99, 99 - change));
    if (!used.has(start)) {
      used.add(start);
      return start;
    }
  }
}

/** Level 1: 1 more or 1 less with a strip of neighbours, three of each. */
export function buildOneMoreLessQuestions(rng) {
  const used = new Set();
  return shuffle([1, 1, 1, -1, -1, -1], rng).map((change) => {
    const start = startFor(change, rng, used);
    const answer = applyChange(start, change);
    const strip = neighbourStrip(start);
    return {
      start,
      change,
      answer,
      strip,
      highlight: strip.indexOf(start),
      options: shuffle([answer, ...moreLessDistractors(start, change, 2, rng)], rng),
    };
  });
}

/** Level 2: a rule machine - two worked pairs, one to finish - for each change. */
export function buildRuleMachineQuestions(rng) {
  return shuffle(CHANGES, rng).map((change) => {
    const used = new Set();
    const [a, b, c] = [0, 1, 2].map(() => startFor(change, rng, used));
    const answer = applyChange(c, change);
    return {
      change,
      pairs: [
        { in: a, out: applyChange(a, change) },
        { in: b, out: applyChange(b, change) },
      ],
      unknownIn: c,
      answer,
      options: shuffle([answer, ...moreLessDistractors(c, change, 2, rng)], rng),
    };
  });
}

const CHAIN_LENGTH = 5;

/** Level 3: five numbers to order by applying each change four times. */
export function buildRuleChainQuestions(rng) {
  return shuffle(CHANGES, rng).map((change) => {
    const span = change * (CHAIN_LENGTH - 1);
    const start = randInt(rng, Math.max(10, 10 - span), Math.min(99, 99 - span));
    const terms = Array.from({ length: CHAIN_LENGTH }, (_, i) => applyChange(start, change * i));
    return { start, change, terms, cards: unsolvedCards(terms, rng) };
  });
}

const PEOPLE = [
  { name: "Mia", they: "she" },
  { name: "Sam", they: "he" },
  { name: "Ella", they: "she" },
  { name: "Tom", they: "he" },
  { name: "Zara", they: "she" },
  { name: "Ali", they: "he" },
];

const cap = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * Stories where the jump has to be read from the words. `sign` is whether the
 * answer is more (+1) or less (-1) than the number in the story; the last two
 * run the comparison backwards, the hardest shape in this topic.
 */
const STORIES = [
  { sign: 1, text: (a, n, p) => `${p.name} has ${a} stickers. ${cap(p.they)} gets ${n} more. How many stickers does ${p.they} have now?` },
  { sign: -1, text: (a, n) => `There are ${a} books on a shelf. ${n} ${n === 1 ? "book is" : "books are"} taken off. How many books are on the shelf now?` },
  { sign: 1, text: (a, n, p, q) => `${p.name} has ${a} marbles. ${q.name} has ${n} more than ${p.name}. How many marbles does ${q.name} have?` },
  { sign: -1, text: (a, n, p, q) => `${p.name} scored ${a} points. ${q.name} scored ${n} fewer ${n === 1 ? "point" : "points"}. How many points did ${q.name} score?` },
  { sign: -1, text: (a, n, p, q) => `${p.name} has ${a} cards. That is ${n} more than ${q.name}. How many cards does ${q.name} have?` },
  { sign: 1, text: (a, n, p, q) => `${p.name} has ${a} shells. That is ${n} fewer than ${q.name}. How many shells does ${q.name} have?` },
];

/** Level 4: six stories, each with a 1, 5 or 10 jump, typed. */
export function buildMoreLessStoryQuestions(rng) {
  const jumps = shuffle([1, 1, 10, 10, 5, 5], rng);
  const used = new Set();
  return shuffle(STORIES, rng).map((story, i) => {
    const n = jumps[i];
    const change = story.sign * n;
    const a = startFor(change, rng, used);
    const [p, q] = shuffle(PEOPLE, rng);
    return { prompt: story.text(a, n, p, q), start: a, change, answer: applyChange(a, change) };
  });
}
