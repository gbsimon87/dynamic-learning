import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DragToOrder from "../../../../../../components/challenge/DragToOrder";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { buildArrayStatements, isTrueMultiplication } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 3 - write the statement the array shows.
 *
 * Three cards make "? × ? = ?". Because multiplication can be done in any
 * order, both 3 × 5 = 15 and 5 × 3 = 15 are accepted — the array is the same
 * grid read two ways, which is the point. Arrays are generated and countable.
 */

function WhatIsMultiplicationChallenge3({ onComplete }) {
  const questions = useMemo(() => buildArrayStatements(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Build the multiplication this array shows."
      render={({ question, submit, locked, index }) => (
        <BuildStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildStatement({ question, submit, locked }) {
  const [items, setItems] = useState(question.cards);
  const values = items.map((item) => item.value);

  return (
    <>
      <ArrayGrid
        rows={question.grid}
        label={`${question.rows} rows of ${question.columns} dots`}
      />

      <p className="statement">
        <span>{values[0]}</span>
        <span>×</span>
        <span>{values[1]}</span>
        <span>=</span>
        <span>{values[2]}</span>
      </p>

      <DragToOrder items={items} onReorder={setItems} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isTrueMultiplication(values))}
      >
        Check my answer
      </button>
    </>
  );
}

export default WhatIsMultiplicationChallenge3;
