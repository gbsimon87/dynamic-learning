import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { missingAddend, sumDistractors } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - a missing number in a small addition.
 *
 * Totals stay within 20, where the learner is expected to be fluent, so the
 * work is understanding what the empty box means rather than the arithmetic.
 */

const PLANS = [
  { known: 6, total: 10 },
  { known: 8, total: 15 },
  { known: 12, total: 20 },
  { known: 4, total: 11 },
  { known: 9, total: 17 },
  { known: 7, total: 13 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = missingAddend(plan.known, plan.total);
    return {
      ...plan,
      answer,
      options: shuffle([answer, ...sumDistractors(answer, 2)], rng),
    };
  });
}

function SolvingMissingNumberProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What belongs in the box?"
      render={({ question, submit, locked, index }) => (
        <MissingBox key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MissingBox({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="statement">
        <span>{question.known}</span>
        <span>+</span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>=</span>
        <span>{question.total}</span>
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

export default SolvingMissingNumberProblemsChallenge1;
