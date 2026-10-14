import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { buildJugReadQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 2 - read a measuring jug.
 *
 * The same scale stood on its end. A jug is read from the bottom up, which is
 * why the vertical variant fills from the bottom, and that difference alone is
 * worth meeting separately from the flat scale.
 *
 * Every level sits on a labelled mark. The drag version that follows may sit
 * between marks, because there the learner has a numeric readout to go by.
 */

function MeasuringWeightAndVolumeChallenge2({ onComplete }) {
  const questions = useMemo(() => buildJugReadQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the measuring jug."
      render={({ question, submit, locked, index }) => (
        <ReadJug key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadJug({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">How much {question.drink} is in the jug?</p>

      <ScaleReader
        min={0}
        max={1000}
        majorStep={100}
        value={question.value}
        unit="ml"
        orientation="vertical"
        variant="jug"
        label={`A jug holding ${question.value} millilitres`}
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

export default MeasuringWeightAndVolumeChallenge2;
