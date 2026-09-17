import test from "node:test";
import assert from "node:assert/strict";
import {
  buildSequence,
  pickGapPositions,
  buildDistractors,
  STEPS,
  shuffle,
} from "./countingInSteps.js";

test("builds a forwards sequence of the requested length", () => {
  assert.deepEqual(buildSequence(2, 2, 5), [2, 4, 6, 8, 10]);
});

test("builds a backwards sequence when the step is negative", () => {
  assert.deepEqual(buildSequence(20, -5, 4), [20, 15, 10, 5]);
});

test("the supported steps are 2, 3, 5 and 10", () => {
  assert.deepEqual(STEPS, [2, 3, 5, 10]);
});

test("gap positions never include the first two terms", () => {
  // The learner needs at least two visible terms to infer the step.
  for (let i = 0; i < 50; i++) {
    const gaps = pickGapPositions(8, 3, () => Math.random());
    assert.ok(Math.min(...gaps) >= 2, `got a gap at ${Math.min(...gaps)}`);
  }
});

test("gap positions are distinct and of the requested count", () => {
  const gaps = pickGapPositions(8, 3, () => Math.random());
  assert.equal(gaps.length, 3);
  assert.equal(new Set(gaps).size, 3);
});

test("gap positions stay inside the sequence", () => {
  for (let i = 0; i < 50; i++) {
    const gaps = pickGapPositions(6, 2, () => Math.random());
    assert.ok(Math.max(...gaps) <= 5);
  }
});

test("never asks for more gaps than there are eligible slots", () => {
  // Length 3 leaves only index 2 eligible, so only one gap is possible.
  const gaps = pickGapPositions(3, 3, () => Math.random());
  assert.deepEqual(gaps, [2]);
});

test("distractors are plausible, not random", () => {
  // Counting in 5s from 5, the answer after 20 is 25. Good wrong answers are
  // near-misses a child would actually produce.
  const wrong = buildDistractors(25, 5, 2);
  assert.equal(wrong.length, 2);
  for (const w of wrong) {
    assert.notEqual(w, 25);
    assert.ok(Math.abs(w - 25) <= 5, `${w} is too far from 25 to be plausible`);
  }
});

test("distractors are distinct from each other", () => {
  for (let i = 0; i < 50; i++) {
    const wrong = buildDistractors(30, 10, 3);
    assert.equal(new Set(wrong).size, wrong.length);
  }
});

test("distractors are never negative", () => {
  // Counting in 10s, the answer 10 must not offer -10 as an option.
  for (let i = 0; i < 50; i++) {
    const wrong = buildDistractors(10, 10, 3);
    for (const w of wrong) assert.ok(w >= 0, `got ${w}`);
  }
});

test("shuffle keeps every item and leaves the input untouched", () => {
  const input = [2, 4, 6, 8, 10];
  const out = shuffle(input, () => Math.random());
  assert.deepEqual([...out].sort((a, b) => a - b), input);
  assert.deepEqual(input, [2, 4, 6, 8, 10]);
});
