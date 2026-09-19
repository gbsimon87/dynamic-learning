/**
 * Pure question data for Year 3 "Number - Multiplication and Division".
 *
 * Statutory scope (docs/curriculum/year-3-maths.md):
 *   - recall and use multiplication and division facts for the 3, 4 and 8
 *     multiplication tables
 *   - write and calculate statements for multiplication and division using the
 *     tables they know, including two-digit numbers times one-digit numbers,
 *     using mental and progressing to formal written methods
 *   - solve problems, including missing number problems, involving
 *     multiplication and division, including positive integer scaling problems
 *     and correspondence problems in which n objects are connected to m objects
 *
 * Boundaries this module holds to:
 *   - tables are 3, 4 and 8 (plus the 2, 5 and 10 already known from Year 2).
 *     Never 6, 7 or 9 as the table being taught.
 *   - every number that reaches the screen, question or answer, stays at or
 *     below 1000.
 *   - no answer is ever negative, and no division leaves a remainder.
 *
 * No React here on purpose: the generators take `rng` so a challenge can
 * randomise per mount while `year3MulDiv.test.js` stays deterministic.
 */

import { shuffleValues } from "./placeValue3Digit.js";
import { arrayRows, productDistractors } from "./multiplicationAndDivision.js";

export { arrayRows };

/** The tables this year group is being taught. */
export const YEAR3_TABLES = [3, 4, 8];

const ROUNDS = 6;

function assertLevel(level, name) {
  if (!Number.isInteger(level) || level < 1 || level > 4) {
    throw new RangeError(`Unknown ${name} level: ${level}`);
  }
}

/** `count` values from `pool`, without repeats, in a random order. */
function pick(pool, count, rng) {
  return shuffleValues(pool, rng).slice(0, count);
}

function range(from, to) {
  return Array.from({ length: to - from + 1 }, (_, index) => index + from);
}

/**
 * `count` values from a pool smaller than `count`, each shuffled run laid end
 * to end. Six rounds have to draw from three tables, and taking the same
 * shuffle twice would pair every table with itself.
 */
function pickCycling(pool, count, rng) {
  const drawn = [];
  while (drawn.length < count) drawn.push(...shuffleValues(pool, rng));
  return drawn.slice(0, count);
}

/**
 * Four options around a product: the answer plus near-misses that come from
 * counting one row too many or too few. Random numbers would be discarded
 * without doing any multiplication.
 */
export function productOptions(answer, factor, rng) {
  return shuffleValues([answer, ...productDistractors(answer, factor, 3)], rng);
}

/* ==========================================================================
   Topic 1 — 3 and 4 Times Tables
   ========================================================================== */

/** Three facts from the 3 table and three from the 4 table, interleaved. */
function tableFacts(pool, rng) {
  const facts = [3, 4].flatMap((table) =>
    pick(pool, ROUNDS / 2, rng).map((other) => ({ table, other }))
  );
  return shuffleValues(facts, rng);
}

const TABLE_STORIES = [
  (t, n) => ({ prompt: `A box holds ${t} crayons. There are ${n} boxes. How many crayons altogether?`, answer: t * n }),
  (t, n) => ({ prompt: `Each table has ${t} chairs. There are ${n} tables. How many chairs in total?`, answer: t * n }),
  (t, n) => ({ prompt: `A bunch has ${t} flowers. Mia picks ${n} bunches. How many flowers does she pick?`, answer: t * n }),
  (t, n) => ({ prompt: `${t * n} apples are shared equally between ${t} baskets. How many apples in each basket?`, answer: n }),
  (t, n) => ({ prompt: `${t * n} stickers are put into piles of ${t}. How many piles are there?`, answer: n }),
  (t, n) => ({ prompt: `${t * n} children sit in rows of ${t}. How many rows are there?`, answer: n }),
];

