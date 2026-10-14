/**
 * Question builders for the five Year 2 Statistics topics: Pictograms, Tally
 * Charts, Block Diagrams, Tables, and Gathering Information and Using Data.
 *
 * Pure, and every builder takes `rng`, so a challenge randomises per mount
 * while the tests stay deterministic. Each returns QUESTION_COUNT questions
 * with a different dataset every time - never a fixed list in a new order.
 *
 * Every dataset is drawn with ALL-DIFFERENT values. That is what keeps
 * "which has the most?", "put them in order" and "the two smallest" to one
 * right answer (see the tie rule in statistics.js), and it costs nothing for
 * the questions that do not need it.
 */
import { pictogramOptions, sortByQuantity, mostPopular, leastPopular, total, shuffle } from "./statistics.js";

export const QUESTION_COUNT = 6;

function pick(items, rng) {
  return items[Math.floor(rng() * items.length)];
}

function randomInt(min, max, rng) {
  return min + Math.floor(rng() * (max - min + 1));
}

/** `count` different whole numbers from min..max. */
export function distinctValues(count, min, max, rng) {
  const pool = Array.from({ length: max - min + 1 }, (_, i) => min + i);
  return shuffle(pool, rng).slice(0, count);
}

/**
 * The answer plus `count - 1` near misses picked at random from
 * answer ± each of `deltas`. Picking at random (rather than always the
 * closest) means the answer does not sit in the same place among the sorted
 * options every time, so it cannot be found from the layout. Never below 1
 * against a non-zero answer, never a duplicate.
 */
export function mixedNearMisses(answer, deltas, count, rng) {
  const floor = answer === 0 ? 0 : 1;
  const candidates = [...new Set(deltas.flatMap((d) => [answer - d, answer + d]))].filter(
    (n) => n >= floor && n !== answer
  );
  return shuffle([answer, ...shuffle(candidates, rng).slice(0, count - 1)], rng);
}

/**
 * The things being counted. Every category is a place or a time, so one
 * phrase pattern ("goals ON Monday", "fish IN Tank A") reads naturally for
 * every question: how many, how many more, together, which has the most.
 * `holder` marks contexts where "would Tank B need ... to have as many as"
 * makes sense; `long` marks day names, too wide for a block-diagram column.
 */
export const CONTEXTS = [
  { id: "goals", symbol: "⚽", unit: "goals", prep: "on", kind: "day", kinds: "days", caption: "Goals scored", labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], long: true },
  { id: "cakes", symbol: "🧁", unit: "cakes", prep: "on", kind: "day", kinds: "days", caption: "Cakes baked", labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], long: true },
  { id: "fish", symbol: "🐟", unit: "fish", prep: "in", kind: "tank", kinds: "tanks", caption: "Fish in each tank", labels: ["Tank A", "Tank B", "Tank C", "Tank D"], holder: true },
  { id: "flowers", symbol: "🌻", unit: "flowers", prep: "in", kind: "pot", kinds: "pots", caption: "Flowers in each pot", labels: ["Pot 1", "Pot 2", "Pot 3", "Pot 4"], holder: true },
  { id: "stars", symbol: "⭐", unit: "stars", prep: "in", kind: "class", kinds: "classes", caption: "Stars earned", labels: ["Class 1", "Class 2", "Class 3", "Class 4"], holder: true },
  { id: "balloons", symbol: "🎈", unit: "balloons", prep: "at", kind: "party", kinds: "parties", caption: "Balloons at each party", labels: ["Party 1", "Party 2", "Party 3", "Party 4"], holder: true },
  { id: "apples", symbol: "🍎", unit: "apples", prep: "on", kind: "tree", kinds: "trees", caption: "Apples on each tree", labels: ["Tree 1", "Tree 2", "Tree 3", "Tree 4"], holder: true },
  { id: "books", symbol: "📕", unit: "books", prep: "on", kind: "shelf", kinds: "shelves", caption: "Books on each shelf", labels: ["Shelf 1", "Shelf 2", "Shelf 3", "Shelf 4"], holder: true },
  { id: "shells", symbol: "🐚", unit: "shells", prep: "in", kind: "bucket", kinds: "buckets", caption: "Shells in each bucket", labels: ["Bucket 1", "Bucket 2", "Bucket 3", "Bucket 4"], holder: true },
];

