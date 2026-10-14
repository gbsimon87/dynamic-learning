/**
 * Pure question data for "Number - Multiplication and Division".
 *
 * Statutory scope (docs/curriculum/year-2-maths.md): recall and use facts for
 * the 2, 5 and 10 tables including odd and even; write statements with x, / and
 * =; show multiplication is commutative and division is not; and solve problems
 * using arrays, repeated addition and grouping or sharing.
 *
 * Only the 2, 5 and 10 tables are statutory at Year 2, so nothing here reaches
 * beyond them.
 */

import { shuffle } from "./countingInSteps.js";

export const TABLES = [2, 5, 10];

export function multiply(a, b) {
  return a * b;
}

export function divide(total, parts) {
  return total / parts;
}

export function isEven(n) {
  return n % 2 === 0;
}

/**
 * "4 + 4 + 4" for 4 taken 3 times — how multiplication is introduced before
 * the × sign means anything.
 */
export function repeatedAddition(value, times) {
  return Array.from({ length: times }, () => value).join(" + ");
}

/** An array as rows of equal length, for drawing rows × columns of dots. */
export function arrayRows(rows, columns) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: columns }, (_, c) => `${r}-${c}`)
  );
}

/**
 * Wrong products that come from counting a row too many or too few, then the
 * off-by-ones. A random number would be discarded without doing the
 * multiplication.
 */
export function productDistractors(answer, factor, count) {
  const candidates = [
    answer + factor,
    answer - factor,
    answer + 1,
    answer - 1,
    answer + 2 * factor,
    answer + 2,
  ];

  const seen = new Set([answer]);
  const wrong = [];

  for (const candidate of candidates) {
    if (candidate < 0 || seen.has(candidate)) continue;
    seen.add(candidate);
    wrong.push(candidate);
    if (wrong.length === count) break;
  }

  return wrong;
}

/**
 * True when three numbers, in this order, make a true multiplication.
 *
 * Accepts both orders of the factors on purpose — that multiplication can be
 * done in any order is itself statutory.
 */
export function isTrueMultiplication(order) {
  const [a, b, product] = order;
  return a * b === product;
}

/**
 * True when three numbers, in this order, make a true division.
 *
 * Unlike multiplication this holds for only one arrangement of the first two,
 * which is the asymmetry the topic exists to teach.
 */
export function isTrueDivision(order) {
  const [total, parts, result] = order;
  if (parts === 0) return false;
  return total / parts === result;
}

/** The factor that completes `known × ? = product`. */
export function missingFactor(product, known) {
  return product / known;
}

/* ------------------------------------------------------------------------- *
 * Generators for the Year 2 challenges. Each takes `rng` so a challenge
 * randomises per mount while tests replay a seed. Every builder returns six
 * questions with no repeat inside a run.
 * ------------------------------------------------------------------------- */


export const RUN_LENGTH = 6;

/** A whole number from `low` to `high`, both included. */
export function randInt(rng, low, high) {
  return low + Math.floor(rng() * (high - low + 1));
}

function pickOne(rng, items) {
  return items[Math.floor(rng() * items.length)];
}

/** The first `count` items whose `keyOf` has not been seen. */
function takeDistinct(items, count, keyOf = (x) => x) {
  const seen = new Set();
  const out = [];
  for (const item of items) {
    const key = keyOf(item);
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
    if (out.length === count) break;
  }
  return out;
}

/**
 * True when three options are an evenly spaced run with the answer in the
 * middle (4, 5, 6 or 15, 20, 25) — a layout a child learns to pick without
 * doing any maths.
 */
export function isCentredRun(options, answer) {
  if (options.length !== 3) return false;
  const sorted = options.map(Number).sort((x, y) => x - y);
  return sorted[1] === Number(answer) && sorted[1] - sorted[0] === sorted[2] - sorted[1];
}

