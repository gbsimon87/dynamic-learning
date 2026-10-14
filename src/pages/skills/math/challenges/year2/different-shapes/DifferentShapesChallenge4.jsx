import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildShapeClues } from "../../../../../../data/challenges/shapeQuestions";

/**
 * Challenge 4 - name a shape from its properties alone.
 *
 * Nothing is drawn. Each clue fits exactly one shape, and its wrong options
 * are the shapes a child would confuse it with - a rhombus beside the square
 * clue, a cone beside the pyramid one (see SHAPE_CLUES). Three flat shapes
 * and three solids every run.
 */

function DifferentShapesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildShapeClues(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Guess the shape from its clues."
      render={({ question, submit, locked, index }) => (
        <GuessShape key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function GuessShape({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">{question.clue}</p>
      <p className="challenge-prompt">What am I?</p>

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

export default DifferentShapesChallenge4;
