// Laser Blast's best streaks, one per question set, kept in this browser only
// (like the Solar System's mission stamps). Not learner progress: nothing is
// sent to an account, and a missing or broken record just starts from zero.
import { MISSIONS } from './spaceMissions.js';

export const RECORDS_KEY = 'dl.spaceArithmeticRecords';
// The older ring-flight missions all asked Sums: their bests carry over to it.
const RETIRED = { free: 'blaster', meteor: 'blaster', comet: 'blaster', delivery: 'blaster' };
const valid = n => Number.isInteger(n) && n > 0;
const known = best => {
  const out = {};
  for (const [id, n] of Object.entries(best ?? {})) {
    const to = RETIRED[id] ?? id;
    if (valid(n) && MISSIONS.some(m => m.id === to)) out[to] = Math.max(out[to] ?? 0, n);
  }
  return out;
};

/** `{ [missionId]: bestStreak }`; empty when nothing is stored or storage is blocked. */
export function loadBestStreaks(storage) {
  try {
    const data = JSON.parse((storage ?? globalThis.localStorage).getItem(RECORDS_KEY));
    return data?.version === 1 ? known(data.bestStreak) : {};
  } catch { return {}; }
}
export function saveBestStreaks(best, storage) {
  try {
    (storage ?? globalThis.localStorage).setItem(RECORDS_KEY, JSON.stringify({ version: 1, bestStreak: known(best) }));
    return true;
  } catch { return false; }
}
/** The records after a streak of `streak` in `mission`: only ever goes up. */
export function withStreak(best, mission, streak) {
  return streak > (best[mission] ?? 0) ? { ...best, [mission]: streak } : best;
}
