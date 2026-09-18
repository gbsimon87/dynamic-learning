import test from "node:test";
import assert from "node:assert/strict";
import {
  countOn,
  crossesTen,
  BOUNDARY_STARTS,
  countingDistractors,
} from "./countingForwardsAndBackwards.js";

test("counts on and back from a number", () => {
  assert.equal(countOn(68, 4), 72);
  assert.equal(countOn(71, -4), 67);
});

test("spots when a count crosses a tens boundary", () => {
  // 68 + 4 = 72 steps over 70; 61 + 4 = 65 does not.
  assert.equal(crossesTen(68, 4), true);
  assert.equal(crossesTen(61, 4), false);
});

test("spots a backward count crossing a boundary", () => {
  assert.equal(crossesTen(71, -4), true);
  assert.equal(crossesTen(78, -4), false);
});

test("landing exactly on a ten counts as crossing", () => {
  // 67 + 3 = 70 is the boundary itself, which is where children stumble.
  assert.equal(crossesTen(67, 3), true);
});

test("every boundary start is within two of a ten", () => {
  // These exist to force a crossing, so they must sit near one.
  for (const n of BOUNDARY_STARTS) {
    const distance = Math.min(n % 10, 10 - (n % 10));
    assert.ok(distance <= 2, `${n} is not near a ten`);
  }
});

test("distractors are the off-by-one slips of miscounting", () => {
  const wrong = countingDistractors(72, 2);
  assert.equal(wrong.length, 2);
  assert.ok(wrong.includes(71) || wrong.includes(73));
  assert.ok(!wrong.includes(72));
});

test("distractors are distinct and never negative", () => {
  for (const answer of [0, 1, 2, 50, 100]) {
    const wrong = countingDistractors(answer, 3);
    assert.equal(new Set(wrong).size, wrong.length);
    for (const w of wrong) assert.ok(w >= 0, `${answer}: got ${w}`);
  }
});