/** The words for one category: "fish in Tank A". */
function of(context, label) {
  return `${context.prep} ${label}`;
}

export const phrase = {
  read: (c, a) => `How many ${c.unit} ${of(c, a)}?`,
  more: (c, a, b) => `How many more ${c.unit} ${of(c, a)} than ${of(c, b)}?`,
  together: (c, a, b) => `How many ${c.unit} ${of(c, a)} and ${b} together?`,
  total: (c) => `How many ${c.unit} altogether?`,
  most: (c) => `Which ${c.kind} has the most ${c.unit}?`,
  fewest: (c) => `Which ${c.kind} has the fewest ${c.unit}?`,
  catchUp: (c, a, b) => `How many more ${c.unit} would ${a} need to have as many as ${b}?`,
  twoSmallest: (c) => `Add together the 2 ${c.kinds} with the fewest ${c.unit}.`,
};

/** Six contexts, all different, from those that pass `filter`. */
function contextsFor(rng, filter = () => true) {
  const pool = shuffle(CONTEXTS.filter(filter), rng);
  return Array.from({ length: QUESTION_COUNT }, (_, i) => pool[i % pool.length]);
}

/** Rows in the context's own label order, with the given values. */
function rowsOf(context, values) {
  const labels = context.labels.slice(0, values.length);
  return labels.map((label, i) => ({ label, value: values[i] }));
}

function valueOf(rows, label) {
  return rows.find((row) => row.label === label).value;
}

/** Two different labels, the first with the bigger value. */
function biggerFirst(rows, rng) {
  const [a, b] = shuffle(rows, rng).slice(0, 2);
  return a.value > b.value ? [a.label, b.label] : [b.label, a.label];
}

/**
 * Typed word problems on `rows`. `kind` is one of total, pair, difference,
 * catch-up, two-smallest. The story and the answer come from the same rows.
 */
function wordProblem(kind, context, rows, rng) {
  if (kind === "total") return { story: phrase.total(context), answer: total(rows) };
  if (kind === "pair") {
    // Named in the order the chart shows them, so "Tank A and Tank C", never "Tank C and Tank A".
    const [a, b] = shuffle(rows, rng)
      .slice(0, 2)
      .sort((x, y) => rows.indexOf(x) - rows.indexOf(y))
      .map((r) => r.label);
    return { story: phrase.together(context, a, b), answer: valueOf(rows, a) + valueOf(rows, b) };
  }
  if (kind === "difference") {
    const [a, b] = biggerFirst(rows, rng);
    return { story: phrase.more(context, a, b), answer: valueOf(rows, a) - valueOf(rows, b) };
  }
  if (kind === "catch-up") {
    const [big, small] = biggerFirst(rows, rng);
    return { story: phrase.catchUp(context, small, big), answer: valueOf(rows, big) - valueOf(rows, small) };
  }
  if (kind === "two-smallest") {
    const sorted = [...rows].sort((x, y) => x.value - y.value);
    return { story: phrase.twoSmallest(context), answer: sorted[0].value + sorted[1].value };
  }
  throw new Error(`unknown word problem "${kind}"`);
}

/* ------------------------------------------------------------------ */
/* Pictograms                                                          */
/* ------------------------------------------------------------------ */

/** The cap on symbols in one row; the construct control stops here too. */
export const MAX_SYMBOLS = 8;

function pictogramRows(context, ratio, count, rng, maxSymbols = MAX_SYMBOLS) {
  return rowsOf(context, distinctValues(count, 1, maxSymbols, rng).map((n) => n * ratio));
}

/**
 * Challenge 1 - one symbol stands for 2, the asked row is highlighted, and
 * the options include the number of symbols (the classic "forgot the key"
 * answer).
 */
export function buildPictogramRead(rng) {
  return contextsFor(rng).map((context) => {
    const rows = pictogramRows(context, 2, 3, rng);
    const ask = pick(rows, rng).label;
    const answer = valueOf(rows, ask);
    return { symbol: context.symbol, ratio: 2, rows, ask, prompt: phrase.read(context, ask), answer, options: pictogramOptions(answer, 2, 4, rng) };
  });
}

