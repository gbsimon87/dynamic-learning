import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildDivisionOrdering } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - order divisions by their answers.
 *
 * Bigger totals do not mean bigger answers: 50 ÷ 10 is smaller than 12 ÷ 2.
 * Sets are generated so the card with the biggest number to share never has
 * the biggest answer, and no two cards tie.
 */

function DivisionProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildDivisionOrdering(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A bigger number to share does not mean a bigger answer."
      render={({ question, submit, locked, index }) => (
        <OrderDivisions key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderDivisions({ question, submit, locked }) {
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

export default DivisionProblemsChallenge3;
