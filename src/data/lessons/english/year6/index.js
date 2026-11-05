import { topicLessons as lesson, sentence as s, table as t, fix as f, steps } from "../../topicLessons.js";

export const YEAR6_ENGLISH_LESSONS = {
  "adding-endings-to-fer": lesson("Keep the stress in mind", [
    "When an ending starts with a vowel letter, listen for the strong beat in **-fer**.",
    "Double the r only when **-fer** is still stressed; otherwise keep the r already in the root.",
  ], [
    s("Hear the strong beat", "re-**FER** + ing → re**ferr**ing", "The -fer sound is still the strong beat, so another r is added."),
    t("Sort by the stress", ["Double the r", "Keep one r"], [["referring", "reference"], ["preferred", "preference"], ["transferred", "transference"]], "The endings change where the strong beat falls."),
    f("Build from visible parts", "refer + ence → referrence", "refer + ence → reference", "In reference, the strong beat has moved earlier in the word, so do not add another r."),
    steps("Check your spelling", ["Read the root and ending.", "Say the completed word aloud.", "Decide whether -fer is still the strong beat, then count the r letters."], "The rule helps with words in this family; it is not about making every word longer."),
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
};
