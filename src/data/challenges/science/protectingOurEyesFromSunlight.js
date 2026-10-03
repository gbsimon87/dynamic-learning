import { sample, shuffle } from "../english/shared.js";

export const SOURCES = [
  { label: "National Eye Institute: healthy vision tips for children (adapted)", url: "https://www.nei.nih.gov/eye-health-information/healthy-vision/nei-for-kids/healthy-vision-tips" },
  { label: "National Eye Institute: sunlight and sunglasses guidance (adapted)", url: "https://www.nei.nih.gov/research-and-training/research-news/how-watch-eclipse-safely" },
];
export const WARNING = "Never look directly at the Sun, even through dark glasses. These are picture and information tasks; do not try the unsafe actions.";
export const GLOSS = "Ultraviolet (UV) is invisible radiation from sunlight that can harm eyes. UV-blocking sunglasses protect eyes during ordinary outdoor activities. Lens darkness alone does not tell us the UV protection. Sunglasses never make looking directly at the Sun safe. Ask a grown-up to check the protection label.";
export const RULES = [
  { id: "look", text: "Looking directly at the Sun can damage eyes. Never look directly at it, even for a moment or through dark sunglasses.", action: "Look away from the Sun and use a picture instead.", reason: "Direct sun viewing can damage eyes, even through sunglasses.", wrong: ["Look directly at the Sun for just a moment.", "Put on dark glasses and look directly at the Sun."] },
  { id: "uv", text: "For ordinary outdoor play, choose sunglasses labelled as blocking 99% or 100% of both UVA and UVB. A grown-up can check the label.", action: "Ask a grown-up to check that the glasses block both UVA and UVB.", reason: "UV-blocking sunglasses help protect eyes during ordinary outdoor play.", wrong: ["Choose only by the colour of the frame.", "Choose glasses with no UV information because they look dark."] },
  { id: "dark", text: "Dark-looking lenses do not prove that glasses block UV. Read their protection information with a grown-up; do not test them by looking at the Sun.", action: "Check the UV protection information with a grown-up.", reason: "Lens darkness alone does not prove UV protection.", wrong: ["Test the glasses by looking directly at the Sun.", "Assume the darkest-looking glasses always block UV."] },
];
// Fifteen authored situations; no sun-viewing experiment is offered.
export const SITUATIONS = [
  { id: "sun-drawing", rule: "look", text: "Ellie wants to draw the Sun for a classroom poster." },
  { id: "cloud-game", rule: "look", text: "Sam's game asks players to stare at the Sun between clouds." },
  { id: "dark-glasses", rule: "look", text: "A friend says dark sunglasses make staring at the Sun safe." },
  { id: "quick-peek", rule: "look", text: "A story character plans a quick peek straight at the Sun." },
  { id: "sun-photo", rule: "look", text: "A class is learning about the Sun using a labelled picture." },
  { id: "park", rule: "uv", text: "Sam is choosing sunglasses for ordinary play in the park." },
  { id: "seaside", rule: "uv", text: "Ellie and a grown-up are choosing sunglasses for a seaside walk." },
  { id: "sports", rule: "uv", text: "A family reads sunglass labels before watching outdoor sport." },
  { id: "picnic", rule: "uv", text: "A grown-up helps Sam choose sunglasses for a picnic." },
  { id: "garden", rule: "uv", text: "Ellie has two pairs of glasses to choose from for garden play." },
  { id: "frame", rule: "dark", text: "Sam likes a blue frame, but its UV information has not been checked." },
  { id: "very-dark", rule: "dark", text: "A shop display has very dark glasses with no UV information." },
  { id: "lighter", rule: "dark", text: "Ellie compares lighter and darker lenses. Both labels need checking." },
  { id: "borrowed", rule: "dark", text: "A friend offers borrowed glasses without their protection information." },
  { id: "colour", rule: "dark", text: "A poster claims that lens colour alone shows UV protection." },
];
export const ACTIONS = [
  { id: "picture", label: "Use a labelled Sun picture; keep eyes away from the real Sun.", safe: true },
  { id: "away", label: "Look away from the Sun during ordinary outdoor play.", safe: true },
  { id: "label", label: "Ask a grown-up to check the UV protection label.", safe: true },
  { id: "both-uv", label: "For outdoor play, choose glasses labelled to block 99% or 100% of both UVA and UVB.", safe: true },
  { id: "no-test", label: "Check the information; never test sunglasses by staring at the Sun.", safe: true },
  { id: "moment", label: "Look directly at the Sun for a moment.", safe: false },
  { id: "stare", label: "Stare at the Sun to learn its shape.", safe: false },
  { id: "glasses", label: "Look directly at the Sun through ordinary dark glasses.", safe: false },
  { id: "test", label: "Test sunglasses by looking directly at the Sun.", safe: false },
  { id: "dark-only", label: "Trust lens darkness alone, without checking UV information.", safe: false },
];
export const BINS = [{ id: "protect", label: "Protective choice" }, { id: "avoid", label: "Choice to avoid" }];
export const FACT_BANK = SITUATIONS.map(s => ({ ...s, id: `fact-${s.id}` }));
export const SORT_BANK = SITUATIONS.map((s, i) => ({ ...s, id: `sort-${s.id}`, actions: [ACTIONS[i % 5], ACTIONS[5 + i % 5], ACTIONS[(i + 2) % 5]] }));
export const MESSAGE_BANK = SITUATIONS.map(s => ({ ...s, id: `message-${s.id}` }));
export const ADVICE_BANK = SITUATIONS.map(s => ({ ...s, id: `advice-${s.id}` }));
export function buildSunlightQuestions(level, rng) {
  if (![1, 2, 3, 4].includes(level)) throw new RangeError("Unknown sunlight level");
  const bank = [FACT_BANK, SORT_BANK, MESSAGE_BANK, ADVICE_BANK][level - 1];
  const anchors = RULES.map(rule => sample(bank.filter(q => q.rule === rule.id), 1, rng)[0]);
  return shuffle([...anchors, ...sample(bank.filter(q => !anchors.some(a => a.id === q.id)), 2, rng)], rng).map(q => {
    const rule = RULES.find(r => r.id === q.rule);
    return { ...q, level, information: rule.text, answer: rule.action, options: shuffle([rule.action, ...rule.wrong], rng),
      cards: shuffle((q.actions ?? []).map(a => ({ id: a.id, label: a.label })), rng), bins: BINS,
      tiles: shuffle([{ id: "act", label: `First: ${rule.action}` }, { id: "why", label: `Because: ${rule.reason}` }, { id: "never", label: "Remember: never look directly at the Sun, even through dark glasses." }, { id: "test", label: "Test: look directly at the Sun to see whether glasses work." }, { id: "guess", label: "Because: dark-looking lenses always prove UV protection." }], rng),
      correctConclusionIds: ["act", "why", "never"],
    };
  });
}
export function isSunlightSortCorrect(question, placement) {
  return question.level === 2 && placement != null && question.actions.length === 3 && new Set(question.actions.map(a => a.id)).size === 3 && Object.keys(placement).length === 3 && question.actions.every(a => Object.hasOwn(placement, a.id) && placement[a.id] === (a.safe ? "protect" : "avoid"));
}
export function isSunlightMessageCorrect(question, ids) {
  return [3, 4].includes(question.level) && Array.isArray(ids) && ids.length === 3 && Array.from(ids).every((id, i) => id === ["act", "why", "never"][i] && question.tiles.some(t => t.id === id));
}
