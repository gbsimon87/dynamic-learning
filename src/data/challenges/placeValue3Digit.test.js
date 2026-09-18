import test from "node:test";
import assert from "node:assert/strict";
import {
  blockPicture3,
  digitsOf,
  columnLabel,
  partitionStandard,
  partitionRegrouped,
  exchangeSteps,
  buildNumberFromBlocks,
  nearMissOptions,
} from "./placeValue3Digit.js";

/** Deterministic rng so a failure is reproducible. */
const seeded = (seed) => () => {
  seed = (seed * 1103515245 + 12345) % 2147483648;
  return seed / 2147483648;
};

test("splits a 3-digit number into hundreds, tens and ones", () => {
  assert.deepEqual(digitsOf(146), { hundreds: 1, tens: 4, ones: 6 });
  assert.deepEqual(digitsOf(700), { hundreds: 7, tens: 0, ones: 0 });
  assert.deepEqual(digitsOf(905), { hundreds: 9, tens: 0, ones: 5 });
});

test("a block picture holds the right number of each piece", () => {
  const picture = blockPicture3(146);
  assert.equal(picture.hundreds, 1);
  assert.equal(picture.tens, 4);
  assert.equal(picture.ones, 6);
  assert.equal(picture.total, 146);
});

// The picture is what the learner counts, so it must never disagree with the
// number it claims to show.
test("every block picture totals the number it represents", () => {
  for (let n = 100; n <= 999; n += 7) {
    const p = blockPicture3(n);
    assert.equal(p.hundreds * 100 + p.tens * 10 + p.ones, n, `mismatch at ${n}`);
  }
});

test("column labels name the place, not the digit", () => {
  assert.equal(columnLabel("hundreds"), "hundreds");
  assert.equal(columnLabel("tens"), "tens");
  assert.equal(columnLabel("ones"), "ones");
});

test("standard partitioning is hundreds + tens + ones", () => {
  assert.deepEqual(partitionStandard(146), [100, 40, 6]);
  // A zero place is dropped: "700 + 0 + 5" is not how anyone partitions 705.
  assert.deepEqual(partitionStandard(705), [700, 5]);
  assert.deepEqual(partitionStandard(300), [300]);
});

// The programme of study's own example: 146 = 100 + 40 + 6 AND 146 = 130 + 16.
test("regrouped partitioning moves a ten into the ones", () => {
  assert.deepEqual(partitionRegrouped(146), [130, 16]);
  assert.deepEqual(partitionRegrouped(252), [240, 12]);
});

test("regrouping is impossible without a ten to move", () => {
  assert.equal(partitionRegrouped(704), null);
  assert.equal(partitionRegrouped(600), null);
});

test("every partition sums back to its number", () => {
  for (let n = 100; n <= 999; n += 11) {
    assert.equal(partitionStandard(n).reduce((a, b) => a + b, 0), n);
    const regrouped = partitionRegrouped(n);
    if (regrouped) {
      assert.equal(regrouped.reduce((a, b) => a + b, 0), n, `regroup at ${n}`);
    }
  }
});

test("ten ones exchange for one ten", () => {
  assert.deepEqual(exchangeSteps({ hundreds: 0, tens: 0, ones: 12 }), {
    hundreds: 0,
    tens: 1,
    ones: 2,
  });
});

test("ten tens exchange for one hundred", () => {
  assert.deepEqual(exchangeSteps({ hundreds: 0, tens: 13, ones: 0 }), {
    hundreds: 1,
    tens: 3,
    ones: 0,
  });
});

test("exchanging cascades from ones all the way to hundreds", () => {
  // 9 tens + 10 ones -> 10 tens -> 1 hundred.
  assert.deepEqual(exchangeSteps({ hundreds: 0, tens: 9, ones: 10 }), {
    hundreds: 1,
    tens: 0,
    ones: 0,
  });
});

test("exchanging never changes the value", () => {
  for (const piles of [
    { hundreds: 0, tens: 0, ones: 27 },
    { hundreds: 1, tens: 14, ones: 3 },
    { hundreds: 2, tens: 9, ones: 19 },
  ]) {
    const before = piles.hundreds * 100 + piles.tens * 10 + piles.ones;
    const after = exchangeSteps(piles);
    assert.equal(after.hundreds * 100 + after.tens * 10 + after.ones, before);
  }
});

test("blocks build the number they represent", () => {
  assert.equal(buildNumberFromBlocks({ hundreds: 3, tens: 0, ones: 7 }), 307);
  assert.equal(buildNumberFromBlocks({ hundreds: 0, tens: 0, ones: 0 }), 0);
});

// Random distractors get eliminated without doing any maths; the confusion
// worth testing is reading the wrong column or slipping one place.
test("distractors are near misses and always include the answer", () => {
  const rng = seeded(7);
  for (let i = 0; i < 40; i++) {
    const options = nearMissOptions(146, rng);
    assert.ok(options.includes(146), "answer missing from its own options");
    assert.equal(new Set(options).size, options.length, "duplicate option");
    assert.equal(options.length, 4);
    for (const option of options) {
      assert.ok(option > 0, `negative or zero option ${option}`);
    }
  }
});

test("distractors stay inside Year 3's range of 1000", () => {
  const rng = seeded(3);
  for (const value of [905, 990, 999, 100]) {
    for (const option of nearMissOptions(value, rng)) {
      assert.ok(option <= 1000, `${option} is beyond Year 3's range`);
      assert.ok(option >= 0, `${option} is negative`);
    }
  }
});
