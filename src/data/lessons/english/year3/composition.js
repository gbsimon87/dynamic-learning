/**
 * Bix's lessons for Year 3 Writing – Composition, one per challenge slot. Each
 * one teaches exactly what that challenge asks (see the games in
 * pages/skills/english/challenges/year3 and their builders in
 * data/challenges/english). No example is a question from its slot's bank.
 */
export const COMPOSITION_LESSONS = {
  paragraphs: [
    {
      title: "One paragraph, one idea",
      lines: ["A paragraph is a group of sentences about one thing.", "Ask: what is this sentence mostly about?", "Put it in the paragraph about that thing."],
      example: { type: "sentence", title: "A text about foxes has two paragraphs", text: "Foxes **eat mice, rabbits and berries**.", note: "This sentence is about food, so it goes in “What foxes eat”." },
    },
    {
      title: "Sort sentences into paragraphs",
      lines: ["Read every sentence first.", "Find the ones about the same thing.", "Two sentences go in each paragraph."],
      example: { type: "table", title: "A text about trains", headers: ["Sentence", "Paragraph"], rows: [["Old trains ran on steam.", "Trains long ago"], ["Steam trains puffed out smoke.", "Trains long ago"], ["Fast trains now use electricity.", "Trains today"], ["Some trains today have no driver.", "Trains today"]] },
    },
    {
      title: "Start a new paragraph",
      lines: ["When the text moves on to a new idea, start a new paragraph.", "Read until the idea changes.", "The new paragraph starts there."],
      example: { type: "steps", title: "A text about kites", steps: ["Kites need wind to fly.", "A gentle breeze is best.", "— new paragraph —", "You can make a kite from paper and sticks."], note: "The idea changed from wind to making a kite." },
    },
    {
      title: "Add a sentence to a text",
      lines: ["Read the first sentence of each paragraph.", "It tells you what the paragraph is about.", "Put the new sentence where it fits best."],
      example: { type: "fix", title: "Where does it go?", wrong: "Paragraph 1: How whales swim", right: "Paragraph 2: What whales eat", note: "“Whales eat tiny shrimps called krill” is about food." },
    },
  ],
  "headings-and-sub-headings": [
    {
      title: "What a sub-heading does",
      lines: ["A heading is the title of a whole text.", "A sub-heading is a small title for one part.", "It tells you what that part is about."],
      example: { type: "sentence", title: "Choose a sub-heading for this paragraph", text: "**Where rabbits live:** Rabbits dig long tunnels called burrows.", note: "The paragraph is about burrows, so it is about where rabbits live." },
    },
    {
      title: "Match sub-headings to paragraphs",
      lines: ["Read each paragraph and ask what it is about.", "Look for a word that is in both.", "Each sub-heading goes with one paragraph."],
      example: { type: "table", title: "A text about bikes", headers: ["Sub-heading", "Paragraph"], rows: [["Staying safe", "Always wear a helmet."], ["Looking after your bike", "Pump up the tyres every week."]] },
    },
    {
      title: "Spot the sub-heading that is wrong",
      lines: ["Every sub-heading should be about the main heading.", "Read each sub-heading and the paragraph under it.", "One that is about something else is wrong."],
      example: { type: "fix", title: "A text called Dolphins", wrong: "Building a snowman", right: "How dolphins talk", note: "A snowman has nothing to do with dolphins." },
    },
    {
      title: "Put the sub-headings back",
      lines: ["Read one paragraph at a time.", "Choose the sub-heading that sums it up.", "Each sub-heading is used once only."],
      example: { type: "steps", title: "A report about bread", steps: ["Read paragraph 1: flour, water and yeast.", "Choose “What you need”.", "Read paragraph 2: mix, knead and bake.", "Choose “How to make it”."] },
    },
  ],
  "settings-characters-and-plot": [
    {
      title: "Describe the setting",
      lines: ["The setting is where and when a story happens.", "Good setting sentences use what you see, hear and smell.", "Make sure it is the right place!"],
      example: { type: "sentence", title: "A setting: a swimming pool", text: "**Swimmers splashed, whistles blew and the air smelt of chlorine.**", note: "You can hear and smell the pool." },
    },
    {
      title: "Setting, character or plot?",
      lines: ["Setting tells you where or when.", "Character tells you who and what they are like.", "Plot tells you what happens."],
      example: { type: "table", title: "Three kinds of sentence", headers: ["Sentence", "Kind"], rows: [["The library was warm and quiet.", "🏰 Setting"], ["Sam was cheerful and chatty.", "🧒 Character"], ["Sam tripped over a pile of books.", "💥 Plot"]] },
    },
    {
      title: "Put the plot in order",
      lines: ["Most stories have a beginning, a problem, a solution and an ending.", "Find the problem first.", "Then ask: what fixed it?"],
      example: { type: "steps", title: "A plot in order", steps: ["Beginning: Mia went to the pool.", "Problem: She dropped her goggles in the deep end.", "Solution: The lifeguard dived in for them.", "Ending: Mia said thank you and swam happily."] },
    },
    {
      title: "Plan the rest of a story",
      lines: ["Read the middle of the story carefully.", "Each part you choose must fit with it.", "Ask: does this match what already happened?"],
      example: { type: "fix", title: "Choose an ending that fits", wrong: "The bus flew off to Mars.", right: "Tom found his lost hat on the bus seat.", note: "The story was about Tom losing his hat." },
    },
  ],
  proofreading: [
    {
      title: "Fix a marked mistake",
      lines: ["Proofreading means checking your writing for mistakes.", "The mistake is marked for you.", "Choose the spelling that looks right."],
      example: { type: "fix", title: "Choose the right spelling", wrong: "I will remembur my bag.", right: "I will remember my bag.", note: "Say it slowly: re-mem-ber." },
    },
    {
      title: "Find the misspelt word",
      lines: ["Read the sentence one word at a time.", "Look closely at each word.", "Tap the word that does not look right."],
      example: { type: "sentence", title: "Which word is spelt wrong?", text: "We heard a **strainge** noise in the attic.", note: "It should be spelt strange." },
    },
    {
      title: "Check capitals, marks and tense",
      lines: ["Names and sentences start with a capital letter.", "Questions end with a question mark.", "A story in the past should stay in the past."],
      example: { type: "fix", title: "One sentence slipped into the present", wrong: "Then Sam runs to the shop.", right: "Then Sam ran to the shop.", note: "The rest of the story said what happened, so use ran." },
    },
    {
      title: "Hunt for three mistakes",
      lines: ["Some paragraphs have more than one mistake.", "Check spelling, capital letters and end marks.", "Go one sentence at a time."],
      example: { type: "steps", title: "How to proofread a paragraph", steps: ["Read one sentence.", "Check each word is spelt right.", "Check the capital letters.", "Check the mark at the end.", "Move on to the next sentence."] },
    },
  ],
  dictation: [
    {
      title: "Choose the right sentence",
      lines: ["Dictation means writing down a sentence you hear.", "Check the spelling of each word.", "Check the capital letter and the end mark."],
      example: { type: "fix", title: "Which one is written correctly?", wrong: "where is the library.", right: "Where is the library?", note: "A capital to start, and a question mark for a question." },
    },
    {
      title: "Type the missing word",
      lines: ["Listen to the whole sentence.", "Say the missing word slowly in your head.", "Think how it is spelt, then type it."],
      example: { type: "sentence", title: "Listen and fill the gap", text: "We had our lunch at a **quarter** past twelve.", note: "Quarter starts with qu." },
    },
    {
      title: "Build the sentence you hear",
      lines: ["Put the word tiles in the order you hear them.", "One tile is spelt wrong, so leave it out.", "Finish with the right end mark."],
      example: { type: "equation", title: "Build it with tiles", parts: ["I", "like", "maths", "+", ".", "=", "I like maths."], note: "Leave out a tile like “mathz”." },
    },
    {
      title: "Write the whole sentence",
      lines: ["Listen to the sentence, and say it back to yourself.", "Start with a capital letter.", "Check every spelling and the end mark."],
      example: { type: "steps", title: "Before you check", steps: ["Is the first word a capital?", "Is every word spelt right?", "Are all the words there?", "Is the end mark right?"] },
    },
  ],
};
