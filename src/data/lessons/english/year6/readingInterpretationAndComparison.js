import { topicLessons as lesson, sentence as s, table as t, fix as f, steps } from "../../topicLessons.js";

const readingLesson = ({ title, idea, example, weak, check }) => lesson(title, [
  idea,
  "Read the evidence first, then explain only what the words support.",
], [
  s("Try one example", example, "The answer comes from the words that are actually on the page."),
  t("Sort responses", ["Uses the evidence", "Adds an unsupported idea"], [["points to a word or detail", "guesses without a clue"], ["explains what the detail shows", "changes the text's meaning"]], "A strong response can be traced back to the text."),
  f("Improve the response", weak, check, "The improved response stays close to the evidence instead of adding a new idea."),
  steps("Read like a detective", ["Read the relevant words twice.", "Underline a useful clue.", "Choose or build the response the clue supports."], "If an answer cannot be linked to the text, check it again."),
]);

export const YEAR6_READING_INTERPRETATION_LESSONS = {
  "exploring-meaning-in-context": readingLesson({
    title: "Use the words around it", idea: "Context means the words and events around an unfamiliar word. They can help you work out its meaning.",
    example: "The exhausted runner was **weary**. → weary means very tired.", weak: "Weary means excited.", check: "Weary means very tired.",
  }),
  "predicting-from-details": readingLesson({
    title: "Predict from clues", idea: "A prediction is a sensible idea about what may happen next. It needs a clue from the text.",
    example: "**Dark clouds gather and the wind rises.** → It may rain soon.", weak: "It will snow in summer.", check: "It may rain soon.",
  }),
  "summarising-across-paragraphs": readingLesson({
    title: "Join the big ideas", idea: "A summary gives the main idea from more than one paragraph, without listing every detail.",
    example: "**Beavers build dams; dams make ponds.** → Beavers change streams by building dams.", weak: "Beavers collect one branch.", check: "Beavers change streams by building dams.",
  }),
  "figurative-language-and-its-effect": readingLesson({
    title: "Picture the author's words", idea: "Figurative language makes a picture or feeling. Explain its effect instead of taking it literally.",
    example: "**The leaves danced.** → The leaves seem lively as they move.", weak: "Leaves have learned a dance.", check: "The leaves seem lively as they move.",
  }),
  "comparing-accounts-and-viewpoints": readingLesson({
    title: "Hear both viewpoints", idea: "When two writers describe the same event, compare what each notices and how each feels about it.",
    example: "**One calls a parade thrilling; one calls it too loud.** → They disagree about the noise.", weak: "Neither writer saw the parade.", check: "They disagree about the noise.",
  }),
  "themes-and-conventions": readingLesson({
    title: "Find big ideas and patterns", idea: "A theme is a big idea. A convention is a familiar feature readers often see in a type of writing.",
    example: "**A shy child speaks up for help.** → The theme is finding courage.", weak: "The theme is a blue jumper.", check: "The theme is finding courage.",
  }),
  "asking-questions-about-texts": readingLesson({
    title: "Ask questions that help", idea: "Helpful reading questions explore a reason, effect, meaning or prediction using details from the text.",
    example: "**Nico folds the map twice.** → Why did Nico fold it twice?", weak: "What colour are Nico's shoes?", check: "Why did Nico fold it twice?",
  }),
};
