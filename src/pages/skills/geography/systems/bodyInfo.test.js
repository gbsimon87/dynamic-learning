import test from "node:test";
import assert from "node:assert/strict";
import { buildMoonInfo, buildPlanetInfo } from "./bodyInfo.js";
import { HOME_SYSTEM } from "./home.js";
import { TEST_SYSTEM } from "./fixtures/testSystem.js";

const home = (id) => {
    const index = HOME_SYSTEM.planets.findIndex((planet) => planet.id === id);
    return buildPlanetInfo(HOME_SYSTEM, HOME_SYSTEM.planets[index], index);
};

test("home planet cards read as before", () => {
    assert.equal(home("Mercury").classification, "1st planet from the Sun");
    assert.equal(home("Earth").classification, "3rd planet from the Sun");
    assert.equal(home("Pluto").classification, "Dwarf planet");
    assert.equal(home("Mars").moonSummary, "2 featured moons");
    assert.equal(home("Venus").moonSummary, "No featured moons");
    assert.equal(home("Earth").moonSummary, "1 featured moon");
    assert.equal(home("Mars").factsHeading, "Did you know?");
    assert.equal(home("Mars").honesty, null);
});

test("only the home system's start planet is the child's own world", () => {
    assert.equal(home("Earth").isHomeWorld, true);
    assert.equal(home("Mars").isHomeWorld, false);
    assert.equal(buildPlanetInfo(TEST_SYSTEM, TEST_SYSTEM.planets[0], 0).isHomeWorld, false);
});

test("an away system names its own star and carries its honesty line", () => {
    const info = buildPlanetInfo(TEST_SYSTEM, TEST_SYSTEM.planets[1], 1);
    assert.equal(info.classification, "2nd planet from Test Star");
    assert.equal(info.honesty, "This system is pretend.");
    assert.equal(info.id, "test-c");
});

test("moon cards use the system's moon details", () => {
    const earth = HOME_SYSTEM.planets.find((planet) => planet.id === "Earth");
    const moon = buildMoonInfo(HOME_SYSTEM, earth, earth.moons[0]);
    assert.equal(moon.id, "Earth/Moon");
    assert.equal(moon.parentName, "Earth");
    assert.equal(moon.classification, HOME_SYSTEM.moonDetails["Earth/Moon"].label);
    assert.deepEqual(moon.sections, { moonPhases: true });
    assert.equal(moon.play.gravity, 0.166);
});
