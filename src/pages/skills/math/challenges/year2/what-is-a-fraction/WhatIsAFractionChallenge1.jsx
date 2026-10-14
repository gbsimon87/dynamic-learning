import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import FractionBar from "../../../../../../components/challenge/FractionBar";
import { buildNameFraction } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 1 - name the fraction a bar shows.
 *
 * The bar is on screen and its parts are equal by construction, so the
 * learner counts the shaded parts against the total. Each Year 2 fraction
 * appears once, coloured in random places, and one question asks how much is
 * NOT coloured. Options never include two equal fractions (2/4 and 1/2).
 */

function WhatIsAFractionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildNameFraction(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Name the fraction."
      render={({ question, submit, locked, index }) => (
        <NameFraction key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameFraction({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        {question.ask === "white" ? (
          <>How much of the bar is <strong>NOT</strong> coloured?</>
        ) : (
          "How much of the bar is coloured?"
        )}
      </p>

      <FractionBar
        parts={question.parts}
        label={`A bar of ${question.parts.length} equal parts, ${question.parts.filter(Boolean).length} coloured`}
      />

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

export default WhatIsAFractionChallenge1;
