import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { repeatedAddition } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - from repeated addition to the × sign.
 *
 * The learner sees the addition they already understand and picks the
 * multiplication that says the same thing. The wrong options swap the numbers
 * around or use the total, so the meaning of each number has to be read.
 */

const PLANS = [
  { value: 4, times: 3 },
  { value: 5, times: 4 },
  { value: 10, times: 3 },
  { value: 2, times: 6 },
  { value: 5, times: 2 },
  { value: 10, times: 5 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = `${plan.times} × ${plan.value}`;
    const total = plan.value * plan.times;
    const options = shuffle(
      [answer, `${plan.times} × ${total}`, `${plan.value} × ${total}`],
      rng
    );
    return { ...plan, answer, options, addition: repeatedAddition(plan.value, plan.times) };
  });
}

function WhatIsMultiplicationChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which multiplication means the same?"
      render={({ question, submit, locked, index }) => (
        <MatchStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MatchStatement({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.addition}</p>

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

export default WhatIsMultiplicationChallenge2;
