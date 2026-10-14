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

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  buildFillGapQuestions,
  buildWordsToNumeralQuestions,
  buildEstimateQuestions,
  buildWordsToDigitsQuestions,
} from "./numbersAndCounting.js";

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

test("fill-the-gap runs are generated within 100 and differ between runs", () => {
  for (const seed of SEEDS) {
    const questions = buildFillGapQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.terms[0])).size, 6);
    for (const q of questions) {
      assert.equal(q.terms.length, 8);
      assert.ok(q.terms[7] <= 100);
      assert.equal(q.answer, q.terms[q.gaps[0]]);
    }
  }
  assert.notDeepEqual(buildFillGapQuestions(seeded(1)).map((q) => q.terms[0]), buildFillGapQuestions(seeded(2)).map((q) => q.terms[0]));
});

test("words to numeral: the swap and a ten out are offered, the answer moves", () => {
  for (const seed of SEEDS) {
    const questions = buildWordsToNumeralQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.value)).size, 6);
    for (const q of questions) {
      assert.equal(q.words, numberInWords(q.value));
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.options.includes(q.value));
      assert.ok(q.options.includes((q.value % 10) * 10 + Math.floor(q.value / 10)));
      assert.ok(q.options.some((o) => Math.abs(o - q.value) === 10));
      for (const o of q.options) assert.ok(o >= 0 && o <= 100);
    }
  }
});

test("estimates never ask about a halfway number, nor sit the answer between two neighbouring tens", () => {
  for (const seed of SEEDS) {
    const questions = buildEstimateQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.value)).size, 6);
    for (const q of questions) {
      assert.notEqual(q.value % 10, 5);
      assert.equal(q.answer, nearestLabel(q.value));
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.options.includes(q.answer));
      for (const o of q.options) assert.ok(o % 10 === 0 && o >= 0 && o <= 100);
      const sorted = [...q.options].sort((x, y) => x - y);
      assert.ok(!(sorted[1] === q.answer && sorted[2] - sorted[0] === 20), `${q.value}: ${q.options}`);
      // The other ten the number sits between is always offered.
      assert.ok(q.options.includes(Math.floor(q.value / 10) * 10) && q.options.includes(Math.ceil(q.value / 10) * 10));
    }
  }
});

test("words to digits: six different numbers to 100, spelled by numberInWords", () => {
  for (const seed of SEEDS) {
    const questions = buildWordsToDigitsQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.value)).size, 6);
    for (const q of questions) {
      assert.ok(q.value >= 11 && q.value <= 100);
      assert.equal(q.words, numberInWords(q.value));
    }
  }
});
