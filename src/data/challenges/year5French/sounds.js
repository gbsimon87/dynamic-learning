import { ch, bd, st, some } from "../topicBank.js";
import { fr, vocab } from "./shared.js";

const SILENT = ["petit", "grand", "chat", "trois", "vous", "nous", "dans", "gros", "nuit", "lit", "gris", "froid", "tard", "pied", "nez", "chez", "sans", "temps", "bras", "lait", "vert", "deux", "jamais", "français"];
const SAID = ["sac", "bonjour", "avec", "chef", "neuf", "sel", "mer", "bal", "hiver", "lac", "bec", "sec", "four", "pour", "tour", "fleur"];
const ADJ = [["grand", "grande"], ["petit", "petite"], ["vert", "verte"], ["gris", "grise"], ["froid", "froide"], ["chaud", "chaude"], ["content", "contente"]];
const LIAISON = [
  ["les amis", "the friends", "z"], ["un ami", "a friend", "n"], ["deux enfants", "two children", "z"], ["trois amis", "three friends", "z"],
  ["vous avez", "you have", "z"], ["nous avons", "we have", "z"], ["un enfant", "a child", "n"], ["mon ami", "my friend", "n"],
  ["ils ont", "they have", "z"], ["dix ans", "ten years", "z"], ["un avion", "a plane", "n"], ["en avion", "by plane", "n"],
  ["petit ami", "little friend", "t"], ["grand arbre", "big tree", "t"], ["petit enfant", "small child", "t"], ["les enfants", "the children", "z"],
];
const ALL_WORDS = [...SILENT.map((w) => [w, 0]), ...SAID.map((w) => [w, 1])];
const SOUND_BINS = ["Last letter is silent", "Last letter is said"];

export const silentLetters = {
  rule: "In French, the last letter of a word is often silent: you write the t in petit, but you do not say it. The letters c, r, f and l are often said: sac, bonjour, neuf, sel. Before a vowel, a silent last letter can wake up and join the next word. That is called liaison: les amis sounds like lay-zami.",
  hint: "Say the word slowly in your head. Do you hear the last letter at the end?",
  levels: {
    1: [
      ...SILENT.map((w) => (rng) => ch("Which word ends in a **silent** letter?", w, some(rng, SAID, 3), fr(w))),
      ...SAID.map((w) => (rng) => ch("Which word ends in a letter you **do say**?", w, some(rng, SILENT, 3), fr(w))),
    ],
    2: [
      st("Is the last letter silent or said?", SOUND_BINS, ALL_WORDS),
      st("Sort the words by their last letter.", SOUND_BINS, ALL_WORDS),
      ...ADJ.map(([m, f]) => (rng) => ch("In which word do you say the last consonant?", f, [m, ...some(rng, SILENT, 2, [m])], fr(f))),
      ...["chat", "lapin", "livre", "pomme", "maison"].map((w) => ch(`How do you hear the difference between **${w}** and **${w}s**?`, "You cannot: they sound the same", ["The s is said clearly", "The s makes the word longer", "The s sounds like a z"])),
      ...LIAISON.map(([p, , s]) => ch(`Which sound joins the two words in **${p}**?`, s, ["z", "n", "t", "s"].filter((x) => x !== s), fr(p))),
    ],
    3: [
      st("Which sound joins these words? Sort the phrases.", ["A z sound", "An n sound", "A t sound"], LIAISON.map(([p, , s]) => [p, { z: 0, n: 1, t: 2 }[s]])),
      st("Is the last letter silent or said?", SOUND_BINS, ALL_WORDS),
      ...[["petit", "small"], ["grand", "big"], ["chat", "cat"], ["trois", "three"], ["nuit", "night"], ["lit", "bed"], ["froid", "cold"], ["gris", "grey"], ["souris", "mouse"], ["dans", "in"], ["nous", "we"], ["vous", "you"]]
        .map(([w, e]) => bd(`Build the French word for **${e}**. Remember the silent letter.`, w, { letters: true, ...fr(w) })),
      ...LIAISON.filter((p) => p[2] !== "t").slice(0, 10).map(([p, e]) => bd(`Build the French for **${e}**.`, p, fr(p))),
    ],
    4: [
      ...vocab([["chat", "cat", "🐱"], ["nuit", "night", "🌙"], ["souris", "mouse", "🐭"], ["lit", "bed", "🛏️"], ["nez", "nose", "👃"], ["pied", "foot", "🦶"], ["lait", "milk", "🥛"], ["bras", "arm", "💪"], ["trois", "three", "3️⃣"], ["deux", "two", "2️⃣"]]).type,
      ...ADJ.map(([m, f]) => (rng) => ch("Which sentence ends with a **said** last consonant?", `Elle est ${f}.`, [`Il est ${m}.`, ...some(rng, ADJ.map((a) => a[0]), 2, [m]).map((x) => `Il est ${x}.`)], fr(`Elle est ${f}.`))),
      bd("Build the French: We have two friends.", "Nous avons deux amis", { more: ["avez", "un"] }),
      bd("Build the French: You have a friend.", "Vous avez un ami", { more: ["avons", "une"] }),
      bd("Build the French: They have three children.", "Ils ont trois enfants", { more: ["a", "deux"] }),
      bd("Build the French: The cat is small.", "Le chat est petit", { more: ["la", "petite"] }),
    ],
  },
};

