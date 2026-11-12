import { ch, bd, od, st, ty, some } from "../topicBank.js";
import { rule } from "../figures.js";
import { fr } from "../year5French/shared.js";
import { scene, place } from "./figures.js";

// Strand "Grammar". Builds on Year 5: articles, adjective agreement, être/avoir/aller/faire, -er verbs, ne … pas, questions.
// Every French word is on screen; the 🔊 button is optional help.

/* ---------- My, Your, His and Her ---------- */

// [French noun, gender (m, f, p = plural), English, emoji]. A feminine noun that starts with a vowel is f with `vowel`.
const NOUNS = [
  ["frère", "m", "brother", "🧑"], ["chien", "m", "dog", "🐕"], ["livre", "m", "book", "📘"], ["stylo", "m", "pen", "🖊️"],
  ["sac", "m", "bag", "🎒"], ["vélo", "m", "bike", "🚲"], ["ballon", "m", "ball", "⚽"], ["ami", "m", "friend", "🧑"],
  ["sœur", "f", "sister", "👧"], ["mère", "f", "mother", "👩"], ["maison", "f", "house", "🏠"], ["chambre", "f", "bedroom", "🛏️"],
  ["voiture", "f", "car", "🚗"], ["trousse", "f", "pencil case", "✏️"], ["amie", "fv", "friend", "👧"], ["école", "fv", "school", "🏫"],
  ["amis", "p", "friends", "🧑‍🤝‍🧑"], ["livres", "p", "books", "📚"], ["sœurs", "p", "sisters", "👧"], ["chiens", "p", "dogs", "🐕"],
];
const FORMS = [["mon", "ma", "mes"], ["ton", "ta", "tes"], ["son", "sa", "ses"]];
const PERSON_EN = ["my", "your", "his"];
const slot = (g) => (g === "m" || g === "fv" ? 0 : g === "f" ? 1 : 2);
const poss = (person, g) => FORMS[person][slot(g)];
const ownerEn = (person, i) => (person === 2 ? (i % 2 ? "her" : "his") : PERSON_EN[person]);
const nounEn = (n) => (n[1] === "fv" && n[0] === "amie" ? "friend, a girl" : n[2]);
const NOUN_BY_WORD = Object.fromEntries(NOUNS.map((n) => [n[0], n]));
const possWrongs = (person, g) => {
  const right = poss(person, g);
  const sameOwner = FORMS[person].filter((f) => f !== right);
  const other = FORMS[(person + 1) % 3][slot(g)];
  return [...sameOwner, other];
};
const ALL_POSS = FORMS.flat();

// [possessive, noun, owner (0 my, 1 your, 2 his or her), English noun]
const MEANING = [
  ["mon", "frère", 0, "brother"], ["ma", "sœur", 0, "sister"], ["mes", "livres", 0, "books"],
  ["ton", "chien", 1, "dog"], ["ta", "maison", 1, "house"], ["tes", "amis", 1, "friends"],
  ["son", "sac", 2, "bag"], ["sa", "voiture", 2, "car"], ["ses", "sœurs", 2, "sisters"],
];
const OWNER_EN = ["my", "your", "his or her"];

const POSS_BUILDS = [
  ["Voici ma mère", "Here is my mother"], ["Mon frère s'appelle Hugo", "My brother is called Hugo"],
  ["Ton amie est gentille", "Your friend is kind"], ["Où est ton sac ?", "Where is your bag?"],
  ["Mon école est grande", "My school is big"], ["Tes livres sont sur la table", "Your books are on the table"],
  ["Tom aime son chien", "Tom likes his dog"], ["Léa aime sa maison", "Léa likes her house"],
  ["Ses amis habitent à Lyon", "His friends live in Lyon"], ["Ma chambre est rouge", "My bedroom is red"],
];

const AGREE = [
  ["Léa talks about her brother Hugo.", "___ frère s'appelle Hugo.", "son", ["sa", "ses", "mon"]],
  ["Tom talks about his sister Zoé.", "___ sœur s'appelle Zoé.", "sa", ["son", "ses", "ma"]],
  ["Léa talks about her friend Chloé, a girl.", "___ amie s'appelle Chloé.", "son", ["sa", "ses", "ma"]],
  ["Tom talks about his dogs.", "___ chiens sont noirs.", "ses", ["son", "sa", "mes"]],
  ["Hugo talks about his mother.", "___ mère est gentille.", "sa", ["son", "ses", "ma"]],
  ["Chloé talks about her bike.", "___ vélo est rouge.", "son", ["sa", "ses", "mon"]],
];

