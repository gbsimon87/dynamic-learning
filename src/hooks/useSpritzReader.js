import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { chunkDelay, tokenize } from "./spritzTiming";

/**
 * Drive one spritz-style reading session.
 *
 * Each displayed chunk owns its own timeout because its duration depends on
 * its word length and punctuation. Refs hold the scheduler's immediate state
 * so controls remain correct when several events arrive before React renders.
 */
export function useSpritzReader({ text, wpm, chunkSize, onFinish }) {
  const chunks = useMemo(() => tokenize(text, chunkSize), [text, chunkSize]);
  const totalWords = useMemo(
    () => chunks.reduce((total, item) => total + item.words.length, 0),
    [chunks]
  );

  const [index, setIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [elapsedMs, setElapsedMs] = useState(0);
  const [timerRevision, setTimerRevision] = useState(0);
  const wordsShown = useMemo(
    () =>
      chunks
        .slice(0, index + 1)
        .reduce((total, item) => total + item.words.length, 0),
    [chunks, index]
  );

  const timerRef = useRef(null);
  const startedAtRef = useRef(null);
  const accumulatedMsRef = useRef(0);
  const indexRef = useRef(0);
  const isPlayingRef = useRef(false);
  const isFinishedRef = useRef(false);
  const finishReportedRef = useRef(false);
  const resetChunksRef = useRef(null);
  const wpmRef = useRef(wpm);
  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    wpmRef.current = wpm;
  }, [wpm]);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const clearTimer = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const bankElapsed = useCallback(() => {
    if (startedAtRef.current === null) return accumulatedMsRef.current;

    const nextElapsed =
      accumulatedMsRef.current + Math.max(0, Date.now() - startedAtRef.current);
    startedAtRef.current = null;
    accumulatedMsRef.current = nextElapsed;
    setElapsedMs(nextElapsed);
    return nextElapsed;
  }, []);

  const pause = useCallback(() => {
    clearTimer();
    bankElapsed();
    isPlayingRef.current = false;
    setIsPlaying(false);
  }, [bankElapsed, clearTimer]);

  const play = useCallback(() => {
    if (
      chunks.length === 0 ||
      isFinishedRef.current ||
      isPlayingRef.current ||
      (typeof document !== "undefined" && document.hidden)
    ) {
      return;
    }

    startedAtRef.current = Date.now();
    isPlayingRef.current = true;
    setIsPlaying(true);
    setTimerRevision((revision) => revision + 1);
  }, [chunks.length]);

  const toggle = useCallback(() => {
    if (isPlayingRef.current) pause();
    else play();
  }, [pause, play]);

  const step = useCallback(
    (delta) => {
      if (chunks.length === 0) return;

      const target = Math.max(
        0,
        Math.min(chunks.length - 1, indexRef.current + delta)
      );

      // A boundary press is a no-op. In particular, do not clear a live
      // timeout: no index change would occur to make the scheduler re-arm it.
      if (target === indexRef.current) return;

      clearTimer();
      indexRef.current = target;
      setIndex(target);
      setTimerRevision((revision) => revision + 1);

      if (isFinishedRef.current) {
        isFinishedRef.current = false;
        setIsFinished(false);
      }
    },
    [chunks.length, clearTimer]
  );

  const next = useCallback(() => step(1), [step]);
  const prev = useCallback(() => step(-1), [step]);

  const restart = useCallback(() => {
    clearTimer();
    startedAtRef.current = null;
    accumulatedMsRef.current = 0;
    indexRef.current = 0;
    isPlayingRef.current = false;
    isFinishedRef.current = false;
    finishReportedRef.current = false;
    setIndex(0);
    setElapsedMs(0);
    setIsPlaying(false);
    setIsFinished(false);
    setTimerRevision((revision) => revision + 1);
  }, [clearTimer]);

  // A different text or chunk size is a new session. WPM is deliberately not
  // a dependency: changing it must affect the next chunk without restarting.
  useEffect(() => {
    // The scheduler effect runs later in this same effect flush with render-time
    // state. Mark this chunk set so it cannot briefly schedule from stale state.
    resetChunksRef.current = chunks;
    clearTimer();
    startedAtRef.current = null;
    accumulatedMsRef.current = 0;
    indexRef.current = 0;
    isPlayingRef.current = false;
    isFinishedRef.current = false;
    finishReportedRef.current = false;
    setIndex(0);
    setElapsedMs(0);
    setIsPlaying(false);
    setIsFinished(false);
  }, [chunks, clearTimer]);

  // Re-arm after each successful advance. The current WPM is read only when a
  // chunk is scheduled, so changing speed never shortens the chunk on screen.
  useEffect(() => {
    if (resetChunksRef.current === chunks) {
      resetChunksRef.current = null;
      return undefined;
    }
    if (!isPlaying || isFinished || chunks.length === 0) return undefined;

    const scheduledIndex = index;
    const current = chunks[scheduledIndex];
    if (!current) return undefined;

    isPlayingRef.current = true;
    const delay = chunkDelay(current, wpmRef.current);

    timerRef.current = setTimeout(() => {
      timerRef.current = null;

      if (scheduledIndex >= chunks.length - 1) {
        const finalElapsedMs = bankElapsed();
        isPlayingRef.current = false;
        isFinishedRef.current = true;
        setIsPlaying(false);
        setIsFinished(true);

        if (!finishReportedRef.current) {
          finishReportedRef.current = true;
          onFinishRef.current?.({ words: totalWords, elapsedMs: finalElapsedMs });
        }
        return;
      }

      const nextIndex = scheduledIndex + 1;
      indexRef.current = nextIndex;
      setIndex(nextIndex);
    }, delay);

    return clearTimer;
  }, [
    bankElapsed,
    chunks,
    clearTimer,
    index,
    isFinished,
    isPlaying,
    timerRevision,
    totalWords,
  ]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const handleVisibilityChange = () => {
      if (document.hidden) pause();
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [pause]);

  // StrictMode mounts, cleans up, and mounts effects again in development.
  // This cleanup is intentionally ref-only: it cannot enqueue state after an
  // unmount, and every timeout still travels through the same teardown helper.
  useEffect(
    () => () => {
      clearTimer();
      startedAtRef.current = null;
      isPlayingRef.current = false;
    },
    [clearTimer]
  );

  return {
    chunk: chunks[index] ?? null,
    index,
    totalChunks: chunks.length,
    totalWords,
    wordsShown,
    isPlaying,
    isFinished,
    elapsedMs,
    play,
    pause,
    toggle,
    next,
    prev,
    restart,
  };
}
