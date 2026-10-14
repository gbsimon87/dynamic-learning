/**
 * Bix's lessons for Year 3 Spelling: Sounds and Homophones, one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the games in
 * src/pages/skills/english/challenges/year3/ and their builders in
 * src/data/challenges/english/). No example is taken from a question bank.
 */
export const SOUNDS_HOMOPHONES_LESSONS = {
  "the-sure-and-ture-endings": [
    {
      title: "Hear the ending sound",
      lines: ["Say the word out loud and listen to the end.", "If it sounds like zhuh, it is always spelt sure.", "If it sounds like chuh, it is usually spelt ture."],
      example: { type: "table", title: "Listen to the last sound", headers: ["Word", "Sounds like", "Ending"], rows: [["closure", "zhuh", "-sure"], ["vulture", "chuh", "-ture"], ["moisture", "chuh", "-ture"]] },
    },
    {
      title: "Watch out for cher",
      lines: ["Some chuh words are a root word plus er.", "If the root ends in ch or tch, just add er.", "So sort each word by hearing it and checking for a root."],
      example: { type: "equation", title: "A root word plus er", parts: ["preach", "+", "er", "=", "preacher"], note: "preach is a real word, so it ends in -cher, not -ture." },
    },
    {
      title: "Spot the wrong ending",
      lines: ["Read the whole sentence slowly.", "Look closely at how each long word ends.", "Tap the word whose ending breaks the rule."],
      example: { type: "fix", title: "One ending is wrong", wrong: "The vulcher flew over the hills.", right: "The vulture flew over the hills.", note: "vult is not a root word, so it is -ture." },
    },
    {
      title: "Write the whole word",
      lines: ["Read or listen to the sentence.", "Say the missing word and listen to its ending.", "Choose sure, ture or cher, then type every letter."],
      example: { type: "sentence", title: "Filling the gap", text: "After the rain, the grass was full of **moisture**.", note: "It ends in chuh and has no root word, so -ture." },
    },
  ],
  "tricky-sounds-y-and-ou": [
    {
      title: "Two tricky spellings",
      lines: ["Sometimes the i sound in pin is spelt y.", "Sometimes the u sound in cup is spelt ou.", "Say the word, then think which spelling it uses."],
      example: { type: "table", title: "Same sound, tricky spelling", headers: ["Word", "Sound", "Spelt"], rows: [["cymbal", "i", "y"], ["tough", "u", "ou"], ["rough", "u", "ou"]] },
    },
    {
      title: "Tricky or usual?",
      lines: ["Most words spell these sounds the usual way, with i or u.", "A few special words use y or ou instead.", "Learn the special words so you can spot them."],
      example: { type: "table", title: "Sorting the i sound", headers: ["Word", "Spelling"], rows: [["system", "tricky y"], ["sit", "usual i"], ["lyric", "tricky y"]], note: "Most i sounds use i. Only a few use y." },
    },
    {
      title: "Build it letter by letter",
      lines: ["Say the word slowly, sound by sound.", "Pick each letter tile in order.", "One tile is a trap: the usual spelling is not needed."],
      example: { type: "steps", title: "Building cymbal", steps: ["Say it: c - y - m - b - a - l.", "The i sound is spelt with y here.", "Leave the spare i tile behind."] },
    },
    {
      title: "Type the tricky word",
      lines: ["Read or listen to the sentence.", "Think about which word fits the gap.", "Remember its tricky letters as you type."],
      example: { type: "sentence", title: "Filling the gap", text: "The bark on the old tree felt **rough**.", note: "The u sound is spelt ou." },
    },
  ],
  homophones: [
    {
      title: "Same sound, different meaning",
      lines: ["Homophones sound the same but are spelt differently.", "Each spelling has its own meaning.", "Read the meaning, then pick the spelling that matches."],
      example: { type: "table", title: "Two words that sound alike", headers: ["Word", "Meaning"], rows: [["sea", "lots of salty water"], ["see", "to look with your eyes"]] },
    },
    {
      title: "Match meanings to words",
      lines: ["Read each meaning card carefully.", "Ask which spelling that meaning belongs to.", "Each word gets its own cards."],
      example: { type: "table", title: "Sorting meanings", headers: ["Meaning", "Word"], rows: [["a soldier in armour", "knight"], ["the dark time after evening", "night"]] },
    },
    {
      title: "Find the wrong homophone",
      lines: ["Read the whole sentence.", "Find the word that sounds right but is spelt wrong.", "Its meaning will not fit the sentence."],
      example: { type: "fix", title: "One word does not fit", wrong: "The wind blue my hat away.", right: "The wind blew my hat away.", note: "blue is a colour. blew is what the wind did." },
    },
    {
      title: "Type the right homophone",
      lines: ["Read or listen to the sentence.", "Work out what the missing word means.", "Type the spelling that has that meaning."],
      example: { type: "sentence", title: "Filling the gap", text: "The sky was bright **blue** all day.", note: "blue the colour, not blew the wind." },
    },
  ],
  "words-often-misspelt": [
    {
      title: "Use the spelling tip",
      lines: ["Some words trick lots of people.", "A tip tells you the tricky part to look at.", "Check that part in each spelling before you pick."],
      example: { type: "table", title: "Tip: island has a silent s", headers: ["Spelling", "Right?"], rows: [["iland", "no, the s is missing"], ["island", "yes"], ["ilund", "no"]] },
    },
    {
      title: "Right or wrong?",
      lines: ["Look at every letter, one at a time.", "Look for a missing letter, a doubled letter, or swapped letters.", "Then sort the word into the right box."],
      example: { type: "fix", title: "A missing letter", wrong: "libary", right: "library", note: "Say it slowly: li-brar-y. There are two r's." },
    },
    {
      title: "Build it from tiles",
      lines: ["Read the meaning and say the word.", "Find the first letter tile.", "Add the rest in order, and use every tile."],
      example: { type: "equation", title: "Building naughty", parts: ["n", "augh", "t", "y", "=", "naughty"], note: "The aw sound is spelt augh." },
    },
    {
      title: "Type the tricky word",
      lines: ["Read or listen to the sentence.", "Picture the word and its tricky part.", "Type it, then check each letter."],
      example: { type: "sentence", title: "Filling the gap", text: "Wait one **minute** while I find my coat.", note: "minute has an e on the end." },
    },
  ],
};
