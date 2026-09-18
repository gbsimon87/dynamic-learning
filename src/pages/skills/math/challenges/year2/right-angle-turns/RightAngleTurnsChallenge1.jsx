import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import RobotGrid from "../../../../../../components/challenge/RobotGrid";
import { HEADINGS, applyTurn } from "../../../../../../data/challenges/positionAndDirection";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - the robot turns on the spot.
 *
 * A right-angle turn changes the direction and nothing else. Seeing the robot
 * stay on its square while its nose swings round is the point, so this asks
 * only about the heading.
 */

const PLANS = [
  { heading: "up", instruction: "right" },
  { heading: "up", instruction: "left" },
  { heading: "right", instruction: "right" },
  { heading: "down", instruction: "left" },
  { heading: "left", instruction: "right" },
  { heading: "right", instruction: "left" },
];

const SIZE = 3;

function buildQuestions(rng) {
  return shuffle(PLANS, rng).map((plan) => ({
    ...plan,
    robot: { x: 1, y: 1, heading: plan.heading },
    answer: applyTurn(
      plan.heading,
      "quarter",
      plan.instruction === "right" ? "clockwise" : "anti-clockwise"
    ),
    options: HEADINGS,
  }));
}

function RobotChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
        The robot faces <strong>{question.heading}</strong> and turns{" "}
        <strong>{question.instruction}</strong> one right angle. Which way does
        it face now?
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
