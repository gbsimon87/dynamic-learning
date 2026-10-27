import { assertLevel, pick, randInt, shuffle } from "./random.js";

/**
 * Word Builder — endless questions on tricky words.
 *
 *   missing    a tricky word with one letter gone; pick the letter
 *   spell      four spellings of one word; pick the right one
 *   homophone  a sentence with a gap; pick the word that fits
 *
 * Levels follow how hard the words are, not the question type:
 *   1  Easier  — everyday words that still catch people out (friend, island)
 *   2  Medium  — the tricky words of Years 3-4 and the common homophones
 *   3  Harder  — double letters, silent letters and the real spelling traps
 *
 * Words are written with the tricky letters in [brackets]; that is the part a
 * missing-letter question hides, and where wrong spellings are made. UK
 * spelling throughout (neighbour, jewellery).
 *
 * Pure: `rng` is a parameter and nothing loops without a bound.
 */

export const LEVELS = [
  { id: 1, label: "🌱 Easier" },
  { id: 2, label: "🌿 Medium" },
  { id: 3, label: "🌳 Harder" },
];

const WORDS = {
  1: [
    "fr[ie]nd", "bel[ie]ve", "b[eau]tiful", "bec[au]se", "p[eo]ple", "w[ou]ld", "c[ou]ld", "sh[ou]ld",
    "[wh]ole", "[eigh]t", "wei[gh]t", "g[h]ost", "sci[ss]ors", "i[s]land", "[k]nife", "[k]nee",
    "[k]nock", "[w]rite", "[w]rong", "whi[s]tle", "wed[n]esday", "str[aigh]t", "ne[igh]bour", "qu[ie]t",
    "min[u]te", "sp[e]cial", "saf[e]ty", "bi[c]ycle", "mus[c]le", "clim[b]", "dou[b]t", "c[augh]t",
    "t[augh]t", "lib[r]ary", "su[r]prise", "tomo[rr]ow",
  ],
  2: [
    "ac[c]ompany", "begin[n]ing", "biza[rr]e", "co[ll]eague", "disa[pp]ear", "disa[pp]oint", "excel[l]ent",
    "i[mm]ediate", "inte[rr]upt", "mis[s]pell", "nece[ss]ary", "o[cc]asion", "para[ll]el", "po[ss]ession",
    "reco[mm]end", "su[cc]ess", "sy[mm]etry", "aw[kw]ard", "colum[n]", "dis[c]ipline", "ex[h]aust",
    "for[ei]gn", "g[au]ge", "gr[a]teful", "h[ei]ght", "li[gh]tning", "tong[ue]", "twe[l]fth", "ve[h]icle",
    "w[ei]rd", "ya[ch]t", "app[a]rent", "arg[u]ment", "bound[a]ry", "bru[i]se", "cal[e]ndar", "dec[ei]ve",
    "def[i]nite", "dis[ea]se", "enviro[n]ment", "f[a]miliar", "f[o]rty", "fre[qu]ently", "hum[o]rous",
    "k[no]wledge", "l[ei]sure", "len[g]th", "my[s]terious", "n[au]ghty", "oppos[i]te",
    "pec[u]liar", "pleas[a]nt", "sec[r]etary", "sep[a]rate", "stren[g]th", "sy[mb]ol",
    "temp[o]rary", "tru[l]y", "unu[s]ual", "v[a]lley", "veg[e]table", "wi[d]th", "wri[t]ing",
  ],
  3: [
    "acco[mm]odate", "emba[rr]ass", "co[mm]ittee", "con[sc]ious", "con[sc]ience", "ex[h]ilarate",
    "han[d]kerchief", "h[ie]rarchy", "misch[ie]vous", "parli[a]ment", "[p]neumonia", "play[wr]ight",
    "q[ueue]", "rece[ip]t", "restaur[a]nt", "s[er]geant", "sol[d]ier", "s[ou]venir", "super[s]ede",
    "questio[nn]aire", "irresist[i]ble", "priv[i]lege", "pron[un]ciation", "public[ly]", "unforge[tt]able",
    "jewe[ll]ery", "marve[ll]ous", "mille[nn]ium", "occu[rr]ence", "persev[e]rance", "temp[e]rature",
    "superint[e]ndent", "th[or]ough", "vac[uu]m", "[wr]eckage", "sov[e]reign", "[x]ylophone", "cre[sc]endo",
    "camo[u]flage", "[ch]ameleon", "ph[ara]oh", "exa[gg]erate", "a[gg]ressive", "disast[r]ous",
    "independ[e]nt", "g[ui]dance", "hindr[a]nce", "maint[e]nance", "nu[is]ance", "o[pp]ortunity",
    "prej[u]dice", "profe[ss]ion", "profe[ss]or", "reco[g]nise", "rel[e]vant", "rh[y]thm", "sacr[i]fice",
    "since[r]ely", "susp[ic]ious", "sy[ll]able", "sym[p]athy", "sym[p]tom", "ty[rr]anny", "un[i]que",
    "v[i]cious", "whi[s]per", "wit[hh]old", "ex[c]eption", "exerc[i]se", "exi[s]tence", "explan[a]tion",
    "interf[e]re", "indiv[i]dual", "ordin[a]ry",
  ],
};

