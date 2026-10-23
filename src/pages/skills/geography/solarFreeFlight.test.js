import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createSolarFreeFlight, flightSpeed } from './solarFreeFlight.js';

function setup() {
  const oldWindow = globalThis.window, oldDocument = globalThis.document;
  globalThis.window = new EventTarget(); globalThis.document = new EventTarget();
  const scene = new THREE.Scene(), camera = new THREE.PerspectiveCamera(50, 1, .1, 5000);
  camera.position.set(0, 72, 128); camera.lookAt(0, 0, 0);
  const controls = { target: new THREE.Vector3(), enabled: true };
  const bodies = [['Earth', .45, 0], ['Mars', .23, -35], ['Sun', 5, -70]].map(([id, radius, z]) => {
    const object3d = new THREE.Object3D(); object3d.position.z = z; scene.add(object3d);
    return { id, name: id, radius, object3d, kind: id === 'Sun' ? 'star' : 'planet' };
  });
  const changes = [];
  const flight = createSolarFreeFlight({ scene, camera, controls, bodies, quality: 'low', reducedMotion: () => true, onChange: state => changes.push(state) });
  const ship = scene.getObjectByName('solar-free-flight');
  const tick = (n = 1) => { for (let i = 0; i < n; i++) flight.update(.05); };
  const key = (type, value) => { const event = new Event(type, { cancelable: true }); event.key = value; window.dispatchEvent(event); return event; };
  const clean = () => { flight.dispose(); globalThis.window = oldWindow; globalThis.document = oldDocument; };
  return { flight, ship, camera, controls, bodies, changes, scene, tick, key, clean };
}

test('manual flight steers in the shared world, stops after release and restores the camera on exit', () => {
  const t = setup();
  try {
    const position = t.camera.position.clone(), rotation = t.camera.quaternion.clone();
    t.flight.enter(); assert.equal(t.controls.enabled, false); assert.equal(t.ship.visible, true);
    t.flight.face('Mars'); const start = t.ship.position.clone();
    t.flight.setThrust(true); t.tick(70);
    assert.ok(t.ship.position.distanceTo(start) > 3);
    t.flight.setThrust(false); t.tick(30);
    const stopped = t.ship.position.clone(); t.tick(30);
    assert.ok(t.ship.position.distanceTo(stopped) < .001);
    assert.ok(t.changes.some(c => c.speed > 0));
    t.flight.setStick(1, .5); const heading = t.ship.quaternion.clone(); t.tick(10);
    assert.ok(t.ship.quaternion.angleTo(heading) > .1);
    t.flight.exit(); assert.ok(t.camera.position.equals(position)); assert.ok(t.camera.quaternion.angleTo(rotation) < 1e-7);
    assert.equal(t.controls.enabled, true); assert.equal(t.ship.visible, false);
    t.flight.enter(); t.tick(); assert.equal(t.changes.at(-1).speed, 0, 're-entry has no stale thrust');
  } finally { t.clean(); }
});

test('keyboard input stops on blur and ignores inactive flight; bumpers keep ship and camera outside worlds', () => {
  const t = setup();
  try {
    assert.equal(t.key('keydown', ' ').defaultPrevented, false);
    t.flight.enter(); t.flight.face('Mars');
    assert.equal(t.key('keydown', ' ').defaultPrevented, true); t.tick(20);
    window.dispatchEvent(new Event('blur')); const afterBlur = t.ship.position.clone(); t.tick(10);
    assert.ok(t.ship.position.equals(afterBlur));
    t.flight.home(); t.flight.setThrust(true); t.tick(300);
    for (const b of t.bodies) {
      const center = b.object3d.getWorldPosition(new THREE.Vector3());
      assert.ok(t.ship.position.distanceTo(center) >= b.radius + .34999);
      assert.ok(t.camera.position.distanceTo(center) >= b.radius + .19999);
    }
    // Moving worlds may pass over a stopped ship: the bumper still applies.
    t.flight.brake(); t.bodies[1].object3d.position.copy(t.ship.position); t.tick();
    assert.ok(t.ship.position.distanceTo(t.bodies[1].object3d.position) >= .57999);
    t.flight.dispose(); assert.equal(t.scene.getObjectByName('solar-free-flight'), undefined);
    assert.equal(t.key('keydown', ' ').defaultPrevented, false);
  } finally { t.clean(); }
});

test('flying to the clue target validates arrival, brakes once and ignores the wrong world', () => {
  const t = setup();
  try {
    t.flight.enter(); t.flight.setGoal('Mars', 'red-planet');
    t.flight.face('Earth'); t.flight.setThrust(true); t.tick(100);
    assert.equal(t.changes.at(-1).arrival, null, 'Earth cannot satisfy the Mars clue');
    t.flight.home(); t.flight.face('Mars'); t.flight.setThrust(true); t.tick(500);
    assert.deepEqual(t.changes.at(-1).arrival, { target: 'Mars', token: 'red-planet' });
    assert.equal(t.changes.at(-1).speed, 0);
    const parked = t.ship.position.clone();
    t.key('keydown', ' '); t.tick(20);
    assert.ok(t.ship.position.equals(parked), 'holding Space cannot fly through the celebration');
    t.flight.setGoal('Mars', 'another-clue'); t.flight.setThrust(true); t.tick(30);
    assert.equal(t.changes.at(-1).arrival, null, 'a new clue at the same body requires leaving and returning');
    t.flight.setGoal('Earth', 'home'); t.flight.home(); t.tick(40);
    assert.equal(t.changes.at(-1).arrival, null, 'Back to Earth is not a discovery flight');
  } finally { t.clean(); }
});