const possessives = {
  rule: "Mon, ton and son change to match the noun, not the owner. Use mon / ton / son before a masculine noun, ma / ta / sa before a feminine noun and mes / tes / ses before a plural. Mon, ton and son also go before a feminine noun that starts with a vowel: mon amie, mon école. Son, sa and ses mean his OR her: sa mère can be his mother or her mother.",
  hint: "Look at the noun the word goes with. Is it masculine, feminine or plural? Ignore whether the owner is a boy or a girl.",
  levels: {
    1: [
      ...MEANING.map(([w, n, owner, en]) => ch(`What does **${w} ${n}** mean?`, `${OWNER_EN[owner]} ${en}`,
        [0, 1, 2].filter((o) => o !== owner).map((o) => `${OWNER_EN[o]} ${en}`).concat(`the ${en}`), fr(`${w} ${n}`))),
      ch("What do **mon, ma** and **mes** all mean?", "my", ["your", "his or her", "the"]),
      ch("What do **ton, ta** and **tes** all mean?", "your", ["my", "his or her", "the"]),
      ch("What do **son, sa** and **ses** all mean?", "his or her", ["my", "your", "the"]),
      ch("Which word means **my** in front of a masculine noun such as frère?", "mon", ["ma", "mes", "ton"]),
      ch("Which word means **your** in front of a feminine noun such as sœur?", "ta", ["ton", "tes", "ma"]),
    ],
    2: [
      st("Which owner does each word show?", ["my", "your", "his or her"], ALL_POSS.map((w) => [w, FORMS.findIndex((f) => f.includes(w))])),
      st("Which kind of noun does each word go with?", ["Masculine", "Feminine", "Plural"], ALL_POSS.map((w) => [w, FORMS.flat().indexOf(w) % 3])),
      ...NOUNS.map((n, i) => {
        const person = i % 3;
        const word = `___ ${n[0]}`;
        return ch(`Choose the right word: **${word}** (${ownerEn(person, i)} ${nounEn(n)})`, poss(person, n[1]), possWrongs(person, n[1]), fr(n[0]));
      }),
      ch("Léa says **sa mère**. Whose mother is she talking about?", "A boy's or a girl's: sa can mean his or her", ["Only a boy's mother", "Only a girl's mother", "Her own mother"]),
      ch("Why do we say **sa mère** and not **son mère**?", "Because mère is a feminine noun", ["Because the owner is a girl", "Because mère is plural", "Because mère starts with m"]),
      ch("Why do we say **son frère** for both Léa's brother and Tom's brother?", "Because frère is masculine", ["Because Léa and Tom are both children", "Because frère is plural", "Because son means my"]),
    ],
    3: [
      ...POSS_BUILDS.map(([f, en]) => bd(`Build the French for: **${en}**`, f, fr(f))),
      ...AGREE.map(([intro, line, answer, wrong]) => ch(`${intro} Which word fits: **${line}**`, answer, wrong, fr(line.replace("___", answer)))),
      st("Are these phrases with mon, ma and mes correct?", ["Correct", "Not correct"], [["mon frère", 0], ["ma sœur", 0], ["mes amis", 0], ["mon amie", 0], ["mon sœur", 1], ["ma frère", 1], ["mon amis", 1], ["ma amie", 1]]),
      st("Are these phrases with ton, ta and tes correct?", ["Correct", "Not correct"], [["ta maison", 0], ["ton école", 0], ["tes livres", 0], ["ton chien", 0], ["ton maison", 1], ["ta école", 1], ["tes livre", 1], ["ta chien", 1]]),
      st("Are these phrases with son, sa and ses correct?", ["Correct", "Not correct"], [["sa voiture", 0], ["son amie", 0], ["ses sœurs", 0], ["son sac", 0], ["son voiture", 1], ["sa ami", 1], ["ses sac", 1], ["sa amie", 1]]),
      ch("A girl says **mon amie** about her friend Chloé. Why is it mon and not ma?", "Because amie starts with a vowel", ["Because Chloé is a boy", "Because amie is masculine", "Because amie is plural"], fr("mon amie")),
    ],
    4: [
      ...NOUNS.map((n, i) => {
        const person = (i + 1) % 3;
        const en = `${ownerEn(person, i + 1)} ${nounEn(n)}`;
        return ty(`Type the missing word. English: **${en}**`, poss(person, n[1]), { sentence: `___ ${n[0]}` });
      }),
      (rng) => bd("Build the French for: **Her mother is kind.**", "Sa mère est gentille", { more: some(rng, ["Son", "Ses", "Mon"], 2), ...fr("Sa mère est gentille") }),
      (rng) => bd("Build the French for: **His friends are tall.**", "Ses amis sont grands", { more: some(rng, ["Son", "Sa", "Mes"], 2), ...fr("Ses amis sont grands") }),
      (rng) => bd("Build the French for: **Your bag is red.**", "Ton sac est rouge", { more: some(rng, ["Ta", "Tes", "Mon"], 2), ...fr("Ton sac est rouge") }),
      (rng) => bd("Build the French for: **My school is near the park.**", "Mon école est près du parc", { more: some(rng, ["Ma", "Mes", "Ton"], 2), ...fr("Mon école est près du parc") }),
      ch("Hugo says: **Voici ___ amie Léa.** (my friend Léa, a girl) Which word fits?", "mon", ["ma", "mes", "ton"], fr("Voici mon amie Léa")),
      ch("Talking about Léa: **Elle aime ___ chambre.** (her bedroom) Which word fits?", "sa", ["son", "ses", "ta"], fr("Elle aime sa chambre")),
      ch("Tom says: **Ce sont ___ livres.** (his books) Which word fits?", "ses", ["son", "sa", "mes"], fr("Ce sont ses livres")),
    ],
  },
};

