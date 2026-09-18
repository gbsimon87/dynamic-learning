import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import CoinTray from "../../../../../../components/challenge/CoinTray";
import { formatMoney, isValidCoinCombination } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - count out the change.
 *
 * Working out that the change is 35p is one thing; handing over coins that
 * make 35p is another, and it is the one a shopkeeper actually does. Any
 * combination reaching the amount is accepted.
 */

const PLANS = [
  { paid: 50, cost: 15 },
  { paid: 100, cost: 60 },
  { paid: 20, cost: 5 },
  { paid: 50, cost: 30 },
  { paid: 100, cost: 25 },
  { paid: 80, cost: 50 },
];

function MoneyProblemsChallenge3({ onComplete }) {
  const questions = useMemo(
    () =>
      shuffle(PLANS, Math.random).map((plan) => ({
        ...plan,
        change: plan.paid - plan.cost,
      })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Hand over the right change."
      render={({ question, submit, locked, index }) => (
        <CountChange key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function CountChange({ question, submit, locked }) {
  const [picked, setPicked] = useState([]);

  return (
    <>
      <p className="challenge-prompt">
        Something costs <strong>{formatMoney(question.cost)}</strong> and is
        paid for with <strong>{formatMoney(question.paid)}</strong>. Tap the
        coins to give the right change.
      </p>

      <CoinTray
        picked={picked}
        disabled={locked}
        onPick={(coin) => setPicked((prev) => [...prev, coin])}
        onRemove={(index) => setPicked((prev) => prev.filter((_, i) => i !== index))}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || picked.length === 0}
        onClick={() => submit(isValidCoinCombination(picked, question.change))}
      >
        Check my answer
      </button>
    </>
  );
}

export default MoneyProblemsChallenge3;
