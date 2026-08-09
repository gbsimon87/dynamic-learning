import { Link } from "react-router";
import "./Home.css";

function Home() {
  return (
    <div className="home-page">
      {/* === HERO SECTION === */}
      <section className="hero-section">
        <h1 className="hero-title">🌟 Welcome to Dynamic Learning!</h1>

        <p className="hero-subtitle">
          Fun learning games, skill builders, and challenges that help you grow
          every day!
        </p>
      </section>

      {/* === CURRICULUM SECTION === */}
      <section className="curriculum-section">
        <h2 className="section-title">📗 Follow the Curriculum</h2>

        <p className="curriculum-text">
          Work through structured challenges following the UK National
          Curriculum. Choose your year group and subject, then unlock topics
          one by one!
        </p>

        <Link to="/curriculum" className="curriculum-btn">
          📘 Begin Your Journey →
        </Link>
      </section>

      {/* === EXPLORE SKILLS SECTION === */}
      <section className="curriculum-section skills-section">
        <h2 className="section-title">🎮 Explore Skills</h2>

        <p className="curriculum-text">
          Build your knowledge with fun games, challenges, and activities
          across a range of subjects!
        </p>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧮</div>
            <h3>Math Games</h3>
            <p>
              Practice counting, times tables, shapes, and more with fun
              challenges!
            </p>
            <Link to="/skills" className="small-btn">
              Try Math Skills
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>English Skills</h3>
            <p>
              Build words, match opposites, pop sight words, and become a
              reading star!
            </p>
            <Link to="/skills" className="small-btn">
              Try English Skills
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🌍</div>
            <h3>Geography Fun</h3>
            <p>
              Explore the world—spot cities, flags, planets, and countries!
            </p>
            <Link to="/skills" className="small-btn">
              Try Geography Skills
            </Link>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔬</div>
            <h3>Science (Coming Soon!)</h3>
            <p>
              Interactive activities to learn about weather, forces, habitats,
              and more.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