export function buildTablesQuestions(level, rng) {
  assertLevel(level, "times tables");

  // Arrays get the smaller pool: a 4 by 12 grid of dots is wider than the
  // panel and stops being countable, which is the whole point of an array.
  const facts = tableFacts(level === 1 ? range(2, 10) : range(2, 12), rng);

  if (level === 1) {
    return facts.map(({ table, other }) => {
      const answer = table * other;
      return {
        type: "array-product",
        rows: table,
        columns: other,
        grid: arrayRows(table, other),
        answer,
        options: productOptions(answer, table, rng),
      };
    });
  }

  if (level === 2) {
    return facts.map(({ table, other }) => ({
      type: "fact-recall",
      a: table,
      b: other,
      answer: table * other,
    }));
  }

  if (level === 3) {
    // Alternate which corner is covered, so the same triangle is read as a
    // multiplication and as a division — the fact family, not two topics.
    return facts.map(({ table, other }, index) => {
      const product = table * other;
      const hidden = index % 2 === 0 ? "product" : "right";
      return {
        type: "fact-triangle",
        left: table,
        right: other,
        product,
        hidden,
        answer: hidden === "product" ? product : other,
        statement:
          hidden === "product"
            ? `${table} × ${other} = ?`
            : `${product} ÷ ${table} = ?`,
      };
    });
  }

  return shuffleValues(TABLE_STORIES, rng).map((story, index) => {
    const { table, other } = facts[index];
    return { type: "table-story", ...story(table, other) };
  });
}

/* ==========================================================================
   Topic 2 — The 8 Times Table
   ========================================================================== */

const EIGHT_STORIES = [
  (n) => ({ prompt: `A spider has 8 legs. How many legs do ${n} spiders have?`, answer: 8 * n }),
  (n) => ({ prompt: `A pack holds 8 pencils. Sam buys ${n} packs. How many pencils is that?`, answer: 8 * n }),
  (n) => ({ prompt: `An octopus tank has ${n} octopuses, each with 8 arms. How many arms altogether?`, answer: 8 * n }),
  (n) => ({ prompt: `${8 * n} cakes are shared equally between 8 plates. How many cakes on each plate?`, answer: n }),
  (n) => ({ prompt: `${8 * n} marbles are put into bags of 8. How many bags are filled?`, answer: n }),
  (n) => ({ prompt: `${8 * n} seats are set out in rows of 8. How many rows are there?`, answer: n }),
];

export function buildEightQuestions(level, rng) {
  assertLevel(level, "eight times table");

  if (level === 1) {
    // Doubling is the guidance's own route into the 8 table: 2s double to 4s,
    // 4s double to 8s. The chain is shown, so nothing has to be recalled.
    return pick(range(2, 12), ROUNDS, rng).map((other) => {
      const answer = 8 * other;
      return {
        type: "double-chain",
        other,
        twice: 2 * other,
        fourTimes: 4 * other,
        answer,
        options: productOptions(answer, other, rng),
      };
    });
  }

  if (level === 2) {
    return pick(range(2, 12), ROUNDS, rng).map((other) => ({
      type: "eight-recall",
      a: 8,
      b: other,
      answer: 8 * other,
    }));
  }

  if (level === 3) {
    // Dealt one round at a time into 8 pots, so 48 counters take 6 taps rather
    // than 48. Capped at 6 each: more than that and the pots stop being
    // countable at a glance.
    // pickCycling, not pick: 2-6 is five sizes and six rounds are needed, so
    // picking without repeats silently returned a five-round challenge.
    return pickCycling(range(2, 6), ROUNDS, rng).map((each) => ({
      type: "share-groups",
      groups: 8,
      each,
      total: 8 * each,
      answer: each,
    }));
  }

  const counts = pick(range(2, 12), ROUNDS, rng);
  return shuffleValues(EIGHT_STORIES, rng).map((story, index) => ({
    type: "eight-story",
    ...story(counts[index]),
  }));
}

/* ==========================================================================
   Topic 3 — Multiplying and Dividing Two-Digit Numbers
   ========================================================================== */

/** 23 × 4 as (20 × 4) + (3 × 4) — the partition behind the written method. */
export function multiplyPartition(a, b) {
  const tens = Math.floor(a / 10) * 10;
  const ones = a % 10;
  return {
    operation: "multiply",
    a,
    b,
    heading: `${a} × ${b}`,
    cells: [
      { key: "tens", label: `${tens} × ${b}`, value: tens * b },
      { key: "ones", label: `${ones} × ${b}`, value: ones * b },
    ],
    answer: a * b,
  };
}

/** 52 ÷ 4 as (40 ÷ 4) + (12 ÷ 4) — the same partition, run backwards. */
export function dividePartition(b, quotient) {
  const a = b * quotient;
  const friendly = b * 10;
  return {
    operation: "divide",
    a,
    b,
    heading: `${a} ÷ ${b}`,
    cells: [
      { key: "tens", label: `${friendly} ÷ ${b}`, value: 10 },
      { key: "ones", label: `${a - friendly} ÷ ${b}`, value: quotient - 10 },
    ],
    answer: quotient,
  };
}

