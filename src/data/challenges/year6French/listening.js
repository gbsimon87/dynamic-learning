import { ch, bd, od, st, ty, some } from "../topicBank.js";
import { rule } from "../figures.js";
import { fr, vocab } from "../year5French/shared.js";
import { scene, place, chat } from "./figures.js";

// Strand "Listening and Sounds". Every French word is on screen; the 🔊 button is optional help.

/* ---------- Following Instructions ---------- */

// [vous form, tu form, English, emoji]
const COMMANDS = [
  ["Levez-vous", "Lève-toi", "Stand up", "🧍"],
  ["Asseyez-vous", "Assieds-toi", "Sit down", "🪑"],
  ["Écoutez", "Écoute", "Listen", "👂"],
  ["Regardez", "Regarde", "Look", "👀"],
  ["Répétez", "Répète", "Repeat", "🔁"],
  ["Écrivez", "Écris", "Write", "✍️"],
  ["Lisez", "Lis", "Read", "📖"],
  ["Dessinez", "Dessine", "Draw", "🖍️"],
  ["Chantez", "Chante", "Sing", "🎤"],
  ["Taisez-vous", "Tais-toi", "Be quiet", "🤫"],
];
const LONGER = [
  ["Ouvrez vos livres", "Open your books", "📖"],
  ["Fermez la porte", "Close the door", "🚪"],
  ["Levez la main", "Put your hand up", "✋"],
  ["Prenez un crayon", "Take a pencil", "✏️"],
  ["Touchez la tête", "Touch your head", "🙆"],
  ["Mettez-vous en rang", "Line up", "🚶"],
  ["Travaillez avec un partenaire", "Work with a partner", "🧑‍🤝‍🧑"],
  ["Coloriez en rouge", "Colour it in red", "🟥"],
];
const ALL_EN = [...COMMANDS.map((c) => c[2]), ...LONGER.map((c) => c[1])];
const SIMON = [
  ["Jacques a dit : levez la main.", "Put your hand up", 0],
  ["Jacques a dit : asseyez-vous.", "Sit down", 0],
  ["Jacques a dit : touchez la tête.", "Touch your head", 0],
  ["Levez-vous.", "Stand up", 1],
  ["Fermez les yeux.", "Close your eyes", 1],
  ["Jacques a dit : fermez les yeux.", "Close your eyes", 0],
  ["Touchez le nez.", "Touch your nose", 1],
  ["Jacques a dit : levez-vous.", "Stand up", 0],
];

const followingInstructions = {
  rule: "Teachers give instructions with a verb at the start: Écoutez ! means Listen! To the whole class they use the vous form, which usually ends in -ez (Regardez). To one child they use the tu form, which is shorter (Regarde).",
  hint: "Find the verb at the start. Does it look like an English word you know, such as répétez and repeat?",
  levels: {
    1: [
      ...COMMANDS.map(([v, , en]) => (rng) => ch(`The teacher says **${v} !** What should you do?`, en, some(rng, ALL_EN, 3, [en]), fr(v))),
      ...LONGER.map(([v, en]) => (rng) => ch(`The teacher says **${v} !** What should you do?`, en, some(rng, ALL_EN, 3, [en]), fr(v))),
    ],
    2: [
      ...COMMANDS.map(([v, , en]) => (rng) => ch(`How does a teacher tell the class: **${en}!**`, v, some(rng, COMMANDS.map((c) => c[0]), 3, [v]))),
      ...COMMANDS.map(([v, t, en]) => ch(`Which word tells **one** child: **${en}!**`, t, [v, ...COMMANDS.filter((c) => c[1] !== t).slice(0, 2).map((c) => c[0])], fr(t))),
      st("Is the teacher talking to the whole class or to one child?", ["Whole class (vous)", "One child (tu)"], COMMANDS.flatMap(([v, t]) => [[v, 0], [t, 1]])),
      st("Sort the instructions: vous form or tu form?", ["vous form", "tu form"], COMMANDS.slice(2).flatMap(([v, t]) => [[v, 0], [t, 1]])),
    ],
    3: [
      ...SIMON.map(([said, en, bin]) => ch(`In the game Jacques a dit, the caller says **${said}** What do you do?`,
        bin === 0 ? `${en}` : "Stay still", bin === 0 ? ["Stay still", "Sit on the floor", "Clap twice"] : [en, "Sit on the floor", "Clap twice"], fr(said))),
      st("Jacques a dit: should you do it or stay still?", ["Do it", "Stay still"], SIMON.map(([said, , bin]) => [said, bin])),
      od("The teacher says: Prenez un crayon. Dessinez un chat. Coloriez en rouge. Écrivez votre nom. Put the steps in the teacher's order.", ["Take a pencil", "Draw a cat", "Colour it in red", "Write your name"]),
      od("The teacher says: Levez-vous. Mettez-vous en rang. Écoutez. Asseyez-vous. Put the steps in the teacher's order.", ["Stand up", "Line up", "Listen", "Sit down"]),
      od("The teacher says: Ouvrez vos livres. Lisez la page dix. Fermez vos livres. Répétez. Put the steps in the teacher's order.", ["Open your books", "Read page ten", "Close your books", "Repeat"]),
      ...LONGER.map(([v, en]) => bd(`Build the instruction: **${en}!**`, v, fr(v))),
    ],
    4: [
      ...COMMANDS.filter(([v]) => /^[a-z]+$/i.test(v)).map(([v, , en, e]) => ty(`Type the instruction a teacher gives the **whole class** (vous form): **${en}!**`, v.toLowerCase(), { picture: e, pictureLabel: en })),
      ...LONGER.map(([v, en, e]) => (rng) => ch(`Which instruction tells the class: **${en}!**`, v,
        some(rng, LONGER.map((c) => c[0]), 3, [v]), { picture: e, pictureLabel: en })),
      bd("Build the instruction to one child: **Listen and repeat!**", "Écoute et répète", { more: ["Écoutez", "Répétez"] }),
      bd("Build the instruction to the class: **Look at the board!**", "Regardez le tableau", { more: ["Regarde", "la"] }),
      bd("Build the instruction to the class: **Write the date!**", "Écrivez la date", { more: ["Écris", "le"] }),
    ],
  },
};

