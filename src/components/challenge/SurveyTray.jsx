import "./challenge-kit.css";

/**
 * A jumbled pile of collected things — data before anybody organised it.
 *
 * This is the one Statistics game that is not a chart, and it is what makes
 * "ask and answer simple questions by counting the number of objects in each
 * category" askable: the learner has to do the counting and sorting that
 * every other game hands them already done.
 *
 * The scatter is deterministic, derived from each item's index rather than
 * Math.random, so the pile does not leap about on re-render — a child
 * half-way through counting would lose their place.
 *
 * Pass `onToggle` and each object becomes a button that can be ticked off as
 * it is counted, which is how you count 14 things at six years old without
 * starting again.
 */

/** Stable pseudo-jitter: same index, same offset, every render. */
function jitter(index, seed) {
  const n = Math.sin((index + 1) * seed) * 10000;
  return n - Math.floor(n);
}

function SurveyTray({ items, counted, onToggle, disabled, label }) {
  const tickable = typeof onToggle === "function";

  return (
    <div className="survey-tray" role="group" aria-label={label ?? "things we collected"}>
      {items.map((item, index) => {
        const isCounted = Boolean(counted?.has(index));
        const style = {
          transform: `translate(${(jitter(index, 12.9898) - 0.5) * 14}px, ${
            (jitter(index, 78.233) - 0.5) * 14
          }px) rotate(${(jitter(index, 43.758) - 0.5) * 24}deg)`,
        };

        return tickable ? (
          <button
            key={index}
            type="button"
            className={`survey-item ${isCounted ? "counted" : ""}`}
            style={style}
            aria-pressed={isCounted}
            aria-label={`${item} ${isCounted ? "(counted)" : ""}`}
            disabled={disabled}
            onClick={() => onToggle(index)}
          >
            {item}
          </button>
        ) : (
          <span key={index} className="survey-item" style={style} role="img" aria-label={item}>
            {item}
          </span>
        );
      })}
    </div>
  );
}

export default SurveyTray;
