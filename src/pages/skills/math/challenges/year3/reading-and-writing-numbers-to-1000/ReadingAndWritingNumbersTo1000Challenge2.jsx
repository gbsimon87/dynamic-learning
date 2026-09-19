import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import {
  buildWordQuestions,
  isCorrectNumber,
} from "../../../../../../data/challenges/readingAndWritingNumbers1000";

/**
 * Challenge 2 — the other direction, with nothing to eliminate.
 *
 * Words in, numeral out, typed. This is where the topic actually bites: four
 * of the six numbers have an empty column, and a learner writing down what
 * they hear turns "three hundred and six" into 3006 or 360. There are no
 * options to compare, so the number has to be constructed.
 */

function ReadingAndWritingNumbersTo1000Challenge2({ onComplete }) {
  const questions = useMemo(() => buildWordQuestions(2, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Write the number in numerals."
      render={({ question, submit, locked, index }) => (
        <TypeNumeral key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TypeNumeral({ question, submit, locked }) {
  const [entered, setEntered] = useState("");

  return (
    <>
      <p className="challenge-prompt">
        Write <strong>{question.words}</strong> using digits.
      </p>

      {/* Four digits, not the default three: "one thousand" is inside this
          topic, and a keypad that refuses the fourth digit makes it
          unanswerable. */}
      <NumberInput
        value={entered}
        onChange={setEntered}
        disabled={locked}
        label="In numerals"
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

export default ReadingAndWritingNumbersTo1000Challenge2;
