import test from 'node:test';
import assert from 'node:assert/strict';
import { cometPose, cometTailPoint, COMET_PERIOD } from './cometOrbit.js';
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;

test('illustrative orbit repeats, stays outside the Sun, and fades far away', () => {
    const start = cometPose(0);
    const end = cometPose(COMET_PERIOD);
    for (const axis of ['x', 'y', 'z']) assert.ok(Math.abs(start.position[axis] - end.position[axis]) < 1e-9);
    let min = Infinity;
    let max = 0;
    for (let t = 0; t < COMET_PERIOD; t++) {
        const pose = cometPose(t);
        const distance = Math.hypot(...Object.values(pose.position));
        min = Math.min(min, distance); max = Math.max(max, distance);
        assert.ok(distance > 17 && distance < 111);
        assert.ok(Number.isFinite(pose.activity));
    }
    assert.ok(max > min * 5);
    assert.ok(cometPose(COMET_PERIOD / 2).activity < start.activity);
    assert.deepEqual(cometPose(0), start); // Reset and paused positions have no extra clock.
});

test('ion tail is radial and curved dust tail stays in the anti-solar half-space all around orbit', () => {
    for (let t = 0; t < COMET_PERIOD; t += 2) {
        const pose = cometPose(t);
        assert.ok(Math.abs(dot(pose.away, pose.behind)) < 1e-10);
        for (const fraction of [0.1, 0.5, 1]) {
            const ion = cometTailPoint(pose, fraction);
            const dust = cometTailPoint(pose, fraction, true);
            assert.ok(dot(ion, pose.away) > 0);
            assert.ok(dot(dust, pose.away) > 0);
            assert.ok(Math.abs(dot(ion, pose.behind)) < 1e-10);
            assert.ok(dot(dust, pose.behind) > 0);
        }
    }
});
