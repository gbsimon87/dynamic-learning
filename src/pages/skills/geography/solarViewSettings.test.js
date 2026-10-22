import test from "node:test";
import assert from "node:assert/strict";
import {
    DEFAULT_SPEED,
    DEFAULT_VIEW_SETTINGS,
    SPEED_PRESETS,
    VIEW_SETTINGS_KEY,
    VIEW_TOGGLES,
    CONSTELLATION_BRIGHTNESS,
    DEFAULT_CONSTELLATION_BRIGHTNESS,
    loadViewSettings,
    saveViewSettings,
    speedPresetFor,
} from "./solarViewSettings.js";

function fakeStorage(initial = {}) {
    const data = { ...initial };
    return {
        data,
        getItem: (k) => (k in data ? data[k] : null),
        setItem: (k, v) => {
            data[k] = String(v);
        },
    };
}

test("uses a dl.-prefixed key and one toggle per boolean default", () => {
    assert.equal(VIEW_SETTINGS_KEY, "dl.solarView");
    const booleans = Object.keys(DEFAULT_VIEW_SETTINGS).filter((key) => typeof DEFAULT_VIEW_SETTINGS[key] === "boolean");
    assert.deepEqual(VIEW_TOGGLES.map((t) => t.key).sort(), booleans.sort());
});

test("constellations start off, at the middle brightness", () => {
    assert.equal(DEFAULT_VIEW_SETTINGS.constellations, false);
    assert.equal(DEFAULT_VIEW_SETTINGS.constellationBrightness, DEFAULT_CONSTELLATION_BRIGHTNESS);
    assert.deepEqual(CONSTELLATION_BRIGHTNESS.map((level) => level.key), ["faint", "bright", "brightest"]);
    for (const field of ["lines", "stars", "names"]) {
        const values = CONSTELLATION_BRIGHTNESS.map((level) => level[field]);
        assert.ok(values[0] < values[1] && values[1] < values[2], `${field} gets brighter`);
    }
});

test("a known brightness round-trips; an unknown one falls back", () => {
    const storage = fakeStorage();
    saveViewSettings({ ...DEFAULT_VIEW_SETTINGS, constellations: true, constellationBrightness: "brightest" }, storage);
    assert.deepEqual(loadViewSettings(storage), { ...DEFAULT_VIEW_SETTINGS, constellations: true, constellationBrightness: "brightest" });
    const odd = fakeStorage({ [VIEW_SETTINGS_KEY]: JSON.stringify({ constellationBrightness: "blinding" }) });
    assert.deepEqual(loadViewSettings(odd), DEFAULT_VIEW_SETTINGS);
});

test("defaults when storage is empty", () => {
    assert.deepEqual(loadViewSettings(fakeStorage()), DEFAULT_VIEW_SETTINGS);
});

test("merges stored values over defaults", () => {
    const s = fakeStorage({ [VIEW_SETTINGS_KEY]: JSON.stringify({ showOrbits: false, showMoonLabels: true }) });
    assert.deepEqual(loadViewSettings(s), { ...DEFAULT_VIEW_SETTINGS, showOrbits: false, showMoonLabels: true });
});

test("ignores unknown keys and non-boolean values", () => {
    const s = fakeStorage({ [VIEW_SETTINGS_KEY]: JSON.stringify({ showOrbits: "no", showLabels: 0, extra: true }) });
    assert.deepEqual(loadViewSettings(s), DEFAULT_VIEW_SETTINGS);
});

test("corrupt or non-object JSON falls back to defaults", () => {
    assert.deepEqual(loadViewSettings(fakeStorage({ [VIEW_SETTINGS_KEY]: "{oops" })), DEFAULT_VIEW_SETTINGS);
    assert.deepEqual(loadViewSettings(fakeStorage({ [VIEW_SETTINGS_KEY]: "[true]" })), DEFAULT_VIEW_SETTINGS);
    assert.deepEqual(loadViewSettings(fakeStorage({ [VIEW_SETTINGS_KEY]: "null" })), DEFAULT_VIEW_SETTINGS);
});

test("throwing getItem and undefined storage fall back to defaults", () => {
    const bad = { getItem: () => { throw new Error("denied"); } };
    assert.deepEqual(loadViewSettings(bad), DEFAULT_VIEW_SETTINGS);
    assert.deepEqual(loadViewSettings(null), DEFAULT_VIEW_SETTINGS);
});

test("load returns a fresh object", () => {
    const a = loadViewSettings(fakeStorage());
    a.showOrbits = false;
    assert.equal(DEFAULT_VIEW_SETTINGS.showOrbits, true);
});

test("save writes only known boolean keys, to its own key", () => {
    const s = fakeStorage({ "dl.progress": "keep" });
    assert.equal(saveViewSettings({ showOrbits: false, showLabels: "x", extra: true }, s), true);
    assert.deepEqual(JSON.parse(s.data[VIEW_SETTINGS_KEY]), { showOrbits: false });
    assert.equal(s.data["dl.progress"], "keep");
});

test("save swallows errors and returns false", () => {
    const bad = { setItem: () => { throw new Error("quota"); } };
    assert.equal(saveViewSettings(DEFAULT_VIEW_SETTINGS, bad), false);
    assert.equal(saveViewSettings(DEFAULT_VIEW_SETTINGS, null), false);
});

test("speed presets: the default runs at the normal orbit speed", () => {
    const byKey = Object.fromEntries(SPEED_PRESETS.map((preset) => [preset.key, preset]));
    assert.deepEqual(Object.keys(byKey), ["pause", "slow", "fast"]);
    assert.equal(byKey[DEFAULT_SPEED].orbit, 1);
    assert.ok(byKey.fast.orbit > byKey.slow.orbit);
});

test("speedPresetFor matches running presets only", () => {
    assert.equal(speedPresetFor(1), "slow");
    assert.equal(speedPresetFor(20), "fast");
    assert.equal(speedPresetFor(7.5), null);
});

test("speed is never saved with the view settings", () => {
    const storage = fakeStorage();
    saveViewSettings({ ...DEFAULT_VIEW_SETTINGS, speed: "fast" }, storage);
    assert.equal("speed" in JSON.parse(storage.data[VIEW_SETTINGS_KEY]), false);
});
