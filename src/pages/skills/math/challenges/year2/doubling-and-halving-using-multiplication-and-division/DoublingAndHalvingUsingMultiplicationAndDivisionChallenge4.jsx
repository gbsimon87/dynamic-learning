import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - doubling and halving inside stories, typed.
 *
 * Which one is needed has to be read out of the sentence, and half the
 * problems use "half of" rather than "÷ 2" so the fraction language and the
 * division are the same move.
 */
const PROBLEMS = [
  { prompt: "A ribbon is 36 cm long. It is cut in half. How long is each piece?", answer: 18 },
  { prompt: "Sam has 14 marbles. Ana has double that. How many has Ana?", answer: 28 },
  { prompt: "There are 50 sweets. Half are eaten. How many are left?", answer: 25 },
  { prompt: "A jug holds 30 ml. A bigger jug holds double. How much does it hold?", answer: 60 },
  { prompt: "60 children are split into 2 equal teams. How many in each team?", answer: 30 },
  { prompt: "A book has 24 pages. Tom has read half. How many pages has he read?", answer: 12 },
  { prompt: "A plank is 45 cm. Another is double the length. How long is it?", answer: 90 },
  { prompt: "There are 70 beads. Half are blue. How many are blue?", answer: 35 },
];

function DoublingAndHalvingUsingMultiplicationAndDivisionChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Double it or halve it?"
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

export default DoublingAndHalvingUsingMultiplicationAndDivisionChallenge4;