/** "emba[rr]ass" → { word, start, end } with the bracketed span. */
export function parseWord(entry) {
  const start = entry.indexOf("[");
  const end = entry.indexOf("]");
  const word = entry.replace("[", "").replace("]", "");
  return { word, start, end: end - 1 };
}

export function wordsForLevel(level) {
  assertLevel(level);
  return WORDS[level].map(parseWord);
}

const VOWELS = "aeiou";
const ALPHABET = "abcdefghijklmnopqrstuvwxyz";

/** Wrong spellings of `word`, mostly near the tricky span [start, end). */
function slips({ word, start, end }) {
  const out = [];
  const inSpan = (i) => i >= start && i < end;
  for (let i = 0; i < word.length; i += 1) {
    const near = inSpan(i);
    // drop a letter
    out.push({ w: word.slice(0, i) + word.slice(i + 1), near });
    // double a letter
    out.push({ w: word.slice(0, i + 1) + word[i] + word.slice(i + 1), near });
    // swap with the next letter
    if (i + 1 < word.length) {
      out.push({ w: word.slice(0, i) + word[i + 1] + word[i] + word.slice(i + 2), near });
    }
    // another vowel in this place
    if (VOWELS.includes(word[i])) {
      for (const v of VOWELS) out.push({ w: word.slice(0, i) + v + word.slice(i + 1), near });
    }
  }
  return out;
}

/** Three distinct wrong spellings, preferring slips in the tricky part. */
export function misspellings(parsed, rng, count = 3) {
  const { word } = parsed;
  const all = slips(parsed).filter((s) => s.w !== word && s.w.length >= 3);
  const near = shuffle([...new Set(all.filter((s) => s.near).map((s) => s.w))], rng);
  const far = shuffle([...new Set(all.filter((s) => !s.near).map((s) => s.w))], rng);
  const result = [];
  for (const w of [...near, ...far]) {
    if (result.length === count) break;
    if (!result.includes(w)) result.push(w);
  }
  return result;
}

