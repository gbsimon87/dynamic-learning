/**
 * Bix's lessons for Year 3 English Grammar - Words, one per challenge slot.
 * Each one teaches exactly what that challenge asks (see AOrAnGame /
 * aOrAn.js and WordFamiliesGame / wordFamilies.js).
 */
export const GRAMMAR_WORDS_LESSONS = {
  "a-or-an": [
    {
      title: "A or an?",
      lines: ["Look at the first letter of the next word.", "If it is a vowel letter (a, e, i, o, u), use an.", "If it is a consonant letter, use a."],
      example: { type: "table", title: "Check the first letter", headers: ["Word", "First letter", "Say"], rows: [["eel", "e (vowel)", "an eel"], ["ladder", "l (consonant)", "a ladder"]], note: "The first letter tells you which one to use." },
    },
    {
      title: "Sort words into a and an",
      lines: ["Some cards have two words, like big eel.", "Only look at the very first word on the card.", "Vowel letter first? It goes with an."],
      example: { type: "sentence", title: "The first word decides", text: "We saw **a giant** eel and **an** inky squid.", note: "Giant starts with g, so it is a giant eel." },
    },
    {
      title: "Spot the wrong one",
      lines: ["Read the sentence and find each a or an.", "Check the first letter of the word after it.", "Tap the one that does not match the rule."],
      example: { type: "fix", title: "One of these is wrong", wrong: "Mum bought a ladder and a inky pen.", right: "Mum bought a ladder and an inky pen.", note: "Inky starts with i, a vowel letter, so it needs an." },
    },
    {
      title: "Fill every gap",
      lines: ["Each gap needs a or an.", "Look at the word straight after the gap.", "Check its first letter, then choose."],
      example: { type: "steps", title: "Gap: ___ eel swam past.", steps: ["The next word is eel.", "Eel starts with e, a vowel letter.", "So it is an eel."] },
    },
  ],
  "word-families": [
    {
      title: "What is a word family?",
      lines: ["A word family shares a root word.", "The words look alike AND mean something alike.", "Some words share letters but not meaning."],
      example: { type: "table", title: "Is it in the jump family?", headers: ["Word", "In the family?"], rows: [["jumping", "Yes, it is about jumping"], ["lump", "No, it just looks alike"]], note: "Ask: does it still mean something about jump?" },
    },
    {
      title: "Sort two families",
      lines: ["Find the root word inside each card.", "Then check the meaning still matches.", "Words that only look alike go in the last box."],
      example: { type: "table", title: "Sorting sing and jump", headers: ["Card", "Box"], rows: [["singer", "sing family"], ["jumped", "jump family"], ["single", "not in either family"]], note: "Single has s-i-n-g but means one, not singing." },
    },
    {
      title: "Build a family word",
      lines: ["Start with the root word.", "Add a part at the front or the end.", "Read your word: does it match the meaning?"],
      example: { type: "equation", title: "Meaning: full of thanks", parts: ["thank", "+", "ful", "=", "thankful"], note: "Ful means full of, so thankful means full of thanks." },
    },
    {
      title: "Pick the word that fits",
      lines: ["Read the sentence with each family word.", "Does it need a person, a thing or a describing word?", "Pick the one that sounds right."],
      example: { type: "sentence", title: "Which sing word fits?", text: "The **singer** sang a song on the stage.", note: "We need a person here, so singer fits, not singing." },
    },
  ],
};