/* ---------- Want, Can and Must ---------- */

const V = {
  vouloir: { je: "veux", tu: "veux", il: "veut", nous: "voulons", vous: "voulez", ils: "veulent" },
  pouvoir: { je: "peux", tu: "peux", il: "peut", nous: "pouvons", vous: "pouvez", ils: "peuvent" },
  devoir: { je: "dois", tu: "dois", il: "doit", nous: "devons", vous: "devez", ils: "doivent" },
};
const PERSON = { Je: "je", Tu: "tu", Il: "il", Elle: "il", On: "il", Nous: "nous", Vous: "vous", Ils: "ils", Elles: "ils", Léa: "il", Tom: "il", Hugo: "il" };
// [subject, verb, infinitive, English]
const MODALS = [
  ["Je", "vouloir", "jouer", "I want to play"], ["Tu", "pouvoir", "venir", "You can come"], ["Il", "devoir", "ranger", "He must tidy up"],
  ["Nous", "vouloir", "manger", "We want to eat"], ["Vous", "pouvoir", "entrer", "You can come in"], ["Ils", "devoir", "finir", "They must finish"],
  ["Léa", "vouloir", "danser", "Léa wants to dance"], ["Elles", "pouvoir", "nager", "They can swim"], ["On", "devoir", "écouter", "We must listen"],
  ["Tu", "devoir", "dormir", "You must sleep"], ["Je", "pouvoir", "lire", "I can read"], ["Nous", "devoir", "partir", "We must leave"],
];
const formOf = (subj, verb) => V[verb][PERSON[subj]];
const modalFr = ([s, v, inf]) => `${s} ${formOf(s, v)} ${inf}`;
const modalWrongs = (rng, [s, v]) => some(rng, [...new Set(Object.values(V[v]))], 3, [formOf(s, v)]);
const MODAL_EN = MODALS.map((m) => m[3]);

