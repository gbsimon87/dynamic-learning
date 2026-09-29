import { useEffect, useRef, useState } from "react";
import { nextMessage } from "../../data/celebrationMessages";
import { playCue } from "../celebration/sound/player";
import { playEffect } from "../celebration/fx/effects";
import "./challenge-kit.css";

/**
 * Owns the run loop every curriculum challenge repeats: which question we're
 * on, the feedback line, the lock during the success pause, and the single
 * `onComplete()` once the last question is right.
 *
 * Children render the interaction and report an answer; they never touch
 * progress. See .claude/skills/add-curriculum-challenge for the contract.
 *
 * Every curriculum challenge runs through here, so this is also where each
 * answer is celebrated: a right answer pops a tick, sparkles, chimes and fills
 * one segment of the bar; a wrong one gets a gentle wobble and a kind word —
 * never a buzzer, so a mistake never feels like a punishment.
 *
 * `questions`  array of anything; the child decides how to render one
 * `render`     ({ question, submit, locked, index }) => JSX
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
  const answerRef = useRef(null);
  const feedbackRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  /**
   * Children call this with whether the attempt was correct. Advancing is the
   * shell's job so no challenge can accidentally complete early.
   */
  const submit = (isCorrect) => {
    if (locked) return;

    if (!isCorrect) {
      setFeedback((previous) => ({
        tone: "wrong",
        text: nextMessage("wrong"),
        key: (previous?.key ?? 0) + 1,
      }));
      wobble(answerRef.current);
      return;
    }

    const isLast = index + 1 >= questions.length;
    setFeedback((previous) => ({
      tone: "correct",
      text: nextMessage(isLast ? "last" : "correct"),
      key: (previous?.key ?? 0) + 1,
    }));
    setLocked(true);
    playCue("chime");
    playEffect("sparkle", { origin: feedbackRef.current });

    timerRef.current = window.setTimeout(() => {
      if (isLast) {
        onComplete();
        return;
      }
      setIndex((i) => i + 1);
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
        {render({ question: questions[index], submit, locked, index })}
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
              {feedback.tone === "correct" ? "✓" : "↻"}
            </span>
            {feedback.text}
          </>
        )}
      </p>
    </div>
  );
}

export default ChallengeShell;
