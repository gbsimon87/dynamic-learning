import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildFractionCounting } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 3 - count in fractions.
 *
 * The guidance: "count in fractions up to 10, starting from any number and
 * using the 1/2 and 2/4 equivalence on the number line (for example, 1 1/4,
 * 1 2/4 (or 1 1/2), 1 3/4, 2)". Four numbers that count up in quarters or in
 * halves are shuffled, and the learner puts them back in counting order.
 * Halves are sometimes written 2/4, so the equivalence has to be used.
 */

function FractionsOfNumbersChallenge3({ onComplete }) {
  const questions = useMemo(() => buildFractionCounting(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count up in fractions."
      render={({ question, submit, locked, index }) => (
        <CountInFractions key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountInFractions({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        These count up in <strong>{question.step}</strong>. Drag them so the
        smallest is first.
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