/**
 * Plausible wrong answers: a group too many or too few (`step`), and slips
 * of one or two. The candidates are shuffled by `rng`, so the answer is not
 * always the smallest, largest or middle option, and an evenly spaced run
 * around the answer is never returned. Never zero or negative. `extra`
 * candidates (a typical misreading) are tried first.
 */
export function nearMissDistractors(answer, step, count, rng, extra = []) {
  const pool = shuffle(
    [answer + step, answer - step, answer + 1, answer - 1, answer + 2, answer - 2],
    rng
  );
  const candidates = [...shuffle(extra, rng), ...pool, answer + 3, answer + 4, answer + 2 * step];
  const valid = candidates.filter((c) => Number.isInteger(c) && c >= 1 && c !== answer);
  let wrong = takeDistinct(valid, count);
  if (count === 2 && isCentredRun([answer, ...wrong], answer)) {
    const swap = valid.find((c) => !wrong.includes(c) && !isCentredRun([answer, wrong[0], c], answer));
    if (swap !== undefined) wrong = [wrong[0], swap];
  }
  return wrong;
}

/** Answer plus two near-misses, shuffled. */
function numberOptions(answer, step, rng, extra = []) {
  return shuffle([answer, ...nearMissDistractors(answer, step, 2, rng, extra)], rng);
}

/* --- What is Multiplication? ------------------------------------------- */

/**
 * Arrays a six-year-old can count dot by dot: one side is a statutory table
 * (2, 5 or 10) and there are never more than 30 dots.
 */
export function countableArrays(rng, count = RUN_LENGTH) {
  const pool = [];
  for (let rows = 2; rows <= 6; rows++) pool.push({ rows, columns: 2 });
  for (let rows = 2; rows <= 5; rows++) pool.push({ rows, columns: 5 });
  for (let rows = 2; rows <= 3; rows++) pool.push({ rows, columns: 10 });
  for (const rows of [5, 10]) pool.push({ rows, columns: 3 });
  pool.push({ rows: 5, columns: 4 });
  return shuffle(pool, rng).slice(0, count);
}

export function buildMultiplicationArrays(rng) {
  return countableArrays(rng).map((plan) => {
    const answer = plan.rows * plan.columns;
    return {
      ...plan,
      answer,
      grid: arrayRows(plan.rows, plan.columns),
      options: numberOptions(answer, plan.columns, rng),
    };
  });
}

/** "a × b" or "a + b" to its value. */
export function evaluateExpression(expression) {
  const [left, operator, right] = expression.split(" ");
  const a = Number(left);
  const b = Number(right);
  if (operator === "×") return a * b;
  if (operator === "÷") return a / b;
  if (operator === "+") return a + b;
  if (operator === "−") return a - b;
  return NaN;
}

/**
 * Repeated addition to ×. "5 + 5 + 5" is 3 × 5. Wrong options are the
 * groupings a child really mixes up — the number squared, the count squared,
 * adding the two numbers, or one group too many or too few — never anything
 * containing the total.
 */
export function buildRepeatedAddition(rng) {
  const pool = [];
  for (const value of [2, 5, 10]) {
    for (let times = 2; times <= (value === 2 ? 6 : 5); times++) {
      if (times !== value) pool.push({ value, times });
    }
  }
  return shuffle(pool, rng).slice(0, RUN_LENGTH).map(({ value, times }) => {
    const answer = `${times} × ${value}`;
    const total = value * times;
    // One group too many OR too few, never both: 2 × 5, 3 × 5, 4 × 5 would
    // put the answer in the middle.
    const offByOne = rng() < 0.5 ? times + 1 : times - 1;
    const candidates = shuffle(
      [
        `${value} × ${value}`,
        `${times} × ${times}`,
        `${times} + ${value}`,
        `${offByOne} × ${value}`,
      ],
      rng
    ).filter(
      (c) =>
        c !== answer &&
        c !== `${value} × ${times}` &&
        evaluateExpression(c) !== total &&
        !c.startsWith("1 ×")
    );
    const distinct = takeDistinct(candidates, candidates.length);
    const centred = (pair) =>
      isCentredRun(
        [answer, ...pair].filter((o) => o.endsWith(` × ${value}`)).map((o) => Number(o.split(" ")[0])),
        times
      );
    const pairs = [];
    for (let i = 0; i < distinct.length; i++) {
      for (let j = i + 1; j < distinct.length; j++) pairs.push([distinct[i], distinct[j]]);
    }
    const wrong = pairs.find((pair) => !centred(pair));
    return {
      value,
      times,
      total,
      answer,
      addition: repeatedAddition(value, times),
      options: shuffle([answer, ...wrong], rng),
    };
  });
}