/* ---------- Rhymes Songs and Poems ---------- */

const RHYMES = [
  ["-eau", ["bateau", "gâteau", "château", "oiseau", "chapeau", "manteau"]],
  ["-on", ["bonbon", "maison", "poisson", "chanson", "mouton", "garçon"]],
  ["-ette", ["chaussette", "baguette", "fourchette", "trompette", "assiette", "galette"]],
  ["-oir", ["noir", "soir", "miroir", "devoir", "bonsoir", "tiroir"]],
  ["-at", ["chat", "rat", "plat", "chocolat", "soldat", "éclat"]],
];
const rhymeWrongs = (rng, at) => some(rng, RHYMES.filter((_, i) => i !== at).flatMap(([, w]) => w), 3);
const SONG_LINES = [
  ["Frère Jacques, dormez-vous ?", "Brother John, are you sleeping?"],
  ["Sonnez les matines !", "Ring the morning bells!"],
  ["Au clair de la lune", "In the moonlight"],
  ["Sur le pont d'Avignon", "On the bridge of Avignon"],
  ["On y danse tous en rond", "Everyone dances there in a ring"],
  ["Alouette, gentille alouette", "Skylark, lovely skylark"],
  ["Prête-moi ta plume", "Lend me your pen"],
  ["Ma chandelle est morte", "My candle has gone out"],
];
// [poem line with a gap, answer that rhymes and makes sense, wrongs]
const COUPLETS = [
  ["Sur la mer il y a un bateau,\nSur ma tête il y a un …", "chapeau", ["chat", "livre", "pomme"]],
  ["Le soir, le ciel est tout noir,\nJe me regarde dans le …", "miroir", ["jardin", "lit", "parc"]],
  ["Dans la cuisine il y a un rat,\nIl mange tout le …", "chocolat", ["pain", "fromage", "gâteau"]],
  ["J'aime la musique et la chanson,\nJe chante avec mon ami le …", "garçon", ["chat", "soleil", "frère"]],
  ["Pour le pique-nique j'ai une baguette,\nEt pour manger, une …", "fourchette", ["cuillère", "pomme", "table"]],
  ["Dans le ciel vole un oiseau,\nSur la rivière flotte un …", "bateau", ["poisson", "avion", "train"]],
];
const FRERE = ["Frère Jacques, frère Jacques,", "Dormez-vous ? Dormez-vous ?", "Sonnez les matines ! Sonnez les matines !", "Ding, dang, dong ! Ding, dang, dong !"];
const LUNE = ["Au clair de la lune,", "Mon ami Pierrot,", "Prête-moi ta plume", "Pour écrire un mot."];

