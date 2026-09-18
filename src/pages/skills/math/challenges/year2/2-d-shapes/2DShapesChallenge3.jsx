import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { SHAPES_2D } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - line symmetry in a vertical line.
 *
 * Statutory, and specifically the VERTICAL line only at Year 2. The dashed
 * line is drawn down the middle of every shape so the question is always "does
 * this shape match across that line", not "imagine a line somewhere".
 *
 * Half the shapes are symmetric and half are not, so the answer cannot be
 * guessed from a run of yeses.
 */

const SYMMETRIC = ["square", "triangle", "hexagon", "rhombus", "trapezium", "octagon"];
const NOT_SYMMETRIC = ["right-triangle", "scalene-triangle", "parallelogram"];

function buildQuestions(rng) {
  const yes = shuffle(SHAPES_2D.filter((s) => SYMMETRIC.includes(s.id)), rng).slice(0, 3);
  const no = shuffle(SHAPES_2D.filter((s) => NOT_SYMMETRIC.includes(s.id)), rng).slice(0, 3);

  return shuffle([...yes, ...no], rng).map((shape) => ({
    shape,
    answer: shape.verticalSymmetry ? "yes" : "no",
  }));
}

function ShapesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Are both halves the same?"
      render={({ question, submit, locked, index }) => (
        <CheckSymmetry key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CheckSymmetry({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        If you folded this shape along the dotted line, would the two halves
        match exactly?
      </p>

      <ShapeFigure
        shape={question.shape}
        showSymmetry
        label="a shape with a dotted line down the middle"
      />

      <ChoiceGrid
        options={["yes", "no"]}
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

export default ShapesChallenge3;
