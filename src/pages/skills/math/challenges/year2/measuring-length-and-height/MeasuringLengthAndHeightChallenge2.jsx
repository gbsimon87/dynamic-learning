import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import MeasureDrag from "../../../../../../components/challenge/MeasureDrag";
import { buildRulerSetQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 2 - set the ruler yourself.
 *
 * The inverse of reading: given a length, put the marker there. Clicking the
 * ruler, the −/+ buttons and the arrow keys all work, so no learner is shut
 * out by a drag they cannot perform. Targets are fresh each attempt and never
 * on a numbered mark, so each one is counted on in 1 cm steps.
 */

function MeasuringLengthAndHeightChallenge2({ onComplete }) {
  const questions = useMemo(() => buildRulerSetQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Move the marker to the right length."
      render={({ question, submit, locked, index }) => (
        <SetRuler key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SetRuler({ question, submit, locked }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <p className="challenge-prompt">
        Show <strong>{question.target} cm</strong> on the ruler.
      </p>

      <MeasureDrag
        min={0}
        max={30}
        majorStep={5}
        minorStep={1}
        step={1}
        value={value}
        unit="cm"
        orientation="horizontal"
        onChange={setValue}
        disabled={locked}
        label="Set the length in centimetres"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(value === question.target)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringLengthAndHeightChallenge2;
