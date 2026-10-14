/**
 * Pure question data for "Counting Forwards and Backwards".
 *
 * This topic and "Counting in Steps" share a statutory bullet, so they are
 * deliberately split by difficulty rather than content: Counting in Steps owns
 * the multiples (2s, 3s, 5s, 10s), and this topic owns counting on and back in
 * 1s and 10s — especially across a tens boundary, which is where the count
 * actually breaks down.
 */

import { shuffle } from "./countingInSteps.js";

/** Where the count lands. Negative `by` counts backwards. */
export function countOn(start, by) {
  return start + by;
}

/**
 * Whether the count steps over (or onto) a multiple of ten.
 *
 * 68 → 72 crosses 70; 61 → 65 does not. Landing exactly on the ten counts,
 * because "sixty-nine, seventy" is the step children lose.
 */
export function crossesTen(start, by) {
  const end = countOn(start, by);
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  // Is there a multiple of ten strictly above `low` and at or below `high`?
  return Math.floor(high / 10) > Math.floor(low / 10);
}

/** Starts that sit within two of a ten, so any small count crosses one. */
export const BOUNDARY_STARTS = [
  8, 9, 18, 19, 28, 31, 39, 41, 48, 52, 59, 61, 68, 72, 79, 81, 88, 91, 98,
];

/**
 * Miscounting shows up as being one out - counting the starting number itself
 * - or ten out, from losing track at the tens boundary (69, 60 instead of 69,
 * 70). Not random values.
 *
 * The one-out slip goes up or down at random, and the second wrong answer is
 * either ten out or a two-out slip on the OTHER side, so the answer is never
 * the middle of three consecutive numbers. Options stay within 0 to 100.
 */
export function countingDistractors(answer, count, rng = () => 0) {
  const sign = rng() < 0.5 ? 1 : -1;
  const ten = rng() < 0.5 ? 10 : -10;
  const second = rng() < 0.5 ? [answer + ten, answer - sign * 2] : [answer - sign * 2, answer + ten];
  const candidates = [
    answer + sign,
    ...second,
    answer - ten,
    answer + sign * 3,
    answer - sign * 3,
    answer + 4,
    answer - 4,
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

/**
 * A start and a count of 3 to 6 that cross (or land on) a ten, staying within
 * 10 to 99. `back` counts backwards.
 */
function crossingCount(rng, back) {
  for (;;) {
    const by = randInt(rng, 3, 6);
    const start = back ? randInt(rng, 10 + by, 99) : randInt(rng, 10, 99 - by);
    if (crossesTen(start, back ? -by : by)) return { start, by: back ? -by : by };
  }
}

/** Six counts with different starts, each crossing a ten. */
function sixCounts(rng, back) {
  const used = new Set();
  const plans = [];
  while (plans.length < 6) {
    const plan = crossingCount(rng, back);
    if (used.has(plan.start)) continue;
    used.add(plan.start);
    plans.push(plan);
  }
  return plans;
}

/** Level 1: count on 3 to 6 along a visible line, always across a ten. */
export function buildCountOnQuestions(rng) {
  return sixCounts(rng, false).map(({ start, by }) => {
    const answer = countOn(start, by);
    // The run the learner counts along, starting two before.
    const terms = Array.from({ length: by + 3 }, (_, i) => start - 2 + i);
    return { start, by, answer, terms, highlight: 2, options: shuffle([answer, ...countingDistractors(answer, 2, rng)], rng) };
  });
}

/** Level 2: count back 3 to 6 with nothing drawn, always across a ten. */
export function buildCountBackQuestions(rng) {
  return sixCounts(rng, true).map(({ start, by }) => {
    const answer = countOn(start, by);
    return { start, by, answer, options: shuffle([answer, ...countingDistractors(answer, 2, rng)], rng) };
  });
}

/**
 * Level 3: put a whole count of six numbers in order. Three count back and
 * three count on, and every count crosses a ten.
 */
export function buildCountOrderQuestions(rng) {
  const directions = shuffle(["back", "back", "back", "on", "on", "on"], rng);
  const used = new Set();
  return directions.map((direction) => {
    let from;
    let to;
    do {
      // Six numbers either side of a ten: 72 down to 67, or 47 up to 52.
      const ten = 10 * randInt(rng, 2, 9);
      const past = randInt(rng, 0, 4);
      from = direction === "back" ? ten + past : ten - 1 - past;
      to = direction === "back" ? from - 5 : from + 5;
    } while (used.has(`${direction}${from}`) || to > 99);
    used.add(`${direction}${from}`);
    const step = direction === "back" ? -1 : 1;
    const terms = Array.from({ length: 6 }, (_, i) => from + step * i);
    return { direction, from, to, terms, cards: unsolvedCards(terms, rng) };
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
 * Stories where the direction has to be read from the words. `n` is always 3
 * or more, so every noun is plural.
 */
const STORIES = [
  { back: false, text: (a, n) => `There are ${a} cars in a car park. ${n} more cars drive in. How many cars are there now?` },
  { back: false, text: (a, n, p) => `${p.name} is on step ${a}. ${cap(p.they)} climbs up ${n} more steps. Which step is ${p.they} on now?` },
  { back: false, text: (a, n) => `There are ${a} fish in a tank. ${n} more fish are put in. How many fish are there now?` },
  { back: false, text: (a, n) => `A bus has ${a} people on it. ${n} more people get on. How many people are on the bus now?` },
  { back: true, text: (a, n) => `A tower has ${a} bricks. ${n} bricks fall off. How many bricks are left?` },
  { back: true, text: (a, n) => `A shop has ${a} apples. ${n} apples are sold. How many apples are left?` },
  { back: true, text: (a, n, p) => `${p.name} is on page ${a} of a book. ${cap(p.they)} turns back ${n} pages. Which page is ${p.they} on now?` },
  { back: true, text: (a, n) => `There are ${a} birds in a tree. ${n} birds fly away. How many birds are left?` },
];

/** Level 4: three count-on and three count-back stories, typed. */
export function buildCountingStoryQuestions(rng) {
  const on = shuffle(STORIES.filter((s) => !s.back), rng).slice(0, 3);
  const back = shuffle(STORIES.filter((s) => s.back), rng).slice(0, 3);
  const used = new Set();
  return shuffle([...on, ...back], rng).map((story) => {
    let plan;
    do {
      plan = crossingCount(rng, story.back);
    } while (used.has(plan.start));
    used.add(plan.start);
    const person = PEOPLE[randInt(rng, 0, PEOPLE.length - 1)];
    const n = Math.abs(plan.by);
    return { back: story.back, start: plan.start, by: plan.by, prompt: story.text(plan.start, n, person), answer: countOn(plan.start, plan.by) };
  });
}
