import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import FractionBar from "../../../../../../components/challenge/FractionBar";
import { barParts } from "../../../../../../data/challenges/fractions";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - write the fraction yourself.
 *
 * An empty bar is shown split into parts, and the learner types how many to
 * colour for the named fraction. Nothing is offered, so the top number has to
 * be worked out from the name rather than recognised — and two questions ask
 * for 2/4 and 1/2 of the same four-part bar, which must give the same answer.
 */

const PLANS = [
  { fraction: { numerator: 1, denominator: 4 }, name: "one quarter", answer: 1 },
  { fraction: { numerator: 3, denominator: 4 }, name: "three quarters", answer: 3 },
  { fraction: { numerator: 1, denominator: 3 }, name: "one third", answer: 1 },
  { fraction: { numerator: 2, denominator: 4 }, name: "two quarters", answer: 2 },
  { fraction: { numerator: 1, denominator: 2 }, name: "one half", answer: 1 },
  { fraction: { numerator: 2, denominator: 4 }, name: "one half", answer: 2 },
];

function WhatIsAFractionChallenge4({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(PLANS, Math.random).map((plan) => ({
        ...plan,
        // An empty bar: the learner says how many parts to colour.
        parts: barParts({ numerator: 0, denominator: plan.fraction.denominator }),
      })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How many parts should be coloured?"
      render={({ question, submit, locked, index }) => (
        <WriteFraction key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WriteFraction({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        This bar has {question.fraction.denominator} equal parts. How many must
        be coloured to show <strong>{question.name}</strong>?
      </p>

      <FractionBar
        parts={question.parts}
        label={`An empty bar with ${question.fraction.denominator} equal parts`}
      />

      <NumberInput label="Parts to colour" value={value} onChange={setValue} disabled={locked} />

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
