import { tallyGroups } from "../../data/challenges/statistics";
import "./challenge-kit.css";

/**
 * Tally marks drawn as real gates of five: four uprights with the fifth
 * struck across them. That grouping IS the skill — a learner counts 5, 10,
 * then the leftovers, rather than counting every stroke.
 *
 * Grouping comes from the tested `tallyGroups`, so the marks on screen and
 * the count being checked cannot drift apart.
 *
 * Read-only by default. Pass `onStepCount` for the construct half: each row
 * gains a mark / rub-out pair.
 *
 * Those controls report a STEP (+1 or −1), never a new total — see
 * PictogramChart for why a total computed from this render's props loses a
 * fast second tap.
 */
function TallyChart({ rows, highlight, onStepCount, max = 20, disabled, showCounts = false }) {
  const editable = typeof onStepCount === "function";

  return (
    <table className="tally-chart">
      <tbody>
        {rows.map((row) => {
          const groups = tallyGroups(row.value);
          return (
            <tr key={row.label} className={highlight === row.label ? "highlight" : ""}>
              <th scope="row" className="tally-label">
                {row.label}
              </th>
              <td className="tally-marks">
                {groups.map((size, groupIndex) => (
                  <span
                    key={groupIndex}
                    className={`tally-group ${size === 5 ? "gate" : ""}`}
                    aria-hidden="true"
                  >
                    {Array.from({ length: Math.min(size, 4) }, (_, i) => (
                      <i key={i} className="tally-mark" />
                    ))}
                    {size === 5 && <i className="tally-mark across" />}
                  </span>
                ))}
                {row.value === 0 && <span className="pictogram-empty">none</span>}
              </td>
              {/* The count gets its own cell so the numbers line up down the
                  chart. Inside the marks cell it followed the last mark, and
                  every row started at a different place. The marks are
                  decorative to a screen reader, so this number is the fact
                  and is present whether or not it is shown. */}
              <td className={showCounts ? "tally-count" : "visually-hidden"}>
                {row.value}
              </td>
              {editable && (
                <td className="pictogram-controls">
                  <button
                    type="button"
                    className="chart-step-btn"
                    aria-label={`Rub out a mark from ${row.label}`}
                    disabled={disabled || row.value === 0}
                    onClick={() => onStepCount(row.label, -1)}
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="chart-step-btn"
                    aria-label={`Add a mark to ${row.label}`}
                    disabled={disabled || row.value >= max}
                    onClick={() => onStepCount(row.label, 1)}
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
  );
}

export default TallyChart;
