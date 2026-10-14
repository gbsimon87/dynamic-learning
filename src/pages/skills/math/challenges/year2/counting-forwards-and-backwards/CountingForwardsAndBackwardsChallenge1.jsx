import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import { buildCountOnQuestions } from "../../../../../../data/challenges/countingForwardsAndBackwards";

/**
 * Challenge 1 - count on along a visible line.
 *
 * Every question steps over a tens boundary, because "sixty-nine, seventy" is
 * the moment a count breaks down. The line is on screen so the learner can
 * count the jumps rather than hold them. Starts and counts are generated each
 * time, and the wrong options are a one-out slip and a ten-out or two-out slip.
 */

function CountingForwardsAndBackwardsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildCountOnQuestions(Math.random), []);

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
