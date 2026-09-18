import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PositionBoard from "../../../../../../components/challenge/PositionBoard";
import { describePosition } from "../../../../../../data/challenges/positionAndDirection";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - where is it?
 *
 * The statutory sentence asks pupils to describe "POSITION, direction and
 * movement". Turns cover direction and movement; position is the part nothing
 * else in this category reaches, so it comes first.
 *
 * The object being asked about is outlined, so there is no doubt which one the
 * question means.
 */

const OBJECTS = [
  { emoji: "🍎", x: 1, y: 0 },
  { emoji: "⭐", x: 1, y: 1 },
  { emoji: "🐟", x: 0, y: 1 },
  { emoji: "🌸", x: 2, y: 1 },
  { emoji: "🚗", x: 1, y: 2 },
];

const WORDS = ["above", "below", "left of", "right of"];

function buildQuestions(rng) {
  const centre = OBJECTS.find((o) => o.x === 1 && o.y === 1);
  const others = OBJECTS.filter((o) => o !== centre);

  return shuffle(others, rng)
    .concat(shuffle(others, rng))
    .slice(0, 6)
    .map((object) => ({
      object,
      centre,
      answer: describePosition(object, centre),
      options: WORDS,
    }));
}

function SequencesChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Describe where things are."
      render={({ question, submit, locked, index }) => (
        <DescribeWhere key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function DescribeWhere({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PositionBoard
        size={3}
        objects={OBJECTS}
        highlight={question.object}
        label="a grid of objects with one outlined"
      />

      <p className="challenge-prompt">
        Where is the {question.object.emoji} compared to the{" "}
        {question.centre.emoji}?
      </p>

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

export default SequencesChallenge1;
