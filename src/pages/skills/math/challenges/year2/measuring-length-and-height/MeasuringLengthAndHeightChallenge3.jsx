import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - choose the unit that fits.
 *
 * Statutory: "choose and use APPROPRIATE standard units". Measuring a school
 * hall in centimetres is not wrong so much as useless, and knowing which unit
 * to reach for is the skill being tested.
 */

const THINGS = [
  { thing: "the length of a pencil", answer: "cm" },
  { thing: "the height of a door", answer: "m" },
  { thing: "the width of a stamp", answer: "cm" },
  { thing: "the length of a playground", answer: "m" },
  { thing: "the height of a cup", answer: "cm" },
  { thing: "the length of a bus", answer: "m" },
];

function MeasuringLengthAndHeightChallenge3({ onComplete }) {
  const questions = useMemo(() => shuffle(THINGS, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which unit would you use?"
      render={({ question, submit, locked, index }) => (
        <PickUnit key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickUnit({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        You want to measure {question.thing}.
      </p>

      <ChoiceGrid
        options={["cm", "m"]}
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

export default MeasuringLengthAndHeightChallenge3;
