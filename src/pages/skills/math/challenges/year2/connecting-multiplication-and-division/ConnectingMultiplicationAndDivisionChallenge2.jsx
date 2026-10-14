import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildUseTheFact } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 2 - use the fact you know.
 *
 * The guidance: "4 × 5 = 20 and 20 ÷ 5 = 4". One fact is shown and a related
 * one asked — a division from a multiplication, or the multiplication (in
 * either order, since × can be swapped) from a division. The answer is never
 * printed in the question; wrong options are the other number in the fact
 * and a near-miss, so the inverse has to be used, not spotted.
 */

function ConnectingMultiplicationAndDivisionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildUseTheFact(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the fact you know."
      render={({ question, submit, locked, index }) => (
        <UseTheFact key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function UseTheFact({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        You know <strong>{question.fact}</strong>. So…
      </p>
      <p className="sequence-strip">{question.ask}</p>

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

export default ConnectingMultiplicationAndDivisionChallenge2;
