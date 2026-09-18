import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - the whole fact family from one set of numbers.
 *
 * Four statements come from 4, 5 and 20, and the learner sorts the true ones
 * from the false ones by putting the two true ones first. Both orders of the
 * true pair are accepted — the split is what matters, not which true statement
 * leads.
 */

const FAMILIES = [
  { numbers: [4, 5, 20], truthy: ["4 × 5 = 20", "20 ÷ 5 = 4"], falsy: ["5 ÷ 20 = 4", "20 × 5 = 4"] },
  { numbers: [3, 10, 30], truthy: ["3 × 10 = 30", "30 ÷ 10 = 3"], falsy: ["10 ÷ 30 = 3", "30 × 10 = 3"] },
  { numbers: [6, 2, 12], truthy: ["6 × 2 = 12", "12 ÷ 2 = 6"], falsy: ["2 ÷ 12 = 6", "12 × 2 = 6"] },
  { numbers: [7, 5, 35], truthy: ["7 × 5 = 35", "35 ÷ 5 = 7"], falsy: ["5 ÷ 35 = 7", "35 × 5 = 7"] },
  { numbers: [8, 10, 80], truthy: ["8 × 10 = 80", "80 ÷ 10 = 8"], falsy: ["10 ÷ 80 = 8", "80 × 10 = 8"] },
  { numbers: [9, 2, 18], truthy: ["9 × 2 = 18", "18 ÷ 2 = 9"], falsy: ["2 ÷ 18 = 9", "18 × 2 = 9"] },
];

function buildQuestions(rng) {
  return shuffle(FAMILIES, rng).map((family) => {
    const all = [...family.truthy, ...family.falsy];
    let cards = shuffle(all.map((text) => ({ id: text, label: text })), rng);
    const isSolved = (list) =>
      family.truthy.includes(list[0].id) && family.truthy.includes(list[1].id);
    if (isSolved(cards)) cards = [cards[2], cards[0], cards[1], cards[3]];
    return { ...family, cards };
  });
}

function ConnectingMultiplicationAndDivisionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Two of these are true. Drag them to the front."
      render={({ question, submit, locked, index }) => (
        <SortFamily key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SortFamily({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        These all use {question.numbers.join(", ")}. Only two of them are true.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() =>
          submit(
            question.truthy.includes(items[0].id) &&
              question.truthy.includes(items[1].id)
          )
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default ConnectingMultiplicationAndDivisionChallenge3;
