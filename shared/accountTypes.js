/**
 * Account types and age bands — the ONE definition, imported by both sides.
 *
 * The client validates so the localStorage driver surfaces the same error codes
 * as the API driver; the server validates because a client is not a trust
 * boundary. Both must agree on the vocabulary, and a copy in each would drift,
 * so this module lives at the root rather than under `src/` (frontend) or
 * `server/` (backend). Plain ESM with no dependencies, so Vite and Node can both
 * read it untransformed.
 */

/** A grown-up who sets up profiles for their children. The default. */
export const ACCOUNT_PARENT = "parent";

/** An older child who signed up for themselves and owns their own profile. */
export const ACCOUNT_LEARNER = "learner";

export const ACCOUNT_TYPES = [ACCOUNT_PARENT, ACCOUNT_LEARNER];

/**
 * The bands a learner may choose and have an account created.
 *
 * There is deliberately NO under-13 band. A child who says they are under 13 is
 * routed to a grown-up and no account is created, so an under-13 value can never
 * reach storage — not even as a rejected-then-logged field.
 */
export const AGE_BANDS = ["13-15", "16-17", "18+"];

/**
 * Offered in the UI, which must be able to show the under-13 option in order to
 * respond to it. `gated: true` means "do not create an account for this answer".
 */
export const AGE_CHOICES = [
  { id: "under-13", label: "Under 13", gated: true },
  { id: "13-15", label: "13 to 15", gated: false },
  { id: "16-17", label: "16 or 17", gated: false },
  { id: "18+", label: "18 or over", gated: false },
];

/**
 * A stored document predates this field when `accountType` is absent, and every
 * such account is a parent — learner accounts did not exist before the field did.
 */
export function readAccountType(doc) {
  return doc?.accountType === ACCOUNT_LEARNER ? ACCOUNT_LEARNER : ACCOUNT_PARENT;
}

export function isLearnerAccount(doc) {
  return readAccountType(doc) === ACCOUNT_LEARNER;
}

/**
 * Shared signup validation, so both store drivers and the server reject the same
 * inputs with the same codes.
 *
 * @returns {{accountType: string, ageBand: string|null}} the normalised pair
 * @throws {Error} INVALID_ACCOUNT_TYPE | AGE_BAND_REQUIRED | AGE_BAND_TOO_YOUNG
 */
export function normaliseAccountFields({ accountType, ageBand } = {}) {
  // Omitted entirely is the overwhelmingly common case and means "parent", which
  // keeps every pre-existing `createParent({email, password})` caller working.
  const type = accountType === undefined || accountType === null
    ? ACCOUNT_PARENT
    : accountType;

  if (!ACCOUNT_TYPES.includes(type)) throw new Error("INVALID_ACCOUNT_TYPE");

  // A parent never carries an age band; silently drop one rather than storing a
  // field that nothing reads.
  if (type === ACCOUNT_PARENT) return { accountType: type, ageBand: null };

  if (ageBand === undefined || ageBand === null || ageBand === "") {
    throw new Error("AGE_BAND_REQUIRED");
  }
  // Named separately from INVALID so the UI can say something kind rather than
  // "that value is not allowed".
  if (ageBand === "under-13") throw new Error("AGE_BAND_TOO_YOUNG");
  if (!AGE_BANDS.includes(ageBand)) throw new Error("INVALID_AGE_BAND");

  return { accountType: type, ageBand };
}
