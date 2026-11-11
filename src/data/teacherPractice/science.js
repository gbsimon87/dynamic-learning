import { paperQuestion, essential, seededPaper, cleanPaperPrompt } from "./paperQuestions.js";
import { shadowGeometry } from "../challenges/science/shadowModel.js";
import { specimenText, testText } from "../challenges/science/comparingAndGroupingRocks.js";
import { buildShadowSizeQuestions } from "../challenges/science/changingShadowSize.js";
import { buildRocksQuestions } from "../challenges/science/comparingAndGroupingRocks.js";
import { buildContactQuestions } from "../challenges/science/contactAndMagneticForces.js";
import { buildFossilQuestions } from "../challenges/science/howFossilsForm.js";
import { buildShadowFormationQuestions } from "../challenges/science/howShadowsForm.js";
import { buildLightQuestions } from "../challenges/science/lightAndDarkness.js";
import { buildMaterialsQuestions } from "../challenges/science/magneticMaterials.js";
import { buildPolesQuestions } from "../challenges/science/magnetsAndTheirPoles.js";
import { buildMovementQuestions } from "../challenges/science/movementOnDifferentSurfaces.js";
import { buildMusclesQuestions } from "../challenges/science/musclesAndMovement.js";
import { buildNutritionQuestions, FOOD_GROUPS } from "../challenges/science/nutritionForAnimalsAndHumans.js";
import { buildPartsOfFloweringPlantsQuestions } from "../challenges/science/partsOfFloweringPlants.js";
import { buildPollinationAndSeedFormationQuestions } from "../challenges/science/pollinationAndSeedFormation.js";
import { buildPredictionQuestions } from "../challenges/science/predictingAttractionAndRepulsion.js";
import { buildSunlightQuestions } from "../challenges/science/protectingOurEyesFromSunlight.js";
import { buildReflectionQuestions } from "../challenges/science/reflectedLight.js";
import { buildSeedDispersalQuestions } from "../challenges/science/seedDispersal.js";
import { buildSkeletonQuestions } from "../challenges/science/skeletonsForSupportAndProtection.js";
import { buildWaterTransportInPlantsQuestions } from "../challenges/science/waterTransportInPlants.js";
import { buildWhatPlantsNeedToGrowQuestions } from "../challenges/science/whatPlantsNeedToGrow.js";
import { buildSoilQuestions } from "../challenges/science/whatSoilIsMadeFrom.js";

