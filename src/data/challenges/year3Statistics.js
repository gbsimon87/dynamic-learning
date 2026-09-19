import {
  difference,
  nearMissOptions,
  pictogramOptions,
  shuffle,
  symbolCount,
} from "./statistics.js";

/**
 * Year 3 Statistics. Every visible value is derived from these small counts,
 * so a scaled picture, its key, and the checked answer cannot drift apart.
 * All randomisation is injected for deterministic node:test coverage.
 */
const DATASETS = [
  { caption: "Books read", unit: "books", labels: ["Oak", "Elm", "Ash"], counts: [2, 4, 5], symbol: "📕" },
  { caption: "Fruit sold", unit: "fruit", labels: ["Apples", "Pears", "Plums"], counts: [3, 5, 6], symbol: "🍎" },
  { caption: "Birds seen", unit: "birds", labels: ["Robins", "Sparrows", "Finches"], counts: [2, 3, 5], symbol: "🐦" },
  { caption: "Stickers earned", unit: "stickers", labels: ["Ava", "Ben", "Cara"], counts: [1, 4, 6], symbol: "⭐" },
  { caption: "Tickets sold", unit: "tickets", labels: ["Monday", "Tuesday", "Friday"], counts: [2, 5, 6], symbol: "🎟️" },
  { caption: "Goals scored", unit: "goals", labels: ["Red", "Blue", "Green"], counts: [3, 4, 6], symbol: "⚽" },
];

const TABLES = [
  { caption: "Books read", unit: "books", columns: ["Week 1", "Week 2"], labels: ["Ava", "Ben", "Cara"], values: [[8, 12], [14, 9], [6, 15]] },
  { caption: "Goals scored", unit: "goals", columns: ["Monday", "Friday"], labels: ["Lions", "Tigers", "Bears"], values: [[10, 7], [5, 13], [12, 8]] },
  { caption: "Fruit sold", unit: "fruit", columns: ["Morning", "Afternoon"], labels: ["Apples", "Pears", "Plums"], values: [[15, 8], [9, 11], [7, 12]] },
  { caption: "Stickers earned", unit: "stickers", columns: ["Maths", "Reading"], labels: ["Ava", "Ben", "Cara"], values: [[11, 14], [8, 10], [6, 9]] },
  { caption: "Cakes baked", unit: "cakes", columns: ["Monday", "Tuesday"], labels: ["Small", "Large", "Iced"], values: [[12, 7], [10, 13], [6, 11]] },
  { caption: "Trees planted", unit: "trees", columns: ["Spring", "Summer"], labels: ["Oak", "Elm", "Ash"], values: [[9, 12], [5, 14], [7, 10]] },
];

const STEPS = [2, 5, 10];

function assertLevel(level) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError(`Unknown challenge level: ${level}`);
}

function six(rng) {
  return shuffle(DATASETS, rng);
}

function scaledRows(dataset, scale) {
  return dataset.labels.map((label, index) => ({ label, value: dataset.counts[index] * scale }));
}

function rowValue(rows, label) {
  return rows.find((row) => row.label === label).value;
}

function twoStepAnswer(rows) {
  return rows[1].value + rows[2].value - rows[0].value;
}

export function buildBarChartQuestions(level, rng = Math.random) {
  assertLevel(level);
  return six(rng).map((dataset, index) => {
    const step = level === 1 ? 2 : STEPS[index % STEPS.length];
    const rows = scaledRows(dataset, step);
    const common = { caption: dataset.caption, unit: dataset.unit, rows, step, max: 6 * step };

    if (level === 1) {
      const ask = rows[index % rows.length].label;
      const answer = rowValue(rows, ask);
      return { ...common, type: "bar-read", ask, answer, options: nearMissOptions(answer, 4, rng) };
    }
    if (level === 2) {
      const [first, second] = [rows[0].label, rows[2].label];
      const answer = difference(rows, first, second);
      return { ...common, type: "bar-difference", first, second, answer, options: nearMissOptions(answer, 4, rng) };
    }
    if (level === 3) return { ...common, type: "bar-build", answer: rows.map((row) => row.value) };

    return {
      ...common,
      type: "bar-story",
      prompt: `How many more ${dataset.unit} do ${rows[1].label} and ${rows[2].label} have together than ${rows[0].label}?`,
      answer: twoStepAnswer(rows),
    };
  });
}

