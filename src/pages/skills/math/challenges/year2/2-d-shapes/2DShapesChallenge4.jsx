import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { sideCountableShapes } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - order shapes by how many sides they have.
 *
 * Every card has to be identified and counted before any of them can be
 * placed, so one question is several shapes at once. No set repeats a side
 * count, or more than one order would be correct while only one is accepted.
 */

const SETS = [
  ["triangle", "square", "pentagon", "hexagon"],
  ["hexagon", "triangle", "octagon", "square"],
  ["square", "pentagon", "octagon", "triangle"],
  ["pentagon", "hexagon", "triangle", "octagon"],
  ["triangle", "hexagon", "square", "pentagon"],
  ["octagon", "square", "hexagon", "triangle"],
];

function buildQuestions(rng) {
  const byId = new Map(sideCountableShapes().map((s) => [s.id, s]));

  return shuffle(SETS, rng).map((set) => {
    const shapes = set.map((id) => byId.get(id));
    const ordered = [...shapes].sort((a, b) => a.sides - b.sides).map((s) => s.id);
    const cards = shuffle(shapes.map((s) => ({ id: s.id, label: s.name })), rng);
    const solved = cards.every((card, i) => card.id === ordered[i]);
    return { ordered, cards: solved ? [...cards].reverse() : cards };
  });
}

function ShapesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Fewest sides first."
      render={({ question, submit, locked, index }) => (
        <OrderBySides key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderBySides({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag the shapes so the one with the fewest sides is first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.ordered[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default ShapesChallenge4;
