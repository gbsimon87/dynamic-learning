import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["The moon was a silver boat sailing through the clouds.", "It helps the reader picture the moon moving across the sky.", "It tells the reader the moon is a real boat.", "It explains how to sail a boat."],
  ["The leaves danced in the autumn wind.", "It makes the moving leaves seem lively.", "It says leaves can choose music.", "It proves the wind has stopped."],
  ["Her voice was as soft as a feather.", "It helps the reader imagine a very quiet voice.", "It says her voice was made of feathers.", "It makes the voice sound angry."],
  ["The alarm screamed through the silent corridor.", "It makes the alarm sound sharp and startling.", "It says the alarm is a person.", "It makes the corridor noisy all day."],
  ["Rain drummed on the roof.", "It helps the reader hear a repeated tapping sound.", "It says someone played drums indoors.", "It makes the rain seem warm."],
  ["The city woke slowly at dawn.", "It makes the city seem alive as people begin moving.", "It says buildings sleep in beds.", "It shows the city disappeared."],
  ["The classroom was a zoo after lunch.", "It suggests the classroom was noisy and busy.", "It says animals were studying there.", "It suggests everyone was asleep."],
  ["The river curled around the hill like a ribbon.", "It helps the reader picture the river's winding shape.", "It says the river is made from cloth.", "It shows the river is straight."],
  ["Stars winked above the campsite.", "It makes the stars seem playful and bright.", "It says stars have eyes.", "It makes the night seem cloudy."],
  ["The icy wind bit her cheeks.", "It makes the cold feel painful and sharp.", "It says the wind has teeth.", "It shows the weather is hot."],
  ["The old house groaned in the storm.", "It gives the house a tired, uneasy feeling.", "It says the house can speak words.", "It makes the storm sound gentle."],
  ["His thoughts raced like cars on a track.", "It shows he was thinking very quickly.", "It says he was driving a car.", "It shows he had no ideas."],
  ["The sun spilled gold across the field.", "It helps the reader imagine bright golden light.", "It says the sun dropped coins.", "It makes the field seem dark."],
  ["The thunder was a giant's growl.", "It makes the thunder sound powerful and threatening.", "It says a giant is hiding in the clouds.", "It makes thunder sound tiny."],
  ["Hope was a small flame in the dark.", "It suggests a little hope remained in a difficult time.", "It says hope can burn a room.", "It shows there was no hope at all."],
].map(([language, answer, ...wrong]) => ({ prompt: `What effect does this figurative language have? “${language}”`, answer, wrong }));

export const { topic, build: buildFigurativeLanguageAndItsEffect } = buildReadingTopic({
  rule: "Figurative language creates pictures and feelings. Explain its effect, rather than taking every word literally.",
  hint: "Imagine the picture the author creates. What does it make the scene feel or sound like?", items,
});
