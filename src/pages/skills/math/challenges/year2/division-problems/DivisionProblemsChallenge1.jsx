import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { divide } from "../../../../../../data/challenges/multiplicationAndDivision";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - which division answers the story?
 *
 * Before calculating, the learner picks the statement. The wrong options
 * reverse the division or multiply instead, so the story has to be turned into
 * a statement rather than pattern-matched.
 */

const PROBLEMS = [
  { prompt: "24 cakes are shared equally between 2 plates.", total: 24, parts: 2 },
  { prompt: "30 pens are shared equally between 5 pots.", total: 30, parts: 5 },
  { prompt: "50 beads are shared equally between 10 jars.", total: 50, parts: 10 },
  { prompt: "18 sweets are shared equally between 2 bags.", total: 18, parts: 2 },
  { prompt: "45 cards are shared equally between 5 boxes.", total: 45, parts: 5 },
  { prompt: "20 apples are shared equally between 10 baskets.", total: 20, parts: 10 },
];

function buildQuestions(rng) {
  return shuffle(PROBLEMS, rng).map((problem) => {
    const answer = `${problem.total} ÷ ${problem.parts}`;
    return {
      ...problem,
      answer,
      result: divide(problem.total, problem.parts),
      options: shuffle(
        [
          answer,
          `${problem.parts} ÷ ${problem.total}`,
          `${problem.total} × ${problem.parts}`,
        ],
        rng
      ),
    };
  });
}

function DivisionProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Which calculation answers this?"
      render={({ question, submit, locked, index }) => (
        <PickStatement key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function PickStatement({ question, submit, locked }) {
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

export default DivisionProblemsChallenge1;
