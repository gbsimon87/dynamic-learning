import { wordQuestions } from "./year5Practice.js";
/** More words often misspelt: docs/curriculum/year-5-and-6-english.md, Year 5 mapping. */
export const RULE = "Look closely at the unusual letters, silent letters and double letters in these words. Say the tricky part slowly as you spell it.";
export const BANK = [
  {
    "word": "correspond",
    "meaning": "to exchange letters with someone",
    "sentence": "Ellie likes to ___ with her penfriend in Spain.",
    "wrong": [
      "corespond",
      "corrispond"
    ],
    "tip": "Two r."
  },
  {
    "word": "criticise",
    "meaning": "to point out what is wrong with something",
    "sentence": "It is unkind to ___ a drawing without saying something kind.",
    "wrong": [
      "critisise",
      "critacise"
    ],
    "tip": "It ends –ise."
  },
  {
    "word": "curiosity",
    "meaning": "a strong wish to learn or find out",
    "sentence": "Zayn’s ___ made him open the mystery box.",
    "wrong": [
      "curiousity",
      "curiosty"
    ],
    "tip": "It is related to curious but ends –osity."
  },
  {
    "word": "definite",
    "meaning": "clear and certain",
    "sentence": "We need a ___ answer by Friday.",
    "wrong": [
      "definate",
      "definit"
    ],
    "tip": "It ends –ite."
  },
  {
    "word": "desperate",
    "meaning": "feeling you have no hope left",
    "sentence": "The ___ hiker waved for help.",
    "wrong": [
      "desparate",
      "despirate"
    ],
    "tip": "From the Latin spero, so the middle has an e."
  },
  {
    "word": "determined",
    "meaning": "having firmly decided to do something",
    "sentence": "Leo was ___ to finish the race.",
    "wrong": [
      "determind",
      "determaned"
    ],
    "tip": "It ends –ined."
  },
  {
    "word": "develop",
    "meaning": "to grow or change",
    "sentence": "Seeds ___ into plants.",
    "wrong": [
      "devellop",
      "develope"
    ],
    "tip": "Only one l and one p, and no e at the end."
  },
  {
    "word": "dictionary",
    "meaning": "a book of words and their meanings",
    "sentence": "Priya looked up the word in a ___.",
    "wrong": [
      "dictionery",
      "dictionnary"
    ],
    "tip": "It ends –ary."
  },
  {
    "word": "disastrous",
    "meaning": "very bad; causing great harm",
    "sentence": "The picnic was ___ because it poured with rain.",
    "wrong": [
      "disasterous",
      "disastrus"
    ],
    "tip": "Take disaster, drop its e, and add –ous."
  },
  {
    "word": "embarrass",
    "meaning": "to make someone feel awkward or ashamed",
    "sentence": "Dad’s dancing might ___ the whole family.",
    "wrong": [
      "embarass",
      "embarras"
    ],
    "tip": "Two r and two s."
  },
  {
    "word": "environment",
    "meaning": "the natural world around us",
    "sentence": "We should look after our ___.",
    "wrong": [
      "enviroment",
      "environmant"
    ],
    "tip": "There is an n before the m."
  },
  {
    "word": "equip",
    "meaning": "to supply with what is needed",
    "sentence": "Mum will ___ the team with new helmets.",
    "wrong": [
      "equipp",
      "ekwip"
    ],
    "tip": "The “kw” sound is spelt qu."
  },
  {
    "word": "especially",
    "meaning": "above all; more than the others",
    "sentence": "I love dessert, ___ ice cream.",
    "wrong": [
      "expecially",
      "especialy"
    ],
    "tip": "It ends –ially."
  },
  {
    "word": "exaggerate",
    "meaning": "to make something sound bigger or better than it is",
    "sentence": "Don’t ___: it was not really a mile long.",
    "wrong": [
      "exagerate",
      "exaggarate"
    ],
    "tip": "Two g."
  },
  {
    "word": "excellent",
    "meaning": "extremely good",
    "sentence": "Zayn got an ___ mark in his test.",
    "wrong": [
      "excelent",
      "excellant"
    ],
    "tip": "Two l, and it ends –ent."
  },
  {
    "word": "existence",
    "meaning": "being alive or real",
    "sentence": "Do you believe in the ___ of dragons?",
    "wrong": [
      "existance",
      "existense"
    ],
    "tip": "It ends –ence."
  },
  {
    "word": "explanation",
    "meaning": "words that make something clear",
    "sentence": "Amara gave a clear ___ of the rules.",
    "wrong": [
      "explaination",
      "explonation"
    ],
    "tip": "Think of explain: its i drops out."
  },
  {
    "word": "familiar",
    "meaning": "well known to you",
    "sentence": "The tune sounded ___.",
    "wrong": [
      "familier",
      "familar"
    ],
    "tip": "It is related to family, so it ends –iar."
  },
  {
    "word": "foreign",
    "meaning": "from another country",
    "sentence": "Priya is learning a ___ language.",
    "wrong": [
      "foriegn",
      "foreing"
    ],
    "tip": "It has the unusual order e then i."
  },
  {
    "word": "forty",
    "meaning": "the number 40",
    "sentence": "There are ___ pupils in the hall.",
    "wrong": [
      "fourty",
      "fority"
    ],
    "tip": "It is not like four: there is no u."
  },
  {
    "word": "frequently",
    "meaning": "often",
    "sentence": "Biscuit ___ chases his own tail.",
    "wrong": [
      "frequentley",
      "frequantly"
    ],
    "tip": "It ends –ently."
  },
  {
    "word": "government",
    "meaning": "the people who run a country",
    "sentence": "The ___ built a new bridge.",
    "wrong": [
      "goverment",
      "governmant"
    ],
    "tip": "There is an n before the m."
  },
  {
    "word": "guarantee",
    "meaning": "a promise that something will work as stated",
    "sentence": "The toaster comes with a two-year ___.",
    "wrong": [
      "garantee",
      "guarentee"
    ],
    "tip": "It begins gu and ends ee."
  },
  {
    "word": "harass",
    "meaning": "to bother someone again and again",
    "sentence": "Seagulls ___ people for their chips.",
    "wrong": [
      "harrass",
      "harras"
    ],
    "tip": "One r and two s."
  },
  {
    "word": "hindrance",
    "meaning": "something that gets in the way",
    "sentence": "The mud was a ___ to the runners.",
    "wrong": [
      "hinderance",
      "hindrence"
    ],
    "tip": "Think of hinder: its e drops out."
  }
];
export function buildMoreWordsOftenMisspeltQuestions(level, rng) {
  return wordQuestions(BANK, RULE, level, rng);
}
