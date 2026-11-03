import { rule } from "../figures.js";
import { PICTURE_OF } from "./words.js";
import { NOUN_PICTURE } from "./grammar.js";

// Pictures for Year 5 French. A topic visual shows on the start screen and on level 1, where
// the questions ask what a French word means, so topic pictures show a place or an idea and
// never a word with its meaning. A question picture may show what the ENGLISH in the question
// says, never the French answer.
const spread = (emojis) => {
  const n = emojis.length;
  const size = n === 1 ? 100 : n === 2 ? 84 : 72;
  const xs = n === 1 ? [200] : n === 2 ? [130, 270] : [90, 200, 310];
  return emojis.map((e, i) => [e, xs[i], 118, size]);
};
const scene = (alt, emojis, extra = {}) => ({ type: "scene", backdrop: "plain", alt, items: spread(emojis), caption: "", ...extra });
const place = (backdrop, alt, items, caption = "") => ({ type: "scene", backdrop, alt, items, caption });
const chat = (phrase) => ({
  type: "scene", backdrop: "room", caption: "",
  alt: `Two people are talking. One of them says: ${phrase}`,
  items: [["🧑", 100, 188, 64], ["🧒", 300, 188, 64]],
  bubbles: [{ x: 170, y: 72, text: phrase, tail: "bl", max: 20 }, { x: 305, y: 116, text: "…", tail: "br", w: 64 }],
});
const chatting = (alt) => ({ type: "scene", backdrop: "room", caption: "", alt, items: [["🧑", 100, 188, 64], ["🧒", 300, 188, 64], ["💬", 200, 110, 54]] });

const sayRule = rule(/^How do you say \*\*(.+?)\*\* in French\?/, (q, m) => (PICTURE_OF[m[1]] ? scene(`A picture for ${m[1]}.`, [PICTURE_OF[m[1]]]) : null), [2]);

/** English sentence -> pictures that show what it says (colour sentences are left out: an emoji's colour is fixed). */
const SENTENCES = {
  "My name is Léa.": ["🧒", "🏷️"], "What are you called?": ["🧒", "❓"], "I am ten years old.": ["🎂", "🔟"], "I live in London.": ["🏠", "🎡"],
  "Here is my mother.": ["👩"], "Here is my father.": ["👨"], "I have a brother.": ["👦"], "I have a sister.": ["👧"], "The baby is called Louis.": ["👶"],
  "My grandmother is small.": ["👵"], "My aunt lives in Paris.": ["👩", "🗼"],
  "Today is Monday.": ["📅"], "My birthday is in May.": ["🎂", "🌸"], "It is hot in summer.": ["🏖️", "🥵"], "It snows in winter.": ["❄️", "⛄"],
  "It is cold in January.": ["🥶", "❄️"], "Today the weather is nice.": ["🌤️"], "It is windy today.": ["💨"], "On Saturdays I play football.": ["📅", "⚽"],
  "It is sunny in July.": ["☀️"], "It is foggy in autumn.": ["🌫️", "🍂"], "In spring it rains.": ["🌷", "🌧️"], "On Sundays I am at home.": ["🏠"],
  "I would like a cake, please.": ["🍰", "🙏"], "I would like some water, please.": ["💧", "🙏"], "I would like some bread.": ["🥖"], "I would like an ice cream.": ["🍦"],
  "I am eating an apple.": ["🍎"], "I like chocolate.": ["🍫", "🙂"], "I do not like fish.": ["🐟", "🚫"], "The chicken is good.": ["🍗", "👍"],
  "I drink some milk.": ["🥛"], "Do you want some chips?": ["🍟", "❓"], "The bill, please.": ["🧾"], "How much is it?": ["💶", "❓"], "I am having a banana.": ["🍌"],
  "I have a pen in my pencil case.": ["🖊️", "👝"], "The book is in the bag.": ["📖", "🎒"], "I like maths.": ["🔢", "🙂"], "The library is on the left.": ["📚", "⬅️"],
  "The swimming pool is on the right.": ["🏊", "➡️"], "Go straight on.": ["⬆️"], "Turn left.": ["⬅️"], "The park is near the school.": ["🌳", "🏫"],
  "The post office is next to the station.": ["📮", "🚉"], "The cinema is opposite the park.": ["🎬", "🌳"], "Where is the swimming pool?": ["🏊", "❓"],
  "I like playing football.": ["⚽", "🙂"], "I love reading.": ["📖", "❤️"], "I hate swimming.": ["🏊", "😠"], "I do not like drawing.": ["🎨", "🚫"],
  "He likes cycling.": ["🚴", "🙂"], "She loves singing.": ["🎤", "❤️"], "We like playing tennis.": ["🎾", "🙂"], "My brother plays the piano.": ["🎹"],
  "My sister does dance.": ["💃"], "I play the guitar.": ["🎸"], "I watch TV in the evening.": ["📺", "🌆"], "I listen to music.": ["🎧"], "Do you like cooking?": ["🍳", "❓"],
  "I am wearing blue trousers.": ["👖"], "He is wearing a black hat.": ["🎩"], "What is your favourite colour?": ["🎨", "❓"],
  "I eat bread.": ["🥖"], "She plays tennis.": ["🎾"], "We live in London.": ["🏠", "🎡"], "He has a small dog.": ["🐕"], "Do you like apples?": ["🍎", "❓"],
  "My sister is tall.": ["👧", "📏"], "The cat does not eat fish.": ["🐱", "🐟", "🚫"], "They go to the swimming pool.": ["🚶", "🏊"], "You are in the garden.": ["🌳", "🧍"],
  "Where is your house?": ["🏠", "❓"], "It is cold in winter.": ["🥶", "❄️"], "We watch TV in the evening.": ["📺", "🌆"], "I do not like maths.": ["🔢", "🚫"],
  "The bakery is near the park.": ["🥖", "🌳"], "They sing well.": ["🎤", "🎶"], "It is sunny today.": ["☀️"],
};
const englishOf = (prompt = "") => (prompt.match(/^(?:Put the French sentence in order|Build the French for|How do you say it in French\?):? \*\*(.+?)\*\*/) ?? [])[1];
const sentenceRule = (levels) => rule((q) => Boolean(SENTENCES[englishOf(q.prompt)]), (q) => scene(`A picture for: ${englishOf(q.prompt)}`, SENTENCES[englishOf(q.prompt)]), levels);

