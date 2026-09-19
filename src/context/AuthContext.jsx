// /src/context/AuthContext.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "./auth-context";
import { store } from "../data/store";
import { isLearnerAccount } from "../../shared/accountTypes.js";
import {
  clearLastAccount,
  writeLastAccount,
} from "../data/lastAccount.js";

/**
 * Parent accounts + child profiles.
 *
 * Everything persists through the async `store` (localStorage today, a real
 * backend later), EXCEPT the session pointer, which is a purely local
 * "who is using this browser right now" record:
 *
 *   localStorage["dl.session"] = { parentId, childId }
 *
 * Curriculum progress is keyed by the active child, so a wrong or stale
 * session pointer would show one child another child's work. The pointer is
 * therefore re-validated against the store on every mount and dropped
 * silently if either id no longer resolves.
 */
const SESSION_KEY = "dl.session";

function readSession() {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return null;
    return {
      parentId: parsed.parentId ?? null,
      childId: parsed.childId ?? null,
      // Display hint only (see writeSession) — never used for identity.
      email: typeof parsed.email === "string" ? parsed.email : null,
    };
  } catch {
    // Corrupt storage must degrade to "signed out", never to a white screen.
    return null;
  }
}

/**
 * `parentId` + `childId` are the session. `email` is carried alongside purely
 * so the Parent Area can still say "signed in as ..." after a reload: the store
 * contract has no parent-by-id read, so a rehydrated session cannot recover the
 * parent document. It is a display hint, never an identity check — every
 * authorisation decision uses `parentId` and is re-validated against the store.
 * Once the store grows a `getParent`, this field becomes redundant.
 */
function writeSession(parentId, childId, email) {
  try {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify({
        parentId: parentId ?? null,
        childId: childId ?? null,
        email: email ?? null,
      })
    );
  } catch {
    // Storage unavailable — the session simply won't survive a reload.
  }
}

function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Nothing to do; in-memory state is cleared by the caller regardless.
  }
}

/**
 * The store contract guarantees no parent-by-id read, so a rehydrated session
 * reconstructs the minimum parent identity it needs. If the store later grows
 * a `getParent`, we use it and get the full doc (email, createdAt) back.
 */
function sessionHintParent(session) {
  return { _id: session.parentId, email: session.email ?? undefined };
}

async function resolveParent(session) {
  if (typeof store.getParent === "function") {
    try {
      return await store.getParent(session.parentId);
    } catch (err) {
      // A REJECTED session (the API says we are not signed in) must clear.
      // A transient network failure must NOT: returning null here would sign
      // the user out every time the app booted on a flaky connection, or while
      // the free-tier server was still spinning up. Stay optimistically signed
      // in on a network error and let the next real call surface the problem.
      if (err?.message === "NETWORK_ERROR") return sessionHintParent(session);
      return null;
    }
  }
  return sessionHintParent(session);
}

/**
 * A learner account holds exactly one profile in the ordinary case — its own —
 * so making them tap "who's playing?" to choose themselves is a screen that asks
 * a question with one possible answer. Auto-select it, which turns `status` into
 * "ready" and lets RequireChild pass straight through to the curriculum.
 *
 * Deliberately NOT applied to a parent account with one child: a grown-up may be
 * mid-setup and about to add a second, and the picker is where they do it. Nor
 * to a learner who has since added more profiles — then the question is real.
 */
function autoSelectedProfile(account, profiles) {
  if (!isLearnerAccount(account)) return null;
  return (profiles?.length === 1 ? profiles[0] : null) ?? null;
}

