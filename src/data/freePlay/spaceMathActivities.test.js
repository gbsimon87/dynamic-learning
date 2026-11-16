import test from 'node:test';
import assert from 'node:assert/strict';
import { collectionAccepts, collectionWave, createSpaceActivityState, makeSpaceActivity, reduceSpaceActivity } from './spaceMathActivities.js';

const start = activity => reduceSpaceActivity(createSpaceActivityState(), { type: 'START', activity });
const send = (s, type, extra = {}) => reduceSpaceActivity(s, { type, roundId: s.roundId, ...extra });

test('every generated activity is solvable with the visible controls, at both ranges and RNG boundaries', () => {
  for (const limit of [10, 20]) for (let i = 0; i <= 100; i++) {
    const rng = () => Math.min(i / 100, .999999999);
    const collect = makeSpaceActivity('collect', limit, rng);
    assert.ok(collect.target >= 6 && collect.target <= limit);
    const balance = makeSpaceActivity('balance', limit, rng);
    assert.ok(balance.a > 0 && balance.b > 0 && balance.a + balance.b <= limit);
    assert.ok(balance.a + balance.b - balance.base > 0 && balance.a + balance.b - balance.base <= limit);
    const share = makeSpaceActivity('share', limit, rng);
    assert.ok(share.aliens >= 2 && share.aliens <= 4 && share.total <= limit);
    assert.equal(share.total % share.aliens, 0);
  }
});

test('collector accepts different combinations, rejects overshoots, and scores docking only once', () => {
  for (const values of [[2, 3, 4], [4, 4, 1], [3, 3, 3]]) {
    let s = start({ kind: 'collect', target: 9 });
    for (const value of values) {
      const previous = s;
      const wave = collectionWave(s.activity, s.cargo);
      assert.equal(collectionAccepts(wave, value), true);
      s = send(s, 'COLLECT', { lane: value - 1 });
      assert.equal(reduceSpaceActivity(s, { type: 'COLLECT', lane: value - 1, roundId: previous.roundId }), s);
    }
    assert.equal(s.solved, 0);
    s = send(s, 'CHECK');
    assert.equal(s.solved, 1);
    assert.equal(send(s, 'CHECK'), s);
  }
  let s = start({ kind: 'collect', target: 6 });
  s = send(s, 'CHECK'); assert.equal(s.solved, 0);
  s = send(s, 'COLLECT', { lane: 3 });
  const wave = collectionWave(s.activity, s.cargo);
  assert.equal(collectionAccepts(wave, 3), false);
  s = send(s, 'COLLECT', { lane: 2 });
  assert.deepEqual(s.cargo, [4]); assert.equal(s.result.correct, false);
  s = send(s, 'UNDO'); assert.deepEqual(s.cargo, []);
});

test('balance checks both expressions, allows removal, and resets manipulative state for the next activity', () => {
  let s = start({ kind: 'balance', a: 4, b: 3, base: 5, limit: 10 });
  s = send(s, 'CHECK'); assert.equal(s.result.correct, false);
  for (let i = 0; i < 3; i++) s = send(s, 'CARGO', { delta: 1 });
  s = send(s, 'CARGO', { delta: -1 });
  s = send(s, 'CHECK'); assert.equal(s.solved, 1); assert.equal(s.result.firstTry, false);
  s = reduceSpaceActivity(s, { type: 'NEXT', activity: { kind: 'share', aliens: 3, total: 6 } });
  assert.deepEqual(s.cargo, []); assert.deepEqual(s.loads, [0, 0, 0]);
  assert.equal(s.result, null); assert.equal(s.hadMiss, false); assert.equal(s.solved, 1);
});

test('sharing preserves every crystal, rejects unequal and incomplete groups, and supports correction', () => {
  let s = start({ kind: 'share', aliens: 3, total: 6 });
  s = send(s, 'CHECK'); assert.equal(s.solved, 0);
  for (let i = 0; i < 6; i++) s = send(s, 'SHARE', { alien: 0, delta: 1 });
  assert.equal(send(s, 'SHARE', { alien: 1, delta: 1 }), s);
  s = send(s, 'CHECK'); assert.equal(s.solved, 0);
  for (const alien of [1, 1, 2, 2]) {
    s = send(s, 'SHARE', { alien: 0, delta: -1 });
    s = send(s, 'SHARE', { alien, delta: 1 });
  }
  assert.deepEqual(s.loads, [2, 2, 2]);
  s = send(s, 'CHECK'); assert.equal(s.solved, 1);
});

test('paused/help states reject answers; stale and invalid events cannot change cargo or allocations', () => {
  let s = start({ kind: 'collect', target: 9 });
  for (const lane of [-1, 4, NaN, .5]) assert.equal(send(s, 'COLLECT', { lane }), s);
  assert.equal(reduceSpaceActivity(s, { type: 'COLLECT', roundId: 0, lane: 1 }), s);
  s = send(s, 'HELP'); assert.equal(send(s, 'COLLECT', { lane: 1 }), s);
  s = reduceSpaceActivity(s, { type: 'PAUSE' }); assert.equal(send(s, 'HELP'), s);
  s = reduceSpaceActivity(s, { type: 'RESUME' }); s = send(s, 'HELP');
  assert.equal(s.assisted, true);
  s = send(s, 'COLLECT', { lane: 0 }); s = send(s, 'RESET'); assert.deepEqual(s.cargo, []);
});
