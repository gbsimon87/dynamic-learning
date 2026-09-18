import test from "node:test";
import assert from "node:assert/strict";
import {
  double,
  half,
  relatedFactTo100,
  sumDistractors,
  makesTenFirst,
  isTrueSubtraction,
  missingAddend,
  DOUBLES,
} from "./additionAndSubtraction.js";

test("doubles and halves", () => {
  assert.equal(double(7), 14);
  assert.equal(half(14), 7);
});

test("the taught doubles run to 10 + 10", () => {
  assert.deepEqual(DOUBLES, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test("derives the related fact up to 100", () => {
  // 3 + 7 = 10 gives 30 + 70 = 100, which is the statutory "derive and use
  // related facts up to 100".
  assert.deepEqual(relatedFactTo100(3, 7), { a: 30, b: 70, total: 100 });
});

test("sum distractors are the slips of miscounting, never the answer", () => {
  const wrong = sumDistractors(23, 3);
  assert.equal(wrong.length, 3);
  assert.ok(!wrong.includes(23));
  assert.equal(new Set(wrong).size, 3);
  for (const w of wrong) assert.ok(w >= 0);
});

test("sum distractors stay non-negative for small answers", () => {
  for (const answer of [0, 1, 2, 5]) {
    for (const w of sumDistractors(answer, 3)) assert.ok(w >= 0, `${answer}: ${w}`);
  }
});

test("accepts an order that puts the pair making ten first", () => {
  // 7 + 3 + 8: pairing 7 and 3 first makes the addition easy.
  assert.equal(makesTenFirst([7, 3, 8]), true);
  assert.equal(makesTenFirst([3, 7, 8]), true);
});

test("rejects an order that does not start with the pair making ten", () => {
  assert.equal(makesTenFirst([7, 8, 3]), false);
  assert.equal(makesTenFirst([8, 7, 3]), false);
});

test("a subtraction is true in either of its two valid orders", () => {
  // From 15, 6 and 9 both 15 - 6 = 9 and 15 - 9 = 6 are true.
  assert.equal(isTrueSubtraction([15, 6, 9]), true);
  assert.equal(isTrueSubtraction([15, 9, 6]), true);
});

test("a subtraction in the wrong order is false", () => {
  assert.equal(isTrueSubtraction([6, 15, 9]), false);
  assert.equal(isTrueSubtraction([9, 6, 15]), false);
});

test("finds the missing addend using the inverse", () => {
  assert.equal(missingAddend(34, 50), 16);
  assert.equal(missingAddend(0, 7), 7);
});
