/**
 * Bix's lessons for Year 3 English, Grammar - Sentences, one per challenge
 * slot. Each teaches exactly what that challenge asks (see the year3 *Game.jsx
 * files and their builders in src/data/challenges/english/).
 */
export const SENTENCES_LESSONS = {
  conjunctions: [
    {
      title: "Spot the joining word",
      lines: ["A conjunction is a joining word.", "It joins two parts of a sentence together.", "Look for when, if, because or although."],
      example: { type: "sentence", title: "Find the joining word", text: "The baby cried **when** the balloon popped.", note: "“when” joins the two parts." },
    },
    {
      title: "Pick the word that fits",
      lines: ["Each joining word does a different job.", "Read the sentence with each word in the gap.", "Choose the one that makes sense."],
      example: {
        type: "table",
        title: "What each joining word does",
        headers: ["Word", "Its job"],
        rows: [["when", "says when it happens"], ["if", "it might happen"], ["because", "gives a reason why"], ["although", "shows a surprise"]],
      },
    },
    {
      title: "Build a joined sentence",
      lines: ["Start with the part that has a capital letter.", "Next, add the joining word that makes sense.", "Finish with the other part, then read it aloud."],
      example: { type: "steps", title: "Mum smiled / although / she was tired.", steps: ["Mum smiled", "Mum smiled although", "Mum smiled although she was tired."] },
    },
    {
      title: "Finish the sentence well",
      lines: ["Look closely at the joining word first.", "After because, give a reason.", "After although, say something you would not expect."],
      example: { type: "fix", title: "Which ending fits?", wrong: "Sam was cold although he lost his hat.", right: "Sam was cold because he lost his hat.", note: "Losing his hat is the reason, so use because." },
    },
  ],
  "time-and-cause-words": [
    {
      title: "Words for when and why",
      lines: ["Some words tell us WHEN: before, after, while, during, then, next, soon.", "Some tell us WHY: so, therefore, because of.", "Read the sentence and pick the one that fits."],
      example: { type: "sentence", title: "A time word", text: "We brushed our teeth **before** bed.", note: "“before” tells us WHEN." },
    },
    {
      title: "Sort when from why",
      lines: ["Find the time or cause word in the sentence.", "Ask yourself: does it tell me WHEN or WHY?", "Then put the sentence in the right box."],
      example: {
        type: "table",
        title: "Two kinds of word",
        headers: ["It tells us", "Words"],
        rows: [["WHEN", "before, after, while, during, then, next, soon"], ["WHY", "so, therefore, because of"]],
      },
    },
    {
      title: "Put a story in order",
      lines: ["Find the sentence with no time word: it often starts the story.", "Then, next and soon come later.", "Check that each part follows on from the last."],
      example: { type: "steps", title: "Time words show the order", steps: ["Tom got out of bed.", "Then he ate his toast.", "Soon it was time for school."] },
    },
    {
      title: "Type the missing word",
      lines: ["Read the whole mini-story first.", "Does the gap need a WHEN word or a WHY word?", "Pick one word from the box and type it."],
      example: { type: "sentence", title: "A cause word", text: "The lights went out, **so** we lit a candle.", note: "“so” tells us WHY we lit a candle." },
    },
  ],
  "the-present-perfect": [
    {
      title: "Has or have?",
      lines: ["The present perfect is has or have plus a verb.", "Use has for one person or thing.", "Use have with I, you, we, they or two people."],
      example: {
        type: "table",
        title: "Who goes with which word",
        headers: ["Who", "Word"],
        rows: [["he, she, it, Mia, the dog", "has"], ["I, you, we, they, Mia and Sam", "have"]],
      },
    },
    {
      title: "Present perfect or past?",
      lines: ["Look just before the verb.", "If you see has or have, it is the present perfect.", "No has or have means simple past. Watch out: had is not has!"],
      example: { type: "sentence", title: "Present perfect", text: "Sam **has washed** the car.", note: "Simple past has no has or have: Sam washed the car." },
    },
    {
      title: "Build the present perfect",
      lines: ["Start with who did it.", "Add has or have, then the verb.", "Some verbs change: has eaten, not has ate."],
      example: { type: "equation", title: "Building the verb", parts: ["has", "+", "drawn", "=", "has drawn"], note: "Mia has drawn a horse." },
    },
    {
      title: "Let the time clue decide",
      lines: ["Look for a time clue in the sentence.", "Yesterday, last week and ago need the simple past.", "Since, so far, already and yet need has or have."],
      example: { type: "fix", title: "The clue is “yesterday”", wrong: "I have visited the zoo yesterday.", right: "I visited the zoo yesterday.", note: "“yesterday” is finished, so use the simple past." },
    },
  ],
  "inverted-commas": [
    {
      title: "Find the spoken words",
      lines: ["Inverted commas are also called speech marks.", "They go around the exact words someone says.", "Read only the words between “ and ”."],
      example: { type: "sentence", title: "What did Mo say?", text: "“**I like cats,**” said Mo.", note: "Mo said: I like cats." },
    },
    {
      title: "Do they need speech marks?",
      lines: ["Direct speech is someone’s exact words.", "Only direct speech needs inverted commas.", "Said that, asked if, or told a joke do not."],
      example: {
        type: "table",
        title: "Exact words or not?",
        headers: ["Sentence", "Needs “ ”?"],
        rows: [["Mo said, I am hot.", "yes"], ["Mo said that he was hot.", "no"]],
      },
    },
    {
      title: "Put the marks in",
      lines: ["Find the exact words that are spoken.", "Put the opening mark just before the first spoken word.", "Put the closing mark after the last one."],
      example: { type: "steps", title: "Tia asked, Is it lunch yet?", steps: ["Spoken words: Is it lunch yet?", "Open before “Is”.", "Close after “yet?”: Tia asked, “Is it lunch yet?”"] },
    },
    {
      title: "Check where the marks go",
      lines: ["Read each sentence carefully.", "The marks hug the spoken words only.", "Words like said Mo stay outside the marks."],
      example: { type: "fix", title: "Only the spoken words go inside", wrong: "“Mo said,” I am hot.", right: "Mo said, “I am hot.”", note: "Mo said is not what Mo said out loud." },
    },
  ],
};
