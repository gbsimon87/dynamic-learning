/**
 * Speed Reader difficulty. A level picks which stories are offered and the
 * pace the game starts at; the child can still fine-tune speed and chunk size.
 */
export const SPEED_READER_LEVELS = [
  { id: "easy", emoji: "🌱", label: "Easy", band: "easy", wpm: 70, chunkSize: 1, hint: "Short stories at a gentle pace." },
  { id: "medium", emoji: "🌿", label: "Medium", band: "medium", wpm: 110, chunkSize: 1, hint: "Longer stories, a little quicker." },
  { id: "hard", emoji: "🌳", label: "Hard", band: "longer", wpm: 160, chunkSize: 2, hint: "The longest stories, two words at a time." },
];

export function levelById(id) {
  return SPEED_READER_LEVELS.find((level) => level.id === id) ?? SPEED_READER_LEVELS[0];
}

export function storiesForLevel(id, stories) {
  const { band } = levelById(id);
  return stories.filter((story) => story.band === band);
}

/** Friendly name for a reading speed, shown beside the slider. */
export function speedName(wpm) {
  if (wpm < 90) return "Slow";
  if (wpm < 135) return "Steady";
  if (wpm < 185) return "Fast";
  return "Super";
}
