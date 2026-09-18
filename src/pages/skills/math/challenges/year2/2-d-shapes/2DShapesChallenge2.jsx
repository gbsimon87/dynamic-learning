import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import ShapeFigure from "../../../../../../components/challenge/ShapeFigure";
import { sideCountableShapes } from "../../../../../../data/challenges/shapes";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - count the sides.
 *
 * The corners are dotted, because counting sides by counting corners is the
 * method, and on an octagon it is easy to lose your place otherwise.
 *
 * The circle is deliberately absent: "how many sides has a circle" has no
 * agreed Year 2 answer, and a child should not be marked wrong for saying one
 * when the app wanted zero.
 */

function buildQuestions(rng) {
  return shuffle(sideCountableShapes(), rng)
    .slice(0, 6)
    .map((shape) => ({ shape, answer: shape.sides }));
}

function ShapesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count the sides."
      render={({ question, submit, locked, index }) => (
        <CountSides key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountSides({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">How many sides does this shape have?</p>

      <ShapeFigure shape={question.shape} showVertices label="a shape with its corners marked" />

      <NumberInput label="Number of sides" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default ShapesChallenge2;