const wantCanAndMust = {
  rule: "Vouloir means to want, pouvoir means to be able to (can) and devoir means to have to (must). Each changes with the person: je veux, tu veux, il veut, nous voulons, vous voulez, ils veulent. After any of them, the next verb stays in its infinitive form: Je veux jouer. Tu peux venir ? On doit ranger. On often means we.",
  hint: "Find who is doing it to choose the form. The second verb always stays as the infinitive (it ends in -er, -ir or -re).",
  levels: {
    1: [
      ...MODALS.map((m) => (rng) => ch(`What does **${modalFr(m)}** mean?`, m[3], some(rng, MODAL_EN, 3, [m[3]]), fr(modalFr(m)))),
      ch("Which verb means **to want**?", "vouloir", ["pouvoir", "devoir", "aller"]),
      ch("Which verb means **to be able to** (can)?", "pouvoir", ["vouloir", "devoir", "aller"]),
      ch("Which verb means **to have to** (must)?", "devoir", ["vouloir", "pouvoir", "aller"]),
      ch("In **Je veux manger**, which word is the infinitive?", "manger", ["Je", "veux", "Je veux"], fr("Je veux manger")),
    ],
    2: [
      st("Which verb is it?", ["vouloir (want)", "pouvoir (can)", "devoir (must)"],
        ["veux", "veut", "voulons", "veulent", "peux", "peut", "pouvons", "peuvent", "dois", "doit", "devons", "doivent"].map((w, i) => [w, Math.floor(i / 4)])),
      st("Which person does the verb go with?", ["il / elle / on", "nous / vous", "ils / elles"],
        [["veut", 0], ["peut", 0], ["doit", 0], ["voulons", 1], ["pouvez", 1], ["devons", 1], ["veulent", 2], ["peuvent", 2], ["doivent", 2], ["pouvons", 1], ["voulez", 1], ["devez", 1]]),
      ...MODALS.map((m) => (rng) => ch(`Choose the right form: **${m[0]} ___ ${m[2]}.** (${m[3]})`, formOf(m[0], m[1]), modalWrongs(rng, m), fr(modalFr(m)))),
      ...MODALS.slice(0, 8).map((m) => (rng) => ch(`How do you say **${m[3]}** in French?`, modalFr(m), some(rng, MODALS.map(modalFr), 3, [modalFr(m)]))),
      ch("Which sentence is correct?", "Je veux manger", ["Je veux mange", "Je voulons manger", "Je veut manger"], fr("Je veux manger")),
    ],
    3: [
      ...[
        ["Je veux jouer", "I want to play"], ["Tom, tu peux venir ?", "Can you come, Tom?"], ["Nous devons ranger", "We must tidy up (use nous)"],
        ["Nous voulons manger", "We want to eat (use nous)"], ["Elle peut nager", "She can swim"], ["Les garçons doivent finir", "The boys must finish"],
        ["Vous devez écouter", "You must listen (use vous)"], ["Léa veut danser", "Léa wants to dance"],
      ].map(([f, en]) => bd(`Build the French for: **${en}**`, f, fr(f))),
      bd("Build the French for: **I cannot play.**", "Je ne peux pas jouer", fr("Je ne peux pas jouer")),
      bd("Build the French for: **Tom does not want to sleep.**", "Tom ne veut pas dormir", fr("Tom ne veut pas dormir")),
      st("Wanting, being able to or having to?", ["want", "can", "must"],
        [["Je veux jouer", 0], ["Nous voulons manger", 0], ["Léa veut danser", 0], ["Ils veulent chanter", 0], ["Tu peux venir", 1], ["Elles peuvent nager", 1], ["Vous pouvez entrer", 1], ["Je peux lire", 1],
          ["On doit écouter", 2], ["Ils doivent finir", 2], ["Nous devons partir", 2], ["Il doit ranger", 2]]),
      st("Is the sentence about one person or more than one?", ["One person", "More than one"],
        [["Il veut jouer", 0], ["Tu peux venir", 0], ["Elle doit ranger", 0], ["Je veux manger", 0], ["Ils veulent jouer", 1], ["Nous pouvons venir", 1], ["Elles doivent ranger", 1], ["Nous voulons chanter", 1]]),
      od("Put Léa and Tom's conversation in order.", ["Léa : Tu veux jouer ?", "Tom : Oui, je veux bien !", "Léa : Mais tu dois ranger ta chambre d'abord.", "Tom : D'accord !"]),
      od("Put Hugo and the teacher's conversation in order.", ["Hugo : Je peux entrer ?", "Le professeur : Oui, tu peux.", "Hugo : Merci !", "Le professeur : Tu dois écouter."]),
      ch("What does **On peut jouer** mean?", "We can play", ["He can play", "I can play", "They must play"], fr("On peut jouer")),
    ],
    4: [
      ...MODALS.map((m) => ty(`Type the missing word. English: **${m[3]}**.`, formOf(m[0], m[1]), { sentence: `${m[0]} ___ ${m[2]}.` })),
      (rng) => bd("Build the French for: **Léa and Chloé want to eat.**", "Léa et Chloé veulent manger", { more: some(rng, ["veut", "voulons", "veux"], 2), ...fr("Léa et Chloé veulent manger") }),
      (rng) => bd("Build the French for: **We must leave (use nous).**", "Nous devons partir", { more: some(rng, ["doit", "devez", "pouvons"], 2), ...fr("Nous devons partir") }),
      (rng) => bd("Build the French for: **Can you help me, Tom?** (use tu)", "Tom, tu peux m'aider ?", { more: some(rng, ["peut", "veux", "dois"], 2), ...fr("Tom, tu peux m'aider ?") }),
      (rng) => bd("Build the French for: **I must do my homework.**", "Je dois faire mes devoirs", { more: some(rng, ["veux", "peux", "doit"], 2), ...fr("Je dois faire mes devoirs") }),
      ch("You want to ask your teacher: **May I open the window?** Which question do you say?", "Je peux ouvrir la fenêtre ?", ["Je veux ouvrir la fenêtre ?", "Je dois ouvrir la fenêtre ?", "Je peut ouvrir la fenêtre ?"], fr("Je peux ouvrir la fenêtre ?")),
      ch("Your mum says **Tu dois ranger ta chambre.** What are you being told?", "You have to tidy your room", ["You want to tidy your room", "You are allowed to tidy your room", "You are tidying your room now"], fr("Tu dois ranger ta chambre.")),
      ch("A friend asks **Tu veux jouer au foot ?** What is she asking?", "Do you want to play football?", ["Can you play football?", "Must you play football?", "Are you playing football?"], fr("Tu veux jouer au foot ?")),
    ],
  },
};

/* ---------- Going to Do Things ---------- */

