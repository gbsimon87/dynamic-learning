import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  STEPS,
  isCorrectNumber,
  shuffle,
} from "../../../../../../data/challenges/countingInMultiples";

/**
 * Challenge 4 — applied, and nothing on screen to count.
 *
 * "Count in 50s from 0; what is the 6th number?" has to be worked out rather
 * than read off a line, and there are no options to eliminate. The counts stay
 * inside 1,000, which is what caps how far a question may ask.
 */

function buildQuestions(rng) {
  const steps = shuffle([...STEPS, ...STEPS], rng).slice(0, 6);
  return steps.map((step) => {
    // Largest position whose answer is still inside Year 3's range.
    const maxPosition = Math.min(12, Math.floor(1000 / step));
    const position = 3 + Math.floor(rng() * Math.max(1, maxPosition - 3));
    return { step, position, answer: step * position };
  });
}

function CountingInMultiplesOf4850And100Challenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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

const ORDINALS = ["1st", "2nd", "3rd", "4th", "5th", "6th", "7th", "8th", "9th", "10th", "11th", "12th"];

function CountOn({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        Start at 0 and count in <strong>{question.step}s</strong>. What is the{" "}
        <strong>{ORDINALS[question.position - 1]}</strong> number you say?
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
