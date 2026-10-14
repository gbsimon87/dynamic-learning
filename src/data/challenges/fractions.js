/**
 * Pure question data for the "Number - Fractions" category.
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): recognise, find, name and
 * write 1/3, 1/4, 2/4 and 3/4 of a length, shape, set of objects or quantity,
 * and recognise that 2/4 and 1/2 are the same. Nothing outside that set — no
 * fifths, eighths or tenths, which belong to later years.
 *
 * Every question must divide exactly: Year 2 does not meet remainders.
 */

import { shuffle } from "./countingInSteps.js";

/** A fraction is `{ numerator, denominator }` throughout. */
export const FRACTIONS = [
  { numerator: 1, denominator: 2 },
  { numerator: 1, denominator: 3 },
  { numerator: 1, denominator: 4 },
  { numerator: 2, denominator: 4 },
  { numerator: 3, denominator: 4 },
];

export function fractionLabel({ numerator, denominator }) {
  return `${numerator}/${denominator}`;
}

export function fractionValue({ numerator, denominator }) {
  return numerator / denominator;
}

/** `3/4 of 20` = 15. Callers must check `dividesExactly` first. */
export function fractionOf(fraction, total) {
  return (total / fraction.denominator) * fraction.numerator;
}

/** True when the whole splits into equal parts with nothing left over. */
export function dividesExactly(fraction, total) {
  return total % fraction.denominator === 0;
}

/** 2/4 and 1/2 name the same amount — the one equivalence Year 2 must know. */
export function isEquivalent(a, b) {
  return fractionValue(a) === fractionValue(b);
}

/**
 * A bar split into `denominator` parts, the first `numerator` of them shaded.
 *
 * Shaded parts lead so the bar fills from the left, which is how a fraction
 * wall is drawn and makes two bars comparable at a glance.
 */
export function barParts({ numerator, denominator }) {
  return Array.from({ length: denominator }, (_, i) => i < numerator);
}

/**
 * Wrong answers that are other fractions OF THE SAME AMOUNT.
 *
 * A child who takes a quarter instead of a half has made a real mistake and
 * should find their answer offered; a random number teaches nothing.
 */
