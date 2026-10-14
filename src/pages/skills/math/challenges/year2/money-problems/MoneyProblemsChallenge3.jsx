import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import CoinTray from "../../../../../../components/challenge/CoinTray";
import { buildCountChangeQuestions, formatMoney, isValidCoinCombination } from "../../../../../../data/challenges/measurement";

/**
 * Challenge 3 - count out the change.
 *
 * Working out that the change is 35p is one thing; handing over coins that
 * make 35p is another, and it is the one a shopkeeper actually does. Any
 * combination reaching the amount is accepted. Payment is one coin (20p,
 * 50p or £1) and the prices are fresh each attempt.
 */

function MoneyProblemsChallenge3({ onComplete }) {
  const questions = useMemo(() => buildCountChangeQuestions(Math.random), []);

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
        Something costs <strong>{formatMoney(question.cost)}</strong>. It is
        paid for with <strong>{question.payWords}</strong>. Tap the coins to
        give the right change.
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
