import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { scaleOptions } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - read a thermometer.
 *
 * The scale starts below zero, which is the whole reason temperature is
 * listed separately from the other measures: it is the first scale a child
 * meets that goes below nothing.
 */

const VALUES = [20, 0, 30, 10, -10, 40];

function buildQuestions(rng) {
  return shuffle(VALUES, rng).map((value) => ({
    value,
    // At -10 degrees the colder neighbour is off the thermometer; without
    // this the question offered two options and could be guessed.
    options: shuffle(scaleOptions(value, 10, -10, 50, 3), rng),
  }));
}

function MeasuringTemperatureChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
        min={-10}
        max={50}
        majorStep={10}
        value={question.value}
        unit="°C"
        orientation="vertical"
        variant="thermometer"
        label={`A thermometer reading ${question.value} degrees`}
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
        onClick={() => submit(selected === question.value)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringTemperatureChallenge1;
