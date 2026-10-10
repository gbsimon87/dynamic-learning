import { hashPassword, verifyPassword } from "../../utils/passwordHash.js";
import {
  ACCOUNT_LEARNER,
  normaliseAccountFields,
  readAccountType,
} from "../../../shared/accountTypes.js";
import { isEmailShaped } from "../../../shared/emailAddress.js";
import {
  MAX_CHILDREN_PER_SIGNUP,
  normaliseChildPatch,
  normaliseNewChildren,
} from "../childFields.js";
import { isRewardsData } from "../../../shared/rewardsData.js";

/**
 * localStorage-backed implementation of the app's data store.
 *
 * ⚠️ The shape of this module is the point. It is deliberately written as if it
 * were already talking to MongoDB over the network:
 *
 * - **Every method is `async`**, even though localStorage is synchronous. Callers
 *   therefore already `await`, so a future `mongoStore.js` can be dropped into
 *   `./index.js` without a single callsite changing.
 * - **Documents are Mongo-shaped**: `_id` from `crypto.randomUUID()`, flat
 *   collections related by id (`parentId`, `childId`) rather than nested objects.
 * - **One localStorage key per collection**, each holding a JSON array of
 *   documents — the closest local analogue of a Mongo collection.
 * - **Nothing internal is returned by reference.** Every read and write returns a
 *   copy, so a caller cannot mutate stored state behind the store's back (which
 *   in Mongo would be impossible anyway).
 *
 * Progress documents use the shared version-aware reader. Their `data` tree
 * remains unchanged; stale saves union completions rather than replacing it.
 *
 * Keys owned here: `dl.parents`, `dl.children`, `dl.progress`, `dl.rewards`.
 * NOT touched: any other key, including `dl.session` (owned by the auth
 * context). The store confines itself to the four keys above.
 */

import { migrateProgressDocument, mergeProgress, PROGRESS_SCHEMA_VERSION } from "../../../shared/progressDocument.js";
import { mergeRewards } from "../../../shared/mergeRewards.js";
const rewardsBaselines = new Map();

// Lock the collection, since different children share a storage key. Modern
// browsers coordinate tabs through Web Locks; the synchronous fallback still
// merges fresh storage in browsers without that API.
function withCollectionLock(key, action) {
  return globalThis.window && globalThis.navigator?.locks?.request ? navigator.locks.request(key, action) : action();
}

const KEYS = {
  parents: "dl.parents",
  children: "dl.children",
  progress: "dl.progress",
  rewards: "dl.rewards",
};

/* ------------------------------------------------------------------ *
 * Storage primitives — every access guarded, the way useProgress.js is.
 * Private mode and quota-exceeded must degrade, never throw at a UI callsite.
 * ------------------------------------------------------------------ */

function readCollection(key, strict = false) {
  try {
    if (strict && !globalThis.localStorage) throw new Error("STORAGE_UNAVAILABLE");
    const raw = globalThis.localStorage?.getItem(key);
    if (raw === null || (!strict && !raw)) return [];
    const parsed = JSON.parse(raw);
    // A collection is always an array. Anything else is corrupt; treat as empty
    // rather than letting `.filter` throw on every subsequent call.
    if (Array.isArray(parsed)) return parsed;
    if (strict) throw new Error("INVALID_STORAGE");
    return [];
  } catch (error) {
    if (strict) throw error;
    return [];
  }
}

function writeCollection(key, docs) {
  try {
    globalThis.localStorage?.setItem(key, JSON.stringify(docs));
    return true;
  } catch {
    // Storage full or unavailable — the caller still gets its document back so
    // the current session keeps working; it just will not survive a reload.
    return false;
  }
}

/** Defensive copy, so callers never hold a reference into stored state. */
function clone(doc) {
  return doc == null ? null : structuredClone(doc);
}

function newId() {
  return globalThis.crypto.randomUUID();
}

function now() {
  return new Date().toISOString();
}

function normaliseEmail(email) {
  return String(email ?? "").trim().toLowerCase();
}

