import { test } from 'node:test';
import assert from 'node:assert/strict';
import { MISSIONS, MISSION_KEY, missionMatches, loadMissionStamps, saveMissionStamps } from './solarMissions.js';
test('missions match the intended world, including moon parent identity', () => {
  for (const mission of MISSIONS) {
    assert.equal(missionMatches(mission, { name: mission.target, parentName: mission.parent }), true);
    assert.equal(missionMatches(mission, { name: 'wrong' }), false);
    assert.equal(missionMatches(mission, null), false);
    if (mission.parent) assert.equal(missionMatches(mission, { name: mission.target, parentName: 'wrong' }), false);
  }
});
test('separate versioned stamps round-trip with no duplicates or unknown IDs', () => {
  const map = new Map(); const storage = { getItem: k => map.get(k), setItem: (k,v) => map.set(k,v) };
  assert.deepEqual(loadMissionStamps(storage), []);
  assert.equal(saveMissionStamps(['red','red','unknown','rings'], storage), true);
  assert.deepEqual(loadMissionStamps(storage), ['red','rings']);
  assert.deepEqual([...map.keys()], [MISSION_KEY]);
  for (const invalid of ['{', 'null', '{"version":2,"completed":["red"]}', '{"version":1,"completed":{}}']) {
    map.set(MISSION_KEY, invalid); assert.deepEqual(loadMissionStamps(storage), []);
  }
  const blocked = { getItem() { throw Error('blocked'); }, setItem() { throw Error('full'); } };
  assert.deepEqual(loadMissionStamps(blocked), []);
  assert.equal(saveMissionStamps(['red'], blocked), false);
});
