import { sample, shuffle } from "../english/shared.js";

export const SOURCES = [
  { label: "National Eye Institute: healthy vision tips for children (adapted)", url: "https://www.nei.nih.gov/eye-health-information/healthy-vision/nei-for-kids/healthy-vision-tips" },
  { label: "National Eye Institute: sunlight and sunglasses guidance (adapted)", url: "https://www.nei.nih.gov/research-and-training/research-news/how-watch-eclipse-safely" },
];
export const WARNING = "Never look straight at the Sun, even with dark glasses on.";
export const GLOSS = "UV is a harmful part of sunlight that we cannot see. It can hurt our eyes. Sunglasses that block UV help protect our eyes. Dark lenses do not always block UV, so check the label with a grown-up. No sunglasses make it safe to look straight at the Sun.";
export const RULES = [
  { id: "look", text: "Looking straight at the Sun can hurt your eyes. Never do it, even for a moment, and even with dark sunglasses.", action: "Look away from the Sun and use a picture instead", reason: "looking straight at the Sun can hurt eyes, even with sunglasses on.", wrong: ["Look at the Sun for just a moment", "Wear dark glasses and look at the Sun"] },
  { id: "uv", text: "For playing outside, choose sunglasses that say they block UV. A grown-up can check the label.", action: "Ask a grown-up to check the UV label", reason: "sunglasses that block UV help protect our eyes outside.", wrong: ["Choose the glasses with the nicest frame", "Choose the darkest glasses with no label"] },
  { id: "dark", text: "Dark lenses do not prove that glasses block UV. Check the label with a grown-up. Never test glasses by looking at the Sun.", action: "Check the UV label with a grown-up", reason: "dark lenses alone do not show that glasses block UV.", wrong: ["Test the glasses by looking at the Sun", "Trust the darkest glasses to block UV"] },
];
// Fifteen situations; no sun-viewing experiment is offered.
export const SITUATIONS = [
  { id: "sun-drawing", rule: "look", text: "Ellie wants to draw the Sun for a poster." },
  { id: "cloud-game", rule: "look", text: "Sam's game says to stare at the Sun between clouds." },
  { id: "dark-glasses", rule: "look", text: "A friend says dark sunglasses make it safe to stare at the Sun." },
  { id: "quick-peek", rule: "look", text: "A character in a story plans a quick peek at the Sun." },
  { id: "sun-photo", rule: "look", text: "The class is learning about the Sun from a labelled picture." },
  { id: "park", rule: "uv", text: "Sam is choosing sunglasses for playing in the park." },
  { id: "seaside", rule: "uv", text: "Ellie and a grown-up choose sunglasses for the seaside." },
  { id: "sports", rule: "uv", text: "A family reads sunglasses labels before an outdoor game." },
  { id: "picnic", rule: "uv", text: "A grown-up helps Sam choose sunglasses for a picnic." },
  { id: "garden", rule: "uv", text: "Ellie has two pairs of glasses for playing in the garden." },
  { id: "frame", rule: "dark", text: "Sam likes a blue frame, but nobody has checked its UV label." },
  { id: "very-dark", rule: "dark", text: "A shop has very dark glasses with no UV label." },
  { id: "lighter", rule: "dark", text: "Ellie looks at light and dark lenses. Both labels need checking." },
  { id: "borrowed", rule: "dark", text: "A friend offers glasses that have no UV label." },
  { id: "colour", rule: "dark", text: "A poster says lens colour shows if glasses block UV." },
];
export const ACTIONS = [
  { id: "picture", label: "Use a picture of the Sun, not the real Sun", safe: true },
  { id: "away", label: "Look away from the Sun when playing outside", safe: true },
  { id: "label", label: "Ask a grown-up to check the UV label", safe: true },
  { id: "both-uv", label: "Choose sunglasses that say they block UV", safe: true },
  { id: "no-test", label: "Check the label and never test glasses on the Sun", safe: true },
  { id: "moment", label: "Look at the Sun for a moment", safe: false },
  { id: "stare", label: "Stare at the Sun to see its shape", safe: false },
  { id: "glasses", label: "Look at the Sun through dark glasses", safe: false },
  { id: "test", label: "Test sunglasses by looking at the Sun", safe: false },
  { id: "dark-only", label: "Trust dark lenses without checking the label", safe: false },
];
export const BINS = [{ id: "protect", label: "Keeps eyes safe" }, { id: "avoid", label: "Not safe" }];
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
      tiles: shuffle([{ id: "act", label: `First: ${rule.action[0].toLowerCase()}${rule.action.slice(1)}.` }, { id: "why", label: `Because: ${rule.reason}` }, { id: "never", label: "Remember: never look straight at the Sun, even with dark glasses." }, { id: "test", label: "First: look at the Sun to see if the glasses work." }, { id: "guess", label: "Because: dark lenses always block UV." }], rng),
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
