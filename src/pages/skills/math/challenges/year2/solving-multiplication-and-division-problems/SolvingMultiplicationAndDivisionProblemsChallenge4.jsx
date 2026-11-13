import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildTwoStepProblems } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - two steps, typed.
 *
 * Every story needs a multiplication and a division, or two of one, and the
 * first answer is never the one asked for. Nothing to choose from, so stopping
 * after one step cannot accidentally be right.
 */

function SolvingMultiplicationAndDivisionProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTwoStepProblems(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="This one takes two steps."
      render={({ question, submit, locked, index }) => (
        <TwoStep key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TwoStep({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge4;
