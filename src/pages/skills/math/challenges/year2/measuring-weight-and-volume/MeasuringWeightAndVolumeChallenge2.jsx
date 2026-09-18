import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { scaleOptions } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

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

const PLANS = [400, 700, 200, 1000, 500, 900];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((value) => ({
    value,
    // At 1000 ml the "+100" is off the jug, so this walks the other way
    // instead of silently offering one fewer option.
    options: shuffle(scaleOptions(value, 100, 0, 1000, 3), rng),
  }));
}

function MeasuringWeightAndVolumeChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
      <p className="challenge-prompt">How much water is in the jug?</p>

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
        onClick={() => submit(selected === question.value)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MeasuringWeightAndVolumeChallenge2;
