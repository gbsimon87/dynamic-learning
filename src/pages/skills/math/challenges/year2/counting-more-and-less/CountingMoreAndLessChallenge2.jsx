import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildRuleMachineQuestions } from "../../../../../../data/challenges/countingMoreAndLess";

/**
 * Challenge 2 - the jump is no longer named.
 *
 * A rule machine shows two worked pairs and leaves the third open, so the
 * learner has to spot the rule before applying it. This is where 10-more and
 * 10-less arrive, because spotting them means reading the tens column. Each
 * of the six rules appears once, with fresh numbers every time.
 */

function CountingMoreAndLessChallenge2({ onComplete }) {
  const questions = useMemo(() => buildRuleMachineQuestions(Math.random), []);

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
