import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order facts from different tables by their answers.
 *
 * Each card comes from a different table, so they cannot be ordered by
 * pattern — every one has to be worked out first. This is where the guidance's
 * "connect them to each other" happens.
 */

const SETS = [
  ["3 × 5", "2 × 2", "10 × 10", "8 × 2"],
  ["4 × 10", "6 × 5", "3 × 2", "9 × 2"],
  ["7 × 5", "2 × 10", "5 × 2", "9 × 10"],
  ["6 × 2", "8 × 5", "10 × 3", "4 × 2"],
  ["9 × 5", "7 × 10", "2 × 6", "5 × 5"],
  ["10 × 8", "4 × 5", "7 × 2", "6 × 10"],
];

/** "3 × 5" -> 15. Every card has this exact shape. */
function evaluate(expression) {
  const [left, , right] = expression.split(" ");
  return Number(left) * Number(right);
}

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const ordered = [...set].sort((a, b) => evaluate(a) - evaluate(b));
    const cards = shuffle(
      set.map((expression) => ({ id: expression, label: expression })),
      rng
    );
    const solved = cards.every((card, i) => card.id === ordered[i]);
    return { ordered, cards: solved ? [...cards].reverse() : cards };
  });
}

function MultiplicationTablesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work each one out, then order them."
      render={({ question, submit, locked, index }) => (
        <OrderFacts key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderFacts({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the smallest answer is first.
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

export default MultiplicationTablesChallenge3;
