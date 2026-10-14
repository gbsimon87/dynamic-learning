/**
 * Bix's lessons for Year 3 Spelling - Prefixes and Suffixes, one per challenge
 * slot. Each teaches what that slot asks (see the games in
 * src/pages/skills/english/challenges/year3 and their builders in
 * src/data/challenges/english). No example is a question from its slot's bank.
 */
export const PREFIXES_SUFFIXES_LESSONS = {
  "adding-prefixes": [
    {
      title: "Pick the prefix by meaning",
      lines: [
        "A prefix is a small part you add to the start of a word.",
        "Each prefix has a meaning: re– means again, dis– means not.",
        "Read what the word should mean, then find that meaning in the table.",
      ],
      example: { type: "equation", title: "Paint it again", parts: ["re", "+", "paint", "=", "repaint"], note: "re– means again, so repaint means paint again." },
    },
    {
      title: "Sort words by their prefix",
      lines: [
        "Cover the prefix with your finger and read the root word.",
        "Then ask what the prefix adds: not, wrongly, again, under or between?",
        "Words with the same meaning go in the same box.",
      ],
      example: {
        type: "table",
        title: "What each prefix means",
        headers: ["Prefix", "Means", "Word"],
        rows: [
          ["dis–", "not", "disloyal"],
          ["mis–", "wrongly", "misjudge"],
          ["re–", "again", "rewrite"],
          ["sub–", "under", "subzero"],
          ["inter–", "between", "interschool"],
        ],
      },
    },
    {
      title: "Keep every letter",
      lines: [
        "When you add a prefix, the root word does not change.",
        "Keep every letter of the prefix and every letter of the root.",
        "Sometimes that makes two letters the same, side by side.",
      ],
      example: { type: "fix", title: "mis + step", wrong: "mistep", right: "misstep", note: "One s from mis, one s from step." },
    },
    {
      title: "Choose a prefix that fits",
      lines: [
        "Read the whole sentence first.",
        "Think which prefix gives the meaning the sentence needs.",
        "Then type the prefix and the root word as one word.",
      ],
      example: { type: "sentence", title: "The sign had faded", text: "The sign had faded, so we had to **repaint** it.", note: "We paint it again, so re– fits." },
    },
  ],
  "the-prefixes-super-anti-and-auto": [
    {
      title: "Super, anti and auto",
      lines: [
        "super– means above, or more than usual.",
        "anti– means against, and auto– means self or own.",
        "Read the meaning, then pick the word with the matching prefix.",
      ],
      example: {
        type: "table",
        title: "Three prefixes",
        headers: ["Prefix", "Means", "Word"],
        rows: [
          ["super–", "above", "superglue"],
          ["anti–", "against", "anti-theft"],
          ["auto–", "self or own", "automobile"],
        ],
      },
    },
    {
      title: "Spot the pretend prefix",
      lines: [
        "Some words only look as if they start with a prefix.",
        "Cover the prefix. Is a real word with a fitting meaning left?",
        "If not, the word has no prefix at all.",
      ],
      example: {
        type: "steps",
        title: "Is it really a prefix?",
        steps: ["Cover super in superglue.", "Glue is left: a real word.", "So super– is a prefix here.", "Supply has no super in it at all."],
      },
    },
    {
      title: "Find the prefix in a sentence",
      lines: [
        "Read the sentence and look at the words near the start.",
        "Check which prefix has the meaning you are asked for.",
        "Watch out for words that only look like a prefix.",
      ],
      example: { type: "sentence", title: "Which word works against something?", text: "The **anti-theft** alarm rang in the big shop.", note: "anti– means against: it works against theft." },
    },
    {
      title: "Write the missing prefix",
      lines: [
        "Read the sentence and the end of the word.",
        "Try super, anti and auto in front of it.",
        "Only one makes a real word that fits.",
      ],
      example: { type: "equation", title: "Which prefix fits glue?", parts: ["super", "+", "glue", "=", "superglue"], note: "Superglue is very strong glue." },
    },
  ],
  "the-suffixes-ation-and-ly": [
    {
      title: "Add ation or ly",
      lines: [
        "Add ation to a doing word to make a naming word.",
        "If the root ends in e, drop the e first.",
        "Add ly to most describing words, but change consonant + y to i.",
      ],
      example: {
        type: "table",
        title: "Three rules",
        headers: ["Root", "What to do", "Word"],
        rows: [
          ["create", "drop the e, add ation", "creation"],
          ["fair", "just add ly", "fairly"],
          ["clumsy", "y to i, add ly", "clumsily"],
        ],
      },
    },
    {
      title: "Which ending does it take?",
      lines: [
        "A doing word, like create, takes ation.",
        "A describing word, like fair, takes ly.",
        "If it ends in a consonant and y, change y to i first.",
      ],
      example: {
        type: "steps",
        title: "Sorting a word",
        steps: ["Look at the root: clumsy.", "It describes, so it takes ly.", "It ends in s + y.", "Change y to i: clumsily."],
      },
    },
    {
      title: "Build the word in parts",
      lines: [
        "Start with the root, or the root with its last letter off.",
        "Add an i if the y must change.",
        "Then add the ending, ation or ly.",
      ],
      example: { type: "equation", title: "Building creation", parts: ["creat", "+", "ation", "=", "creation"], note: "The e of create comes off first." },
    },
    {
      title: "Use the right word",
      lines: [
        "Read the sentence and the root in brackets.",
        "Does it need a thing (ation) or how something is done (ly)?",
        "Remember the rules, then type the whole word.",
      ],
      example: { type: "sentence", title: "A naming word", text: "We had a big **celebration** for Gran's birthday.", note: "celebrate: drop the e, add ation." },
    },
  ],
  "doubling-before-a-suffix": [
    {
      title: "Listen for the loud part",
      lines: [
        "Say the root word and listen for the loud part.",
        "If the last part is loud, double the last letter.",
        "If the last part is quiet, just add the ending.",
      ],
      example: {
        type: "table",
        title: "Loud end or quiet end?",
        headers: ["Root", "Say it", "Add ed"],
        rows: [
          ["submit", "sub·MIT", "submitted"],
          ["edit", "ED·it", "edited"],
        ],
      },
    },
    {
      title: "Double or just add?",
      lines: [
        "Say each word aloud and clap its parts.",
        "A loud last part means double the last letter.",
        "A quiet last part means just add the ending.",
      ],
      example: {
        type: "steps",
        title: "Sorting a word",
        steps: ["Say edit: ED·it.", "The loud part is first.", "The end is quiet, so just add: edited."],
      },
    },
    {
      title: "Add the extra letter",
      lines: [
        "Put down the root word first.",
        "If the last part is loud, add its last letter again.",
        "Then put the ending on.",
      ],
      example: { type: "equation", title: "Building committed", parts: ["commit", "+", "t", "+", "ed", "=", "committed"], note: "com·MIT has a loud end, so add a t." },
    },
    {
      title: "Spell it in a sentence",
      lines: [
        "Read the sentence and the root + ending.",
        "Say the root and listen for the loud part.",
        "Double the letter only if the end is loud.",
      ],
      example: { type: "sentence", title: "A quiet ending", text: "Leo was **editing** his story.", note: "ED·it has a quiet end, so just add ing." },
    },
  ],
};
