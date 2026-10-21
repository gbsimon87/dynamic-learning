import test from "node:test";
import assert from "node:assert/strict";
import { createModuleHost } from "./solarModules.js";

const quiet = () => {};

test("update and resize reach every module in the order they were added", () => {
    const calls = [];
    const host = createModuleHost({ onError: quiet });
    host.add("a", { update: (dt, frame) => calls.push(["a", dt, frame.active]), resize: (size) => calls.push(["a", size.width]) });
    host.add("b", { update: (dt) => calls.push(["b", dt]) });
    host.update(0.016, { active: false });
    host.resize({ width: 800, height: 600 });
    assert.deepEqual(calls, [["a", 0.016, false], ["b", 0.016], ["a", 800]]);
});

test("a module may leave out any hook", () => {
    const host = createModuleHost({ onError: quiet });
    host.add("empty", {});
    assert.doesNotThrow(() => {
        host.update(0.016, {});
        host.resize({ width: 1, height: 1 });
        host.dispose();
    });
});

test("adding the same name twice is a mistake", () => {
    const host = createModuleHost({ onError: quiet });
    host.add("glow", {});
    assert.throws(() => host.add("glow", {}), /already added/);
});

test("a module that throws is reported, disposed and dropped; the rest keep running", () => {
    const errors = [];
    const calls = [];
    const host = createModuleHost({ onError: (name, error) => errors.push([name, error.message]) });
    host.add("broken", {
        update: () => { throw new Error("boom"); },
        dispose: () => calls.push("broken disposed"),
    });
    host.add("fine", { update: () => calls.push("fine updated") });
    host.update(0.016, {});
    host.update(0.016, {});
    assert.deepEqual(errors, [["broken", "boom"]]);
    assert.deepEqual(calls, ["broken disposed", "fine updated", "fine updated"]);
    assert.equal(host.has("broken"), false);
});

test("a throwing resize is handled the same way", () => {
    const errors = [];
    const host = createModuleHost({ onError: (name) => errors.push(name) });
    host.add("bad", { resize: () => { throw new Error("no size"); } });
    host.resize({ width: 1, height: 1 });
    assert.deepEqual(errors, ["bad"]);
    assert.equal(host.has("bad"), false);
});

test("remove disposes one module", () => {
    const calls = [];
    const host = createModuleHost({ onError: quiet });
    host.add("a", { dispose: () => calls.push("a") });
    assert.equal(host.remove("a"), true);
    assert.equal(host.remove("a"), false);
    assert.deepEqual(calls, ["a"]);
});

test("dispose tears down in reverse order and survives a throwing dispose", () => {
    const calls = [];
    const errors = [];
    const host = createModuleHost({ onError: (name) => errors.push(name) });
    host.add("first", { dispose: () => calls.push("first") });
    host.add("second", { dispose: () => { throw new Error("stuck"); } });
    host.add("third", { dispose: () => calls.push("third") });
    host.dispose();
    assert.deepEqual(calls, ["third", "first"]);
    assert.deepEqual(errors, ["second"]);
    assert.equal(host.has("first"), false);
});
