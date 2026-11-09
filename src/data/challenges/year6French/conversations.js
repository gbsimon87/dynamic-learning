import { ch, bd, od, st, ty, some } from "../topicBank.js";
import { rule } from "../figures.js";
import { fr, vocab } from "../year5French/shared.js";
import { scene, place } from "./figures.js";

// Strand "Conversations". Every French phrase is on screen; the 🔊 button is optional help.

/* ---------- Asking for Help ---------- */

// [French, English]
const HELP = [
  ["Pouvez-vous répéter ?", "Can you repeat that?"],
  ["Je ne comprends pas.", "I do not understand."],
  ["Qu'est-ce que ça veut dire ?", "What does that mean?"],
  ["Comment dit-on « hello » en français ?", "How do you say “hello” in French?"],
  ["Plus lentement, s'il vous plaît.", "More slowly, please."],
  ["Comment ça s'écrit ?", "How do you spell that?"],
  ["J'ai besoin d'aide.", "I need help."],
  ["Je ne sais pas.", "I do not know."],
];
const HELP_FR = HELP.map((h) => h[0]);
const HELP_EN = HELP.map((h) => h[1]);
// [situation, the one right phrase, three clearly wrong phrases]
const SITUATIONS_A = [
  ["Your teacher speaks too fast and you cannot follow.", "Plus lentement, s'il vous plaît.", ["Je ne sais pas.", "Comment ça s'écrit ?", "J'ai besoin d'aide."]],
  ["You want to know how to spell a French word.", "Comment ça s'écrit ?", ["Plus lentement, s'il vous plaît.", "Je ne sais pas.", "Pouvez-vous répéter ?"]],
  ["You did not hear your friend and you want to hear it again.", "Pouvez-vous répéter ?", ["Comment ça s'écrit ?", "J'ai besoin d'aide.", "Je ne sais pas."]],
  ["You are stuck on your work and you want a hand from your teacher.", "J'ai besoin d'aide.", ["Pouvez-vous répéter ?", "Comment ça s'écrit ?", "Je ne sais pas."]],
];
const SITUATIONS_B = [
  ["You see a new French word on the board and want to know what it means.", "Qu'est-ce que ça veut dire ?", ["Comment ça s'écrit ?", "Plus lentement, s'il vous plaît.", "Je ne sais pas."]],
  ["You want to know the French for “rabbit”.", "Comment dit-on « rabbit » en français ?", ["Qu'est-ce que ça veut dire ?", "Plus lentement, s'il vous plaît.", "Je ne sais pas."]],
  ["Your teacher asks you a question and you have no idea of the answer.", "Je ne sais pas.", ["Comment ça s'écrit ?", "Plus lentement, s'il vous plaît.", "Pouvez-vous répéter ?"]],
  ["Your teacher explains and you have understood nothing at all.", "Je ne comprends pas.", ["Comment ça s'écrit ?", "Comment dit-on « cat » en français ?", "Merci beaucoup."]],
];
const POLITE = ["Merci beaucoup.", "Au revoir, Madame.", "Bonjour, Madame.", "De rien."];

