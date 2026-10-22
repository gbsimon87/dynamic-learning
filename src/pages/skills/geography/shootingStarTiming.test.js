import test from "node:test";
import assert from "node:assert/strict";
import { WISH_LINE, nextDelay, streakProgress, streakFade, isNearScreenPoint } from "./shootingStarTiming.js";

test("the wish line is the one children see", () => {
    assert.equal(WISH_LINE, "Make a wish!");
});

test("nextDelay stays in [20, 40)", () => {
    assert.equal(nextDelay(() => 0), 20);
    assert.ok(nextDelay(() => 0.999999) < 40);
    for (let i = 0; i < 200; i++) {
        const d = nextDelay();
        assert.ok(d >= 20 && d < 40);
    }
});

test("streakProgress runs 0 to 1, rises monotonically and clamps", () => {
    assert.equal(streakProgress(-1, 1.1), 0);
    assert.equal(streakProgress(0, 1.1), 0);
    assert.equal(streakProgress(1.1, 1.1), 1);
    assert.equal(streakProgress(5, 1.1), 1);
    let last = 0;
    for (let t = 0; t <= 1.1; t += 0.05) {
        const p = streakProgress(t, 1.1);
        assert.ok(p >= last && p <= 1);
        last = p;
    }
});

test("streakFade is invisible outside the streak, bright in the middle", () => {
    assert.equal(streakFade(-0.1, 1), 0);
    assert.equal(streakFade(0, 1), 0);
    assert.equal(streakFade(1, 1), 0);
    assert.equal(streakFade(2, 1), 0);
    assert.equal(streakFade(0.5, 1), 1);
    assert.ok(streakFade(0.05, 1) > 0 && streakFade(0.05, 1) < 1);
    assert.ok(streakFade(0.9, 1) > 0 && streakFade(0.9, 1) < 1);
});

test("isNearScreenPoint is inclusive at the radius", () => {
    assert.equal(isNearScreenPoint(100, 100, 100, 100, 44), true);
    assert.equal(isNearScreenPoint(100, 100, 130, 132, 44), true); // distance 43.9
    assert.equal(isNearScreenPoint(100, 100, 144, 100, 44), true);
    assert.equal(isNearScreenPoint(100, 100, 145, 100, 44), false);
    assert.equal(isNearScreenPoint(0, 0, 40, 40, 44), false);
});
