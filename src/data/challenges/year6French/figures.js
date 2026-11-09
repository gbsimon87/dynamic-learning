// Picture helpers for Year 6 French, drawn by Year5FrenchVisual (types in ../year5French/visualTypes.js).
// A topic visual shows on the start screen and on level 1, so it sets the scene and never shows an answer.
// A question picture may show what the ENGLISH in a question says, never the French answer.
const spread = (emojis) => {
  const n = emojis.length;
  const size = n === 1 ? 100 : n === 2 ? 84 : 72;
  const xs = n === 1 ? [200] : n === 2 ? [130, 270] : [90, 200, 310];
  return emojis.map((e, i) => [e, xs[i], 118, size]);
};
/** Up to three emojis on a plain backdrop. */
export const scene = (alt, emojis) => ({ type: "scene", backdrop: "plain", alt, items: spread(emojis), caption: "" });
/** A backdrop ("plain", "room", "street", "sky") with placed items [emoji, x, y, size]. */
export const place = (backdrop, alt, items, caption = "") => ({ type: "scene", backdrop, alt, items, caption });
/** Two people talking; the first says `phrase`. */
export const chat = (phrase) => ({
  type: "scene", backdrop: "room", caption: "",
  alt: `Two people are talking. One of them says: ${phrase}`,
  items: [["🧑", 100, 188, 64], ["🧒", 300, 188, 64]],
  bubbles: [{ x: 170, y: 72, text: phrase, tail: "bl", max: 20 }, { x: 305, y: 116, text: "…", tail: "br", w: 64 }],
});
