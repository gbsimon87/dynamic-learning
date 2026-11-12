import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

// Highlight an authored language example, rather than illustrating a hidden
// assessment answer. Every purpose/use/example below is specific to its topic.
const intro = (title, learn, use, example) => ({ title, learn, use,
  ex: example.replaceAll("**", ""), model: { renderer: "lesson", alt: example.replaceAll("**", ""),
    data: { type: "sentence", title: "Look at this example", text: example } } });

export default defineIntroductions({ year: 5, subject: "english",
  subjectIntro: intro("Welcome to Year 5 English", ["Read closely and support your ideas with evidence.", "Choose accurate words, clear sentences and useful layouts.", "Explain a view and listen to a different one."],
    "Use English to enjoy books, write for other people and explain why you think something.", "I think the character is nervous **because she keeps looking at the door**."),
  quests: {
    "spelling---word-endings": {
      intro: intro("Endings that change words", ["Recognise common word endings.", "Use related words to remember tricky spellings."], "Choose clear describing words in a story or report, and spell them so a reader recognises them.", "The soup was **delicious**, and there was enough for everyone."),
      topics: {
        "the-endings-cious-and-tious": intro("The endings cious and tious", ["Recognise two spellings of the shus sound.", "Connect a word to a helpful relative."], "Describe a delicious meal or a cautious decision in writing.", "Space is related to **spacious**, meaning there is plenty of room."),
        "the-endings-cial-and-tial": intro("The endings cial and tial", ["Learn common cial and tial spellings.", "Notice exceptions as well as patterns."], "Read words such as official and essential accurately in information and instructions.", "The first letter of a name is its **initial**."),
        "the-endings-ant-ance-ent-and-ence": intro("Related word endings", ["Link ant and ent words with related nouns.", "Use word families to remember ance and ence."], "Write about confidence, importance and patience with accurate spellings.", "A **confident** speaker shows **confidence**."),
        "the-endings-able-and-ible": intro("Able and ible", ["Recognise able and ible endings.", "Learn spellings that cannot be decided by sound alone."], "Describe something that can be washed, seen or understood.", "A coat that can be washed is **washable**."),
      },
    },
    "reading---words-and-meanings": {
      intro: intro("Explore what words mean", ["Use word parts and reference books.", "Notice comparisons that create pictures in a reader's mind."], "Work out unfamiliar vocabulary and choose words that express exactly what you mean.", "The playground was **a beehive of activity**: it was busy, not full of real bees."),
      topics: {
        "roots-and-origins": intro("Roots and origins", ["Look for familiar roots, prefixes and suffixes.", "Use their meanings alongside the sentence."], "Tackle new words in books and instructions without guessing from the first letter.", "To **rebuild** is to build again; re adds the idea of again."),
        "using-a-dictionary-and-thesaurus": intro("Choose a word tool", ["Use a dictionary for spelling and meaning.", "Use a thesaurus for alternatives that fit the context."], "Check an unfamiliar word and improve repeated vocabulary in your writing.", "A dictionary explains **bank** as a money business or the side of a river; the sentence decides which."),
        "similes-and-metaphors": intro("Pictures made with words", ["Recognise similes and metaphors.", "Explain the picture a comparison creates."], "Enjoy a writer's description and make your own scenes vivid.", "Her smile was **like sunshine**: the comparison suggests warmth and happiness."),
      },
    },
    "grammar---verbs-and-possibility": {
      intro: intro("Actions and possibilities", ["Make and change verbs with word parts.", "Choose language that shows how certain something is."], "Give instructions, describe changes and distinguish a possibility from a promise.", "We **might** repaint the gate: the plan is possible, not certain."),
      topics: {
        "making-verbs-with-ate-ise-and-ify": intro("Make a verb", ["Use suffixes to turn some nouns or adjectives into verbs."], "Explain actions such as making something simple, pure or modern.", "We can **simplify** a long explanation to make it easier to understand."),
        "verb-prefixes": intro("Change a verb's meaning", ["Explore prefixes including re, dis, de, mis and over.", "Check the new meaning in a sentence."], "Tell someone to redo a task, disconnect a plug or avoid overcooking food.", "If you **misread** a sign, you read it incorrectly."),
        "modal-verbs-and-possibility": intro("How certain is it?", ["Recognise modal verbs and possibility adverbs.", "Explain whether a statement is certain or possible."], "Make sensible predictions and understand instructions without confusing might with must.", "The clouds mean it **could** rain, but rain is not certain."),
      },
    },
    "spelling---silent-letters-and-tricky-words": {
      intro: intro("Look beyond the sounds", ["Notice letters you cannot hear.", "Remember tricky spellings and choose words by meaning."], "Write messages that say what you intend, even when two words sound alike.", "The **knight** rode through the night: the first word names a person, the second a time."),
      topics: {
        "silent-letters": intro("Letters you cannot hear", ["Spot silent letters in familiar words.", "Remember the written form as well as its sound."], "Spell words in stories accurately even when saying them does not reveal every letter.", "In **lamb**, the b is written but not sounded."),
        "the-letters-ei-after-c": intro("Ei after c", ["Recognise the ee sound spelt ei after c in some words.", "Learn the whole word and its relatives."], "Read and write useful words such as receive and ceiling.", "Look up at the **ceiling**: its ee sound is written ei after c."),
        "homophones-and-confusing-words": intro("Similar sounds, different meanings", ["Choose a word from its meaning and job in the sentence."], "Keep your message clear when words sound alike or have very similar spellings.", "I ate **cereal** for breakfast; a serial is a story told in parts."),
        "words-often-misspelt": intro("Remember tricky words", ["Check doubled letters and less obvious spellings.", "Use a specific spelling reminder."], "Write common school and everyday words confidently without relying only on sound.", "**Accommodate** has two c letters and two m letters."),
        "more-words-often-misspelt": intro("More words worth remembering", ["Learn another set of useful spellings.", "Check the part of each word that is easy to miss."], "Edit a report or message so the reader can concentrate on your ideas.", "There is a **finite** part inside the spelling of definite."),
      },
    },
    "reading---understanding-texts": {
      intro: intro("Read, notice and explain", ["Use evidence to understand characters and information.", "Compare texts and distinguish facts from views."], "Learn from a report, follow a play and explain your interpretation of a story.", "Mia checked the clock three times: this detail **suggests she is waiting for something**."),
      topics: {
        "thoughts-and-motives": intro("Why did they do that?", ["Infer a character's thoughts or motives.", "Support an inference with an action or detail from the text."], "Understand characters whose feelings are shown through behaviour rather than named.", "Sam hid the broken cup: **he may be afraid of being blamed**."),
        "comparing-characters-and-settings": intro("Compare matching details", ["Notice similarities and differences.", "Compare the same feature in each character or place."], "Explain how two books create different people or worlds.", "One cottage is warm and crowded; the other is **cold and empty**. Both are homes, but they feel different."),
        "fact-or-opinion": intro("Checkable fact or personal view?", ["Separate claims that can be checked from preferences or judgements."], "Think carefully about adverts, reviews and information you read.", "The pool is 25 metres long is checkable; **it is the best pool** is a personal view."),
        "retrieving-and-recording-information": intro("Find and record the detail", ["Look for the information a question asks for.", "Record it accurately without changing its meaning."], "Find opening times, instructions or research facts and share them correctly.", "A notice says the library closes at **4 pm**; copy that time into your notes."),
        "reading-play-scripts": intro("Follow a play script", ["Identify speakers, spoken lines and stage directions."], "Read a part with friends and understand what actors do as well as say.", "LENA: Wait! **[She runs towards the gate.]** The brackets tell the actor what to do."),
      },
    },
    "grammar---clauses-and-punctuation": {
      intro: intro("Add detail and make it clear", ["Use relative clauses for extra information.", "Choose punctuation that keeps your meaning clear."], "Help a reader follow longer sentences without misunderstanding who or what you mean.", "My brother, **who loves reading**, borrowed a book."),
      topics: {
        "relative-pronouns": intro("Words that introduce extra detail", ["Recognise who, which, whose and other relative-clause openers."], "Connect information about a person or thing without starting a new sentence each time.", "The child **whose** hat blew away ran after it."),
        "relative-clauses": intro("Add a relative clause", ["Find extra information attached to a noun.", "Recognise when a relative pronoun can be omitted."], "Describe exactly which person or thing you mean in a story or report.", "The book **that I borrowed** is about stars."),
        "brackets-dashes-and-commas": intro("Enclose extra information", ["Recognise pairs of marks around parenthesis."], "Add a useful aside while keeping the main sentence easy to follow.", "Our dog **(a lively spaniel)** loves long walks."),
        "commas-to-avoid-ambiguity": intro("Commas can change meaning", ["Use a comma to help a reader understand your intended meaning."], "Avoid confusing a name, a list or an instruction when writing to someone.", "Let's eat, **Grandad**! The comma shows that Grandad is being spoken to."),
      },
    },
    "grammar---cohesion-and-tense": {
      intro: intro("Make ideas fit together", ["Link sentences and paragraphs.", "Show when events happened in relation to one another."], "Write explanations and stories that a reader can follow from beginning to end.", "The gate was open. **Earlier, someone had unlocked it.**"),
      topics: {
        "cohesion-within-paragraphs": intro("Link ideas within a paragraph", ["Use connecting words and references such as this and then."], "Help a reader see how one sentence follows from another.", "Pour the milk into the bowl. **Then** stir the mixture."),
        "linking-paragraphs": intro("Link one paragraph to another", ["Use time, place or ordering links across paragraphs."], "Guide a reader through a change of scene or the next part of an explanation.", "One paragraph describes the village. **Nearby,** a river winds through fields."),
        "the-past-perfect": intro("An earlier past event", ["Use had with a past participle to show an event before another past event."], "Make the order of events clear when a story looks back.", "By the time we arrived, **the train had left**."),
      },
    },
    "writing---composition-and-editing": {
      intro: intro("Write for a reader", ["Choose a form and language for your purpose.", "Build atmosphere, organise information and edit carefully."], "Create stories, letters and reports that do the job you want them to do.", "A letter asking for help might begin **Dear Headteacher,** rather than Hi mate!"),
      topics: {
        "audience-purpose-and-form": intro("Who is this for?", ["Identify your audience and purpose.", "Choose a suitable form and tone."], "Decide whether a poster, letter, explanation or story will communicate your idea best.", "To tell visitors the club's hours, write **a clear information notice**."),
        "characters-settings-and-atmosphere": intro("Create a story's atmosphere", ["Choose details that reveal a character or make a place feel a certain way."], "Help a reader imagine your scene instead of just being told that it is scary or peaceful.", "Behind the door, **a floorboard creaked in the darkness**."),
        "summarising-a-passage": intro("Keep the main ideas", ["Make a shorter version that retains important events or facts."], "Tell someone what a passage is about without retelling every small detail.", "If a team plans, builds and tests a raft, the summary can be **They made and tested a raft**."),
        "headings-bullet-points-and-underlining": intro("Help readers find their way", ["Use headings, bullets and emphasis for a clear purpose."], "Make an information page or set of instructions easy to scan.", "An equipment list can sit under the heading **What you need**."),
        "tense-and-agreement": intro("Keep verbs consistent", ["Match a verb to its subject.", "Keep changes of tense meaningful."], "Help a reader know who acts and when events take place.", "The basket of apples **is** on the table: the subject is one basket."),
        "proofreading-spelling-and-punctuation": intro("Check before you share", ["Check spelling, punctuation and meaning in separate passes."], "Catch small errors before they confuse the person reading your message.", "The **captain's** hat shows that the hat belongs to one captain."),
        dictation: intro("Remember and check a sentence", ["Listen for the whole message.", "Remember word order, spelling and punctuation."], "Record a short spoken message accurately. The quiz checks related spelling and punctuation; the challenge practises listening and writing together.", "After writing a sentence, **check its capital letter and ending**."),
      },
    },
    "reading---discussion-and-debate": {
      intro: intro("Discuss books thoughtfully", ["Explain a view with evidence.", "Listen and disagree courteously."], "Enjoy book discussions where different ideas are tested fairly and everyone is heard.", "**I see your point, but the final paragraph gives me a different impression.**"),
      topics: {
        "giving-reasons-for-your-views": intro("Explain why you think that", ["Link a view to relevant text evidence."], "Make a book discussion more useful than simply saying that something is good or bad.", "I think the fox is patient **because it waits quietly for hours**."),
        "challenging-views-courteously": intro("Disagree with care", ["Question an idea politely.", "Give evidence and leave room for a reply."], "Discuss different interpretations without attacking the person who holds a view.", "**Could the locked door suggest fear rather than anger?** invites another interpretation."),
      },
    },
  },
});
