import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - division in longer stories, typed.
 *
 * The number to divide is not always stated directly: some stories give a
 * total to work out first. Every division stays exact.
 */
const PROBLEMS = [
  { prompt: "There are 5 boxes with 4 cakes in each. They are shared between 2 children. How many cakes each?", answer: 10 },
  { prompt: "A teacher has 45 pencils. She puts 5 on each table. How many tables get pencils?", answer: 9 },
  { prompt: "30 children line up in rows of 10. How many rows are there?", answer: 3 },
  { prompt: "There are 20 red beads and 20 blue beads. They are shared between 10 jars. How many in each jar?", answer: 4 },
  { prompt: "A baker makes 40 buns and puts them in bags of 5. How many bags?", answer: 8 },
  { prompt: "18 apples and 2 pears are shared equally between 5 plates. How many on each plate?", answer: 4 },
  { prompt: "A shop has 60 balloons in packs of 10. How many packs?", answer: 6 },
  { prompt: "24 marbles are shared between 2 boys, then each boy shares his marbles into 2 bags. How many in each bag?", answer: 6 },
];

function DivisionProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work out what to divide first."
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

export default DivisionProblemsChallenge4;
