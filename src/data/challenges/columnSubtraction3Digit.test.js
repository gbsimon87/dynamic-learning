import test from "node:test";
import assert from "node:assert/strict";
import { buildColumnSubtractionQuestions, subtractionExchanges } from "./columnSubtraction3Digit.js";

const rng = () => 0.27;

test("subtraction escalates from no exchange to one and then across zero", () => {
  for (const [level, expected] of [[1, 0], [2, 1], [3, 2]]) {
    const questions = buildColumnSubtractionQuestions(level, rng);
    assert.equal(questions.length, 6);
    for (const question of questions) {
      assert.equal(question.answer, question.a - question.b);
      assert.equal(subtractionExchanges(question.a, question.b).count, expected);
      assert.ok(question.answer >= 100 && question.answer <= 999);
    }
  }
});

test("exchange marks preserve the original top number", () => {
  for (const level of [1, 2, 3, 4]) {
    for (const question of buildColumnSubtractionQuestions(level, rng)) {
      const { marks, adjusted } = subtractionExchanges(question.a, question.b);
      assert.deepEqual(question.exchanges, marks);
      assert.equal(adjusted.hundreds * 100 + adjusted.tens * 10 + adjusted.ones, question.a);
      assert.equal(adjusted.hundreds - Math.floor(question.b / 100), Math.floor(question.answer / 100));
      assert.equal(adjusted.tens - Math.floor((question.b % 100) / 10), Math.floor((question.answer % 100) / 10));
      assert.equal(adjusted.ones - (question.b % 10), question.answer % 10);
    }
  }
});

test("choices include exactly one answer and stay in the three-digit range", () => {
  for (const level of [1, 2]) {
    for (const question of buildColumnSubtractionQuestions(level, rng)) {
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4);
      assert.equal(question.options.filter((value) => value === question.answer).length, 1);
      assert.ok(question.options.every((value) => value >= 100 && value <= 999));
    }
  }
});

test("story numbers and answers agree", () => {
  for (const question of buildColumnSubtractionQuestions(4, rng)) {
    assert.ok(question.prompt.includes(String(question.a)));
    assert.ok(question.prompt.includes(String(question.b)));
    assert.equal(question.answer, question.a - question.b);
  }
});
