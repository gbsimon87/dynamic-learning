import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - intervals and units of time, typed.
 *
 * Covers the two facts Year 2 must know — 60 minutes in an hour, 24 hours in
 * a day — and the statutory "compare and sequence intervals of time", which
 * means working out how long something lasted.
 */
const PROBLEMS = [
  { prompt: "How many minutes are in 1 hour?", answer: 60 },
  { prompt: "How many hours are in 1 day?", answer: 24 },
  { prompt: "A film starts at 2 o'clock and ends at 4 o'clock. How many hours long is it?", answer: 2 },
  { prompt: "Playtime starts at 10:00 and ends at 10:15. How many minutes long is it?", answer: 15 },
  { prompt: "How many minutes are in half an hour?", answer: 30 },
  { prompt: "A lesson runs from 9:00 to 9:45. How many minutes is that?", answer: 45 },
  { prompt: "How many minutes are in 2 hours?", answer: 120 },
  { prompt: "It is 20 past 3. How many minutes until 4 o'clock?", answer: 40 },
];

function MeasuringTimeChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="How long is that?"
      render={({ question, submit, locked, index }) => (
        <TimeProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TimeProblem({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
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

export default MeasuringTimeChallenge4;