const askingForHelp = {
  rule: "When you are not sure in French, ask! Je ne comprends pas means I do not understand. Pouvez-vous répéter ? asks someone to say it again, and plus lentement, s'il vous plaît asks them to go more slowly. Comment dit-on … en français ? asks for a French word, Qu'est-ce que ça veut dire ? asks for a meaning and Comment ça s'écrit ? asks how to spell it.",
  hint: "Think about what you need: to hear it again, to hear it slower, a meaning, a spelling or a hand?",
  levels: {
    1: [
      ...HELP.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, HELP_EN, 3, [en]), fr(f))),
      ch("In **J'ai besoin d'aide**, which word means **help**?", "aide", ["besoin", "J'ai", "comprends"]),
      ch("In **Plus lentement, s'il vous plaît**, which word means **slowly**?", "lentement", ["plus", "plaît", "vous"]),
      ch("In **Je ne comprends pas**, which word means **understand**?", "comprends", ["ne", "pas", "Je"]),
      ch("In **Pouvez-vous répéter ?**, which word means **repeat**?", "répéter", ["Pouvez-vous", "lentement", "comprends"]),
      ch("You hear **Comment ça s'écrit ?** What is the question about?", "How a word is spelt", ["What a word means", "How fast to talk", "Who is speaking"], fr("Comment ça s'écrit ?")),
    ],
    2: [
      ...HELP.map(([f, en]) => (rng) => ch(`Which French phrase means: **${en}**`, f, some(rng, HELP_FR, 3, [f]))),
      ...SITUATIONS_A.map(([s, a, w]) => ch(`${s} What do you say?`, a, w, fr(a))),
      st("Does the phrase ask a question or say something?", ["Asks a question (?)", "Says something (.)"], [
        ["Pouvez-vous répéter ?", 0], ["Qu'est-ce que ça veut dire ?", 0], ["Comment ça s'écrit ?", 0], ["Comment dit-on « hello » en français ?", 0],
        ["Je ne comprends pas.", 1], ["Plus lentement, s'il vous plaît.", 1], ["J'ai besoin d'aide.", 1], ["Je ne sais pas.", 1],
      ]),
      st("Is the phrase about a word, or about help in general?", ["Asks about a word", "Asks for help or says you are lost"], [
        ["Comment dit-on « hello » en français ?", 0], ["Qu'est-ce que ça veut dire ?", 0], ["Comment ça s'écrit ?", 0],
        ["J'ai besoin d'aide.", 1], ["Je ne comprends pas.", 1], ["Pouvez-vous répéter ?", 1], ["Plus lentement, s'il vous plaît.", 1],
      ]),
    ],
    3: [
      od("Léa needs help from her teacher. Put the chat in order.", ["Bonjour, Madame.", "J'ai besoin d'aide, s'il vous plaît.", "Oui, bien sûr !", "Merci, Madame."]),
      od("Tom asks about a French word. Put the chat in order.", ["Madame, comment dit-on « apple » en français ?", "On dit « pomme ».", "Comment ça s'écrit ?", "P-O-M-M-E."]),
      od("Hugo cannot follow his teacher. Put the chat in order.", ["Pardon, je ne comprends pas.", "Plus lentement, s'il vous plaît.", "Oui, bien sûr. Je répète.", "Ah, je comprends. Merci !"]),
      od("Chloé asks a friend for a French word. Put the chat in order.", ["Salut, Chloé !", "Comment dit-on « boat » en français ?", "On dit « bateau ».", "Merci, Chloé !"]),
      ...HELP.map(([f, en]) => bd(`Build the French: **${en}**`, f, fr(f))),
      st("Is the speaker asking for help, or being polite?", ["Asking for help", "Being polite"], [
        ["Pouvez-vous répéter ?", 0], ["J'ai besoin d'aide.", 0], ["Je ne comprends pas.", 0], ["Comment ça s'écrit ?", 0],
        ...POLITE.map((p) => [p, 1]),
      ]),
      ch("Fill the gap: **Je ne ___ pas.** (I do not understand)", "comprends", ["sais", "répète", "aide"]),
      ch("Fill the gap: **Plus ___, s'il vous plaît.** (more slowly)", "lentement", ["besoin", "répéter", "comprends"]),
      ch("Fill the gap: **J'ai besoin d'___.** (help)", "aide", ["écrit", "répéter", "lentement"]),
      ch("Fill the gap: **Comment ça s'___ ?** (How do you spell that?)", "écrit", ["aide", "répète", "dit"]),
    ],
    4: [
      ty("Type the missing word. I do not understand.\n\nJe ne ___ pas.", "comprends"),
      ty("Type the missing word. I need help.\n\nJ'ai ___ d'aide.", "besoin"),
      ty("Type the missing word. More slowly, please.\n\nPlus ___, s'il vous plaît.", "lentement"),
      ty("Type the missing word. What does that mean?\n\nQu'est-ce que ça veut ___ ?", "dire"),
      ty("Type the missing word. I need help.\n\nJ'ai besoin d'___.", "aide"),
      ty("Type the missing word. How do you say “dog” in French?\n\n___ dit-on « dog » en français ?", "comment"),
      ty("Type the missing word. I do not understand.\n\nJe ne comprends ___.", "pas"),
      ty("Type the missing word. I do not know.\n\nJe ne ___ pas.", "sais"),
      bd("Ask your teacher: **Can you repeat that, please?**", "Pouvez-vous répéter, s'il vous plaît ?", { more: ["lentement", "comprends"] }),
      bd("Ask how to spell a word: **How do you spell that?**", "Comment ça s'écrit ?", { more: ["dit-on", "besoin"] }),
      bd("Say you need help: **I need help.**", "J'ai besoin d'aide.", { more: ["Je", "comprends"] }),
      bd("Say you do not understand: **I do not understand.**", "Je ne comprends pas.", { more: ["sais", "aide"] }),
      ...SITUATIONS_B.map(([s, a, w]) => ch(`${s} What do you say?`, a, w, fr(a))),
    ],
  },
};

/* ---------- Opinions and Reasons ---------- */

