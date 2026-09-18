import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { SHAPES_2D, SOLIDS } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - describe a shape from its properties alone.
 *
 * Nothing is drawn. The learner is given the properties and has to name the
 * shape, which is the reverse of every other challenge in this category and
 * the hardest version of it: the vocabulary has to be understood rather than
 * matched to a picture.
 */

const CLUES = [
  { clue: "I have 4 equal sides and 4 corners.", answer: "square" },
  { clue: "I have 3 sides and 3 corners.", answer: "triangle" },
  { clue: "I have 6 sides.", answer: "hexagon" },
  { clue: "I have 6 square faces, 12 edges and 8 corners.", answer: "cube" },
  { clue: "I have no corners and no edges. I roll every way.", answer: "sphere" },
  { clue: "I have 5 faces and a square at the bottom. I come to a point.", answer: "square-based pyramid" },
  { clue: "I have 2 circles and 1 curved surface.", answer: "cylinder" },
  { clue: "I have 8 sides.", answer: "octagon" },
];

const ALL_NAMES = [
  ...new Set([...SHAPES_2D.map((s) => s.name), ...SOLIDS.map((s) => s.name)]),
];

function buildQuestions(rng) {
  return shuffle(CLUES, rng)
    .slice(0, 6)
    .map((item) => {
      const others = ALL_NAMES.filter((name) => name !== item.answer);
      return {
        ...item,
        options: shuffle([item.answer, ...shuffle(others, rng).slice(0, 2)], rng),
      };
    });
}

function DifferentShapesChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
