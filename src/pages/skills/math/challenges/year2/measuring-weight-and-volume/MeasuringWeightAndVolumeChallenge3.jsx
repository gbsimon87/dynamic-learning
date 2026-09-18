import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import MeasureDrag from "../../../../../../components/challenge/MeasureDrag";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - pour the jug yourself.
 *
 * Setting a level is harder than reading one, and it moves in 50 ml steps so
 * the answer is exact. Buttons and arrow keys work as well as clicking the
 * jug.
 */

const AMOUNTS = [350, 600, 150, 850, 450, 700];

function MeasuringWeightAndVolumeChallenge3({ onComplete }) {
  const questions = useMemo(
    () => shuffle(AMOUNTS, Math.random).map((target) => ({ target })),
    []
  );

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
        min={0}
        max={1000}
        majorStep={250}
        step={50}
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
