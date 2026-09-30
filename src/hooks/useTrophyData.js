import { useEffect, useState } from "react";
import { store } from "../data/store";
import { normaliseRewards } from "../data/rewardsShape";
import { isChallengeImplemented } from "../data/challengeAvailability";
import { loadResumeCandidates } from "../data/resumeCandidates";

/**
 * Everything the Trophy Room shows for ONE child — any child of this account,
 * not only the active one, so a grown-up can look through each child's room.
 *
 * Strictly read-only (.claude/skills/curriculum-progress): a rewards read and
 * the same per-curriculum progress reads the homepage makes. It never writes,
 * so opening someone's Trophy Room can never change what they have earned.
 *
 * A failed read degrades to "nothing yet" rather than an error screen.
 *
 * `{ rewards: false }` skips the rewards read, for a caller that already has
 * them (the child's own room and the home page use RewardsProvider's copy).
 *
 * @returns {{loading: boolean, rewards: object, candidates: object[]}}
 *   `candidates` is `loadResumeCandidates`' shape, one per curriculum.
 */
export function useTrophyData(childId, { rewards: withRewards = true } = {}) {
  const [state, setState] = useState({
    childId: null,
    rewards: normaliseRewards(),
    candidates: [],
  });

  useEffect(() => {
    let cancelled = false;
    if (!childId) return undefined;

    Promise.all([
      withRewards ? store.getRewards(childId).catch(() => null) : null,
      loadResumeCandidates(store, childId, isChallengeImplemented).catch(() => []),
    ]).then(([doc, candidates]) => {
      if (cancelled) return;
      setState({ childId, rewards: normaliseRewards(doc?.data), candidates });
    });

    return () => {
      cancelled = true;
    };
  }, [childId, withRewards]);

  // Until the read for THIS child lands, show loading rather than the previous
  // child's trophies under the new child's name.
  const loading = state.childId !== childId;
  return {
    loading,
    rewards: loading ? normaliseRewards() : state.rewards,
    candidates: loading ? [] : state.candidates,
  };
}
