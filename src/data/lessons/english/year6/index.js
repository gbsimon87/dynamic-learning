import { topicLessons as lesson, sentence as s, table as t, fix as f, steps } from "../../topicLessons.js";

import { YEAR6_SPELLING_ADVANCED_LESSONS } from "./spellingAdvancedPatterns.js";
import { YEAR6_READING_INTERPRETATION_LESSONS } from "./readingInterpretationAndComparison.js";

export const YEAR6_ENGLISH_LESSONS = {
  ...YEAR6_SPELLING_ADVANCED_LESSONS,
  ...YEAR6_READING_INTERPRETATION_LESSONS,
  "hyphens-in-words": lesson("Join the word parts clearly", [
    "A hyphen is a short joining line inside some words. It can show where a prefix joins a base word.",
    "Learn the prefix and the base word, then place the hyphen exactly at their join.",
  ], [
    s("See the join", "co- + operate → co-operate", "The hyphen comes after co- and before operate."),
    t("Sort by prefix", ["co-", "re-", "Another prefix"], [["co-ordinate", "re-enter", "pre-existing"], ["co-own", "re-elect", "non-existent"]], "The letters before the hyphen tell you which prefix starts the word."),
    f("Repair a misplaced join", "re-en-ter", "re-enter", "The prefix is re-; enter is the base word, so there is only one hyphen."),
    steps("Build the spelling", ["Find the prefix.", "Find the base word.", "Put one hyphen between the two parts and read the whole word."], "Not every prefixed word has a hyphen, so learn the familiar spelling and look closely at its word parts."),
  ]),
  "adding-endings-to-fer": lesson("Keep the stress in mind", [
    "When an ending starts with a vowel letter, listen for the strong beat in **-fer**.",
    "Double the r only when **-fer** is still stressed; otherwise keep the r already in the root.",
  ], [
    s("Hear the strong beat", "re-**FER** + ing → re**ferr**ing", "The -fer sound is still the strong beat, so another r is added."),
    t("Sort by the stress", ["Double the r", "Keep one r"], [["referring", "reference"], ["preferred", "preference"], ["transferred", "transference"]], "The endings change where the strong beat falls."),
    f("Build from visible parts", "refer + ence → referrence", "refer + ence → reference", "In reference, the strong beat has moved earlier in the word, so do not add another r."),
    steps("Check your spelling", ["Read the root and ending.", "Say the completed word aloud.", "Decide whether -fer is still the strong beat, then count the r letters."], "The rule helps with words in this family; it is not about making every word longer."),
  ]),
  "synonyms-and-antonyms": lesson("Same meaning or opposite?", [
    "**Synonyms** are words with a similar meaning, like big and large. **Antonyms** have an opposite meaning, like big and little.",
    "Say the new word beside the first one and decide: about the same, or the reverse?",
  ], [
    s("Match the meaning", "big → **large** (synonym) · big → **little** (antonym)", "Large means almost the same as big; little means the opposite."),
    t("Sort around one word", ["Similar to “cold”", "Opposite of “cold”"], [["chilly", "hot"], ["freezing", "warm"], ["icy", "boiling"]], "Every word is compared with the same headword, cold."),
    f("Swap for the opposite", "The quick fox crossed the field. → The rapid fox crossed the field.", "The quick fox crossed the field. → The slow fox crossed the field.", "Rapid is a synonym, so it keeps the meaning; slow is the antonym that reverses it."),
    steps("Find the odd one out", ["Read the headword.", "Check each word: same meaning or opposite?", "The word that does not match the others is the odd one out."], "Three words agree with the headword; one points the other way."),
  ]),
  "formal-and-informal-vocabulary": lesson("Match words to the situation", [
    "Formal writing usually uses precise language rather than chatty phrases.",
    "Choose words that suit your reader and purpose.",
  ], [
    s("Choose a precise word", "The team **discovered** a clue.", "Discovered is a formal alternative to found out."),
    t("Compare the register", ["Everyday speech", "Formal writing"], [["ask for", "request"], ["go in", "enter"], ["help", "assist"]], "The meanings match, but the formal choices suit a report or letter."),
    f("Improve a notice", "Visitors can go in through reception.", "Visitors should enter through reception.", "Enter is a more formal choice for a notice."),
    steps("Check the situation", ["Who will read this?", "What does the writing need to do?", "Choose the clearest register for that reader."], "Formal does not mean using long words everywhere; it means choosing suitable, clear words."),
  ]),
  "active-and-passive-voice": lesson("Choose what comes first", [
    "An active sentence starts with the doer. A passive sentence can start with the person or thing affected by the action.",
    "Both can be true. Choose the form that helps the reader notice the most important information first.",
  ], [
    s("Move the focus", "The storm damaged the bridge. → **The bridge was damaged by the storm.**", "The passive sentence puts the bridge first, so a report can focus on its condition."),
    t("Spot the first focus", ["Doer first (active)", "Affected thing first (passive)"], [["The artist painted the mural.", "The mural was painted by the artist."], ["The class collected the rubbish.", "The rubbish was collected by the class."]], "Look at the first noun to see what the sentence foregrounds."),
    f("Write a report", "The wind blew down the fence.", "The fence was blown down by the wind.", "For a report about damage, putting the fence first makes the focus clear."),
    steps("Choose the voice", ["Decide what the reader needs to notice first.", "Put that person or thing at the beginning.", "Use active or passive voice to make the focus clear."], "Passive voice does not make a sentence better every time; it changes the presentation."),
  ]),
  "formal-structures-and-the-subjunctive": lesson("Use a structure for the setting", [
    "Chatty speech often asks for agreement with a question tag, such as isn't it? Formal writing usually states the information directly.",
    "For formal imagined situations, use forms such as If I were, It is essential that… or Were they to…. ",
  ], [
    s("Make it formal", "The gates close at six, **don't they?** → The gates will close at six.", "The notice gives the information directly instead of asking the reader to agree."),
    t("Choose the setting", ["Chatty structure", "Formal structure"], [["This route is safe, isn't it?", "This route has been assessed as safe."], ["The meeting starts at four, okay?", "The meeting will begin at four."]], "Question tags are useful in conversation, but formal writing is usually more direct."),
    f("Use a subjunctive", "If I was the mayor, I would protect the park.", "If I were the mayor, I would protect the park.", "If I were is a familiar subjunctive form for an imagined situation."),
    steps("Check the structure", ["Think about the reader and purpose.", "Remove chatty question tags from formal writing.", "For a formal imagined or essential situation, look for the special subjunctive verb form."], "The subjunctive is for particular formal or imagined meanings, not every formal sentence."),
  ]),
  "expanded-noun-phrases-for-information": lesson("Pack useful detail around a noun", [
    "An expanded noun phrase starts with a noun and adds details that help a reader identify it precisely.",
    "Keeping related details together can explain complicated information clearly and concisely.",
  ], [
    s("Name the exact thing", "weather station → **the solar-powered weather station on the school roof**", "The extra details tell us exactly which weather station is being described."),
    t("Keep useful details", ["Part of the noun phrase", "Not needed for this noun"], [["solar-powered", "weather station"], ["on the school roof", "after lunch"]], "Choose details that identify or explain the noun, not an unrelated extra fact."),
    f("Make one clear phrase", "The weather station records rainfall. It is solar-powered and on the roof.", "The solar-powered weather station on the school roof records rainfall.", "The expanded noun phrase keeps all the identifying information together."),
    steps("Build a concise phrase", ["Find the main noun.", "Add details that identify it.", "Read the whole phrase: does every detail help the reader?"], "More words are not always better; keep only the details that make the information clearer."),
  ]),
};
