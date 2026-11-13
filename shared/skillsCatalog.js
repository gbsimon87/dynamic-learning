// Shared by the skills hub, public guides, prerenderer and sitemap.
export const SKILL_GROUPS = [
  {
    id: "math",
    icon: "🧮",
    name: "Maths",
    hue: "--sk-hue-math",
    deep: "--sk-deep-math",
    games: [
      { to: "/skills/arithmetic-practice", icon: "➕", label: "Practise Calculations" },
      { to: "/skills/multiplication-table", icon: "✖️", label: "Explore Times Tables" },
      { to: "/skills/times-tables", icon: "🏁", label: "Practise Times Tables" },
      { to: "/skills/place-value", icon: "🧱", label: "Build Numbers with Place Value" },
      { to: "/skills/reading-numbers", icon: "🔢", label: "Read Big Numbers" },
      { to: "/skills/number-bonds", icon: "🔗", label: "Make Number Bonds" },
      { to: "/skills/missing-number", icon: "❓", label: "Complete Number Patterns" },
      { to: "/skills/fraction-fun", icon: "🍕", label: "Learn About Fractions" },
      { to: "/skills/money", icon: "🪙", label: "Count Money" },
      { to: "/skills/measure", icon: "📏", label: "Read Measurements" },
      { to: "/skills/charts", icon: "📊", label: "Read Charts" },
      { to: "/skills/robot-moves", icon: "🤖", label: "Learn Directions" },
      { to: "/skills/clock-generator", icon: "⏰", label: "Learn to Read Time" },
      { to: "/skills/rule-zoo", icon: "🦓", label: "Find the Sorting Rule" },
      { to: "/skills/shapes", icon: "🔺", label: "Learn About Shapes" },
    ],
  },
  {
    id: "english",
    icon: "📚",
    name: "English",
    hue: "--sk-hue-english",
    deep: "--sk-deep-english",
    games: [
      { to: "/skills/speed-reader", icon: "⚡", label: "Read Stories" },
      { to: "/skills/sight-word-pop", icon: "🎈", label: "Read Common Words" },
      { to: "/skills/word-builder", icon: "🔤", label: "Practise Spelling" },
      { to: "/skills/word-sorter", icon: "🗂️", label: "Sort Word Types" },
      { to: "/skills/sentence-builder", icon: "📝", label: "Build Sentences" },
      { to: "/skills/opposite-match", icon: "↔️", label: "Find Opposites" },
      { to: "/skills/synonym-match", icon: "🦁", label: "Match Same-Meaning Words" },
    ],
  },
  {
    id: "geography",
    icon: "🌍",
    name: "Geography",
    hue: "--sk-hue-geography",
    deep: "--sk-deep-geography",
    games: [
      { to: "/skills/solar-system", icon: "🪐", label: "Explore the Solar System" },
      { to: "/skills/world-map", icon: "🗺️", label: "Find Countries & Continents" },
      { to: "/skills/find-the-city", icon: "📍", label: "Find Cities on a Map" },
      { to: "/skills/city-spotlight", icon: "🏙️", label: "Find Cities from Clues" },
      { to: "/skills/flag-finder", icon: "🚩", label: "Match Flags to Countries" },
      { to: "/skills/ocean-explorer", icon: "🌊", label: "Explore the Ocean" },
    ],
  },
  {
    id: "family",
    icon: "🎉",
    name: "Play together",
    hue: "--sk-hue-family",
    deep: "--sk-deep-family",
    games: [
      { to: "/skills/family-friday", icon: "🎉", label: "Family Friday Quiz", badge: "New quiz every Friday" },
    ],
  },
];

// Pinned to the top of the hub, in this order. Each must also be in a group.
export const FEATURED_GAMES = [
  "/skills/solar-system",
  "/skills/ocean-explorer",
  "/skills/times-tables",
  "/skills/speed-reader",
];
