import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildRelatedDivisionChoice } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 1 - the division hiding inside a multiplication.
 *
 * Straight from the guidance: "4 × 5 = 20 and 20 ÷ 5 = 4". The learner is
 * given the multiplication and picks the division that comes with it. Wrong
 * options divide the wrong way round or by the wrong number.
 */

function ConnectingMultiplicationAndDivisionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildRelatedDivisionChoice(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Every multiplication has a division that undoes it."
      render={({ question, submit, locked, index }) => (
        <PickDivision key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickDivision({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.a} × {question.b} = {question.product}
      </p>

      <p className="challenge-prompt">Which division is also true?</p>

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

export default ConnectingMultiplicationAndDivisionChallenge1;
