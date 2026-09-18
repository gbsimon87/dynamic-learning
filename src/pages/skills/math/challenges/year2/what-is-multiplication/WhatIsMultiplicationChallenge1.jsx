import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { arrayRows, multiply, productDistractors } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - multiplication as an array you can count.
 *
 * The dots are on screen, so a learner who cannot yet multiply can count them.
 * Every array uses a statutory table for its row length.
 */

const PLANS = [
  { rows: 3, columns: 5 },
  { rows: 4, columns: 2 },
  { rows: 6, columns: 10 },
  { rows: 5, columns: 5 },
  { rows: 2, columns: 10 },
  { rows: 7, columns: 2 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = multiply(plan.rows, plan.columns);
    return {
      ...plan,
      answer,
      grid: arrayRows(plan.rows, plan.columns),
      options: shuffle(
        [answer, ...productDistractors(answer, plan.columns, 2)],
        rng
      ),
    };
  });
}

function WhatIsMultiplicationChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How many dots altogether?"
      render={({ question, submit, locked, index }) => (
        <CountArray key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountArray({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        {question.rows} rows of {question.columns}
      </p>

      <ArrayGrid
        rows={question.grid}
        label={`${question.rows} rows of ${question.columns} dots`}
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

export default WhatIsMultiplicationChallenge1;
