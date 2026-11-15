import test from 'node:test';
import assert from 'node:assert/strict';
import { JOURNEY_LEG, JOURNEY_STOPS, journeyAt } from './spaceArithmeticJourney.js';

test('every leg of right answers reaches the next planet, then the tour goes round again', () => {
  assert.deepEqual(journeyAt(0), { reached: null, next: 'Mercury', progress: 0 });
  assert.deepEqual(journeyAt(JOURNEY_LEG - 1), { reached: null, next: 'Mercury', progress: JOURNEY_LEG - 1 });
  assert.deepEqual(journeyAt(JOURNEY_LEG), { reached: 'Mercury', next: 'Venus', progress: 0 });
  assert.equal(journeyAt(JOURNEY_LEG * JOURNEY_STOPS.length).reached, 'Neptune');
  assert.equal(journeyAt(JOURNEY_LEG * JOURNEY_STOPS.length).next, 'Mercury');
  assert.deepEqual(journeyAt(-3), journeyAt(0)); assert.deepEqual(journeyAt(NaN), journeyAt(0));
});
