import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order calculations by their answers.
 *
 * Every card has to be worked out before any of them can be placed, so one
 * question is four calculations plus a comparison. Sums and differences are
 * mixed so the operation has to be read each time.
 */

const SETS = [
  ["5 + 4", "12 - 8", "7 + 6", "20 - 9"],
  ["10 + 5", "18 - 9", "3 + 4", "14 - 2"],
  ["8 + 8", "11 - 5", "9 + 2", "19 - 6"],
  ["6 + 7", "15 - 10", "4 + 4", "17 - 8"],
  ["2 + 9", "13 - 6", "10 + 10", "16 - 4"],
  ["7 + 7", "20 - 12", "5 + 11", "18 - 8"],
];

/** "12 - 8" -> 4. Only the two shapes above appear. */
function evaluate(expression) {
  const [left, operator, right] = expression.split(" ");
  return operator === "+"
    ? Number(left) + Number(right)
    : Number(left) - Number(right);
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

function SolvingNumberProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work each one out, then put them in order."
      render={({ question, submit, locked, index }) => (
        <OrderByAnswer key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderByAnswer({ question, submit, locked }) {
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

export default SolvingNumberProblemsChallenge3;
