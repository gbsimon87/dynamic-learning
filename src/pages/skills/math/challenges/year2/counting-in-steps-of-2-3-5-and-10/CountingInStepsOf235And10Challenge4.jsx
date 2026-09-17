import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - the hardest slot: steps applied to real things.
 *
 * No sequence is shown, so the learner has to recognise that "6 pairs" means
 * counting in 2s and then do it. Answers are typed rather than chosen, so
 * there is nothing to eliminate.
 *
 * Wording follows the house style: short sentences, concrete nouns, digits
 * rather than number words, and the question asked last.
 */
const PROBLEMS = [
  { prompt: "Socks come in pairs. How many socks are in 6 pairs?", answer: 12 },
  { prompt: "Each bike has 2 wheels. How many wheels do 9 bikes have?", answer: 18 },
  { prompt: "A pack holds 5 stickers. How many stickers are in 7 packs?", answer: 35 },
  { prompt: "Each box holds 10 pencils. How many pencils are in 6 boxes?", answer: 60 },
  { prompt: "A tricycle has 3 wheels. How many wheels do 8 tricycles have?", answer: 24 },
  { prompt: "Gloves come in pairs. How many gloves are in 11 pairs?", answer: 22 },
  { prompt: "Each bag holds 10 marbles. How many marbles are in 9 bags?", answer: 90 },
  { prompt: "A starfish has 5 arms. How many arms do 6 starfish have?", answer: 30 },
];

function CountingInStepsOf235And10Challenge4({ onComplete }) {
  const questions = useMemo(
    () => shuffle(PROBLEMS, Math.random).slice(0, 6),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count in steps to solve the problem."
      render={({ question, submit, locked, index }) => (
        <WordProblem
          key={index}
          question={question}
          submit={submit}
          locked={locked}
        />
      )}
    />
  );
}

function WordProblem({ question, submit, locked }) {
  const [value, setValue] = useState("");

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

      <NumberInput
        label="My answer is"
        value={value}
        onChange={setValue}
        disabled={locked}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || value === ""}
        onClick={() => submit(Number(value) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingInStepsOf235And10Challenge4;