export const SCIENCE_BUILDERS = {
  "changing-shadow-size": buildShadowSizeQuestions,
  "comparing-and-grouping-rocks": buildRocksQuestions,
  "contact-and-magnetic-forces": buildContactQuestions,
  "how-fossils-form": buildFossilQuestions,
  "how-shadows-form": buildShadowFormationQuestions,
  "light-and-darkness": buildLightQuestions,
  "magnetic-materials": buildMaterialsQuestions,
  "magnets-and-their-poles": buildPolesQuestions,
  "movement-on-different-surfaces": buildMovementQuestions,
  "muscles-and-movement": buildMusclesQuestions,
  "nutrition-for-animals-and-humans": buildNutritionQuestions,
  "parts-of-flowering-plants": buildPartsOfFloweringPlantsQuestions,
  "pollination-and-seed-formation": buildPollinationAndSeedFormationQuestions,
  "predicting-attraction-and-repulsion": buildPredictionQuestions,
  "protecting-our-eyes-from-sunlight": buildSunlightQuestions,
  "reflected-light": buildReflectionQuestions,
  "seed-dispersal": buildSeedDispersalQuestions,
  "skeletons-for-support-and-protection": buildSkeletonQuestions,
  "water-transport-in-plants": buildWaterTransportInPlantsQuestions,
  "what-plants-need-to-grow": buildWhatPlantsNeedToGrowQuestions,
  "what-soil-is-made-from": buildSoilQuestions,
};
const asStrings = (value) => typeof value === "string" ? [value] : Array.isArray(value) ? value.filter((item) => typeof item === "string") : [];
const plain = (value) => String(value).replace(/([a-z])([A-Z])/g, "$1 $2");
function evidence(q, topic) {
  const lines = [q.text, q.observation, q.guide, q.description, q.information, q.comparison, q.setup, q.feature, q.movement, q.evidence].flatMap(asStrings);
  if (topic === "comparing-and-grouping-rocks") for (const sample of q.specimens ?? (q.specimen ? [q.specimen] : [])) lines.push(specimenText(sample), testText(sample));
  if (q.features) lines.push(...q.features.map((feature) => `${feature.letter}: ${feature.text}`));
  if (q.property && Array.isArray(q.results)) lines.push(...q.results.map((result, n) => `Sample ${n === 0 ? "X" : "Y"}: ${result ? q.property.yes : q.property.no}`));
  if (q.job?.observation) lines.push(q.job.observation);
  if (q.job?.text) lines.push(q.job.text);
  if (q.cards && topic === "skeletons-for-support-and-protection") lines.push(...q.cards.map((card) => `${card.label}: ${card.text}`));
  if (q.specimens && topic === "seed-dispersal") lines.push(...q.specimens.map((s) => `${s.feature} ${s.movement}`));
  for (const stage of q.stages ?? []) {
    if (stage.evidence) lines.push(`${stage.label ?? "Observation"}: ${stage.evidence}`);
    if (stage.text) lines.push(`${stage.label ?? "Observation"}: ${stage.text}`);
    else if (stage.heights) lines.push(`${stage.label}: plant A ${stage.heights.A} cm; plant B ${stage.heights.B} cm.`);
    else if (stage.geometry) { const g = shadowGeometry(stage.geometry); lines.push(`${stage.label}: source-to-object distance ${g.sourceDistance}; object-to-screen distance ${g.screenDistance}; shadow height ${g.shadowHeight} cm.`); }
    else if (stage.pose) lines.push(`${stage.label}: the model arm is ${stage.pose === "half" ? "part-way bent" : stage.pose}.`);
    else if (stage.marks) lines.push(`${stage.label}: visible dye is recorded in ${stage.marks.map(plain).join(", ") || "no visible part yet"}.`);
    else if (stage.description) lines.push(`${stage.label}: ${stage.description}`);
  }
  return [...new Set(lines.filter((line) => typeof line === "string" && line.trim()))];
}
function adapt(topic, level, q) {
  let prompt = q.prompt, answer = q.answer, lines = evidence(q, topic), reason = "", model = null;
  if (topic === "parts-of-flowering-plants") {
    if (level === 3) { prompt = "Draw a flowering plant. Label its roots, stem, leaves and flower. Write the job of any two parts."; answer = "Roots: take in water and nutrients and anchor the plant. Stem: supports the plant and carries water. Leaves: make food using light. Flowers: help reproduction and seed formation."; model = essential("drawing-grid", {}); }
    else { prompt = q.clue; answer = q.part === "stem" ? "Stem / trunk" : q.part; if (level === 4) { prompt += " Explain its job."; answer += `: ${q.end}`; } }
  } else if (topic === "comparing-and-grouping-rocks" && level === 2) {
    prompt = `Group the samples by this criterion: ${q.criterion.label}. For each sample, write ‘${q.criterion.yes}’ or ‘${q.criterion.no}’.`;
    answer = q.specimens.map((s) => `Sample ${s.id}: ${s[q.criterion.id] ? q.criterion.yes : q.criterion.no}`).join("; ");
  } else if (topic === "comparing-and-grouping-rocks" && level === 3) {
    prompt = `Make a table for these samples using the columns ${q.columns.map((c) => c.label).join(" and ")}. Record yes or no for each feature.`;
    answer = q.specimens.map((s) => `Sample ${s.id}: ${q.columns.map((c) => `${c.label}: ${s[c.id] ? "yes" : "no"}`).join(", ")}`).join("; ");
  } else if (topic === "what-soil-is-made-from" && level === 1) {
    const marked = q.features.find((feature) => feature.id === q.component);
    prompt = `${q.prompt} ${marked.letter}?`;
  } else if (topic === "what-soil-is-made-from" && level === 3) {
    prompt = "Use the specimen notes. Name the soil component at each letter.";
    answer = q.features.map((feature) => `${feature.letter}: ${q.labels.find((label) => label.id === feature.id).label}`).join("; ");
  } else if (topic === "nutrition-for-animals-and-humans" && level === 3) {
    prompt = "Choose food cards to meet the model's group counts. Use each card at most once. List your choices.";
    lines.push(...Object.entries(q.requirements).map(([group, count]) => `${FOOD_GROUPS.find((item) => item.id === group).label}: choose ${count} cards.`), ...q.tiles.map((tile) => tile.label));
    answer = Object.entries(q.requirements).map(([group, count]) => `${count} cards from ${FOOD_GROUPS.find((item) => item.id === group).label}, for example ${q.foods.filter((food) => food.group === group).slice(0, count).map((food) => food.label).join(", ")}`).join("; ");
    reason = "Accept any selection meeting the counts with no repeated card. These model cards are not a complete day's diet or feeding advice.";
  } else if (topic === "how-fossils-form" && level === 3) {
    prompt = "Number these fossil-formation stages in order, earliest first.";
    lines = q.pictureCards.map((card) => `${card.letter}: ${card.text}`);
    answer = q.stages.map((stage) => q.pictureCards.find((card) => card.id === stage.id)?.letter).join(" → ");
  } else if (topic === "protecting-our-eyes-from-sunlight" && level <= 2) {
    prompt = level === 1 ? "What should the character do to protect their eyes?" : `Sort these actions: ${q.bins.map((bin) => bin.label).join(" / ")}.`;
    if (level === 2) {
      lines.push(...q.actions.map((action, n) => `${n + 1}. ${action.label}`));
      answer = q.actions.map((action) => `${action.label}: ${action.safe ? "Protective choice" : "Choice to avoid"}`).join("; ");
    }
  } else if (q.steps?.length) {
    prompt = "Number these statements in the correct order. Explain what happens at each stage.";
    const shuffled = q.tiles?.length ? q.tiles.map((t) => t.label) : [...q.steps].reverse();
    lines = [...lines, ...shuffled.map((text, n) => `${n + 1}. ${text}`)]; answer = q.steps.join(" → ");
  } else if (topic === "what-plants-need-to-grow" && level === 3) {
    prompt = `Plan a fair comparison: ${q.prompt} State what you will change, keep the same and measure.`;
    answer = `${q.comparison} Change ${q.factor}; keep other conditions the same. Measure the stated outcome after the same time.`;
    lines = [];
  } else if (level >= 3 && (q.conclusion || q.explanation || q.clauses || q.correctConclusionIds?.length)) {
    const supported = q.correctConclusionIds?.map((id) => q.tiles?.find((tile) => tile.id === id)?.label).filter(Boolean);
    answer = q.conclusion ?? q.explanation ?? q.clauses?.join(" ") ?? (supported?.length ? supported.join(" ") : undefined);
    if (answer) prompt = "Use the supplied observations to explain what happened. State one supported conclusion and one limit on what the evidence proves.";
    reason = q.followUp ? `A useful further question: ${q.followUp}` : "Accept explanations consistent with the supplied evidence; avoid claims about every plant, material or test.";
  } else if (q.recordExpected && Object.keys(q.recordExpected).length && q.recordCards?.length && q.recordBins?.length) {
    prompt = `Classify the statements or observations under these headings: ${q.recordBins.map((bin) => bin.label).join("; ")}.`;
    lines.push(...q.recordCards.map((card, i) => `${i + 1}. ${card.label}`));
    answer = q.recordCards.map((card) => `${card.label}: ${q.recordBins.find((bin) => bin.id === q.recordExpected[card.id])?.label ?? q.recordExpected[card.id]}`).join("; ");
  } else if (topic === "skeletons-for-support-and-protection" && level === 2) {
    prompt = `Sort the animals: ${q.bins.map((bin) => bin.label).join(" / ")}.`;
    answer = q.cards.map((card) => `${card.label}: ${q.bins.find((bin) => bin.id === q.expected[card.id]).label}`).join("; ");
  } else if (topic === "skeletons-for-support-and-protection" && level === 3) {
    prompt = "What job does the structure described in this record perform?"; answer = q.job.answer;
  }
  if (!prompt && topic === "skeletons-for-support-and-protection" && level === 1) prompt = "What job does the structure described in this record perform?";
  if (!prompt || answer === undefined || answer === null) return null;
  prompt = cleanPaperPrompt(prompt).replace(/pictures/g, "observations").replace(/picture/g, "record").replace(/shown on the diagram/g, "described in the record");
  if (!model && lines.length) model = essential("reading", { title: "Bix model observations — read before answering", lines });
  if (topic === "protecting-our-eyes-from-sunlight") reason = `${reason} Never look directly at the Sun, even through dark glasses.`.trim();
  return paperQuestion("science", topic, level, prompt, answer, model, reason, { data: { sourceId: q.id, sourceAnswer: q.answer }, largeWorking: level >= 3 });
}
export function sciencePaperPool(topic) {
  const builder = SCIENCE_BUILDERS[topic];
  if (!builder) return [];
  const bank = [];
  for (let seed = 1; seed <= 12; seed++) for (let level = 1; level <= 4; level++) for (const q of builder(level, seededPaper(seed * 131 + level))) {
    const item = adapt(topic, level, q);
    if (item) bank.push(item);
  }
  return bank;
}
