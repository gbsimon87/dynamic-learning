import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { SOLIDS, findShape } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - the flat shapes on a solid.
 *
 * Statutory, with the curriculum's own examples: a circle on a cylinder, a
 * triangle on a pyramid. This is the bridge between the two previous topics —
 * the 2-D shapes a child can name turn up as the surfaces of the 3-D ones.
 */

function buildQuestions(rng) {
  const pool = SOLIDS.filter((s) => s.faceShapes.length > 0);

  return shuffle(pool, rng)
    .slice(0, 6)
    .map((solid) => {
      const answer = findShape(solid.faceShapes[0]).name;
      const wrong = ["circle", "square", "triangle", "rectangle", "hexagon"]
        .map((id) => findShape(id).name)
        .filter((name) => !solid.faceShapes.map((f) => findShape(f).name).includes(name));
      return {
        solid,
        answer,
        options: shuffle([answer, ...shuffle(wrong, rng).slice(0, 2)], rng),
      };
    });
}

function DifferentShapesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
