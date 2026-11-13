import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildMixedTableFacts } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 4 - the division facts that come with each table.
 *
 * Statutory: "recall and use multiplication AND DIVISION facts" for the
 * tables. Multiplications and divisions are mixed and typed, so a table fact
 * has to be usable in both directions.
 */

function MultiplicationTablesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildMixedTableFacts(Math.random), []);

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
