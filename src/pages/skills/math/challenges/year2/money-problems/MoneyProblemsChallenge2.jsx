import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildChangeQuestions } from "../../../../../../data/challenges/measurement";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 2 - working out change.
 *
 * Statutory, and named explicitly: "including giving change". Change is a
 * subtraction dressed up, and the wording ("how much change") is as much the
 * lesson as the arithmetic. Payment is always ONE coin or note a child can
 * hold (never "80p", which no coin is). Four questions are all in pence and
 * two all in whole pounds — never both in one calculation.
 */

function MoneyProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildChangeQuestions(Math.random), []);

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
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput
        label={question.unit === "£" ? "Change in pounds (£)" : "Change in pence (p)"}
        value={value}
        onChange={setValue}
        disabled={locked}
      />

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
