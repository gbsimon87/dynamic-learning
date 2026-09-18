import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { numberInWords } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - numbers written in words.
 *
 * "Read and write numbers to at least 100 in numerals AND IN WORDS" is
 * statutory, and nothing in the app covered the words half. Reading the word
 * and choosing the numeral comes before writing it (challenge 4).
 *
 * Distractors are the digit swap and the neighbouring ten, so the word has to
 * be read properly: "forty-seven" against 74 and 57.
 */

const NUMBERS = [47, 63, 28, 91, 16, 75];

function buildQuestions(rng) {
  return shuffle(NUMBERS, rng).map((value) => {
    const tens = Math.floor(value / 10);
    const ones = value % 10;
    const options = shuffle([value, ones * 10 + tens, value + 10], rng);
    return { value, words: numberInWords(value), options };
  });
}

function NumbersAndCountingChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

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