/**
 * Challenge 2 - keys of 5 and 10, nothing highlighted. Most, fewest and
 * "how many more" twice each.
 */
export function buildPictogramCompare(rng) {
  const kinds = shuffle(["most", "most", "fewest", "fewest", "difference", "difference"], rng);
  const ratios = shuffle([5, 5, 5, 10, 10, 10], rng);
  return contextsFor(rng).map((context, i) => {
    const ratio = ratios[i];
    const rows = pictogramRows(context, ratio, 3, rng);
    const base = { symbol: context.symbol, ratio, rows };
    if (kinds[i] === "difference") {
      const [a, b] = biggerFirst(rows, rng);
      const answer = valueOf(rows, a) - valueOf(rows, b);
      // Whole symbols out, plus the SYMBOL difference - the key forgotten.
      const raw = [answer, answer / ratio, answer + ratio, answer - ratio, answer + 2 * ratio];
      const options = shuffle([...new Set(raw.filter((n) => n > 0))].slice(0, 4), rng);
      return { ...base, kind: "difference", prompt: phrase.more(context, a, b), answer, options };
    }
    const answer = kinds[i] === "most" ? mostPopular(rows) : leastPopular(rows);
    return {
      ...base,
      kind: kinds[i],
      prompt: kinds[i] === "most" ? phrase.most(context) : phrase.fewest(context),
      answer,
      options: shuffle(rows.map((row) => row.label), rng),
    };
  });
}

/** Challenge 3 - build the pictogram from a table; keys of 2, 5 and 10 twice each. */
export function buildPictogramConstruct(rng) {
  const ratios = shuffle([2, 2, 5, 5, 10, 10], rng);
  return contextsFor(rng).map((context, i) => ({
    symbol: context.symbol,
    ratio: ratios[i],
    caption: context.caption,
    targets: pictogramRows(context, ratios[i], 3, rng),
  }));
}

/**
 * Challenge 4 - typed word problems: altogether, together and how many more,
 * twice each, with every answer inside 100.
 */
export function buildPictogramProblems(rng) {
  const kinds = shuffle(["total", "total", "pair", "pair", "difference", "difference"], rng);
  const ratios = shuffle([2, 2, 5, 5, 10, 10], rng);
  return contextsFor(rng).map((context, i) => {
    const ratio = ratios[i];
    let rows = pictogramRows(context, ratio, 3, rng);
    while (total(rows) > 100) rows = pictogramRows(context, ratio, 3, rng);
    return { symbol: context.symbol, ratio, rows, ...wordProblem(kinds[i], context, rows, rng) };
  });
}

/* ------------------------------------------------------------------ */
/* Tally Charts                                                        */
/* ------------------------------------------------------------------ */

/**
 * Challenge 1 - read one highlighted row. The asked count is at least 5, so
 * there is always a gate to count, and the near misses include being a whole
 * gate out.
 */
export function buildTallyRead(rng) {
  return contextsFor(rng).map((context) => {
    const askedValue = randomInt(5, 19, rng);
    const others = shuffle(
      Array.from({ length: 20 }, (_, i) => i + 1).filter((n) => n !== askedValue),
      rng
    ).slice(0, 2);
    const values = shuffle([askedValue, ...others], rng);
    const rows = rowsOf(context, values);
    const ask = rows.find((row) => row.value === askedValue).label;
    return {
      rows,
      ask,
      prompt: phrase.read(context, ask),
      answer: askedValue,
      options: mixedNearMisses(askedValue, [1, 2, 5], 4, rng),
    };
  });
}

/** Challenge 2 - the whole chart, nothing highlighted: most, fewest, altogether. */
export function buildTallyWhole(rng) {
  const kinds = shuffle(["most", "most", "fewest", "fewest", "total", "total"], rng);
  return contextsFor(rng).map((context, i) => {
    const rows = rowsOf(context, distinctValues(kinds[i] === "total" ? 3 : 4, 1, 15, rng));
    if (kinds[i] === "total") {
      const answer = total(rows);
      return { rows, kind: "total", prompt: phrase.total(context), answer, options: mixedNearMisses(answer, [1, 2, 5, 10], 4, rng) };
    }
    return {
      rows,
      kind: kinds[i],
      prompt: kinds[i] === "most" ? phrase.most(context) : phrase.fewest(context),
      answer: kinds[i] === "most" ? mostPopular(rows) : leastPopular(rows),
      options: shuffle(rows.map((row) => row.label), rng),
    };
  });
}

