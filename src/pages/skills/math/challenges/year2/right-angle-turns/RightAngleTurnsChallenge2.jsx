import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { runProgram } from "../../../../../../data/challenges/positionAndDirection";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - run the program.
 *
 * The guidance's own example: "programming robots using instructions given in
 * right angles". The learner builds a list of instructions and watches the
 * robot follow them, which is movement in a straight line plus right-angle
 * turns put together.
 *
 * The robot's position always comes from the tested runProgram, so the picture
 * cannot disagree with the answer.
 */

const SIZE = 4;

const PLANS = [
  { start: { x: 0, y: 3, heading: "up" }, target: { x: 0, y: 1 } },
  { start: { x: 0, y: 3, heading: "right" }, target: { x: 2, y: 3 } },
  { start: { x: 1, y: 2, heading: "up" }, target: { x: 1, y: 0 } },
  { start: { x: 3, y: 3, heading: "up" }, target: { x: 3, y: 1 } },
  { start: { x: 0, y: 0, heading: "down" }, target: { x: 0, y: 2 } },
  { start: { x: 2, y: 3, heading: "up" }, target: { x: 2, y: 1 } },
];

function RobotChallenge2({ onComplete }) {
  const questions = useMemo(() => shuffle(PLANS, Math.random), []);

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
        {program.length === 0 ? "No instructions yet." : program.join(" → ")}
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
