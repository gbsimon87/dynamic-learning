import test from "node:test";
import assert from "node:assert/strict";
import { KINDS, makeFractionQuestion } from "./fractionFun.js";
import { SHAPES, shapeParts, supportsParts } from "./fractionShapes.js";
import { seeded } from "./random.js";

// Shoelace area of an "M x y L x y … Z" polygon path.
function area(d) {
  const pts = d.match(/-?\d+(\.\d+)?/g).map(Number);
  let sum = 0;
  const n = pts.length / 2;
  for (let i = 0; i < n; i += 1) {
    const j = (i + 1) % n;
    sum += pts[2 * i] * pts[2 * j + 1] - pts[2 * j] * pts[2 * i + 1];
  }
  return Math.abs(sum) / 2;
}

test("every part of a polygon, bar or grid has the same area", () => {
  for (const [type, { counts }] of Object.entries(SHAPES)) {
    if (type === "circle") continue;
    for (const level of [1, 2, 3]) {
      for (const parts of counts[level]) {
        const areas = shapeParts(type, parts).paths.map((p) => (type === "bar" || type === "grid" ? rectArea(p) : area(p)));
        assert.equal(areas.length, parts);
        for (const a of areas) assert.ok(Math.abs(a - areas[0]) < areas[0] * 0.02, `${type} ${parts}`);
      }
    }
  }
});

// "M x y H x2 V y2 H x Z"
function rectArea(d) {
  const [x, y, x2, y2] = d.match(/-?\d+(\.\d+)?/g).map(Number);
  return Math.abs(x2 - x) * Math.abs(y2 - y);
}

test("a shape refuses a part count it cannot cut equally", () => {
  assert.throws(() => shapeParts("triangle", 4), RangeError);
  assert.throws(() => shapeParts("grid", 7), RangeError);
  assert.equal(supportsParts("hexagon", 12), true);
});

test("questions are fair at every level and kind", () => {
  for (const level of [1, 2, 3]) {
    for (const kind of KINDS) {
      for (let seed = 1; seed <= 300; seed += 1) {
        const q = makeFractionQuestion(seeded(seed * 13 + level), level, kind);
        assert.ok(supportsParts(q.shape, q.parts), q.key);
        assert.ok(q.numerator >= 1 && q.numerator < q.denominator, q.key);
        assert.ok(q.prompt && q.speech);
        if (kind === "shade") {
          assert.ok(Number.isInteger(q.target) && q.target >= 1 && q.target < q.parts, q.key);
          assert.equal(q.target / q.parts, q.numerator / q.denominator);
          if (level < 3) assert.equal(q.parts, q.denominator);
        } else {
          assert.equal(q.shaded.length, q.numerator);
          assert.equal(new Set(q.shaded).size, q.shaded.length);
          assert.ok(q.options.includes(q.answer), q.key);
          assert.equal(new Set(q.options).size, q.options.length);
          assert.ok(q.options.length >= 3, q.key);
        }
      }
    }
  }
});

test("level 1 stays on halves, thirds and quarters; shapes do not repeat when avoided", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const q = makeFractionQuestion(seeded(seed), 1, "shade", "bar");
    assert.ok([2, 3, 4].includes(q.denominator));
    assert.notEqual(q.shape, "bar");
  }
});

test("level 3 'name it' answers are in simplest form", () => {
  for (let seed = 1; seed <= 200; seed += 1) {
    const q = makeFractionQuestion(seeded(seed), 3, "name");
    const [n, d] = q.answer.split("/").map(Number);
    assert.equal(n / d, q.numerator / q.denominator);
    const g = (a, b) => (b === 0 ? a : g(b, a % b));
    assert.equal(g(n, d), 1);
  }
});
