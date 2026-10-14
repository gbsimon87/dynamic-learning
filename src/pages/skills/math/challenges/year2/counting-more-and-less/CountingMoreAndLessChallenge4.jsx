import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildMoreLessStoryQuestions } from "../../../../../../data/challenges/countingMoreAndLess";

/**
 * Challenge 4 - the jump has to be found in the story.
 *
 * Nothing states "10 more"; the learner has to read that out of the sentence
 * and type the result, so there is nothing to eliminate. Two stories run the
 * comparison backwards ("That is 10 more than Ben"), the hardest shape in this
 * topic. Stories, names and numbers are generated each time.
 */

function CountingMoreAndLessChallenge4({ onComplete }) {
  const questions = useMemo(() => buildMoreLessStoryQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read carefully, then type your answer."
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
        onClick={() => submit(Number(value) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingMoreAndLessChallenge4;
