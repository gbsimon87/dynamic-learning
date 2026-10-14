import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { findShape } from "../../../../../../data/challenges/shapes";
import { buildBuildPattern } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 4 - build the pattern.
 *
 * The learner arranges shapes so the whole repeating pattern comes out, rather
 * than filling one slot. Holding the rule across every position at once is the
 * step up from extending it by one. The repeating part is shown as a strip
 * and in words, and the cards are drawings, the same as the strips in
 * challenges 1 and 2 (see buildBuildPattern).
 */

function PatternsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildBuildPattern(Math.random), []);

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

function shapeCard(card) {
  const shape = findShape(card.shapeId);
  return {
    id: card.id,
    shapeId: card.shapeId,
    label: (
      // pattern-cell sizes the figure for a small card.
      <span className="pattern-cell">
        <ShapeFigure shape={shape} label={`a ${shape.name}`} />
      </span>
    ),
  };
}

function BuildPattern({ question, submit, locked }) {
  const [items, setItems] = useState(() => question.cards.map(shapeCard));

  return (
    <>
      <p className="challenge-prompt">
        Drag the shapes so the pattern repeats{" "}
        <strong>{question.unit.map((id) => findShape(id).name).join(", ")}</strong>{" "}
        over and over.
      </p>

      <PatternStrip items={question.unit} gapIndex={-1} label="the part that repeats" />

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
