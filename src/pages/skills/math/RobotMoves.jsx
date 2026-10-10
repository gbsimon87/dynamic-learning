import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import ChoiceGrid from "../../../components/challenge/ChoiceGrid";
import PositionBoard from "../../../components/challenge/PositionBoard";
import RobotGrid from "../../../components/challenge/RobotGrid";
import { runProgram } from "../../../data/challenges/positionAndDirection";
import { describeProgram, makeRobotQuestion } from "../../../data/freePlay/robot";
import "./RobotMoves.css";

/**
 * Robot Moves — free play on position and direction.
 *
 * Turn the robot, pick or write the program that reaches the ★ (RobotGrid),
 * and say where things are on a grid (PositionBoard). Every robot answer is
 * run through the tested `runProgram`, so the drawing and the marking agree.
 * Easier is quarter turns; Harder adds three-quarter turns and two-turn paths.
 */

const NO_TARGET = { x: -1, y: -1 };
// Long enough for any path on a 5 × 5 grid with room to wander.
const MAX_STEPS = 12;
const STEP_LABEL = { forward: "Forward", left: "Turn left", right: "Turn right" };

function robotLabel(question) {
  const { robot, target } = question;
  const at = `The robot is in column ${robot.x + 1}, row ${robot.y + 1}, facing ${robot.heading}`;
  if (!target) return `${at}.`;
  return `${at}. The star is in column ${target.x + 1}, row ${target.y + 1}.`;
}

function RobotMoves() {
  return (
    <FreePlayShell
      title="Robot Moves"
      icon="🤖"
      intro="Turn the robot, steer it to the star, and find where things are."
      makeQuestion={makeRobotQuestion}
      render={(props) => {
        if (props.question.kind === "build") return <BuildProgram {...props} />;
        return <PickAnswer {...props} />;
      }}
    />
  );
}

function Picture({ question }) {
  if (question.kind === "which" || question.kind === "where") {
    return <PositionBoard size={question.size} objects={question.objects} label={question.boardLabel} />;
  }
  return (
    <RobotGrid
      size={question.size}
      robot={question.robot}
      target={question.target ?? NO_TARGET}
      label={robotLabel(question)}
    />
  );
}

function PickAnswer({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);
  const wordy = question.kind === "program" || question.kind === "where";

  return (
    <>
      <Picture question={question} />

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
        variant={wordy ? "wordy" : ""}
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

function BuildProgram({ question, submit, locked }) {
  const [program, setProgram] = useState([]);
  const add = (step) => setProgram((prev) => (prev.length >= MAX_STEPS ? prev : [...prev, step]));

  const check = () => {
    const end = runProgram(question.robot, program, question.size);
    submit(end.x === question.target.x && end.y === question.target.y);
  };

  return (
    <>
      <Picture question={question} />

      <div className="robot-moves-buttons" role="group" aria-label="Add a step to the program">
        {["forward", "left", "right"].map((step) => (
          <button
            key={step}
            type="button"
            className="choice-btn robot-moves-step"
            disabled={locked || program.length >= MAX_STEPS}
            onClick={() => add(step)}
          >
            <span aria-hidden="true">{step === "forward" ? "⬆" : step === "left" ? "↺" : "↻"}</span>{" "}
            {STEP_LABEL[step]}
          </button>
        ))}
      </div>

      <p className="sequence-strip robot-moves-program" aria-live="polite">
        <span className="visually-hidden">Your program: </span>
        {program.length === 0 ? (
          <span className="robot-moves-empty">Tap the steps to write a program.</span>
        ) : (
          describeProgram(program)
        )}
      </p>

      <div className="robot-moves-edit">
        <button
          type="button"
          className="scale-step-btn"
          disabled={locked || program.length === 0}
          onClick={() => setProgram((prev) => prev.slice(0, -1))}
        >
          Undo
        </button>
        <button
          type="button"
          className="scale-step-btn"
          disabled={locked || program.length === 0}
          onClick={() => setProgram([])}
        >
          Clear
        </button>
      </div>

      <button type="button" className="submit-btn" disabled={locked || program.length === 0} onClick={check}>
        Run my program
      </button>
    </>
  );
}

export default RobotMoves;
