import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { fromParts, tensOf, onesOf } from "../../../../../../data/challenges/placeValue";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - partition in both directions, with the answer typed.
 *
 * Half the questions build a number from its parts and half pull a number
 * apart, so the learner cannot settle into one direction.
 */

const NUMBERS = [46, 73, 28, 95, 51, 67, 34, 80];

function buildQuestions(rng) {
  return shuffle(NUMBERS, rng)
    .slice(0, 6)
    .map((value, i) => {
      const build = i % 2 === 0;
      if (build) {
        return {
          prompt: `What number is made of ${tensOf(value)} tens and ${onesOf(value)} ones?`,
          answer: value,
        };
      }
      // Pulling apart: ask for the value of the tens digit, not the digit
      // itself - "the 7 in 73 is worth 70" is the idea being tested.
      return {
        prompt: `In the number ${value}, what is the ${tensOf(value)} worth?`,
        answer: fromParts(tensOf(value), 0),
      };
    });
}

function PlaceValueChallenge4({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Type your answer."
      render={({ question, submit, locked, index }) => (
        <Partition key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function Partition({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(Number(value) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default PlaceValueChallenge4;
