import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildHalvingChains } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - halve, and halve again.
 *
 * Repeated halving is repeated division. Chains start from friendly numbers
 * (100, 80, 40, 24 …) and stop before a remainder or after four numbers, so
 * every step is a half a Year 2 child can find.
 */

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildHalvingChains(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Each number is half the one before it."
      render={({ question, submit, locked, index }) => (
        <HalvingChain key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function HalvingChain({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start} and keep halving. Drag them into order.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(items.every((item, i) => item.id === question.terms[i]))}
      >
        Check my answer
      </button>
    </>
  );
}

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge3;
