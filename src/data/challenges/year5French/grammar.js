import { ch, bd, st, ty, some } from "../topicBank.js";
import { fr, vocab } from "./shared.js";

const pick = (rng, items) => items[Math.floor(rng() * items.length)];
const flat = (...parts) => parts.flat();

/* ---------- gender, articles and plurals ---------- */
// [noun, english, plural english, gender, emoji]
const NOUNS = [
  ["chat", "cat", "cats", "m", "🐱"], ["chien", "dog", "dogs", "m", "🐶"], ["livre", "book", "books", "m", "📖"], ["stylo", "pen", "pens", "m"],
  ["garçon", "boy", "boys", "m"], ["fromage", "cheese", "cheeses", "m", "🧀"], ["jardin", "garden", "gardens", "m"], ["sac", "bag", "bags", "m", "🎒"],
  ["vélo", "bike", "bikes", "m", "🚲"], ["arbre", "tree", "trees", "m", "🌳"], ["éléphant", "elephant", "elephants", "m", "🐘"], ["ami", "friend (boy)", "friends (boys)", "m"],
  ["maison", "house", "houses", "f", "🏠"], ["fille", "girl", "girls", "f"], ["voiture", "car", "cars", "f", "🚗"], ["pomme", "apple", "apples", "f", "🍎"],
  ["table", "table", "tables", "f"], ["fleur", "flower", "flowers", "f", "🌸"], ["banane", "banana", "bananas", "f", "🍌"], ["école", "school", "schools", "f"],
  ["orange", "orange", "oranges", "f", "🍊"], ["amie", "friend (girl)", "friends (girls)", "f"], ["glace", "ice cream", "ice creams", "f", "🍦"],
];
const vowel = (n) => /^[aeiouéèêœ]/.test(n);
const def = (n) => (vowel(n[0]) ? "l'" : n[3] === "m" ? "le " : "la ");
const indef = (n) => (n[3] === "m" ? "un " : "une ");
const enA = (n) => `${/^[aeiou]/.test(n[1]) ? "an" : "a"} ${n[1]}`;
const plural = (word) => `${word}s`;
const CONSONANT = NOUNS.filter((n) => !vowel(n[0]));
const MASC = NOUNS.filter((n) => n[3] === "m").map((n) => n[0]);
const FEM = NOUNS.filter((n) => n[3] === "f").map((n) => n[0]);
const wrongGender = (n) => (n[3] === "m" ? "la" : "le");
const PLURAL_SPECIAL = [["gâteau", "cake", "gâteaux"], ["château", "castle", "châteaux"], ["bateau", "boat", "bateaux"], ["animal", "animal", "animaux"], ["cheval", "horse", "chevaux"], ["souris", "mouse", "souris"], ["nez", "nose", "nez"]];

