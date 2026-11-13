// Year 1 English introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's lesson; these say why the skill matters.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const eq = (title, parts, alt) => ({ renderer: "lesson", alt, data: { type: "equation", title, parts } });
const table = (title, headers, rows, alt) => ({ renderer: "lesson", alt, data: { type: "table", title, headers, rows } });
const sentence = (title, text, alt) => ({ renderer: "lesson", alt, data: { type: "sentence", title, text } });
const fix = (title, wrong, right, alt) => ({ renderer: "lesson", alt, data: { type: "fix", title, wrong, right } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const pictures = (title, items, alt) => ({ renderer: "pictures", alt, data: { title, items } });

export default defineIntroductions({
  year: 1, subject: "english",
  subjectIntro: {
    title: "Welcome to Year 1 English",
    learn: ["Match letters to sounds and read new words.", "Spell words and build clear sentences.", "Enjoy stories, poems and true facts."],
    use: "English helps you read signs and books, write your name and share your own stories.",
    ex: "The sounds c, a and t blend together to read cat.",
    model: eq("Blending sounds", ["c", "+", "a", "+", "t", "=", "cat"], "The sounds c, a and t blend together to make the word cat."),
  },
  quests: {
    "spelling---letters-and-sounds": {
      intro: {
        title: "Spelling: letters and sounds",
        learn: ["Know the letters of the alphabet in order.", "Spell sounds with double letters, ck, nk, tch, ve, y, ph and wh."],
        use: "Careful spelling helps other people read what you write, like a note or a birthday card.",
        ex: "The ck in duck and the tch in catch come straight after a short vowel sound.",
        model: table("Spelling patterns", ["Letters", "Word"], [["ck", "duck"], ["tch", "catch"], ["ff", "puff"]], "A table showing the spelling pattern ck in duck, tch in catch and ff in puff."),
      },
      topics: {
        "the-alphabet": {
          title: "The alphabet",
          learn: ["The alphabet has 26 letters in a fixed order.", "Letter names help you tell spellings of the same sound apart."],
          use: "Knowing the order helps you find a name in a list or a word in a book.",
          ex: "After c comes d, then e.",
          model: { renderer: "lesson", alt: "A run of letters in order: a, b, c, d, e, f.", data: { type: "jumps", title: "The alphabet in order", terms: ["a", "b", "c", "d", "e", "f"] } },
        },
        "double-letters-and-ck": {
          title: "Double letters and ck",
          learn: ["After a short vowel, the sounds f, l, s and z are often spelt ff, ll, ss and zz.", "The k sound is often spelt ck."],
          use: "Spot these patterns to spell words like kiss, bell and back when you write.",
          ex: "We write puff, bell, miss, buzz and duck.",
          model: table("Short vowel, double letter", ["Sound", "Spelling", "Word"], [["f", "ff", "puff"], ["l", "ll", "bell"], ["s", "ss", "miss"], ["z", "zz", "buzz"], ["k", "ck", "duck"]], "A table of five sounds, their spellings ff, ll, ss, zz and ck, and an example word for each."),
        },
        "the-sounds-nk-and-tch": {
          title: "The sounds nk and tch",
          learn: ["The sound at the end of bank is spelt nk.", "The sound at the end of catch is spelt tch."],
          use: "These spellings turn up in everyday words like think, thank and kitchen.",
          ex: "We write bank and catch.",
          model: table("Two endings", ["Letters", "Word"], [["nk", "bank"], ["tch", "catch"]], "A table showing nk in bank and tch in catch."),
        },
        "words-ending-in-ve-and-y": {
          title: "Words ending in ve and y",
          learn: ["English words hardly ever end in v, so we add e: have, live, give.", "Many words end in y, like happy and funny."],
          use: "You need these endings for everyday words like have and very.",
          ex: "We write have, give, happy and funny.",
          model: table("Word endings", ["Ending", "Words"], [["ve", "have, give, live"], ["y", "happy, funny, very"]], "A table showing the ending ve in have, give and live, and the ending y in happy, funny and very."),
        },
        "the-spellings-ph-wh-and-k": {
          title: "The spellings ph, wh and k",
          learn: ["The f sound can be spelt ph, as in dolphin.", "Question words and wheel start with wh.", "K is used in kit and skin."],
          use: "These patterns help you spell animal names and question words.",
          ex: "We write dolphin, wheel and kit.",
          model: table("Three spellings", ["Letters", "Word"], [["ph", "dolphin"], ["wh", "wheel"], ["k", "kit"]], "A table showing ph in dolphin, wh in wheel and k in kit."),
        },
      },
    },
    "reading---phonics": {
      intro: {
        title: "Reading: phonics",
        learn: ["Blend sounds to read new words.", "Read tricky words, longer words and short forms like I'm."],
        use: "Phonics lets you read a word you have never seen before, on a sign, a menu or in a book.",
        ex: "f, r, o and g blend to make frog.",
        model: eq("Blend the sounds", ["f", "+", "r", "+", "o", "+", "g", "=", "frog"], "The sounds f, r, o and g blend to make the word frog."),
      },
      topics: {
        "blending-sounds": {
          title: "Blending sounds",
          learn: ["Say each sound, then push them together to read the word.", "Words can start with two sounds, like sn in snap."],
          use: "Blending is how you read a brand new word all by yourself.",
          ex: "s, n, a and p blend to make snap.",
          model: eq("Blend the sounds", ["s", "+", "n", "+", "a", "+", "p", "=", "snap"], "The sounds s, n, a and p blend to make the word snap."),
        },
        "same-letters-different-sounds": {
          title: "Same letters, different sounds",
          learn: ["The same letters can make different sounds in different words.", "Check which sound makes sense in the word."],
          use: "This helps you read words like snow and now, which look alike but sound different.",
          ex: "ow is in both cow and snow, but they sound different.",
          model: table("Same letters", ["Word", "Rhymes with"], [["cow", "now"], ["snow", "go"]], "A table showing that cow rhymes with now and snow rhymes with go, even though both have the letters ow."),
        },
        "tricky-words": {
          title: "Tricky words",
          learn: ["Some common words do not follow the usual sound rules.", "Learn to spot the tricky part of the word."],
          use: "Words like said, was and friend turn up all the time in stories.",
          ex: "In said, the ai makes an e sound.",
          model: sentence("A tricky word", "I **said** hello to my friend.", "The sentence 'I said hello to my friend' with the tricky word said picked out."),
        },
        "longer-words": {
          title: "Longer words",
          learn: ["Split a long word into beats called syllables.", "Read each beat, then say the whole word."],
          use: "Longer words are easier to read when you take them one beat at a time.",
          ex: "rabbit is rab and bit.",
          model: eq("Two beats", ["rab", "+", "bit", "=", "rabbit"], "The two beats rab and bit make the word rabbit."),
        },
        contractions: {
          title: "Short forms (contractions)",
          learn: ["A short form joins two words into one.", "The apostrophe stands in for letters that are left out."],
          use: "People say and write short forms all the time, like I'm and we'll.",
          ex: "I am becomes I'm. The apostrophe takes the place of the a.",
          model: eq("Two words, one short form", ["I am", "=", "I'm"], "The two words I am are joined into the short form I'm."),
        },
      },
    },
    "grammar---words": {
      intro: {
        title: "Grammar: words",
        learn: ["Make plurals and change word endings.", "Use un- to mean not, and join two words to make a new one."],
        use: "Changing a word a little lets you say more: one cat, two cats, unhappy, football.",
        ex: "One wish, two wishes.",
        model: table("One and many", ["One", "More than one"], [["dog", "dogs"], ["wish", "wishes"]], "A table showing dog becomes dogs and wish becomes wishes."),
      },
      topics: {
        "singular-and-plural": {
          title: "One or more than one",
          learn: ["Add s to most words to mean more than one.", "Add es when the word has an extra beat, like wishes."],
          use: "You need plurals to say how many: two dogs, three boxes.",
          ex: "One dog, two dogs. One wish, two wishes.",
          model: table("One and many", ["One", "More than one"], [["dog", "dogs"], ["wish", "wishes"]], "A table showing dog becomes dogs and wish becomes wishes."),
        },
        "adding-ing-ed-and-er": {
          title: "Adding ing, ed and er",
          learn: ["Add ing for what is happening now.", "Add ed for what happened before.", "Add er for a person who does it."],
          use: "Word endings tell the reader when something happens and who does it.",
          ex: "jump, jumping, jumped.",
          model: table("A word and its endings", ["Word", "+ ing", "+ ed", "+ er"], [["jump", "jumping", "jumped", "jumper"]], "A table showing jump with the endings ing, ed and er."),
        },
        "adding-er-and-est": {
          title: "Adding er and est",
          learn: ["Add er to compare two things.", "Add est to say which is the most."],
          use: "Comparing helps you say who is quicker or what is the tallest.",
          ex: "quick, quicker, quickest.",
          model: table("Comparing", ["Word", "+ er", "+ est"], [["quick", "quicker", "quickest"]], "A table showing quick, quicker and quickest."),
        },
        "the-prefix-un": {
          title: "The prefix un",
          learn: ["Put un at the front of a word to mean not or the opposite.", "The spelling of the main word stays the same."],
          use: "One small word part lets you say how you feel or undo something.",
          ex: "happy becomes unhappy.",
          model: eq("A word part at the front", ["un", "+", "happy", "=", "unhappy"], "The word part un added to happy makes unhappy."),
        },
        "compound-words": {
          title: "Compound words",
          learn: ["Two small words can join to make one new word.", "Each part keeps its own spelling."],
          use: "Compound words are everywhere, like football, bedroom and playground.",
          ex: "foot and ball make football.",
          model: eq("Two words join", ["foot", "+", "ball", "=", "football"], "The words foot and ball join to make football."),
        },
      },
    },
    "reading---stories": {
      intro: {
        title: "Reading: stories",
        learn: ["Get to know traditional tales.", "Talk about titles, events and characters.", "Use clues to guess what happens next."],
        use: "Thinking about a story helps you enjoy it more and understand what people feel.",
        ex: "A story about a lost mitten tells you what happens when something goes missing.",
        model: pictures("Story clues", [{ icon: "📖", label: "Title" }, { icon: "🧒", label: "Characters" }, { icon: "🔮", label: "What next?" }], "Three story clues: the title, the characters and guessing what happens next."),
      },
      topics: {
        "traditional-tales": {
          title: "Traditional tales",
          learn: ["Traditional tales are old stories passed down for many years.", "They often have a hero, a problem and a repeated pattern."],
          use: "Many books, films and songs are based on tales like these.",
          ex: "In a tale about three pigs, a wolf huffs and puffs.",
          model: pictures("A tale you may know", [{ icon: "🐷", label: "Three pigs" }, { icon: "🏠", label: "Three houses" }, { icon: "🐺", label: "A wolf" }], "Three pictures from a traditional tale: three pigs, three houses and a wolf."),
        },
        "titles-and-events": {
          title: "Titles and events",
          learn: ["A title tells you what a story is about.", "Events are the things that happen, one after another."],
          use: "A good title helps you choose a book, and remembering events helps you tell it again.",
          ex: "The Lost Mitten is a story about a mitten that goes missing.",
          model: pictures("The Lost Mitten", [{ icon: "🧤", label: "Lost" }, { icon: "🔍", label: "Search" }, { icon: "🎉", label: "Found" }], "Three pictures for the story called The Lost Mitten: lost, search and found."),
        },
        "thinking-about-characters": {
          title: "Thinking about characters",
          learn: ["What a character says and does shows how they feel.", "Think about a time you felt the same."],
          use: "Understanding feelings helps you be kind to friends.",
          ex: "If Tom frowns and sits alone, he may feel sad.",
          model: sentence("A clue about feelings", "Tom **frowned** and sat alone.", "The sentence 'Tom frowned and sat alone' with the clue word frowned picked out."),
        },
        "what-happens-next": {
          title: "What happens next?",
          learn: ["Use clues from the story to guess what comes next.", "A good guess fits what you already read."],
          use: "Guessing what comes next keeps you thinking while you read.",
          ex: "Dark clouds and strong wind: it may rain next.",
          model: sentence("Use the clues", "The sky is dark and the wind blows. It may **rain** next.", "The sentence 'The sky is dark and the wind blows. It may rain next.' with the guess rain picked out."),
        },
      },
    },
    "spelling---vowel-sounds": {
      intro: {
        title: "Spelling: vowel sounds",
        learn: ["Learn the different ways to spell vowel sounds.", "Choose the right spelling for the word."],
        use: "The same sound can be spelt in many ways, so knowing them helps you write clearly.",
        ex: "The ay in day and the ai in rain make the same sound.",
        model: table("Same sound, different spelling", ["Letters", "Word"], [["ai", "rain"], ["ay", "day"]], "A table showing the same sound spelt ai in rain and ay in day."),
      },
      topics: {
        "the-spellings-ai-ay-oi-and-oy": {
          title: "ai, ay, oi and oy",
          learn: ["Use ai and oi in the middle of words.", "Use ay and oy at the end of words."],
          use: "You can spell words like rain, day, coin and boy correctly.",
          ex: "rain has ai in the middle. day has ay at the end.",
          model: table("Middle or end", ["Letters", "Word"], [["ai", "rain"], ["ay", "day"], ["oi", "coin"], ["oy", "boy"]], "A table showing ai in rain, ay in day, oi in coin and oy in boy."),
        },
        "split-digraphs": {
          title: "Split digraphs (magic e)",
          learn: ["A letter e at the end can change a short vowel into a long one.", "The e is split from its vowel: a-e, i-e, o-e, u-e."],
          use: "The magic e is why we write cake, kite and home.",
          ex: "cap becomes cape when we add the magic e.",
          model: table("Add the magic e", ["Short sound", "With magic e"], [["cap", "cape"], ["kit", "kite"], ["hop", "hope"]], "A table showing cap becomes cape, kit becomes kite and hop becomes hope."),
        },
        "the-spellings-ee-ea-ie-and-igh": {
          title: "ee, ea, ie and igh",
          learn: ["The long e sound can be spelt ee or ea.", "The long i sound can be spelt ie or igh."],
          use: "You can choose the right spelling for tree, sea, pie and night.",
          ex: "We write tree, sea, pie and night.",
          model: table("Four spellings", ["Letters", "Word"], [["ee", "tree"], ["ea", "sea"], ["ie", "pie"], ["igh", "night"]], "A table showing ee in tree, ea in sea, ie in pie and igh in night."),
        },
        "the-spellings-oo-oa-ow-and-ew": {
          title: "oo, oa, ow and ew",
          learn: ["Learn spellings for the oo, oa, ow and ew sounds.", "Look carefully at which letters make the word."],
          use: "These spellings are in words you use every day, like moon, boat, snow and new.",
          ex: "We write moon, boat, snow and new.",
          model: table("Four spellings", ["Letters", "Word"], [["oo", "moon"], ["oa", "boat"], ["ow", "snow"], ["ew", "new"]], "A table showing oo in moon, oa in boat, ow in snow and ew in new."),
        },
        "the-spellings-ar-or-er-ir-and-ur": {
          title: "ar, or, er, ir and ur",
          learn: ["Learn spellings for the ar, or, er, ir and ur sounds.", "Er, ir and ur can sound the same, so look for the pattern."],
          use: "Words like car, horse, sister, girl and turn all use these spellings.",
          ex: "We write car, horse, girl and turn.",
          model: table("Five spellings", ["Letters", "Word"], [["ar", "car"], ["or", "horse"], ["er", "sister"], ["ir", "girl"], ["ur", "turn"]], "A table showing ar in car, or in horse, er in sister, ir in girl and ur in turn."),
        },
        "the-spellings-air-ear-and-are": {
          title: "air, ear and are",
          learn: ["The same sound is spelt air, ear or are.", "Learn which spelling goes in each word."],
          use: "These spellings help you write words like chair, bear and share.",
          ex: "We write chair, bear and share.",
          model: table("Three spellings", ["Letters", "Word"], [["air", "chair"], ["ear", "bear"], ["are", "share"]], "A table showing air in chair, ear in bear and are in share."),
        },
      },
    },
    "grammar---sentences": {
      intro: {
        title: "Grammar: sentences",
        learn: ["Leave spaces between words.", "Start with a capital letter and end with a full stop, question mark or exclamation mark.", "Join ideas with and."],
        use: "A well-built sentence makes your writing easy for others to read.",
        ex: "The cat sat on the mat.",
        model: fix("Fix the sentence", "the cat sat on the mat", "The cat sat on the mat.", "The sentence 'the cat sat on the mat' has no capital letter or full stop. The right version is 'The cat sat on the mat.'"),
      },
      topics: {
        "words-and-sentences": {
          title: "Words and sentences",
          learn: ["A sentence is a group of words that makes sense.", "Leave a space between each word."],
          use: "Spaces let other people read your words easily.",
          ex: "The cat sat on the mat.",
          model: fix("Add the spaces", "Thecatsatonthemat.", "The cat sat on the mat.", "The words 'Thecatsatonthemat.' have no spaces. The right version is 'The cat sat on the mat.'"),
        },
        "joining-with-and": {
          title: "Joining with and",
          learn: ["Use and to join two words or two ideas.", "It makes your sentence longer and tells more."],
          use: "And helps you say more in one sentence, like what you have or what you did.",
          ex: "I have a cat and a dog.",
          model: sentence("A joining word", "I have a cat **and** a dog.", "The sentence 'I have a cat and a dog' with the joining word and picked out."),
        },
        "capital-letters": {
          title: "Capital letters",
          learn: ["Use a capital letter for names, places and days.", "The word I is always a capital letter."],
          use: "Capital letters show names and make your writing look right.",
          ex: "I met Tom on Monday.",
          model: fix("Add the capitals", "i met tom on monday.", "I met Tom on Monday.", "The sentence 'i met tom on monday.' needs capital letters on I, Tom and Monday."),
        },
        "days-of-the-week": {
          title: "Days of the week",
          learn: ["There are seven days in a week, in a fixed order.", "Each day starts with a capital letter."],
          use: "You can write about your week, like your football day or your swimming day.",
          ex: "Monday, Tuesday, Wednesday, Thursday, Friday.",
          model: { renderer: "lesson", alt: "The weekdays in order: Monday, Tuesday, Wednesday, Thursday, Friday.", data: { type: "jumps", title: "The school week", terms: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] } },
        },
        "ending-a-sentence": {
          title: "Ending a sentence",
          learn: ["Start with a capital letter.", "End with a full stop, a question mark or an exclamation mark."],
          use: "The end mark tells the reader if you are telling, asking or shouting.",
          ex: "Do you like jam? I love jam!",
          model: table("End marks", ["Sentence", "Ends with"], [["I like jam.", "full stop"], ["Do you like jam?", "question mark"], ["I love jam!", "exclamation mark"]], "A table showing three sentences and their end marks: a full stop, a question mark and an exclamation mark."),
        },
      },
    },
    "reading---poems-and-facts": {
      intro: {
        title: "Reading: poems and facts",
        learn: ["Enjoy rhymes and repeated phrases.", "Find out what words mean.", "Tell a true fact from a made-up story."],
        use: "Poems are fun to say, and facts help you learn about the world.",
        ex: "A frog lays eggs in water. That is a fact.",
        model: table("Two kinds of reading", ["Story", "Fact"], [["A dragon flew to the moon.", "Bees make honey."]], "A table with a made-up story line and a true fact."),
      },
      topics: {
        "rhymes-and-poems": {
          title: "Rhymes and poems",
          learn: ["Rhyming words end with the same sound.", "Poems are fun to read and say out loud."],
          use: "Rhymes help you remember songs and poems.",
          ex: "cat, hat and mat all rhyme.",
          model: sentence("A rhyme", "The cat sat on the **mat**.", "The line 'The cat sat on the mat' with the rhyming word mat picked out."),
        },
        "repeated-phrases": {
          title: "Repeated phrases",
          learn: ["Some stories and poems say the same words again and again.", "You can join in when you spot the pattern."],
          use: "Repeated phrases make a story fun to read together.",
          ex: "Run, run, as fast as you can!",
          model: sentence("A repeated phrase", "**Run, run,** as fast as you can!", "The line 'Run, run, as fast as you can!' with the repeated words picked out."),
        },
        "what-words-mean": {
          title: "What words mean",
          learn: ["Use the sentence to work out a new word.", "Link a new word to words you already know."],
          use: "Knowing more word meanings makes reading easier and writing richer.",
          ex: "A puppy is a young dog.",
          model: sentence("A word meaning", "A **puppy** is a young dog.", "The sentence 'A puppy is a young dog' with the word puppy picked out."),
        },
        "facts-and-stories": {
          title: "Facts and stories",
          learn: ["A fact is true. A story is made up.", "Both can be fun to listen to and read."],
          use: "Telling the difference helps you know what to believe.",
          ex: "Frogs lay eggs in water: a fact. A dragon on the moon: a story.",
          model: table("Fact or story?", ["Story", "Fact"], [["A dragon flew to the moon.", "Frogs lay eggs in water."]], "A table with a made-up story line and a true fact."),
        },
      },
    },
    "writing---composition": {
      intro: {
        title: "Writing: composition",
        learn: ["Say a sentence before you write it.", "Put sentences in order to tell a short story.", "Check your writing makes sense."],
        use: "Planning and checking helps you write something others enjoy reading.",
        ex: "First, Mia got a seed. Next, she planted it.",
        model: steps("Writing a sentence", ["Say it out loud.", "Write it down.", "Read it back."], "Three steps: say the sentence, write it down, then read it back."),
      },
      topics: {
        "building-sentences": {
          title: "Building sentences",
          learn: ["Say your sentence out loud first.", "Then write it down one word at a time."],
          use: "Saying it first helps you remember all the words when you write.",
          ex: "Say: I see a bird. Then write it.",
          model: steps("Build a sentence", ["Say it: I see a bird.", "Write each word.", "Read it back."], "Three steps: say I see a bird, write each word, then read it back."),
        },
        "ordering-a-story": {
          title: "Ordering a story",
          learn: ["A story has a clear order: first, next, last.", "Words like first and then help the reader follow."],
          use: "Putting things in order helps you tell a story or explain what you did.",
          ex: "First, Mia got a seed. Next, she planted it. Last, it grew.",
          model: steps("First, next, last", ["First, Mia got a seed.", "Next, she planted it.", "Last, it grew into a flower."], "A story in order: Mia got a seed, then planted it, then it grew into a flower."),
        },
        "checking-it-makes-sense": {
          title: "Checking it makes sense",
          learn: ["Read your writing again.", "Check each sentence makes sense, and fix any mistakes."],
          use: "Checking helps you catch missing or wrong words before someone else reads it.",
          ex: "The cat drink milk becomes The cat drinks milk.",
          model: fix("Check and fix", "The cat drink milk.", "The cat drinks milk.", "The sentence 'The cat drink milk.' is fixed to 'The cat drinks milk.'"),
        },
        dictation: {
          title: "Writing from memory",
          learn: ["Listen to a whole sentence and keep it in your head.", "Write it with spaces, a capital letter and a full stop."],
          use: "Writing from memory builds spelling, so you can write notes without help.",
          ex: "Hear: The dog is in the bed. Then write it.",
          model: steps("Writing from memory", ["Hear the whole sentence.", "Say it again in your head.", "Write one word at a time.", "Check capital letter, spaces and full stop."], "Four steps: hear the sentence, say it in your head, write it word by word, then check it."),
        },
      },
    },
  },
});
