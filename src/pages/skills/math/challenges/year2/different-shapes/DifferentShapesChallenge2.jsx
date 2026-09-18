import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { SHAPES_2D, SOLIDS } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - flat or solid?
 *
 * Sorting comes before comparing, and the first sort is the coarsest one: is
 * this shape flat or does it take up space? Both kinds are drawn with the same
 * components used elsewhere, so the only difference is the shape itself.
 */

const FLAT = ["circle", "square", "triangle", "hexagon", "pentagon", "rectangle"];
const SOLID = ["cube", "sphere", "cone", "cylinder", "cuboid", "square-pyramid"];

function buildQuestions(rng) {
  const flat = shuffle(SHAPES_2D.filter((s) => FLAT.includes(s.id)), rng)
    .slice(0, 3)
    .map((shape) => ({ kind: "flat", shape, answer: "flat" }));

  const solid = shuffle(SOLIDS.filter((s) => SOLID.includes(s.id)), rng)
    .slice(0, 3)
    .map((s) => ({ kind: "solid", solid: s, answer: "solid" }));

  return shuffle([...flat, ...solid], rng);
}

function DifferentShapesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A flat shape has no thickness. A solid takes up space."
      render={({ question, submit, locked, index }) => (
        <SortKind key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SortKind({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      {question.kind === "flat" ? (
        <ShapeFigure shape={question.shape} label="a shape to sort" />
      ) : (
        <SolidFigure solid={question.solid} label="a shape to sort" />
      )}

      <p className="challenge-prompt">Is this shape flat or solid?</p>

      <ChoiceGrid
        options={["flat", "solid"]}
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

export default DifferentShapesChallenge2;
