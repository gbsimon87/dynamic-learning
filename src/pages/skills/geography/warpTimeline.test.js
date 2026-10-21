import test from "node:test";
import assert from "node:assert/strict";
import { WARP_SECONDS, WARP_SEEN_KEY, markWarpSeen, shouldPlayWarp, warpFrame } from "./warpTimeline.js";

function fakeStorage(initial = {}) {
    const data = { ...initial };
    return {
        data,
        getItem: (k) => (k in data ? data[k] : null),
        setItem: (k, v) => { data[k] = String(v); },
    };
}

test("the warp starts at full speed in deep space and ends at rest on the overview", () => {
    const start = warpFrame(0);
    assert.deepEqual([start.streaks, start.speed, start.camera, start.done], [1, 1, 0, false]);
    const end = warpFrame(WARP_SECONDS);
    assert.deepEqual([end.streaks, end.speed, end.camera, end.done], [0, 0, 1, true]);
});

test("the streaks fade before the camera arrives", () => {
    const frame = warpFrame(2);
    assert.equal(frame.streaks, 0);
    assert.ok(frame.camera > 0.8 && frame.camera < 1);
});

test("the camera only ever moves forwards", () => {
    let last = -1;
    for (let t = 0; t <= WARP_SECONDS + 0.5; t += 0.05) {
        const { camera } = warpFrame(t);
        assert.ok(camera >= last && camera <= 1);
        last = camera;
    }
});

test("plays once per visit", () => {
    const storage = fakeStorage();
    assert.equal(shouldPlayWarp({ reducedMotion: false, storage }), true);
    markWarpSeen(storage);
    assert.equal(storage.data[WARP_SEEN_KEY], "1");
    assert.equal(shouldPlayWarp({ reducedMotion: false, storage }), false);
});

test("never plays under reduced motion", () => {
    assert.equal(shouldPlayWarp({ reducedMotion: true, storage: fakeStorage() }), false);
});

test("storage that throws still plays, and marking it does not throw", () => {
    const broken = { getItem() { throw new Error("blocked"); }, setItem() { throw new Error("blocked"); } };
    assert.equal(shouldPlayWarp({ reducedMotion: false, storage: broken }), true);
    assert.doesNotThrow(() => markWarpSeen(broken));
});
