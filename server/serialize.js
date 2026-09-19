/** Mongo documents → JSON the client may see. */
import { readAccountType } from "../shared/accountTypes.js";

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
  // Accounts created before `accountType` existed have no such field, and all of
  // them are grown-ups'. Resolved here so the client never sees `undefined` and
  // no consumer has to treat it as a third kind of account. `ageBand` needs no
  // such treatment: absent and null both correctly mean "not a learner".
  return withStringId({ ...rest, accountType: readAccountType(rest) });
}

export function publicChild(child) {
  if (!child) return null;
  return { ...withStringId(child), parentId: String(child.parentId) };
}

export function publicProgress(doc) {
  if (!doc) return null;
  return { ...withStringId(doc), childId: String(doc.childId), year: Number(doc.year) };
}

export function publicRewards(doc) {
  if (!doc) return null;
  return { ...withStringId(doc), childId: String(doc.childId) };
}
