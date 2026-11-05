import test from "node:test";
import assert from "node:assert/strict";
import { ALL_CONTINENTS, makeFlagQuestion, playableContinents } from "./flagFinder.js";
import { seeded } from "./random.js";

const country = (name, continents) => ({ name, flag: `https://example.org/${name}.png`, alt: `Flag of ${name}`, continents });
const WORLD = [
  ...["A", "B", "C", "D", "E"].map((n) => country(n, ["Europe"])),
  ...["F", "G", "H", "I"].map((n) => country(n, ["Asia"])),
  country("J", ["Africa"]),
  country("K", ["Africa"]),
];

test("a question has four distinct countries including the right one", () => {
  for (let seed = 1; seed <= 50; seed += 1) {
    const q = makeFlagQuestion(seeded(seed), WORLD, ALL_CONTINENTS);
    const names = q.options.map((o) => o.name);
    assert.equal(names.length, 4);
    assert.equal(new Set(names).size, 4);
    assert.ok(names.includes(q.correct.name));
    assert.equal(q.key, q.correct.name);
  }
});

test("a continent question stays inside that continent", () => {
  const q = makeFlagQuestion(seeded(3), WORLD, "Asia");
  assert.ok(q.options.every((o) => o.continents.includes("Asia")));
});

test("too few distinct countries gives null rather than looping", () => {
  assert.equal(makeFlagQuestion(seeded(1), WORLD, "Africa"), null);
  assert.equal(makeFlagQuestion(seeded(1), [country("A", ["Asia"]), country("A", ["Asia"])], ALL_CONTINENTS), null);
});

test("only continents that can fill a question are offered", () => {
  assert.deepEqual(playableContinents(WORLD), ["Asia", "Europe"]);
});
