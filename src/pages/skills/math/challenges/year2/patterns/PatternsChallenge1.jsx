import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import { patternAt } from "../../../../../../data/challenges/positionAndDirection";
import { findShape } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - fill the gap in a repeating pattern.
 *
 * The gap sits inside the strip, not at the end, so the pattern can be read
 * from both sides. Two-shape patterns first, then three.
 */

const PLANS = [
  { pattern: ["circle", "square"], gapIndex: 4 },
  { pattern: ["triangle", "circle"], gapIndex: 3 },
  { pattern: ["square", "triangle", "circle"], gapIndex: 4 },
  { pattern: ["hexagon", "circle"], gapIndex: 2 },
  { pattern: ["circle", "triangle", "triangle"], gapIndex: 3 },
  { pattern: ["square", "circle", "hexagon"], gapIndex: 5 },
];

const LENGTH = 6;

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const items = Array.from({ length: LENGTH }, (_, i) => patternAt(plan.pattern, i));
    const answer = items[plan.gapIndex];
    const wrong = plan.pattern.filter((id) => id !== answer);
    const extras = ["hexagon", "square", "triangle", "circle"].filter(
      (id) => id !== answer && !plan.pattern.includes(id)
    );
    const options = shuffle(
      [answer, ...[...wrong, ...extras].slice(0, 2)],
      rng
    );
    return { ...plan, items, answer, options };
  });
}

function PatternsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What is missing from the pattern?"
      render={({ question, submit, locked, index }) => (
        <FillPattern key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillPattern({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PatternStrip
        items={question.items}
        gapIndex={question.gapIndex}
        filled={selected}
        label="a repeating pattern with a gap"
      />

      <ChoiceGrid
        options={question.options.map((id) => findShape(id).name)}
        selected={selected ? findShape(selected).name : null}
        onSelect={(name) => setSelected(question.options.find((id) => findShape(id).name === name))}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PatternsChallenge1;