// The provider receives React's own `children` prop AND exposes the parent's
// child PROFILES. They are deliberately named apart: `subtree` is the React
// tree, `childProfiles` is the account data.
export function AuthProvider({ children: subtree }) {
  const [parent, setParent] = useState(null);
  const [childProfiles, setChildProfiles] = useState([]);
  const [child, setChild] = useState(null);
  const [bootstrapped, setBootstrapped] = useState(false);
  const [error, setError] = useState(null);

  // Guards every async setState against a unmounted provider.
  const aliveRef = useRef(true);
  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // --- Rehydrate the session once on mount -------------------------------
  useEffect(() => {
    let cancelled = false;

    (async () => {
      const session = readSession();

      if (!session?.parentId) {
        if (!cancelled && aliveRef.current) setBootstrapped(true);
        return;
      }

      try {
        const savedParent = await resolveParent(session);
        if (cancelled || !aliveRef.current) return;

        if (!savedParent) {
          clearSession();
          setBootstrapped(true);
          return;
        }

        const profiles = await store.listChildren(session.parentId);
        if (cancelled || !aliveRef.current) return;

        let activeChild = null;
        if (session.childId) {
          const saved = await store.getChild(session.childId);
          if (cancelled || !aliveRef.current) return;
          // The child must still exist AND still belong to this parent.
          if (saved && saved.parentId === session.parentId) activeChild = saved;
        }
        // A learner's own profile needs no picking, on a reload as much as on a
        // fresh sign-in.
        activeChild = activeChild ?? autoSelectedProfile(savedParent, profiles);

        setParent(savedParent);
        setChildProfiles(profiles || []);
        setChild(activeChild);
        // Re-persist so a dropped child id doesn't linger in storage.
        writeSession(
          session.parentId,
          activeChild?._id ?? null,
          savedParent.email
        );
        // Kept current on every boot, so the login screen this device eventually
        // falls back to shows the profiles that actually exist now.
        writeLastAccount(savedParent, profiles || []);
        setBootstrapped(true);
      } catch {
        // Unreadable store — fall back to signed out rather than half a session.
        if (cancelled || !aliveRef.current) return;
        clearSession();
        setParent(null);
        setChildProfiles([]);
        setChild(null);
        setBootstrapped(true);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // --- Actions ------------------------------------------------------------

  const signUp = useCallback(async ({ email, password, accountType, ageBand }) => {
    setError(null);
    try {
      // `accountType`/`ageBand` omitted means a grown-up's account, so every
      // pre-existing caller keeps its current behaviour.
      const newParent = await store.createParent({
        email,
        password,
        accountType,
        ageBand,
      });
      if (!aliveRef.current) return newParent;
      setParent(newParent);
      setChildProfiles([]);
      setChild(null);
      writeSession(newParent._id, null, newParent.email);
      // No profiles yet — the wizard creates the first one immediately after,
      // and `addChild` refreshes this record with the face to show next time.
      writeLastAccount(newParent, []);
      return newParent;
    } catch (err) {
      if (aliveRef.current) setError(err?.message || "SIGNUP_FAILED");
      // Rethrown as well as recorded: the auth pages branch on the thrown
      // Error (notably "EMAIL_TAKEN") to show a field-level message.
      throw err;
    }
  }, []);

  const signIn = useCallback(async ({ email, password }) => {
    setError(null);
    try {
      const found = await store.verifyParent({ email, password });
      if (!found) {
        if (aliveRef.current) setError("INVALID_CREDENTIALS");
        // A wrong email/password must be a rejection, not a quiet null, or the
        // Login page would navigate as though the sign-in had worked.
        throw new Error("INVALID_CREDENTIALS");
      }
      const profiles = await store.listChildren(found._id);
      if (!aliveRef.current) return found;
      setParent(found);
      setChildProfiles(profiles || []);
      // A grown-up always picks who is playing. A learner signing into their own
      // single profile has nothing to pick, so they skip the screen entirely.
      const auto = autoSelectedProfile(found, profiles);
      setChild(auto);
      writeSession(found._id, auto?._id ?? null, found.email);
      // Refreshed on every sign-in, so a profile renamed or deleted on another
      // device stops showing a stale face on this one.
      writeLastAccount(found, profiles || []);
      return found;
    } catch (err) {
      if (aliveRef.current) setError(err?.message || "SIGNIN_FAILED");
      throw err;
    }
  }, []);

  const signOut = useCallback(async () => {
    // Clearing local state alone would leave the server's session cookie alive,
    // so "sign out" on a shared device wouldn't actually sign anyone out. Tell
    // the backend first (no-op for the localStorage driver, which has none).
    if (typeof store.signOutParent === "function") {
      try {
        await store.signOutParent();
      } catch {
        // Offline or server down: still clear locally. The cookie expires on
        // its own, and refusing to sign out would be the worse failure.
      }
    }
    clearSession();
    // Signing out is the one deliberate "forget me" gesture the UI offers, so
    // the welcome-back faces and the remembered email go with it.
    clearLastAccount();
    setParent(null);
    setChildProfiles([]);
    setChild(null);
    setError(null);
  }, []);

  const selectChild = useCallback(
    async (childId) => {
      if (!parent) throw new Error("NOT_SIGNED_IN");
      setError(null);
      try {
        const picked = await store.getChild(childId);
        if (!picked || picked.parentId !== parent._id) {
          if (aliveRef.current) setError("CHILD_NOT_FOUND");
          throw new Error("CHILD_NOT_FOUND");
        }
        if (!aliveRef.current) return picked;
        setChild(picked);
        writeSession(parent._id, picked._id, parent.email);
        return picked;
      } catch (err) {
        if (aliveRef.current) setError(err?.message || "SELECT_CHILD_FAILED");
        throw err;
      }
    },
    [parent]
  );

  const addChild = useCallback(
    async ({ name, avatar, colour, yearGroup }) => {
      if (!parent) throw new Error("NOT_SIGNED_IN");
      setError(null);
      try {
        const existing = await store.listChildren(parent._id);
        const isFirstChild = (existing || []).length === 0;

        const created = await store.createChild(parent._id, {
          name,
          avatar,
          colour,
          yearGroup,
        });

        const profiles = await store.listChildren(parent._id);
        if (!aliveRef.current) return created;
        setChildProfiles(profiles || []);
        writeLastAccount(parent, profiles || []);

        if (isFirstChild) {
          setChild(created);
          writeSession(parent._id, created._id, parent.email);
        }

        return created;
      } catch (err) {
        if (aliveRef.current) setError(err?.message || "ADD_CHILD_FAILED");
        throw err;
      }
    },
    [parent]
  );

  /**
   * Partial update to one of this parent's profiles.
   *
   * Refreshes three things that can otherwise disagree: the profile list, the
   * ACTIVE child (whose object is held separately, so a rename would show the
   * old name until the next sign-in), and the welcome-back record on the login
   * screen.
   */
  const updateChild = useCallback(
    async (childId, patch) => {
      if (!parent) throw new Error("NOT_SIGNED_IN");
      setError(null);
      try {
        // Ownership is enforced by the store/server, but checking here turns a
        // 404 into a clear code before a request is even made.
        const owned = (childProfiles || []).some((kid) => kid._id === childId);
        if (!owned) throw new Error("CHILD_NOT_FOUND");

        const updated = await store.updateChild(childId, patch);
        const profiles = await store.listChildren(parent._id);
        if (!aliveRef.current) return updated;

        setChildProfiles(profiles || []);
        if (child?._id === childId) setChild(updated);
        writeLastAccount(parent, profiles || []);
        return updated;
      } catch (err) {
        if (aliveRef.current) setError(err?.message || "UPDATE_CHILD_FAILED");
        throw err;
      }
    },
    [parent, child, childProfiles]
  );

  const removeChild = useCallback(
    async (childId) => {
      if (!parent) throw new Error("NOT_SIGNED_IN");
      setError(null);
      try {
        await store.deleteChild(childId);
        const profiles = await store.listChildren(parent._id);
        if (!aliveRef.current) return true;
        setChildProfiles(profiles || []);
        // A deleted profile must stop appearing on the login screen too.
        writeLastAccount(parent, profiles || []);

        // Deleting the child who is currently playing drops back to /profiles.
        if (child?._id === childId) {
          setChild(null);
          writeSession(parent._id, null, parent.email);
        }
        return true;
      } catch (err) {
        if (aliveRef.current) setError(err?.message || "REMOVE_CHILD_FAILED");
        throw err;
      }
    },
    [parent, child]
  );

  // Derived rather than stored, so it can never disagree with the state it
  // describes.
  const status = !bootstrapped
    ? "loading"
    : !parent
      ? "signedOut"
      : !child
        ? "needsChild"
        : "ready";

  // Derived, never stored, so it cannot disagree with the account it describes.
  // Three screens read it: the profile picker's copy, the Parent Area's title,
  // and where signup lands.
  const isLearner = isLearnerAccount(parent);

  const value = useMemo(
    () => ({
      parent,
      children: childProfiles,
      child,
      status,
      isLearner,
      error,
      signUp,
      signIn,
      signOut,
      addChild,
      selectChild,
      updateChild,
      removeChild,
    }),
    [
      parent,
      childProfiles,
      child,
      status,
      isLearner,
      error,
      signUp,
      signIn,
      signOut,
      addChild,
      selectChild,
      updateChild,
      removeChild,
    ]
  );

  return <AuthContext.Provider value={value}>{subtree}</AuthContext.Provider>;
}
