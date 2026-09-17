/** Mongo documents → JSON the client may see. */

/** ObjectId (or anything) → plain string `_id`. */
export function withStringId(doc) {
  if (!doc) return null;
  return { ...doc, _id: String(doc._id) };
}

/**
 * Strips credential fields. `passwordHash`, `passwordSalt` and `iterations`
 * must never leave the server.
 */
export function publicParent(parent) {
  if (!parent) return null;
  // eslint-disable-next-line no-unused-vars
  const { passwordHash, passwordSalt, iterations, ...rest } = parent;
  return withStringId(rest);
}

export function publicChild(child) {
  if (!child) return null;
  return { ...withStringId(child), parentId: String(child.parentId) };
}

export function publicProgress(doc) {
  if (!doc) return null;
  return { ...withStringId(doc), childId: String(doc.childId), year: Number(doc.year) };
}
