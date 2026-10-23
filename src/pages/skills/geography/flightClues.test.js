import test from 'node:test';
import assert from 'node:assert/strict';
import { FLIGHT_CLUES, FLIGHT_BADGES, createFlightRound, flightRoundReducer, flightTargetGap, flightArrivalMargin } from './flightClues.js';
import { moonFacts } from './moonFacts.js';

test('25 distinct clues cover real scene planets, moons, a satellite, belt and comet', () => {
  assert.equal(FLIGHT_CLUES.length, 25);
  assert.equal(new Set(FLIGHT_CLUES.map(c => c.id)).size, 25);
  const ids = new Set(['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'ISS', 'asteroid-belt', 'halleys-comet', ...Object.keys(moonFacts)]);
  for (const clue of FLIGHT_CLUES) {
    assert.ok(ids.has(clue.target), clue.target);
    assert.ok(clue.clue && clue.hint && clue.fact);
  }
  for (const id of ['Earth/Moon', 'Mars/Phobos', 'ISS', 'asteroid-belt', 'halleys-comet']) assert.ok(FLIGHT_CLUES.some(c => c.target === id));
});
test('decks shuffle without repeats or consecutive destinations', () => {
  let seed = 12345;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const orders = new Set();
  for (let i = 0; i < 200; i++) {
    const round = createFlightRound(random);
    assert.equal(new Set(round.deck.map(c => c.id)).size, FLIGHT_CLUES.length);
    for (let j = 1; j < round.deck.length; j++) assert.notEqual(round.deck[j].target, round.deck[j - 1].target);
    orders.add(round.deck.map(c => c.id).join(','));
  }
  assert.ok(orders.size > 190);
});
test('only a matching current arrival earns one star; skips, duplicate and stale events cannot farm rewards', () => {
  let round = createFlightRound(() => .999);
  const clue = round.deck[0];
  assert.equal(flightRoundReducer(round, { type: 'arrive', token: clue.id, target: 'Venus' }), round);
  assert.equal(flightRoundReducer(round, { type: 'arrive', token: 'old-clue', target: clue.target }), round);
  round = flightRoundReducer(round, { type: 'arrive', token: clue.id, target: clue.target });
  assert.equal(round.earned.length, 1); assert.equal(round.solved, true);
  assert.equal(flightRoundReducer(round, { type: 'arrive', token: clue.id, target: clue.target }), round);
  round = flightRoundReducer(round, { type: 'next' });
  assert.equal(round.solved, false); assert.equal(round.earned.length, 1);
  assert.equal(flightRoundReducer(round, { type: 'arrive', token: clue.id, target: clue.target }), round);
  for (; round.index < round.deck.length - 1;) round = flightRoundReducer(round, { type: 'next' });
  assert.equal(round.earned.length, 1);
  assert.equal(flightRoundReducer(round, { type: 'next' }), round);
  round = flightRoundReducer(round, { type: 'restart', round: createFlightRound(() => 0) });
  assert.equal(round.earned.length, 0); assert.equal(round.index, 0);
});
test('a full adventure earns each milestone once and all 25 discoveries', () => {
  let round = createFlightRound(() => .999);
  const earnedBadges = [];
  for (let i = 0; i < FLIGHT_CLUES.length; i++) {
    const clue = round.deck[round.index];
    round = flightRoundReducer(round, { type: 'arrive', token: clue.id, target: clue.target });
    earnedBadges.push(...FLIGHT_BADGES.filter(b => b.stars === round.earned.length).map(b => b.name));
    round = flightRoundReducer(round, { type: 'next' });
  }
  assert.equal(round.earned.length, 25);
  assert.deepEqual(earnedBadges, FLIGHT_BADGES.map(b => b.name));
});
test('belt arrivals check the annulus and height, not the Sun or a point in its centre', () => {
  const belt = { kind: 'belt', getRegion: () => ({ innerRadius: 47, outerRadius: 118, halfHeight: 7 }) };
  assert.equal(flightTargetGap(belt, { x: 0, y: 0, z: 0 }), 47);
  assert.equal(flightTargetGap(belt, { x: 60, y: 3, z: 0 }), 0);
  assert.equal(flightTargetGap(belt, { x: -60, y: 0, z: 0 }), 0);
  assert.ok(flightTargetGap(belt, { x: 60, y: 20, z: 0 }) > flightArrivalMargin(belt));
  assert.ok(flightTargetGap(belt, { x: 130, y: 0, z: 0 }) > flightArrivalMargin(belt));
});
