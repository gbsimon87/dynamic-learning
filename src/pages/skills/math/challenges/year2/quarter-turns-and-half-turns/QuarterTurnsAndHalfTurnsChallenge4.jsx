import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import RotationDial from "../../../../../../components/challenge/RotationDial";
import { TURNS } from "../../../../../../data/challenges/positionAndDirection";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - turns counted in right angles.
 *
 * The statutory wording is "rotation as a turn AND IN TERMS OF RIGHT ANGLES",
 * so this asks for the count: a quarter turn is one right angle, a half turn
 * two, a three-quarter turn three. Typed, and the hardest slot because the
 * two ways of describing a turn have to be connected.
 */

function buildQuestions(rng) {
  const asRightAngles = TURNS.map((turn) => ({
    prompt: `How many right angles are in a ${turn.name}?`,
    answer: turn.rightAngles,
    heading: "up",
  }));

  const extras = [
    { prompt: "How many right angles are in a full turn?", answer: 4, heading: "up" },
    { prompt: "How many quarter turns make a half turn?", answer: 2, heading: "down" },
    { prompt: "How many quarter turns bring you back to the start?", answer: 4, heading: "up" },
  ];

  return shuffle([...asRightAngles, ...extras], rng).slice(0, 6);
}

function TurnsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
