import test from 'node:test';
import assert from 'node:assert/strict';
import { REEFS, REEF_RADIUS, REEF_SPOT } from './oceanReef.js';
import { STEERING } from './oceanSteering.js';

test('the ocean has nine reefs, the original first and where it was', () => {
  assert.equal(REEFS.length, 9);
  assert.deepEqual({ x: REEFS[0].x, z: REEFS[0].z, size: REEFS[0].size, key: REEFS[0].key }, { x: REEF_SPOT.x, z: REEF_SPOT.z, size: 1, key: 'coral-reef' });
  assert.equal(new Set(REEFS.map(reef => reef.key)).size, 9);
});

test('reefs are sized, spaced and kept inside the area and away from the start', () => {
  for (const reef of REEFS) {
    assert.ok(reef.size >= 1 && reef.size <= 1.2, reef.key);
    assert.ok(Math.abs(reef.radius - REEF_RADIUS * reef.size) < 1e-9, reef.key);
    assert.ok(Math.hypot(reef.x, reef.z) + reef.radius + 12 < STEERING.areaRadius, `${reef.key} edge`);
  }
  for (const a of REEFS) for (const b of REEFS) {
    if (a.key >= b.key) continue;
    assert.ok(Math.hypot(a.x - b.x, a.z - b.z) > 30, `${a.key} and ${b.key}`);
  }
  for (const reef of REEFS.slice(1)) assert.ok(Math.hypot(reef.x, reef.z) > 28, `${reef.key} start`);
});