/** Piles of things to count, each with names for the prompt. */
export const PILE_SETS = [
  [{ emoji: "🍎", name: "apples" }, { emoji: "🍐", name: "pears" }, { emoji: "🍌", name: "bananas" }, { emoji: "🍇", name: "grapes" }],
  [{ emoji: "🐱", name: "cats" }, { emoji: "🐶", name: "dogs" }, { emoji: "🐠", name: "fish" }, { emoji: "🐦", name: "birds" }],
  [{ emoji: "🔴", name: "red counters" }, { emoji: "🔵", name: "blue counters" }, { emoji: "🟡", name: "yellow counters" }, { emoji: "🟢", name: "green counters" }],
  [{ emoji: "⭐", name: "stars" }, { emoji: "❤️", name: "hearts" }, { emoji: "🌙", name: "moons" }, { emoji: "☀️", name: "suns" }],
  [{ emoji: "🚗", name: "cars" }, { emoji: "🚌", name: "buses" }, { emoji: "🚲", name: "bikes" }, { emoji: "🚚", name: "lorries" }],
  [{ emoji: "🌻", name: "sunflowers" }, { emoji: "🌷", name: "tulips" }, { emoji: "🌹", name: "roses" }, { emoji: "🌼", name: "daisies" }],
];

/**
 * A shuffled pile with `size` kinds on all-different counts. The kinds come
 * back in a fresh order too, so the chart rows are not always in the same
 * order as last time.
 */
function makePile(set, size, min, max, rng) {
  const kinds = shuffle(set, rng).slice(0, size);
  const counts = distinctValues(size, min, max, rng);
  const items = shuffle(kinds.flatMap((kind, i) => Array.from({ length: counts[i] }, () => kind.emoji)), rng);
  return { kinds, counts, items, categories: kinds.map((k) => k.emoji) };
}

function pilesFor(rng) {
  return shuffle(PILE_SETS, rng);
}

/** Challenge 3 - tally a jumbled pile of three kinds. */
export function buildTallyPile(rng) {
  return pilesFor(rng).map((set) => {
    const pile = makePile(set, 3, 2, 9, rng);
    return {
      items: pile.items,
      categories: pile.categories,
      targets: pile.categories.map((label, i) => ({ label, value: pile.counts[i] })),
    };
  });
}

/**
 * Challenge 4 - typed word problems off a four-row chart: altogether, how
 * many more, and "how many more would it need to catch up".
 */
export function buildTallyProblems(rng) {
  const kinds = shuffle(["total", "difference", "difference", "catch-up", "catch-up", "pair"], rng);
  return contextsFor(rng, (c) => c.holder).map((context, i) => {
    const rows = rowsOf(context, distinctValues(4, 1, 15, rng));
    return { rows, ...wordProblem(kinds[i], context, rows, rng) };
  });
}

/* ------------------------------------------------------------------ */
/* Block Diagrams                                                      */
/* ------------------------------------------------------------------ */

/** The top of the scale: the biggest value, rounded up to a whole step, at least 6. */
export function scaleTop(rows, step) {
  const biggest = Math.max(...rows.map((row) => row.value), 6);
  return Math.ceil(biggest / step) * step;
}

const SHORT = (c) => !c.long;

/** Challenge 1 - one block is one thing; the asked column is highlighted. */
export function buildBlockRead(rng) {
  return contextsFor(rng, SHORT).map((context) => {
    const rows = rowsOf(context, distinctValues(3, 1, 10, rng));
    const ask = pick(rows, rng).label;
    const answer = valueOf(rows, ask);
    return { rows, max: scaleTop(rows, 2), ask, prompt: phrase.read(context, ask), answer, options: mixedNearMisses(answer, [1, 2, 3], 4, rng) };
  });
}

