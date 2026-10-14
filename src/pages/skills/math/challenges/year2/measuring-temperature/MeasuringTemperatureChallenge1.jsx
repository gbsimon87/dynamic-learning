import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { THERMOMETER, buildThermometerReadQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - read a thermometer.
 *
 * Year 2 reads thermometers at 0 °C and above — negative numbers belong to a
 * later year. The thermometer is numbered every 10 with a small mark at each
 * 5: three readings sit on a number, then three on a small mark. Options are
 * near-misses (5, 10 or 20 degrees out) and every one carries °C.
 */

function MeasuringTemperatureChallenge1({ onComplete }) {
  const questions = useMemo(() => buildThermometerReadQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the thermometer."
      render={({ question, submit, locked, index }) => (
        <ReadThermometer key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadThermometer({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">What temperature does it show?</p>

      <ScaleReader
        min={THERMOMETER.min}
        max={THERMOMETER.max}
        majorStep={THERMOMETER.majorStep}
        minorStep={THERMOMETER.minorStep}
        value={question.value}
        unit="°C"
        orientation="vertical"
        variant="thermometer"
        label={`A thermometer reading ${question.value} degrees Celsius`}
      />

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringTemperatureChallenge1;
