import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { fromParts, placeValueDistractors } from "../../../../../../data/challenges/placeValue";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - no picture now.
 *
 * The learner reads "6 tens and 2 ones" and picks the number. The digit-swap
 * (62 vs 26) is always among the options, because that is the mistake this
 * topic exists to correct.
 */

const PARTS = [
  [6, 2],
  [3, 8],
  [5, 0],
  [7, 4],
  [2, 9],
  [9, 1],
];

function buildQuestions(rng) {
  return shuffle(PARTS, rng).map(([tens, ones]) => {
    const answer = fromParts(tens, ones);
    return {
      tens,
      ones,
      answer,
      options: shuffle([answer, ...placeValueDistractors(answer, 2)], rng),
    };
  });
}

function PlaceValueChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which number is it?"
      render={({ question, submit, locked, index }) => (
        <PickNumber key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickNumber({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.tens} tens and {question.ones} ones
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

export default PlaceValueChallenge2;
