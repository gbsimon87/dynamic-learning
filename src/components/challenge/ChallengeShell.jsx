import { useState } from "react";
import "./challenge-kit.css";

/**
 * Owns the run loop every curriculum challenge repeats: which question we're
 * on, the feedback line, the lock during the success pause, and the single
 * `onComplete()` once the last question is right.
 *
 * Children render the interaction and report an answer; they never touch
 * progress. See .claude/skills/add-curriculum-challenge for the contract.
 *
 * `questions`  array of anything; the child decides how to render one
 * `render`     ({ question, submit, locked, index }) => JSX
 */
function ChallengeShell({ title, questions, render, onComplete }) {
  const [index, setIndex] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [locked, setLocked] = useState(false);

  /**
   * Children call this with whether the attempt was correct. Advancing is the
   * shell's job so no challenge can accidentally complete early.
   */
  const submit = (isCorrect) => {
    if (locked) return;

    if (!isCorrect) {
      setFeedback("❌ Not quite — have another go!");
      return;
    }

    const isLast = index + 1 >= questions.length;
    setFeedback(isLast ? "🎉 All done! Brilliant work!" : "✅ Correct! Well done!");
    setLocked(true);

    setTimeout(() => {
      if (isLast) {
        onComplete();
        return;
      }
      setIndex((i) => i + 1);
      setFeedback("");
      setLocked(false);
    }, 1000);
  };

  return (
    <div className="challenge-container">
      <div className="challenge-progress">
        Question {index + 1} of {questions.length}
      </div>

      {title && <h3 className="challenge-title">{title}</h3>}

      {render({ question: questions[index], submit, locked, index })}

      {feedback && (
        <p className="feedback" role="status" aria-live="polite">
          {feedback}
        </p>
      )}
    </div>
  );
}

export default ChallengeShell;
