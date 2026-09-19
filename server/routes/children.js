/** /api/children — every route scoped to the signed-in parent. */
import { Router } from "express";
import * as db from "../db.js";
import { requireAuth, requireOwnedChild } from "../middleware.js";
import { publicChild } from "../serialize.js";
import { normaliseChildPatch } from "../../src/data/childFields.js";

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

    // Shared with both store drivers, so the client and the server agree on
    // which years exist. Re-validated here because a request is not a trust
    // boundary.
    let year = null;
    try {
      ({ yearGroup: year = null } = normaliseChildPatch({
        yearGroup: req.body?.yearGroup ?? null,
      }));
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    const child = {
      parentId: req.parent._id,
      name,
      avatar: req.body?.avatar ?? null,
      colour: req.body?.colour ?? null,
      yearGroup: year,
      createdAt: new Date().toISOString(),
    };
    const { insertedId } = await db.children().insertOne(child);
    return res.status(201).json({ child: publicChild({ ...child, _id: insertedId }) });
  } catch (err) {
    return next(err);
  }
});

/**
 * Partial update. `requireOwnedChild` 404s for another family's child, and
 * `normaliseChildPatch` whitelists the writable fields — without it a request
 * could set `parentId` and move a child between accounts, or set `_id` and
 * orphan every progress document pointing at the old one.
 */
router.patch("/:childId", requireOwnedChild, async (req, res, next) => {
  try {
    let fields;
    try {
      fields = normaliseChildPatch(req.body);
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }

    // An empty patch is a no-op, not an error: return the child unchanged
    // rather than issuing a $set with nothing in it, which Mongo rejects.
    if (Object.keys(fields).length === 0) {
      return res.json({ child: publicChild(req.child) });
    }

    await db
      .children()
      .updateOne(
        { _id: req.child._id, parentId: req.parent._id },
        { $set: fields }
      );

    return res.json({ child: publicChild({ ...req.child, ...fields }) });
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
