import { useState } from "react";
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

/* ===== THE GAMES =====
   One entry per playable route, grouped the way a child would look for them.
   `hue` and `deep` are token names, never literals, so both repaint with the
   theme (PROJECT_KNOWLEDGE §9): the vivid hue edges the card and fills the
   icon tile, the deep one fills the game buttons, where white ink has to
   clear WCAG AA 4.5:1.

   Adding a game here is the second of the two registration points described
   in .claude/skills/add-skill-game — the route in main.jsx is the first. */
const GROUPS = [
  {
    id: "math",
    icon: "🧮",
    name: "Maths",
    hue: "--sk-hue-math",
    deep: "--sk-deep-math",
    games: [
      { to: "/clock-generator", icon: "⏰", label: "Clock Generator" },
      { to: "/multiplication-table", icon: "✖️", label: "Multiplication Grid" },
      { to: "/reading-numbers", icon: "🔢", label: "Reading Numbers" },
      { to: "/arithmetic-practice", icon: "➕", label: "Arithmetic Practice" },
      { to: "/missing-number", icon: "❓", label: "Missing Number" },
      { to: "/number-bonds", icon: "🔗", label: "Number Bonds" },
      { to: "/fraction-fun", icon: "🍕", label: "Fraction Fun" },
    ],
  },
  {
    id: "english",
    icon: "📚",
    name: "English",
    hue: "--sk-hue-english",
    deep: "--sk-deep-english",
    games: [
      { to: "/word-builder", icon: "🔤", label: "Word Builder" },
      { to: "/word-sorter", icon: "🗂️", label: "Word Sorter" },
      { to: "/sentence-builder", icon: "📝", label: "Sentence Builder" },
      { to: "/opposite-match", icon: "↔️", label: "Opposite Match" },
      { to: "/synonym-match", icon: "🦁", label: "Synonym Safari" },
      { to: "/sight-word-pop", icon: "🎈", label: "Sight Word Pop" },
      { to: "/speed-reader", icon: "⚡", label: "Speed Reader" },
    ],
  },
  {
    id: "shapes",
    icon: "🔷",
    name: "Shapes",
    hue: "--sk-hue-shapes",
    deep: "--sk-deep-shapes",
    games: [{ to: "/shapes", icon: "🔺", label: "Shape Explorer" }],
  },
  {
    id: "geography",
    icon: "🌍",
    name: "Geography",
    hue: "--sk-hue-geography",
    deep: "--sk-deep-geography",
    games: [
      { to: "/solar-system", icon: "🪐", label: "Solar System" },
      { to: "/world-map", icon: "🗺️", label: "World Map" },
      { to: "/flag-finder", icon: "🚩", label: "Flag Finder" },
      { to: "/city-spotlight", icon: "🏙️", label: "City Spotlight" },
    ],
  },
];

const TOTAL_GAMES = GROUPS.reduce((sum, group) => sum + group.games.length, 0);

function SkillsPage() {
  const revealRef = useReveal();

  // Four cards is enough to scroll past on a phone, and a child hunting for
  // "the flag one" shouldn't have to. Filtering keeps the page one screen.
  const [filter, setFilter] = useState("all");
  const shown = GROUPS.filter((group) => filter === "all" || group.id === filter);

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

        {/* Two short lines, no instructions: nothing here is locked or
            scored, so there is nothing a child needs explained first. */}
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
                <Link
                  key={game.to}
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
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}

export default SkillsPage;
