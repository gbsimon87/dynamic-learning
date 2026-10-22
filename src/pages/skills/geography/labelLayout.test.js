import test from "node:test";
import assert from "node:assert/strict";
import { badgePixelHeight, badgeWorldHeight, pickUnoverlapped } from "./labelLayout.js";

test("badges are smaller on phones than on wide screens", () => {
    assert.ok(badgePixelHeight(390) < badgePixelHeight(1200));
    assert.ok(badgePixelHeight(390) >= 20, "still big enough to read");
});

test("world height keeps the same on-screen size at any distance", () => {
    const fov = 50, viewport = 800;
    const screenPixels = (world, distance) => world / (2 * distance * Math.tan(fov * Math.PI / 360)) * viewport;
    for (const distance of [2, 40, 900]) {
        assert.ok(Math.abs(screenPixels(badgeWorldHeight(26, distance, fov, viewport), distance) - 26) < 1e-9);
    }
});

test("overlapping badges: the first (nearest) wins, separate ones all stay", () => {
    const box = (x, y) => ({ x, y, halfWidth: 40, halfHeight: 12 });
    assert.deepEqual(pickUnoverlapped([box(0, 0), box(30, 5), box(200, 0), box(215, 10)]), [true, false, true, false]);
    assert.deepEqual(pickUnoverlapped([box(0, 0), box(0, 30)]), [true, true]);
});

test("a 0px-tall viewport still gives a finite size", () => {
    assert.ok(Number.isFinite(badgeWorldHeight(26, 40, 50, 0)));
});
