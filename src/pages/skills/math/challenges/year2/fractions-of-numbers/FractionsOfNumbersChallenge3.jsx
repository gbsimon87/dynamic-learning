import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order "fraction of" calculations by their answers.
 *
 * A bigger fraction of a smaller number can be less than a smaller fraction of
 * a bigger one, so every card must be worked out. No two cards in a set share
 * an answer, or several orders would be correct while only one is accepted.
 */

const SETS = [
  ["1/2 of 8", "1/4 of 20", "1/3 of 9", "3/4 of 8"],
  ["1/4 of 12", "1/2 of 10", "3/4 of 12", "1/3 of 6"],
  ["1/3 of 12", "1/2 of 6", "3/4 of 20", "1/4 of 8"],
  ["1/2 of 20", "1/4 of 16", "1/3 of 18", "3/4 of 4"],
  ["3/4 of 16", "1/2 of 4", "1/4 of 24", "1/3 of 3"],
  ["1/4 of 4", "1/2 of 12", "1/3 of 15", "3/4 of 40"],
];

/** "3/4 of 20" -> 15. Every card has this exact shape. */
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

function FractionsOfNumbersChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work each one out before you move it."
      render={({ question, submit, locked, index }) => (
        <OrderFractionsOf key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderFractionsOf({ question, submit, locked }) {
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

export default FractionsOfNumbersChallenge3;
