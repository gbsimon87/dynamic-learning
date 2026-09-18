import { axisTicks } from "../../data/challenges/statistics";
import "./challenge-kit.css";

/**
 * A block diagram: one stack of blocks per category, against a labelled axis.
 *
 * Blocks, not bars. A Year 2 block diagram is countable squares sitting on a
 * scale, and drawing it as a smooth bar would let a learner read a height
 * they cannot count. Every slot up to the top of the axis is rendered, so an
 * empty column still shows how far it could go.
 *
 * Read-only by default. Pass `onSetValue` and every slot becomes a button:
 * tapping a slot sets the column to that height, tapping the current top
 * takes it back down — which is how you build a column with one tap instead
 * of counting +1 eight times.
 */
function BlockDiagram({ rows, max, step = 1, onSetValue, disabled, highlight }) {
  const ticks = axisTicks(max, step);
  const top = ticks[ticks.length - 1];
  const editable = typeof onSetValue === "function";

  // Top slot first, so the DOM order matches what you see going down.
  const slots = Array.from({ length: top }, (_, i) => top - i);

  return (
    <div className="block-diagram">
      <div className="block-axis" aria-hidden="true">
        {[...ticks].reverse().map((tick) => (
          <span key={tick} className="block-tick">
            {tick}
          </span>
        ))}
      </div>

      <div className="block-columns">
        {rows.map((row) => (
          <div
            key={row.label}
            className={`block-column ${highlight === row.label ? "highlight" : ""}`}
          >
            <div className="block-stack">
              {slots.map((height) =>
                editable ? (
                  <button
                    key={height}
                    type="button"
                    className={`block-slot ${row.value >= height ? "filled" : ""}`}
                    aria-label={`Set ${row.label} to ${height}`}
                    disabled={disabled}
                    onClick={() =>
                      onSetValue(row.label, row.value === height ? height - 1 : height)
                    }
                  />
                ) : (
                  <span
                    key={height}
                    className={`block-slot ${row.value >= height ? "filled" : ""}`}
                  />
                )
              )}
            </div>
            <span className="block-label">{row.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default BlockDiagram;
