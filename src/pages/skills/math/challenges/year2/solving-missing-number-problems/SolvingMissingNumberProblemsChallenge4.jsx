import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildMissingNumberQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 4 - missing numbers with two-digit values, typed.
 *
 * The box moves around: sometimes it is an addend, sometimes the number being
 * subtracted, sometimes the starting number. Each position needs a different
 * use of the inverse, and there are no options to work backwards from.
 */

function SolvingMissingNumberProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildMissingNumberQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the missing number."
      render={({ question, submit, locked, index }) => (
        <MissingNumber key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MissingNumber({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">{question.text}</p>

      <NumberInput label="The missing number is" value={value} onChange={setValue} disabled={locked} />

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

export default SolvingMissingNumberProblemsChallenge4;
