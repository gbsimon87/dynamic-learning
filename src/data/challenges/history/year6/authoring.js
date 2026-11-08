import { topic } from "../year2/authoring.js";
export { sort, order } from "../year2/authoring.js";
export { lesson, detective } from "../year5/authoring.js";

// Timelines are read-only labels. Children order them and place events, but never calculate with dates.
export const LOCAL_TIMELINE = {
  earlierBands: ["Roman Britain", "Anglo-Saxon kingdoms"],
  bands: ["Jarrow monastery founded · AD 681", "Bede dies · AD 735", "Norman Conquest · 1066", "Palmer's shipyard opens · 1851", "Palmer's shipyard closes · 1934", "Jarrow March · 1936"],
};
export const CRIME_TIMELINE = {
  earlierBands: ["Anglo-Saxon laws"],
  bands: ["Norman Conquest · 1066", "Magna Carta · 1215", "Poor Law · 1601", "Bow Street Runners · about 1749", "First Fleet to Australia · 1788", "Metropolitan Police · 1829", "Pentonville Prison · 1842", "Fingerprint bureau · 1901", "Death penalty for murder ends · 1965", "DNA used to solve a crime · 1987"],
};
export const BRITAIN_TIMELINE = {
  bands: ["Romans invade Britain · AD 43", "Alfred defeats the Vikings · AD 878", "Norman Conquest · 1066", "Magna Carta · 1215", "Poor Law · 1601", "Police formed in London · 1829", "Palmer's shipyard opens · 1851", "Jarrow March · 1936"],
};

export function year6Topic(references, levels) {
  return { ...topic(references, levels), year: 6 };
}
