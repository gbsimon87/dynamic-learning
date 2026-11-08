import { bd, ch, st, ty, buildTopic } from "../../../topicBank.js";

/**
 * Year 6 spelling: the statutory Years 5 and 6 word list, Year 6 half. Each
 * word has spelling chunks (at most four, joining back into the word), a
 * meaning, a sentence with a gap, a memory tip and two misspellings (never
 * another real word, and never a US spelling).
 *
 * Part 1 is identity to pronunciation; Part 2 is queue to yacht.
 */
const w = (word, chunks, meaning, sentence, tip, wrong) => ({ word, chunks: chunks.split("-"), meaning, sentence, tip, wrong });

export const PART1_WORDS = [
  w("identity", "i-den-ti-ty", "who or what a person is", "A passport shows your name and your ___.", "It starts with iden, like identical.", ["identety", "idenitty"]),
  w("immediate", "im-mediate", "happening straight away", "The nurse gave ___ help.", "Double m after the i: im + mediate.", ["imediate", "immediete"]),
  w("immediately", "im-mediate-ly", "straight away", "Please come here ___.", "immediate + ly, so the e stays.", ["imediately", "immediatly"]),
  w("individual", "in-di-vid-ual", "one single person", "Each ___ gets a certificate.", "individ + ual: it ends -ual.", ["individul", "indivdual"]),
  w("interfere", "in-ter-fere", "to get in the way", "Please do not ___ with my game.", "inter + fere: it ends -ere.", ["interfear", "intefere"]),
  w("interrupt", "in-ter-rupt", "to break in while someone is speaking", "It is rude to ___ when someone is talking.", "inter + rupt: two r letters in the middle.", ["interupt", "interrput"]),
  w("language", "lan-guage", "the words people speak or write", "French is a ___ spoken in many countries.", "The u comes after the g: lan-gu-age.", ["langauge", "langage"]),
  w("leisure", "lei-sure", "free time to relax", "She reads in her ___ time.", "ei in the middle, then sure.", ["liesure", "leasure"]),
  w("lightning", "light-ning", "a flash in the sky during a storm", "A flash of ___ lit up the sky.", "light + ning.", ["lighning", "litning"]),
  w("marvellous", "mar-vel-lous", "wonderful", "We had a ___ day at the beach.", "In British spelling, marvel has a double l.", ["marvelus", "marvellos"]),
  w("mischievous", "mis-chie-vous", "playfully naughty", "The ___ puppy hid my socks.", "Three chunks: mis-chie-vous.", ["mischievious", "mischevous"]),
  w("muscle", "mus-cle", "a part of the body that makes you move", "Exercise makes your ___ stronger.", "The c is silent: mus-cle.", ["mussle", "muscel"]),
  w("necessary", "nec-es-sa-ry", "needed", "It is ___ to wear a coat in the snow.", "One c, two s: nec-es-sa-ry.", ["neccessary", "necesary"]),
  w("neighbour", "neigh-bour", "someone who lives next door", "Our ___ waved from her garden.", "neigh + bour, with our.", ["neighbur", "nieghbour"]),
  w("nuisance", "nui-sance", "an annoying thing or person", "The buzzing fly was a ___.", "nuis + ance: it ends -ance.", ["nuisence", "nusance"]),
  w("occupy", "oc-cu-py", "to take up space or keep busy", "A new toy will ___ the baby.", "Double c, then one p.", ["ocupy", "occupie"]),
  w("occur", "oc-cur", "to happen", "Rainbows ___ when sun and rain meet.", "Double c, one r.", ["ocur", "occurr"]),
  w("opportunity", "op-por-tu-nity", "a good chance", "This is a great ___ to learn to sail.", "Double p, then one r.", ["oportunity", "opertunity"]),
  w("parliament", "par-lia-ment", "the group that makes a country’s laws", "The ___ meets in London to debate new laws.", "Do not skip the i: par-lia-ment.", ["parliment", "parlament"]),
  w("persuade", "per-suade", "to talk someone into something", "Can you ___ Dad to let us stay up?", "per + suade.", ["perswade", "persade"]),
  w("physical", "phys-i-cal", "to do with the body", "PE is a ___ activity.", "The f sound is spelt ph.", ["fysical", "physicle"]),
  w("prejudice", "prej-u-dice", "an unfair opinion formed before you know the facts", "We should not show ___ against anyone.", "pre + judice: a d before ice.", ["predjudice", "prejudise"]),
  w("privilege", "priv-i-lege", "a special right or advantage", "Leading the line is a special ___.", "It ends -ege.", ["priviledge", "privelege"]),
  w("profession", "pro-fes-sion", "a job that needs special training", "Being a vet is a skilled ___.", "One f, then a double s.", ["proffession", "profesion"]),
  w("programme", "pro-gramme", "a plan, or a show on television", "We watched a ___ about whales.", "In British spelling it ends -amme.", ["programe", "progamme"]),
  w("pronunciation", "pro-nun-ci-ation", "the way a word is said", "My teacher helped my ___ of French.", "Pronounce has ou, but this word has just u.", ["pronounciation", "pronuncation"]),
];

