import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { createWarpStreaks } from "./warpStreaks.js";

test("streaks ride on the camera, show only while bright, and clean up", () => {
    const camera = new THREE.PerspectiveCamera();
    const streaks = createWarpStreaks({ camera, quality: "low" });
    const lines = camera.children[0];
    assert.equal(lines.visible, false, "hidden until asked for");
    streaks.update(0.1, { speed: 1, brightness: 0.8 });
    assert.equal(lines.visible, true);
    assert.equal(lines.material.opacity, 0.8);
    const z = lines.geometry.attributes.position.array;
    assert.ok(z[2] - z[5] > 100, "full speed stretches them into long streaks");
    streaks.update(0.1, { speed: 0, brightness: 0 });
    assert.equal(lines.visible, false);
    streaks.dispose();
    assert.equal(camera.children.length, 0);
});
