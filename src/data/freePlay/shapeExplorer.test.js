import test from "node:test";
import assert from "node:assert/strict";
import { CHOICE_COUNT, makeShapeQuestion, shapesForLevel } from "./shapeExplorer.js";
import { seeded } from "./random.js";

test("shape ids and names are unique and every level has enough for the choices", () => {
  const all = shapesForLevel(3);
  assert.equal(new Set(all.map((s) => s.id)).size, all.length);
  assert.equal(new Set(all.map((s) => s.name)).size, all.length);
  for (const level of [1, 2, 3]) assert.ok(shapesForLevel(level).length >= CHOICE_COUNT);
});

test("harder levels keep the easier shapes", () => {
  assert.ok(shapesForLevel(2).length > shapesForLevel(1).length);
  assert.ok(shapesForLevel(3).length > shapesForLevel(2).length);
  for (const s of shapesForLevel(1)) assert.ok(shapesForLevel(3).some((x) => x.id === s.id));
});

test("every question has the right shape among four different choices from its level", () => {
  for (const level of [1, 2, 3]) {
    const allowed = new Set(shapesForLevel(level).map((s) => s.id));
    for (let seed = 1; seed <= 80; seed += 1) {
      const q = makeShapeQuestion(seeded(seed), level);
      assert.equal(q.options.length, CHOICE_COUNT);
      assert.equal(new Set(q.options.map((o) => o.id)).size, CHOICE_COUNT, `repeat at seed ${seed}`);
      assert.equal(q.options.filter((o) => o.id === q.shape.id).length, 1);
      assert.ok(allowed.has(q.shape.id));
      for (const o of q.options) assert.ok(allowed.has(o.id));
      assert.equal(q.key, q.shape.id);
    }
  }
});

test("every shape in the bank gets dealt at its level", () => {
  for (const level of [1, 2, 3]) {
    const seen = new Set();
    for (let seed = 1; seed <= 300; seed += 1) seen.add(makeShapeQuestion(seeded(seed), level).shape.id);
    assert.equal(seen.size, shapesForLevel(level).length);
  }
});

test("an unknown level is a caller bug", () => {
  assert.throws(() => makeShapeQuestion(seeded(1), 4), RangeError);
});
