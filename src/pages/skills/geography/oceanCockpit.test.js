import assert from 'node:assert/strict';
import test from 'node:test';
import * as THREE from 'three';
import { createOceanCockpit } from './oceanCockpit.js';

const palette = () => Object.fromEntries(Object.entries({
  cabin: '#2c414b', bezel: '#101e28', steel: '#9aafb4', glow: '#78e6e4',
  amber: '#f2bb63', signal: '#d77d65', screen: '#062a36', ink: '#d7f3ed',
}).map(([key, value]) => [key, new THREE.Color(value)]));
const input = (extra = {}) => ({ position: new THREE.Vector3(0, 3, 0), depth: 6, yaw: 0, now: 0, ...extra });

test('the cabin has two pilot sticks and an open centre for the live ocean', () => {
  const cabin = createOceanCockpit(palette());
  cabin.resize(16 / 9);
  cabin.group.visible = true;
  cabin.group.updateMatrixWorld(true);
  for (const side of ['left', 'right']) assert.ok(cabin.group.getObjectByName(`ocean-cockpit-stick-${side}`));
  const ray = new THREE.Raycaster(new THREE.Vector3(), new THREE.Vector3(0, 0, -1));
  ray.layers.set(1);
  // Transparent pressure glass may cross the centre; opaque cabin furniture may not.
  const hits = ray.intersectObject(cabin.group, true).filter(({ object }) => !object.material.transparent);
  assert.equal(hits.length, 0);
  let meshes = 0;
  cabin.group.traverse((object) => {
    if (object.isMesh) meshes++;
    const positions = object.geometry?.attributes.position.array;
    if (positions) assert.ok(positions.every(Number.isFinite), `${object.name || object.type} has finite geometry`);
  });
  assert.ok(meshes < 100, 'fixed hardware is batched rather than hundreds of separate draw calls');
  cabin.disposeTextures();
});

test('steering tilts the real grips and releasing it returns them to neutral', () => {
  const cabin = createOceanCockpit(palette());
  const left = cabin.group.getObjectByName('ocean-cockpit-stick-left');
  const grip = left.children.find((child) => child.isGroup);
  cabin.update(input({ turn: 1, lift: 0.5, throttle: 1 }));
  assert.ok(grip.rotation.x < 0);
  assert.ok(grip.rotation.z < 0);
  cabin.update(input({ now: 250 }));
  assert.equal(Math.abs(grip.rotation.x), 0);
  assert.equal(Math.abs(grip.rotation.z), 0);
  cabin.disposeTextures();
});

test('telemetry and nearby contacts refresh at a bounded rate and remain still when unchanged', () => {
  const cabin = createOceanCockpit(palette());
  const map = cabin.group.getObjectByName('ocean-cockpit-display-1').material.map;
  cabin.update(input());
  const first = new Uint8Array(map.image.data), version = map.version;
  cabin.update(input({ now: 250 }));
  assert.equal(map.version, version);
  const target = new THREE.Object3D();
  target.position.set(5, 3, -5); target.updateMatrixWorld();
  const contacts = [{ object3d: target }];
  cabin.update(input({ discoveries: contacts, now: 300 }));
  assert.ok(map.version > version);
  assert.notDeepEqual(map.image.data, first);
  const withContact = map.version;
  target.position.x = 8; target.updateMatrixWorld();
  cabin.update(input({ discoveries: contacts, now: 350 }));
  assert.equal(map.version, withContact);
  target.visible = false;
  cabin.update(input({ discoveries: contacts, now: 550 }));
  assert.deepEqual(map.image.data, first);
  cabin.disposeTextures();
});

test('portrait and wide framing retain both joystick heads on screen', () => {
  const cabin = createOceanCockpit(palette());
  for (const aspect of [390 / 844, 16 / 9, 844 / 390]) {
    cabin.resize(aspect);
    cabin.group.updateMatrixWorld(true);
    const camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 180);
    for (const side of ['left', 'right']) {
      const base = cabin.group.getObjectByName(`ocean-cockpit-stick-${side}`);
      const screen = base.localToWorld(new THREE.Vector3(0, 0.335, -0.028)).project(camera);
      assert.ok(Math.abs(screen.x) < 0.95 && Math.abs(screen.y) < 0.95, `${side} grip visible at aspect ${aspect}`);
    }
  }
  cabin.disposeTextures();
});

test('landscape joystick grips never cover the side telemetry displays', () => {
  const cabin = createOceanCockpit(palette());
  const rect = (box, camera) => {
    const xs = [], ys = [];
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) {
      const p = new THREE.Vector3(x, y, z).project(camera);
      xs.push(p.x); ys.push(p.y);
    }
    return { left: Math.min(...xs), right: Math.max(...xs), bottom: Math.min(...ys), top: Math.max(...ys) };
  };
  const overlaps = (a, b) => a.left < b.right && b.left < a.right && a.bottom < b.top && b.bottom < a.top;
  for (const aspect of [4 / 3, 16 / 9, 844 / 390]) {
    cabin.resize(aspect);
    cabin.group.updateMatrixWorld(true);
    const camera = new THREE.PerspectiveCamera(65, aspect, 0.1, 180);
    for (const [side, id] of [['left', 0], ['right', 2]]) {
      const grip = cabin.group.getObjectByName(`ocean-cockpit-stick-${side}`).children.find((child) => child.isGroup);
      const display = cabin.group.getObjectByName(`ocean-cockpit-display-${id}`);
      const gripRect = rect(new THREE.Box3().setFromObject(grip), camera);
      const displayRect = rect(new THREE.Box3().setFromObject(display), camera);
      assert.ok(!overlaps(gripRect, displayRect), `${side} grip clears display ${id} at aspect ${aspect.toFixed(2)}`);
      assert.ok(displayRect.bottom > -0.95 && displayRect.top < 0.95, `display ${id} fully in frame at aspect ${aspect.toFixed(2)}`);
    }
  }
  cabin.disposeTextures();
});

test('the navigation display shows a compass needle for the heading', () => {
  const cabin = createOceanCockpit(palette());
  const map = cabin.group.getObjectByName('ocean-cockpit-display-0').material.map;
  cabin.update(input({ yaw: 0 }));
  const north = new Uint8Array(map.image.data);
  cabin.update(input({ yaw: -Math.PI / 2, now: 250 }));
  // The digits sit on the left; the dial occupies the right half of the 256px screen.
  let dialChanges = 0;
  for (let i = 0; i < north.length; i += 4) if ((i / 4) % 256 >= 146 && map.image.data[i] !== north[i]) dialChanges++;
  assert.ok(dialChanges > 50, 'the compass needle moves with the heading');
  cabin.disposeTextures();
});

test('theme refresh changes lit materials and screen pixels; owned textures release once', () => {
  const cabin = createOceanCockpit(palette());
  cabin.update(input());
  const textures = [0, 1, 2].map((id) => cabin.group.getObjectByName(`ocean-cockpit-display-${id}`).material.map);
  const before = new Uint8Array(textures[0].image.data);
  const dark = palette(); dark.screen.set('#031d2c'); dark.glow.set('#59d2dc');
  cabin.setPalette(dark);
  cabin.update(input({ now: 1 }));
  assert.notDeepEqual(textures[0].image.data, before);
  const released = [0, 0, 0];
  textures.forEach((texture, id) => texture.addEventListener('dispose', () => released[id]++));
  cabin.disposeTextures(); cabin.disposeTextures();
  assert.deepEqual(released, [1, 1, 1]);
});
