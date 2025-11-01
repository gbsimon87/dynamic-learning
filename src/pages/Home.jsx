import { Link } from 'react-router';
import './Home.css';

function Home() {
  return (
    <div className="home-page">
      <h1 className="home-title">🌟 Dynamic Learning 🌟</h1>

      <div className="category-container">
        {/* Math Section */}
        <section className="category-section">
          <h2 className="category-title">🧮 Math Skills</h2>
          <div className="link-grid">
            <Link to="/clock-generator" className="nav-btn">Clock Generator</Link>
            <Link to="/counting-numbers" className="nav-btn">Counting Numbers</Link>
            <Link to="/arithmetic-practice" className="nav-btn">Arithmetic Practice</Link>
            <Link to="/missing-number" className="nav-btn">Find the Missing Number</Link>
          </div>
        </section>

        {/* English Section */}
        <section className="category-section">
          <h2 className="category-title">📚 English & Words</h2>
          <div className="link-grid">
            <Link to="/word-builder" className="nav-btn">Word Builder</Link>
            <Link to="/word-sorter" className="nav-btn">Word Sorter</Link>
            <Link to="/sentence-builder" className="nav-btn">Sentence Builder</Link>
          </div>
        </section>

        {/* Shapes Section */}
        <section className="category-section">
          <h2 className="category-title">🔺 Shapes & Geometry</h2>
          <div className="link-grid">
            <Link to="/shapes" className="nav-btn">Shape Explorer</Link>
          </div>
        </section>

        {/* Geography Section */}
        <section className="category-section">
          <h2 className="category-title">🌍 Geography</h2>
          <div className="link-grid">
            <Link to="/world-map" className="nav-btn">World Map</Link>
            <Link to="/flag-finder" className="nav-btn">Flag Finder</Link>
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;
