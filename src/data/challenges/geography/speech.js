const compass = { N: "north", NE: "north-east", E: "east", SE: "south-east", S: "south", SW: "south-west", W: "west", NW: "north-west" };

/** Grid references are four spoken digits; compass abbreviations are spoken directions. */
export function geographyQuestionSpeech(q, { response } = {}) {
  const prompt = q.visual.type === "compass" ? q.prompt.replace(/\b(N|NE|E|SE|S|SW|W|NW)\b/g, (s) => compass[s]) : q.prompt;
  const option = (v) => /^\d{4}$/.test(String(v)) ? String(v).split("").join(", ") : String(v);
  if (q.options) return `${prompt} Choices: ${q.options.map(option).join("; ")}.`;
  if (q.cards) {
    const placement = response ?? {};
    const remaining = q.cards.filter(c => !placement[c.id]).map(c => c.label);
    const headings = q.bins.map(b => `${b.label}: ${q.cards.filter(c => placement[c.id] === b.id).map(c => c.label).join("; ") || "empty"}`);
    return `${prompt} Cards to sort: ${remaining.join("; ") || "none"}. Headings: ${headings.join(". ")}.`;
  }
  return `${prompt} ${(response ?? q.items).map(i=>i.label).join("; ")}.`;
}

export function geographyEvidenceSpeech(v) {
  const alt = v.type === "compass" ? v.alt.replace(/\b(?:N|NE|E|SE|S|SW|W|NW)\s/g, "") : v.alt;
  return `${alt} ${v.lines.join(" ")}`;
}
