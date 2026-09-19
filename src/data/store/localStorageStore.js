import { hashPassword, verifyPassword } from "../../utils/passwordHash.js";
import {
  normaliseAccountFields,
  readAccountType,
} from "../../../shared/accountTypes.js";
import { normaliseChildPatch } from "../childFields.js";

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
 * Progress documents carry `schemaVersion: 1`. PROJECT_KNOWLEDGE §6 item 5 lists
 * the unversioned legacy progress shape as real debt; this is where versioning
 * starts, and `data` holds the curriculum shape verbatim.
 *
 * Keys owned here: `dl.parents`, `dl.children`, `dl.progress`.
 * NOT touched: any other key, including `dl.session` (owned by the auth
 * context). The store confines itself to the three keys above.
 */

const KEYS = {
  parents: "dl.parents",
  children: "dl.children",
  progress: "dl.progress",
};

/* ------------------------------------------------------------------ *
 * Storage primitives — every access guarded, the way useProgress.js is.
 * Private mode and quota-exceeded must degrade, never throw at a UI callsite.
 * ------------------------------------------------------------------ */

function readCollection(key) {
  try {
    const raw = globalThis.localStorage?.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    // A collection is always an array. Anything else is corrupt; treat as empty
    // rather than letting `.filter` throw on every subsequent call.
    return Array.isArray(parsed) ? parsed : [];
  } catch {
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
  /**
   * Creates a parent account. Email is trimmed and compared case-insensitively.
   * @throws {Error} `EMAIL_TAKEN` when the email is already registered.
   * @returns {Promise<object>} the parent doc *without* credential fields.
   */
  async createParent({ email, password, accountType, ageBand }) {
    const normalised = normaliseEmail(email);
    if (!normalised) throw new Error("EMAIL_REQUIRED");
    if (typeof password !== "string" || password.length === 0) {
      throw new Error("PASSWORD_REQUIRED");
    }

    // Throws INVALID_ACCOUNT_TYPE / AGE_BAND_REQUIRED / AGE_BAND_TOO_YOUNG.
    // Shared with the server so both drivers reject the same input the same way;
    // omitting both fields yields a plain parent, so old callers are unaffected.
    const account = normaliseAccountFields({ accountType, ageBand });

    const parents = readCollection(KEYS.parents);
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
    };

    writeCollection(KEYS.parents, [...parents, parent]);
    return publicParent(parent);
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
  async createChild(parentId, { name, avatar, colour, yearGroup }) {
    if (!parentId) throw new Error("PARENT_REQUIRED");
    const trimmedName = String(name ?? "").trim();
    if (!trimmedName) throw new Error("NAME_REQUIRED");

    // Throws INVALID_YEAR_GROUP for a year the app cannot serve.
    const { yearGroup: year = null } = normaliseChildPatch({ yearGroup });

    const child = {
      _id: newId(),
      parentId,
      name: trimmedName,
      avatar: avatar ?? null,
      colour: colour ?? null,
      yearGroup: year,
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
  },

  /** @returns {Promise<object|null>} progress for one childId+year+subject. */
  async getProgress(childId, year, subject) {
    if (!childId) return null;
    const found = readCollection(KEYS.progress).find(
      (doc) =>
        doc.childId === childId &&
        Number(doc.year) === Number(year) &&
        doc.subject === subject
    );
    return clone(found) ?? null;
  },

  /**
   * Upsert on the childId+year+subject triple — saving twice never creates a
   * second document. Bumps `updatedAt`; `createdAt`/`_id` survive an update.
   * @returns {Promise<object>} the stored progress doc.
   */
  async saveProgress(childId, year, subject, data) {
    if (!childId) throw new Error("CHILD_REQUIRED");

    const docs = readCollection(KEYS.progress);
    const index = docs.findIndex(
      (doc) =>
        doc.childId === childId &&
        Number(doc.year) === Number(year) &&
        doc.subject === subject
    );

    const base = index === -1 ? null : docs[index];
    const doc = {
      _id: base?._id ?? newId(),
      childId,
      year: Number(year),
      subject,
      schemaVersion: 1,
      data: structuredClone(data ?? {}),
      createdAt: base?.createdAt ?? now(),
      updatedAt: now(),
    };

    const next = index === -1 ? [...docs, doc] : docs.with(index, doc);
    writeCollection(KEYS.progress, next);
    return clone(doc);
  },
};
