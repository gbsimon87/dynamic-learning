import test from 'node:test';
import assert from 'node:assert/strict';
import { steerInput, stickVector } from './flightControls.js';
test('keyboard and joystick use the same clamped steering with a forgiving dead zone', () => {
  assert.deepEqual(steerInput(.01, .01, new Set()), { x: 0, y: 0 });
  assert.deepEqual(steerInput(.5, .5, new Set(['d', 'ArrowUp'])), { x: 1, y: 1 });
  const stick = stickVector(300, -400, 50);
  assert.ok(Math.abs(Math.hypot(stick.x, stick.y) - 1) < 1e-9);
  assert.equal(stick.y, .8); assert.equal(stick.thumbY, -40);
});
