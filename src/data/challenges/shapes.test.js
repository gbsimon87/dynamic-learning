import test from "node:test";
import assert from "node:assert/strict";
import {
  SHAPES_2D,
  SOLIDS,
  findShape,
  findSolid,
  polygonPoints,
  countableSolids,
  sideCountableShapes,
} from "./shapes.js";

test("every polygon's vertex list matches its stated side count", () => {
  // The whole point of holding vertices as data: a shape cannot claim 5 sides
  // while being drawn with 6 corners.
  for (const shape of SHAPES_2D) {
    if (shape.curved) continue;
    assert.equal(
      shape.vertices.length,
      shape.sides,
      `${shape.name} says ${shape.sides} sides but has ${shape.vertices.length} vertices`
    );
  }
});

test("every vertex sits inside the unit box", () => {
  // Coordinates are 0..1 so the figure component can scale them to any size.
  for (const shape of SHAPES_2D) {
    for (const [x, y] of shape.vertices ?? []) {
      assert.ok(x >= 0 && x <= 1, `${shape.name} x=${x} out of range`);
      assert.ok(y >= 0 && y <= 1, `${shape.name} y=${y} out of range`);
    }
  }
});

test("shapes claiming vertical symmetry really are symmetric", () => {
  // Reflecting each vertex in the vertical centre line must land on another
  // vertex of the same shape.
  for (const shape of SHAPES_2D) {
    if (shape.curved || !shape.verticalSymmetry) continue;
    for (const [x, y] of shape.vertices) {
      const mirrored = shape.vertices.some(
        ([mx, my]) => Math.abs(mx - (1 - x)) < 0.01 && Math.abs(my - y) < 0.01
      );
      assert.ok(mirrored, `${shape.name} is not symmetric: (${x}, ${y}) has no mirror`);
    }
  }
});

test("shapes claiming NO vertical symmetry really are not symmetric", () => {
  for (const shape of SHAPES_2D) {
    if (shape.curved || shape.verticalSymmetry) continue;
    const allMirrored = shape.vertices.every(([x, y]) =>
      shape.vertices.some(
        ([mx, my]) => Math.abs(mx - (1 - x)) < 0.01 && Math.abs(my - y) < 0.01
      )
    );
    assert.equal(allMirrored, false, `${shape.name} is symmetric but marked as not`);
  }
});

test("both symmetric and non-symmetric shapes exist to ask about", () => {
  assert.ok(SHAPES_2D.some((s) => s.verticalSymmetry));
  assert.ok(SHAPES_2D.some((s) => !s.verticalSymmetry && !s.curved));
});

test("side-countable shapes exclude the curved ones", () => {
  // "How many sides does a circle have?" has no agreed answer at Year 2, so
  // the circle must never appear in a counting question.
  assert.ok(sideCountableShapes().every((s) => !s.curved));
  assert.ok(sideCountableShapes().every((s) => s.sides >= 3));
});

test("Euler's formula holds for every countable solid", () => {
  // faces + vertices - edges = 2 for any polyhedron. If a count is typed
  // wrongly this catches it, which no amount of proofreading reliably does.
  for (const solid of countableSolids()) {
    assert.equal(
      solid.faces + solid.vertices - solid.edges,
      2,
      `${solid.name}: ${solid.faces} + ${solid.vertices} - ${solid.edges} != 2`
    );
  }
});

test("a cube and a cuboid have the counts Year 2 is taught", () => {
  assert.deepEqual(
    (({ faces, edges, vertices }) => ({ faces, edges, vertices }))(findSolid("cube")),
    { faces: 6, edges: 12, vertices: 8 }
  );
  assert.equal(findSolid("square-pyramid").faces, 5);
  assert.equal(findSolid("triangular-prism").edges, 9);
});

test("curved solids are kept out of the counting questions", () => {
  // Whether a sphere has one face or none is a convention, not a fact, so it
  // is never asked as a count.
  const names = countableSolids().map((s) => s.id);
  for (const curved of ["sphere", "cylinder", "cone"]) {
    assert.ok(!names.includes(curved), `${curved} must not be countable`);
  }
});

test("every solid names the 2-D shapes on its surface", () => {
  for (const solid of SOLIDS) {
    assert.ok(solid.faceShapes.length > 0, `${solid.name} has no face shapes`);
    for (const face of solid.faceShapes) {
      assert.ok(findShape(face), `${solid.name} names an unknown face shape: ${face}`);
    }
  }
});

test("turns a shape into an SVG points string", () => {
  const points = polygonPoints(findShape("square"), 100);
  assert.equal(points, "0,0 100,0 100,100 0,100");
});

test("looking up an unknown shape or solid returns nothing", () => {
  assert.equal(findShape("dodecahedron"), undefined);
  assert.equal(findSolid("torus"), undefined);
});
