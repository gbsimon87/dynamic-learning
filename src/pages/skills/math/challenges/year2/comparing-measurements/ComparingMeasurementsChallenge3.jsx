import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - order measurements, smallest first.
 *
 * Every set mixes units, so they cannot be ordered by the number alone: 950 ml
 * is less than 1 litre even though 950 is the bigger number. Values are
 * converted to a common unit for checking, and no set contains two equal
 * measures.
 */

const SETS = [
  [{ label: "50 cm", v: 50 }, { label: "1 m", v: 100 }, { label: "25 cm", v: 25 }, { label: "2 m", v: 200 }],
  [{ label: "950 ml", v: 950 }, { label: "1 litre", v: 1000 }, { label: "500 ml", v: 500 }, { label: "250 ml", v: 250 }],
  [{ label: "1 kg", v: 1000 }, { label: "750 g", v: 750 }, { label: "250 g", v: 250 }, { label: "500 g", v: 500 }],
  [{ label: "10 cm", v: 10 }, { label: "3 m", v: 300 }, { label: "80 cm", v: 80 }, { label: "1 m", v: 100 }],
  [{ label: "100 ml", v: 100 }, { label: "1 litre", v: 1000 }, { label: "600 ml", v: 600 }, { label: "350 ml", v: 350 }],
  [{ label: "2 kg", v: 2000 }, { label: "900 g", v: 900 }, { label: "1 kg", v: 1000 }, { label: "100 g", v: 100 }],
];

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const ordered = [...set].sort((a, b) => a.v - b.v).map((m) => m.label);
    const cards = shuffle(set.map((m) => ({ id: m.label, label: m.label })), rng);
    const solved = cards.every((card, i) => card.id === ordered[i]);
    return { ordered, cards: solved ? [...cards].reverse() : cards };
  });
}

function ComparingMeasurementsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A bigger number is not always a bigger measure."
      render={({ question, submit, locked, index }) => (
        <OrderMeasures key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderMeasures({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the smallest measure is first.
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

export default ComparingMeasurementsChallenge3;
