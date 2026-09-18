import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import SurveyTray from "../../../../../../components/challenge/SurveyTray";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import {
  countByCategory,
  sortByQuantity,
  hasUniqueValues,
  shuffle,
} from "../../../../../../data/challenges/statistics";

/**
 * Challenge 2 - sort the categories by quantity.
 *
 * "Sorting the categories by quantity" is in the statutory sentence word for
 * word, and it is the one thing no chart-reading question asks: it needs
 * every category counted and then the counts compared.
 *
 * Every pile below has four categories with FOUR DIFFERENT counts. A tie
 * would make several arrangements correct while the check accepts one, so
 * `sortByQuantity` refuses a tied dataset and the guard below is what makes
 * that refusal impossible to ship by accident.
 */

const PILES = [
  { categories: ["🍎", "🍐", "🍌", "🍇"], counts: [5, 3, 6, 2] },
  { categories: ["🐱", "🐶", "🐠", "🐦"], counts: [4, 7, 2, 5] },
  { categories: ["🔴", "🔵", "🟡", "🟢"], counts: [6, 2, 4, 3] },
  { categories: ["⭐", "❤️", "🌙", "☀️"], counts: [3, 6, 5, 2] },
  { categories: ["🚗", "🚌", "🚲", "🚚"], counts: [7, 4, 5, 3] },
  { categories: ["🌻", "🌷", "🌹", "🌼"], counts: [2, 5, 3, 6] },
];

const DIRECTIONS = ["most-first", "fewest-first"];

function buildQuestions(rng) {
  return shuffle(PILES, rng).map((pile, i) => {
    const items = shuffle(
      pile.categories.flatMap((category, index) =>
        Array.from({ length: pile.counts[index] }, () => category)
      ),
      rng
    );
    const rows = countByCategory(items, pile.categories);
    // A tied pile has no single correct order. Better to fail loudly here
    // than to mark a correct learner wrong.
    if (!hasUniqueValues(rows)) throw new Error("a pile has two categories on the same count");

    const direction = DIRECTIONS[i % DIRECTIONS.length];
    const answer = sortByQuantity(rows, direction);

    // Reshuffle until the starting order is not already the answer - handed
    // the finished thing, a learner submits without doing any sorting.
    let start = shuffle(pile.categories, rng);
    while (start.every((category, index) => category === answer[index])) {
      start = shuffle(pile.categories, rng);
    }

    return { items, direction, answer, start };
  });
}

function GatheringChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count each kind, then put them in order."
      render={({ question, submit, locked, index }) => (
        <SortCategories key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SortCategories({ question, submit, locked }) {
  const [counted, setCounted] = useState(() => new Set());
  const [order, setOrder] = useState(() =>
    question.start.map((category) => ({ id: category, label: category }))
  );

  const isCorrect = order.every((item, i) => item.id === question.answer[i]);

  return (
    <>
      <SurveyTray
        items={question.items}
        counted={counted}
        disabled={locked}
        onToggle={(index) =>
          setCounted((prev) => {
            const next = new Set(prev);
            if (next.has(index)) next.delete(index);
            else next.add(index);
            return next;
          })
        }
      />

      <p className="challenge-prompt">
        {question.direction === "most-first"
          ? "Drag them so the one there is MOST of comes first."
          : "Drag them so the one there is FEWEST of comes first."}
      </p>

      <DragToOrder items={order} onReorder={setOrder} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isCorrect)}
      >
        Check my order
      </button>
    </>
  );
}

export default GatheringChallenge2;
