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
  for (const level of [3, 4]) {
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
