/**
 * HTTP-backed implementation of the app's data store.
 *
 * This is the second driver behind the seam described in PROJECT_KNOWLEDGE §4.7.
 * It implements the SAME interface as `localStorageStore.js` — method for
 * method, same signatures, same document shapes, all async — so `./index.js`
 * can swap between them without a single consuming component changing.
 *
 * Differences that are invisible to callers but worth knowing:
 *
 * - **Identity lives in a cookie, not in a returned document.** The server sets
 *   an HTTP-only session cookie on signup/login; every request therefore uses
 *   `credentials: "same-origin"`. `parentId` arguments are accepted (to keep the
 *   signatures identical) but the server scopes by session, not by that id.
 * - **Passwords are hashed server-side.** `utils/passwordHash.js` is not used
 *   here; the plaintext password is sent over the (HTTPS) wire and hashed by the
 *   server, which is where it belongs.
 * - **Network failure is always an error, never an empty result.** A dropped
 *   connection must not look like "this child has no progress", because
 *   `useProgress` would then persist an empty tree over real work. Every failure
 *   throws; only an explicit `{progress: null}` / 404 from the server means
 *   "no document".
 *
 * Error codes are chosen to match what the UI already branches on:
 * `createParent` throws `EMAIL_TAKEN` on 409 (auth pages read `err.message`),
 * and `verifyParent` returns `null` on 401 rather than throwing, because
 * `AuthContext.signIn` is what converts a null into `INVALID_CREDENTIALS`.
 */

import { normaliseAccountFields } from "../../../shared/accountTypes.js";
import { normaliseChildPatch } from "../childFields.js";

const BASE = "/api";

/** Thrown for anything that is not a clean, expected response. */
class ApiError extends Error {
  constructor(code, { status = 0, cause } = {}) {
    super(code);
    this.name = "ApiError";
    this.status = status;
    if (cause) this.cause = cause;
  }
}

/**
 * Single request helper.
 *
 * @param {string} path      - path under /api
 * @param {object} [options]
 * @param {string} [options.method="GET"]
 * @param {object} [options.body]    - JSON-encoded when present
 * @param {number[]} [options.expect] - status codes treated as success
 * @param {number[]} [options.soft]   - status codes returned to the caller
 *                                      instead of throwing (e.g. 401 on login)
 * @returns {Promise<{status:number, data:object|null}>}
 */
