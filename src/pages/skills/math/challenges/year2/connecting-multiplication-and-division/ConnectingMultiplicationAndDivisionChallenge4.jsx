import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildInverseMissingNumbers } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - missing numbers that need the inverse.
 *
 * The box sits in a different place each time, so sometimes a division finds
 * it and sometimes a multiplication does. Typed, so the relationship has to be
 * used rather than recognised.
 */

function ConnectingMultiplicationAndDivisionChallenge4({ onComplete }) {
  const questions = useMemo(() => buildInverseMissingNumbers(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the one you know to find the one you don't."
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

export default ConnectingMultiplicationAndDivisionChallenge4;
