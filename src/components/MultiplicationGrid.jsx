import React, { useState } from 'react';
import './MultiplicationGrid.css';

const MIN_VAL = 1;
const MAX_VAL = 20;

/**
 * Clamp a size input to a usable whole number.
 *
 * The `max` attribute on a number input is only a spinner hint - typing or
 * pasting `500` is accepted, and the nested render loops then built
 * 501 x 501 = 251,001 <td> elements and locked the main thread. An empty field
 * gave `parseInt('') === NaN`, and `r <= NaN` is false, so the table rendered as
 * a blank box with no explanation.
 */
function clampSize(value) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return MIN_VAL;
  return Math.min(MAX_VAL, Math.max(MIN_VAL, parsed));
}

function MultiplicationGrid() {
  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  function handleMouseEnter(r, c) {
    setHoveredRow(r);
    setHoveredCol(c);
  }

  function handleMouseLeave() {
    setHoveredRow(null);
    setHoveredCol(null);
  }

  const table = [];
  for (let r = 0; r <= rows; r++) {
    const row = [];
    for (let c = 0; c <= cols; c++) {
      if (r === 0 && c === 0) {
        row.push(<th key={`header-${r}-${c}`}></th>);
      } else if (r === 0) {
        row.push(
          <th key={`col-header-${c}`} className="header-cell">{c}</th>
        );
      } else if (c === 0) {
        row.push(
          <th key={`row-header-${r}`} className="header-cell">{r}</th>
        );
      } else {
        const result = r * c;
        const isActive = r === hoveredRow || c === hoveredCol;
        const isFocused = r === hoveredRow && c === hoveredCol;

        row.push(
          <td
            key={`cell-${r}-${c}`}
            className={`cell ${isActive ? 'highlight' : ''} ${isFocused ? 'focus' : ''}`}
            onMouseEnter={() => handleMouseEnter(r, c)}
            onMouseLeave={handleMouseLeave}
          >
            {result}
          </td>
        );
      }
    }
    table.push(<tr key={`row-${r}`}>{row}</tr>);
  }

  const showCalculation =
    hoveredRow !== null && hoveredCol !== null
      ? `${hoveredRow} × ${hoveredCol} = ${hoveredRow * hoveredCol}`
      : '';

  return (
    <div className="multiplication-panel">
      <div className="config-row">
        <label>
          Rows:
          <input
            type="number"
            min={MIN_VAL}
            max={MAX_VAL}
            value={rows}
            onChange={(e) => setRows(clampSize(e.target.value))}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            min={MIN_VAL}
            max={MAX_VAL}
            value={cols}
            onChange={(e) => setCols(clampSize(e.target.value))}
          />
        </label>
      </div>

      <div className="table-wrapper">
        <table className="multiplication-table">
          <tbody>{table}</tbody>
        </table>
      </div>

      {showCalculation && (
        <div className="calculation-display">
          {showCalculation}
        </div>
      )}
    </div>
  );
}

export default MultiplicationGrid;
