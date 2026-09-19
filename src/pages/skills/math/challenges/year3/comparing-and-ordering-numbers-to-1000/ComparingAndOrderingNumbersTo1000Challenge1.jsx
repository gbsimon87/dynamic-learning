import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../../components/challenge/DataTable";
import {
  PLACE_COLUMNS,
  SYMBOLS,
  buildCompareQuestions,
} from "../../../../../../data/challenges/comparingNumbers1000";

/**
 * Challenge 1 — the gentlest slot: the method is on screen.
 *
 * Three digits make comparing a procedure rather than a glance — check the
 * hundreds, and only look at the tens if the hundreds tie. The place value
 * table splits both numbers into their columns so that procedure can be
 * carried out by reading downwards, which is exactly how it is taught.
 *
 * The table is not highlighted: pointing at the deciding column would do the
 * comparison for the learner. It only makes the columns visible.
 */

function ComparingAndOrderingNumbersTo1000Challenge1({ onComplete }) {
  const questions = useMemo(() => buildCompareQuestions(1, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which symbol makes this true?"
      render={({ question, submit, locked, index }) => (
        <CompareWithTable key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CompareWithTable({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Start with the 100s. If they are the same, look at the 10s, then the 1s.
      </p>

      <p className="statement">
        <span>{question.left}</span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>{question.right}</span>
      </p>

      <DataTable
        caption="The two numbers, split into their columns"
        columns={PLACE_COLUMNS}
        rows={question.rows}
      />

      <ChoiceGrid
        options={SYMBOLS}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default ComparingAndOrderingNumbersTo1000Challenge1;
