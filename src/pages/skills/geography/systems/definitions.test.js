import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_SYSTEM } from "./home.js";
import { HOME_SYSTEM_ID, SYSTEM_REGISTRY, loadSystem, otherSystems, registryEntry } from "./registry.js";
import { validateSystem } from "./validateSystem.js";
import { densityGcm3, yearInEarthYears } from "./systemMath.js";
import { TEST_SYSTEM } from "./fixtures/testSystem.js";

// Every system definition must pass this suite, so a new system is checked
// without writing new test code. The test-only system runs through it too.
const registered = await Promise.all(SYSTEM_REGISTRY.map((entry) => entry.load()));
const ALL = [...registered, TEST_SYSTEM];

for (const system of ALL) {
    test(`${system.id}: is a complete definition`, () => {
        assert.deepEqual(validateSystem(system), []);
    });

    test(`${system.id}: tour visits every planet`, () => {
        for (const planet of system.planets) assert.ok(system.tour.stops.includes(planet.id), planet.id);
    });

    test(`${system.id}: card numbers agree with the planet's mass, width and year`, () => {
        for (const planet of system.planets) {
            const density = planet.stats?.find((stat) => typeof stat.densityGcm3 === "number");
            if (density && planet.massEarth) {
                assert.equal(density.densityGcm3.toFixed(1), densityGcm3(planet.massEarth, planet.radiusEarth).toFixed(1), planet.id);
            }
            if (planet.periodDays) assert.equal(planet.play.yearInEarthYears, yearInEarthYears(planet.periodDays), planet.id);
        }
    });
}

test("the registry mirrors each registered definition", () => {
    for (const system of registered) {
        const entry = registryEntry(system.id);
        assert.equal(entry.name, system.name);
        assert.equal(entry.phrase, system.phrase);
        assert.equal(entry.spokenName, system.spokenName);
        assert.equal(entry.home, system.home);
        assert.deepEqual(entry.place, system.place);
        assert.deepEqual(entry.position, system.position);
        assert.deepEqual(entry.mapCard, system.mapCard);
    }
});

test("home is the home system and the first registry entry", () => {
    assert.equal(HOME_SYSTEM_ID, "solar-system");
    assert.equal(SYSTEM_REGISTRY[0].id, HOME_SYSTEM_ID);
    assert.equal(registered[0], HOME_SYSTEM);
});

test("loading an unknown system rejects, and other systems exclude the current one", async () => {
    await assert.rejects(loadSystem("nowhere"));
    assert.equal(await loadSystem(HOME_SYSTEM_ID), HOME_SYSTEM);
    assert.ok(otherSystems(HOME_SYSTEM_ID).every((entry) => entry.id !== HOME_SYSTEM_ID));
    assert.equal(registryEntry("nowhere"), null);
});

test("the registry never loads the test-only system", () => {
    const source = readFileSync(new URL("./registry.js", import.meta.url), "utf8");
    assert.ok(!source.includes("fixtures"));
});
