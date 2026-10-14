import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildTwoDigitQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 4 - two two-digit numbers, typed.
 *
 * The last and hardest of the statutory calculation shapes. Every pair crosses
 * a ten, so the ones column always carries or borrows - the whole difficulty
 * of the shape. Totals stay within 100; three sums and three differences are
 * generated each time.
 */

function UsingTwoDigitNumbersChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTwoDigitQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Add the tens, then the ones."
      render={({ question, submit, locked, index }) => (
        <TwoDigitSum key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TwoDigitSum({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">
        {question.a} {question.operator === "+" ? "+" : "−"} {question.b} = ?
      </p>

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

export default UsingTwoDigitNumbersChallenge4;