// [French, English, French words that could also fit the English, so are never offered as wrong answers]
const ADJ = [
  ["amusant", "fun", ["génial", "intéressant"]],
  ["ennuyeux", "boring", ["nul"]],
  ["intéressant", "interesting", ["amusant", "génial"]],
  ["difficile", "difficult", []],
  ["facile", "easy", []],
  ["génial", "brilliant", ["amusant", "intéressant"]],
  ["nul", "rubbish", ["ennuyeux"]],
];
const adjEnWrong = (rng, f) => some(rng, ADJ.filter((a) => a[0] !== f && !ADJ.find((x) => x[0] === f)[2].includes(a[0])).map((a) => a[1]), 3);
const adjFrWrong = (rng, f) => some(rng, ADJ.filter((a) => a[0] !== f && !ADJ.find((x) => x[0] === f)[2].includes(a[0])).map((a) => a[0]), 3);
const REACT = [
  ["Moi aussi.", "Me too.", ["Not me.", "Because.", "I think that."]],
  ["Pas moi.", "Not me.", ["Me too.", "Because.", "In my opinion."]],
  ["Je suis d'accord.", "I agree.", ["I disagree.", "Because.", "I think that."]],
  ["Je ne suis pas d'accord.", "I disagree.", ["I agree.", "Because.", "In my opinion."]],
];
const STARTERS = [
  ["Je pense que", "I think that", ["because", "me too", "I disagree"]],
  ["À mon avis", "in my opinion", ["because", "not me", "I agree"]],
  ["parce que", "because", ["me too", "I think that", "I disagree"]],
];

