import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildDoubleOrHalveProblems } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - doubling and halving inside stories, typed.
 *
 * Which one is needed has to be read out of the sentence, and half the
 * problems use "half of" rather than "÷ 2" so the fraction language and the
 * division are the same move.
 */

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge4({ onComplete }) {
  const questions = useMemo(() => buildDoubleOrHalveProblems(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Double it or halve it?"
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

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge4;
