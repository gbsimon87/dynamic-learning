// Literal nouns only. No inferred feelings, actions, answers or classifications.
const WORDS = [
  ["flower", "flowers?|dais(?:y|ies)"], ["tree", "trees?"], ["seed", "seeds?"],
  ["bird", "birds?|robins?|blackbirds?|blue tits?"], ["bee", "bees?"],
  ["beetle", "beetles?"], ["snail", "snails?"], ["fish", "fish|trout|salmon"],
  ["butterfly", "butterfl(?:y|ies)"], ["spider", "spiders?"], ["boat", "boats?|ships?"],
  ["moon", "moon"], ["star", "stars?"], ["book", "books?"], ["bridge", "bridges?"],
  ["mountain", "mountains?"], ["ball", "balls?"],
  ["drum", "drums?"], ["guitar", "guitars?"], ["bell", "bells?"],
  ["torch", "torches|torch"], ["cell", "cells?|batter(?:y|ies)"], ["spoon", "spoons?"],
  ["cup", "cups?|mugs?"], ["clock", "clocks?"], ["tooth", "teeth|tooth"],
];

export function literalPicture(text = "") {
  const candidates = WORDS.map(([type, pattern]) => {
    if (type === "cell" && !/batter(?:y|ies)|electric|circuit/i.test(text)) return null;
    if (type === "moon" && /phase|crescent|quarter|eclipse|half/i.test(text)) return null;
    const match = new RegExp(`\\b(?:${pattern})\\b`, "i").exec(text);
    return match ? { type, word: match[0], index: match.index } : null;
  }).filter(Boolean);
  return candidates.sort((a, b) => a.index - b.index)[0] ?? null;
}

export function questionPicture({ prompt = "", sentence = "", text = "", passage, tokens }) {
  // The text is already shown in the round. Never inspect spoken dictation,
  // hidden passages, choices, hints, answers or the expected sorting bins.
  return literalPicture([text, ...(passage?.blocks?.map(block => block.text) ?? []), ...(tokens ?? []), sentence, prompt].join(" "));
}
