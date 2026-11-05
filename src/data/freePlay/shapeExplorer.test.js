import test from "node:test";
import assert from "node:assert/strict";
import { CHOICE_COUNT, KINDS, makeShapeQuestion, sameDrawing, shapesForLevel } from "./shapeExplorer.js";
import { SOLID_VERTICES } from "./solidModels.js";
import { seeded } from "./random.js";

const KIND_IDS = KINDS.map((k) => k.id);
const everyPool = () => KIND_IDS.flatMap((kind) => [1, 2, 3].map((level) => ({ kind, level, pool: shapesForLevel(level, kind) })));

test("shape ids and names are unique across the whole bank", () => {
  const all = everyPool().flatMap(({ pool }) => pool);
  assert.equal(new Set(all.map((s) => s.id)).size, all.length);
  assert.equal(new Set(all.map((s) => s.name)).size, all.length);
});

test("each level has its own shapes: no shape is repeated across levels", () => {
  for (const kind of KIND_IDS) {
    const ids = [1, 2, 3].flatMap((level) => shapesForLevel(level, kind).map((s) => s.id));
    assert.equal(new Set(ids).size, ids.length, kind);
  }
});

test("every shape has at least three wrong answers that cannot also be right", () => {
  for (const { kind, level, pool } of everyPool()) {
    for (const shape of pool) {
      const wrong = pool.filter((s) => !sameDrawing(s, shape));
      assert.ok(wrong.length >= CHOICE_COUNT - 1, `${kind} L${level} ${shape.id}`);
    }
  }
});

test("alsoCounts only names shapes that exist", () => {
  const ids = new Set(everyPool().flatMap(({ pool }) => pool.map((s) => s.id)));
  for (const { pool } of everyPool()) {
    for (const s of pool) for (const other of s.alsoCounts ?? []) assert.ok(ids.has(other), `${s.id} -> ${other}`);
  }
});

test("every 3D solid with flat faces has a vertex model", () => {
  const flat = new Set(Object.keys(SOLID_VERTICES));
  const curved = new Set(["sphere", "cylinder", "cone", "hemisphere", "torus"]);
  for (const s of everyPool().filter((p) => p.kind === "3d").flatMap((p) => p.pool)) {
    assert.ok(flat.has(s.id) || curved.has(s.id), s.id);
  }
});

test("every question has the right shape among four choices that cannot also be right", () => {
  for (const { kind, level, pool } of everyPool()) {
    const allowed = new Set(pool.map((s) => s.id));
    for (let seed = 1; seed <= 80; seed += 1) {
      const q = makeShapeQuestion(seeded(seed), level, kind);
      assert.equal(q.options.length, CHOICE_COUNT);
      assert.equal(new Set(q.options.map((o) => o.id)).size, CHOICE_COUNT, `repeat at seed ${seed}`);
      assert.equal(q.options.filter((o) => o.id === q.shape.id).length, 1);
      for (const o of q.options) {
        assert.ok(allowed.has(o.id));
        if (o.id !== q.shape.id) assert.ok(!sameDrawing(o, q.shape), `${o.id} also fits ${q.shape.id}`);
      }
    }
  }
});

test("every shape in a level gets dealt", () => {
  for (const { kind, level, pool } of everyPool()) {
    const seen = new Set();
    for (let seed = 1; seed <= 600; seed += 1) seen.add(makeShapeQuestion(seeded(seed), level, kind).shape.id);
    assert.equal(seen.size, pool.length, `${kind} L${level}`);
  }
});

test("the prompt names 3D shapes as 3D", () => {
  assert.equal(makeShapeQuestion(seeded(1), 1, "2d").prompt, "What shape is this?");
  assert.equal(makeShapeQuestion(seeded(1), 1, "3d").prompt, "What 3D shape is this?");
});

test("an unknown level or kind is a caller bug", () => {
  assert.throws(() => makeShapeQuestion(seeded(1), 4), RangeError);
  assert.throws(() => makeShapeQuestion(seeded(1), 1, "4d"), RangeError);
});
