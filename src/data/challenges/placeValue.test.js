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

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  buildCountBlocksQuestions,
  buildPartsToNumberQuestions,
  buildOrderDigitsQuestions,
  buildPartitionQuestions,
} from "./placeValue.js";

function seeded(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

function checkChoice(q) {
  assert.equal(q.options.length, 3);
  assert.equal(new Set(q.options).size, 3, `${q.options}`);
  assert.ok(q.options.includes(q.answer));
  for (const o of q.options) assert.ok(o >= 0 && o <= 100);
  const sorted = [...q.options].sort((x, y) => x - y);
  assert.ok(!(sorted[1] === q.answer && sorted[2] - sorted[0] === 2), `${q.options}`);
}

test("distractors vary which column slips, but always offer the swap", () => {
  const seconds = new Set();
  for (const seed of SEEDS) {
    const wrong = placeValueDistractors(47, 2, seeded(seed));
    assert.equal(wrong[0], 74);
    seconds.add(wrong[1]);
  }
  assert.ok(seconds.size >= 3, `${[...seconds]}`);
});

test("counting blocks: generated, three tens and three ones, other column always offered", () => {
  for (const seed of SEEDS) {
    const questions = buildCountBlocksQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.value)).size, 6);
    assert.equal(questions.filter((q) => q.asksTens).length, 3);
    for (const q of questions) {
      assert.equal(q.answer, q.asksTens ? tensOf(q.value) : onesOf(q.value));
      assert.ok(q.options.includes(q.asksTens ? onesOf(q.value) : tensOf(q.value)));
      for (const o of q.options) assert.ok(o >= 0 && o <= 9);
      checkChoice(q);
      assert.equal(fromParts(q.picture.tens.length, q.picture.ones.length), q.value);
    }
  }
  assert.notDeepEqual(buildCountBlocksQuestions(seeded(1)).map((q) => q.value), buildCountBlocksQuestions(seeded(2)).map((q) => q.value));
});

test("parts to number: generated, the swap is always offered", () => {
  for (const seed of SEEDS) {
    const questions = buildPartsToNumberQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.answer)).size, 6);
    assert.ok(questions.filter((q) => q.ones === 0).length <= 1);
    for (const q of questions) {
      assert.equal(q.answer, fromParts(q.tens, q.ones));
      assert.ok(q.options.includes(fromParts(q.ones, q.tens)));
      checkChoice(q);
    }
  }
});

test("ordering sets share two digits, differ between runs, and never start solved", () => {
  for (const seed of SEEDS) {
    const questions = buildOrderDigitsQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.terms.join())).size, 6);
    for (const q of questions) {
      assert.equal(new Set(q.terms).size, 4);
      assert.equal(new Set(q.terms.flatMap((t) => String(t).split(""))).size, 2);
      for (let i = 1; i < 4; i++) assert.ok(q.terms[i] > q.terms[i - 1]);
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]));
    }
  }
  assert.notDeepEqual(buildOrderDigitsQuestions(seeded(1))[0].terms, buildOrderDigitsQuestions(seeded(2))[0].terms);
});

test("partitioning: every answer is right, includes the non-standard split", () => {
  for (const seed of SEEDS) {
    const questions = buildPartitionQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.prompt)).size, 6);
    assert.ok(questions.some((q) => q.kind === "regroupSplit" || q.kind === "regroupBuild"));
    for (const q of questions) {
      assert.ok(!/\b1 tens\b|\b1 ones\b/.test(q.prompt), q.prompt);
      const eq = q.prompt.match(/^(\d+) = (\d+) \+ \?$/);
      if (eq) assert.equal(Number(eq[2]) + q.answer, Number(eq[1]), q.prompt);
      const build = q.prompt.match(/^What number is (\d+) tens? and (\d+) ones\?$/);
      if (build) {
        assert.equal(fromParts(Number(build[1]), Number(build[2])), q.answer);
        assert.ok(Number(build[2]) >= 10, "non-standard: more than 9 ones");
      }
      const worth = q.prompt.match(/^In the number (\d+), what is the (\d) worth\?$/);
      if (worth) assert.equal(q.answer, Number(worth[2]) * 10);
      assert.ok(eq || build || worth, q.prompt);
    }
  }
});
