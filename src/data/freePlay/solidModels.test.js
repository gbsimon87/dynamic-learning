import test from "node:test";
import assert from "node:assert/strict";
import { SOLID_VERTICES, drawSolid, solidCounts } from "./solidModels.js";

const EXPECTED = {
  cube: { vertices: 8, edges: 12, faces: 6 },
  cuboid: { vertices: 8, edges: 12, faces: 6 },
  "square-pyramid": { vertices: 5, edges: 8, faces: 5 },
  "triangular-prism": { vertices: 6, edges: 9, faces: 5 },
  "triangular-pyramid": { vertices: 4, edges: 6, faces: 4 },
  tetrahedron: { vertices: 4, edges: 6, faces: 4 },
  "hexagonal-prism": { vertices: 12, edges: 18, faces: 8 },
  frustum: { vertices: 8, edges: 12, faces: 6 },
  octahedron: { vertices: 6, edges: 12, faces: 8 },
  bipyramid: { vertices: 8, edges: 18, faces: 12 },
  icosahedron: { vertices: 12, edges: 30, faces: 20 },
  dodecahedron: { vertices: 20, edges: 30, faces: 12 },
};

test("every solid has the corners, edges and faces its name promises", () => {
  assert.deepEqual(Object.keys(EXPECTED).sort(), Object.keys(SOLID_VERTICES).sort());
  for (const [id, expected] of Object.entries(EXPECTED)) {
    assert.deepEqual(solidCounts(id), expected, id);
  }
});

test("every solid satisfies Euler's formula (V - E + F = 2)", () => {
  for (const id of Object.keys(SOLID_VERTICES)) {
    const { vertices, edges, faces } = solidCounts(id);
    assert.equal(vertices - edges + faces, 2, id);
  }
});

test("a solid draws a few visible faces, all inside the 120 box", () => {
  for (const id of Object.keys(SOLID_VERTICES)) {
    const faces = drawSolid(id);
    assert.ok(faces.length >= 2, `${id} shows ${faces.length} faces`);
    for (const { points, tone } of faces) {
      assert.ok(tone >= -1.0001 && tone <= 1.0001);
      for (const pair of points.split(" ")) {
        const [x, y] = pair.split(",").map(Number);
        assert.ok(x >= 0 && x <= 120 && y >= 0 && y <= 120, `${id} point ${pair}`);
      }
    }
  }
});
