import test from "node:test";
import assert from "node:assert/strict";
import {
    ARRIVE_INSET, MAX_TRIP_SECONDS, WARNING_SECONDS, arrivalPose, createTurnBackIntent,
    dashSecondsFor, shouldWarn, tripFrame, warningCancelled,
} from "./tripTimeline.js";

test("40.66 ly dash is about 6.2 s", () => {
    assert.ok(Math.abs(dashSecondsFor(40.66) - 6.21) < 0.02);
});

test("any distance keeps warning + dash ≤ 10 s", () => {
    for (const ly of [1, 40.66, 1e3, 1e9]) {
        assert.ok(WARNING_SECONDS + dashSecondsFor(ly) <= MAX_TRIP_SECONDS, `${ly} ly`);
    }
    assert.ok(dashSecondsFor(1e9) > dashSecondsFor(40.66), "longer real trips take a little longer");
});

test("handoff happens exactly once at half the dash", () => {
    const dashSeconds = dashSecondsFor(40.66);
    const phases = [];
    let handoffs = 0, previous = 0;
    for (let elapsed = 0; elapsed <= WARNING_SECONDS + dashSeconds + 0.5; elapsed += 1 / 60) {
        const frame = tripFrame({ elapsed, previous, dashSeconds, calm: false });
        if (frame.handoff) {
            handoffs++;
            assert.ok(Math.abs(elapsed - (WARNING_SECONDS + dashSeconds / 2)) < 1 / 30);
        }
        if (phases.at(-1) !== frame.phase) phases.push(frame.phase);
        previous = elapsed;
    }
    assert.equal(handoffs, 1);
    assert.deepEqual(phases, ["warning", "departing", "arriving", "done"]);
    // An arriving scene starts its clock at the handoff and never hands off again.
    const half = WARNING_SECONDS + dashSeconds / 2;
    assert.equal(tripFrame({ elapsed: half + 0.01, previous: half, dashSeconds, calm: false }).handoff, false);
});

test("warning does not start while orbiting, on autopilot, or straight after Back to start", () => {
    const base = { distance: 1346, edgeRadius: 1350, radialSpeed: 3, orbiting: false, autopilot: false, armed: true };
    assert.equal(shouldWarn(base), true);
    assert.equal(shouldWarn({ ...base, orbiting: true }), false);
    assert.equal(shouldWarn({ ...base, autopilot: true }), false);
    assert.equal(shouldWarn({ ...base, armed: false }), false);
    assert.equal(shouldWarn({ ...base, radialSpeed: -1 }), false, "flying inwards");
    assert.equal(shouldWarn({ ...base, distance: 1300 }), false, "not at the edge yet");
    assert.equal(shouldWarn({ ...base, radialSpeed: 0.1 }), false, "only drifting outwards");
    assert.equal(shouldWarn({ ...base, alignmentWithOutward: 0.1 }), false, "facing along the edge, not out");
});

test("facing back towards the star cancels the warning", () => {
    assert.equal(warningCancelled(0.2), false);
    assert.equal(warningCancelled(-0.1), true);
});

test("a small wobble never turns back; a held turn-around does", () => {
    const intent = createTurnBackIntent();
    for (let i = 0; i < 10; i++) assert.equal(intent.update(0.05, -0.9), false, "brief flick");
    for (let i = 0; i < 40; i++) assert.equal(intent.update(0.05, -0.3), false, "sideways wobble");
    let turned = false;
    for (let i = 0; i < 14 && !turned; i++) turned = intent.update(0.05, -0.8);
    assert.equal(turned, true);
    intent.reset();
    assert.equal(intent.update(0.05, -0.8), false);
});

test("reduced motion gives zero streaks and a fade", () => {
    const dashSeconds = dashSecondsFor(40.66);
    const mid = WARNING_SECONDS + dashSeconds / 2;
    for (const elapsed of [WARNING_SECONDS + 0.5, mid - 0.01, mid + 0.2, WARNING_SECONDS + dashSeconds - 0.1]) {
        const frame = tripFrame({ elapsed, dashSeconds, calm: true });
        assert.equal(frame.streakSpeed, 0);
        assert.equal(frame.streakBrightness, 0);
    }
    assert.ok(tripFrame({ elapsed: mid - 0.01, dashSeconds, calm: true }).fade > 0.9);
    assert.ok(tripFrame({ elapsed: mid, dashSeconds, calm: false }).streakBrightness > 0.9);
    const end = tripFrame({ elapsed: WARNING_SECONDS + dashSeconds, dashSeconds, calm: true });
    assert.equal(end.fade, 0);
    assert.equal(end.progress, 1);
});

test("arrival pose sits just inside the edge, looking at the star", () => {
    const pose = arrivalPose(180, { x: 0, y: 0, z: -1 });
    assert.deepEqual(pose.position, [0, 0, -(180 - ARRIVE_INSET)]);
    assert.deepEqual(pose.lookAt, [0, 0, 0]);
});