const rhymesSongsAndPoems = {
  rule: "In French songs and poems, words rhyme when their last sound is the same: bateau and gâteau both end in the oh sound. Words with the same ending spelling often rhyme. Old songs like Frère Jacques and Au clair de la lune are sung by French children today.",
  hint: "Say the end of each word in your head. Which ending sounds the same?",
  levels: {
    1: RHYMES.flatMap(([, words], at) => words.slice(1).map((word) => (rng) => ch(`Which word rhymes with **${words[0]}**?`, word, rhymeWrongs(rng, at), fr(`${words[0]}, ${word}`)))),
    2: [
      st("Sort the words into rhyming families.", ["-eau", "-on", "-ette"], RHYMES.slice(0, 3).flatMap(([, w], i) => w.map((x) => [x, i]))),
      st("Sort the words into rhyming families.", ["-oir", "-at", "-on"], [RHYMES[3], RHYMES[4], RHYMES[1]].flatMap(([, w], i) => w.map((x) => [x, i]))),
      ...SONG_LINES.map(([line, en]) => (rng) => ch(`This line is from a French song: **${line}** What does it mean?`, en, some(rng, SONG_LINES.map((s) => s[1]), 3, [en]), fr(line))),
      ...RHYMES.map(([, words], at) => (rng) => ch(`Which word does **not** rhyme with the others: ${words.slice(0, 3).join(", ")} …?`, rhymeWrongs(rng, at)[0], words.slice(3, 6))),
    ],
    3: [
      ...COUPLETS.map(([gap, answer, wrong]) => ch(`Finish the poem with a word that rhymes and makes sense:\n\n${gap}`, answer, wrong, fr(gap.replace("…", answer)))),
      od("Put the lines of Frère Jacques in order.", FRERE),
      od("Put the lines of Au clair de la lune in order.", LUNE),
      bd("Build the song line: **Are you sleeping?**", "Dormez-vous", { more: ["Dormez", "Sonnez"] }),
      bd("Build the song line: **On the bridge of Avignon**", "Sur le pont d'Avignon", { more: ["la", "dans"] }),
      bd("Build the song line: **Lend me your pen**", "Prête-moi ta plume", { more: ["ton", "mot"] }),
    ],
    4: [
      ...COUPLETS.filter(([, answer]) => /^[a-z]+$/.test(answer)).map(([gap, answer]) => ty(`Type the missing word. It rhymes with the end of the first line:\n\n${gap}`, answer)),
      ...RHYMES.map(([end, words]) => st(`Which words rhyme with the **${end}** family?`, [`Rhymes with ${words[0]}`, "Does not rhyme"], [...words.slice(1).map((w) => [w, 0]), ...["pomme", "livre", "jardin", "école", "table"].map((w) => [w, 1])])),
      ch("A poem goes: **Mon petit chat / Mange du …** Which word rhymes with chat?", "chocolat", ["pain", "fromage", "lait"]),
    ],
  },
};

/* ---------- Pronunciation and Intonation ---------- */

const GN = ["montagne", "champignon", "Espagne", "gagner", "signe", "Allemagne"];
const QU = ["qui", "quatre", "quand", "question", "musique", "quoi"];
const ILL = ["fille", "famille", "feuille", "papillon", "billet", "grenouille"];
const H = ["homme", "heure", "hôtel", "hiver", "histoire", "habiter"];
const SOUND_SETS = [["gn", "say ny, as in onion", GN], ["qu", "say k, as in kite", QU], ["ill", "say y, as in yes", ILL]];
const SENTS = [
  ["Tu aimes le chocolat ?", 0], ["Tu as un chien ?", 0], ["Il fait beau ?", 0], ["C'est ton frère ?", 0], ["Vous habitez ici ?", 0],
  ["Tu aimes le chocolat.", 1], ["Tu as un chien.", 1], ["Il fait beau.", 1], ["C'est ton frère.", 1], ["Vous habitez ici.", 1],
];
const ENT = [["ils parlent", "parl"], ["elles chantent", "chant"], ["ils jouent", "jou"], ["elles dansent", "dans"], ["ils mangent", "mang"], ["ils regardent", "regard"]];

