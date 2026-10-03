import { fullTopicComplete } from "./completionMilestones.js";
import { year3ScienceCurriculum } from "./year3ScienceCurriculum.js";

const ACTIVITIES = {
  "movement-on-different-surfaces": {
    id: "compare-surface-records", title: "Compare surface-test evidence",
    steps: ["With a grown-up, use the on-screen toy and surface observations. List what stayed the same.", "Read both stopped distances in cm and say which sample allowed this toy to travel further in this test.", "Ask what you would need to keep the same to compare another pair of surfaces."],
    note: "Optional picture and record research. No moving equipment or real experiment is needed. The supplied distances do not predict an exact result for every toy or surface.",
  },
  "how-shadows-form": {
    id: "compare-shadow-pictures", title: "Compare shadow pictures together",
    steps: ["With a grown-up, use the on-screen lamp-on, lamp-off and object-removed pictures.", "Point to the source, opaque object and screen. Explain when the object blocks light.", "Draw the arrangement and ask what would happen if the object were removed."],
    note: "Optional picture research. You do not need to darken a room or use a torch. Never look directly at the Sun or shine light into anyone's eyes.",
  },
  "changing-shadow-size": {
    id: "compare-shadow-measurements", title: "Compare shadow measurements together",
    steps: ["With a grown-up, use the on-screen positions and record the shadow heights in cm.", "Check what moved and what stayed fixed. Compare the source-to-object distance with the shadow height.", "Explain the pattern for this model. Ask why an outdoor shadow might need a different comparison."],
    note: "Optional model research. No sunlight viewing or equipment is needed. Never look directly at the Sun, reflect sunlight or shine a torch into anyone's eyes.",
  },
  "reflected-light": {
    id: "compare-reflection-pictures", title: "Compare reflection evidence",
    steps: ["With a grown-up, read labelled surface pictures or the on-screen sample notes.", "Find evidence of reflected light and evidence of a clear image. Explain why these are different questions.", "Draw a source, surface and eye. Add arrows showing the direction of light."],
    note: "This is optional picture research. Do not reflect sunlight, use lasers, look at bright sources or shine light into anyone's eyes. You do not need to handle mirrors or foil.",
  },
  "light-and-darkness": {
    id: "compare-light-pictures", title: "Compare light and dark pictures",
    steps: ["With a grown-up, use the on-screen observations or two labelled pictures of the same object with the light off and on.", "Describe what changed and what stayed in place. Explain why an unseen object may still be there.", "Build an explanation linking light to seeing. Ask whether other light entered in the dark observation."],
    note: "This is optional picture research. You do not need to darken a room or look at a bright source. Never look directly at the Sun or shine a torch into anyone's eyes.",
  },
  "what-soil-is-made-from": {
    id: "observe-soil-pictures", title: "Look at soil evidence together",
    steps: ["With a grown-up, look at a labelled soil picture in a trusted science book or use the on-screen model.", "Find a note identifying rock particles and another identifying once-living remains. Say what each came from.", "Look for information about air and water in spaces. Record what the picture cannot tell you, such as exact amounts."],
    note: "This is optional picture research. You do not need to collect, touch, taste or dig soil, or handle living things.",
  },
  "how-fossils-form": {
    id: "research-fossil-evidence", title: "Read a fossil story together",
    steps: ["With a grown-up, look at a fossil picture in a trusted science book or museum page.", "Use its caption to find what past life it records. Describe the evidence without guessing an exact age or animal name from the picture alone.", "Draw a simple story showing burial, evidence preserved in rock and later exposure. Ask what the picture does not tell you about formation."],
    note: "This is optional picture research. Use the on-screen source cards instead if you prefer. You do not need to collect, dig for, break or handle rocks or fossils.",
  },
  "comparing-and-grouping-rocks": {
    id: "observe-rock-features", title: "Compare visible rock features",
    steps: ["With a grown-up, look at rock pictures in a trusted book or at a suitable rock surface without touching it.", "Describe grains, crystals or bands that you can actually see. Choose one clear feature and group two examples by it.", "Separate what you observed from properties that would need a test. A picture cannot tell you a scratch result or how much water a sample takes in."],
    note: "This is optional observation. Use the on-screen samples instead if you prefer. Do not scratch, break, rub or taste rocks, make dust, or disturb buildings or gravestones.",
  },
  "muscles-and-movement": {
    id: "compare-movement-models", title: "Compare movement pictures",
    steps: ["With a grown-up, look at two arm movement pictures in a trusted science book or use the on-screen model.", "Describe how the arm position changes at the elbow. Use the supplied diagram to find which muscle gets shorter.", "Explain how muscles pull bones at a joint. Ask which details a simple model leaves out."],
    note: "This is optional picture research. You do not need to move, touch or test your body or anyone else's body to complete it.",
  },
  "skeletons-for-support-and-protection": {
    id: "compare-skeleton-pictures", title: "Compare skeleton pictures",
    steps: ["With a grown-up, find a human skeleton diagram and an animal skeleton picture in a trusted book or museum page.", "Point out a structure that supports the body and a structure that protects softer parts. Compare where they are.", "Choose a clear grouping question, such as whether an animal has a backbone. Record what the source tells you; do not guess from the outside alone."],
    note: "This is optional picture research. Use the on-screen diagrams instead if you prefer. Do not press, bend or test bodies, or handle bones or animals.",
  },
  "nutrition-for-animals-and-humans": {
    id: "research-animal-foods", title: "Research an animal's food sources",
    steps: ["With a grown-up, choose a familiar animal in a trusted wildlife book or information page.", "Find two foods it eats. Describe whether the listed foods come from plants, animals or both.", "Ask what the source says about nutrition types and amounts. If an exact amount is not given, record that you cannot tell from this source."],
    note: "This is optional research. Use the on-screen cards instead if you prefer. Do not feed animals or change anyone's diet for this activity.",
  },
  "seed-dispersal": {
    id: "observe-seed-features", title: "Look for seed and fruit features",
    steps: ["With a grown-up, look at familiar seeds or fruits without picking or touching them. Your grown-up chooses a safe example.", "Draw visible wings, hairs, hooks or a surrounding fruit. Talk about a possible way it could move.", "Separate what you saw from what you predict. What extra observation would help check how it moves? Use the illustrated examples if none are available."],
    note: "This is optional. Do not taste seeds or fruits, handle unknown plants, or attach hooked cases to animals. Your grown-up handles any specimens.",
  },
  "pollination-and-seed-formation": {
    id: "observe-flower-visits", title: "Observe a flower visitor",
    steps: ["With a grown-up, look at familiar flowers from a safe distance, without touching the flowers or insects.", "Watch for an insect visiting a flower. Draw or describe what you can see. If you cannot see pollen reaching a receiving part, record that it was not observed.", "Ask what you would need to observe later to find out whether seeds formed. Use the on-screen source cards if there are no visitors."],
    note: "This is optional. Your grown-up chooses a suitable place and helps you keep your distance. Do not catch or handle insects; a visit alone does not prove pollen transfer or seed formation.",
  },
  "water-transport-in-plants": {
    id: "observe-coloured-water", title: "Observe water travelling in a cut flower",
    steps: ["Ask your grown-up to prepare a white carnation in a clear plastic container of water with a little water-based food colouring. The grown-up handles any cutting and the colouring.", "Look at the petals at the start and again later. Draw or describe what you see; changes may take time and may be faint.", "Talk about how water could reach petals above the container. This cut flower takes water in through its cut stem, with no roots attached."],
    note: "This is optional. Keep the container on a stable surface chosen by your grown-up. Do not drink the coloured water. Use the on-screen observations instead if you prefer.",
  },
  "what-plants-need-to-grow": {
    id: "check-plant-care", title: "Find out what a plant needs",
    steps: ["With a grown-up, choose a familiar flowering plant and read its care label or a trusted care guide together.", "Talk about its light, water, air, soil nutrients and room to grow. Which needs can you observe without touching it?", "Draw or describe one observation. Ask how the care might differ for another plant type."],
    note: "This is optional. Your grown-up chooses a safe place and handles any plant care. You can use the on-screen care cards instead.",
  },
  "parts-of-flowering-plants": {
    id: "observe-plant-parts", title: "Look closely at a flowering plant",
    steps: ["With a grown-up, choose a familiar flowering plant to look at without touching or picking it.", "Draw the plant. Label any leaves, stem or trunk, and flowers that you can see.", "Roots may be hidden by soil. Add where you think they are, and explain one job of each part to your grown-up."],
    note: "This is optional. Stay on a safe path and leave the plant where it is. Use the on-screen diagram instead if you cannot find a suitable plant.",
  },
};

// Validate scope and identity, then use the strict predicate (all four built
// and complete). Read-only: no storage or awards depend on these activities.
export function completedScienceActivity({ year, subject, categoryId, topicId, progress, isBuilt }) {
  if (Number(year) !== 3 || subject !== "science" || progress == null || typeof isBuilt !== "function") return null;
  const topic = year3ScienceCurriculum.find((category) => category.id === categoryId)?.topics.find((item) => item.id === topicId);
  return topic && fullTopicComplete(progress, categoryId, topic, isBuilt) ? ACTIVITIES[topicId] ?? null : null;
}
