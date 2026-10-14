import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import DataTable from "../../../../../../components/challenge/DataTable";
import { buildBlockConstruct } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 3 - construct the block diagram from a table.
 *
 * The construct half of "interpret and construct". The numbers come from a
 * table, so this is the same data moving between two representations, which
 * is the connection the topic actually wants made.
 *
 * Tapping a slot sets the whole column to that height — building a column of
 * 9 by tapping +1 nine times is a test of patience, not of statistics.
 *
 * Whole-structure: every column has to be right at once. New numbers every
 * run (see buildBlockConstruct).
 */

function BlockDiagramsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildBlockConstruct(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Build the block diagram to match the table."
      render={({ question, submit, locked, index }) => (
        <BuildDiagram key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuildDiagram({ question, submit, locked }) {
  const [values, setValues] = useState(() =>
    Object.fromEntries(question.targets.map((row) => [row.label, 0]))
  );

  const rows = question.targets.map((row) => ({
    label: row.label,
    value: values[row.label],
  }));

  const isCorrect = question.targets.every(
    (target) => values[target.label] === target.value
  );

  return (
    <>
      <DataTable
        caption={question.caption}
        columns={[{ key: "value", label: "How many" }]}
        rows={question.targets.map((row) => ({
          label: row.label,
          cells: { value: row.value },
        }))}
      />

      <p className="challenge-prompt">Tap a block to set how tall each column is.</p>

      <BlockDiagram
        rows={rows}
        max={question.max}
        disabled={locked}
        onSetValue={(label, next) => setValues((prev) => ({ ...prev, [label]: next }))}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(isCorrect)}
      >
        Check my block diagram
      </button>
    </>
  );
}

export default BlockDiagramsChallenge3;
