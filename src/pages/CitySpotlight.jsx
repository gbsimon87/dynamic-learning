import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import cities from '../data/cities.json';
import './CitySpotlight.css';

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function CitySpotlight() {
  const [mode, setMode] = useState('image');
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

  useEffect(() => {
    if (started && current && selected !== null) {
      const timer = setTimeout(() => nextRound(), 1500);
      return () => clearTimeout(timer);
    }
  }, [started, selected, current]);

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

  function loadNext() {
    if (pool.length === 0) {
      setCurrent(null);
      return;
    }
    const [next, ...rest] = pool;
    setCurrent(next);
    setPool(rest);
    setSelected(null);
    setTotal(t => t + 1);
  }

  function nextRound() {
    loadNext();
  }

  function handleSelect(answerName) {
    if (selected !== null) return;
    setSelected(answerName);
    if (answerName === current.name) setScore(s => s + 1);
  }

  // ---- Render ----
  if (!started) {
    return (
      <div className="wrapper">
        <h2>City Spotlight</h2>
        <div className="settingsGroup">
          <label>Select mode:</label>
          <select value={mode} onChange={e => setMode(e.target.value)}>
            <option value="image">Match the Picture</option>
            <option value="map">Find the City on Map</option>
          </select>
        </div>
        <button onClick={startGame} className="startBtn">
          Start Game
        </button>
      </div>
    );
  }

  if (current === null) {
    return (
      <div className="wrapper">
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
    <div className="wrapper">
      <div className="score">
        Score: {score} / {total}
      </div>

      {mode === 'image' && (
        <>
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
        </>
      )}

      {mode === 'map' && (
        <>
          <h2 className="prompt">Find {current.name}!</h2>
          <div className="mapContainer">
            <MapContainer
              center={[20, 0]}
              zoom={2}
              style={{ height: 400, width: '100%' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              {selected && (
                <Marker position={current.coordinates}>
                  <Popup>{current.name}</Popup>
                </Marker>
              )}
            </MapContainer>
            <div className="hint">{current.hint}</div>
          </div>
          <div className="info">
            {selected === null
              ? 'Tap the map where you think it is'
              : selected === current.name
                ? '✅ Correct!'
                : `✗ Wrong, that was ${current.name}`}
          </div>
        </>
      )}
    </div>
  );
}