const opinionsAndReasons = {
  rule: "Give an opinion with je pense que (I think that) or à mon avis (in my opinion), then give a reason with parce que (because) and c'est + an adjective: J'aime le sport parce que c'est amusant. Answer someone with moi aussi (me too), pas moi (not me), je suis d'accord (I agree) or je ne suis pas d'accord (I disagree).",
  hint: "Is the opinion good or bad? Do you agree with the other person or not?",
  levels: {
    1: [
      ...ADJ.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, adjEnWrong(rng, f), fr(`C'est ${f}`))),
      ...STARTERS.map(([f, en, w]) => ch(`What does **${f}** mean?`, en, w, fr(f))),
      ...REACT.map(([f, en, w]) => ch(`What does **${f}** mean?`, en, w, fr(f))),
    ],
    2: [
      ...ADJ.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, adjFrWrong(rng, f))),
      ch("Which French word means the opposite of **difficile**?", "facile", ["ennuyeux", "nul", "intéressant"]),
      ch("Which French word means the opposite of **facile**?", "difficile", ["amusant", "génial", "intéressant"]),
      ch("Which French word means the opposite of **génial**?", "nul", ["facile", "difficile", "amusant"]),
      ch("Which French word means the opposite of **nul**?", "génial", ["difficile", "facile", "ennuyeux"]),
      st("Is it a good opinion or a bad opinion?", ["A good opinion", "A bad opinion"], [["amusant", 0], ["intéressant", 0], ["génial", 0], ["ennuyeux", 1], ["nul", 1]]),
      st("Does the person like it or not?", ["Likes it", "Does not like it"], [["J'adore le sport.", 0], ["J'aime la musique.", 0], ["J'aime le chocolat.", 0], ["Je déteste les maths.", 1], ["Je n'aime pas le poisson.", 1], ["Je n'aime pas la pluie.", 1]]),
      st("Do they agree or disagree?", ["I agree", "I disagree"], [["Moi aussi.", 0], ["Je suis d'accord.", 0], ["Pas moi.", 1], ["Je ne suis pas d'accord.", 1]]),
    ],
    3: [
      bd("Build the French: **I like football because it is fun.**", "J'aime le football parce que c'est amusant.", fr("J'aime le football parce que c'est amusant.")),
      bd("Build the French: **I do not like history because it is boring.**", "Je n'aime pas l'histoire parce que c'est ennuyeux.", fr("Je n'aime pas l'histoire parce que c'est ennuyeux.")),
      bd("Build the French: **I love art because it is interesting.**", "J'adore l'art parce que c'est intéressant.", fr("J'adore l'art parce que c'est intéressant.")),
      bd("Build the French: **I think that sport is great.**", "Je pense que le sport est génial.", fr("Je pense que le sport est génial.")),
      bd("Build the French: **In my opinion, it is rubbish.**", "À mon avis, c'est nul.", fr("À mon avis, c'est nul.")),
      bd("Build the French: **I think that it is difficult.**", "Je pense que c'est difficile.", fr("Je pense que c'est difficile.")),
      bd("Build the French: **Me too! I like pizza.**", "Moi aussi ! J'aime la pizza.", fr("Moi aussi ! J'aime la pizza.")),
      bd("Build the French: **I do not agree.**", "Je ne suis pas d'accord.", fr("Je ne suis pas d'accord.")),
      bd("Build the French: **I agree.**", "Je suis d'accord.", fr("Je suis d'accord.")),
      od("Léa and Tom talk about school. Put the chat in order.", ["Tu aimes l'école ?", "Oui, j'aime l'école.", "Pourquoi ?", "Parce que c'est intéressant."]),
      od("Hugo and Chloé talk about football. Put the chat in order.", ["Tu aimes le football ?", "Oui, j'adore le football.", "Pourquoi ?", "Parce que c'est génial !"]),
      od("Léa and Tom talk about maths. Put the chat in order.", ["Je pense que les maths sont faciles.", "Je ne suis pas d'accord !", "Pourquoi ?", "Parce que c'est difficile."]),
      ch("Which words join the two parts? **J'aime le sport ___ c'est amusant.**", "parce que", ["moi aussi", "pas moi", "je suis d'accord"]),
      ch("Which words start the opinion? **___, le football est génial.**", "À mon avis", ["Parce que", "Moi aussi", "Pas moi"]),
      ch("Which words start the opinion? **___ le français est facile.**", "Je pense que", ["Parce que", "Pas moi", "Moi aussi"]),
      ch("Which words give the reason? **Je n'aime pas les maths ___ c'est difficile.**", "parce que", ["je pense que", "moi aussi", "pas moi"]),
    ],
    4: [
      ty("Type the missing word. I think that it is great.\n\nJe pense ___ c'est génial.", "que"),
      ty("Type the missing word. I like sport because it is fun.\n\nJ'aime le sport parce ___ c'est amusant.", "que"),
      ty("Type the missing word. I do not like maths because it is difficult.\n\nJe n'aime pas les maths ___ que c'est difficile.", "parce"),
      ty("Type the missing word. In my opinion, it is interesting.\n\nÀ mon ___, c'est intéressant.", "avis"),
      ty("Type the missing word. I agree.\n\nJe suis d'___.", "accord"),
      ty("Type the missing word. Me too!\n\nMoi ___ !", "aussi"),
      ty("Type the missing word. Not me.\n\n___ moi.", "pas"),
      ty("Type the missing word. It is boring.\n\nC'est ___.", "ennuyeux"),
      ty("Type the missing word. It is easy.\n\nC'est ___.", "facile"),
      ty("Type the missing word. It is difficult.\n\nC'est ___.", "difficile"),
      ty("Type the missing word. It is fun.\n\nC'est ___.", "amusant"),
      bd("Build the French: **I think that French is fun.**", "Je pense que le français est amusant.", { more: ["parce", "pas"] }),
      bd("Build the French: **I like football because it is great.**", "J'aime le football parce que c'est génial.", { more: ["pense", "ennuyeux"] }),
      bd("Build the French: **Not me. I do not like fish.**", "Pas moi. Je n'aime pas le poisson.", { more: ["aussi", "déteste"] }),
      bd("Build the French: **Me too! I love dancing.**", "Moi aussi ! J'adore danser.", { more: ["pas", "aime"] }),
      ch("Tom thinks maths is boring. What does he say?", "Je pense que c'est ennuyeux.", ["Je pense que c'est amusant.", "Je pense que c'est génial.", "Je pense que c'est facile."]),
      ch("Léa loves the zoo because it is interesting. What does she say?", "J'adore le zoo parce que c'est intéressant.", ["Je déteste le zoo parce que c'est intéressant.", "J'adore le zoo parce que c'est ennuyeux.", "J'adore le zoo parce que c'est nul."]),
      ch("Hugo does not like swimming because it is difficult. What does he say?", "Je n'aime pas nager parce que c'est difficile.", ["J'aime nager parce que c'est difficile.", "Je n'aime pas nager parce que c'est facile.", "J'aime nager parce que c'est facile."]),
      ch("Chloé says: **Le chocolat, c'est génial !** Tom loves chocolate too. What does he say?", "Moi aussi !", ["Pas moi !", "Je ne suis pas d'accord !", "Parce que c'est nul !"], fr("Le chocolat, c'est génial !")),
      ch("Léa says: **Les araignées, c'est amusant.** Tom disagrees. What does he say?", "Je ne suis pas d'accord.", ["Je suis d'accord.", "Moi aussi.", "Parce que c'est amusant."], fr("Les araignées, c'est amusant.")),
      ch("Chloé says: **J'adore les épinards.** Hugo does not like spinach. What does he say?", "Pas moi.", ["Moi aussi.", "Je suis d'accord.", "Parce que c'est génial."], fr("J'adore les épinards.")),
      ch("Hugo says: **Le français, c'est facile.** Léa thinks the same. What does she say?", "Je suis d'accord.", ["Je ne suis pas d'accord.", "Pas moi.", "Parce que c'est facile."], fr("Le français, c'est facile.")),
    ],
  },
};

/* ---------- Daily Routine and Time ---------- */

