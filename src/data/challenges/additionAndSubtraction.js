/**
 * Pure question data for the "Number - Addition and Subtraction" category.
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): facts to 20 fluently and
 * related facts to 100; adding and subtracting a two-digit number and 1s, and
 * 10s, and two two-digit numbers; adding 3 one-digit numbers; commutativity of
 * addition but not subtraction; and the inverse relationship used to check
 * calculations and solve missing number problems.
 */

import { shuffle } from "./countingInSteps.js";

/** The doubles a Year 2 learner is expected to know. */
export const DOUBLES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export function double(n) {
  return n * 2;
}

export function half(n) {
  return n / 2;
}

/**
 * The related fact up to 100: 3 + 7 = 10 becomes 30 + 70 = 100.
 *
 * This is the statutory "derive and use related facts up to 100", and the
 * point is that the learner already knows the small fact.
 */
export function relatedFactTo100(a, b) {
  return { a: a * 10, b: b * 10, total: (a + b) * 10 };
}

/**
 * Wrong answers for a sum: a slip of one or two from miscounting, and ten out
 * from carrying wrongly. Never random, never negative, never the answer itself.
 *
 * The slip's direction and size are chosen by `rng`, and the second wrong
 * answer is never the mirror slip, so the three options are never three
 * consecutive numbers with the answer in the middle - a layout a child learns
 * to pick without doing any maths. Pass `{ tens: false }` for small answers,
 * where a ten-out option would be eliminated at a glance; the second wrong
 * answer is then a slip of the other size on the other side.
 */
export function sumDistractors(answer, count, rng = () => 0, { tens = true } = {}) {
  const sign = rng() < 0.5 ? 1 : -1;
  const small = rng() < 0.5 ? 1 : 2;
  const ten = rng() < 0.5 ? 10 : -10;
  const other = 3 - small;

  const candidates = tens
    ? [answer + sign * small, answer + ten, answer - ten, answer - sign * other, answer + 20, answer - 20]
    : [answer + sign * small, answer - sign * other, answer + sign * 3, answer - sign * 3, answer + 10];

  return pickDistinct(answer, count, [...candidates, answer + 3, answer + 4, answer - 4, answer + 5, answer - 5, answer + 11]);
}

/**
 * The first `count` candidates that are new, non-negative, not `answer`, and
 * within 100 when the answer is (Year 2 works to 100).
 */
