import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - two-step money problems, typed.
 *
 * Buy two things and work out the change, or find what is left after
 * spending. Everything stays in pence: mixing pounds and pence in one
 * calculation is beyond Year 2.
 */
const PROBLEMS = [
  { prompt: "You buy a pen for 30p and a rubber for 20p. You pay with 100p. How much change, in pence?", answer: 50 },
  { prompt: "You have 80p. You buy a cake for 45p and a sticker for 10p. How much is left?", answer: 25 },
  { prompt: "Two pencils cost 15p each. You pay with 50p. How much change, in pence?", answer: 20 },
  { prompt: "You have 100p and spend 35p, then 25p. How much is left?", answer: 40 },
  { prompt: "Three stamps cost 10p each. You pay with 50p. How much change, in pence?", answer: 20 },
  { prompt: "You buy a drink for 55p and a biscuit for 20p. You pay with 100p. How much change?", answer: 25 },
  { prompt: "You have 60p. You buy two badges at 25p each. How much is left?", answer: 10 },
  { prompt: "A card costs 40p and a stamp costs 15p. You pay with 100p. How much change?", answer: 45 },
];

function MoneyProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

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

      <NumberInput label="My answer in pence" value={value} onChange={setValue} disabled={locked} />

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
