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
import { isRewardsData } from "../../shared/rewardsData.js";
import { mergeRewards } from "../../shared/mergeRewards.js";
import { saveLearning } from "../learningWrites.js";

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
    if (!isRewardsData(req.body?.data)) return res.status(400).json({ error: "INVALID_REWARDS" });
    const { baseData = null, writeId } = req.body;
    if (baseData !== null && (!isRewardsData(baseData) || writeId === undefined)
      || writeId !== undefined && (typeof writeId !== "string" || !/^[a-zA-Z0-9-]{16,80}$/.test(writeId))) {
      return res.status(400).json({ error: "INVALID_REWARDS" });
    }
    // Older clients have no baseline: merge conservatively rather than erase.
    const doc = await saveLearning(db.rewards(), { childId: req.child._id }, (current) =>
      current ? mergeRewards(current.data, req.body.data, baseData) : req.body.data,
      { writeId }
    );
    return res.json({ rewards: publicRewards(doc) });
  } catch (err) {
    return next(err);
  }
});

export default router;
