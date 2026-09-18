import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - missing numbers that need the inverse.
 *
 * The box sits in a different place each time, so sometimes a division finds
 * it and sometimes a multiplication does. Typed, so the relationship has to be
 * used rather than recognised.
 */

const PLANS = [
  { text: "4 × ? = 20", answer: 5 },
  { text: "? × 10 = 70", answer: 7 },
  { text: "30 ÷ ? = 6", answer: 5 },
  { text: "? ÷ 2 = 9", answer: 18 },
  { text: "5 × ? = 45", answer: 9 },
  { text: "? × 2 = 16", answer: 8 },
  { text: "80 ÷ ? = 8", answer: 10 },
  { text: "? ÷ 5 = 6", answer: 30 },
];

function ConnectingMultiplicationAndDivisionChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PLANS, Math.random).slice(0, 6), []);

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
