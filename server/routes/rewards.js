/**
 * /api/rewards/:childId
 *
 * `requireOwnedChild` resolves `:childId` against the signed-in parent before
 * any handler runs, so another family's rewards are unreachable — and
 * indistinguishable from a child that does not exist.
 *
 * One document per child, NOT per year+subject like progress: a badge belongs
 * to the learner across every year they ever study.
 */
import { Router } from "express";
import * as db from "../db.js";
import { requireAuth, requireOwnedChild } from "../middleware.js";
import { publicRewards } from "../serialize.js";

const router = Router();
router.use(requireAuth);

router.get("/:childId", requireOwnedChild, async (req, res, next) => {
  try {
    const doc = await db.rewards().findOne({ childId: req.child._id });
    return res.json({ rewards: publicRewards(doc) });
  } catch (err) {
    return next(err);
  }
});

router.put("/:childId", requireOwnedChild, async (req, res, next) => {
  try {
    const now = new Date().toISOString();
    // Upsert on childId: saving twice never creates a second document.
    // `createdAt` is only written on insert, so it survives every update.
    const doc = await db.rewards().findOneAndUpdate(
      { childId: req.child._id },
      {
        $set: {
          childId: req.child._id,
          schemaVersion: 1,
          data: req.body?.data ?? {},
          updatedAt: now,
        },
        $setOnInsert: { createdAt: now },
      },
      { upsert: true, returnDocument: "after" }
    );
    return res.json({ rewards: publicRewards(doc) });
  } catch (err) {
    return next(err);
  }
});

export default router;
