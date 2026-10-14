import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildOrderDigitsQuestions } from "../../../../../../data/challenges/placeValue";

/**
 * Challenge 3 - order by place value.
 *
 * Every set here shares its digits (47, 74, 44, 77), so the order cannot be
 * found by glancing at the digits: the learner has to compare the tens column
 * first and only then the ones. The digit pairs are generated each time.
 */

function PlaceValueChallenge3({ onComplete }) {
  const questions = useMemo(() => buildOrderDigitsQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Smallest first. Check the tens before the ones."
      render={({ question, submit, locked, index }) => (
        <OrderBySize key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderBySize({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Put these numbers in order, smallest first.
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

export default PlaceValueChallenge3;
