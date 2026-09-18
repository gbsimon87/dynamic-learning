import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import PositionBoard from "../../../../../../components/challenge/PositionBoard";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - ordinal position in a line.
 *
 * "Order and arrange combinations of mathematical objects in patterns and
 * SEQUENCES" includes knowing which one is first, third or last. The words
 * first/second/third are themselves the thing being learned, so they are
 * spelled out rather than shown as 1st, 2nd, 3rd.
 */

const LINE = [
  { emoji: "🐶", x: 0, y: 0 },
  { emoji: "🐱", x: 1, y: 0 },
  { emoji: "🐰", x: 2, y: 0 },
  { emoji: "🐻", x: 3, y: 0 },
  { emoji: "🐼", x: 4, y: 0 },
];

const ORDINALS = ["first", "second", "third", "fourth", "fifth"];

function buildQuestions(rng) {
  return shuffle(ORDINALS, rng)
    .concat(shuffle(ORDINALS, rng))
    .slice(0, 6)
    .map((ordinal) => {
      const answer = LINE[ORDINALS.indexOf(ordinal)].emoji;
      const others = LINE.map((o) => o.emoji).filter((e) => e !== answer);
      return {
        ordinal,
        answer,
        options: shuffle([answer, ...shuffle(others, rng).slice(0, 2)], rng),
      };
    });
}

function SequencesChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Who is where in the line?"
      render={({ question, submit, locked, index }) => (
        <FindOrdinal key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FindOrdinal({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <PositionBoard size={5} objects={LINE} label="five animals in a line" />

      <p className="challenge-prompt">
        Counting from the left, who is <strong>{question.ordinal}</strong>?
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

export default SequencesChallenge3;
