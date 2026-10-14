import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildTimeIntervalQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 4 - intervals and units of time, typed.
 *
 * Covers the two facts Year 2 must know — 60 minutes in an hour, 24 hours in
 * a day — and the statutory "compare and sequence intervals of time", which
 * means working out how long something lasted or which lasted longer.
 * Times are written in words, as Year 2 says them. One of each kind per run.
 */
function MeasuringTimeChallenge4({ onComplete }) {
  const questions = useMemo(() => buildTimeIntervalQuestions(Math.random), []);

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

      <NumberInput label={`My answer in ${question.unit}`} value={value} onChange={setValue} disabled={locked} />

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