export const PART2_WORDS = [
  w("queue", "q-ueue", "a line of people waiting", "We joined the ___ for the bus.", "q + ueue: ueue makes the sound u.", ["quew", "quue"]),
  w("recognise", "rec-og-nise", "to know someone or something again", "I did not ___ my old teacher.", "rec + og + nise, with a British ise.", ["reconise", "recognice"]),
  w("recommend", "rec-om-mend", "to suggest as good", "Can you ___ a good book?", "One c, then a double m.", ["reccomend", "recomend"]),
  w("relevant", "rel-e-vant", "connected to the topic", "Only add ___ facts to your report.", "rel + e + vant.", ["relevent", "revelant"]),
  w("restaurant", "res-tau-rant", "a place where you pay to eat a meal", "We ate pizza at an Italian ___.", "Keep the au in the middle.", ["resturant", "restaraunt"]),
  w("rhyme", "rh-yme", "words that end with the same sound", "Cat and hat make a ___.", "It starts with rh and ends with yme.", ["rhime", "ryme"]),
  w("rhythm", "rhy-thm", "a regular beat in music", "Clap the ___ of the song.", "There is no vowel but y; it has two h letters.", ["rythm", "rhythem"]),
  w("sacrifice", "sac-ri-fice", "to give something up for someone else", "She had to ___ her break to finish the job.", "It ends -fice.", ["sacrifise", "sacrafice"]),
  w("secretary", "sec-re-tary", "a person who writes letters and organises an office", "The ___ typed all the letters.", "secret + ary.", ["secretery", "secratary"]),
  w("shoulder", "shoul-der", "the part of the body between your neck and arm", "She carried her bag on one ___.", "It begins like should.", ["sholder", "shoudler"]),
  w("signature", "sig-na-ture", "your name written in your own hand", "Please write your ___ at the bottom.", "It has a g, like sign.", ["signiture", "sinature"]),
  w("sincere", "sin-cere", "honest and truly meant", "Please accept my ___ thanks.", "It ends -ere.", ["sincear", "sinceer"]),
  w("sincerely", "sin-cere-ly", "in an honest way", "She ___ hoped he would win.", "sincere + ly, so the e stays.", ["sincerly", "sinceerly"]),
  w("soldier", "sol-dier", "someone who serves in an army", "The ___ stood guard at the gate.", "It ends -dier.", ["soljer", "soldeir"]),
  w("stomach", "stom-ach", "the part of the body where food goes", "My ___ rumbled because I was hungry.", "The ch makes a k sound.", ["stomack", "stumach"]),
  w("sufficient", "suf-fi-cient", "as much as is needed", "Is one tin of paint ___ for the wall?", "Double f, then cient.", ["suficient", "sufficeint"]),
  w("suggest", "sug-gest", "to put forward an idea", "Can you ___ a game we could play?", "Double g.", ["sugest", "suggess"]),
  w("symbol", "sym-bol", "a sign that stands for something else", "A heart is a ___ of love.", "The y makes the i sound.", ["simbol", "symbal"]),
  w("system", "sys-tem", "an organised way of doing things", "The school has a ___ for lining up.", "The y makes the i sound again.", ["sistem", "systum"]),
  w("temperature", "tem-per-a-ture", "how hot or cold something is", "The ___ dropped below freezing.", "temper + a + ture: keep the a.", ["tempreture", "temperture"]),
  w("thorough", "thor-ough", "complete and careful", "The cleaner did a ___ job.", "thor + ough.", ["thurough", "thorogh"]),
  w("twelfth", "twel-fth", "number twelve in a line", "Ali came ___ in the race.", "Twelve loses its ve before fth.", ["twelth", "twelvth"]),
  w("variety", "va-ri-e-ty", "a mixture of different kinds", "The shop sells a ___ of fruit.", "Do not forget the e: va-ri-e-ty.", ["variaty", "varity"]),
  w("vegetable", "veg-e-ta-ble", "a plant that you eat", "A carrot is a ___.", "It ends -able.", ["vegatable", "vegetible"]),
  w("vehicle", "ve-hi-cle", "something that carries people along a road", "A bus is a large ___.", "The h is easy to forget: ve-hi-cle.", ["vehical", "veichle"]),
  w("yacht", "ya-cht", "a boat with sails", "A white ___ sailed across the bay.", "The cht is a tricky ending.", ["yaht", "yatch"]),
];

const chunkModel = ({ chunks }) => `Spelling chunks: ${chunks.map((chunk) => `‘${chunk}’`).join(" ")}`;
const cardsFor = (words, start) => [
  ...[0, 1, 2].map((offset) => [words[(start + offset) % words.length].word, 0]),
  ...[[3, 0], [4, 0], [5, 1]].map(([offset, which]) => [words[(start + offset) % words.length].wrong[which], 1]),
];

/** The four-slot bank for one half of the Year 6 word list. */
export function wordListTopic(words, part) {
  const hint = "Say the word in chunks. Check the tricky part against the memory tip.";
  const slot1 = words.map((item) => ch(
    `Which is the correct spelling of the word that means “${item.meaning}”?`, item.word, item.wrong,
    { text: chunkModel(item), visualKind: "wordParts", hint: item.tip },
  ));
  const slot2 = words.map((_, start) => st(
    `Sort these spellings into the correct and incorrect ones (set ${start + 1}).`,
    ["Spelt correctly", "Spelt incorrectly"], cardsFor(words, start),
    { hint: "Say each word in chunks. A correctly spelt word has every chunk in place." },
  ));
  const slot3 = words.filter((item) => item.word.length <= 11).map((item) => bd(
    `Build the word that means “${item.meaning}”.`, item.word,
    { letters: true, more: ["x"], text: `Memory tip: ${item.tip}`, hint },
  ));
  const slot4 = words.map((item) => ty(
    "Type the word that completes the sentence.", item.word,
    {
      sentence: item.sentence,
      text: `Meaning: ${item.meaning}. It starts with “${item.word[0]}” and has ${item.word.length} letters.`,
      hint: item.tip,
    },
  ));
  return {
    topic: {
      rule: `Spelling words from the Year 5 and 6 list, part ${part}: say each word in chunks and learn its tricky part.`,
      hint,
      levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 },
    },
  };
}

export const buildPart = (words, part) => buildTopic(wordListTopic(words, part).topic);
