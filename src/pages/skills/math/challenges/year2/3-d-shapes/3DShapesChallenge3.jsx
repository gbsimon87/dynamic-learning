import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import SolidFigure from "../../../../../../components/challenge/SolidFigure";
import { SOLIDS } from "../../../../../../data/challenges/shapes";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - everyday objects.
 *
 * Statutory: "compare and sort common 2-D and 3-D shapes AND EVERYDAY
 * OBJECTS". A solid shape is worth nothing as a name if a child cannot see a
 * cylinder in a tin, so the question runs that way round.
 */

const OBJECTS = [
  { object: "a tin of beans", answer: "cylinder" },
  { object: "a dice", answer: "cube" },
  { object: "a football", answer: "sphere" },
  { object: "a party hat", answer: "cone" },
  { object: "a cereal box", answer: "cuboid" },
  { object: "an ice cream cone", answer: "cone" },
  { object: "a marble", answer: "sphere" },
  { object: "a shoe box", answer: "cuboid" },
];

function buildQuestions(rng) {
  return shuffle(OBJECTS, rng)
    .slice(0, 6)
    .map((item) => {
      const solid = SOLIDS.find((s) => s.id === item.answer);
      const others = SOLIDS.filter((s) => s.id !== item.answer).map((s) => s.name);
      return {
        ...item,
        answerName: solid.name,
        options: shuffle([solid.name, ...shuffle(others, rng).slice(0, 2)], rng),
      };
    });
}

function SolidsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Shapes in real things."
      render={({ question, submit, locked, index }) => (
        <MatchObject key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MatchObject({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.object}</p>

      <p className="challenge-prompt">Which solid shape is it like?</p>

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
        onClick={() => submit(selected === question.answerName)}
      >
        Check my answer
      </button>
    </>
  );
}

export default SolidsChallenge3;
