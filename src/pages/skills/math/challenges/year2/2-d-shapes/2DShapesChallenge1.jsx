import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { buildNameShapes } from "../../../../../../data/challenges/shapeQuestions";

/**
 * NOTE ON THE NAME: the file must be 2DShapesChallengeN.jsx for the dynamic
 * loader, but that is not a valid JavaScript identifier, so the component is
 * named differently and reached through the default export.
 *
 * Challenge 1 - name the shape. The wrong options are look-alikes (a hexagon
 * beside a pentagon and an octagon) - see buildNameShapes.
 */

function ShapesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildNameShapes(Math.random), []);

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