const ALLER = { je: "vais", tu: "vas", il: "va", nous: "allons", vous: "allez", ils: "vont" };
// [French sentence, English, pronoun to name when the English could be two French subjects]
const PLANS = [
  ["Je vais manger une pizza ce soir", "I am going to eat a pizza this evening", ""],
  ["Tu vas jouer au tennis demain", "You are going to play tennis tomorrow", "tu"],
  ["Il va nager ce week-end", "He is going to swim this weekend", ""],
  ["Nous allons visiter Paris la semaine prochaine", "We are going to visit Paris next week", "nous"],
  ["Vous allez regarder un film ce soir", "You are going to watch a film this evening", "vous"],
  ["Elles vont danser demain", "They are going to dance tomorrow", "elles"],
  ["Léa va dessiner ce week-end", "Léa is going to draw this weekend", ""],
  ["Ils vont faire du vélo la semaine prochaine", "They are going to go cycling next week", "ils"],
  ["Je vais lire un livre ce soir", "I am going to read a book this evening", ""],
  ["On va chanter demain", "We are going to sing tomorrow", "on"],
  ["Tom va préparer un gâteau ce week-end", "Tom is going to make a cake this weekend", ""],
  ["Nous allons manger au restaurant demain", "We are going to eat at the restaurant tomorrow", "nous"],
];
const PLAN_EN = PLANS.map((p) => p[1]);
const PLAN_FR = PLANS.map((p) => p[0]);
const TIMES = [["demain", "tomorrow"], ["ce soir", "this evening"], ["ce week-end", "this weekend"], ["la semaine prochaine", "next week"]];
const PRESENT_PAIRS = [
  ["Je mange", "Je vais manger"], ["Tu nages", "Tu vas nager"], ["Il joue", "Il va jouer"], ["Nous dansons", "Nous allons danser"],
  ["Vous chantez", "Vous allez chanter"], ["Ils regardent la télé", "Ils vont regarder la télé"],
];
const ALLER_ITEMS = [
  ["Je", "je", "manger", "I am going to eat this evening", "ce soir"], ["Tu", "tu", "jouer", "You are going to play tomorrow", "demain"],
  ["Il", "il", "nager", "He is going to swim this weekend", "ce week-end"], ["Nous", "nous", "partir", "We are going to leave tomorrow", "demain"],
  ["Vous", "vous", "chanter", "You are going to sing this evening", "ce soir"], ["Ils", "ils", "danser", "They are going to dance next week", "la semaine prochaine"],
  ["Léa", "il", "dessiner", "Léa is going to draw this weekend", "ce week-end"], ["Elles", "ils", "lire", "They are going to read tomorrow", "demain"],
];
const INFS = [["manger", "eat"], ["jouer", "play"], ["nager", "swim"], ["danser", "dance"], ["chanter", "sing"], ["dessiner", "draw"], ["lire", "read"], ["regarder", "watch"]];

const goingToDoThings = {
  rule: "To say what you are going to do soon, use the right form of aller, then the infinitive: Je vais manger, tu vas jouer, il va nager, nous allons danser, vous allez chanter, ils vont lire. Time words say when: demain (tomorrow), ce soir (this evening), ce week-end (this weekend), la semaine prochaine (next week). Put ne … pas around aller: Je ne vais pas nager.",
  hint: "Find the form of aller first, then look for the infinitive after it and a time word such as demain.",
  levels: {
    1: [
      ...PLANS.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, PLAN_EN, 3, [en]), fr(f))),
      ...TIMES.map(([w, en]) => (rng) => ch(`What does **${w}** mean?`, en, some(rng, TIMES.map((t) => t[1]), 3, [en]), fr(w))),
      ch("Which verb helps you say what you are going to do?", "aller", ["vouloir", "manger", "faire"]),
      ch("Tom says **Je vais nager demain.** When is he going to swim?", "Tomorrow", ["Yesterday", "This morning", "Last week"], fr("Je vais nager demain")),
      ch("Léa says **Je vais regarder un film ce soir.** When is she going to watch it?", "This evening", ["Tomorrow morning", "Last night", "Next week"], fr("Je vais regarder un film ce soir")),
    ],
    2: [
      st("Is it happening now or is it going to happen?", ["Now or every day", "Going to happen"], PRESENT_PAIRS.flatMap(([a, b]) => [[a, 0], [b, 1]])),
      ...ALLER_ITEMS.map(([s, p, inf, , time]) => (rng) => ch(`Choose the right form of aller: **${s} ___ ${inf} ${time}.**`, ALLER[p], some(rng, Object.values(ALLER), 3, [ALLER[p]]), fr(`${s} ${ALLER[p]} ${inf} ${time}`))),
      ...PLANS.slice(0, 8).map(([f, en]) => (rng) => ch(`How do you say **${en}**?`, f, some(rng, PLAN_FR, 3, [f]))),
      ...TIMES.map(([w, en]) => (rng) => ch(`Which time word means **${en}**?`, w, some(rng, TIMES.map((t) => t[0]), 3, [w]))),
      ch("In **Il va nager**, which word is the infinitive?", "nager", ["Il", "va", "Il va"], fr("Il va nager")),
    ],
    3: [
      ...PLANS.map(([f, en, use]) => bd(`Build the French for: **${en}.**${use ? ` (use ${use})` : ""} Put the time words at the end.`, f, fr(f))),
      bd("Build the French for: **I am not going to swim.**", "Je ne vais pas nager", fr("Je ne vais pas nager")),
      bd("Build the French for: **You are not going to play tomorrow.** (use tu) Put the time word at the end.", "Tu ne vas pas jouer demain", fr("Tu ne vas pas jouer demain")),
      bd("Build the French for: **We are not going to eat this evening.** (use nous) Put the time words at the end.", "Nous n'allons pas manger ce soir", fr("Nous n'allons pas manger ce soir")),
      st("Is the sentence correct?", ["Correct", "Not correct"], [["Je vais manger", 0], ["Nous allons jouer", 0], ["Tu vas nager", 0], ["Ils vont chanter", 0], ["Vous allez danser", 0], ["Je va manger", 1], ["Nous vont jouer", 1], ["Tu va nager", 1], ["Ils allons chanter", 1], ["Il vas regarder", 1]]),
      st("Is it happening now or is it going to happen?", ["Now or every day", "Going to happen"], [["Tu joues au foot", 0], ["Tu vas jouer au foot", 1], ["Nous mangeons", 0], ["Nous allons manger", 1], ["Il lit un livre", 0], ["Il va lire un livre", 1], ["Elles dansent", 0], ["Elles vont danser", 1]]),
      od("Today is Monday morning. Put these times in order, from soonest to latest.", ["Ce soir", "Demain", "Ce week-end", "La semaine prochaine"]),
      ch("Hugo says **Demain, je vais jouer au foot.** What is he saying?", "Tomorrow I am going to play football", ["Today I play football", "Yesterday I played football", "Next week I want to play football"], fr("Demain, je vais jouer au foot.")),
    ],
    4: [
      ...ALLER_ITEMS.map(([s, p, inf, en, time]) => ty(`Type the missing word. English: **${en}**.`, ALLER[p], { sentence: `${s} ___ ${inf} ${time}.` })),
      ...INFS.map(([inf, en]) => ty(`Type the missing verb. English: **I am going to ${en} tomorrow.**`, inf, { sentence: "Je vais ___ demain." })),
      ty("Type the missing word. English: **I am not going to swim.**", "pas", { sentence: "Je ne vais ___ nager." }),
      ty("Type the missing word. English: **He is not going to eat.**", "ne", { sentence: "Il ___ va pas manger." }),
      (rng) => bd("Build the French for: **We are going to sing tomorrow.** (use nous)", "Nous allons chanter demain", { more: some(rng, ["vont", "vais", "allez"], 2), ...fr("Nous allons chanter demain") }),
      (rng) => bd("Build the French for: **I am not going to play tomorrow.**", "Je ne vais pas jouer demain", { more: some(rng, ["vas", "va", "allons"], 2), ...fr("Je ne vais pas jouer demain") }),
      ch("Which sentence says that Tom is **not** going to swim?", "Tom ne va pas nager", ["Tom va nager", "Tom ne vont pas nager", "Tom nage ce soir"], fr("Tom ne va pas nager")),
      ch("It is Friday. Chloé says **Ce week-end, nous allons visiter Lyon.** When is the visit?", "This weekend", ["Tomorrow evening", "Next week", "Last weekend"], fr("Ce week-end, nous allons visiter Lyon.")),
    ],
  },
};

