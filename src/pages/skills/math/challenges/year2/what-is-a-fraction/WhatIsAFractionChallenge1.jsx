import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import FractionBar from "../../../../../../components/challenge/FractionBar";
import { FRACTIONS, barParts, fractionLabel } from "../../../../../../data/challenges/fractions";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - name the fraction a bar shows.
 *
 * The bar is on screen and its parts are equal by construction, so the
 * learner counts the shaded parts against the total. Distractors are other
 * real fractions, including ones with the right numerator but the wrong
 * denominator, so both numbers have to be read.
 */

function buildQuestions(rng) {
  return shuffle(FRACTIONS, rng)
    .concat(shuffle(FRACTIONS, rng))
    .slice(0, 6)
    .map((fraction) => {
      const answer = fractionLabel(fraction);
      const options = shuffle(
        [
          answer,
          ...shuffle(FRACTIONS, rng)
            .map(fractionLabel)
            .filter((label) => label !== answer)
            .slice(0, 2),
        ],
        rng
      );
      return { fraction, answer, options, parts: barParts(fraction) };
    });
}

function WhatIsAFractionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How much of the bar is coloured?"
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
      <FractionBar
        parts={question.parts}
        label={`${question.answer} of the bar is coloured`}
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