/** Cards for "? × ? = ?" read from a countable array, never starting solved. */
export function buildArrayStatements(rng) {
  return countableArrays(rng).map((plan) => {
    const product = plan.rows * plan.columns;
    const values = [plan.rows, plan.columns, product];
    let cards = shuffle(
      values.map((value, i) => ({ id: `${value}-${i}`, value, label: value })),
      rng
    );
    if (isTrueMultiplication(cards.map((c) => c.value))) {
      cards = [cards[2], cards[0], cards[1]];
    }
    return { ...plan, product, cards, grid: arrayRows(plan.rows, plan.columns) };
  });
}

const EQUAL_GROUP_STORIES = [
  { sizes: [2, 5, 10], text: (g, k) => `There are ${g} bags. Each bag holds ${k} apples. How many apples altogether?` },
  { sizes: [10], text: (g) => `A box holds 10 crayons. How many crayons are in ${g} boxes?` },
  { sizes: [2], text: (g) => `Each child has 2 shoes. How many shoes do ${g} children have?` },
  { sizes: [5], text: (g) => `Each flower has 5 petals. How many petals do ${g} flowers have?` },
  { sizes: [2, 5, 10], text: (g, k) => `There are ${g} tables with ${k} chairs at each table. How many chairs?` },
  { sizes: [10], text: (g) => `A pack has 10 stickers. How many stickers are in ${g} packs?` },
  { sizes: [2], text: (g) => `There are ${g} pairs of socks. How many socks altogether?` },
  { sizes: [5], text: (g) => `A tray holds 5 cakes. How many cakes are on ${g} trays?` },
  { sizes: [2, 5], text: (g, k) => `${g} children each have ${k} pencils. How many pencils altogether?` },
];

/** Equal groups in stories, numbers generated per run. */
export function buildEqualGroupStories(rng) {
  return shuffle(EQUAL_GROUP_STORIES, rng).slice(0, RUN_LENGTH).map((story) => {
    const size = pickOne(rng, story.sizes);
    const groups = randInt(rng, 3, 9);
    return { prompt: story.text(groups, size), answer: groups * size };
  });
}

/* --- What is Division? ------------------------------------------------- */

/** Sharing pictures: `groups` rows of `each`, one side a statutory table, ≤ 30 dots. */
export function buildSharingPictures(rng) {
  const pool = [];
  for (const groups of [2, 3, 4, 5, 10]) {
    for (let each = 2; each <= 10; each++) {
      const tableUsed = [2, 5, 10].includes(groups) || [2, 5, 10].includes(each);
      if (tableUsed && groups * each <= 30) pool.push({ groups, each });
    }
  }
  return shuffle(pool, rng).slice(0, RUN_LENGTH).map(({ groups, each }) => ({
    total: groups * each,
    groups,
    answer: each,
    grid: arrayRows(groups, each),
  }));
}

/** "How many groups of 5 in 30?" — options are near-misses and the group size. */
export function buildGroupingQuestions(rng) {
  const pool = [];
  for (const size of [2, 5, 10]) {
    for (let answer = 2; answer <= 10; answer++) {
      if (answer !== size) pool.push({ size, answer, total: size * answer });
    }
  }
  return shuffle(pool, rng).slice(0, RUN_LENGTH).map((plan) => ({
    ...plan,
    options: numberOptions(plan.answer, 1, rng, [plan.size]),
  }));
}

