import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createBeyondWarp } from "./beyondWarp.js";
import { WARP_HOLD_SECONDS, WARP_HOME_SECONDS } from "./beyondWarpTimeline.js";

function make({ calm = false } = {}) {
    const done = [], frames = [];
    let rocketDisposed = 0;
    const warp = createBeyondWarp({
        renderer: { render() {} },
        quality: "low",
        reducedMotion: () => calm,
        makeRocket: () => {
            const ship = new THREE.Group();
            const flame = new THREE.Object3D();
            ship.add(flame);
            return { ship, flame, disposables: [{ dispose: () => rocketDisposed++ }] };
        },
        onFrame: (frame) => frames.push(frame),
        onDone: (direction) => done.push(direction),
    });
    return { warp, done, frames, rocketDisposed: () => rocketDisposed };
}

const run = (warp, seconds, dt = 0.05) => { for (let t = 0; t < seconds; t += dt) warp.update(dt); };
const streaksOf = (camera) => camera.children.find((child) => child.isLineSegments);

test("out ride finishes faster when held, and reports done once", () => {
    const { warp, done } = make();
    warp.start("out");
    assert.equal(warp.isActive(), true);
    warp.setHolding(true);
    run(warp, WARP_HOLD_SECONDS - 0.3);
    assert.deepEqual(done, []);
    run(warp, 1);
    assert.deepEqual(done, ["out"]);
    assert.equal(warp.isActive(), false);
    run(warp, 1);
    assert.deepEqual(done, ["out"]);
});

test("letting go of the engine still arrives, just more slowly", () => {
    const { warp, done } = make();
    warp.start("out");
    run(warp, WARP_HOLD_SECONDS + 1);
    assert.deepEqual(done, [], "drifting is slower than holding");
    run(warp, 4 * WARP_HOLD_SECONDS);
    assert.deepEqual(done, ["out"]);
});

test("home ride finishes on its own in WARP_HOME_SECONDS", () => {
    const { warp, done, frames } = make();
    warp.start("home");
    warp.setHolding(false);
    run(warp, WARP_HOME_SECONDS + 0.1);
    assert.deepEqual(done, ["home"]);
    assert.ok(frames.length > 10);
});

test("streaks ride on the warp's own camera and stay hidden in calm mode", () => {
    const normal = make();
    normal.warp.start("out");
    normal.warp.setHolding(true);
    run(normal.warp, 2.5);
    assert.equal(streaksOf(normal.warp.camera).visible, true);

    const calm = make({ calm: true });
    calm.warp.start("out");
    calm.warp.setHolding(true);
    run(calm.warp, 2.5);
    assert.equal(streaksOf(calm.warp.camera).visible, false);
    assert.ok(calm.frames.every((frame) => frame.swirl === 0));
});

test("starting again after done works, and dispose removes everything", () => {
    const made = make();
    const { warp, done } = made;
    warp.start("out");
    warp.setHolding(true);
    run(warp, WARP_HOLD_SECONDS + 0.2);
    warp.start("home");
    run(warp, WARP_HOME_SECONDS + 0.2);
    assert.deepEqual(done, ["out", "home"]);
    const { scene, camera } = warp;
    warp.dispose();
    assert.equal(scene.children.length, 0);
    assert.equal(camera.children.length, 0);
    assert.equal(made.rocketDisposed(), 1);
    assert.doesNotThrow(() => warp.dispose());
});

test("stop ends a ride without reporting done", () => {
    const { warp, done } = make();
    warp.start("out");
    warp.stop();
    run(warp, 30);
    assert.deepEqual(done, []);
    assert.equal(warp.isActive(), false);
});

test("reduced motion keeps the doorway still and the rocket level", () => {
    let calm = false;
    const warp = createBeyondWarp({
        renderer: { render() {} }, quality: "low", reducedMotion: () => calm,
        makeRocket: () => { const ship = new THREE.Group(), flame = new THREE.Object3D(); ship.add(flame); return { ship, flame, disposables: [] }; },
    });
    warp.start("out");
    warp.setHolding(true);
    run(warp, 1.5);
    const rocket = warp.scene.getObjectByName("beyond-rocket");
    assert.ok(Math.abs(rocket.rotation.z) > 0.01, "the rocket rolls in the swirl");
    calm = true;
    run(warp, 1.5);
    assert.ok(Math.abs(rocket.rotation.z) < 0.01, "it levels out once motion is reduced");
    const doorway = warp.scene.getObjectByName("beyond-doorway");
    const restart = () => { warp.start("out"); warp.setHolding(true); };
    restart();
    for (let t = 0; t < 5.2; t += 0.05) {
        warp.update(0.05);
        assert.ok(doorway.scale.x <= 1.01, `no looming zoom under reduced motion (scale ${doorway.scale.x})`);
    }
});

test("prepare builds the warp and compiles it, hidden parts included, before the ride", () => {
    const compiled = [];
    const warp = createBeyondWarp({
        renderer: { render() {}, compileAsync: (scene) => { scene.traverseVisible((object) => compiled.push(object.name)); return Promise.resolve(); } },
        quality: "low",
        makeRocket: () => { const ship = new THREE.Group(), flame = new THREE.Object3D(); ship.add(flame); return { ship, flame, disposables: [] }; },
    });
    warp.prepare();
    assert.ok(warp.scene, "built");
    assert.ok(compiled.includes("beyond-tunnel"), "the swirl is compiled though it is not shown yet");
    assert.equal(warp.scene.getObjectByName("beyond-tunnel").visible, false);
    assert.equal(warp.isActive(), false);
});
