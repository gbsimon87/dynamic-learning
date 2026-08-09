import { useState } from "react";
import { useNavigate } from "react-router";
import {
  CURRICULUM_YEARS,
  CURRICULUM_SUBJECTS,
  isCurriculumAvailable,
  isYearAvailable,
} from "../../data/curriculumRegistry";
import "./CurriculumSelectPage.css";

function CurriculumSelectPage() {
  const navigate = useNavigate();
  const [selectedYear, setSelectedYear] = useState(null);

  return (
    <div className="curriculum-select-page page">
      <section className="curriculum-hero">
        <h1 className="curriculum-title">📘 Choose Your Curriculum</h1>
        <p className="curriculum-subtitle">
          Pick your year group, then choose a subject to start learning!
        </p>
      </section>

      {/* === STEP 1: YEAR === */}
      <section className="select-step">
        <h2 className="select-step-title">
          <span className="select-step-number">1</span> Pick your year
        </h2>

        <div className="select-grid">
          {CURRICULUM_YEARS.map((year) => {
            const available = isYearAvailable(year);
            const selected = selectedYear === year;

            return (
              <button
                key={year}
                type="button"
                className={`select-card year-card ${selected ? "selected" : ""} ${
                  available ? "" : "locked"
                }`}
                disabled={!available}
                onClick={() => setSelectedYear(year)}
              >
                <span className="select-card-icon">🎒</span>
                <span className="select-card-label">Year {year}</span>
                {available ? (
                  selected && <span className="select-badge">✅ Selected</span>
                ) : (
                  <span className="select-badge locked">🔒 Coming soon</span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* === STEP 2: SUBJECT === */}
      <section className="select-step">
        <h2 className="select-step-title">
          <span className="select-step-number">2</span> Pick your subject
        </h2>

        {selectedYear === null ? (
          <p className="select-hint">👆 Choose a year group first!</p>
        ) : (
          <div className="select-grid">
            {CURRICULUM_SUBJECTS.map((subject) => {
              const available = isCurriculumAvailable(selectedYear, subject.id);

              return (
                <button
                  key={subject.id}
                  type="button"
                  className={`select-card subject-card ${available ? "" : "locked"}`}
                  disabled={!available}
                  onClick={() =>
                    navigate(`/curriculum/year/${selectedYear}/${subject.id}`)
                  }
                >
                  <span className="select-card-icon">{subject.icon}</span>
                  <span className="select-card-label">{subject.name}</span>
                  {available ? (
                    <span className="select-badge">Start →</span>
                  ) : (
                    <span className="select-badge locked">🔒 Coming soon</span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}

export default CurriculumSelectPage;
