import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import FractionBar from "../../../../../../components/challenge/FractionBar";
import { buildEquivalence } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 2 - two names for the same amount.
 *
 * Statutory: "recognise the equivalence of 2/4 and 1/2". Each run mixes three
 * kinds of question: match a bar to its other name, write the missing number
 * (1/2 = ?/4 or 2/4 = 1/?), and four "same amount?" pairs — the one equal
 * pair plus three drawn from seven unequal ones — so the run changes every
 * time and "yes" cannot be guessed.
 */

function WhatIsAFractionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildEquivalence(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="2/4 and 1/2 are the same amount."
      render={({ question, submit, locked, index }) => (
        <Equivalence key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Equivalence({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {question.kind === "match" && (
        <>
          <FractionBar
            parts={question.parts}
            label={`A bar of ${question.parts.length} equal parts, ${question.parts.filter(Boolean).length} coloured`}
          />
          <p className="challenge-prompt">
            Which fraction is the same amount as this?
          </p>
        </>
      )}

      {question.kind === "missing" && (
        <>
          <p className="sequence-strip">{question.text}</p>
          <p className="challenge-prompt">Which number goes in the box?</p>
        </>
      )}

      {question.kind === "same" && (
        <>
          <FractionBar
            parts={question.partsA}
            label={`The first bar: ${question.partsA.length} equal parts, ${question.partsA.filter(Boolean).length} coloured`}
          />
          <FractionBar
            parts={question.partsB}
            label={`The second bar: ${question.partsB.length} equal parts, ${question.partsB.filter(Boolean).length} coloured`}
          />
          <p className="challenge-prompt">
            Do these two bars show the same amount?
          </p>
        </>
      )}

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default WhatIsAFractionChallenge2;
