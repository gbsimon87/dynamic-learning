import test from "node:test";
import assert from "node:assert/strict";
import { matchBodies, MAX_SEARCH_RESULTS } from "./solarSearch.js";

const BODIES = [
  { id: "Earth", name: "Earth", kind: "planet", parentName: null },
  { id: "Earth/Moon", name: "Moon", kind: "moon", parentName: "Earth" },
  { id: "Mars", name: "Mars", kind: "planet", parentName: null },
  { id: "Mars/Phobos", name: "Phobos", kind: "moon", parentName: "Mars" },
  { id: "Mars/Deimos", name: "Deimos", kind: "moon", parentName: "Mars" },
  { id: "Jupiter", name: "Jupiter", kind: "planet", parentName: null },
  { id: "Jupiter/Europa", name: "Europa", kind: "moon", parentName: "Jupiter" },
  { id: "Saturn", name: "Saturn", kind: "planet", parentName: null },
  { id: "Saturn/Titan", name: "Titan", kind: "moon", parentName: "Saturn" },
  { id: "Uranus/Titania", name: "Titania", kind: "moon", parentName: "Uranus" },
];

const ids = (query, limit) => matchBodies(BODIES, query, limit).map(({ id }) => id);

test("a blank query returns no results", () => {
  assert.deepEqual(matchBodies(BODIES, ""), []);
  assert.deepEqual(matchBodies(BODIES, "   "), []);
  assert.deepEqual(matchBodies(BODIES, null), []);
});

test("matching ignores case and surrounding whitespace", () => {
  assert.deepEqual(ids("  EUROPA "), ["Jupiter/Europa"]);
  assert.deepEqual(ids("europa"), ["Jupiter/Europa"]);
});

test("prefix matches rank above substring matches", () => {
  assert.deepEqual(ids("tit"), ["Saturn/Titan", "Uranus/Titania"]);
  // "ar" appears inside Earth and Mars; neither starts with it.
  assert.deepEqual(ids("ar"), ["Earth", "Mars"]);
  // "e" prefixes Earth and Europa, and appears inside Deimos and Jupiter.
  assert.deepEqual(ids("e"), [
    "Earth",
    "Jupiter/Europa",
    "Jupiter",
    "Mars/Deimos",
  ]);
});

test("planets rank above moons within the same match tier", () => {
  // Both are prefix matches, so the planet leads despite alphabetical order.
  assert.deepEqual(ids("m"), ["Mars", "Earth/Moon", "Mars/Deimos"]);
});

test("ties break alphabetically by name", () => {
  assert.deepEqual(ids("os"), ["Mars/Deimos", "Mars/Phobos"]);
});

test("results are capped at the limit", () => {
  assert.equal(ids("a", 3).length, 3);
  assert.ok(matchBodies(BODIES, "a").length <= MAX_SEARCH_RESULTS);
});

test("a query matching nothing returns no results", () => {
  assert.deepEqual(ids("zzz"), []);
});

test("the parent planet name is not searched", () => {
  assert.deepEqual(ids("jupiter"), ["Jupiter"]);
});
