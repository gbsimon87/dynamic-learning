import SpeakButton from "./SpeakButton";
import "./science-round.css";

/**
 * The one layout every science question uses. One reading rule everywhere:
 * picture → clue → question → answers → Check, so the question always sits
 * directly above the answers it asks about.
 *
 * DOM order is the reading order on a phone. From 1024px the stage (figure,
 * caption, reference) is the left column and the panel (everything else) is
 * one aligned column on the right. Every panel child shares one width and one
 * left edge; answer buttons are equal-width rows.
 *
 * `figure`     picture plus its caption and credit; no figure = one centred column
 * `reference`  standing material to look at (a parts table)
 * `evidence`   the clue card: a short fact or setup read before the question
 * `answerLabel` visible label for the answer area (the old instruction line)
 * `speak`      words for the small 🔊 under the question (`speakLang`, e.g. "fr-FR",
 *              picks its voice); `gloss` fills the "Science words" chip
 * `check`      { label, disabled, onClick }, or null when a stage has no button yet
 * `secondary`  optional extra control after Check (e.g. "Restart")
 * `feedback`   the shell's feedback node (ChallengeShell `wide` hands it over)
 */
export default function ScienceRound({ prompt, speak, speakLabel = "Hear the question", speakLang, gloss, figure, reference, evidence, answerLabel, children, hint, check, secondary, feedback }) {
  const hasFigure = Boolean(figure);
  return (
    <div className={`science-round ${hasFigure ? "has-figure" : "is-single"}`}>
      {hasFigure ? (
        <div className="science-round-stage">
          <div className="science-round-figure">{figure}</div>
          {reference && <div className="science-round-reference">{reference}</div>}
        </div>
      ) : reference && <div className="science-round-reference">{reference}</div>}
      <div className="science-round-panel">
        {evidence && <div className="science-round-evidence">{evidence}</div>}
        <div className="science-round-prompt">
          <div className="science-round-prompt-text">{prompt}</div>
          {(speak || gloss) && (
            <div className="science-round-tools">
              {speak && <SpeakButton text={speak} compact label={speakLabel} lang={speakLang} />}
              {gloss && (
                <details className="science-round-words">
                  <summary>Science words</summary>
                  <p>{gloss}</p>
                </details>
              )}
            </div>
          )}
        </div>
        <div className="science-round-answer">
          {answerLabel && <p className="science-round-answer-label">{answerLabel}</p>}
          {children}
        </div>
        {hint}
        {check && <button type="button" className="submit-btn science-round-check" disabled={check.disabled} onClick={check.onClick}>{check.label}</button>}
        {secondary}
        {feedback}
      </div>
    </div>
  );
}
