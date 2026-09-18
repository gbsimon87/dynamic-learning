import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { half, sumDistractors } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - halving, with nothing drawn.
 *
 * Halving is the inverse of doubling, so the learner can reach it from the
 * double they already know. Only even numbers appear: Year 2 halves whole
 * amounts.
 */

const NUMBERS = [8, 14, 6, 18, 12, 20, 10, 16];

function buildQuestions(rng) {
  return shuffle(NUMBERS, rng)
    .slice(0, 6)
    .map((n) => {
      const answer = half(n);
      return {
        n,
        answer,
        options: shuffle([answer, ...sumDistractors(answer, 2)], rng),
      };
    });
}

function DoublingAndHalvingUsingAdditionAndSubtractionChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Half means split equally into two."
      render={({ question, submit, locked, index }) => (
        <Half key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Half({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">half of {question.n}</p>

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

export default DoublingAndHalvingUsingAdditionAndSubtractionChallenge2;
