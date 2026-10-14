import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { ROBOT_GRID, buildCountTurns } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 3 - how many right angles?
 *
 * The program is given and the learner counts the right-angle turns in it,
 * ignoring the forward moves. Picking the turns out of a mixed list is
 * harder than counting a list of only turns. Programs are new every run,
 * with 1 to 4 turns (see buildCountTurns).
 */

const SIZE = ROBOT_GRID;

const STEP_WORDS = { forward: "forward", left: "turn left", right: "turn right" };

function RobotChallenge3({ onComplete }) {
  const questions = useMemo(() => buildCountTurns(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count only the turns."
      render={({ question, submit, locked, index }) => (
        <CountTurns key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountTurns({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <RobotGrid size={SIZE} robot={question.start} target={{ x: -1, y: -1 }} />

      <p className="sequence-strip">{question.program.map((step) => STEP_WORDS[step]).join(" → ")}</p>

      <p className="challenge-prompt">
        How many right-angle turns are in this program?
      </p>

      <NumberInput label="Right-angle turns" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default RobotChallenge3;
