import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import DataTable from "../../../../../../components/challenge/DataTable";
import { PLACE_COLUMNS } from "../../../../../../data/challenges/comparingNumbers1000";
import { buildProblemQuestions } from "../../../../../../data/challenges/numberAndPlaceValueProblems";

/**
 * Challenge 1 — the gentlest slot: every digit is stated, and the table puts
 * each one in its column.
 *
 * All that is left is writing the number down, which sounds like nothing until
 * a column is empty. "4 hundreds, 0 tens, 7 ones" becomes 47 remarkably often,
 * so that misread is one of the four buttons — a learner who makes it lands on
 * a real option rather than being nudged away from it by elimination.
 */

function NumberAndPlaceValueProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildProblemQuestions(1, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What number am I?"
      render={({ question, submit, locked, index }) => (
        <ReadTheClues key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadTheClues({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  // Built from the same clues the sentences come from, so the table can never
  // show a different number from the one being described.
  const cells = Object.fromEntries(
    question.clues.map((clue) => [clue.place, clue.value])
  );

  return (
    <>
      <p className="challenge-prompt">
        {question.lines.join(" ")} What number am I?
      </p>

      <DataTable
        caption="The digits, in their columns"
        columns={PLACE_COLUMNS}
        rows={[{ label: "My digits", cells }]}
      />

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

export default NumberAndPlaceValueProblemsChallenge1;
