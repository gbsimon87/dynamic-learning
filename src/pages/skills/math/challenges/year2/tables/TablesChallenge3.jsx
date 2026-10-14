import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import TallyChart from "../../../../../../components/challenge/TallyChart";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildTableFromTally } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 3 - complete the table from the tally chart.
 *
 * The construct half, done as the same data in two places at once: the tally
 * chart holds all of it, the table is missing one row, and filling the gap
 * means counting marks and writing a number. Moving between two
 * representations is the whole-structure work this slot is for, and it is
 * what "interpret and construct simple tally charts AND tables" asks for.
 *
 * The missing row is never the first, so the table has to be read down to
 * find the gap rather than answered from the top. New data every run (see
 * buildTableFromTally).
 */

function TablesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildTableFromTally(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="The table is missing a number. Use the tally chart to fill it in."
      render={({ question, submit, locked, index }) => (
        <FillTable key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillTable({ question, submit, locked }) {
  const [typed, setTyped] = useState("");

  return (
    <>
      <TallyChart rows={question.rows} highlight={question.missing} />

      <DataTable
        caption={question.caption}
        columns={[{ key: "value", label: question.column }]}
        rows={question.rows.map((row) => ({ label: row.label, cells: { value: row.value } }))}
        blank={{ row: question.missing, column: "value" }}
        // The typed number appears in the gap as it is keyed, so the table is
        // visibly being completed rather than a box being filled beside it.
        blankValue={typed === "" ? "?" : typed}
      />

      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput value={typed} onChange={setTyped} disabled={locked} hideField />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || typed === ""}
        onClick={() => submit(Number(typed) === question.answer)}
      >
        Check my table
      </button>
    </>
  );
}

export default TablesChallenge3;
