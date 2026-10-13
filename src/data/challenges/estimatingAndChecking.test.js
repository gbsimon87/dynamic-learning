import test from "node:test";
import assert from "node:assert/strict";
import { buildEstimatingQuestions, inverseResult, roundTo } from "./estimatingAndChecking.js";

const rng = () => 0.38;

test("rounding gives the nearest ten or hundred", () => {
  assert.equal(roundTo(247, 10), 250);
  assert.equal(roundTo(243, 10), 240);
  assert.equal(roundTo(649, 100), 600);
  assert.equal(roundTo(651, 100), 700);
});

test("estimate questions use rounded operands and have distinct valid choices", () => {
  for (const level of [1, 2]) {
    for (const question of buildEstimatingQuestions(level, rng)) {
      const expected = level === 1
        ? question.roundedA + question.roundedB
        : question.roundedA - question.roundedB;
      assert.equal(question.answer, expected);
      assert.equal(question.roundedA % question.place, 0);
      assert.equal(question.roundedB % question.place, 0);
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4);
      assert.equal(question.options.filter((choice) => choice === question.answer).length, 1);
      assert.ok(question.options.every((choice) => choice >= 0 && choice <= 1000));
    }
  }
});

test("inverse checks expose both true and false claims across both operations", () => {
  for (const level of [3]) {
    const questions = buildEstimatingQuestions(level, rng);
    assert.equal(questions.length, 6);
    assert.equal(questions.filter((q) => q.isCorrect).length, 3);
    assert.deepEqual(new Set(questions.map((q) => q.operation)), new Set(["add", "subtract"]));
    for (const question of questions) {
      assert.equal(question.inverse, inverseResult(question.reported, question.b, question.operation));
      assert.equal(question.inverse === question.a, question.isCorrect);
    }
  }
});

// Slots 3 and 4 used to be the same inverse check, and nothing asked the child
// to estimate. Slot 4 now pairs an estimate with the inverse on fresh numbers.
test("slot 4 claims are caught by the estimate and confirmed by the inverse", () => {
  const runs = new Set();
  for (let seed = 1; seed <= 100; seed++) {
    let n = seed;
    const seeded = () => { n = (n * 1103515245 + 12345) % 2147483648; return n / 2147483648; };
    const questions = buildEstimatingQuestions(4, seeded);
    runs.add(questions.map((q) => `${q.a}${q.b}`).sort().join());
    assert.equal(questions.length, 6);
    assert.equal(questions.filter((q) => q.isCorrect).length, 3);
    assert.deepEqual(new Set(questions.map((q) => q.operation)), new Set(["add", "subtract"]));
    for (const q of questions) {
      const exact = q.operation === "add" ? q.a + q.b : q.a - q.b;
      const estimate = q.operation === "add"
        ? roundTo(q.a, 100) + roundTo(q.b, 100) : roundTo(q.a, 100) - roundTo(q.b, 100);
      assert.equal(q.estimate, estimate);
      assert.equal(q.reported === exact, q.isCorrect);
      assert.equal(q.inverse, inverseResult(q.reported, q.b, q.operation));
      assert.equal(q.inverse === q.a, q.isCorrect);
      // The estimate alone separates sensible from silly.
      assert.ok(Math.abs(exact - estimate) < 100);
      if (!q.isCorrect) assert.ok(Math.abs(q.reported - estimate) > 100);
      for (const v of [q.a, q.b, exact, q.reported, q.inverse]) assert.ok(v >= 0 && v <= 999);
      assert.equal(new Set(q.estimateOptions).size, 4);
      assert.equal(q.estimateOptions.filter((o) => o === q.estimate).length, 1);
      assert.ok(q.estimateOptions.every((o) => o >= 0 && o <= 1000));
    }
  }
  assert.ok(runs.size > 90, "slot 4 repeats the same numbers");
});
