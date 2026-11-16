import test from 'node:test';
import assert from 'node:assert/strict';
import { RECORDS_KEY, loadBestStreaks, saveBestStreaks, withStreak } from './spaceArithmeticRecords.js';

const memory = () => { const map = new Map(); return { map, getItem: k => map.get(k) ?? null, setItem: (k, v) => map.set(k, v) }; };

test('best streaks round-trip under one key, keeping only known question sets and whole positive numbers', () => {
  const storage = memory();
  assert.deepEqual(loadBestStreaks(storage), {});
  assert.equal(saveBestStreaks({ bonds: 4, blaster: 7, nope: 9, skip: 2.5 }, storage), true);
  assert.deepEqual([...storage.map.keys()], [RECORDS_KEY]);
  assert.deepEqual(loadBestStreaks(storage), { bonds: 4, blaster: 7 });
});

test('bests from the retired ring missions carry over to Sums (the highest wins)', () => {
  const storage = memory();
  storage.map.set(RECORDS_KEY, JSON.stringify({ version: 1, bestStreak: { free: 4, meteor: 9, blaster: 6, comet: 0, delivery: 3, skip: 2 } }));
  assert.deepEqual(loadBestStreaks(storage), { blaster: 9, skip: 2 });
  for (const bad of ['not json', '{"version":2,"bestStreak":{"free":3}}', 'null', '{"version":1}']) {
    storage.map.set(RECORDS_KEY, bad); assert.deepEqual(loadBestStreaks(storage), {}, bad);
  }
});

test('blocked storage never throws', () => {
  const blocked = { getItem() { throw new Error('blocked'); }, setItem() { throw new Error('blocked'); } };
  assert.deepEqual(loadBestStreaks(blocked), {});
  assert.equal(saveBestStreaks({ free: 3 }, blocked), false);
});

test('a record only goes up', () => {
  const best = { blaster: 5 };
  assert.equal(withStreak(best, 'blaster', 4), best);
  assert.equal(withStreak(best, 'blaster', 5), best);
  assert.deepEqual(withStreak(best, 'blaster', 6), { blaster: 6 });
  assert.deepEqual(withStreak(best, 'skip', 1), { blaster: 5, skip: 1 });
});
