import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildDivisionStatementChoice } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 1 - which division answers the story?
 *
 * Before calculating, the learner picks the statement. The wrong options
 * reverse the division or multiply instead, so the story has to be turned into
 * a statement rather than pattern-matched.
 */

function DivisionProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildDivisionStatementChoice(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which calculation answers this?"
      render={({ question, submit, locked, index }) => (
        <PickStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickStatement({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
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

export default DivisionProblemsChallenge1;
