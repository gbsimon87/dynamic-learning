/** /api/children — every route scoped to the signed-in parent. */
import { Router } from "express";
import * as db from "../db.js";
import { requireAuth, requireOwnedChild } from "../middleware.js";
import { publicChild } from "../serialize.js";

const router = Router();
router.use(requireAuth);

router.get("/", async (req, res, next) => {
  try {
    const docs = await db
      .children()
      .find({ parentId: req.parent._id })
      .sort({ createdAt: 1 })
      .toArray();
    return res.json({ children: docs.map(publicChild) });
  } catch (err) {
    return next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const name = String(req.body?.name ?? "").trim();
    if (!name) return res.status(400).json({ error: "NAME_REQUIRED" });

    const child = {
      parentId: req.parent._id,
      name,
      avatar: req.body?.avatar ?? null,
      colour: req.body?.colour ?? null,
      createdAt: new Date().toISOString(),
    };
    const { insertedId } = await db.children().insertOne(child);
    return res.status(201).json({ child: publicChild({ ...child, _id: insertedId }) });
  } catch (err) {
    return next(err);
  }
});

// requireOwnedChild 404s for a child belonging to anyone else.
router.delete("/:childId", requireOwnedChild, async (req, res, next) => {
  try {
    await db.children().deleteOne({ _id: req.child._id, parentId: req.parent._id });
    // No orphaned progress left behind for a recycled id to inherit.
    await db.progress().deleteMany({ childId: req.child._id });
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
});

export default router;
