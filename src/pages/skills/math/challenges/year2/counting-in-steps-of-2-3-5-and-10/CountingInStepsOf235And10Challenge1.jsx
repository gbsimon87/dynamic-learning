import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildSequence,
  pickGapPositions,
  shuffle,
} from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - the gentlest introduction.
 *
 * The step is stated in words and the number line stays on screen, so the
 * learner only has to continue a pattern they can see. One gap per question.
 */

const LENGTH = 6;

// The step is given, so every start is a multiple of it - the sequence a child
// would actually chant.
const PLANS = [
  { step: 2, start: 2 },
  { step: 10, start: 10 },
  { step: 5, start: 5 },
  { step: 2, start: 10 },
  { step: 3, start: 3 },
  { step: 10, start: 20 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const terms = buildSequence(plan.start, plan.step, LENGTH);
    const gaps = pickGapPositions(LENGTH, 1, rng);
    return { ...plan, terms, gaps };
  });
}

function CountingInStepsOf235And10Challenge1({ onComplete }) {
  // Built once per mount, so replaying gives a different order.
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Fill in the missing number."
      render={({ question, submit, locked, index }) => (
        <GapFill
          // Remount on question change so the typed answer never carries over.
          key={index}
          question={question}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function GapFill({ question, submit, locked }) {
  const [value, setValue] = useState("");
  const gapIndex = question.gaps[0];
  const answer = question.terms[gapIndex];

  return (
    <>
      <p className="challenge-prompt">
        Count in {question.step}s.
      </p>

      <NumberLine
        terms={question.terms}
        gaps={question.gaps}
        values={{ [gapIndex]: value }}
        active={gapIndex}
        onFocusGap={() => {}}
        disabled={locked}
      />

      {/* The highlighted gap above already shows what has been typed, so the
          keypad appears without a second box repeating the same digits. */}
      <NumberInput hideField value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(Number(value) === answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingInStepsOf235And10Challenge1;
