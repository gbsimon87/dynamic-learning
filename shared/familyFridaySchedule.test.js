import test from 'node:test';
import assert from 'node:assert/strict';
import { editionIndex, editionLabel, editionPath, isFamilyFriday, isPublishedEdition, latestFriday, londonDay, publishedFridays } from './familyFridaySchedule.js';

test('Friday promotion follows UK midnight in winter and summer, wherever the visitor is', () => {
  for (const [instant, expected] of [
    ['2026-11-12T23:59:59Z', false], ['2026-11-13T00:00:00Z', true],
    ['2026-11-13T23:59:59Z', true], ['2026-11-14T00:00:00Z', false],
    ['2027-06-03T22:59:59Z', false], ['2027-06-03T23:00:00Z', true],
    ['2027-06-04T22:59:59Z', true], ['2027-06-04T23:00:00Z', false],
  ]) assert.equal(isFamilyFriday(new Date(instant)), expected, instant);
  assert.equal(londonDay(new Date('2027-06-03T23:30:00Z')), '2027-06-04');
});

test('latest edition remains available all week and rolls forward only on Friday', () => {
  assert.equal(latestFriday(new Date('2026-11-12T12:00Z')), null);
  assert.equal(latestFriday(new Date('2026-11-19T23:59Z')), '2026-11-13');
  assert.equal(latestFriday(new Date('2026-11-20T00:00Z')), '2026-11-20');
  assert.deepEqual(publishedFridays(new Date('2026-11-27T12:00Z')), ['2026-11-27', '2026-11-20', '2026-11-13']);
  assert.deepEqual(publishedFridays(new Date('2026-11-12T12:00Z')), []);
  assert.equal(publishedFridays(new Date('2027-06-04T12:00Z'), 8).length, 8);
});

test('rejects malformed, impossible, pre-launch, non-Friday and unpublished dates', () => {
  const now = new Date('2026-11-20T12:00Z');
  for (const week of ['', null, 'hello', '2026-11-6', '2026-02-30', '2026-11-06', '2026-11-14', '2026-11-27', '<script>']) {
    assert.equal(isPublishedEdition(week, now), false, String(week));
  }
  assert.equal(isPublishedEdition('2026-11-13', now), true);
  assert.equal(editionIndex('2026-11-13'), 0);
  assert.equal(editionIndex('2026-11-27'), 2);
  assert.equal(editionPath('2026-11-13'), '/skills/family-friday?week=2026-11-13');
  assert.equal(editionLabel('2026-11-13'), '13 November 2026');
});
