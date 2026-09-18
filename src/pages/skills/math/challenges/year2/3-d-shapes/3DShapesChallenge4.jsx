import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { countableSolids } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - order solids by a property.
 *
 * Which property changes from question to question, so the cards cannot be
 * ordered from memory of the last one: a cube and a cuboid tie on faces but
 * differ from a pyramid, and a prism overtakes on edges.
 *
 * Only sets with no tie on the property being asked are used.
 */

const PLANS = [
  { key: "edges", word: "edges", ids: ["square-pyramid", "triangular-prism", "cube"] },
  { key: "vertices", word: "corners", ids: ["square-pyramid", "triangular-prism", "cube"] },
  { key: "faces", word: "faces", ids: ["square-pyramid", "cube"] },
  { key: "edges", word: "edges", ids: ["cuboid", "square-pyramid", "triangular-prism"] },
  { key: "vertices", word: "corners", ids: ["cube", "square-pyramid", "triangular-prism"] },
  { key: "faces", word: "faces", ids: ["triangular-prism", "cuboid"] },
];

function buildQuestions(rng) {
  const byId = new Map(countableSolids().map((s) => [s.id, s]));

  return shuffle(PLANS, rng).map((plan) => {
    const solids = plan.ids.map((id) => byId.get(id));
    const ordered = [...solids]
      .sort((a, b) => a[plan.key] - b[plan.key])
      .map((s) => s.id);
    const cards = shuffle(solids.map((s) => ({ id: s.id, label: s.name })), rng);
    const solved = cards.every((card, i) => card.id === ordered[i]);
    return { ...plan, ordered, cards: solved ? [...cards].reverse() : cards };
  });
}

function SolidsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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

function OrderSolids({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the one with the fewest <strong>{question.word}</strong>{" "}
        is first.
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
