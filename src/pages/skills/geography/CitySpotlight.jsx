import React, { useState, useEffect, useMemo, useCallback } from 'react';
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Polyline,
  Tooltip,
  useMap,
  useMapEvents,
} from 'react-leaflet';
import cities from '../../../data/cities.json';
import { OSM_TILES } from '../../../data/osmTiles';
import { distanceKm, isFound, nearestCopy } from './cityGuess';
import './CitySpotlight.css';

const WORLD_CENTER = [20, 0];
const WORLD_ZOOM = 2;

const formatKm = km => `${km.toLocaleString('en-GB')} km`;

function shuffle(array) {
  const a = [...array];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// --- Turn a tap on the map into a guess ---
function MapClicks({ onGuess }) {
  useMapEvents({ click: e => onGuess([e.latlng.lat, e.latlng.lng]) });
  return null;
}

// --- Show both the tap and the city after a guess; back to the world after ---
function FitToGuess({ guess }) {
  const map = useMap();

  useEffect(() => {
    const animate = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!guess) {
      map.flyTo(WORLD_CENTER, WORLD_ZOOM, { animate });
      return;
    }
    map.flyToBounds([guess.point, guess.cityPoint], {
      animate,
      padding: [48, 48],
      maxZoom: 5,
    });
  }, [map, guess]);

  return null;
}

export default function CitySpotlight() {
  const [mode, setMode] = useState('image');
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState([]);
  const [current, setCurrent] = useState(null);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  // Map mode: where the child tapped, and whether they asked for the hint.
  const [guess, setGuess] = useState(null);
  const [showHint, setShowHint] = useState(false);

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
    setGuess(null);
    setShowHint(false);
    setTotal(t => t + 1);
  }, [pool]);

  // Picture mode moves on by itself. Map mode waits for "Next city" so there
  // is time to read the distance and look at the line.
  useEffect(() => {
    if (mode === 'image' && started && current && selected !== null) {
      const timer = setTimeout(loadNext, 1500);
      return () => clearTimeout(timer);
    }
  }, [mode, started, selected, current, loadNext]);

  function handleSelect(answerName) {
    if (selected !== null) return;
    setSelected(answerName);
    if (answerName === current.name) setScore(s => s + 1);
  }

  function handleMapGuess(point) {
    if (selected !== null) return;
    const km = distanceKm(point, current.coordinates);
    setGuess({ point, cityPoint: nearestCopy(current.coordinates, point), km });
    // Any non-null value other than the city's name marks a miss.
    handleSelect(isFound(km) ? current.name : 'missed');
  }

  // ---- Render ----
  if (!started) {
    return (
      <div className="city-spotlight">
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
    <div className={`city-spotlight${mode === 'map' ? ' city-spotlight--map' : ''}`}>
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

          {/* Kept above the map so the result and "Next city" stay on screen. */}
          <div className="mapStatus" aria-live="polite">
            {guess === null ? (
              <>
                <span className="info">Tap the map where you think it is</span>
                {showHint ? (
                  <span className="hintText">💡 {current.name} is in {current.country}.</span>
                ) : (
                  <button className="hintBtn" onClick={() => setShowHint(true)}>
                    💡 Show a hint
                  </button>
                )}
              </>
            ) : (
              <>
                <span className="info">
                  {selected === current.name
                    ? `✓ You found ${current.name}! Your tap was ${formatKm(guess.km)} away.`
                    : `✗ Not quite! ${current.name} is ${formatKm(guess.km)} from your tap.`}
                </span>
                <button className="nextBtn" onClick={loadNext}>
                  Next city →
                </button>
              </>
            )}
          </div>

          <div className={`mapContainer${guess ? ' answered' : ''}`}>
            <MapContainer
              center={WORLD_CENTER}
              zoom={WORLD_ZOOM}
              style={{ height: '100%', width: '100%' }}
            >
              <TileLayer {...OSM_TILES} />
              <MapClicks onGuess={handleMapGuess} />
              <FitToGuess guess={guess} />
              {guess && (
                <>
                  <Polyline
                    positions={[guess.point, guess.cityPoint]}
                    pathOptions={{ className: 'guessLine', dashArray: '8 8' }}
                  >
                    {/* On a close tap the line is too short to label - the
                        label would cover both dots. The status row has it. */}
                    {selected !== current.name && (
                      <Tooltip permanent direction="center" className="distanceLabel">
                        {formatKm(guess.km)}
                      </Tooltip>
                    )}
                  </Polyline>
                  <CircleMarker
                    center={guess.point}
                    radius={8}
                    pathOptions={{ className: 'guessDot' }}
                  />
                  <CircleMarker
                    center={guess.cityPoint}
                    radius={10}
                    pathOptions={{ className: 'cityDot' }}
                  >
                    <Tooltip permanent direction="top" offset={[0, -10]} className="cityLabel">
                      {current.name}
                    </Tooltip>
                  </CircleMarker>
                </>
              )}
            </MapContainer>
          </div>
        </>
      )}
    </div>
  );
}
