import Mascot from "../mascot/Mascot";
import "../challenge/challenge-kit.css";
import "./FreePlayShell.css";

/**
 * The feedback line under a Skills Mode question: ✓ for right, 🔥 for a
 * combo, 🌟 for a milestone, ↻ for "try again". Bix pops up to cheer a combo
 * or a milestone (decorative — the words say it).
 *
 * Always rendered, so the live region exists before the first message and a
 * screen reader reliably announces each one. Reuses the curriculum's
 * `challenge-feedback-*` styles, which are deliberately not `.feedback.correct`
 * (several older Skills games define that globally).
 */

const ICON = { correct: "✓", combo: "🔥", milestone: "🌟", wrong: "↻" };
// A milestone wears the combo's look, plus a little more (FreePlayShell.css).
const TONE_CLASS = {
  correct: "challenge-feedback-correct",
  combo: "challenge-feedback-combo",
  milestone: "challenge-feedback-combo free-play-milestone",
  wrong: "challenge-feedback-wrong",
};

function AnswerFeedbackLine({ feedback, ref }) {
  const cheer = feedback && (feedback.tone === "combo" || feedback.tone === "milestone");
  return (
    <p
      ref={ref}
      className={`challenge-feedback free-play-feedback ${feedback ? TONE_CLASS[feedback.tone] : ""}`}
      role="status"
      aria-live="polite"
    >
      {feedback && (
        <>
          <span key={feedback.key} className="challenge-feedback-icon" aria-hidden="true">
            {ICON[feedback.tone]}
          </span>
          {feedback.text}
          {cheer && (
            <span className="challenge-feedback-bix">
              <Mascot className="mascot-small" cheerOn={feedback.key} decorative />
            </span>
          )}
        </>
      )}
    </p>
  );
}

export default AnswerFeedbackLine;