const SCHOOL_TITLES = {
  Léa: "👧", "Ma famille": "🏠", "Aujourd'hui": "📅", "Au café": "☕", "À l'école": "🏫", "Mon frère Paul": "👦", "Ma ville": "🏙️", "Les saisons": "🍂",
  "À la maison": "🏠", "Mon anniversaire": "🎂", "Ma journée": "🌤️", "Le temps": "🌦️", "Une lettre": "✉️", "Au restaurant": "🍽️", "Le journal du temps": "📓",
  "Pour aller à la bibliothèque": "🗺️", "Nous sommes quatre": "👨‍👩‍👧‍👦",
};

const DAYS = ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"];
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
const nounEmoji = (text) => Object.entries(NOUN_PICTURE).find(([en]) => new RegExp(`\\b${en}\\b`).test(text));

export const TOPIC_VISUALS = {
  "silent-letters-and-liaison": place("plain", "A face with a finger on its lips, saying shh.", [["🤫", 200, 120, 100]], "Some letters in French are not said out loud."),
  "nasal-sounds": place("plain", "A nose and a speaker. Some French sounds come through the nose.", [["👃", 140, 120, 90], ["🔊", 270, 120, 70]], "Some French sounds come through your nose."),
  "accents-and-sound-patterns": place("plain", "A pencil and an open book.", [["✏️", 140, 120, 80], ["📖", 270, 120, 90]], "Accents and letter patterns change the sound."),
  "greetings-and-family": place("room", "Two friends meet in a house.", [["🧑‍🤝‍🧑", 200, 135, 100], ["🏡", 340, 130, 60]], "Meeting people in French."),
  "numbers-to-100": place("plain", "An abacus and a pile of numbers.", [["🧮", 140, 120, 90], ["🔢", 270, 120, 80]], "Counting in French."),
  "days-months-and-weather": place("sky", "A calendar and a sky with sun and cloud.", [["📅", 130, 130, 90], ["🌦️", 280, 110, 90]], "Days, months and weather."),
  "food-and-ordering": place("street", "A waiter at a café with a table and chairs.", [["🧑‍🍳", 140, 135, 80], ["🪑", 250, 160, 56], ["🍽️", 330, 160, 50]], "At a French café."),
  "school-and-town": place("street", "A pupil walking along a street in a town.", [["🧑‍🎓", 200, 150, 90]], "Around school and town."),
  "hobbies-and-opinions": place("plain", "A smiling face thinking.", [["🙂", 150, 130, 100], ["💭", 280, 90, 80]], "Saying what you like."),
  "clothes-and-colours": place("plain", "A mirror and some shopping bags.", [["🪞", 140, 120, 90], ["🛍️", 270, 130, 90]], "Clothes and colours."),
  "gender-articles-and-plurals": place("plain", "Two wrapped presents and a single present.", [["🎁", 130, 130, 80], ["📦", 280, 130, 80]], "Little words in front of nouns."),
  "adjectives-agreement-and-position": place("plain", "A magnifying glass and a paint palette.", [["🔍", 140, 120, 90], ["🎨", 270, 120, 90]], "Words that describe."),
  "be-have-go-and-do": place("street", "A person walking along a street.", [["🚶", 150, 150, 90], ["💬", 290, 110, 70]], "Four important verbs."),
  "verbs-ending-in-er": place("plain", "A person speaking, and music.", [["🗣️", 150, 120, 90], ["🎶", 280, 120, 80]], "Verbs that end in -er."),
  "saying-no-and-asking-questions": place("plain", "A question mark and a person shaking their head.", [["❓", 140, 120, 90], ["🙅", 270, 120, 90]], "Saying no and asking questions."),
  "reading-short-texts": place("plain", "An open book.", [["📖", 200, 120, 110]], "Reading short French texts."),
  "building-and-translating-sentences": place("plain", "A jigsaw puzzle piece and a notepad.", [["🧩", 140, 120, 90], ["📝", 270, 120, 90]], "Building sentences piece by piece."),
};

