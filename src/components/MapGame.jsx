import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useCallback, useEffect, useMemo, useState } from 'react';
import L from 'leaflet';

const normalizeName = str =>
  str
    ?.normalize('NFD')            // separate accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[’']/g, "'")        // unify apostrophes
    .replace(/[\s,.'"()-]/g, '')  // remove punctuation/spaces
    .toLowerCase()
    .trim();

export default function MapGame({ geoJson }) {
  // Game state
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState('Click the correct country!');
  const [revealed, setRevealed] = useState(() => new Set());
  const [isLocked, setIsLocked] = useState(false);
  const [lastWrong, setLastWrong] = useState(null);
  const [continentFilter, setContinentFilter] = useState('All');

  // --- Countries list with continent ---
  const countries = useMemo(() => {
    if (!geoJson?.features) return [];
    return geoJson.features
      .map(f => ({
        name: f?.properties?.ADMIN || f?.properties?.NAME || f?.properties?.name,
        continent: (f?.properties?.CONTINENT || 'Unknown').trim(),
      }))
      .filter(c => c.name);
  }, [geoJson]);

  // --- Unique list of continents for dropdown ---
  const continents = useMemo(() => {
    const set = new Set(countries.map(c => c.continent).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [countries]);

  // --- Pick random country helper ---
  const pickRandomTarget = useCallback((filter, revealedSet) => {
    let available = countries.filter(c => !revealedSet.has(c.name));
    if (filter !== 'All') {
  available = available.filter(
    c => c.continent.toLowerCase() === filter.toLowerCase()
  );
}

    if (!available.length) return null;
    const idx = Math.floor(Math.random() * available.length);
    return available[idx].name;
  }, [countries]);

  // --- Initialize target once when data loads ---
  useEffect(() => {
    if (countries.length && !target) {
      const first = pickRandomTarget(continentFilter, revealed);
      setTarget(first);
    }
  }, [countries, target, pickRandomTarget, continentFilter, revealed]);

  // --- Handle continent change (reset safely) ---
  useEffect(() => {
    if (!countries.length) return;

    // reset state
    setScore(0);
    setRound(1);
    setRevealed(new Set());
    setLastWrong(null);
    setMessage('Click the correct country!');

    // pick new target (using stable pickRandomTarget)
    const next = pickRandomTarget(continentFilter, new Set());
    setTarget(next);
  }, [continentFilter, countries, pickRandomTarget]);

  // --- Handle "game complete" ---
  useEffect(() => {
    if (target === null && revealed.size > 0) {
      setMessage(`🎉 Game Complete! You found all ${revealed.size} countries!`);
      setIsLocked(true);
    }
  }, [target, revealed.size]);

  // --- Feature style ---
  const styleFeature = useCallback(
    (feature) => {
      const name = feature?.properties?.ADMIN || feature?.properties?.NAME || feature?.properties?.name;
      const isCorrect = revealed.has(name);
      const isWrong = name === lastWrong;
      return {
        weight: isWrong ? 2 : 0.8,
        color: isWrong ? '#b91c1c' : '#666',
        fillColor: isCorrect ? '#22c55e' : '#d1d5db',
        fillOpacity: isCorrect ? 0.85 : 0.7
      };
    },
    [revealed, lastWrong]
  );

  // --- Feature interactivity ---
  const onEachFeature = useCallback(
    (feature, layer) => {
      const name = feature?.properties?.ADMIN || feature?.properties?.NAME || feature?.properties?.name;

      layer.on('mouseover', () => {
        if (!revealed.has(name)) {
          layer.setStyle({ weight: 1.5, color: '#000' });
        }
      });
      layer.on('mouseout', () => layer.setStyle(styleFeature(feature)));

      layer.on('click', () => {
        if (isLocked || !target) return;
        const clickedName = name;
        console.log(feature)
        setIsLocked(true);

        if (normalizeName(clickedName) === normalizeName(target)) {
          setMessage(`✅ Correct! That is ${target}.`);
          setScore(s => s + 1);
          setRevealed(prev => new Set(prev).add(target));
          setLastWrong(null);
          setTimeout(() => {
            setRound(r => r + 1);
            const next = pickRandomTarget(continentFilter, new Set(revealed).add(target));
            setTarget(next);
            setMessage('Click the correct country!');
            setIsLocked(false);
          }, 700);
        } else {
          // ❌ Wrong
          setMessage(`❌ Not quite — you clicked ${clickedName}.`);
          setLastWrong(clickedName);
          setRevealed(prev => new Set(prev).add(target));
          setTimeout(() => {
            setLastWrong(null);
            setRound(r => r + 1);
            const next = pickRandomTarget(continentFilter, new Set(revealed).add(target));
            setTarget(next);
            setMessage('Click the correct country!');
            setIsLocked(false);
          }, 900);
        }
      });
    },
    [isLocked, pickRandomTarget, styleFeature, target, revealed, continentFilter]
  );

  // --- Manual reset ---
  const reset = () => {
    setScore(0);
    setRound(1);
    setRevealed(new Set());
    setLastWrong(null);
    setMessage('Click the correct country!');
    const next = pickRandomTarget(continentFilter, new Set());
    setTarget(next);
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <TopBar
        target={target}
        score={score}
        round={round}
        message={message}
        onReset={reset}
        continents={continents}
        continentFilter={continentFilter}
        setContinentFilter={setContinentFilter}
      />

      <MapContainer
        center={[20, 0]}
        zoom={2}
        minZoom={1.5}
        maxZoom={6}
        style={{ height: '100%', width: '100%' }}
        worldCopyJump={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <GeoJSON
  data={geoJson}
  style={styleFeature}
  onEachFeature={onEachFeature}
/>
      </MapContainer>
    </div>
  );
}

// --- Top Bar ---
function TopBar({ target, score, round, message, onReset, continents, continentFilter, setContinentFilter }) {
  return (
    <div
      style={{
        position: 'absolute',
        top: 12,
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'rgba(255,255,255,0.95)',
        padding: '10px 14px',
        borderRadius: 10,
        boxShadow: '0 6px 20px rgba(0,0,0,0.08)',
        display: 'flex',
        gap: 12,
        alignItems: 'center',
        flexWrap: 'wrap',
        zIndex: 1000
      }}
      aria-live="polite"
    >
      <strong>Round:</strong> {round}
      <span style={{ width: 10 }} />
      <strong>Score:</strong> {score}
      <span style={{ width: 10 }} />
      <strong>Find:</strong>{' '}
      <span style={{ fontWeight: 700, color: target ? '#111' : '#999' }}>
        {target ? target : 'Loading...'}
      </span>

      <select
        value={continentFilter}
        onChange={e => setContinentFilter(e.target.value)}
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: '6px 8px',
          cursor: 'pointer'
        }}
      >
        {continents.map(cont => (
          <option key={cont} value={cont}>{cont}</option>
        ))}
      </select>

      <button
        onClick={onReset}
        style={{
          border: '1px solid #ddd',
          background: '#fff',
          padding: '6px 10px',
          borderRadius: 8,
          cursor: 'pointer'
        }}
      >
        Reset
      </button>

      <em style={{ color: '#555' }}>{message}</em>
    </div>
  );
}