/**
 * Three cards from a division fact family. Both true arrangements are
 * accepted, so the work is seeing that the total must lead.
 */
export function buildDivisionFamilies(rng) {
  const pool = [];
  for (const table of [2, 5, 10]) {
    for (let n = 2; n <= 10; n++) if (n !== table) pool.push([n * table, table, n]);
  }
  const families = takeDistinct(shuffle(pool, rng), RUN_LENGTH, ([p, a, b]) => `${p}:${Math.min(a, b)}`);
  return families.map((family) => {
    let cards = shuffle(family.map((value) => ({ id: value, value, label: value })), rng);
    if (isTrueDivision(cards.map((c) => c.value))) cards = [cards[1], cards[0], cards[2]];
    return { family, cards };
  });
}

const SHARE_STORIES = [
  (t, d) => `${t} sweets are shared equally between ${d} children. How many does each child get?`,
  (t, d) => `${t} pencils are shared equally between ${d} pots. How many go in each pot?`,
  (t, d) => `${t} marbles are shared equally between ${d} friends. How many does each friend get?`,
  (t, d) => `${t} stickers are shared equally between ${d} pages. How many go on each page?`,
];
const GROUP_STORIES = [
  (t, s) => `${t} eggs are put into boxes of ${s}. How many boxes are filled?`,
  (t, s) => `${t} flowers are tied into bunches of ${s}. How many bunches are there?`,
  (t, s) => `${t} books are stacked in piles of ${s}. How many piles are there?`,
  (t, s) => `${t} children stand in lines of ${s}. How many lines are there?`,
];

function divisionNumbers(rng, used) {
  for (;;) {
    const divisor = pickOne(rng, [2, 5, 10]);
    const answer = randInt(rng, 2, 10);
    const key = `${divisor}:${answer}`;
    if (answer === divisor || used.has(key)) continue;
    used.add(key);
    return { divisor, answer, total: divisor * answer };
  }
}

/** Three sharing and three grouping stories, mixed, plain objects only. */
export function buildSharingOrGrouping(rng) {
  const used = new Set();
  const share = shuffle(SHARE_STORIES, rng).slice(0, 3).map((text) => {
    const { divisor, answer, total } = divisionNumbers(rng, used);
    return { kind: "share", prompt: text(total, divisor), answer };
  });
  const group = shuffle(GROUP_STORIES, rng).slice(0, 3).map((text) => {
    const { divisor, answer, total } = divisionNumbers(rng, used);
    return { kind: "group", prompt: text(total, divisor), answer };
  });
  return shuffle([...share, ...group], rng);
}

/* --- Division Problems -------------------------------------------------- */

const STATEMENT_STORIES = [
  (t, d) => `${t} cakes are shared equally between ${d} plates.`,
  (t, d) => `${t} pens are shared equally between ${d} pots.`,
  (t, d) => `${t} beads are shared equally between ${d} jars.`,
  (t, d) => `${t} cards are shared equally between ${d} boxes.`,
  (t, d) => `${t} apples are shared equally between ${d} baskets.`,
  (t, d) => `${t} toy cars are shared equally between ${d} shelves.`,
  (t, d) => `${t} grapes are shared equally between ${d} bowls.`,
];

/** Pick the division a story needs: reversed and × options use the same pair. */
export function buildDivisionStatementChoice(rng) {
  const used = new Set();
  return shuffle(STATEMENT_STORIES, rng).slice(0, RUN_LENGTH).map((text) => {
    const { divisor, total } = divisionNumbers(rng, used);
    const answer = `${total} ÷ ${divisor}`;
    return {
      prompt: text(total, divisor),
      total,
      parts: divisor,
      answer,
      options: shuffle([answer, `${divisor} ÷ ${total}`, `${total} × ${divisor}`], rng),
    };
  });
}

