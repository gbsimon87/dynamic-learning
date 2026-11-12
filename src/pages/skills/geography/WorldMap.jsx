import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import MapGame from '../../../components/MapGame';
import BixLoader from '../../../components/mascot/BixLoader';
import './WorldMap.css';

export default function WorldMap() {
  const [countries, setCountries] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('countries');

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

  if (loading && !error) return <BixLoader message="Unrolling the world map" />;

  if (error) {
    return (
      <div className="worldmap-status">
        <Link to="/skills" className="mapgame-back">
          <span aria-hidden="true">←</span>
          <span className="mapgame-back-text">Back to Skills</span>
        </Link>
        <p style={{ color: 'var(--danger-text)' }}>
          {error}
        </p>
      </div>
    );
  }

  // The shell is exactly one viewport tall below the navbar (see WorldMap.css),
  // and the game draws its own back link, so nothing here may scroll the page.
  return (
    <div className="worldmap-shell">
      <MapGame geoJson={countries} mode={mode} onModeChange={setMode} />
    </div>
  );
}