test('belt guidance flies into its annulus and validates a region arrival', () => {
  const t = setup();
  try {
    // The module shares this live target list, just like the scene's catalogue.
    t.bodies.push({ id: 'asteroid-belt', name: 'Asteroid belt', radius: 0, kind: 'belt', getRegion: () => ({ innerRadius: 47, outerRadius: 118, halfHeight: 7 }) });
    t.flight.enter(); t.flight.setGoal('asteroid-belt', 'rocks'); t.flight.face('asteroid-belt'); t.flight.setThrust(true); t.tick(500);
    assert.deepEqual(t.changes.at(-1).arrival, { target: 'asteroid-belt', token: 'rocks' });
    const radius = Math.hypot(t.ship.position.x, t.ship.position.z);
    assert.ok(radius >= 46.85 && radius <= 118.15);
  } finally { t.clean(); }
});

test('moving satellite, moon and comet targets are reachable and manual steering releases heading assistance', () => {
  for (const [id, kind] of [['ISS', 'satellite'], ['Earth/Moon', 'moon'], ['halleys-comet', 'comet']]) {
    const t = setup();
    try {
      const object3d = new THREE.Object3D(); object3d.position.set(8, 1, -12); t.scene.add(object3d);
      t.bodies.push({ id, kind, name: id, radius: .12, object3d });
      t.flight.enter(); t.flight.setGoal(id, kind); t.flight.face(id); t.flight.setThrust(true);
      for (let i = 0; i < 400 && !t.changes.at(-1)?.arrival; i++) { object3d.position.x += .002; t.tick(); }
      assert.deepEqual(t.changes.at(-1).arrival, { target: id, token: kind });
      t.flight.setGoal('Mars', 'red'); t.flight.face('Mars'); t.flight.setStick(1, 0); t.tick(5);
      assert.equal(t.changes.at(-1).navigation, null, 'manual steering overrides the chosen heading');
    } finally { t.clean(); }
  }
});

test('Turbo and Shift boost open-space flight, release on blur, and slow safely for an arrival', () => {
  const t = setup();
  try {
    t.flight.enter(); t.flight.setStick(-1, 0); t.tick(18); t.flight.setStick(0, 0);
    t.key('keydown', 'Shift'); t.tick(120);
    assert.ok(t.changes.some(frame => frame.speed > 70), 'boost exceeds the normal cruise speed');
    assert.ok(t.flight.boostStrength() > 0, 'the pooled streaks receive a boost signal');
    t.key('keyup', 'Shift'); t.tick(5); assert.equal(t.flight.boostStrength(), 0);
    t.flight.setBoost(true); t.tick(5); window.dispatchEvent(new Event('blur')); t.tick(5);
    assert.equal(t.flight.boostStrength(), 0); assert.equal(t.changes.at(-1).speed, 0);
    t.flight.home(); t.flight.setGoal('Mars', 'red'); t.flight.face('Mars'); t.flight.setBoost(true); t.tick(500);
    assert.deepEqual(t.changes.at(-1).arrival, { target: 'Mars', token: 'red' });
    assert.equal(t.flight.boostStrength(), 0);
    assert.ok(t.ship.position.distanceTo(t.bodies[1].object3d.position) >= .57999);
  } finally { t.clean(); }
});

test('Turbo is a clear boost close to a world too, tapering only on the final approach', () => {
  assert.ok(flightSpeed(3, true) > 2.5 * flightSpeed(3, false), 'near a planet');
  assert.ok(flightSpeed(.4, true) < 1.1 * flightSpeed(.4, false), 'almost touching');
  const t = setup();
  try {
    const run = (boost) => {
      t.flight.home(); t.flight.setStick(-1, 0); t.tick(18); t.flight.setStick(0, 0);
      if (boost) t.flight.setBoost(true); else t.flight.setThrust(true);
      const start = t.ship.position.clone(); t.tick(10);
      const strength = t.flight.boostStrength();
      t.flight.brake();
      return { distance: t.ship.position.distanceTo(start), strength };
    };
    t.flight.enter();
    const go = run(false), turbo = run(true);
    assert.ok(turbo.distance > 2 * go.distance, `${turbo.distance} vs ${go.distance}`);
    assert.ok(turbo.strength > .1, 'the Turbo button and streaks light up');
  } finally { t.clean(); }
});

test('Stop holds even while Space or Shift is still held down', () => {
  const t = setup();
  try {
    const press = (key, repeat = false) => { const event = new Event('keydown', { cancelable: true }); event.key = key; event.repeat = repeat; window.dispatchEvent(event); };
    t.flight.enter(); t.flight.setStick(-1, 0); t.tick(18); t.flight.setStick(0, 0);
    press(' '); press('Shift'); t.tick(10);
    assert.ok(t.changes.at(-1).speed > 0);
    t.flight.brake();
    for (let i = 0; i < 10; i++) { press(' ', true); press('Shift', true); t.tick(); }
    assert.equal(t.changes.at(-1).speed, 0);
    t.key('keyup', ' '); press(' '); t.tick(10);
    assert.ok(t.changes.at(-1).speed > 0, 'a fresh press flies again');
  } finally { t.clean(); }
});
