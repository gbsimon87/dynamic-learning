import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildPartitionQuestions } from "../../../../../../data/challenges/placeValue";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 4 - partition in different ways, with the answer typed.
 *
 * Partitioning in more than one way: what a digit is worth, 73 = 70 + ?,
 * and the non-standard 73 = 60 + ? and "3 tens and 14 ones" that the
 * statutory guidance asks for (23 as 20 + 3 and 10 + 13). Generated each time.
 */

function PlaceValueChallenge4({ onComplete }) {
  const questions = useMemo(() => buildPartitionQuestions(Math.random), []);

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
      <p className={question.prompt.includes("=") ? "sequence-strip" : "challenge-prompt"}>{question.prompt}</p>

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

export default PlaceValueChallenge4;
