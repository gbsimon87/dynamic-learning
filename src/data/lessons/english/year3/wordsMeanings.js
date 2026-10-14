/**
 * Bix's lessons for Year 3 Reading: Words and Meanings, one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the games in
 * src/pages/skills/english/challenges/year3/ and their builders in
 * src/data/challenges/english/). No example is taken from a question bank.
 */
export const WORDS_MEANINGS_LESSONS = {
  "root-words": [
    {
      title: "Find the root word",
      lines: ["A root word is the word at the heart of a longer word.", "A prefix is added to the front. A suffix is added to the end.", "Cover up the added parts. The real word left is the root."],
      example: { type: "steps", title: "Finding the root of unfairly", steps: ["Look at the word: unfairly.", "Cover the prefix at the front: un.", "Cover the suffix at the end: ly.", "fair is left, so fair is the root word."] },
    },
    {
      title: "Spot the word family",
      lines: ["Words in a family share the same root word.", "Some words only look the same at the start.", "Check that the whole root word is really inside."],
      example: { type: "table", title: "Is the root word jump inside?", headers: ["Word", "Root word jump?"], rows: [["jumping", "yes"], ["jumper", "yes"], ["jungle", "no, it only starts the same"]], note: "jungle is the odd one out." },
    },
    {
      title: "Build a new word",
      lines: ["Read the meaning carefully.", "Pick the root word, then pick the part that adds the meaning.", "A prefix goes at the front. A suffix goes at the end."],
      example: { type: "equation", title: "A word that means without help", parts: ["help", "+", "less", "=", "helpless"], note: "less means without." },
    },
    {
      title: "Work out a new word",
      lines: ["Meet a new word? Split it into its parts.", "Think about what each part means.", "Put the meanings together, then check it fits the sentence."],
      example: { type: "sentence", title: "re means again", text: "The bottle was empty, so Bix **refilled** it.", note: "re + filled means filled it again." },
    },
  ],
  "exception-words": [
    {
      title: "Listen to the tricky letters",
      lines: ["Some words do not sound the way they are spelt.", "The tricky letters are marked for you.", "Say the word aloud. What sound do those letters make?"],
      example: { type: "table", title: "Tricky letters in other words", headers: ["Word", "Tricky letters", "They say"], rows: [["women", "o", "i, as in pin"], ["island", "s", "no sound at all"]] },
    },
    {
      title: "Find the right word",
      lines: ["The same letters can make different sounds in different words.", "Read each word aloud, slowly.", "Pick the word where the letters make the sound you are given."],
      example: { type: "steps", title: "Where does ou say oo?", steps: ["Read soup: ou says oo.", "Read cloud: ou says ow.", "So soup is the answer."] },
    },
    {
      title: "Tap the tricky letters",
      lines: ["Say the word slowly, sound by sound.", "Listen for the sound you are asked about.", "Find the letters that make it. They can be anywhere."],
      example: { type: "sentence", title: "Which letter makes no sound?", text: "In the word s**w**ord, the w makes no sound.", note: "The silent letter is near the start." },
    },
    {
      title: "Read and choose the word",
      lines: ["Read the whole sentence first.", "Read each word carefully, even the tricky ones.", "Choose the word that makes the sentence make sense."],
      example: { type: "sentence", title: "Only one word fits", text: "We rowed a boat across the lake to the **island**.", note: "Try each word in the gap and read it again." },
    },
  ],
  "using-a-dictionary": [
    {
      title: "Dictionaries go a to z",
      lines: ["A dictionary puts words in alphabetical order.", "Look at the first letter of each word.", "The letter nearest to a comes first."],
      example: { type: "steps", title: "Which comes first: tent, bus or monkey?", steps: ["The first letters are t, b and m.", "In the alphabet, b comes before m and t.", "So bus comes first."] },
    },
    {
      title: "Use the guide words",
      lines: ["Guide words show the first and last word on a page.", "If two words start the same, look at the next letter.", "Your word fits if it comes between the guide words."],
      example: { type: "table", title: "Guide words: frog and fur", headers: ["Word", "On this page?"], rows: [["fruit", "yes, ru comes between ro and u"], ["fox", "no, o comes before r"]] },
    },
    {
      title: "Put words in order",
      lines: ["If the first letters match, look at the second letter.", "If those match too, look at the third letter.", "Put the word with the earliest letter first."],
      example: { type: "steps", title: "Order: bun, bat, bed", steps: ["All start with b.", "Second letters: u, a, e.", "a, then e, then u.", "So: bat, bed, bun."] },
    },
    {
      title: "Pick the meaning that fits",
      lines: ["Some words have more than one meaning in a dictionary.", "Read the sentence again.", "Try each meaning in the sentence. Pick the one that makes sense."],
      example: { type: "sentence", title: "pitch: 1. a field for sport  2. how high a sound is", text: "The players ran out onto the football **pitch**.", note: "Meaning 1, a field for sport, fits here." },
    },
  ],
  "words-in-context": [
    {
      title: "One word, two meanings",
      lines: ["Some words have more than one meaning.", "The other words in the sentence are your clues.", "Try each meaning in the sentence. Which one makes sense?"],
      example: { type: "sentence", title: "pen: something to write with, or a place for animals", text: "The farmer shut the sheep in their **pen**.", note: "Sheep live in it, so it is a place for animals." },
    },
    {
      title: "Sort by meaning",
      lines: ["Each sentence uses the same word.", "Read one sentence at a time.", "Decide which meaning fits, then put it in that group."],
      example: { type: "table", title: "Two meanings of tap", headers: ["Sentence", "Meaning"], rows: [["Turn off the tap.", "water comes out of it"], ["Tap on the door.", "knock gently"]] },
    },
    {
      title: "Find the clue word",
      lines: ["A new word can be explained by the next sentence.", "Look for a word you know that means the same.", "That word is your clue."],
      example: { type: "sentence", title: "The kitchen was spotless.", text: "It was so **clean** that it sparkled.", note: "clean tells you what spotless means." },
    },
    {
      title: "Words in a story",
      lines: ["Find the word in the story.", "Read the sentences around it.", "Pick the meaning that makes sense in that part of the story."],
      example: { type: "steps", title: "What does pale mean here?", steps: ["Find it: Bix looked pale and ill.", "Read around it: he went to bed early.", "So pale means having a white face."] },
    },
  ],
};
