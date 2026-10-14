import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildHalving } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 2 - halving is dividing by 2, and it names a fraction.
 *
 * Straight from the guidance: "40 ÷ 2 = 20, 20 is a half of 40". Saying both
 * out loud is the connection between division and fractions that Year 2 is
 * meant to begin making.
 */

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildHalving(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Halving is dividing by 2."
      render={({ question, submit, locked, index }) => (
        <HalveIt key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function HalveIt({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.n} ÷ 2 = ?</p>

      <p className="challenge-prompt">
        Your answer is also <strong>half of {question.n}</strong>.
      </p>

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

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge2;