/** "15 cm", "40p", "20 ml". Pence sit against the number, as the coins do. */
export function withUnit(n, unit) {
  if (!unit) return String(n);
  return unit === "p" ? `${n}p` : `${n} ${unit}`;
}

const MEASURE_STORIES = [
  { unit: "cm", share: true, text: (t, d) => `A ribbon is ${t} cm long. It is cut into ${d} equal pieces. How long is each piece?` },
  { unit: "p", share: true, text: (t, d) => `${t}p is shared equally between ${d} children. How much does each child get?` },
  { unit: "ml", share: true, text: (t, d) => `A jug holds ${t} ml of juice. It is poured equally into ${d} cups. How much is in each cup?` },
  { unit: "g", share: true, text: (t, d) => `${t} g of flour is shared equally between ${d} bowls. How much goes in each bowl?` },
  { unit: "", share: false, text: (t, s) => `A rope is ${t} m long. It is cut into pieces ${s} m long. How many pieces are there?` },
  { unit: "", share: false, text: (t, s) => `Pencils cost ${s}p each. How many pencils can you buy with ${t}p?` },
];

/**
 * Division of measures and money — the "continuous quantities" of the
 * guidance. Sharing answers carry their unit on every option; grouping
 * answers count pieces, so they have none.
 */
export function buildMeasureSharing(rng) {
  const used = new Set();
  return shuffle(MEASURE_STORIES, rng).map((story) => {
    const { divisor, answer, total } = divisionNumbers(rng, used);
    const label = withUnit(answer, story.unit);
    return {
      prompt: story.text(total, divisor),
      answer: label,
      options: numberOptions(answer, 1, rng).map((n) => withUnit(n, story.unit)),
    };
  });
}

/**
 * Four divisions to order by answer. Answers are distinct (no tie), and the
 * card with the biggest number to share never has the biggest answer — the
 * trap the challenge exists to set.
 */
export function buildDivisionOrdering(rng) {
  const sets = [];
  const seen = new Set();
  while (sets.length < RUN_LENGTH) {
    const answers = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], rng).slice(0, 4);
    const cards = answers.map((answer) => {
      const divisor = pickOne(rng, [2, 5, 10]);
      return { label: `${answer * divisor} ÷ ${divisor}`, total: answer * divisor, answer };
    });
    const totals = new Set(cards.map((c) => c.total));
    const biggest = cards.reduce((a, b) => (b.total > a.total ? b : a));
    const top = Math.max(...answers);
    const key = cards.map((c) => c.label).sort().join("|");
    if (totals.size < 4 || biggest.answer === top || seen.has(key)) continue;
    seen.add(key);
    const ordered = [...cards].sort((a, b) => a.answer - b.answer).map((c) => c.label);
    let shuffled = shuffle(cards.map((c) => ({ id: c.label, label: c.label })), rng);
    if (shuffled.every((c, i) => c.id === ordered[i])) shuffled = [...shuffled].reverse();
    sets.push({ ordered, cards: shuffled });
  }
  return sets;
}

const COMBINE_STORIES = [
  { share: true, text: (a, b, d) => `Mia has ${a} stickers and Ben has ${b} stickers. They put them together and share them equally between ${d} pages. How many stickers go on each page?` },
  { share: true, text: (a, b, d) => `There are ${a} red beads and ${b} blue beads. All the beads are shared equally between ${d} jars. How many beads go in each jar?` },
  { share: false, text: (a, b, s) => `A farmer collects ${a} eggs in the morning and ${b} eggs in the afternoon. He puts them all in boxes of ${s}. How many boxes does he fill?` },
  { share: false, text: (a, b, s) => `Class 2 has ${a} pencils and Class 3 has ${b} pencils. They put them all into pots of ${s}. How many pots are filled?` },
  { share: false, text: (a, b, s) => `There are ${a} children on one bus and ${b} children on another. They all make teams of ${s}. How many teams are there?` },
  { share: true, text: (a, b, d) => `Sam bakes ${a} cookies and Zoe bakes ${b} cookies. They share all the cookies equally between ${d} plates. How many cookies go on each plate?` },
  { share: true, text: (a, b, d) => `There are ${a} books on one shelf and ${b} books on another. All the books are shared equally between ${d} tables. How many books go on each table?` },
];

