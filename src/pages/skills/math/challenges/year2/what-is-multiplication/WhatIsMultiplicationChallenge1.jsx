import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { buildMultiplicationArrays } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 1 - multiplication as an array you can count.
 *
 * The dots are on screen, so a learner who cannot yet multiply can count them.
 * Arrays are generated per run, use a statutory table on one side and never
 * hold more than 30 dots, so counting stays possible.
 */

function WhatIsMultiplicationChallenge1({ onComplete }) {
  const questions = useMemo(() => buildMultiplicationArrays(Math.random), []);

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
