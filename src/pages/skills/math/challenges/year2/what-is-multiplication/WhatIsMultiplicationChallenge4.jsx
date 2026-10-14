import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildEqualGroupStories } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - equal groups in a story, typed.
 *
 * Nothing is drawn and nothing is offered, so the learner has to spot that
 * "each" means equal groups and decide what to multiply. Stories and numbers
 * are generated per run; every answer comes from a 2, 5 or 10 fact.
 */

function WhatIsMultiplicationChallenge4({ onComplete }) {
  const questions = useMemo(() => buildEqualGroupStories(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Equal groups — multiply to find the total."
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

export default WhatIsMultiplicationChallenge4;
