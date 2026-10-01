/**
 * Checks the English banks' tests run over every sentence and passage.
 * Pure; nothing here is used at runtime.
 */

/**
 * US spellings that must never reach a British classroom. Matched as whole
 * words, case-insensitively. Not exhaustive; it catches the ones that slip in.
 */
const US_FORMS = [
  "color", "colors", "colored", "colorful", "favorite", "favorites", "favor",
  "neighbor", "neighbors", "behavior", "honor", "humor", "flavor", "harbor",
  "center", "centers", "theater", "meter", "meters", "liter", "fiber",
  "gray", "mom", "moms", "traveled", "traveling", "canceled", "jewelry",
  "realize", "realized", "organize", "organized", "apologize", "recognize",
  "practicing", "license", "defense", "catalog", "pajamas", "aluminum",
  "candy", "cookie", "cookies", "sidewalk", "fall", "vacation", "math",
  "airplane", "diaper", "faucet", "flashlight", "soccer", "trash", "parking lot",
];

// "fall" is a fine British verb; only flag it as the season.
const CONTEXT_ONLY = {
  fall: /\b(in|this|last|next|the)\s+fall\b/i,
};

/** @returns {string[]} the US forms found in `text` */
export function findUsSpellings(text) {
  return US_FORMS.filter((form) => {
    if (CONTEXT_ONLY[form]) return CONTEXT_ONLY[form].test(text);
    return new RegExp(`\\b${form}\\b`, "i").test(text);
  });
}

export function wordCount(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

/** Sentences, counted by their end punctuation (. ! ?), quotes allowed after. */
export function sentenceCount(text) {
  return (text.match(/[.!?]+["”’]?(\s|$)/g) ?? []).length;
}

/** Every piece of text a passage shows, joined. */
export function passageText(passage) {
  return [passage.title, ...passage.blocks.map((block) => block.text)]
    .filter(Boolean)
    .join(" ");
}
