import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import { patternAt } from "../../../../../../data/challenges/positionAndDirection";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - how long is the repeat?
 *
 * Seeing THAT something repeats is easier than seeing how long the repeating
 * unit is, and the unit is what makes a sequence predictable. Typed, so it
 * cannot be found by elimination.
 */

const PLANS = [
  { pattern: ["circle", "square"], answer: 2 },
  { pattern: ["triangle", "triangle", "circle"], answer: 3 },
  { pattern: ["square", "circle", "hexagon"], answer: 3 },
  { pattern: ["hexagon", "circle"], answer: 2 },
  { pattern: ["circle", "triangle", "square", "hexagon"], answer: 4 },
  { pattern: ["square", "square", "circle", "circle"], answer: 4 },
];

const LENGTH = 8;

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => ({
    ...plan,
    items: Array.from({ length: LENGTH }, (_, i) => patternAt(plan.pattern, i)),
  }));
}

function SequencesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the part that repeats."
      render={({ question, submit, locked, index }) => (
        <CountRepeat key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountRepeat({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <PatternStrip items={question.items} gapIndex={-1} label="a long repeating pattern" />

      <p className="challenge-prompt">
        How many shapes are in the part that repeats?
      </p>

      <NumberInput label="Shapes in the repeat" value={value} onChange={setValue} disabled={locked} />

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

export default SequencesChallenge2;
