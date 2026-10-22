import test from "node:test";
import assert from "node:assert/strict";
import { framingFor, framingForAll, lineUpLayout } from "./lineUpLayout.js";

const NAMES = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"];

test("bodies keep their order and never overlap, Saturn's rings included", () => {
    const { bodies } = lineUpLayout(NAMES);
    assert.deepEqual(bodies.map((body) => body.name), NAMES);
    for (let i = 1; i < bodies.length; i++) {
        const reach = (body) => body.radius * (body.name === "Saturn" ? 1.8 : 1);
        const gap = bodies[i].x - reach(bodies[i]) - (bodies[i - 1].x + reach(bodies[i - 1]));
        assert.ok(gap > 1, `${bodies[i - 1].name}–${bodies[i].name}: ${gap}`);
    }
});

test("sizes are true to life, with Earth as one", () => {
    const radius = Object.fromEntries(lineUpLayout(NAMES).bodies.map((body) => [body.name, body.radius]));
    assert.equal(radius.Earth, 1);
    assert.ok(Math.abs(radius.Jupiter - 11) < 0.1);
    assert.ok(radius.Pluto < radius.Mercury && radius.Mercury < radius.Mars);
    assert.ok(Math.abs(lineUpLayout(NAMES).sun.radius - 109) < 0.5);
});

test("the Sun's edge sits just behind the first body", () => {
    const layout = lineUpLayout(NAMES);
    const sunEdge = layout.sun.x + layout.sun.radius;
    const firstEdge = layout.bodies[0].x - layout.bodies[0].radius;
    assert.ok(sunEdge < firstEdge && firstEdge - sunEdge < 5);
    assert.equal(sunEdge, layout.left);
});

test("framing one body keeps it a sensible size on wide and tall screens", () => {
    const earth = lineUpLayout(NAMES).bodies[2];
    for (const aspect of [0.46, 1, 1.8]) {
        const { x, distance } = framingFor(earth, aspect, 50);
        assert.equal(x, earth.x);
        const height = 2 * distance * Math.tan((25 * Math.PI) / 180);
        const shorter = Math.min(height, height * aspect);
        assert.ok(earth.radius * 2 <= shorter * 0.5, `${aspect}`);
    }
});

test("framing the whole row fits every body across the screen", () => {
    const layout = lineUpLayout(NAMES);
    for (const aspect of [0.46, 1.8]) {
        const { x, distance } = framingForAll(layout, aspect, 50);
        const width = 2 * distance * Math.tan((25 * Math.PI) / 180) * aspect;
        assert.ok(x - width / 2 <= layout.left && x + width / 2 >= layout.right);
    }
});
