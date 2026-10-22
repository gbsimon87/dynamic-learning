import test from "node:test";
import assert from "node:assert/strict";
import { bounceSquash, createBounces, createSunTapCounter } from "./solarTaps.js";

function fakeObject(scale) {
    return {
        scale: {
            x: scale, y: scale, z: scale,
            set(x, y, z) { Object.assign(this, { x, y, z }); },
        },
    };
}

test("bounceSquash is still at the start and after it ends", () => {
    assert.equal(bounceSquash(0, 0.2), 0);
    assert.equal(bounceSquash(0.9, 0.2), 0);
    assert.ok(bounceSquash(0.07, 0.2) > 0.1);
});

test("a bounce squashes, then returns exactly to the starting scale", () => {
    const bounces = createBounces();
    const body = fakeObject(0.45);
    bounces.bounce(body);
    bounces.update(0.07);
    assert.ok(body.scale.y < 0.45 && body.scale.x > 0.45);
    for (let i = 0; i < 60; i++) bounces.update(1 / 60);
    assert.deepEqual([body.scale.x, body.scale.y, body.scale.z], [0.45, 0.45, 0.45]);
    assert.equal(bounces.isBouncing(body), false);
});

test("tapping again mid-bounce keeps the original scale", () => {
    const bounces = createBounces();
    const body = fakeObject(2);
    bounces.bounce(body);
    bounces.update(0.07);
    bounces.bounce(body);
    bounces.settle();
    assert.equal(body.scale.y, 2);
});

test("settle ends every bounce at once", () => {
    const bounces = createBounces();
    const a = fakeObject(1);
    const b = fakeObject(5);
    bounces.bounce(a);
    bounces.bounce(b, 0.3);
    bounces.update(0.05);
    bounces.settle();
    assert.deepEqual([a.scale.y, b.scale.x], [1, 5]);
    assert.equal(bounces.isBouncing(a), false);
});

test("the first Sun tap gives the safety tip, once", () => {
    const sun = createSunTapCounter();
    assert.equal(sun.tap(0), "safety");
    assert.equal(sun.tap(10_000), null);
});

test("five quick taps make the Sun sneeze, counting the first", () => {
    const sun = createSunTapCounter();
    const results = [0, 300, 600, 900, 1200].map((time) => sun.tap(time));
    assert.deepEqual(results, ["safety", null, null, null, "sneeze"]);
    assert.equal(sun.tap(1500), null, "the count starts again after a sneeze");
});

test("slow taps never add up to a sneeze", () => {
    const sun = createSunTapCounter();
    const results = [0, 1000, 2000, 3000, 4000, 5000, 6000].map((time) => sun.tap(time));
    assert.equal(results.includes("sneeze"), false);
});
