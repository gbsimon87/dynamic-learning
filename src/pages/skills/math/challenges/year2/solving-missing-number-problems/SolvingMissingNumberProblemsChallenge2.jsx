import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildPickInverseQuestions } from "../../../../../../data/challenges/additionAndSubtraction";

/**
 * Challenge 2 - which calculation finds the missing number?
 *
 * Statutory: "recognise and use the inverse relationship between addition and
 * subtraction". The learner picks the calculation rather than performing it,
 * so this tests the relationship itself. Only two calculations can be made
 * from the two numbers shown - add them, or take the smaller from the larger -
 * so those are the options, always in that order. The wrong one is the
 * wrong-inverse mistake: adding for "a + ? = t", or "add it back" for
 * "a − ? = t", where the box is what was taken away (see inverseOptions).
 */

function SolvingMissingNumberProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildPickInverseQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which calculation would find the missing number?"
      render={({ question, submit, locked, index }) => (
        <PickInverse key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickInverse({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.statement}</p>

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

export default SolvingMissingNumberProblemsChallenge2;
