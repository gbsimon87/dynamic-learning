import { useCallback, useEffect, useRef, useState } from "react";
import { nextJoke } from "../../data/bixJokes";
import { useSoundMuted } from "../celebration/sound/useSoundMuted";
import { speak, stopNarration } from "../../utils/speech";

/**
 * One joke at a time, child-paced: `tell` shows (and says) the setup, and
 * nothing more happens until `reveal` — there is no timer.
 *
 * Spoken only while the app's sound is on (the navbar 🔊). Muted, the words on
 * screen carry the joke on their own, and muting mid-joke stops the voice.
 *
 * Which jokes have been told is kept for this tab only (sessionStorage, with
 * a memory fallback). It is a nicety, not learner data: it never touches the
 * progress or rewards documents and is safe to lose.
 */
const TOLD_KEY = "dl.bixJokesTold";
let toldInMemory = [];

function readTold() {
  try {
    const parsed = JSON.parse(sessionStorage.getItem(TOLD_KEY) ?? "null");
    if (Array.isArray(parsed)) return parsed.filter((id) => typeof id === "string");
  } catch {
    /* blocked or corrupt storage: fall back to memory */
  }
  return toldInMemory;
}

function writeTold(told) {
  toldInMemory = told;
  try {
    sessionStorage.setItem(TOLD_KEY, JSON.stringify(told));
  } catch {
    /* blocked storage: memory is enough */
  }
}

/** What a screen reader should hear for the joke's current state. */
export function jokeAnnouncement(joke, revealed) {
  if (!joke) return "";
  return revealed ? joke.punchline : `Bix's joke: ${joke.setup}`;
}

export function useBixJoke() {
  const [muted] = useSoundMuted();
  const [joke, setJoke] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const spokeRef = useRef(false);

  const say = useCallback((text) => {
    if (muted) return;
    spokeRef.current = true;
    speak(text);
  }, [muted]);

  const hush = useCallback(() => {
    if (!spokeRef.current) return;
    spokeRef.current = false;
    stopNarration();
  }, []);

  const tell = useCallback(() => {
    const { joke: next, seen } = nextJoke(readTold());
    writeTold(seen);
    setJoke(next);
    setRevealed(false);
    say(next.setup);
    return next;
  }, [say]);

  const reveal = useCallback(() => {
    if (!joke) return;
    setRevealed(true);
    say(joke.punchline);
  }, [joke, say]);

  const close = useCallback(() => {
    setJoke(null);
    setRevealed(false);
    hush();
  }, [hush]);

  // Muting mid-joke stops the voice; leaving the page does too.
  useEffect(() => {
    if (muted) hush();
  }, [muted, hush]);
  useEffect(() => hush, [hush]);

  return { joke, revealed, tell, reveal, close };
}
