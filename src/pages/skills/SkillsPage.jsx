import { Link } from "react-router";
import "./SkillsPage.css";

function SkillsPage() {
  return (
    <div className="skills-page page">

      {/* === HERO === */}
      <section className="skills-hero">
        <h1 className="skills-title">🎓 Skills Practice</h1>
        <p className="skills-subtitle">
          Choose a subject and play fun games to build your knowledge!
        </p>
      </section>

      {/* === SKILLS SECTIONS === */}
      <div className="skills-grid">

        {/* Math Section */}
        <section className="skills-card">
          <div className="skills-icon">🧮</div>
          <h2 className="skills-card-title">Math Skills</h2>
          <p className="skills-card-text">
            Counting, number bonds, times tables, shapes, and more!
          </p>
          <div className="skills-links">
            <Link to="/clock-generator" className="skill-btn">Clock Generator</Link>
            <Link to="/multiplication-table" className="skill-btn">Multiplication Grid</Link>
            <Link to="/counting-numbers" className="skill-btn">Counting Numbers</Link>
            <Link to="/arithmetic-practice" className="skill-btn">Arithmetic Practice</Link>
            <Link to="/missing-number" className="skill-btn">Find the Missing Number</Link>
            <Link to="/number-bonds" className="skill-btn">Number Bonds</Link>
            <Link to="/fraction-fun" className="skill-btn">Fraction Fun</Link>
          </div>
        </section>

        {/* English Section */}
        <section className="skills-card">
          <div className="skills-icon">📚</div>
          <h2 className="skills-card-title">English & Words</h2>
          <p className="skills-card-text">
            Build sentences, solve synonyms, match opposites, and more!
          </p>
          <div className="skills-links">
            <Link to="/word-builder" className="skill-btn">Word Builder</Link>
            <Link to="/word-sorter" className="skill-btn">Word Sorter</Link>
            <Link to="/sentence-builder" className="skill-btn">Sentence Builder</Link>
            <Link to="/opposite-match" className="skill-btn">Opposite Match</Link>
            <Link to="/synonym-match" className="skill-btn">Synonym Safari</Link>
            <Link to="/sight-word-pop" className="skill-btn">Sight Word Pop</Link>
          </div>
        </section>

        {/* Shapes Section */}
        <section className="skills-card">
          <div className="skills-icon">🔺</div>
          <h2 className="skills-card-title">Shapes & Geometry</h2>
          <p className="skills-card-text">
            Explore 2D and 3D shapes and their properties!
          </p>
          <div className="skills-links">
            <Link to="/shapes" className="skill-btn">Shape Explorer</Link>
          </div>
        </section>

        {/* Geography Section */}
        <section className="skills-card">
          <div className="skills-icon">🌍</div>
          <h2 className="skills-card-title">Geography</h2>
          <p className="skills-card-text">
            Explore the world, flags, planets, and more!
          </p>
          <div className="skills-links">
            <Link to="/solar-system" className="skill-btn">Solar System</Link>
            <Link to="/world-map" className="skill-btn">World Map</Link>
            <Link to="/flag-finder" className="skill-btn">Flag Finder</Link>
            <Link to="/city-spotlight" className="skill-btn">City Spotlight</Link>
          </div>
        </section>

      </div>
    </div>
  );
}

export default SkillsPage;
