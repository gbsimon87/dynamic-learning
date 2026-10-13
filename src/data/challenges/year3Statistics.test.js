import test from "node:test";
import assert from "node:assert/strict";
import {
  YEAR3_STATISTICS_BUILDERS,
  buildBarChartQuestions,
  buildScaledPictogramQuestions,
  buildTableQuestions,
  buildStatisticsProblemQuestions,
} from "./year3Statistics.js";
import { symbolCount } from "./statistics.js";
import { YEAR3_STATISTICS_DATASETS } from "./year3Statistics.js";
const YEAR3_STATISTICS_DATASETS_KEYS = () => YEAR3_STATISTICS_DATASETS.TABLES.map((table) => table.caption);

function seeded(seed = 12345) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

test("all four statistics topics generate six rounds at each level", () => {
  for (const [topic, build] of Object.entries(YEAR3_STATISTICS_BUILDERS)) {
    for (let level = 1; level <= 4; level += 1) {
      const rounds = build(level, seeded(level * 917));
      assert.equal(rounds.length, 6, `${topic} level ${level}`);
      assert.ok(rounds.every((round) => round.type && round.answer !== undefined));
    }
  }
});

test("unsupported levels fail explicitly", () => {
  for (const build of Object.values(YEAR3_STATISTICS_BUILDERS)) {
    assert.throws(() => build(0, seeded()), RangeError);
    assert.throws(() => build(5, seeded()), RangeError);
  }
});

test("every choice set has one answer and distinct near-misses", () => {
  for (const build of Object.values(YEAR3_STATISTICS_BUILDERS)) {
    for (const level of [1, 2]) {
      for (const round of build(level, seeded(level * 1987))) {
        if (!round.options) continue;
        assert.equal(round.options.length, 4);
        assert.equal(new Set(round.options).size, 4);
        assert.equal(round.options.filter((option) => option === round.answer).length, 1);
        assert.ok(round.options.every((option) => option >= 0));
      }
    }
  }
});

test("bar-chart answers agree with the rows and the 2, 5 or 10 scale", () => {
  for (let level = 1; level <= 4; level += 1) {
    for (const round of buildBarChartQuestions(level, seeded(level * 101))) {
      assert.ok([2, 5, 10].includes(round.step));
      assert.equal(round.max % round.step, 0);
      assert.ok(round.rows.every((row) => row.value > 0 && row.value <= round.max && row.value % round.step === 0));
      if (level === 1) assert.equal(round.answer, round.rows.find((row) => row.label === round.ask).value);
      if (level === 2) assert.equal(round.answer, Math.abs(round.rows[2].value - round.rows[0].value));
      if (level === 3) assert.deepEqual(round.answer, round.rows.map((row) => row.value));
      if (level === 4) assert.equal(round.answer, round.rows[1].value + round.rows[2].value - round.rows[0].value);
    }
  }
});

test("pictogram rows contain whole symbols and every answer uses the key", () => {
  for (let level = 1; level <= 4; level += 1) {
    for (const round of buildScaledPictogramQuestions(level, seeded(level * 103))) {
      assert.ok([2, 5, 10].includes(round.ratio));
      assert.ok(round.rows.every((row) => symbolCount(row.value, round.ratio) <= 6));
      if (level === 1) assert.equal(round.answer, round.rows.find((row) => row.label === round.ask).value);
      if (level === 2) assert.equal(round.answer, Math.abs(round.rows[2].value - round.rows[0].value));
      if (level === 3) assert.deepEqual(round.answer, round.rows.map((row) => symbolCount(row.value, round.ratio)));
      if (level === 4) assert.equal(round.answer, (round.rows[0].value + round.rows[1].value) / round.ratio);
    }
  }
});

test("table questions agree with their specified row and column", () => {
  for (const round of buildTableQuestions(1, seeded())) {
    assert.equal(round.answer, round.rows.find((row) => row.label === round.ask).cells[round.column]);
  }
  for (const round of buildTableQuestions(2, seeded())) {
    const row = round.rows.find((item) => item.label === round.ask);
    assert.equal(round.answer, row.cells.column0 + row.cells.column1);
  }
  for (const round of buildTableQuestions(3, seeded())) {
    assert.equal(round.answer, round.sourceRows.find((row) => row.label === round.ask).value);
    assert.equal(round.answer, round.rows.find((row) => row.label === round.ask).cells.count);
    assert.ok(round.sourceRows.every((row) => row.value % round.step === 0));
  }
  for (const round of buildTableQuestions(4, seeded())) {
    assert.equal(round.answer, round.rows[0].cells.column0 + round.rows[0].cells.column1 - round.rows[1].cells.column0);
    assert.ok(round.answer > 0);
  }
});

test("one- and two-step problem answers recompute from the visible chart data", () => {
  for (let level = 1; level <= 4; level += 1) {
    const rounds = buildStatisticsProblemQuestions(level, seeded(level * 151));
    for (const round of rounds) {
      let expected;
      if (level === 1) expected = round.rows[2].value - round.rows[0].value;
      if (level === 2) expected = round.rows[0].value + round.rows[1].value;
      if (level === 3) continue;
      if (level === 4) expected = round.rows[1].value + round.rows[2].value - round.rows[0].value;
      assert.equal(round.answer, expected);
      assert.ok(round.answer > 0);
    }
    if (level === 4) assert.deepEqual(new Set(rounds.map((round) => round.representation)), new Set(["bar", "pictogram", "table"]));
  }
});

function problemTableExpected(round) {
  const cell = (label, key) => round.rows.find((row) => row.label === label).cells[key];
  const colKey = (name) => round.columns.find((column) => column.label === name).key;
  const total = (key) => round.rows.reduce((sum, row) => sum + row.cells[key], 0);
  let m;
  if ((m = round.prompt.match(/in (.+) than in (.+) altogether\?$/))) return total(colKey(m[1])) - total(colKey(m[2]));
  if ((m = round.prompt.match(/did (.+) and (.+) have altogether/))) return ["column0", "column1"].reduce((s, k) => s + cell(m[1], k) + cell(m[2], k), 0);
  m = round.prompt.match(/^In (.+), how many more \S+ did (.+) have than (.+) and (.+) put together\?$/);
  const k = colKey(m[1]);
  return cell(m[2], k) - cell(m[3], k) - cell(m[4], k);
}

test("problem-table rounds are their own varied, randomised questions, not the Tables topic's", () => {
  const tableKeys = new Set(YEAR3_STATISTICS_DATASETS_KEYS());
  const shapes = new Set();
  const rowCounts = new Set();
  const runs = [];
  for (let seed = 1; seed <= 20; seed += 1) {
    const rounds = buildStatisticsProblemQuestions(3, seeded(seed));
    runs.push(JSON.stringify(rounds.map((round) => [round.caption, round.prompt, round.rows])));
    for (const round of rounds) {
      assert.equal(round.type, "problem-table");
      assert.ok(!tableKeys.has(round.caption), `${round.caption} reuses a Tables-topic table`);
      assert.equal(round.answer, problemTableExpected(round), round.prompt);
      assert.ok(round.answer > 0, round.prompt);
      shapes.add(round.shape);
      rowCounts.add(round.rows.length);
    }
  }
  assert.deepEqual(shapes, new Set(["column-difference", "two-rows-total", "more-than-two"]));
  assert.deepEqual(rowCounts, new Set([3, 4]));
  assert.ok(new Set(runs).size > 1, "problem-table rounds must change between runs");
});
