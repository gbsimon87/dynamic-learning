import test from "node:test";
import assert from "node:assert/strict";
import { moonFacts } from "./moonFacts.js";

// Every moon listed in SolarSystem's planetData, as "<Planet>/<Moon>".
const EXPECTED_IDS = [
  "Earth/Moon",
  "Mars/Phobos",
  "Mars/Deimos",
  "Jupiter/Io",
  "Jupiter/Europa",
  "Jupiter/Ganymede",
  "Jupiter/Callisto",
  "Jupiter/Amalthea",
  "Saturn/Titan",
  "Saturn/Rhea",
  "Saturn/Enceladus",
  "Saturn/Mimas",
  "Saturn/Tethys",
  "Saturn/Dione",
  "Saturn/Iapetus",
  "Saturn/Hyperion",
  "Saturn/Phoebe",
  "Uranus/Titania",
  "Uranus/Oberon",
  "Uranus/Umbriel",
  "Uranus/Ariel",
  "Uranus/Miranda",
  "Neptune/Triton",
  "Neptune/Nereid",
  "Pluto/Charon",
];

test("every moon in planetData has an entry, with no strays", () => {
  assert.deepEqual(Object.keys(moonFacts).sort(), [...EXPECTED_IDS].sort());
});

test("each entry carries the fields the info card renders", () => {
  for (const [id, moon] of Object.entries(moonFacts)) {
    assert.equal(typeof moon.label, "string", `${id} label`);
    assert.ok(moon.label.length > 0, `${id} label is empty`);
    assert.equal(typeof moon.diameter, "string", `${id} diameter`);
    assert.ok(moon.diameter.length > 0, `${id} diameter is empty`);
    assert.equal(typeof moon.summary, "string", `${id} summary`);
    assert.ok(moon.summary.endsWith("."), `${id} summary is not a sentence`);
    assert.ok(Array.isArray(moon.facts), `${id} facts`);
    assert.ok(moon.facts.length >= 4, `${id} has only ${moon.facts.length} facts`);
    moon.facts.forEach((fact, index) => {
      assert.equal(typeof fact, "string", `${id} fact ${index}`);
      assert.ok(fact.endsWith("."), `${id} fact ${index} is not a sentence`);
    });
  }
});

test("facts are unique within a moon, so the card never repeats itself", () => {
  for (const [id, moon] of Object.entries(moonFacts)) {
    assert.equal(new Set(moon.facts).size, moon.facts.length, `${id} repeats a fact`);
  }
});
