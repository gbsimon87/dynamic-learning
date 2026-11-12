import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const note = (title, learn, use, text) => ({ title, learn, use, ex: text.replaceAll("**", ""),
  model: { renderer: "lesson", alt: text.replaceAll("**", ""), data: { type: "sentence", title: "A useful example", text } } });

export default defineIntroductions({ year: 6, subject: "english",
  subjectIntro: note("Welcome to Year 6 English", ["Explain interpretations using evidence and compare different viewpoints.", "Choose vocabulary, sentence structures and punctuation precisely.", "Write and edit for a particular reader and purpose."],
    "Use language to question information, enjoy demanding books and communicate your own ideas clearly.", "The bridge **was repaired** last week: this sentence makes the bridge, rather than the repairers, the focus."),
  quests: {
    "spelling---advanced-patterns": {
      intro: note("Investigate tricky spellings", ["Use stress and word parts to choose endings.", "Distinguish words that look or sound similar."], "Spell important words accurately in reports, explanations and everyday messages.", "We **referred** to a reference book: the ending changes the stress and the number of r letters."),
      topics: {
        "adding-endings-to-fer": note("Listen to the stress", ["Double r after fer when that syllable remains stressed.", "Notice when an ending shifts the stress."], "Choose referring but reference when writing about sources.", "pre**FER** becomes preferred, but preference has its main stress earlier."),
        "hyphens-in-words": note("Show where word parts join", ["Recognise familiar hyphenated words.", "Place a hyphen at the prefix–root join."], "Make words such as re-enter and co-own easy to read.", "To **re-enter** is to enter again; the hyphen separates re and enter."),
        "the-letter-string-ough": note("One spelling, several sounds", ["Recognise different pronunciations of ough.", "Learn its familiar words as whole spellings."], "Read unfamiliar sentences without assuming ough always sounds the same.", "**Rough** rhymes with tough, but through rhymes with blue."),
        "confusing-word-pairs": note("Choose a word by meaning", ["Distinguish similar words using their meanings and jobs."], "Avoid changing your message accidentally when writing a report or giving advice.", "A **stationary** car stays still; stationery means writing materials."),
        "year-6-word-list-part-1": note("Remember useful spellings", ["Check the less obvious parts of important words.", "Use word families and specific reminders."], "Write subjects, explanations and personal messages accurately.", "**Necessary** has one c and two s letters."),
        "year-6-word-list-part-2": note("Check another group of tricky words", ["Remember spellings that sound alone cannot predict.", "Notice unusual letter sequences."], "Proofread familiar vocabulary rather than trusting a first guess.", "A **queue** is a line of people waiting; most of its written vowels are not separately heard."),
      },
    },
    "reading---interpretation-and-comparison": {
      intro: note("Read between and across the lines", ["Use context and evidence to interpret a text.", "Compare accounts and follow themes across books.", "Ask questions that improve understanding."], "Judge what a writer suggests and explain how a different reader might interpret it.", "A crowd **surged** towards the gate: nearby words suggest a sudden forward movement."),
      topics: {
        "exploring-meaning-in-context": note("Let the sentence help", ["Use surrounding details to decide which meaning of a word fits."], "Understand a familiar word used in a new way without choosing the first dictionary meaning.", "The path was **steep**, so we stopped often to catch our breath."),
        "predicting-from-details": note("Predict from evidence", ["Use stated and implied clues.", "Keep a prediction plausible without treating it as certain."], "Explain what may happen next in a story and why you expect it.", "The sky darkened and thunder rolled; **rain may be coming**."),
        "summarising-across-paragraphs": note("Connect the main ideas", ["Find the important idea in each paragraph.", "Combine them without losing the overall meaning."], "Explain an article or story briefly to someone who has not read it.", "A team plans a garden, plants it and shares its food: **the story follows a community gardening project**."),
        "figurative-language-and-its-effect": note("Explain a writer's picture", ["Recognise non-literal comparisons.", "Explain how they affect the reader's impression."], "Understand why a description feels threatening, joyful or calm.", "The storm **swallowed the little boat** suggests that it was overwhelmed, not literally eaten."),
        "comparing-accounts-and-viewpoints": note("See another viewpoint", ["Compare details in different accounts of the same event.", "Distinguish agreement from different emphasis."], "Think critically when reports or witnesses describe an event differently.", "A performer calls the show **thrilling**; a neighbour describes the same evening as noisy."),
        "themes-and-conventions": note("Find a bigger idea", ["Identify themes running through events.", "Recognise familiar features of a genre."], "Compare books beyond their characters' names and decide what kinds of reading you enjoy.", "A story about returning a lost purse can explore **honesty**, not just a purse."),
        "asking-questions-about-texts": note("Ask to understand more", ["Choose questions that clarify a detail, inference or word meaning."], "Resolve a confusing part of a book and make discussion more thoughtful.", "**Why does the character hide the letter?** asks about a motive the text may help explain."),
      },
    },
    "grammar---formal-language-and-sentence-choices": {
      intro: note("Choose how a sentence works", ["Match words and structures to the situation.", "Choose a focus using active and passive voice.", "Pack useful information into noun phrases."], "Communicate accurately in a friendly message, a formal request or an information report.", "The team collected the rubbish. **The rubbish was collected by the team.** The focus changes."),
      topics: {
        "formal-and-informal-vocabulary": note("Match words to the occasion", ["Recognise vocabulary suitable for formal or informal communication."], "Write to a friend differently from writing a public notice or an application.", "Please **contact** the office is more formal than Give the office a ring."),
        "synonyms-and-antonyms": note("Related and opposite meanings", ["Choose synonyms and antonyms that fit the context."], "Avoid repetition or express a contrast without changing your intended meaning.", "A **rapid** movement is a quick movement; its opposite might be slow."),
        "active-and-passive-voice": note("Change the sentence's focus", ["Recognise who does an action and who or what receives it.", "Compare active and passive presentations."], "Put the important person, event or object first in a report.", "The artist painted the mural. **The mural was painted by the artist.**"),
        "formal-structures-and-the-subjunctive": note("Structures for formal meanings", ["Recognise formal sentence choices.", "Use subjunctive forms for particular imagined or required situations."], "Make a formal suggestion, express an imagined possibility or state a requirement.", "**If I were** the mayor, I would protect the park."),
        "expanded-noun-phrases-for-information": note("Give precise information", ["Add relevant detail around a noun.", "Keep the phrase clear and concise."], "Identify exactly which object or person you mean without writing several repetitive sentences.", "**The solar-powered weather station on the roof** records rainfall."),
      },
    },
    "grammar---cohesion-layout-and-punctuation": {
      intro: note("Guide a reader through your ideas", ["Link ideas and organise information.", "Use punctuation to show relationships and avoid ambiguity."], "Make longer explanations and reports easy to navigate without losing their meaning.", "The gate was locked; **we used the side entrance**. Both clauses could stand alone."),
      topics: {
        "cohesive-devices-across-paragraphs": note("Build links across a text", ["Use references, repeated ideas and connecting expressions.", "Choose a link that matches the relationship."], "Help a reader follow a contrast, a continuing argument or a change of time.", "One paragraph gives an advantage. **On the other hand,** introduces a contrasting point."),
        ellipsis: note("Leave out what is understood", ["Recognise omitted words that the reader can recover from context."], "Avoid unnecessary repetition while keeping your meaning clear.", "I can play the flute, and Maya **can too**. The words play the flute are understood."),
        "layout-devices": note("Organise information visually", ["Choose headings, subheadings, columns, lists or tables for a purpose."], "Help a reader locate and compare information quickly.", "A table with **Day** and **Opening time** columns makes a weekly schedule easy to check."),
        "semicolons-colons-and-dashes": note("Link independent clauses", ["Use punctuation to show a relationship between clauses that can stand alone."], "Connect related ideas and explain or emphasise a point in your writing.", "The path was flooded; **we turned back**."),
        "punctuation-in-lists": note("Make complex lists clear", ["Use a colon to introduce a list after a suitable clause.", "Use semicolons to separate complex list items."], "Write lists where extra detail or commas inside an item might confuse a reader.", "We packed **three essentials: water, food and a map**."),
        "bullet-point-punctuation": note("Keep bullet points consistent", ["Punctuate full-sentence and fragment lists consistently."], "Make instructions and information lists look orderly and read clearly.", "A full-sentence bullet can read **Bring a notebook.** It begins with a capital and ends with a full stop."),
        "hyphens-to-avoid-ambiguity": note("Hyphens can clarify meaning", ["Explain how joining words changes the way a phrase is read."], "Make sure a reader interprets a description as you intend.", "A **man-eating shark** is a shark that eats people, not a man eating a shark."),
      },
    },
    "writing---composition-and-editing": {
      intro: note("Shape and refine your writing", ["Write for a reader and purpose.", "Summarise accurately, choose sentence focus and edit for effect."], "Produce clear reports, thoughtful arguments and engaging writing that says exactly what you intend.", "A report about a damaged bridge may begin **The bridge was damaged during the storm**."),
      topics: {
        "formal-register-for-audience-and-purpose": note("Choose a register", ["Match tone and structures to a reader and purpose."], "Make a request appropriately to an organisation while keeping friendly messages natural.", "**I would be grateful if you could explain the decision** suits a formal enquiry."),
        "precising-longer-passages": note("Say more in fewer words", ["Retain the main idea and important supporting details.", "Remove repetition without changing facts."], "Make concise research notes or explain a longer text to someone else.", "The volunteers planted trees and returned weekly to water them becomes **Volunteers planted and cared for trees**."),
        "passive-voice-in-writing": note("Put the important thing first", ["Choose a passive sentence when its focus suits the writing."], "Report an event when its effect matters more than naming the person who caused it.", "**The window was broken overnight** focuses on the damage when the doer is unknown."),
        "subjunctive-forms-in-writing": note("Express wishes and requirements", ["Choose an appropriate subjunctive form in a formal or imagined situation."], "Write a formal recommendation or describe an unreal possibility precisely.", "The committee recommends that each visitor **be** accompanied by an adult."),
        "proofreading-for-clarity-and-effect": note("Read like an editor", ["Check accuracy, meaning and intended effect.", "Change only what improves the writing."], "Catch confusing references, punctuation errors and unnecessary repetition before sharing a piece.", "Jo told Kim that she had won is unclear; **Jo said, 'Kim, you have won.'** names the winner."),
        "year-6-dictation": note("Listen, remember and check", ["Retain the words, order and punctuation of a spoken sentence."], "Record a message accurately. The sound-off quiz checks related spelling and editing choices; the challenge combines listening with writing.", "After writing, **check word order as well as individual spellings**."),
      },
    },
  },
});
