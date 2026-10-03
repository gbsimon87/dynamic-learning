import { sample, shuffle } from "../english/shared.js";
export const SOURCE = { label: "Nemours KidsHealth muscle information (adapted)", url: "https://kidshealth.org/en/kids/muscles.html" };
export const GLOSS = "A joint is where bones meet. Contract means a muscle gets shorter as it pulls. Relax means it stops contracting; it can be lengthened as the other muscle pulls. Tendons connect these muscles to bones. This topic uses a simplified pair of arm muscles, not every muscle in the body.";
const roles = [
  ["How does an arm muscle move a bone?", "It pulls on the bone.", "It pushes the bone away.", "It makes the bone disappear."],
  ["What happens when the front muscle contracts to bend this arm?", "It gets shorter and pulls.", "It gets longer and pushes.", "It turns into a bone."],
  ["Where do the arm bones meet?", "At the elbow joint.", "Inside the hand only.", "At the front muscle only."],
  ["What helps straighten this model arm?", "The back muscle contracts and pulls.", "The front muscle pushes the bone back.", "Both bones become soft."],
  ["What works together to move this arm?", "Muscles and bones at a joint.", "Bones moving with no muscles.", "Only the skin covering the arm."],
];
export const ROLE_BANK = ["straight", "half", "bent"].flatMap((pose) => roles.map(([prompt, answer, ...wrong], i) => ({ id: `role-${pose}-${i}`, pose, prompt, answer, options: [answer, ...wrong], text: "Muscles pull on bones through tendons. The bones move at the elbow joint. In this model, the front muscle contracts to bend the arm, and the back muscle contracts to straighten it. Bones do not bend like rubber." })));
const routes = [
  { id: "bend", poses: ["straight", "half", "bent"], change: "The arm becomes more bent.", muscle: "front", other: "back", direction: "bends" },
  { id: "straighten", poses: ["bent", "half", "straight"], change: "The arm becomes straighter.", muscle: "back", other: "front", direction: "straightens" },
  { id: "return", poses: ["straight", "bent", "straight"], change: "The arm bends, then returns to straight.", muscle: "both", direction: "bends, then straightens" },
];
const comparePrompts = ["What changes from the first picture to the last?", "Which description matches the pictures in order?", "What happened to the arm across these stages?", "Describe the movement shown by this model.", "Which observation fits this sequence?"];
export const COMPARE_BANK = routes.flatMap((route) => comparePrompts.map((prompt, i) => ({ ...route, id: `compare-${route.id}-${i}`, prompt, answer: route.change, options: [route.change, ...routes.filter(r => r.id !== route.id).map(r => r.change)] })));
const explanations = [
  ["bend", "The front muscle contracts", "and pulls the lower arm bone", "so the arm bends at the elbow joint."],
  ["straighten", "The back muscle contracts", "and pulls the lower arm bone", "so the arm straightens at the elbow joint."],
  ["return", "The pair takes turns to contract", "and pull the lower arm bone", "so the arm bends, then straightens at the elbow joint."],
];
const contexts = ["Explain the arm model.", "Tell a friend how the bones move.", "Build a caption for the movement pictures.", "Connect the muscle action to the movement.", "Explain why the arm changes position."];
export const EXPLANATION_BANK = explanations.flatMap(([routeId, ...clauses]) => contexts.map((prompt, i) => ({ ...routes.find(r => r.id === routeId), id: `explain-${routeId}-${i}`, prompt, clauses })));
export const EVIDENCE_BINS = [{ id: "supported", label: "Shown by the model" }, { id: "not-supported", label: "Not shown by the model" }];
export const ENQUIRY_BANK = routes.flatMap((route) => ["Watch the joint", "Compare muscle lengths", "Follow the lower arm"].map((focus, i) => ({
  ...route, id: `enquiry-${route.id}-${i}`, group: route.id, title: `${focus}: ${route.id === "bend" ? "bending" : route.id === "straighten" ? "straightening" : "bending and returning"}`,
  setup: "These are authored stages of a simplified arm model. Observe each stage in order; the muscle shapes show changes inside the body, not something visible through skin.",
  stages: route.poses.map((pose, index) => ({ id: `stage-${index}`, label: `Stage ${index+1}`, pose })),
  predictionOptions: ["It may bend.", "It may straighten.", "It may bend and return.", "I am not sure yet."],
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
