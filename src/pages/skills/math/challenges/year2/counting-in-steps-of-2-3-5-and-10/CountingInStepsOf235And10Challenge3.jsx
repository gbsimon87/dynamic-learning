import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import {
  buildSequence,
  shuffle,
} from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - build the whole sequence, not just its next term.
 *
 * Scattered cards must be dragged into counting order. This asks the learner
 * to hold the pattern across every term at once, which is a step up from
 * extending it by one.
 */

const LENGTH = 5;

const PLANS = [
  { step: 2, start: 2 },
  { step: 5, start: 10 },
  { step: 3, start: 9 },
  { step: 10, start: 40 },
  { step: -5, start: 45 },
  { step: -2, start: 16 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const terms = buildSequence(plan.start, plan.step, LENGTH);
    const cards = shuffle(
      terms.map((value) => ({ id: value, label: value })),
      rng
    );

    // A shuffle can land back in the right order; nudge it so the learner
    // always has something to do.
    const alreadySolved = cards.every((card, i) => card.id === terms[i]);
    return {
      ...plan,
      terms,
      cards: alreadySolved ? [...cards].reverse() : cards,
    };
  });
}

function CountingInStepsOf235And10Challenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Drag the numbers into the right order."
      render={({ question, submit, locked, index }) => (
        <OrderCards
          key={index}
          question={question}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function OrderCards({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const direction = question.step > 0 ? "smallest first" : "largest first";

  return (
    <>
      <p className="challenge-prompt">
        Count in {Math.abs(question.step)}s, {direction}.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() =>
          submit(items.every((item, i) => item.id === question.terms[i]))
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingInStepsOf235And10Challenge3;
