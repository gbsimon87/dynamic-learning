import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { buildFaceOnSolid } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 1 - the flat shapes on a solid.
 *
 * Statutory, with the curriculum's own examples: a circle on a cylinder, a
 * triangle on a pyramid. The sphere never appears, because it has no flat
 * face, and a pyramid or prism may be asked about either kind of face it has
 * (see buildFaceOnSolid).
 */

function DifferentShapesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildFaceOnSolid(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Flat shapes on solid shapes."
      render={({ question, submit, locked, index }) => (
        <FaceShape key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FaceShape({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        Which flat shape can you find on the surface of this{" "}
        {question.solid.name}?
      </p>

      <SolidFigure solid={question.solid} label={`a ${question.solid.name}`} />

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

export default DifferentShapesChallenge1;
