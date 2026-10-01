import { isRewardsData } from "../../shared/rewardsData.js";

// Survives profile changes within this app session, without adding storage keys.
const pending = new Map();
const unsaved = new Map();

export function saveRewardsInOrder(store, childId, data) {
  if (!isRewardsData(data)) return Promise.reject(new Error("INVALID_REWARDS"));
  unsaved.set(childId, data);
  const previous = pending.get(childId) ?? Promise.resolve();
  const write = previous.then(() => store.saveRewards(childId, data)).then((doc) => {
    if (unsaved.get(childId) === data) unsaved.delete(childId);
    return doc;
  });
  const tail = write.catch(() => {});
  pending.set(childId, tail);
  void tail.then(() => { if (pending.get(childId) === tail) pending.delete(childId); });
  return write;
}

export async function readRewards(store, childId) {
  while (pending.has(childId)) await pending.get(childId);
  if (unsaved.has(childId)) await saveRewardsInOrder(store, childId, unsaved.get(childId));
  const doc = await store.getRewards(childId);
  if (doc !== null && !isRewardsData(doc?.data)) throw new Error("INVALID_REWARDS");
  return doc;
}
