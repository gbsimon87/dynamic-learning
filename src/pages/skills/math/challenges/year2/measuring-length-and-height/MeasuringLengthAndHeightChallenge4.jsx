import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildLengthStoryQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 4 - lengths in stories, typed.
 *
 * Mixes adding and comparing lengths with the 100 cm = 1 m conversion. Every
 * question stays in ONE unit at a time, as the curriculum expects at this age.
 * One story of each kind per run, with fresh numbers each attempt.
 */
function MeasuringLengthAndHeightChallenge4({ onComplete }) {
  const questions = useMemo(() => buildLengthStoryQuestions(Math.random), []);

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

      <NumberInput label={`My answer in ${question.unit}`} value={value} onChange={setValue} disabled={locked} />

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
