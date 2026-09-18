import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { fractionOf, fractionOfDistractors } from "../../../../../../data/challenges/fractions";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - fractions of a set too big to draw.
 *
 * The previous topic worked with amounts small enough to lay out as dots. Here
 * the set is large enough that counting is not an option, so the learner has
 * to divide. Every total divides exactly.
 */

const PLANS = [
  { fraction: { numerator: 1, denominator: 2 }, total: 40, noun: "stickers" },
  { fraction: { numerator: 1, denominator: 4 }, total: 32, noun: "marbles" },
  { fraction: { numerator: 1, denominator: 3 }, total: 30, noun: "beads" },
  { fraction: { numerator: 1, denominator: 2 }, total: 56, noun: "cards" },
  { fraction: { numerator: 1, denominator: 4 }, total: 60, noun: "buttons" },
  { fraction: { numerator: 1, denominator: 3 }, total: 45, noun: "shells" },
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

function FindingFractionsOfLargerGroupsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Too many to count — divide instead."
      render={({ question, submit, locked, index }) => (
        <FractionOfGroup key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FractionOfGroup({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const { numerator, denominator } = question.fraction;

  return (
    <>
      <p className="challenge-prompt">
        There are {question.total} {question.noun}. How many is {numerator}/
        {denominator} of them?
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

export default FindingFractionsOfLargerGroupsChallenge1;
