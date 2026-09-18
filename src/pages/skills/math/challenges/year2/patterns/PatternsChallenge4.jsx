import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { findShape } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - build the pattern.
 *
 * The learner arranges shapes so the whole repeating pattern comes out, rather
 * than filling one slot. Holding the rule across every position at once is the
 * step up from extending it by one.
 */

const PLANS = [
  ["circle", "square", "circle", "square"],
  ["triangle", "triangle", "circle", "triangle", "triangle", "circle"],
  ["square", "circle", "hexagon", "square", "circle", "hexagon"],
  ["hexagon", "circle", "hexagon", "circle"],
  ["circle", "triangle", "square", "circle", "triangle", "square"],
  ["square", "square", "circle", "square", "square", "circle"],
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((sequence) => {
    const cards = shuffle(
      sequence.map((id, i) => ({ id: `${id}-${i}`, shapeId: id, label: findShape(id).name })),
      rng
    );
    const target = sequence;
    const solved = cards.every((card, i) => card.shapeId === target[i]);
    return {
      target,
      unit: sequence.slice(0, sequence.length / 2),
      cards: solved ? [...cards].reverse() : cards,
    };
  });
}

function PatternsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Build the whole pattern."
      render={({ question, submit, locked, index }) => (
        <BuildPattern key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildPattern({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag the shapes so the pattern repeats{" "}
        <strong>{question.unit.map((id) => findShape(id).name).join(", ")}</strong>{" "}
        over and over.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() =>
          submit(items.every((item, i) => item.shapeId === question.target[i]))
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default PatternsChallenge4;
