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

test('tidally locked Moon keeps its mapped near side facing Earth through a full orbit', () => {
  const moon = { speed: 0.015, distance: 3, tidallyLocked: true };
  for (const phase of [0, 0.7]) {
    for (const fraction of [0, 0.125, 0.25, 0.5, 0.75, 1, 2]) {
      const orbitTime = fraction * 2 * Math.PI / moon.speed;
      const pose = getBodyPose({ ...moon, phase }, { orbitTime, spinTime: 9876 });
      // Local +X is the texture's centre. Rotating about Y gives this
      // outward normal; it must point exactly from Moon to parent.
      const nearSide = { x: Math.cos(pose.rotationY), z: -Math.sin(pose.rotationY) };
      const alignment = -(nearSide.x * pose.position.x + nearSide.z * pose.position.z) / moon.distance;
      assert.ok(Math.abs(alignment - 1) < 1e-12);
    }
  }
  const start = getBodyPose(moon, createWorldTime());
  const end = getBodyPose(moon, { orbitTime: 2 * Math.PI / moon.speed, spinTime: 0 });
  assert.ok(Math.abs(end.rotationY - start.rotationY - 2 * Math.PI) < 1e-12);
});

test('Moon locking follows orbit clock through pause, speed changes and reset, independent of spin controls', () => {
  const moon = { speed: 0.015, distance: 3, tidallyLocked: true };
  const settings = createSolarDefaults().simulation;
  const time = advanceWorldTime(createWorldTime(), 5, settings);
  const pose = getBodyPose(moon, time);
  const paused = advanceWorldTime(time, 20, settings, true);
  assert.deepEqual(getBodyPose(moon, paused), pose);
  settings.orbitSpeedMultiplier = 3;
  settings.rotationSpeedMultiplier = 0;
  const faster = advanceWorldTime(time, 2, settings);
  assert.ok(Math.abs(getBodyPose(moon, faster).rotationY - pose.rotationY - 0.09) < 1e-12);
  assert.deepEqual(getBodyPose(moon, { ...time, spinTime: -100 }), pose);
  assert.equal(getBodyPose(moon, createWorldTime()).rotationY, Math.PI / 2);
  // Existing independently spinning bodies retain their behaviour.
  assert.equal(getBodyPose({ speed: 0.02, distance: 10 }, { orbitTime: 5, spinTime: 2 }).rotationY, 2.4);
});