const HOMOPHONES = {
  1: [
    ["their", ["there", "they're"], "The children put on ___ coats."],
    ["there", ["their", "they're"], "Put the book over ___ on the shelf."],
    ["they're", ["their", "there"], "I think ___ coming to my party."],
    ["horse", ["hoarse"], "We saw a brown ___ in the field."],
    ["hoarse", ["horse"], "After all the cheering my voice was ___."],
    ["write", ["right", "rite"], "Please ___ your name at the top."],
    ["right", ["write", "rite"], "Turn ___ at the end of the road."],
    ["rain", ["reign", "rein"], "Take an umbrella because of the ___."],
    ["witch", ["which"], "The ___ rode a broomstick across the moon."],
    ["which", ["witch"], "___ one would you like to eat?"],
    ["lose", ["loose"], "Be careful not to ___ your key."],
    ["loose", ["lose"], "My tooth is ___ and might fall out."],
    ["steel", ["steal"], "The bridge is made of strong ___."],
    ["steal", ["steel"], "It is wrong to ___ from a shop."],
    ["weather", ["whether"], "The ___ is sunny today."],
    ["your", ["you're"], "Don't forget ___ lunch box."],
    ["you're", ["your"], "I know ___ going to love this story."],
    ["dessert", ["desert"], "We had ice cream for ___."],
    ["desert", ["dessert"], "A camel can cross the hot, dry ___."],
    ["waste", ["waist"], "Try not to ___ food."],
    ["waist", ["waste"], "He tied the belt around his ___."],
    ["threw", ["through"], "She ___ the ball to her friend."],
    ["through", ["threw"], "The train went ___ the tunnel."],
    ["quiet", ["quite"], "Please be ___ in the library."],
    ["quite", ["quiet"], "The soup is ___ hot."],
    ["great", ["grate"], "We had a ___ day at the beach."],
    ["grate", ["great"], "Dad will ___ the cheese for the pizza."],
  ],
  2: [
    ["aloud", ["allowed"], "Our teacher read the story ___."],
    ["allowed", ["aloud"], "We are not ___ to run in the hall."],
    ["accept", ["except"], "Please ___ this gift from me."],
    ["except", ["accept"], "Everyone came ___ Sam."],
    ["lead", ["led"], "A heavy metal called ___ is used in some pipes."],
    ["led", ["lead"], "The guide ___ us up the hill."],
    ["medal", ["meddle"], "She won a gold ___ in the race."],
    ["meddle", ["medal"], "Don't ___ in other people's games."],
    ["minor", ["miner"], "It was only a ___ scratch."],
    ["miner", ["minor"], "The ___ wore a helmet with a lamp."],
    ["past", ["passed"], "We walked ___ the park on the way home."],
    ["passed", ["past"], "The runner ___ me near the finish line."],
    ["course", ["coarse"], "We are halfway through the swimming ___."],
    ["coarse", ["course"], "The sand felt ___ and scratchy."],
    ["root", ["route"], "The tree's ___ grew deep into the ground."],
    ["route", ["root"], "We took the shortest ___ to school."],
    ["role", ["roll"], "She has the main ___ in the school play."],
    ["roll", ["role"], "I ate a cheese ___ for lunch."],
    ["throne", ["thrown"], "The king sat on his golden ___."],
    ["thrown", ["throne"], "The ball was ___ over the fence."],
    ["whose", ["who's"], "___ coat is this on the floor?"],
    ["who's", ["whose"], "___ coming to the party tomorrow?"],
    ["stationary", ["stationery"], "The bus was ___ at the bus stop."],
    ["stationery", ["stationary"], "She bought pens and paper at the ___ shop."],
    ["effect", ["affect"], "The medicine had a good ___."],
    ["affect", ["effect"], "Too little sleep can ___ how you feel."],
    ["vain", ["vane", "vein"], "The ___ prince looked in the mirror all day."],
    ["vane", ["vain", "vein"], "The weather ___ on the roof pointed north."],
    ["vein", ["vain", "vane"], "Blood flows through a ___ in your arm."],
    ["reign", ["rain", "rein"], "The queen's ___ lasted many years."],
    ["rein", ["rain", "reign"], "She pulled on the ___ to stop the horse."],
  ],
  3: [
    ["principal", ["principle"], "The head teacher is called the ___."],
    ["principle", ["principal"], "It is a good ___ to always tell the truth."],
    ["compliment", ["complement"], "I would like to ___ you on your drawing."],
    ["complement", ["compliment"], "A red scarf will ___ your green coat."],
    ["council", ["counsel"], "The town ___ voted to build a new park."],
    ["counsel", ["council"], "She gave wise ___ to her friend."],
    ["altar", ["alter"], "Flowers were placed on the ___ in the church."],
    ["alter", ["altar"], "Mum will ___ the dress so it fits."],
    ["ascent", ["assent"], "The ___ of the mountain took all day."],
    ["assent", ["ascent"], "The king gave his ___ to the new law."],
    ["dual", ["duel"], "The road has a ___ carriageway."],
    ["duel", ["dual"], "The two knights fought a ___."],
    ["elicit", ["illicit"], "The teacher tried to ___ answers from the class."],
    ["illicit", ["elicit"], "Smuggling is an ___ trade."],
    ["ensure", ["insure"], "Please ___ the door is locked."],
    ["insure", ["ensure"], "You can ___ your phone against loss."],
    ["forth", ["fourth"], "The knight rode ___ to meet the dragon."],
    ["fourth", ["forth"], "She came ___ in the race."],
    ["yolk", ["yoke"], "The ___ of an egg is yellow."],
    ["yoke", ["yolk"], "The oxen pulled the cart with a wooden ___."],
    ["profit", ["prophet"], "The shop made a ___ this week."],
    ["prophet", ["profit"], "The ___ said that a great flood would come."],
    ["sweet", ["suite"], "The candy was very ___."],
    ["suite", ["sweet"], "The family stayed in a hotel ___."],
    ["rite", ["right", "write"], "The ceremony was an ancient ___."],
    ["capital", ["capitol"], "Paris is the ___ city of France."],
  ],
};

