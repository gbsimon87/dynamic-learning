import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order fractions of different large amounts.
 *
 * Unlike the previous topic's ordering, the totals differ on every card, so
 * neither the fraction nor the total alone predicts the order. No set contains
 * a tie.
 */

const SETS = [
  ["1/2 of 40", "1/4 of 40", "3/4 of 40", "1/3 of 45"],
  ["1/4 of 80", "1/2 of 60", "1/3 of 45", "3/4 of 80"],
  ["3/4 of 20", "1/2 of 100", "1/4 of 100", "1/3 of 60"],
  ["1/3 of 90", "1/4 of 60", "1/2 of 80", "3/4 of 8"],
  ["1/2 of 30", "3/4 of 100", "1/4 of 20", "1/3 of 36"],
  ["1/4 of 48", "1/2 of 50", "1/3 of 12", "3/4 of 60"],
];

/** "3/4 of 40" -> 30. Every card has this exact shape. */
function evaluate(expression) {
  const [fraction, , total] = expression.split(" ");
  const [numerator, denominator] = fraction.split("/").map(Number);
  return (Number(total) / denominator) * numerator;
}

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const ordered = [...set].sort((a, b) => evaluate(a) - evaluate(b));
    const cards = shuffle(set.map((label) => ({ id: label, label })), rng);
    const solved = cards.every((card, i) => card.id === ordered[i]);
    return { ordered, cards: solved ? [...cards].reverse() : cards };
  });
}

function FindingFractionsOfLargerGroupsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="The totals are different too — check both numbers."
      render={({ question, submit, locked, index }) => (
        <OrderLarge key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderLarge({ question, submit, locked }) {
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

export default FindingFractionsOfLargerGroupsChallenge3;
