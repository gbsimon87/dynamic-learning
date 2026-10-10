import { useState } from "react";
import FreePlayShell from "../../../components/skills/FreePlayShell";
import ChoiceGrid from "../../../components/challenge/ChoiceGrid";
import CoinTray from "../../../components/challenge/CoinTray";
import { formatMoney, isValidCoinCombination, totalOf } from "../../../data/challenges/measurement";
import { makeMoneyQuestion } from "../../../data/freePlay/money";
import "./MoneyMatch.css";

/**
 * Money Match — free play with the challenge kit's UK coins.
 *
 * Count a handful of coins, or make an amount in the CoinTray. Any
 * combination that makes the amount is right: Year 2 is asked to find
 * DIFFERENT ways to make the same value. Easier and Medium never mix pounds
 * and pence in one question; Harder is Year 3's £1.35.
 */

// A tray this full is past counting; stop adding rather than overflow.
const MAX_COINS = 20;

function MoneyMatch() {
  return (
    <FreePlayShell
      title="Money Match"
      icon="🪙"
      intro="Count the coins, or tap coins to make an amount."
      makeQuestion={makeMoneyQuestion}
      render={(props) =>
        props.question.kind === "count" ? <CountCoins {...props} /> : <MakeAmount {...props} />
      }
    />
  );
}

function CountCoins({ question, submit, locked }) {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <div
        className="coin-row money-match-coins"
        role="img"
        aria-label={`Coins: ${question.coins.map(formatMoney).join(", ")}`}
      >
        {question.coins.map((coin, i) => (
          <span key={i} className={`coin coin-${coin} money-match-coin`}>
            {formatMoney(coin)}
          </span>
        ))}
      </div>

      <ChoiceGrid options={question.options} selected={selected} onSelect={setSelected} disabled={locked} />

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

function MakeAmount({ question, submit, locked }) {
  const [picked, setPicked] = useState([]);

  return (
    <>
      <CoinTray
        picked={picked}
        target={question.target}
        disabled={locked}
        onPick={(coin) => setPicked((prev) => (prev.length >= MAX_COINS ? prev : [...prev, coin]))}
        onRemove={(index) => setPicked((prev) => prev.filter((_, i) => i !== index))}
      />

      <button
        type="button"
        className="submit-btn"
        disabled={locked || totalOf(picked) === 0}
        onClick={() => submit(isValidCoinCombination(picked, question.target))}
      >
        Check my answer
      </button>
    </>
  );
}

export default MoneyMatch;
