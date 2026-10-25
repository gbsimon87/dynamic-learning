import test from "node:test";
import assert from "node:assert/strict";
import { createBeyond } from "./beyond.js";

// Fakes for the warp and the destination scene, recording what was asked of them.
function make({ quality = () => "low" } = {}) {
    const log = [];
    const states = [];
    let warp = null;
    const warpQualities = [];
    const destinations = [];
    const beyond = createBeyond({
        renderer: {},
        getQuality: quality,
        reducedMotion: () => false,
        makeRocket: () => ({}),
        onChange: (state) => states.push(state),
        createWarp: ({ onDone, onFrame, quality: warpQuality }) => {
            warpQualities.push(warpQuality);
            warp = {
                active: false,
                start(direction) { this.active = true; this.direction = direction; log.push(`warp:${direction}`); },
                stop() { this.active = false; log.push("warp:stop"); },
                prepare() { log.push("warp:prepare"); },
                setHolding(holding) { log.push(`hold:${holding}`); },
                isActive() { return this.active; },
                update() { onFrame({ progress: 0.5, calm: false }); },
                finish() { this.active = false; onDone(this.direction); },
                render() { log.push("render:warp"); },
                resize() {},
                dispose() { log.push("warp:dispose"); },
            };
            return warp;
        },
        scenes: {
            "space-ripples": ({ onChange }) => {
                const scene = {
                    index: destinations.length,
                    open() { log.push(`open:${this.index}`); onChange({ stage: "waiting" }); },
                    close() { log.push(`close:${this.index}`); },
                    prepare() { log.push(`prepare:${this.index}`); },
                    update(dt) { log.push(`update:${this.index}:${dt}`); },
                    render() { log.push(`render:${this.index}`); },
                    resize() {},
                    dispose() { log.push(`dispose:${this.index}`); },
                };
                destinations.push(scene);
                return scene;
            },
        },
    });
    return { beyond, log, states, destinations, warpQualities, warp: () => warp, phase: () => states.at(-1)?.phase };
}

test("go → warp-out → arrived → goHome → warp-home → off", () => {
    const t = make();
    assert.equal(t.beyond.isActive(), false);
    t.beyond.go("space-ripples");
    assert.equal(t.phase(), "warp-out");
    assert.equal(t.beyond.isActive(), true);
    t.beyond.update(0.1);
    assert.equal(t.states.at(-1).progress, 0.5);
    t.warp().finish();
    assert.equal(t.phase(), "arrived");
    assert.equal(t.states.at(-1).stage, "waiting");
    assert.equal(t.beyond.destination(), t.destinations[0]);
    t.beyond.goHome();
    assert.equal(t.phase(), "warp-home");
    t.warp().finish();
    assert.equal(t.phase(), "off");
    assert.equal(t.beyond.isActive(), false);
});

test("render draws the warp while warping and the destination once arrived", () => {
    const t = make();
    t.beyond.render();
    assert.deepEqual(t.log, [], "nothing while off");
    t.beyond.go("space-ripples");
    t.beyond.render();
    t.warp().finish();
    t.beyond.render();
    assert.deepEqual(t.log.filter((entry) => entry.startsWith("render")), ["render:warp", "render:0"]);
});

test("holding is passed to the warp only on the way out", () => {
    const t = make();
    t.beyond.go("space-ripples");
    t.beyond.setHolding(true);
    t.warp().finish();
    t.beyond.setHolding(true);
    assert.deepEqual(t.log.filter((entry) => entry.startsWith("hold")), ["hold:true"]);
});

test("the destination is built and prepared during the warp out, and disposed on the way home", () => {
    const t = make();
    t.beyond.go("space-ripples");
    assert.equal(t.destinations.length, 1);
    assert.ok(t.log.includes("prepare:0"), "its shaders compile while the child is still warping");
    assert.equal(t.beyond.destination(), null, "not handed out until it is open");
    t.warp().finish();
    assert.deepEqual(t.log.filter((entry) => /open|dispose/.test(entry)), ["open:0"]);
    t.beyond.goHome();
    assert.ok(t.log.includes("close:0") && t.log.includes("dispose:0"));
    assert.equal(t.beyond.destination(), null);
});

test("a second trip builds a fresh destination and leaves nothing from the first", () => {
    const t = make();
    for (let trip = 0; trip < 2; trip++) {
        t.beyond.go("space-ripples");
        t.warp().finish();
        t.beyond.goHome();
        t.warp().finish();
    }
    assert.equal(t.destinations.length, 2);
    assert.deepEqual(t.log.filter((entry) => /^(open|dispose):/.test(entry)), ["open:0", "dispose:0", "open:1", "dispose:1"]);
    assert.equal(t.phase(), "off");
});

test("go while already away is ignored; unknown destinations are ignored", () => {
    const t = make();
    t.beyond.go("andromeda");
    assert.equal(t.beyond.isActive(), false);
    t.beyond.go("space-ripples");
    t.beyond.go("space-ripples");
    assert.equal(t.log.filter((entry) => entry === "warp:out").length, 1);
});

test("exitNow from arrived goes straight to off with no warp home", () => {
    const t = make();
    t.beyond.go("space-ripples");
    t.warp().finish();
    t.beyond.exitNow();
    assert.equal(t.phase(), "off");
    assert.ok(t.log.includes("dispose:0"));
    assert.equal(t.log.includes("warp:home"), false);
    assert.equal(t.beyond.isActive(), false);
});

test("exitNow mid-warp stops the warp without arriving", () => {
    const t = make();
    t.beyond.go("space-ripples");
    t.beyond.exitNow();
    assert.ok(t.log.includes("warp:stop"));
    assert.equal(t.phase(), "off");
    assert.ok(t.log.includes("dispose:0"), "the destination built for the trip is freed");
});

test("dispose mid-trip disposes the warp and any destination", () => {
    const t = make();
    t.beyond.go("space-ripples");
    t.warp().finish();
    t.beyond.dispose();
    assert.ok(t.log.includes("dispose:0"));
    assert.ok(t.log.includes("warp:dispose"));
});

test("the destination is placed before its first frame is drawn", () => {
    const t = make();
    t.beyond.go("space-ripples");
    t.warp().finish();
    t.beyond.render();
    const after = t.log.slice(t.log.indexOf("open:0"));
    assert.deepEqual(after.slice(0, 3), ["open:0", "update:0:0", "render:0"]);
});

test("the warp is freed once home, and the next trip builds one at the current quality", () => {
    let quality = "standard";
    const t = make({ quality: () => quality });
    t.beyond.go("space-ripples");
    t.warp().finish();
    t.beyond.goHome();
    t.warp().finish();
    assert.ok(t.log.includes("warp:dispose"), "no warp scene kept on the GPU at home");
    quality = "low";
    t.beyond.go("space-ripples");
    assert.deepEqual(t.warpQualities, ["standard", "low"]);
});

test("prepare readies the warp while the picker is open; release frees it if the child changes their mind", () => {
    const t = make();
    t.beyond.prepare();
    assert.ok(t.log.includes("warp:prepare"));
    t.beyond.release();
    assert.ok(t.log.includes("warp:dispose"));
    t.beyond.prepare();
    t.beyond.go("space-ripples");
    assert.equal(t.warpQualities.length, 2);
    t.beyond.release();
    assert.equal(t.log.filter((entry) => entry === "warp:dispose").length, 1, "release does nothing once away");
});
