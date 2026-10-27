import test from 'node:test';
import assert from 'node:assert/strict';
import { FLIGHT_CLUES, FLIGHT_BADGES, FLIGHT_CHAPTERS, createFlightRound, flightRoundReducer, flightTargetGap, flightArrivalMargin } from './flightClues.js';
import { moonFacts } from './moonFacts.js';

const STEPS = FLIGHT_CLUES.flatMap(c => c.then ? [c, c.then] : [c]);
test('29 distinct clues and their second steps cover real scene planets, moons, a satellite, belt, comet and asteroids', () => {
  assert.equal(FLIGHT_CLUES.length, 29);
  assert.equal(new Set(STEPS.map(c => c.id)).size, STEPS.length);
  const ids = new Set(['Sun', 'Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'ISS', 'asteroid-belt', 'halleys-comet', 'Ceres', 'Vesta', 'Psyche', 'Bennu', ...Object.keys(moonFacts)]);
  for (const clue of STEPS) {
    assert.ok(ids.has(clue.target), clue.target);
    assert.ok(clue.clue && clue.hint && clue.fact);
  }
  assert.ok(FLIGHT_CLUES.filter(c => c.then).length >= 4, 'at least four two-step clues');
  for (const id of ['Earth/Moon', 'Mars/Phobos', 'ISS', 'asteroid-belt', 'halleys-comet']) assert.ok(FLIGHT_CLUES.some(c => c.target === id));
});
test('decks shuffle without repeats or consecutive destinations', () => {
  let seed = 12345;
  const random = () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646; };
  const orders = new Set();
  for (let i = 0; i < 200; i++) {
    const round = createFlightRound(random);
    assert.equal(new Set(round.deck.map(c => c.id)).size, STEPS.length);
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
test('a full adventure earns each milestone once and every discovery', () => {
  let round = createFlightRound(() => .999);
  const earnedBadges = [];
  for (let i = 0; i < STEPS.length; i++) {
    const clue = round.deck[round.index];
    round = flightRoundReducer(round, { type: 'arrive', token: clue.id, target: clue.target });
    earnedBadges.push(...FLIGHT_BADGES.filter(b => b.stars === round.earned.length).map(b => b.name));
    round = flightRoundReducer(round, { type: 'next' });
  }
  assert.equal(round.earned.length, STEPS.length);
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

test('home chapters use every clue, and each chapter is a real adventure', () => {
  const used = new Set(FLIGHT_CHAPTERS.flatMap(c => c.clueIds));
  assert.deepEqual([...used].sort(), FLIGHT_CLUES.map(c => c.id).sort());
  for (const chapter of FLIGHT_CHAPTERS) {
    assert.ok(chapter.name && chapter.icon && chapter.promise, chapter.id);
    const finds = chapter.clueIds.map(id => FLIGHT_CLUES.find(c => c.id === id)).reduce((n, c) => n + (c.then ? 2 : 1), 0);
    assert.ok(finds >= 5, `${chapter.id} has ${finds} finds`);
  }
  assert.match(FLIGHT_CHAPTERS.find(c => c.id === 'belt').honesty, /mostly empty space/);
});

test('about half the clues ask a question, and every answer is taught by that clue’s fact', () => {
  const asking = STEPS.filter(c => c.question);
  assert.ok(asking.length >= FLIGHT_CLUES.length / 2, `${asking.length} questions`);
  for (const { id, fact, question } of asking) {
    assert.ok(question.text && question.why, id);
    assert.ok(question.options.length >= 2 && question.options.length <= 3, id);
    assert.ok(question.options.includes(question.answer), id);
    const words = question.answer.toLowerCase().match(/[a-z]{3,}/g) ?? [];
    assert.ok(words.some(w => fact.toLowerCase().includes(w.slice(0, 4))), `${id}: "${question.answer}" is not in its fact`);
  }
});
