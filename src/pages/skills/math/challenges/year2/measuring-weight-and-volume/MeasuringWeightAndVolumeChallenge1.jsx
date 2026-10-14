import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ScaleReader from "../../../../../../components/challenge/ScaleReader";
import { buildScaleReadQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - read a kitchen scale.
 *
 * The same scale component as the ruler, turned into grams. Reading any
 * measuring instrument is the same act, and using one widget for all of them
 * is what makes that obvious.
 *
 * Marks every 100 g, not every 200: the reading must land ON a labelled mark,
 * or a 6-year-old is being asked to estimate between two of them. Readings
 * and foods change each attempt; options carry "g".
 */

function MeasuringWeightAndVolumeChallenge1({ onComplete }) {
  const questions = useMemo(() => buildScaleReadQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the scale."
      render={({ question, submit, locked, index }) => (
        <ReadScale key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ReadScale({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">How heavy is the bag of {question.thing}?</p>

      <ScaleReader
        min={0}
        max={1000}
        majorStep={100}
        value={question.value}
        unit="g"
        orientation="horizontal"
        label={`A scale reading ${question.value} grams`}
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

export default MeasuringWeightAndVolumeChallenge1;
