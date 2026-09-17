import test from "node:test";
import assert from "node:assert/strict";
import {
  tensOf,
  onesOf,
  fromParts,
  blockPicture,
  placeValueDistractors,
} from "./placeValue.js";

test("splits a two-digit number into tens and ones", () => {
  assert.equal(tensOf(47), 4);
  assert.equal(onesOf(47), 7);
});

test("a round number has no ones", () => {
  assert.equal(tensOf(60), 6);
  assert.equal(onesOf(60), 0);
});

test("builds a number back from its parts", () => {
  assert.equal(fromParts(4, 7), 47);
  assert.equal(fromParts(6, 0), 60);
});

test("draws the number as tens rods and ones", () => {
  // 23 is two rods and three units.
  const picture = blockPicture(23);
  assert.equal(picture.tens.length, 2);
  assert.equal(picture.ones.length, 3);
});

test("the digit-swap is always offered as a distractor", () => {
  // 47 vs 74 is the mistake this topic exists to correct.
  assert.ok(placeValueDistractors(47, 3).includes(74));
});

test("distractors are distinct, non-negative and exclude the answer", () => {
  for (const n of [10, 47, 60, 99, 21]) {
    const wrong = placeValueDistractors(n, 3);
    assert.equal(wrong.length, 3);
    assert.equal(new Set(wrong).size, 3);
    assert.ok(!wrong.includes(n));
    for (const w of wrong) assert.ok(w >= 0);
  }
});

test("a palindrome still gets three distinct distractors", () => {
  // 44 swapped is still 44, so the swap cannot be used here.
  const wrong = placeValueDistractors(44, 3);
  assert.equal(new Set(wrong).size, 3);
  assert.ok(!wrong.includes(44));
});

test("tens and ones round-trip through fromParts", () => {
  for (let n = 10; n <= 99; n++) {
    assert.equal(fromParts(tensOf(n), onesOf(n)), n);
  }
});

test("a round number draws no ones blocks", () => {
  assert.deepEqual(blockPicture(30).ones, []);
  assert.equal(blockPicture(30).tens.length, 3);
});

test("the block picture always matches the number it draws", () => {
  for (const n of [10, 23, 47, 60, 99]) {
    const { tens, ones } = blockPicture(n);
    assert.equal(fromParts(tens.length, ones.length), n);
  }
});

test("every two-digit number gets the full count of distractors", () => {
  // Components render a fixed number of options; coming up short would leave
  // an empty button.
  for (let n = 10; n <= 99; n++) {
    assert.equal(placeValueDistractors(n, 2).length, 2, `failed at ${n}`);
  }
});

test("a multiple of ten still offers a usable digit swap", () => {
  // 60 swapped is 6 - a real number, and exactly the confusion to test.
  assert.ok(placeValueDistractors(60, 3).includes(6));
});
