import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import ChoiceGrid from "../../../../../../components/challenge/ChoiceGrid";
import { buildAddPricesQuestions } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 1 - buying two things.
 *
 * Adding two prices, all in pence. Options are written as money, so the p is
 * part of the answer rather than an afterthought. Prices are fresh each
 * attempt: three sums need no carrying, then three do. Wrong options are
 * near-misses — 1, 2 or 10p out, as when a carried ten is lost.
 */

function MoneyProblemsChallenge1({ onComplete }) {
  const questions = useMemo(() => buildAddPricesQuestions(Math.random), []);

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
        onClick={() => submit(selected === question.answer)}
      >
        Check my answer
      </button>
    </>
  );
}

export default MoneyProblemsChallenge1;
