import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { sumDistractors } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - a two-digit number and 10s.
 *
 * Adding or taking ten changes only the tens digit, which is why the
 * distractors include the answer ten out: a learner who adjusts the wrong
 * column lands on their own mistake rather than something obviously silly.
 */

const PLANS = [
  { start: 34, change: 10 },
  { start: 56, change: -10 },
  { start: 23, change: 20 },
  { start: 71, change: -20 },
  { start: 48, change: 30 },
  { start: 65, change: -30 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = plan.start + plan.change;
    return {
      ...plan,
      answer,
      options: shuffle([answer, ...sumDistractors(answer, 2)], rng),
    };
  });
}

function UsingTwoDigitNumbersChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Only the tens change."
      render={({ question, submit, locked, index }) => (
        <AddTens key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function AddTens({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">
        {question.start} {question.change < 0 ? "−" : "+"}{" "}
        {Math.abs(question.change)} = ?
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

export default UsingTwoDigitNumbersChallenge2;
