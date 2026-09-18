import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { SHAPES_2D, SOLIDS } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - put the odd one out at the front.
 *
 * Three cards share a property and one does not, and the learner drags the
 * exception to the front. Sorting by a property you have to find yourself is
 * harder than sorting by one you are told.
 */

/**
 * No set may contain two shapes with the same NAME. "triangle" and
 * "scalene-triangle" are both honestly called a triangle, so a set holding
 * both showed the learner two identical cards — one of which was the answer.
 */
const PLANS = [
  { rule: "Three of these have four sides.", odd: "triangle", rest: ["square", "rectangle", "rhombus"] },
  { rule: "Three of these are flat.", odd: "cube", rest: ["circle", "square", "hexagon"] },
  { rule: "Three of these have a curved surface.", odd: "cuboid", rest: ["sphere", "cylinder", "cone"] },
  { rule: "Three of these have four sides.", odd: "triangle", rest: ["square", "trapezium", "parallelogram"] },
  { rule: "Three of these are solid.", odd: "octagon", rest: ["cube", "cone", "sphere"] },
  { rule: "Three of these have more than four sides.", odd: "square", rest: ["pentagon", "hexagon", "octagon"] },
];

const LABELS = new Map([
  ...SHAPES_2D.map((s) => [s.id, s.name]),
  ...SOLIDS.map((s) => [s.id, s.name]),
]);

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const ids = shuffle([plan.odd, ...plan.rest], rng);
    let cards = ids.map((id) => ({ id, label: LABELS.get(id) }));
    // Never start with the answer already at the front.
    if (cards[0].id === plan.odd) cards = [cards[1], cards[0], ...cards.slice(2)];
    return { ...plan, cards };
  });
}

function DifferentShapesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the odd one out."
      render={({ question, submit, locked, index }) => (
        <OddOneOut key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OddOneOut({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        {question.rule} Drag the one that does not belong to the front.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items[0].id === question.odd)}
      >
        Check my answer
      </button>
    </>
  );
}

export default DifferentShapesChallenge3;