function pickDistinct(answer, count, candidates) {
  const max = answer <= 100 ? 100 : Infinity;
  const seen = new Set([answer]);
  const wrong = [];
  for (const candidate of candidates) {
    if (candidate < 0 || candidate > max || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }
  return wrong;
}

/** A whole number from `low` to `high`, both included. */
export function randInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

/**
 * Wrong answers for "double n": the double of a neighbour (two out, because
 * double 6 and double 7 are easily mixed up), forgetting to double at all, or
 * one out from miscounting the two groups.
 */
export function doublingDistractors(n, rng) {
  const answer = double(n);
  const neighbour = answer + (rng() < 0.5 ? 2 : -2);
  const second = rng() < 0.5 ? n : answer + (neighbour > answer ? -1 : 1);
  return pickDistinct(answer, 2, [neighbour, second, answer - (neighbour - answer), answer + 1, answer + 3]);
}

/**
 * Wrong answers for "half of n": one out, and either the double (halving
 * confused with doubling) or the half of a neighbouring even number.
 */
export function halvingDistractors(n, rng) {
  const answer = half(n);
  const slip = answer + (rng() < 0.5 ? 1 : -1);
  const second = rng() < 0.5 && double(n) <= 100 ? double(n) : answer + (slip > answer ? -2 : 2);
  return pickDistinct(answer, 2, [slip, second, answer + 3, answer + 4]);
}

/** Three-option choice built from an answer and its wrong options, shuffled. */
function withOptions(answer, wrong, rng) {
  return shuffle([answer, ...wrong], rng);
}

// ---------------------------------------------------------------------------
// Doubling and halving using addition and subtraction
// ---------------------------------------------------------------------------

/** Level 1: double 1-10 with both groups drawn. */
export function buildDoublingQuestions(rng) {
  return shuffle(DOUBLES, rng)
    .slice(0, 6)
    .map((n) => ({ n, answer: double(n), options: withOptions(double(n), doublingDistractors(n, rng), rng) }));
}

/** The even numbers Year 2 halves from known doubles: 4 to 20. */
export const HALVING_NUMBERS = [4, 6, 8, 10, 12, 14, 16, 18, 20];

/** Level 2: half of an even number to 20, nothing drawn. */
export function buildHalvingQuestions(rng) {
  return shuffle(HALVING_NUMBERS, rng)
    .slice(0, 6)
    .map((n) => ({ n, answer: half(n), options: withOptions(half(n), halvingDistractors(n, rng), rng) }));
}

/**
 * Every doubling chain of four terms where each number doubled is at most 20,
 * the doubles a Year 2 learner knows: 1, 2, 4, 8 up to 5, 10, 20, 40.
 */
export const DOUBLING_CHAINS = [1, 2, 3, 4, 5].map((start) => {
  const terms = [start];
  while (terms.length < 4) terms.push(double(terms[terms.length - 1]));
  return terms;
});

/**
 * Level 3: order a doubling chain, or the same chain read as halving.
 *
 * Three of each, so the learner applies both rules over a whole chain. The
 * cards never start in the solved order.
 */
export function buildDoublingChainQuestions(rng) {
  const starts = shuffle(DOUBLING_CHAINS, rng);
  const modes = shuffle(["double", "double", "double", "halve", "halve", "halve"], rng);
  // Five chains, six questions: each chain appears at most once per mode.
  const halving = shuffle(DOUBLING_CHAINS, rng);
  let d = 0;
  let h = 0;
  return modes.map((mode) => {
    const chain = mode === "double" ? starts[d++] : halving[h++];
    const terms = mode === "double" ? chain : [...chain].reverse();
    return { mode, start: terms[0], terms, cards: unsolvedCards(terms, rng) };
  });
}

/** Shuffled `{id, label}` cards for `terms`, never already in order. */
export function unsolvedCards(terms, rng) {
  const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
  const solved = cards.every((card, i) => card.id === terms[i]);
  return solved ? [...cards].reverse() : cards;
}

/**
 * Level 4: use a doubling or halving fact you know to work out one you don't.
 *
 * - double 3 = 6, so double 30 = ?        (tens work like ones)
 * - half of 8 = 4, so half of 80 = ?
 * - double 6 = 12, so 6 + 7 = ?            (near double: one more)
 * - double 8 = 16, so 8 + 7 = ?            (near double: one less)
 */
export function buildUseDoublesQuestions(rng) {
  const kinds = shuffle(["doubleTens", "doubleTens", "halfTens", "halfTens", "nearMore", "nearLess"], rng);
  const used = new Set();
  const questions = [];

  for (const kind of kinds) {
    let question;
    do {
      question = knownFactQuestion(kind, rng);
    } while (used.has(question.prompt));
    used.add(question.prompt);
    questions.push(question);
  }
  return questions;
}

function knownFactQuestion(kind, rng) {
  if (kind === "doubleTens") {
    const n = randInt(rng, 1, 5);
    return { kind, known: `double ${n} = ${double(n)}`, prompt: `So what is double ${n * 10}?`, answer: double(n * 10) };
  }
  if (kind === "halfTens") {
    const n = 2 * randInt(rng, 1, 5);
    return { kind, known: `half of ${n} = ${half(n)}`, prompt: `So what is half of ${n * 10}?`, answer: half(n * 10) };
  }
  const n = randInt(rng, 3, 9);
  if (kind === "nearMore") {
    return { kind, known: `double ${n} = ${double(n)}`, prompt: `So what is ${n} + ${n + 1}?`, answer: n + n + 1 };
  }
  return { kind, known: `double ${n} = ${double(n)}`, prompt: `So what is ${n} + ${n - 1}?`, answer: n + n - 1 };
}

// ---------------------------------------------------------------------------
// Solving number problems
// ---------------------------------------------------------------------------

export const PEOPLE = [
  { name: "Mia", they: "she", them: "her" },
  { name: "Sam", they: "he", them: "him" },
  { name: "Ella", they: "she", them: "her" },
  { name: "Tom", they: "he", them: "him" },
  { name: "Zara", they: "she", them: "her" },
  { name: "Ali", they: "he", them: "him" },
];

const cap = (word) => word.charAt(0).toUpperCase() + word.slice(1);

/**
 * One-step stories. `op` is what the story needs; `unit` is shown on every
 * answer option when the story is about a measure.
 */
const ONE_STEP = [
  { op: "+", text: (a, b) => `There are ${a} red apples and ${b} green apples. How many apples are there altogether?` },
  { op: "+", text: (a, b, p) => `${p.name} has ${a} stickers. ${cap(p.they)} is given ${b} more. How many stickers does ${p.they} have now?` },
  { op: "+", unit: "cm", text: (a, b) => `A red ribbon is ${a} cm long. A blue ribbon is ${b} cm long. How long are they together?` },
  { op: "+", text: (a, b) => `${a} birds sit on a fence. ${b} more birds land. How many birds are there now?` },
  { op: "-", text: (a, b, p) => `${p.name} has ${a} stickers. ${cap(p.they)} gives ${b} away. How many stickers are left?` },
  { op: "-", unit: "ml", text: (a, b) => `A jug holds ${a} ml of juice. ${b} ml is poured out. How much juice is left?` },
  { op: "-", text: (a, b) => `There are ${a} children in the park. ${b} go home. How many children are left?` },
  { op: "-", text: (a, b) => `A bag has ${a} sweets. ${b} are eaten. How many sweets are left?` },
];

/** "12 ml" for a measure, the bare number otherwise. */
export function withUnit(n, unit) {
  return unit ? `${n} ${unit}` : n;
}

/**
 * Level 1: one-step stories within 20, three to add and three to take away.
 *
 * The wrong options are the other operation's answer (choosing the wrong
 * operation is the mistake this level is about) and a counting slip.
 */
export function buildOneStepQuestions(rng) {
  const adds = shuffle(ONE_STEP.filter((s) => s.op === "+"), rng).slice(0, 3);
  const takes = shuffle(ONE_STEP.filter((s) => s.op === "-"), rng).slice(0, 3);

  return shuffle([...adds, ...takes], rng).map((story) => {
    const person = PEOPLE[randInt(rng, 0, PEOPLE.length - 1)];
    let a;
    let b;
    let answer;
    let wrongOp;
    if (story.op === "+") {
      a = randInt(rng, 6, 14);
      b = randInt(rng, 2, Math.min(9, 20 - a));
      if (b >= a) b = a - 1;
      answer = a + b;
      wrongOp = a - b;
    } else {
      a = randInt(rng, 11, 20);
      b = randInt(rng, 2, 9);
      answer = a - b;
      wrongOp = a + b;
    }
    const slip = sumDistractors(answer, 1, rng, { tens: false });
    const wrong = [wrongOp, ...slip.filter((n) => n !== wrongOp)];
    if (wrong.length < 2) wrong.push(...sumDistractors(answer, 3, rng, { tens: false }).filter((n) => !wrong.includes(n)));
    const numbers = withOptions(answer, wrong.slice(0, 2), rng);
    return {
      prompt: story.text(a, b, person),
      op: story.op,
      a,
      b,
      answer: withUnit(answer, story.unit),
      options: numbers.map((n) => withUnit(n, story.unit)),
    };
  });
}

/**
 * Level 2: swap the numbers - is the answer still the same?
 *
 * Three additions (yes: adding can be done in any order) and three take-aways
 * (no: 9 − 4 is 5, but 4 − 9 is not). The learner sees the fact and the
 * swapped calculation side by side, so the rule is met head-on rather than
 * hidden in an unrelated sum.
 */
export const SWAP_OPTIONS = ["Yes, it is the same", "No, it is not"];

export function buildSwapQuestions(rng) {
  const ops = shuffle(["+", "+", "+", "-", "-", "-"], rng);
  const used = new Set();
  return ops.map((op) => {
    let a;
    let b;
    do {
      if (op === "+") {
        a = randInt(rng, 3, 15);
        b = randInt(rng, 2, 9);
      } else {
        a = randInt(rng, 8, 20);
        b = randInt(rng, 2, 7);
      }
    } while (a === b || used.has(`${op}${a},${b}`));
    used.add(`${op}${a},${b}`);
    const sign = op === "+" ? "+" : "−";
    const result = op === "+" ? a + b : a - b;
    return {
      op,
      fact: `${a} ${sign} ${b} = ${result}`,
      swapped: `${b} ${sign} ${a}`,
      result,
      answer: op === "+" ? SWAP_OPTIONS[0] : SWAP_OPTIONS[1],
    };
  });
}

/** "12 − 8" or "12 - 8" -> 4. Only `a + b` and `a − b` shapes appear. */
export function evaluate(expression) {
  const [left, operator, right] = expression.split(" ");
  return operator === "+" ? Number(left) + Number(right) : Number(left) - Number(right);
}

/**
 * Level 3: four calculations within 20 - two sums, two differences - to order
 * by their answers. Every answer is different, so exactly one order is right.
 */
export function buildOrderByAnswerQuestions(rng) {
  const questions = [];
  const seenSets = new Set();
  while (questions.length < 6) {
    const answers = new Set();
    const set = [];
    for (const op of ["+", "+", "−", "−"]) {
      let expression;
      let value;
      do {
        if (op === "+") {
          const a = randInt(rng, 2, 12);
          const b = randInt(rng, 2, 8);
          expression = `${a} + ${b}`;
        } else {
          const a = randInt(rng, 10, 20);
          const b = randInt(rng, 2, 9);
          expression = `${a} − ${b}`;
        }
        value = evaluate(expression);
      } while (answers.has(value));
      answers.add(value);
      set.push(expression);
    }
    const key = [...set].sort().join("|");
    if (seenSets.has(key)) continue;
    seenSets.add(key);
    const ordered = [...set].sort((x, y) => evaluate(x) - evaluate(y));
    const cards = shuffle(set.map((e) => ({ id: e, label: e })), rng);
    const solved = cards.every((card, i) => card.id === ordered[i]);
    questions.push({ ordered, cards: solved ? [...cards].reverse() : cards });
  }
  return questions;
}

/**
 * Two-step stories. `make` picks numbers that keep every step at zero or more
 * and the answer within 100; `answer` recomputes from them.
 */
const TWO_STEP = [
  {
    make: (rng) => { const a = randInt(rng, 20, 40); return [a, randInt(rng, 3, 9), randInt(rng, 2, 8)]; },
    text: ([a, b, c]) => `A box has ${a} crayons. ${b} are broken and ${c} are lost. How many crayons are still good?`,
    answer: ([a, b, c]) => a - b - c,
  },
  {
    make: (rng) => { const a = randInt(rng, 20, 50); return [a, randInt(rng, 5, 19), randInt(rng, 2, 9)]; },
    text: ([a, b, c], p) => `${p.name} had ${a}p. ${cap(p.they)} spent ${b}p, then found ${c}p. How much money does ${p.they} have now?`,
    answer: ([a, b, c]) => a - b + c,
    unit: "p",
  },
  {
    make: (rng) => [randInt(rng, 11, 19), randInt(rng, 11, 19), randInt(rng, 5, 9)],
    text: ([a, b, c]) => `There are ${a} boys and ${b} girls in a class. ${c} children go out to play. How many children are still in the class?`,
    answer: ([a, b, c]) => a + b - c,
  },
  {
    make: (rng) => [randInt(rng, 30, 60), randInt(rng, 11, 19), randInt(rng, 3, 9)],
    text: ([a, b, c]) => `A shelf had ${a} books. ${b} books were borrowed and ${c} were brought back. How many books are on the shelf now?`,
    answer: ([a, b, c]) => a - b + c,
  },
  {
    make: (rng) => { const a = randInt(rng, 10, 15); const b = randInt(rng, 5, 9); return [a, b, randInt(rng, a + b + 4, 40)]; },
    text: ([a, b, t], p) => `${p.name}'s book has ${t} pages. ${cap(p.they)} read ${a} pages, then ${b} more. How many pages are left to read?`,
    answer: ([a, b, t]) => t - a - b,
  },
  {
    make: (rng) => [randInt(rng, 12, 25), randInt(rng, 3, 9), randInt(rng, 3, 9)],
    text: ([a, b, c]) => `There were ${a} ducks on a pond. ${b} flew away and ${c} more arrived. How many ducks are on the pond now?`,
    answer: ([a, b, c]) => a - b + c,
  },
  {
    make: (rng) => { const t = 10 * randInt(rng, 4, 6); return [t, randInt(rng, 11, 18), randInt(rng, 11, 18)]; },
    text: ([t, a, b]) => `A jar has ${t} beads. ${a} are red and ${b} are blue. The rest are green. How many beads are green?`,
    answer: ([t, a, b]) => t - a - b,
  },
  {
    make: (rng) => [randInt(rng, 20, 35), randInt(rng, 5, 12), randInt(rng, 5, 12)],
    text: ([a, b, c]) => `A tin held ${a} sweets. ${b} were eaten, then ${c} more were put in. How many sweets are in the tin now?`,
    answer: ([a, b, c]) => a - b + c,
  },
];

/** Level 4: six different two-step stories with fresh numbers, typed. */
export function buildTwoStepQuestions(rng) {
  return shuffle(TWO_STEP, rng)
    .slice(0, 6)
    .map((story) => {
      const numbers = story.make(rng);
      const person = PEOPLE[randInt(rng, 0, PEOPLE.length - 1)];
      return { prompt: story.text(numbers, person), answer: story.answer(numbers), numbers, unit: story.unit };
    });
}

// ---------------------------------------------------------------------------
// Using two-digit numbers
// ---------------------------------------------------------------------------

/** Level 1: a two-digit number + ones (3-8) that crosses the next ten. */
export function buildAddOnesQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const add = randInt(rng, 3, 8);
    const tens = randInt(rng, 1, 8);
    // Ones digit high enough that adding crosses (or lands on) the next ten.
    const start = tens * 10 + randInt(rng, 10 - add, 9);
    if (used.has(start)) continue;
    used.add(start);
    const answer = start + add;
    const terms = Array.from({ length: add + 3 }, (_, i) => start - 2 + i);
    questions.push({ start, add, answer, terms, options: withOptions(answer, sumDistractors(answer, 2, rng), rng) });
  }
  return questions;
}

