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

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  buildCountOnQuestions,
  buildCountBackQuestions,
  buildCountOrderQuestions,
  buildCountingStoryQuestions,
} from "./countingForwardsAndBackwards.js";

/** Deterministic rng so a failing seed can be replayed. */
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

function answerIsMiddleOfRun(options, answer) {
  const sorted = [...options].sort((x, y) => x - y);
  return sorted[1] === answer && sorted[2] - sorted[0] === 2;
}

function checkChoice(q) {
  assert.equal(q.options.length, 3);
  assert.equal(new Set(q.options).size, 3);
  assert.ok(q.options.includes(q.answer));
  for (const o of q.options) assert.ok(o >= 0 && o <= 100, `${o}`);
  assert.ok(!answerIsMiddleOfRun(q.options, q.answer), `${q.options}`);
}

test("counting distractors never leave the answer in the middle of three in a row", () => {
  for (const seed of SEEDS) {
    const rng = seeded(seed);
    let middles = 0;
    for (let answer = 0; answer <= 100; answer++) {
      const wrong = countingDistractors(answer, 2, rng);
      assert.equal(wrong.length, 2);
      assert.ok(!wrong.includes(answer));
      for (const w of wrong) assert.ok(w >= 0 && w <= 100);
      if (answer > 0 && answer < 100) assert.ok(Math.abs(wrong[0] - answer) === 1, "leads with the one-out slip");
      assert.ok(!answerIsMiddleOfRun([answer, ...wrong], answer), `${answer}: ${wrong}`);
      if ([answer, ...wrong].sort((x, y) => x - y)[1] === answer) middles++;
    }
    // The answer's position among the sorted options varies.
    assert.ok(middles > 0 && middles < 101);
  }
});

test("count-on and count-back levels are generated, cross a ten and vary between runs", () => {
  for (const seed of SEEDS) {
    for (const [build, back] of [[buildCountOnQuestions, false], [buildCountBackQuestions, true]]) {
      const questions = build(seeded(seed));
      assert.equal(questions.length, 6);
      assert.equal(new Set(questions.map((q) => q.start)).size, 6, "repeated question");
      for (const q of questions) {
        assert.equal(q.by < 0, back);
        assert.ok(Math.abs(q.by) >= 3 && Math.abs(q.by) <= 6);
        assert.equal(q.answer, q.start + q.by);
        assert.ok(crossesTen(q.start, q.by));
        assert.ok(q.answer >= 10 && q.answer <= 99);
        checkChoice(q);
        if (!back) assert.equal(q.terms[q.highlight], q.start);
        if (!back) assert.ok(q.terms.includes(q.answer));
      }
    }
  }
  assert.notDeepEqual(buildCountOnQuestions(seeded(1)).map((q) => q.start), buildCountOnQuestions(seeded(2)).map((q) => q.start));
});

test("ordering a count: three on, three back, six numbers across a ten, never solved", () => {
  for (const seed of SEEDS) {
    const questions = buildCountOrderQuestions(seeded(seed));
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map((q) => `${q.direction}${q.from}`)).size, 6);
    assert.equal(questions.filter((q) => q.direction === "on").length, 3);
    for (const q of questions) {
      const step = q.direction === "on" ? 1 : -1;
      assert.equal(q.terms.length, 6);
      q.terms.forEach((t, i) => assert.equal(t, q.from + step * i));
      assert.equal(q.terms[5], q.to);
      assert.ok(crossesTen(q.from, q.to - q.from));
      assert.ok(Math.min(...q.terms) >= 10 && Math.max(...q.terms) <= 99);
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]));
    }
  }
});

test("counting stories: three each way, unambiguous, answers match the words", () => {
  for (const seed of SEEDS) {
    const questions = buildCountingStoryQuestions(seeded(seed));
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map((q) => q.prompt)).size, 6);
    assert.equal(questions.filter((q) => q.back).length, 3);
    for (const q of questions) {
      assert.equal(q.answer, q.start + q.by);
      assert.ok(crossesTen(q.start, q.by));
      assert.ok(!/left to read/.test(q.prompt), "the ambiguous book story is gone");
      assert.ok(!/ 1 [a-z]+s\b/.test(q.prompt), `plural after 1: ${q.prompt}`);
      const numbers = q.prompt.match(/\d+/g).map(Number);
      assert.deepEqual(numbers, [q.start, Math.abs(q.by)]);
    }
  }
});
