const compass = { N: "north", NE: "north-east", E: "east", SE: "south-east", S: "south", SW: "south-west", W: "west", NW: "north-west" };

/** Grid references are four spoken digits; compass abbreviations are spoken directions. */
export function geographyQuestionSpeech(q, { response } = {}) {
  const prompt = q.visual.type === "compass" ? q.prompt.replace(/\b(N|NE|E|SE|S|SW|W|NW)\b/g, (s) => compass[s]) : q.prompt;
  const option = (v) => /^\d{4}$|^\d{6}$/.test(String(v)) ? String(v).split("").join(", ") : String(v);
  if (q.options) return `${prompt} Choices: ${q.options.map(option).join("; ")}.`;
  if (q.cards) {
    const placement = response ?? {};
    const remaining = q.cards.filter(c => !placement[c.id]).map(c => c.label);
    const headings = q.bins.map(b => `${b.label}: ${q.cards.filter(c => placement[c.id] === b.id).map(c => c.label).join("; ") || "empty"}`);
    return `${prompt} Cards to sort: ${remaining.join("; ") || "none"}. Headings: ${headings.join(". ")}.`;
  }
  return `${prompt} ${(response ?? q.items).map(i=>i.label).join("; ")}.`;
}

/** The text equivalent of a drawing. A tenths grid also states where each marker sits within its square. */
export function geographyVisualDescription(v) {
  if (!v.tenths || !v.markers?.length) return v.alt;
  const tenths = v.markers.map(({ id, point: [e, n] }) => `${id} is ${Math.floor(e * 10) % 10} tenths across and ${Math.floor(n * 10) % 10} tenths up from the lower-left corner of its square.`);
  return `${v.alt} ${tenths.join(" ")}`;
}

export function geographyEvidenceSpeech(v) {
  const base = geographyVisualDescription(v);
  const alt = v.type === "compass" ? base.replace(/\b(?:N|NE|E|SE|S|SW|W|NW)\s/g, "") : base;
  return `${alt} ${v.lines.join(" ")}`;
}
