import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  STEPS,
  isCorrectNumber,
} from "../../../../../../data/challenges/countingInMultiples";
import { buildNthMultipleQuestions } from "../../../../../../data/challenges/countingInMultiples";

/**
 * Challenge 4 — applied, and nothing on screen to count.
 *
 * "Start at 0. Make 6 jumps of 50. What number do you land on?" has to be worked out rather
 * than read off a line, and there are no options to eliminate. The counts stay
 * inside 1,000, which is what caps how far a question may ask.
 */

function CountingInMultiplesOf4850And100Challenge4({ onComplete }) {
  const questions = useMemo(() => buildNthMultipleQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count it out."
      render={({ question, submit, locked, index }) => (
        <CountOn key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountOn({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        Start at 0. Make <strong>{question.position}</strong> jumps of{" "}
        <strong>{question.step}</strong>. What number do you land on?
      </p>

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="Your answer"
        maxDigits={4}
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

export default CountingInMultiplesOf4850And100Challenge4;
