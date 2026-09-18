import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - say the whole count, not just where it ends.
 *
 * The cards are the numbers passed through while counting back across a tens
 * boundary. Ordering them means producing the sequence, which is harder than
 * naming its last term.
 */

const PLANS = [
  { from: 72, to: 67 },
  { from: 31, to: 26 },
  { from: 82, to: 77 },
  { from: 44, to: 39 },
  { from: 61, to: 56 },
  { from: 22, to: 17 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const terms = [];
    for (let n = plan.from; n >= plan.to; n--) terms.push(n);
    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    return { ...plan, terms, cards: solved ? [...cards].reverse() : cards };
  });
}

function CountingForwardsAndBackwardsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put the count in order."
      render={({ question, submit, locked, index }) => (
        <OrderCount key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderCount({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Count back from {question.from} to {question.to}. Drag the numbers into
        the order you say them.
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

export default CountingForwardsAndBackwardsChallenge3;
