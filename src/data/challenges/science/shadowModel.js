// Centred opaque object, point source, perpendicular fixed screen. Units: cm.
// Model maths is never a learner assessment target.
export function shadowGeometry(input) {
  if (input == null || typeof input !== "object" || Array.isArray(input)) return null;
  const { source = 0, object, screen = 60, height = 4 } = input;
  if (![source, object, screen, height].every(Number.isFinite) || source < 0 || !(source < object && object < screen) || height <= 0) return null;
  const exactHeight = height * (screen - source) / (object - source);
  if (!Number.isFinite(exactHeight) || exactHeight > 40) return null;
  return { source, object, screen, height, sourceDistance: object - source, screenDistance: screen - object, exactHeight, shadowHeight: Math.round(exactHeight) };
}
export const SHADOW_SOURCE = { label: "BBC Teach light and shadow concepts (adapted)", url: "https://downloads.bbc.co.uk/learning/bbcteach/Light_teacher_resource.pdf" };
export const SHADOW_GLOSS = "Opaque means light cannot pass through. A shadow is a darker area where an object blocks light from a source. The screen is where we look for the shadow. This simplified model has one small point source, one centred opaque object and a fixed screen. Lines show light paths, not visible strings. Shadow heights are shown to the nearest whole centimetre (cm). Real torches and outdoor shadows can behave differently.";
export const SHADOW_LABELS = [{ id: "source", label: "Light source" }, { id: "object", label: "Opaque object" }, { id: "shadow", label: "Shadow on screen" }];
export function shadowTargets(variant = 0) {
  return SHADOW_LABELS.map((t, i) => ({ ...t, letter: String.fromCharCode(65 + (i + variant) % 3), text: ["The lamp that gives out light", "The card that blocks light", "The darker patch on the screen behind the card"][i] }));
}
