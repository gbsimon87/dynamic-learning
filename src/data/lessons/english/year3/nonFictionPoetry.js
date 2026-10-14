/**
 * Bix's lessons for Year 3 Reading: Non-fiction and Poetry, one per challenge
 * slot. Each one teaches exactly what that challenge asks (see the topic
 * builders in src/data/challenges/english/).
 */
export const NON_FICTION_POETRY_LESSONS = {
  "finding-information": [
    {
      title: "Use the contents page",
      lines: ["A contents page is at the front of a book.", "It lists the chapters in page order.", "Find the chapter that matches your question, then read its page number."],
      example: { type: "table", title: "Contents: All About Trees", headers: ["Chapter", "Page"], rows: [["Roots", "3"], ["Leaves", "7"], ["Fruit and seeds", "11"]], note: "To find out how roots drink water, turn to page 3." },
    },
    {
      title: "Look it up in the index",
      lines: ["An index is at the back of a book.", "Its words go in alphabetical order, from A to Z.", "Pick one key word from your question, then find it in the index."],
      example: { type: "steps", title: "Which page tells you what owls eat?", steps: ["The key word is owls.", "O comes after N and before P.", "Find owls in the index and read its page number."] },
    },
    {
      title: "Sort words from A to Z",
      lines: ["Index words go in alphabetical order.", "Look at the first letter of each word.", "If two first letters match, look at the second letter."],
      example: { type: "steps", title: "Put owls, bats, foxes and beetles in order", steps: ["Bats and beetles both start with b.", "A comes before e, so bats goes first.", "Then beetles, foxes, owls."] },
    },
    {
      title: "Fill in a fact file",
      lines: ["Read the headings first to see what each part is about.", "Find the part that matches the fact you need.", "Read it carefully, then fill in the fact."],
      example: { type: "table", title: "Fact file: Owls", headers: ["Fact", "Answer"], rows: [["Food", "mice and beetles"], ["When they hunt", "at night"]], note: "Each answer came from the part with the matching heading." },
    },
  ],
  "asking-questions-about-a-text": [
    {
      title: "Match the question word",
      lines: ["Question words help you find out more.", "Each question word wants a different kind of answer.", "Think: is the answer a person, a place, a time, a reason or a way?"],
      example: { type: "table", title: "What each question word asks", headers: ["Word", "It asks about"], rows: [["Who", "a person"], ["Where", "a place"], ["When", "a time"], ["Why", "a reason"], ["How", "the way"]] },
    },
    {
      title: "Can the text answer it?",
      lines: ["Read the text carefully.", "If you can point to the words that answer it, the text tells us.", "If no words answer it, the text does not say."],
      example: { type: "sentence", title: "Read this text", text: "Mia **fed the ducks** at the lake.", note: "What did Mia feed? The text says. Who went with her? It does not say." },
    },
    {
      title: "Find the part that answers",
      lines: ["Look at the question word first.", "Where wants a place. When wants a time. Why wants a reason.", "Then find the part of the sentence that gives it."],
      example: { type: "sentence", title: "Where did Sam swim?", text: "Sam swam **in the sea** after breakfast.", note: "Where wants a place, so the answer is in the sea." },
    },
    {
      title: "Ask questions as you read",
      lines: ["Asking questions helps you understand a story.", "Some answers are in the story, and some are not.", "If a part puzzles you, ask a question about it."],
      example: { type: "steps", title: "Tom found muddy paw prints by the door.", steps: ["Ask: who made the paw prints?", "Read on and look for clues.", "Check: does the story answer it?"] },
    },
  ],
  "kinds-of-writing": [
    {
      title: "What kind of writing?",
      lines: ["There are lots of kinds of writing.", "Each kind has its own clues.", "Look at how it starts and how it is set out."],
      example: { type: "table", title: "Clues for each kind", headers: ["Kind", "Clue"], rows: [["Letter", "starts with Dear …"], ["Diary", "a date, then I and my"], ["Instructions", "How to …, then steps"], ["Information", "facts about a topic"], ["Story", "characters and events"], ["Poem", "short lines"]] },
    },
    {
      title: "Sort the pieces of writing",
      lines: ["Look at each small piece of writing.", "Look for a clue, like a greeting, a date or a number.", "Put it with the kind it comes from."],
      example: { type: "sentence", title: "Which kind is this from?", text: "**2.** Stir in the sugar.", note: "A numbered step comes from instructions." },
    },
    {
      title: "Spot the features",
      lines: ["A letter starts with a greeting and ends with a sign-off.", "Instructions have a heading and numbered steps.", "A diary uses I, me and my."],
      example: { type: "steps", title: "The parts of a letter", steps: ["Dear Sam, (the greeting)", "Thank you for the card! (the message)", "Love from Jo (the sign-off)"] },
    },
    {
      title: "Why was it written?",
      lines: ["Read the whole text first.", "Ask: what kind of writing is it?", "Then ask: why did the writer write it?"],
      example: { type: "table", title: "Each kind has a job", headers: ["Kind", "Why it was written"], rows: [["Letter", "to send news to someone"], ["Instructions", "to show how to do something"], ["Information", "to give facts"], ["Diary", "to remember your own day"]] },
    },
  ],
  "words-that-spark-the-imagination": [
    {
      title: "Pick the word that paints",
      lines: ["Some words paint a clear picture in your head.", "Went and moved are plain words.", "Choose the word that shows exactly how it happened."],
      example: { type: "fix", title: "Make the sentence paint a picture", wrong: "The horse went down the road.", right: "The horse galloped down the road.", note: "Galloped shows exactly how the horse moved." },
    },
    {
      title: "See it, hear it, feel it",
      lines: ["Good words help you see, hear or feel a scene.", "Imagine you are really there.", "Ask: would I use my eyes, my ears or my skin?"],
      example: { type: "table", title: "Which sense?", headers: ["Sense", "Phrase"], rows: [["See 👀", "a glowing moon"], ["Hear 👂", "a door slamming"], ["Feel ✋", "a cold, wet nose"]] },
    },
    {
      title: "Find the lively word",
      lines: ["Most words in a sentence are plain.", "Look for the one word that makes it come alive.", "It often tells you exactly how something happened."],
      example: { type: "sentence", title: "Find the lively word", text: "The dog **lapped** up the water.", note: "Lapped tells you exactly how the dog drank." },
    },
    {
      title: "Picture what it means",
      lines: ["Writers sometimes say things that are not exactly true.", "They compare one thing to another to help you picture it.", "Ask: what is it really like?"],
      example: { type: "steps", title: "The car purred like a cat.", steps: ["A car is not really a cat.", "A cat purrs softly and smoothly.", "So the car’s engine was quiet and smooth."] },
    },
  ],
  "poetry-forms": [
    {
      title: "Hear the rhyme",
      lines: ["Rhyming words end with the same sound.", "In a poem, rhymes are often at the ends of lines.", "Say the words out loud and listen to the endings."],
      example: { type: "sentence", title: "Listen to the endings", text: "My shoes are **red**, I wear them to **bed**.", note: "Red and bed end with the same sound, so they rhyme." },
    },
    {
      title: "Rhyming or free verse?",
      lines: ["Some poems rhyme at the ends of lines.", "Free verse is a poem that does not have to rhyme.", "Read the last word of each line out loud to check."],
      example: { type: "table", title: "Two kinds of lines", headers: ["Lines", "Kind"], rows: [["My hat is blue / and so is my shoe.", "Rhymes"], ["Mist hangs / over the river.", "Free verse"]] },
    },
    {
      title: "A poem that tells a story",
      lines: ["A narrative poem tells a story.", "Something happens, then something else, then something else.", "Other poems describe just one thing or one moment."],
      example: { type: "steps", title: "A narrative poem tells events in order", steps: ["Mia woke up early.", "She ran down to the beach.", "She found a starfish."], note: "Things happen in order, so it tells a story." },
    },
    {
      title: "Name the kind of poem",
      lines: ["Ask two questions about the poem.", "Does it tell a story? Do the line endings rhyme?", "Put both answers together to name the poem."],
      example: { type: "table", title: "Two questions to ask", headers: ["Question", "Yes", "No"], rows: [["Does it tell a story?", "narrative poem", "describes something"], ["Do the endings rhyme?", "rhyming", "free verse"]] },
    },
  ],
};
