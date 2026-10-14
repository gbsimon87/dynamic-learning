import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildSharingOrGrouping } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - sharing and grouping in stories, typed.
 *
 * Three stories ask how many each (sharing) and three how many groups
 * (grouping), mixed, with numbers generated per run. Reading which is being
 * asked is the work. Every division is exact.
 */

function WhatIsDivisionChallenge4({ onComplete }) {
  const questions = useMemo(() => buildSharingOrGrouping(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read carefully — sharing or grouping?"
      render={({ question, submit, locked, index }) => (
        <WordProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WordProblem({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />

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

export default WhatIsDivisionChallenge4;
