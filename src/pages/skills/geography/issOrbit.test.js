import test from "node:test";
import assert from "node:assert/strict";
import { ISS_LINE, ISS_LAP_SECONDS, ISS_INCLINATION, issPosition, issDirection } from "./issOrbit.js";

const R = 0.65;
const len = (p) => Math.hypot(p.x, p.y, p.z);
const near = (a, b) => assert.ok(Math.abs(a - b) < 1e-9, `${a} vs ${b}`);

test("the line is short enough to speak to a child", () => {
    assert.ok(ISS_LINE.includes("Astronauts live there"));
    assert.ok(ISS_LINE.length < 140);
});

test("the inclination is 51.6 degrees", () => {
    near(ISS_INCLINATION, (51.6 * Math.PI) / 180);
});

test("the station stays at the orbit radius", () => {
    for (let t = 0; t < 50; t += 0.37) near(len(issPosition(t, R)), R);
});

test("a full lap returns to the start", () => {
    for (const t of [0, 1.3, 7]) {
        const a = issPosition(t, R);
        const b = issPosition(t + ISS_LAP_SECONDS, R);
        near(a.x, b.x);
        near(a.y, b.y);
        near(a.z, b.z);
    }
});

test("the inclination bounds the height", () => {
    const limit = R * Math.sin(ISS_INCLINATION);
    let max = 0;
    for (let t = 0; t <= ISS_LAP_SECONDS; t += 0.01) max = Math.max(max, Math.abs(issPosition(t, R).y));
    assert.ok(max <= limit + 1e-9);
    assert.ok(max > limit * 0.99);
});

test("a stopped clock means a still station", () => {
    assert.deepEqual(issPosition(3.2, R), issPosition(3.2, R));
});

test("the direction of travel is a unit vector, tangent to the orbit", () => {
    for (let t = 0; t < 20; t += 0.5) {
        const d = issDirection(t);
        near(len(d), 1);
        const p = issPosition(t, 1);
        near(d.x * p.x + d.y * p.y + d.z * p.z, 0);
    }
});
