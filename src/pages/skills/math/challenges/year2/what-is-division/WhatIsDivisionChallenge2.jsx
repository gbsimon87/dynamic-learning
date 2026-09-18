import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { divide, productDistractors } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - division as grouping, with nothing drawn.
 *
 * Grouping asks a different question from sharing: not "how many each" but
 * "how many groups". The phrasing changes and the picture is gone.
 */

const PLANS = [
  { total: 20, size: 5 },
  { total: 16, size: 2 },
  { total: 50, size: 10 },
  { total: 30, size: 5 },
  { total: 14, size: 2 },
  { total: 40, size: 10 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = divide(plan.total, plan.size);
    return {
      ...plan,
      answer,
      options: shuffle([answer, ...productDistractors(answer, 1, 2)], rng),
    };
  });
}

function WhatIsDivisionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How many groups can you make?"
      render={({ question, submit, locked, index }) => (
        <MakeGroups key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MakeGroups({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.total} ÷ {question.size} = ?
      </p>

      <p className="challenge-prompt">
        How many groups of {question.size} can you make from {question.total}?
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

export default WhatIsDivisionChallenge2;
