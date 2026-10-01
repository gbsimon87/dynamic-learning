import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../context/auth-context";
import { store } from "../data/store";
import * as rules from "../data/progressRules";
import { readProgress, saveProgressInOrder } from "../data/progressPersistence";

/**
 * Shared curriculum-progress hook — now account-aware.
 *
 * Progress belongs to the ACTIVE CHILD PROFILE, not to the browser. The
 * signature, existing return fields and every unlock rule below are unchanged from
 * the localStorage-only version. Retry/error fields expose storage failures;
 * the read/write path moved:
 *
 *   read   localStorage[`${subject}Progress_year${year}`]
 *          -> await store.getProgress(childId, year, subject) -> doc.data
 *   write  localStorage.setItem(...)
 *          -> await store.saveProgress(childId, year, subject, data)
 *
 * The stored `data` payload keeps the exact same (unversioned) shape:
 * {
 *   [categoryId]: {
 *     topics: {
 *       [topicId]: { completedChallenges: [1, 2] }
 *     }
 *   }
 * }
 *
 * See .claude/skills/curriculum-progress for the full data contract and the
 * non-negotiables this preserves.
 */
export function useProgress(year, subject) {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  // Identifies which document the in-memory `progress` was loaded from.
  // Without it, a child switch would write the OUTGOING child's progress into
  // the INCOMING child's document: the load effect resets state, but the save
  // effect below still runs once with the previous render's `progress`.
  const documentKey = `${childId ?? "none"}|${year}|${subject}`;
  const loadedKeyRef = useRef(null);
  const lastSavedRef = useRef(null);

  const [hydrated, setHydrated] = useState(false);
  const [progress, setProgress] = useState({});
  const [loadError, setLoadError] = useState(false);
  const [saveError, setSaveError] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [saveAttempt, setSaveAttempt] = useState(0);

  // Load the active child's document. Re-runs on child / year / subject change.
  useEffect(() => {
    let cancelled = false;

    // Anything currently in memory belongs to the PREVIOUS document.
    loadedKeyRef.current = null;
    lastSavedRef.current = null;
    setHydrated(false);
    setProgress({});
    setLoadError(false);
    setSaveError(false);

    if (!childId) {
      // No active child: be completely inert — empty progress, never a write.
      loadedKeyRef.current = null;
      setHydrated(true);
      return () => {
        cancelled = true;
      };
    }

    (async () => {
      let data;
      try {
        data = await readProgress(store, childId, year, subject);
      } catch {
        // Never turn a failed read into a writable empty document.
        if (!cancelled) setLoadError(true);
        return;
      }
      if (cancelled) return;

      lastSavedRef.current = JSON.stringify(data);
      loadedKeyRef.current = documentKey;
      setProgress(data);
      setHydrated(true);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, year, subject, documentKey, loadAttempt]);

  // Persist updates — guarded by `hydrated` AND by `loadedKeyRef` so neither
  // the initial empty state nor another child's state can ever overwrite real
  // saved progress before the async load has resolved.
  useEffect(() => {
    if (!hydrated || !childId) return;
    if (loadedKeyRef.current !== documentKey) return;

    const serialised = JSON.stringify(progress);
    // Skip the no-op write that would otherwise fire right after hydration.
    if (serialised === lastSavedRef.current) return;
    let cancelled = false;
    saveProgressInOrder(store, childId, year, subject, progress).then(() => {
      if (cancelled || loadedKeyRef.current !== documentKey) return;
      lastSavedRef.current = serialised;
      setSaveError(false);
    }).catch(() => {
      if (!cancelled && loadedKeyRef.current === documentKey) setSaveError(true);
    });
    return () => { cancelled = true; };
  }, [progress, hydrated, childId, year, subject, documentKey, saveAttempt]);

  // Every predicate below is the pure rule from ../data/progressRules bound to
  // this hook's state. The rules live there so the curriculum screen's lock
  // state and the next-challenge resolver cannot drift apart from what gets
  // written here. Signatures are unchanged from the inline versions.

  const isTopicComplete = (categoryId, topicId, topic) =>
    rules.isTopicComplete(progress, categoryId, topicId, topic);

  const isChallengeUnlocked = (
    categoryId,
    topicId,
    topic,
    challengeIndex,
    skipChallenge
  ) =>
    rules.isChallengeUnlocked(
      progress,
      categoryId,
      topicId,
      topic,
      challengeIndex,
      skipChallenge
    );

  const isCategoryComplete = (category, skipTopic) =>
    rules.isCategoryComplete(progress, category, skipTopic);

  const isCategoryPassable = (category, skipTopic) =>
    rules.isCategoryPassable(progress, category, skipTopic);

  const isChallengeComplete = (categoryId, topicId, challengeId) =>
    rules.isChallengeComplete(progress, categoryId, topicId, challengeId);

  /**
   * Marks a challenge complete. The reducer returns the SAME object when it was
   * already complete, so React bails out of the update and the save effect
   * never fires a duplicate write.
   */
  const completeChallenge = (categoryId, topicId, challengeId) => {
    if (!hydrated || !childId || loadedKeyRef.current !== documentKey) return;
    setProgress((prev) =>
      rules.completeChallenge(prev, categoryId, topicId, challengeId)
    );
  };

  return {
    progress,
    hydrated: hydrated && (!childId || loadedKeyRef.current === documentKey),
    loadError,
    saveError,
    retryLoad: () => setLoadAttempt((attempt) => attempt + 1),
    retrySave: () => setSaveAttempt((attempt) => attempt + 1),
    isTopicComplete,
    isChallengeUnlocked,
    isCategoryComplete,
    isCategoryPassable,
    isChallengeComplete,
    completeChallenge,
  };
}
