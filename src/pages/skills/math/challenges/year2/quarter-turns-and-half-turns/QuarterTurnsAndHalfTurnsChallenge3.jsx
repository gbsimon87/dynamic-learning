import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { turnBetween } from "../../../../../../data/challenges/positionAndDirection";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - name the turn.
 *
 * The reverse of challenge 1: both headings are shown and the learner names
 * the turn that connects them. Naming it needs the vocabulary — quarter, half,
 * clockwise, anti-clockwise — rather than just the result.
 *
 * A three-quarter turn clockwise is reported as a quarter anti-clockwise,
 * because that is how it would be described out loud.
 */

const PLANS = [
  { from: "up", to: "right" },
  { from: "up", to: "down" },
  { from: "up", to: "left" },
  { from: "right", to: "down" },
  { from: "down", to: "up" },
  { from: "left", to: "down" },
];

const OPTIONS = [
  "quarter turn clockwise",
  "quarter turn anti-clockwise",
  "half turn",
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => {
    const { turn, direction } = turnBetween(plan.from, plan.to);
    return {
      ...plan,
      answer: turn === "half" ? "half turn" : `${turn} turn ${direction}`,
      options: OPTIONS,
    };
  });
}

function TurnsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="What turn was that?"
      render={({ question, submit, locked, index }) => (
        <NameTurn key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function NameTurn({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">
        The arrow was pointing <strong>{question.from}</strong>. Now it points{" "}
        <strong>{question.to}</strong>.
      </p>

      <RotationDial heading={question.to} showControls={false} />

      <p className="challenge-prompt">What turn did it make?</p>

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

export default TurnsChallenge3;
