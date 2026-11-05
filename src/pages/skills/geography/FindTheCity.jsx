import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
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
import Mascot from '../../../components/mascot/Mascot';
import SpeakButton from '../../../components/challenge/SpeakButton';
import AnswerFeedbackLine from '../../../components/skills/AnswerFeedbackLine';
import { useAnswerFeedback } from '../../../components/skills/useAnswerFeedback';
import '../../../components/challenge/challenge-kit.css';
import './FindTheCity.css';

const WORLD_CENTER = [20, 0];

// Phones show the world a size smaller so a tap lands on the whole planet,
// not a cropped slice of it.
const worldZoom = width => (width < 900 ? 1 : 2);

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

// --- Keep the map's size right as the stage flexes with the viewport ---
function KeepSize() {
  const map = useMap();
  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return undefined;
    const ro = new ResizeObserver(() => map.invalidateSize({ pan: false }));
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}

// --- Show both the tap and the city after a guess; back to the world after ---
function FitToGuess({ guess }) {
  const map = useMap();

  useEffect(() => {
    const animate = !window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (!guess) {
      map.flyTo(WORLD_CENTER, worldZoom(map.getSize().x), { animate });
      return;
    }
    map.flyToBounds([guess.point, guess.cityPoint], {
      animate,
      padding: [40, 40],
      maxZoom: 5,
    });
  }, [map, guess]);

  return null;
}

export default function FindTheCity() {
  const [deck, setDeck] = useState(() => shuffle(cities));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  // Where the child tapped (with the distance), and whether they asked for the hint.
  const [guess, setGuess] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const fb = useAnswerFeedback();
  const { clear: clearFeedback, reset: resetFeedback } = fb;
  const guessedRef = useRef(false);
  const nameRef = useRef(null);
  const movedOnRef = useRef(false);

  const current = deck[round] ?? null;

  // After "Next city" the button has gone: put focus on the new city so a
  // keyboard user is not sent back to the top of the page.
  useEffect(() => {
    if (!movedOnRef.current) return;
    movedOnRef.current = false;
    nameRef.current?.focus({ preventScroll: true });
  }, [round]);

  // No auto-advance: "Next city" leaves time to read the distance and look at the line.
  const next = useCallback(() => {
    clearFeedback();
    setGuess(null);
    setShowHint(false);
    guessedRef.current = false;
    movedOnRef.current = true;
    setRound(r => r + 1);
  }, [clearFeedback]);

  const playAgain = useCallback(() => {
    resetFeedback();
    setGuess(null);
    setShowHint(false);
    guessedRef.current = false;
    setScore(0);
    setRound(0);
    setDeck(shuffle(cities));
  }, [resetFeedback]);

  function handleGuess(point) {
    if (guessedRef.current || guess !== null || !current) return;
    guessedRef.current = true;
    const km = distanceKm(point, current.coordinates);
    const found = isFound(km);
    setGuess({ point, cityPoint: nearestCopy(current.coordinates, point), km, found });
    fb.answer(found);
    if (found) setScore(s => s + 1);
  }

  const finished = current === null;
  const mood = guess && !guess.found ? 'puzzled' : 'idle';

  return (
    <div className="ftc-shell">
      <div className="ftc">
        <header className="ftc-header">
          <Link to="/skills" className="ftc-back">
            <span aria-hidden="true">←</span>
            <span className="ftc-back-text">Back to Skills</span>
          </Link>
          <h1 className="ftc-title">
            <span aria-hidden="true">📍 </span>Find the City
          </h1>
          <p className="ftc-score" aria-label={`${score} found${finished ? '' : `, city ${round + 1} of ${deck.length}`}`}>
            <span className="ftc-score-found">⭐ <b>{score}</b></span>
            {!finished && <span className="ftc-score-round">{round + 1}/{deck.length}</span>}
          </p>
        </header>

        {finished ? (
          <section className="ftc-done" aria-live="polite">
            <Mascot className="mascot-small" cheerOn={score} decorative />
            <h2 className="ftc-done-title">All {deck.length} cities done!</h2>
            <p className="ftc-done-score">
              You found <b>{score}</b> of {deck.length}
            </p>
            <button type="button" className="ftc-btn ftc-btn-primary" onClick={playAgain}>
              Play again
            </button>
          </section>
        ) : (
          <>
            <section className="ftc-quest" aria-label="Your city">
              <div className="ftc-bix" aria-hidden="true">
                <Mascot className="mascot-small" mood={mood} cheerOn={guess?.found ? round : undefined} decorative />
              </div>

              <div className="ftc-find">
                <span className="ftc-find-label">Find</span>
                <h2 className="ftc-city" ref={nameRef} tabIndex={-1}>{current.name}</h2>
                <SpeakButton text={`Find ${current.name}. ${current.hint || ''}`} label="Hear the city clue" compact />
              </div>

              <div className="ftc-status" aria-live="polite" ref={fb.answerRef}>
                {guess === null ? (
                  <>
                    <span className="ftc-message">Tap the map where it is</span>
                    {showHint ? (
                      <span className="ftc-hint">💡 {current.name} is in {current.country}.</span>
                    ) : (
                      <button type="button" className="ftc-btn ftc-btn-quiet" onClick={() => setShowHint(true)}>
                        💡 Hint
                      </button>
                    )}
                  </>
                ) : (
                  <>
                    <AnswerFeedbackLine feedback={fb.feedback} ref={fb.feedbackRef} />
                    <span className="ftc-message ftc-result">
                      {guess.found
                        ? `You found ${current.name}! ${formatKm(guess.km)} off.`
                        : `Not quite! ${current.name} is ${formatKm(guess.km)} from your tap.`}
                    </span>
                    <button type="button" className="ftc-btn ftc-btn-primary" onClick={next}>
                      Next city →
                    </button>
                  </>
                )}
              </div>
            </section>

            <div className={`ftc-stage${guess ? ' is-answered' : ''}`}>
              <MapContainer
                className="ftc-map"
                center={WORLD_CENTER}
                zoom={worldZoom(typeof window === 'undefined' ? 1200 : window.innerWidth)}
                minZoom={1}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer {...OSM_TILES} />
                <KeepSize />
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
                    <CircleMarker center={guess.point} radius={8} pathOptions={{ className: 'guessDot' }} />
                    <CircleMarker center={guess.cityPoint} radius={10} pathOptions={{ className: 'cityDot' }}>
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
    </div>
  );
}