const askRule = rule(/^Someone asks \*\*(.+?)\*\*/, (q, m) => chat(m[1]));

export const FIGURE_RULES = {
  "silent-letters-and-liaison": [
    rule(/^Which sound joins the two words in \*\*(.+?)\*\*/, (q, m) => ({ type: "liaison", phrase: m[1], alt: `The two words ${m[1].split(" ").join(" and ")} with a link between them. A question mark stands for the sound that joins them.`, caption: "" })),
    rule(/^How do you hear the difference between \*\*(.+?)\*\* and \*\*(.+?)\*\*/, (q, m) => ({ type: "scene", backdrop: "plain", alt: `The words ${m[1]} and ${m[2]} side by side, with an ear to listen.`, caption: "", items: [["👂", 200, 175, 54]], bubbles: [{ x: 110, y: 80, text: m[1], tail: "none", w: 130 }, { x: 290, y: 80, text: m[2], tail: "none", w: 130 }] })),
  ],
  "nasal-sounds": [
    rule(/^Which word has the \*\*(\w+)\*\* sound, as in \*\*(\w+)\*\*/, (q, m) => ({ type: "scene", backdrop: "plain", alt: `A nose. The ${m[1]} sound, as in ${m[2]}, comes through the nose.`, caption: "", items: [["👃", 120, 125, 90]], bubbles: [{ x: 280, y: 110, text: `${m[1]} as in ${m[2]}`, tail: "bl", max: 16 }] })),
  ],
  "greetings-and-family": [
    sayRule,
    askRule,
    rule(/^Put this chat in order/, chatting("Two people having a chat.")),
    rule(/^You are leaving/, place("room", "A person at the door, ready to leave.", [["🚪", 280, 130, 100], ["🧍", 130, 160, 70]])),
  ],
  "numbers-to-100": [
    rule(/^\*\*(.+?)\*\* plus \*\*(.+?)\*\* equals/, (q, m) => ({ type: "calc", a: m[1], b: m[2], op: "+", alt: `A sum: ${m[1]} plus ${m[2]}. The answer is left blank.`, caption: "" })),
    rule(/^\*\*(.+?)\*\* moins \*\*(.+?)\*\* \(take away\)/, (q, m) => ({ type: "calc", a: m[1], b: m[2], op: "−", alt: `A sum: ${m[1]} take away ${m[2]}. The answer is left blank.`, caption: "" })),
    rule(/^Un livre coûte \*\*(.+?)\*\* euros/, (q, m) => ({ type: "scene", backdrop: "plain", alt: `A book with a price tag: ${m[1]} euros.`, caption: "", items: [["📖", 130, 125, 100]], bubbles: [{ x: 290, y: 118, text: `${m[1]} euros`, tail: "bl", max: 14 }] })),
    rule(/^Tom dit : « J'ai \*\*(.+?)\*\* billes/, (q, m) => ({ type: "scene", backdrop: "plain", alt: `Tom says: J'ai ${m[1]} billes.`, caption: "", items: [["🧒", 110, 170, 70], ["🔮", 300, 170, 50]], bubbles: [{ x: 200, y: 70, text: `J'ai ${m[1]} billes.`, tail: "bl", max: 18 }] })),
    rule(/^La page \*\*(.+?)\*\*/, (q, m) => ({ type: "scene", backdrop: "plain", alt: `An open book. The page number is written ${m[1]}.`, caption: "", items: [["📖", 130, 125, 100]], bubbles: [{ x: 290, y: 118, text: `la page ${m[1]}`, tail: "bl", max: 14 }] })),
  ],
  "days-months-and-weather": [
    rule(/^Which day comes after \*\*(.+?)\*\*/, (q, m) => ({ type: "strip", from: m[1], total: 7, at: DAYS.indexOf(m[1]), alt: `The day ${m[1]}, an arrow, and a card with a question mark for the next day. Seven dots stand for the days of the week.`, caption: "" })),
    rule(/^Which month comes after \*\*(.+?)\*\*/, (q, m) => ({ type: "strip", from: m[1], total: 12, at: MONTHS.indexOf(m[1]), alt: `The month ${m[1]}, an arrow, and a card with a question mark for the next month. Twelve dots stand for the months of the year.`, caption: "" })),
    sayRule,
    rule(/^Put the (days|months|seasons) in order/, place("plain", "A calendar page.", [["📅", 200, 120, 110]])),
    sentenceRule([3, 4]),
  ],
  "food-and-ordering": [
    sayRule,
    rule(/^(You want to ask for the bill|How do you ask how much something costs|Which sentence is a polite way to ask)/, place("street", "A customer at a café counter talking to a waiter.", [["🧑", 110, 160, 70], ["🧑‍🍳", 290, 160, 70], ["☕", 200, 190, 44]])),
    rule(/^Put this café chat in order/, chatting("A customer and a waiter having a chat.")),
    sentenceRule([3, 4]),
  ],
  "school-and-town": [
    sayRule,
    rule(/^Someone says \*\*(.+?)\*\* Which way do you go/, (q, m) => ({ type: "junction", phrase: m[1], alt: `A crossroads seen from above with a person standing at the bottom. The person hears: ${m[1]} The roads are not labelled.`, caption: "" })),
    rule(/^Where do you go to/, place("street", "A person standing in a street in a town, wondering where to go.", [["🧍", 200, 150, 70], ["❓", 290, 100, 50]])),
    rule(/^Put this conversation in order/, chatting("Two people having a conversation about the way.")),
    sentenceRule([3, 4]),
  ],
  "hobbies-and-opinions": [
    sayRule,
    rule(/^Put the opinions in order, from love to hate/, { type: "scene", backdrop: "plain", alt: "A heart on the left for love and an angry face on the right for hate, with an arrow between them.", caption: "", items: [["❤️", 80, 110, 70, "love"], ["😠", 320, 110, 70, "hate"]], arrows: [[130, 110, 270, 110]] }),
    sentenceRule([3, 4]),
  ],
  "clothes-and-colours": [
    sayRule,
    sentenceRule([3, 4]),
  ],
  "gender-articles-and-plurals": [
    rule(/^How do you say \*\*(?:a|an|two) (.+?)\*\*\?/, (q) => { const found = nounEmoji(q.prompt); return found ? scene(`${found[1][1] === 2 ? "Two" : "One"} ${found[0]}.`, Array(found[1][1]).fill(found[1][0])) : null; }),
    rule(/^Choose the French for: \*\*I have (?:a|an) (.+?)\.\*\*/, (q, m) => { const found = nounEmoji(m[1]); return found ? scene(`A ${found[0]}.`, [found[1][0]]) : null; }),
  ],
  "reading-short-texts": [
    rule((q) => Boolean(SCHOOL_TITLES[q.passage?.title]), (q) => place("plain", `The title of the text is ${q.passage.title}.`, [[SCHOOL_TITLES[q.passage.title], 200, 110, 100]], "")),
  ],
  "building-and-translating-sentences": [
    sentenceRule([2, 3, 4]),
  ],
};
