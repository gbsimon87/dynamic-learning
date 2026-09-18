import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - fractions of quantities in stories, typed.
 *
 * The guidance asks for fractions "of lengths, quantities, sets of objects or
 * shapes", so these use cm, ml and money as well as counts. Two ask for what
 * is LEFT rather than what is taken, which needs the fraction and then a
 * subtraction.
 */
const PROBLEMS = [
  { prompt: "A class has 30 children. 1/3 of them are away. How many are away?", answer: 10 },
  { prompt: "A ribbon is 60 cm long. 1/4 of it is cut off. How long is the piece cut off?", answer: 15 },
  { prompt: "A jug holds 80 ml. 3/4 is poured out. How many ml are poured out?", answer: 60 },
  { prompt: "There are 40 sweets. 1/2 are eaten. How many are LEFT?", answer: 20 },
  { prompt: "A book has 100 pages. Tom has read 3/4. How many pages has he read?", answer: 75 },
  { prompt: "There are 24 apples. 1/4 are green. How many are NOT green?", answer: 18 },
  { prompt: "A bag holds 45 marbles. 1/3 are blue. How many are blue?", answer: 15 },
  { prompt: "A rope is 36 cm. 2/4 of it is used. How many cm are used?", answer: 18 },
];

function FindingFractionsOfLargerGroupsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read carefully — taken, or left over?"
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

export default FindingFractionsOfLargerGroupsChallenge4;