/** Two-digit numbers whose ones digit is not 0 — 40 × 3 has nothing to split. */
function partitionableTwoDigits(b) {
  return range(12, 49).filter((a) => a % 10 !== 0 && a * b <= 999);
}

const TWO_DIGIT_STORIES = [
  (a, b) => ({ prompt: `A crate holds ${a} oranges. How many oranges are in ${b} crates?`, answer: a * b }),
  (a, b) => ({ prompt: `A ticket costs ${a}p. What do ${b} tickets cost, in pence?`, answer: a * b }),
  (a, b) => ({ prompt: `A shelf holds ${a} books. How many books fit on ${b} shelves?`, answer: a * b }),
  (a, b) => ({ prompt: `${a * b} pencils are shared equally between ${b} classes. How many pencils does each class get?`, answer: a }),
  (a, b) => ({ prompt: `${a * b} eggs are packed into boxes of ${b}. How many boxes are filled?`, answer: a }),
  (a, b) => ({ prompt: `A rope ${a * b} cm long is cut into ${b} equal pieces. How long is each piece, in cm?`, answer: a }),
];

export function buildTwoDigitQuestions(level, rng) {
  assertLevel(level, "two-digit multiplication");

  if (level === 1 || level === 2) {
    // Level 1 reads a partition; level 2 builds one, and half of level 2 runs
    // the same picture as a division so the two operations share a structure.
    const divisionCount = level === 2 ? 3 : 0;

    return pickCycling(YEAR3_TABLES, ROUNDS, rng).map((b, index) => {
      if (index < divisionCount) {
        // quotient 11..(99/b) keeps the dividend a two-digit number.
        const quotients = range(11, Math.floor(99 / b));
        const quotient = pick(quotients, 1, rng)[0];
        const question = dividePartition(b, quotient);
        return { ...question, type: "partition", mode: "build" };
      }
      const a = pick(partitionableTwoDigits(b), 1, rng)[0];
      const question = multiplyPartition(a, b);
      return {
        ...question,
        type: "partition",
        mode: level === 1 ? "read" : "build",
        options: level === 1 ? productOptions(question.answer, b, rng) : null,
      };
    });
  }

  if (level === 3) {
    // Three-digit products only. A two-digit answer would leave the hundreds
    // slot wanting a "0", and a child who leaves it blank is not wrong.
    return pickCycling(YEAR3_TABLES, ROUNDS, rng).map((b) => {
      const a = pick(partitionableTwoDigits(b).filter((n) => n * b >= 100), 1, rng)[0];
      return { type: "short-multiplication", a, b, answer: a * b };
    });
  }

  const multiplier = pickCycling(YEAR3_TABLES, ROUNDS, rng);
  return shuffleValues(TWO_DIGIT_STORIES, rng).map((story, index) => {
    const b = multiplier[index];
    const a = pick(partitionableTwoDigits(b), 1, rng)[0];
    return { type: "two-digit-story", ...story(a, b) };
  });
}

/* ==========================================================================
   Topic 4 — Scaling and Correspondence Problems
   ========================================================================== */

const SCALE_SUBJECTS = [
  { short: "Red tower", tall: "Blue tower", unit: "cm", verb: "as high" },
  { short: "Green ribbon", tall: "Gold ribbon", unit: "cm", verb: "as long" },
  { short: "Short worm", tall: "Long worm", unit: "cm", verb: "as long" },
  { short: "Small jump", tall: "Big jump", unit: "cm", verb: "as far" },
  { short: "Thin stick", tall: "Thick stick", unit: "cm", verb: "as long" },
  { short: "Baby plant", tall: "Tall plant", unit: "cm", verb: "as high" },
];

const CORRESPONDENCE_SETS = [
  { topName: "hat", tops: ["🎩", "🧢", "👒"], bottomName: "coat", bottoms: ["🧥", "🥼", "👕", "👔"], noun: "outfits" },
  { topName: "bread", tops: ["🍞", "🥖"], bottomName: "filling", bottoms: ["🧀", "🥓", "🥬"], noun: "sandwiches" },
  { topName: "cone", tops: ["🍦", "🧇", "🥐"], bottomName: "topping", bottoms: ["🍓", "🍫", "🥜"], noun: "ice creams" },
  { topName: "top", tops: ["👚", "👕"], bottomName: "skirt", bottoms: ["👖", "🩳", "👗", "🥻"], noun: "outfits" },
  { topName: "base", tops: ["🍕", "🥙"], bottomName: "topping", bottoms: ["🍄", "🫒", "🌶️"], noun: "meals" },
  { topName: "pen", tops: ["🖊️", "✏️", "🖍️"], bottomName: "paper", bottoms: ["📄", "📃", "📜"], noun: "ways to draw" },
];

