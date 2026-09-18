import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - differences between measurements, typed.
 *
 * "How much longer" and "how much heavier" need a comparison and then a
 * subtraction. The guidance also names simple multiples — "half as high",
 * "twice as wide" — so two questions use those instead.
 */
const PROBLEMS = [
  { prompt: "A red ribbon is 45 cm. A blue one is 30 cm. How much longer is the red one?", answer: 15 },
  { prompt: "A box weighs 800 g. Another weighs 350 g. How much heavier is the first?", answer: 450 },
  { prompt: "A jug holds 900 ml. A cup holds 250 ml. How much more does the jug hold?", answer: 650 },
  { prompt: "A wall is 200 cm high. A fence is half as high. How high is the fence?", answer: 100 },
  { prompt: "A table is 80 cm wide. A desk is twice as wide. How wide is the desk?", answer: 160 },
  { prompt: "A bag holds 1000 g. You take out 400 g. How much is left?", answer: 600 },
  { prompt: "One rope is 75 cm, another is 40 cm. What is the difference?", answer: 35 },
  { prompt: "A bottle holds 500 ml. A flask holds twice as much. How much does the flask hold?", answer: 1000 },
];

function ComparingMeasurementsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

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

export default ComparingMeasurementsChallenge4;
