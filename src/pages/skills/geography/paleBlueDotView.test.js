import test from "node:test";
import assert from "node:assert/strict";
import { LOOK_BACK_DISTANCE, PALE_BLUE_DOT_STORY, holdsClock, lookBackPoint, separationDegrees, zoomFov } from "./paleBlueDotView.js";

const earth = { x: 25.64, y: 0, z: 0 };

test("the camera looks back from far out, above the planets' plane", () => {
    const eye = lookBackPoint(earth);
    assert.ok(Math.abs(Math.hypot(eye.x, eye.y, eye.z) - LOOK_BACK_DISTANCE) < 1e-9);
    assert.ok(eye.y > 0);
    assert.ok(Math.hypot(eye.x, eye.z) > 770, "beyond Neptune");
});

test("it's side-on to Earth, wherever Earth is in its orbit", () => {
    for (const angle of [0, 1, 2.5, 4]) {
        const where = { x: Math.cos(angle) * 25.64, y: 0, z: Math.sin(angle) * 25.64 };
        const eye = lookBackPoint(where);
        assert.ok(Math.abs(eye.x * where.x + eye.z * where.z) < 1e-6);
    }
});

test("from there, Earth is a little way from the Sun", () => {
    const separation = separationDegrees(earth, lookBackPoint(earth));
    assert.ok(separation > 1 && separation < 2, `${separation}`);
});

test("the zoom makes the gap about a third of the shorter side", () => {
    const separation = 1.6;
    const wide = zoomFov(separation, 1.8);
    assert.ok(Math.abs(separation / wide - 0.35) < 1e-9);
    // A tall phone is narrower, so it zooms out to keep both in.
    const tall = zoomFov(separation, 0.46);
    assert.ok(tall > wide);
    assert.ok(separation / (tall * 0.46) <= 0.35 + 1e-9);
});

test("the story is short enough to read aloud", () => {
    const words = PALE_BLUE_DOT_STORY.join(" ").split(/\s+/).length;
    assert.ok(words < 90, `${words} words`);
});

test("the planets hold still once the camera turns round, like a photo", () => {
    assert.equal(holdsClock("idle"), false);
    assert.equal(holdsClock("flying"), false);
    assert.equal(holdsClock("turning"), true);
    assert.equal(holdsClock("looking"), true);
});
