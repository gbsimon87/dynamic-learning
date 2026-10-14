import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildRuleChainQuestions, describeChange } from "../../../../../../data/challenges/countingMoreAndLess";

/**
 * Challenge 3 - apply the jump repeatedly, not once.
 *
 * The learner drags five numbers into the order the rule produces them. Holding
 * the rule across the whole chain is a step up from answering a single jump.
 * Each rule appears once, from a start generated each time.
 */

function CountingMoreAndLessChallenge3({ onComplete }) {
  const questions = useMemo(() => buildRuleChainQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Drag the numbers into the right order."
      render={({ question, submit, locked, index }) => (
        <OrderByRule key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderByRule({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start}. Each number is {describeChange(question.change)} than
        the one before it.
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

export default CountingMoreAndLessChallenge3;
