import { sample, shuffle } from "../english/shared.js";
export const GLOSS = "A skeleton is a body's supporting framework. Human bones form a skeleton inside the body. Support means holding the body up and giving it shape. Protection means shielding softer parts. The skull protects the brain; the rib cage protects the heart and lungs. A backbone is also called a spine. An exoskeleton is a hard supporting covering outside the body, as in insects and crabs. Not having a backbone does not mean having no support or protection.";
export const PARTS = [{ id: "skull", label: "Skull" }, { id: "ribs", label: "Rib cage" }, { id: "spine", label: "Spine" }, { id: "legs", label: "Leg bones" }];
export const FEATURES = { skull: "the rounded bony head", ribs: "the curved bones around the chest", spine: "the line of backbone bones down the centre", legs: "the long bones below the hips" };
export const ANIMALS = [
  ["human", "Human", "Humans have a backbone and a skeleton of bones inside the body. They do not have an outer shell or exoskeleton.", true, false],
  ["dog", "Dog", "A dog has a backbone and bones inside its body. It does not have an outer shell or exoskeleton.", true, false],
  ["bird", "Bird", "A bird has a backbone and bones inside its body. It does not have an outer shell or exoskeleton.", true, false],
  ["fish", "Bony fish", "This bony fish has a backbone and an internal bony skeleton. Its scales are not a shell or exoskeleton.", true, false],
  ["crab", "Crab", "A crab has no backbone. Its hard outer exoskeleton supports and protects its body.", false, true],
  ["beetle", "Beetle", "A beetle has no backbone. Its hard outer exoskeleton supports and protects its body.", false, true],
  ["snail", "Shelled snail", "This snail has no backbone. Its shell covers and protects soft parts.", false, true],
  ["worm", "Earthworm", "An earthworm has no backbone and no hard outer shell or exoskeleton. Its soft body has other ways of being supported.", false, false],
].map(([id, label, text, backbone, outer]) => ({ id, label, text, backbone, outer }));
const rows = [
  ["human", "skull", "A hard skull surrounds the softer brain.", "Protect the brain.", "Protect the heart inside the chest.", "Support the body with leg bones."],
  ["human", "skull", "The brain lies inside the bony head case.", "Shield the brain with the skull.", "Shield the lungs with the skull.", "Hold the body up using the rib cage alone."],
  ["human", "skull", "The brain is inside the hard skull in the head.", "The skull protects the brain inside it.", "The skull makes food for the body.", "The skull protects the heart inside it."],
  ["human", "ribs", "The curved ribs form a cage around the chest's heart and lungs.", "Protect the heart and lungs.", "Protect the brain inside the head.", "Make food from sunlight."],
  ["human", "ribs", "The heart is inside the bony chest cage.", "The rib cage helps shield the heart.", "The leg bones enclose the heart.", "The skull encloses the heart."],
  ["human", "ribs", "The lungs sit inside the chest, behind the ribs.", "The ribs help protect the lungs.", "The ribs help protect the brain inside the head.", "The ribs are the body's only source of nutrition."],
  ["human", "spine", "The backbone forms a supporting column down the body.", "Help support the body's weight.", "Make nutrients instead of eating.", "Surround the brain like the skull."],
  ["human", "spine", "Bones in the back form part of the body's internal framework.", "Help hold up and support the body.", "Keep the lungs inside the head.", "Provide a hard covering outside the whole body."],
  ["human", "legs", "Long leg bones form supports below the hips.", "Help support the body's weight.", "Enclose the brain inside the legs.", "Make all the food the body needs."],
  ["human", "legs", "The standing person's leg bones support the body above them.", "Hold up the body as part of its skeleton.", "Act as a cage around the lungs.", "Act as a hard case around the brain."],
  ["dog", "skull", "A dog's skull forms a bony case around its brain.", "Protect the dog's brain.", "Put a backbone outside the dog.", "Protect the dog's heart inside its head."],
  ["dog", "ribs", "A dog's rib cage surrounds its heart and lungs.", "Help protect the dog's heart and lungs.", "Help protect the dog's brain inside its head.", "Make food for the dog from sunlight."],
  ["dog", "spine", "A dog's backbone and other bones form an internal supporting framework.", "Help support the dog's body.", "Form an exoskeleton outside the dog.", "Remove the dog's need for food."],
  ["crab", "outer", "A crab's hard covering is outside its softer body parts.", "Give support and protection from outside.", "Form a bony backbone inside the crab.", "Prove the crab has no support or protection."],
  ["beetle", "outer", "A beetle's hard exoskeleton surrounds softer parts.", "Support and protect the beetle's body.", "Form a human-like bony rib cage inside the beetle.", "Make food instead of the beetle eating."],
];
export const JOB_BANK = rows.map(([animal, part, text, answer, ...wrong], index) => ({ id: `job-${index}`, animal, part, text, answer, options: [answer, ...wrong] }));
export const SORT_BANK = Array.from({ length: 15 }, (_, index) => ({ id: `sort-${index}`, criterion: index < 8 ? "backbone" : "outer", cards: [ANIMALS[index % 4], ANIMALS[4 + index % 3], ANIMALS[(index + 7) % 8]], })).map((q) => ({ ...q, cards: q.cards.filter((card, i, cards) => cards.findIndex((c) => c.id === card.id) === i), title: q.criterion === "backbone" ? "Group by whether the animal has a backbone." : "Group by whether the animal has a protective shell or exoskeleton." }));
const poses = ["wide", "lowered", "raised"];
const jobIndices = [0,3,6,8,5];
export const LABEL_BANK = poses.flatMap((pose, poseIndex) => jobIndices.map((jobIndex, index) => ({ id: `label-${poseIndex}-${index}`, pose, job: JOB_BANK[jobIndex] })));
export const EXPLANATION_BANK = JOB_BANK.map((q, index) => ({ ...q, id: `explanation-${index}`, prompt: "Use the supplied evidence to finish an explanation of this structure's job." }));
export function buildSkeletonQuestions(level, rng) {
  if (![1,2,3,4].includes(level)) throw new RangeError("Unknown skeleton level");
  const bank = [JOB_BANK, SORT_BANK, LABEL_BANK, EXPLANATION_BANK][level - 1];
  return sample(bank, 5, rng).map((q) => {
    const job = level === 3 ? q.job : q;
    const order = shuffle(PARTS, rng);
    const targets = order.map((part, index) => ({ id: `target-${index}`, label: String.fromCharCode(65 + index), part: part.id }));
    return { ...q, level, pose: q.pose ?? "wide", targets, labels: shuffle(PARTS, rng),
      options: [1,3].includes(level) ? shuffle(job.options, rng) : [],
      bins: level === 2 ? [{ id: "yes", label: q.criterion === "backbone" ? "Has a backbone" : "Has a shell or exoskeleton" }, { id: "no", label: q.criterion === "backbone" ? "No backbone" : "No shell or exoskeleton" }] : [],
      expected: level === 2 ? Object.fromEntries(q.cards.map((card) => [card.id, card[q.criterion] ? "yes" : "no"])) : null,
      tiles: level === 4 ? shuffle(q.options.map((label, index) => ({ id: index === 0 ? "supported" : `wrong-${index}`, label })), rng) : [],
    };
  });
}
export function isSkeletonLabelsCorrect(question, placement) {
  return question.targets?.length === 4 && new Set(question.targets.map((target) => target.id)).size === 4 && new Set(question.targets.map((target) => target.part)).size === 4 &&
    PARTS.every((part) => question.targets.some((target) => target.part === part.id)) && placement != null && Object.keys(placement).length === 4 &&
    PARTS.every((part) => Object.hasOwn(placement, part.id) && placement[part.id] === question.targets.find((target) => target.part === part.id)?.id);
}
export function isSkeletonSortCorrect(question, placement) {
  return ["backbone", "outer"].includes(question.criterion) && Array.isArray(question.cards) && question.cards.length >= 2 && new Set(question.cards.map((card) => card.id)).size === question.cards.length &&
    placement != null && Object.keys(placement).length === question.cards.length && question.cards.every((card) => {
      const known = ANIMALS.find((animal) => animal.id === card.id);
      return known && Object.hasOwn(placement, card.id) && placement[card.id] === (known[question.criterion] ? "yes" : "no");
    });
}
export function isSkeletonExplanationCorrect(placed) { return Array.isArray(placed) && placed.length === 1 && placed[0] === "supported"; }
