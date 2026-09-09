/**
 * Pure pacing maths for the Speed Reader game.
 *
 * This module deliberately has no React imports so Node's built-in test runner
 * can exercise it directly.
 */

const LENGTH_FREE_CHARS = 6;
const LENGTH_STRETCH_PER_CHAR = 0.04;
const LENGTH_STRETCH_MAX = 1.6;
const CLAUSE_PAUSE = 0.5;
const SENTENCE_PAUSE = 1;
const ABOVE_TOP_PRESET_STEP = 25;
const MAX_CHUNK_SIZE = 3;

export const SPEED_PRESETS = [
  { id: "slow", emoji: "🐢", label: "Slow", wpm: 60 },
  { id: "steady", emoji: "🚶", label: "Steady", wpm: 100 },
  { id: "fast", emoji: "🐇", label: "Fast", wpm: 150 },
  { id: "super", emoji: "🚀", label: "Super", wpm: 200 },
];

export const WPM_MIN = 60;
export const WPM_MAX = 300;
export const MAX_WORDS = 500;
export const COUNTDOWN_MS = 700;

// Trailing quotation marks and brackets must not hide sentence punctuation.
const CLAUSE_END = /[,;:]["'\u2019\u201d)\]}]*$/u;
const SENTENCE_END = /[.!?]["'\u2019\u201d)\]}]*$/u;
const WORD_CHARACTER = /[\p{L}\p{N}]/u;
const WORD_CHARACTERS = /[\p{L}\p{N}]/gu;

function normaliseChunkSize(chunkSize) {
  const numeric = Number(chunkSize);
  if (Number.isNaN(numeric)) return 1;
  return Math.min(MAX_CHUNK_SIZE, Math.max(1, Math.floor(numeric)));
}

function normaliseWpm(wpm) {
  const numeric = Number(wpm);
  if (Number.isNaN(numeric)) return WPM_MIN;
  return Math.min(WPM_MAX, Math.max(WPM_MIN, numeric));
}

/** Letter and digit count only; punctuation should not add reading time. */
function wordChars(word) {
  return String(word ?? "").match(WORD_CHARACTERS)?.length ?? 0;
}

/**
 * Split text into display chunks and record the data needed for pacing.
 * Chunk size is constrained to the 1–3 values offered by the game controls.
 */
export function tokenize(text, chunkSize = 1) {
  const words = String(text ?? "")
    .trim()
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, MAX_WORDS);
  const size = normaliseChunkSize(chunkSize);
  const chunks = [];

  for (let index = 0; index < words.length; index += size) {
    const group = words.slice(index, index + size);
    const last = group.at(-1);
    chunks.push({
      text: group.join(" "),
      words: group,
      longestWordChars: Math.max(...group.map(wordChars)),
      endsClause: CLAUSE_END.test(last),
      endsSentence: SENTENCE_END.test(last),
    });
  }

  return chunks;
}

/** How long this chunk stays on screen, in milliseconds. */
export function chunkDelay(chunk, wpm) {
  const base = 60000 / normaliseWpm(wpm);
  const displayedWordCount = Math.max(1, chunk?.words?.length ?? 0);
  const longestWordChars = Math.max(0, Number(chunk?.longestWordChars) || 0);
  const over = Math.max(0, longestWordChars - LENGTH_FREE_CHARS);
  const stretch = Math.min(
    LENGTH_STRETCH_MAX,
    1 + over * LENGTH_STRETCH_PER_CHAR,
  );
  let delay = base * displayedWordCount * stretch;

  if (chunk?.endsClause) delay += base * CLAUSE_PAUSE;
  if (chunk?.endsSentence) delay += base * SENTENCE_PAUSE;

  return delay;
}

function pivotCharacterOffset(length) {
  if (length <= 1) return 0;
  if (length <= 5) return 1;
  if (length <= 9) return 2;
  if (length <= 13) return 3;
  return 4;
}

/**
 * Return the raw-string index of a word's optimal recognition point.
 *
 * The Spritz table is based on letter/digit count, then mapped back into the
 * unmodified display word. This means leading quotes and internal apostrophes
 * remain visible but can never become the highlighted pivot. A token with no
 * letters or digits has no valid pivot and returns -1.
 */
export function pivotIndex(word) {
  const rawWord = String(word ?? "");
  const characterIndices = Array.from(rawWord.matchAll(WORD_CHARACTERS), (match) =>
    match.index,
  );
  if (characterIndices.length === 0) return -1;
  return characterIndices[pivotCharacterOffset(characterIndices.length)];
}

/**
 * Locate the pivot in a complete display chunk.
 *
 * Three-word chunks pivot on the middle word. For an even number (including
 * the supported two-word chunk), the first of the central pair is used. Words
 * containing no letters or digits are ignored. Returns -1 when none exist.
 */
export function pivotIndexInText(text) {
  const rawText = String(text ?? "");
  const words = Array.from(rawText.matchAll(/\S+/gu))
    .map((match) => ({ text: match[0], index: match.index }))
    .filter((word) => WORD_CHARACTER.test(word.text));

  if (words.length === 0) return -1;
  const middleWord = words[Math.floor((words.length - 1) / 2)];
  return middleWord.index + pivotIndex(middleWord.text);
}

/** Return the next faster preset, then use 25 wpm steps up to the maximum. */
export function nextSpeed(wpm) {
  const current = normaliseWpm(wpm);
  const preset = SPEED_PRESETS.find(({ wpm: presetWpm }) => presetWpm > current);
  if (preset) return preset.wpm;
  return Math.min(WPM_MAX, current + ABOVE_TOP_PRESET_STEP);
}
