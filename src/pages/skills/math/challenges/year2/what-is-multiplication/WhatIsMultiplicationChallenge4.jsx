import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import NumberInput from "../../../../../../components/challenge/NumberInput";
import { isCorrectNumber } from "../../../../../../data/challenges/numbersAndCounting";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 4 - equal groups in a story, typed.
 *
 * Nothing is drawn and nothing is offered, so the learner has to spot that
 * "each" means equal groups and decide what to multiply. Every answer comes
 * from a 2, 5 or 10 fact.
 */
const PROBLEMS = [
  { prompt: "There are 5 bags. Each bag holds 4 apples. How many apples altogether?", answer: 20 },
  { prompt: "A box holds 10 crayons. How many crayons are in 3 boxes?", answer: 30 },
  { prompt: "Each child has 2 shoes. How many shoes do 8 children have?", answer: 16 },
  { prompt: "There are 4 tables with 5 chairs at each table. How many chairs?", answer: 20 },
  { prompt: "A pack has 10 stickers. How many stickers are in 7 packs?", answer: 70 },
  { prompt: "Each flower has 5 petals. How many petals do 6 flowers have?", answer: 30 },
  { prompt: "There are 9 pairs of socks. How many socks altogether?", answer: 18 },
  { prompt: "A tray holds 5 cakes. How many cakes are on 8 trays?", answer: 40 },
];

function WhatIsMultiplicationChallenge4({ onComplete }) {
  const questions = useMemo(() => shuffle(PROBLEMS, Math.random).slice(0, 6), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Equal groups — multiply to find the total."
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

export default WhatIsMultiplicationChallenge4;
