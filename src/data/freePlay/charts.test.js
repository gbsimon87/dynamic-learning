import test from "node:test";
import assert from "node:assert/strict";
import { leastPopular, mostPopular, symbolCount } from "../challenges/statistics.js";
import { makeChartQuestion, makeDataset } from "./charts.js";
import { seeded } from "./random.js";

test("datasets never tie, so most and least always have one answer", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 400; seed += 1) {
      const { rows, unit, chart } = makeDataset(seeded(seed * 5 + level), level);
      assert.equal(new Set(rows.map((r) => r.value)).size, rows.length);
      assert.notEqual(mostPopular(rows), null);
      assert.notEqual(leastPopular(rows), null);
      for (const row of rows) {
        assert.ok(row.value > 0);
        if (chart !== "tally") assert.doesNotThrow(() => symbolCount(row.value, unit));
      }
    }
  }
});

test("questions are fair at every level", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 400; seed += 1) {
      const q = makeChartQuestion(seeded(seed * 17 + level), level);
      assert.ok(q.key && q.prompt && q.speech);
      assert.ok(q.options.includes(q.answer), q.key);
      assert.equal(new Set(q.options).size, q.options.length);
      if (typeof q.answer === "number") {
        assert.ok(q.answer > 0);
        assert.ok(q.options.every((o) => Number.isInteger(o) && o >= 0));
        assert.equal(q.options.length, 4);
      }
      if (q.kind === "most") assert.equal(q.answer, mostPopular(q.rows));
      if (q.kind === "least") assert.equal(q.answer, leastPopular(q.rows));
      if (q.chart === "bar") assert.ok(q.rows.every((r) => r.value <= q.max));
    }
  }
});