/**
 * Challenge 2 - the scale goes up in 2s and nothing is highlighted. The asked
 * column stops on an ODD number, between two labels, so reading the nearest
 * label is wrong and counting is right - the whole point of the slot.
 */
export function buildBlockScale(rng) {
  return contextsFor(rng, SHORT).map((context) => {
    const asked = pick([3, 5, 7, 9, 11, 13], rng);
    const others = distinctValues(3, 1, 14, rng).filter((n) => n !== asked).slice(0, 2);
    const rows = rowsOf(context, shuffle([asked, ...others], rng));
    const ask = rows.find((row) => row.value === asked).label;
    return { rows, max: scaleTop(rows, 2), ask, prompt: phrase.read(context, ask), answer: asked, options: mixedNearMisses(asked, [1, 2, 3], 4, rng) };
  });
}

/** Challenge 3 - build the block diagram from a table. */
export function buildBlockConstruct(rng) {
  return contextsFor(rng, SHORT).map((context) => {
    const targets = rowsOf(context, distinctValues(3, 1, 12, rng));
    return { caption: context.caption, max: scaleTop(targets, 2), targets };
  });
}

/** Challenge 4 - typed problems off four columns on a scale of 2s. */
export function buildBlockProblems(rng) {
  const kinds = shuffle(["total", "difference", "difference", "pair", "two-smallest", "two-smallest"], rng);
  return contextsFor(rng, SHORT).map((context, i) => {
    const rows = rowsOf(context, distinctValues(4, 1, 14, rng));
    return { rows, max: scaleTop(rows, 2), ...wordProblem(kinds[i], context, rows, rng) };
  });
}

/* ------------------------------------------------------------------ */
/* Tables                                                              */
/* ------------------------------------------------------------------ */

/** Challenge 1 - a one-column table with the asked row highlighted. */
export function buildTableRead(rng) {
  return contextsFor(rng).map((context) => {
    const rows = rowsOf(context, distinctValues(4, 2, 20, rng));
    const ask = pick(rows, rng).label;
    return {
      caption: context.caption,
      column: "How many",
      rows,
      ask,
      prompt: phrase.read(context, ask),
      answer: valueOf(rows, ask),
      // Every option is a number in the table: one from nowhere could be
      // ruled out without reading the table at all.
      options: shuffle(rows.map((row) => row.value), rng),
    };
  });
}

/**
 * Two-column tables. Each knows how to say a cell, a whole row, a whole
 * column and "how many more in one column than the other" in plain words.
 */
