import { useEffect, useMemo, useState } from 'react';
import MapGame from '../components/MapGame';

export default function WorldMap() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load GeoJSON from /public
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/countries.geojson');
        if (!res.ok) throw new Error('Failed to load countries.geojson');
        const data = await res.json();
        // Basic sanity check
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
      <Header />
      <MapGame geoJson={countries} />
    </div>
  );
}

function Header() {
  return (
    <header
      style={{
        padding: '12px 16px',
        borderBottom: '1px solid #eee',
        display: 'flex',
        alignItems: 'center',
        gap: 12
      }}
    >
      <h1 style={{ margin: 0, fontSize: 18 }}>🌍 Country Finder</h1>
      <span style={{ color: '#666' }}>Click the correct country on the map</span>
    </header>
  );
}
