/**
 * Which BodyParts3D parts become the Year 3 skeleton, how they group into the
 * labels the topic uses, and how the arms are posed. Pure, so it is tested
 * (bones.test.mjs) without downloading anything.
 *
 * BodyParts3D files a few muscles, voice-box cartilages, gums and spinal
 * disks under "skeletal"; they are left out so the picture shows bones.
 */

const EXCLUDE = /fibularis|tibialis|levator|subscapularis|iliotibial|arytenoid|corniculate|cuneiform cartilage|thyroid cartilage|cricoid|gingiva|intervertebral|alar cartilage|hyoid/i;

/** The label groups the topic asks about, in callout order. */
export const GROUPS = ["skull", "ribs", "spine", "legs"];

const RULES = [
  ["skull", /frontal bone|parietal|occipital|temporal bone|sphenoid|ethmoid|maxilla|mandible|zygomatic|nasal bone|palatine|vomer|tooth/i],
  ["ribs", /\brib\b|costal cartilage|sternum|manubrium|xiphoid/i],
  ["spine", /vertebra|^atlas$|^axis$|sacrum|coccyx/i],
  ["pelvis", /hip bone/i],
  ["shoulders", /clavicle|scapula/i],
  ["arms", /humerus|radius|ulna|capitate|hamate|lunate|pisiform|scaphoid|trapezi|triquetral|metacarpal|finger|thumb/i],
  ["legs", /femur|tibia|fibula|patella|calcaneus|talus|cuboid|navicular|cuneiform bone|metatarsal|toe|sesamoid/i],
];

export function groupOf(name) {
  if (EXCLUDE.test(name)) return null;
  return RULES.find(([, rule]) => rule.test(name))?.[0] ?? null;
}

/** Atlas parts in the skeleton, each tagged with its group. */
export function selectSkeleton(atlas) {
  return atlas.parts
    .filter((part) => part.system === "skeletal")
    .map((part) => ({ ...part, group: groupOf(part.name) }))
    .filter((part) => part.group);
}

/** The single part each label line points at; it must be visible from the front. */
export const ANCHOR_PARTS = {
  skull: "Frontal bone",
  ribs: "Left sixth rib",
  spine: "Third lumbar vertebra",
  legs: "Left femur",
};

/**
 * Arm angles away from the body, in degrees, for the three layouts the
 * topic varies between (so a learner reads labels, not positions).
 */
export const POSES = { lowered: 8, wide: 48, raised: 150 };

/** Which side a part is on, from its name. Null for midline parts. */
export function sideOf(name) {
  if (/^left\b|\bleft\b/i.test(name)) return "left";
  if (/^right\b|\bright\b/i.test(name)) return "right";
  return null;
}

/**
 * The arm model for Muscles and Movement: one arm seen from the side, the
 * forearm turned at the elbow. Angles match MOVEMENT_POSES in
 * src/data/movementDiagram.js (straight 0°, half 55°, bent 105°).
 */
export const ARM_POSES = { straight: 0, half: 55, bent: 105 };

/** Forearm and hand bones turn at the elbow; the humerus stays still. */
export function isForearm(name) {
  return /radius|ulna|capitate|hamate|lunate|pisiform|scaphoid|trapezi|triquetral|metacarpal|finger|thumb/i.test(name);
}