/** Strips credential fields — these must never leave the store. */
function publicParent(parent) {
  if (!parent) return null;
  // eslint-disable-next-line no-unused-vars
  const { passwordHash, passwordSalt, iterations, ...rest } = parent;
  // An account stored before `accountType` existed has no such field, and every
  // one of them is a grown-up's. Resolve it here so no consumer has to treat
  // `undefined` as a third kind of account.
  return clone({ ...rest, accountType: readAccountType(rest) });
}

/* ------------------------------------------------------------------ *
 * The store. Keep this interface stable — other modules code against it,
 * and a Mongo implementation must match it method for method.
 * ------------------------------------------------------------------ */

export const store = {
  async requestPasswordReset() { throw new Error("RECOVERY_NOT_SUPPORTED"); },
  async resetPassword() { throw new Error("RECOVERY_NOT_SUPPORTED"); },
  /**
   * Creates a parent account. Email is trimmed and compared case-insensitively.
   * @throws {Error} `EMAIL_TAKEN` when the email is already registered.
   * @returns {Promise<object>} the parent doc *without* credential fields.
   */
  async createParent({ email, password, accountType, ageBand, emailVerified }) {
    const normalised = normaliseEmail(email);
    if (!normalised) throw new Error("EMAIL_REQUIRED");
    if (typeof password !== "string" || password.length === 0) {
      throw new Error("PASSWORD_REQUIRED");
    }

    // Throws INVALID_ACCOUNT_TYPE / AGE_BAND_REQUIRED / AGE_BAND_TOO_YOUNG.
    // Shared with the server so both drivers reject the same input the same way;
    // omitting both fields yields a plain parent, so old callers are unaffected.
    const account = normaliseAccountFields({ accountType, ageBand });

    const parents = readCollection(KEYS.parents, true);
    if (parents.some((parent) => normaliseEmail(parent.email) === normalised)) {
      throw new Error("EMAIL_TAKEN");
    }

    const { hash, salt, iterations } = await hashPassword(password);

    const parent = {
      _id: newId(),
      email: normalised,
      passwordHash: hash,
      passwordSalt: salt,
      iterations,
      accountType: account.accountType,
      ageBand: account.ageBand,
      createdAt: now(),
      ...(typeof emailVerified === "boolean" ? { emailVerified, emailVerifiedAt: null } : {}),
    };

    return withCollectionLock(KEYS.parents, () => {
      const current = readCollection(KEYS.parents, true);
      if (current.some((p) => normaliseEmail(p.email) === normalised)) throw new Error("EMAIL_TAKEN");
      if (!writeCollection(KEYS.parents, [...current, parent])) throw new Error("ACCOUNT_SAVE_FAILED");
      return publicParent(parent);
    });
  },

  /** Browser-only mode has no email: verification is always off. */
  async requestSignupCode(email) {
    const normalised = normaliseEmail(email);
    if (!isEmailShaped(normalised)) throw new Error("EMAIL_INVALID");
    if (readCollection(KEYS.parents).some((p) => normaliseEmail(p.email) === normalised)) {
      throw new Error("EMAIL_TAKEN");
    }
    return { verification: "off" };
  },

  /** Same validation as the server; undoes the account if a profile fails. */
  async completeSignup({ email, password, accountType, ageBand, children }) {
    const account = normaliseAccountFields({ accountType, ageBand });
    const kids = normaliseNewChildren(children, {
      max: account.accountType === ACCOUNT_LEARNER ? 1 : MAX_CHILDREN_PER_SIGNUP,
    });
    const parent = await store.createParent({ email, password, accountType, ageBand, emailVerified: false });
    try {
      const created = [];
      for (const kid of kids) created.push(await store.createChild(parent._id, kid));
      return { parent, children: created };
    } catch (err) {
      writeCollection(KEYS.children, readCollection(KEYS.children).filter((c) => c.parentId !== parent._id));
      writeCollection(KEYS.parents, readCollection(KEYS.parents).filter((p) => p._id !== parent._id));
      throw err;
    }
  },

  /**
   * @returns {Promise<object|null>} the full parent doc (credentials included —
   * this is the store's internal lookup) or null.
   */
  async findParentByEmail(email) {
    const normalised = normaliseEmail(email);
    if (!normalised) return null;
    const found = readCollection(KEYS.parents).find(
      (parent) => normaliseEmail(parent.email) === normalised
    );
    return clone(found) ?? null;
  },

  /**
   * @returns {Promise<object|null>} the parent doc without credential fields on
   * a correct password, otherwise null. Never distinguishes "no such account"
   * from "wrong password" to the caller.
   */
  async verifyParent({ email, password }) {
    const parent = await this.findParentByEmail(email);
    if (!parent) return null;

    const ok = await verifyPassword(password, {
      hash: parent.passwordHash,
      salt: parent.passwordSalt,
      iterations: parent.iterations,
    });

    return ok ? publicParent(parent) : null;
  },

  /**
   * Deletes a parent account and everything it owns, after re-checking the
   * password. Same contract as the API driver: a wrong password throws
   * WRONG_PASSWORD and deletes nothing.
   * @returns {Promise<void>}
   */
  async deleteAccount({ parentId, password }) {
    const parent = readCollection(KEYS.parents).find((doc) => doc._id === parentId);
    if (!parent) throw new Error("NOT_SIGNED_IN");
    const ok = await verifyPassword(password, {
      hash: parent.passwordHash,
      salt: parent.passwordSalt,
      iterations: parent.iterations,
    });
    if (!ok) throw new Error("WRONG_PASSWORD");

    const childIds = new Set(
      readCollection(KEYS.children).filter((child) => child.parentId === parentId).map((child) => child._id)
    );
    writeCollection(KEYS.progress, readCollection(KEYS.progress).filter((doc) => !childIds.has(doc.childId)));
    writeCollection(KEYS.rewards, readCollection(KEYS.rewards).filter((doc) => !childIds.has(doc.childId)));
    writeCollection(KEYS.children, readCollection(KEYS.children).filter((child) => child.parentId !== parentId));
    writeCollection(KEYS.parents, readCollection(KEYS.parents).filter((doc) => doc._id !== parentId));
  },

  /** @returns {Promise<object[]>} this parent's children, oldest first. */
  async listChildren(parentId) {
    if (!parentId) return [];
    return readCollection(KEYS.children)
      .filter((child) => child.parentId === parentId)
      .sort((a, b) => String(a.createdAt).localeCompare(String(b.createdAt)))
      .map(clone);
  },

  /** @returns {Promise<object|null>} */
  async getChild(childId) {
    if (!childId) return null;
    const found = readCollection(KEYS.children).find(
      (child) => child._id === childId
    );
    return clone(found) ?? null;
  },

  /** @returns {Promise<object>} the new child doc. */
  async createChild(parentId, { name, avatar, colour, yearGroup, subjects }) {
    if (!parentId) throw new Error("PARENT_REQUIRED");
    const trimmedName = String(name ?? "").trim();
    if (!trimmedName) throw new Error("NAME_REQUIRED");

    // Throws INVALID_YEAR_GROUP for a year the app cannot serve, and
    // INVALID_SUBJECTS for a subject it does not teach.
    const { yearGroup: year = null, subjects: picked = [] } = normaliseChildPatch({ yearGroup, subjects });

    const child = {
      _id: newId(),
      parentId,
      name: trimmedName,
      avatar: avatar ?? null,
      colour: colour ?? null,
      yearGroup: year,
      subjects: picked,
      createdAt: now(),
    };

    writeCollection(KEYS.children, [...readCollection(KEYS.children), child]);
    return clone(child);
  },

  /**
   * Applies a partial update to a child profile.
   *
   * A PATCH, not a PUT: only the keys present are touched, so setting a year
   * group cannot blank the avatar. `normaliseChildPatch` is what stops a caller
   * writing `parentId` or `_id` — both silent disasters, one handing a child to
   * another family and the other orphaning every progress document.
   *
   * @throws {Error} CHILD_NOT_FOUND | NAME_REQUIRED | INVALID_YEAR_GROUP
   * @returns {Promise<object>} the updated child doc.
   */
  async updateChild(childId, patch) {
    if (!childId) throw new Error("CHILD_REQUIRED");

    const fields = normaliseChildPatch(patch);
    const docs = readCollection(KEYS.children);
    const index = docs.findIndex((child) => child._id === childId);
    if (index === -1) throw new Error("CHILD_NOT_FOUND");

    const updated = { ...docs[index], ...fields };
    const next = [...docs];
    next[index] = updated;
    writeCollection(KEYS.children, next);
    return clone(updated);
  },

  /**
   * Deletes a child and every progress document belonging to it, so no orphaned
   * progress is left behind for a recycled id to inherit.
   * @returns {Promise<void>}
   */
  async deleteChild(childId) {
    if (!childId) return;
    writeCollection(
      KEYS.children,
      readCollection(KEYS.children).filter((child) => child._id !== childId)
    );
    writeCollection(
      KEYS.progress,
      readCollection(KEYS.progress).filter((doc) => doc.childId !== childId)
    );
    // Rewards are per-child too, so a recycled id must not inherit badges.
    writeCollection(
      KEYS.rewards,
      readCollection(KEYS.rewards).filter((doc) => doc.childId !== childId)
    );
  },

  /** @returns {Promise<object|null>} progress for one childId+year+subject. */
  async getProgress(childId, year, subject) {
    if (!childId) return null;
    const found = readCollection(KEYS.progress, true).find(
      (doc) =>
        doc.childId === childId &&
        Number(doc.year) === Number(year) &&
        doc.subject === subject
    );
    return migrateProgressDocument(found ?? null);
  },

  /**
   * Upsert on the childId+year+subject triple — saving twice never creates a
   * second document. Bumps `updatedAt`; `createdAt`/`_id` survive an update.
   * @returns {Promise<object>} the stored progress doc.
   */
  async saveProgress(childId, year, subject, data) {
    if (!childId) throw new Error("CHILD_REQUIRED");

    return withCollectionLock(KEYS.progress, () => {
      const docs = readCollection(KEYS.progress, true);
      const index = docs.findIndex(
        (doc) =>
          doc.childId === childId &&
          Number(doc.year) === Number(year) &&
          doc.subject === subject
      );

      const base = index === -1 ? null : docs[index];
      const doc = {
        ...base,
        _id: base?._id ?? newId(),
        childId,
        year: Number(year),
        subject,
        schemaVersion: PROGRESS_SCHEMA_VERSION,
        data: mergeProgress(migrateProgressDocument(base)?.data ?? {}, data ?? {}),
        createdAt: base?.createdAt ?? now(),
        updatedAt: now(),
      };

      const next = index === -1 ? [...docs, doc] : docs.with(index, doc);
      if (!writeCollection(KEYS.progress, next)) throw new Error("PROGRESS_SAVE_FAILED");
      return clone(doc);
    });
  },

  /**
   * @returns {Promise<object|null>} the rewards doc for one child, or null.
   *
   * Rewards are a SEPARATE document from progress on purpose: a badge belongs
   * to the child across every year, and keeping the two apart means a reward
   * bug can never corrupt a completion.
   */
  async getRewards(childId) {
    if (!childId) return null;
    const found = readCollection(KEYS.rewards, true).find(
      (doc) => doc.childId === childId
    );
    if (found && !isRewardsData(found.data)) throw new Error("INVALID_REWARDS");
    rewardsBaselines.set(childId, clone(found?.data ?? {}));
    return clone(found) ?? null;
  },

  /**
   * Upsert on childId — saving twice never creates a second document.
   * @returns {Promise<object>} the stored rewards doc.
   */
  async saveRewards(childId, data) {
    if (!childId) throw new Error("CHILD_REQUIRED");
    if (!isRewardsData(data ?? {})) throw new Error("INVALID_REWARDS");

    return withCollectionLock(KEYS.rewards, () => {
      const docs = readCollection(KEYS.rewards, true);
      const index = docs.findIndex((doc) => doc.childId === childId);
      const base = index === -1 ? null : docs[index];

      const doc = {
        ...base,
        _id: base?._id ?? newId(),
        childId,
        schemaVersion: 1,
        data: base ? mergeRewards(base.data, data ?? {}, rewardsBaselines.get(childId) ?? null) : structuredClone(data ?? {}),
        createdAt: base?.createdAt ?? now(),
        updatedAt: now(),
      };

      const next = index === -1 ? [...docs, doc] : docs.with(index, doc);
      if (!writeCollection(KEYS.rewards, next)) throw new Error("REWARDS_SAVE_FAILED");
      rewardsBaselines.set(childId, clone(data ?? {}));
      return clone(doc);
    });
  },
};
