// Shared paper question format. Fingerprints ignore source shuffle/round IDs.
export function paperQuestion(subject, topicId, level, prompt, answer, model = null, reason = "", extra = {}) {
  if (!prompt || answer === undefined || answer === null) return null;
  const text = Array.isArray(answer) ? answer.join(", ") : String(answer);
  const fingerprint = JSON.stringify([subject, topicId, prompt, text, model]);
  let hash = 2166136261;
  for (let n = 0; n < fingerprint.length; n++) hash = Math.imul(hash ^ fingerprint.charCodeAt(n), 16777619);
  return { id: `${subject}:${topicId}:${(hash >>> 0).toString(36)}`, subject, topicId, kind: "paper-adapter", mode: level <= 2 ? "practice" : "application", prompt, answer: text, reason, model, ...extra };
}
export function seededPaper(seed) {
  let state = seed >>> 0;
  return () => { state = (1664525 * state + 1013904223) >>> 0; return state / 4294967296; };
}
export const essential = (type, data) => ({ type, ...data, essential: true });
export const paperMoney = (pence) => `${Math.floor(pence / 100)} pounds ${pence % 100} pence`;
export const cleanPaperPrompt = (prompt) => prompt.replace(/\bType\b/g, "Write").replace(/\btype\b/g, "write").replace(/\bTap\b/g, "Mark").replace(/\btap\b/g, "mark").replace(/\bdrag\b/gi, "number");
