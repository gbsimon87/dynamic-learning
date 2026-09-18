import { symbolCount } from "../../data/challenges/statistics";
import "./challenge-kit.css";

/**
 * A pictogram with a key — the one chart that carries many-to-one
 * correspondence, which is the part of the guidance Year 2 is asked for:
 * "using many-to-one correspondence in pictograms with simple ratios 2, 5, 10".
 *
 * The key sits above the rows and never moves, because a pictogram read
 * without its key is just a row of pictures. Symbol counts come from the
 * tested `symbolCount`, so a row can never draw a different number of
 * symbols than the challenge is checking.
 *
 * Read-only by default. Pass `onStepSymbols` and each row gains −/+ controls,
 * which is how a learner *constructs* one.
 *
 * Those controls report a STEP (+1 or −1), never a new total. A total worked
 * out here would be worked out from this render's props, and two fast taps
 * land in one React batch — the second would overwrite the first instead of
 * adding to it, exactly the bug the number keypad had. The challenge applies
 * the step to its own previous state.
 */
function PictogramChart({ rows, ratio, symbol, highlight, onStepSymbols, maxSymbols = 8, disabled }) {
  const editable = typeof onStepSymbols === "function";

  return (
    <div className="pictogram">
      <p className="pictogram-key">
        Key: <span className="pictogram-symbol">{symbol}</span> = {ratio}
      </p>

      <table className="pictogram-table">
        <tbody>
          {rows.map((row) => {
            const count = symbolCount(row.value, ratio);
            return (
              <tr
                key={row.label}
                className={highlight === row.label ? "highlight" : ""}
              >
                <th scope="row" className="pictogram-label">
                  {row.label}
                </th>
                <td className="pictogram-symbols">
                  {/* One cell per symbol so the row reads as countable
                      objects rather than as a bar of unknown length. */}
                  {Array.from({ length: count }, (_, i) => (
                    <span key={i} className="pictogram-symbol">
                      {symbol}
                    </span>
                  ))}
                  {count === 0 && <span className="pictogram-empty">none</span>}
                </td>
                {editable && (
                  <td className="pictogram-controls">
                    <button
                      type="button"
                      className="chart-step-btn"
                      aria-label={`Take a ${symbol} away from ${row.label}`}
                      disabled={disabled || count === 0}
                      onClick={() => onStepSymbols(row.label, -1)}
                    >
                      −
                    </button>
                    <button
                      type="button"
                      className="chart-step-btn"
                      aria-label={`Add a ${symbol} to ${row.label}`}
                      disabled={disabled || count >= maxSymbols}
                      onClick={() => onStepSymbols(row.label, 1)}
                    >
                      +
                    </button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default PictogramChart;