const HOURS = ["", "une", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze"];
const heures = (h) => (h === 1 ? "une heure" : `${HOURS[h]} heures`);
/** "sept heures et demie" for 7:30 (hours 1 to 10 for quarter to). */
const timeFr = (h, m) => (m === 0 ? heures(h) : m === 15 ? `${heures(h)} et quart` : m === 30 ? `${heures(h)} et demie` : `${heures(h + 1)} moins le quart`);
const timeEn = (h, m) => `${h}:${String(m).padStart(2, "0")}`;
const MINUTES = [0, 15, 30, 45];
const otherTimes = (h, m) => [...MINUTES.filter((x) => x !== m).slice(0, 2).map((x) => timeEn(h, x)), timeEn(h + 1, m)];
const READ_TIMES = [[7, 0], [3, 30], [9, 15], [4, 45], [2, 0], [6, 30], [10, 15], [8, 45]];
const SAY_TIMES = [[7, 15], [3, 30], [9, 45], [4, 15], [6, 30], [8, 45], [2, 15], [5, 30]];
const frWrongTimes = (h, m) => {
  const others = [15, 30, 45].filter((x) => x !== m);
  return [...others.map((x) => `Il est ${timeFr(h, x)}.`), `Il est ${timeFr(h + 1, m)}.`];
};
const TIMEWORDS = [
  ["midi", "midday", ["midnight", "half past", "quarter to"]],
  ["minuit", "midnight", ["midday", "half past", "quarter past"]],
  ["et demie", "half past", ["quarter past", "quarter to", "midday"]],
  ["et quart", "quarter past", ["quarter to", "half past", "midnight"]],
  ["moins le quart", "quarter to", ["quarter past", "half past", "midday"]],
];
// [French, English]
const ROUTINE = [
  ["Je me lève", "I get up"],
  ["Je me lave", "I wash"],
  ["Je prends le petit déjeuner", "I have breakfast"],
  ["Je vais à l'école", "I go to school"],
  ["Je rentre", "I come home"],
  ["Je me couche", "I go to bed"],
];
const ROUTINE_EN = ROUTINE.map((r) => r[1]);
const ROUTINE_FR = ROUTINE.map((r) => r[0]);
// [name, pronoun, French, what they do (after "does she/he"), time, three wrong times]
const WHEN = [
  ["Léa", "she", "Je me lève à six heures et demie.", "get up", "6:30", ["6:15", "7:30", "5:30"]],
  ["Hugo", "he", "Je vais à l'école à neuf heures moins le quart.", "go to school", "8:45", ["9:15", "9:45", "8:15"]],
  ["Chloé", "she", "Je rentre à quatre heures et quart.", "come home", "4:15", ["4:45", "5:15", "4:30"]],
  ["Tom", "he", "Je prends le petit déjeuner à sept heures et demie.", "have breakfast", "7:30", ["7:15", "8:30", "7:45"]],
];

const dailyRoutineAndTime = {
  rule: "To tell the time, say il est … heures: Il est sept heures. Add et demie for half past, et quart for quarter past and moins le quart for quarter to (with the next hour: huit heures moins le quart is 7:45). Midday is midi and midnight is minuit. For your day, use je me lève (I get up), je me lave, je prends le petit déjeuner, je vais à l'école, je rentre and je me couche, then à and the time.",
  hint: "Find the hour first, then look for et demie, et quart or moins le quart. For moins le quart, the time is a quarter before the hour you hear.",
  levels: {
    1: [
      ...ROUTINE.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, ROUTINE_EN, 3, [en]), fr(f))),
      ...TIMEWORDS.map(([f, en, w]) => ch(`What does **${f}** mean when you tell the time?`, en, w, fr(f))),
      ...READ_TIMES.map(([h, m]) => ch(`What time is it? **Il est ${timeFr(h, m)}.**`, timeEn(h, m), otherTimes(h, m), fr(`Il est ${timeFr(h, m)}.`))),
    ],
    2: [
      ...SAY_TIMES.map(([h, m]) => ch(`How do you say **${timeEn(h, m)}** in French?`, `Il est ${timeFr(h, m)}.`, frWrongTimes(h, m))),
      ...ROUTINE.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, ROUTINE_FR, 3, [f]))),
      st("Which time word is it?", ["Half past (et demie)", "Quarter past (et quart)", "Quarter to (moins le quart)"], [
        ["trois heures et demie", 0], ["sept heures et demie", 0], ["neuf heures et demie", 0],
        ["quatre heures et quart", 1], ["six heures et quart", 1], ["dix heures et quart", 1],
        ["huit heures moins le quart", 2], ["deux heures moins le quart", 2], ["cinq heures moins le quart", 2],
      ]),
      st("Does it happen at the start or the end of the day?", ["Start of the day", "End of the day"], [
        ["Je me lève", 0], ["Je prends le petit déjeuner", 0], ["Je vais à l'école", 0], ["Je rentre", 1], ["Je me couche", 1],
      ]),
    ],
    3: [
      od("Put Léa's morning in order.", ["Je me lève à sept heures.", "Je prends le petit déjeuner à sept heures et demie.", "Je vais à l'école à huit heures et demie.", "Je rentre à quatre heures."]),
      od("Put Tom's day in order.", ["Je me lave à six heures et demie.", "Je prends le petit déjeuner à sept heures.", "Je vais à l'école à huit heures moins le quart.", "Je me couche à huit heures et demie."]),
      od("Put these times in order, earliest first.", ["six heures", "sept heures et quart", "huit heures et demie", "neuf heures moins le quart"]),
      od("Put these times from midday onwards in order, earliest first.", ["midi", "une heure et demie", "trois heures et quart", "quatre heures moins le quart"]),
      bd("Build the French: **It is half past seven.**", "Il est sept heures et demie.", fr("Il est sept heures et demie.")),
      bd("Build the French: **It is midday.**", "Il est midi.", fr("Il est midi.")),
      bd("Build the French: **It is midnight.**", "Il est minuit.", fr("Il est minuit.")),
      bd("Build the French: **I get up at seven o'clock.**", "Je me lève à sept heures.", fr("Je me lève à sept heures.")),
      bd("Build the French: **I go to school at half past eight.**", "Je vais à l'école à huit heures et demie.", fr("Je vais à l'école à huit heures et demie.")),
      bd("Build the French: **I go to bed at nine o'clock.**", "Je me couche à neuf heures.", fr("Je me couche à neuf heures.")),
      bd("Build the French: **I come home at quarter past four.**", "Je rentre à quatre heures et quart.", fr("Je rentre à quatre heures et quart.")),
      bd("Build the French: **I have breakfast.**", "Je prends le petit déjeuner.", fr("Je prends le petit déjeuner.")),
      ...WHEN.map(([name, pron, f, doing, time, w]) => ch(`${name} says: **${f}** At what time does ${pron} ${doing}?`, time, w, fr(f))),
    ],
    4: [
      ty("Type the missing word. It is seven o'clock.\n\nIl est sept ___.", "heures"),
      ty("Type the missing word. It is midnight.\n\nIl est ___.", "minuit"),
      ty("Type the missing word. It is midday.\n\nIl est ___.", "midi"),
      ty("Type the missing word. It is half past three.\n\nIl est trois heures et ___.", "demie"),
      ty("Type the missing word. It is quarter past three.\n\nIl est trois heures et ___.", "quart"),
      ty("Type the missing word. It is quarter to five.\n\nIl est cinq heures moins le ___.", "quart"),
      ty("Type the missing word. I go to bed at nine o'clock.\n\nJe me ___ à neuf heures.", "couche"),
      ty("Type the missing word. I wash at seven o'clock.\n\nJe me ___ à sept heures.", "lave"),
      ty("Type the missing word. I have breakfast.\n\nJe ___ le petit déjeuner.", "prends"),
      ty("Type the missing word. I go to school at eight o'clock.\n\nJe ___ à l'école à huit heures.", "vais"),
      ty("Type the missing word. I come home at four o'clock.\n\nJe ___ à quatre heures.", "rentre"),
      bd("Build the French: **I go to bed at quarter past eight.**", "Je me couche à huit heures et quart.", { more: ["lève", "demie"] }),
      bd("Build the French: **It is quarter to nine.**", "Il est neuf heures moins le quart.", { more: ["et", "demie"] }),
      bd("Build the French: **I wash at half past six.**", "Je me lave à six heures et demie.", { more: ["rentre", "quart"] }),
      ch("Hugo goes to bed at 8:30. Which sentence is right?", "Je me couche à huit heures et demie.", ["Je me lève à huit heures et demie.", "Je me couche à huit heures et quart.", "Je me couche à neuf heures et demie."]),
      ch("Léa comes home at 4:45. Which sentence is right?", "Je rentre à cinq heures moins le quart.", ["Je rentre à quatre heures et quart.", "Je rentre à quatre heures et demie.", "Je vais à l'école à cinq heures moins le quart."]),
      ch("Tom gets up at 6:45. Which sentence is right?", "Je me lève à sept heures moins le quart.", ["Je me lève à six heures et quart.", "Je me lève à sept heures et quart.", "Je me couche à sept heures moins le quart."]),
      ch("Chloé has breakfast at 7:15. Which sentence is right?", "Je prends le petit déjeuner à sept heures et quart.", ["Je prends le petit déjeuner à sept heures et demie.", "Je prends le petit déjeuner à huit heures et quart.", "Je rentre à sept heures et quart."]),
    ],
  },
};

