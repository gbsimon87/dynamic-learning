import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import { NAMED_ASTEROIDS, asteroidInfo, asteroidPosition, createNamedAsteroids } from './namedAsteroids.js';
import { FLIGHT_CLUES } from './flightClues.js';
import { createSolarDefaults } from './solarSimulation.js';

const BELT = createSolarDefaults().belt;

test('Ceres, Vesta and Psyche circle inside the belt band; Bennu travels near Earth', () => {
  assert.deepEqual(NAMED_ASTEROIDS.map(a => a.id), ['Ceres', 'Vesta', 'Psyche', 'Bennu']);
  const at = new THREE.Vector3();
  for (const asteroid of NAMED_ASTEROIDS) {
    for (const time of [0, 500, 4000]) {
      const r = Math.hypot(...asteroidPosition(asteroid, time, at).toArray().filter((_, i) => i !== 1));
      if (asteroid.id === 'Bennu') assert.ok(r > 26 && r < 33, `Bennu near Earth's path: ${r}`);
      else assert.ok(r > BELT.innerRadius && r < BELT.outerRadius, `${asteroid.id} in the belt: ${r}`);
    }
  }
  assert.notDeepEqual(asteroidPosition(NAMED_ASTEROIDS[0], 0, new THREE.Vector3()), asteroidPosition(NAMED_ASTEROIDS[0], 1000, new THREE.Vector3()), 'they move');
});

test('every asteroid has a card whose facts agree with its clue', () => {
  for (const asteroid of NAMED_ASTEROIDS) {
    const info = asteroidInfo(asteroid);
    assert.equal(info.name, asteroid.name);
    assert.ok(info.facts.length >= 2 && info.narration && info.classification);
    const clue = FLIGHT_CLUES.find(c => c.target === asteroid.id);
    assert.ok(clue, `${asteroid.id} has a clue`);
    assert.ok(info.facts.some(f => f === clue.fact), `${asteroid.id}: the clue's fact is on its card`);
    assert.match(info.facts.join(' '), /pretend|squish|bigger/i, 'card says sizes are pretend');
  }
});

test('the module adds findable bodies and labels, follows the clock and frees everything', () => {
  const scene = new THREE.Scene();
  let time = 0, building = true;
  const made = [];
  const field = createNamedAsteroids({ scene, getOrbitTime: () => time, quality: 'low', isHidden: () => { if (building) throw new Error('asked while building'); return false; }, makeLabel: text => { const s = new THREE.Sprite(new THREE.SpriteMaterial()); s.userData.text = text; made.push(s); return s; } });
  assert.equal(field.entries.length, 4);
  for (const entry of field.entries) {
    assert.equal(entry.kind, 'asteroid');
    assert.ok(entry.object3d.parent === scene && entry.radius > 0);
  }
  assert.equal(field.hitTargets.length, 8, 'body and label for each');
  const before = field.entries[0].object3d.position.clone();
  building = false; // the scene's other modules exist from the first frame
  time = 2000; field.update();
  assert.ok(field.entries[0].object3d.position.distanceTo(before) > .5);
  const geometries = field.entries.map(e => e.object3d.geometry);
  let freed = 0; geometries.forEach(g => g.addEventListener('dispose', () => { freed += 1; }));
  field.dispose();
  assert.equal(freed, 4);
  assert.equal(scene.children.length, 0);
});