export const TWO_WAY = [
  {
    caption: "Goals scored",
    rows: ["Lions", "Tigers", "Bears", "Wolves"],
    columns: [{ key: "home", label: "At home" }, { key: "away", label: "Away" }],
    cell: (r, c) => `How many goals did the ${r} score ${c === "home" ? "at home" : "away"}?`,
    more: (r, a, b) => `How many more goals did the ${r} score ${a === "home" ? "at home" : "away"} than ${b === "home" ? "at home" : "away"}?`,
    rowTotal: (r) => `How many goals did the ${r} score altogether?`,
    columnTotal: (c) => `How many goals were scored ${c === "home" ? "at home" : "away"} altogether?`,
  },
  {
    caption: "Books read",
    rows: ["Ava", "Ben", "Cleo", "Dev"],
    columns: [{ key: "week1", label: "Week 1" }, { key: "week2", label: "Week 2" }],
    cell: (r, c) => `How many books did ${r} read in ${c === "week1" ? "Week 1" : "Week 2"}?`,
    more: (r, a, b) => `How many more books did ${r} read in ${a === "week1" ? "Week 1" : "Week 2"} than in ${b === "week1" ? "Week 1" : "Week 2"}?`,
    rowTotal: (r) => `How many books did ${r} read altogether?`,
    columnTotal: (c) => `How many books were read in ${c === "week1" ? "Week 1" : "Week 2"} altogether?`,
  },
  {
    caption: "Fruit sold",
    rows: ["Apples", "Pears", "Plums", "Peaches"],
    columns: [{ key: "morning", label: "Morning" }, { key: "afternoon", label: "Afternoon" }],
    cell: (r, c) => `How many ${r.toLowerCase()} were sold in the ${c}?`,
    more: (r, a, b) => `How many more ${r.toLowerCase()} were sold in the ${a} than in the ${b}?`,
    rowTotal: (r) => `How many ${r.toLowerCase()} were sold altogether?`,
    columnTotal: (c) => `How many pieces of fruit were sold in the ${c} altogether?`,
  },
  {
    caption: "Trains counted",
    rows: ["Platform 1", "Platform 2", "Platform 3", "Platform 4"],
    columns: [{ key: "monday", label: "Monday" }, { key: "friday", label: "Friday" }],
    cell: (r, c) => `How many trains used ${r} on ${c === "monday" ? "Monday" : "Friday"}?`,
    more: (r, a, b) => `How many more trains used ${r} on ${a === "monday" ? "Monday" : "Friday"} than on ${b === "monday" ? "Monday" : "Friday"}?`,
    rowTotal: (r) => `How many trains used ${r} altogether?`,
    columnTotal: (c) => `How many trains were counted on ${c === "monday" ? "Monday" : "Friday"} altogether?`,
  },
  {
    caption: "Cakes baked",
    rows: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    columns: [{ key: "small", label: "Small" }, { key: "big", label: "Big" }],
    cell: (r, c) => `How many ${c} cakes were baked on ${r}?`,
    more: (r, a, b) => `On ${r}, how many more ${a} cakes were baked than ${b} cakes?`,
    rowTotal: (r) => `How many cakes were baked on ${r} altogether?`,
    columnTotal: (c) => `How many ${c} cakes were baked altogether?`,
  },
  {
    caption: "Stickers earned",
    rows: ["Ella", "Finn", "Gita", "Hal"],
    columns: [{ key: "maths", label: "Maths" }, { key: "reading", label: "Reading" }],
    cell: (r, c) => `How many ${c} stickers did ${r} earn?`,
    more: (r, a, b) => `How many more ${a} stickers than ${b} stickers did ${r} earn?`,
    rowTotal: (r) => `How many stickers did ${r} earn altogether?`,
    columnTotal: (c) => `How many ${c} stickers were earned altogether?`,
  },
];

/** A 3-row, 2-column table with six all-different values from 2 to 20. */
function twoWayTable(spec, rng) {
  const labels = shuffle(spec.rows, rng).slice(0, 3);
  const values = distinctValues(6, 2, 20, rng);
  const rows = labels.map((label, i) => ({
    label,
    [spec.columns[0].key]: values[i * 2],
    [spec.columns[1].key]: values[i * 2 + 1],
  }));
  return { caption: spec.caption, columns: spec.columns, rows };
}

/**
 * Challenge 2 - follow a row and a column until they meet. The wrong options
 * are the cells in the same row and column: where following one line right
 * and the other wrong lands you.
 */
export function buildTableCell(rng) {
  return shuffle(TWO_WAY, rng).map((spec) => {
    const table = twoWayTable(spec, rng);
    const row = pick(table.rows, rng);
    const column = pick(spec.columns, rng).key;
    const answer = row[column];
    const nearby = [
      ...spec.columns.map((c) => row[c.key]),
      ...table.rows.map((r) => r[column]),
    ];
    const options = shuffle([answer, ...shuffle([...new Set(nearby)].filter((n) => n !== answer), rng).slice(0, 3)], rng);
    return { ...table, story: spec.cell(row.label, column), answer, options };
  });
}

/** Challenge 3 - fill the gap in a table from the tally chart beside it. */
export function buildTableFromTally(rng) {
  return contextsFor(rng).map((context) => {
    const rows = rowsOf(context, distinctValues(3, 2, 20, rng));
    // Never the first row, so the table has to be read down to find the gap.
    const missing = rows[randomInt(1, 2, rng)].label;
    return { caption: context.caption, column: "How many", rows, missing, prompt: phrase.read(context, missing), answer: valueOf(rows, missing) };
  });
}

/**
 * Challenge 4 - typed problems that need two cells: a whole row, a whole
 * column, or how many more - twice each.
 */
