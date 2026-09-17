/**
 * Child-profile avatars and colour tokens.
 *
 * Emoji are used deliberately in child-facing UI (PROJECT_KNOWLEDGE §8), so a
 * profile avatar is just an emoji string — no image assets to ship or load.
 *
 * PROFILE_COLOURS are CSS custom-property NAMES, never colour literals. §9
 * ("Inline styles need CSS-variable tokens, not literals") — a literal cannot
 * carry a `body.dark` override, which is how ShapeQuiz and the World Map HUD
 * ended up light-only. Each name has a `:root` (light) and `body.dark` pair in
 * src/index.css, so a profile picked in light mode still reads in dark mode.
 *
 * Use them as `style={{ background: `var(${colour})` }}`.
 */

export const AVATARS = [
  "🦊",
  "🐼",
  "🚀",
  "🦄",
  "🐙",
  "🐝",
  "🐸",
  "🦁",
  "🐬",
  "🦕",
  "🐧",
  "🌈",
];

export const PROFILE_COLOURS = [
  "--profile-colour-coral",
  "--profile-colour-sky",
  "--profile-colour-mint",
  "--profile-colour-sun",
  "--profile-colour-lilac",
  "--profile-colour-peach",
];
