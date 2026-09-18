import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - lengths in stories, typed.
 *
 * Mixes adding and comparing lengths with the 100 cm = 1 m conversion. Every
 * question stays in ONE unit at a time, as the curriculum expects at this age.
 */
const PROBLEMS = [
  { prompt: "A ribbon is 25 cm. Another is 15 cm. How long are they together?", answer: 40 },
  { prompt: "A stick is 40 cm. You cut off 12 cm. How long is it now?", answer: 28 },
  { prompt: "How many centimetres are in 1 metre?", answer: 100 },
  { prompt: "A rope is 200 cm long. How many metres is that?", answer: 2 },
  { prompt: "Tom is 120 cm tall. Ana is 15 cm taller. How tall is Ana?", answer: 135 },
  { prompt: "A table is 90 cm wide. A shelf is 30 cm wider. How wide is the shelf?", answer: 120 },
  { prompt: "A snake is 55 cm. A worm is 12 cm. How much longer is the snake?", answer: 43 },
  { prompt: "How many centimetres are in 3 metres?", answer: 300 },
];

function MeasuringLengthAndHeightChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Measuring problems."
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

      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />

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

export default MeasuringLengthAndHeightChallenge4;
