import "./english-kit.css";

/**
 * Build a word or a sentence from tiles: tap a tile in the tray to add it to
 * the end of the answer, tap a placed tile to send it back.
 *
 * Tap-to-place rather than drag: it needs no fine motor control, works the
 * same with a finger, a mouse or the keyboard (every tile is a button), and
 * cannot drop a tile in the wrong place by accident.
 *
 * `tiles`     [{ id, label }], the whole set, in tray order
 * `placed`    ids in answer order (the caller's state)
 * `onChange`  receives an UPDATER, `prev => next`, so two quick taps in one
 *             React batch both land (see NumberInput)
 * `kind`      "letters" packs tiles tightly into a word; "words" spaces them
 *             as a sentence
 * `fixed`     optional { before, after } text shown around the answer, for a
 *             root word the child adds a prefix or suffix to
 */
function TileBuilder({ tiles, placed, onChange, disabled, kind = "words", fixed = null, label = "Your answer" }) {
  const byId = new Map(tiles.map((tile) => [tile.id, tile]));
  const placedSet = new Set(placed);

  const add = (id) => onChange((prev) => (prev.includes(id) ? prev : [...prev, id]));
  const remove = (id) => onChange((prev) => prev.filter((item) => item !== id));

  return (
    <div className={`tile-builder is-${kind}`}>
      <div className="tile-answer" role="group" aria-label={label}>
        {fixed?.before && <span className="tile-fixed">{fixed.before}</span>}
        {placed.length === 0 && !fixed && (
          <span className="tile-answer-empty">Tap the tiles below</span>
        )}
        {placed.map((id) => (
          <button
            key={id}
            type="button"
            className="tile-answer-slot tile is-placed"
            disabled={disabled}
            onClick={() => remove(id)}
            aria-label={`${byId.get(id)?.label}, tap to take it back`}
          >
            {byId.get(id)?.label}
          </button>
        ))}
        {fixed && placed.length === 0 && <span className="tile-gap" aria-hidden="true">?</span>}
        {fixed?.after && <span className="tile-fixed">{fixed.after}</span>}
      </div>

      <div className="tile-tray" role="group" aria-label="Tiles to use">
        {tiles.map((tile) => (
          <button
            key={tile.id}
            type="button"
            className={`tile-tray-slot tile ${placedSet.has(tile.id) ? "is-used" : ""}`}
            disabled={disabled || placedSet.has(tile.id)}
            onClick={() => add(tile.id)}
          >
            {tile.label}
          </button>
        ))}
      </div>
    </div>
  );
}

export default TileBuilder;
