import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { fractionOf, fractionOfDistractors } from "../../../../../../data/challenges/fractions";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - the same idea with nothing drawn, and 3/4 arrives.
 *
 * 3/4 is the first non-unit fraction a Year 2 learner meets, and it needs two
 * moves: divide by 4, then take three of them. Distractors are other
 * fractions of the same amount, so taking 1/4 and stopping lands on an
 * offered answer.
 */

const PLANS = [
  { fraction: { numerator: 1, denominator: 2 }, total: 16 },
  { fraction: { numerator: 3, denominator: 4 }, total: 12 },
  { fraction: { numerator: 1, denominator: 4 }, total: 20 },
  { fraction: { numerator: 2, denominator: 4 }, total: 24 },
  { fraction: { numerator: 3, denominator: 4 }, total: 20 },
  { fraction: { numerator: 1, denominator: 3 }, total: 18 },
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

function FractionsOfNumbersChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Divide by the bottom, then take the top."
      render={({ question, submit, locked, index }) => (
        <FractionOfNumber key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FractionOfNumber({ question, submit, locked }) {
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

export default FractionsOfNumbersChallenge2;
