import { useEffect, useState } from "react";
import { store } from "../data/store";
import { isChallengeImplemented } from "../data/challengeAvailability";
import { loadResumeCandidates } from "../data/resumeCandidates";
import { pickResume } from "../data/curriculumResume";

/**
 * Progress summaries for a LIST of children, keyed by child id.
 *
 * `useProgress` and `useHomeResume` both key off the *active* child, so neither
 * can serve the profile picker — that screen renders before anyone is selected
 * and needs an answer for every child at once.
 *
 * Strictly read-only (.claude/skills/curriculum-progress). It never writes, and
 * a failed read yields `null` for that child — "no progress to show" — rather
 * than an error state, because a grown-up should still be able to pick a
 * profile when the network is having a bad day.
 *
 * COST: one store read per child per available curriculum, so 2 per child
 * today. Free on localStorage; N×2 HTTP requests against the API. Fine at
 * family scale — the honest fix if that ever stops being true is a bulk
 * summary endpoint on the server, not caching here.
 *
 * @param {object[]} children  child profiles, as AuthContext exposes them
 * @returns {{summaries: Record<string, object|null>, loading: boolean}}
 *   a summary is `pickResume`'s shape, or `null` for a child who has not
 *   started anything.
 */
export function useChildrenProgress(children) {
  const [state, setState] = useState({ summaries: {}, loading: false });

  // The ids, not the array: AuthContext hands back a fresh array on every
  // refresh, and depending on the array itself would re-read on each one.
  const childIds = (children ?? []).map((child) => child._id);
  const key = childIds.join("|");

  useEffect(() => {
    let cancelled = false;

    if (childIds.length === 0) {
      setState({ summaries: {}, loading: false });
      return () => {
        cancelled = true;
      };
    }

    setState({ summaries: {}, loading: true });

    Promise.all(
      childIds.map(async (childId) => {
        try {
          const candidates = await loadResumeCandidates(
            store,
            childId,
            isChallengeImplemented
          );
          return [childId, pickResume(candidates)];
        } catch {
          // One child's unreadable document must not blank out its siblings'.
          return [childId, null];
        }
      })
    ).then((entries) => {
      if (cancelled) return;
      setState({ summaries: Object.fromEntries(entries), loading: false });
    });

    return () => {
      cancelled = true;
    };
    // `key` stands in for childIds, which is a new array each render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  return state;
}
