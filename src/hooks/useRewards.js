import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { store } from "../data/store";
import { earnBadges, emptyRewards } from "../data/badges";

/**
 * The active child's badges.
 *
 * Structured on `useProgress` deliberately, because the same hazard applies:
 * the document is loaded asynchronously, and without the guards below a child
 * switch writes the OUTGOING child's rewards into the INCOMING child's
 * document. `loadedKeyRef` is what makes that impossible — see the comment in
 * useProgress, which this mirrors.
 *
 * Unlike progress, the write is EXPLICIT rather than an effect on state: badges
 * are awarded at one moment (a challenge completing) and nowhere else, so a
 * save-on-change effect would only add ways to write by accident.
 */
export function useRewards() {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  const loadedKeyRef = useRef(null);
  // Set when the read FAILED, as distinct from "this child has no rewards yet".
  // A failed read must never be followed by a write: the in-memory document
  // would be empty, and saving it would erase the real one.
  const failedRef = useRef(false);
  const [attempt, setAttempt] = useState(0);
  const [hydrated, setHydrated] = useState(false);
  const [rewards, setRewards] = useState(emptyRewards());

  useEffect(() => {
    let cancelled = false;

    // Anything in memory belongs to the PREVIOUS child.
    loadedKeyRef.current = null;
    failedRef.current = false;
    setHydrated(false);
    setRewards(emptyRewards());

    if (!childId) {
      // No active child: inert. Never a read, never a write.
      setHydrated(true);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      let doc;
      try {
        doc = await store.getRewards(childId);
      } catch {
        // Stay un-hydrated: `award` refuses to write and asks for a re-read.
        if (!cancelled) failedRef.current = true;
        return;
      }
      if (cancelled) return;

      const data =
        doc?.data && typeof doc.data === "object"
          ? { ...emptyRewards(), ...doc.data }
          : emptyRewards();
      loadedKeyRef.current = childId;
      setRewards(data);
      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, attempt]);

  /**
   * Awards badges for milestones that have just been earned, and persists.
   *
   * @param {string[]} earned  levels from getCompletionMilestones
   * @param {object} context   { year, subject }
   * @returns {object[]} the catalogue entries just earned, for the celebration
   *   to announce. Empty when nothing new was won.
   */
  const award = useCallback(
    (earned, context = {}) => {
      if (failedRef.current) {
        // The last read failed: re-read, and award nothing this time rather
        // than overwrite the real document with an empty one.
        failedRef.current = false;
        setAttempt((n) => n + 1);
        return [];
      }
      // Un-hydrated means we do not yet know what this child already holds, so
      // awarding now could duplicate a badge AND overwrite the real document.
      if (!hydrated || !childId) return [];
      if (loadedKeyRef.current !== childId) return [];

      const next = earnBadges(rewards, earned, {
        ...context,
        at: new Date().toISOString(),
      });
      // Identity: `earnBadges` returns the same object when nothing moved.
      if (next.rewards === rewards) return [];

      setRewards(next.rewards);
      store.saveRewards(childId, next.rewards).catch(() => {
        // Write failed — the badge stays in memory for this session and is
        // re-awarded next time, since the stored document never saw it.
      });
      return next.awarded;
    },
    [rewards, hydrated, childId]
  );

  return { rewards, hydrated, award };
}
