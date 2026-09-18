import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order temperatures, coldest first.
 *
 * Below zero is where ordering stops being obvious: −5 °C is colder than
 * 0 °C even though 5 is more than 0. Every set includes at least one negative
 * for exactly that reason.
 */

const SETS = [
  [-5, 0, 10, 25],
  [-10, 5, 20, 35],
  [0, -5, 15, 30],
  [-10, 0, 40, 20],
  [5, -5, 25, 15],
  [-5, 10, 0, 45],
];

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const ordered = [...set].sort((a, b) => a - b).map((n) => `${n} °C`);
    const cards = shuffle(
      set.map((n) => ({ id: `${n} °C`, label: `${n} °C` })),
      rng
    );
    const solved = cards.every((card, i) => card.id === ordered[i]);
    return { ordered, cards: solved ? [...cards].reverse() : cards };
  });
}

function MeasuringTemperatureChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Below zero is colder than zero."
      render={({ question, submit, locked, index }) => (
        <OrderTemperatures key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderTemperatures({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the coldest is first.
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

export default MeasuringTemperatureChallenge3;