export function fractionOfDistractors(fraction, total, count) {
  const answer = fractionOf(fraction, total);

  const candidates = FRACTIONS
    .filter((other) => dividesExactly(other, total))
    .map((other) => fractionOf(other, total));

  // Then fall back on near-misses if the fractions alone do not fill the list.
  candidates.push(answer + 1, answer - 1, answer + 2);

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
    if (candidate <= 0 || !Number.isInteger(candidate) || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}

/* ------------------------------------------------------------------------- *
 * Generators for the Year 2 challenges. Each takes `rng`; each returns six
 * questions with no repeat in a run. Every amount stays where a Year 2 child
 * can work it out: halves of even numbers, quarters by halving and halving
 * again, and thirds by sharing into 3 (the 3s are counted from 0 in Year 2).
 * ------------------------------------------------------------------------- */

export const RUN_LENGTH = 6;

const HALF = { numerator: 1, denominator: 2 };
const THIRD = { numerator: 1, denominator: 3 };
const QUARTER = { numerator: 1, denominator: 4 };
const TWO_QUARTERS = { numerator: 2, denominator: 4 };
const THREE_QUARTERS = { numerator: 3, denominator: 4 };

function pickOne(rng, items) {
  return items[Math.floor(rng() * items.length)];
}

function range(from, to, step) {
  const out = [];
  for (let n = from; n <= to; n += step) out.push(n);
  return out;
}

/** True when three options are evenly spaced with the answer in the middle. */
export function isCentredRun(options, answer) {
  if (options.length !== 3) return false;
  const sorted = options.map(Number).sort((x, y) => x - y);
  return sorted[1] === Number(answer) && sorted[1] - sorted[0] === sorted[2] - sorted[1];
}

/**
 * The same as `fractionOfDistractors`, but the order of the candidates comes
 * from `rng` and an evenly spaced run around the answer is never returned,
 * so the answer cannot be found from where it sits.
 */
export function fractionOfOptions(fraction, total, rng) {
  const answer = fractionOf(fraction, total);
  const others = shuffle(
    FRACTIONS.filter((other) => dividesExactly(other, total)).map((other) => fractionOf(other, total)),
    rng
  );
  const slips = shuffle([answer + 1, answer - 1, answer + 2, answer - 2], rng);
  const valid = [...others, ...slips, answer + 3].filter(
    (c, i, all) => c > 0 && Number.isInteger(c) && c !== answer && all.indexOf(c) === i
  );
  let wrong = valid.slice(0, 2);
  if (isCentredRun([answer, ...wrong], answer)) {
    const swap = valid.find((c) => !wrong.includes(c) && !isCentredRun([answer, wrong[0], c], answer));
    if (swap !== undefined) wrong = [wrong[0], swap];
  }
  return { answer, options: shuffle([answer, ...wrong], rng) };
}

/** A bar of `denominator` parts with `numerator` shaded in random places. */
export function scatteredBar({ numerator, denominator }, rng) {
  return shuffle(barParts({ numerator, denominator }), rng);
}

/* --- What is a Fraction? ------------------------------------------------ */

/** Two other Year 2 fractions, never one equal to the answer (2/4 vs 1/2). */
function otherFractionLabels(answer, rng) {
  const picked = [];
  for (const f of shuffle(FRACTIONS, rng)) {
    if (isEquivalent(f, answer) || picked.some((p) => isEquivalent(p, f))) continue;
    picked.push(f);
    if (picked.length === 2) break;
  }
  return picked.map(fractionLabel);
}

/**
 * Name the fraction a bar shows. Each Year 2 fraction appears once, shaded in
 * random places so position is not a clue, and a sixth question turns it
 * round: how much is NOT coloured?
 */
export function buildNameFraction(rng) {
  const named = shuffle(FRACTIONS, rng).map((fraction) => ({
    ask: "coloured",
    fraction,
    answer: fractionLabel(fraction),
    parts: scatteredBar(fraction, rng),
    options: shuffle([fractionLabel(fraction), ...otherFractionLabels(fraction, rng)], rng),
  }));
  const shaded = pickOne(rng, [QUARTER, THREE_QUARTERS]);
  const white = { numerator: 4 - shaded.numerator, denominator: 4 };
  const notColoured = {
    ask: "white",
    fraction: white,
    answer: fractionLabel(white),
    parts: scatteredBar(shaded, rng),
    options: shuffle([fractionLabel(white), ...otherFractionLabels(white, rng)], rng),
  };
  const out = [...named];
  out.splice(1 + Math.floor(rng() * 5), 0, notColoured);
  return out;
}

const NOT_EQUAL_PAIRS = [
  [QUARTER, HALF],
  [THREE_QUARTERS, HALF],
  [THIRD, HALF],
  [TWO_QUARTERS, THREE_QUARTERS],
  [QUARTER, TWO_QUARTERS],
  [THIRD, QUARTER],
  [THIRD, TWO_QUARTERS],
];

/**
 * 2/4 and 1/2 are the same amount. One question matches a bar to its other
 * name, one writes the missing number (1/2 = ?/4 or 2/4 = 1/?), and four ask
 * whether two bars show the same amount: one equal pair (in a random order)
 * and three from seven unequal pairs.
 */
export function buildEquivalence(rng) {
  const showQuarters = rng() < 0.5;
  const shown = showQuarters ? TWO_QUARTERS : HALF;
  const matchAnswer = showQuarters ? "1/2" : "2/4";
  const match = {
    kind: "match",
    parts: barParts(shown),
    answer: matchAnswer,
    options: shuffle([matchAnswer, ...shuffle(["1/4", "3/4", "1/3"], rng).slice(0, 2)], rng),
  };
  const missing = rng() < 0.5
    ? { kind: "missing", text: "1/2 = ?/4", answer: "2", options: shuffle(["1", "2", "3"], rng) }
    : { kind: "missing", text: "2/4 = 1/?", answer: "2", options: shuffle(["2", "3", "4"], rng) };
  const equalPair = rng() < 0.5 ? [TWO_QUARTERS, HALF] : [HALF, TWO_QUARTERS];
  const pairs = [equalPair, ...shuffle(NOT_EQUAL_PAIRS, rng).slice(0, 3)].map((pair) => {
    const [a, b] = rng() < 0.5 ? pair : [pair[1], pair[0]];
    return {
      kind: "same",
      a,
      b,
      partsA: barParts(a),
      partsB: barParts(b),
      answer: isEquivalent(a, b) ? "yes" : "no",
      options: ["yes", "no"],
    };
  });
  return shuffle([match, missing, ...pairs], rng);
}

/**
 * Write a fraction, typed. The child counts from the picture: the top number
 * (how many coloured), the bottom number (how many equal parts), how many are
 * NOT coloured, or how many quarters make a half. The number is never in the
 * question's words.
 */
export function buildWriteFraction(rng) {
  const top = shuffle(
    [
      { d: 4, k: 1 },
      { d: 4, k: 2 },
      { d: 4, k: 3 },
      { d: 3, k: 1 },
    ],
    rng
  ).slice(0, 2).map(({ d, k }) => ({
    kind: "top",
    text: `?/${d} of the bar is coloured.`,
    parts: scatteredBar({ numerator: k, denominator: d }, rng),
    answer: k,
  }));
  const [firstParts, secondParts] = shuffle([2, 3, 4], rng);
  const bottoms = [firstParts, secondParts].map((parts) => ({
    kind: "bottom",
    text: "1/? of the bar is coloured.",
    parts: scatteredBar({ numerator: 1, denominator: parts }, rng),
    answer: parts,
  }));
  const whiteOf = pickOne(rng, [1, 3]);
  const white = {
    kind: "white",
    text: "?/4 of the bar is NOT coloured.",
    parts: scatteredBar({ numerator: whiteOf, denominator: 4 }, rng),
    answer: 4 - whiteOf,
  };
  const half = {
    kind: "half",
    text: "This bar has 4 equal parts. How many parts make 1/2 of the bar?",
    parts: barParts({ numerator: 0, denominator: 4 }),
    answer: 2,
  };
  return shuffle([...top, ...bottoms, white, half], rng);
}

/* --- Fractions of Numbers ----------------------------------------------- */

/** Unit fractions of totals to 20, drawn as one row per part. */
export function buildFractionOfRows(rng) {
  const pool = [
    ...range(4, 20, 2).map((total) => ({ fraction: HALF, total })),
    ...range(6, 18, 3).map((total) => ({ fraction: THIRD, total })),
    ...range(8, 20, 4).map((total) => ({ fraction: QUARTER, total })),
  ];
  const byFraction = [HALF, THIRD, QUARTER].map((f) =>
    shuffle(pool.filter((p) => p.fraction === f), rng).slice(0, 2)
  );
  return shuffle(byFraction.flat(), rng).map((plan) => {
    const { answer, options } = fractionOfOptions(plan.fraction, plan.total, rng);
    return { ...plan, answer, options, grid: Array.from({ length: plan.fraction.denominator }, (_, r) =>
      Array.from({ length: answer }, (_, c) => `${r}-${c}`)) };
  });
}

/**
 * The equivalence of 2/4 and 1/2 used on numbers. A known fact is shown and
 * a related one asked: 1/2 of 16 is 8, so 2/4 of 16? · 1/4 of 16 is 4, so
 * 2/4 of 16? · 1/4 of 16 is 4, so 1/2 of 16? · which is the same as 1/2 of 16?
 */
export function buildHalfIsTwoQuarters(rng) {
  const totals = shuffle(range(8, 40, 4), rng).slice(0, RUN_LENGTH);
  const kinds = shuffle(["fromHalf", "fromHalf", "fromQuarter", "fromQuarter", "halfFromQuarter", "same"], rng);
  return totals.map((total, i) => {
    const quarter = total / 4;
    const half = total / 2;
    switch (kinds[i]) {
      case "fromHalf":
        return {
          kind: kinds[i],
          fact: `1/2 of ${total} = ${half}`,
          ask: `2/4 of ${total} = ?`,
          answer: String(half),
          options: shuffle([half, quarter, 3 * quarter], rng).map(String),
        };
      case "fromQuarter":
        return {
          kind: kinds[i],
          fact: `1/4 of ${total} = ${quarter}`,
          ask: `2/4 of ${total} = ?`,
          answer: String(half),
          options: shuffle([half, quarter, 3 * quarter], rng).map(String),
        };
      case "halfFromQuarter":
        return {
          kind: kinds[i],
          fact: `1/4 of ${total} = ${quarter}`,
          ask: `1/2 of ${total} = ?`,
          answer: String(half),
          options: shuffle([half, quarter, 3 * quarter], rng).map(String),
        };
      default:
        return {
          kind: "same",
          fact: `1/2 of ${total}`,
          ask: "Which one is the same amount?",
          answer: `2/4 of ${total}`,
          options: shuffle([`2/4 of ${total}`, `1/4 of ${total}`, `3/4 of ${total}`], rng),
        };
    }
  });
}

/** "2 3/4" for 11 quarters; a half is written 1/2 or 2/4 as `halfAs` says. */
export function quarterLabel(quarters, halfAs = "1/2") {
  const whole = Math.floor(quarters / 4);
  const part = quarters % 4;
  const fraction = part === 0 ? "" : part === 2 ? halfAs : `${part}/4`;
  if (!fraction) return String(whole);
  return whole === 0 ? fraction : `${whole} ${fraction}`;
}

/**
 * Count in fractions on a number line (the guidance: "1 1/4, 1 2/4 (or
 * 1 1/2), 1 3/4, 2"). Four steps of a quarter or a half, starting anywhere
 * from 1/4 to 8, to put in order. Halves are written 1/2 or 2/4 so the
 * equivalence is used, not just learnt.
 */
export function buildFractionCounting(rng) {
  const steps = shuffle([1, 1, 1, 2, 2, 1], rng);
  const seen = new Set();
  const out = [];
  while (out.length < RUN_LENGTH) {
    const step = steps[out.length];
    const start = step === 1 ? 1 + Math.floor(rng() * 32) : 2 + 2 * Math.floor(rng() * 14);
    const key = `${step}:${start}`;
    if (seen.has(key) || start + 3 * step > 40) continue;
    seen.add(key);
    const halfAs = rng() < 0.5 ? "1/2" : "2/4";
    const values = [0, 1, 2, 3].map((i) => start + i * step);
    const ordered = values.map((v) => quarterLabel(v, step === 2 ? "1/2" : halfAs));
    let cards = shuffle(ordered.map((label) => ({ id: label, label })), rng);
    if (cards.every((c, i) => c.id === ordered[i])) cards = [...cards].reverse();
    out.push({ step: step === 1 ? "quarters" : "halves", ordered, cards, values });
  }
  return out;
}

/** "3/4 of 16 = ?" typed: each Year 2 fraction once, plus one more. */
export function buildFractionStatements(rng) {
  const totalsFor = (f) =>
    f.denominator === 2 ? range(6, 40, 2) : f.denominator === 3 ? range(6, 30, 3) : range(8, 40, 4);
  const fractions = shuffle([...FRACTIONS, pickOne(rng, [HALF, THREE_QUARTERS, THIRD])], rng);
  const seen = new Set();
  return fractions.map((fraction) => {
    let total;
    do total = pickOne(rng, totalsFor(fraction));
    while (seen.has(`${fractionLabel(fraction)}:${total}`));
    seen.add(`${fractionLabel(fraction)}:${total}`);
    return { fraction, total, text: `${fractionLabel(fraction)} of ${total} =`, answer: fractionOf(fraction, total) };
  });
}

/* --- Finding Fractions of Larger Groups -------------------------------- */

export const SET_OBJECTS = [
  { emoji: "🍎", noun: "apples" },
  { emoji: "🐚", noun: "shells" },
  { emoji: "⭐", noun: "stars" },
  { emoji: "🍓", noun: "strawberries" },
  { emoji: "🎈", noun: "balloons" },
  { emoji: "🧁", noun: "cupcakes" },
  { emoji: "🐟", noun: "fish" },
];

/**
 * A set of real objects, not yet in rows: the child shares them out to find
 * 1/2, 1/3 or 1/4. Sets stay at 24 or fewer so sharing with counters works.
 */
export function buildFractionOfSet(rng) {
  const pool = [
    ...range(10, 24, 2).map((total) => ({ fraction: HALF, total })),
    ...range(9, 24, 3).map((total) => ({ fraction: THIRD, total })),
    ...range(12, 24, 4).map((total) => ({ fraction: QUARTER, total })),
  ];
  const plans = [HALF, THIRD, QUARTER].flatMap((f) =>
    shuffle(pool.filter((p) => p.fraction === f), rng).slice(0, 2)
  );
  const objects = shuffle(SET_OBJECTS, rng);
  return shuffle(plans, rng).map((plan, i) => {
    const { answer, options } = fractionOfOptions(plan.fraction, plan.total, rng);
    return { ...plan, ...objects[i], answer, options };
  });
}

const MEASURE_CONTEXTS = [
  { unit: "cm", text: (f, t) => `A ribbon is ${t} cm long. How long is ${f} of it?` },
  { unit: "ml", text: (f, t) => `A jug holds ${t} ml of water. How much is ${f} of it?` },
  { unit: "p", text: (f, t) => `Jo has ${t}p. She spends ${f} of it. How much does she spend?` },
  { unit: "g", text: (f, t) => `A bag holds ${t} g of rice. How much is ${f} of the bag?` },
  { unit: "cm", text: (f, t) => `A plank is ${t} cm long. How long is ${f} of the plank?` },
  { unit: "m", text: (f, t) => `A path is ${t} m long. How far is ${f} of the way?` },
];

/** "15 cm", "40p". */
export function withUnit(n, unit) {
  return unit === "p" ? `${n}p` : `${n} ${unit}`;
}

/** Totals a Year 2 child can find this fraction of (halve, halve again, share in 3). */
export function friendlyTotals(fraction) {
  if (fraction.denominator === 2) return range(20, 100, 10);
  if (fraction.denominator === 3) return range(6, 30, 3);
  return range(8, 40, 4);
}

/**
 * Fractions of a measure or of money: every option carries its unit. All
 * five Year 2 fractions appear, one twice.
 */
export function buildFractionOfMeasure(rng) {
  const fractions = shuffle([...FRACTIONS, pickOne(rng, [QUARTER, THREE_QUARTERS])], rng);
  const contexts = shuffle(MEASURE_CONTEXTS, rng);
  return fractions.map((fraction, i) => {
    const context = contexts[i];
    const total = pickOne(rng, friendlyTotals(fraction));
    const { answer, options } = fractionOfOptions(fraction, total, rng);
    return {
      fraction,
      total,
      prompt: context.text(fractionLabel(fraction), total),
      answer: withUnit(answer, context.unit),
      options: options.map((n) => withUnit(n, context.unit)),
    };
  });
}

export function evaluateFractionOf(label) {
  const [fraction, , total] = label.split(" ");
  const [numerator, denominator] = fraction.split("/").map(Number);
  return (Number(total) / denominator) * numerator;
}

/**
 * Four "fraction of" cards to order, using at least three different
 * fractions of four different friendly totals. Answers are distinct, and the biggest total is
 * never the biggest answer, so both numbers on every card have to be used.
 */
export function buildFractionOfOrdering(rng) {
  const sets = [];
  const seen = new Set();
  while (sets.length < RUN_LENGTH) {
    const fractions = [0, 1, 2, 3].map(() => pickOne(rng, [HALF, THIRD, QUARTER, THREE_QUARTERS]));
    if (new Set(fractions).size < 3) continue;
    const totalsFor = (f) => (f.denominator === 2 ? range(10, 40, 2) : friendlyTotals(f));
    const labels = fractions.map((f) => `${fractionLabel(f)} of ${pickOne(rng, totalsFor(f))}`);
    const values = labels.map(evaluateFractionOf);
    const totals = labels.map((l) => Number(l.split(" ")[2]));
    const key = [...labels].sort().join("|");
    const biggestTotal = totals.indexOf(Math.max(...totals));
    if (
      new Set(values).size < 4 ||
      new Set(totals).size < 4 ||
      values[biggestTotal] === Math.max(...values) ||
      seen.has(key)
    ) continue;
    seen.add(key);
    const ordered = [...labels].sort((a, b) => evaluateFractionOf(a) - evaluateFractionOf(b));
    let cards = shuffle(labels.map((label) => ({ id: label, label })), rng);
    if (cards.every((c, i) => c.id === ordered[i])) cards = [...cards].reverse();
    sets.push({ ordered, cards });
  }
  return sets;
}

const STORY_TEMPLATES = [
  { left: false, text: (f, t) => `A class has ${t} children. ${f} of them are away. How many are away?` },
  { left: false, unit: "cm", text: (f, t) => `A ribbon is ${t} cm long. ${f} of it is cut off. How many cm are cut off?` },
  { left: false, unit: "ml", text: (f, t) => `A jug holds ${t} ml. ${f} of it is poured out. How many ml are poured out?` },
  { left: true, text: (f, t) => `There are ${t} sweets. ${f} of them are eaten. How many are LEFT?` },
  { left: false, text: (f, t) => `A book has ${t} pages. Tom has read ${f} of them. How many pages has he read?` },
  { left: true, text: (f, t) => `There are ${t} apples. ${f} of them are green. How many are NOT green?` },
  { left: false, text: (f, t) => `A bag holds ${t} marbles. ${f} of them are blue. How many are blue?` },
  { left: true, unit: "p", text: (f, t) => `Ali has ${t}p. He spends ${f} of it. How many pence does he have LEFT?` },
];

/**
 * Fractions of quantities in stories, typed. Two of the six ask what is LEFT,
 * which needs the fraction and then a take-away.
 */
export function buildFractionStories(rng) {
  const left = shuffle(STORY_TEMPLATES.filter((s) => s.left), rng).slice(0, 2);
  const taken = shuffle(STORY_TEMPLATES.filter((s) => !s.left), rng).slice(0, 4);
  return shuffle([...left, ...taken], rng).map((story) => {
    const fraction = pickOne(rng, story.left ? [HALF, QUARTER, THIRD] : FRACTIONS);
    const total = pickOne(rng, friendlyTotals(fraction));
    const part = fractionOf(fraction, total);
    return {
      prompt: story.text(fractionLabel(fraction), total),
      fraction,
      total,
      left: story.left,
      answer: story.left ? total - part : part,
    };
  });
}
