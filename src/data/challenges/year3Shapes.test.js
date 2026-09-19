import test from "node:test";
import assert from "node:assert/strict";
import {
  YEAR3_SHAPE_BUILDERS,
  angleName,
  build3DShapeQuestions,
  buildAnglesAsTurnsQuestions,
  buildComparingAngleQuestions,
  buildDrawing2DQuestions,
  buildLineQuestions,
  buildRightAngleQuestions,
  compareWithRightAngle,
  headingAfterRightTurns,
} from "./year3Shapes.js";

function seeded(seed = 123456789) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}

test("all six shape topics build six rounds at every level", () => {
  for (const [name, builder] of Object.entries(YEAR3_SHAPE_BUILDERS)) {
    for (let level = 1; level <= 4; level += 1) {
      const rounds = builder(level, seeded(level * 101));
      assert.equal(rounds.length, 6, `${name} level ${level}`);
      assert.ok(rounds.every((round) => round.type && (round.answer !== undefined || round.ordered)));
    }
  }
});

test("invalid challenge levels are refused", () => {
  for (const builder of Object.values(YEAR3_SHAPE_BUILDERS)) {
    assert.throws(() => builder(0, seeded()), RangeError);
    assert.throws(() => builder(5, seeded()), RangeError);
  }
});

test("every choice round contains its answer exactly once", () => {
  for (const builder of Object.values(YEAR3_SHAPE_BUILDERS)) {
    for (let level = 1; level <= 4; level += 1) {
      for (const round of builder(level, seeded(level * 997))) {
        if (!round.options) continue;
        assert.equal(new Set(round.options).size, round.options.length, round.type);
        assert.equal(round.options.filter((option) => option === round.answer).length, 1, round.type);
      }
    }
  }
});

test("2-D drawing rounds trace every real side and ordering sets have no ties", () => {
  for (const level of [1, 2, 4]) {
    for (const round of buildDrawing2DQuestions(level, seeded(level))) {
      assert.equal(round.answer, round.shape.vertices.length);
      assert.ok(round.startingSides >= 0 && round.startingSides < round.answer);
    }
  }

  for (const round of buildDrawing2DQuestions(3, seeded())) {
    const values = round.items.map((item) => item.value);
    assert.equal(new Set(values).size, values.length);
    assert.deepEqual([...round.items].sort((a, b) => a.value - b.value).map((item) => item.shapeId), round.ordered);
  }
});

test("3-D questions agree with the shared solid data", () => {
  for (const round of build3DShapeQuestions(2, seeded())) {
    assert.equal(round.answer, round.solid[round.key]);
  }
  for (const round of build3DShapeQuestions(3, seeded())) {
    assert.match(round.answer, new RegExp(`${round.solid.edges} edges`));
    assert.match(round.answer, new RegExp(`${round.solid.vertices} corners`));
  }
  assert.ok(build3DShapeQuestions(1, seeded()).some((round) => round.rotation === 180));
});

test("turn pictures and direction pairs describe the same clockwise turn", () => {
  const sizeByName = { "quarter turn": 1, "half turn": 2, "three-quarter turn": 3 };
  const headings = ["up", "right", "down", "left"];

  for (const round of buildAnglesAsTurnsQuestions(1, seeded())) {
    assert.equal(sizeByName[round.answer] * 90, round.degrees);
  }
  for (const round of buildAnglesAsTurnsQuestions(2, seeded())) {
    const turns = (headings.indexOf(round.to) - headings.indexOf(round.from) + 4) % 4;
    assert.equal(turns, sizeByName[round.answer]);
  }
});

test("right-angle facts and applied turns are exact", () => {
  for (const round of buildRightAngleQuestions(1, seeded())) {
    assert.equal(round.answer, round.degrees === 90 ? "yes" : "no");
  }
  for (const round of buildRightAngleQuestions(3, seeded())) {
    assert.equal(round.answer, round.count === 2 ? "half turn" : round.count === 3 ? "three-quarter turn" : "full turn");
  }
  for (const round of buildRightAngleQuestions(4, seeded())) {
    assert.equal(round.answer, headingAfterRightTurns(round.from, round.turns));
  }
});

test("angle language uses a right angle as the exact boundary", () => {
  assert.equal(compareWithRightAngle(89), "less than");
  assert.equal(compareWithRightAngle(90), "equal to");
  assert.equal(compareWithRightAngle(91), "greater than");
  assert.equal(angleName(45), "acute");
  assert.equal(angleName(90), "right angle");
  assert.equal(angleName(120), "obtuse");

  for (const round of buildComparingAngleQuestions(1, seeded())) {
    assert.equal(round.answer, compareWithRightAngle(round.degrees));
  }
  for (const round of buildComparingAngleQuestions(2, seeded())) {
    assert.equal(round.answer, angleName(round.degrees));
  }
});

test("angle ordering is untied and smallest-to-largest", () => {
  for (const round of buildComparingAngleQuestions(3, seeded())) {
    const values = round.angles.map((angle) => angle.value);
    assert.equal(new Set(values).size, values.length);
    assert.deepEqual([...round.angles].sort((a, b) => a.value - b.value).map((angle) => angle.label), round.ordered);
  }
  for (const round of buildComparingAngleQuestions(4, seeded())) {
    const expected = round.first === round.second ? "same size" : round.first > round.second ? "Angle A" : "Angle B";
    assert.equal(round.answer, expected);
  }
});

function edgeVector(shape, edgeIndex) {
  const [x1, y1] = shape.vertices[edgeIndex];
  const [x2, y2] = shape.vertices[(edgeIndex + 1) % shape.vertices.length];
  return [x2 - x1, y2 - y1];
}

function almostZero(value) {
  return Math.abs(value) < 1e-9;
}

test("highlighted lines really have the direction or relationship claimed", () => {
  for (const round of buildLineQuestions(1, seeded())) {
    const [dx, dy] = edgeVector(round.shape, round.highlightSides[0]);
    assert.equal(round.answer, almostZero(dy) ? "horizontal" : almostZero(dx) ? "vertical" : "sloping");
  }

  for (const level of [2, 3, 4]) {
    for (const round of buildLineQuestions(level, seeded(level))) {
      const first = edgeVector(round.shape, round.highlightSides[0]);
      const second = edgeVector(round.shape, round.highlightSides[1]);
      const parallel = almostZero(first[0] * second[1] - first[1] * second[0]);
      const perpendicular = almostZero(first[0] * second[0] + first[1] * second[1]);
      const expected = parallel ? "parallel" : perpendicular ? "perpendicular" : "neither";
      assert.equal(round.answer, expected, `${round.shape.id}: ${round.highlightSides.join(",")}`);
    }
  }
});
