import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildCountingStoryQuestions } from "../../../../../../data/challenges/countingForwardsAndBackwards";

/**
 * Challenge 4 - counting on and back inside a story, typed.
 *
 * Whether to count forwards or backwards has to be read out of the sentence,
 * and every answer crosses a tens boundary. Three stories count on and three
 * count back; the stories and numbers are drawn fresh each time.
 */

function CountingForwardsAndBackwardsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildCountingStoryQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count on or back to solve it."
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

export default CountingForwardsAndBackwardsChallenge4;
