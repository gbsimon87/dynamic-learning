import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildMeasureDifferenceQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 4 - differences between measurements, typed.
 *
 * "How much longer" and "how much heavier" need a comparison and then a
 * subtraction. The guidance also names simple multiples — "half as high",
 * "twice as wide" — so half of each run uses those instead.
 */
function ComparingMeasurementsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildMeasureDifferenceQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How much bigger?"
      render={({ question, submit, locked, index }) => (
        <WordProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WordProblem({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput
        label={`My answer in ${question.unit}`}
        value={value}
        onChange={setValue}
        disabled={locked}
        maxDigits={4}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default ComparingMeasurementsChallenge4;
