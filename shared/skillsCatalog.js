// Shared by the skills hub, public guides, prerenderer and sitemap.
export const SKILL_GROUPS = [
  {
    id: "math",
    icon: "🧮",
    name: "Maths",
    hue: "--sk-hue-math",
    deep: "--sk-deep-math",
    games: [
      { to: "/skills/clock-generator", icon: "⏰", label: "Clock Generator" },
      { to: "/skills/multiplication-table", icon: "✖️", label: "Multiplication Grid" },
      { to: "/skills/times-tables", icon: "🏁", label: "Times Tables Race" },
      { to: "/skills/reading-numbers", icon: "🔢", label: "Reading Numbers" },
      { to: "/skills/arithmetic-practice", icon: "➕", label: "Arithmetic Practice" },
      { to: "/skills/missing-number", icon: "❓", label: "Missing Number" },
      { to: "/skills/number-bonds", icon: "🔗", label: "Number Bonds" },
      { to: "/skills/fraction-fun", icon: "🍕", label: "Fraction Fun" },
      { to: "/skills/money", icon: "🪙", label: "Money Match" },
      { to: "/skills/measure", icon: "📏", label: "Measure It" },
      { to: "/skills/robot-moves", icon: "🤖", label: "Robot Moves" },
      { to: "/skills/charts", icon: "📊", label: "Chart Detective" },
      { to: "/skills/place-value", icon: "🧱", label: "Place Value Blocks" },
      { to: "/skills/rule-zoo", icon: "🦓", label: "Secret Rule Zoo" },
    ],
  },
  {
    id: "english",
    icon: "📚",
    name: "English",
    hue: "--sk-hue-english",
    deep: "--sk-deep-english",
    games: [
      { to: "/skills/word-builder", icon: "🔤", label: "Word Builder" },
      { to: "/skills/word-sorter", icon: "🗂️", label: "Word Sorter" },
      { to: "/skills/sentence-builder", icon: "📝", label: "Sentence Builder" },
      { to: "/skills/opposite-match", icon: "↔️", label: "Opposite Match" },
      { to: "/skills/synonym-match", icon: "🦁", label: "Synonym Safari" },
      { to: "/skills/sight-word-pop", icon: "🎈", label: "Sight Word Pop" },
      { to: "/skills/speed-reader", icon: "⚡", label: "Speed Reader" },
    ],
  },
  {
    id: "shapes",
    icon: "🔷",
    name: "Shapes",
    hue: "--sk-hue-shapes",
    deep: "--sk-deep-shapes",
    games: [{ to: "/skills/shapes", icon: "🔺", label: "Shape Explorer" }],
  },
  {
    id: "geography",
    icon: "🌍",
    name: "Geography",
    hue: "--sk-hue-geography",
    deep: "--sk-deep-geography",
    games: [
      { to: "/skills/solar-system", icon: "🪐", label: "Solar System" },
      { to: "/skills/world-map", icon: "🗺️", label: "World Map" },
      { to: "/skills/flag-finder", icon: "🚩", label: "Flag Finder" },
      { to: "/skills/city-spotlight", icon: "🏙️", label: "City Spotlight" },
      { to: "/skills/find-the-city", icon: "📍", label: "Find the City" },
    ],
  },
];

// Pinned to the top of the hub, in this order. Each must also be in a group.
export const FEATURED_GAMES = [
  "/skills/solar-system",
  "/skills/city-spotlight",
  "/skills/times-tables",
];
