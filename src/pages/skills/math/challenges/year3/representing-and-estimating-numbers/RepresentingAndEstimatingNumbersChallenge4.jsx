import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildRepresentQuestions,
  isCorrectNumber,
} from "../../../../../../data/challenges/representingNumbers";

/**
 * Challenge 4 — applied, typed, and with no picture to count.
 *
 * The guidance asks for representations "including those related to measure",
 * so the pieces are boxes, packs, sacks and singles rather than flats and rods.
 * The learner has to recognise a hundred, a ten and a one inside ordinary
 * words, which is the version of this skill that survives leaving the lesson.
 *
 * Two problems give more than nine of something — 13 tens, 12 loose potatoes.
 * Those cannot be answered by writing the counts down as digits, which is
 * exactly the shortcut worth closing.
 */

function RepresentingAndEstimatingNumbersChallenge4({ onComplete }) {
  const questions = useMemo(() => buildRepresentQuestions(4, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work out the number."
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

export default RepresentingAndEstimatingNumbersChallenge4;