/* ---------- French and English Compared ---------- */

const FRIENDS = [
  ["librairie", "bookshop", "library"], ["chips", "crisps", "chips"], ["pain", "bread", "pain"], ["rester", "to stay", "to rest"],
  ["lecture", "reading", "lecture"], ["sensible", "sensitive", "sensible"], ["journal", "newspaper", "journal"], ["demander", "to ask", "to demand"],
];
const COGNATES = ["chocolat", "animal", "restaurant", "musique", "hôtel", "train", "orange", "banane"];
const COGNATES2 = ["dentiste", "tigre", "limonade", "télévision", "docteur", "pizza"];
const FALSE2 = ["journal", "demander", "chips", "pain", "location", "lecture"];
const ADJ_PAIRS2 = [
  ["un livre vert", "un vert livre"], ["une porte blanche", "une blanche porte"], ["un chien noir", "un noir chien"],
  ["une table rouge", "une rouge table"], ["un crayon bleu", "un bleu crayon"], ["une chaise verte", "une verte chaise"],
];
const LIKE_PAIRS2 = [
  ["J'adore le football", "J'adore football"], ["Elle aime la glace", "Elle aime glace"], ["Il déteste les maths", "Il déteste maths"],
  ["Nous aimons le fromage", "Nous aimons fromage"], ["Tu adores les pommes ?", "Tu adores pommes ?"],
];
const LOOKS = ["librairie", "chips", "pain", "rester", "lecture", "sensible"];
const ADJ_PAIRS = [
  ["un chat noir", "un noir chat"], ["une maison blanche", "une blanche maison"], ["un stylo rouge", "un rouge stylo"],
  ["une voiture verte", "une verte voiture"], ["un sac bleu", "un bleu sac"], ["une fleur jaune", "une jaune fleur"],
];
const LIKE_PAIRS = [
  ["J'aime le chocolat", "J'aime chocolat"], ["Il aime la musique", "Il aime musique"], ["Elle adore le sport", "Elle adore sport"],
  ["Nous aimons les chats", "Nous aimons chats"], ["Je déteste la pluie", "Je déteste pluie"],
];
const IDIOMS = [
  ["J'ai faim", "I am hungry"], ["J'ai soif", "I am thirsty"], ["J'ai chaud", "I am hot"], ["J'ai froid", "I am cold"], ["J'ai dix ans", "I am ten years old"],
];