const ON = [["bon", "good", "👍"], ["maison", "house", "🏠"], ["pont", "bridge", "🌉"], ["mouton", "sheep", "🐑"], ["citron", "lemon", "🍋"], ["savon", "soap", "🧼"], ["garçon", "boy"], ["poisson", "fish", "🐟"], ["jambon", "ham"], ["oncle", "uncle"], ["crayon", "pencil", "✏️"]];
const AN = [["grand", "big"], ["enfant", "child"], ["orange", "orange", "🍊"], ["dans", "in"], ["vent", "wind", "💨"], ["maman", "mum"], ["dent", "tooth", "🦷"], ["lent", "slow"], ["sans", "without"], ["cent", "hundred"], ["jambe", "leg"], ["blanc", "white"]];
const IN = [["lapin", "rabbit", "🐰"], ["matin", "morning"], ["vin", "wine"], ["jardin", "garden"], ["cinq", "five"], ["pain", "bread", "🥖"], ["main", "hand", "🖐️"], ["demain", "tomorrow"], ["faim", "hunger"], ["train", "train", "🚆"], ["plein", "full"], ["copain", "friend"]];
const NOT_NASAL = ["banane", "cinéma", "animal", "bonne", "une", "lune", "cuisine", "semaine"];
const nasalBins = ["on", "an", "in"];
const NASAL_CARDS = [...ON.map(([w]) => [w, 0]), ...AN.map(([w]) => [w, 1]), ...IN.map(([w]) => [w, 2])];
const w = (rows) => rows.map((r) => r[0]);
const SOUNDS = [["on", "bon", ON], ["an", "grand", AN], ["in", "lapin", IN]];
const SPELT = [
  ["en", "an", ["enfant", "dent", "vent", "lent", "cent"], ["grand", "maman", "dans", "blanc"]],
  ["ain", "in", ["pain", "main", "demain", "train"], ["lapin", "vin", "jardin", "matin"]],
];

