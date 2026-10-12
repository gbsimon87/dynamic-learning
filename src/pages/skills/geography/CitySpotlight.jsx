import React, { useState, useEffect, useMemo, useCallback } from 'react';
import cities from '../../../data/cities.json';
import './CitySpotlight.css';

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// Match the picture to the city. Finding cities on a map is its own game:
// see FindTheCity.jsx.
export default function CitySpotlight() {
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState([]);
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);

  // ---- Hooks ----
  useEffect(() => {
    setPool(shuffle(cities));
  }, []);

  const options = useMemo(() => {
    if (!current) return [];
    const other = shuffle(cities.filter(c => c.name !== current.name)).slice(0, 3);
    return shuffle([...other.map(o => o.name), current.name]);
  }, [current]);

  // ---- Handlers ----
  function startGame() {
    setStarted(true);
    setScore(0);
    setTotal(0);
    setSelected(null);
    loadNext();
  }

  const loadNext = useCallback(() => {
    if (pool.length === 0) {
      setCurrent(null);
      return;
    }
    const [next, ...rest] = pool;
    setCurrent(next);
    setPool(rest);
    setSelected(null);
    setTotal(t => t + 1);
  }, [pool]);

  useEffect(() => {
    if (started && current && selected !== null) {
      const timer = setTimeout(loadNext, 1500);
      return () => clearTimeout(timer);
    }
  }, [started, selected, current, loadNext]);

  function handleSelect(answerName) {
    if (selected !== null) return;
    setSelected(answerName);
    if (answerName === current.name) setScore(s => s + 1);
  }

  // ---- Render ----
  if (!started) {
    return (
      <div className="city-spotlight">
        <h2>City Spotlight</h2>
        <p className="intro">Look at the picture and pick the city.</p>
        <button onClick={startGame} className="startBtn">
          Start Game
        </button>
      </div>
    );
  }

  if (current === null) {
    return (
      <div className="city-spotlight">
        <h2>🎉 Finished!</h2>
        <div className="score">
          Score: {score} / {total}
        </div>
        <button
          onClick={() => {
            setStarted(false);
            setPool(shuffle(cities));
          }}
          className="restartBtn"
        >
          Play Again
        </button>
      </div>
    );
  }

  // ---- Fallback-safe <picture> block ----
  function renderImage() {
    const handleError = e => {
      console.warn(`⚠️ Failed to load ${current.image}`);
      // Use a generic placeholder or hide the image
      e.currentTarget.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23ddd" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" fill="%23666"%3EImage not found%3C/text%3E%3C/svg%3E';
    };

    return (
      <img
        className="cityImage"
        src={current.image}
        alt={current.name}
        loading="lazy"
        onError={handleError}
      />
    );
  }

  return (
    <div className="city-spotlight">
      <div className="score">
        Score: {score} / {total}
      </div>

      <h2 className="prompt">{current.hint}</h2>
      {renderImage()}

      <div className="options">
        {options.map(opt => (
          <button
            key={opt}
            className={`optionBtn ${selected !== null
                ? opt === current.name
                  ? 'correct'
                  : opt === selected
                    ? 'wrong'
                    : 'dimmed'
                : ''
              }`}
            onClick={() => handleSelect(opt)}
            disabled={selected !== null}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
