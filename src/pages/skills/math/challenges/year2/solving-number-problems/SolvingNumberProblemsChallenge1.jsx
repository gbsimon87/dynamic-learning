import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { sumDistractors } from "../../../../../../data/challenges/additionAndSubtraction";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - one-step problems in words.
 *
 * Statutory: "solve problems with addition and subtraction ... involving
 * numbers, quantities and measures". The sums are small so the work is reading
 * the story and choosing the operation, not the arithmetic.
 */

const PROBLEMS = [
  { prompt: "There are 12 red apples and 7 green apples. How many apples altogether?", answer: 19 },
  { prompt: "Sam has 15 stickers. He gives 6 away. How many stickers has he left?", answer: 9 },
  { prompt: "A jug holds 20 ml. 8 ml is poured out. How much is left?", answer: 12 },
  { prompt: "A rope is 14 cm long. Another is 5 cm long. How long are they together?", answer: 19 },
  { prompt: "There are 18 children in a class. 4 go home early. How many are left?", answer: 14 },
  { prompt: "A box has 9 pencils. Another box has 8. How many pencils in total?", answer: 17 },
];

function buildQuestions(rng) {
  return shuffle(PROBLEMS, rng).map((problem) => ({
    ...problem,
    options: shuffle([problem.answer, ...sumDistractors(problem.answer, 2)], rng),
  }));
}

function SolvingNumberProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Read the problem, then choose the answer."
      render={({ question, submit, locked, index }) => (
        <WordProblem key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function WordProblem({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <p className="challenge-prompt">{question.prompt}</p>

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
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default SolvingNumberProblemsChallenge1;
