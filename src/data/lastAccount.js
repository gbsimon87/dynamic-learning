/**
 * `dl.lastAccount` — the "welcome back" hint for the login screen.
 *
 * WHAT THIS IS FOR
 * The session cookie already lasts 30 days (server/auth.js), so a returning
 * family is normally still signed in and never sees /login at all. When they do
 * see it, the session is genuinely gone and a password is genuinely required.
 * This record does not change that. It only lets the screen say "welcome back",
 * show the faces the child recognises, and pre-fill the email — one field to
 * type instead of two.
 *
 * WHAT IT MUST NEVER CONTAIN
 * No password, no hash, no salt, no session token, nothing an attacker with the
 * device could authenticate with. It is display data. Every write goes through
 * `writeLastAccount`, which builds a fresh object field by field rather than
 * spreading the caller's — so a parent document gaining a credential field later
 * cannot silently leak into localStorage. The test asserts this.
 *
 * Owned here and nowhere else. `dl.session` (AuthContext) and the three `dl.*`
 * collection keys (the store) are separate and untouched.
 */

const LAST_ACCOUNT_KEY = "dl.lastAccount";

/** Only these five strings are ever copied out of a profile. */
function publicProfileHint(profile) {
  if (!profile) return null;
  const id = profile._id ?? profile.id;
  if (!id) return null;
  return {
    id: String(id),
    name: typeof profile.name === "string" ? profile.name : "",
    avatar: typeof profile.avatar === "string" ? profile.avatar : null,
    colour: typeof profile.colour === "string" ? profile.colour : null,
  };
}

/**
 * @returns {{email: string, accountType: string, profiles: object[]}|null}
 */
export function readLastAccount() {
  try {
    const raw = globalThis.localStorage?.getItem(LAST_ACCOUNT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    if (typeof parsed.email !== "string" || !parsed.email) return null;

    // Re-narrowed on the way out as well as in: storage is user-writable, and a
    // hand-edited record must not be able to put arbitrary keys on screen.
    const profiles = Array.isArray(parsed.profiles)
      ? parsed.profiles.map(publicProfileHint).filter(Boolean)
      : [];

    return {
      email: parsed.email,
      accountType:
        parsed.accountType === "learner" ? "learner" : "parent",
      profiles,
    };
  } catch {
    // Corrupt or unavailable storage degrades to "no hint", never to a crash —
    // the login form simply renders in its plain, fresh-browser form.
    return null;
  }
}

/**
 * @param {object} account  the public account doc (never one carrying credentials)
 * @param {object[]} profiles  the child profiles to show as faces
 */
export function writeLastAccount(account, profiles) {
  try {
    if (!account?.email) return;
    const record = {
      email: String(account.email),
      accountType: account.accountType === "learner" ? "learner" : "parent",
      profiles: (Array.isArray(profiles) ? profiles : [])
        .map(publicProfileHint)
        .filter(Boolean),
    };
    globalThis.localStorage?.setItem(
      LAST_ACCOUNT_KEY,
      JSON.stringify(record)
    );
  } catch {
    // Private mode or quota — the next login just shows the plain form.
  }
}

export function clearLastAccount() {
  try {
    globalThis.localStorage?.removeItem(LAST_ACCOUNT_KEY);
  } catch {
    // Nothing to do.
  }
}

export { LAST_ACCOUNT_KEY };
