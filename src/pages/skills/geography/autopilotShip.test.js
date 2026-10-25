import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { createAutopilotShip } from './autopilotShip.js';

function setup() {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, .1, 5000);
  camera.position.set(0, 12, 28); camera.lookAt(0, 0, 0);
  const controls = { target: new THREE.Vector3(), enabled: true };
  const earth = new THREE.Object3D(), mars = new THREE.Object3D(); mars.position.set(-30, 0, 0);
  scene.add(earth, mars);
  let view = 'behind', arrivals = 0;
  const api = createAutopilotShip({ scene, camera, controls, quality: 'low', getCameraView: () => view });
  api.park(earth, { radius: .45, framingDistance: () => 4 });
  const tick = (count = 1) => { for (let i = 0; i < count; i++) api.update(1 / 60, { active: false }); };
  return { api, camera, controls, earth, mars, tick, setView: value => { view = value; }, arrivals: () => arrivals++, getArrivals: () => arrivals };
}

test('autopilot view changes smoothly, hides its own rocket in the cockpit, and lands on planet framing', () => {
  const t = setup();
  try {
    t.api.update(0, { active: false });
    assert.equal(t.api.flyTo(t.mars, { radius: .23, framingDistance: () => 2.5, onArrive: t.arrivals }), true);
    t.tick(24);
    const rocket = t.api.hitTarget.parent;
    assert.equal(rocket.visible, true);
    let previousCamera = t.camera.position.clone(), largestCameraStep = 0;
    t.setView('cockpit');
    for (let i = 0; i < 36; i++) {
      t.tick();
      largestCameraStep = Math.max(largestCameraStep, t.camera.position.distanceTo(previousCamera));
      previousCamera.copy(t.camera.position);
    }
    assert.equal(rocket.visible, false);
    assert.ok(largestCameraStep < 1, `the view transition eases across frames: ${largestCameraStep}`);
    assert.ok(t.camera.position.distanceTo(rocket.position) < .15, 'camera arrives inside the rocket');
    t.setView('behind'); t.tick();
    assert.equal(rocket.visible, false, 'the hull stays hidden while the camera clears it');
    t.tick(23);
    assert.equal(rocket.visible, true);
    assert.ok(t.camera.position.distanceTo(rocket.position) < .8, 'closer chase framing scales with the ship');
    t.tick(500);
    assert.equal(t.getArrivals(), 1);
    assert.equal(t.api.isFlying(), false);
    assert.equal(rocket.visible, true, 'landed rocket is visible again');
    assert.ok(Math.abs(t.camera.position.distanceTo(t.controls.target) - 2.5) < .001, 'arrival restores destination framing');
  } finally { t.api.dispose(); }
});

test('autopilot skip keeps the destination handover independent of the selected camera', () => {
  const t = setup();
  try {
    t.api.flyTo(t.mars, { radius: .23, framingDistance: () => 2.5, onArrive: t.arrivals });
    t.setView('cockpit'); t.tick(10); t.api.skip();
    assert.equal(t.getArrivals(), 1);
    assert.equal(t.api.isFlying(), false);
    assert.ok(Math.abs(t.camera.position.distanceTo(t.controls.target) - 2.5) < .001);
  } finally { t.api.dispose(); }
});
