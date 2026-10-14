import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildMissingAddendQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 1 - a missing number in a small addition.
 *
 * Totals stay within 20, where the learner is expected to be fluent, so the
 * work is understanding what the empty box means rather than the arithmetic.
 */

function SolvingMissingNumberProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildMissingAddendQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What belongs in the box?"
      render={({ question, submit, locked, index }) => (
        <MissingBox key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MissingBox({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="statement">
        <span>{question.known}</span>
        <span>+</span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>=</span>
        <span>{question.total}</span>
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

export default SolvingMissingNumberProblemsChallenge1;