export function buildScaledPictogramQuestions(level, rng = Math.random) {
  assertLevel(level);
  return six(rng).map((dataset, index) => {
    const ratio = level === 1 ? 2 : STEPS[index % STEPS.length];
    const rows = scaledRows(dataset, ratio);
    const common = { caption: dataset.caption, unit: dataset.unit, rows, ratio, symbol: dataset.symbol };

    if (level === 1) {
      const ask = rows[index % rows.length].label;
      const answer = rowValue(rows, ask);
      return { ...common, type: "pictogram-read", ask, answer, options: pictogramOptions(answer, ratio, 4, rng) };
    }
    if (level === 2) {
      const [first, second] = [rows[0].label, rows[2].label];
      const answer = difference(rows, first, second);
      return { ...common, type: "pictogram-difference", first, second, answer, options: nearMissOptions(answer, 4, rng) };
    }
    if (level === 3) return { ...common, type: "pictogram-build", answer: rows.map((row) => symbolCount(row.value, ratio)) };

    const answer = symbolCount(rows[0].value + rows[1].value, ratio);
    return {
      ...common,
      type: "pictogram-story",
      prompt: `If you put ${rows[0].label} and ${rows[1].label} together, how many ${dataset.symbol} symbols would show their total?`,
      answer,
    };
  });
}

function tableView(dataset) {
  const columns = dataset.columns.map((label, index) => ({ key: `column${index}`, label }));
  const rows = dataset.labels.map((label, rowIndex) => ({
    label,
    cells: Object.fromEntries(columns.map((column, columnIndex) => [column.key, dataset.values[rowIndex][columnIndex]])),
  }));
  return { caption: dataset.caption, unit: dataset.unit, columns, rows };
}

export function buildTableQuestions(level, rng = Math.random) {
  assertLevel(level);
  if (level === 3) return six(rng).map((dataset, index) => {
    const step = STEPS[index % STEPS.length];
    const sourceRows = scaledRows(dataset, step);
    const ask = sourceRows[(index + 1) % sourceRows.length].label;
    return {
      type: "table-fill-from-bar",
      caption: dataset.caption,
      unit: dataset.unit,
      columns: [{ key: "count", label: "How many" }],
      rows: sourceRows.map((row) => ({ label: row.label, cells: { count: row.value } })),
      sourceRows,
      step,
      max: 6 * step,
      ask,
      answer: rowValue(sourceRows, ask),
    };
  });

  return shuffle(TABLES, rng).map((dataset, index) => {
    const common = tableView(dataset);
    if (level === 1) {
      const row = common.rows[index % common.rows.length];
      const column = common.columns[index % common.columns.length];
      const answer = row.cells[column.key];
      return {
        ...common, type: "table-read", ask: row.label, column: column.key,
        columnLabel: column.label, answer, options: nearMissOptions(answer, 4, rng),
      };
    }
    if (level === 2) {
      const row = common.rows[index % common.rows.length];
      const answer = row.cells.column0 + row.cells.column1;
      return { ...common, type: "table-row-total", ask: row.label, answer, options: nearMissOptions(answer, 4, rng) };
    }
    const first = common.rows[0];
    const second = common.rows[1];
    return {
      ...common,
      type: "table-story",
      prompt: `How many more ${dataset.unit} are recorded for ${first.label} across ${dataset.columns[0]} and ${dataset.columns[1]} than for ${second.label} in ${dataset.columns[0]}?`,
      answer: first.cells.column0 + first.cells.column1 - second.cells.column0,
    };
  });
}

export function buildStatisticsProblemQuestions(level, rng = Math.random) {
  assertLevel(level);
  return six(rng).map((dataset, index) => {
    const scale = STEPS[index % STEPS.length];
    const rows = scaledRows(dataset, scale);
    const common = { caption: dataset.caption, unit: dataset.unit, rows };
    if (level === 1) return {
      ...common, type: "problem-bar", step: scale, max: 6 * scale,
      prompt: `How many more ${dataset.unit} are shown for ${rows[2].label} than ${rows[0].label}?`,
      answer: difference(rows, rows[2].label, rows[0].label),
    };
    if (level === 2) return {
      ...common, type: "problem-pictogram", ratio: scale, symbol: dataset.symbol,
      prompt: `How many ${dataset.unit} are shown for ${rows[0].label} and ${rows[1].label} altogether?`,
      answer: rows[0].value + rows[1].value,
    };
    if (level === 3) {
      const source = tableView(TABLES[index]);
      const first = source.rows[0];
      const second = source.rows[1];
      return {
        ...source, type: "problem-table",
        prompt: `How many more ${source.unit} did ${first.label} have across both columns than ${second.label} had in ${source.columns[0].label}?`,
        answer: first.cells.column0 + first.cells.column1 - second.cells.column0,
      };
    }
    const representation = ["bar", "pictogram", "table"][index % 3];
    return {
      ...common, type: "problem-mixed", representation,
      step: scale, max: 6 * scale, ratio: scale, symbol: dataset.symbol,
      prompt: `How many more ${dataset.unit} are shown for ${rows[1].label} and ${rows[2].label} together than ${rows[0].label}?`,
      answer: twoStepAnswer(rows),
    };
  });
}

export const YEAR3_STATISTICS_BUILDERS = {
  bars: buildBarChartQuestions,
  pictograms: buildScaledPictogramQuestions,
  tables: buildTableQuestions,
  problems: buildStatisticsProblemQuestions,
};

export const YEAR3_STATISTICS_DATASETS = { DATASETS, TABLES };