const SCALING_STORIES = [
  (a, k) => ({ prompt: `A toy car is ${a} cm long. A real car is ${k} times as long. How long is the real car, in cm?`, answer: a * k }),
  (a, k) => ({ prompt: `Tom is ${a} years old. His grandad is ${k} times as old. How old is his grandad?`, answer: a * k }),
  (a, k) => ({ prompt: `A puddle is ${a} cm wide. A pond is ${a * k} cm wide. How many times as wide as the puddle is the pond?`, answer: k }),
  (a, k) => ({ prompt: `A ribbon is ${a} cm long. A rope is ${a * k} cm long. How many times as long as the ribbon is the rope?`, answer: k }),
  (a, k) => ({ prompt: `There are ${a} shirts and ${k} pairs of shorts. How many different outfits can be made?`, answer: a * k }),
  (a, k) => ({ prompt: `A cafe has ${a} kinds of bread and ${k} kinds of filling. How many different sandwiches can it make?`, answer: a * k }),
];

export function buildScalingQuestions(level, rng) {
  assertLevel(level, "scaling and correspondence");

  if (level === 1 || level === 2) {
    const bases = pick(range(2, 9), ROUNDS, rng);
    const factors = pick([2, 3, 4, 5, 8, 10], ROUNDS, rng);
    return shuffleValues(SCALE_SUBJECTS, rng).map((subject, index) => {
      const base = bases[index];
      const factor = factors[index];
      const big = base * factor;
      return level === 1
        ? {
            type: "scale-read",
            subject,
            base,
            factor,
            big,
            answer: big,
            options: productOptions(big, base, rng),
          }
        : { type: "scale-factor", subject, base, factor, big, answer: factor };
    });
  }

  if (level === 3) {
    return shuffleValues(CORRESPONDENCE_SETS, rng).map((set) => ({
      type: "correspondence",
      ...set,
      answer: set.tops.length * set.bottoms.length,
    }));
  }

  const bases = pick(range(2, 9), ROUNDS, rng);
  const factors = pick([2, 3, 4, 5, 8, 10], ROUNDS, rng);
  return shuffleValues(SCALING_STORIES, rng).map((story, index) => ({
    type: "scaling-story",
    ...story(bases[index], factors[index]),
  }));
}

/* ==========================================================================
   Topic 5 — Multiplication and Division Problems
   ========================================================================== */

/**
 * A word problem with four calculations to choose between.
 *
 * The three wrong ones use exactly the same two numbers with a different
 * operation, so the choice is about what the story is doing rather than about
 * which numbers appear in it. `a > b` throughout: `a − b` must never be
 * negative, and equal numbers would collapse two options into one.
 */
/**
 * The four calculations offered for a word problem, and which one is right.
 *
 * `answerOption` is the expression to tap; `answer` stays the number it works
 * out to, because every round in every topic here reports a numeric `answer`
 * and a challenge component should not have to special-case one type.
 */
function operationChoice(kind, a, b, rng) {
  const total = a * b;
  const sums =
    kind === "multiply"
      ? { expression: `${a} × ${b}`, others: [`${a} + ${b}`, `${a} − ${b}`, `${total} ÷ ${b}`] }
      : { expression: `${total} ÷ ${b}`, others: [`${total} × ${b}`, `${total} + ${b}`, `${total} − ${b}`] };
  return {
    answerOption: sums.expression,
    options: shuffleValues([sums.expression, ...sums.others], rng),
  };
}

const OPERATION_STORIES = [
  { kind: "multiply", text: (a, b) => `There are ${b} boxes with ${a} pens in each. How many pens are there?` },
  { kind: "multiply", text: (a, b) => `A bus seats ${a} children. How many children fit on ${b} buses?` },
  { kind: "multiply", text: (a, b) => `One bag of bricks weighs ${a} kg. What do ${b} bags weigh?` },
  { kind: "divide", text: (a, b) => `${a * b} cherries are shared equally between ${b} bowls. How many cherries in each bowl?` },
  { kind: "divide", text: (a, b) => `${a * b} cards are dealt into piles of ${b}. How many piles are there?` },
  { kind: "divide", text: (a, b) => `${a * b} cm of string is cut into ${b} equal pieces. How long is each piece, in cm?` },
];

