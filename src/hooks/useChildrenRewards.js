import { useEffect, useState } from "react";
import { store } from "../data/store";
import { normaliseRewards } from "../data/rewardsShape";

/**
 * Rewards for a LIST of children, keyed by child id.
 *
 * The sibling of `useChildrenProgress`, and for the same reason: `useRewards`
 * keys off the ACTIVE child, but Profiles and the Parent Area show every child
 * at once. Failed reads return null for that child, distinct from a new
 * learner's valid empty rewards.
 *
 * Read-only — awarding happens in `RewardsProvider` (src/context/RewardsContext.jsx),
 * at the one moment a challenge completes. Nothing here writes, so a grown-up opening this screen can never
 * change what a child has earned.
 *
 * `bump` re-reads after a profile edit, so the avatar row reflects a change
 * made on this very screen without a reload.
 */
export function useChildrenRewards(children, bump = 0) {
  const [state, setState] = useState({ rewards: {}, loading: false });

  const childIds = (children ?? []).map((child) => child._id);
  const key = childIds.join("|");

  useEffect(() => {
    let cancelled = false;

    if (childIds.length === 0) {
      setState({ rewards: {}, loading: false });
      return () => {
        cancelled = true;
      };
    }

    setState({ rewards: {}, loading: true });

    Promise.all(
      childIds.map(async (childId) => {
        try {
          const doc = await store.getRewards(childId);
          return [childId, normaliseRewards(doc?.data)];
        } catch {
          // One unreadable document must not blank out the siblings'.
          return [childId, null];
        }
      })
    ).then((entries) => {
      if (cancelled) return;
      setState({ rewards: Object.fromEntries(entries), loading: false });
    });

    return () => {
      cancelled = true;
    };
    // `key` stands in for childIds, which is a new array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, bump]);

  return state;
}
