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

// Slots 2 and 3 drew from the same fixed list, so both could ask "428
// pencils, buys 267, uses 149". Every slot now has its own stories and fresh
// numbers each run, all recomputed here.
test("two-step slots never share a story and numbers vary per run", () => {
  const opening = (prompt) => prompt.split(/ \d/)[0];
  for (let seed = 1; seed <= 100; seed++) {
    let n = seed;
    const seeded = () => { n = (n * 1103515245 + 12345) % 2147483648; return n / 2147483648; };
    const openings = {};
    for (const level of [2, 3, 4]) {
      const questions = buildAdditionSubtractionProblems(level, seeded);
      openings[level] = new Set(questions.map((q) => opening(q.prompt)));
      assert.equal(openings[level].size, 6);
      for (const q of questions) {
        for (const value of [q.start, q.start + q.first, q.answer, Math.abs(q.first), Math.abs(q.second)]) {
          assert.ok(value >= 0 && value <= 999, `${q.prompt} has ${value}`);
        }
        assert.equal(q.answer, q.start + q.first + q.second);
        assert.ok(Math.sign(q.first) !== Math.sign(q.second), "one gain and one loss");
      }
    }
    for (const [a, b] of [[2, 3], [2, 4], [3, 4]]) {
      assert.ok([...openings[a]].every((o) => !openings[b].has(o)), `slots ${a} and ${b} share a story`);
    }
  }
  const run = () => buildAdditionSubtractionProblems(2, Math.random).map((q) => q.start).join();
  assert.notEqual(run(), run());
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
