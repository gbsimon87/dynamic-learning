import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildFactFamilySort } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - the whole fact family from one set of numbers.
 *
 * Four statements use the same three numbers; two are true and two are
 * near-miss mistakes (dividing the wrong way round, one out, a group out).
 * The learner drags the two true ones to the front, in either order.
 */

function ConnectingMultiplicationAndDivisionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildFactFamilySort(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Two of these are true. Drag them to the front."
      render={({ question, submit, locked, index }) => (
        <SortFamily key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SortFamily({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        These all use {question.numbers.join(", ")}. Only two of them are true.
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() =>
          submit(
            question.truthy.includes(items[0].id) &&
              question.truthy.includes(items[1].id)
          )
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default ConnectingMultiplicationAndDivisionChallenge3;
