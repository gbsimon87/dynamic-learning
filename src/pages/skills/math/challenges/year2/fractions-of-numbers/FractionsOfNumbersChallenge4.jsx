import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildFractionStatements } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 4 - write the whole statement.
 *
 * Statutory: "write simple fractions, for example 1/2 of 6 = 3". The
 * calculation is shown as a statement to complete rather than a question to
 * answer, which is the form the requirement actually names. Typed, so both
 * steps of a non-unit fraction have to be done.
 */

function FractionsOfNumbersChallenge4({ onComplete }) {
  const questions = useMemo(() => buildFractionStatements(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Finish the statement."
      render={({ question, submit, locked, index }) => (
        <WriteStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WriteStatement({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">{question.text} ?</p>

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

export default FractionsOfNumbersChallenge4;
