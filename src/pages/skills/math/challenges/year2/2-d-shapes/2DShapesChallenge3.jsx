import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { buildSymmetry } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 3 - line symmetry in a vertical line.
 *
 * Statutory, and specifically the VERTICAL line only at Year 2. The dashed
 * line is drawn down the middle of every shape so the question is always "does
 * this shape match across that line", not "imagine a line somewhere".
 *
 * Between 2 and 4 of the six shapes match, so the answer cannot be counted
 * out from the yeses so far (see buildSymmetry).
 */

function ShapesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildSymmetry(Math.random), []);

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
