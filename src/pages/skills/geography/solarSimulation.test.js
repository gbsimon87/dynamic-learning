import test from 'node:test';
import assert from 'node:assert/strict';
import { createSolarDefaults, createWorldTime, advanceWorldTime, getBodyPose } from './solarSimulation.js';

test('world pause, resume and speed changes preserve pose', () => {
  const settings = createSolarDefaults().simulation;
  const t1 = advanceWorldTime(createWorldTime(), 2, settings);
  assert.deepEqual(t1, { elapsed: 2, orbitTime: 2, spinTime: 2 });
  assert.equal(advanceWorldTime(t1, 50, settings, true), t1);
  settings.orbitSpeedMultiplier = 3;
  const t2 = advanceWorldTime(t1, 1, settings);
  assert.deepEqual(t2, { elapsed: 3, orbitTime: 5, spinTime: 3 });
  assert.deepEqual(getBodyPose({ speed: 0.005, distance: 25.64 }, createWorldTime()).position, { x: 0, y: 0, z: 25.64 });
  assert.equal(getBodyPose({ speed: 0.015, distance: 3, phase: Math.PI / 2 }, createWorldTime()).position.x, 3);
});

test('defaults are fresh and invalid deltas do nothing', () => {
  const a = createSolarDefaults();
  const b = createSolarDefaults();
  a.belt.count = 0;
  assert.equal(b.belt.count, 4500);
  for (const dt of [0, -1, NaN, Infinity]) assert.equal(advanceWorldTime(createWorldTime(), dt, a.simulation).elapsed, 0);
});
