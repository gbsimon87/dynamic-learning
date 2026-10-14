import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { betweenBounds, buildBetweenQuestions } from "../../../../../../data/challenges/comparingNumbers";

/**
 * Challenge 4 - the hardest slot: many answers are right.
 *
 * "A number greater than 25 and less than 30" has four correct answers, so
 * there is nothing to recognise and nothing to eliminate. The learner has to
 * hold both bounds at once, and the bounds themselves are excluded - naming
 * 25 here is the mistake the question is looking for. Bounds are generated each
 * time, and some questions name the upper bound first.
 */

function LessThanGreaterThanAndEqualToChallenge4({ onComplete }) {
  const questions = useMemo(() => buildBetweenQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="There is more than one right answer."
      render={({ question, submit, locked, index }) => (
        <PickInRange key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickInRange({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        {question.lowFirst
          ? `Type a number that is greater than ${question.low} and less than ${question.high}.`
          : `Type a number that is less than ${question.high} and greater than ${question.low}.`}
      </p>

      <NumberInput label="My number is" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() =>
          submit(betweenBounds(Number(value), question.low, question.high))
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default LessThanGreaterThanAndEqualToChallenge4;
