import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - mass and capacity in stories, typed.
 *
 * Includes the two conversions Year 2 needs: 1000 g in a kilogram and 1000 ml
 * in a litre. Each question keeps to one unit.
 */
const PROBLEMS = [
  { prompt: "How many grams are in 1 kilogram?", answer: 1000 },
  { prompt: "How many millilitres are in 1 litre?", answer: 1000 },
  { prompt: "A bag of flour weighs 500 g. You add 250 g more. What does it weigh?", answer: 750 },
  { prompt: "A bottle holds 900 ml. You drink 300 ml. How much is left?", answer: 600 },
  { prompt: "Two apples weigh 100 g each. How much do they weigh together?", answer: 200 },
  { prompt: "A jug has 750 ml. You pour out 250 ml. How much is left?", answer: 500 },
  { prompt: "A parcel weighs 400 g. Another weighs 350 g. How much altogether?", answer: 750 },
  { prompt: "A tin holds 500 ml. How many millilitres do 2 tins hold?", answer: 1000 },
];

function MeasuringWeightAndVolumeChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

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
        label="My answer is"
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
