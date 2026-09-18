import test from "node:test";
import assert from "node:assert/strict";
import { buildMissingNumberQuestions } from "./missingNumber3Digit.js";

const rng = () => 0.44;

test("missing addend choices contain the one number that completes the sum", () => {
  const questions = buildMissingNumberQuestions(1, rng);
  assert.equal(questions.length, 6);
  for (const question of questions) {
    assert.equal(question.known + question.answer, question.whole);
    assert.equal(question.options.length, 4);
    assert.equal(new Set(question.options).size, 4);
    assert.equal(question.options.filter((value) => value === question.answer).length, 1);
    assert.ok(question.options.every((value) => value >= 0 && value <= 1000));
  }
});

test("missing subtrahend and linked facts use the inverse correctly", () => {
  for (const level of [2, 3]) {
    const questions = buildMissingNumberQuestions(level, rng);
    assert.equal(questions.length, 6);
    for (const question of questions) {
      if (level === 2) assert.equal(question.whole - question.answer, question.remainder);
      else {
        assert.equal(question.answer + question.known, question.whole);
        assert.equal(question.whole - question.known, question.answer);
      }
      assert.ok(question.answer >= 100 && question.answer <= 999);
    }
  }
});

test("unknown start and unknown taken stories compute their missing quantity", () => {
  const questions = buildMissingNumberQuestions(4, rng);
  assert.deepEqual(new Set(questions.map((q) => q.type)), new Set(["start", "taken"]));
  for (const question of questions) {
    assert.equal(question.answer, question.whole - question.known);
    assert.ok(question.prompt.includes(String(question.whole)));
    assert.ok(question.prompt.includes(String(question.known)));
    assert.ok(question.answer > 0);
  }
});
