import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import {
  STEPS,
} from "../../../../../../data/challenges/countingInMultiples";
import { buildOrderMultiplesQuestions } from "../../../../../../data/challenges/countingInMultiples";

/**
 * Challenge 3 — whole-structure work: put a scrambled count back in order.
 *
 * Ordering five terms at once is a different demand from naming the next one:
 * it needs the whole run held in mind. Multiples of one step are always
 * distinct, so exactly one arrangement is correct and a learner who is right
 * can never be marked wrong.
 */

function CountingInMultiplesOf4850And100Challenge3({ onComplete }) {
  const questions = useMemo(() => buildOrderMultiplesQuestions(Math.random), []);

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
  const [items, setItems] = useState(question.items);

  const check = () =>
    submit(items.every((item, i) => Number(item.id) === question.sequence[i]));

  return (
    <>
      <p className="challenge-prompt">
        These are all in the count of <strong>{question.step}s</strong>, but they
        are jumbled. Put them smallest first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button type="button" className="submit-btn" disabled={locked} onClick={check}>
        Check my answer
      </button>
    </>
  );
}

export default CountingInMultiplesOf4850And100Challenge3;
