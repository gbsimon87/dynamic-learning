import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildSharingPictures } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 1 - division as sharing, with the groups drawn.
 *
 * The total is already split into equal rows, so "how many in each group" can
 * be counted straight off the picture. Sharing comes before grouping because
 * it is the meaning children meet first.
 */

function WhatIsDivisionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildSharingPictures(Math.random), []);

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
