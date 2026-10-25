import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createPlanetOrbit, nearestOrbitBody, orbitEntryDistance, PLANET_ORBIT_RATE } from './solarPlanetOrbit.js';

function setup({ name = 'Earth', radius = .45, calm = false } = {}) {
  const ship = new THREE.Object3D(); ship.scale.setScalar(.3); ship.position.set(0, 1, radius + 2);
  const camera = new THREE.PerspectiveCamera(50, 1, .1, 5000); camera.position.set(0, 2, radius + 5);
  const controls = { target: new THREE.Vector3(), enabled: true };
  const body = { id: name, name, kind: 'planet', radius, object3d: new THREE.Object3D() };
  const obstacles = [body]; let view = 'behind';
  const orbit = createPlanetOrbit({ ship, camera, controls, obstacles, reducedMotion: () => calm, getCameraView: () => view });
  const tick = (seconds, step = 1 / 60) => { for (let i = 0; i < Math.ceil(seconds / step); i++) orbit.update(step); };
  return { orbit, ship, camera, controls, body, obstacles, tick, setView: value => { view = value; } };
}

test('orbit offers only nearby planets and moons, including Pluto, using their live world positions', () => {
  const t = setup();
  const position = new THREE.Vector3(0, 0, orbitEntryDistance(t.body) - .01);
  assert.equal(nearestOrbitBody([t.body], position), t.body);
  position.z += .02; assert.equal(nearestOrbitBody([t.body], position), null);
  const star = { ...t.body, kind: 'star' };
  assert.equal(nearestOrbitBody([star], new THREE.Vector3()), null);
  t.body.object3d.position.x = 10;
  assert.equal(nearestOrbitBody([t.body], new THREE.Vector3()), null);
  assert.equal(nearestOrbitBody([{ ...t.body, name: 'Pluto' }], new THREE.Vector3(10, 0, 0)).name, 'Pluto');
});

test('orbit makes a slow, safe lap around a moving planet at different frame rates', () => {
  for (const step of [1 / 30, 1 / 60, 1 / 120]) {
    const t = setup();
    assert.equal(t.orbit.start(t.body), true); assert.equal(t.controls.enabled, false);
    t.tick(4, step);
    const start = t.ship.position.clone();
    for (let i = 0; i < Math.ceil(15 / step); i++) {
      t.body.object3d.position.x += step * .3;
      t.orbit.update(step);
      assert.ok(t.ship.position.distanceTo(t.body.object3d.position) > t.body.radius + .349);
      assert.ok(t.camera.position.distanceTo(t.body.object3d.position) > t.body.radius + .199);
      const projection = t.ship.position.clone().project(t.camera);
      assert.ok(Math.abs(projection.x) < 1 && Math.abs(projection.y) < 1 && projection.z < 1, 'rocket stays visible in the orbit view');
    }
    const radialStart = start.normalize(), radialEnd = t.ship.position.clone().sub(t.body.object3d.position).normalize();
    assert.ok(Math.abs(radialStart.angleTo(radialEnd) - PLANET_ORBIT_RATE * 15) < .01);
    t.setView('cockpit'); t.tick(4, step);
    assert.ok(t.camera.position.distanceTo(t.ship.position) < .01);
    const direction = t.camera.getWorldDirection(new THREE.Vector3());
    assert.ok(direction.dot(t.body.object3d.position.clone().sub(t.camera.position).normalize()) > .99);
    t.orbit.stop(); assert.equal(t.controls.enabled, true);
    const stopped = t.ship.position.clone(); t.tick(5, step); assert.ok(t.ship.position.equals(stopped));
  }
});

test('Saturn orbit settles outside the rings, and moving moons remain solid', () => {
  const t = setup({ name: 'Saturn', radius: 3.45 });
  t.orbit.start(t.body); t.tick(5);
  assert.ok(t.ship.position.length() > t.body.radius * 3, 'clears the outer rings');
  const moon = { kind: 'moon', radius: .4, object3d: new THREE.Object3D() };
  moon.object3d.position.copy(t.ship.position); t.obstacles.push(moon);
  t.orbit.update(1 / 120);
  assert.ok(t.ship.position.distanceTo(moon.object3d.position) >= .74999);
  assert.ok(t.camera.position.distanceTo(moon.object3d.position) >= .59999);
});

test('reduced motion holds the orbital angle, follows the planet and restores pre-existing control state', () => {
  const t = setup({ calm: true }); t.controls.enabled = false;
  assert.equal(t.orbit.start({ ...t.body, kind: 'star' }), false);
  t.orbit.start(t.body); t.tick(1);
  const offset = t.ship.position.clone(), cameraOffset = t.camera.position.clone();
  t.body.object3d.position.set(4, 2, -3); t.tick(30);
  assert.ok(t.ship.position.clone().sub(t.body.object3d.position).distanceTo(offset) < 1e-8);
  assert.ok(t.camera.position.clone().sub(t.body.object3d.position).distanceTo(cameraOffset) < 1e-8);
  t.orbit.dispose(); assert.equal(t.controls.enabled, false); assert.equal(t.orbit.isActive(), false);
});

test('moons are offered from close by, chosen over their planet near the moon, and ridden closely', () => {
  const planet = { id: 'Jupiter', name: 'Jupiter', kind: 'planet', radius: 3.75, object3d: new THREE.Object3D() };
  const io = { id: 'Jupiter/Io', name: 'Io', kind: 'moon', radius: .3, object3d: new THREE.Object3D() };
  io.object3d.position.set(6.5, 0, 0);
  assert.ok(Math.abs(orbitEntryDistance(io) - 1.8) < 1e-9);
  assert.equal(nearestOrbitBody([planet, io], new THREE.Vector3(6.5, 0, 1.2)), io);
  assert.equal(nearestOrbitBody([planet, io], new THREE.Vector3(0, 0, 5)), planet);
  assert.equal(nearestOrbitBody([io], new THREE.Vector3(6.5, 0, 2.2)), null);

  const ship = new THREE.Object3D(); ship.scale.setScalar(.08); ship.position.set(6.5, .3, 1.4);
  const camera = new THREE.PerspectiveCamera(50, 1, .1, 5000); camera.position.set(6.5, .6, 2.4);
  const controls = { target: io.object3d.position.clone(), enabled: true };
  const orbit = createPlanetOrbit({ ship, camera, controls, obstacles: [planet, io] });
  assert.equal(orbit.start(io), true);
  for (let i = 0; i < 600; i++) orbit.update(1 / 60);
  const shipGap = ship.position.distanceTo(io.object3d.position);
  assert.ok(shipGap > io.radius + .349 && shipGap < 1, `rides ${shipGap} from Io`);
  const cameraGap = camera.position.distanceTo(io.object3d.position);
  assert.ok(cameraGap < 3, `films Io from ${cameraGap}`);
  assert.ok(camera.position.distanceTo(planet.object3d.position) > planet.radius + .2, 'camera stays outside Jupiter');
  const onScreen = io.object3d.position.clone().project(camera);
  assert.ok(Math.abs(onScreen.x) < 1 && Math.abs(onScreen.y) < 1 && onScreen.z < 1, 'Io stays in view');
});
