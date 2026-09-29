import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "./auth-context";
import { RewardsContext } from "./rewards-context";
import { store } from "../data/store";
import { normaliseRewards } from "../data/rewardsShape";
import { awardRun } from "../data/awardRun";
import { backfillXp, displayXp } from "../data/xp";
import { clearNews as clearNewsFrom, hasNews } from "../data/news";
import { loadResumeCandidates } from "../data/resumeCandidates";
import { isChallengeImplemented } from "../data/challengeAvailability";

/**
 * The ACTIVE child's rewards, one in-memory document shared by every screen
 * (challenge page, navbar, home, Trophy Room), so the "something new" dot
 * moves the instant a sticker is won.
 *
 * Writes at exactly two moments: `award` (a challenge finished) and
 * `clearNews` (the child opened their own Trophy Room). Guards, as in
 * useProgress:
 *   - `loadedKeyRef`: never write one child's rewards into another's document
 *   - a FAILED read stays `failed`, never `ready`, so it can never be followed
 *     by a write that would erase the real document; `award` asks for a re-read
 *   - `latestRef` holds the newest document, so two writes in a row never
 *     build on a stale copy
 */
export function RewardsProvider({ children }) {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  const loadedKeyRef = useRef(null);
  const latestRef = useRef(normaliseRewards(null));
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    status: "idle",
    rewards: latestRef.current,
    pendingBackfill: null,
  });

  useEffect(() => {
    let cancelled = false;
    loadedKeyRef.current = null;
    latestRef.current = normaliseRewards(null);
    setState({ status: childId ? "loading" : "idle", rewards: latestRef.current, pendingBackfill: null });
    if (!childId) return () => {
      cancelled = true;
    };

    (async () => {
      let doc;
      try {
        doc = await store.getRewards(childId);
      } catch {
        if (!cancelled) setState((s) => ({ ...s, status: "failed" }));
        return;
      }
      if (cancelled) return;

      const rewards = normaliseRewards(doc?.data);
      loadedKeyRef.current = childId;
      latestRef.current = rewards;
      setState({ status: "ready", rewards, pendingBackfill: null });

      // The one-off back-fill needs every progress document. Read-only; a
      // failure leaves it null, and awardRun then leaves it for a later visit.
      if (!rewards.xpBackfilled) {
        try {
          const candidates = await loadResumeCandidates(store, childId, isChallengeImplemented);
          if (!cancelled) setState((s) => ({ ...s, pendingBackfill: backfillXp(candidates) }));
        } catch {
          // Next visit.
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, attempt]);

  const save = useCallback(
    (next) => {
      latestRef.current = next;
      setState((s) => ({ ...s, rewards: next }));
      store.saveRewards(childId, next).catch(() => {
        // Kept in memory for this visit; the next successful save includes it.
      });
    },
    [childId]
  );

  const award = useCallback(
    (input) => {
      if (state.status === "failed") {
        setAttempt((n) => n + 1);
        return null;
      }
      if (state.status !== "ready" || loadedKeyRef.current !== childId) return null;
      const result = awardRun(latestRef.current, { ...input, pendingBackfill: state.pendingBackfill });
      save(result.rewards);
      return result;
    },
    [state.status, state.pendingBackfill, childId, save]
  );

  const clearNews = useCallback(() => {
    if (state.status !== "ready" || loadedKeyRef.current !== childId) return;
    if (!hasNews(latestRef.current)) return;
    save(clearNewsFrom(latestRef.current));
  }, [state.status, childId, save]);

  const value = useMemo(
    () => ({
      rewards: state.rewards,
      status: state.status,
      hydrated: state.status === "ready",
      pendingBackfill: state.pendingBackfill,
      xp: displayXp(state.rewards, state.pendingBackfill),
      award,
      clearNews,
    }),
    [state, award, clearNews]
  );

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}
