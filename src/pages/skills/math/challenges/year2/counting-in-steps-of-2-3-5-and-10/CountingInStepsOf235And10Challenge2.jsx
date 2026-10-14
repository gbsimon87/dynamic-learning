import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildNextTermQuestions } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - the step is no longer given.
 *
 * The learner sees four terms and must work out the jump before choosing what
 * comes next. Two questions count backwards, which is where the pattern is
 * easiest to lose. Sequences are generated each time; the wrong options are
 * one step out and one out, on sides chosen at random.
 */

function CountingInStepsOf235And10Challenge2({ onComplete }) {
  const questions = useMemo(() => buildNextTermQuestions(Math.random), []);

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
