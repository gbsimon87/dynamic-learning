import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createOrbitPilot, nearestOrbitTarget } from './orbitPilot.js';

const UP = new THREE.Vector3(0, 1, 0);
const REEF_PROFILE = { entryDistance: 9, radius: 6, rig: { back: 5, lift: 2.2, trail: 1.5 }, level: true };

function setup({ forward, start = [0, 2.5, 7], isSolid, obstacles } = {}) {
  const reef = { id: 'reef', name: 'Coral reef', radius: 3, object3d: new THREE.Object3D() };
  reef.object3d.position.set(0, 3, 0);
  const ship = new THREE.Object3D(); ship.position.set(...start);
  ship.position.y += reef.object3d.position.y;
  const camera = new THREE.PerspectiveCamera(42, 1, .1, 180); camera.position.set(0, 8, 16);
  const controls = { target: new THREE.Vector3(), enabled: true };
  const pilot = createOrbitPilot({ ship, camera, controls, profile: () => REEF_PROFILE, obstacles: obstacles ?? [reef], forward, isSolid });
  const tick = seconds => { for (let i = 0; i < Math.ceil(seconds * 60); i++) pilot.update(1 / 60); };
  return { reef, ship, camera, controls, pilot, tick };
}

test('profile returning null is never offered or started', () => {
  const t = setup();
  const profile = () => null;
  assert.equal(nearestOrbitTarget([t.reef], t.ship.position, profile), null);
  const pilot = createOrbitPilot({ ship: t.ship, camera: t.camera, controls: t.controls, profile });
  assert.equal(pilot.start(t.reef), false);
  assert.equal(t.controls.enabled, true);
  assert.equal(nearestOrbitTarget([t.reef], t.ship.position, () => REEF_PROFILE), t.reef);
  assert.equal(nearestOrbitTarget([t.reef], new THREE.Vector3(0, 3, 9.5), () => REEF_PROFILE), null);
});

test('level orbit eases to anchor height', () => {
  const t = setup();
  const anchorY = t.reef.object3d.position.y, startY = t.ship.position.y;
  assert.equal(t.pilot.start(t.reef), true);
  for (let i = 0; i < 300; i++) {
    t.pilot.update(1 / 60);
    assert.ok(t.ship.position.y <= startY + 1e-9 && t.ship.position.y >= anchorY - 1e-9, `height ${t.ship.position.y}`);
  }
  assert.ok(Math.abs(t.ship.position.y - anchorY) < .01);
  const flat = t.ship.position.clone().sub(t.reef.object3d.position);
  assert.ok(Math.abs(Math.hypot(flat.x, flat.z) - REEF_PROFILE.radius) < .05);
});

test('forward axis keeps the nose along the path without roll', () => {
  const t = setup({ forward: new THREE.Vector3(0, 0, -1), start: [0, 0, 7] });
  t.pilot.start(t.reef); t.tick(3);
  const radial = t.ship.position.clone().sub(t.reef.object3d.position).setY(0).normalize();
  const tangent = new THREE.Vector3().crossVectors(UP, radial).normalize();
  const nose = new THREE.Vector3(0, 0, -1).applyQuaternion(t.ship.quaternion);
  const top = new THREE.Vector3(0, 1, 0).applyQuaternion(t.ship.quaternion);
  assert.ok(nose.distanceTo(tangent) < .05, `nose ${nose.toArray()}`);
  assert.ok(top.distanceTo(UP) < .01);
});

test('isSolid filters obstacles', () => {
  for (const solid of [false, true]) {
    const ghost = { kind: 'ghost', radius: 2, object3d: new THREE.Object3D() };
    const t = setup({ start: [0, 0, 6], isSolid: obstacle => solid || obstacle.kind !== 'ghost' });
    t.pilot.start(t.reef); t.tick(1);
    ghost.object3d.position.copy(t.ship.position);
    const pilot = createOrbitPilot({ ship: t.ship, camera: t.camera, controls: t.controls, profile: () => REEF_PROFILE, obstacles: [t.reef, ghost], isSolid: obstacle => solid || obstacle.kind !== 'ghost' });
    pilot.start(t.reef);
    const before = t.ship.position.clone();
    pilot.update(1 / 60);
    const moved = t.ship.position.distanceTo(before);
    assert.ok(solid ? moved > 1.5 : moved < .2, `solid=${solid} moved ${moved}`);
  }
});

test('level orbit glides out from directly above the target without a jump', () => {
  const t = setup({ start: [0, 0, 0], obstacles: [] });
  t.pilot.start(t.reef);
  let previous = t.ship.position.clone();
  for (let i = 0; i < 300; i++) {
    t.pilot.update(1 / 60);
    assert.ok(t.ship.position.distanceTo(previous) < .5, `frame ${i} moved ${t.ship.position.distanceTo(previous)}`);
    previous = t.ship.position.clone();
  }
});