export const genderAndArticles = {
  rule: "Every French noun is masculine or feminine. The means le (masculine), la (feminine) or l' (before a vowel). A or an means un (masculine) or une (feminine). For more than one, use les (the) or des (some) and add an s to the noun: le chat, les chats.",
  hint: "Is the noun masculine or feminine? Then pick le/un or la/une. For many, think les or des plus an s.",
  levels: {
    1: flat(
      NOUNS.map((n) => () => {
        const ok = `${def(n)}${n[0]}`.replace("l' ", "l'");
        const bad = vowel(n[0]) ? [`la ${n[0]}`, `le ${n[0]}`, `${indef(n)}${n[0]}`] : [`${wrongGender(n)} ${n[0]}`, `${indef(n)}${n[0]}`, `${n[3] === "m" ? "une" : "un"} ${n[0]}`];
        return ch(`How do you say **the ${n[1]}**?`, ok, bad.filter((x) => x !== ok), { ...(n[4] ? { picture: n[4], pictureLabel: n[1] } : {}) });
      }),
      NOUNS.map((n) => () => ch(`How do you say **${enA(n)}**?`, `${indef(n)}${n[0]}`, [`${n[3] === "m" ? "une" : "un"} ${n[0]}`, `${def(n)}${n[0]}`, `les ${plural(n[0])}`])),
    ),
    2: flat(
      NOUNS.filter((n) => n[2] !== n[1]).map((n) => ch(`How do you say **the ${n[2]}**?`, `les ${plural(n[0])}`, [`le ${plural(n[0])}`, `les ${n[0]}`, `la ${plural(n[0])}`])),
      NOUNS.slice(0, 12).map((n) => ch(`What is the plural of **${indef(n)}${n[0]}**?`, `des ${plural(n[0])}`, [`${indef(n)}${plural(n[0])}`, `des ${n[0]}`, `les ${n[0]}`])),
      PLURAL_SPECIAL.map(([w, en, pl]) => ch(`How do you say **two ${en === "mouse" ? "mice" : en === "nose" ? "noses" : en === "horse" ? "horses" : en === "animal" ? "animals" : en === "cake" ? "cakes" : en === "castle" ? "castles" : "boats"}**?`, `deux ${pl}`, [`deux ${plural(w)}`, `deux ${w}`, `deux ${w}x`].filter((x, i, a) => a.indexOf(x) === i && x !== `deux ${pl}`))),
      st("Masculine or feminine?", ["Masculine (le / un)", "Feminine (la / une)"], [...MASC.map((w) => [w, 0]), ...FEM.map((w) => [w, 1])]),
    ),
    3: flat(
      Array.from({ length: 14 }, () => (rng) => {
        const [a, b] = some(rng, NOUNS, 2);
        const phrase = (n) => (vowel(n[0]) ? `l'${n[0]}` : `${def(n).trim()} ${n[0]}`);
        return bd(`Build the French for: **the ${a[1]} and the ${b[1]}**`, `${phrase(a)} et ${phrase(b)}`, { more: ["un", "une"] });
      }),
      NOUNS.filter((n) => !vowel(n[0])).slice(0, 12).map((n) => bd(`Build the French for: **the ${n[2]}**`, `les ${plural(n[0])}`, { more: [def(n).trim(), n[0]] })),
      st("Masculine or feminine?", ["Masculine (le / un)", "Feminine (la / une)"], [...MASC.map((w) => [w, 0]), ...FEM.map((w) => [w, 1])]),
    ),
    4: flat(
      CONSONANT.map((n) => (rng) => {
        const how = pick(rng, ["def", "indef"]);
        return how === "def"
          ? ty(`Type the missing word. English: the ${n[1]}.`, n[3] === "m" ? "le" : "la", { sentence: `___ ${n[0]}` })
          : ty(`Type the missing word. English: ${enA(n)}.`, n[3] === "m" ? "un" : "une", { sentence: `___ ${n[0]}` });
      }),
      NOUNS.filter((n) => !vowel(n[0])).map((n) => ty(`Type the missing word. English: the ${n[2]}.`, "les", { sentence: `___ ${plural(n[0])}` })),
      NOUNS.slice(0, 14).map((n) => () => ch(`Choose the French for: **I have ${enA(n)}.**`, `J'ai ${indef(n)}${n[0]}.`, [`J'ai ${n[3] === "m" ? "une" : "un"} ${n[0]}.`, `J'ai ${def(n)}${n[0]}.`, `J'ai des ${plural(n[0])}.`])),
    ),
  },
};

/* ---------- adjectives ---------- */
// [masc, fem, masc plural, fem plural, english, before the noun?]
const ADJ = [
  ["petit", "petite", "petits", "petites", "small", true], ["grand", "grande", "grands", "grandes", "big", true], ["joli", "jolie", "jolis", "jolies", "pretty", true],
  ["noir", "noire", "noirs", "noires", "black", false], ["vert", "verte", "verts", "vertes", "green", false], ["blanc", "blanche", "blancs", "blanches", "white", false],
  ["bleu", "bleue", "bleus", "bleues", "blue", false], ["gris", "grise", "gris", "grises", "grey", false], ["content", "contente", "contents", "contentes", "happy", false],
  ["gentil", "gentille", "gentils", "gentilles", "kind", false], ["intelligent", "intelligente", "intelligents", "intelligentes", "clever", false], ["rouge", "rouge", "rouges", "rouges", "red", false],
];
const ADJ_NOUNS = NOUNS.filter((n) => !vowel(n[0]) && !n[1].includes("("));
// Colours never describe a person, and "happy", "kind" and "clever" only suit people and animals.
const PEOPLE = ["garçon", "fille"];
const LIVING = ["garçon", "fille", "chat", "chien"];
const COLOURS = ["noir", "vert", "blanc", "bleu", "gris", "rouge"];
const LIVING_ADJ = ["content", "gentil", "intelligent"];
const nounFor = (rng, adj, gender) => pick(rng, ADJ_NOUNS.filter((n) => (!gender || n[3] === gender)
  && (LIVING_ADJ.includes(adj[0]) ? LIVING.includes(n[0]) : COLOURS.includes(adj[0]) ? !PEOPLE.includes(n[0]) : true)));
