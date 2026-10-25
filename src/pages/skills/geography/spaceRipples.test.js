import test from "node:test";
import assert from "node:assert/strict";
import * as THREE from "three";
import { GRID_LINES, createSpaceRipples } from "./spaceRipples.js";
import { MERGE_SECONDS } from "./rippleTimeline.js";

// No WebGL in node: a renderer that draws nothing, and controls that only aim.
function make(options = {}) {
    const renders = [];
    const ripples = createSpaceRipples({
        renderer: { render: (scene, camera) => renders.push([scene, camera]) },
        quality: "standard",
        reducedMotion: () => false,
        createControls: (camera) => ({
            target: new THREE.Vector3(), enabled: false, disposed: false,
            update() { camera.lookAt(this.target); },
            dispose() { this.disposed = true; },
        }),
        ...options,
    });
    ripples.renders = renders;
    return ripples;
}

const rect = { left: 0, top: 0, width: 800, height: 600 };
const press = (r, x, y, time) => r.pointerDown({ clientX: x, clientY: y, timeStamp: time });
const lift = (r, x, y, time) => r.pointerUp({ clientX: x, clientY: y, timeStamp: time }, rect);

test("builds nothing until opened, then uses fewer grid lines on low", () => {
    assert.deepEqual(GRID_LINES, { standard: 96, low: 48 });
    const standard = make();
    assert.equal(standard.gridLineCount, 0);
    assert.equal(standard.scene, null);
    standard.open();
    assert.equal(standard.gridLineCount, 96);
    const low = make({ quality: "low" });
    low.open();
    assert.equal(low.gridLineCount, 48);
});

test("bring them together runs waiting → merging → settled", () => {
    const changes = [];
    const r = make({ onChange: (state) => changes.push(state.stage) });
    r.open();
    assert.equal(r.stage(), "waiting");
    r.bringTogether();
    for (let t = 0; t <= MERGE_SECONDS + 0.5; t += 0.1) r.update(0.1);
    assert.deepEqual(changes, ["waiting", "merging", "settled"]);
    assert.equal(r.stage(), "settled");
});

test("the merge sends rings across the grid", () => {
    const r = make();
    r.open();
    r.bringTogether();
    let most = 0;
    for (let t = 0; t <= MERGE_SECONDS; t += 0.05) { r.update(0.05); most = Math.max(most, r.rippleCount()); }
    assert.ok(most >= 3);
});

test("bring them together only works while waiting; replay starts the merge again", () => {
    const r = make();
    r.open();
    r.replay();
    assert.equal(r.stage(), "waiting", "nothing to replay yet");
    r.bringTogether();
    for (let t = 0; t <= MERGE_SECONDS + 0.5; t += 0.1) r.update(0.1);
    r.bringTogether();
    assert.equal(r.stage(), "settled");
    r.replay();
    assert.equal(r.stage(), "merging");
});

test("a tap on the grid makes a ripple; a drag or a tap on the sky does not", () => {
    const r = make();
    r.open();
    r.update(0.016);
    press(r, 400, 300, 0);
    assert.equal(lift(r, 401, 300, 100), true);
    assert.equal(r.rippleCount(), 1);
    press(r, 400, 300, 200);
    assert.equal(lift(r, 440, 300, 300), false, "a drag to look around");
    press(r, 400, 2, 400);
    assert.equal(lift(r, 400, 2, 450), false, "above the horizon");
    assert.equal(r.rippleCount(), 1);
});

test("taps only count while open", () => {
    const r = make();
    r.open();
    r.close();
    press(r, 400, 300, 0);
    assert.equal(lift(r, 400, 300, 50), false);
});

test("resize updates the camera aspect", () => {
    const r = make();
    r.open();
    r.resize({ width: 400, height: 800 });
    assert.equal(r.camera.aspect, 0.5);
});

test("render draws its own scene, and dispose frees everything", () => {
    const r = make();
    r.open();
    r.render();
    assert.equal(r.renders[0][0], r.scene);
    const scene = r.scene;
    r.dispose();
    assert.equal(scene.children.length, 0);
    assert.doesNotThrow(() => r.dispose());
});

