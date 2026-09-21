import test from "node:test";
import assert from "node:assert/strict";
import { raDecToUnitVector, projectConstellation } from "./constellationProjection.js";

// The seven Plough stars, J2000. Kept inline so this file tests the maths
// rather than whatever constellations.js happens to contain.
const URSA_MAJOR = [
  { id: "dubhe", name: "Dubhe", raHours: 11.06213, decDeg: 61.75103, magnitude: 1.79 },
  { id: "merak", name: "Merak", raHours: 11.03069, decDeg: 56.38242, magnitude: 2.37 },
  { id: "phecda", name: "Phecda", raHours: 11.89718, decDeg: 53.69475, magnitude: 2.44 },
  { id: "megrez", name: "Megrez", raHours: 12.25710, decDeg: 57.03261, magnitude: 3.31 },
  { id: "alioth", name: "Alioth", raHours: 12.90049, decDeg: 55.95983, magnitude: 1.77 },
  { id: "mizar", name: "Mizar", raHours: 13.39876, decDeg: 54.92536, magnitude: 2.23 },
  { id: "alkaid", name: "Alkaid", raHours: 13.79234, decDeg: 49.31328, magnitude: 1.86 },
];

const byId = (points) => new Map(points.map((point) => [point.id, point]));
const extreme = (points, key, better) =>
  points.reduce((best, point) => (better(point[key], best[key]) ? point : best)).id;

test("raDecToUnitVector returns unit-length vectors", () => {
  for (const star of URSA_MAJOR) {
    const { x, y, z } = raDecToUnitVector(star);
    assert.ok(Math.abs(Math.hypot(x, y, z) - 1) < 1e-9, `${star.id} is not unit length`);
  }
});

test("raDecToUnitVector puts the north celestial pole on +y", () => {
  const { x, y, z } = raDecToUnitVector({ raHours: 0, decDeg: 90 });
  assert.ok(Math.abs(x) < 1e-9);
  assert.ok(Math.abs(z) < 1e-9);
  assert.ok(Math.abs(y - 1) < 1e-9);
});

test("every star is projected, inside the returned box", () => {
  const { points, width, height } = projectConstellation(URSA_MAJOR);
  assert.equal(points.length, 7);
  assert.deepEqual(
    points.map((point) => point.id).sort(),
    URSA_MAJOR.map((star) => star.id).sort(),
  );
  for (const point of points) {
    assert.ok(point.x >= 0 && point.x <= width, `${point.id} x out of box`);
    assert.ok(point.y >= 0 && point.y <= height, `${point.id} y out of box`);
  }
});

test("the Plough points the conventional way round", () => {
  const { points } = projectConstellation(URSA_MAJOR);
  // Bowl on the right, handle trailing left and dipping at its end.
  assert.equal(extreme(points, "x", (a, b) => a > b), "merak", "bowl should be rightmost");
  assert.equal(extreme(points, "x", (a, b) => a < b), "alkaid", "handle end should be leftmost");
  assert.equal(extreme(points, "y", (a, b) => a < b), "dubhe", "Dubhe should be highest");
  assert.equal(extreme(points, "y", (a, b) => a > b), "alkaid", "Alkaid should be lowest");
});

test("the chart keeps the constellation's real proportions", () => {
  const { width, height } = projectConstellation(URSA_MAJOR);
  const aspect = width / height;
  assert.ok(aspect > 1.7 && aspect < 2.0, `aspect ${aspect} is not roughly 1.8`);
});

test("brighter stars get bigger dots, on a scale shared across constellations", () => {
  const points = byId(projectConstellation(URSA_MAJOR).points);
  // Alioth (1.77) is brighter than Megrez (3.31), so it must be drawn larger.
  assert.ok(points.get("alioth").radius > points.get("megrez").radius);
  // A lone faint star must not be inflated to look bright.
  const lonely = projectConstellation([URSA_MAJOR[3]]).points[0];
  assert.ok(Math.abs(lonely.radius - points.get("megrez").radius) < 1e-9);
});

test("an empty star list degrades without throwing", () => {
  const { points, width, height } = projectConstellation([]);
  assert.deepEqual(points, []);
  assert.ok(width > 0 && height > 0);
});