/* ---------- Holidays and Travel ---------- */

// [French, English, with en/au, English with "in"]
const COUNTRIES = [
  ["l'Angleterre", "England", "en Angleterre", "in England"],
  ["la France", "France", "en France", "in France"],
  ["l'Espagne", "Spain", "en Espagne", "in Spain"],
  ["l'Allemagne", "Germany", "en Allemagne", "in Germany"],
  ["l'Italie", "Italy", "en Italie", "in Italy"],
  ["l'Écosse", "Scotland", "en Écosse", "in Scotland"],
  ["le pays de Galles", "Wales", "au pays de Galles", "in Wales"],
];
// [French, English, emoji]
const TRANSPORT = [
  ["en voiture", "by car", "🚗"],
  ["en train", "by train", "🚆"],
  ["en avion", "by plane", "✈️"],
  ["en bateau", "by boat", "⛴️"],
  ["à vélo", "by bike", "🚲"],
  ["à pied", "on foot", "🚶"],
];
const TRANSPORT_EN = TRANSPORT.map((t) => t[1]);
const TRANSPORT_FR = TRANSPORT.map((t) => t[0]);
const ACTIVITIES = [
  ["Je nage dans la mer.", "I swim in the sea."],
  ["Je joue sur la plage.", "I play on the beach."],
  ["Je visite un château.", "I visit a castle."],
  ["Je mange une glace.", "I eat an ice cream."],
  ["Je prends des photos.", "I take photos."],
  ["Je fais du vélo.", "I go cycling."],
];
const ACTIVITIES_EN = ACTIVITIES.map((a) => a[1]);
// [French, English, country, how, three wrong English answers, three wrong French sentences]
const TRIPS = [
  ["Je vais en France en train.", "I am going to France by train.", "France", "by train", ["To Spain, by train", "To France, by plane", "To Italy, by boat"],
    ["Je vais en France en avion.", "Je vais en Italie en train.", "Je vais en France à vélo."]],
  ["Je vais en Espagne en avion.", "I am going to Spain by plane.", "Spain", "by plane", ["To Italy, by plane", "To Spain, by boat", "To France, by car"],
    ["Je vais en Espagne en bateau.", "Je vais en Italie en avion.", "Je vais en Espagne en voiture."]],
  ["Je vais en Italie en voiture.", "I am going to Italy by car.", "Italy", "by car", ["To Spain, by car", "To Italy, by train", "To Germany, by boat"],
    ["Je vais en Italie en train.", "Je vais en Espagne en voiture.", "Je vais en Italie à pied."]],
  ["Je vais au pays de Galles en bateau.", "I am going to Wales by boat.", "Wales", "by boat", ["To Scotland, by boat", "To Wales, by plane", "To England, by bike"],
    ["Je vais au pays de Galles en avion.", "Je vais en Écosse en bateau.", "Je vais au pays de Galles à vélo."]],
  ["Je vais en Allemagne à vélo.", "I am going to Germany by bike.", "Germany", "by bike", ["To France, by bike", "To Germany, on foot", "To Spain, by car"],
    ["Je vais en Allemagne à pied.", "Je vais en France à vélo.", "Je vais en Allemagne en voiture."]],
  ["Je vais en Écosse en train.", "I am going to Scotland by train.", "Scotland", "by train", ["To England, by train", "To Scotland, by boat", "To Wales, by plane"],
    ["Je vais en Écosse en bateau.", "Je vais en Angleterre en train.", "Je vais en Écosse en voiture."]],
];

