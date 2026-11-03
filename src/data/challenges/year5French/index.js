import { buildTopic, TITLES } from "../topicBank.js";
import { withFigures } from "../figures.js";
import { TOPIC_VISUALS, FIGURE_RULES } from "./figures.js";
import { silentLetters, nasalSounds, accentsAndSoundPatterns } from "./sounds.js";
import { greetingsAndFamily, numbersTo100, daysMonthsAndWeather, foodAndOrdering, schoolAndTown, hobbiesAndOpinions, clothesAndColours } from "./words.js";
import { genderAndArticles, adjectives, beHaveGoDo, erVerbs, negativesAndQuestions } from "./grammar.js";
import { readingShortTexts, buildingSentences } from "./reading.js";

/** Topic id (toKebabCase of the topic name in year5FrenchCurriculum.js) -> its question bank. */
const AUTHORED = {
  "silent-letters-and-liaison": silentLetters,
  "nasal-sounds": nasalSounds,
  "accents-and-sound-patterns": accentsAndSoundPatterns,
  "greetings-and-family": greetingsAndFamily,
  "numbers-to-100": numbersTo100,
  "days-months-and-weather": daysMonthsAndWeather,
  "food-and-ordering": foodAndOrdering,
  "school-and-town": schoolAndTown,
  "hobbies-and-opinions": hobbiesAndOpinions,
  "clothes-and-colours": clothesAndColours,
  "gender-articles-and-plurals": genderAndArticles,
  "adjectives-agreement-and-position": adjectives,
  "be-have-go-and-do": beHaveGoDo,
  "verbs-ending-in-er": erVerbs,
  "saying-no-and-asking-questions": negativesAndQuestions,
  "reading-short-texts": readingShortTexts,
  "building-and-translating-sentences": buildingSentences,
};
// Every topic carries `visual`: its start-screen picture, also copied onto its level 1 questions.
export const YEAR5_FRENCH_TOPICS = Object.fromEntries(Object.entries(AUTHORED).map(([id, topic]) => [id, { ...topic, visual: TOPIC_VISUALS[id] }]));
export const YEAR5_FRENCH_BUILDERS = Object.fromEntries(Object.entries(YEAR5_FRENCH_TOPICS).map(([id, topic]) => [id, withFigures(buildTopic(topic), FIGURE_RULES[id], topic.visual)]));
export { FIGURE_RULES as YEAR5_FRENCH_FIGURE_RULES };
export const YEAR5_FRENCH_TITLES = TITLES;
