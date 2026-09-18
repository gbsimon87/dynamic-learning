import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 1 - find a row in a one-column table.
 *
 * The gentlest slot, and a genuinely different skill from the charts: there
 * is no picture to count, so the answer has to be FOUND rather than worked
 * out. The row being asked about is highlighted, so all the question wants is
 * "look along the row".
 *
 * The options are the other numbers in the table. That matters: a number
 * from nowhere could be eliminated without reading the table at all.
 */

const SETS = [
  {
    caption: "Pets in our class",
    column: "How many",
    rows: [
      { label: "Cats", value: 6 },
      { label: "Dogs", value: 9 },
      { label: "Fish", value: 4 },
      { label: "Birds", value: 2 },
    ],
    ask: "Fish",
  },
  {
    caption: "Cars we spotted",
    column: "How many",
    rows: [
      { label: "Red", value: 12 },
      { label: "Blue", value: 7 },
      { label: "Green", value: 5 },
      { label: "Gold", value: 3 },
    ],
    ask: "Blue",
  },
  {
    caption: "Books read",
    column: "Books",
    rows: [
      { label: "Monday", value: 8 },
      { label: "Tuesday", value: 11 },
      { label: "Wednesday", value: 6 },
      { label: "Thursday", value: 14 },
    ],
    ask: "Thursday",
  },
  {
    caption: "Fruit eaten",
    column: "How many",
    rows: [
      { label: "Apples", value: 15 },
      { label: "Pears", value: 9 },
      { label: "Plums", value: 4 },
      { label: "Grapes", value: 20 },
    ],
    ask: "Pears",
  },
  {
    caption: "Stickers earned",
    column: "Stickers",
    rows: [
      { label: "Ava", value: 13 },
      { label: "Ben", value: 8 },
      { label: "Cleo", value: 17 },
      { label: "Dev", value: 5 },
    ],
    ask: "Cleo",
  },
  {
    caption: "Weather this month",
    column: "Days",
    rows: [
      { label: "Sunny", value: 10 },
      { label: "Rainy", value: 14 },
      { label: "Cloudy", value: 5 },
      { label: "Snowy", value: 2 },
    ],
    ask: "Rainy",
  },
];

function TablesChallenge1({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(SETS, Math.random).map((set) => {
        const answer = set.rows.find((row) => row.label === set.ask).value;
        return {
          ...set,
          answer,
          options: shuffle(
            set.rows.map((row) => row.value),
            Math.random
          ),
        };
      }),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the row, then read along it."
      render={({ question, submit, locked, index }) => (
        <ReadCell key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadCell({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <DataTable
        caption={question.caption}
        columns={[{ key: "value", label: question.column }]}
        rows={question.rows.map((row) => ({ label: row.label, cells: { value: row.value } }))}
        highlight={{ row: question.ask }}
      />

      <p className="challenge-prompt">
        How many for <strong>{question.ask}</strong>?
      </p>

      <ChoiceGrid
        options={question.options}
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

export default TablesChallenge1;
