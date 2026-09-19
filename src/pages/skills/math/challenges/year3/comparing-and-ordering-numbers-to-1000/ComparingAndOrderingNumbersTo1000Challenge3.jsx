import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildCompareQuestions } from "../../../../../../data/challenges/comparingNumbers1000";

/**
 * Challenge 3 — whole-structure work: order five numbers at once.
 *
 * Comparing is a question about two numbers; ordering is a question about the
 * whole set, and it cannot be answered one pair at a time. Each set is built
 * from the same few digits (412, 421, 124, 142, 214) so that no card can be
 * placed on its length or its leading digit alone.
 *
 * Both directions appear, because "put them in order" without saying which way
 * round is the request a child most often mis-hears.
 */

function ComparingAndOrderingNumbersTo1000Challenge3({ onComplete }) {
  const questions = useMemo(() => buildCompareQuestions(3, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Put the numbers in order."
      render={({ question, submit, locked, index }) => (
        <OrderNumbers key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderNumbers({ question, submit, locked }) {
  const [items, setItems] = useState(question.items);

  const check = () =>
    submit(items.every((item, i) => Number(item.id) === question.answer[i]));

  return (
    <>
      <p className="challenge-prompt">
        Drag the cards so the <strong>{question.direction}</strong> number is
        first.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button type="button" className="submit-btn" disabled={locked} onClick={check}>
        Check my answer
      </button>
    </>
  );
}

export default ComparingAndOrderingNumbersTo1000Challenge3;
