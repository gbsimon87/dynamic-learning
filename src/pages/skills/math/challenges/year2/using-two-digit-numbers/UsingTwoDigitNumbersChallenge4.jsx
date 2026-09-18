import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - two two-digit numbers, typed.
 *
 * The last and hardest of the statutory calculation shapes. Every pair crosses
 * a ten, so the ones column always carries or borrows - the whole difficulty
 * of the shape. Totals stay within 100.
 */

const PLANS = [
  { a: 34, b: 28, operator: "+" },
  { a: 47, b: 25, operator: "+" },
  { a: 56, b: 19, operator: "+" },
  { a: 63, b: 27, operator: "-" },
  { a: 82, b: 35, operator: "-" },
  { a: 71, b: 46, operator: "-" },
  { a: 29, b: 43, operator: "+" },
  { a: 94, b: 58, operator: "-" },
];

function UsingTwoDigitNumbersChallenge4({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(PLANS, Math.random)
        .slice(0, 6)
        .map((plan) => ({
          ...plan,
          answer: plan.operator === "+" ? plan.a + plan.b : plan.a - plan.b,
        })),
    []
  );

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
