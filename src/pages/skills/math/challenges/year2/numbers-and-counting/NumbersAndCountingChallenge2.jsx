import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildWordsToNumeralQuestions } from "../../../../../../data/challenges/numbersAndCounting";

/**
 * Challenge 2 - numbers written in words.
 *
 * "Read and write numbers to at least 100 in numerals AND IN WORDS" is
 * statutory, and nothing in the app covered the words half. Reading the word
 * and choosing the numeral comes before writing it (challenge 4).
 *
 * Distractors are the digit swap and a neighbouring ten, so the word has to
 * be read properly: "forty-seven" against 74 and 57 or 37. Numbers are
 * generated each time.
 */

function NumbersAndCountingChallenge2({ onComplete }) {
  const questions = useMemo(() => buildWordsToNumeralQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which number is this?"
      render={({ question, submit, locked, index }) => (
        <WordToNumeral key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WordToNumeral({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="sequence-strip">{question.words}</p>

      <ChoiceGrid
        options={question.options}
        selected={selected}
        onSelect={setSelected}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || selected === null}
        onClick={() => submit(selected === question.value)}
      >
        Check my answer
      </button>
    </>
  );
}

export default NumbersAndCountingChallenge2;
