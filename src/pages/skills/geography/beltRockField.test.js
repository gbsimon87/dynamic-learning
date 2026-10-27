import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { ROCK_REACH, createBeltRockField } from './beltRockField.js';

const REGION = { innerRadius: 55, outerRadius: 90, halfHeight: 4 };
const seeded = (seed = 5) => () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
const make = (quality = 'standard') => {
  const scene = new THREE.Scene();
  return { scene, field: createBeltRockField({ scene, getRegion: () => REGION, quality, random: seeded() }) };
};
const radial = p => Math.hypot(p.x, p.z);

test('rocks appear around a steering ship inside the belt, inside the band, never on top of the ship', () => {
  const { field } = make();
  const ship = new THREE.Vector3(70, 0, 0), forward = new THREE.Vector3(0, 0, -1);
  field.update({ position: ship, forward, steering: true });
  assert.ok(field.mesh.visible);
  assert.ok(field.rocks.length >= 20, `${field.rocks.length} rocks`);
  assert.ok(field.rocks.every(r => r.position.clone().sub(ship).dot(forward) > 0), 'all ahead of the rocket, none behind it by the camera');
  for (const rock of field.rocks) {
    assert.ok(rock.position.distanceTo(ship) <= ROCK_REACH + 1e-6, 'near the ship');
    assert.ok(rock.position.distanceTo(ship) > rock.radius + 2, 'not on the ship');
    assert.ok(radial(rock.position) >= REGION.innerRadius && radial(rock.position) <= REGION.outerRadius, 'inside the band');
  }
  const low = make('low').field; low.update({ position: ship, forward, steering: true });
  assert.ok(low.rocks.length < field.rocks.length, 'fewer rocks on low quality');
});

test('flying on recycles rocks left behind to the space ahead', () => {
  const { field } = make();
  const ship = new THREE.Vector3(70, 0, 0), forward = new THREE.Vector3(0, 0, -1);
  field.update({ position: ship, forward, steering: true });
  for (let i = 0; i < 30; i++) { ship.z -= 1; field.update({ position: ship, forward, steering: true }); }
  for (const rock of field.rocks) assert.ok(rock.position.distanceTo(ship) <= ROCK_REACH + 1e-6);
  const ahead = field.rocks.filter(r => r.position.z < ship.z).length;
  assert.ok(ahead > field.rocks.length / 3, `${ahead} rocks ahead`);
});

test('outside the belt, or when not steering, there are no rocks', () => {
  const { field } = make();
  const forward = new THREE.Vector3(0, 0, -1);
  field.update({ position: new THREE.Vector3(70, 0, 0), forward, steering: true });
  field.update({ position: new THREE.Vector3(70, 0, 0), forward, steering: false });
  assert.equal(field.mesh.visible, false);
  field.update({ position: new THREE.Vector3(30, 0, 0), forward, steering: true });
  assert.equal(field.mesh.visible, false);
  assert.equal(field.collide(new THREE.Vector3(30, 0, 0), new THREE.Vector3()), false);
});

test('bumping a rock pushes the ship out, slows it, and sends the rock drifting', () => {
  const { field } = make();
  const ship = new THREE.Vector3(70, 0, 0), forward = new THREE.Vector3(0, 0, -1);
  field.update({ position: ship, forward, steering: true });
  const rock = field.rocks[0];
  const at = rock.position.clone().addScaledVector(new THREE.Vector3(1, 0, 0), rock.radius * .5);
  const velocity = new THREE.Vector3(-6, 0, 0);
  assert.equal(field.collide(at, velocity), true);
  assert.ok(at.distanceTo(rock.position) >= rock.radius + .35 - 1e-6, 'pushed clear');
  assert.ok(velocity.length() < 6 && velocity.x >= -1e-6, 'no longer heading into the rock');
  assert.ok(rock.drift.length() > 0, 'the rock drifts away');
  const miss = new THREE.Vector3(500, 0, 0);
  assert.equal(field.collide(miss, new THREE.Vector3()), false);
});

test('dispose frees the rocks', () => {
  const { scene, field } = make();
  let freed = 0;
  field.mesh.geometry.addEventListener('dispose', () => { freed += 1; });
  field.mesh.material.addEventListener('dispose', () => { freed += 1; });
  field.dispose();
  assert.equal(freed, 2);
  assert.equal(scene.children.length, 0);
});
