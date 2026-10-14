import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildCombineAndShare } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - put it together, then divide.
 *
 * Two amounts of the same thing are joined (Mia's stickers and Ben's), then
 * shared or grouped. The total is never stated, so the first step has to be
 * done before the division can be. Numbers are generated per run and every
 * division is exact.
 */

function DivisionProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildCombineAndShare(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put them together, then divide."
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

export default DivisionProblemsChallenge4;
