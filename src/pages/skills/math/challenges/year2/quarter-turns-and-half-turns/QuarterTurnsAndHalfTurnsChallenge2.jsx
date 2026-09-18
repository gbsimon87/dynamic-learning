import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { applyTurn } from "../../../../../../data/challenges/positionAndDirection";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - make the turn yourself.
 *
 * Now the controls are live. Each tap is one quarter turn, so reaching "down"
 * from "up" takes two taps and the learner feels that a half turn IS two right
 * angles rather than being told it.
 *
 * The arrow animates, because the movement is the lesson.
 */

const PLANS = [
  { from: "up", to: "right" },
  { from: "up", to: "down" },
  { from: "right", to: "up" },
  { from: "down", to: "left" },
  { from: "left", to: "right" },
  { from: "up", to: "left" },
];

function TurnsChallenge2({ onComplete }) {
  const questions = useMemo(() => shuffle(PLANS, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Turn the arrow."
      render={({ question, submit, locked, index }) => (
        <MakeTurn key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MakeTurn({ question, submit, locked }) {
  const [heading, setHeading] = useState(question.from);

  return (
    <>
      <p className="challenge-prompt">
        Turn the arrow so it points <strong>{question.to}</strong>. Each tap is
        a quarter turn.
      </p>

      <RotationDial
        heading={heading}
        disabled={locked}
        onTurn={(direction) => setHeading((h) => applyTurn(h, "quarter", direction))}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(heading === question.to)}
      >
        Check my answer
      </button>
    </>
  );
}

export default TurnsChallenge2;
