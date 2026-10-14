import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildGroupStoryQuestions } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - the hardest slot: steps applied to real things.
 *
 * No sequence is shown, so the learner has to recognise that "6 pairs" means
 * counting in 2s and then do it. Answers are typed rather than chosen, so
 * there is nothing to eliminate.
 *
 * Wording follows the house style: short sentences, concrete nouns, digits
 * rather than number words, and the question asked last. Every step appears
 * at least once, and the stories and numbers are drawn fresh each time.
 */

function CountingInStepsOf235And10Challenge4({ onComplete }) {
  const questions = useMemo(() => buildGroupStoryQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count in steps to solve the problem."
      render={({ question, submit, locked, index }) => (
        <WordProblem
          key={index}
          question={question}
          submit={submit}
          locked={locked}
        />
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
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(Number(value) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingInStepsOf235And10Challenge4;
