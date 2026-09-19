import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildWordQuestions,
  isCorrectNumber,
} from "../../../../../../data/challenges/readingAndWritingNumbers1000";

/**
 * Challenge 4 — applied: the number arrives inside a sentence, in words.
 *
 * Not one digit appears in any prompt, so reading is not a step that can be
 * skipped. Four of the six then ask for ten or a hundred more or less, which
 * means the number has to be written down correctly BEFORE anything can be
 * done to it — a learner who reads "nine hundred and four" as 94 gets a wrong
 * answer from a correct subtraction, which is how this mistake really shows up.
 */

function ReadingAndWritingNumbersTo1000Challenge4({ onComplete }) {
  const questions = useMemo(() => buildWordQuestions(4, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the problem, then answer in numerals."
      render={({ question, submit, locked, index }) => (
        <SolveProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveProblem({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="Your answer"
        maxDigits={4}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || entered === ""}
        onClick={() => submit(isCorrectNumber(entered, question.answer))}
      >
        Check my answer
      </button>
    </>
  );
}

export default ReadingAndWritingNumbersTo1000Challenge4;
