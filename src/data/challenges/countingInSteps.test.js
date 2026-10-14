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

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  stepStart,
  buildNamedStepQuestions,
  buildNextTermQuestions,
  buildStepOrderQuestions,
  buildGroupStoryQuestions,
} from "./countingInSteps.js";

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

/** Year 2 counts in 2s, 3s and 5s from 0; 10s from any number. */
function checkSequence(terms, step) {
  for (let i = 1; i < terms.length; i++) assert.equal(terms[i] - terms[i - 1], step);
  for (const t of terms) {
    assert.ok(t >= 0 && t <= 100, `${terms}`);
    if (Math.abs(step) !== 10) assert.equal(t % Math.abs(step), 0, `${terms} not on multiples`);
  }
}

test("step starts keep 2s, 3s and 5s on multiples and every term within 100", () => {
  for (const seed of SEEDS) {
    const rng = seeded(seed);
    for (const step of [2, 3, 5, 10, -2, -3, -5, -10]) {
      const start = stepStart(step, 6, rng);
      checkSequence(buildSequence(start, step, 6), step);
    }
  }
});

test("distractors are one step out and one out, never the middle of an even three", () => {
  for (const seed of SEEDS) {
    const rng = seeded(seed);
    for (const step of STEPS) {
      for (let answer = step; answer <= 100; answer += step) {
        const wrong = buildDistractors(answer, step, 2, rng);
        assert.equal(new Set([answer, ...wrong]).size, 3);
        for (const w of wrong) assert.ok(w >= 0 && w <= 100);
        const sorted = [answer, ...wrong].sort((x, y) => x - y);
        const evenlySpaced = sorted[1] - sorted[0] === sorted[2] - sorted[1];
        assert.ok(!(sorted[1] === answer && evenlySpaced), `${answer}: ${wrong}`);
      }
    }
  }
});

test("named-step and next-term levels are generated, cover every step and vary", () => {
  for (const seed of SEEDS) {
    const named = buildNamedStepQuestions(seeded(seed));
    assert.deepEqual([...new Set(named.map((q) => q.step))].sort((a, b) => a - b), STEPS);
    assert.equal(new Set(named.map((q) => q.terms.join())).size, 6);
    for (const q of named) {
      assert.ok(q.step > 0);
      checkSequence(q.terms, q.step);
      assert.equal(q.gaps.length, 1);
      assert.ok(q.gaps[0] >= 2);
    }
    const next = buildNextTermQuestions(seeded(seed));
    assert.equal(next.filter((q) => q.step < 0).length, 2);
    assert.equal(new Set(next.map((q) => q.terms.join())).size, 6);
    for (const q of next) {
      checkSequence([...q.terms, q.answer], q.step);
      assert.equal(new Set(q.options).size, 3);
      assert.ok(q.options.includes(q.answer));
    }
  }
  assert.notDeepEqual(buildNamedStepQuestions(seeded(1)).map((q) => q.start), buildNamedStepQuestions(seeded(2)).map((q) => q.start));
});

test("ordering level: five terms, two counting back, never start solved", () => {
  for (const seed of SEEDS) {
    const questions = buildStepOrderQuestions(seeded(seed));
    assert.equal(questions.filter((q) => q.step < 0).length, 2);
    for (const q of questions) {
      assert.equal(q.terms.length, 5);
      checkSequence(q.terms, q.step);
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]));
    }
  }
});

test("group stories: every step, answers within 100, plural nouns", () => {
  for (const seed of SEEDS) {
    const questions = buildGroupStoryQuestions(seeded(seed));
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map((q) => q.prompt)).size, 6);
    assert.deepEqual([...new Set(questions.map((q) => q.step))].sort((a, b) => a - b), STEPS);
    for (const q of questions) {
      assert.equal(q.answer, q.step * q.n);
      assert.ok(q.answer <= 100);
      assert.ok(q.prompt.includes(` ${q.n} `));
      assert.ok(!/ 1 [a-z]+s\b/.test(q.prompt), q.prompt);
    }
  }
});