/**
 * Wrong answers for adding or taking tens: the answer one ten out (a ten
 * miscounted) and the start with the ones changed instead of the tens
 * (34 + 20 -> 36), the place-value error this level exists to catch.
 */
export function tensDistractors(start, change, rng) {
  const answer = start + change;
  const tenOut = answer + (rng() < 0.5 ? 10 : -10);
  const onesChanged = start + change / 10;
  const candidates = [tenOut, onesChanged, answer - (tenOut - answer), answer + 1, answer - 1];
  return pickDistinct(answer, 2, candidates.filter((n) => n <= 99));
}

/** Level 2: add or take 10, 20 or 30; three of each, answers within 10-99. */
export function buildTensQuestions(rng) {
  const changes = shuffle([10, 20, 30, -10, -20, -30], rng);
  const used = new Set();
  return changes.map((change) => {
    let start;
    do {
      start = change > 0 ? randInt(rng, 11, 99 - change) : randInt(rng, 10 - change + 1, 99);
    } while (start % 10 === 0 || used.has(start));
    used.add(start);
    const answer = start + change;
    return { start, change, answer, options: withOptions(answer, tensDistractors(start, change, rng), rng) };
  });
}

/**
 * Level 3: three one-digit numbers, two of which make 10. The third never
 * makes 10 with either of them, so exactly one pair is right (in either
 * order).
 */
