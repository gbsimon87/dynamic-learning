import "./challenge-kit.css";

/**
 * Shows a two-digit calculation split into friendly chunks. In build mode the
 * chunks are large buttons so a learner can select one and type its value.
 */
function PartitionBoard({ heading, cells, values = {}, activeKey, onSelect, disabled, label }) {
  return (
    <div className="partition-board" role={onSelect ? "group" : "img"} aria-label={label}>
      <div className="partition-heading">{heading}</div>
      <div className="partition-arrow" aria-hidden="true">↓</div>
      <div className="partition-cells">
        {cells.map((cell) => {
          const editable = Boolean(onSelect);
          const shown = editable ? values[cell.key] : cell.value;
          const content = (
            <>
              <span className="partition-cell-label">{cell.label}</span>
              <strong>{shown === undefined || shown === "" ? "?" : shown}</strong>
            </>
          );

          return editable ? (
            <button
              key={cell.key}
              type="button"
              className={`partition-cell ${activeKey === cell.key ? "active" : ""}`}
              onClick={() => onSelect(cell.key)}
              disabled={disabled}
              aria-label={`${cell.label}. ${shown || "blank"}`}
            >
              {content}
            </button>
          ) : (
            <div key={cell.key} className="partition-cell">{content}</div>
          );
        })}
      </div>
      <div className="partition-total">
        {cells.map((cell) => editableValue(values[cell.key], onSelect, cell.value)).join(" + ")} = ?
      </div>
    </div>
  );
}

function editableValue(value, onSelect, fallback) {
  if (!onSelect) return fallback;
  return value === undefined || value === "" ? "?" : value;
}

export default PartitionBoard;
