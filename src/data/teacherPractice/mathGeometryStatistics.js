import { YEAR3_SHAPE_BUILDERS } from "../challenges/year3Shapes.js";
import { findShape } from "../challenges/shapes.js";
import { YEAR3_STATISTICS_BUILDERS } from "../challenges/year3Statistics.js";
import { paperQuestion, essential, seededPaper } from "./paperQuestions.js";
export const GEOMETRY_BUILDERS = {
  "drawing-2-d-shapes": YEAR3_SHAPE_BUILDERS.drawing2d,
  "making-and-recognising-3-d-shapes": YEAR3_SHAPE_BUILDERS.solids3d,
  "angles-as-turns": YEAR3_SHAPE_BUILDERS.anglesAsTurns,
  "right-angles": YEAR3_SHAPE_BUILDERS.rightAngles,
  "comparing-angles-to-a-right-angle": YEAR3_SHAPE_BUILDERS.comparingAngles,
  "horizontal-vertical-parallel-and-perpendicular-lines": YEAR3_SHAPE_BUILDERS.lines,
};
export const STATISTICS_BUILDERS = {
  "bar-charts": YEAR3_STATISTICS_BUILDERS.bars,
  "scaled-pictograms": YEAR3_STATISTICS_BUILDERS.pictograms,
  tables: YEAR3_STATISTICS_BUILDERS.tables,
  "one-step-and-two-step-questions": YEAR3_STATISTICS_BUILDERS.problems,
};
function geometry(topic, level, q) {
  let prompt = q.prompt, answer = q.answer, model = null;
  switch (q.type) {
    case "trace-shape": prompt = `Draw a ${q.shape.name}. Use a ruler for straight sides. State how many straight sides and corners it has.`; answer = `A closed ${q.shape.name} with ${q.shape.sides} straight sides and ${q.shape.sides} corners.${q.shape.id === "square" ? " Four equal sides and four right angles." : q.shape.id === "rectangle" ? " Four right angles; opposite sides equal." : ""}`; model = essential("drawing-grid", {}); break;
    case "order-shapes": prompt = `Put these shapes in order by number of sides, fewest first: ${q.items.map((i) => i.label).join(", ")}.`; answer = q.ordered.map((id) => findShape(id).name); break;
    case "clue-shape": prompt = `${q.clue} Name and draw a shape that fits.`; answer = `${findShape(q.answer).name}; accept other drawings satisfying every stated property.`; model = essential("drawing-grid", {}); break;
    case "solid-name": prompt = "Name this 3-D shape."; model = essential("solid", { solid: q.solid.id }); break;
    case "solid-property": prompt = `How many ${q.word} does a ${q.solid.name} have?`; model = { type: "solid", solid: q.solid.id }; break;
    case "solid-build": prompt = `Describe how you could make a ${q.solid.name} using flat faces. State its faces, edges and corners.`; model = { type: "solid", solid: q.solid.id }; break;
    case "solid-clue": prompt = `${q.prompt} Name the 3-D shape.`; break;
    case "turn-name": prompt = "Name the clockwise turn shown. Give it as a fraction of a full turn."; model = essential("turn", { from: "up", degrees: q.degrees }); break;
    case "turn-pair": prompt = `Start facing ${q.from}. Turn clockwise until you face ${q.to}. Name the turn.`; model = essential("turn", { from: q.from, degrees: q.answer === "quarter turn" ? 90 : q.answer === "half turn" ? 180 : 270 }); break;
    case "order-turns": prompt = `Order these turns, smallest first: ${q.items.map((item) => item.label).join("; ")}.`; answer = q.ordered; break;
    case "right-identify": prompt = "Is this a right angle? Explain how you could check it."; model = essential("angle", { degrees: q.degrees }); break;
    case "right-count-shape": prompt = "How many right angles does this shape have? Mark each one."; model = essential("polygon", { shape: q.shape }); break;
    case "right-turn-match": prompt = `What fraction of a full turn is ${q.count} right angles?`; break;
    case "right-turn-story": prompt = `Start facing ${q.from}. Make ${q.turns} clockwise quarter turns. Which way do you face?`; break;
    case "compare-right": prompt = "Is this angle less than, equal to or greater than a right angle?"; model = essential("angle", { degrees: q.degrees }); break;
    case "angle-name": prompt = "Is this angle acute, a right angle or obtuse?"; model = essential("angle", { degrees: q.degrees }); break;
    case "order-angles": prompt = "Order the labelled angles, smallest first."; model = essential("angles", { angles: q.angles.map((a) => ({ label: a.label, degrees: a.value })) }); answer = q.ordered; break;
    case "compare-two-angles": prompt = "Which angle is larger: A or B? If they are equal, write ‘same size’."; model = essential("angles", { angles: [{ label: "A", degrees: q.first }, { label: "B", degrees: q.second }] }); break;
    case "line-direction": prompt = "Is the thick marked line horizontal or vertical?"; model = essential("polygon", { shape: q.shape, highlightSides: q.highlightSides }); break;
    case "line-relation": prompt = "Are the two thick marked lines parallel, perpendicular or neither?"; model = essential("polygon", { shape: q.shape, highlightSides: q.highlightSides }); break;
    default: break;
  }
  return paperQuestion("math", topic, level, prompt, answer, model, "Use the stated properties; rotated drawings can also be correct.", { data: q });
}
function statistics(topic, level, q) {
  let prompt = q.prompt, answer = q.answer;
  const isTable = q.type.startsWith("table") || q.type === "problem-table" || q.representation === "table";
  const isPicto = q.type.startsWith("pictogram") || q.type === "problem-pictogram" || q.representation === "pictogram";
  let model;
  if (isTable) {
    const columns = q.columns ?? [{ key: "count", label: "Count" }];
    const rows = q.rows.map((row) => ({ label: row.label, cells: row.cells ?? { count: row.value } }));
    model = essential("data-table", { caption: q.caption, columns, rows });
  } else model = essential(isPicto ? "pictogram" : "bar-chart", { caption: q.caption, rows: q.sourceRows ?? q.rows, step: q.step ?? q.ratio, max: q.max, ratio: q.ratio });
  switch (q.type) {
    case "bar-read": case "pictogram-read": prompt = `How many ${q.unit} are shown for ${q.ask}?`; break;
    case "bar-difference": case "pictogram-difference": prompt = `How many more ${q.unit} are shown for ${q.second} than ${q.first}?`; break;
    case "bar-build": prompt = "Use the table to draw a bar chart. Label the categories and choose an equal scale."; answer = q.rows.map((r) => `${r.label}: ${r.value}`).join("; "); model = essential("data-table", { caption: q.caption, columns: [{ key: "count", label: q.unit }], rows: q.rows.map((r) => ({ label: r.label, cells: { count: r.value } })) }); break;
    case "pictogram-build": prompt = `Use the table to draw a pictogram. Let one circle represent ${q.ratio} ${q.unit}. Include a key.`; answer = q.rows.map((r) => `${r.label}: ${r.value / q.ratio} circles`).join("; "); model = essential("data-table", { caption: q.caption, columns: [{ key: "count", label: q.unit }], rows: q.rows.map((r) => ({ label: r.label, cells: { count: r.value } })) }); break;
    case "pictogram-story": prompt = `Combine ${q.rows[0].label} and ${q.rows[1].label}. How many whole symbols would their total need using the shown key?`; break;
    case "table-read": prompt = `Read the table. How many ${q.unit} are recorded for ${q.ask} in ${q.columnLabel}?`; break;
    case "table-row-total": prompt = `How many ${q.unit} are recorded for ${q.ask} across both columns?`; break;
    case "table-fill-from-bar": prompt = `Read the bar chart. Write a two-column table showing each category and its count. What is the count for ${q.ask}?`; model = essential("bar-chart", { caption: q.caption, rows: q.sourceRows, step: q.step, max: q.max }); answer = `${q.sourceRows.map((r) => `${r.label}: ${r.value}`).join("; ")}. ${q.ask}: ${q.answer}.`; break;
    default: break;
  }
  return paperQuestion("math", topic, level, prompt, answer, model, "Read the scale or key before comparing the values.", { data: q, largeWorking: ["bar-build", "pictogram-build", "table-fill-from-bar"].includes(q.type) });
}
export function geometryStatisticsPaperPool(topic) {
  const builder = GEOMETRY_BUILDERS[topic] ?? STATISTICS_BUILDERS[topic];
  if (!builder) return [];
  const bank = [];
  for (let seed = 1; seed <= 6; seed++) for (let level = 1; level <= 4; level++) for (const q of builder(level, seededPaper(seed * 59 + level))) {
    const item = (GEOMETRY_BUILDERS[topic] ? geometry : statistics)(topic, level, q);
    if (item) bank.push(item);
  }
  return bank;
}
