import {
  blockPicture3,
  buildNumberFromBlocks,
  digitsOf,
  shuffleValues,
} from "./placeValue3Digit.js";

const PLACES = { 1: "ones", 10: "tens", 100: "hundreds" };

const GENTLE = [
  { start: 234, change: 1 },
  { start: 356, change: -1 },
  { start: 478, change: 10 },
  { start: 562, change: -10 },
  { start: 683, change: 100 },
  { start: 745, change: -100 },
];

const CROSSING = [
  { start: 389, change: 1 },
  { start: 420, change: -1 },
  { start: 396, change: 10 },
  { start: 504, change: -10 },
  { start: 895, change: 100 },
  { start: 201, change: -100 },
];

const BUILD = [
  { start: 342, changes: [100, 10] },
  { start: 576, changes: [-100, 1] },
  { start: 238, changes: [100, -10] },
  { start: 745, changes: [-100, 10] },
  { start: 631, changes: [10, 1] },
  { start: 864, changes: [-10, -1] },
];

const STORIES = [
  { start: 352, change: 100, prompt: "A library has 352 books. It gets 100 more. How many books now?" },
  { start: 467, change: -10, prompt: "A shop has 467 stickers. It sells 10. How many are left?" },
  { start: 628, change: 1, prompt: "There are 628 beads. One more bead is added. How many now?" },
  { start: 731, change: -100, prompt: "A hall has 731 chairs. 100 are taken away. How many remain?" },
  { start: 284, change: 10, prompt: "A box holds 284 cards. Ten more go in. How many cards now?" },
  { start: 513, change: -1, prompt: "There are 513 tickets. One is used. How many are left?" },
];

export function placeForChange(change) {
  return PLACES[Math.abs(change)];
}

export function changeWords(change) {
  return `${Math.abs(change)} ${change > 0 ? "more" : "less"}`;
}

/** Four numbers that reflect common mistakes: no change, wrong direction, and
 * changing the wrong place or making two jumps. */
export function changeOptions(start, change, rng) {
  const answer = start + change;
  const wrongPlace = Math.abs(change) === 100 ? 10 : Math.abs(change) * 10;
  const candidates = [
    start,
    start - change,
    start + 2 * change,
    start + Math.sign(change) * wrongPlace,
  ];
  const options = [answer];
  for (const candidate of candidates) {
    if (candidate < 100 || candidate > 999 || options.includes(candidate)) continue;
    options.push(candidate);
    if (options.length === 4) break;
  }
  return shuffleValues(options, rng);
}

export function buildPlaceChangeQuestions(level, rng) {
  if (level === 1 || level === 2) {
    const plans = level === 1 ? GENTLE : CROSSING;
    return shuffleValues(plans, rng).map(({ start, change }) => ({
      start,
      change,
      answer: start + change,
      place: placeForChange(change),
      picture: blockPicture3(start),
      options: changeOptions(start, change, rng),
    }));
  }
  if (level === 3) {
    return shuffleValues(BUILD, rng).map(({ start, changes }) => ({
      start,
      changes,
      answer: start + changes.reduce((sum, change) => sum + change, 0),
      picture: blockPicture3(start),
    }));
  }
  if (level === 4) {
    return shuffleValues(STORIES, rng).map(({ start, change, prompt }) => ({
      start,
      change,
      prompt,
      answer: start + change,
    }));
  }
  throw new RangeError(`Unknown challenge level: ${level}`);
}

export function blockValue(blocks) {
  return buildNumberFromBlocks(blocks);
}

export function stepBlocks(blocks, place, delta) {
  const next = { ...blocks, [place]: Math.max(0, Math.min(9, blocks[place] + delta)) };
  return next;
}

export function changedOnlyNamedPlace(start, answer, place) {
  const before = digitsOf(start);
  const after = digitsOf(answer);
  return Object.keys(before).every((key) => key === place || before[key] === after[key]);
}
