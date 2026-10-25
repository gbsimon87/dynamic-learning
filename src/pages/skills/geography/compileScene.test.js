import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { compileScene } from "./compileScene.js";

test("compiles hidden objects too, then puts their visibility back", async () => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera();
    const shown = new THREE.Object3D(), hidden = new THREE.Object3D(), onCamera = new THREE.Object3D();
    hidden.visible = false;
    onCamera.visible = false;
    camera.add(onCamera);
    scene.add(shown, hidden, camera);
    let seen = null;
    const renderer = {
        compileAsync(target, view) {
            assert.equal(view, camera);
            seen = [];
            target.traverseVisible((object) => seen.push(object));
            return Promise.resolve();
        },
    };
    await compileScene(renderer, scene, camera);
    assert.ok(seen.includes(hidden) && seen.includes(onCamera), "hidden objects are compiled");
    assert.equal(hidden.visible, false);
    assert.equal(onCamera.visible, false);
    assert.equal(shown.visible, true);
});

test("a renderer without compileAsync, or a failed compile, is harmless", async () => {
    const scene = new THREE.Scene();
    await compileScene({}, scene, new THREE.PerspectiveCamera());
    await compileScene({ compileAsync: () => Promise.reject(new Error("lost context")) }, scene, new THREE.PerspectiveCamera());
});
