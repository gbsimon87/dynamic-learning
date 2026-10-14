import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildPickNumberQuestions, isTrueStatement } from "../../../../../../data/challenges/comparingNumbers";

/**
 * Challenge 2 - the symbol is given, the number is missing.
 *
 * Every option is a real number near the bound, so the learner has to test the
 * statement rather than recognise a shape. One option in each set sits on the
 * bound itself (34 < 34), which is the mistake worth making here. Numbers are
 * generated each time, two questions for each symbol.
 */

function LessThanGreaterThanAndEqualToChallenge2({ onComplete }) {
  const questions = useMemo(() => buildPickNumberQuestions(Math.random), []);

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
