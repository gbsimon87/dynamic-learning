import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { productDistractors } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - now choose the operation AND do it.
 *
 * Same mixture of stories as challenge 1, but the options are answers, so a
 * learner who picks the wrong operation lands on a plausible number rather
 * than an obviously silly one.
 */

const PROBLEMS = [
  { prompt: "5 plates hold 4 biscuits each. How many biscuits?", answer: 20, step: 4 },
  { prompt: "40 biscuits are shared between 10 plates. How many on each?", answer: 4, step: 1 },
  { prompt: "8 cars have 2 wheels drawn on each. How many wheels?", answer: 16, step: 2 },
  { prompt: "35 sweets are shared between 5 bags. How many in each bag?", answer: 7, step: 1 },
  { prompt: "9 vases hold 10 flowers each. How many flowers?", answer: 90, step: 10 },
  { prompt: "24 cakes are shared between 2 boxes. How many in each box?", answer: 12, step: 2 },
];

function buildQuestions(rng) {
  return shuffle(PROBLEMS, rng).map((problem) => ({
    ...problem,
    options: shuffle(
      [problem.answer, ...productDistractors(problem.answer, problem.step, 2)],
      rng
    ),
  }));
}

function SolvingMultiplicationAndDivisionProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Work out which one to use, then use it."
      render={({ question, submit, locked, index }) => (
        <SolveIt key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveIt({ question, submit, locked }) {
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

export default SolvingMultiplicationAndDivisionProblemsChallenge2;
