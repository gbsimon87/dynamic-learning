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
import { isProgressData } from "../../shared/progressData.js";
import { mergeProgress, migrateProgressDocument, PROGRESS_SCHEMA_VERSION } from "../../shared/progressDocument.js";
import { saveLearning } from "../learningWrites.js";

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
    return res.json({ progress: publicProgress(migrateProgressDocument(doc)) });
  } catch (err) {
    return next(err);
  }
});

router.put("/:childId/:year/:subject", requireOwnedChild, async (req, res, next) => {
  try {
    if (!isProgressData(req.body?.data)) return res.status(400).json({ error: "INVALID_PROGRESS" });
    const filter = key(req);
    if (!filter) return res.status(400).json({ error: "INVALID_YEAR" });

    const doc = await saveLearning(db.progress(), filter, (current) =>
      mergeProgress(migrateProgressDocument(current)?.data ?? {}, req.body.data),
      { schemaVersion: PROGRESS_SCHEMA_VERSION }
    );
    return res.json({ progress: publicProgress(migrateProgressDocument(doc)) });
  } catch (err) {
    return next(err);
  }
});

export default router;
