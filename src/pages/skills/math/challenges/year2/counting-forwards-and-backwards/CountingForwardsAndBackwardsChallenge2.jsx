import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { countOn, countingDistractors } from "../../../../../../data/challenges/countingForwardsAndBackwards";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - the same counting, backwards and without a line.
 *
 * Backwards over a boundary (71, 70, 69) is harder than forwards, and there is
 * nothing on screen to count along, so the sequence has to be held in the head.
 */

const PLANS = [
  { start: 72, by: -4 },
  { start: 31, by: -3 },
  { start: 64, by: -6 },
  { start: 20, by: -4 },
  { start: 93, by: -5 },
  { start: 41, by: -3 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = countOn(plan.start, plan.by);
    return {
      ...plan,
      answer,
      options: shuffle([answer, ...countingDistractors(answer, 2)], rng),
    };
  });
}

function CountingForwardsAndBackwardsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
