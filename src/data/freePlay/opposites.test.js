import test from "node:test";
import assert from "node:assert/strict";
import { makeOppositeQuestion, pairCountForLevel, pairsForLevel } from "./opposites.js";
import { seeded } from "./random.js";

test("pairs are lowercase words and no pair is listed twice", () => {
  const seen = new Set();
  for (const [a, b] of pairsForLevel(3)) {
    assert.match(a, /^[a-z]+$/, a);
    assert.match(b, /^[a-z]+$/, b);
    assert.notEqual(a, b);
    assert.ok(!seen.has(`${a}-${b}`), `duplicate ${a}-${b}`);
    seen.add(`${a}-${b}`);
  }
});

test("harder levels keep the easier pairs", () => {
  assert.ok(pairsForLevel(2).length > pairsForLevel(1).length);
  assert.ok(pairsForLevel(3).length > pairsForLevel(2).length);
  for (const pair of pairsForLevel(1)) assert.ok(pairsForLevel(3).some((p) => p.join() === pair.join()));
});

test("each level deals the right number of pairs and never repeats a word", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 60; seed += 1) {
      const q = makeOppositeQuestion(seeded(seed), level);
      const count = pairCountForLevel(level);
      assert.equal(q.pairs.length, count);
      assert.equal(q.left.length, count);
      assert.equal(q.right.length, count);
      const all = [...q.left, ...q.right];
      assert.equal(new Set(all).size, all.length, `repeated word at seed ${seed}`);
      assert.deepEqual([...q.left].sort(), q.pairs.map((p) => p[0]).sort());
      assert.deepEqual([...q.right].sort(), q.pairs.map((p) => p[1]).sort());
    }
  }
});

test("every dealt pair comes from that level's bank, in either order", () => {
  for (const level of [1, 2, 3]) {
    const bank = pairsForLevel(level).map((p) => [...p].sort().join());
    for (let seed = 1; seed <= 40; seed += 1) {
      for (const pair of makeOppositeQuestion(seeded(seed), level).pairs) {
        assert.ok(bank.includes([...pair].sort().join()), `${pair} at level ${level}`);
      }
    }
  }
});

test("an unknown level is a caller bug", () => {
  assert.throws(() => makeOppositeQuestion(Math.random, 4), RangeError);
});
