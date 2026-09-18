import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - the division hiding inside a multiplication.
 *
 * Straight from the guidance: "4 × 5 = 20 and 20 ÷ 5 = 4". The learner is
 * given the multiplication and picks the division that comes with it. Wrong
 * options divide the wrong way round or by the wrong number.
 */

const FACTS = [
  { a: 4, b: 5 },
  { a: 3, b: 10 },
  { a: 7, b: 2 },
  { a: 6, b: 5 },
  { a: 9, b: 10 },
  { a: 8, b: 2 },
];

function buildQuestions(rng) {
  return shuffle(FACTS, rng).map(({ a, b }) => {
    const product = a * b;
    const answer = `${product} ÷ ${b} = ${a}`;
    return {
      a,
      b,
      product,
      answer,
      options: shuffle(
        [answer, `${b} ÷ ${product} = ${a}`, `${product} ÷ ${a} = ${b + 1}`],
        rng
      ),
    };
  });
}

function ConnectingMultiplicationAndDivisionChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Every multiplication has a division that undoes it."
      render={({ question, submit, locked, index }) => (
        <PickDivision key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickDivision({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.a} × {question.b} = {question.product}
      </p>

      <p className="challenge-prompt">Which division is also true?</p>

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

export default ConnectingMultiplicationAndDivisionChallenge1;
