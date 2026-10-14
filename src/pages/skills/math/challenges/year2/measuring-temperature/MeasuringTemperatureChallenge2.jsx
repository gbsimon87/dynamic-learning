import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import MeasureDrag from "../../../../../../components/challenge/MeasureDrag";
import { THERMOMETER, buildThermometerSetQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 2 - set the thermometer.
 *
 * Five-degree steps from 0 °C up. Half the targets sit on a numbered mark and
 * half on the small mark between two, so the learner counts on by 5.
 */

function MeasuringTemperatureChallenge2({ onComplete }) {
  const questions = useMemo(() => buildThermometerSetQuestions(Math.random), []);

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
        min={THERMOMETER.min}
        max={THERMOMETER.max}
        majorStep={THERMOMETER.majorStep}
        minorStep={THERMOMETER.minorStep}
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
