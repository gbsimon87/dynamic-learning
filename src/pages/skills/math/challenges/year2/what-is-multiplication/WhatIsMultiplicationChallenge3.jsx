import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { arrayRows, isTrueMultiplication } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - write the statement the array shows.
 *
 * Three cards make "? × ? = ?". Because multiplication can be done in any
 * order, both 3 × 5 = 15 and 5 × 3 = 15 are accepted — the array is the same
 * grid read two ways, which is the point.
 */

const PLANS = [
  { rows: 3, columns: 5 },
  { rows: 4, columns: 10 },
  { rows: 6, columns: 2 },
  { rows: 5, columns: 4 },
  { rows: 2, columns: 8 },
  { rows: 10, columns: 3 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const product = plan.rows * plan.columns;
    const values = [plan.rows, plan.columns, product];
    let cards = shuffle(
      values.map((value, i) => ({ id: `${value}-${i}`, value, label: value })),
      rng
    );
    // Never start on a correct arrangement.
    if (isTrueMultiplication(cards.map((c) => c.value))) {
      cards = [cards[2], cards[0], cards[1]];
    }
    return { ...plan, product, cards, grid: arrayRows(plan.rows, plan.columns) };
  });
}

function WhatIsMultiplicationChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Build the multiplication this array shows."
      render={({ question, submit, locked, index }) => (
        <BuildStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildStatement({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const values = items.map((item) => item.value);

  return (
    <>
      <ArrayGrid
        rows={question.grid}
        label={`${question.rows} rows of ${question.columns} dots`}
      />

      <p className="statement">
        <span>{values[0]}</span>
        <span>×</span>
        <span>{values[1]}</span>
        <span>=</span>
        <span>{values[2]}</span>
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isTrueMultiplication(values))}
      >
        Check my answer
      </button>
    </>
  );
}

export default WhatIsMultiplicationChallenge3;
