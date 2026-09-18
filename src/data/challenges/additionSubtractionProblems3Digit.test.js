import test from "node:test";
import assert from "node:assert/strict";
import {
  applySteps,
  buildAdditionSubtractionProblems,
  expressionOptions,
  numberSentence,
} from "./additionSubtractionProblems3Digit.js";

const rng = () => 0.36;

test("one-step stories use both operations and have one correct choice", () => {
  const questions = buildAdditionSubtractionProblems(1, rng);
  assert.equal(questions.length, 6);
  assert.deepEqual(new Set(questions.map((q) => q.operation)), new Set(["add", "subtract"]));
  for (const question of questions) {
    assert.equal(question.answer, question.operation === "add"
      ? question.a + question.b : question.a - question.b);
    assert.ok(question.prompt.includes(String(question.a)));
    assert.ok(question.prompt.includes(String(question.b)));
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options).size, 4);
    assert.equal(question.options.filter((value) => value === question.answer).length, 1);
    assert.ok(question.options.every((value) => value >= 100 && value <= 999));
  }
});

test("each two-step story has valid intermediate and final quantities", () => {
  for (const level of [2, 3, 4]) {
    const questions = buildAdditionSubtractionProblems(level, rng);
    assert.equal(questions.length, 6);
    for (const question of questions) {
      assert.deepEqual(
        { afterFirst: question.afterFirst, answer: question.answer },
        applySteps(question.start, question.first, question.second)
      );
      assert.ok(question.prompt.includes(String(question.start)));
      assert.ok(question.prompt.includes(String(Math.abs(question.first))));
      assert.ok(question.prompt.includes(String(Math.abs(question.second))));
      assert.ok(question.afterFirst >= 100 && question.afterFirst <= 999);
      assert.ok(question.answer >= 100 && question.answer <= 999);
    }
  }
});

test("one and only one number sentence matches the story's action order", () => {
  for (const question of buildAdditionSubtractionProblems(3, rng)) {
    const options = expressionOptions(question.start, question.first, question.second, rng);
    assert.equal(options.length, 4);
    assert.equal(new Set(options).size, 4);
    assert.equal(options.filter((option) => option === question.expression).length, 1);
    assert.equal(question.expression, numberSentence(question.start, question.first, question.second));
  }
});
