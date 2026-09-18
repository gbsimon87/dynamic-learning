import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { formatMoney } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 1 - buying one thing.
 *
 * Adding two prices, all in pence. Options are written as money, so the p is
 * part of the answer rather than an afterthought.
 */

const PROBLEMS = [
  { prompt: "A pencil costs 15p and a rubber costs 20p. How much for both?", answer: 35 },
  { prompt: "An apple costs 25p and a banana costs 30p. How much altogether?", answer: 55 },
  { prompt: "A sticker costs 5p and a badge costs 40p. How much for both?", answer: 45 },
  { prompt: "A ruler costs 45p and a pen costs 35p. How much altogether?", answer: 80 },
  { prompt: "A cake costs 60p and a drink costs 25p. How much for both?", answer: 85 },
  { prompt: "A card costs 50p and a stamp costs 12p. How much altogether?", answer: 62 },
];

function buildQuestions(rng) {
  return shuffle(PROBLEMS, rng).map((problem) => ({
    ...problem,
    options: shuffle(
      [problem.answer, problem.answer - 10, problem.answer + 5].filter((v) => v > 0),
      rng
    ).map(formatMoney),
    answerLabel: formatMoney(problem.answer),
  }));
}

function MoneyProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildQuestions(Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Add the prices."
      render={({ question, submit, locked, index }) => (
        <BuyTwo key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function BuyTwo({ question, submit, locked }) {
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
        onClick={() => submit(selected === question.answerLabel)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MoneyProblemsChallenge1;
