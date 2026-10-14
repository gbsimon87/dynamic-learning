import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import PatternStrip from "../../../../../../components/challenge/PatternStrip";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { buildRepeatLength } from "../../../../../../data/challenges/positionQuestions";

/**
 * Challenge 2 - how long is the repeat?
 *
 * Seeing THAT something repeats is easier than seeing how long the repeating
 * unit is, and the unit is what makes a sequence predictable. Typed, so it
 * cannot be found by elimination, and repeats of 2, 3 and 4 each come up
 * twice (see buildRepeatLength).
 */

function SequencesChallenge2({ onComplete }) {
  const questions = useMemo(() => buildRepeatLength(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Find the part that repeats."
      render={({ question, submit, locked, index }) => (
        <CountRepeat key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountRepeat({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <PatternStrip items={question.items} gapIndex={-1} label="a long repeating pattern" />

      <p className="challenge-prompt">
        How many shapes are in the part that repeats?
      </p>

      <NumberInput label="Shapes in the repeat" value={value} onChange={setValue} disabled={locked} />

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

export default SequencesChallenge2;
