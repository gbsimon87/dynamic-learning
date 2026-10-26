import test from "node:test";
import assert from "node:assert/strict";
import { densityGcm3, directionBetween, positionLy, surfaceGravity, systemAhead, yearInEarthYears } from "./systemMath.js";
import { skyDirection } from "../constellationSkyLayout.js";

test("density and gravity follow mass and width", () => {
    assert.equal(densityGcm3(1, 1).toFixed(3), "5.514");
    assert.equal(densityGcm3(1.374, 1.116).toFixed(2), "5.45");
    assert.equal(surfaceGravity(0.326, 0.755).toFixed(2), "0.57");
    assert.equal(surfaceGravity(1, 1), 1);
});

test("a 7-year-old's age follows the orbit period", () => {
    assert.equal(yearInEarthYears(365.25), 1);
    assert.equal(Math.floor(7 / yearInEarthYears(1.51088) + 1e-9), 1692);
    assert.equal(Math.floor(7 / yearInEarthYears(18.7729) + 1e-9), 136);
});

test("positions use the constellation sky's frame, with home at the origin", () => {
    const p = positionLy({ raHours: 23.1082, decDeg: -5.0414, distanceLy: 40.66 });
    const d = skyDirection({ raHours: 23.1082, decDeg: -5.0414 });
    for (const axis of ["x", "y", "z"]) assert.ok(Math.abs(p[axis] - d[axis] * 40.66) < 1e-9, axis);
    assert.deepEqual(positionLy({ raHours: 0, decDeg: 0, distanceLy: 0 }), { x: 0, y: 0, z: 0 });
});

test("directionBetween is a unit vector and reverses when swapped", () => {
    const a = { x: 0, y: 0, z: 0 }, b = { x: 3, y: 0, z: 4 };
    const ab = directionBetween(a, b), ba = directionBetween(b, a);
    assert.ok(Math.abs(Math.hypot(ab.x, ab.y, ab.z) - 1) < 1e-12);
    assert.deepEqual(ab, { x: 0.6, y: 0, z: 0.8 });
    assert.deepEqual(ba, { x: -0.6, y: 0, z: -0.8 });
    assert.deepEqual(directionBetween(b, b), { x: 0, y: 0, z: 0 });
});

test("systemAhead picks the system within 30 degrees of the heading, else null", () => {
    const entries = [
        { id: "home", position: { raHours: 0, decDeg: 0, distanceLy: 0 } },
        { id: "ahead", position: { raHours: 6, decDeg: 0, distanceLy: 10 } },
        { id: "behind", position: { raHours: 18, decDeg: 0, distanceLy: 10 } },
    ];
    const towardAhead = skyDirection({ raHours: 6, decDeg: 0 });
    assert.equal(systemAhead(towardAhead, "home", entries), "ahead");
    const sideways = skyDirection({ raHours: 0, decDeg: 0 });
    assert.equal(systemAhead(sideways, "home", entries), null);
    // Never the system you are leaving.
    assert.equal(systemAhead(towardAhead, "ahead", entries.slice(1)), null);
});
