import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildRepeatedAddition } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 2 - from repeated addition to the × sign.
 *
 * The learner sees the addition they already understand and picks the
 * multiplication that says the same thing. Wrong options are groupings a
 * child really confuses (4 × 4, 3 × 3, 3 + 4, a group too many or too few),
 * never anything containing the total.
 */

function WhatIsMultiplicationChallenge2({ onComplete }) {
  const questions = useMemo(() => buildRepeatedAddition(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which multiplication means the same?"
      render={({ question, submit, locked, index }) => (
        <MatchStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MatchStatement({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.addition}</p>

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

export default WhatIsMultiplicationChallenge2;
