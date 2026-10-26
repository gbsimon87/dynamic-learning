import test from 'node:test';
import assert from 'node:assert/strict';
import { GALAXIES, MAP_LEVELS, mapCatalogue, mapDistance } from './galaxyMapData.js';
import { SYSTEM_REGISTRY } from './systems/registry.js';
import { positionLy } from './systems/systemMath.js';
import { availableDestinations } from './beyondDestinations.js';
import { TEST_SYSTEM } from './systems/fixtures/testSystem.js';

const length = (p) => Math.hypot(p.x, p.y, p.z);

test('the map has three levels, from galaxies down to our neighbourhood', () => {
  assert.deepEqual(MAP_LEVELS, ['galaxies', 'milky-way', 'neighbourhood']);
});

test('only the Milky Way can be entered', () => {
  const { galaxies } = mapCatalogue(SYSTEM_REGISTRY, availableDestinations());
  assert.deepEqual(galaxies.filter((g) => g.enterable).map((g) => g.id), ['milky-way']);
  for (const g of galaxies.filter((g) => !g.enterable)) {
    assert.equal(g.look, 'dont-land', g.id);
    assert.ok(g.card.what && g.card.fact, g.id);
  }
  assert.equal(GALAXIES.length, 5);
});

test('Andromeda is farther on the map than the Magellanic Clouds', () => {
  const { galaxies } = mapCatalogue(SYSTEM_REGISTRY, availableDestinations());
  const at = (id) => length(galaxies.find((g) => g.id === id).position);
  assert.ok(at('andromeda') > at('large-magellanic-cloud'));
  assert.ok(at('andromeda') > at('small-magellanic-cloud'));
  assert.ok(at('small-magellanic-cloud') > at('large-magellanic-cloud'));
  assert.equal(at('milky-way'), 0);
  assert.ok(Math.abs(mapDistance(2.5e6) - 40 * Math.log10(250)) < 1e-9);
});

test('Space ripples is an event on the galaxies level', () => {
  const { events, galaxies } = mapCatalogue(SYSTEM_REGISTRY, availableDestinations());
  assert.deepEqual(events.map((e) => e.id), ['space-ripples']);
  const [ripples] = events;
  assert.equal(ripples.level, 'galaxies');
  assert.equal(ripples.label, 'Far beyond our galaxy');
  assert.ok(length(ripples.position) > Math.max(...galaxies.map((g) => length(g.position))), 'farther than every galaxy shown');
});

test('every registered system appears in the neighbourhood at its real position', () => {
  const { systems } = mapCatalogue(SYSTEM_REGISTRY, availableDestinations());
  assert.deepEqual(systems.map((s) => s.id), SYSTEM_REGISTRY.map((e) => e.id));
  for (const s of systems) {
    const real = positionLy(SYSTEM_REGISTRY.find((e) => e.id === s.id).position);
    assert.deepEqual(s.position, real, s.id);
    assert.equal(s.level, 'neighbourhood');
  }
  const t1 = systems.find((s) => s.id === 'trappist-1');
  assert.ok(Math.abs(length(t1.position) - 40.66) < 1e-9);
  assert.equal(t1.mapCard.planetCount, 7);
});

test('adding the test system adds a marker without code changes', () => {
  const registry = [...SYSTEM_REGISTRY, { ...TEST_SYSTEM, load: () => Promise.resolve(TEST_SYSTEM) }];
  const { systems } = mapCatalogue(registry, availableDestinations());
  assert.ok(systems.some((s) => s.id === TEST_SYSTEM.id && s.name === TEST_SYSTEM.name));
});

test('markers that would sit on top of each other are spread apart so each can be tapped', async () => {
  const { spreadMarkers } = await import('./galaxyMapData.js');
  const out = spreadMarkers([
    { id: 'andromeda', x: 250, y: 330, visible: true },
    { id: 'triangulum', x: 255, y: 342, visible: true },
    { id: 'milky-way', x: 195, y: 420, visible: true },
    { id: 'hidden', x: 252, y: 335, visible: false },
  ], 52);
  const at = (id) => out.find((m) => m.id === id);
  const gap = (a, b) => Math.hypot(at(a).x - at(b).x, at(a).y - at(b).y);
  assert.ok(gap('andromeda', 'triangulum') >= 52 - 1e-9);
  assert.ok(gap('andromeda', 'milky-way') >= 52 - 1e-9 && gap('triangulum', 'milky-way') >= 52 - 1e-9);
  assert.deepEqual([at('andromeda').x, at('andromeda').y], [250, 330], 'the first marker stays put');
  assert.deepEqual([at('hidden').x, at('hidden').y], [252, 335], 'hidden markers are left alone');
});
