import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { runProgram } from "../../../../../../data/challenges/positionAndDirection";
import { ROBOT_GRID, buildStraightRoute } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 2 - run the program.
 *
 * The guidance's own example: "programming robots using instructions given in
 * right angles". The star is in a straight line from the robot, but most of
 * the time the robot faces another way, so it has to turn a right angle (or
 * two) before it can go forward (see buildStraightRoute).
 *
 * The robot's position always comes from the tested runProgram, so the picture
 * cannot disagree with the answer.
 */

const SIZE = ROBOT_GRID;

const STEP_WORDS = { forward: "forward", left: "turn left", right: "turn right" };

function RobotChallenge2({ onComplete }) {
  const questions = useMemo(() => buildStraightRoute(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Program the robot to reach the star."
      render={({ question, submit, locked, index }) => (
        <ProgramRobot key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function ProgramRobot({ question, submit, locked }) {
  const [program, setProgram] = useState([]);
  const robot = runProgram(question.start, program, SIZE);

  const add = (instruction) => setProgram((prev) => [...prev, instruction]);

  return (
    <>
      <RobotGrid size={SIZE} robot={robot} target={question.target} />

      <div className="dial-controls">
        <button type="button" className="scale-step-btn" disabled={locked} onClick={() => add("forward")}>
          ▲ forward
        </button>
        <button type="button" className="scale-step-btn" disabled={locked} onClick={() => add("left")}>
          ↺ turn left
        </button>
        <button type="button" className="scale-step-btn" disabled={locked} onClick={() => add("right")}>
          turn right ↻
        </button>
        <button
          type="button"
          className="scale-step-btn"
          disabled={locked || program.length === 0}
          onClick={() => setProgram([])}
        >
          start again
        </button>
      </div>

      <p className="dial-readout">
        {program.length === 0 ? "No instructions yet." : program.map((step) => STEP_WORDS[step]).join(" → ")}
      </p>

      <button
        type="button"
        className="submit-btn"
        disabled={locked}
        onClick={() => submit(robot.x === question.target.x && robot.y === question.target.y)}
      >
        Check my answer
      </button>
    </>
  );
}

export default RobotChallenge2;
