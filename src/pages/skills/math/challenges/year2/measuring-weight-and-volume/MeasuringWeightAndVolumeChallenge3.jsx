import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import MeasureDrag from "../../../../../../components/challenge/MeasureDrag";
import { FILL_JUG_SCALE, buildJugFillQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 3 - pour the jug yourself.
 *
 * Setting a level is harder than reading one, and it moves in 50 ml steps so
 * the answer is exact. The jug is numbered every 100 ml, like the scale and
 * jug in challenges 1 and 2, with a small line at each 50 ml — so a target
 * such as 350 ml sits on a line the learner can see, halfway between 300 and
 * 400, never between labels nobody drew. Buttons and arrow keys work as well
 * as clicking the jug.
 */

function MeasuringWeightAndVolumeChallenge3({ onComplete }) {
  const questions = useMemo(() => buildJugFillQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Fill the jug to the right level."
      render={({ question, submit, locked, index }) => (
        <FillJug key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillJug({ question, submit, locked }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <p className="challenge-prompt">
        Fill the jug to <strong>{question.target} ml</strong>.
      </p>

      <MeasureDrag
        min={FILL_JUG_SCALE.min}
        max={FILL_JUG_SCALE.max}
        majorStep={FILL_JUG_SCALE.majorStep}
        minorStep={FILL_JUG_SCALE.minorStep}
        step={FILL_JUG_SCALE.step}
        value={value}
        unit="ml"
        orientation="vertical"
        onChange={setValue}
        disabled={locked}
        label="Set the level in millilitres"
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

export default MeasuringWeightAndVolumeChallenge3;
