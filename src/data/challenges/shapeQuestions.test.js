import test from "node:test";
import assert from "node:assert/strict";
import { findShape, findSolid } from "./shapes.js";
import {
  QUESTION_COUNT,
  buildNameShapes,
  buildCountSides,
  buildSymmetry,
  buildOrderBySides,
  buildNameSolids,
  buildCountSolidParts,
  buildEverydaySolids,
  buildOrderSolids,
  buildFaceOnSolid,
  buildFlatOrSolid,
  buildOddOneOut,
  buildShapeClues,
  SHAPE_CLUES,
  EVERYDAY_OBJECTS,
} from "./shapeQuestions.js";

/** A small seeded generator so every run of the suite sees the same draws. */
function seeded(seed) {
  // mulberry32: well mixed from the very first draw, even for seeds 1, 2, 3.
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
  };
}

const SEEDS = Array.from({ length: 60 }, (_, i) => i + 1);

function eachRun(build, check) {
  for (const seed of SEEDS) check(build(seeded(seed)), seed);
}

function assertChoices(questions, answerKey = "answer") {
  for (const q of questions) {
    assert.ok(q.options.includes(q[answerKey]), `answer ${q[answerKey]} missing from ${q.options}`);
    assert.equal(new Set(q.options).size, q.options.length, `duplicate options ${q.options}`);
  }
}

function assertVaries(build, keyOf) {
  const runs = new Set(SEEDS.slice(0, 10).map((seed) => build(seeded(seed)).map(keyOf).join("/")));
  assert.ok(runs.size > 5, "runs barely vary between attempts");
}

/* ---------- 2-D shapes ---------- */

test("2-D 1: six different shapes, each with its own name among look-alike options", () => {
  eachRun(buildNameShapes, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    assert.equal(new Set(qs.map((q) => q.shape.id)).size, QUESTION_COUNT);
    assertChoices(qs);
    for (const q of qs) assert.equal(q.options.length, 3);
  });
  assertVaries(buildNameShapes, (q) => q.shape.id);
});

test("2-D 2: no circle, no repeated shape, and no side count asked more than twice", () => {
  eachRun(buildCountSides, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    assert.equal(new Set(qs.map((q) => q.shape.id)).size, QUESTION_COUNT);
    for (const q of qs) {
      assert.ok(!q.shape.curved);
      assert.equal(q.answer, q.shape.vertices.length);
    }
    const counts = new Map();
    for (const q of qs) counts.set(q.answer, (counts.get(q.answer) ?? 0) + 1);
    for (const n of counts.values()) assert.ok(n <= 2);
  });
});

test("2-D 3: the answer matches the shape, and the number of yeses varies between runs", () => {
  const yesTotals = new Set();
  eachRun(buildSymmetry, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    assert.equal(new Set(qs.map((q) => q.shape.id)).size, QUESTION_COUNT);
    for (const q of qs) assert.equal(q.answer, q.shape.verticalSymmetry ? "yes" : "no");
    const yes = qs.filter((q) => q.answer === "yes").length;
    assert.ok(yes >= 2 && yes <= 4);
    yesTotals.add(yes);
  });
  assert.ok(yesTotals.size > 1);
});

test("2-D 4: four different side counts, never already solved, no repeated set", () => {
  eachRun(buildOrderBySides, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    const keys = new Set();
    for (const q of qs) {
      const sides = q.cards.map((c) => findShape(c.shapeId).sides);
      assert.equal(new Set(sides).size, 4, "two cards tie on sides");
      const ordered = q.ordered.map((id) => findShape(id).sides);
      assert.deepEqual(ordered, [...ordered].sort((a, b) => a - b));
      assert.ok(!q.cards.every((c, i) => c.id === q.ordered[i]), "starts solved");
      keys.add([...q.ordered].sort().join());
    }
    assert.equal(keys.size, QUESTION_COUNT);
  });
  assertVaries(buildOrderBySides, (q) => q.ordered.join());
});

/* ---------- 3-D shapes ---------- */

test("3-D 1: six different solids named among look-alike options", () => {
  eachRun(buildNameSolids, (qs) => {
    assert.equal(new Set(qs.map((q) => q.solid.id)).size, QUESTION_COUNT);
    assertChoices(qs);
    for (const q of qs) assert.equal(q.answer, q.solid.name);
  });
});

test("3-D 2: faces, edges and vertices are each asked twice, never the same pair twice", () => {
  eachRun(buildCountSolidParts, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    for (const part of ["faces", "edges", "vertices"]) {
      assert.equal(qs.filter((q) => q.part.key === part).length, 2);
    }
    assert.equal(new Set(qs.map((q) => `${q.solid.id}:${q.part.key}`)).size, QUESTION_COUNT);
    for (const q of qs) {
      assert.ok(!q.solid.curved);
      assert.equal(q.answer, q.solid[q.part.key]);
    }
  });
});

test("3-D 3: six different objects, no solid the answer more than twice", () => {
  assert.ok(EVERYDAY_OBJECTS.every((o) => findSolid(o.answer)));
  eachRun(buildEverydaySolids, (qs) => {
    assert.equal(new Set(qs.map((q) => q.object)).size, QUESTION_COUNT);
    assertChoices(qs, "answerName");
    const counts = new Map();
    for (const q of qs) counts.set(q.answerName, (counts.get(q.answerName) ?? 0) + 1);
    for (const n of counts.values()) assert.ok(n <= 2);
  });
});

test("3-D 4: no tie on the asked property, both directions used, never starts solved", () => {
  eachRun(buildOrderSolids, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    assert.equal(qs.filter((q) => q.direction === "most").length, 3);
    assert.equal(new Set(qs.map((q) => `${q.key}:${[...q.ordered].sort().join()}`)).size, QUESTION_COUNT);
    for (const q of qs) {
      const values = q.ordered.map((id) => findSolid(id)[q.key]);
      assert.equal(new Set(values).size, values.length, "a tie on the asked property");
      const expected = [...values].sort((a, b) => (q.direction === "fewest" ? a - b : b - a));
      assert.deepEqual(values, expected);
      assert.ok(!q.cards.every((c, i) => c.id === q.ordered[i]), "starts solved");
    }
  });
});

/* ---------- Different shapes ---------- */

test("Different 1: never the sphere, and the answer really is a face of the solid", () => {
  eachRun(buildFaceOnSolid, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    assertChoices(qs);
    for (const q of qs) {
      assert.notEqual(q.solid.id, "sphere");
      const faceNames = q.solid.faceShapes.map((f) => findShape(f).name);
      assert.ok(faceNames.includes(q.answer));
      // Exactly one option is a face of the solid, and a square is never
      // marked wrong on a solid whose faces are rectangles (or the reverse).
      const correctish = q.options.filter(
        (name) =>
          faceNames.includes(name) ||
          (name === "rectangle" && faceNames.includes("square")) ||
          (name === "square" && faceNames.includes("rectangle"))
      );
      assert.deepEqual(correctish, [q.answer]);
    }
  });
});

test("Different 2: between 2 and 4 flat shapes, no repeats", () => {
  eachRun(buildFlatOrSolid, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    const flat = qs.filter((q) => q.answer === "flat").length;
    assert.ok(flat >= 2 && flat <= 4);
    assert.equal(new Set(qs.map((q) => (q.shape ?? q.solid).id)).size, QUESTION_COUNT);
  });
});

test("Different 3: four distinct cards, no repeated set, answer never already at the front", () => {
  eachRun(buildOddOneOut, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    const keys = new Set();
    for (const q of qs) {
      assert.equal(q.cards.length, 4);
      assert.equal(new Set(q.cards.map((c) => c.label)).size, 4, "two cards share a name");
      assert.notEqual(q.cards[0].id, q.odd);
      keys.add(q.cards.map((c) => c.id).sort().join());
    }
    assert.equal(keys.size, QUESTION_COUNT);
  });
});

test("Different 4: three flat and three solid clues, each with its answer among the options", () => {
  for (const clue of SHAPE_CLUES) assert.ok(!clue.wrong.includes(clue.answer));
  eachRun(buildShapeClues, (qs) => {
    assert.equal(qs.length, QUESTION_COUNT);
    assert.equal(new Set(qs.map((q) => q.clue)).size, QUESTION_COUNT);
    assertChoices(qs);
  });
  // The pentagon is the lesson's worked example, so it is never a clue.
  assert.ok(SHAPE_CLUES.every((c) => c.answer !== "pentagon"));
});
