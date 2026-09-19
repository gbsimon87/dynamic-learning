import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildProblemQuestions } from "../../../../../../data/challenges/numberAndPlaceValueProblems";

/**
 * Challenge 2 — the same puzzle with the digits no longer handed over.
 *
 * No table, and no clue names more than one digit outright: the rest come from
 * "double", "3 more than", "adds up to 6", "a multiple of 100". Every clue has
 * to be used, because each set was checked to have exactly ONE three-digit
 * solution — and only one of the four options survives all of them, so a
 * learner who stops after the first clue is choosing between numbers that all
 * still look possible.
 */

function NumberAndPlaceValueProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildProblemQuestions(2, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work out what number I am."
      render={({ question, submit, locked, index }) => (
        <SolveTheClues key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveTheClues({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">Use every clue.</p>

      <ul className="clue-list">
        {question.lines.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>

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

export default NumberAndPlaceValueProblemsChallenge2;
