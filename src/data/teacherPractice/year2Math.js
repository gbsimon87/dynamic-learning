import { YEAR2_PAPER_BUILDERS } from "./year2Builders.js";
import { paperQuestion, seededPaper, essential } from "./paperQuestions.js";
import { describeChange } from "../challenges/countingMoreAndLess.js";
import { findShape, findSolid } from "../challenges/shapes.js";
import { formatMoney } from "../challenges/measurement.js";
import { runProgram } from "../challenges/positionAndDirection.js";

const letter = (i) => String.fromCharCode(65 + i);
const sorted = (items) => [...items].sort((a, b) => String(a.label ?? a).localeCompare(String(b.label ?? b), "en", { numeric: true }));
const NAMES = { "🔵": "blue counter", "🟢": "green counter", "🟡": "yellow counter", "🔴": "red counter", "☀️": "sun", "❤️": "heart", "⭐": "star", "🧸": "teddy", "🍌": "banana", "🌸": "flower", "🐢": "turtle" };
const itemName = (item) => NAMES[item] ?? item;

function adapted(topic, level, source, q) {
  let prompt = q.prompt ?? q.story, answer = q.answer, model = null;
  const lines = [], visuals = [];
  if (q.known) lines.push(q.known);
  if (source === "buildFillGapQuestions" || source === "buildNamedStepQuestions") {
    prompt = q.step ? `Count in ${q.step}s. Fill the gap.` : "Count forwards in ones. Fill the gap.";
    lines.push(q.terms.map((n, i) => q.gaps.includes(i) ? "____" : n).join(" → "));
    answer = q.gaps.map((i) => q.terms[i]).join(", ");
  } else if (source === "buildWordsToDigitsQuestions") { prompt = `Write “${q.words}” in numerals.`; answer = q.value; }
  else if (source === "buildCountOnQuestions") prompt = `Start at ${q.start}. Count on ${q.by}. What number do you reach?`;
  else if (source === "buildOneMoreLessQuestions") prompt = `What is ${describeChange(q.change)} than ${q.start}?`;
  else if (source === "buildCountBlocksQuestions") {
    prompt = `How many ${q.asksTens ? "tens rods" : "ones cubes"} are shown?`;
    model = essential("blocks", { hundreds: 0, tens: Math.floor(q.value / 10), ones: q.value % 10 });
  } else if (source === "buildPickSymbolQuestions") prompt = `Complete ${q.left} ____ ${q.right}. Use <, > or =.`;
  else if (source === "buildBetweenQuestions") { prompt = `Write all the whole numbers greater than ${q.low} and less than ${q.high}.`; answer = Array.from({ length: q.high - q.low - 1 }, (_, i) => q.low + i + 1).join(", "); }
  else if (["buildDoubling", "buildDoublingQuestions"].includes(source)) prompt = `What is double ${q.n}?`;
  else if (source === "buildHalving") prompt = `What is half of ${q.n}?`;
  else if (source === "buildAddOnesQuestions") prompt = `${q.start} + ${q.add} = ____`;
  else if (source === "buildTwoDigitQuestions") prompt = `${q.a} ${q.operator} ${q.b} = ____`;
  else if (source === "buildMissingAddendQuestions") prompt = `${q.known} + ____ = ${q.total}`;
  else if (source === "buildMissingNumberQuestions" || source === "buildInverseMissingNumbers") prompt = `Find the missing number: ${q.text}`;
  else if (source === "buildMultiplicationArrays") { prompt = "How many counters in this array? Write a multiplication to match."; model = essential("array", { rows: q.rows, columns: q.columns }); }
  else if (source === "buildSharingPictures") { prompt = `Share ${q.total} counters equally between ${q.groups} groups. How many in each group?`; }
  else if (["buildDivisionStatementChoice", "buildOperationChoice"].includes(source)) prompt += " Write the calculation you would use.";
  else if (source === "buildRelatedDivisionChoice") prompt = `Use ${q.a} × ${q.b} = ${q.product}. Choose the related division fact.`;
  else if (source === "buildNameFraction") { prompt = `What fraction of the bar is ${q.ask === "coloured" ? "shaded" : "unshaded"}?`; model = essential("bar", { parts: q.parts.length, shaded: q.parts.filter(Boolean).length }); }
  else if (source === "buildWriteFraction") { prompt = `Fill the missing number: ${q.text.replace(/coloured/g, "shaded")}`; model = essential("bar", { parts: q.parts.length, shaded: q.parts.filter(Boolean).length }); }
  else if (["buildFractionOfRows", "buildFractionOfSet"].includes(source)) { prompt = `Find ${q.fraction.numerator}/${q.fraction.denominator} of ${q.total}${q.noun ? ` ${q.noun}` : " counters"}.`; }
  else if (source === "buildFractionStatements") prompt = `${q.text} ____`;
  else if (source === "buildRulerReadQuestions") { prompt = "Read the marked length in centimetres."; model = essential("ruler", { min: 0, max: 30, step: 5, minorStep: 1, value: q.value, unit: "cm" }); }
  else if (source === "buildScaleReadQuestions") { prompt = `What is the mass of the ${q.thing}?`; model = essential("dial-scale", { min: 0, max: 1000, step: 100, minorStep: 100, value: q.value, unit: "g" }); }
  else if (source === "buildVisualCompareQuestions") { prompt = `Compare the ${q.noun}: A is ${q.a} ${q.unit}; B is ${q.b} ${q.unit}. Complete A ____ B using <, > or =.`; }
  else if (source === "buildThermometerReadQuestions") { prompt = "Read the temperature marked A on this scale."; model = essential("number-line", { min: 0, max: 50, step: 10, minorStep: 5, value: q.value, unit: "°C" }); }
  else if (source === "buildTemperatureSenseQuestions") prompt = `Choose the most likely temperature for ${q.thing}.`;
  else if (source === "buildClockReadQuestions") { prompt = "What time does the clock show?"; model = essential("clock", { hour: q.hour, minute: q.minute }); }
  else if (source === "buildCoinNameQuestions") { prompt = `What is the value of a coin marked “${q.words}”?`; }
  else if (source === "buildCoinTotalQuestions") { prompt = "What is the total value of these coins in pence?"; lines.push(`Coins: ${q.coins.map(formatMoney).join(" + ")}`); answer = `${q.answer}p`; }
  else if (source === "buildNameShapes") { prompt = "Name this 2-D shape."; visuals.push({ type: "shape", shape: q.shape }); }
  else if (source === "buildNameSolids") { prompt = "Name this 3-D shape."; visuals.push({ type: "solid", solid: q.solid }); }
  else if (source === "buildFaceOnSolid") { prompt = "Which of the choices is the shape of a flat face on this solid?"; visuals.push({ type: "solid", solid: q.solid }); }
  else if (source === "buildShapeClues") prompt = `Which shape fits this clue? ${q.clue}`;
  else if (source === "buildOrderBySides" || source === "buildOrderSolids") {
    prompt = source === "buildOrderBySides" ? "Order the shapes, fewest sides first. Write their letters." : `Order the solids by ${q.word}, ${q.direction} first. Write their letters.`;
    q.cards.forEach((card, i) => visuals.push({ type: card.shapeId ? "shape" : "solid", label: letter(i), ...(card.shapeId ? { shape: findShape(card.shapeId) } : { solid: findSolid(card.solidId) }) }));
    answer = q.ordered.map((id) => letter(q.cards.findIndex((card) => card.id === id))).join(" → ");
  } else if (source === "buildFillGap") {
    prompt = "Continue the repeating pattern. What shape belongs in the gap?";
    q.items.forEach((id, i) => visuals.push(i === q.gapIndex ? { type: "gap" } : { type: "shape", shape: findShape(id) }));
  } else if (source === "buildBuildPattern") {
    prompt = "Draw the repeating unit twice to make six shapes.";
    q.unit.forEach((id) => visuals.push({ type: "shape", shape: findShape(id) }));
    answer = q.target.join(" → ");
  } else if (source === "buildDescribePosition") {
    prompt = `Where is the ${itemName(q.object.emoji)} compared with the ${itemName(q.centre.emoji)}?`;
    for (let row = 0; row < 3; row++) lines.push(`Row ${row + 1} (left to right): ${Array.from({ length: 3 }, (_, col) => itemName(q.objects.find((o) => o.x === col && o.y === row)?.emoji ?? "empty")).join(" | ")}`);
  } else if (source === "buildArrangeLine") { prompt = `Arrange the animals from first to last. ${q.clue}`; answer = q.order.join(" → "); }
  else if (source === "buildPredictTurn") prompt = `An arrow starts pointing ${q.from}. It makes a ${q.turnName} ${q.direction}. Which way does it point now?`;
  else if (source === "buildRobotTurn") prompt = `A robot faces ${q.heading}. It makes one right-angle turn to its own ${q.instruction}. Which way does it face now?`;
  else if (source === "buildCornerRoute") {
    prompt = `On a four-by-four board, rows run from top to bottom and columns from left to right. A robot starts in row ${q.start.y + 1}, column ${q.start.x + 1}, facing ${q.start.heading}. A star is in row ${q.target.y + 1}, column ${q.target.x + 1}. Write a route using “forward one square”, “turn left” and “turn right”. Stay on the board.`;
    const targetX = q.target.x > q.start.x ? "right" : "left", targetY = q.target.y > q.start.y ? "down" : "up";
    let state = { ...q.start }; const moves = [];
    for (const [heading, steps] of [[targetX, Math.abs(q.target.x - q.start.x)], [targetY, Math.abs(q.target.y - q.start.y)]]) {
      for (let turns = 0; turns < 3 && state.heading !== heading; turns++) { moves.push("turn right"); state = runProgram(state, ["right"], 4); }
      for (let n = 0; n < steps; n++) { moves.push("forward one square"); state = runProgram(state, ["forward"], 4); }
    }
    answer = `For example: ${moves.join("; ")}. Accept any route that reaches the star and stays on the board.`;
  }
  if (q.rows && ["pictograms", "tally-charts", "block-diagrams", "tables"].includes(topic.topicId)) {
    if (topic.topicId === "pictograms") model = essential("pictogram", { rows: q.rows, ratio: q.ratio, caption: "Use the key" });
    else if (topic.topicId === "block-diagrams") model = essential("bar-chart", { rows: q.rows, max: q.max, step: 1, caption: "Block diagram" });
    else {
      const tally = topic.topicId === "tally-charts";
      const columns = q.columns ?? [{ key: "value", label: tally ? "Tally marks (groups of five)" : q.column ?? "Number" }];
      model = essential("data-table", { caption: q.caption, columns, rows: q.rows.map((row) => ({ label: row.label, cells: Object.fromEntries(columns.map((c) => [c.key, tally ? `${"||||/ ".repeat(Math.floor(row.value / 5))}${"|".repeat(row.value % 5)}` : row[c.key]])) })) });
    }
  }
  if (source === "buildPileCount" || source === "buildPileProblems") {
    prompt ??= `Count the ${q.name}. How many are there?`;
    lines.push(`Cards: ${q.items.map(itemName).join(" · ")}`);
  }
  if (q.unit && typeof q.unit === "string" && typeof answer === "number") answer = q.unit === "£" ? `£${answer}` : `${answer}${q.unit === "p" ? "" : " "}${q.unit}`;
  if (q.options && !model) lines.push(`Choices: ${sorted(q.options).join(" / ")}`);
  if (!model && (lines.length || visuals.length)) model = essential("curriculum-source", { year: 2, subject: "math", title: "Read and answer", lines, ...(visuals.length ? { visual: { type: "paper-shapes", cards: visuals } } : {}) });
  if (!prompt || answer === undefined) throw new Error(`Missing Year 2 paper task: ${source}`);
  return paperQuestion("math", topic.id, level, prompt, answer, model, "", { largeWorking: source.includes("Order") || source === "buildCornerRoute", data: { sourceBuilder: source } });
}
export function year2MathPaperPool(topic) {
  if (topic.topicId === "2-5-and-10-multiplication-tables") return [2, 5, 10].flatMap((table) => Array.from({ length: 12 }, (_, n) => {
    const factor = n + 1, total = table * factor;
    return [paperQuestion("math", topic.id, 1, `${factor} × ${table} = ____`, total), paperQuestion("math", topic.id, 4, `There are ${factor} bags, each holding ${table} marbles. How many marbles altogether?`, total)];
  })).flat();
  const builders = YEAR2_PAPER_BUILDERS[topic.topicId];
  if (!builders) throw new RangeError(`Missing Year 2 Maths topic: ${topic.topicId}`);
  const bank = [];
  for (let seed = 1; seed <= 8; seed++) for (const level of [1, 4]) {
    const { build, source } = builders[level === 1 ? 0 : 1];
    for (const q of build(seededPaper(seed * 193 + level))) bank.push(adapted(topic, level, source, q));
  }
  return bank;
}