const frenchAndEnglishCompared = {
  rule: "French and English are alike in many ways, but not everywhere. Most adjectives go after the noun: un chat noir. Every noun is masculine or feminine. French keeps le, la or les where English drops 'the': J'aime le chocolat. French has no word for 'do' in questions or negatives. Some phrases cannot be translated word for word: J'ai dix ans means I am ten. Many words look alike and mean the same (musique), but false friends do not: librairie is a bookshop, not a library.",
  hint: "Do not translate word by word. Ask yourself: where does the adjective go, is there a le or la, and does the English phrase use 'am' where French uses j'ai?",
  levels: {
    1: [
      ch("How do you say **a black cat** in French?", "un chat noir", ["un noir chat", "chat un noir", "noir chat un"], fr("un chat noir")),
      ch("How do you say **a white house** in French?", "une maison blanche", ["une blanche maison", "maison une blanche", "blanche maison une"], fr("une maison blanche")),
      ch("Where do most French adjectives, such as colours, go?", "After the noun", ["Before the noun", "At the start of the sentence", "At the end of the page"]),
      ch("In English, a table is just 'the table'. What is true of French nouns?", "Every noun is masculine or feminine", ["Only people have a gender", "No noun has a gender", "Only animals have a gender"]),
      ch("The French word **la table** is feminine. What does that mean?", "It is just the gender of the word: a table is not a girl", ["The table is a girl", "The table is made of wood", "The table is very small"], fr("la table")),
      ch("In English we say 'I like chocolate'. How do you say it in French?", "J'aime le chocolat", ["J'aime chocolat", "J'aime un chocolat", "J'aime de chocolat"], fr("J'aime le chocolat")),
      ch("In English we say 'She loves music'. How do you say it in French?", "Elle adore la musique", ["Elle adore musique", "Elle adore une musique", "Elle adore de musique"], fr("Elle adore la musique")),
      ch("Look at **Tu aimes les chats ?** (Do you like cats?). Which French word means 'do'?", "None: French has no word for 'do' here", ["Tu", "aimes", "les"], fr("Tu aimes les chats ?")),
      ch("What does **J'ai dix ans** mean?", "I am ten years old", ["I have ten years", "I have ten brothers", "I want ten years"], fr("J'ai dix ans")),
      ch("What does **J'ai faim** mean?", "I am hungry", ["I have hunger", "I have a brother", "I am happy"], fr("J'ai faim")),
      ch("What does **librairie** mean?", "Bookshop", ["Library", "Bakery", "Classroom"], fr("librairie")),
      ch("A French friend says **J'adore les chips.** What does she love?", "Crisps in a packet", ["Chips from a chip shop", "Chocolate in a bar", "Chicken in a pie"], fr("J'adore les chips.")),
      ch("Which French word looks like an English word and means the same?", "musique", ["librairie", "pain", "chips"], fr("musique")),
    ],
    2: [
      st("Is the adjective in the right place in French?", ["Correct in French", "Not correct in French"], ADJ_PAIRS.flatMap(([a, b]) => [[a, 0], [b, 1]])),
      st("Is the sentence correct in French?", ["Correct", "Not correct"], LIKE_PAIRS.flatMap(([a, b]) => [[a, 0], [b, 1]])),
      st("What does English say for the same sentence?", ["English says 'am', 'is' or 'are'", "English says 'has' or 'have'"],
        [...IDIOMS.map(([f]) => [f, 0]), ["J'ai un chat", 1], ["J'ai une sœur", 1], ["Il a un vélo", 1], ["Elle a deux frères", 1], ["Nous avons une maison", 1]]),
      st("Do the words mean the same as the English word they look like?", ["Means the same", "Means something different"], [...COGNATES.map((w) => [w, 0]), ...LOOKS.map((w) => [w, 1])]),
      ...FRIENDS.map(([w, right, trap]) => (rng) => ch(`**${w}** looks a bit like the English word '${trap.replace("to ", "")}'. What does it really mean?`, right, some(rng, ["bookshop", "bread", "to stay", "reading", "sensitive", "newspaper", "to ask", "crisps"], 3, [right]), fr(w))),
      ch("In English we say 'Do you play football?'. Which French sentence keeps the same meaning?", "Tu joues au football ?", ["Tu fais joues au football ?", "Fais-tu joues au football ?", "Tu joues fais au football ?"], fr("Tu joues au football ?")),
      ch("Which French sentence says **a green apple**?", "une pomme verte", ["une verte pomme", "pomme une verte", "verte pomme une"], fr("une pomme verte")),
      ch("Why do we say **le chocolat** in French but just 'chocolate' in English?", "French keeps the little word le, la or les", ["French has no word for chocolate", "French always puts the noun last", "French never uses adjectives"]),
      ch("Léa says **Il a froid.** What does it mean?", "He is cold", ["He has a cold", "He is hot", "He is angry"], fr("Il a froid.")),
    ],
    3: [
      ...[["un chat noir", "a black cat"], ["une maison blanche", "a white house"], ["une voiture rouge", "a red car"], ["un stylo bleu", "a blue pen"],
        ["J'aime le chocolat", "I like chocolate"], ["Je n'aime pas les maths", "I do not like maths"], ["J'ai dix ans", "I am ten years old"], ["J'ai faim", "I am hungry"],
        ["Il a chaud", "He is hot"], ["Nous mangeons des frites", "We eat chips (use nous)"]].map(([f, en]) => bd(`Build the French for: **${en}**`, f, fr(f))),
      ch("You want to borrow a book from a place that lends books. Where do you go?", "À la bibliothèque", ["À la librairie", "À la boulangerie", "À la piscine"], fr("À la bibliothèque")),
      ch("Léa wants to buy a new book. Where does she go?", "À la librairie", ["À la bibliothèque", "À la boulangerie", "À la gare"], fr("À la librairie")),
      ch("Why does French say **J'ai quinze ans** and not 'Je suis quinze ans'?", "French uses 'have' (avoir) for age", ["French does not like numbers", "Quinze is a verb", "French only uses être"], fr("J'ai quinze ans")),
      st("Sort these words: same meaning as English, or a false friend?", ["Same meaning", "False friend"], [...COGNATES2.map((w) => [w, 0]), ...FALSE2.map((w) => [w, 1])]),
      st("Which colour phrases have the adjective in the right place?", ["Right place", "Wrong place"], ADJ_PAIRS2.flatMap(([a, b]) => [[a, 0], [b, 1]])),
      st("Which sentences keep the little word that French needs?", ["Keeps le, la or les", "Missing le, la or les"], LIKE_PAIRS2.flatMap(([a, b]) => [[a, 0], [b, 1]])),
    ],
    4: [
      ty("Type the French word for **bookshop**.", "librairie", { picture: "📚", pictureLabel: "bookshop" }),
      ty("Type the French word for **crisps**.", "chips", { picture: "🥔", pictureLabel: "crisps" }),
      ty("Type the French word for **bread**.", "pain", { picture: "🍞", pictureLabel: "bread" }),
      ty("Type the French word for **to stay**.", "rester"),
      ty("Type the French word for **reading** (not a lecture).", "lecture"),
      ty("Type the French word for **newspaper**.", "journal"),
      ...[["un chat ___", "noir", "a black cat"], ["une pomme ___", "verte", "a green apple"], ["un stylo ___", "bleu", "a blue pen"], ["une maison ___", "blanche", "a white house"], ["une fleur ___", "rouge", "a red flower"]]
        .map(([s, a, en]) => ty(`Type the missing adjective. English: **${en}**`, a, { sentence: s })),
      ...[["J'aime ___ chocolat.", "le", "I like chocolate."], ["J'aime ___ musique.", "la", "I like music."], ["Il adore ___ sport.", "le", "He loves sport."], ["Elle déteste ___ pluie.", "la", "She hates rain."], ["Nous aimons ___ chats.", "les", "We like cats."]]
        .map(([s, a, en]) => ty(`Type the missing little word (le, la or les). English: **${en}**`, a, { sentence: s })),
      ...[["Tu ___ dix ans.", "as", "You are ten."], ["Il ___ chaud.", "a", "He is hot."], ["Nous ___ froid.", "avons", "We are cold."], ["Elle ___ soif.", "a", "She is thirsty."]]
        .map(([s, a, en]) => ty(`Type the missing verb. English: **${en}**`, a, { sentence: s })),
      bd("Build the French for: **a red car**", "une voiture rouge", { more: ["un", "noire"], ...fr("une voiture rouge") }),
      (rng) => bd("Build the French for: **I like the music.**", "J'aime la musique", { more: some(rng, ["le", "une"], 1), ...fr("J'aime la musique") }),
      (rng) => bd("Build the French for: **He is eleven years old.**", "Il a onze ans", { more: some(rng, ["est", "suis", "as"], 2), ...fr("Il a onze ans") }),
    ],
  },
};

