import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildCoinTotalQuestions, formatMoney } from "../../../../../../data/challenges/measurement";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 4 - total a handful of coins, typed.
 *
 * The coins are listed rather than tapped, so the adding is done in the head.
 * Answers are in pence throughout — mixing pounds and pence in one calculation
 * is beyond Year 2. Handfuls are fresh each attempt: three coins at first,
 * then four or five.
 */

function StandardUnitsOfMoneyChallenge4({ onComplete }) {
  const questions = useMemo(() => buildCoinTotalQuestions(Math.random), []);

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
