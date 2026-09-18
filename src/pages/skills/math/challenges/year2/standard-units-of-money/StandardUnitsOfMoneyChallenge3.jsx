import { useMemo, useState } from "react";
import ChallengeShell from "../../../../../../components/challenge/ChallengeShell";
import CoinTray from "../../../../../../components/challenge/CoinTray";
import { formatMoney, isValidCoinCombination, totalOf } from "../../../../../../data/challenges/measurement";
import { shuffle } from "../../../../../../data/challenges/countingInSteps";

/**
 * Challenge 3 - make the same amount a different way.
 *
 * Statutory: "find DIFFERENT combinations of coins that equal the same
 * amounts of money". One way is shown and the learner must find another, so
 * repeating what is on screen is rejected even though it adds up correctly.
 */

const PLANS = [
  { target: 50, shown: [20, 20, 10] },
  { target: 30, shown: [20, 10] },
  { target: 40, shown: [20, 20] },
  { target: 25, shown: [20, 5] },
  { target: 70, shown: [50, 20] },
  { target: 35, shown: [20, 10, 5] },
];

function StandardUnitsOfMoneyChallenge3({ onComplete }) {
  const questions = useMemo(() => shuffle(PLANS, Math.random), []);

  return (
    <ChallengeShell
      questions={questions}
      onComplete={onComplete}
      title="Same amount, different coins."
      render={({ question, submit, locked, index }) => (
        <AnotherWay key={index} question={question} submit={submit} locked={locked} />
      )}
    />
  );
}

/** Same coins in any order counts as the same way. */
function sameCombination(a, b) {
  if (a.length !== b.length) return false;
  const sortNum = (list) => [...list].sort((x, y) => x - y);
  return sortNum(a).every((coin, i) => coin === sortNum(b)[i]);
}

function AnotherWay({ question, submit, locked }) {
  const [picked, setPicked] = useState([]);

  return (
    <>
      <p className="challenge-prompt">
        Here is one way to make {formatMoney(question.target)}:{" "}
        <strong>{question.shown.map(formatMoney).join(" + ")}</strong>. Find a
        different way.
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
        disabled={locked || totalOf(picked) === 0}
        onClick={() =>
          submit(
            isValidCoinCombination(picked, question.target) &&
              !sameCombination(picked, question.shown)
          )
        }
      >
        Check my answer
      </button>
    </>
  );
}

export default StandardUnitsOfMoneyChallenge3;