export const grammar = {
  "my-your-his-and-her": possessives,
  "want-can-and-must": wantCanAndMust,
  "going-to-do-things": goingToDoThings,
  "french-and-english-compared": frenchAndEnglishCompared,
};

export const grammarVisuals = {
  "my-your-his-and-her": place("room", "A boy and a girl each pointing at things in a room.", [["👦", 110, 170, 80], ["👧", 290, 170, 80], ["🎒", 200, 200, 50]], "Whose is it?"),
  "want-can-and-must": place("room", "A child standing next to a toy and a broom.", [["🧒", 110, 170, 80], ["🧸", 230, 190, 60], ["🧹", 320, 170, 70]], "What do you want, can and must do?"),
  "going-to-do-things": place("plain", "A calendar and a suitcase ready for plans.", [["📅", 130, 120, 90], ["🧳", 280, 120, 80]], "What are you going to do?"),
  "french-and-english-compared": place("plain", "A French flag and a British flag side by side.", [["🇫🇷", 120, 120, 90], ["🇬🇧", 280, 120, 90]], "How are the two languages alike and different?"),
};

export const grammarRules = {
  "my-your-his-and-her": [
    rule(/^Choose the right word: \*\*___ (.+?)\*\* \(/, (q, m) => {
      const noun = NOUN_BY_WORD[m[1]];
      return noun ? scene(`A picture of ${noun[2]}.`, [noun[3]]) : null;
    }),
  ],
};
