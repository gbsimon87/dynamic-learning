import test from "node:test";
import assert from "node:assert/strict";
import {
  compareSymbol,
  SYMBOLS,
  isTrueStatement,
  betweenBounds,
} from "./comparingNumbers.js";

test("the three symbols are less than, greater than and equal to", () => {
  assert.deepEqual(SYMBOLS, ["<", ">", "="]);
});

test("picks the symbol that makes the statement true", () => {
  assert.equal(compareSymbol(3, 8), "<");
  assert.equal(compareSymbol(80, 8), ">");
  assert.equal(compareSymbol(42, 42), "=");
});

test("checks a statement the learner built", () => {
  assert.equal(isTrueStatement(12, "<", 20), true);
  assert.equal(isTrueStatement(12, ">", 20), false);
  assert.equal(isTrueStatement(20, "=", 20), true);
  assert.equal(isTrueStatement(20, "=", 21), false);
});

test("an unknown symbol is not a true statement", () => {
  assert.equal(isTrueStatement(1, "?", 2), false);
});

test("accepts any number strictly between the bounds", () => {
  assert.equal(betweenBounds(27, 25, 30), true);
  assert.equal(betweenBounds(26, 25, 30), true);
});

test("rejects the bounds themselves", () => {
  // "greater than 25" excludes 25.
  assert.equal(betweenBounds(25, 25, 30), false);
  assert.equal(betweenBounds(30, 25, 30), false);
});

test("rejects anything outside the bounds", () => {
  assert.equal(betweenBounds(24, 25, 30), false);
  assert.equal(betweenBounds(31, 25, 30), false);
});

// ---------------------------------------------------------------------------
// Generated question banks
// ---------------------------------------------------------------------------

import {
  buildPickSymbolQuestions,
  buildPickNumberQuestions,
  buildChainQuestions,
  buildBetweenQuestions,
} from "./comparingNumbers.js";

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

test("pick the symbol: generated pairs, every symbol appears, no repeats", () => {
  for (const seed of SEEDS) {
    const questions = buildPickSymbolQuestions(seeded(seed));
    assert.equal(questions.length, 6);
    assert.equal(new Set(questions.map((q) => `${q.left},${q.right}`)).size, 6);
    assert.equal(new Set(questions.map((q) => q.answer)).size, 3);
    for (const q of questions) {
      assert.equal(q.answer, compareSymbol(q.left, q.right));
      assert.ok(q.left >= 0 && q.left <= 100 && q.right >= 0 && q.right <= 100);
    }
  }
  assert.notDeepEqual(
    buildPickSymbolQuestions(seeded(1)).map((q) => q.left),
    buildPickSymbolQuestions(seeded(2)).map((q) => q.left),
  );
});

test("pick the number: exactly one option makes the statement true, the bound is a trap", () => {
  for (const seed of SEEDS) {
    const questions = buildPickNumberQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.left)).size, 6);
    for (const symbol of SYMBOLS) assert.equal(questions.filter((q) => q.symbol === symbol).length, 2);
    for (const q of questions) {
      assert.equal(new Set(q.options).size, 3, `${q.options}`);
      assert.ok(q.options.includes(q.answer));
      for (const o of q.options) assert.ok(o >= 0 && o <= 100);
      const right = q.options.filter((o) => isTrueStatement(q.left, q.symbol, o));
      assert.deepEqual(right, [q.answer], `${q.left} ${q.symbol} ${q.options}`);
      if (q.symbol !== "=") assert.ok(q.options.includes(q.left), "bound offered");
    }
  }
});

test("chains: both signs, true once ordered, never start solved", () => {
  for (const seed of SEEDS) {
    const questions = buildChainQuestions(seeded(seed));
    assert.equal(questions.filter((q) => q.symbol === ">").length, 3);
    assert.equal(new Set(questions.map((q) => [...q.terms].sort().join())).size, 6);
    for (const q of questions) {
      assert.equal(new Set(q.terms).size, 4);
      for (let i = 1; i < 4; i++) assert.ok(isTrueStatement(q.terms[i - 1], q.symbol, q.terms[i]));
      assert.ok(!q.cards.every((c, i) => c.id === q.terms[i]));
    }
  }
});

test("between: generated bounds with at least two answers, within 100", () => {
  for (const seed of SEEDS) {
    const questions = buildBetweenQuestions(seeded(seed));
    assert.equal(new Set(questions.map((q) => q.low)).size, 6);
    for (const q of questions) {
      assert.ok(q.high - q.low >= 3 && q.high <= 99 && q.low >= 10);
      assert.equal(betweenBounds(q.low, q.low, q.high), false);
    }
  }
});