const TWO_STEP_STORIES = [
  (a, b, c) => ({ prompt: `A tray holds ${a} cakes. Mum buys ${b} trays, then eats ${c} cakes. How many cakes are left?`, answer: a * b - c }),
  (a, b, c) => ({ prompt: `There are ${b} tables with ${a} chairs at each. ${c} more chairs are carried in. How many chairs are there now?`, answer: a * b + c }),
  (a, b, c) => ({ prompt: `A book has ${a} pages in each chapter. Ali reads ${b} chapters and then ${c} more pages. How many pages has he read?`, answer: a * b + c }),
  (a, b, c) => ({ prompt: `${a * b} sweets are shared equally between ${b} children. Each child then eats ${c}. How many sweets does each child have left?`, answer: a - c }),
  (a, b, c) => ({ prompt: `${a * b} pencils are put into ${b} pots. ${c} pots are taken away. How many pencils are taken away?`, answer: a * c }),
  (a, b, c) => ({ prompt: `A pack holds ${a} stickers. Zoe has ${b} packs and gives ${c} whole packs away. How many stickers does she keep?`, answer: a * (b - c) }),
];

export function buildMulDivProblemQuestions(level, rng) {
  assertLevel(level, "multiplication and division problems");

  if (level === 1) {
    // a > b keeps `a − b` off the negative numbers and all four options apart.
    // pickCycling because 2-6 is five values against six rounds: picking
    // without repeats left the sixth `b` undefined, and the story built from
    // it read "There are undefined boxes with undefined pens in each".
    const bs = pickCycling(range(2, 6), ROUNDS, rng);
    return shuffleValues(OPERATION_STORIES, rng).map((story, index) => {
      const b = bs[index];
      const a = pick(range(b + 1, 12), 1, rng)[0];
      const { answerOption, options } = operationChoice(story.kind, a, b, rng);
      return {
        type: "pick-operation",
        prompt: story.text(a, b),
        answer: story.kind === "multiply" ? a * b : a,
        answerOption,
        options,
      };
    });
  }

  if (level === 2) {
    const tables = pickCycling(YEAR3_TABLES, ROUNDS, rng);
    const others = pick(range(2, 12), ROUNDS, rng);
    const forms = ["left-factor", "right-factor", "divisor", "dividend"];
    return tables.map((table, index) => {
      const other = others[index];
      const product = table * other;
      const form = forms[index % forms.length];
      if (form === "left-factor") {
        return { type: "missing-number", parts: ["?", "×", `${other}`, "=", `${product}`], answer: table };
      }
      if (form === "right-factor") {
        return { type: "missing-number", parts: [`${table}`, "×", "?", "=", `${product}`], answer: other };
      }
      if (form === "divisor") {
        return { type: "missing-number", parts: [`${product}`, "÷", "?", "=", `${other}`], answer: table };
      }
      return { type: "missing-number", parts: ["?", "÷", `${table}`, "=", `${other}`], answer: product };
    });
  }

  if (level === 3) {
    const tables = pickCycling(YEAR3_TABLES, ROUNDS, rng);
    const others = pick(range(2, 9), ROUNDS, rng);
    return tables.map((table, index) => {
      const other = others[index];
      const product = table * other;
      const multiply = index % 2 === 0;
      return multiply
        ? {
            type: "derive-fact",
            left: table,
            right: other,
            product,
            known: `${table} × ${other} = ${product}`,
            derived: `${table * 10} × ${other} = ?`,
            answer: product * 10,
          }
        : {
            type: "derive-fact",
            left: table,
            right: other,
            product,
            known: `${table} × ${other} = ${product}`,
            derived: `${product * 10} ÷ ${other} = ?`,
            answer: table * 10,
          };
    });
  }

  const as = pick(range(3, 9), ROUNDS, rng);
  const bs = pick(range(3, 8), ROUNDS, rng);
  return shuffleValues(TWO_STEP_STORIES, rng).map((story, index) => {
    const a = as[index];
    const b = bs[index];
    // c stays under both a and b, so no step of any story goes negative.
    const c = pick(range(1, Math.min(a, b) - 1), 1, rng)[0];
    return { type: "two-step-story", ...story(a, b, c) };
  });
}
