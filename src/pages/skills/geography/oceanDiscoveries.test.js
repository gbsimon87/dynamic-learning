import test from 'node:test';
import assert from 'node:assert/strict';
import { validateDiscovery } from '../../../components/worlds/discovery.js';
import { FISH_DISCOVERY, FISH_ORBIT, OCEAN_DISCOVERIES, REEF_DISCOVERY, REEF_ORBIT } from './oceanDiscoveries.js';

test('the reef card is complete, sourced and opens with one sentence', () => {
  assert.deepEqual(validateDiscovery(REEF_DISCOVERY), []);
  assert.equal(REEF_DISCOVERY.name, 'Coral reef');
  assert.equal(REEF_DISCOVERY.eyebrow, 'Habitat');
  assert.ok(REEF_DISCOVERY.sources.length > 0 && REEF_DISCOVERY.sources.every(url => url.startsWith('https://')));
  assert.equal(REEF_DISCOVERY.summary.match(/[.!?]/g).length, 1);
});

test('the reef is orbited level, wider than its footprint', () => {
  assert.equal(REEF_ORBIT.level, true);
  assert.ok(REEF_ORBIT.radius > 3 && REEF_ORBIT.entryDistance > REEF_ORBIT.radius);
});

test('the parrotfish card is complete, sourced and opens with one sentence', () => {
  assert.deepEqual(validateDiscovery(FISH_DISCOVERY), []);
  assert.equal(FISH_DISCOVERY.name, 'Parrotfish');
  assert.equal(FISH_DISCOVERY.eyebrow, 'Sea life');
  assert.equal(FISH_DISCOVERY.factsNoun, 'parrotfish');
  assert.ok(FISH_DISCOVERY.sources.length > 0 && FISH_DISCOVERY.sources.every(url => url.startsWith('https://')));
  assert.equal(FISH_DISCOVERY.summary.match(/[.!?]/g).length, 1);
  assert.ok(OCEAN_DISCOVERIES.includes(FISH_DISCOVERY));
});

test('the fish is orbited closer than the reef', () => {
  assert.equal(FISH_ORBIT.level, true);
  assert.ok(FISH_ORBIT.radius < REEF_ORBIT.radius && FISH_ORBIT.entryDistance > FISH_ORBIT.radius);
});
