import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildArrayStories } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 2 - now choose the operation AND do it, with arrays.
 *
 * Rows of chairs, seeds and tiles: three stories join equal rows (×) and
 * three split a total into rows (÷), generated per run. Options are a row out
 * or a slip of one or two, so picking the wrong operation or miscounting
 * lands on a plausible number.
 */

function SolvingMultiplicationAndDivisionProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildArrayStories(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Rows of things: multiply or divide?"
      render={({ question, submit, locked, index }) => (
        <SolveIt key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveIt({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge2;
