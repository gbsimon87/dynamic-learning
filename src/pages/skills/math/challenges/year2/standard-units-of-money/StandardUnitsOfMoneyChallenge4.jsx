import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { formatMoney } from "../../../../../../data/challenges/measurement";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - total a handful of coins, typed.
 *
 * The coins are listed rather than tapped, so the adding is done in the head.
 * Answers are in pence throughout — mixing pounds and pence in one calculation
 * is beyond Year 2.
 */

const PLANS = [
  { coins: [20, 20, 5], answer: 45 },
  { coins: [50, 20, 10, 2], answer: 82 },
  { coins: [10, 10, 10, 5], answer: 35 },
  { coins: [50, 20, 20, 5], answer: 95 },
  { coins: [20, 10, 2, 2], answer: 34 },
  { coins: [50, 5, 2, 1], answer: 58 },
  { coins: [20, 20, 20, 5], answer: 65 },
  { coins: [10, 5, 5, 2], answer: 22 },
];

function StandardUnitsOfMoneyChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PLANS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Add up the coins."
      render={({ question, submit, locked, index }) => (
        <TotalCoins key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TotalCoins({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">
        {question.coins.map(formatMoney).join(" + ")}
      </p>

      <p className="challenge-prompt">How much is that altogether, in pence?</p>

      <NumberInput label="Total in pence" value={value} onChange={setValue} disabled={locked} />

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

export default StandardUnitsOfMoneyChallenge4;
