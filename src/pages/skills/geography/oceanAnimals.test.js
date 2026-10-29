import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDiscovery } from '../../../components/worlds/discovery.js';
import { ANIMALS } from './oceanAnimals.js';
import { loopPose } from './oceanFish.js';
import { OCEAN_DISCOVERIES } from './oceanDiscoveries.js';
import { REEF_ORBIT } from './oceanDiscoveries.js';
import { REEFS } from './oceanReef.js';
import { OCEAN_SURFACE_HEIGHT } from './oceanWater.js';
import { STEERING } from './oceanSteering.js';

const FIRST_FIVE = ['parrotfish', 'clownfish', 'sea-turtle', 'eagle-ray', 'seahorse'];
const SPECIES = [...FIRST_FIVE, 'reef-shark', 'octopus', 'humpback-whale', 'swordfish', 'dolphin', 'porcupinefish', 'jellyfish'];
const firstOfEach = () => SPECIES.map(id => ANIMALS.find(animal => animal.key === id));

test('the cast is twelve species; the first five keep their homes near the start', () => {
  assert.deepEqual(ANIMALS.slice(0, 5).map(animal => animal.key), FIRST_FIVE);
  assert.ok(firstOfEach().every(Boolean));
  assert.deepEqual([...new Set(ANIMALS.map(animal => animal.id))], SPECIES);
  assert.deepEqual(OCEAN_DISCOVERIES.map(discovery => discovery.id), ['coral-reef', ...SPECIES]);
});

test('the ocean is busy: 85 animals, each with its own key', () => {
  const counts = Object.fromEntries(SPECIES.map(id => [id, ANIMALS.filter(animal => animal.id === id).length]));
  assert.deepEqual(counts, { parrotfish: 14, clownfish: 10, 'sea-turtle': 7, 'eagle-ray': 7, seahorse: 8, 'reef-shark': 5, octopus: 6, 'humpback-whale': 3, swordfish: 5, dolphin: 6, porcupinefish: 6, jellyfish: 8 });
  assert.equal(new Set(ANIMALS.map(animal => animal.key)).size, 85);
  assert.ok(ANIMALS.every(animal => animal.discovery.id === animal.id));
});

test('every animal card is complete, sourced and opens with one sentence', () => {
  for (const { id, discovery } of firstOfEach()) {
    assert.equal(discovery.id, id);
    assert.deepEqual(validateDiscovery(discovery), [], id);
    assert.equal(discovery.eyebrow, 'Sea life', id);
    assert.ok(discovery.sources.length > 0 && discovery.sources.every(url => url.startsWith('https://')), id);
    assert.equal(discovery.summary.match(/[.!?]/g).length, 1, id);
    assert.ok(discovery.honesty, id);
  }
});

test('animal loops stay clear of every reef, the start, the rocks, the surface, the edge and each other', () => {
  for (const { key, loop, orbit } of ANIMALS) {
    assert.equal(orbit.level, true, key);
    assert.ok(loop.radius < orbit.entryDistance, `${key} stays within reach of a parked submarine`);
    for (let t = 0; t <= loop.lapSeconds * 2; t += 0.5) {
      const { x, y, z } = loopPose(loop, t);
      for (const reef of REEFS) assert.ok(Math.hypot(x - reef.x, z - reef.z) > reef.radius + orbit.radius + 1.5, `${key} reef ${reef.key} at ${t}`);
      assert.ok(Math.hypot(x, z) > orbit.entryDistance, `${key} start at ${t}`);
      assert.ok(y >= 3 && y < OCEAN_SURFACE_HEIGHT - 2, `${key} height at ${t}`);
      assert.ok(Math.hypot(x, z) + orbit.radius < STEERING.areaRadius, `${key} edge at ${t}`);
    }
  }
  for (const a of ANIMALS) for (const b of ANIMALS) {
    if (a.key >= b.key) continue;
    assert.ok(Math.hypot(a.loop.x - b.loop.x, a.loop.z - b.loop.z) > a.loop.radius + b.loop.radius + 2, `${a.key} and ${b.key} overlap`);
  }
  assert.ok(REEF_ORBIT.radius > 0);
});

test('animals are spread evenly: every spot in the ocean has one nearby', () => {
  for (let x = -80; x <= 80; x += 20) for (let z = -80; z <= 80; z += 20) {
    if (Math.hypot(x, z) > 85) continue;
    const nearest = Math.min(...ANIMALS.map(({ loop }) => Math.hypot(loop.x - x, loop.z - z)));
    assert.ok(nearest < 36, `nothing within 36 of ${x},${z} (nearest ${nearest.toFixed(1)})`);
  }
});

test('extra animals vary in size, height, speed and direction', () => {
  const extras = ANIMALS.filter(animal => animal.id === 'parrotfish').slice(1);
  assert.ok(new Set(extras.map(animal => animal.loop.lapSeconds.toFixed(1))).size > 6);
  assert.ok(new Set(extras.map(animal => animal.loop.height.toFixed(1))).size > 4);
  assert.ok(extras.some(animal => animal.loop.direction === -1) && extras.some(animal => animal.loop.direction === 1));
});

test('every animal swims one lap in its lap time, facing where it goes', () => {
  for (const { key: id, loop } of ANIMALS) {
    const start = loopPose(loop, 0), lap = loopPose(loop, loop.lapSeconds);
    assert.ok(Math.hypot(start.x - lap.x, start.y - lap.y, start.z - lap.z) < 1e-9, id);
    const a = loopPose(loop, 1), b = loopPose(loop, 1.01);
    const travel = Math.atan2(b.x - a.x, b.z - a.z), facing = Math.atan2(-Math.sin(a.heading), -Math.cos(a.heading));
    assert.ok(Math.abs(Math.atan2(Math.sin(travel - facing), Math.cos(travel - facing))) < 0.02, id);
  }
});

test('each animal is orbited at a size that suits it', () => {
  for (const { key, orbit, radius } of firstOfEach()) {
    assert.ok(orbit.radius > radius + 1.2, `${key} orbit clears the animal`);
    assert.ok(orbit.faceTravel, key);
  }
  const whale = ANIMALS.find(animal => animal.key === 'humpback-whale');
  const puffer = ANIMALS.find(animal => animal.key === 'porcupinefish');
  assert.ok(whale.radius > 3 * puffer.radius && whale.orbit.radius > 2 * puffer.orbit.radius);
});
