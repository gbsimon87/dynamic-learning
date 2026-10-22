import test from "node:test";
import assert from "node:assert/strict";
import { SUN_CLEARANCE, flightFrame, flightPoint, flightSeconds, planWaypoint } from "./shipFlight.js";

const length = (p) => Math.hypot(p.x, p.y, p.z);
const flatLength = (p) => Math.hypot(p.x, p.z);

// How close the flight comes to the Sun, ignoring where it starts and ends
// (Mercury orbits inside the clearance).
function closestToSun(start, end) {
    const waypoint = planWaypoint(start, end);
    const ends = Math.min(flatLength(start), flatLength(end), SUN_CLEARANCE);
    let middle = Infinity;
    let whole = Infinity;
    for (let t = 0; t <= 1.0001; t += 0.01) {
        const distance = flatLength(flightPoint(start, waypoint, end, Math.min(t, 1)));
        whole = Math.min(whole, distance);
        if (t >= 0.25 && t <= 0.75) middle = Math.min(middle, distance);
    }
    return Math.min(middle, whole >= ends - 1e-9 ? Infinity : whole);
}

test("a flight starts at the ship and ends at the planet", () => {
    const start = { x: 25, y: 0, z: 0 };
    const end = { x: 0, y: 0, z: 39 };
    const waypoint = planWaypoint(start, end);
    assert.deepEqual(flightPoint(start, waypoint, end, 0), start);
    const last = flightPoint(start, waypoint, end, 1);
    assert.ok(length({ x: last.x - end.x, y: last.y - end.y, z: last.z - end.z }) < 1e-9);
});

test("the path passes through the waypoint halfway", () => {
    const start = { x: 25, y: 0, z: 0 };
    const end = { x: 133, y: 0, z: 20 };
    const waypoint = planWaypoint(start, end);
    const half = flightPoint(start, waypoint, end, 0.5);
    for (const axis of ["x", "y", "z"]) assert.ok(Math.abs(half[axis] - waypoint[axis]) < 1e-9);
});

test("flights arc up out of the planets' plane", () => {
    const waypoint = planWaypoint({ x: 25, y: 0, z: 0 }, { x: 39, y: 0, z: 10 });
    assert.ok(waypoint.y > 0);
});

test("flights to the far side of the Sun go round it, not through it", () => {
    // Earth to Venus on the opposite side, straight through the Sun.
    assert.ok(closestToSun({ x: 25.6, y: 0, z: 0 }, { x: -18.5, y: 0, z: 0 }) >= SUN_CLEARANCE);
    // Earth to Mars, nearly opposite.
    assert.ok(closestToSun({ x: 25.6, y: 0, z: 0 }, { x: -38, y: 0, z: 6 }) >= SUN_CLEARANCE);
    // Mercury to Pluto, across the Sun.
    assert.ok(closestToSun({ x: 0, y: 0, z: -10 }, { x: 0, y: 0, z: 1000 }) >= SUN_CLEARANCE);
});

test("flights that don't pass the Sun aren't bent towards it", () => {
    const start = { x: 25, y: 0, z: 0 };
    const end = { x: 28, y: 0, z: 0 };
    const waypoint = planWaypoint(start, end);
    assert.ok(Math.abs(waypoint.x - 26.5) < 1e-9 && Math.abs(waypoint.z) < 1e-9);
});

test("longer trips take longer, within two to six and a half seconds", () => {
    let last = 0;
    for (const distance of [0, 3, 15, 60, 120, 300, 800, 1200, 5000]) {
        const seconds = flightSeconds(distance);
        assert.ok(seconds >= last && seconds >= 2 && seconds <= 6.5, `${distance}: ${seconds}`);
        last = seconds;
    }
});

test("the ship eases off and slows down, and only ever moves forwards", () => {
    assert.equal(flightFrame(0, 4).progress, 0);
    assert.equal(flightFrame(4, 4).progress, 1);
    assert.equal(flightFrame(4, 4).done, true);
    assert.equal(flightFrame(3.9, 4).done, false);
    let last = -1;
    for (let age = 0; age <= 4.2; age += 0.05) {
        const { progress } = flightFrame(age, 4);
        assert.ok(progress >= last && progress <= 1);
        last = progress;
    }
    // Slow at both ends: the first and last tenths cover little ground.
    assert.ok(flightFrame(0.4, 4).progress < 0.02);
    assert.ok(flightFrame(3.6, 4).progress > 0.98);
});

test("the camera swings in behind the ship first, and frames the planet by the end", () => {
    assert.equal(flightFrame(0, 4).chase, 0);
    assert.equal(flightFrame(1, 4).chase, 1);
    assert.equal(flightFrame(1, 4).arrive, 0);
    assert.equal(flightFrame(4, 4).arrive, 1);
});

test("thrust builds from nothing, peaks halfway and dies away on landing", () => {
    assert.equal(flightFrame(0, 4).thrust, 0);
    assert.ok(Math.abs(flightFrame(2, 4).thrust - 1) < 1e-9);
    assert.ok(flightFrame(1, 4).thrust > flightFrame(0.2, 4).thrust);
    assert.ok(flightFrame(3.9, 4).thrust < 0.05);
    assert.equal(flightFrame(5, 4).thrust, 0);
});
