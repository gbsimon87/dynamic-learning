import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { applyChange, describeChange } from "../../../../../../data/challenges/countingMoreAndLess";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - apply the jump repeatedly, not once.
 *
 * The learner drags five numbers into the order the rule produces them. Holding
 * the rule across the whole chain is a step up from answering a single jump.
 */

const LENGTH = 5;

const PLANS = [
  { start: 12, change: 10 },
  { start: 74, change: -10 },
  { start: 31, change: 1 },
  { start: 20, change: 5 },
  { start: 60, change: -5 },
  { start: 45, change: -1 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const terms = Array.from({ length: LENGTH }, (_, i) =>
      i === 0 ? plan.start : null
    );
    terms[0] = plan.start;
    for (let i = 1; i < LENGTH; i++) terms[i] = applyChange(terms[i - 1], plan.change);

    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    // A shuffle can land already solved; reverse it so there is always a move.
    const solved = cards.every((card, i) => card.id === terms[i]);

    return { ...plan, terms, cards: solved ? [...cards].reverse() : cards };
  });
}

function CountingMoreAndLessChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Drag the numbers into the right order."
      render={({ question, submit, locked, index }) => (
        <OrderByRule key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderByRule({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start}. Each number is {describeChange(question.change)} than
        the one before it.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.terms[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingMoreAndLessChallenge3;
