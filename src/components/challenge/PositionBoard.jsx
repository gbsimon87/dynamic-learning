import "./challenge-kit.css";

/**
 * A small grid of objects, for talking about where things are.
 *
 * The statutory sentence asks pupils to "describe POSITION, direction and
 * movement", and position is the half that turns and patterns never reach.
 * Objects are emoji rather than shapes so the vocabulary question is about
 * where a thing is, not what it is.
 */
function PositionBoard({ size, objects, highlight, label }) {
  const cells = [];
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) cells.push({ x, y });
  }

  const at = (x, y) => objects.find((o) => o.x === x && o.y === y);

  return (
    <div
      className="position-board"
      style={{ gridTemplateColumns: `repeat(${size}, 1fr)` }}
      role="img"
      aria-label={label ?? "a grid of objects"}
    >
      {cells.map(({ x, y }) => {
        const object = at(x, y);
        const isHighlighted =
          highlight && highlight.x === x && highlight.y === y;
        return (
          <div
            key={`${x}-${y}`}
            className={`position-cell ${isHighlighted ? "highlight" : ""}`}
          >
            {object && <span className="position-object">{object.emoji}</span>}
          </div>
        );
      })}
    </div>
  );
}

export default PositionBoard;
