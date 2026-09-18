import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import CoinTray from "../../../../../../components/challenge/CoinTray";
import { formatMoney, isValidCoinCombination } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 2 - make the amount.
 *
 * Statutory: "combine amounts to make a particular value". ANY combination
 * that reaches the target is accepted, not just the fewest coins — the next
 * challenge is built on exactly that freedom.
 */

const TARGETS = [7, 23, 45, 60, 85, 99];

function StandardUnitsOfMoneyChallenge2({ onComplete }) {
  const questions = useMemo(
    () => shuffle(TARGETS, Math.random).map((target) => ({ target })),
    []
  );

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Tap coins until they add up."
      render={({ question, submit, locked, index }) => (
        <MakeAmount key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

function MakeAmount({ question, submit, locked }) {
  const [picked, setPicked] = useState([]);

  return (
    <>
      <p className="challenge-prompt">
        Make <strong>{formatMoney(question.target)}</strong>.
      </p>

      <CoinTray
        picked={picked}
        target={question.target}
        disabled={locked}
        onPick={(coin) => setPicked((prev) => [...prev, coin])}
        onRemove={(index) => setPicked((prev) => prev.filter((_, i) => i !== index))}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || picked.length === 0}
        onClick={() => submit(isValidCoinCombination(picked, question.target))}
      >
        Check my answer
      </button>
    </>
  );
}

export default StandardUnitsOfMoneyChallenge2;
