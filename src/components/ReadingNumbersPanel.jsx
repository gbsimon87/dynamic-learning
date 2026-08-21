import React, { useState } from 'react';
import writtenNumber from 'written-number';
import './ReadingNumbersPanel.css';

const MAX_ALLOWED = 775840;

const MIN_ALLOWED = 1;

// Clamp to 1..MAX_ALLOWED. `parseInt(v) || 0` used to let a cleared field
// become 0, contradicting the advertised min of 1.
function clampBound(value) {
  const parsed = parseInt(value, 10);
  if (Number.isNaN(parsed)) return MIN_ALLOWED;
  return Math.min(Math.max(parsed, MIN_ALLOWED), MAX_ALLOWED);
}

function ReadingNumbersPanel() {
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [displayMode, setDisplayMode] = useState('both'); // number | text | both
  const [generated, setGenerated] = useState(null);

  // Keep the bounds ordered: min > max made the range expression negative, so
  // the generated number ignored the stated range entirely.
  function handleMinChange(value) {
    const next = clampBound(value);
    setMin(next);
    setMax((prev) => Math.max(prev, next));
  }

  function handleMaxChange(value) {
    const next = clampBound(value);
    setMax(next);
    setMin((prev) => Math.min(prev, next));
  }

  function handleGenerate() {
    // Defensive ordering.
    const lo = Math.min(min, max);
    const hi = Math.max(min, max);
    setGenerated(Math.floor(Math.random() * (hi - lo + 1)) + lo);
  }

  const written = generated !== null ? writtenNumber(generated) : '';

  return (
    <div className="counting-panel">
      <div className="input-row">
        <div className="range-group">
          <label>Min:</label>
          <input type="number" min="1" max={MAX_ALLOWED} value={min} onChange={(e) => handleMinChange(e.target.value)} />
        </div>
        <div className="range-group">
          <label>Max:</label>
          <input type="number" min="1" max={MAX_ALLOWED} value={max} onChange={(e) => handleMaxChange(e.target.value)} />
        </div>
      </div>

      <div className="display-mode">
        <label>
          <input
            type="radio"
            value="number"
            checked={displayMode === 'number'}
            onChange={() => setDisplayMode('number')}
          />
          Number
        </label>
        <label>
          <input
            type="radio"
            value="text"
            checked={displayMode === 'text'}
            onChange={() => setDisplayMode('text')}
          />
          Written
        </label>
        <label>
          <input
            type="radio"
            value="both"
            checked={displayMode === 'both'}
            onChange={() => setDisplayMode('both')}
          />
          Both
        </label>
      </div>

      <button className="clock-btn" onClick={handleGenerate}>Generate</button>

      {generated !== null && (
        <div className="output-box">
          {displayMode === 'number' && <div className="output-number">{generated}</div>}
          {displayMode === 'text' && <div className="output-text">{written}</div>}
          {displayMode === 'both' && (
            <>
              <div className="output-number">{generated}</div>
              <div className="output-text">{written}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default ReadingNumbersPanel;
