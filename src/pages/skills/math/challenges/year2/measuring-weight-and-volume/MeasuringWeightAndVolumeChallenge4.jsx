import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildMassCapacityStoryQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 4 - mass and capacity in stories, typed.
 *
 * Includes the two conversions Year 2 needs: 1000 g in a kilogram and 1000 ml
 * in a litre. Each question keeps to one unit. One story of each kind per
 * run, with fresh numbers each attempt.
 */
function MeasuringWeightAndVolumeChallenge4({ onComplete }) {
  const questions = useMemo(() => buildMassCapacityStoryQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Weight and capacity problems."
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

      {/* 1000 g and 1000 ml need a fourth digit. */}
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

export default MeasuringWeightAndVolumeChallenge4;
