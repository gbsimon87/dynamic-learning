import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import Curriculum from "../curriculum/Curriculum";
import Skills from "../skills/Skills";
import "./Home.css";

function Home() {
  const location = useLocation();
  const [view, setView] = useState("Skills");

  // If returning from ProblemView, auto-show Curriculum
  useEffect(() => {
    if (location.state?.view === "Curriculum") {
      setView("Curriculum");
    }
  }, [location.state]);

  return (
    <div className="home-page">
      <div className="header">
        <select
          className="view-selector"
          value={view}
          onChange={(e) => setView(e.target.value)}
        >
          <option value="Skills">Skills</option>
          <option value="Curriculum">Curriculum</option>
        </select>
      </div>

      {view === "Skills" ? <Skills /> : <Curriculum />}
    </div>
  );
}

export default Home;
