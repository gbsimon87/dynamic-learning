import test from "node:test";
import assert from "node:assert/strict";
import cities from "../cities.json" with { type: "json" };
import { choiceCountForLevel, makeCityQuestion } from "./citySpotlight.js";
import { seeded } from "./random.js";

test("the bank has at least 50 cities, each with a picture, a hint and a unique name", () => {
  assert.ok(cities.length >= 50);
  assert.equal(new Set(cities.map((c) => c.name)).size, cities.length);
  assert.ok(cities.every((c) => c.image && c.hint && c.country));
});

test("each level deals the right number of distinct choices, with the answer among them once", () => {
  for (const level of [1, 2, 3]) {
    for (let seed = 1; seed <= 80; seed += 1) {
      const q = makeCityQuestion(seeded(seed), level);
      assert.equal(q.choices.length, choiceCountForLevel(level));
      assert.equal(new Set(q.choices).size, q.choices.length, `repeated choice at seed ${seed}`);
      assert.equal(q.choices.filter((name) => name === q.answer).length, 1);
    }
  }
});

test("no wrong choice is in the same country as the answer", () => {
  const countryOf = Object.fromEntries(cities.map((c) => [c.name, c.country]));
  for (let seed = 1; seed <= 120; seed += 1) {
    const q = makeCityQuestion(seeded(seed), 3);
    for (const name of q.choices.filter((n) => n !== q.answer)) {
      assert.notEqual(countryOf[name], countryOf[q.answer], `${name} vs ${q.answer}`);
    }
  }
});

test("the picture, clue and speech belong to the answer, and the speech never names it", () => {
  for (let seed = 1; seed <= 60; seed += 1) {
    const q = makeCityQuestion(seeded(seed), 2);
    const city = cities.find((c) => c.name === q.answer);
    assert.equal(q.image, city.image);
    assert.equal(q.hint, city.hint);
    assert.ok(q.speech.includes(city.hint));
    assert.ok(!q.speech.toLowerCase().includes(city.name.toLowerCase()), `${city.name} named in its own clue`);
  }
});

test("every city can be dealt, and an unknown level is rejected", () => {
  const seen = new Set();
  for (let seed = 1; seed <= 3000 && seen.size < cities.length; seed += 1) seen.add(makeCityQuestion(seeded(seed), 1).answer);
  assert.equal(seen.size, cities.length);
  assert.throws(() => makeCityQuestion(seeded(1), 4), RangeError);
});
