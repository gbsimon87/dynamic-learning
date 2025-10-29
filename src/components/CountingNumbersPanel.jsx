import React, { useState } from 'react';
import writtenNumber from 'written-number';
import './CountingNumbersPanel.css';

function CountingNumbersPanel() {
  console.log(`CountingNumbersPanel is running`);

  const [min, setMin] = useState(1);
  const [max, setMax] = useState(100);
  const [displayMode, setDisplayMode] = useState('both'); // number | text | both
  const [generated, setGenerated] = useState(null);

  function handleGenerate() {
    console.log(`handleGenerate is running with min: ${min}, max: ${max}`);
    const rand = Math.floor(Math.random() * (max - min + 1)) + parseInt(min);
    setGenerated(rand);
    console.log(`handleGenerate is returning ${rand}`);
  }

  const written = generated !== null ? writtenNumber(generated) : '';

  return (
    <div className="counting-panel">
      <div className="input-row">
        <div className="range-group">
          <label>Min:</label>
          <input type="number" min="1" max="1000000" value={min} onChange={(e) => setMin(e.target.value)} />
        </div>
        <div className="range-group">
          <label>Max:</label>
          <input type="number" min="1" max="1000000" value={max} onChange={(e) => setMax(e.target.value)} />
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

export default CountingNumbersPanel;
