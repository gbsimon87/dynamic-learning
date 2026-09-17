import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order by place value.
 *
 * Every set here shares its digits (47, 74, 44, 77), so the order cannot be
 * found by glancing at the digits: the learner has to compare the tens column
 * first and only then the ones.
 */

const SETS = [
  [47, 74, 44, 77],
  [31, 13, 33, 11],
  [62, 26, 66, 22],
  [58, 85, 55, 88],
  [29, 92, 22, 99],
  [16, 61, 11, 66],
];

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const terms = [...set].sort((a, b) => a - b);
    const cards = shuffle(terms.map((value) => ({ id: value, label: value })), rng);
    const solved = cards.every((card, i) => card.id === terms[i]);
    return { terms, cards: solved ? [...cards].reverse() : cards };
  });
}

function PlaceValueChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Smallest first. Check the tens before the ones."
      render={({ question, submit, locked, index }) => (
        <OrderBySize key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderBySize({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Put these numbers in order, smallest first.
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

export default PlaceValueChallenge3;
