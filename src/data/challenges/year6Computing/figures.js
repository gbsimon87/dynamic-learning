import { rule } from "../figures.js";

// Pictures for Year 6 Computing, drawn by the Year 5 Computing renderer. Topic visuals set the
// scene only; question rules draw the program from the question's own lines.
const spread = (emojis) => {
  const n = emojis.length;
  const size = n === 1 ? 100 : n === 2 ? 86 : 72;
  const xs = n === 1 ? [200] : n === 2 ? [130, 270] : [90, 200, 310];
  return emojis.map((e, i) => [e, xs[i], 118, size]);
};
const scene = (alt, emojis) => ({ type: "scene", backdrop: "plain", alt, items: spread(emojis), caption: "" });
const isCode = (q) => q.passage?.kind === "code";
const lines = (q) => q.passage.blocks.map((b) => b.text).filter((l) => l.trim());
const blocks = (q) => ({ type: "blocks", lines: lines(q), caption: q.passage.title, alt: `${q.passage.title} drawn as command blocks, from the top block to the bottom block: ${lines(q).map((l) => l.trim()).join("; ")}.` });
const codeRule = rule(isCode, blocks);

export const TOPIC_VISUALS = {
  "combining-loops-and-decisions": scene("Arrows going round in a loop next to a signpost pointing two ways.", ["🔁", "🔀"]),
  "variables-that-change": scene("A box of numbers and a graph going up.", ["📦", "📈"]),
  procedures: scene("A toolbox and a friendly robot.", ["🧰", "🤖"]),
  "debugging-longer-programs": scene("A ladybird bug, a magnifying glass and a laptop.", ["🐞", "🔍", "💻"]),
  "sensors-and-inputs": scene("A thermometer, a light bulb and a microchip.", ["🌡️", "💡", "🔌"]),
  "controlling-devices": scene("A traffic light and a fan.", ["🚦", "🌀"]),
  simulations: scene("A rabbit and a computer screen.", ["🐇", "💻"]),
  "searching-algorithms": scene("A magnifying glass over a list.", ["🔍", "📋"]),
  "sorting-algorithms": scene("Bars of different heights and a pair of arrows.", ["📶", "🔃"]),
  "comparing-algorithms": scene("A balance scale and a stopwatch.", ["⚖️", "⏱️"]),
  "collecting-data": scene("A clipboard and a pencil.", ["📋", "✏️"]),
  "databases-and-spreadsheets": scene("A card file box and a table of numbers.", ["🗂️", "🧮"]),
  "presenting-data": scene("A bar chart and a line graph.", ["📊", "📈"]),
  "how-email-and-messaging-work": scene("An envelope, a cloud and a laptop.", ["✉️", "☁️", "💻"]),
  "smart-searching": scene("A magnifying glass and a laptop.", ["🔍", "💻"]),
  "fact-or-fake": scene("A newspaper and a thinking face.", ["📰", "🧐"]),
  "digital-footprint-and-reporting": scene("Footprints and a shield.", ["👣", "🛡️"]),
};

// Topics whose questions show programs get them drawn as blocks; the rest keep the topic picture.
const PROGRAM_TOPICS = ["combining-loops-and-decisions", "variables-that-change", "procedures", "debugging-longer-programs", "sensors-and-inputs", "controlling-devices", "simulations"];
export const FIGURE_RULES = Object.fromEntries(Object.keys(TOPIC_VISUALS).map((id) => [id, PROGRAM_TOPICS.includes(id) ? [codeRule] : []]));