const formOf = (adj, n, plur) => adj[(n[3] === "f" ? 1 : 0) + (plur ? 2 : 0)];
const detOf = (n, plur) => (plur ? "deux" : indef(n).trim());
const nounOf = (n, plur) => (plur ? plural(n[0]) : n[0]);
const enNoun = (n, plur) => (plur ? n[2] : n[1]);
const phrase = (adj, n, plur, form = formOf(adj, n, plur)) => (adj[5] ? `${detOf(n, plur)} ${form} ${nounOf(n, plur)}` : `${detOf(n, plur)} ${nounOf(n, plur)} ${form}`);
const enPhrase = (adj, n, plur) => `${plur ? "two" : /^[aeiou]/.test(adj[4]) ? "an" : "a"} ${adj[4]} ${enNoun(n, plur)}`;
const adjCase = (rng) => { const adj = pick(rng, ADJ); return { adj, n: nounFor(rng, adj), plur: rng() < 0.5 }; };
const wrongForms = (adj, n, plur) => {
  const right = formOf(adj, n, plur);
  return [...new Set(adj.slice(0, 4))].filter((f) => f !== right);
};
const distinctAdj = ADJ.filter((a) => new Set(a.slice(0, 4)).size >= 3);

export const adjectives = {
  rule: "An adjective describes a noun and agrees with it: add e for feminine and s for more than one (petit, petite, petits, petites). Colours and most other adjectives go after the noun: un chat noir. Short common ones (small, big, pretty, good) go before: une petite maison.",
  hint: "Is the noun masculine or feminine, one or many? Then check where the adjective goes.",
  levels: {
    1: Array.from({ length: 24 }, () => (rng) => {
      const { adj, n, plur } = adjCase(rng);
      const right = formOf(adj, n, plur);
      const wrong = wrongForms(adj, n, plur);
      if (wrong.length < 1) return null;
      const stub = phrase(adj, n, plur, "___");
      return ch(`Choose the adjective that agrees. English: ${enPhrase(adj, n, plur)}`, right, wrong, { sentence: stub });
    }),
    2: [
      ...Array.from({ length: 16 }, () => (rng) => {
        const { adj, n, plur } = adjCase(rng);
        const right = phrase(adj, n, plur);
        const bad = wrongForms(adj, n, plur).slice(0, 3).map((f) => phrase(adj, n, plur, f));
        if (!bad.length) return null;
        return ch(`Which is correct? English: ${enPhrase(adj, n, plur)}`, right, bad);
      }),
      ...ADJ.filter((a) => !a[5]).map((a) => (rng) => {
        const n = nounFor(rng, a, "m");
        return ch(`Which is correct? English: a ${a[4]} ${n[1]}`, `un ${n[0]} ${a[0]}`, [`un ${a[0]} ${n[0]}`, `un ${n[0]} ${a[1] === a[0] ? a[2] : a[1]}`, `une ${n[0]} ${a[0]}`]);
      }),
      st("Before or after the noun?", ["Before the noun", "After the noun"], [...ADJ.filter((a) => a[5]).map((a) => [a[0], 0]), ["bon", 0], ...ADJ.filter((a) => !a[5]).map((a) => [a[0], 1])]),
    ],
    3: [
      ...Array.from({ length: 16 }, () => (rng) => {
        const size = pick(rng, ADJ.filter((a) => a[5]));
        const colour = pick(rng, ADJ.filter((a) => COLOURS.includes(a[0])));
        const n = nounFor(rng, colour);
        const plur = rng() < 0.5;
        const answer = `${detOf(n, plur)} ${formOf(size, n, plur)} ${nounOf(n, plur)} ${formOf(colour, n, plur)}`;
        return bd(`Build the French for: **${plur ? "two" : "a"} ${size[4]} ${colour[4]} ${enNoun(n, plur)}**`, answer);
      }),
      st("Before or after the noun?", ["Before the noun", "After the noun"], [...ADJ.filter((a) => a[5]).map((a) => [a[0], 0]), ["bon", 0], ...ADJ.filter((a) => !a[5]).map((a) => [a[0], 1])]),
    ],
    4: [
      ...Array.from({ length: 16 }, () => (rng) => {
        const adj = pick(rng, distinctAdj.filter((a) => /^[a-z]+$/.test(a[1]) && /^[a-z]+$/.test(a[2])));
        const n = nounFor(rng, adj);
        const plur = rng() < 0.5;
        const right = formOf(adj, n, plur);
        if (!/^[a-z]+$/.test(right)) return null;
        return ty(`Type the adjective in the right form. English: ${enPhrase(adj, n, plur)}`, right, { sentence: phrase(adj, n, plur, "___") });
      }),
      ...Array.from({ length: 8 }, () => (rng) => {
        const { adj, n, plur } = adjCase(rng);
        const right = phrase(adj, n, plur);
        return bd(`Build the French for: **${enPhrase(adj, n, plur)}**`, right, { more: some(rng, [adj[0], adj[1], adj[2], adj[3]].filter((x) => !right.split(" ").includes(x)), 2) });
      }),
    ],
  },
};

