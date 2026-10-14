import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildTableRead } from "../../../../../../data/challenges/statisticsQuestions";

/**
 * Challenge 1 - find a row in a one-column table.
 *
 * The gentlest slot, and a genuinely different skill from the charts: there
 * is no picture to count, so the answer has to be FOUND rather than worked
 * out. The row being asked about is highlighted, so all the question wants is
 * "look along the row".
 *
 * The options are the other numbers in the table. That matters: a number
 * from nowhere could be eliminated without reading the table at all. New
 * tables every run (see buildTableRead).
 */

function TablesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildTableRead(Math.random), []);

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

      <p className="challenge-prompt">{question.prompt}</p>

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
