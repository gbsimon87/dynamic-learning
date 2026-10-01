import { useEffect, useRef, useState } from "react";
import { nextMessage } from "../../data/celebrationMessages";
import { nextStreak } from "../../data/answerStreak";
import { playCue } from "../celebration/sound/player";
import { playEffect } from "../celebration/fx/effects";
import Mascot from "../mascot/Mascot";
import "./challenge-kit.css";

/**
 * Owns the run loop every curriculum challenge repeats: which question we're
 * on, the feedback line, the lock during the success pause, and the single
 * `onComplete({ combos })` once the last question is right; `combos` counts
 * '3 in a row' bursts this run.
 *
 * Children render the interaction and report an answer; they never touch
 * progress. See .claude/skills/add-curriculum-challenge for the contract.
 *
 * Every curriculum challenge runs through here, so this is also where each
 * answer is celebrated: a right answer pops a tick, sparkles, chimes and fills
 * one segment of the bar; a wrong one gets a gentle wobble, a kind word and
 * the quietest sound in the app — a soft boop, never a buzzer, so a mistake
 * never feels like a punishment. Three right first time in a row is a combo
 * (answerStreak.js): a 🔥 line, a bigger burst and its own sound.
 *
 * `questions`  array of anything; the child decides how to render one
 * `render`     ({ question, submit, locked, index, misses }) => JSX
 *
 * `misses` counts wrong attempts on the CURRENT question and resets when it
 * advances. Challenges that offer a hint show it from `misses >= 2`
 * (`HINT_AFTER` in hints.js); the shell itself never reveals an answer, and
 * a hint changes nothing that is earned.
 */

function wobble(element) {
  if (!element?.animate) return;
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
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

function ChallengeShell({ title, questions, render, onComplete }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [locked, setLocked] = useState(false);
  const [misses, setMisses] = useState(0);
  const answerRef = useRef(null);
  const feedbackRef = useRef(null);
  const timerRef = useRef(null);
  // The combo streak, and whether the current question has been missed yet.
  // Refs, not state: they only ever feed the next answer, never the render.
  const streakRef = useRef(0);
  const combosRef = useRef(0);
  const missedRef = useRef(false);
  // Stop function for the answer sound still playing, if any.
  const stopSoundRef = useRef(null);

  // Unmounting is the celebration taking over (or the child leaving): fade the
  // last answer sound so it never plays on top of the celebration's own —
  // correct-last and the combo both outlast the 1s pause before it.
  useEffect(() => () => {
    window.clearTimeout(timerRef.current);
    stopSoundRef.current?.();
  }, []);

  /** One answer sound at a time: a quick next tap replaces, never stacks. */
  const answerSound = (name) => {
    stopSoundRef.current?.();
    stopSoundRef.current = playCue(name);
  };

  /**
   * Children call this with whether the attempt was correct. Advancing is the
   * shell's job so no challenge can accidentally complete early.
   */
  const submit = (isCorrect) => {
    if (locked) return;

    const { streak, combo } = nextStreak(streakRef.current, isCorrect, !missedRef.current);
    streakRef.current = streak;
    if (combo) combosRef.current += 1;

    // Chosen here, not inside the updater: StrictMode runs updaters twice.
    if (!isCorrect) {
      missedRef.current = true;
      setMisses((count) => count + 1);
      const text = nextMessage("wrong");
      setFeedback((previous) => ({ tone: "wrong", text, key: (previous?.key ?? 0) + 1 }));
      wobble(answerRef.current);
      answerSound("wrong");
      return;
    }

    const isLast = index + 1 >= questions.length;
    // A combo outranks the ordinary answer sound, even on the last question.
    const text = combo
      ? nextMessage("combo", { count: streak })
      : nextMessage(isLast ? "last" : "correct");
    const tone = combo ? "combo" : "correct";
    setFeedback((previous) => ({ tone, text, key: (previous?.key ?? 0) + 1 }));
    setLocked(true);
    answerSound(combo ? "combo" : isLast ? "correctLast" : "correct");
    playEffect(combo ? "stars" : "sparkle", { origin: feedbackRef.current });
    missedRef.current = false;

    timerRef.current = window.setTimeout(() => {
      if (isLast) {
        onComplete({ combos: combosRef.current });
        return;
      }
      setIndex((i) => i + 1);
      setMisses(0);
      setFeedback(null);
      setLocked(false);
    }, 1000);
  };

  // A segment fills the moment its question is answered, not when the next one
  // appears, so the reward lands with the tick.
  const filled = index + (locked ? 1 : 0);

  return (
    <div className="challenge-container">
      <div className="challenge-progress">
        Question {index + 1} of {questions.length}
      </div>
      <div
        className="challenge-progress-bar"
        role="progressbar"
        aria-label="Questions answered"
        aria-valuemin={0}
        aria-valuemax={questions.length}
        aria-valuenow={filled}
      >
        {questions.map((_, segment) => (
          <span
            key={segment}
            className={`challenge-progress-segment ${segment < filled ? "is-filled" : ""}`}
          />
        ))}
      </div>

      {title && <h3 className="challenge-title">{title}</h3>}

      <div ref={answerRef}>
        {render({ question: questions[index], submit, locked, index, misses })}
      </div>

      {/* Always rendered, so the live region exists before the first message
          and screen readers reliably announce it. */}
      <p
        ref={feedbackRef}
        className={`feedback challenge-feedback ${feedback ? `challenge-feedback-${feedback.tone}` : ""}`}
        role="status"
        aria-live="polite"
      >
        {feedback && (
          <>
            <span key={feedback.key} className="challenge-feedback-icon" aria-hidden="true">
              {feedback.tone === "combo" ? "🔥" : feedback.tone === "correct" ? "✓" : "↻"}
            </span>
            {feedback.text}
            {/* Bix pops up to cheer a combo. Decorative: the words say it. */}
            {feedback.tone === "combo" && (
              <span className="challenge-feedback-bix">
                <Mascot className="mascot-small" cheerOn={feedback.key} decorative />
              </span>
            )}
          </>
        )}
      </p>
    </div>
  );
}

export default ChallengeShell;
