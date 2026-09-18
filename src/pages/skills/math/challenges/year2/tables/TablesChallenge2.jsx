import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 2 - two columns, and nothing pointed at.
 *
 * A second column changes the skill: a row alone no longer identifies a
 * number, so the question has to be read for BOTH the row and the column and
 * the two followed until they meet. Nothing is highlighted, so finding the
 * cell is the work.
 *
 * Every option is another number from the same table, so the wrong answers
 * are the cells a learner lands on by following the wrong line — which is
 * the mistake worth catching.
 */

const SETS = [
  {
    caption: "Goals scored",
    columns: [
      { key: "home", label: "At home" },
      { key: "away", label: "Away" },
    ],
    rows: [
      { label: "Lions", home: 6, away: 3 },
      { label: "Tigers", home: 4, away: 8 },
      { label: "Bears", home: 9, away: 2 },
    ],
    ask: { row: "Tigers", column: "away" },
    story: "How many goals did the Tigers score away?",
  },
  {
    caption: "Books read",
    columns: [
      { key: "week1", label: "Week 1" },
      { key: "week2", label: "Week 2" },
    ],
    rows: [
      { label: "Ava", week1: 7, week2: 12 },
      { label: "Ben", week1: 5, week2: 9 },
      { label: "Cleo", week1: 14, week2: 6 },
    ],
    ask: { row: "Ava", column: "week2" },
    story: "How many books did Ava read in Week 2?",
  },
  {
    caption: "Fruit sold",
    columns: [
      { key: "morning", label: "Morning" },
      { key: "afternoon", label: "Afternoon" },
    ],
    rows: [
      { label: "Apples", morning: 15, afternoon: 8 },
      { label: "Pears", morning: 4, afternoon: 11 },
      { label: "Plums", morning: 9, afternoon: 6 },
    ],
    ask: { row: "Pears", column: "morning" },
    story: "How many pears were sold in the morning?",
  },
  {
    caption: "Trains counted",
    columns: [
      { key: "monday", label: "Monday" },
      { key: "friday", label: "Friday" },
    ],
    rows: [
      { label: "Platform 1", monday: 12, friday: 5 },
      { label: "Platform 2", monday: 7, friday: 16 },
      { label: "Platform 3", monday: 3, friday: 10 },
    ],
    ask: { row: "Platform 3", column: "friday" },
    story: "How many trains used Platform 3 on Friday?",
  },
  {
    caption: "Cakes baked",
    columns: [
      { key: "small", label: "Small" },
      { key: "big", label: "Big" },
    ],
    rows: [
      { label: "Monday", small: 10, big: 4 },
      { label: "Tuesday", small: 6, big: 13 },
      { label: "Wednesday", small: 18, big: 7 },
    ],
    ask: { row: "Wednesday", column: "small" },
    story: "How many small cakes were baked on Wednesday?",
  },
  {
    caption: "Stickers earned",
    columns: [
      { key: "maths", label: "Maths" },
      { key: "reading", label: "Reading" },
    ],
    rows: [
      { label: "Dev", maths: 8, reading: 14 },
      { label: "Ella", maths: 11, reading: 5 },
      { label: "Finn", maths: 3, reading: 9 },
    ],
    ask: { row: "Ella", column: "maths" },
    story: "How many maths stickers did Ella earn?",
  },
];

function buildQuestions(rng) {
  return shuffle(SETS, rng).map((set) => {
    const answer = set.rows.find((row) => row.label === set.ask.row)[set.ask.column];
    // Every cell in the asked row and the asked column: the numbers a learner
    // reaches by following one line correctly and the other one wrongly.
    const nearby = [
      ...set.columns.map((column) => set.rows.find((r) => r.label === set.ask.row)[column.key]),
      ...set.rows.map((row) => row[set.ask.column]),
    ];
    const options = [...new Set(nearby)].slice(0, 4);
    return { ...set, answer, options: shuffle(options, rng) };
  });
}

function TablesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Follow the row and the column until they meet."
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
        columns={question.columns}
        rows={question.rows.map((row) => ({
          label: row.label,
          cells: Object.fromEntries(question.columns.map((c) => [c.key, row[c.key]])),
        }))}
      />

      <p className="challenge-prompt">{question.story}</p>

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

export default TablesChallenge2;