export function buildMakeTenQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const k = randInt(rng, 1, 9);
    const pair = [k, 10 - k];
    let third;
    do {
      third = randInt(rng, 1, 9);
    } while (third === k || third === 10 - k);
    const triple = [...pair, third];
    const key = [...triple].sort((x, y) => x - y).join(",");
    if (used.has(key)) continue;
    used.add(key);
    let cards = shuffle(triple.map((value, i) => ({ id: `${value}-${i}`, value, label: value })), rng);
    if (makesTenFirst(cards.map((c) => c.value))) cards = [cards[2], cards[0], cards[1]];
    questions.push({ triple, cards, total: k + (10 - k) + third });
  }
  return questions;
}

/**
 * Level 4: two two-digit numbers that cross a ten, three sums and three
 * differences, typed. Sums stay within 100.
 */
export function buildTwoDigitQuestions(rng) {
  const ops = shuffle(["+", "+", "+", "-", "-", "-"], rng);
  const used = new Set();
  return ops.map((operator) => {
    let a;
    let b;
    do {
      if (operator === "+") {
        a = randInt(rng, 15, 69);
        b = randInt(rng, 12, 99 - a);
      } else {
        a = randInt(rng, 41, 98);
        b = randInt(rng, 12, a - 10);
      }
    } while (
      used.has(`${a}${operator}${b}`) ||
      (operator === "+" ? (a % 10) + (b % 10) < 10 || a + b > 99 : a % 10 >= b % 10)
    );
    used.add(`${a}${operator}${b}`);
    return { a, b, operator, answer: operator === "+" ? a + b : a - b };
  });
}