export const nasalSounds = {
  rule: "Some French vowels are nasal: the n or m is not said, it just makes the vowel come through your nose. Three to know are on (bon), an (grand) and in (lapin). The n must not be followed by a vowel: bon is nasal, bonne is not.",
  hint: "Look for an n or m after the vowel, with no vowel after it. Then match the nose-sound.",
  levels: {
    1: SOUNDS.flatMap(([name, example, rows], at) => rows.map(([word]) => (rng) => ch(
      `Which word has the **${name}** sound, as in **${example}**?`, word,
      some(rng, SOUNDS.filter((_, i) => i !== at).flatMap(([, , r]) => w(r)), 3), fr(word)))),
    2: [
      st("Sort the words by their nose sound.", nasalBins, NASAL_CARDS),
      ...NOT_NASAL.map((x) => (rng) => ch("Which word has a **nasal** sound, with the n not said?", ["bon", "grand", "lapin", "pain", "vent", "main"][Math.floor(rng() * 6)], some(rng, NOT_NASAL, 3, [x]))),
      ...SPELT.flatMap(([spell, sound, yes, no]) => yes.map((word) => (rng) => ch(`Which word spells the **${sound}** sound with **${spell}**?`, word, some(rng, no, 3), fr(word)))),
      ...NOT_NASAL.map((x) => (rng) => ch("Which word does **not** have a nasal sound?", x, some(rng, ["bon", "grand", "lapin", "pain", "vent", "main", "dent", "jardin"], 3), fr(x))),
    ],
    3: [
      st("Sort the words by their nose sound.", nasalBins, NASAL_CARDS),
      st("Which of these words have a nose sound?", ["Nasal: the n is not said", "Not nasal: the n is said"], [...["bon", "grand", "lapin", "pain", "vent", "main", "dent", "jardin"].map((x) => [x, 0]), ...NOT_NASAL.map((x) => [x, 1])]),
      ...["maison", "lapin", "orange", "jardin", "enfant", "mouton", "citron", "pain", "main", "train", "vent", "dent", "grand", "poisson"].map((x) => bd(`Spell the French word **${x}** from its letters.`, x, { letters: true, ...fr(x) })),
      bd("Build the French: The bread is good.", "Le pain est bon", { more: ["la", "bonne"] }),
    ],
    4: [
      ...vocab([["lapin", "rabbit", "🐰"], ["pain", "bread", "🥖"], ["main", "hand", "🖐️"], ["train", "train", "🚆"], ["dent", "tooth", "🦷"], ["vent", "wind", "💨"], ["maison", "house", "🏠"], ["citron", "lemon", "🍋"], ["mouton", "sheep", "🐑"], ["savon", "soap", "🧼"], ["poisson", "fish", "🐟"], ["orange", "orange", "🍊"], ["chien", "dog", "🐶"]]).type,
      bd("Build the French: I have a rabbit.", "J'ai un lapin", { more: ["une", "ai"] }),
      bd("Build the French: Mum is in the garden.", "Maman est dans le jardin", { more: ["la", "sans"] }),
      bd("Build the French: The sheep is white.", "Le mouton est blanc", { more: ["blanche", "la"] }),
      bd("Build the French: It is windy.", "Il y a du vent", { more: ["dans", "de"] }),
      bd("Build the French: He is hungry.", "Il a faim", { more: ["est", "fin"] }),
    ],
  },
};

