import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ArrayGrid from "../../../../../../components/challenge/ArrayGrid";
import { fractionOf, fractionOfDistractors } from "../../../../../../data/challenges/fractions";
import { arrayRows } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - a fraction of a small amount, with the objects drawn.
 *
 * The guidance connects unit fractions to equal sharing, so the dots are laid
 * out in as many rows as the denominator: taking one row IS taking the
 * fraction. The statutory example, 1/2 of 6 = 3, is one of these.
 */

const PLANS = [
  { fraction: { numerator: 1, denominator: 2 }, total: 6 },
  { fraction: { numerator: 1, denominator: 2 }, total: 10 },
  { fraction: { numerator: 1, denominator: 3 }, total: 9 },
  { fraction: { numerator: 1, denominator: 4 }, total: 8 },
  { fraction: { numerator: 1, denominator: 3 }, total: 12 },
  { fraction: { numerator: 1, denominator: 4 }, total: 12 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = fractionOf(plan.fraction, plan.total);
    return {
      ...plan,
      answer,
      grid: arrayRows(plan.fraction.denominator, answer),
      options: shuffle(
        [answer, ...fractionOfDistractors(plan.fraction, plan.total, 2)],
        rng
      ),
    };
  });
}

function FractionsOfNumbersChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Share them into equal rows, then take the fraction."
      render={({ question, submit, locked, index }) => (
        <FractionOfSet key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FractionOfSet({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const { numerator, denominator } = question.fraction;

  return (
    <>
      <p className="sequence-strip">
        {numerator}/{denominator} of {question.total}
      </p>

      <ArrayGrid
        rows={question.grid}
        label={`${question.total} dots in ${denominator} equal rows`}
      />

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

export default FractionsOfNumbersChallenge1;
