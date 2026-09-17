import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { isTrueStatement } from "../../../../../../data/challenges/comparingNumbers";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - the symbol is given, the number is missing.
 *
 * Every option is a real number near the bound, so the learner has to test the
 * statement rather than recognise a shape. One option in each set sits on the
 * bound itself (34 < 34), which is the mistake worth making here.
 */

const PLANS = [
  { left: 34, symbol: "<", options: [34, 30, 41], answer: 41 },
  { left: 68, symbol: ">", options: [70, 68, 59], answer: 59 },
  { left: 25, symbol: "=", options: [25, 52, 26], answer: 25 },
  { left: 47, symbol: "<", options: [47, 44, 50], answer: 50 },
  { left: 13, symbol: ">", options: [13, 31, 9], answer: 9 },
  { left: 80, symbol: "=", options: [8, 88, 80], answer: 80 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => ({
    ...plan,
    options: shuffle(plan.options, rng),
  }));
}

function LessThanGreaterThanAndEqualToChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which number makes this true?"
      render={({ question, submit, locked, index }) => (
        <PickNumber key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickNumber({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="statement">
        <span>{question.left}</span>
        <span>{question.symbol}</span>
        <span className="statement-slot">{selected ?? "?"}</span>
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
        onClick={() =>
          submit(isTrueStatement(question.left, question.symbol, selected))
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default LessThanGreaterThanAndEqualToChallenge2;
