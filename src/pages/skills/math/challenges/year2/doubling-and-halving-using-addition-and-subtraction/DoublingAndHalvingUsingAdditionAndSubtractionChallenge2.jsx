import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildHalvingQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 2 - halving, with nothing drawn.
 *
 * Halving is the inverse of doubling, so the learner can reach it from the
 * double they already know. Only even numbers to 20 appear: Year 2 halves
 * whole amounts, using the doubles it knows.
 */

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildHalvingQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Half means split equally into two."
      render={({ question, submit, locked, index }) => (
        <Half key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Half({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">half of {question.n}</p>

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

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge2;
