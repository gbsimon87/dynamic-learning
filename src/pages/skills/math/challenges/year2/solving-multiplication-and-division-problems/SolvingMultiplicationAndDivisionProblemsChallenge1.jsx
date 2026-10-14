import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildOperationChoice } from "../../../../../../data/challenges/multiplicationAndDivision";

/**
 * Challenge 1 - multiply or divide?
 *
 * The whole difficulty of this topic is choosing the operation, so challenge 1
 * asks only that: pick the calculation, not the answer. Every option uses
 * exactly the two numbers in the story, so the story must decide it.
 */

function SolvingMultiplicationAndDivisionProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildOperationChoice(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Equal groups joined up, or shared out?"
      render={({ question, submit, locked, index }) => (
        <PickOperation key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickOperation({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge1;
