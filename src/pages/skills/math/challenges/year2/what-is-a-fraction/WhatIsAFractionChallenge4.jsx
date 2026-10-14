import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import FractionBar from "../../../../../../components/challenge/FractionBar";
import { buildWriteFraction } from "../../../../../../data/challenges/fractions";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 4 - write the fraction yourself.
 *
 * A bar is shown and one number of its fraction is missing: the top (how many
 * parts are coloured), the bottom (how many equal parts), how many are NOT
 * coloured, or how many quarters make 1/2. The number is read from the
 * picture, never from the words, and nothing is offered — it is typed.
 */

function WhatIsAFractionChallenge4({ onComplete }) {
  const questions = useMemo(() => buildWriteFraction(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Write the missing number."
      render={({ question, submit, locked, index }) => (
        <WriteFraction key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WriteFraction({ question, submit, locked }) {
  const [value, setValue] = useState("");
  const coloured = question.parts.filter(Boolean).length;

  return (
    <>
      <FractionBar
        parts={question.parts}
        label={`A bar of ${question.parts.length} equal parts, ${coloured} coloured`}
      />

      <p className={question.kind === "half" ? "challenge-prompt" : "sequence-strip"}>
        {question.text}
      </p>

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

export default WhatIsAFractionChallenge4;
