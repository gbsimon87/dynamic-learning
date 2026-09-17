/**
 * /api/progress/:childId/:year/:subject
 *
 * `requireOwnedChild` resolves `:childId` against the signed-in parent before
 * any handler runs, so progress for another family's child is unreachable —
 * and indistinguishable from a child that does not exist.
 */
import { Router } from "express";
import * as db from "../db.js";
import { requireAuth, requireOwnedChild } from "../middleware.js";
import { publicProgress } from "../serialize.js";

const router = Router();
router.use(requireAuth);

/** `year` is stored and compared as a Number. */
function key(req) {
  const year = Number(req.params.year);
  const subject = String(req.params.subject);
  return Number.isFinite(year) ? { childId: req.child._id, year, subject } : null;
}

router.get("/:childId/:year/:subject", requireOwnedChild, async (req, res, next) => {
  try {
    const filter = key(req);
    if (!filter) return res.status(400).json({ error: "INVALID_YEAR" });
    const doc = await db.progress().findOne(filter);
    return res.json({ progress: publicProgress(doc) });
  } catch (err) {
    return next(err);
  }
});

router.put("/:childId/:year/:subject", requireOwnedChild, async (req, res, next) => {
  try {
    const filter = key(req);
    if (!filter) return res.status(400).json({ error: "INVALID_YEAR" });

    const now = new Date().toISOString();
    // Upsert on the triple: saving twice never creates a second document.
    // `createdAt` is only written on insert, so it survives every update.
    const doc = await db.progress().findOneAndUpdate(
      filter,
      {
        $set: {
          ...filter,
          schemaVersion: 1,
          data: req.body?.data ?? {},
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true, returnDocument: "after" }
    );
    return res.json({ progress: publicProgress(doc) });
  } catch (err) {
    return next(err);
  }
});

export default router;
