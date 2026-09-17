/**
 * Authentication and — the part that actually matters — authorization.
 *
 * The rule: a signed-in parent may only ever touch documents that belong to
 * them. That is enforced by making ownership part of the *query filter*, never
 * by fetching a document and then checking it. A child is looked up as
 * `{_id, parentId}`; someone else's id simply does not match, and the handler
 * can never see the document at all.
 *
 * Another family's resource returns 404, not 403, so ids cannot be probed:
 * "not yours" and "does not exist" are indistinguishable from outside.
 */
import { ObjectId } from "mongodb";
import * as db from "./db.js";
import { COOKIE_NAME, verifySession } from "./auth.js";

/** @returns {ObjectId|null} — null for any string that is not a valid id. */
export function toObjectId(value) {
  try {
    return ObjectId.isValid(value) ? new ObjectId(String(value)) : null;
  } catch {
    return null;
  }
}

/** Requires a valid session cookie AND an existing parent. Sets `req.parent`. */
export async function requireAuth(req, res, next) {
  const parentId = verifySession(req.cookies?.[COOKIE_NAME]);
  const _id = parentId && toObjectId(parentId);
  if (!_id) return res.status(401).json({ error: "NOT_SIGNED_IN" });

  try {
    const parent = await db.parents().findOne({ _id });
    if (!parent) return res.status(401).json({ error: "NOT_SIGNED_IN" });
    req.parent = parent;
    return next();
  } catch (err) {
    return next(err);
  }
}

/**
 * Resolves `:childId` to a child owned by `req.parent`, or 404s.
 * Must run after `requireAuth`. Sets `req.child`.
 */
export async function requireOwnedChild(req, res, next) {
  const _id = toObjectId(req.params.childId);
  // An unparseable id is treated exactly like someone else's id.
  if (!_id) return res.status(404).json({ error: "CHILD_NOT_FOUND" });

  try {
    // Ownership is in the filter — a child of another parent never matches.
    const child = await db.children().findOne({ _id, parentId: req.parent._id });
    if (!child) return res.status(404).json({ error: "CHILD_NOT_FOUND" });
    req.child = child;
    return next();
  } catch (err) {
    return next(err);
  }
}
