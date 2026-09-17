import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - the jump has to be found in the story.
 *
 * Nothing states "10 more"; the learner has to read that out of the sentence
 * and type the result, so there is nothing to eliminate. Two problems run the
 * jump backwards from the answer, which is the hardest shape in this topic.
 */
const PROBLEMS = [
  { prompt: "Mia has 34 stickers. She gets 10 more. How many does she have now?", answer: 44 },
  { prompt: "There are 52 books on a shelf. 10 are taken away. How many are left?", answer: 42 },
  { prompt: "A game has 27 points. You score 1 more. What is your score?", answer: 28 },
  { prompt: "Sam counted 60 steps. He took 5 fewer than that today. How many steps?", answer: 55 },
  { prompt: "A jar holds 45 sweets. You add 10. How many sweets are in the jar?", answer: 55 },
  { prompt: "Ali has 38 cards. That is 10 more than Ben. How many cards has Ben?", answer: 28 },
  { prompt: "There are 23 ducks. 1 more arrives. How many ducks are there?", answer: 24 },
  { prompt: "A bus has 71 seats. 10 seats break. How many can still be used?", answer: 61 },
];

function CountingMoreAndLessChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read carefully, then type your answer."
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
        onClick={() => submit(Number(value) === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default CountingMoreAndLessChallenge4;
