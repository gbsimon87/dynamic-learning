/**
 * Bix's lessons for Year 3 Reading – Stories, one per challenge slot. Each one
 * teaches exactly what that challenge asks (see the games in
 * pages/skills/english/challenges/year3 and their builders in
 * data/challenges/english). No example is a question from its slot's bank.
 */
export const STORIES_LESSONS = {
  "does-it-make-sense": [
    {
      title: "Choose the word that fits",
      lines: ["A sentence has to make sense.", "Try each word in the gap and read the whole sentence.", "Ask: could this really happen?"],
      example: { type: "sentence", title: "Which word fits the gap?", text: "Mum cut the bread with a **knife**.", note: "A knife cuts bread. A sock or a cloud could not!" },
    },
    {
      title: "Sense or nonsense?",
      lines: ["Read each sentence slowly, all the way to the end.", "Picture it in your head.", "If it is silly or impossible, it does not make sense."],
      example: { type: "table", title: "Sort these sentences", headers: ["Sentence", "Makes sense?"], rows: [["The cat drank some milk.", "✅ Yes"], ["The cat drank some bricks.", "❌ No"]] },
    },
    {
      title: "Spot the word that is wrong",
      lines: ["Sometimes one word spoils a sentence.", "Read the sentence and stop when something sounds odd.", "Check that word against the other words."],
      example: { type: "fix", title: "One word does not fit", wrong: "Gran put the cake in the fridge to bake.", right: "Gran put the cake in the oven to bake.", note: "You bake a cake in an oven." },
    },
    {
      title: "Check a whole story",
      lines: ["Good readers check that a story makes sense as they go.", "Look for a word that is wrong.", "Look for a sentence about something else."],
      example: { type: "steps", title: "When you check a story", steps: ["Read one sentence at a time.", "Stop if a word sounds silly.", "Ask: is this sentence about the story?", "Then think about what happened."] },
    },
  ],
  "characters-feelings": [
    {
      title: "How does the character feel?",
      lines: ["Stories do not always tell you the feeling.", "Look at what the character does and says.", "Then choose the feeling that fits."],
      example: { type: "sentence", title: "What is the clue?", text: "Sam **hugged his new puppy and laughed**.", note: "Hugging and laughing show that Sam feels happy." },
    },
    {
      title: "Actions show feelings",
      lines: ["Writers show feelings through actions.", "Shaking can show fear. Stamping can show anger.", "Match the action to the feeling."],
      example: { type: "table", title: "Actions and feelings", headers: ["Action", "Feeling"], rows: [["Her lip wobbled.", "😢 sad"], ["He stomped up the stairs.", "😠 angry"], ["She cheered and clapped.", "😊 happy"]] },
    },
    {
      title: "Find the evidence",
      lines: ["Evidence means the words that prove your idea.", "Some sentences only tell you where or when.", "Find the sentence that shows the feeling."],
      example: { type: "sentence", title: "Nadia felt shy. Which sentence shows it?", text: "Nadia went to the party. **She hid behind her mum and looked at her shoes.**", note: "Hiding and looking down show that she is shy." },
    },
    {
      title: "Feelings can change",
      lines: ["A character can feel different at the start and the end.", "Look at their actions in each part.", "Think about why they act that way."],
      example: { type: "steps", title: "Tom’s feelings change", steps: ["Tom drops his ice cream. He feels sad.", "His friend shares hers with him.", "Tom smiles. Now he feels happy."] },
    },
  ],
  "predicting-what-happens-next": [
    {
      title: "Use clues to predict",
      lines: ["A prediction is a good guess about what happens next.", "Look for clues in the story.", "Choose the idea the clues point to."],
      example: { type: "sentence", title: "What will happen next?", text: "**The kettle began to whistle.** Mum took out a cup.", note: "The clues tell us Mum will make a hot drink." },
    },
    {
      title: "Match clues to predictions",
      lines: ["A clue is a detail that makes you think something will happen.", "Read each clue carefully.", "Ask: which prediction does this clue help?"],
      example: { type: "table", title: "Which prediction does it help?", headers: ["Clue", "Prediction"], rows: [["The car has a flat tyre.", "🚗 Dad will fix the car."], ["Ruby packs a picnic.", "🧺 Ruby will eat outside."]] },
    },
    {
      title: "Tap the clue sentence",
      lines: ["Some sentences just set the scene.", "One sentence gives the real clue.", "Find the sentence that makes the prediction likely."],
      example: { type: "sentence", title: "Prediction: Ben will be sick.", text: "Ben went to the fair. **He ate five toffee apples and went on the big wheel.**", note: "Lots of sweets and a ride: that is the clue." },
    },
    {
      title: "Predict as you read",
      lines: ["Stop at the end of a part and think.", "Some clues are said, and some are only hinted.", "Use what you know to predict and explain why."],
      example: { type: "steps", title: "How to predict", steps: ["Read the part carefully.", "Find a clue.", "Say what you think will happen.", "Explain which clue made you think so."] },
    },
  ],
  "fairy-stories-myths-and-legends": [
    {
      title: "Spot story features",
      lines: ["Fairy stories often start with “Once upon a time”.", "They have magic, talking animals and things in threes.", "Myths have gods. Legends have heroes."],
      example: { type: "sentence", title: "A fairy story feature", text: "**Once upon a time**, a kind girl lived in a little house.", note: "This opening tells you a fairy story is starting." },
    },
    {
      title: "Fairy story, myth or legend?",
      lines: ["A fairy story has magic and “happily ever after”.", "A myth has gods, or explains how something began.", "A legend is about a hero who may have been real."],
      example: { type: "table", title: "Three kinds of story", headers: ["Kind", "Look for"], rows: [["🏰 Fairy story", "magic, witches, giants"], ["⚡ Myth", "gods, how something began"], ["🏹 Legend", "a real hero, long ago"]] },
    },
    {
      title: "Find the feature",
      lines: ["Read the short story one sentence at a time.", "Look for the feature you are asked to find.", "Tap the sentence that shows it."],
      example: { type: "sentence", title: "Find something magic", text: "A poor man lived in a hut. **One day he found a hat that granted wishes.**", note: "A hat that grants wishes is a magic object." },
    },
    {
      title: "Read a traditional tale",
      lines: ["Decide what kind of story it is.", "Look for the words that prove it.", "Think about the lesson the story teaches."],
      example: { type: "steps", title: "When you read a tale", steps: ["Is it a fairy story, myth or legend?", "Which words tell you?", "What does the story teach us?"] },
    },
  ],
};
