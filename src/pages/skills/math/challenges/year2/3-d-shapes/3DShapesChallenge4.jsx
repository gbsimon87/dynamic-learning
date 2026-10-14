import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { findSolid } from "../../../../../../data/challenges/shapes";
import { buildOrderSolids } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 4 - order solids by a property.
 *
 * Which property is asked (faces, edges or corners) AND which way round
 * (fewest first or most first) change from question to question, so the
 * cards cannot be ordered from memory of the last one. Only sets with no tie
 * on the asked property are used (see buildOrderSolids).
 */

function SolidsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildOrderSolids(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Sort the solids."
      render={({ question, submit, locked, index }) => (
        <OrderSolids key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function solidCard(card) {
  return {
    id: card.id,
    label: (
      <>
        {/* pattern-cell sizes the drawing for a small card. */}
        <span className="pattern-cell">
          <SolidFigure solid={findSolid(card.solidId)} label={`a ${card.label}`} />
        </span>
        {card.label}
      </>
    ),
  };
}

function OrderSolids({ question, submit, locked }) {
  const [items, setItems] = useState(() => question.cards.map(solidCard));

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the one with the <strong>{question.direction}</strong>{" "}
        <strong>{question.word}</strong> is first.
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

export default SolidsChallenge4;
