import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildFractionStories } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 4 - fractions of quantities in stories, typed.
 *
 * Stories and amounts are generated per run and kept to amounts a Year 2
 * child can halve, halve again or share into 3. Two of the six ask what is
 * LEFT, which needs the fraction and then a take-away.
 */

function FindingFractionsOfLargerGroupsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildFractionStories(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read carefully — taken, or left over?"
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

export default FindingFractionsOfLargerGroupsChallenge4;
