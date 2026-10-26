import test from "node:test";
import assert from "node:assert/strict";
import { TRAPPIST_1 } from "./trappist1.js";
import { registryEntry } from "./registry.js";
import { validateSystem } from "./validateSystem.js";
import { ageOn } from "../planetPlay.js";

const planet = (letter) => TRAPPIST_1.planets.find((p) => p.id === `trappist-1${letter}`);

test("the definition is complete", () => {
    assert.deepEqual(validateSystem(TRAPPIST_1), []);
});

test("the registry's light entry matches the definition", () => {
    const entry = registryEntry("trappist-1");
    for (const key of ["id", "name", "phrase", "spokenName", "home", "place", "position", "mapCard"]) {
        assert.deepEqual(entry[key], TRAPPIST_1[key], key);
    }
});

test("a 7-year-old is 1692 on b and 136 on h", () => {
    assert.equal(ageOn(planet("b").play, 7).whole, 1692);
    assert.equal(ageOn(planet("h").play, 7).whole, 136);
});

test("densities round to 5.5, 5.5, 4.4, 4.9, 5.0, 5.1, 4.2", () => {
    const shown = TRAPPIST_1.planets.map((p) => p.stats.find((s) => s.densityGcm3).densityGcm3.toFixed(1));
    assert.deepEqual(shown, ["5.5", "5.5", "4.4", "4.9", "5.0", "5.1", "4.2"]);
});

test("e is the flight start and the water-zone planets are e, f and g", () => {
    assert.equal(TRAPPIST_1.flight.startBodyId, "trappist-1e");
    const water = TRAPPIST_1.flight.clues.filter((c) => c.id.startsWith("t1-water")).map((c) => c.target).sort();
    assert.deepEqual(water, ["trappist-1e", "trappist-1f", "trappist-1g"]);
});

test("every planet has a spoken name without a minus sign", () => {
    for (const p of TRAPPIST_1.planets) assert.ok(!p.spokenName.includes("-"), p.spokenName);
    assert.ok(!TRAPPIST_1.spokenName.includes("-"));
});

test("the clue deck covers the star and every planet", () => {
    const targets = new Set(TRAPPIST_1.flight.clues.map((c) => c.target));
    for (const id of ["TRAPPIST-1", ...TRAPPIST_1.planets.map((p) => p.id)]) assert.ok(targets.has(id), id);
    assert.ok(TRAPPIST_1.flight.clues.length >= 12);
});

test("trips between home and TRAPPIST-1 are 40.66 light-years, in opposite directions", async () => {
    const { tripDestination } = await import("./registry.js");
    const out = tripDestination("solar-system"), back = tripDestination("trappist-1");
    assert.equal(out.id, "trappist-1"); assert.equal(back.id, "solar-system");
    assert.equal(back.toHome, true); assert.equal(out.spokenName, "TRAPPIST one");
    assert.ok(Math.abs(out.distanceLy - 40.66) < 1e-9 && Math.abs(back.distanceLy - 40.66) < 1e-9);
    for (const k of ["x", "y", "z"]) assert.ok(Math.abs(out.direction[k] + back.direction[k]) < 1e-12);
    assert.equal(tripDestination("trappist-1", "trappist-1"), null);
});
