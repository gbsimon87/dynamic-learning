import { sample, shuffle } from "../english/shared.js";
export const SOURCE = { label: "Nemours KidsHealth muscle information (adapted)", url: "https://kidshealth.org/en/kids/muscles.html" };
export const GLOSS = "A joint is where two bones meet. To contract means a muscle gets shorter and pulls. To relax means it stops pulling and can stretch longer. Tendons join muscles to bones. This topic shows just one pair of arm muscles, not every muscle in the body.";
const roles = [
  ["How does a muscle move a bone?", "It pulls on the bone", "It pushes the bone away", "It makes the bone shrink"],
  ["The front muscle contracts to bend this arm. What happens to it?", "It gets shorter and pulls", "It gets longer and pushes", "It stays the same length"],
  ["Where do the arm bones meet?", "At the elbow joint", "Inside the hand", "At the front muscle"],
  ["What helps to straighten this arm?", "The back muscle contracts and pulls", "The front muscle pushes the bone back", "Both bones become soft"],
  ["What works together to move this arm?", "Muscles and bones at a joint", "Bones moving without muscles", "Only the skin on the arm"],
];
export const ROLE_BANK = ["straight", "half", "bent"].flatMap((pose) => roles.map(([prompt, answer, ...wrong], i) => ({ id: `role-${pose}-${i}`, pose, prompt, answer, options: [answer, ...wrong], text: "Muscles pull on bones. Tendons join muscles to bones. The bones move at the elbow joint. The front muscle gets shorter to bend the arm. The back muscle gets shorter to straighten it." })));
const routes = [
  { id: "bend", poses: ["straight", "half", "bent"], change: "The arm becomes more bent.", muscle: "front", other: "back", direction: "bends" },
  { id: "straighten", poses: ["bent", "half", "straight"], change: "The arm becomes straighter.", muscle: "back", other: "front", direction: "straightens" },
  { id: "return", poses: ["straight", "bent", "straight"], change: "The arm bends, then goes back to straight.", muscle: "both", direction: "bends, then straightens" },
];
const comparePrompts = ["What changes from the first picture to the last?", "Which sentence matches the pictures, in order?", "What happened to the arm in these pictures?", "What movement do the pictures show?", "Which sentence fits the pictures?"];
export const COMPARE_BANK = routes.flatMap((route) => comparePrompts.map((prompt, i) => ({ ...route, id: `compare-${route.id}-${i}`, prompt, answer: route.change, options: [route.change, ...routes.filter(r => r.id !== route.id).map(r => r.change)] })));
const explanations = [
  ["bend", "The front muscle contracts", "and pulls the lower arm bone", "so the arm bends at the elbow joint."],
  ["straighten", "The back muscle contracts", "and pulls the lower arm bone", "so the arm straightens at the elbow joint."],
  ["return", "The two muscles take turns to contract", "and pull the lower arm bone", "so the arm bends, then straightens at the elbow joint."],
];
const contexts = ["Explain how the arm moves.", "Tell a friend how the bones move.", "Write a caption for the pictures.", "Join the muscle's job to the movement.", "Why does the arm change position?"];
export const EXPLANATION_BANK = explanations.flatMap(([routeId, ...clauses]) => contexts.map((prompt, i) => ({ ...routes.find(r => r.id === routeId), id: `explain-${routeId}-${i}`, prompt, clauses })));
export const EVIDENCE_BINS = [{ id: "supported", label: "The model shows this" }, { id: "not-supported", label: "The model does not show this" }];
export const ENQUIRY_BANK = routes.flatMap((route) => ["Watch the joint", "Compare muscle lengths", "Follow the lower arm"].map((focus, i) => ({
  ...route, id: `enquiry-${route.id}-${i}`, group: route.id, title: `${focus}: ${route.id === "bend" ? "bending" : route.id === "straighten" ? "straightening" : "bending and straightening"}`,
  setup: "These are stages of a simple arm model. Look at each one in order. The muscles are inside the arm, so we cannot see them through the skin.",
  stages: route.poses.map((pose, index) => ({ id: `stage-${index}`, label: `Stage ${index+1}`, pose })),
  predictionOptions: ["The arm may bend.", "The arm may straighten.", "The arm may bend and then go back.", "I am not sure yet."],
  recordCards: [{ id: "movement", label: route.change }, { id: "push", label: "The muscles push the bones to move the arm." }],
  recordBins: EVIDENCE_BINS, recordExpected: { movement: "supported", push: "not-supported" },
  clauses: explanations.find(row => row[0] === route.id).slice(1),
})));
function explanationTiles(clauses, rng) {
  return shuffle([...clauses.map((label, i) => ({ id: `clause-${i}`, label })), { id: "push", label: "and pushes the bones away" }, { id: "rubber", label: "so the bones bend like rubber." }], rng);
}
export function buildMusclesQuestions(level, rng) {
  if (![1,2,3,4].includes(level)) throw new RangeError("Unknown movement level");
  const bank = [ROLE_BANK, COMPARE_BANK, EXPLANATION_BANK, ENQUIRY_BANK][level-1];
  const selected = level === 4 ? routes.map(r => sample(bank.filter(q => q.group === r.id), 1, rng)[0]) : sample(bank, 5, rng);
  return shuffle(selected, rng).map(q => ({ ...q, level, options: q.options ? shuffle(q.options, rng) : [],
    stages: q.stages ?? q.poses?.map((pose, i) => ({ id: `stage-${i}`, label: `Stage ${i+1}`, pose })) ?? [],
    tiles: q.clauses ? explanationTiles(q.clauses, rng) : [], correctConclusionIds: q.clauses ? ["clause-0", "clause-1", "clause-2"] : [],
  }));
}
export function isMovementExplanationCorrect(question, ids) {
  return [3,4].includes(question.level) && Array.isArray(ids) && ids.length === 3 && Array.from(ids).every((id, i) => id === `clause-${i}` && question.tiles.some(t => t.id === id));
}
export function isMovementRecordCorrect(question, record) {
  return question.level === 4 && record != null && Object.keys(record).length === 2 &&
    Object.hasOwn(record, "movement") && record.movement === "supported" && Object.hasOwn(record, "push") && record.push === "not-supported";
}
