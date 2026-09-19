import "./challenge-kit.css";

/**
 * A scaled bar chart — read it, or build it.
 *
 * `BlockDiagram` deliberately refuses to draw smooth bars: a Year 2 block
 * diagram is countable squares, and a bar would let a learner read a height
 * they cannot count. Year 3 inverts that requirement — "understand and use
 * simple scales (2, 5, 10 units per cm)" means the learner MUST read a value
 * off a scale rather than count it. So this is its own component, not a variant.
 *
 * Gridlines are drawn at every step of the scale so a value between labels can
 * still be read off the chart rather than guessed.
 *
 * `bars`     [{ label, value }]
 * `step`     units per gridline — the scale being taught
 * `max`      top of the axis; rounded up to a whole number of steps
 * `onStep`   (label, delta) => void to build a bar. Emits a STEP of one
 *            gridline, never a total — two fast taps land in one React batch,
 *            so handing back `value + step` would lose the second tap.
 * `unit`     axis caption, e.g. "children"
 */
function BarChart({ bars, step = 1, max, onStep, unit, label, disabled = false }) {
  const ceiling = Math.max(max ?? 0, ...bars.map((b) => b.value), step);
  const top = Math.ceil(ceiling / step) * step;
  const lines = Array.from({ length: top / step + 1 }, (_, i) => i * step);

  return (
    <div className="bar-chart" role="img" aria-label={label}>
      <div className="bar-chart-plot">
        <div className="bar-chart-axis">
          {[...lines].reverse().map((value) => (
            <span key={value} className="bar-chart-tick">
              {value}
            </span>
          ))}
        </div>

        <div className="bar-chart-area">
          {/* One gridline per step: this is what makes the scale readable. */}
          <div className="bar-chart-grid" aria-hidden="true">
            {[...lines].reverse().map((value) => (
              <span key={value} className="bar-chart-gridline" />
            ))}
          </div>

          <div className="bar-chart-bars">
            {bars.map((bar) => (
              <div key={bar.label} className="bar-chart-column">
                <div
                  className="bar-chart-bar"
                  style={{ height: `${(bar.value / top) * 100}%` }}
                  title={`${bar.label}: ${bar.value}`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bar-chart-labels">
        <span className="bar-chart-axis-spacer" />
        <div className="bar-chart-label-row">
          {bars.map((bar) => (
            <div key={bar.label} className="bar-chart-label">
              <span className="bar-chart-label-text">{bar.label}</span>
              {onStep && (
                <span className="bar-chart-controls">
                  <button
                    type="button"
                    className="bar-step-btn"
                    aria-label={`Lower the ${bar.label} bar`}
                    onClick={() => onStep(bar.label, -1)}
                    disabled={disabled || bar.value === 0}
                  >
                    −
                  </button>
                  <button
                    type="button"
                    className="bar-step-btn"
                    aria-label={`Raise the ${bar.label} bar`}
                    onClick={() => onStep(bar.label, 1)}
                    disabled={disabled || bar.value >= top}
                  >
                    +
                  </button>
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {unit && <p className="bar-chart-unit">{unit}</p>}
    </div>
  );
}

export default BarChart;
