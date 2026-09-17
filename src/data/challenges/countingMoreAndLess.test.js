import test from "node:test";
import assert from "node:assert/strict";
import {
  applyChange,
  describeChange,
  neighbourStrip,
  moreLessDistractors,
  CHANGES,
} from "./countingMoreAndLess.js";

test("applies a change to a number", () => {
  assert.equal(applyChange(34, 10), 44);
  assert.equal(applyChange(34, -10), 24);
});

test("describes a change in words a child would hear", () => {
  assert.equal(describeChange(1), "1 more");
  assert.equal(describeChange(-1), "1 less");
  assert.equal(describeChange(10), "10 more");
  assert.equal(describeChange(-10), "10 less");
});

test("the supported changes are 1, 10 and 5 in both directions", () => {
  assert.deepEqual(CHANGES, [1, -1, 10, -10, 5, -5]);
});

test("the neighbour strip centres on the number", () => {
  assert.deepEqual(neighbourStrip(27), [25, 26, 27, 28, 29]);
});

test("the neighbour strip never goes below zero", () => {
  // Year 2 has no negative numbers; the strip shifts rather than showing them.
  const strip = neighbourStrip(1);
  assert.ok(Math.min(...strip) >= 0, `got ${strip}`);
  assert.equal(strip.length, 5);
  assert.ok(strip.includes(1));
});

test("distractors are the near-misses a child actually makes", () => {
  // 10 more than 34 is 44. Wrong: applied the change backwards (24), or
  // changed the wrong column (35).
  const wrong = moreLessDistractors(34, 10, 2);
  assert.equal(wrong.length, 2);
  for (const w of wrong) {
    assert.notEqual(w, 44);
    assert.ok(w >= 0);
  }
  assert.ok(wrong.includes(24), `expected the backwards answer, got ${wrong}`);
});

test("distractors are distinct and never negative", () => {
  for (const [start, change] of [[3, -5], [2, -10], [0, 1], [95, 10]]) {
    const wrong = moreLessDistractors(start, change, 3);
    assert.equal(new Set(wrong).size, wrong.length);
    for (const w of wrong) assert.ok(w >= 0, `${start}${change}: got ${w}`);
  }
});

test("distractors never include the correct answer", () => {
  for (let n = 0; n <= 100; n += 7) {
    for (const change of CHANGES) {
      const answer = applyChange(n, change);
      if (answer < 0) continue;
      assert.ok(!moreLessDistractors(n, change, 3).includes(answer));
    }
  }
});
