import { sample, shuffle } from "../english/shared.js";
export const GLOSS = "A skeleton is the frame of a body. Human bones make a skeleton inside the body. Support means holding the body up and giving it its shape. Protection means keeping soft parts safe. The skull protects the brain. The rib cage protects the heart and lungs. The backbone is also called the spine. An exoskeleton is a hard covering outside the body, like on a crab or a beetle. An animal with no backbone can still have support and protection.";
export const PARTS = [{ id: "skull", label: "Skull" }, { id: "ribs", label: "Rib cage" }, { id: "spine", label: "Spine" }, { id: "legs", label: "Leg bones" }];
export const FEATURES = { skull: "the round bony head", ribs: "the curved bones around the chest", spine: "the line of bones down the middle", legs: "the long bones below the hips" };
export const ANIMALS = [
  ["human", "Human", "Humans have a backbone. Their skeleton is made of bones inside the body. They have no shell or exoskeleton.", true, false],
  ["dog", "Dog", "A dog has a backbone and bones inside its body. It has no shell or exoskeleton.", true, false],
  ["bird", "Bird", "A bird has a backbone and bones inside its body. It has no shell or exoskeleton.", true, false],
  ["fish", "Bony fish", "This bony fish has a backbone and bones inside its body. Its scales are not a shell or exoskeleton.", true, false],
  ["crab", "Crab", "A crab has no backbone. Its hard outer skeleton (exoskeleton) holds up and protects its body.", false, true],
  ["beetle", "Beetle", "A beetle has no backbone. Its hard outer skeleton (exoskeleton) holds up and protects its body.", false, true],
  ["snail", "Shelled snail", "This snail has no backbone. Its shell covers and protects its soft parts.", false, true],
  ["worm", "Earthworm", "An earthworm has no backbone and no hard shell. Its soft body is held up in other ways.", false, false],
].map(([id, label, text, backbone, outer]) => ({ id, label, text, backbone, outer }));
const rows = [
  ["human", "skull", "A hard skull surrounds the soft brain.", "Protect the brain", "Protect the heart", "Hold up the body"],
  ["human", "skull", "The brain lies inside the bony head case.", "Shield the brain", "Shield the lungs", "Hold up the whole body"],
  ["human", "skull", "The brain is inside the hard skull in the head.", "Keep the brain safe", "Make food for the body", "Protect the heart"],
  ["human", "ribs", "The curved ribs make a cage around the heart and lungs.", "Protect the heart and lungs", "Protect the brain", "Make food from sunlight"],
  ["human", "ribs", "The heart is inside the bony chest cage.", "Help shield the heart", "Help the legs hold up the body", "Help shield the brain"],
  ["human", "ribs", "The lungs sit inside the chest, behind the ribs.", "Help protect the lungs", "Help protect the brain", "Give the body its food"],
  ["human", "spine", "The backbone is a strong column down the body.", "Help hold up the body", "Make nutrients for the body", "Cover the brain like the skull"],
  ["human", "spine", "The bones in the back are part of the body's frame inside.", "Help hold up and support the body", "Cover the whole body with a shell", "Protect the brain like the skull"],
  ["human", "legs", "Long leg bones are below the hips.", "Help hold up the body's weight", "Cover the brain", "Make all the body's food"],
  ["human", "legs", "A standing person's leg bones hold up the body above them.", "Hold up the body", "Make a cage around the lungs", "Make a hard case around the brain"],
  ["dog", "skull", "A dog's skull is a bony case around its brain.", "Protect the dog's brain", "Hold up the dog's tail", "Protect the dog's heart"],
  ["dog", "ribs", "A dog's rib cage is around its heart and lungs.", "Help protect the dog's heart and lungs", "Help protect the dog's brain", "Make food for the dog"],
  ["dog", "spine", "A dog's backbone and other bones make a frame inside its body.", "Help hold up the dog's body", "Make a hard shell outside the dog", "Stop the dog needing food"],
  ["crab", "outer", "A crab's hard covering is on the outside of its soft body.", "Support and protect the crab", "Make a backbone inside the crab", "Leave the crab with no protection"],
  ["beetle", "outer", "A beetle's hard exoskeleton is around its soft parts.", "Support and protect the beetle", "Make a rib cage inside the beetle", "Make food for the beetle"],
];
export const JOB_BANK = rows.map(([animal, part, text, answer, ...wrong], index) => ({ id: `job-${index}`, animal, part, text, answer, options: [answer, ...wrong] }));
export const SORT_BANK = Array.from({ length: 15 }, (_, index) => ({ id: `sort-${index}`, criterion: index < 8 ? "backbone" : "outer", cards: [ANIMALS[index % 4], ANIMALS[4 + index % 3], ANIMALS[(index + 7) % 8]], })).map((q) => ({ ...q, cards: q.cards.filter((card, i, cards) => cards.findIndex((c) => c.id === card.id) === i), title: q.criterion === "backbone" ? "Sort the animals. Which have a backbone?" : "Sort the animals. Which have a shell or exoskeleton?" }));
const poses = ["wide", "lowered", "raised"];
const jobIndices = [0,3,6,8,5];
export const LABEL_BANK = poses.flatMap((pose, poseIndex) => jobIndices.map((jobIndex, index) => ({ id: `label-${poseIndex}-${index}`, pose, job: JOB_BANK[jobIndex] })));
export const EXPLANATION_BANK = JOB_BANK.map((q, index) => ({ ...q, id: `explanation-${index}`, prompt: "Finish the sentence about this part's job." }));
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