// ---------------------------------------------------------------------------
// Solving missing number problems
// ---------------------------------------------------------------------------

/** Level 1: `known + ? = total` with totals within 20. */
export function buildMissingAddendQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const answer = randInt(rng, 3, 10);
    const known = randInt(rng, 2, 20 - answer);
    const total = known + answer;
    if (used.has(`${known}+${total}`)) continue;
    used.add(`${known}+${total}`);
    questions.push({ known, total, answer, options: withOptions(answer, sumDistractors(answer, 2, rng, { tens: false }), rng) });
  }
  return questions;
}

/**
 * The calculation that finds the box in each statement shape, and the
 * wrong-inverse mistake for it.
 *
 * Only two calculations can be made from the two numbers shown - add them or
 * take the smaller from the larger - so those are the options, always in the
 * same order. Which one is right depends on where the box is:
 *
 *   a + ? = t  and  ? + b = t   ->  t − a   (undo the add)
 *   ? − b = t                    ->  t + b   (undo the take away)
 *   a − ? = t                    ->  a − t   (the box is what was taken)
 *
 * The wrong option is the other one: adding in `a + ? = t` because "it's an
 * add", and adding in `a − ? = t` because "take away means add back" - which
 * works for `? − b = t` but not here.
 */
export function inverseOptions(shape, x, t) {
  const big = Math.max(x, t);
  const small = Math.min(x, t);
  const plus = `${big} + ${small}`;
  const minus = `${big} − ${small}`;
  const answer = shape === "?-b" ? plus : minus;
  return { options: [plus, minus], answer };
}

