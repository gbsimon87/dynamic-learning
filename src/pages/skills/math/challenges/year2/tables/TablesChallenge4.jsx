import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildTableProblems } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 4 - two-column word problems, typed.
 *
 * The most demanding slot in the topic: every question needs two or more
 * cells found and then combined. A "whole row"
 * question adds along a row, a "whole column" question adds down a column -
 * which are different journeys through the same table, and the reason a
 * table is worth teaching separately from a chart. A "how many more"
 * compares the two columns of one row. Two of each kind, new tables every
 * run (see buildTableProblems).
 */

function TablesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTableProblems(Math.random), []);

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
