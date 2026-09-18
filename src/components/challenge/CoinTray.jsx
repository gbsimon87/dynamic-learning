import { COINS, formatMoney, totalOf } from "../../data/challenges/measurement";
import "./challenge-kit.css";

/**
 * Real UK coins to tap, with a running total.
 *
 * Tapping a coin adds it; tapping one already picked takes it back. No drag
 * anywhere — money is fiddly enough without it, and a 6-year-old counting
 * 20p + 20p + 5p + 2p should not also be fighting a pointer.
 *
 * The total updates as coins are added because the statutory skill is
 * "combine amounts to make a particular value", which means seeing the amount
 * grow towards the target.
 */
function CoinTray({ picked, onPick, onRemove, disabled, target }) {
  const total = totalOf(picked);

  return (
    <div className="coin-tray">
      <div className="coin-row">
        {COINS.map((coin) => (
          <button
            key={coin}
            type="button"
            className={`coin coin-${coin}`}
            disabled={disabled}
            onClick={() => onPick(coin)}
            aria-label={`Add ${formatMoney(coin)}`}
          >
            {formatMoney(coin)}
          </button>
        ))}
      </div>

      <div className="coin-picked" aria-label="Coins you have picked">
        {picked.length === 0 ? (
          <p className="coin-empty">Tap the coins you need.</p>
        ) : (
          picked.map((coin, i) => (
            <button
              key={`${coin}-${i}`}
              type="button"
              className={`coin picked coin-${coin}`}
              disabled={disabled}
              onClick={() => onRemove(i)}
              aria-label={`Remove ${formatMoney(coin)}`}
            >
              {formatMoney(coin)}
            </button>
          ))
        )}
      </div>

      <p className={`coin-total ${target != null && total === target ? "matched" : ""}`}>
        Total: <strong>{formatMoney(total)}</strong>
        {target != null && ` — you need ${formatMoney(target)}`}
      </p>
    </div>
  );
}

export default CoinTray;
