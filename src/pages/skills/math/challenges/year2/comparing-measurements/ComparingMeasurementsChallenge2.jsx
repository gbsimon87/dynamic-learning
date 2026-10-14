import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildCrossUnitCompareQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 2 - compare without a picture, across units.
 *
 * Every pair mixes units — 1 m against 90 cm — so the learner has to convert
 * before comparing. That is where a bigger number can be the smaller measure,
 * which is the trap worth setting. Two length, two mass and two capacity
 * pairs per run, made fresh each attempt, with one pair equal.
 */

function ComparingMeasurementsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildCrossUnitCompareQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Careful — the units are not always the same."
      render={({ question, submit, locked, index }) => (
        <CompareUnits key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CompareUnits({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="statement">
        <span>{question.left}</span>
        <span className="statement-slot">{selected ?? "?"}</span>
        <span>{question.right}</span>
      </p>

      <ChoiceGrid
        options={["<", ">", "="]}
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

export default ComparingMeasurementsChallenge2;
