import test from "node:test";
import assert from "node:assert/strict";
import { createWarpRide, homeRideFrame, WARP_DRIFT_SHARE, WARP_HOLD_SECONDS, WARP_HOME_SECONDS } from "./beyondWarpTimeline.js";

const normal = () => false;

test("holding the whole way takes WARP_HOLD_SECONDS", () => {
    assert.equal(WARP_HOLD_SECONDS, 5);
    const ride = createWarpRide({ reducedMotion: normal });
    let frame;
    for (let i = 0; i < 99; i++) frame = ride.step(0.05, true);
    assert.equal(frame.done, false);
    frame = ride.step(0.1, true);
    assert.equal(frame.done, true);
    assert.equal(frame.stage, "done");
    assert.equal(frame.progress, 1);
});

test("letting go drifts slowly forward, never back, and still finishes", () => {
    assert.equal(WARP_DRIFT_SHARE, 0.25);
    const ride = createWarpRide({ reducedMotion: normal });
    const a = ride.step(1, true).progress;
    const b = ride.step(1, false).progress;
    assert.ok(b > a);
    assert.ok(Math.abs((b - a) - WARP_DRIFT_SHARE / WARP_HOLD_SECONDS) < 1e-9);
    let frame;
    for (let i = 0; i < 400 && !(frame = ride.step(0.1, false)).done; i++);
    assert.equal(frame.done, true);
});

test("stages follow progress: doorway, tunnel, flash", () => {
    const at = (seconds) => {
        const ride = createWarpRide({ reducedMotion: normal });
        return ride.step(seconds, true);
    };
    const doorway = at(0.5), tunnel = at(2.5), flash = at(4.75);
    assert.equal(doorway.stage, "doorway");
    assert.ok(doorway.doorway > 0 && doorway.swirl < tunnel.swirl);
    assert.equal(tunnel.stage, "tunnel");
    assert.ok(tunnel.swirl > 0.5 && tunnel.streakBrightness > 0.5);
    assert.equal(flash.stage, "flash");
    assert.ok(flash.flash > 0);
    assert.equal(doorway.flash, 0);
});

test("reduced motion turned on mid-ride goes calm and still arrives", () => {
    let calm = false;
    const ride = createWarpRide({ reducedMotion: () => calm });
    assert.ok(ride.step(2, true).swirl > 0);
    calm = true;
    const frame = ride.step(0.1, true);
    assert.equal(frame.calm, true);
    assert.equal(frame.swirl, 0);
    assert.equal(frame.streakBrightness, 0);
    assert.equal(frame.streakSpeed, 0);
    let last, maxFlash = 0;
    for (let i = 0; i < 100 && !(last = ride.step(0.1, true)).done; i++) maxFlash = Math.max(maxFlash, last.flash);
    assert.equal(last.done, true);
    assert.ok(maxFlash <= 0.3);
});

test("the ride home needs no holding and ends at WARP_HOME_SECONDS", () => {
    assert.equal(WARP_HOME_SECONDS, 3);
    assert.equal(homeRideFrame(WARP_HOME_SECONDS - 0.01, false).done, false);
    assert.equal(homeRideFrame(WARP_HOME_SECONDS, false).done, true);
    assert.ok(homeRideFrame(1.5, false).swirl > 0);
    assert.equal(homeRideFrame(1.5, true).swirl, 0);
});

test("a huge dt (tab was hidden) cannot overshoot", () => {
    const frame = createWarpRide({ reducedMotion: normal }).step(60, false);
    assert.equal(frame.progress, 1);
    assert.equal(frame.done, true);
});
