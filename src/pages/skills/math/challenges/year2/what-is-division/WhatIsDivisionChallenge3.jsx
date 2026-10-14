import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import { buildDivisionFamilies, isTrueDivision } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - build a true division.
 *
 * Unlike multiplication, order matters: 20 ÷ 5 = 4 is true but 5 ÷ 20 = 4 is
 * not. Both true arrangements are accepted (20 ÷ 5 = 4 and 20 ÷ 4 = 5). The
 * prompt does not say which number leads — working that out is the task.
 */

function WhatIsDivisionChallenge3({ onComplete }) {
  const questions = useMemo(() => buildDivisionFamilies(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Make a division that is true."
      render={({ question, submit, locked, index }) => (
        <BuildDivision key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildDivision({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const values = items.map((item) => item.value);

  return (
    <>
      <p className="challenge-prompt">
        Move the cards to make the division true.
      </p>

      <p className="statement">
        <span>{values[0]}</span>
        <span>÷</span>
        <span>{values[1]}</span>
        <span>=</span>
        <span>{values[2]}</span>
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isTrueDivision(values))}
      >
        Check my answer
      </button>
    </>
  );
}

export default WhatIsDivisionChallenge3;
