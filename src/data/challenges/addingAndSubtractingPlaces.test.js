import test from "node:test";
import assert from "node:assert/strict";
import {
  blockValue,
  buildPlaceChangeQuestions,
  changeOptions,
  changedOnlyNamedPlace,
  stepBlocks,
} from "./addingAndSubtractingPlaces.js";

const rng = () => 0.42;

test("gentle questions cover adding and subtracting 1, 10 and 100 without exchange", () => {
  const questions = buildPlaceChangeQuestions(1, rng);
  assert.equal(questions.length, 6);
  assert.deepEqual(new Set(questions.map((q) => q.change)), new Set([1, -1, 10, -10, 100, -100]));
  for (const question of questions) {
    assert.equal(question.answer, question.start + question.change);
    assert.ok(changedOnlyNamedPlace(question.start, question.answer, question.place));
    assert.equal(blockValue(question.picture), question.start);
  }
});

test("later mental questions cross a ten or hundred boundary", () => {
  const questions = buildPlaceChangeQuestions(2, rng);
  assert.equal(questions.length, 6);
  assert.ok(questions.some((q) => !changedOnlyNamedPlace(q.start, q.answer, q.place)));
  for (const question of questions) {
    assert.equal(question.answer, question.start + question.change);
    assert.ok(question.answer >= 100 && question.answer <= 999);
  }
});

test("every choice set has one answer and three distinct plausible misses", () => {
  for (const level of [1, 2]) {
    for (const question of buildPlaceChangeQuestions(level, rng)) {
      assert.equal(question.options.length, 4);
      assert.equal(new Set(question.options).size, 4);
      assert.equal(question.options.filter((option) => option === question.answer).length, 1);
      assert.ok(question.options.every((option) => option >= 100 && option <= 999));
    }
  }
  assert.deepEqual(new Set(changeOptions(895, 100, rng)), new Set([995, 895, 795, 905]));
});

test("build-a-number questions change two places and the blocks keep their value", () => {
  for (const question of buildPlaceChangeQuestions(3, rng)) {
    assert.equal(question.answer, question.start + question.changes[0] + question.changes[1]);
    assert.equal(blockValue(question.picture), question.start);
    const target = question.changes.reduce((blocks, change) => {
      const place = Math.abs(change) === 100 ? "hundreds" : Math.abs(change) === 10 ? "tens" : "ones";
      return stepBlocks(blocks, place, Math.sign(change));
    }, question.picture);
    assert.equal(blockValue(target), question.answer);
  }
});

test("block controls clamp each place to 0–9", () => {
  assert.equal(stepBlocks({ hundreds: 2, tens: 0, ones: 9 }, "ones", 1).ones, 9);
  assert.equal(stepBlocks({ hundreds: 2, tens: 0, ones: 9 }, "tens", -1).tens, 0);
});

test("story answers use only one, ten or one hundred and stay in range", () => {
  const questions = buildPlaceChangeQuestions(4, rng);
  assert.equal(questions.length, 6);
  for (const question of questions) {
    assert.equal(question.answer, question.start + question.change);
    assert.ok([1, 10, 100].includes(Math.abs(question.change)));
    assert.ok(question.answer >= 100 && question.answer <= 999);
    assert.ok(question.prompt.includes(String(question.start)));
  }
});
