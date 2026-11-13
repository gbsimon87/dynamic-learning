// Year 3 English introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's lesson; these say why the skill matters.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const eq = (title, parts, alt) => ({ renderer: "lesson", alt, data: { type: "equation", title, parts } });
const table = (title, headers, rows, alt) => ({ renderer: "lesson", alt, data: { type: "table", title, headers, rows } });
const sentence = (title, text, alt) => ({ renderer: "lesson", alt, data: { type: "sentence", title, text } });
const fix = (title, wrong, right, alt) => ({ renderer: "lesson", alt, data: { type: "fix", title, wrong, right } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const pictures = (title, items, alt) => ({ renderer: "pictures", alt, data: { title, items } });

export default defineIntroductions({
  year: 3, subject: "english",
  subjectIntro: {
    title: "Welcome to Year 3 English",
    learn: ["Build and spell longer words with prefixes and suffixes.", "Read stories, poems and information texts, and work out what is not said.", "Write in paragraphs with speech marks and joining words."],
    use: "English helps you read for fun and facts, explain your ideas, and write clearly for other people.",
    ex: "un, kind and ly join to make unkindly.",
    model: eq("Words are built from parts", ["un", "+", "kind", "+", "ly", "=", "unkindly"], "The parts un, kind and ly join to make the word unkindly."),
  },
  quests: {
    "spelling---prefixes-and-suffixes": {
      intro: {
        title: "Spelling: prefixes and suffixes",
        learn: ["Add word parts at the start, like dis, mis, re, super, anti and auto.", "Add endings like ation and ly.", "Know when to double a letter before an ending."],
        use: "Knowing word parts helps you spell long words and work out the meaning of new ones.",
        ex: "re and play make replay. It means play again.",
        model: table("Word parts", ["Part", "Means", "Word"], [["re", "again", "redo"], ["dis", "not", "disagree"], ["super", "above", "superstar"]], "A table showing re means again in redo, dis means not in disagree and super means above in superstar."),
      },
      topics: {
        "adding-prefixes": {
          title: "Adding prefixes",
          learn: ["A prefix goes at the start of a word and changes its meaning.", "dis, mis, in, re, sub and inter each have their own meaning."],
          use: "You will use these every day in words like redo, misspell and disagree.",
          ex: "mis and spell make misspell. It means spell wrongly.",
          model: table("Six prefixes", ["Prefix", "Meaning", "Word"], [["dis", "not", "disagree"], ["mis", "wrongly", "misspell"], ["in", "not", "incorrect"], ["re", "again", "redo"], ["sub", "under", "submarine"], ["inter", "between", "international"]], "A table showing dis means not in disagree, mis means wrongly in misspell, in means not in incorrect, re means again in redo, sub means under in submarine and inter means between in international."),
        },
        "the-prefixes-super-anti-and-auto": {
          title: "Super, anti and auto",
          learn: ["super means above or more than usual.", "anti means against, and auto means self or own."],
          use: "You will meet these in words like superstar, antiseptic and autograph.",
          ex: "A superstar is more than a star.",
          model: table("Three prefixes", ["Prefix", "Meaning", "Word"], [["super", "above or more than usual", "superstar"], ["anti", "against", "antisocial"], ["auto", "self or own", "autograph"]], "A table showing super means above in superstar, anti means against in antisocial and auto means self in autograph."),
        },
        "the-suffixes-ation-and-ly": {
          title: "The suffixes ation and ly",
          learn: ["ation turns a doing word into a naming word.", "ly turns a describing word into a word that tells how."],
          use: "You will use these endings to write words like information and sadly.",
          ex: "inform becomes information. sad becomes sadly.",
          model: table("Two endings", ["Word", "Ending", "New word"], [["inform", "ation", "information"], ["sad", "ly", "sadly"]], "A table showing inform plus ation makes information and sad plus ly makes sadly."),
        },
        "doubling-before-a-suffix": {
          title: "Doubling before a suffix",
          learn: ["In a longer word, double the last letter when the last part is loud.", "If the last part is quiet, just add the ending."],
          use: "This helps you spell words you write a lot, like beginning and forgetting.",
          ex: "We write beginning, with two n letters, but gardening, with one.",
          model: table("Loud or quiet end", ["Word", "With ing"], [["begin", "beginning"], ["garden", "gardening"]], "A table showing begin becomes beginning with a double n and garden becomes gardening with a single n."),
        },
      },
    },
    "reading---words-and-meanings": {
      intro: {
        title: "Reading: words and meanings",
        learn: ["Find root words inside longer words.", "Read tricky words and use a dictionary.", "Work out what a word means from the sentence around it."],
        use: "You can work out new words you meet and check them when you are stuck.",
        ex: "In unhappy, the root word is happy.",
        model: eq("Find the root", ["un", "+", "happy", "=", "unhappy"], "The prefix un joins the root word happy to make unhappy."),
      },
      topics: {
        "root-words": {
          title: "Root words",
          learn: ["A root word is the word at the heart of a longer word.", "Prefixes and suffixes are added to it."],
          use: "Spotting the root helps you read and understand long words.",
          ex: "helpful, helpless and helper all come from help.",
          model: table("A word family", ["Root", "Longer words"], [["help", "helpful, helpless, helper"], ["kind", "unkind, kindly, kindness"]], "A table showing the root help in helpful, helpless and helper, and the root kind in unkind, kindly and kindness."),
        },
        "exception-words": {
          title: "Exception words",
          learn: ["Some words are not spelt the way they sound.", "Learn where the tricky letters are in the word."],
          use: "You meet words like heart, caught and eight in lots of books.",
          ex: "In heart, the letters ear make an ar sound.",
          model: sentence("A tricky word", "Her **heart** beat fast.", "The sentence 'Her heart beat fast.' with the tricky word heart picked out."),
        },
        "using-a-dictionary": {
          title: "Using a dictionary",
          learn: ["A dictionary lists words in alphabetical order.", "Look at the first two or three letters to find a word."],
          use: "A dictionary helps you check a meaning or a spelling by yourself.",
          ex: "Words starting ba come before words starting be.",
          model: steps("Finding a word", ["Look at the first letter.", "If the first letters match, look at the second letter.", "Read the meaning that fits your sentence."], "Three steps: look at the first letter, then the second if the first letters match, then read the meaning that fits."),
        },
        "words-in-context": {
          title: "Words in context",
          learn: ["Some words have more than one meaning.", "The words around a word tell you which meaning it has."],
          use: "You can make sense of a text without stopping to ask.",
          ex: "A bat can fly in the night or be used to hit a ball.",
          model: sentence("Look at the clues", "The **bat** flew out of the cave at night.", "The sentence 'The bat flew out of the cave at night.' with the word bat picked out."),
        },
      },
    },
    "grammar---words": {
      intro: {
        title: "Grammar: words",
        learn: ["Choose a or an.", "See how words in the same family are linked."],
        use: "Small words and word links make your writing sound right.",
        ex: "An umbrella, but a bus.",
        model: table("A or an", ["Word", "Example"], [["a", "a bus"], ["an", "an umbrella"]], "A table showing a goes with a bus and an goes with an umbrella."),
      },
      topics: {
        "a-or-an": {
          title: "A or an",
          learn: ["Use an before a vowel letter: a, e, i, o, u.", "Use a before a consonant letter."],
          use: "Every day you write phrases like an apple or a bus.",
          ex: "an egg, but a bird.",
          model: table("A or an", ["Next word starts with", "Use", "Example"], [["a vowel letter", "an", "an egg"], ["a consonant letter", "a", "a bird"]], "A table showing an is used before a vowel letter as in an egg and a before a consonant letter as in a bird."),
        },
        "word-families": {
          title: "Word families",
          learn: ["Words in a family share a root word.", "They look alike and have a link in meaning."],
          use: "Knowing a family helps you spell and understand many words at once.",
          ex: "teach, teacher and teaching are a family.",
          model: table("A family", ["Root", "Family words"], [["teach", "teacher, teaching"], ["act", "actor, action"]], "A table showing the root teach in teacher and teaching, and the root act in actor and action."),
        },
      },
    },
    "reading---stories": {
      intro: {
        title: "Reading: stories",
        learn: ["Check that a story makes sense.", "Work out how characters feel and predict what happens next.", "Know fairy stories, myths and legends."],
        use: "Thinking as you read helps you enjoy a story and remember it.",
        ex: "A character stamps her feet. She is probably angry.",
        model: pictures("Story skills", [{ icon: "🧠", label: "Make sense" }, { icon: "🧒", label: "Feelings" }, { icon: "🔮", label: "Predict" }, { icon: "🐉", label: "Tales" }], "Four story skills: make sense, feelings, predict and tales."),
      },
      topics: {
        "does-it-make-sense": {
          title: "Does it make sense?",
          learn: ["Read slowly and picture what you read.", "Spot a word or sentence that does not fit."],
          use: "Good readers notice when something is wrong and go back to fix it.",
          ex: "The dog flew a kite in the sea does not make sense.",
          model: sentence("Read carefully", "The cat **barked** at the mouse.", "The sentence 'The cat barked at the mouse.' with the word barked picked out as odd."),
        },
        "characters-feelings": {
          title: "Characters' feelings",
          learn: ["Stories often show feelings by what a character does.", "Find the words that give the evidence."],
          use: "Understanding feelings helps you understand people in real life too.",
          ex: "Her hands shook. That is evidence that she was scared.",
          model: sentence("Evidence", "Mia's hands **shook** as she opened the door.", "The sentence 'Mia's hands shook as she opened the door.' with the word shook picked out as evidence."),
        },
        "predicting-what-happens-next": {
          title: "Predicting what happens next",
          learn: ["A prediction is a good guess based on clues.", "Some clues are stated and some are only hinted."],
          use: "Predicting keeps you thinking as you read.",
          ex: "Dark clouds gathered. It will probably rain.",
          model: sentence("A clue", "**Dark clouds** gathered over the park.", "The sentence 'Dark clouds gathered over the park.' with the words dark clouds picked out as a clue."),
        },
        "fairy-stories-myths-and-legends": {
          title: "Fairy stories, myths and legends",
          learn: ["Fairy stories have magic and a happy ending.", "Myths have gods. Legends are about heroes."],
          use: "Knowing these stories helps you understand many books and films.",
          ex: "A story starting Once upon a time is probably a fairy story.",
          model: table("Three kinds of story", ["Kind", "Clue"], [["Fairy story", "magic, happy ending"], ["Myth", "gods"], ["Legend", "a hero"]], "A table showing a fairy story has magic and a happy ending, a myth has gods and a legend is about a hero."),
        },
      },
    },
    "spelling---sounds-and-homophones": {
      intro: {
        title: "Spelling: sounds and homophones",
        learn: ["Spell endings like sure and ture.", "Spell tricky sounds, homophones and words that are often misspelt."],
        use: "Careful spelling means readers understand exactly what you mean.",
        ex: "We write treasure and picture, and peace or piece.",
        model: table("Sounds and endings", ["Ending", "Word"], [["sure", "treasure"], ["ture", "picture"]], "A table showing the ending sure in treasure and ture in picture."),
      },
      topics: {
        "the-sure-and-ture-endings": {
          title: "The sure and ture endings",
          learn: ["The zhuh sound at the end of a word is spelt sure.", "The chuh sound is usually spelt ture."],
          use: "You will spell words like treasure, measure, picture and adventure.",
          ex: "We write treasure, with sure, and picture, with ture.",
          model: table("Two endings", ["Ending", "Word"], [["sure", "treasure"], ["ture", "picture"]], "A table showing the ending sure in treasure and ture in picture."),
        },
        "tricky-sounds-y-and-ou": {
          title: "Tricky sounds: y and ou",
          learn: ["The i sound can be spelt y inside a word.", "The u sound can be spelt ou."],
          use: "Words like myth, gym, young and touch are all around us.",
          ex: "We write myth with a y, and young with ou.",
          model: table("Unusual spellings", ["Sound", "Spelling", "Word"], [["i", "y", "myth"], ["u", "ou", "young"]], "A table showing the i sound spelt y in myth and the u sound spelt ou in young."),
        },
        "homophones": {
          title: "Homophones",
          learn: ["Homophones sound the same but have different spellings and meanings.", "The sentence tells you which one to use."],
          use: "Picking the right word stops your reader getting confused.",
          ex: "We eat a piece of cake. We enjoy peace and quiet.",
          model: table("Same sound", ["Word", "Meaning"], [["piece", "a part of something"], ["peace", "quiet and calm"]], "A table showing piece means a part of something and peace means quiet and calm."),
        },
        "words-often-misspelt": {
          title: "Words often misspelt",
          learn: ["Some words trick lots of people.", "Find the tricky part and learn it."],
          use: "You will write words like because, woman, favourite and different in your work.",
          ex: "The tricky part of favourite is the our.",
          model: table("Tricky parts", ["Word", "Tricky part"], [["favourite", "our"], ["different", "ff and ent"], ["February", "the r after the b"]], "A table showing the tricky part of favourite is our, of different is ff and ent, and of February is the r after the b."),
        },
      },
    },
    "grammar---sentences": {
      intro: {
        title: "Grammar: sentences",
        learn: ["Join ideas with when, if, because and although.", "Show time and cause, use the present perfect and write speech."],
        use: "Strong sentences let you explain what happens, when and why.",
        ex: "I stayed in because it was raining.",
        model: sentence("A joining word", "I stayed in **because** it was raining.", "The sentence 'I stayed in because it was raining.' with the joining word because picked out."),
      },
      topics: {
        "conjunctions": {
          title: "Conjunctions",
          learn: ["A conjunction is a joining word.", "when, if, because and although each do a different job."],
          use: "Joining words let you say more in one sentence.",
          ex: "We played outside although it was cold.",
          model: sentence("A joining word", "We played outside **although** it was cold.", "The sentence 'We played outside although it was cold.' with the joining word although picked out."),
        },
        "time-and-cause-words": {
          title: "Time and cause words",
          learn: ["Some words tell us when: before, after, while, then.", "Some tell us why: because of, so, therefore."],
          use: "These words help you explain what happened and why.",
          ex: "After lunch, we went to the park.",
          model: table("When and why", ["Tells us", "Words"], [["When", "before, after, while, then"], ["Why", "because of, so, therefore"]], "A table showing before, after, while and then tell us when, and because of, so and therefore tell us why."),
        },
        "the-present-perfect": {
          title: "The present perfect",
          learn: ["Use has or have with a verb for something that has happened up to now.", "This is different from the simple past."],
          use: "You can say what you have done so far, like I have finished my book.",
          ex: "I have finished my book. I finished it yesterday.",
          model: table("Two ways", ["Form", "Example"], [["Present perfect", "I have finished."], ["Simple past", "I finished."]], "A table showing the present perfect I have finished and the simple past I finished."),
        },
        "inverted-commas": {
          title: "Inverted commas",
          learn: ["Inverted commas, or speech marks, go around the words someone says.", "Words like said Mo stay outside."],
          use: "You need them every time a character speaks in your writing.",
          ex: "“Come here,” said Mo.",
          model: sentence("Speech marks", "**“Come here,”** said Mo.", "The sentence '“Come here,” said Mo.' with the spoken words in speech marks picked out."),
        },
      },
    },
    "reading---non-fiction-and-poetry": {
      intro: {
        title: "Reading: non-fiction and poetry",
        learn: ["Find facts using contents pages and indexes.", "Ask questions about a text and spot different kinds of writing.", "Notice lively words and poetry forms."],
        use: "Books and poems help you learn and enjoy words.",
        ex: "A contents page tells you which page a chapter starts on.",
        model: pictures("Ways to read", [{ icon: "📑", label: "Contents" }, { icon: "❓", label: "Questions" }, { icon: "✉️", label: "Letters" }, { icon: "🎶", label: "Poems" }], "Four ways to read: contents, questions, letters and poems."),
      },
      topics: {
        "finding-information": {
          title: "Finding information",
          learn: ["A contents page lists chapters in page order.", "An index lists key words from A to Z."],
          use: "You can find a fact fast without reading the whole book.",
          ex: "Look up volcano in the index to find its page.",
          model: table("Book helpers", ["Part", "Where", "What it does"], [["Contents", "front", "chapters in page order"], ["Index", "back", "key words from A to Z"]], "A table showing the contents page is at the front and lists chapters in page order, and the index is at the back and lists key words from A to Z."),
        },
        "asking-questions-about-a-text": {
          title: "Asking questions about a text",
          learn: ["Question words like who, where, when and why ask for different answers.", "Check whether the text answers the question."],
          use: "Asking questions helps you understand and remember what you read.",
          ex: "Where wants a place. Why wants a reason.",
          model: table("Question words", ["Word", "Asks for"], [["Who", "a person"], ["Where", "a place"], ["When", "a time"], ["Why", "a reason"]], "A table showing who asks for a person, where for a place, when for a time and why for a reason."),
        },
        "kinds-of-writing": {
          title: "Kinds of writing",
          learn: ["A letter has a greeting. Instructions have numbered steps.", "A diary uses I, me and my."],
          use: "Knowing the kind of writing helps you know what to expect and why it was written.",
          ex: "Dear Sam, tells us we are reading a letter.",
          model: table("Clues", ["Kind", "Clue"], [["Letter", "a greeting like Dear Sam"], ["Instructions", "numbered steps"], ["Diary", "I, me and my"]], "A table showing a letter has a greeting, instructions have numbered steps and a diary uses I, me and my."),
        },
        "words-that-spark-the-imagination": {
          title: "Words that spark the imagination",
          learn: ["Some words paint a clear picture.", "Writers compare things to help you imagine them."],
          use: "Choosing lively words makes your own writing exciting.",
          ex: "The wind whispered is livelier than the wind went.",
          model: table("Plain and lively", ["Plain", "Lively"], [["went", "crept"], ["said", "whispered"]], "A table showing the plain word went and the lively word crept, and the plain word said and the lively word whispered."),
        },
        "poetry-forms": {
          title: "Poetry forms",
          learn: ["Some poems rhyme. Free verse does not have to.", "A narrative poem tells a story."],
          use: "Knowing different poems helps you enjoy and write them.",
          ex: "A poem about a fox's night adventure is a narrative poem.",
          model: table("Kinds of poem", ["Kind", "Clue"], [["Rhyming poem", "line endings rhyme"], ["Free verse", "no need to rhyme"], ["Narrative poem", "tells a story"]], "A table showing a rhyming poem has rhyming line endings, free verse need not rhyme and a narrative poem tells a story."),
        },
      },
    },
    "writing---composition": {
      intro: {
        title: "Writing: composition",
        learn: ["Group ideas into paragraphs and use headings.", "Plan settings, characters and plot.", "Proofread your work and write sentences from memory."],
        use: "Planning and checking make your writing clear and a pleasure to read.",
        ex: "One paragraph, one main idea.",
        model: steps("Plan, write, check", ["Plan the ideas in groups.", "Write each group as a paragraph.", "Read it again and fix mistakes."], "Three steps: plan the ideas in groups, write each group as a paragraph, then read it again and fix mistakes."),
      },
      topics: {
        "paragraphs": {
          title: "Paragraphs",
          learn: ["A paragraph groups sentences about one idea.", "Start a new paragraph when the idea changes."],
          use: "Paragraphs make a long text easy to read.",
          ex: "One paragraph about the beach, the next about the journey home.",
          model: table("Paragraphs", ["Paragraph", "Main idea"], [["1", "the beach"], ["2", "the journey home"]], "A table showing paragraph 1 is about the beach and paragraph 2 is about the journey home."),
        },
        "headings-and-sub-headings": {
          title: "Headings and sub-headings",
          learn: ["A heading is the title of a whole text.", "A sub-heading is a small title for one part."],
          use: "Headings help a reader find the part they need.",
          ex: "Heading: Owls. Sub-headings: What owls eat, Where owls live.",
          model: table("A text with headings", ["Level", "Title"], [["Heading", "Owls"], ["Sub-heading", "What owls eat"], ["Sub-heading", "Where owls live"]], "A table showing the heading Owls and two sub-headings, What owls eat and Where owls live."),
        },
        "settings-characters-and-plot": {
          title: "Settings, characters and plot",
          learn: ["The setting is where and when a story happens.", "The characters are who is in it. The plot is what happens."],
          use: "Planning these makes your own stories exciting and clear.",
          ex: "Setting: a dark cave. Character: a brave girl. Plot: she finds a lost puppy.",
          model: table("Story parts", ["Part", "Example"], [["Setting", "a dark cave"], ["Character", "a brave girl"], ["Plot", "she finds a lost puppy"]], "A table showing the setting is a dark cave, the character is a brave girl and the plot is that she finds a lost puppy."),
        },
        "proofreading": {
          title: "Proofreading",
          learn: ["Proofreading means checking for mistakes.", "Check spelling, capital letters, end marks and tense."],
          use: "Checking catches small slips before someone else reads your work.",
          ex: "we went to the park becomes We went to the park.",
          model: fix("Proofread", "we went to the park", "We went to the park.", "The words 'we went to the park' need a capital letter and a full stop."),
        },
        "dictation": {
          title: "Dictation",
          learn: ["Remember a whole sentence and write it down.", "Check the spelling, the capital letter and the end mark."],
          use: "Writing from memory builds spelling you can use in all your writing.",
          ex: "Hear: The children walked home. Then write it with a capital and a full stop.",
          model: steps("Writing from memory", ["Hear the whole sentence.", "Say it again in your head.", "Write it word by word.", "Check spelling and punctuation."], "Four steps: hear the sentence, say it in your head, write it word by word, then check it."),
        },
      },
    },
  },
});
