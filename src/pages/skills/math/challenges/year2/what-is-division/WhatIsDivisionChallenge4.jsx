import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - sharing and grouping in stories, typed.
 *
 * The two meanings are mixed on purpose: some ask how many in each group,
 * some how many groups. Reading which is being asked is the work, and every
 * division is exact — Year 2 does not meet remainders.
 */
const PROBLEMS = [
  { prompt: "20 sweets are shared equally between 5 children. How many does each child get?", answer: 4 },
  { prompt: "18 eggs are put into boxes of 2. How many boxes are needed?", answer: 9 },
  { prompt: "30 pencils are shared equally between 10 pots. How many in each pot?", answer: 3 },
  { prompt: "25 flowers are tied into bunches of 5. How many bunches?", answer: 5 },
  { prompt: "16 apples are shared equally between 2 baskets. How many in each basket?", answer: 8 },
  { prompt: "40 books are stacked in piles of 10. How many piles?", answer: 4 },
  { prompt: "12 marbles are shared equally between 2 friends. How many each?", answer: 6 },
  { prompt: "35 stickers are shared equally between 5 pages. How many on each page?", answer: 7 },
];

function WhatIsDivisionChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read carefully — sharing or grouping?"
      render={({ question, submit, locked, index }) => (
        <WordProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WordProblem({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput label="My answer is" value={value} onChange={setValue} disabled={locked} />

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

export default WhatIsDivisionChallenge4;