const SHAPES = ["a+?", "?+b", "a-?", "?-b"];

/** The statement and its missing number for a shape and two numbers. */
export function missingStatement(shape, rng, { maxTotal = 50 } = {}) {
  const missing = randInt(rng, 3, 25);
  const other = randInt(rng, 3, maxTotal - missing);
  switch (shape) {
    case "a+?":
      return { text: `${other} + ? = ${other + missing}`, shown: [other, other + missing], answer: missing };
    case "?+b":
      return { text: `? + ${other} = ${other + missing}`, shown: [other, other + missing], answer: missing };
    case "a-?":
      return { text: `${other + missing} − ? = ${other}`, shown: [other + missing, other], answer: missing };
    default:
      return { text: `? − ${other} = ${missing}`, shown: [other, missing], answer: other + missing };
  }
}

/** Level 2: pick the calculation that finds the box; every shape appears. */
export function buildPickInverseQuestions(rng) {
  const shapes = shuffle([...SHAPES, ...shuffle(SHAPES, rng).slice(0, 2)], rng);
  const used = new Set();
  return shapes.map((shape) => {
    let statement;
    do {
      statement = missingStatement(shape, rng);
    } while (used.has(statement.text) || statement.shown[0] === statement.shown[1]);
    used.add(statement.text);
    const [x, t] = statement.shown;
    const { options, answer } = inverseOptions(shape, x, t);
    return { shape, statement: statement.text, options, answer, missing: statement.answer };
  });
}

