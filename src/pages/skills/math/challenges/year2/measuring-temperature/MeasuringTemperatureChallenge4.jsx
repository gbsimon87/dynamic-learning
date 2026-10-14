import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildTemperatureSenseQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 4 - which temperature fits?
 *
 * Reading a thermometer is useless without a sense of what the numbers mean,
 * so this asks which of three temperatures suits a real situation. The options
 * are far apart on purpose: this is judgement, not arithmetic. All are 0 °C
 * or warmer, and each carries its unit.
 */

function MeasuringTemperatureChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTemperatureSenseQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which temperature makes sense?"
      render={({ question, submit, locked, index }) => (
        <PickTemperature key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickTemperature({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        What temperature would you expect for {question.thing}?
      </p>

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

export default MeasuringTemperatureChallenge4;
