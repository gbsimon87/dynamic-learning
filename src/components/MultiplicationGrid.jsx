import React, { useState } from 'react';
import './MultiplicationGrid.css';

function MultiplicationGrid() {
  console.log(`MultiplicationGrid is running`);

  const [rows, setRows] = useState(10);
  const [cols, setCols] = useState(10);
  const [hoveredRow, setHoveredRow] = useState(null);
  const [hoveredCol, setHoveredCol] = useState(null);

  const maxVal = 20;

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

  const showCalculation = hoveredRow && hoveredCol
    ? `${hoveredRow} × ${hoveredCol} = ${hoveredRow * hoveredCol}`
    : '';

  console.log(`MultiplicationGrid has run with rows: ${rows}, cols: ${cols}`);

  return (
    <div className="multiplication-panel">
      <div className="config-row">
        <label>
          Rows:
          <input
            type="number"
            min="1"
            max={maxVal}
            value={rows}
            onChange={(e) => setRows(parseInt(e.target.value))}
          />
        </label>
        <label>
          Columns:
          <input
            type="number"
            min="1"
            max={maxVal}
            value={cols}
            onChange={(e) => setCols(parseInt(e.target.value))}
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