/* ---------- être, avoir, aller, faire ---------- */
const SUBJ = [["je", "I"], ["tu", "you"], ["il", "he"], ["elle", "she"], ["nous", "we"], ["vous", "you (all)"], ["ils", "they"], ["elles", "they"]];
const SLOT = { je: 0, tu: 1, il: 2, elle: 2, nous: 3, vous: 4, ils: 5, elles: 5 };
const VERBS = {
  "être": { forms: ["suis", "es", "est", "sommes", "êtes", "sont"], tail: "à Paris", en: ["am", "are", "is", "are", "are", "are"], enTail: "in Paris" },
  avoir: { forms: ["ai", "as", "a", "avons", "avez", "ont"], tail: "un chien", en: ["have", "have", "has", "have", "have", "have"], enTail: "a dog" },
  aller: { forms: ["vais", "vas", "va", "allons", "allez", "vont"], tail: "à l'école", en: ["go", "go", "goes", "go", "go", "go"], enTail: "to school" },
  faire: { forms: ["fais", "fais", "fait", "faisons", "faites", "font"], tail: "du sport", en: ["do", "do", "does", "do", "do", "do"], enTail: "sport" },
};
const subjectText = (s, form) => (s === "je" && /^[aeiouéh]/.test(form) ? "J'" : `${s[0].toUpperCase()}${s.slice(1)} `);
const sentenceOf = (verb, s, form) => `${subjectText(s, form)}${form} ${VERBS[verb].tail}.`;
const gappedOf = (verb, s) => (s === "je" && verb === "avoir" ? `J'___ ${VERBS[verb].tail}.` : `${s[0].toUpperCase()}${s.slice(1)} ___ ${VERBS[verb].tail}.`);
const enSentence = (verb, [s, en]) => `${en === "I" ? "I" : en[0].toUpperCase() + en.slice(1)} ${VERBS[verb].en[SLOT[s]]} ${VERBS[verb].enTail}`;
const cases = Object.keys(VERBS).flatMap((verb) => SUBJ.map(([s, en]) => ({ verb, s, en, form: VERBS[verb].forms[SLOT[s]], eng: enSentence(verb, [s, en]) })));
const distinctForms = (verb, form) => [...new Set(VERBS[verb].forms)].filter((f) => f !== form);
const ASCII = (w) => /^[a-z]+$/.test(w);
const SORT_VERB = (names) => st("Which verb is it?", names.map((v) => `${v}`), names.flatMap((v, bin) => [...new Set(VERBS[v].forms)].map((f) => [f, bin])));
const TABLE = "être: je suis, tu es, il est, nous sommes, vous êtes, ils sont. avoir: j'ai, tu as, il a, nous avons, vous avez, ils ont. aller: je vais, tu vas, il va, nous allons, vous allez, ils vont. faire: je fais, tu fais, il fait, nous faisons, vous faites, ils font.";
const FACTS = [
  ["je", "I"], ["tu", "you (one person)"], ["il", "he"], ["nous", "we"], ["vous", "you (all)"], ["ils", "they"],
];

