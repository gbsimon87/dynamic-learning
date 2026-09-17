import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { betweenBounds } from "../../../../../../data/challenges/comparingNumbers";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - the hardest slot: many answers are right.
 *
 * "A number greater than 25 and less than 30" has four correct answers, so
 * there is nothing to recognise and nothing to eliminate. The learner has to
 * hold both bounds at once, and the bounds themselves are excluded - naming
 * 25 here is the mistake the question is looking for.
 */

const RANGES = [
  { low: 25, high: 30 },
  { low: 40, high: 46 },
  { low: 11, high: 15 },
  { low: 62, high: 68 },
  { low: 78, high: 83 },
  { low: 50, high: 57 },
];

function LessThanGreaterThanAndEqualToChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(RANGES, Math.random), []);

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
        Type a number that is greater than {question.low} and less than{" "}
        {question.high}.
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
