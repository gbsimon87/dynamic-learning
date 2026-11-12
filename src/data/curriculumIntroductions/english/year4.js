// Year 4 English introductions: subject, quest and topic purpose screens.
// Method teaching stays in each challenge's lesson; these say why the skill matters.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const table = (title, headers, rows, alt) => ({ renderer: "lesson", alt, data: { type: "table", title, headers, rows } });
const sentence = (title, text, alt) => ({ renderer: "lesson", alt, data: { type: "sentence", title, text } });
const fix = (title, wrong, right, alt) => ({ renderer: "lesson", alt, data: { type: "fix", title, wrong, right } });
const steps = (title, list, alt) => ({ renderer: "lesson", alt, data: { type: "steps", title, steps: list } });
const pictures = (title, items, alt) => ({ renderer: "pictures", alt, data: { title, items } });

export default defineIntroductions({
  year: 4, subject: "english",
  subjectIntro: {
    title: "Welcome to Year 4 English",
    learn: ["Spell trickier words, from il and im words to shun endings.", "Read between the lines and see how writers make words work.", "Write with fronted adverbials, speech punctuation and clear paragraphs."],
    use: "English helps you understand what you read, explain your ideas, and write clearly for readers who are not in the room.",
    ex: "Later that day, the door creaked open.",
    model: sentence("A stronger sentence", "**Later that day,** the door creaked open.", "The sentence 'Later that day, the door creaked open.' with the opening phrase Later that day picked out."),
  },
  quests: {
    "spelling---prefixes-suffixes-and-apostrophes": {
      intro: {
        title: "Spelling: prefixes, suffixes and apostrophes",
        learn: ["Use il, im and ir to mean not.", "Spell the endings ous and more ly words.", "Place the apostrophe for things that belong to more than one owner."],
        use: "Careful word endings and apostrophes make your meaning exact.",
        ex: "The children's coats hung by the door.",
        model: table("Word parts", ["Word", "Meaning"], [["illegal", "not legal"], ["famous", "full of fame"], ["girls' coats", "coats of several girls"]], "A table showing illegal means not legal, famous means full of fame and girls' coats means coats belonging to several girls."),
      },
      topics: {
        "the-prefixes-il-im-and-ir": {
          title: "The prefixes il, im and ir",
          learn: ["The prefix in becomes il, im or ir before some letters.", "il goes before l, im before m or p, and ir before r."],
          use: "You will use these in words like illegal, impossible and irregular.",
          ex: "in and legal would clash, so we write illegal.",
          model: table("Not", ["Prefix", "Before", "Word"], [["il", "l", "illegal"], ["im", "m or p", "impossible"], ["ir", "r", "irregular"]], "A table showing il goes before l in illegal, im goes before m or p in impossible and ir goes before r in irregular."),
        },
        "the-suffix-ous": {
          title: "The suffix ous",
          learn: ["The ending ous often means full of or having a quality.", "Some words change a little before ous, such as humour to humorous."],
          use: "Describing words like dangerous, famous and curious are used in books every day.",
          ex: "A dangerous road is full of danger.",
          model: table("Full of", ["Word", "With ous"], [["danger", "dangerous"], ["poison", "poisonous"], ["humour", "humorous"]], "A table showing danger becomes dangerous, poison becomes poisonous and humour becomes humorous."),
        },
        "more-ly-adverbs": {
          title: "More ly adverbs",
          learn: ["Words ending in le change to ly, as gentle becomes gently.", "Words ending in ic add ally. Truly, duly and wholly are exceptions."],
          use: "Adverbs tell the reader exactly how something happens.",
          ex: "She spoke gently. He ran frantically.",
          model: table("Adverb endings", ["Word", "Adverb"], [["gentle", "gently"], ["basic", "basically"], ["true", "truly"]], "A table showing gentle becomes gently, basic becomes basically and true becomes truly."),
        },
        "apostrophes-for-plural-possession": {
          title: "Apostrophes for plural possession",
          learn: ["For a plural ending in s, put the apostrophe after the s.", "For a plural like children, add an apostrophe and s."],
          use: "It shows exactly who owns something, like the girls' coats or the children's toys.",
          ex: "The girls' bags and the children's coats.",
          model: table("Plural owners", ["Owners", "Belonging"], [["the girls", "the girls' bags"], ["the boys", "the boys' team"], ["the children", "the children's toys"]], "A table showing the girls' bags, the boys' team and the children's toys."),
        },
      },
    },
    "reading---understanding-texts": {
      intro: {
        title: "Reading: understanding texts",
        learn: ["Find main ideas and make a short summary.", "Work out what is not said and give evidence.", "See how words, headings and layout carry meaning."],
        use: "Reading closely helps you learn from what you read and explain it to others.",
        ex: "A summary keeps the main ideas and leaves out small details.",
        model: pictures("Reading skills", [{ icon: "🔍", label: "Main ideas" }, { icon: "💭", label: "Inferences" }, { icon: "✨", label: "Word choice" }, { icon: "📑", label: "Layout" }], "Four reading skills: main ideas, inferences, word choice and layout."),
      },
      topics: {
        "main-ideas-and-summaries": {
          title: "Main ideas and summaries",
          learn: ["A main idea is what a whole part of a text is mostly about.", "A summary keeps the main ideas and leaves out small details."],
          use: "Summaries help you remember what you read and tell others about it quickly.",
          ex: "Three paragraphs about how bees make honey can be summed up in one sentence.",
          model: steps("Making a summary", ["Find the main idea of each paragraph.", "Join the main ideas.", "Leave out the small details."], "Three steps: find the main idea of each paragraph, join the main ideas, and leave out the small details."),
        },
        "justifying-inferences": {
          title: "Justifying inferences",
          learn: ["An inference is something you work out from clues.", "Back up your idea with evidence from the text."],
          use: "Giving a reason from the text makes your ideas stronger when you talk about a book.",
          ex: "She hid when thunder sounded. That is evidence that she was frightened.",
          model: sentence("Evidence", "She **hid under the table** when the thunder sounded.", "The sentence 'She hid under the table when the thunder sounded.' with the words hid under the table picked out as evidence."),
        },
        "how-language-creates-meaning": {
          title: "How language creates meaning",
          learn: ["Writers choose words to create pictures, sounds and feelings.", "Explain what a word makes you imagine."],
          use: "Noticing word choices helps you enjoy a book more and write better yourself.",
          ex: "The wind howled is wilder than The wind blew.",
          model: table("Word choice", ["Plain", "Stronger", "It makes you imagine"], [["blew", "howled", "a loud, wild sound"], ["walked", "trudged", "a slow, tired step"]], "A table showing blew and howled, which makes you imagine a loud wild sound, and walked and trudged, which makes you imagine a slow tired step."),
        },
        "how-structure-and-presentation-help": {
          title: "How structure and presentation help",
          learn: ["Headings, paragraphs and labels help readers find information.", "Think about why the writer arranged the text that way."],
          use: "You can find what you need in a book or on a page without reading every word.",
          ex: "A heading tells you which information to expect in the part below it.",
          model: table("Signposts", ["Feature", "It helps you"], [["Heading", "know what a part is about"], ["Paragraph", "follow one idea at a time"], ["Label", "name a part of a picture"]], "A table showing a heading tells you what a part is about, a paragraph lets you follow one idea at a time and a label names a part of a picture."),
        },
      },
    },
    "grammar---words-and-phrases": {
      intro: {
        title: "Grammar: words and phrases",
        learn: ["Tell a plural from a possessive.", "Use Standard English verb forms.", "Use determiners and build expanded noun phrases."],
        use: "Choosing the right small words and phrases makes your writing precise.",
        ex: "The dogs' bowls were empty.",
        model: sentence("Plural or possessive", "The **dogs'** bowls were empty.", "The sentence 'The dogs' bowls were empty.' with the possessive dogs' picked out."),
      },
      topics: {
        "plural-or-possessive": {
          title: "Plural or possessive",
          learn: ["A plural s tells us there is more than one.", "A possessive apostrophe tells us something belongs to someone."],
          use: "Writing the right one stops your reader getting confused.",
          ex: "The dogs barked. The dog's bone.",
          model: table("Two jobs for s", ["Sentence", "Job of s"], [["The dogs barked.", "more than one dog"], ["The dog's bone.", "the bone belongs to the dog"]], "A table showing in The dogs barked the s means more than one dog, and in The dog's bone the apostrophe s shows the bone belongs to the dog."),
        },
        "standard-english-verbs": {
          title: "Standard English verbs",
          learn: ["Writing uses Standard English verb forms.", "Say we were, not we was, and I did, not I done."],
          use: "Standard English is understood everywhere, in school and in the wider world.",
          ex: "We were late. I did my homework.",
          model: fix("Choose the Standard form", "We was late.", "We were late.", "The sentence 'We was late.' is changed to the Standard English form 'We were late.'"),
        },
        determiners: {
          title: "Determiners",
          learn: ["A determiner comes before a noun.", "It tells us which one or how many, like the, this, some or three."],
          use: "Determiners help the reader know exactly which thing you mean.",
          ex: "Pass me that bowl, please.",
          model: sentence("A determiner", "Pass me **that** bowl, please.", "The sentence 'Pass me that bowl, please.' with the determiner that picked out."),
        },
        "expanded-noun-phrases": {
          title: "Expanded noun phrases",
          learn: ["A noun phrase names a thing, and can be expanded with extra detail.", "The detail can be adjectives, a noun or a phrase."],
          use: "Expanded noun phrases give the reader a clear picture in one go.",
          ex: "the striped scarf with the long fringe.",
          model: table("Add detail", ["Noun phrase", "What it adds"], [["the scarf", "just the noun"], ["the striped scarf", "a describing word"], ["the striped scarf with a long fringe", "a phrase"]], "A table showing the scarf is just the noun, the striped scarf adds a describing word and the striped scarf with a long fringe adds a phrase."),
        },
      },
    },
    "spelling---word-endings": {
      intro: {
        title: "Spelling: word endings",
        learn: ["Spell the shun sound as tion, sion, ssion or cian.", "Spell the zhun sound, and gue and que endings.", "Learn more words that are often misspelt."],
        use: "Spelling endings correctly makes your writing easy to read.",
        ex: "We write action, expression, decision and magician.",
        model: table("Endings", ["Sound", "Spelling", "Word"], [["shun", "tion", "action"], ["shun", "ssion", "expression"], ["shun", "cian", "magician"], ["zhun", "sion", "decision"]], "A table showing the shun sound spelt tion in action, ssion in expression and cian in magician, and the zhun sound spelt sion in decision."),
      },
      topics: {
        "the-shun-endings": {
          title: "The shun endings",
          learn: ["The shun sound can be spelt tion, sion, ssion or cian.", "A person with a skill often ends in cian."],
          use: "You will spell words like action, tension, discussion and musician.",
          ex: "A magician is a person. We write cian.",
          model: table("Four spellings", ["Ending", "Word"], [["tion", "action"], ["sion", "tension"], ["ssion", "discussion"], ["cian", "musician"]], "A table showing tion in action, sion in tension, ssion in discussion and cian in musician."),
        },
        "the-zhun-ending": {
          title: "The zhun ending",
          learn: ["The zhun sound at the end of a word is spelt sion.", "Say the word slowly and check how it ends."],
          use: "You will spell words like television, decision and confusion.",
          ex: "We write division and decision.",
          model: table("Zhun words", ["Word", "Ending"], [["television", "sion"], ["decision", "sion"], ["confusion", "sion"]], "A table showing television, decision and confusion all end in sion."),
        },
        "the-endings-gue-and-que": {
          title: "The endings gue and que",
          learn: ["gue can spell the g sound at the end of a word.", "que can spell the k sound. These words come from French."],
          use: "You will see these endings in words like league, tongue, unique and antique.",
          ex: "We write tongue and antique.",
          model: table("French endings", ["Ending", "Sound", "Word"], [["gue", "g", "league"], ["que", "k", "antique"]], "A table showing gue says g in league and que says k in antique."),
        },
        "more-words-often-misspelt": {
          title: "More words often misspelt",
          learn: ["Some words need practice rather than a rule.", "Find the tricky part, then look, say, cover, write and check."],
          use: "You will write words like because, probably, separate and strength in your work.",
          ex: "The tricky part of separate is the a in the middle.",
          model: table("Tricky parts", ["Word", "Tricky part"], [["separate", "sep-a-rate"], ["strength", "streng-th"], ["probably", "prob-ab-ly"]], "A table showing the tricky part of separate is the a in the middle, of strength is the th at the end, and of probably is the ab."),
        },
      },
    },
    "reading---stories-and-poems": {
      intro: {
        title: "Reading: stories and poems",
        learn: ["Find the theme of a story.", "Predict from clues, and read myths and legends.", "Compare different forms of poetry."],
        use: "Thinking about big ideas helps you enjoy stories and poems, and understand why people tell them.",
        ex: "A story about a mouse who helps a lion can be about kindness.",
        model: pictures("Stories and poems", [{ icon: "💡", label: "Themes" }, { icon: "🔮", label: "Predict" }, { icon: "⚡", label: "Myths" }, { icon: "🎶", label: "Poems" }], "Four ideas: themes, predicting, myths and poems."),
      },
      topics: {
        "themes-in-stories": {
          title: "Themes in stories",
          learn: ["A theme is a big idea explored across a story, like kindness or courage.", "Look at the choices characters make and what they learn."],
          use: "Spotting themes helps you see what a story is really about.",
          ex: "A boy shares his lunch with a new friend. The theme is kindness.",
          model: table("Themes", ["Clue", "Theme"], [["shares his lunch", "kindness"], ["climbs despite fear", "courage"]], "A table showing sharing a lunch points to the theme of kindness and climbing despite fear points to the theme of courage."),
        },
        "predicting-from-clues": {
          title: "Predicting from clues",
          learn: ["A prediction says what may happen next.", "Use details already in the text, both stated and hinted."],
          use: "Predicting keeps you thinking and checking as you read.",
          ex: "Dark clouds, a rising wind and a picnic: the picnic may be spoilt.",
          model: sentence("A clue", "**Dark clouds** rolled over the picnic.", "The sentence 'Dark clouds rolled over the picnic.' with the words dark clouds picked out as a clue."),
        },
        "myths-and-legends-from-around-the-world": {
          title: "Myths and legends from around the world",
          learn: ["Myths and legends are traditional stories told for many years.", "They have extraordinary events, gods or heroes."],
          use: "These stories show what people long ago believed and wondered.",
          ex: "A myth might explain why the sun rises. A legend might tell of a hero.",
          model: table("Two kinds", ["Kind", "Clue"], [["Myth", "gods or how something began"], ["Legend", "a hero who may be real"]], "A table showing a myth has gods or tells how something began, and a legend is about a hero who may be real."),
        },
        "comparing-forms-of-poetry": {
          title: "Comparing forms of poetry",
          learn: ["A poem's form is how its words and lines are arranged.", "Compare rhyme, rhythm, line breaks and whether it tells a story."],
          use: "Comparing poems helps you see why a poet chose a form.",
          ex: "One poem rhymes. Another is free verse. A third tells a story.",
          model: table("Forms", ["Form", "Clue"], [["Rhyming poem", "line endings rhyme"], ["Free verse", "no need to rhyme"], ["Narrative poem", "tells a story"]], "A table showing a rhyming poem has rhyming line endings, free verse need not rhyme and a narrative poem tells a story."),
        },
      },
    },
    "grammar---sentences-and-speech": {
      intro: {
        title: "Grammar: sentences and speech",
        learn: ["Start sentences with fronted adverbials and a comma.", "Punctuate direct speech.", "Use pronouns and possessive pronouns clearly."],
        use: "These tools help you write sentences that flow and tell the reader who is speaking.",
        ex: "Later that day, Mia said, “It is mine.”",
        model: sentence("Sentence and speech", "**Later that day,** Mia said, “It is **mine**.”", "The sentence 'Later that day, Mia said, “It is mine.”' with the opening phrase Later that day and the possessive pronoun mine picked out."),
      },
      topics: {
        "fronted-adverbials": {
          title: "Fronted adverbials",
          learn: ["An adverbial tells us when, where or how.", "A fronted adverbial comes at the start of a sentence."],
          use: "Starting a sentence with when, where or how makes your writing flow.",
          ex: "Before sunrise, the birds began to sing.",
          model: sentence("Opening phrase", "**Before sunrise,** the birds began to sing.", "The sentence 'Before sunrise, the birds began to sing.' with the fronted adverbial Before sunrise picked out."),
        },
        "commas-after-fronted-adverbials": {
          title: "Commas after fronted adverbials",
          learn: ["Put a comma after a fronted adverbial.", "The comma separates the opening from the main clause."],
          use: "The comma tells the reader where the opening ends and the main sentence begins.",
          ex: "In the garden, a robin sang.",
          model: fix("Add the comma", "In the garden a robin sang.", "In the garden, a robin sang.", "The sentence 'In the garden a robin sang.' needs a comma after the opening phrase, giving 'In the garden, a robin sang.'"),
        },
        "punctuating-direct-speech": {
          title: "Punctuating direct speech",
          learn: ["Inverted commas go around the words spoken.", "Add a comma after the reporting clause, a capital at the start of the speech, and the end mark inside."],
          use: "You will need this every time a character speaks in your stories.",
          ex: "Dad said, “Dinner is ready.”",
          model: sentence("Speech", "Dad said**, “**Dinner is ready**.”**", "The sentence 'Dad said, “Dinner is ready.”' with the comma, the opening speech mark and the full stop and closing speech mark inside picked out."),
        },
        "pronouns-and-possessive-pronouns": {
          title: "Pronouns and possessive pronouns",
          learn: ["A pronoun stands in for a noun, so you do not repeat it.", "A possessive pronoun shows belonging: mine, yours, hers, his, ours, theirs."],
          use: "Pronouns stop your writing sounding repetitive.",
          ex: "Tara found the key. She said it was hers.",
          model: sentence("Pronouns", "Tara found the key. **She** said it was **hers**.", "The sentences 'Tara found the key. She said it was hers.' with the pronoun She and the possessive pronoun hers picked out."),
        },
      },
    },
    "spelling---sounds-and-homophones": {
      intro: {
        title: "Spelling: sounds and homophones",
        learn: ["Spell ch as k or sh, and sc as s.", "Spell the long a sound as ei, eigh or ey.", "Choose between more homophones."],
        use: "Knowing unusual spellings helps you spell words from many languages.",
        ex: "We write chorus, science and weigh.",
        model: table("Unusual spellings", ["Word", "Sound"], [["chorus", "ch says k"], ["science", "sc says s"], ["weigh", "eigh says long a"]], "A table showing ch says k in chorus, sc says s in science and eigh says long a in weigh."),
      },
      topics: {
        "greek-and-french-ch": {
          title: "Greek and French ch",
          learn: ["In some words from Greek, ch says k.", "In some words from French, ch says sh."],
          use: "You will spell words like chorus, chemist, chef and machine.",
          ex: "We write chorus with a k sound, and chef with a sh sound.",
          model: table("Two sounds of ch", ["Sound", "Word"], [["k", "chorus"], ["sh", "chef"]], "A table showing ch says k in chorus and sh in chef."),
        },
        "the-letters-sc": {
          title: "The letters sc",
          learn: ["In some words, the letters sc make a single s sound.", "These words come from Latin."],
          use: "You will spell words like science, scene and crescent.",
          ex: "science starts with an s sound but is spelt sc.",
          model: table("The s sound", ["Word", "Spelling"], [["science", "sc"], ["scene", "sc"], ["crescent", "sc"]], "A table showing the s sound is spelt sc in science, scene and crescent."),
        },
        "the-sounds-ei-eigh-and-ey": {
          title: "The sounds ei, eigh and ey",
          learn: ["The long a sound can be spelt ei, eigh or ey.", "Learn which pattern each word uses."],
          use: "You will spell words like vein, weigh and obey.",
          ex: "We write eight, neighbour and they.",
          model: table("Long a", ["Spelling", "Word"], [["ei", "vein"], ["eigh", "weigh"], ["ey", "they"]], "A table showing the long a sound spelt ei in vein, eigh in weigh and ey in they."),
        },
        "more-homophones": {
          title: "More homophones",
          learn: ["Homophones sound the same but have different spellings and meanings.", "Read the whole sentence before you choose."],
          use: "Choosing the right one stops your reader getting confused.",
          ex: "Weather is about rain and sun. Whether means if.",
          model: table("Same sound", ["Word", "Meaning"], [["weather", "rain, sun and wind"], ["whether", "if"]], "A table showing weather means rain, sun and wind and whether means if."),
        },
      },
    },
    "writing---composition-and-editing": {
      intro: {
        title: "Writing: composition and editing",
        learn: ["Organise paragraphs around a theme.", "Choose nouns or pronouns so the reader always knows who or what you mean.", "Edit for consistency, proofread and write from memory."],
        use: "Careful planning and editing make your writing clear and easy to follow.",
        ex: "Does the reader know who she means?",
        model: steps("Plan, write, edit", ["Group ideas into paragraphs.", "Check who or what each pronoun means.", "Proofread for spelling and punctuation."], "Three steps: group ideas into paragraphs, check who or what each pronoun means, and proofread for spelling and punctuation."),
      },
      topics: {
        "paragraphs-around-a-theme": {
          title: "Paragraphs around a theme",
          learn: ["A paragraph groups sentences about one main idea.", "Start a new paragraph when the focus changes."],
          use: "Paragraphs help a reader follow your ideas.",
          ex: "One paragraph about the journey, the next about the beach.",
          model: table("Paragraphs", ["Paragraph", "Theme"], [["1", "the journey"], ["2", "the beach"]], "A table showing paragraph 1 is about the journey and paragraph 2 is about the beach."),
        },
        "nouns-or-pronouns-for-clarity": {
          title: "Nouns or pronouns for clarity",
          learn: ["Pronouns avoid repeating a noun too often.", "Use the noun again when a pronoun could mean more than one thing."],
          use: "Your reader should never wonder who or what you mean.",
          ex: "Ali told Ben that Ben had won is clearer than Ali told Ben that he had won.",
          model: fix("Make it clear", "Ali told Ben that he had won.", "Ali told Ben that Ben had won.", "The sentence 'Ali told Ben that he had won.' is unclear about who he means, so it is changed to 'Ali told Ben that Ben had won.'"),
        },
        "editing-for-consistency": {
          title: "Editing for consistency",
          learn: ["Check that tense, names and details agree across your writing.", "Read the whole passage before changing anything."],
          use: "Consistent writing does not confuse the reader.",
          ex: "She opened the door and walked in, not walks in.",
          model: fix("Keep the tense", "She opened the door and walks in.", "She opened the door and walked in.", "The sentence 'She opened the door and walks in.' is changed to 'She opened the door and walked in.' to keep the tense the same."),
        },
        "proofreading-longer-texts": {
          title: "Proofreading longer texts",
          learn: ["Check spelling and punctuation, one thing at a time.", "Make sure each correction keeps the meaning."],
          use: "Proofreading catches slips before someone else reads your work.",
          ex: "A sentence begins with a capital letter and ends with an end mark.",
          model: fix("Proofread", "we saw a giraffe", "We saw a giraffe.", "The words 'we saw a giraffe' need a capital letter and a full stop."),
        },
        dictation: {
          title: "Dictation",
          learn: ["Keep a whole sentence in your head and write it down.", "Check spelling and punctuation together."],
          use: "Writing from memory builds spelling you can use in all your writing.",
          ex: "Hear: The bell rang twice. Then write it with a capital and a full stop.",
          model: steps("Listen, remember, check", ["Listen to the whole sentence.", "Remember the meaning and the spellings.", "Write it down.", "Check the punctuation."], "Four steps: listen to the whole sentence, remember the meaning and the spellings, write it down, then check the punctuation."),
        },
      },
    },
  },
});