export function buildTableProblems(rng) {
  const kinds = shuffle(["row-total", "row-total", "column-total", "column-total", "difference", "difference"], rng);
  return shuffle(TWO_WAY, rng).map((spec, i) => {
    const table = twoWayTable(spec, rng);
    const kind = kinds[i];
    if (kind === "row-total") {
      const row = pick(table.rows, rng);
      return { ...table, kind, story: spec.rowTotal(row.label), answer: spec.columns.reduce((sum, c) => sum + row[c.key], 0) };
    }
    if (kind === "column-total") {
      const column = pick(spec.columns, rng).key;
      return { ...table, kind, story: spec.columnTotal(column), answer: table.rows.reduce((sum, r) => sum + r[column], 0) };
    }
    // How many more: the same row across the two columns.
    const row = pick(table.rows, rng);
    const [a, b] = spec.columns.map((c) => c.key);
    const [big, small] = row[a] > row[b] ? [a, b] : [b, a];
    return { ...table, kind, story: spec.more(row.label, big, small), answer: row[big] - row[small] };
  });
}

/* ------------------------------------------------------------------ */
/* Gathering Information and Using Data                                */
/* ------------------------------------------------------------------ */

/** Challenge 1 - count one kind in a jumbled pile of three. */
export function buildPileCount(rng) {
  return pilesFor(rng).map((set) => {
    const pile = makePile(set, 3, 2, 9, rng);
    const index = randomInt(0, 2, rng);
    const answer = pile.counts[index];
    return {
      items: pile.items,
      ask: pile.kinds[index].emoji,
      name: pile.kinds[index].name,
      answer,
      options: mixedNearMisses(answer, [1, 2, 3], 4, rng),
    };
  });
}

/** Challenge 2 - count four kinds and put them in order, most or fewest first. */
export function buildPileSort(rng) {
  const directions = shuffle(["most-first", "most-first", "most-first", "fewest-first", "fewest-first", "fewest-first"], rng);
  return pilesFor(rng).map((set, i) => {
    const pile = makePile(set, 4, 2, 8, rng);
    const rows = pile.categories.map((label, k) => ({ label, value: pile.counts[k] }));
    const answer = sortByQuantity(rows, directions[i]);
    let start = shuffle(pile.categories, rng);
    while (start.every((c, k) => c === answer[k])) start = shuffle(pile.categories, rng);
    return { items: pile.items, direction: directions[i], answer, start };
  });
}

/** The block-diagram scale for a pile: 10 blocks. */
export const PILE_MAX = 10;

/** Challenge 3 - turn a jumbled pile of four kinds into a block diagram. */
export function buildPileToBlocks(rng) {
  return pilesFor(rng).map((set) => {
    const pile = makePile(set, 4, 1, PILE_MAX, rng);
    return {
      items: pile.items,
      categories: pile.categories,
      targets: pile.categories.map((label, i) => ({ label, value: pile.counts[i] })),
    };
  });
}

/**
 * Challenge 4 - typed questions straight off the pile: altogether, together,
 * how many more, and how many of the most common kind.
 */
export function buildPileProblems(rng) {
  const kinds = shuffle(["total", "pair", "difference", "difference", "most", "pair"], rng);
  return pilesFor(rng).map((set, i) => {
    const pile = makePile(set, 3, 2, 9, rng);
    const kind = kinds[i];
    const word = (k) => `${pile.kinds[k].emoji} ${pile.kinds[k].name}`;
    const order = shuffle([0, 1, 2], rng);
    let story;
    let answer;
    if (kind === "total") {
      story = "How many things are in the pile altogether?";
      answer = pile.counts.reduce((sum, n) => sum + n, 0);
    } else if (kind === "pair") {
      const [a, b] = order;
      story = `How many ${word(a)} and ${word(b)} are there together?`;
      answer = pile.counts[a] + pile.counts[b];
    } else if (kind === "difference") {
      const [a, b] = order;
      const [big, small] = pile.counts[a] > pile.counts[b] ? [a, b] : [b, a];
      story = `How many more ${word(big)} than ${word(small)}?`;
      answer = pile.counts[big] - pile.counts[small];
    } else {
      story = "Find the kind there is MOST of. How many of that kind are there?";
      answer = Math.max(...pile.counts);
    }
    return { items: pile.items, kind, story, answer };
  });
}
