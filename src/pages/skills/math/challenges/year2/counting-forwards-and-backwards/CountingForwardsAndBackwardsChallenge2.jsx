import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildCountBackQuestions } from "../../../../../../data/challenges/countingForwardsAndBackwards";

/**
 * Challenge 2 - the same counting, backwards and without a line.
 *
 * Backwards over a boundary (71, 70, 69) is harder than forwards, and there is
 * nothing on screen to count along, so the sequence has to be held in the head.
 * Starts and counts are generated each time.
 */

function CountingForwardsAndBackwardsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildCountBackQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count back in your head."
      render={({ question, submit, locked, index }) => (
        <CountBack key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountBack({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.start} − {Math.abs(question.by)} = ?
      </p>

      <p className="challenge-prompt">
        Start at {question.start} and count back {Math.abs(question.by)}.
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

export default CountingForwardsAndBackwardsChallenge2;
