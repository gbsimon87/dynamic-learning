import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { countOn, countingDistractors } from "../../../../../../data/challenges/countingForwardsAndBackwards";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - count on along a visible line.
 *
 * Every question steps over a tens boundary, because "sixty-nine, seventy" is
 * the moment a count breaks down. The line is on screen so the learner can
 * count the jumps rather than hold them.
 */

const PLANS = [
  { start: 68, by: 4 },
  { start: 27, by: 5 },
  { start: 49, by: 3 },
  { start: 86, by: 5 },
  { start: 18, by: 4 },
  { start: 55, by: 6 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const answer = countOn(plan.start, plan.by);
    // Show the run the learner counts along, starting two before.
    const terms = Array.from({ length: plan.by + 3 }, (_, i) => plan.start - 2 + i);
    return {
      ...plan,
      answer,
      terms,
      highlight: 2,
      options: shuffle([answer, ...countingDistractors(answer, 2)], rng),
    };
  });
}

function CountingForwardsAndBackwardsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count on along the line."
      render={({ question, submit, locked, index }) => (
        <CountAlong key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountAlong({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Start at {question.start} and count on {question.by}. Where do you land?
      </p>

      <NumberLine
        terms={question.terms}
        gaps={[]}
        values={{}}
        active={null}
        highlight={question.highlight}
        onFocusGap={() => {}}
        disabled={locked}
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

export default CountingForwardsAndBackwardsChallenge1;
