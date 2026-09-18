import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import MeasureDrag from "../../../../../../components/challenge/MeasureDrag";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - set the thermometer.
 *
 * Five-degree steps, and two of the targets are below zero so the learner has
 * to move the marker down past the nothing mark rather than up from it.
 */

const TARGETS = [25, -5, 35, 5, 15, -10];

function MeasuringTemperatureChallenge2({ onComplete }) {
  const questions = useMemo(
    () => shuffle(TARGETS, Math.random).map((target) => ({ target })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Move the marker to the right temperature."
      render={({ question, submit, locked, index }) => (
        <SetThermometer key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SetThermometer({ question, submit, locked }) {
  const [value, setValue] = useState(0);

  return (
    <>
      <p className="challenge-prompt">
        Show <strong>{question.target} °C</strong> on the thermometer.
      </p>

      <MeasureDrag
        min={-10}
        max={50}
        majorStep={10}
        step={5}
        value={value}
        unit="°C"
        orientation="vertical"
        onChange={setValue}
        disabled={locked}
        label="Set the temperature"
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

export default MeasuringTemperatureChallenge2;
