import { isProgressData } from "../../shared/progressData.js";

/** Only an explicit missing document means a fresh learner. */
export async function readProgress(store, childId, year, subject) {
  const key = JSON.stringify([childId, Number(year), subject]);
  // Navigation can unmount the hook while its last write is failing. Retain
  // that snapshot here and retry it before a remount reads older saved work.
  while (pending.has(key)) await pending.get(key);
  if (unsaved.has(key)) {
    await saveProgressInOrder(store, childId, year, subject, unsaved.get(key));
  }
  const doc = await store.getProgress(childId, year, subject);
  if (doc === null) return {};
  if (!doc || !isProgressData(doc.data)) {
    throw new Error("INVALID_PROGRESS");
  }
  return doc.data;
}

// Shared across hook instances/remounts. An older in-flight write must finish
// before a newer snapshot of the same document is sent to the store.
const pending = new Map();
const unsaved = new Map();
export function saveProgressInOrder(store, childId, year, subject, data) {
  if (!isProgressData(data)) return Promise.reject(new Error("INVALID_PROGRESS"));
  const key = JSON.stringify([childId, Number(year), subject]);
  unsaved.set(key, data);
  const previous = pending.get(key) ?? Promise.resolve();
  const write = previous.then(() => store.saveProgress(childId, year, subject, data)).then((doc) => {
    if (unsaved.get(key) === data) unsaved.delete(key);
    return doc;
  });
  const tail = write.catch(() => {});
  pending.set(key, tail);
  void tail.then(() => { if (pending.get(key) === tail) pending.delete(key); });
  return write;
}
