import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AuthContext } from "./auth-context";
import { RewardsContext } from "./rewards-context";
import { store } from "../data/store";
import { normaliseRewards } from "../data/rewardsShape";
import { awardRun } from "../data/awardRun";
import { XP, backfillXp, displayXp } from "../data/xp";
import { clearNews as clearNewsFrom, hasNews } from "../data/news";
import { loadResumeCandidates } from "../data/resumeCandidates";
import { isChallengeImplemented } from "../data/challengeAvailability";

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

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
 *   - `refresh()` re-reads in the background (a challenge page opening, the
 *     tab coming back), so a tablet left open all day never writes over what
 *     the same child earned on another device since
 *   - a run finished before the read lands is QUEUED, not dropped, and
 *     awarded the moment the document is in
 *
 * `award` reads refs, not state: ChallengeShell calls onComplete from a timer
 * set a second earlier, so the callback it holds can be a render out of date.
 */
export function RewardsProvider({ children }) {
  const auth = useContext(AuthContext);
  const childId = auth?.child?._id ?? null;

  const loadedKeyRef = useRef(null);
  const latestRef = useRef(normaliseRewards(null));
  const statusRef = useRef("idle");
  const backfillRef = useRef(null);
  const writesRef = useRef(0);
  const queueRef = useRef([]);
  const readsRef = useRef(0);
  // One save in flight at a time, so replies can never land out of order and
  // leave an older document on the server: a newer one waits in `queued`.
  const sendingRef = useRef({ busy: false, queued: null, failed: false });
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState({
    status: "idle",
    rewards: latestRef.current,
    pendingBackfill: null,
  });

  const send = useCallback((forChild, doc) => {
    const sending = sendingRef.current;
    if (sending.busy) {
      sending.queued = { forChild, doc };
      return;
    }
    sending.busy = true;
    store
      .saveRewards(forChild, doc)
      .then(
        () => {
          sending.failed = false;
        },
        () => {
          // Kept in memory; `refresh` sends it again rather than reading over it.
          sending.failed = true;
        }
      )
      .finally(() => {
        sending.busy = false;
        const waiting = sending.queued;
        sending.queued = null;
        if (waiting) send(waiting.forChild, waiting.doc);
      });
  }, []);

  const save = useCallback(
    (forChild, next) => {
      latestRef.current = next;
      writesRef.current += 1;
      setState((s) => ({ ...s, rewards: next }));
      send(forChild, next);
    },
    [send]
  );

  useEffect(() => {
    let cancelled = false;
    readsRef.current += 1; // any refresh still in flight is now out of date
    loadedKeyRef.current = null;
    latestRef.current = normaliseRewards(null);
    // A failed save belongs to the child being left (a known limit: it is
    // dropped with the in-memory copy, as before).
    sendingRef.current.failed = false;
    statusRef.current = childId ? "loading" : "idle";
    backfillRef.current = null;
    setState({ status: statusRef.current, rewards: latestRef.current, pendingBackfill: null });
    if (!childId) return () => {
      cancelled = true;
    };

    (async () => {
      let doc;
      try {
        doc = await store.getRewards(childId);
      } catch {
        if (cancelled) return;
        statusRef.current = "failed";
        setState((s) => ({ ...s, status: "failed" }));
        return;
      }
      if (cancelled) return;

      let rewards = normaliseRewards(doc?.data);

      // The one-off back-fill needs every progress document. Read-only; a
      // failure leaves it null, and awardRun then leaves it for a later visit.
      // Read BEFORE draining the queue: a queued first completion is already
      // in the progress documents, so the back-fill must not count it again.
      let backfill = null;
      if (!rewards.xpBackfilled) {
        try {
          const candidates = await loadResumeCandidates(store, childId, isChallengeImplemented);
          backfill = backfillXp(candidates);
        } catch {
          // Next visit.
        }
        if (cancelled) return;
      }

      // Runs finished while the read was in flight (or had failed).
      const mine = queueRef.current.filter((entry) => entry.childId === childId);
      queueRef.current = queueRef.current.filter((entry) => entry.childId !== childId);
      if (mine.length > 0 && backfill !== null) {
        const firsts = mine.filter(({ input }) => input.firstTime).length;
        const pendingBackfill = Math.max(0, backfill - firsts * XP.backfill);
        mine[0] = { ...mine[0], input: { ...mine[0].input, pendingBackfill } };
        backfill = null; // stored by that first run
      }
      for (const { input } of mine) rewards = awardRun(rewards, input).rewards;

      loadedKeyRef.current = childId;
      latestRef.current = rewards;
      backfillRef.current = rewards.xpBackfilled ? null : backfill;
      statusRef.current = "ready";
      setState({ status: "ready", rewards, pendingBackfill: backfillRef.current });
      if (mine.length > 0) save(childId, rewards);
    })();

    return () => {
      cancelled = true;
    };
  }, [childId, attempt, save]);

  const award = useCallback(
    (input) => {
      if (!childId) return null;
      if (statusRef.current !== "ready" || loadedKeyRef.current !== childId) {
        queueRef.current.push({ childId, input });
        if (statusRef.current === "failed") setAttempt((n) => n + 1);
        return null;
      }
      const result = awardRun(latestRef.current, { ...input, pendingBackfill: backfillRef.current });
      // A replay past today's practice cap on a day already counted changes
      // nothing, so there is nothing to save.
      if (!same(result.rewards, latestRef.current)) save(childId, result.rewards);
      return result;
    },
    [childId, save]
  );

  // A failed read is retried, never written over: bump `attempt` to re-read.
  // A good read is refreshed in place, and the answer is used only if nothing
  // was saved while it was in flight (what is in memory is then newer).
  const refresh = useCallback(() => {
    if (statusRef.current === "failed") {
      setAttempt((n) => n + 1);
      return;
    }
    if (statusRef.current !== "ready" || loadedKeyRef.current !== childId) return;
    // A save that failed holds the only copy of what was earned: send it
    // again, never read an older document over it. One still going will
    // bring the server up to date by itself.
    const sending = sendingRef.current;
    if (sending.failed) {
      send(childId, latestRef.current);
      return;
    }
    if (sending.busy) return;
    const writes = writesRef.current;
    const read = (readsRef.current += 1);
    store.getRewards(childId).then(
      (doc) => {
        // Only the newest read counts, and only if nothing was saved meanwhile.
        if (read !== readsRef.current) return;
        if (loadedKeyRef.current !== childId || writesRef.current !== writes) return;
        const rewards = normaliseRewards(doc?.data);
        if (same(rewards, latestRef.current)) return;
        latestRef.current = rewards;
        if (rewards.xpBackfilled) backfillRef.current = null;
        setState((s) => ({
          ...s,
          rewards,
          pendingBackfill: rewards.xpBackfilled ? null : s.pendingBackfill,
        }));
      },
      () => {
        // Keep what we have: it came from a good read.
      }
    );
  }, [childId, send]);

  useEffect(() => {
    const onVisible = () => {
      if (document.visibilityState === "visible") refresh();
    };
    window.addEventListener("focus", refresh);
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      window.removeEventListener("focus", refresh);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [refresh]);

  const clearNews = useCallback(() => {
    if (statusRef.current !== "ready" || loadedKeyRef.current !== childId) return;
    if (!hasNews(latestRef.current)) return;
    save(childId, clearNewsFrom(latestRef.current));
  }, [childId, save]);

  const value = useMemo(
    () => ({
      rewards: state.rewards,
      status: state.status,
      hydrated: state.status === "ready",
      pendingBackfill: state.pendingBackfill,
      xp: displayXp(state.rewards, state.pendingBackfill),
      award,
      clearNews,
      retry: refresh,
      refresh,
    }),
    [state, award, clearNews, refresh]
  );

  return <RewardsContext.Provider value={value}>{children}</RewardsContext.Provider>;
}
