import { lesson as l, sort as s, order as o, topic } from "./authoring.js";
export const howTheGreatFireStartedAndSpread = topic([
 "https://www.london-fire.gov.uk/museum/history-and-stories/the-great-fire-of-london/",
 "https://www.rmg.co.uk/stories/royal-history/curatorial/londons-burning-samuel-pepys-great-fire-london",
], [
 l(["The Great Fire began in a Pudding Lane bakery.", "It was September 1666, in London.", "Dry weather, wind and close wooden houses helped it spread.", "The main fire lasted about four days."], "🔥", "a flame", [
 ["Where did the fire begin?", "a bakery", "a school", "a palace", "Pudding Lane bakery"],
 ["Which street does Bix name?", "Pudding Lane", "Baker Street", "Downing Street", "Pudding Lane"],
 ["Which city was it in?", "London", "Paris", "York", "in London"],
 ["Which month was it?", "September", "January", "June", "September"],
 ["About how long did the main fire last?", "four days", "one minute", "four years", "about four days"],
 ["What helped spread the flames?", "wind", "heavy rain", "snow", "wind",],
 ], s("Helped the fire spread, or not?", ["Helped spread", "Did not help spread"], [["dry weather",0],["wind",0],["close wooden houses",0],["heavy rain",1]], ["Dry weather, wind and close wooden houses"])),
 l(["First, fire started in the bakery.", "Next, wind carried flames to nearby wooden houses.", "People escaped with things they could carry.", "Finally, the wind dropped and the main fire died down."], "🏃", "a person leaving danger", [
 ["What happened first?", "fire started in the bakery", "London was rebuilt", "the main fire died down", "First"],
 ["What carried flames onwards?", "wind", "snow", "rain", "wind carried flames"],
 ["Where did the flames spread?", "nearby wooden houses", "the Moon", "only empty fields", "nearby wooden houses"],
 ["What did people do?", "escaped", "stayed to play", "made the wind stronger", "People escaped"],
 ["What did people take?", "things they could carry", "whole streets", "whole buildings", "things they could carry"],
 ["What changed near the end?", "the wind dropped", "the wind became much stronger", "the bakery was built first", "wind dropped"],
 ], o("Put the fire's story in order.", ["fire starts in the bakery", "flames spread to houses", "the main fire dies down"], ["First", "Next", "Finally"])),
 l(["Samuel Pepys wrote about the fire in his diary.", "He saw people leaving with their belongings.", "His words give one person's view.", "Other accounts help us check the story.", "A diary cannot show what every person saw."], "📖", "a diary", [
 ["Who wrote the diary?", "Samuel Pepys", "Tim Berners-Lee", "William Caxton", "Samuel Pepys"],
 ["What did Pepys see people doing?", "leaving with belongings", "making video calls", "flying helicopters", "people leaving with their belongings"],
 ["How many people's views does his diary give?", "one person's view", "every person's view", "nobody's view", "one person's view"],
 ["What helps us check his story?", "other accounts", "throwing sources away", "guessing", "Other accounts"],
 ["What cannot one diary show?", "what every person saw", "its own written words", "one person's view", "cannot show what every person saw"],
 ["Which is a source of written evidence?", "a diary", "a blank bucket", "a modern hose", "his diary"],
 ["Which question could this diary help answer?", "What did Pepys see?", "What did every Londoner think?", "What will happen tomorrow?", "He saw"],
 ]),
 l(["Wooden houses close together helped flames spread.", "People lost many homes and had to rebuild.", "Today, firefighters have engines and hoses.", "Firefighters help people stay safe.", "We learn why fire safety matters."], "🚒", "a fire engine", [
 ["Why did close wooden houses matter?", "flames could spread", "wood could never burn", "they made rain", "helped flames spread"],
 ["What did people lose?", "many homes", "nothing", "only phone boxes", "lost many homes"],
 ["What did people need to do?", "rebuild", "stop all building", "forget the fire", "had to rebuild"],
 ["What equipment do firefighters have today?", "engines and hoses", "only hats", "paper fans only", "engines and hoses"],
 ["What do firefighters help people do?", "stay safe", "spread flames", "lose their homes", "stay safe"],
 ["Why remember the fire?", "to learn about fire safety", "to make fires bigger", "to forget people's homes", "fire safety matters"],
 ], s("Help safety, or make spread easier?", ["Helps safety", "Helps spread"], [["firefighters with hoses",0],["fire engines",0],["close wooden houses",1],["flames reaching nearby wood",1]], ["helped flames spread", "engines and hoses", "stay safe"])),
]);

howTheGreatFireStartedAndSpread.levels[2].story.lines.push("It happened long, long ago.");
howTheGreatFireStartedAndSpread.banks.facts2[5] = {
  type: "choice", prompt: "Which time band holds this event?",
  answer: "Long, long ago", wrong: ["About 100 years ago", "Today"],
  answeredBy: "long, long ago", hint: "Find the event on the time bands in Bix's story.",
};
