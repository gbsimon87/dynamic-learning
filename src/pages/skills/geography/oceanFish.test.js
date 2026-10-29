import test from 'node:test';
import assert from 'node:assert/strict';
import { FISH_LOOP, fishPose } from './oceanFish.js';
import { FISH_ORBIT } from './oceanDiscoveries.js';
import { REEF_RADIUS, REEF_SPOT } from './oceanReef.js';
import { OCEAN_SURFACE_HEIGHT } from './oceanWater.js';
import { STEERING } from './oceanSteering.js';

test('the swim loop stays clear of the reef, the start and the rocks', () => {
  for (let t = 0; t <= 60; t += 0.25) {
    const { x, y, z } = fishPose(t);
    assert.ok(Math.hypot(x - REEF_SPOT.x, z - REEF_SPOT.z) > REEF_RADIUS + FISH_ORBIT.radius + 1.5, `reef at ${t}`);
    assert.ok(Math.hypot(x, z) > FISH_ORBIT.entryDistance, `start at ${t}`);
    assert.ok(y >= 3 && y < OCEAN_SURFACE_HEIGHT - 2, `height at ${t}`);
    assert.ok(Math.hypot(x, z) + FISH_ORBIT.radius < STEERING.areaRadius, `area at ${t}`);
  }
});

test('the fish swims one lap in lapSeconds, facing where it goes', () => {
  const start = fishPose(0), lap = fishPose(FISH_LOOP.lapSeconds);
  assert.ok(Math.hypot(start.x - lap.x, start.y - lap.y, start.z - lap.z) < 1e-9);
  const a = fishPose(1), b = fishPose(1.01);
  const travel = Math.atan2(b.x - a.x, b.z - a.z), facing = Math.atan2(-Math.sin(a.heading), -Math.cos(a.heading));
  assert.ok(Math.abs(Math.atan2(Math.sin(travel - facing), Math.cos(travel - facing))) < 0.02);
  // It starts on the side of the loop nearest the submarine.
  const toStart = Math.atan2(-FISH_LOOP.z, -FISH_LOOP.x), placed = Math.atan2(start.z - FISH_LOOP.z, start.x - FISH_LOOP.x);
  assert.ok(Math.abs(toStart - placed) < 1e-9);
});
