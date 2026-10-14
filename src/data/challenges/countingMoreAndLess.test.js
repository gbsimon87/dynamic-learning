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

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  buildOneMoreLessQuestions,
  buildRuleMachineQuestions,
  buildRuleChainQuestions,
  buildMoreLessStoryQuestions,
} from "./countingMoreAndLess.js";

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
  assert.equal(new Set(q.options).size, 3);
  assert.ok(q.options.includes(q.answer));
  for (const o of q.options) assert.ok(o >= 0 && o <= 100, `${o}`);
  const sorted = [...q.options].sort((x, y) => x - y);
  assert.ok(!(sorted[1] === q.answer && sorted[2] - sorted[0] === 2), `${q.options}`);
}

test("distractors lead with the backwards answer and vary the near miss", () => {
  const seconds = new Set();
  for (const seed of SEEDS) {
    const wrong = moreLessDistractors(34, 10, 2, seeded(seed));
    assert.equal(wrong[0], 24);
    seconds.add(wrong[1]);
  }
  assert.ok(seconds.size >= 2, `${[...seconds]}`);
});

test("1 more / 1 less: three of each, generated, fair options", () => {
  for (const seed of SEEDS) {
    const questions = buildOneMoreLessQuestions(seeded(seed));
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map((q) => q.start)).size, 6);
    assert.equal(questions.filter((q) => q.change === 1).length, 3);
    for (const q of questions) {
      assert.equal(q.answer, q.start + q.change);
      assert.equal(q.strip[q.highlight], q.start);
      checkChoice(q);
    }
  }
  assert.notDeepEqual(buildOneMoreLessQuestions(seeded(1)).map((q) => q.start), buildOneMoreLessQuestions(seeded(2)).map((q) => q.start));
});

test("rule machines use every rule once with three different inputs", () => {
  for (const seed of SEEDS) {
    const questions = buildRuleMachineQuestions(seeded(seed));
    assert.deepEqual(questions.map((q) => q.change).sort((x, y) => x - y), [...CHANGES].sort((x, y) => x - y));
    for (const q of questions) {
      for (const pair of q.pairs) assert.equal(pair.out, pair.in + q.change);
      assert.equal(new Set([...q.pairs.map((p) => p.in), q.unknownIn]).size, 3);
      assert.equal(q.answer, q.unknownIn + q.change);
      checkChoice(q);
    }
  }
});

test("rule chains stay two-digit and never start solved", () => {
  for (const seed of SEEDS) {
    const questions = buildRuleChainQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.change)).size, 6);
    for (const q of questions) {
      assert.equal(q.terms[0], q.start);
      for (let i = 1; i < q.terms.length; i++) assert.equal(q.terms[i], q.terms[i - 1] + q.change);
      for (const t of q.terms) assert.ok(t >= 10 && t <= 99);
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]));
    }
  }
});

test("more/less stories read naturally and match their answers", () => {
  for (const seed of SEEDS) {
    const questions = buildMoreLessStoryQuestions(seeded(seed));
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map((q) => q.prompt.replace(/\d+/g, "#").replace(/[A-Z][a-z]+/g, "N"))).size, 6);
    for (const q of questions) {
      assert.equal(q.answer, q.start + q.change);
      assert.ok(q.answer >= 10 && q.answer <= 99);
      assert.ok(!/fewer than that today/.test(q.prompt));
      assert.ok(!/ 1 [a-z]+s\b/.test(q.prompt), `plural after 1: ${q.prompt}`);
      const names = q.prompt.match(/\b(Mia|Sam|Ella|Tom|Zara|Ali)\b/g) ?? [];
      if (names.length > 1) assert.ok(new Set(names).size === 2, q.prompt);
    }
  }
});
