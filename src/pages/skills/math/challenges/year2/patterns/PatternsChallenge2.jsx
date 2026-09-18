import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import { patternAt } from "../../../../../../data/challenges/positionAndDirection";
import { findShape } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - what comes next?
 *
 * The gap moves to the end, so the pattern can only be read forwards. That is
 * harder than filling a hole with neighbours on both sides, which is why it
 * comes second.
 */

const PLANS = [
  ["circle", "square"],
  ["triangle", "triangle", "circle"],
  ["square", "hexagon"],
  ["circle", "triangle", "square"],
  ["hexagon", "hexagon", "circle"],
  ["triangle", "square"],
];

const SHOWN = 5;

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((pattern) => {
    const items = Array.from({ length: SHOWN + 1 }, (_, i) => patternAt(pattern, i));
    const answer = items[SHOWN];
    const extras = ["circle", "square", "triangle", "hexagon"].filter((id) => id !== answer);
    return {
      pattern,
      items,
      gapIndex: SHOWN,
      answer,
      options: shuffle([answer, ...shuffle(extras, rng).slice(0, 2)], rng),
    };
  });
}

function PatternsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What comes next?"
      render={({ question, submit, locked, index }) => (
        <NextInPattern key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NextInPattern({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PatternStrip
        items={question.items}
        gapIndex={question.gapIndex}
        filled={selected}
        label="a repeating pattern that stops"
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

export default PatternsChallenge2;
