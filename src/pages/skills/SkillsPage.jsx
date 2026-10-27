import { useState } from "react";
import { SKILL_GROUPS as GROUPS, FEATURED_GAMES } from "../../../shared/skillsCatalog.js";
import { Link } from "react-router";
import { useReveal } from "../home/useReveal";
import "./SkillsPage.css";

/* ===== DECORATION =====
   The same drifting sky as the homepage and the curriculum screens, so every
   hub reads as one place. `aria-hidden` on the container: a screen reader
   announcing "★ ÷ b 4" would be nonsense. */
const GLYPHS = [
  { char: "★", left: 6, top: 26, size: 1.8, duration: 16, delay: 0 },
  { char: "4", left: 22, top: 66, size: 2.1, duration: 19, delay: 3 },
  { char: "✦", left: 39, top: 14, size: 1.5, duration: 14, delay: 6 },
  { char: "●", left: 57, top: 72, size: 1.4, duration: 20, delay: 2 },
  { char: "b", left: 73, top: 22, size: 2, duration: 15, delay: 5 },
  { char: "▲", left: 90, top: 58, size: 1.7, duration: 18, delay: 1 },
];

const FEATURED = FEATURED_GAMES.map((to) => {
  const group = GROUPS.find((g) => g.games.some((game) => game.to === to));
  return { ...group.games.find((game) => game.to === to), group };
});

const TOTAL_GAMES = GROUPS.reduce((sum, group) => sum + group.games.length, 0);

function SkillsPage() {
  const revealRef = useReveal();

  // Four cards is enough to scroll past on a phone, and a child hunting for
  // "the flag one" shouldn't have to. Filtering keeps the page one screen.
  const [filter, setFilter] = useState("all");
  const shown = GROUPS.filter((group) => filter === "all" || group.id === filter);
  const showFeatured = filter === "all" || filter === "featured";

  return (
    <div className="skills-page" ref={revealRef}>
      {/* ===== BAND ===== */}
      <section className="sk-hero">
        <div className="sk-sky" aria-hidden="true">
          {GLYPHS.map((glyph, index) => (
            <span
              key={index}
              className="sk-glyph"
              style={{
                left: `${glyph.left}%`,
                top: `${glyph.top}%`,
                fontSize: `${glyph.size}rem`,
                animationDuration: `${glyph.duration}s`,
                animationDelay: `-${glyph.delay}s`,
              }}
            >
              {glyph.char}
            </span>
          ))}
        </div>

        {/* Free-play games; the progress distinction sits below the band. */}
        <div className="sk-bar">
          <span className="sk-bar-icon" aria-hidden="true">
            🎯
          </span>
          <div className="sk-bar-id">
            <h1 className="sk-title">Pick a game</h1>
            <p className="sk-bar-meta">{TOTAL_GAMES} games · play any of them</p>
          </div>
        </div>
      </section>

      <div className="sk-practice-note">
        <p><strong>Play for practice.</strong> Skill games don’t count towards your curriculum progress.</p>
        <Link to="/curriculum">Follow the curriculum <span aria-hidden="true">→</span></Link>
      </div>

      {/* ===== FILTER ===== */}
      <div className="sk-filters" role="group" aria-label="Filter games by subject">
        <button
          type="button"
          className={`sk-filter ${filter === "all" ? "is-active" : ""}`}
          aria-pressed={filter === "all"}
          onClick={() => setFilter("all")}
        >
          <span aria-hidden="true">✨</span> All
        </button>

        <button
          type="button"
          className={`sk-filter ${filter === "featured" ? "is-active" : ""}`}
          style={{ "--group-hue": "var(--sk-hue-math)", "--group-deep": "var(--sk-deep-math)" }}
          aria-pressed={filter === "featured"}
          onClick={() => setFilter("featured")}
        >
          <span aria-hidden="true">⭐</span> Featured
        </button>

        {GROUPS.map((group) => (
          <button
            key={group.id}
            type="button"
            className={`sk-filter ${filter === group.id ? "is-active" : ""}`}
            style={{
              "--group-hue": `var(${group.hue})`,
              "--group-deep": `var(${group.deep})`,
            }}
            aria-pressed={filter === group.id}
            onClick={() => setFilter(group.id)}
          >
            <span aria-hidden="true">{group.icon}</span> {group.name}
          </button>
        ))}
      </div>

      {/* ===== FEATURED ===== */}
      {showFeatured && (
        <section className="sk-featured" aria-labelledby="sk-featured-title" data-reveal>
          <h2 className="sk-featured-title" id="sk-featured-title">
            <span aria-hidden="true">⭐</span> Featured games
          </h2>
          <div className="sk-featured-grid">
            {FEATURED.map((game) => (
              <Link
                key={game.to}
                className="sk-featured-game"
                to={game.to}
                aria-label={`Featured game: ${game.label}`}
                style={{ "--group-deep": `var(${game.group.deep})` }}
              >
                <span className="sk-featured-icon" aria-hidden="true">{game.icon}</span>
                <span className="sk-featured-label">{game.label}</span>
                <span className="sk-featured-subject">{game.group.name}</span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ===== GAMES ===== */}
      <div className="sk-grid">
        {shown.map((group) => (
          <section
            key={group.id}
            className="sk-card"
            style={{
              "--group-hue": `var(${group.hue})`,
              "--group-deep": `var(${group.deep})`,
            }}
            aria-labelledby={`sk-${group.id}-title`}
            data-reveal
          >
            <header className="sk-card-head">
              <span className="sk-card-icon" aria-hidden="true">
                {group.icon}
              </span>
              <h2 className="sk-card-title" id={`sk-${group.id}-title`}>
                {group.name}
              </h2>
              <span className="sk-card-count">
                {group.games.length} {group.games.length === 1 ? "game" : "games"}
              </span>
            </header>

            <div className="sk-games">
              {group.games.map((game, index) => (
                <div key={game.to} className="sk-game-entry">
                  <Link
                    className="sk-game"
                    to={game.to}
                    style={{ "--game-index": index }}
                  >
                    <span className="sk-game-icon" aria-hidden="true">
                      {game.icon}
                    </span>
                    <span className="sk-game-label">{game.label}</span>
                    <span className="sk-game-go" aria-hidden="true">
                      ▶
                    </span>
                  </Link>
                  <Link className="sk-guide-link" to={`/learn/${game.to.replace("/skills/", "")}`} aria-label={`About ${game.label}`} title={`About ${game.label}`}>
                    <span aria-hidden="true">ⓘ</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
