import test from "node:test";
import assert from "node:assert/strict";
import {
  isCorrectNumber,
  buildSequenceWithGaps,
  numberInWords,
  estimationScale,
  nearestLabel,
} from "./numbersAndCounting.js";

test("a typed answer is judged by its value, not its spelling", () => {
  // "043" is visibly 43. The old challenge compared strings and rejected it.
  assert.equal(isCorrectNumber("043", 43), true);
  assert.equal(isCorrectNumber("43", 43), true);
  assert.equal(isCorrectNumber(" 43 ", 43), true);
});

test("an empty or non-numeric answer is never correct", () => {
  assert.equal(isCorrectNumber("", 43), false);
  assert.equal(isCorrectNumber("   ", 43), false);
  assert.equal(isCorrectNumber("abc", 43), false);
});

test("a wrong number is still wrong however it is padded", () => {
  assert.equal(isCorrectNumber("044", 43), false);
  assert.equal(isCorrectNumber("4", 43), false);
});

test("builds a run of consecutive numbers with the requested gaps", () => {
  const { terms, gaps } = buildSequenceWithGaps(20, 10, 3, () => 0.5);
  assert.equal(terms.length, 10);
  assert.deepEqual(terms.slice(0, 3), [20, 21, 22]);
  assert.equal(gaps.length, 3);
  assert.equal(new Set(gaps).size, 3);
});

test("the first two numbers are never blanked", () => {
  // With fewer than two visible, there is no sequence to read.
  for (let i = 0; i < 50; i++) {
    const { gaps } = buildSequenceWithGaps(30, 10, 5, Math.random);
    assert.ok(Math.min(...gaps) >= 2);
  }
});

test("writes numbers in words", () => {
  assert.equal(numberInWords(7), "seven");
  assert.equal(numberInWords(47), "forty-seven");
  assert.equal(numberInWords(100), "one hundred");
});

test("the estimation scale runs 0 to 100 in labelled tens", () => {
  assert.deepEqual(estimationScale(), [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);
});

test("names the ten a number is nearest to", () => {
  assert.equal(nearestLabel(47), 50);
  assert.equal(nearestLabel(42), 40);
  assert.equal(nearestLabel(5), 10);
});

test("a number already on a ten is nearest to itself", () => {
  assert.equal(nearestLabel(60), 60);
  assert.equal(nearestLabel(0), 0);
  assert.equal(nearestLabel(100), 100);
});
