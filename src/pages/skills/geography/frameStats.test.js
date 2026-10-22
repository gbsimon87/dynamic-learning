import test from "node:test";
import assert from "node:assert/strict";
import { createFrameStats, percentile } from "./frameStats.js";

test("percentile picks the nearest rank from sorted values", () => {
    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    assert.equal(percentile(values, 0.5), 5);
    assert.equal(percentile(values, 0.95), 10);
    assert.equal(percentile(values, 0), 1);
    assert.equal(percentile([], 0.5), 0);
});

test("an empty window reports zeros", () => {
    assert.deepEqual(createFrameStats().summary(), {
        frames: 0, fps: 0, intervalMedian: 0, intervalP95: 0, workMedian: 0, workP95: 0,
    });
});

test("summary reports median and p95 of intervals and work", () => {
    const stats = createFrameStats(100);
    for (let i = 0; i < 95; i++) stats.record(16.7, 4);
    for (let i = 0; i < 5; i++) stats.record(50, 12);
    const s = stats.summary();
    assert.equal(s.frames, 100);
    assert.equal(s.intervalMedian, 16.7);
    assert.equal(s.intervalP95, 16.7);
    assert.equal(s.workMedian, 4);
    assert.equal(Math.round(s.fps), 60);
});

test("only the most recent frames count once the window is full", () => {
    const stats = createFrameStats(4);
    for (let i = 0; i < 4; i++) stats.record(100, 1);
    for (let i = 0; i < 4; i++) stats.record(10, 2);
    const s = stats.summary();
    assert.equal(s.frames, 4);
    assert.equal(s.intervalMedian, 10);
    assert.equal(s.workP95, 2);
});

test("hidden-tab gaps and nonsense values are ignored", () => {
    const stats = createFrameStats(10);
    stats.record(16, 3);
    stats.record(5000, 3);
    stats.record(Number.NaN, 3);
    stats.record(-1, 3);
    assert.equal(stats.summary().frames, 1);
});

test("reset clears the window", () => {
    const stats = createFrameStats(10);
    stats.record(16, 3);
    stats.reset();
    assert.equal(stats.summary().frames, 0);
});
