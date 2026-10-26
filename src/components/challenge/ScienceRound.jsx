import SpeakButton from "./SpeakButton";
import "./science-round.css";

/**
 * The one layout every science question uses. Everything is a direct child of
 * one grid, in DOM order (the reading order on a phone). From 1024px the figure
 * column (figure, caption, reference) is placed left and every other child
 * stacks in the right column, drawn as one bordered panel.
 *
 * `figure`     picture plus its caption and credit; no figure = one centred column
 * `reference`  standing material to look at (a parts table)
 * `evidence`   what the child must read to answer (an observation card)
 * `answerLabel` visible label for the answer area (the old instruction line)
 * `speak`      words for the small 🔊 beside the prompt; `gloss` fills the
 *              "Science words" chip
 * `check`      { label, disabled, onClick }, or null when a stage has no button yet
 * `secondary`  optional extra control after Check (e.g. "Restart")
 * `feedback`   the shell's feedback node (ChallengeShell `wide` hands it over)
 */
export default function ScienceRound({ prompt, speak, speakLabel = "Hear the question", gloss, figure, reference, evidence, answerLabel, children, hint, check, secondary, feedback }) {
  const hasFigure = Boolean(figure);
  return (
    <div className={`science-round ${hasFigure ? "has-figure" : "is-single"}`}>
      <div className="science-round-prompt">
        <div className="science-round-prompt-text">{prompt}</div>
        {speak && <SpeakButton text={speak} compact label={speakLabel} />}
        {gloss && (
          <details className="science-round-words">
            <summary>Science words</summary>
            <p>{gloss}</p>
          </details>
        )}
      </div>
      {hasFigure ? (
        <div className="science-round-stage">
          <div className="science-round-figure">{figure}</div>
          {reference && <div className="science-round-reference">{reference}</div>}
        </div>
      ) : reference}
      {evidence && <div className="science-round-evidence">{evidence}</div>}
      <div className="science-round-answer">
        {answerLabel && <p className="science-round-answer-label">{answerLabel}</p>}
        {children}
      </div>
      {hint}
      {check && <button type="button" className="submit-btn" disabled={check.disabled} onClick={check.onClick}>{check.label}</button>}
      {secondary}
      {feedback}
    </div>
  );
}
