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
  const [hydrated, setHydrated] = useState(false);
  const [rewards, setRewards] = useState(emptyRewards());

  useEffect(() => {
    let cancelled = false;

    // Anything in memory belongs to the PREVIOUS child.
    loadedKeyRef.current = null;
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
      let data = emptyRewards();
      try {
        const doc = await store.getRewards(childId);
        if (doc?.data && typeof doc.data === "object") {
          data = { ...emptyRewards(), ...doc.data };
        }
      } catch {
        // Unreadable store degrades to "no badges yet" in memory — but
        // `loadedKeyRef` stays unset below only if we bail, so be careful: we
        // DO mark it loaded, because a child with a genuinely empty document
        // is indistinguishable here, and refusing to ever award again would be
        // worse than re-awarding a badge the next save reconciles.
        data = emptyRewards();
      }
      if (cancelled) return;

      loadedKeyRef.current = childId;
      setRewards(data);
      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId]);

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
