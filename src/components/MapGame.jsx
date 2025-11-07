import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useCallback, useEffect, useMemo, useState, useRef } from 'react';
import * as turf from '@turf/turf';
import L from 'leaflet';

const normalizeName = str =>
  str
    ?.normalize('NFD')            // separate accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[’']/g, "'")        // unify apostrophes
    .replace(/[\s,.'"()-]/g, '')  // remove punctuation/spaces
    .toLowerCase()
    .trim();

export default function MapGame({ geoJson, mode }) {
  // Game state
  const [target, setTarget] = useState(null);
  const [score, setScore] = useState(0);
  const [round, setRound] = useState(1);
  const [message, setMessage] = useState('Click the correct country!');
  const [revealed, setRevealed] = useState(() => new Set());
  const [isLocked, setIsLocked] = useState(false);
  const [lastWrong, setLastWrong] = useState(null);
  const [continentFilter, setContinentFilter] = useState('All');

  // Ref to always have current target value in event handlers
  const targetRef = useRef(target);
  useEffect(() => {
    targetRef.current = target;
  }, [target]);

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

  // When in continent mode, the "targets" are continents instead of countries
  const possibleTargets = useMemo(() => {
    if (mode === 'continents') {
      const set = new Set(countries.map(c => c.continent).filter(Boolean));
      return Array.from(set);
    }
    return countries.map(c => c.name);
  }, [mode, countries]);

  // --- Unique list of continents for dropdown ---
  const continents = useMemo(() => {
    const set = new Set(countries.map(c => c.continent).filter(Boolean));
    return ['All', ...Array.from(set).sort()];
  }, [countries]);

  // --- Pick random country helper ---
  const pickRandomTarget = useCallback((filter, revealedSet) => {
    if (mode === 'continents') {
      const remaining = possibleTargets.filter(t => !revealedSet.has(t));
      if (!remaining.length) return null;
      return remaining[Math.floor(Math.random() * remaining.length)];
    } else {
      let available = countries.filter(c => !revealedSet.has(c.name));
      if (filter !== 'All') {
        available = available.filter(
          c => c.continent.toLowerCase() === filter.toLowerCase()
        );
      }
      if (!available.length) return null;
      return available[Math.floor(Math.random() * available.length)].name;
    }
  }, [countries, mode, possibleTargets]);

  // --- Combined continent polygons for continent mode ---
const continentGeoJson = useMemo(() => {
  if (mode !== 'continents' || !geoJson?.features) return null;

  const grouped = {};
  for (const f of geoJson.features) {
    const cont = f.properties?.CONTINENT || 'Unknown';
    (grouped[cont] ||= []).push(f);
  }

  const merged = [];

  for (const [cont, feats] of Object.entries(grouped)) {
    try {
      if (feats.length === 1) {
        merged.push({
          type: 'Feature',
          properties: { name: cont },
          geometry: feats[0].geometry,
        });
        continue;
      }

      // Combine all geometries into one Multi*
      const combined = turf.combine({
        type: 'FeatureCollection',
        features: feats,
      });

      // Prefer the combined MultiPolygon (or Polygon) directly
      const multi = combined?.features?.[0];
      if (multi?.geometry && (multi.geometry.type === 'MultiPolygon' || multi.geometry.type === 'Polygon')) {
        merged.push({
          type: 'Feature',
          properties: { name: cont },
          geometry: multi.geometry,
        });
        continue;
      }

      // Fallback: manually assemble a MultiPolygon from parts
      const polyParts = [];
      for (const feat of feats) {
        const g = feat.geometry;
        if (!g) continue;
        if (g.type === 'Polygon') polyParts.push(g.coordinates);
        else if (g.type === 'MultiPolygon') polyParts.push(...g.coordinates);
      }
      if (polyParts.length) {
        merged.push({
          type: 'Feature',
          properties: { name: cont },
          geometry: { type: 'MultiPolygon', coordinates: polyParts },
        });
      }
    } catch (e) {
      console.warn(`⚠️ Failed to combine continent ${cont}`, e);
    }
  }

  return { type: 'FeatureCollection', features: merged };
}, [geoJson, mode]);




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
    setMessage(
      mode === 'continents'
        ? 'Tap the correct continent!'
        : 'Click the correct country!'
    );
    // pick new target (using stable pickRandomTarget)
    const next = pickRandomTarget(continentFilter, new Set());
    setTarget(next);
  }, [continentFilter, countries, pickRandomTarget, mode]);

  // --- Handle "game complete" ---
  useEffect(() => {
    if (target === null && revealed.size > 0) {
      setMessage(
        mode === 'continents'
          ? `🎉 Great job! You found all ${revealed.size} continents!`
          : `🎉 Game Complete! You found all ${revealed.size} countries!`
      );
      setIsLocked(true);
    }
  }, [target, revealed.size, mode]);


  // --- Feature style ---
  const styleFeature = useCallback(
    (feature) => {
      // In continent mode, the merged features only have properties.name (the continent name)
      // In country mode, features have ADMIN/NAME (country name) and CONTINENT

      if (mode === 'continents') {
        const continentName = feature?.properties?.name || '';
        const isRevealed = revealed.has(continentName);

        return {
          weight: 1,
          color: '#555',
          fillColor: isRevealed ? '#22c55e' : '#bde0fe',
          fillOpacity: isRevealed ? 0.85 : 0.8,
        };
      } else {
        // Country mode
        const countryName =
          feature?.properties?.ADMIN ||
          feature?.properties?.NAME ||
          feature?.properties?.name;

        const isRevealed = revealed.has(countryName);
        const isWrong = countryName === lastWrong;

        return {
          weight: isWrong ? 1.5 : 0.6,
          color: isWrong ? '#b91c1c' : '#666',
          fillColor: isRevealed ? '#22c55e' : '#d1d5db',
          fillOpacity: isRevealed ? 0.85 : 0.8,
        };
      }
    },
    [revealed, lastWrong, mode]
  );

  // --- Feature interactivity ---
  const onEachFeature = useCallback(
    (feature, layer) => {
      if (mode === 'continents') {
        // Continent mode: merged features only have properties.name
        const continentName = feature?.properties?.name || '';

        // Hover (optional subtle effect for continents)
        layer.on('mouseover', () => {
          if (!revealed.has(continentName)) {
            layer.setStyle({ weight: 2, color: '#333' });
          }
        });
        layer.on('mouseout', () => layer.setStyle(styleFeature(feature)));

        layer.on('click', () => {
          if (isLocked || !targetRef.current) return;

          const currentTarget = targetRef.current;
          setIsLocked(true);

          const isCorrect = normalizeName(continentName) === normalizeName(currentTarget);

          if (isCorrect) {
            setMessage(`✅ Correct! That is ${continentName}.`);
            setScore((s) => s + 1);

            setRevealed((prev) => {
              const updated = new Set(prev).add(currentTarget);
              setTimeout(() => {
                setRound((r) => r + 1);
                const next = pickRandomTarget(continentFilter, updated);
                setTarget(next);
                setMessage('Tap the correct continent!');
                setIsLocked(false);
              }, 700);
              return updated;
            });
          } else {
            setMessage(`❌ Not quite — you clicked ${continentName}.`);

            setRevealed((prev) => {
              const updated = new Set(prev).add(currentTarget);
              setTimeout(() => {
                setRound((r) => r + 1);
                const next = pickRandomTarget(continentFilter, updated);
                setTarget(next);
                setMessage('Tap the correct continent!');
                setIsLocked(false);
              }, 900);
              return updated;
            });
          }
        });
      } else {
        // Country mode: features have ADMIN/NAME properties
        const countryName =
          feature?.properties?.ADMIN ||
          feature?.properties?.NAME ||
          feature?.properties?.name;

        // Hover
        layer.on('mouseover', () => {
          if (!revealed.has(countryName)) {
            layer.setStyle({ weight: 1.5, color: '#000' });
          }
        });
        layer.on('mouseout', () => layer.setStyle(styleFeature(feature)));

        layer.on('click', () => {
          if (isLocked || !targetRef.current) return;

          const currentTarget = targetRef.current;
          setIsLocked(true);

          const isCorrect = normalizeName(countryName) === normalizeName(currentTarget);

          if (isCorrect) {
            setMessage(`✅ Correct! That is ${countryName}.`);
            setScore((s) => s + 1);
            setLastWrong(null);

            setRevealed((prev) => {
              const updated = new Set(prev).add(currentTarget);
              setTimeout(() => {
                setRound((r) => r + 1);
                const next = pickRandomTarget(continentFilter, updated);
                setTarget(next);
                setMessage('Click the correct country!');
                setIsLocked(false);
              }, 700);
              return updated;
            });
          } else {
            setMessage(`❌ Not quite — you clicked ${countryName}.`);
            setLastWrong(countryName);

            setRevealed((prev) => {
              const updated = new Set(prev).add(currentTarget);
              setTimeout(() => {
                setLastWrong(null);
                setRound((r) => r + 1);
                const next = pickRandomTarget(continentFilter, updated);
                setTarget(next);
                setMessage('Click the correct country!');
                setIsLocked(false);
              }, 900);
              return updated;
            });
          }
        });
      }
    },
    [isLocked, pickRandomTarget, styleFeature, revealed, continentFilter, mode]
  );


  // --- Manual reset ---
  const reset = () => {
    setScore(0);
    setRound(1);
    setRevealed(new Set());
    setLastWrong(null);
    setMessage(
      mode === 'continents'
        ? 'Tap the correct continent!'
        : 'Click the correct country!'
    ); const next = pickRandomTarget(continentFilter, new Set());
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
        mode={mode}
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
          key={mode}
          attribution="&copy; OpenStreetMap contributors"
          url={
            mode === 'continents'
              ? 'https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png'
              : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          }
        />

        <GeoJSON
          key={mode}
          data={mode === 'continents' ? continentGeoJson : geoJson}
          style={styleFeature}
          onEachFeature={onEachFeature}
        />

      </MapContainer>
    </div>
  );
}

// --- Top Bar ---
function TopBar({ target, score, round, message, onReset, continents, continentFilter, setContinentFilter, mode }) {
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
        disabled={mode === 'continents'}
        value={continentFilter}
        onChange={(e) => setContinentFilter(e.target.value)}
        style={{
          border: '1px solid #ccc',
          borderRadius: 8,
          padding: '6px 8px',
          cursor: mode === 'continents' ? 'not-allowed' : 'pointer',
          opacity: mode === 'continents' ? 0.6 : 1,
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
