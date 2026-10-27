import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { HOME_SYSTEM } from "./home.js";
import { validateSystem } from "./validateSystem.js";
import { PLANET_ORBITS } from "../planetOrbits.js";

// Home's data as it was inline in SolarSystem.jsx before it moved into the
// home definition (generated from the source at commit 997aeae). Moving it
// must change nothing a child sees.
const SNAPSHOT = JSON.parse(readFileSync(new URL("./fixtures/homeSnapshot.json", import.meta.url), "utf8"));
const MOVED = ["radius", "distance", "speed", "tilt", "hasRings", "tourNarration"];

test("home's planets keep their order, sizes, orbits and narration", () => {
    assert.deepEqual(HOME_SYSTEM.planets.map((p) => p.name), SNAPSHOT.planets.map((p) => p.name));
    for (const [i, before] of SNAPSHOT.planets.entries()) {
        const after = HOME_SYSTEM.planets[i];
        assert.equal(after.id, before.name, "ids stay the names, so search, mission and clue ids are unchanged");
        for (const key of MOVED) assert.deepEqual(after[key], before[key], `${before.name}.${key}`);
        assert.equal(after.orbit, PLANET_ORBITS[before.orbit], `${before.name}.orbit`);
        const moons = after.moons.map((moon) => Object.fromEntries(Object.entries(moon).filter(([key]) => key !== "sections" && key !== "play")));
        assert.deepEqual(moons, before.moons, `${before.name}.moons`);
    }
});

test("home's cards keep their facts, closer looks, play numbers and moon details", () => {
    for (const planet of HOME_SYSTEM.planets) {
        const details = SNAPSHOT.PLANET_DETAILS[planet.name];
        assert.deepEqual(planet.facts, details.facts, `${planet.name} facts`);
        assert.deepEqual(planet.closer, details.closer, `${planet.name} closer`);
        assert.deepEqual(planet.play, SNAPSHOT.PLANET_PLAY[planet.name], `${planet.name} play`);
        assert.equal(planet.lineUp, SNAPSHOT.lineUpNames.includes(planet.name), `${planet.name} lineUp`);
    }
    const earthMoon = HOME_SYSTEM.planets.find((p) => p.id === "Earth").moons[0];
    assert.deepEqual(earthMoon.play, { ...SNAPSHOT.PLANET_PLAY.Moon, phrase: "the Moon" }, "the Moon's play numbers, now naming it 'the Moon' for its weight sentence");
    assert.deepEqual(HOME_SYSTEM.moonDetails, SNAPSHOT.moonFacts);
});

test("home's card labels and special sections are unchanged", () => {
    const byId = Object.fromEntries(HOME_SYSTEM.planets.map((p) => [p.id, p]));
    assert.equal(byId.Pluto.kindLabel, "Dwarf planet");
    assert.equal(byId.Pluto.classification, "Dwarf planet");
    assert.equal(byId.Mars.kindLabel, "Planet");
    assert.equal(byId.Mars.classification, undefined);
    assert.deepEqual(byId.Saturn.sections, { rings: true });
    assert.deepEqual(byId.Earth.sections, { dayNight: true, moonPhases: true, auroras: true });
    assert.deepEqual(byId.Earth.moons[0].sections, { moonPhases: true });
    assert.equal(HOME_SYSTEM.starPhrase, "the Sun");
});

test("home's flight, tour, camera and Sun are unchanged", () => {
    // Space explorer chapters (2026-10-27) added clues, steps and questions; the original clues stay.
    for (const before of SNAPSHOT.FLIGHT_CLUES) {
        const after = HOME_SYSTEM.flight.clues.find((clue) => clue.id === before.id);
        assert.deepEqual({ target: after.target, clue: after.clue, hint: after.hint }, { target: before.target, clue: before.clue, hint: before.hint }, before.id);
    }
    assert.deepEqual(HOME_SYSTEM.flight.badges, SNAPSHOT.FLIGHT_BADGES);
    assert.equal(HOME_SYSTEM.flight.edgeRadius, SNAPSHOT.edgeRadius);
    assert.equal(HOME_SYSTEM.flight.startBodyId, "Earth");
    assert.deepEqual(HOME_SYSTEM.tour, { stops: SNAPSHOT.planets.map((p) => p.name), finish: "pale-blue-dot", finishLabel: "One last look back at Earth" });
    assert.deepEqual(HOME_SYSTEM.scene.camera, { position: SNAPSHOT.camera.position, target: SNAPSHOT.camera.target });
    assert.equal(HOME_SYSTEM.stars[0].id, "Sun");
    assert.equal(HOME_SYSTEM.stars[0].radius, SNAPSHOT.sunRadius);
    assert.equal(HOME_SYSTEM.stars[0].look.texture, "/static/2k_sun.jpg");
});

test("home is a valid definition with every home extra switched on", () => {
    assert.deepEqual(validateSystem(HOME_SYSTEM), []);
    assert.equal(HOME_SYSTEM.home, true);
    for (const extra of ["meteor", "missions", "iss", "comet", "earthEffects", "saturnRingDetail", "asteroidBelt", "moonPhases", "paleBlueDot", "lineUp", "sunTaps", "liftOff", "warpIn", "namedAsteroids"]) {
        assert.ok(HOME_SYSTEM.extras[extra], extra);
    }
});
