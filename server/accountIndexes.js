/** Convert existing nonunique indexes without dropping them or any records.
 * Duplicate accounts need owner review; never choose/delete a winner at boot.
 */
export const ACCOUNT_INDEXES = [
  { collection: "parents", key: { email: 1 } },
  { collection: "progress", key: { childId: 1, year: 1, subject: 1 } },
  { collection: "rewards", key: { childId: 1 } },
];

export async function auditAccountIndexes(database) {
  const report = [];
  for (const { collection, key } of ACCOUNT_INDEXES) {
    const docs = database.collection(collection);
    const indexes = await docs.listIndexes().toArray().catch((err) => {
      if (err.code === 26) return [];
      throw err;
    });
    const duplicates = await docs.aggregate([
      { $group: { _id: Object.fromEntries(Object.keys(key).map((field) => [field, `$${field}`])), count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
      { $count: "groups" },
    ]).toArray();
    report.push({ collection, key, indexes: indexes.map(({ name, key, unique }) => ({ name, key, unique: unique === true || name === "_id_" })), duplicateGroups: duplicates[0]?.groups ?? 0 });
  }
  return report;
}

export async function ensureAccountIndexes(database) {
  const report = await auditAccountIndexes(database);
  if (report.some((entry) => entry.duplicateGroups > 0)) throw new Error("DUPLICATE_ACCOUNT_DATA_REQUIRES_REVIEW");
  for (const { collection, key, indexes } of report) {
    const existing = indexes.find((index) => JSON.stringify(index.key) === JSON.stringify(key));
    if (existing?.unique) continue;
    if (existing) {
      await database.command({ collMod: collection, index: { name: existing.name, prepareUnique: true } });
      await database.command({ collMod: collection, index: { name: existing.name, unique: true } });
    } else {
      await database.collection(collection).createIndex(key, { unique: true });
    }
  }
}
