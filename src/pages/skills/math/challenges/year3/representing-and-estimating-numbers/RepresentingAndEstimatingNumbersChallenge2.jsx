import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import {
  LINE_MAJOR_STEP,
  LINE_MAX,
  LINE_MIN,
  buildRepresentQuestions,
} from "../../../../../../data/challenges/representingNumbers";

/**
 * Challenge 2 — estimate: the number is not written anywhere.
 *
 * Only the hundreds are labelled, and the pointer never parks on one of them,
 * so the answer cannot be read — it has to be judged from where the pointer
 * sits between two labels. That is the difference between this and Challenge 1,
 * where everything needed was on screen to be counted.
 *
 * Every option is at least a whole hundred from the answer, so the nearest one
 * is a fact rather than an opinion. Two options twenty apart would make a
 * learner who estimated correctly wrong.
 */

function RepresentingAndEstimatingNumbersChallenge2({ onComplete }) {
  const questions = useMemo(() => buildRepresentQuestions(2, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Where is the arrow pointing?"
      render={({ question, submit, locked, index }) => (
        <EstimatePosition key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function EstimatePosition({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Which number is the arrow closest to?
      </p>

      {/* No unit, and the label must not say the value — ScaleReader's default
          aria-label is "<value> <unit>", which would read the answer out. */}
      <ScaleReader
        min={LINE_MIN}
        max={LINE_MAX}
        majorStep={LINE_MAJOR_STEP}
        value={question.value}
        unit=""
        label="A number line from 0 to 1000 with an arrow on it"
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

export default RepresentingAndEstimatingNumbersChallenge2;
