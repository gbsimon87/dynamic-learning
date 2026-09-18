import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { runProgram } from "../../../../../../data/challenges/positionAndDirection";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - how many right angles?
 *
 * The program is given and the learner counts the right-angle turns in it,
 * ignoring the forward moves. Picking the turns out of a mixed list is
 * harder than counting a list of only turns.
 */

const SIZE = 4;

const PLANS = [
  { start: { x: 0, y: 3, heading: "up" }, program: ["forward", "right", "forward"], answer: 1 },
  { start: { x: 0, y: 3, heading: "up" }, program: ["forward", "right", "forward", "right", "forward"], answer: 2 },
  { start: { x: 1, y: 3, heading: "up" }, program: ["right", "forward", "left", "forward"], answer: 2 },
  { start: { x: 0, y: 0, heading: "right" }, program: ["forward", "forward", "right"], answer: 1 },
  { start: { x: 2, y: 3, heading: "up" }, program: ["left", "left", "forward"], answer: 2 },
  { start: { x: 0, y: 2, heading: "right" }, program: ["forward", "left", "forward", "right", "forward"], answer: 2 },
];

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => ({
    ...plan,
    end: runProgram(plan.start, plan.program, SIZE),
  }));
}

function RobotChallenge3({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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

      <p className="sequence-strip">{question.program.join(" → ")}</p>

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
