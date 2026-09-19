import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildCompareQuestions,
  isCorrectNumber,
} from "../../../../../../data/challenges/comparingNumbers1000";

/**
 * Challenge 4 — applied, and typed, so there is nothing to eliminate.
 *
 * Every answer is one of the numbers already printed in its own prompt. That
 * is deliberate: the arithmetic is nil and the whole task is deciding WHICH
 * number the words are asking for. "Most", "smallest", "fewer" are the words
 * that carry comparing out of the maths lesson, and a learner who compares
 * correctly but reads "smallest" as "first mentioned" gets it wrong here —
 * which is the point.
 */

function ComparingAndOrderingNumbersTo1000Challenge4({ onComplete }) {
  const questions = useMemo(() => buildCompareQuestions(4, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the problem carefully."
      render={({ question, submit, locked, index }) => (
        <SolveProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveProblem({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="Your answer"
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || entered === ""}
        onClick={() => submit(isCorrectNumber(entered, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default ComparingAndOrderingNumbersTo1000Challenge4;
