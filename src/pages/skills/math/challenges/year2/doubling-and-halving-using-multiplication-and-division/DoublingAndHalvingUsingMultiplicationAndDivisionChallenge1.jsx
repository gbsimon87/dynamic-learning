import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildDoubling } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 1 - doubling is multiplying by 2.
 *
 * The Addition and Subtraction category already taught doubling as "the same
 * amount twice". This names it as × 2, which is the connection the guidance
 * asks for, and takes it past 20 where repeated addition stops being practical.
 */

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildDoubling(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Doubling is the same as multiplying by 2."
      render={({ question, submit, locked, index }) => (
        <DoubleIt key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function DoubleIt({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.n} × 2 = ?</p>

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

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge1;
