import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { SHAPES_2D } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * NOTE ON THE NAME: the file must be 2DShapesChallengeN.jsx for the dynamic
 * loader, but that is not a valid JavaScript identifier, so the component is
 * named differently and reached through the default export.
 *
 * Challenge 1 - name the shape.
 *
 * Only shapes with distinct names appear, so no question can offer "triangle"
 * twice and mark one of them wrong.
 */

const NAMED = ["circle", "triangle", "square", "rectangle", "pentagon", "hexagon", "octagon", "rhombus"];

function buildQuestions(rng) {
  const pool = SHAPES_2D.filter((s) => NAMED.includes(s.id));

  return shuffle(pool, rng)
    .slice(0, 6)
    .map((shape) => {
      const others = pool.filter((s) => s.name !== shape.name).map((s) => s.name);
      return {
        shape,
        answer: shape.name,
        options: shuffle([shape.name, ...shuffle(others, rng).slice(0, 2)], rng),
      };
    });
}

function ShapesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What is this shape called?"
      render={({ question, submit, locked, index }) => (
        <NameShape key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameShape({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <ShapeFigure shape={question.shape} label="a shape to name" />

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

export default ShapesChallenge1;