export function homophonesForLevel(level) {
  assertLevel(level);
  // Harder levels also revisit the easier pairs.
  return Array.from({ length: level }, (_, i) => HOMOPHONES[i + 1]).flat();
}

const GAP = "___";

function missingQuestion(parsed, level, rng) {
  const { word, start, end } = parsed;
  const index = randInt(rng, start, end - 1);
  const answer = word[index];
  const shown = word.slice(0, index) + "_" + word.slice(index + 1);

  // Wrong letters: look-alikes from the word first, then any other letter.
  const pool = [...new Set([...word, ...VOWELS, ...ALPHABET])].filter((l) => l !== answer);
  const wrong = [];
  const fromWord = shuffle(pool.filter((l) => word.includes(l)), rng);
  const rest = shuffle(pool.filter((l) => !word.includes(l)), rng);
  for (const l of [...fromWord, ...rest]) {
    if (wrong.length === 3) break;
    wrong.push(l);
  }

  return {
    key: `missing:${word}:${index}`,
    kind: "missing",
    level,
    word,
    shown,
    prompt: "What letter is missing?",
    speech: `What letter is missing? The word is ${word}. Choose from ${[answer, ...wrong].join(", ")}`,
    answer,
    options: shuffle([answer, ...wrong], rng),
  };
}

function spellQuestion(parsed, level, rng) {
  const { word } = parsed;
  return {
    key: `spell:${word}`,
    kind: "spell",
    level,
    word,
    prompt: "Which spelling is right?",
    speech: `Which spelling is right? The word is ${word}.`,
    answer: word,
    options: shuffle([word, ...misspellings(parsed, rng)], rng),
  };
}

function homophoneQuestion(entry, level, rng) {
  const [answer, others, sentence] = entry;
  return {
    key: `homophone:${answer}`,
    kind: "homophone",
    level,
    sentence,
    prompt: "Which word fits the gap?",
    speech: `Which word fits the gap? ${sentence.replace(GAP, "blank")} Choose from ${[answer, ...others].join(", ")}.`,
    answer,
    options: shuffle([answer, ...others], rng),
  };
}

/** Which question kinds each level deals. */
const KINDS = {
  1: ["missing", "missing", "spell", "homophone"],
  2: ["missing", "spell", "spell", "homophone", "homophone"],
  3: ["spell", "spell", "missing", "homophone", "homophone"],
};

export function makeWordBuilderQuestion(rng, level) {
  assertLevel(level);
  const kind = pick(rng, KINDS[level]);
  if (kind === "homophone") return homophoneQuestion(pick(rng, homophonesForLevel(level)), level, rng);
  const parsed = pick(rng, wordsForLevel(level));
  return kind === "spell" ? spellQuestion(parsed, level, rng) : missingQuestion(parsed, level, rng);
}
