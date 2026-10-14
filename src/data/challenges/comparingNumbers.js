/**
 * Pure question data for the "Less Than, Greater Than and Equal To" topic.
 */

import { shuffle } from "./countingInSteps.js";

export const SYMBOLS = ["<", ">", "="];

/** The one symbol that makes `left ? right` true. */
export function compareSymbol(left, right) {
  if (left < right) return "<";
  if (left > right) return ">";
  return "=";
}

/** Whether the statement the learner assembled is true. */
export function isTrueStatement(left, symbol, right) {
  switch (symbol) {
    case "<":
      return left < right;
    case ">":
      return left > right;
    case "=":
      return left === right;
    default:
      return false;
  }
}

/**
 * Strictly between, both ends excluded: "greater than 25 and less than 30"
 * is not satisfied by 25 or 30, and that boundary is the whole point of the
 * question.
 */
export function betweenBounds(value, low, high) {
  return value > low && value < high;
}

// ---------------------------------------------------------------------------
// Generated questions. Each builder takes `rng` so runs differ per mount while
// tests stay deterministic. Every number is within 0 to 100.
// ---------------------------------------------------------------------------

/** A whole number from `low` to `high`, both included. */
function randInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

const swapDigits = (n) => (n % 10) * 10 + Math.floor(n / 10);

/**
 * The pairs worth comparing, by the trap each sets:
 * - swap:     57 and 75, the same digits in a different order
 * - sameTens: 34 and 38, where only the ones decide
 * - equal:    46 and 46
 * - oneDigit: 6 and 60, a one-digit number against its ten
 * - nearTen:  49 and 51, either side of a ten
 * - far:      any two two-digit numbers
 */
function comparePair(kind, rng) {
  switch (kind) {
    case "swap": {
      let n;
      do n = randInt(rng, 12, 98);
      while (n % 10 === 0 || n % 10 === Math.floor(n / 10));
      return [n, swapDigits(n)];
    }
    case "sameTens": {
      const tens = 10 * randInt(rng, 1, 9);
      const a = randInt(rng, 0, 9);
      let b;
      do b = randInt(rng, 0, 9);
      while (b === a);
      return [tens + a, tens + b];
    }
    case "equal": {
      const n = randInt(rng, 10, 99);
      return [n, n];
    }
    case "oneDigit": {
      const d = randInt(rng, 2, 9);
      return [d, d * 10];
    }
    case "nearTen": {
      const ten = 10 * randInt(rng, 2, 9);
      return [ten - randInt(rng, 1, 3), ten + randInt(rng, 1, 3)];
    }
    default: {
      const a = randInt(rng, 10, 99);
      let b;
      do b = randInt(rng, 10, 99);
      while (b === a);
      return [a, b];
    }
  }
}

/**
 * Level 1: choose <, > or = between two numbers. One pair of each kind, each
 * either way round, with at least one of each symbol as the answer.
 */
export function buildPickSymbolQuestions(rng) {
  for (;;) {
    const questions = shuffle(["swap", "sameTens", "equal", "oneDigit", "nearTen", "far"], rng).map((kind) => {
      const pair = comparePair(kind, rng);
      const [left, right] = rng() < 0.5 ? pair : [pair[1], pair[0]];
      return { kind, left, right, answer: compareSymbol(left, right) };
    });
    const answers = new Set(questions.map((q) => q.answer));
    const pairs = new Set(questions.map((q) => `${q.left},${q.right}`));
    if (answers.size === 3 && pairs.size === 6) return questions;
  }
}

/**
 * Level 2: the symbol is given, the number is missing. Exactly one option
 * makes the statement true. The wrong options are the bound itself (34 < 34,
 * the mistake worth making here) and a number on the wrong side - the digit
 * swap where it falls there, otherwise a near miss. For "=", the wrong options
 * are the swap and a number one or ten out.
 */
export function buildPickNumberQuestions(rng) {
  const symbols = shuffle(["<", "<", ">", ">", "=", "="], rng);
  const used = new Set();
  return symbols.map((symbol) => {
    let left;
    do left = randInt(rng, 12, 88);
    while (used.has(left) || left % 10 === Math.floor(left / 10));
    used.add(left);
    const swap = swapDigits(left);
    let answer;
    let wrong;
    if (symbol === "=") {
      answer = left;
      const near = left + (rng() < 0.5 ? 1 : -1) * (rng() < 0.5 ? 1 : 10);
      wrong = [swap === left ? left + 10 : swap, near];
    } else {
      const bigger = symbol === "<";
      answer = left + (bigger ? 1 : -1) * randInt(rng, 1, 9);
      const swapIsWrong = bigger ? swap < left : swap > left;
      const wrongSide = swapIsWrong ? swap : left + (bigger ? -1 : 1) * randInt(rng, 1, 9);
      wrong = [left, wrongSide];
    }
    return { left, symbol, answer, options: shuffle([answer, ...wrong], rng) };
  });
}

/**
 * Level 3: four numbers to arrange into a true chain. Three chains use <
 * (smallest first) and three use > (largest first). Each set mixes a digit
 * swap with numbers sharing a digit, so the order has to be read column by
 * column: 45, 54, 40, 50 or 33, 13, 31, 3.
 */
export function buildChainQuestions(rng) {
  const symbols = shuffle(["<", "<", "<", ">", ">", ">"], rng);
  const used = new Set();
  return symbols.map((symbol) => {
    let set;
    let key;
    do {
      const a = randInt(rng, 1, 9);
      let b;
      do b = randInt(rng, 1, 9);
      while (b === a);
      set = rng() < 0.5 ? [a * 10 + b, b * 10 + a, a * 10, b * 10] : [a * 10 + b, b * 10 + a, a * 10 + a, b];
      key = [...set].sort((x, y) => x - y).join();
    } while (used.has(key) || new Set(set).size < 4);
    used.add(key);
    const terms = [...set].sort((x, y) => (symbol === "<" ? x - y : y - x));
    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    return { symbol, terms, cards: solved ? [...cards].reverse() : cards };
  });
}

/**
 * Level 4: type any number strictly between two bounds. The gap is 3 to 7, so
 * there are 2 to 6 right answers; some questions name the upper bound first.
 */
export function buildBetweenQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const low = randInt(rng, 10, 90);
    const high = low + randInt(rng, 3, 7);
    if (high > 99 || used.has(low)) continue;
    used.add(low);
    questions.push({ low, high, lowFirst: rng() < 0.5 });
  }
  return questions;
}