/**
 * Two amounts of the SAME thing are put together, then divided. The total is
 * never stated, so stopping after one step cannot be right.
 */
export function buildCombineAndShare(rng) {
  const used = new Set();
  return shuffle(COMBINE_STORIES, rng).slice(0, RUN_LENGTH).map((story) => {
    let numbers;
    do numbers = divisionNumbers(rng, used);
    while (numbers.total < 10 || numbers.total > 60);
    const a = randInt(rng, 3, numbers.total - 3);
    const b = numbers.total - a;
    return { prompt: story.text(a, b, numbers.divisor), answer: numbers.answer, total: numbers.total, parts: [a, b] };
  });
}

/* --- Connecting Multiplication and Division ----------------------------- */

/** Facts n × t with t a statutory table and n ≠ t, six distinct products. */
function tableFacts(rng, count = RUN_LENGTH) {
  const pool = [];
  for (const table of [2, 5, 10]) {
    for (let n = 2; n <= 10; n++) if (n !== table) pool.push({ n, table, product: n * table });
  }
  return takeDistinct(shuffle(pool, rng), count, (f) => f.product);
}

/** Given a multiplication, pick the division that comes with it. */
export function buildRelatedDivisionChoice(rng) {
  return tableFacts(rng).map(({ n, table, product }) => {
    const [a, b] = rng() < 0.5 ? [n, table] : [table, n];
    const answer = `${product} ÷ ${b} = ${a}`;
    return {
      a,
      b,
      product,
      answer,
      options: shuffle([answer, `${b} ÷ ${product} = ${a}`, `${product} ÷ ${a} = ${b + 1}`], rng),
    };
  });
}

/**
 * Use the fact you know. Each question shows one fact and asks for a
 * related one: a division from a multiplication, or the multiplication
 * (sometimes with the factors swapped) from a division. The answer is never
 * printed in the question, and the wrong options are the other number in the
 * fact and a near-miss.
 */
export function buildUseTheFact(rng) {
  const kinds = shuffle(["divideByB", "divideByA", "multiply", "multiplySwapped", "divideByB", "multiply"], rng);
  return tableFacts(rng).map(({ n, table, product }, i) => {
    const [a, b] = rng() < 0.5 ? [n, table] : [table, n];
    const kind = kinds[i];
    if (kind === "divideByB" || kind === "divideByA") {
      const divisor = kind === "divideByB" ? b : a;
      const answer = product / divisor;
      return {
        kind,
        fact: `${a} × ${b} = ${product}`,
        ask: `${product} ÷ ${divisor} = ?`,
        answer,
        options: numberOptions(answer, 1, rng, [divisor]),
      };
    }
    const [x, y] = kind === "multiply" ? [a, b] : [b, a];
    return {
      kind,
      fact: `${product} ÷ ${b} = ${a}`,
      ask: `${x} × ${y} = ?`,
      answer: product,
      options: numberOptions(product, b, rng),
    };
  });
}

/**
 * A fact family: two true statements and two near-miss false ones. The false
 * ones are the mistakes a child makes — dividing the wrong way round, one
 * out, or a group out — never "20 × 5 = 4".
 */
