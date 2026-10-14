import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildRightAngleCount } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 4 - turns counted in right angles.
 *
 * The statutory wording is "rotation as a turn AND IN TERMS OF RIGHT ANGLES",
 * so this asks for the count. Two questions convert a named turn; four show
 * a start, a finish and a direction, so the right angles have to be counted
 * round the dial - three when the arrow went the long way (see
 * buildRightAngleCount). Typed, and the hardest slot.
 */

function TurnsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildRightAngleCount(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="A quarter turn is one right angle."
      render={({ question, submit, locked, index }) => (
        <CountRightAngles key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountRightAngles({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <RotationDial heading={question.heading} showControls={false} />

      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />

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

export default TurnsChallenge4;
