import test from 'node:test';
import assert from 'node:assert/strict';
import { STEERING, createSteeringState, isSteeringIdle, stepSteering } from './oceanSteering.js';

const flat = { floorHeight: () => 0, obstacles: [] };
const NONE = { turn: 0, throttle: 0, lift: 0 };
const run = (state, input, seconds, world = flat) => {
  for (let t = 0; t < seconds; t += .05) state = stepSteering(state, input, .05, world);
  return state;
};

test('accelerates gently toward max speed and coasts to a stop', () => {
  const start = createSteeringState({ x: 0, y: 3, z: 0 });
  const early = run(start, { ...NONE, throttle: 1 }, .5);
  assert.ok(early.speed > 0 && early.speed < STEERING.maxSpeed);
  const cruising = run(early, { ...NONE, throttle: 1 }, 10);
  assert.ok(Math.abs(cruising.speed - STEERING.maxSpeed) < 1e-6);
  assert.ok(cruising.position.z < 0, 'forward is -z');
  assert.equal(isSteeringIdle(cruising, NONE), false);
  assert.equal(isSteeringIdle(run(cruising, NONE, 10), NONE), true);
});

test('turning right moves the craft toward +x and turning works on the spot', () => {
  const moved = run(createSteeringState({ x: 0, y: 3, z: 0 }), { ...NONE, turn: 1, throttle: 1 }, 2);
  assert.ok(moved.position.x > 0);
  assert.ok(moved.yaw < 0);
  const spun = run(createSteeringState({ x: 0, y: 3, z: 0 }), { ...NONE, turn: 1 }, 1);
  assert.ok(spun.yaw < 0);
  assert.deepEqual(spun.position, { x: 0, y: 3, z: 0 });
});

test('stays above the seabed, below the height limit and inside the area', () => {
  const ridge = { floorHeight: (x) => x * .1, obstacles: [] };
  const low = run(createSteeringState({ x: 4, y: 3, z: 0 }), { ...NONE, lift: -1 }, 10, ridge);
  assert.ok(low.position.y >= 4 * .1 + STEERING.floorClearance - 1e-9);
  assert.equal(low.climb, 0);
  const high = run(createSteeringState({ x: 0, y: 3, z: 0 }), { ...NONE, lift: 1 }, 10);
  assert.ok(high.position.y <= STEERING.maxHeight);
  const far = run(createSteeringState({ x: 0, y: 3, z: 0 }), { ...NONE, throttle: 1 }, 60);
  assert.ok(Math.hypot(far.position.x, far.position.z) <= STEERING.areaRadius + 1e-9);
});

test('bumps softly off a rock instead of passing through', () => {
  const rock = { x: 0, z: -6, radius: 1, top: 2 };
  const world = { floorHeight: () => -5, obstacles: [rock] };
  const blocked = run(createSteeringState({ x: 0, y: 1, z: 0 }), { ...NONE, throttle: 1 }, 10, world);
  assert.ok(Math.hypot(blocked.position.x - rock.x, blocked.position.z - rock.z) >= rock.radius + STEERING.hullRadius - 1e-6);
  const above = run(createSteeringState({ x: 0, y: rock.top + STEERING.hullDepth + .1, z: 0 }), { ...NONE, throttle: 1 }, 4, world);
  assert.ok(above.position.z < rock.z - rock.radius);
});

test('the ocean is twenty times the area of the first preview', () => {
  const FIRST_PREVIEW_RADIUS = 22;
  assert.ok(STEERING.areaRadius ** 2 >= 20 * FIRST_PREVIEW_RADIUS ** 2);
  const far = run(createSteeringState({ x: 0, y: 3, z: 0 }), { ...NONE, throttle: 1 }, 40);
  assert.ok(Math.hypot(far.position.x, far.position.z) > 90);
});