test("on a tall phone screen the black holes are framed above the card", () => {
    const r = make();
    r.open();
    r.resize({ width: 390, height: 844 });
    r.update(0.016);
    const centre = new THREE.Vector3(0, 0, 0).project(r.camera);
    // NDC y of +0.3 or more puts the pair in the top third, clear of the bottom card.
    assert.ok(centre.y >= 0.3, `pair at NDC y ${centre.y.toFixed(2)}`);
    r.resize({ width: 1280, height: 900 });
    r.update(0.016);
    assert.ok(Math.abs(new THREE.Vector3().project(r.camera).y) < 0.05, "wide screens stay centred");
});

test("leaving Space ripples keeps the canvas's touch handling for the Solar System", () => {
    const element = Object.assign(new EventTarget(), { style: { touchAction: "none" } });
    element.getRootNode = () => new EventTarget();
    const r = createSpaceRipples({ renderer: { render() {}, domElement: element }, quality: "low", reducedMotion: () => false });
    r.open();
    r.close();
    r.dispose();
    assert.equal(element.style.touchAction, "none", "the main OrbitControls still own drag and pinch");
});

test("prepare builds and compiles the scene without opening it", () => {
    let compiled = 0;
    const r = make({ renderer: { render() {}, compileAsync: () => { compiled++; return Promise.resolve(); } } });
    r.prepare();
    assert.ok(r.scene);
    assert.equal(compiled, 1);
    assert.equal(r.isActive(), false);
    r.open();
    assert.equal(r.isActive(), true);
});

test("a two-finger touch is never a tap", () => {
    const r = make();
    r.open();
    r.update(0.016);
    r.pointerDown({ clientX: 400, clientY: 300, timeStamp: 0, pointerId: 1 });
    r.pointerDown({ clientX: 404, clientY: 300, timeStamp: 20, pointerId: 2 }); // a pinch starts with fingers close together
    assert.equal(r.pointerUp({ clientX: 400, clientY: 300, timeStamp: 120, pointerId: 1 }, rect), false);
    assert.equal(r.pointerUp({ clientX: 404, clientY: 300, timeStamp: 130, pointerId: 2 }, rect), false);
    assert.equal(r.rippleCount(), 0);
    press(r, 400, 300, 500);
    assert.equal(lift(r, 400, 300, 560), true, "a single tap afterwards still works");
});

test("a cancelled touch is forgotten, so the next tap still counts", () => {
    const r = make();
    r.open();
    r.update(0.016);
    r.pointerDown({ clientX: 400, clientY: 300, timeStamp: 0, pointerId: 7 });
    r.pointerCancel({ pointerId: 7 });
    r.pointerDown({ clientX: 400, clientY: 300, timeStamp: 100, pointerId: 8 });
    assert.equal(r.pointerUp({ clientX: 400, clientY: 300, timeStamp: 150, pointerId: 8 }, rect), true);
});

test("tapping fast during the merge never pushes out the big merge ring", () => {
    const r = make();
    r.open();
    r.bringTogether();
    let time = 0;
    for (let t = 0; t <= 10.5; t += 0.05) {
        r.update(0.05);
        press(r, 400, 300, time);
        lift(r, 400, 300, (time += 30));
        time += 30;
    }
    assert.ok(r.ripples().some((ripple) => ripple.keep), "the merge ring is still rolling out");
});

test("a finger lifted off the scene does not block the next tap", () => {
    const r = make();
    r.open();
    r.update(0.016);
    r.pointerDown({ clientX: 400, clientY: 300, timeStamp: 0, pointerId: 3, isPrimary: true }); // its pointerup lands on the card
    r.pointerDown({ clientX: 400, clientY: 300, timeStamp: 900, pointerId: 4, isPrimary: true });
    assert.equal(r.pointerUp({ clientX: 400, clientY: 300, timeStamp: 950, pointerId: 4 }, rect), true);
});