/**
 * Level 3: three numbers from a fact family (whole, part, part) to build a
 * true subtraction. The parts differ, so the cards are distinct.
 */
export function buildFactFamilyQuestions(rng) {
  const used = new Set();
  const questions = [];
  while (questions.length < 6) {
    const p = randInt(rng, 4, 25);
    const q = randInt(rng, 4, 25);
    if (p === q) continue;
    const family = [p + q, p, q];
    const key = `${p + q}:${Math.min(p, q)}`;
    if (used.has(key)) continue;
    used.add(key);
    let cards = shuffle(family.map((value) => ({ id: value, value, label: value })), rng);
    if (isTrueSubtraction(cards.map((c) => c.value))) cards = [cards[1], cards[0], cards[2]];
    questions.push({ family, cards });
  }
  return questions;
}

/** Level 4: every shape at least once, two-digit values within 100, typed. */
export function buildMissingNumberQuestions(rng) {
  const shapes = shuffle([...SHAPES, ...shuffle(SHAPES, rng).slice(0, 2)], rng);
  const used = new Set();
  return shapes.map((shape) => {
    let statement;
    do {
      statement = missingStatement(shape, rng, { maxTotal: 99 });
    } while (used.has(statement.text) || statement.answer < 11 || Math.min(...statement.shown) < 10);
    used.add(statement.text);
    return { shape, text: statement.text, answer: statement.answer };
  });
}

/**
 * True when the first two of three addends make ten.
 *
 * Reordering to make ten first is the strategy Year 2 is taught for adding 3
 * one-digit numbers, and it works precisely because addition is commutative.
 * Either order of the pair is accepted - only the pairing matters.
 */
export function makesTenFirst(order) {
  return order[0] + order[1] === 10;
}

/**
 * True when three numbers, in this order, make a true subtraction.
 *
 * Deliberately accepts both valid orders: given 15, 6 and 9 the learner may
 * build 15 - 6 = 9 or 15 - 9 = 6, and both are correct.
 */
export function isTrueSubtraction(order) {
  return order[0] - order[1] === order[2];
}

/** The number that completes `known + ? = total`, found by the inverse. */
export function missingAddend(known, total) {
  return total - known;
}
