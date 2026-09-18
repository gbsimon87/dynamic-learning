import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - multiply or divide?
 *
 * The whole difficulty of this topic is choosing the operation, so challenge 1
 * asks only that: pick the calculation, not the answer. Both operations appear
 * with the same pair of numbers, so the story must decide it.
 */

const PROBLEMS = [
  { prompt: "6 boxes hold 5 pencils each. How many pencils?", answer: "6 × 5", other: "6 ÷ 5" },
  { prompt: "20 pencils are shared between 5 boxes. How many in each box?", answer: "20 ÷ 5", other: "20 × 5" },
  { prompt: "4 bags hold 10 apples each. How many apples?", answer: "4 × 10", other: "40 ÷ 10" },
  { prompt: "30 apples are shared between 10 bags. How many in each bag?", answer: "30 ÷ 10", other: "30 × 10" },
  { prompt: "7 children have 2 hands each. How many hands?", answer: "7 × 2", other: "14 ÷ 7" },
  { prompt: "18 socks are put into pairs. How many pairs?", answer: "18 ÷ 2", other: "18 × 2" },
];

function buildQuestions(rng) {
  return shuffle(PROBLEMS, rng).map((problem) => ({
    ...problem,
    options: shuffle([problem.answer, problem.other], rng),
  }));
}

function SolvingMultiplicationAndDivisionProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Equal groups joined up, or shared out?"
      render={({ question, submit, locked, index }) => (
        <PickOperation key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickOperation({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge1;
