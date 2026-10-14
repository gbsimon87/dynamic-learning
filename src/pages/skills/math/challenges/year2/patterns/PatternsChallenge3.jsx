import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import OrientationPicker from "../../../../../../components/challenge/OrientationPicker";
import { findShape } from "../../../../../../data/challenges/shapes";
import { buildOrientation } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 3 - the same shape, turned.
 *
 * Straight from the guidance: patterns of shapes "including those in
 * DIFFERENT ORIENTATIONS". A triangle on its side is still a triangle, and
 * that is genuinely not obvious at this age.
 *
 * Only shapes that look different at every quarter turn are used, and every
 * rotation is asked about at least once (see buildOrientation).
 */

function buildQuestions(rng) {
  return buildOrientation(rng).map((q) => ({ ...q, shape: findShape(q.shapeId) }));
}

function PatternsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Turning a shape does not change what it is."
      render={({ question, submit, locked, index }) => (
        <PickOrientation key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

const DESCRIPTIONS = {
  0: "the right way up",
  90: "turned a quarter turn clockwise",
  180: "turned upside down",
  270: "turned a quarter turn anti-clockwise",
};

function PickOrientation({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Which {question.shape.name} is{" "}
        <strong>{DESCRIPTIONS[question.target]}</strong>?
      </p>

      <OrientationPicker
        shape={question.shape}
        rotations={question.rotations}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.answerIndex)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PatternsChallenge3;
