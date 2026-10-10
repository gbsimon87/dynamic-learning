import {
  difference,
  hasUniqueValues,
  leastPopular,
  mostPopular,
  nearMissOptions,
  pictogramOptions,
} from "../challenges/statistics.js";
import { assertLevel, multiples, pick, shuffle } from "./random.js";

/**
 * Chart Detective — endless questions about a tally chart, a pictogram or a
 * bar chart, all drawn by the challenge kit.
 *
 *   read        how many for one row (highlighted where the chart can)
 *   most/least  which row has the most / the fewest
 *   difference  how many more for one row than another
 *   total       two rows altogether (level 3)
 *
 * A tie makes "which has the most?" unfair — two right answers, one
 * accepted — so `mostPopular`/`leastPopular` answer null for one and the
 * dataset is drawn again, a bounded number of times (statistics.js).
 *
 * Levels: 1 is Year 2's tally charts and 1:2 pictograms; 2 adds 1:5
 * pictograms and bar charts in twos; 3 is Year 3's scales of 5 and 10.
 */

export const THEMES = [
  { caption: "Favourite pets", labels: ["Cats", "Dogs", "Fish", "Rabbits"], symbol: "🐾" },
  { caption: "Fruit eaten at lunch", labels: ["Apples", "Bananas", "Pears", "Grapes"], symbol: "🍎" },
  { caption: "Birds in the garden", labels: ["Robins", "Sparrows", "Blackbirds", "Pigeons"], symbol: "🐦" },
  { caption: "Weather this month", labels: ["Sunny", "Rainy", "Cloudy", "Windy"], symbol: "☀️" },
  { caption: "How we get to school", labels: ["Walk", "Car", "Bus", "Bike"], symbol: "🙂" },
  { caption: "Books read", labels: ["Monday", "Tuesday", "Wednesday", "Thursday"], symbol: "📕" },
];

/** Chart setups per level. `unit` is the value of one mark/symbol/gridline. */
const CHARTS = {
  1: [
    { chart: "tally", unit: 1, low: 1, high: 12, rows: 3 },
    { chart: "pictogram", unit: 2, low: 1, high: 6, rows: 3 },
  ],
  2: [
    { chart: "tally", unit: 1, low: 3, high: 20, rows: 4 },
    { chart: "pictogram", unit: 2, low: 1, high: 8, rows: 4 },
    { chart: "pictogram", unit: 5, low: 1, high: 6, rows: 3 },
    { chart: "bar", unit: 2, low: 1, high: 10, rows: 4 },
  ],
  3: [
    { chart: "pictogram", unit: 5, low: 1, high: 8, rows: 4 },
    { chart: "pictogram", unit: 10, low: 1, high: 8, rows: 4 },
    { chart: "bar", unit: 5, low: 1, high: 10, rows: 4 },
    { chart: "bar", unit: 10, low: 1, high: 10, rows: 4 },
  ],
};

const KINDS = {
  1: ["read", "read", "most", "least"],
  2: ["read", "most", "least", "difference", "difference"],
  3: ["read", "difference", "difference", "total", "most"],
};

const CHART_NAMES = { tally: "tally chart", pictogram: "pictogram", bar: "bar chart" };

/**
 * Rows with all-different values, drawn from a shuffled pool of whole
 * symbols/gridlines — bounded by construction, never a sampling loop.
 */
export function makeRows(rng, theme, setup) {
  const pool = shuffle(multiples(setup.low * setup.unit, setup.high * setup.unit, setup.unit), rng);
  const labels = shuffle(theme.labels, rng).slice(0, setup.rows);
  return labels.map((label, i) => ({ label, value: pool[i] }));
}

/**
 * A dataset that every question kind can be asked about fairly: unique
 * values, so most/least are never null. Ten tries, then a fixed fallback.
 */
export function makeDataset(rng, level) {
  for (let attempt = 0; attempt < 10; attempt += 1) {
    const setup = pick(rng, CHARTS[level]);
    const theme = pick(rng, THEMES);
    const rows = makeRows(rng, theme, setup);
    if (hasUniqueValues(rows) && mostPopular(rows) !== null && leastPopular(rows) !== null) {
      return { ...setup, theme, rows };
    }
  }
  const setup = CHARTS[level][0];
  const theme = THEMES[0];
  const rows = theme.labels.slice(0, setup.rows).map((label, i) => ({ label, value: (i + 1) * 2 * setup.unit }));
  return { ...setup, theme, rows };
}

function valueOptions(answer, setup, rng) {
  return setup.unit === 1 ? nearMissOptions(answer, 4, rng) : pictogramOptions(answer, setup.unit, 4, rng);
}

export function makeChartQuestion(rng, level) {
  assertLevel(level);
  const data = makeDataset(rng, level);
  const { rows, theme, chart, unit } = data;
  const kind = pick(rng, KINDS[level]);
  const look = `Look at the ${CHART_NAMES[chart]}.`;
  const common = {
    chart,
    unit,
    rows,
    caption: theme.caption,
    symbol: theme.symbol,
    max: data.high * unit,
    shape: `${chart}:${rows.map((r) => `${r.label}=${r.value}`).join(",")}`,
  };

  if (kind === "read") {
    const row = pick(rng, rows);
    return {
      ...common,
      kind,
      key: `read:${common.shape}:${row.label}`,
      highlight: row.label,
      answer: row.value,
      options: valueOptions(row.value, data, rng),
      prompt: `How many for ${row.label}?`,
      speech: `${look} How many for ${row.label}?`,
    };
  }

  if (kind === "most" || kind === "least") {
    const answer = kind === "most" ? mostPopular(rows) : leastPopular(rows);
    const word = kind === "most" ? "the most" : "the fewest";
    return {
      ...common,
      kind,
      key: `${kind}:${common.shape}`,
      answer,
      options: rows.map((r) => r.label),
      prompt: `Which has ${word}?`,
      speech: `${look} Which has ${word}?`,
    };
  }

  // Two different rows, bigger first, so "how many more" is never negative.
  const [a, b] = shuffle(rows, rng).slice(0, 2).sort((x, y) => y.value - x.value);

  if (kind === "difference") {
    const answer = difference(rows, a.label, b.label);
    return {
      ...common,
      kind,
      key: `difference:${common.shape}:${a.label}:${b.label}`,
      answer,
      options: valueOptions(answer, data, rng),
      prompt: `How many more for ${a.label} than ${b.label}?`,
      speech: `${look} How many more for ${a.label} than for ${b.label}?`,
    };
  }

  const answer = a.value + b.value;
  return {
    ...common,
    kind: "total",
    key: `total:${common.shape}:${a.label}:${b.label}`,
    answer,
    options: valueOptions(answer, data, rng),
    prompt: `How many for ${a.label} and ${b.label} altogether?`,
    speech: `${look} How many for ${a.label} and ${b.label} altogether?`,
  };
}
