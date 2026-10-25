import test from "node:test";
import assert from "node:assert/strict";
import { BEYOND_DESTINATIONS, availableDestinations, destinationById } from "./beyondDestinations.js";

test("only ready destinations are offered, so there are no coming-soon cards", () => {
    assert.deepEqual(availableDestinations().map((d) => d.id), ["space-ripples"]);
    assert.ok(BEYOND_DESTINATIONS.every((d) => typeof d.ready === "boolean"));
    const hidden = [...BEYOND_DESTINATIONS, { ...BEYOND_DESTINATIONS[0], id: "later", ready: false }];
    assert.deepEqual(availableDestinations(hidden).map((d) => d.id), ["space-ripples"]);
});

test("space ripples is an event beyond our galaxy that cannot be flown yet", () => {
    const d = destinationById("space-ripples");
    assert.equal(d.kind, "event");
    assert.equal(d.place.galaxy, null);
    assert.equal(d.place.galaxyLabel, "Far beyond our galaxy");
    assert.equal(d.canFly, false);
    assert.equal(d.name, "Space ripples");
    assert.equal(d.blurb, "Two black holes spin together and make space wobble.");
    assert.ok(d.pretendLines.some((l) => l.includes("pretend space shortcut")));
    assert.deepEqual(d.bodies.map((b) => b.id), ["black-hole-a", "black-hole-b"]);
});

test("every destination carries what free flight will need later", () => {
    for (const d of BEYOND_DESTINATIONS) {
        assert.equal(d.camera.position.length, 3);
        assert.equal(d.camera.target.length, 3);
        assert.ok(d.edgeRadius > 0);
        assert.ok(Array.isArray(d.bodies));
        for (const b of d.bodies) {
            assert.ok(b.radius > 0);
            assert.equal(b.position.length, 3);
        }
    }
});

test("unknown ids return null", () => {
    assert.equal(destinationById("andromeda"), null);
});
