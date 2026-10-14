import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { buildWordsToDigitsQuestions, isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 4 - write the numeral from the words, with nothing to choose from.
 *
 * The hardest shape of the statutory "read and write numbers ... in numerals
 * and in words": no options to eliminate, and the tens-and-ones order has to
 * come out of the word itself. Numbers are generated each time.
 */

function NumbersAndCountingChallenge4({ onComplete }) {
  const questions = useMemo(() => buildWordsToDigitsQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Write this number in digits."
      render={({ question, submit, locked, index }) => (
        <WriteNumeral key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WriteNumeral({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="sequence-strip">{question.words}</p>

      <NumberInput label="In digits" value={value} onChange={setValue} disabled={locked} />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(isCorrectNumber(value, question.value))}
      >
        Check my answer
      </button>
    </>
  );
}

export default NumbersAndCountingChallenge4;
