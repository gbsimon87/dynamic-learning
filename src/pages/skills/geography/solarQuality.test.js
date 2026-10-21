import test from "node:test";
import assert from "node:assert/strict";
import { detectQuality, readDebugFlags } from "./solarQuality.js";

test("narrow screens and touch devices get the low tier", () => {
    assert.equal(detectQuality({ width: 390, coarsePointer: false }), "low");
    assert.equal(detectQuality({ width: 1366, coarsePointer: true }), "low");
    assert.equal(detectQuality({ width: 719, coarsePointer: false }), "low");
});

test("wide screens with a mouse get the standard tier", () => {
    assert.equal(detectQuality({ width: 720, coarsePointer: false }), "standard");
    assert.equal(detectQuality({ width: 1920, coarsePointer: false }), "standard");
});

test("an explicit override wins", () => {
    assert.equal(detectQuality({ width: 390, coarsePointer: true, override: "standard" }), "standard");
    assert.equal(detectQuality({ width: 1920, coarsePointer: false, override: "low" }), "low");
});

test("an unknown override is ignored", () => {
    assert.equal(detectQuality({ width: 1920, coarsePointer: false, override: "ultra" }), "standard");
});

test("debug flags come from the address bar", () => {
    assert.deepEqual(readDebugFlags(""), { debug: false, bloom: false, quality: null });
    assert.deepEqual(readDebugFlags("?debug"), { debug: true, bloom: false, quality: null });
    assert.deepEqual(readDebugFlags("?debug&bloom=1&quality=low"), { debug: true, bloom: true, quality: "low" });
    assert.deepEqual(readDebugFlags("?bloom=0&quality=standard"), { debug: false, bloom: false, quality: "standard" });
    assert.deepEqual(readDebugFlags("?quality=ultra"), { debug: false, bloom: false, quality: null });
});
