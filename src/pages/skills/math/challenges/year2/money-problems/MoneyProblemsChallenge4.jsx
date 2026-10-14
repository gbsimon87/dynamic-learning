import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildTwoStepMoneyQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 4 - two-step money problems, typed.
 *
 * Buy two things and work out the change, or find what is left after
 * spending. Each question stays in ONE unit — four in pence, two in whole
 * pounds — because mixing pounds and pence in one calculation is beyond
 * Year 2. A pound coin is called £1, never "100p".
 */
function MoneyProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTwoStepMoneyQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work out the total first."
      render={({ question, submit, locked, index }) => (
        <TwoStepMoney key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TwoStepMoney({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput
        label={question.unit === "£" ? "My answer in pounds (£)" : "My answer in pence (p)"}
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

export default MoneyProblemsChallenge4;
