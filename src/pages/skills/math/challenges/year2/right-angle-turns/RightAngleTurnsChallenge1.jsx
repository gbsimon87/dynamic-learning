import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { buildRobotTurn } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 1 - the robot turns on the spot.
 *
 * A right-angle turn changes the direction and nothing else. Seeing the robot
 * stay on its square while its nose swings round is the point, so this asks
 * only about the heading. Six of the eight heading-and-turn pairs, with the
 * robot somewhere new each time (see buildRobotTurn).
 */

const SIZE = 3;

function RobotChallenge1({ onComplete }) {
  const questions = useMemo(() => buildRobotTurn(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Turning does not move the robot."
      render={({ question, submit, locked, index }) => (
        <TurnRobot key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TurnRobot({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <RobotGrid
        size={SIZE}
        robot={question.robot}
        target={{ x: -1, y: -1 }}
        label={`a robot facing ${question.heading}`}
      />

      <p className="challenge-prompt">
        The robot faces <strong>{question.heading}</strong>. It makes one
        right-angle turn to the <strong>{question.instruction}</strong>. Which
        way does it face now?
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

export default RobotChallenge1;