const holidaysAndTravel = {
  rule: "Use en with most countries (en France, en Espagne, en Italie, en Écosse) but au with le pays de Galles. Say how you travel with en for vehicles (en voiture, en train, en avion, en bateau) and à for bike and on foot (à vélo, à pied). Put it together to present a trip: Je vais en France en train. Je nage dans la mer.",
  hint: "For the country, think en or au. For the journey, think of a vehicle (en) or a bike or your feet (à).",
  levels: {
    1: [
      ...COUNTRIES.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, COUNTRIES.map((c) => c[1]), 3, [en]), fr(f))),
      ...TRANSPORT.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, TRANSPORT_EN, 3, [en]), fr(f))),
      ...ACTIVITIES.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, ACTIVITIES_EN, 3, [en]), fr(f))),
    ],
    2: [
      ...COUNTRIES.map(([, , f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, COUNTRIES.map((c) => c[2]), 3, [f]))),
      ...TRANSPORT.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, TRANSPORT_FR, 3, [f]))),
      ...COUNTRIES.map(([f, , form]) => {
        const little = form.split(" ")[0];
        const country = f.startsWith("le ") ? f.slice(3) : f.replace(/^(la |l')/, "");
        return ch(`Choose the little word: **Je vais ___ ${country}.**`, little, ["en", "au", "aux", "à la"].filter((x) => x !== little));
      }),
      st("Is it en or à for the journey?", ["en …", "à …"], TRANSPORT.map(([f]) => [f, f.startsWith("en") ? 0 : 1])),
      st("Is it a country, a way to travel or something you do?", ["A country", "A way to travel", "Something you do"], [
        ["l'Italie", 0], ["la France", 0], ["l'Espagne", 0], ["en train", 1], ["en avion", 1], ["à pied", 1],
        ["Je nage dans la mer.", 2], ["Je mange une glace.", 2], ["Je visite un château.", 2],
      ]),
    ],
    3: [
      ...TRIPS.map(([f, en]) => bd(`Build the French: **${en}**`, f, fr(f))),
      ...ACTIVITIES.map(([f, en]) => bd(`Build the French: **${en}**`, f, fr(f))),
      ...TRIPS.map(([f, , country, how, w]) => ch(`Tom says: **${f}** Where is he going, and how?`, `To ${country}, ${how}`, w, fr(f))),
      od("Léa presents her holiday. Put her talk in order.", ["Bonjour à tous !", "Je vais en Italie en avion.", "Je mange une glace sur la plage.", "Merci et au revoir !"]),
      od("Hugo presents his holiday. Put his talk in order.", ["Bonjour, je m'appelle Hugo.", "Je vais en Écosse en train.", "Je visite un château.", "Merci !"]),
    ],
    4: [
      ...vocab([
        ["la voiture", "car", "🚗"], ["le train", "train", "🚆"], ["l'avion", "plane", "✈️"], ["le bateau", "boat", "⛴️"],
        ["la plage", "beach", "🏖️"], ["la mer", "sea", "🌊"], ["la glace", "ice cream", "🍦"], ["la valise", "suitcase", "🧳"], ["le vélo", "bike", "🚲"],
      ]).type,
      ty("Type the missing word. I am going to France.\n\nJe vais en ___.", "france"),
      ty("Type the missing word. I am going to Spain.\n\nJe vais en ___.", "espagne"),
      ty("Type the missing word. I am going to Italy.\n\nJe vais en ___.", "italie"),
      ty("Type the missing word. I am going to Germany.\n\nJe vais en ___.", "allemagne"),
      ty("Type the missing word. I am going to Wales.\n\nJe vais ___ pays de Galles.", "au"),
      ty("Type the missing word. I swim in the sea.\n\nJe ___ dans la mer.", "nage"),
      ty("Type the missing word. I play on the beach.\n\nJe ___ sur la plage.", "joue"),
      bd("Build the French: **I am going to Italy by car.**", "Je vais en Italie en voiture.", { more: ["avion", "au"] }),
      bd("Build the French: **I am going to Wales by train.**", "Je vais au pays de Galles en train.", { more: ["en", "à"] }),
      bd("Build the French: **I am going to Spain on foot.**", "Je vais en Espagne à pied.", { more: ["vélo", "au"] }),
      bd("Build the French: **I eat an ice cream on the beach.**", "Je mange une glace sur la plage.", { more: ["mer", "joue"] }),
      ...TRIPS.map(([f, , country, how, , w]) => ch(`You are Hugo. You are going to ${country} ${how}. What do you say?`, f, w, fr(f))),
    ],
  },
};

