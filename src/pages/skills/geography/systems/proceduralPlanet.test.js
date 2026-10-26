import test from "node:test";
import assert from "node:assert/strict";
import { proceduralPatches } from "./proceduralPlanet.js";

const look = { kind: "rocky", base: 0x886655, accent: 0x554433 };

test("same id gives the same texture colours", () => {
    assert.deepEqual(proceduralPatches("trappist-1e", look), proceduralPatches("trappist-1e", look));
});

test("different ids give different textures", () => {
    assert.notDeepEqual(proceduralPatches("trappist-1e", look), proceduralPatches("trappist-1f", look));
});

test("every patch stays on the texture", () => {
    for (const [x, y, r] of proceduralPatches("a", look)) {
        assert.ok(x >= 0 && x <= 1 && y >= 0 && y <= 1 && r > 0 && r < 0.2);
    }
});
