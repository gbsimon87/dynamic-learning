import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import {
  buildSequence,
  buildDistractors,
  shuffle,
} from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - the step is no longer given.
 *
 * The learner sees four terms and must work out the jump before choosing what
 * comes next. Two questions count backwards, which is where the pattern is
 * easiest to lose.
 */

const SHOWN = 4;

const PLANS = [
  { step: 2, start: 4 },
  { step: 5, start: 15 },
  { step: 10, start: 30 },
  { step: 3, start: 6 },
  { step: -2, start: 20 },
  { step: -10, start: 100 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const terms = buildSequence(plan.start, plan.step, SHOWN);
    const answer = plan.start + plan.step * SHOWN;
    // Distractors key off the size of the jump, not its direction.
    const options = shuffle(
      [answer, ...buildDistractors(answer, Math.abs(plan.step), 2)],
      rng
    );
    return { ...plan, terms, answer, options };
  });
}

function CountingInStepsOf235And10Challenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What number comes next?"
      render={({ question, submit, locked, index }) => (
        <NextInSequence
          key={index}
          question={question}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function NextInSequence({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.terms.join(", ")}, …</p>

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

export default CountingInStepsOf235And10Challenge2;
