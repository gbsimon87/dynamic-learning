import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { shuffle } from "../../../../../../data/challenges/statistics";

/**
 * Challenge 4 - two-column word problems, typed.
 *
 * The most demanding slot in the topic: every question needs two cells found
 * and then combined, and the two cells are never side by side. A "whole row"
 * question adds along a row, a "whole column" question adds down a column -
 * which are different journeys through the same table, and the reason a
 * table is worth teaching separately from a chart.
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
    kind: "row-total",
    row: "Tigers",
    story: "How many goals did the Tigers score altogether?",
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
    kind: "column-total",
    column: "week1",
    story: "How many books were read in Week 1 altogether?",
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
    kind: "cell-difference",
    pair: [
      { row: "Apples", column: "morning" },
      { row: "Apples", column: "afternoon" },
    ],
    story: "How many more apples were sold in the morning than in the afternoon?",
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
    kind: "row-total",
    row: "Tuesday",
    story: "How many cakes were baked on Tuesday altogether?",
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
    kind: "column-total",
    column: "friday",
    story: "How many trains were counted on Friday altogether?",
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
    kind: "cell-difference",
    pair: [
      { row: "Ella", column: "maths" },
      { row: "Finn", column: "maths" },
    ],
    story: "How many more maths stickers did Ella earn than Finn?",
  },
];

function cellOf(set, row, column) {
  return set.rows.find((r) => r.label === row)[column];
}

function answerFor(set) {
  if (set.kind === "row-total") {
    return set.columns.reduce((sum, column) => sum + cellOf(set, set.row, column.key), 0);
  }
  if (set.kind === "column-total") {
    return set.rows.reduce((sum, row) => sum + row[set.column], 0);
  }
  const [a, b] = set.pair;
  return Math.abs(cellOf(set, a.row, a.column) - cellOf(set, b.row, b.column));
}

function TablesChallenge4({ onComplete }) {
  const questions = useMemo(
    () => shuffle(SETS, Math.random).map((set) => ({ ...set, answer: answerFor(set) })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use the table. Type your answer."
      render={({ question, submit, locked, index }) => (
        <SolveProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveProblem({ question, submit, locked }) {
  const [typed, setTyped] = useState("");

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

      <NumberInput value={typed} onChange={setTyped} disabled={locked} label="My answer" />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || typed === ""}
        onClick={() => submit(Number(typed) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default TablesChallenge4;
