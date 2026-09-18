import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { fractionOf, fractionOfDistractors } from "../../../../../../data/challenges/fractions";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - non-unit fractions of large sets.
 *
 * 3/4 and 2/4 of numbers up to 100. Two moves every time, and the distractors
 * include the answer for the matching unit fraction, so dividing and
 * forgetting to multiply lands on an offered wrong answer.
 */

const PLANS = [
  { fraction: { numerator: 3, denominator: 4 }, total: 40 },
  { fraction: { numerator: 2, denominator: 4 }, total: 60 },
  { fraction: { numerator: 3, denominator: 4 }, total: 80 },
  { fraction: { numerator: 2, denominator: 4 }, total: 36 },
  { fraction: { numerator: 3, denominator: 4 }, total: 100 },
  { fraction: { numerator: 2, denominator: 4 }, total: 48 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = fractionOf(plan.fraction, plan.total);
    return {
      ...plan,
      answer,
      options: shuffle(
        [answer, ...fractionOfDistractors(plan.fraction, plan.total, 2)],
        rng
      ),
    };
  });
}

function FindingFractionsOfLargerGroupsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Divide by the bottom, then take the top."
      render={({ question, submit, locked, index }) => (
        <NonUnitFraction key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NonUnitFraction({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const { numerator, denominator } = question.fraction;

  return (
    <>
      <p className="sequence-strip">
        {numerator}/{denominator} of {question.total} = ?
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

export default FindingFractionsOfLargerGroupsChallenge2;