export function buildFactFamilySort(rng) {
  return tableFacts(rng).map(({ n, table, product }) => {
    const [a, b] = rng() < 0.5 ? [n, table] : [table, n];
    const truthy = [
      pickOne(rng, [`${a} × ${b} = ${product}`, `${b} × ${a} = ${product}`]),
      pickOne(rng, [`${product} ÷ ${b} = ${a}`, `${product} ÷ ${a} = ${b}`]),
    ];
    const falsy = takeDistinct(
      shuffle(
        [
          `${b} ÷ ${product} = ${a}`,
          `${product} ÷ ${b} = ${a + 1}`,
          `${a} × ${b} = ${product + b}`,
          `${product} ÷ ${a} = ${b - 1}`,
          `${a} × ${b} = ${product - Math.min(a, b)}`,
        ],
        rng
      ).filter((text) => !truthy.includes(text) && !isTrueStatement(text) && !isAbsurd(text)),
      2
    );
    let cards = shuffle([...truthy, ...falsy].map((text) => ({ id: text, label: text })), rng);
    const solved = (list) => truthy.includes(list[0].id) && truthy.includes(list[1].id);
    if (solved(cards)) cards = [cards[2], cards[0], cards[1], cards[3]];
    return { numbers: [a, b, product], truthy, falsy, cards };
  });
}

/**
 * A false fact a child would reject without thinking: a product no bigger
 * than its factors, or a quotient of 0 or 1.
 */
function isAbsurd(text) {
  const [left, right] = text.split(" = ");
  const [x, operator, y] = left.split(" ");
  if (operator === "×") return Number(right) <= Math.max(Number(x), Number(y));
  return Number(right) <= 1;
}

/** True when a written statement such as "20 ÷ 5 = 4" holds. */
export function isTrueStatement(text) {
  const [left, right] = text.split(" = ");
  return evaluateExpression(left) === Number(right);
}

/** Missing numbers in ×/÷ facts, the box in a different place each time. */
export function buildInverseMissingNumbers(rng) {
  const forms = shuffle(["a×?", "?×b", "p÷?", "?÷b", "a×?", "p÷?"], rng);
  return tableFacts(rng).map(({ n, table, product }, i) => {
    switch (forms[i]) {
      case "a×?":
        return { text: `${n} × ? = ${product}`, answer: table };
      case "?×b":
        return { text: `? × ${table} = ${product}`, answer: n };
      case "p÷?":
        return { text: `${product} ÷ ? = ${n}`, answer: table };
      default:
        return { text: `? ÷ ${table} = ${n}`, answer: product };
    }
  });
}

/* --- Doubling and Halving using × and ÷ --------------------------------- */

/** n × 2 for n from a friendly list, options a ten or a slip out. */
export function buildDoubling(rng) {
  return shuffle([12, 15, 20, 25, 30, 35, 40, 45, 14, 16], rng).slice(0, RUN_LENGTH).map((n) => {
    const answer = n * 2;
    return { n, answer, options: numberOptions(answer, 10, rng) };
  });
}

/** n ÷ 2 for even numbers to 100, options a ten or a slip out. */
export function buildHalving(rng) {
  return shuffle([24, 30, 40, 50, 60, 70, 80, 90, 28, 46], rng).slice(0, RUN_LENGTH).map((n) => {
    const answer = n / 2;
    return { n, answer, options: numberOptions(answer, 10, rng) };
  });
}

/**
 * A halving chain from a friendly start: it stops before a remainder or after
 * four numbers, so it never leaves numbers a Year 2 child halves easily
 * (100, 50, 25 · 24, 12, 6, 3).
 */
export function halvingChain(start, maxLength = 4) {
  const terms = [start];
  while (terms.length < maxLength && terms[terms.length - 1] % 2 === 0) {
    terms.push(terms[terms.length - 1] / 2);
  }
  return terms;
}

export const HALVING_STARTS = [12, 16, 20, 24, 32, 40, 60, 80, 100];

export function buildHalvingChains(rng) {
  return shuffle(HALVING_STARTS, rng).slice(0, RUN_LENGTH).map((start) => {
    const terms = halvingChain(start);
    let cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    if (cards.every((card, i) => card.id === terms[i])) cards = [...cards].reverse();
    return { start, terms, cards };
  });
}

/* --- Solving Multiplication and Division Problems ----------------------- */

