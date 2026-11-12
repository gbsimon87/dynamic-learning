// Year 2 English introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's lesson; these say why the skill matters.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const eq = (title, parts, alt) => ({ renderer: "lesson", alt, data: { type: "equation", title, parts } });
const table = (title, headers, rows, alt) => ({ renderer: "lesson", alt, data: { type: "table", title, headers, rows } });
const sentence = (title, text, alt) => ({ renderer: "lesson", alt, data: { type: "sentence", title, text } });
const fix = (title, wrong, right, alt) => ({ renderer: "lesson", alt, data: { type: "fix", title, wrong, right } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const pictures = (title, items, alt) => ({ renderer: "pictures", alt, data: { title, items } });

export default defineIntroductions({
  year: 2, subject: "english",
  subjectIntro: {
    title: "Welcome to Year 2 English",
    learn: ["Read and spell longer words.", "Write richer sentences with the right punctuation.", "Enjoy stories, poems and information books, and plan your own writing."],
    use: "English helps you read for fun and facts, write letters and stories, and share what you think.",
    ex: "yes, ter and day join to make yesterday.",
    model: eq("Longer words", ["yes", "+", "ter", "+", "day", "=", "yesterday"], "The parts yes, ter and day join to make the word yesterday."),
  },
  quests: {
    "spelling---sounds-and-endings": {
      intro: {
        title: "Spelling: sounds and endings",
        learn: ["Spell ge and dge, soft c and silent letters.", "Learn common endings like le, el, al, il, y and ey.", "Meet words that break the usual patterns."],
        use: "Careful spelling helps readers follow your notes, stories and messages.",
        ex: "We write bridge, city, knock, apple and monkey.",
        model: table("Spelling patterns", ["Pattern", "Word"], [["dge", "bridge"], ["kn", "knock"], ["le", "apple"], ["ey", "monkey"]], "A table showing dge in bridge, kn in knock, le in apple and ey in monkey."),
      },
      topics: {
        "the-ge-and-dge-spellings": {
          title: "ge and dge spellings",
          learn: ["The j sound at the end of a word is spelt dge or ge, never j.", "dge comes straight after a short vowel, as in badge."],
          use: "You will use these endings in words like bridge, page and huge.",
          ex: "We write badge, but page.",
          model: table("Two endings", ["Ending", "Word"], [["dge", "badge"], ["ge", "page"]], "A table showing the ending dge in badge and the ending ge in page."),
        },
        "soft-c-and-silent-letters": {
          title: "Soft c and silent letters",
          learn: ["The letter c can make an s sound before e, i or y.", "Some words begin with a silent k, g or w: knock, gnat, write."],
          use: "Spotting these patterns helps you spell city, knee and write.",
          ex: "city starts with a soft c. knock starts with a silent k.",
          model: table("Tricky starts", ["Letters", "Word"], [["c (s sound)", "city"], ["kn", "knock"], ["wr", "write"]], "A table showing a soft c in city, kn in knock and wr in write."),
        },
        "the-le-el-al-and-il-endings": {
          title: "le, el, al and il endings",
          learn: ["Words can end in le, el, al or il for the same sound.", "Learn which ending goes with each word."],
          use: "You will write words like table, camel, metal and pencil.",
          ex: "We write table, camel, metal and pencil.",
          model: table("Four endings", ["Ending", "Word"], [["le", "table"], ["el", "camel"], ["al", "metal"], ["il", "pencil"]], "A table showing le in table, el in camel, al in metal and il in pencil."),
        },
        "the-y-and-ey-endings": {
          title: "y and ey endings",
          learn: ["The word ending y can say eye, as in fly.", "ey can say ee, as in key and monkey.", "Add s to make an ey word plural."],
          use: "These endings help you spell animals and everyday words.",
          ex: "One monkey, two monkeys.",
          model: table("Endings", ["Ending", "Word"], [["y", "fly"], ["ey", "monkey"]], "A table showing the ending y in fly and the ending ey in monkey."),
        },
        "other-ways-to-spell-sounds": {
          title: "Other ways to spell sounds",
          learn: ["Some sounds have unusual spellings, such as a in ball and tion in station.", "Each is a pattern to learn word by word."],
          use: "You will meet these spellings in words you use all the time.",
          ex: "We write ball, mother, watch, work, treasure and station.",
          model: table("Unusual spellings", ["Word", "Tricky part"], [["ball", "a before ll"], ["mother", "o sounds like u"], ["watch", "a after w"], ["station", "tion"]], "A table with the words ball, mother, watch and station and their tricky parts."),
        },
      },
    },
    "reading---words": {
      intro: {
        title: "Reading: words",
        learn: ["Read longer words by splitting them into beats.", "Read words with endings like ful, less and ly.", "Read common tricky words."],
        use: "Breaking a long word into parts helps you read new words on your own.",
        ex: "yes, ter and day make yesterday.",
        model: eq("Read in parts", ["yes", "+", "ter", "+", "day", "=", "yesterday"], "The parts yes, ter and day join to make yesterday."),
      },
      topics: {
        "reading-longer-words": {
          title: "Reading longer words",
          learn: ["Split a long word into syllables, or beats.", "Read each part, then blend them."],
          use: "Longer words are easier when you take them one part at a time.",
          ex: "el, e and phant make elephant.",
          model: eq("Read in parts", ["el", "+", "e", "+", "phant", "=", "elephant"], "The parts el, e and phant join to make elephant."),
        },
        "reading-words-with-suffixes": {
          title: "Reading words with suffixes",
          learn: ["A suffix is a word ending that changes the meaning.", "ful means full of, less means without, ly tells how."],
          use: "Knowing endings helps you work out new words, like careful or quickly.",
          ex: "care + ful = careful, which means full of care.",
          model: eq("A suffix at the end", ["care", "+", "ful", "=", "careful"], "The word care plus the ending ful makes careful."),
        },
        "common-exception-words": {
          title: "Common exception words",
          learn: ["Some everyday words do not follow the usual rules.", "Spot the tricky part, then remember it."],
          use: "Words like because, people and children turn up in almost every story.",
          ex: "The tricky part of people is eo in the middle.",
          model: sentence("Tricky words", "The **children** came because it was **cold**.", "The sentence 'The children came because it was cold' with the tricky words children and cold picked out."),
        },
      },
    },
    "grammar---words": {
      intro: {
        title: "Grammar: words",
        learn: ["Build compound words and nouns.", "Use adjectives and adverbs to describe."],
        use: "Choosing good describing words makes your writing clear and fun to read.",
        ex: "The small dog barked loudly.",
        model: sentence("Describing words", "The **small** dog barked **loudly**.", "The sentence 'The small dog barked loudly' with the describing words small and loudly picked out."),
      },
      topics: {
        "compound-words-and-nouns": {
          title: "Compound words and nouns",
          learn: ["A noun is a naming word for a person, place or thing.", "Two words can join to make a compound noun.", "Add ness or er to make new nouns."],
          use: "Knowing how nouns are made helps you spell and use them.",
          ex: "sun and shine make sunshine. kind and ness make kindness.",
          model: eq("Join to make a noun", ["sun", "+", "shine", "=", "sunshine"], "The words sun and shine join to make the noun sunshine."),
        },
        "adjectives-and-adverbs": {
          title: "Adjectives and adverbs",
          learn: ["An adjective describes a noun.", "An adverb tells how something is done.", "Add er, est and ly to change a word."],
          use: "Adjectives and adverbs help the reader picture what happens.",
          ex: "The small dog barked loudly.",
          model: sentence("Describing words", "The **small** dog barked **loudly**.", "The sentence 'The small dog barked loudly' with the adjective small and the adverb loudly picked out."),
        },
      },
    },
    "reading---stories": {
      intro: {
        title: "Reading: stories",
        learn: ["Put events in order.", "Work out how characters feel from what they say and do.", "Predict what comes next and work out new words."],
        use: "Thinking carefully about a story helps you enjoy it and remember it.",
        ex: "If Ravi kicks the grass, he is probably upset.",
        model: pictures("Story skills", [{ icon: "🔢", label: "Order" }, { icon: "🧒", label: "Characters" }, { icon: "🔮", label: "Predict" }, { icon: "📖", label: "Words" }], "Four story skills: order, characters, predict and words."),
      },
      topics: {
        "sequencing-events": {
          title: "Sequencing events",
          learn: ["Stories have events in an order.", "Words like first, next, then and after show the order."],
          use: "Putting events in order helps you retell a story or explain what happened.",
          ex: "A seed is planted, then watered, then it grows.",
          model: steps("In order", ["First, Zara planted a seed.", "Next, she watered it.", "Then, a shoot popped out."], "Three events in order: Zara planted a seed, she watered it, then a shoot popped out."),
        },
        "understanding-characters": {
          title: "Understanding characters",
          learn: ["What characters say and do shows how they feel.", "Find the clue in the story to back up your idea."],
          use: "Understanding feelings helps you be kind and understand friends.",
          ex: "Ravi kicked the grass. That is a clue that he is upset.",
          model: sentence("A clue", "Ravi **kicked the grass** and would not look at anyone.", "The sentence 'Ravi kicked the grass and would not look at anyone' with the clue kicked the grass picked out."),
        },
        "predicting-from-a-story": {
          title: "Predicting from a story",
          learn: ["Use clues in the story to guess what happens next.", "Say what is most likely, not what is certain."],
          use: "Predicting keeps you thinking and checking as you read.",
          ex: "Mum filled the bath. Ella will probably get in.",
          model: sentence("Use the clues", "Mum filled the bath, so Ella will **probably** get in.", "The sentence 'Mum filled the bath, so Ella will probably get in' with the word probably picked out."),
        },
        "fairy-stories-and-traditional-tales": {
          title: "Fairy stories and traditional tales",
          learn: ["Fairy stories and traditional tales are old stories.", "Many have heroes, villains and a happy ending."],
          use: "Knowing the tales helps you understand other books, films and plays.",
          ex: "In Little Red Riding Hood, a wolf tricks a girl in a wood.",
          model: pictures("Tale features", [{ icon: "🌲", label: "Wood" }, { icon: "🐺", label: "Wolf" }, { icon: "👧", label: "Girl" }], "Three features of a tale: a wood, a wolf and a girl."),
        },
        "word-meanings-in-stories": {
          title: "Word meanings in stories",
          learn: ["Use the words around a new word to work out its meaning.", "Check that your idea makes sense in the sentence."],
          use: "You can work out new words without a dictionary.",
          ex: "The boy was famished. He ate three sandwiches. Famished means very hungry.",
          model: sentence("Look for clues", "The boy was **famished**. He ate three sandwiches.", "The sentences 'The boy was famished. He ate three sandwiches.' with the new word famished picked out."),
        },
      },
    },
    "spelling---suffixes": {
      intro: {
        title: "Spelling: suffixes",
        learn: ["Change the end of a word: y to ies, drop an e, double a letter.", "Add suffixes like ment, ness, ful, less and ly."],
        use: "Word endings let you say more, like happy, happier and happiest.",
        ex: "happy becomes happiest. hope becomes hoping.",
        model: table("Endings change words", ["Word", "New word"], [["happy", "happiest"], ["hope", "hoping"], ["pat", "patted"]], "A table showing happy becomes happiest, hope becomes hoping and pat becomes patted."),
      },
      topics: {
        "changing-y-to-ies": {
          title: "Changing y to ies",
          learn: ["If a word ends in a consonant and y, change the y to i and add es.", "If the letter before y is a vowel, just add s."],
          use: "You need this to write more than one baby, fly or copy.",
          ex: "One baby, two babies. One toy, two toys.",
          model: table("Plurals", ["One", "More than one"], [["baby", "babies"], ["toy", "toys"]], "A table showing baby becomes babies and toy becomes toys."),
        },
        "suffixes-after-y": {
          title: "Suffixes after y",
          learn: ["Change y to i before ed, er and est.", "Keep the y before ing."],
          use: "You will use these endings in words like happier, cried and crying.",
          ex: "happy, happier, happiest. cry, cried, crying.",
          model: table("After a y", ["Word", "Ending", "New word"], [["happy", "er", "happier"], ["cry", "ed", "cried"], ["cry", "ing", "crying"]], "A table showing happy plus er is happier, cry plus ed is cried and cry plus ing is crying."),
        },
        "dropping-e-before-a-suffix": {
          title: "Dropping e before a suffix",
          learn: ["If a word ends in e, drop the e before ing, ed, er, est or y.", "Being is an exception."],
          use: "You will write words like hiking, nicer and shiny.",
          ex: "hike becomes hiking.",
          model: eq("Drop the e", ["hike", "+", "ing", "=", "hiking"], "The word hike plus the ending ing makes hiking, with the e dropped."),
        },
        "doubling-the-last-letter": {
          title: "Doubling the last letter",
          learn: ["In a short word with one short vowel, double the last letter before ing, ed, er or est.", "The letter x is never doubled."],
          use: "Doubling keeps the vowel short in words like patted and runner.",
          ex: "pat becomes patted. box becomes boxer.",
          model: table("Doubling", ["Word", "New word"], [["pat", "patted"], ["run", "runner"], ["box", "boxer"]], "A table showing pat becomes patted, run becomes runner and box becomes boxer with no doubled x."),
        },
        "the-suffixes-ment-ness-ful-less-and-ly": {
          title: "ment, ness, ful, less and ly",
          learn: ["These endings go straight on to most words.", "If the word ends in y after a consonant, change y to i first, as in happiness."],
          use: "These endings help you write words like enjoyment, sadness, careful, hopeless and badly.",
          ex: "enjoy + ment = enjoyment. happy + ness = happiness.",
          model: table("Suffixes", ["Word", "Ending", "New word"], [["enjoy", "ment", "enjoyment"], ["sad", "ness", "sadness"], ["care", "ful", "careful"]], "A table showing enjoy plus ment is enjoyment, sad plus ness is sadness and care plus ful is careful."),
        },
      },
    },
    "grammar---sentences-and-punctuation": {
      intro: {
        title: "Grammar: sentences and punctuation",
        learn: ["Tell statements, questions, exclamations and commands apart.", "Build longer sentences with describing words and joining words.", "Use capital letters, end marks and commas in lists."],
        use: "Clear sentences make your meaning easy to follow.",
        ex: "I packed a hat, a scarf and gloves.",
        model: sentence("A list with commas", "I packed a hat**,** a scarf and gloves.", "The sentence 'I packed a hat, a scarf and gloves.' with the comma picked out."),
      },
      topics: {
        "statements-questions-exclamations-and-commands": {
          title: "Four kinds of sentence",
          learn: ["A statement tells us something. A question asks.", "A command tells someone what to do.", "An exclamation starts with what or how."],
          use: "Choosing the right kind of sentence makes your meaning clear.",
          ex: "Shut the door. Is the door shut? What a big door!",
          model: table("Kinds of sentence", ["Kind", "Example"], [["Statement", "The door is shut."], ["Question", "Is the door shut?"], ["Command", "Shut the door."], ["Exclamation", "What a big door!"]], "A table of four kinds of sentence with an example of each."),
        },
        "expanded-noun-phrases": {
          title: "Expanded noun phrases",
          learn: ["A noun phrase is a noun with describing words.", "Describing words go before the noun."],
          use: "Longer noun phrases help the reader picture exactly what you mean.",
          ex: "the tall green tree.",
          model: eq("Add describing words", ["the", "+", "tall", "+", "green", "+", "tree", "=", "the tall green tree"], "The words the, tall, green and tree make the noun phrase the tall green tree."),
        },
        "joining-sentences": {
          title: "Joining sentences",
          learn: ["Use and, or and but to join sentences.", "Use when, if, that and because to add a reason or a time."],
          use: "Joining words let you say more in one sentence.",
          ex: "I took my coat because it was cold.",
          model: sentence("A joining word", "I took my coat **because** it was cold.", "The sentence 'I took my coat because it was cold' with the joining word because picked out."),
        },
        "present-and-past-tense": {
          title: "Present and past tense",
          learn: ["Present tense says what happens now.", "Past tense says what already happened."],
          use: "Using the right tense tells the reader when something happens.",
          ex: "Mum bakes a cake now. Mum baked a cake yesterday.",
          model: table("Now and before", ["Present", "Past"], [["bake", "baked"], ["jump", "jumped"], ["run", "ran"]], "A table showing present and past forms: bake and baked, jump and jumped, run and ran."),
        },
        "actions-in-progress": {
          title: "Actions in progress",
          learn: ["Use is and ing for an action happening now.", "Use was and ing for an action that was happening in the past."],
          use: "This lets you say what was going on, like Dad was cooking when I came in.",
          ex: "Dad is cooking now. Dad was cooking last night.",
          model: table("In progress", ["When", "Example"], [["Now", "Dad is cooking."], ["Before", "Dad was cooking."]], "A table showing Dad is cooking for now and Dad was cooking for before."),
        },
        "capital-letters-and-end-marks": {
          title: "Capital letters and end marks",
          learn: ["Start a sentence with a capital letter.", "End with a full stop, question mark or exclamation mark."],
          use: "Capitals and end marks show readers where each sentence starts and stops.",
          ex: "Where do you live? I live in Leeds.",
          model: fix("Fix the sentence", "where do you live", "Where do you live?", "The words 'where do you live' need a capital letter and a question mark."),
        },
        "commas-in-lists": {
          title: "Commas in lists",
          learn: ["Use commas to separate items in a list.", "Do not put a comma before and."],
          use: "Commas keep the items in a list clear, like what to pack for a trip.",
          ex: "I packed a hat, a scarf and gloves.",
          model: sentence("A list with commas", "I packed a hat**,** a scarf and gloves.", "The sentence 'I packed a hat, a scarf and gloves.' with the comma picked out."),
        },
      },
    },
    "spelling---apostrophes-and-homophones": {
      intro: {
        title: "Spelling: apostrophes and homophones",
        learn: ["Use apostrophes for short forms and for belonging.", "Choose the right word when two words sound the same."],
        use: "Small marks and careful word choices change the meaning of what you write.",
        ex: "Their, there or they're? Each means something different.",
        model: table("Same sound, different word", ["Word", "Meaning"], [["their", "belonging to them"], ["there", "in that place"], ["they're", "they are"]], "A table showing their means belonging to them, there means in that place and they're means they are."),
      },
      topics: {
        contractions: {
          title: "Short forms (contractions)",
          learn: ["A short form joins two words into one.", "The apostrophe goes where letters are left out."],
          use: "Short forms like can't and didn't make writing sound like talking.",
          ex: "did not becomes didn't. The apostrophe replaces the o.",
          model: eq("Join and shorten", ["did not", "=", "didn't"], "The two words did not make the short form didn't, with the apostrophe in place of the o."),
        },
        "apostrophes-for-ownership": {
          title: "Apostrophes for ownership",
          learn: ["Add an apostrophe and s to show something belongs to one person or thing.", "The apostrophe goes after the owner's name."],
          use: "It shows who things belong to: Megan's bag, the dog's bone.",
          ex: "The hat belongs to Megan, so we write Megan's hat.",
          model: eq("Who owns it?", ["Megan", "+", "'s", "+", "hat", "=", "Megan's hat"], "Megan plus apostrophe s plus hat makes Megan's hat."),
        },
        "homophones-and-near-homophones": {
          title: "Homophones and near homophones",
          learn: ["Homophones sound the same but are spelt differently.", "The sentence tells you which spelling to use."],
          use: "Choosing the right one stops your reader getting confused.",
          ex: "I can hear the birds. I am over here.",
          model: table("Sound the same", ["Word", "Meaning"], [["hear", "listen"], ["here", "in this place"]], "A table showing hear means listen and here means in this place."),
        },
      },
    },
    "reading---information-and-poetry": {
      intro: {
        title: "Reading: information and poetry",
        learn: ["Find facts in information texts.", "Enjoy poems and repeated phrases.", "Ask questions and share your views about books."],
        use: "Information books teach us things and poems let us enjoy words.",
        ex: "A heading tells you what a part of a text is about.",
        model: pictures("Ways to read", [{ icon: "📰", label: "Facts" }, { icon: "🎶", label: "Poems" }, { icon: "💬", label: "Questions" }], "Three ways to read: facts, poems and questions."),
      },
      topics: {
        "finding-facts-in-non-fiction": {
          title: "Finding facts",
          learn: ["Information texts give true facts about a topic.", "Headings and steps help you find what you need."],
          use: "You can look up facts for a project or follow instructions to make something.",
          ex: "A heading called Owls tells you the text is about owls.",
          model: table("Parts of a text", ["Part", "What it does"], [["Heading", "Says what the text is about"], ["Fact", "Gives true information"]], "A table showing a heading says what the text is about and a fact gives true information."),
        },
        "poems-and-repeated-phrases": {
          title: "Poems and repeated phrases",
          learn: ["Poems often repeat words and use rhyme.", "Repeating a phrase can add rhythm or stress an idea."],
          use: "Noticing patterns helps you enjoy and remember poems.",
          ex: "Whoosh, goes the wind through the trees.",
          model: sentence("A repeated word", "**Whoosh,** goes the wind through the trees.", "The line 'Whoosh, goes the wind through the trees.' with the repeated word Whoosh picked out."),
        },
        "asking-questions-and-discussing-books": {
          title: "Asking questions about books",
          learn: ["Good questions help you understand a book.", "Give your view and a reason from the text, and take turns."],
          use: "Talking about books with friends helps you learn from each other.",
          ex: "Why did the fox try to catch the moon?",
          model: sentence("A good question", "**Why** did the fox try to catch the moon?", "The question 'Why did the fox try to catch the moon?' with the question word Why picked out."),
        },
      },
    },
    "writing---planning-and-checking": {
      intro: {
        title: "Writing: planning and checking",
        learn: ["Plan a story or true account before you write.", "Write for different purposes and build poems.", "Check your work and fix mistakes."],
        use: "Planning and checking help your writing be clear and easy to read.",
        ex: "Beginning, middle, end.",
        model: steps("Plan then check", ["Plan: beginning, middle, end.", "Write each sentence.", "Read it again and fix mistakes."], "Three steps: plan the beginning, middle and end, write each sentence, then read it again and fix mistakes."),
      },
      topics: {
        "planning-and-building-stories": {
          title: "Planning and building stories",
          learn: ["Plan a beginning, a middle and an end.", "Write your story one sentence at a time."],
          use: "A plan stops your story from getting muddled.",
          ex: "Beginning: Ana found a map. Middle: she followed it. End: she found a box.",
          model: steps("A story plan", ["Beginning: Ana found a map.", "Middle: She followed it to a tree.", "End: She found a box of shells."], "A plan: Ana finds a map, follows it to a tree and finds a box of shells."),
        },
        "writing-about-real-events": {
          title: "Writing about real events",
          learn: ["Write about things that really happened.", "Keep to the facts and use time words like first, next and then."],
          use: "You can tell family about a trip or write up a school visit.",
          ex: "First, we got on the bus. Next, we saw the cows.",
          model: steps("A true account", ["First, we got on the bus.", "Next, we saw the cows.", "Last, we went back to school."], "A true account in order: we got on the bus, saw the cows, then went back to school."),
        },
        "writing-for-different-purposes": {
          title: "Writing for different purposes",
          learn: ["We write to tell, ask, instruct or entertain.", "The purpose decides the kind of sentences you use."],
          use: "A recipe uses commands, a letter says Dear, and a story entertains.",
          ex: "Spread the butter on the toast is a command for instructions.",
          model: table("Purpose and writing", ["Purpose", "Example"], [["Instruct", "Spread the butter on the toast."], ["Ask", "How many legs has a spider?"], ["Tell", "A spider has eight legs."]], "A table showing a command for instructions, a question to ask and a statement to tell."),
        },
        "building-poems": {
          title: "Building poems",
          learn: ["Rhyming words end with the same sound.", "Choose words that fit the pattern and make sense."],
          use: "Rhyme makes a poem fun to say and easy to remember.",
          ex: "The cat sat on the mat / and wore a funny hat.",
          model: table("Rhyming lines", ["Line", "Last word"], [["The cat sat on the mat", "mat"], ["and wore a funny hat", "hat"]], "A table showing two lines of a poem ending in the rhyming words mat and hat."),
        },
        "checking-and-improving-writing": {
          title: "Checking and improving writing",
          learn: ["Read your writing again.", "Check the tense, the spelling and the punctuation."],
          use: "Checking catches small slips before someone else reads your work.",
          ex: "We goed to the shop becomes We went to the shop.",
          model: fix("Check and fix", "We goed to the shop.", "We went to the shop.", "The sentence 'We goed to the shop.' is fixed to 'We went to the shop.'"),
        },
        dictation: {
          title: "Writing from memory",
          learn: ["Keep a whole sentence in your head and write it down.", "Check spelling, capital letters and punctuation."],
          use: "Writing from memory builds spelling you can use in any writing.",
          ex: "Hear: We can't find our coats. Then write it with the apostrophe.",
          model: steps("Writing from memory", ["Hear the whole sentence.", "Say it again in your head.", "Write one word at a time.", "Check spelling and punctuation."], "Four steps: hear the sentence, say it in your head, write it word by word, then check it."),
        },
      },
    },
  },
});
