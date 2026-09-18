import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - the division facts that come with each table.
 *
 * Statutory: "recall and use multiplication AND DIVISION facts" for the
 * tables. Multiplications and divisions are mixed and typed, so a table fact
 * has to be usable in both directions.
 */

const FACTS = [
  { text: "6 × 5", answer: 30 },
  { text: "40 ÷ 10", answer: 4 },
  { text: "9 × 2", answer: 18 },
  { text: "35 ÷ 5", answer: 7 },
  { text: "7 × 10", answer: 70 },
  { text: "16 ÷ 2", answer: 8 },
  { text: "8 × 5", answer: 40 },
  { text: "90 ÷ 10", answer: 9 },
  { text: "45 ÷ 5", answer: 9 },
  { text: "4 × 2", answer: 8 },
];

function MultiplicationTablesChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(FACTS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Multiply and divide with your tables."
      render={({ question, submit, locked, index }) => (
        <Fact key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Fact({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">{question.text} = ?</p>

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

export default MultiplicationTablesChallenge4;
