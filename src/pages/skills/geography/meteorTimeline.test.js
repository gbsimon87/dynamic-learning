import test from 'node:test';
import assert from 'node:assert/strict';
import { createMeteorState, launchMeteor, advanceMeteor, resetMeteor } from './meteorTimeline.js';

test('boundaries, ordered entries, repeat launch and reset', () => {
  let state = launchMeteor(createMeteorState()).state;
  assert.equal(launchMeteor(state).entered.length, 0);
  for (const [dt, expected] of [[1, 'approaching'], [3.5, 'impact'], [0.8, 'breaking'], [2.4, 'aftermath']]) {
    const result = advanceMeteor(state, dt);
    state = result.state;
    assert.deepEqual(result.entered, [expected]);
  }
  assert.ok(Math.abs(state.elapsed - 7.7) < 1e-9);
  assert.equal(advanceMeteor(state, 100).state.phase, 'aftermath');
  assert.equal(advanceMeteor(state, 100).state.phaseElapsed, 2);
  assert.deepEqual(resetMeteor(state).state, createMeteorState());
  assert.deepEqual(resetMeteor(createMeteorState()).entered, []);
});

test('large delta crosses every phase and reduced motion skips travel', () => {
  const normal = advanceMeteor(launchMeteor(createMeteorState()).state, 9.7);
  assert.deepEqual(normal.entered, ['approaching', 'impact', 'breaking', 'aftermath']);
  const reduced = advanceMeteor(launchMeteor(createMeteorState(), { reducedMotion: true }).state, 1);
  assert.deepEqual(reduced.entered, ['approaching', 'impact', 'breaking', 'aftermath']);
  assert.equal(reduced.state.phase, 'aftermath');
  assert.ok(Math.abs(reduced.state.elapsed - 0.85) < 1e-9);
});

test('T3 split deltas match one large delta and invalid deltas are inert', () => {
  const launched = launchMeteor(createMeteorState()).state;
  const whole = advanceMeteor(launched, 6);
  let split = launched;
  const splitEntered = [];
  for (let i = 0; i < 600; i++) {
    const step = advanceMeteor(split, 0.01);
    split = step.state;
    splitEntered.push(...step.entered);
  }
  assert.deepEqual(splitEntered, whole.entered);
  assert.equal(split.phase, whole.state.phase);
  assert.ok(Math.abs(split.elapsed - whole.state.elapsed) < 1e-9);
  assert.ok(Math.abs(split.phaseElapsed - whole.state.phaseElapsed) < 1e-9);
  for (const dt of [0, -3, NaN, Infinity]) {
    const inert = advanceMeteor(whole.state, dt);
    assert.deepEqual(inert.entered, []);
    assert.equal(inert.state, whole.state);
  }
  assert.deepEqual(advanceMeteor(createMeteorState(), 5).entered, []);
});

test('T4 reset from every phase zeroes state and old runs cannot leak events', () => {
  let state = launchMeteor(createMeteorState()).state;
  const seen = new Set();
  for (const dt of [0, 1, 3.5, 0.8, 2.4]) {
    if (dt) state = advanceMeteor(state, dt).state;
    seen.add(state.phase);
    const cleared = resetMeteor(state);
    assert.deepEqual(cleared.entered, ['ready']);
    assert.deepEqual(cleared.state, createMeteorState());
    assert.deepEqual(resetMeteor(cleared.state).entered, []);
    assert.deepEqual(resetMeteor(cleared.state).state, createMeteorState());
  }
  assert.deepEqual([...seen], ['preparing', 'approaching', 'impact', 'breaking', 'aftermath']);

  const stale = advanceMeteor(launchMeteor(createMeteorState()).state, 2).state;
  const current = resetMeteor(stale).state;
  const revived = advanceMeteor(stale, 5);
  assert.ok(revived.entered.length > 0);
  assert.deepEqual(current, createMeteorState());
  assert.equal(current.phase, 'ready');
});

test('T5 reduced motion preserves entry order through zero-duration phases', () => {
  const reduced = launchMeteor(createMeteorState(), { reducedMotion: true }).state;
  assert.equal(reduced.reducedMotion, true);
  const stepped = [];
  let state = reduced;
  for (let i = 0; i < 200 && state.phase !== 'aftermath'; i++) {
    const step = advanceMeteor(state, 0.01);
    state = step.state;
    stepped.push(...step.entered);
  }
  assert.deepEqual(stepped, ['approaching', 'impact', 'breaking', 'aftermath']);
  const capped = advanceMeteor(state, 500).state;
  assert.equal(capped.phase, 'aftermath');
  assert.ok(Math.abs(capped.phaseElapsed - 0.4) < 1e-9);
  assert.equal(advanceMeteor(capped, 500).state.phaseElapsed, capped.phaseElapsed);
  assert.equal(resetMeteor(capped).state.reducedMotion, true);
});