export const beHaveGoDo = {
  rule: TABLE,
  hint: "Find the pronoun (je, tu, il, nous, vous, ils) and match it to the right form in the table.",
  levels: {
    1: cases.map((c) => (rng) => ch(`Fill the gap. English: ${c.eng}.`, c.form, some(rng, distinctForms(c.verb, c.form), 3), { sentence: gappedOf(c.verb, c.s) })),
    2: [
      ...cases.filter((c) => c.s !== "elle" && c.s !== "elles").map((c) => (rng) => ch(`Which form of **${c.verb}** goes with **${c.s}**?`, c.form, some(rng, distinctForms(c.verb, c.form), 3))),
      ...Object.keys(VERBS).flatMap((verb) => VERBS[verb].forms.filter((f, i, a) => a.indexOf(f) === i).map((f) => () => ch(`Which verb does **${f}** belong to?`, verb, Object.keys(VERBS).filter((v) => v !== verb && !VERBS[v].forms.includes(f)))))
        .filter(Boolean),
      SORT_VERB(["être", "avoir", "aller"]),
    ],
    3: [
      ...cases.filter((c) => c.s !== "elles").map((c) => bd(`Build the French for: **${c.eng}.**`, sentenceOf(c.verb, c.s, c.form).replace(/^J'/, "J'"))),
      SORT_VERB(["être", "avoir", "faire"]),
      SORT_VERB(["aller", "faire", "avoir"]),
    ],
    4: [
      ...cases.filter((c) => ASCII(c.form)).map((c) => ty(`Type the missing verb. English: ${c.eng}.`, c.form, { sentence: gappedOf(c.verb, c.s) })),
      ...cases.filter((c) => c.s !== "elle").slice(0, 12).map((c) => (rng) => bd(`Build the French for: **${c.eng}.**`, sentenceOf(c.verb, c.s, c.form), { more: some(rng, distinctForms(c.verb, c.form), 2) })),
    ],
  },
};
void FACTS;

/* ---------- -er verbs ---------- */
// [infinitive, stem, english base, english 3rd person, tail, english tail, elides]
const ER = [
  ["parler", "parl", "speak", "speaks", "français", "French", false], ["jouer", "jou", "play", "plays", "au football", "football", false], ["manger", "mang", "eat", "eats", "une pomme", "an apple", false],
  ["regarder", "regard", "watch", "watches", "la télé", "TV", false], ["aimer", "aim", "like", "likes", "le chocolat", "chocolate", true], ["habiter", "habit", "live", "lives", "à Paris", "in Paris", true],
  ["chanter", "chant", "sing", "sings", "une chanson", "a song", false], ["danser", "dans", "dance", "dances", "bien", "well", false], ["travailler", "travaill", "work", "works", "à l'école", "at school", false],
];
const ER_ENDINGS = { je: "e", tu: "es", il: "e", elle: "e", nous: "ons", vous: "ez", ils: "ent" };
const ER_PRONOUNS = [["je", "I"], ["tu", "you"], ["il", "he"], ["elle", "she"], ["nous", "we"], ["vous", "you (all)"], ["ils", "they"]];
const erForm = (v, s) => (s === "nous" && v[0] === "manger" ? "mangeons" : `${v[1]}${ER_ENDINGS[s]}`);
const erSubject = (v, s) => (s === "je" && v[6] ? "J'" : `${s[0].toUpperCase()}${s.slice(1)} `);
const erSentence = (v, s, form = erForm(v, s)) => `${erSubject(v, s)}${form} ${v[4]}.`;
const erGap = (v, s) => `${s === "je" && v[6] ? "J'" : `${s[0].toUpperCase()}${s.slice(1)} `}___ ${v[4]}.`;
const erEn = (v, [s, en]) => `${en[0].toUpperCase() + en.slice(1)} ${["il", "elle"].includes(s) ? v[3] : v[2]} ${v[5]}`;
const erCases = ER.flatMap((v) => ER_PRONOUNS.map(([s, en]) => ({ v, s, en, form: erForm(v, s), eng: erEn(v, [s, en]) })));
const erWrong = (v, form) => [...new Set(ER_PRONOUNS.map(([s]) => erForm(v, s)))].filter((f) => f !== form);

export const erVerbs = {
  rule: "Most French verbs end in -er, like parler (to speak). Take off -er and add an ending: je parle, tu parles, il parle, nous parlons, vous parlez, ils parlent. With manger, nous keeps an extra e: nous mangeons.",
  hint: "Take off -er from the verb, then add the ending for je, tu, il, nous, vous or ils.",
  levels: {
    1: erCases.map((c) => (rng) => ch(`Fill the gap with a form of **${c.v[0]}** (${c.v[2]}).`, c.form, some(rng, erWrong(c.v, c.form), 3), { sentence: erGap(c.v, c.s) })),
    2: [
      ...erCases.map((c) => (rng) => ch("Which sentence is correct?", erSentence(c.v, c.s), some(rng, erWrong(c.v, c.form), 3).map((f) => erSentence(c.v, c.s, f)))),
      st("Which ending does the verb have?", ["ends in -e", "ends in -ons", "ends in -ez"], ER.slice(0, 7).flatMap((v) => [[erForm(v, "je"), 0], [erForm(v, "nous"), 1], [erForm(v, "vous"), 2]])),
    ],
    3: [
      ...erCases.filter((c) => c.s !== "elle").map((c) => bd(`Build the French for: **${c.eng}.**`, erSentence(c.v, c.s))),
      st("Which ending does the verb have?", ["ends in -e", "ends in -ons", "ends in -ez"], ER.slice(0, 7).flatMap((v) => [[erForm(v, "je"), 0], [erForm(v, "nous"), 1], [erForm(v, "vous"), 2]])),
    ],
    4: erCases.filter((c) => ASCII(c.form)).map((c) => ty(`Type the right form of **${c.v[0]}**. English: ${c.eng}.`, c.form, { sentence: erGap(c.v, c.s) })),
  },
};

/* ---------- saying no and asking questions ---------- */
// [affirmative, negative, wrong, wrong]
const NEG = [
  ["Je parle français.", "Je ne parle pas français.", "Je ne pas parle français.", "Je ne parle français pas."],
  ["Il joue au tennis.", "Il ne joue pas au tennis.", "Il ne pas joue au tennis.", "Il joue ne pas au tennis."],
  ["Nous mangeons du pain.", "Nous ne mangeons pas de pain.", "Nous ne mangeons pas du pain.", "Nous ne pas mangeons de pain."],
  ["Tu aimes le chocolat.", "Tu n'aimes pas le chocolat.", "Tu ne aimes pas le chocolat.", "Tu aimes n'pas le chocolat."],
  ["Elle habite à Paris.", "Elle n'habite pas à Paris.", "Elle ne habite pas à Paris.", "Elle habite ne pas à Paris."],
  ["J'ai un chat.", "Je n'ai pas de chat.", "Je n'ai pas un chat.", "Je ne pas ai de chat."],
  ["Ils regardent la télé.", "Ils ne regardent pas la télé.", "Ils ne pas regardent la télé.", "Ils regardent ne pas la télé."],
  ["Vous chantez bien.", "Vous ne chantez pas bien.", "Vous ne pas chantez bien.", "Vous chantez bien ne pas."],
  ["Elle est contente.", "Elle n'est pas contente.", "Elle ne est pas contente.", "Elle est n'pas contente."],
  ["Je vais à l'école.", "Je ne vais pas à l'école.", "Je ne pas vais à l'école.", "Je vais ne pas à l'école."],
  ["Tu as une sœur.", "Tu n'as pas de sœur.", "Tu n'as pas une sœur.", "Tu ne pas as de sœur."],
  ["Il fait chaud.", "Il ne fait pas chaud.", "Il ne pas fait chaud.", "Il fait ne pas chaud."],
  ["Nous sommes au parc.", "Nous ne sommes pas au parc.", "Nous ne pas sommes au parc.", "Nous sommes ne pas au parc."],
  ["Ils dansent bien.", "Ils ne dansent pas bien.", "Ils ne pas dansent bien.", "Ils dansent bien ne pas."],
];
const NEG_ENGLISH = ["I speak French.", "He plays tennis.", "We eat bread.", "You like chocolate.", "She lives in Paris.", "I have a cat.", "They watch TV.", "You sing well.", "She is happy.", "I go to school.", "You have a sister.", "It is hot.", "We are at the park.", "They dance well."];
const NEG_NOT_ENGLISH = ["I do not speak French.", "He does not play tennis.", "We do not eat bread.", "You do not like chocolate.", "She does not live in Paris.", "I do not have a cat.", "They do not watch TV.", "You do not sing well.", "She is not happy.", "I do not go to school.", "You do not have a sister.", "It is not hot.", "We are not at the park.", "They do not dance well."];
const QWORDS = [["où", "where"], ["quand", "when"], ["comment", "how"], ["pourquoi", "why"], ["qui", "who"], ["combien", "how much or how many"]];
const QSENT = [
  ["Où est la gare ?", "où", "Where is the station?"], ["Quand est ton anniversaire ?", "quand", "When is your birthday?"], ["Comment tu t'appelles ?", "comment", "What are you called?"],
  ["Pourquoi tu pleures ?", "pourquoi", "Why are you crying?"], ["Qui est ta tante ?", "qui", "Who is your aunt?"], ["Combien coûte le livre ?", "combien", "How much does the book cost?"],
  ["Où habites-tu ?", "où", "Where do you live?"], ["Qui est ton frère ?", "qui", "Who is your brother?"],
];
const ESTCE = [["Est-ce que tu aimes le chocolat ?", "Do you like chocolate?"], ["Est-ce que tu joues au football ?", "Do you play football?"], ["Est-ce que vous habitez à Londres ?", "Do you live in London?"]];

export const negativesAndQuestions = {
  rule: "To say no, put ne around the verb and pas after it: je ne parle pas. Ne becomes n' before a vowel: je n'aime pas. After pas, un, une and du become de: je n'ai pas de chat. To ask a question, start with est-ce que, or use a question word: où, quand, comment, pourquoi, qui, combien.",
  hint: "Wrap the verb: ne before it, pas after it. For a question, look for the question word.",
  levels: {
    1: [
      ...NEG.map(([a, n, w1, w2]) => () => ch(`Make it negative: **${a}**`, n, [w1, w2, a], fr(a))),
      ...vocab(QWORDS.map(([f, e]) => [f, e])).see,
    ],
    2: [
      ...QSENT.map(([f, w, e]) => () => ch(`Which question word fits? English: ${e}`, w, QWORDS.map((q) => q[0]).filter((q) => q !== w).slice(0, 3), { sentence: f.replace(new RegExp(`^${w[0].toUpperCase()}${w.slice(1)}`), "___") })),
      ...vocab(QWORDS).say,
      st("Statement or question?", ["A statement", "A question"], [["Tu aimes le chocolat.", 0], ["Il joue au tennis.", 0], ["Elle habite à Paris.", 0], ["Nous avons un chat.", 0], ["Où est la gare ?", 1], ["Est-ce que tu aimes le chocolat ?", 1], ["Pourquoi tu pleures ?", 1], ["Qui est ta tante ?", 1]]),
      st("Positive or negative?", ["Positive", "Negative"], NEG.flatMap(([a, n]) => [[a, 0], [n, 1]]).slice(0, 12)),
    ],
    3: [
      ...NEG.map(([, n], i) => bd(`Build the French for: **${NEG_NOT_ENGLISH[i]}**`, n)),
      ...QSENT.map(([f, , e]) => bd(`Build the French for: **${e}**`, f)),
      ...ESTCE.map(([f, e]) => bd(`Build the French for: **${e}**`, f)),
      st("Positive or negative?", ["Positive", "Negative"], NEG.flatMap(([a, n]) => [[a, 0], [n, 1]]).slice(0, 12)),
    ],
    4: [
      ...NEG.map(([, n]) => ty("Type the missing word to make the sentence negative.", "pas", { sentence: n.replace(" pas ", " ___ ") })),
      ...NEG.filter(([, n]) => n.includes(" ne ")).map(([, n]) => ty("Type the missing word to make the sentence negative.", "ne", { sentence: n.replace(" ne ", " ___ ") })),
      ...QSENT.filter(([, w]) => ASCII(w)).map(([f, w, e]) => ty(`Type the question word. English: ${e}`, w, { sentence: f.replace(new RegExp(`^${w[0].toUpperCase()}${w.slice(1)}`), "___") })),
      ...NEG.map(([, n], i) => (rng) => bd(`Build the French for: **${NEG_NOT_ENGLISH[i]}**`, n, { more: some(rng, ["ne", "pas", "n'", "de", "non"].filter((x) => !n.split(" ").includes(x)), 2) })),
    ],
  },
};
void NEG_ENGLISH;

/** English noun (singular or plural) -> [emoji, how many], for the nouns that have a picture. */
export const NOUN_PICTURE = Object.fromEntries(NOUNS.filter((n) => n[4]).flatMap((n) => [[n[1], [n[4], 1]], [n[2], [n[4], 2]]]));
