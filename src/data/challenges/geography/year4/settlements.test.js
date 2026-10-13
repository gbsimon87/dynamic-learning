import test from "node:test";
import assert from "node:assert/strict";
import { GROUP4 } from "./group4.js";
import { SOURCES_G4 } from "./sources4.js";
import { place } from "./records.js";
import { count, direction } from "./settlementsShared.js";

test("group 4 registers its four topics and its sources are https or labelled example data", () => {
  assert.deepEqual(Object.keys(GROUP4), ["settlements-and-land-use", "food-and-trade-links", "energy-minerals-and-water", "comparing-three-regions"]);
  for (const [id, s] of Object.entries(SOURCES_G4)) { assert.match(id, /^g4_/); assert.match(s.url, /^https:\/\//); }
});
test("derived answers recomputed from data", () => {
  assert.equal(direction("Yakima", "Seattle"), "north-west");
  assert.equal(direction("Naples", "London"), "north-west");
  assert.equal(count(["FFRWW", "FHRWW", "FHTRW", "FFTFF"], "F"), 8);
  assert.equal(count(["RRHFF", "RMHFW", "MMHFW", "FFHFW"], "W"), 3);
  const jul = (id) => place(id).months[6].r;
  assert.ok(jul("spokane") < jul("seattle") && jul("seattle") < jul("naples") && jul("naples") < jul("ambleside"));
  assert.ok(place("naples").months[6].t > place("seattle").months[6].t && place("seattle").months[6].t > place("ambleside").months[6].t);
});
