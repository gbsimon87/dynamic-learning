import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildOneStepQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 1 - one-step problems in words.
 *
 * Statutory: "solve problems with addition and subtraction ... involving
 * numbers, quantities and measures". The sums are small so the work is reading
 * the story and choosing the operation, not the arithmetic. Stories and numbers
 * are drawn fresh each time; a measure shows its unit on every option, and the
 * tempting wrong option is the answer to the other operation.
 */

function SolvingNumberProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildOneStepQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the problem, then choose the answer."
      render={({ question, submit, locked, index }) => (
        <WordProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WordProblem({ question, submit, locked }) {
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

export default SolvingNumberProblemsChallenge1;
