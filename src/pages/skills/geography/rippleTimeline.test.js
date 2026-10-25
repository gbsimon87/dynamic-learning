import test from "node:test";
import assert from "node:assert/strict";
import { MAX_RIPPLES, MERGE_SECONDS, TAP_SLOP_PX, createRipplePool, isTap, mergeFrame } from "./rippleTimeline.js";

test("the pair spirals in faster and faster, then merges once", () => {
    assert.equal(MERGE_SECONDS, 12);
    const early = mergeFrame(1, false), late = mergeFrame(10, false);
    assert.equal(mergeFrame(0, false).separation, 1);
    assert.ok(late.separation < early.separation);
    const spin = (t) => mergeFrame(t + 0.1, false).angle - mergeFrame(t, false).angle;
    assert.ok(spin(8.5) > spin(1) * 2, "the chirp: they whirl faster as they close in");
    assert.equal(early.merged, false);
    const end = mergeFrame(MERGE_SECONDS, false);
    assert.equal(end.merged, true);
    assert.equal(end.done, true);
});

test("rings are sent out more often as the pair speeds up", () => {
    const count = (from, to) => {
        let rings = 0;
        for (let t = from; t < to; t += 0.02) if (mergeFrame(t + 0.02, false, t).emitRing) rings++;
        return rings;
    };
    assert.ok(count(0, 2) >= 1);
    assert.ok(count(8, 10) > count(0, 2));
});

test("the merge ends with a flash and a wobble, never before", () => {
    assert.equal(mergeFrame(2, false).flash, 0);
    assert.equal(mergeFrame(2, false).wobble, 0);
    const peak = [...Array(200).keys()].map((i) => mergeFrame(i * MERGE_SECONDS / 200, false));
    assert.ok(Math.max(...peak.map((f) => f.flash)) > 0.8);
    assert.ok(Math.max(...peak.map((f) => f.wobble)) > 0.5);
});

test("reduced motion: no wobble, soft flash", () => {
    for (let t = 0; t <= MERGE_SECONDS; t += 0.05) {
        const f = mergeFrame(t, true);
        assert.equal(f.wobble, 0);
        assert.ok(f.flash <= 0.3);
    }
});

test("a ring travels outward and is flat ahead of its front", () => {
    const pool = createRipplePool();
    pool.add({ x: 0, z: 0, amplitude: 1, speed: 10 });
    pool.update(1);
    assert.equal(pool.heightAt(50, 0), 0);
    assert.notEqual(pool.heightAt(9.5, 0), 0);
});

test("tapping many times keeps at most MAX_RIPPLES, dropping the oldest", () => {
    assert.equal(MAX_RIPPLES, 8);
    const pool = createRipplePool();
    for (let i = 0; i < 50; i++) pool.add({ x: i, z: 0, amplitude: 1, speed: 10 });
    assert.equal(pool.list().length, MAX_RIPPLES);
    assert.equal(pool.list()[0].x, 50 - MAX_RIPPLES);
});

test("ripples fade away completely", () => {
    const pool = createRipplePool();
    pool.add({ x: 0, z: 0, amplitude: 1, speed: 10 });
    pool.update(7);
    assert.equal(pool.list().length, 0);
    assert.equal(pool.heightAt(5, 0), 0);
});

test("a drag to look around is not a tap", () => {
    assert.equal(TAP_SLOP_PX, 10);
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 3, y: 2, time: 200 }), true);
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 6, y: 5, time: 650 }), true, "a child's wobbly, slower tap still counts");
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 40, y: 0, time: 200 }), false);
    assert.equal(isTap({ x: 0, y: 0, time: 0 }, { x: 0, y: 0, time: 900 }), false);
    assert.equal(isTap(null, { x: 0, y: 0, time: 10 }), false);
});

test("a ring marked keep is never pushed out by taps", () => {
    const pool = createRipplePool();
    pool.add({ x: 0, z: 0, amplitude: 1.6, speed: 10, keep: true });
    for (let i = 1; i <= 30; i++) pool.add({ x: i, z: 0, amplitude: 1, speed: 10 });
    assert.equal(pool.list().length, MAX_RIPPLES);
    assert.ok(pool.list().some((ripple) => ripple.keep), "the merge ring survives");
    assert.equal(pool.list().at(-1).x, 30, "the newest tap is still there");
});
