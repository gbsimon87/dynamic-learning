import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - which temperature fits?
 *
 * Reading a thermometer is useless without a sense of what the numbers mean,
 * so this asks which of three temperatures suits a real situation. The options
 * are far apart on purpose: this is judgement, not arithmetic.
 */

const SITUATIONS = [
  { thing: "a hot summer day", options: [0, 30, -10], answer: 30 },
  { thing: "a glass of iced water", options: [0, 40, 20], answer: 0 },
  { thing: "a frosty morning", options: [-5, 25, 45], answer: -5 },
  { thing: "a warm classroom", options: [20, -10, 50], answer: 20 },
  { thing: "a snowy day", options: [-10, 15, 35], answer: -10 },
  { thing: "a hot bath", options: [40, 5, -5], answer: 40 },
];

function MeasuringTemperatureChallenge4({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(SITUATIONS, Math.random).map((s) => ({
        ...s,
        options: shuffle(s.options, Math.random),
      })),
    []
  );

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
