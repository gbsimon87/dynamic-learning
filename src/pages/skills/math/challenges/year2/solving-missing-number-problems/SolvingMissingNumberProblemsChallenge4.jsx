import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - missing numbers with two-digit values, typed.
 *
 * The box moves around: sometimes it is an addend, sometimes the number being
 * subtracted, sometimes the starting number. Each position needs a different
 * use of the inverse, and there are no options to work backwards from.
 */

const PLANS = [
  { text: "34 + ? = 50", answer: 16 },
  { text: "? + 25 = 60", answer: 35 },
  { text: "80 − ? = 45", answer: 35 },
  { text: "? − 17 = 23", answer: 40 },
  { text: "56 + ? = 72", answer: 16 },
  { text: "? + 38 = 90", answer: 52 },
  { text: "64 − ? = 29", answer: 35 },
  { text: "? − 26 = 18", answer: 44 },
];

function SolvingMissingNumberProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PLANS, Math.random).slice(0, 6), []);

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
