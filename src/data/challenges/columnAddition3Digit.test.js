import test from "node:test";
import assert from "node:assert/strict";
import { additionCarries, buildColumnAdditionQuestions } from "./columnAddition3Digit.js";

const rng = () => 0.31;

test("column addition levels escalate from no carry to one, then two", () => {
  for (const [level, expected] of [[1, 0], [2, 1], [3, 2]]) {
    const questions = buildColumnAdditionQuestions(level, rng);
    assert.equal(questions.length, 6);
    for (const question of questions) {
      assert.equal(question.answer, question.a + question.b);
      assert.equal(question.carries.tens + question.carries.hundreds, expected);
      assert.ok(question.answer >= 100 && question.answer <= 999);
      assert.deepEqual(question.carries, additionCarries(question.a, question.b));
    }
  }
});

test("choices contain exactly one correct sum and nearby calculation slips", () => {
  for (const level of [1, 2]) {
    for (const question of buildColumnAdditionQuestions(level, rng)) {
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4);
      assert.equal(question.options.filter((value) => value === question.answer).length, 1);
      assert.ok(question.options.every((value) => value >= 100 && value <= 999));
    }
  }
});

test("every story's answer matches its two numbers and stays in Year 3 range", () => {
  for (const question of buildColumnAdditionQuestions(4, rng)) {
    assert.equal(question.answer, question.a + question.b);
    assert.ok(question.prompt.includes(String(question.a)));
    assert.ok(question.prompt.includes(String(question.b)));
    assert.ok(question.answer <= 999);
  }
});
