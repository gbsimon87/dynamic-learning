import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { runProgram } from "../../../../../../data/challenges/positionAndDirection";
import { ROBOT_GRID, buildCornerRoute } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 4 - the hardest programs.
 *
 * The star is never in a straight line from the robot, so every route needs at
 * least one right-angle turn and cannot be reached by pressing forward
 * repeatedly (see buildCornerRoute).
 *
 * Any correct route is accepted: only where the robot ends up matters, not how
 * it got there.
 */

const SIZE = ROBOT_GRID;

const STEP_WORDS = { forward: "forward", left: "turn left", right: "turn right" };

function RobotChallenge4({ onComplete }) {
  const questions = useMemo(() => buildCornerRoute(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="You will need to turn a corner."
      render={({ question, submit, locked, index }) => (
        <RouteRobot key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function RouteRobot({ question, submit, locked }) {
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

export default RobotChallenge4;
