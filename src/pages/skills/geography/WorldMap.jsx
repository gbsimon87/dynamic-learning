import { useEffect, useState } from 'react';
import MapGame from '../../../components/MapGame';

export default function WorldMap() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('countries'); // 👈 NEW

  // Load GeoJSON
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/countries.geojson');
        if (!res.ok) throw new Error('Failed to load countries.geojson');
        const data = await res.json();
        if (!data?.features?.length) throw new Error('GeoJSON has no features');
        setCountries(data);
      } catch (e) {
        setError(e.message || 'Failed to load GeoJSON');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: 24 }}>Loading map…</div>;
  if (error) return <div style={{ padding: 24, color: 'crimson' }}>{error}</div>;

  return (
    <div style={{ height: '100dvh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
      <Header mode={mode} onModeChange={setMode} />
      <MapGame geoJson={countries} mode={mode} />
    </div>
  );
}

function Header({ mode, onModeChange }) {
  return (
    <header
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        flexWrap: 'wrap'
      }}
    >
      <div>
        <h1 style={{ margin: 0, fontSize: 18 }}>
          {mode === 'countries' ? '🌍 Country Finder' : '🗺️ Continent Finder'}
        </h1>
        <span style={{ color: '#666' }}>
          {mode === 'countries'
            ? 'Click the correct country on the map'
            : 'Tap the correct continent!'}
        </span>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button
          onClick={() => onModeChange('countries')}
          style={{
            padding: '6px 10px',
            background: mode === 'countries' ? '#ef626c' : '#eee',
            color: mode === 'countries' ? '#fff' : '#333',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Countries
        </button>
        <button
          onClick={() => onModeChange('continents')}
          style={{
            padding: '6px 10px',
            background: mode === 'continents' ? '#ef626c' : '#eee',
            color: mode === 'continents' ? '#fff' : '#333',
            border: 'none',
            borderRadius: 6,
            cursor: 'pointer',
          }}
        >
          Continents
        </button>
      </div>
    </header>
  );
}
