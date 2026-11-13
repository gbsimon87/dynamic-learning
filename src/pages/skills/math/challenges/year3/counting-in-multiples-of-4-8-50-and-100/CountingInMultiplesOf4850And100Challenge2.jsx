import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import NumberLine from "../../../../../../components/challenge/NumberLine";
import {
  STEPS,
  isCorrectNumber,
} from "../../../../../../data/challenges/countingInMultiples";
import { buildMissingMultipleQuestions } from "../../../../../../data/challenges/countingInMultiples";

/**
 * Challenge 2 — the rule must be inferred.
 *
 * The step is no longer named, and the gap sits in the MIDDLE of the run rather
 * than at the end, so it cannot be answered by adding to the last number on
 * screen. The learner has to spot the step first, which is the actual skill.
 */

function CountingInMultiplesOf4850And100Challenge2({ onComplete }) {
  const questions = useMemo(() => buildMissingMultipleQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the missing number."
      render={({ question, submit, locked, index }) => (
        <FillGap key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function FillGap({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        What is the missing number in this count?
      </p>

      <NumberLine
        terms={question.sequence}
        gaps={[question.gapIndex]}
        values={{ [question.gapIndex]: entered }}
        active={question.gapIndex}
      />

      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="Missing number"
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

export default CountingInMultiplesOf4850And100Challenge2;
