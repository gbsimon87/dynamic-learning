import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildMixedUnitOrderQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 3 - order measurements, smallest first.
 *
 * Every set mixes units, so they cannot be ordered by the number alone: 950 ml
 * is less than 1 litre even though 950 is the bigger number. Values are
 * converted to a common unit for checking, and no set contains two equal
 * measures. Sets are generated each attempt: two of length, two of mass
 * and two of capacity.
 */

function ComparingMeasurementsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildMixedUnitOrderQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A bigger number is not always a bigger measure."
      render={({ question, submit, locked, index }) => (
        <OrderMeasures key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderMeasures({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the smallest measure is first.
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

export default ComparingMeasurementsChallenge3;