export const conversations = {
  "asking-for-help": askingForHelp,
  "opinions-and-reasons": opinionsAndReasons,
  "daily-routine-and-time": dailyRoutineAndTime,
  "holidays-and-travel": holidaysAndTravel,
};

export const conversationsVisuals = {
  "asking-for-help": place("room", "A pupil with a hand up in a classroom while a teacher stands at the front.", [["🧑‍🏫", 110, 165, 90], ["🙋", 290, 165, 80]], "Ask for help when you need it."),
  "opinions-and-reasons": place("plain", "Two children talking, with a thumbs up and a thumbs down between them.", [["🧒", 100, 135, 80], ["🧒", 300, 135, 80], ["👍", 175, 80, 48], ["👎", 225, 80, 48]], "What do you think, and why?"),
  "daily-routine-and-time": place("plain", "A sunrise, a diary and a moon, for the start, middle and end of a day.", [["🌅", 90, 120, 80], ["📅", 200, 120, 80], ["🌙", 310, 120, 80]], "A day in French."),
  "holidays-and-travel": place("sky", "A suitcase, a map and a sun for a holiday.", [["🧳", 100, 150, 84], ["🗺️", 205, 140, 84], ["☀️", 310, 80, 70]], "Plan a holiday."),
};

const TRANSPORT_PIC = Object.fromEntries(TRANSPORT.map(([, en, e]) => [en, e]));
export const conversationsRules = {
  "holidays-and-travel": [
    rule(/^How do you say \*\*(by car|by train|by plane|by boat|by bike|on foot)\*\* in French\?/, (q, m) => scene(`A picture for ${m[1]}`, [TRANSPORT_PIC[m[1]]]), [2]),
  ],
};
