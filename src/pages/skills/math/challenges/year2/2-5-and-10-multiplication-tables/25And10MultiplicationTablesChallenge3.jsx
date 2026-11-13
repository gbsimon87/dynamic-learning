import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildTableOrdering } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - order facts from different tables by their answers.
 *
 * Each card comes from a different table, so they cannot be ordered by
 * pattern — every one has to be worked out first. This is where the guidance's
 * "connect them to each other" happens.
 */

/** "3 × 5" -> 15. Every card has this exact shape. */

function MultiplicationTablesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildTableOrdering(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work each one out, then order them."
      render={({ question, submit, locked, index }) => (
        <OrderFacts key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderFacts({ question, submit, locked }) {
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

export default MultiplicationTablesChallenge3;
