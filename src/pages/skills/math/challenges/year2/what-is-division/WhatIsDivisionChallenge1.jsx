import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { arrayRows, divide } from "../../../../../../data/challenges/multiplicationAndDivision";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - division as sharing, with the groups drawn.
 *
 * The total is already split into equal rows, so "how many in each group" can
 * be counted straight off the picture. Sharing comes before grouping because
 * it is the meaning children meet first.
 */

const PLANS = [
  { total: 20, groups: 5 },
  { total: 12, groups: 2 },
  { total: 30, groups: 10 },
  { total: 20, groups: 4 },
  { total: 18, groups: 2 },
  { total: 25, groups: 5 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = divide(plan.total, plan.groups);
    return { ...plan, answer, grid: arrayRows(plan.groups, answer) };
  });
}

function WhatIsDivisionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Sharing means splitting into equal groups."
      render={({ question, submit, locked, index }) => (
        <ShareOut key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ShareOut({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        {question.total} shared into {question.groups} equal groups. How many in
        each group?
      </p>

      <ArrayGrid
        rows={question.grid}
        label={`${question.groups} groups of ${question.answer}`}
      />

      <NumberInput label="Each group has" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default WhatIsDivisionChallenge1;
