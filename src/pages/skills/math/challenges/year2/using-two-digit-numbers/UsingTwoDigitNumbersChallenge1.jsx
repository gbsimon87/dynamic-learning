import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { sumDistractors } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - a two-digit number and 1s, along a line.
 *
 * The first of the four statutory calculation shapes, and the easiest. The run
 * of numbers is on screen so the ones can be counted rather than held.
 */

const PLANS = [
  { start: 34, add: 5 },
  { start: 47, add: 6 },
  { start: 62, add: 4 },
  { start: 28, add: 7 },
  { start: 75, add: 3 },
  { start: 56, add: 8 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = plan.start + plan.add;
    const terms = Array.from({ length: plan.add + 3 }, (_, i) => plan.start - 2 + i);
    return {
      ...plan,
      answer,
      terms,
      options: shuffle([answer, ...sumDistractors(answer, 2)], rng),
    };
  });
}

function UsingTwoDigitNumbersChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Add the ones."
      render={({ question, submit, locked, index }) => (
        <AddOnes key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function AddOnes({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.start} + {question.add} = ?
      </p>

      <NumberLine
        terms={question.terms}
        gaps={[]}
        values={{}}
        active={null}
        highlight={2}
        onFocusGap={() => {}}
        disabled={locked}
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

export default UsingTwoDigitNumbersChallenge1;
