import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order divisions by their answers.
 *
 * Bigger totals do not mean bigger answers: 50 ÷ 10 is smaller than 12 ÷ 2.
 * Every card has to be worked out, which is exactly the trap this ordering
 * sets.
 */

const SETS = [
  ["50 ÷ 10", "12 ÷ 2", "20 ÷ 5", "18 ÷ 2"],
  ["40 ÷ 10", "30 ÷ 5", "16 ÷ 2", "25 ÷ 5"],
  ["90 ÷ 10", "14 ÷ 2", "10 ÷ 5", "20 ÷ 2"],
  ["35 ÷ 5", "60 ÷ 10", "8 ÷ 2", "45 ÷ 5"],
  ["100 ÷ 10", "6 ÷ 2", "20 ÷ 5", "22 ÷ 2"],
  ["70 ÷ 10", "40 ÷ 5", "4 ÷ 2", "50 ÷ 5"],
];

/** "50 ÷ 10" -> 5. Every card has this exact shape. */
function evaluate(expression) {
  const [left, , right] = expression.split(" ");
  return Number(left) / Number(right);
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

function DivisionProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A bigger number to share does not mean a bigger answer."
      render={({ question, submit, locked, index }) => (
        <OrderDivisions key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderDivisions({ question, submit, locked }) {
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

export default DivisionProblemsChallenge3;
