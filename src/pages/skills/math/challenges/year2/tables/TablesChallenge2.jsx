import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import DataTable from "../../../../../../components/challenge/DataTable";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildTableCell } from "../../../../../../data/challenges/statisticsQuestions";

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
 * the mistake worth catching. Every value in a table differs, and the
 * tables and the asked cell are new every run (see buildTableCell).
 */

function TablesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildTableCell(Math.random), []);

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
