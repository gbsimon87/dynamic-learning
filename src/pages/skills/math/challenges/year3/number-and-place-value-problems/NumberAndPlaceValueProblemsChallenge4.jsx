import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildProblemQuestions,
  isCorrectNumber,
} from "../../../../../../data/challenges/numberAndPlaceValueProblems";

/**
 * Challenge 4 — applied, typed, and drawing on the whole category.
 *
 * Nothing announces which idea a problem wants. One needs a hundred more and
 * then ten less; one needs rows of a hundred counted; one needs the count in
 * 50s; one needs the largest of three numbers. That choice IS the skill this
 * topic exists for — every other topic in the category names its own method in
 * its title, so none of them can rehearse it.
 */

function NumberAndPlaceValueProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => buildProblemQuestions(4, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Solve the problem."
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

export default NumberAndPlaceValueProblemsChallenge4;
