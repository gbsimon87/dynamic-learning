import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { TABLES } from "../../../../../../data/challenges/multiplicationAndDivision";
import { buildTableRecall } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * NOTE ON THE NAME: the file must be 25And10MultiplicationTablesChallengeN.jsx
 * for the dynamic loader, but that is not a valid JavaScript identifier, so the
 * component is named differently and reached through the default export.
 *
 * Challenge 1 - recall the table facts.
 *
 * All three statutory tables, mixed, with distractors one row out so a
 * near-miss is a plausible answer rather than an obvious throwaway.
 */

function MultiplicationTablesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildTableRecall(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Use your 2, 5 and 10 times tables."
      render={({ question, submit, locked, index }) => (
        <TableFact key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TableFact({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.n} × {question.table} = ?
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

export default MultiplicationTablesChallenge1;
