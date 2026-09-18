import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { isTrueDivision } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - build a true division.
 *
 * Unlike multiplication, order matters: 20 ÷ 5 = 4 is true but 5 ÷ 20 = 4 is
 * not. Both true arrangements are accepted (20 ÷ 5 = 4 and 20 ÷ 4 = 5), so
 * what is really being tested is that the total has to come first.
 */

const FAMILIES = [
  [20, 5, 4],
  [12, 2, 6],
  [50, 10, 5],
  [30, 5, 6],
  [16, 2, 8],
  [40, 10, 4],
];

function buildQuestions(rng) {
  return FAMILIES.map((family) => {
    let cards = shuffle(
      family.map((value) => ({ id: value, value, label: value })),
      rng
    );
    if (isTrueDivision(cards.map((c) => c.value))) {
      cards = [cards[1], cards[0], cards[2]];
    }
    return { family, cards };
  });
}

function WhatIsDivisionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Make a division that is true."
      render={({ question, submit, locked, index }) => (
        <BuildDivision key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildDivision({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const values = items.map((item) => item.value);

  return (
    <>
      <p className="challenge-prompt">
        The biggest number is the one being shared. There is more than one right
        answer.
      </p>

      <p className="statement">
        <span>{values[0]}</span>
        <span>÷</span>
        <span>{values[1]}</span>
        <span>=</span>
        <span>{values[2]}</span>
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isTrueDivision(values))}
      >
        Check my answer
      </button>
    </>
  );
}

export default WhatIsDivisionChallenge3;