const pronunciationAndIntonation = {
  rule: "Some French letter groups make one sound: gn says ny (montagne), qu says k (quatre) and ill often says y (fille). The letter h is silent (homme). In ils parlent the -ent is silent. Your voice goes up at the end of a question and down at the end of a statement.",
  hint: "Look for the letter group, then think of the sound it makes. For tune, look at the punctuation at the end.",
  levels: {
    1: [
      ...SOUND_SETS.flatMap(([letters, says, words], at) => words.map((w) => (rng) => ch(`The letters **${letters}** ${says}. Which word has that sound?`, w,
        some(rng, SOUND_SETS.filter((_, i) => i !== at).flatMap(([, , x]) => x), 3), fr(w)))),
      ...H.map((w) => ch(`In the word **${w}**, what happens to the h?`, "It is silent", ["It sounds like h in hat", "It sounds like a k", "It sounds like an s"], fr(w))),
    ],
    2: [
      st("Sort the words by their sound pattern.", ["gn (ny)", "qu (k)", "ill (y)"], SOUND_SETS.flatMap(([, , w], i) => w.map((x) => [x, i]))),
      st("Does the voice go up or down at the end?", ["Goes up: a question", "Goes down: a statement"], SENTS),
      ...SENTS.filter(([, b]) => b === 0).map(([s]) => ch(`How should your voice sound at the end of **${s}**`, "It goes up, because it is a question", ["It goes down, because it is a statement", "It stays flat all the way", "It stops in the middle"], fr(s))),
      ...ENT.map(([phrase, stem]) => ch(`In **${phrase}**, which part of the verb is silent?`, "-ent at the end", [`${stem} at the start`, "The whole verb", "Nothing: every letter is said"], fr(phrase))),
    ],
    3: [
      st("Is the h or the ending silent? Sort the words.", ["Silent h", "Silent -ent"], [...H.map((w) => [w, 0]), ...ENT.map(([p]) => [p, 1])]),
      st("Sort the words by their sound pattern.", ["gn (ny)", "qu (k)", "ill (y)"], SOUND_SETS.flatMap(([, , w], i) => w.map((x) => [x, i]))),
      ...[...GN, ...QU.slice(0, 4), ...ILL.slice(0, 4)].map((w) => bd(`Spell **${w}** from its letters.`, w, { letters: true, ...fr(w) })),
      ch("Which sentence would you say with your voice going **up** at the end?", "Tu as faim ?", ["Tu as faim.", "J'ai faim.", "Il a faim."], fr("Tu as faim ?")),
    ],
    4: [
      ...vocab([["montagne", "mountain", "⛰️"], ["fille", "girl", "👧"], ["famille", "family", "👨‍👩‍👧"], ["quatre", "four", "4️⃣"], ["homme", "man", "👨"], ["papillon", "butterfly", "🦋"], ["grenouille", "frog", "🐸"], ["champignon", "mushroom", "🍄"]]).type,
      ...SENTS.filter(([, b]) => b === 1).map(([s]) => bd(`Turn **${s}** into a question by changing the end mark.`, s.replace(".", " ?"), { more: [".", "!"], ...fr(s.replace(".", " ?")) })),
    ],
  },
};

export const listening = {
  "following-instructions": followingInstructions,
  "rhymes-songs-and-poems": rhymesSongsAndPoems,
  "pronunciation-and-intonation": pronunciationAndIntonation,
};

export const listeningVisuals = {
  "following-instructions": place("room", "A teacher standing at the front of a classroom with a board.", [["🧑‍🏫", 120, 160, 90], ["🧑‍🎓", 290, 170, 70]], "Listen to the teacher."),
  "rhymes-songs-and-poems": place("plain", "Musical notes and a book of poems.", [["🎶", 140, 120, 90], ["📜", 270, 120, 90]], "French songs and poems."),
  "pronunciation-and-intonation": place("plain", "A speaking face and a wavy line for the tune of a voice.", [["🗣️", 140, 120, 90], ["〰️", 280, 120, 80]], "Sounds and the tune of your voice."),
};

const SIMON_PIC = rule(/^In the game Jacques a dit, the caller says \*\*(.+?)\*\*/, (q, m) => chat(m[1]));
export const listeningRules = {
  "following-instructions": [SIMON_PIC],
  "pronunciation-and-intonation": [
    rule(/^How should your voice sound at the end of \*\*(.+?)\*\*/, (q, m) => ({ ...scene(`A person saying ${m[1]}`, ["🗣️"]), bubbles: [{ x: 280, y: 100, text: m[1], tail: "bl", max: 18 }] })),
  ],
};
