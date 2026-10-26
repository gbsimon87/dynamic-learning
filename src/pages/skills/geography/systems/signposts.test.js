import test from "node:test";
import assert from "node:assert/strict";
import { signpostsFor, SIGN_OFFSET } from "./signposts.js";
import { SYSTEM_REGISTRY } from "./registry.js";
import { TEST_SYSTEM } from "./fixtures/testSystem.js";
import { skyDirection } from "../constellationSkyLayout.js";

const close = (a, b) => ["x", "y", "z"].every((k) => Math.abs(a[k] - b[k]) < 1e-9);

test("home's sign points towards TRAPPIST-1's sky direction", () => {
    const [sign, ...rest] = signpostsFor("solar-system", SYSTEM_REGISTRY, 1350);
    assert.equal(rest.length, 0);
    assert.equal(sign.id, "sign:trappist-1");
    assert.equal(sign.targetId, "trappist-1");
    assert.ok(close(sign.direction, skyDirection({ raHours: 23.1084, decDeg: -5.0435 })));
    assert.equal(sign.label, "TRAPPIST-1 — 41 light-years this way");
    const r = 1350 + SIGN_OFFSET;
    assert.ok(close(sign.position, { x: sign.direction.x * r, y: sign.direction.y * r, z: sign.direction.z * r }));
});

test("TRAPPIST-1's sign points the opposite way and is labelled Home — the Solar System", () => {
    const [home] = signpostsFor("solar-system", SYSTEM_REGISTRY, 1350);
    const [sign] = signpostsFor("trappist-1", SYSTEM_REGISTRY, 180);
    assert.equal(sign.id, "sign:solar-system");
    assert.equal(sign.home, true);
    assert.equal(sign.label, "Home — the Solar System");
    assert.ok(close(sign.direction, { x: -home.direction.x, y: -home.direction.y, z: -home.direction.z }));
    assert.ok(Math.abs(Math.hypot(sign.position.x, sign.position.y, sign.position.z) - (180 + SIGN_OFFSET)) < 1e-9);
});

test("with the test system registered, every system gets a sign to every other", () => {
    const entries = [...SYSTEM_REGISTRY, { ...TEST_SYSTEM, load: () => Promise.resolve(TEST_SYSTEM) }];
    for (const entry of entries) {
        const signs = signpostsFor(entry.id, entries, 100);
        assert.deepEqual(signs.map((s) => s.targetId).sort(), entries.filter((e) => e.id !== entry.id).map((e) => e.id).sort());
    }
    assert.deepEqual(signpostsFor("nowhere", entries, 100), []);
});
