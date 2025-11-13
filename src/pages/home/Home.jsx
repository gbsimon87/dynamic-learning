import "./Home.css";

function Home() {
  return (
    <div className="home-page real-home">
      <h1>🌟 Welcome to Dynamic Learning!</h1>
      <p>
        Practice skills, explore subjects, and follow structured curriculum challenges.
      </p>

      <div className="home-links">
        <a href="/skills" className="home-btn">Explore Skills</a>
        <a href="/curriculum" className="home-btn">View Curriculum</a>
      </div>
    </div>
  );
}

export default Home;
