import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order a mixture of multiplications and divisions.
 *
 * Multiplications and divisions sit side by side, so the operation sign has to
 * be read on every card before any of them can be compared. A big number with
 * a ÷ can easily be the smallest answer.
 */

const SETS = [
  ["3 × 5", "40 ÷ 10", "6 ÷ 2", "50 ÷ 5"],
  ["9 × 2", "30 ÷ 5", "4 × 10", "16 ÷ 2"],
  ["100 ÷ 10", "6 × 5", "8 ÷ 2", "7 × 2"],
  ["45 ÷ 5", "5 × 10", "12 ÷ 2", "4 × 2"],
  ["8 × 10", "20 ÷ 5", "14 ÷ 2", "9 × 5"],
  ["60 ÷ 10", "4 × 5", "18 ÷ 2", "10 × 10"],
];

/** "3 × 5" or "40 ÷ 10". Only these two shapes appear. */
function evaluate(expression) {
  const [left, operator, right] = expression.split(" ");
  return operator === "×"
    ? Number(left) * Number(right)
    : Number(left) / Number(right);
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

function SolvingMultiplicationAndDivisionProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Check the sign on every card."
      render={({ question, submit, locked, index }) => (
        <OrderMixed key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderMixed({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge3;
