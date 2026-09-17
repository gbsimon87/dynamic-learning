import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import {
  applyChange,
  moreLessDistractors,
} from "../../../../../../data/challenges/countingMoreAndLess";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - the jump is no longer named.
 *
 * A rule machine shows two worked pairs and leaves the third open, so the
 * learner has to spot the rule before applying it. This is where 10-more and
 * 10-less arrive, because spotting them means reading the tens column.
 */

const PLANS = [
  { change: 10, ins: [23, 41, 16] },
  { change: -10, ins: [56, 88, 34] },
  { change: 1, ins: [39, 68, 45] },
  { change: -1, ins: [70, 51, 26] },
  { change: 5, ins: [12, 30, 44] },
  { change: -5, ins: [48, 65, 27] },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const [a, b, c] = plan.ins;
    const answer = applyChange(c, plan.change);
    return {
      pairs: [
        { in: a, out: applyChange(a, plan.change) },
        { in: b, out: applyChange(b, plan.change) },
      ],
      unknownIn: c,
      answer,
      options: shuffle([answer, ...moreLessDistractors(c, plan.change, 2)], rng),
    };
  });
}

function CountingMoreAndLessChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work out the rule, then finish the last one."
      render={({ question, submit, locked, index }) => (
        <RuleMachine key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function RuleMachine({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div className="machine">
        {question.pairs.map((pair) => (
          <FragmentRow key={pair.in} left={pair.in} right={pair.out} />
        ))}
        <FragmentRow left={question.unknownIn} right="?" unknown />
      </div>

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

function FragmentRow({ left, right, unknown }) {
  return (
    <>
      <span>{left}</span>
      <span className="machine-arrow" aria-label="becomes">
        →
      </span>
      <span className={`machine-out ${unknown ? "unknown" : ""}`}>{right}</span>
    </>
  );
}

export default CountingMoreAndLessChallenge2;
