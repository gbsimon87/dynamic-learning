// /src/context/AuthContext.jsx
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "./auth-context";
import { store } from "../data/store";

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

        setParent(savedParent);
        setChildProfiles(profiles || []);
        setChild(activeChild);
        // Re-persist so a dropped child id doesn't linger in storage.
        writeSession(
          session.parentId,
          activeChild?._id ?? null,
          savedParent.email
        );
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

  const signUp = useCallback(async ({ email, password }) => {
    setError(null);
    try {
      const newParent = await store.createParent({ email, password });
      if (!aliveRef.current) return newParent;
      setParent(newParent);
      setChildProfiles([]);
      setChild(null);
      writeSession(newParent._id, null, newParent.email);
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
      // Signing in never auto-selects a child: the grown-up picks who is playing.
      setChild(null);
      writeSession(found._id, null, found.email);
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
    async ({ name, avatar, colour }) => {
      if (!parent) throw new Error("NOT_SIGNED_IN");
      setError(null);
      try {
        const existing = await store.listChildren(parent._id);
        const isFirstChild = (existing || []).length === 0;

        const created = await store.createChild(parent._id, {
          name,
          avatar,
          colour,
        });

        const profiles = await store.listChildren(parent._id);
        if (!aliveRef.current) return created;
        setChildProfiles(profiles || []);

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

  const removeChild = useCallback(
    async (childId) => {
      if (!parent) throw new Error("NOT_SIGNED_IN");
      setError(null);
      try {
        await store.deleteChild(childId);
        const profiles = await store.listChildren(parent._id);
        if (!aliveRef.current) return true;
        setChildProfiles(profiles || []);

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

  const value = useMemo(
    () => ({
      parent,
      children: childProfiles,
      child,
      status,
      error,
      signUp,
      signIn,
      signOut,
      addChild,
      selectChild,
      removeChild,
    }),
    [
      parent,
      childProfiles,
      child,
      status,
      error,
      signUp,
      signIn,
      signOut,
      addChild,
      selectChild,
      removeChild,
    ]
  );

  return <AuthContext.Provider value={value}>{subtree}</AuthContext.Provider>;
}
