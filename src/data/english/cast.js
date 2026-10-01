/**
 * The recurring cast of the English passages.
 *
 * The same few children (and one dog) come back across stories, letters,
 * diaries and instructions, so a longer text starts from people a child
 * already knows. Bix, the app's mascot, makes the odd appearance.
 *
 * Pronouns are written here once, so every passage refers to each character
 * the same way.
 */
export const CAST = {
  amara: { name: "Amara", emoji: "👧🏾", pronoun: "she", about: "curious; always asking how things work" },
  leo: { name: "Leo", emoji: "👦🏼", pronoun: "he", about: "funny; loves football and jokes" },
  priya: { name: "Priya", emoji: "👧🏽", pronoun: "she", about: "brave; climbs anything" },
  zayn: { name: "Zayn", emoji: "👦🏽", pronoun: "he", about: "quiet; draws and builds things" },
  ellie: { name: "Ellie", emoji: "👧🏼", pronoun: "she", about: "kind; looks after everyone" },
  biscuit: { name: "Biscuit", emoji: "🐶", pronoun: "he", about: "the class dog; steals socks" },
  // Bix is drawn in CSS (components/mascot), so he has no emoji of his own.
  bix: { name: "Bix", emoji: null, pronoun: "he", about: "the app’s mascot" },
};

export const CAST_NAMES = Object.values(CAST).map((member) => member.name);
