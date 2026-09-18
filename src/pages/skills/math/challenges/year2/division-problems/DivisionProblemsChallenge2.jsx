import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { divide, productDistractors } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - now work it out.
 *
 * Same shape of story as challenge 1, but the answer rather than the
 * statement. Distractors sit one group either side of the answer.
 */

const PROBLEMS = [
  { prompt: "28 crayons are shared equally between 2 tables. How many at each table?", total: 28, parts: 2 },
  { prompt: "40 stickers are shared equally between 5 children. How many each?", total: 40, parts: 5 },
  { prompt: "70 leaves are shared equally between 10 pots. How many in each pot?", total: 70, parts: 10 },
  { prompt: "22 shells are shared equally between 2 buckets. How many in each?", total: 22, parts: 2 },
  { prompt: "35 grapes are shared equally between 5 bowls. How many in each bowl?", total: 35, parts: 5 },
  { prompt: "60 beads are shared equally between 10 strings. How many on each?", total: 60, parts: 10 },
];

function buildQuestions(rng) {
  return shuffle(PROBLEMS, rng).map((problem) => {
    const answer = divide(problem.total, problem.parts);
    return {
      ...problem,
      answer,
      options: shuffle([answer, ...productDistractors(answer, 1, 2)], rng),
    };
  });
}

function DivisionProblemsChallenge2({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Share it out."
      render={({ question, submit, locked, index }) => (
        <SolveShare key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function SolveShare({ question, submit, locked }) {
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

export default DivisionProblemsChallenge2;
