import { useCallback, useEffect, useRef, useState } from "react";
import { nextMessage } from "../../data/celebrationMessages";
import { INITIAL_ANSWER_STATE, milestoneMessage, nextAnswer } from "../../data/freePlay/feedback";
import { playCue, preloadSounds } from "../celebration/sound/player";
import { playEffect } from "../celebration/fx/effects";

/**
 * The curriculum's per-answer celebration, for Skills Mode games.
 *
 * FreePlayShell uses it, and it is exported on its own so an existing game
 * with its own loop (Number Bonds, Fraction Fun…) can adopt the same
 * feedback without adopting the shell:
 *
 *   const fb = useAnswerFeedback();
 *   fb.answer(isCorrect, { firstTry })  // → { tone, combo, milestone, state }
 *   <div ref={fb.answerRef}>…the thing that wobbles on a miss…</div>
 *   <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
 *   fb.clear()   when the next question appears
 *   fb.reset()   on a mode or level change — combo and count start again
 *
 * A right answer: a rotating line (celebrationMessages), a sparkle from the
 * line and the `correct` sound. Three right first time in a row: the 🔥 combo
 * line, a star burst and the `combo` sound. Every fifth right answer: the
 * "5 right! 🌟" milestone with a bigger burst. A miss: a kind line, a wobble
 * and the soft boop. Muting (the navbar 🔊) silences every cue, and reduced
 * motion drops the particles and the wobble — both handled where they live.
 *
 * Nothing is stored: no XP, streak days or badges (see data/freePlay/feedback).
 */

const SOUND = { correct: "correct", combo: "combo", milestone: "correctLast", wrong: "wrong" };
const EFFECT = { correct: "sparkle", combo: "stars", milestone: "burst" };

function reducedMotion() {
  return window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ?? false;
}

/** The gentle side-to-side shake for a miss. A no-op under reduced motion. */
export function wobble(element) {
  if (!element?.animate || reducedMotion()) return;
  element.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-7px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-4px)" },
      { transform: "translateX(2px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 420, easing: "ease-out" }
  );
}

export function useAnswerFeedback() {
  const [feedback, setFeedback] = useState(null);
  const [correct, setCorrect] = useState(0);
  // Refs, not state: they only feed the next answer, never the render.
  const stateRef = useRef(INITIAL_ANSWER_STATE);
  const stopSoundRef = useRef(null);
  const answerRef = useRef(null);
  const feedbackRef = useRef(null);

  // Sounds were curriculum-only; any page using this hook downloads them too
  // (download only — the first tap decodes them, see player.js).
  useEffect(() => {
    preloadSounds();
  }, []);

  // Leaving the game fades whatever answer sound is still playing.
  useEffect(() => () => stopSoundRef.current?.(), []);

  const answer = useCallback((isCorrect, { firstTry = true } = {}) => {
    const out = nextAnswer(stateRef.current, isCorrect, firstTry);
    stateRef.current = out.state;
    setCorrect(out.state.correct);

    // Chosen here, not in an updater: StrictMode runs updaters twice.
    let text;
    if (out.tone === "milestone") text = milestoneMessage(out.state.correct);
    else if (out.tone === "combo") text = nextMessage("combo", { count: out.state.streak });
    else text = nextMessage(out.tone);
    setFeedback((previous) => ({ tone: out.tone, text, key: (previous?.key ?? 0) + 1 }));

    // One answer sound at a time: a quick next tap replaces, never stacks.
    stopSoundRef.current?.();
    stopSoundRef.current = playCue(SOUND[out.tone]);

    if (isCorrect) playEffect(EFFECT[out.tone], { origin: feedbackRef.current });
    else wobble(answerRef.current);
    return out;
  }, []);

  const clear = useCallback(() => setFeedback(null), []);

  const reset = useCallback(() => {
    stateRef.current = INITIAL_ANSWER_STATE;
    setCorrect(0);
    setFeedback(null);
    stopSoundRef.current?.();
    stopSoundRef.current = null;
  }, []);

  return { feedback, correct, answer, clear, reset, answerRef, feedbackRef };
}