const ACC = {
  "é": ["été", "café", "école", "élève", "bébé", "thé", "clé"],
  "è": ["père", "mère", "frère", "règle", "très"],
  "ê": ["forêt", "fête", "tête", "fenêtre"],
  "ç": ["garçon", "français", "leçon", "ça"],
};
const ACC_ROWS = [["été", "summer"], ["école", "school"], ["élève", "pupil"], ["bébé", "baby"], ["thé", "tea"], ["clé", "key"], ["père", "father"], ["mère", "mother"], ["frère", "brother"], ["règle", "ruler"], ["forêt", "forest"], ["fête", "party"], ["tête", "head"], ["fenêtre", "window"], ["garçon", "boy"], ["leçon", "lesson"], ["français", "French"]];
function accentWrongs(word) {
  const at = [...word].findIndex((c) => "éèêç".includes(c));
  const set = word[at] === "ç" ? ["c", "s", "z"] : ["e", "é", "è", "ê"].filter((c) => c !== word[at]);
  return set.map((c) => word.slice(0, at) + c + word.slice(at + 1));
}
const ACC_WORDS = Object.values(ACC).flat();
const ACC_EN = { "été": "summer", café: "coffee", "école": "school", "élève": "pupil", "bébé": "baby", "thé": "tea", "clé": "key", "père": "father", "mère": "mother", "frère": "brother", "règle": "ruler", "très": "very", "forêt": "forest", "fête": "party", "tête": "head", "fenêtre": "window", "garçon": "boy", "français": "French", "leçon": "lesson", "ça": "that" };
const PATTERNS = [
  ["ou", "the **oo** sound, as in moon", ["rouge", "jour", "nous", "vous", "pour", "loup", "route", "souris"]],
  ["u", "the tight-lipped **u** sound, as in tu", ["tu", "rue", "lune", "une", "jus", "mur", "salut", "bus", "sucre"]],
  ["ch", "the **sh** sound, as in chat", ["chat", "chien", "chocolat", "cheval", "chaise", "cheveux", "chose"]],
  ["oi", "the **wa** sound, as in trois", ["trois", "moi", "noir", "soir", "roi", "toi", "boire", "poisson"]],
  ["eau", "the **oh** sound, as in eau", ["eau", "gâteau", "bateau", "beau", "tableau", "au", "jaune", "pauvre"]],
];
const patternCards = (ix) => ix.flatMap((i) => PATTERNS[i][2].map((x) => [x, ix.indexOf(i)]));

export const accentsAndSoundPatterns = {
  rule: "Accents change how a letter sounds: é says ay (été), è and ê say eh (père, forêt), and ç says s (garçon). Other sound patterns to know: ou says oo, u is a tight-lipped ew, ch says sh, oi says wa and eau says oh.",
  hint: "Look for the accent or the letter pattern, then think about the sound it makes.",
  levels: {
    1: [
      ...ACC_WORDS.map((word) => () => ch(`Which spelling has the correct accent? English: ${ACC_EN[word]}`, word, accentWrongs(word), fr(word))),
      ch("Which accent makes the **ay** sound, as in été?", "é", ["è", "ê", "ç"]),
      ch("Which letter says **s**, as in garçon?", "ç", ["é", "è", "ê"]),
    ],
    2: [
      st("Which accent does each word have?", ["é", "è", "ê"], [...ACC["é"].map((x) => [x, 0]), ...ACC["è"].map((x) => [x, 1]), ...ACC["ê"].map((x) => [x, 2])]),
      ...PATTERNS.flatMap(([, label, words], at) => words.map((word) => (rng) => ch(`Which word has ${label}?`, word,
        some(rng, PATTERNS.filter((_, i) => i !== at).flatMap(([, , x]) => x), 3), fr(word)))),
      ...ACC["ç"].map((word) => ch("Which word has a **cedilla** (ç) in it?", word, ["école", "père", "forêt"], fr(word))),
    ],
    3: [
      st("Sort the words by the sound pattern.", ["ou", "u", "ch"], patternCards([0, 1, 2])),
      st("Sort the words by the sound pattern.", ["oi", "eau", "ou"], patternCards([3, 4, 0])),
      st("Which accent does each word have?", ["é", "è", "ê"], [...ACC["é"].map((x) => [x, 0]), ...ACC["è"].map((x) => [x, 1]), ...ACC["ê"].map((x) => [x, 2])]),
      ...ACC_ROWS.map(([word, en]) => bd(`Build the French word for **${en}**. Mind the accents.`, word, { letters: true, ...fr(word) })),
    ],
    4: [
      ...ACC_ROWS.map(([word, en]) => () => ch(`Which is the correct spelling of **${en}**?`, word, accentWrongs(word), fr(word))),
      bd("Build the French: My father is at school.", "Mon père est à l'école", { more: ["mère", "ma"] }),
      bd("Build the French: My mother has a hat.", "Ma mère a un chapeau", { more: ["père", "mon"] }),
      bd("Build the French: The boy is in the forest.", "Le garçon est dans la forêt", { more: ["fête", "sans"] }),
      bd("Build the French: It is the party.", "C'est la fête", { more: ["tête", "le"] }),
    ],
  },
};
