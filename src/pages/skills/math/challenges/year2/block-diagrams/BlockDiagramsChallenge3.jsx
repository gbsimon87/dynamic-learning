import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import BlockDiagram from "../../../../../../components/challenge/BlockDiagram";
import DataTable from "../../../../../../components/challenge/DataTable";
import { shuffle } from "../../../../../../data/challenges/statistics";

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
 * Whole-structure: every column has to be right at once.
 */

const SETS = [
  {
    caption: "Pets in our class",
    max: 10,
    targets: [
      { label: "Cats", value: 6 },
      { label: "Dogs", value: 9 },
      { label: "Fish", value: 3 },
    ],
  },
  {
    caption: "Cars we spotted",
    max: 10,
    targets: [
      { label: "Red", value: 4 },
      { label: "Blue", value: 8 },
      { label: "Green", value: 2 },
    ],
  },
  {
    caption: "Books read",
    max: 12,
    targets: [
      { label: "Mon", value: 5 },
      { label: "Tue", value: 11 },
      { label: "Wed", value: 7 },
    ],
  },
  {
    caption: "Fruit eaten",
    max: 10,
    targets: [
      { label: "Apples", value: 7 },
      { label: "Pears", value: 3 },
      { label: "Plums", value: 10 },
    ],
  },
  {
    caption: "Stickers earned",
    max: 12,
    targets: [
      { label: "Ava", value: 9 },
      { label: "Ben", value: 4 },
      { label: "Cleo", value: 12 },
    ],
  },
  {
    caption: "Weather this month",
    max: 12,
    targets: [
      { label: "Sun", value: 8 },
      { label: "Rain", value: 12 },
      { label: "Cloud", value: 5 },
    ],
  },
];

function BlockDiagramsChallenge3({ onComplete }) {
  const questions = useMemo(() => shuffle(SETS, Math.random), []);

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
