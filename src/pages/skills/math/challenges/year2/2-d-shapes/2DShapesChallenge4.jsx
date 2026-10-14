import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { findShape } from "../../../../../../data/challenges/shapes";
import { buildOrderBySides } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 4 - order shapes by how many sides they have.
 *
 * The cards are DRAWINGS, not names: every shape has to be counted before any
 * of them can be placed, and an irregular hexagon cannot be ordered from
 * memory of the word "hexagon". No set repeats a side count, or more than one
 * order would be correct while only one is accepted (see buildOrderBySides).
 */

function ShapesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildOrderBySides(Math.random), []);

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

function shapeCard(card) {
  const shape = findShape(card.shapeId);
  return {
    id: card.id,
    label: (
      // pattern-cell sizes the figure for a small card.
      <span className="pattern-cell">
        <ShapeFigure shape={shape} showVertices label={`a ${shape.name}`} />
      </span>
    ),
  };
}

function OrderBySides({ question, submit, locked }) {
  const [items, setItems] = useState(() => question.cards.map(shapeCard));

  return (
    <>
      <p className="challenge-prompt">
        Count the sides on each shape. Drag them so the one with the fewest
        sides is first.
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
