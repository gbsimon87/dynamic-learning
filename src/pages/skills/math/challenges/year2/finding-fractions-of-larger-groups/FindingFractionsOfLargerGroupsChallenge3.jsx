import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildFractionOfOrdering } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 3 - order fractions of different amounts.
 *
 * The totals differ on every card, so neither the fraction nor the total
 * alone predicts the order. Every amount is one a Year 2 child can halve,
 * halve again or share into 3, and no set contains a tie.
 */

function FindingFractionsOfLargerGroupsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildFractionOfOrdering(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="The totals are different too — check both numbers."
      render={({ question, submit, locked, index }) => (
        <OrderLarge key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderLarge({ question, submit, locked }) {
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

export default FindingFractionsOfLargerGroupsChallenge3;
