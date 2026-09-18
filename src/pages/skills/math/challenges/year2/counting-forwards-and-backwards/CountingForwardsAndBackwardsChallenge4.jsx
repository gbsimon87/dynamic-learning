import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - counting on and back inside a story, typed.
 *
 * Whether to count forwards or backwards has to be read out of the sentence,
 * and every answer crosses a tens boundary. Two of them count on from a total
 * rather than to one, which is the shape children find hardest.
 */
const PROBLEMS = [
  { prompt: "There are 68 cars in a car park. 5 more drive in. How many cars now?", answer: 73 },
  { prompt: "A tower has 41 bricks. 4 fall off. How many bricks are left?", answer: 37 },
  { prompt: "Ella is on step 27. She climbs 6 more steps. Which step is she on?", answer: 33 },
  { prompt: "A shop had 92 apples. 5 were sold. How many apples are left?", answer: 87 },
  { prompt: "There are 18 fish in a tank. 4 more are added. How many fish now?", answer: 22 },
  { prompt: "A book has 60 pages. Tom has 3 left to read. Which page is he on?", answer: 57 },
  { prompt: "A bus had 49 people. 5 more got on. How many people are on the bus?", answer: 54 },
  { prompt: "There are 81 seeds in a pot. 4 do not grow. How many grow?", answer: 77 },
];

function CountingForwardsAndBackwardsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Count on or back to solve it."
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

export default CountingForwardsAndBackwardsChallenge4;
