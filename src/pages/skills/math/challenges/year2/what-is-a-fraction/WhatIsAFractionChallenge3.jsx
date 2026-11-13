import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildFractionOrdering } from "../../../../../../data/challenges/fractions";

/**
 * Challenge 3 - order fractions by size.
 *
 * The trap this teaches: a bigger bottom number means SMALLER pieces, so 1/4
 * is less than 1/3 even though 4 is more than 3. Every set mixes denominators
 * so it cannot be ordered by reading one number.
 *
 * 2/4 and 1/2 never appear together — they are equal, so their order would be
 * ambiguous and a correct arrangement could be marked wrong.
 */

function WhatIsAFractionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildFractionOrdering(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A bigger bottom number means smaller pieces."
      render={({ question, submit, locked, index }) => (
        <OrderFractions key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function OrderFractions({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);

  return (
    <>
      <p className="challenge-prompt">
        Drag them so the smallest fraction is first.
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

export default WhatIsAFractionChallenge3;
