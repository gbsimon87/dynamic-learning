import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildCountOrderQuestions } from "../../../../../../data/challenges/countingForwardsAndBackwards";

/**
 * Challenge 3 - say the whole count, not just where it ends.
 *
 * The cards are the numbers passed through while counting on or back across a
 * tens boundary. Ordering them means producing the sequence, which is harder
 * than naming its last term. Three count back and three count on, generated
 * each time.
 */

function CountingForwardsAndBackwardsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildCountOrderQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put the count in order."
      render={({ question, submit, locked, index }) => (
        <OrderCount key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderCount({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Count {question.direction === "back" ? "back" : "on"} from {question.from} to{" "}
        {question.to}. Drag the numbers into the order you say them.
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

export default CountingForwardsAndBackwardsChallenge3;
