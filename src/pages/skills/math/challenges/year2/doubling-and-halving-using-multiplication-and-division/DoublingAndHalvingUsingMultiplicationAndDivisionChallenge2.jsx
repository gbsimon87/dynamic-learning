import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { divide, productDistractors } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - halving is dividing by 2, and it names a fraction.
 *
 * Straight from the guidance: "40 ÷ 2 = 20, 20 is a half of 40". Saying both
 * out loud is the connection between division and fractions that Year 2 is
 * meant to begin making.
 */

const NUMBERS = [24, 30, 40, 50, 60, 70, 80, 90];

function buildQuestions(rng) {
  return shuffle(NUMBERS, rng)
    .slice(0, 6)
    .map((n) => {
      const answer = divide(n, 2);
      return {
        n,
        answer,
        options: shuffle([answer, ...productDistractors(answer, 2, 2)], rng),
      };
    });
}

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Halving is dividing by 2."
      render={({ question, submit, locked, index }) => (
        <HalveIt key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function HalveIt({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.n} ÷ 2 = ?</p>

      <p className="challenge-prompt">
        Your answer is also <strong>half of {question.n}</strong>.
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

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge2;
