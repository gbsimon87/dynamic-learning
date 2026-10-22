import test from "node:test";
import assert from "node:assert/strict";
import { CHEER_SECONDS, COUNTDOWN_SECONDS, COUNT_WORDS, liftOffFrame } from "./liftOffTimeline.js";

test("counts down three, two, one, then lift off", () => {
    assert.deepEqual([0, 0.99, 1, 1.5, 2, 2.99].map((t) => liftOffFrame(t).count), [3, 3, 2, 2, 1, 1]);
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS).count, 0);
    assert.equal(COUNT_WORDS[0], "Lift off!");
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS + CHEER_SECONDS).count, null);
});

test("the ship leaves on lift off, not before", () => {
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS - 0.01).launch, false);
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS).launch, true);
});

test("the engine burns harder and smokes more as the count goes down", () => {
    let last = -1;
    for (let t = 0; t < COUNTDOWN_SECONDS; t += 0.1) {
        const { ignition, smoke } = liftOffFrame(t);
        assert.ok(ignition > last && ignition <= 1);
        assert.ok(smoke > 0);
        last = ignition;
    }
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS).smoke, 0);
});

test("finishes once the cheer has been seen", () => {
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS + CHEER_SECONDS - 0.01).done, false);
    assert.equal(liftOffFrame(COUNTDOWN_SECONDS + CHEER_SECONDS).done, true);
});
