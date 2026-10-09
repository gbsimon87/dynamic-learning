/** Compare-and-swap prevents two read/merge writers replacing each other.
 * Unique indexes arbitrate simultaneous first inserts. Never delete data.
 */
export async function saveLearning(collection, key, merge, { writeId, schemaVersion = 1 } = {}) {
  for (let attempt = 0; attempt < 20; attempt++) {
    const current = await collection.findOne(key);
    if (current?.revision !== undefined && (!Number.isSafeInteger(current.revision) || current.revision < 0)) {
      throw new Error("INVALID_LEARNING_REVISION");
    }
    if (writeId && current?.writeIds?.includes(writeId)) return current;
    const now = new Date().toISOString();
    const fields = {
      ...key, schemaVersion, data: merge(current), updatedAt: now,
      revision: (current?.revision ?? 0) + 1,
      ...(writeId ? { writeIds: [...(current?.writeIds ?? []), writeId].slice(-128) } : {}),
    };
    if (current) {
      const doc = await collection.findOneAndUpdate(
        { _id: current._id, revision: current.revision ?? { $exists: false } },
        { $set: fields }, { returnDocument: "after" }
      );
      if (doc) return doc;
    } else {
      const doc = { ...fields, createdAt: now };
      try {
        const { insertedId } = await collection.insertOne(doc);
        return { ...doc, _id: insertedId };
      } catch (err) {
        if (err.code !== 11000) throw err;
      }
    }
  }
  throw new Error("LEARNING_WRITE_BUSY");
}
