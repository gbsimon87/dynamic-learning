import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

// The shared scene reads every planet, star and texture from a system
// definition, so the next system needs no scene code.
const read = (file) => readFileSync(new URL(`../${file}`, import.meta.url), "utf8");

test("the scene has no planet data or planet textures of its own", () => {
    const scene = read("SolarSystem.jsx");
    assert.ok(!scene.includes("const planetData = ["), "planet data lives in systems/home.js");
    for (const name of ["sun", "mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune"]) {
        assert.ok(!scene.includes(`/static/2k_${name}.jpg`), `${name} texture path belongs to the definition`);
    }
});

// Names live in definitions; shared code reads ids and flags from them.
const SHARED = ["SolarSystem.jsx", "SolarInfoCard.jsx", "SolarFlightControls.jsx", "PlanetPlayCard.jsx", "solarFreeFlight.js", "planetPlay.js"];
const BODY_NAME = /["'`](Mercury|Venus|Earth|Mars|Jupiter|Saturn|Uranus|Neptune|Pluto|Sun|Moon)["'`]/;

test("shared scene code never names a planet, star or system", () => {
    const offending = [];
    for (const file of SHARED) {
        read(file).split("\n").forEach((line, index) => {
            if (BODY_NAME.test(line) || /trappist/i.test(line)) offending.push(`${file}:${index + 1}: ${line.trim()}`);
        });
    }
    assert.deepEqual(offending, []);
});
