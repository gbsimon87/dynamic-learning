import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildDoublingChainQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 3 - double again and again, or halve again and again.
 *
 * Ordering a chain means applying the rule three times over, so the learner
 * produces the whole pattern rather than one answer. Every number doubled is
 * at most 20 (the doubles Year 2 knows), so chains end at 40 at most. Half the
 * chains run the other way, halving from the top.
 */

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildDoublingChainQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Keep doubling, or keep halving."
      render={({ question, submit, locked, index }) => (
        <DoublingChain key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function DoublingChain({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start} and keep {question.mode === "double" ? "doubling" : "halving"}.
        Drag the numbers into order.
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

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge3;