async function request(path, { method = "GET", body, expect = [200], soft = [] } = {}) {
  let response;
  try {
    response = await fetch(`${BASE}${path}`, {
      method,
      credentials: "same-origin",
      headers: body === undefined ? undefined : { "Content-Type": "application/json" },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (err) {
    // fetch only rejects on a genuine network/CORS failure. Surface it loudly:
    // a caller must never mistake this for "the server said there is no data".
    throw new ApiError("NETWORK_ERROR", { cause: err });
  }

  // 204 has no body by definition.
  let data = null;
  if (response.status !== 204) {
    try {
      data = await response.json();
    } catch {
      data = null;
    }
  }

  if (expect.includes(response.status) || soft.includes(response.status)) {
    return { status: response.status, data };
  }

  // Prefer the server's own error code so UI branching stays meaningful;
  // fall back to a status-derived code.
  const code =
    (data && typeof data.error === "string" && data.error) ||
    `HTTP_${response.status}`;
  throw new ApiError(code, { status: response.status });
}

/**
 * The store. Keep this interface identical to localStorageStore.js.
 */
export const store = {
  /**
   * Creates a parent account and starts a session (the server sets the cookie).
   * @throws {Error} `EMAIL_TAKEN` when the email is already registered.
   * @returns {Promise<object>} the parent doc `{_id, email, createdAt}`.
   */
  async createParent({ email, password, accountType, ageBand }) {
    const normalised = String(email ?? "").trim().toLowerCase();
    // Validated locally too, so the same errors surface as in the local driver
    // rather than depending on the server's wording.
    if (!normalised) throw new ApiError("EMAIL_REQUIRED");
    if (typeof password !== "string" || password.length === 0) {
      throw new ApiError("PASSWORD_REQUIRED");
    }

    // The server validates these again — a client is not a trust boundary — but
    // checking here keeps the error codes identical across the two drivers and
    // saves a round trip on input the UI should never have produced.
    const account = normaliseAccountFields({ accountType, ageBand });

    // 409 is not "soft": it must throw Error("EMAIL_TAKEN"), which SignUp reads.
    const { data } = await request("/auth/signup", {
      method: "POST",
      body: {
        email: normalised,
        password,
        accountType: account.accountType,
        ageBand: account.ageBand,
      },
      expect: [201],
    });
    return data?.parent ?? null;
  },

  /**
   * NOT SUPPORTED over HTTP, deliberately.
   *
   * In `localStorageStore` this is the store's *internal* credential lookup: it
   * returns the parent doc including `passwordHash`/`passwordSalt`. A server
   * must never expose that, and there is no endpoint for it. Nothing in `src/`
   * calls it (grepped: the only references are localStorageStore's own
   * `verifyParent` and its unit tests), so it throws rather than lying with a
   * partial document.
   */
  async findParentByEmail() {
    throw new ApiError("NOT_SUPPORTED_BY_API_STORE:findParentByEmail");
  },

  /**
   * Signs in. Returns `null` on bad credentials — NOT a throw — because
   * `AuthContext.signIn` turns a null into `INVALID_CREDENTIALS` itself, and
   * throwing here would surface the raw code twice / bypass that path.
   * @returns {Promise<object|null>} the parent doc, or null.
   */
  async verifyParent({ email, password }) {
    const normalised = String(email ?? "").trim().toLowerCase();
    if (!normalised || typeof password !== "string" || password.length === 0) {
      return null;
    }

    const { status, data } = await request("/auth/login", {
      method: "POST",
      body: { email: normalised, password },
      expect: [200],
      soft: [401],
    });

    if (status === 401) return null;
    return data?.parent ?? null;
  },

  /**
   * Ends the session. Has no `localStorageStore` counterpart (there is no
   * server-side session to end locally), so it is optional: `AuthContext.signOut`
   * only clears local state today. Present so a caller can end the cookie
   * session when the app grows to do so.
   * @returns {Promise<void>}
   */
  async signOutParent() {
    await request("/auth/logout", { method: "POST", expect: [204] });
  },

  /**
   * Resolves the signed-in parent from the session cookie.
   *
   * `AuthContext.resolveParent` duck-types for exactly this method
   * (`typeof store.getParent === "function"`) and uses it in preference to the
   * `email` display hint it keeps in `localStorage["dl.session"]`, so adding it
   * here needs no consumer change and makes rehydration authoritative.
   * @returns {Promise<object|null>} the parent doc, or null when not signed in.
   */
  async getParent() {
    const { status, data } = await request("/auth/me", {
      expect: [200],
      soft: [401],
    });
    if (status === 401) return null;
    return data?.parent ?? null;
  },

  /**
   * The server scopes children by the session cookie; `parentId` is accepted
   * only to keep the signature identical to the local driver.
   * @returns {Promise<object[]>}
   */
  async listChildren(parentId) {
    if (!parentId) return [];
    const { data } = await request("/children");
    const children = Array.isArray(data?.children) ? data.children : [];
    return children.sort((a, b) =>
      String(a.createdAt).localeCompare(String(b.createdAt))
    );
  },

  /**
   * No `GET /api/children/:id` exists, so this reads the session's children and
   * picks one. Faithful: the server already scopes the list to this parent, so
   * a child belonging to someone else is not found here either.
   * @returns {Promise<object|null>}
   */
  async getChild(childId) {
    if (!childId) return null;
    const { data } = await request("/children");
    const children = Array.isArray(data?.children) ? data.children : [];
    return children.find((c) => c._id === childId) ?? null;
  },

  /** @returns {Promise<object>} the new child doc. */
  async createChild(parentId, { name, avatar, colour, yearGroup }) {
    if (!parentId) throw new ApiError("PARENT_REQUIRED");
    const trimmedName = String(name ?? "").trim();
    if (!trimmedName) throw new ApiError("NAME_REQUIRED");

    const { yearGroup: year = null } = normaliseChildPatch({ yearGroup });

    const { data } = await request("/children", {
      method: "POST",
      body: {
        name: trimmedName,
        avatar: avatar ?? null,
        colour: colour ?? null,
        yearGroup: year,
      },
      expect: [201],
    });
    return data?.child ?? null;
  },

  /**
   * Partial update. The server scopes by session and re-validates the patch —
   * validating here too keeps the error codes identical across the drivers.
   * @throws {Error} CHILD_NOT_FOUND | NAME_REQUIRED | INVALID_YEAR_GROUP
   * @returns {Promise<object>} the updated child doc.
   */
  async updateChild(childId, patch) {
    if (!childId) throw new ApiError("CHILD_REQUIRED");

    const fields = normaliseChildPatch(patch);
    const { status, data } = await request(
      `/children/${encodeURIComponent(childId)}`,
      { method: "PATCH", body: fields, expect: [200], soft: [404] }
    );
    if (status === 404) throw new ApiError("CHILD_NOT_FOUND", { status });
    return data?.child ?? null;
  },

  /**
   * The server also removes the child's progress documents (same contract as
   * the local driver, which filters `dl.progress`).
   * @returns {Promise<void>}
   */
  async deleteChild(childId) {
    if (!childId) return;
    // 404 is tolerated: "already gone" is the caller's desired end state, and
    // the local driver is likewise a no-op on an unknown id.
    await request(`/children/${encodeURIComponent(childId)}`, {
      method: "DELETE",
      expect: [204],
      soft: [404],
    });
  },

  /**
   * @returns {Promise<object|null>} the progress doc, or null when the server
   * explicitly says there is none. A failure throws — see the module comment.
   */
  async getProgress(childId, year, subject) {
    if (!childId) return null;
    const { data } = await request(
      `/progress/${encodeURIComponent(childId)}/${encodeURIComponent(
        Number(year)
      )}/${encodeURIComponent(subject)}`
    );
    return data?.progress ?? null;
  },

  /**
   * Upsert on the childId+year+subject triple (the server owns the upsert).
   * @returns {Promise<object>} the stored progress doc.
   */
  async saveProgress(childId, year, subject, data) {
    if (!childId) throw new ApiError("CHILD_REQUIRED");

    const { data: body } = await request(
      `/progress/${encodeURIComponent(childId)}/${encodeURIComponent(
        Number(year)
      )}/${encodeURIComponent(subject)}`,
      { method: "PUT", body: { data: data ?? {} }, expect: [200] }
    );
    return body?.progress ?? null;
  },

  /**
   * @returns {Promise<object|null>} the rewards doc, or null when the server
   * explicitly says there is none. A failure throws — see the module comment:
   * a dropped connection must never look like "this child has no badges", or
   * the next save would write an empty document over real ones.
   */
  async getRewards(childId) {
    if (!childId) return null;
    const { status, data } = await request(
      `/rewards/${encodeURIComponent(childId)}`,
      { expect: [200], soft: [404] }
    );
    if (status === 404) return null;
    return data?.rewards ?? null;
  },

  /**
   * Upsert on childId (the server owns the upsert).
   * @returns {Promise<object>} the stored rewards doc.
   */
  async saveRewards(childId, data) {
    if (!childId) throw new ApiError("CHILD_REQUIRED");

    const { data: body } = await request(
      `/rewards/${encodeURIComponent(childId)}`,
      { method: "PUT", body: { data: data ?? {} }, expect: [200] }
    );
    return body?.rewards ?? null;
  },
};
