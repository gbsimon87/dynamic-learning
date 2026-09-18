import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - two-step problems, typed.
 *
 * Each story needs two calculations, and the first answer is not the one being
 * asked for. Nothing to choose from, so a learner who stops after one step has
 * no way to stumble onto the right answer.
 */
const PROBLEMS = [
  { prompt: "A box has 24 crayons. 6 are broken and 3 are lost. How many are still good?", answer: 15 },
  { prompt: "Mia had 30p. She spent 12p, then found 5p. How much has she now?", answer: 23 },
  { prompt: "There are 16 boys and 14 girls. 8 go to lunch. How many are left?", answer: 22 },
  { prompt: "A shelf had 40 books. 15 were borrowed and 7 returned. How many are on the shelf?", answer: 32 },
  { prompt: "Tom read 12 pages, then 9 more. The book has 30 pages. How many are left?", answer: 9 },
  { prompt: "A tin held 25 sweets. 10 were eaten, then 8 more were added. How many now?", answer: 23 },
  { prompt: "There were 18 ducks. 5 flew away and 6 arrived. How many ducks now?", answer: 19 },
  { prompt: "A jar has 50 beads. 20 are red and 15 are blue. The rest are green. How many are green?", answer: 15 },
];

function SolvingNumberProblemsChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="This one takes two steps."
      render={({ question, submit, locked, index }) => (
        <TwoStep key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function TwoStep({ question, submit, locked }) {
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

export default SolvingNumberProblemsChallenge4;
