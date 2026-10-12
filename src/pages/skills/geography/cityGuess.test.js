import test from "node:test";
import assert from "node:assert/strict";
import { distanceKm, isFound, nearestCopy, FOUND_WITHIN_KM } from "./cityGuess.js";

const PARIS = [48.8566, 2.3522];
const LONDON = [51.5074, -0.1278];
const SYDNEY = [-33.8688, 151.2093];

test("distanceKm is zero for the same point", () => {
  assert.equal(distanceKm(PARIS, PARIS), 0);
});

test("distanceKm matches the known Paris to London distance", () => {
  const km = distanceKm(PARIS, LONDON);
  assert.ok(km > 330 && km < 350, `got ${km}`);
});

test("distanceKm is the same on a wrapped copy of the world", () => {
  const wrapped = [PARIS[0], PARIS[1] + 360];
  assert.equal(distanceKm(wrapped, LONDON), distanceKm(PARIS, LONDON));
});

test("nearestCopy leaves the city alone when the tap is on the same copy", () => {
  assert.deepEqual(nearestCopy(SYDNEY, [-30, 140]), SYDNEY);
});

test("nearestCopy moves the city to the copy nearest a wrapped tap", () => {
  assert.deepEqual(nearestCopy(SYDNEY, [-30, -200]), [SYDNEY[0], SYDNEY[1] - 360]);
  assert.deepEqual(nearestCopy(PARIS, [48, 365]), [PARIS[0], PARIS[1] + 360]);
});

test("isFound accepts a tap up to the threshold and rejects one past it", () => {
  assert.equal(isFound(FOUND_WITHIN_KM), true);
  assert.equal(isFound(FOUND_WITHIN_KM + 1), false);
});
