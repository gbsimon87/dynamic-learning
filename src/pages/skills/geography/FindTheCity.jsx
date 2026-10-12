import React, { useState, useEffect, useCallback } from 'react';
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
import './FindTheCity.css';

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

export default function FindTheCity() {
  const [started, setStarted] = useState(false);
  const [pool, setPool] = useState([]);
  const [current, setCurrent] = useState(null);
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(0);
  // Where the child tapped (with the distance), and whether they asked for the hint.
  const [guess, setGuess] = useState(null);
  const [showHint, setShowHint] = useState(false);

  // ---- Hooks ----
  useEffect(() => {
    setPool(shuffle(cities));
  }, []);

  // ---- Handlers ----
  function startGame() {
    setStarted(true);
    setScore(0);
    setTotal(0);
    loadNext();
  }

  // No auto-advance: "Next city" leaves time to read the distance and look at the line.
  const loadNext = useCallback(() => {
    setGuess(null);
    setShowHint(false);
    if (pool.length === 0) {
      setCurrent(null);
      return;
    }
    const [next, ...rest] = pool;
    setCurrent(next);
    setPool(rest);
    setTotal(t => t + 1);
  }, [pool]);

  function handleGuess(point) {
    if (guess !== null) return;
    const km = distanceKm(point, current.coordinates);
    const found = isFound(km);
    setGuess({ point, cityPoint: nearestCopy(current.coordinates, point), km, found });
    if (found) setScore(s => s + 1);
  }

  // ---- Render ----
  if (!started) {
    return (
      <div className="find-the-city">
        <h2>Find the City</h2>
        <p className="intro">Tap the map where you think each city is.</p>
        <button onClick={startGame} className="startBtn">
          Start Game
        </button>
      </div>
    );
  }

  if (current === null) {
    return (
      <div className="find-the-city">
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

  return (
    <div className="find-the-city">
      <div className="score">
        Score: {score} / {total}
      </div>

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
              {guess.found
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
          <MapClicks onGuess={handleGuess} />
          <FitToGuess guess={guess} />
          {guess && (
            <>
              <Polyline
                positions={[guess.point, guess.cityPoint]}
                pathOptions={{ className: 'guessLine', dashArray: '8 8' }}
              >
                {/* On a close tap the line is too short to label - the
                    label would cover both dots. The status row has it. */}
                {!guess.found && (
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
    </div>
  );
}
