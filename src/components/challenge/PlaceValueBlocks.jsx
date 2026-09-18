import "./challenge-kit.css";

/**
 * Base-ten blocks: hundred flats, ten rods and one cubes.
 *
 * Year 3 moves place value from two digits to three, and the flat is what makes
 * that concrete — a hundred you can see is a hundred ones arranged, not a digit
 * that means something different because of where it sits.
 *
 * Every piece is drawn from its own cells rather than a picture, so a learner
 * can count a rod and confirm it really is ten. Drawing a flat as a plain
 * square would give them a shape to recognise instead of a quantity to count.
 *
 * `blocks`      { hundreds, tens, ones } — what to draw
 * `onStep`      (place, delta) => void. Emits a STEP, never a total: two fast
 *               taps land in one React batch, so a component that handed back
 *               `count + 1` would silently lose the second tap. The challenge
 *               applies it with setState(prev => ...) and clamps there.
 * `highlight`   a place to draw attention to, e.g. the one being asked about
 * `exchanging`  a place currently mid-exchange, which pulses
 * `label`       accessible description of the whole picture
 */
function PlaceValueBlocks({
  blocks,
  onStep,
  highlight,
  exchanging,
  label,
  showCounts = true,
}) {
  const places = [
    { key: "hundreds", name: "hundreds", worth: 100, count: blocks.hundreds || 0 },
    { key: "tens", name: "tens", worth: 10, count: blocks.tens || 0 },
    { key: "ones", name: "ones", worth: 1, count: blocks.ones || 0 },
  ];

  return (
    <div className="pv-blocks" role="img" aria-label={label}>
      {places.map((place) => (
        <div
          key={place.key}
          className={`pv-column ${highlight === place.key ? "highlight" : ""} ${
            exchanging === place.key ? "exchanging" : ""
          }`}
        >
          <div className="pv-column-head">
            <span className="pv-place-name">{place.name}</span>
            {showCounts && <span className="pv-place-count">{place.count}</span>}
          </div>

          <div className="pv-pieces">
            {Array.from({ length: place.count }, (_, i) => (
              <Piece key={i} place={place.key} />
            ))}
            {place.count === 0 && <span className="pv-empty">none</span>}
          </div>

          {onStep && (
            <div className="pv-controls">
              <button
                type="button"
                className="pv-step-btn"
                aria-label={`Remove one ${place.name.replace(/s$/, "")}`}
                onClick={() => onStep(place.key, -1)}
                disabled={place.count === 0}
              >
                −
              </button>
              <button
                type="button"
                className="pv-step-btn"
                aria-label={`Add one ${place.name.replace(/s$/, "")}`}
                onClick={() => onStep(place.key, 1)}
              >
                +
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** One flat, rod or cube — drawn from its own cells so it can be counted. */
function Piece({ place }) {
  if (place === "hundreds") {
    return (
      <span className="pv-flat">
        {Array.from({ length: 100 }, (_, i) => (
          <span key={i} className="pv-cell" />
        ))}
      </span>
    );
  }
  if (place === "tens") {
    return (
      <span className="pv-rod">
        {Array.from({ length: 10 }, (_, i) => (
          <span key={i} className="pv-cell" />
        ))}
      </span>
    );
  }
  return <span className="pv-cube" />;
}

export default PlaceValueBlocks;
