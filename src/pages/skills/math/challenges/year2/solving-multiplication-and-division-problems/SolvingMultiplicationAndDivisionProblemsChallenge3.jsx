import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildMixedFactOrdering } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - order a mixture of multiplications and divisions.
 *
 * Multiplications and divisions sit side by side, so the operation sign has to
 * be read on every card before any of them can be compared. A big number with
 * a ÷ can easily be the smallest answer.
 */

/** "3 × 5" or "40 ÷ 10". Only these two shapes appear. */

function SolvingMultiplicationAndDivisionProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildMixedFactOrdering(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Check the sign on every card."
      render={({ question, submit, locked, index }) => (
        <OrderMixed key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderMixed({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge3;
