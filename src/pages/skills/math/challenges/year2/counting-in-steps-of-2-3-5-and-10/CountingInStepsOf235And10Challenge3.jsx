import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildStepOrderQuestions } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - build the whole sequence, not just its next term.
 *
 * Scattered cards must be dragged into counting order. This asks the learner
 * to hold the pattern across every term at once, which is a step up from
 * extending it by one. Sequences are generated each time, two counting back.
 */

function CountingInStepsOf235And10Challenge3({ onComplete }) {
  const questions = useMemo(() => buildStepOrderQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Drag the numbers into the right order."
      render={({ question, submit, locked, index }) => (
        <OrderCards
          key={index}
          question={question}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function OrderCards({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const direction = question.step > 0 ? "smallest first" : "largest first";

  return (
    <>
      <p className="challenge-prompt">
        Count in {Math.abs(question.step)}s, {direction}.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() =>
          submit(items.every((item, i) => item.id === question.terms[i]))
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingInStepsOf235And10Challenge3;
