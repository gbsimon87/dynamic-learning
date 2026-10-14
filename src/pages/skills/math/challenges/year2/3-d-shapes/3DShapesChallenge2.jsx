import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildCountSolidParts } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 2 - count faces, edges and vertices.
 *
 * Statutory, and the three words are the point: a face is a flat surface, an
 * edge is where two faces meet, a vertex is a corner. Each word is asked
 * twice, so the words cannot be treated as interchangeable.
 *
 * Only the polyhedra appear. Whether a sphere has one face or none, or a
 * cylinder two edges or none, is a convention rather than a fact, and a child
 * should not be marked wrong for holding the other one.
 */

function SolidsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildCountSolidParts(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Faces, edges and corners."
      render={({ question, submit, locked, index }) => (
        <CountParts key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountParts({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        How many <strong>{question.part.word}</strong> does a{" "}
        {question.solid.name} have? {question.part.hint}
      </p>

      <SolidFigure solid={question.solid} label={`a ${question.solid.name}`} />

      <NumberInput
        label={`Number of ${question.part.word}`}
        value={value}
        onChange={setValue}
        disabled={locked}
      />

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

export default SolidsChallenge2;
