import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { formatMoney } from "../../../../../../data/challenges/measurement";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - working out change.
 *
 * Statutory, and named explicitly: "including giving change". Change is a
 * subtraction dressed up, and the wording ("how much change") is as much the
 * lesson as the arithmetic.
 */

const PROBLEMS = [
  { paid: 50, cost: 35, answer: 15 },
  { paid: 100, cost: 70, answer: 30 },
  { paid: 20, cost: 12, answer: 8 },
  { paid: 50, cost: 25, answer: 25 },
  { paid: 100, cost: 45, answer: 55 },
  { paid: 80, cost: 65, answer: 15 },
];

function MoneyProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Change is what is left over."
      render={({ question, submit, locked, index }) => (
        <GiveChange key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function GiveChange({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        You pay <strong>{formatMoney(question.paid)}</strong> for something
        costing <strong>{formatMoney(question.cost)}</strong>. How much change
        do you get, in pence?
      </p>

      <NumberInput label="Change in pence" value={value} onChange={setValue} disabled={locked} />

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

export default MoneyProblemsChallenge2;