const OPERATION_STORIES = [
  { op: "×", text: (a, b) => `${a} boxes hold ${b} pencils each. How many pencils?` },
  { op: "×", text: (a, b) => `${a} bags hold ${b} apples each. How many apples?` },
  { op: "×", text: (a, b) => `${a} children have ${b} stickers each. How many stickers?` },
  { op: "×", text: (a, b) => `There are ${a} rows of ${b} chairs. How many chairs?` },
  { op: "÷", text: (t, d) => `${t} pencils are shared equally between ${d} boxes. How many in each box?` },
  { op: "÷", text: (t, d) => `${t} apples are put into bags of ${d}. How many bags?` },
  { op: "÷", text: (t, d) => `${t} stickers are shared equally between ${d} children. How many each?` },
  { op: "÷", text: (t, d) => `${t} chairs are put in rows of ${d}. How many rows?` },
];

/**
 * Multiply or divide? Every option uses exactly the two numbers in the
 * story: the right operation, the other one, and + or − with the same pair.
 */
export function buildOperationChoice(rng) {
  const used = new Set();
  const times = shuffle(OPERATION_STORIES.filter((s) => s.op === "×"), rng).slice(0, 3);
  const divide = shuffle(OPERATION_STORIES.filter((s) => s.op === "÷"), rng).slice(0, 3);
  return shuffle([...times, ...divide], rng).map((story) => {
    const { divisor, answer: groups, total } = divisionNumbers(rng, used);
    const [x, y] = story.op === "×" ? [groups, divisor] : [total, divisor];
    const big = Math.max(x, y);
    const small = Math.min(x, y);
    const answer = story.op === "×" ? `${x} × ${y}` : `${x} ÷ ${y}`;
    const other = story.op === "×" ? `${big} ÷ ${small}` : `${x} × ${y}`;
    const third = rng() < 0.5 ? `${x} + ${y}` : `${big} − ${small}`;
    return {
      prompt: story.text(x, y),
      pair: [x, y],
      answer,
      options: shuffle([answer, other, third], rng),
    };
  });
}

const ARRAY_STORIES = [
  { op: "×", text: (r, c) => `In the hall there are ${r} rows of chairs with ${c} chairs in each row. How many chairs?` },
  { op: "×", text: (r, c) => `Gran plants ${r} rows of seeds with ${c} seeds in each row. How many seeds?` },
  { op: "×", text: (r, c) => `A box of eggs has ${r} rows with ${c} eggs in each row. How many eggs?` },
  { op: "×", text: (r, c) => `A wall has ${r} rows of tiles with ${c} tiles in each row. How many tiles?` },
  { op: "÷", text: (t, c) => `${t} chairs are set out in rows of ${c}. How many rows are there?` },
  { op: "÷", text: (t, c) => `${t} seeds are planted in equal rows of ${c}. How many rows are there?` },
  { op: "÷", text: (t, r) => `${t} tiles are laid in ${r} equal rows. How many tiles are in each row?` },
  { op: "÷", text: (t, r) => `${t} children stand in ${r} equal rows. How many children are in each row?` },
];

/**
 * Choose the operation AND do it, with arrays: rows of chairs, seeds or
 * tiles. Options are near-misses (a row out, a slip of one or two).
 */
export function buildArrayStories(rng) {
  const used = new Set();
  const times = shuffle(ARRAY_STORIES.filter((s) => s.op === "×"), rng).slice(0, 3);
  const divide = shuffle(ARRAY_STORIES.filter((s) => s.op === "÷"), rng).slice(0, 3);
  return shuffle([...times, ...divide], rng).map((story) => {
    const { divisor, answer: other, total } = divisionNumbers(rng, used);
    if (story.op === "×") {
      return { op: "×", prompt: story.text(other, divisor), answer: total, options: numberOptions(total, divisor, rng) };
    }
    return { op: "÷", prompt: story.text(total, divisor), answer: other, options: numberOptions(other, 1, rng, [divisor]) };
  });
}
