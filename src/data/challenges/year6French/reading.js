import { ch, bd, od, st, ty, nm, some } from "../topicBank.js";
import { shuffle } from "../year1Math/shared.js";
import { fr } from "../year5French/shared.js";
import { place } from "./figures.js";

// Strand "Reading and Writing". Every French word is on screen; the 🔊 button is optional help.

/* ---------- Reading Longer Texts ---------- */

/** A French text (paragraphs, or poem lines when `type` is "line"), its own 🔊 voice, and a helper for each kind of question about it. */
const text = (title, lines, kind = "story", type = "p") => {
  const passage = { title, kind, lang: "fr-FR", blocks: lines.map((line) => ({ type, text: line })) };
  return {
    passage,
    ask: (prompt, answer, wrong) => ch(prompt, answer, wrong, { passage }),
    judge: (prompt, trues, falses) => st(prompt, ["True", "False"], [...trues.map((x) => [x, 0]), ...falses.map((x) => [x, 1])], { passage }),
    sequence: (prompt, labels) => od(prompt, labels, { passage }),
    sentence: (prompt, answer) => bd(prompt, answer, { passage }),
    word: (prompt, answer) => ty(prompt, answer, { passage }),
    count: (prompt, answer) => nm(prompt, answer, { passage }),
    sorted: (prompt, bins, cards) => st(prompt, bins, cards, { passage }),
  };
};
/** One entry that gives a text's questions in a random order. */
const many = (questions) => (rng) => shuffle(rng, questions);

const letter = text("Une lettre de Chloé", [
  "Cher Tom,",
  "Merci pour ta lettre ! Moi, j'habite à Marseille avec ma mère, mon père et mon petit frère Hugo. Samedi, nous allons visiter le port. Hugo veut manger une glace, mais moi, je veux regarder les bateaux. Le soir, nous allons manger une pizza au restaurant. Et toi, tu vas faire quoi ce week-end ? Écris-moi vite !",
  "Chloé",
], "letter");
const cat = text("Le chat de Léa", [
  "Léa a un chat gris. Il s'appelle Pablo. Pablo adore dormir sur le canapé et jouer dans le jardin. Mais aujourd'hui, il pleut. Pablo ne veut pas sortir. Il reste à la maison et il regarde la pluie par la fenêtre. Léa donne du lait à Pablo. Pablo est content.",
]);
const snail = text("L'escargot et l'oiseau", [
  "Un petit escargot veut voir la mer. Il dit à un oiseau : « Je veux aller à la mer ! » L'oiseau rit : « Tu es trop petit et tu es trop lent ! » Mais l'escargot ne s'arrête pas. Il marche, il marche, jour après jour. Un mois plus tard, l'escargot est à la mer. L'oiseau est très surpris.",
  "Avec du courage, on peut aller loin.",
]);
const minou = text("Mon chat Minou", [
  "Mon chat Minou est tout doux,",
  "Il dort le jour sur mon lit,",
  "Il joue le soir comme un fou,",
  "Et il rêve toute la nuit.",
], "poem", "line");
const party = text("L'anniversaire de Tom", [
  "Demain, c'est l'anniversaire de Tom. Il va avoir onze ans. Sa mère prépare un gâteau au chocolat. Son père achète des ballons. Tom veut inviter ses amis Léa et Hugo. Ils vont jouer dans le jardin et manger le gâteau. Tom est très content !",
]);
const market = text("Au marché", [
  "Samedi matin, Hugo et sa sœur Zoé vont au marché. Il y a des fruits, des légumes et du fromage. Zoé achète six pommes rouges. Hugo veut une glace, mais ce n'est pas possible. « Tu dois d'abord manger ton déjeuner ! » dit Zoé. Hugo n'est pas content. Alors Zoé achète une petite glace pour deux. Les deux enfants sont heureux.",
]);
const shepherd = text("Il pleut, il pleut, bergère", [
  "Il pleut, il pleut, bergère,",
  "Presse tes blancs moutons ;",
  "Allons sous ma chaumière,",
  "Bergère, vite, allons !",
  "J'entends sur le feuillage",
  "L'eau qui tombe à grand bruit ;",
  "Voici, voici l'orage,",
  "Voilà l'éclair qui luit.",
], "poem", "line");
const card = text("Une carte postale", [
  "Salut Léa !",
  "Je suis à Nice avec ma famille. Il fait chaud et il y a du soleil. Le matin, je nage dans la mer. L'après-midi, je mange une glace sur la plage. Ce soir, nous allons manger au restaurant. Demain, je veux visiter le château.",
  "Bises, Tom",
], "letter");

const readingLevel1 = [
  many([
    letter.ask("Who is the letter to?", "Tom", ["Hugo", "Chloé", "Léa"]),
    letter.ask("Where does Chloé live?", "In Marseille", ["In Paris", "In Nice", "In London"]),
    letter.ask("Who does Chloé live with?", "Her parents and her little brother", ["Her grandparents", "Her teacher and her friend", "Her sister only"]),
    letter.ask("What is the family going to visit on Saturday?", "The port", ["The castle", "The school", "The market"]),
    letter.ask("What does Hugo want?", "An ice cream", ["A pizza", "A boat", "A book"]),
  ]),
  many([
    cat.ask("What colour is Pablo?", "Grey", ["Black", "White", "Orange"]),
    cat.ask("What does Pablo love doing?", "Sleeping on the sofa and playing in the garden", ["Eating fish and swimming", "Chasing mice at night", "Sitting in the car"]),
    cat.ask("What is the weather like today?", "It is raining", ["It is sunny", "It is snowing", "It is windy"]),
    cat.ask("Does Pablo want to go out today?", "No, he does not", ["Yes, he does", "Only in the evening", "Only with Léa"]),
    cat.ask("What does Léa give Pablo?", "Milk", ["Fish", "Bread", "A ball"]),
  ]),
  many([
    snail.ask("What does the snail want to see?", "The sea", ["The mountains", "The moon", "The town"]),
    snail.ask("Who does the snail talk to?", "A bird", ["A cat", "A dog", "A fish"]),
    snail.ask("What does the snail do day after day?", "He walks", ["He sleeps", "He swims", "He sings"]),
    snail.ask("After one month, where is the snail?", "At the sea", ["At home", "In the town", "In a tree"]),
  ]),
  many([
    minou.ask("What is the cat called?", "Minou", ["Pablo", "Max", "Tom"]),
    minou.ask("Where does Minou sleep in the day?", "On the bed", ["In the garden", "On the sofa", "In a box"]),
    minou.ask("When does Minou play?", "In the evening", ["In the morning", "At lunchtime", "At night"]),
    minou.ask("What does Minou do at night?", "He dreams", ["He plays", "He eats", "He sings"]),
  ]),
  many([
    party.ask("Whose birthday is it?", "Tom's", ["Léa's", "Hugo's", "Tom's father's"]),
    party.ask("When is the birthday?", "Tomorrow", ["Today", "Next week", "Yesterday"]),
    party.ask("How old is Tom going to be?", "Eleven", ["Nine", "Ten", "Twelve"]),
    party.ask("What is Tom's mother making?", "A chocolate cake", ["A pizza", "An ice cream", "Some soup"]),
    party.ask("Who buys the balloons?", "Tom's father", ["Tom's mother", "Léa", "Hugo"]),
  ]),
  many([
    market.ask("When do Hugo and Zoé go to the market?", "On Saturday morning", ["On Sunday morning", "On Friday evening", "On Saturday night"]),
    market.ask("Who goes to the market with Hugo?", "His sister Zoé", ["His mother", "His friend Tom", "His teacher"]),
    market.ask("What does Zoé buy first?", "Six red apples", ["Some cheese", "An ice cream", "Some bananas"]),
    market.ask("What does Hugo want?", "An ice cream", ["Some cheese", "Some fruit", "A drink"]),
  ]),
  many([
    shepherd.ask("What is the weather like in the poem?", "It is raining", ["It is sunny", "It is snowing", "It is foggy"]),
    shepherd.ask("Who is the poet talking to? (A **bergère** looks after sheep.)", "A shepherdess", ["A teacher", "A baker", "A king"]),
    shepherd.ask("Which words does the poet say twice in the first line?", "Il pleut", ["Allons", "Vite", "Bergère"]),
    shepherd.ask("The poet says **Allons sous ma chaumière**. (A **chaumière** is a little house.) What does the poet want to do?", "Go to the little house", ["Go to the beach", "Go to school", "Go to the market"]),
  ]),
  many([
    card.ask("Where is Tom?", "In Nice", ["In Lyon", "In Paris", "In Marseille"]),
    card.ask("Who is Tom with?", "His family", ["His school", "His friend Léa", "Nobody"]),
    card.ask("What is the weather like?", "Hot and sunny", ["Cold and snowy", "Rainy", "Windy"]),
    card.ask("What does Tom do in the morning?", "He swims in the sea", ["He eats an ice cream", "He visits the castle", "He eats at the restaurant"]),
  ]),
];

const readingLevel2 = [
  many([
    letter.ask("What does Chloé want to do on Saturday?", "Look at the boats", ["Eat an ice cream", "Play football", "Go to school"]),
    letter.ask("What is the family going to eat in the evening?", "A pizza at the restaurant", ["An ice cream at home", "Soup at school", "Fish on the boat"]),
    letter.ask("What does Chloé ask Tom?", "What he is going to do this weekend", ["How old he is", "Where he lives", "What his brother is called"]),
    letter.ask("What does **Écris-moi vite !** mean?", "Write to me soon!", ["Come and see me!", "Eat quickly!", "Call me tonight!"]),
    letter.ask("How are Chloé and Hugo different on Saturday?", "Hugo wants an ice cream but Chloé wants to see the boats", ["Hugo wants a pizza but Chloé wants a boat", "Hugo is ten and Chloé is eight", "Hugo lives in Nice and Chloé lives in Marseille"]),
  ]),
  many([
    cat.ask("Why does Pablo stay at home?", "Because it is raining", ["Because he is ill", "Because he is asleep", "Because Léa is at school"]),
    cat.ask("Where does Pablo watch the rain from?", "The window", ["The garden", "The door", "The sofa"]),
    cat.ask("What does the word **Mais** do at the start of the fourth sentence?", "It shows that something is different now", ["It says what Pablo loves", "It says who Léa is", "It tells you what the cat eats"]),
    cat.ask("How does the story end?", "Pablo is happy", ["Pablo goes out in the rain", "Pablo runs away", "Pablo is cross with Léa"]),
    cat.ask("Which sentence tells you who owns the cat?", "Léa a un chat gris.", ["Il pleut.", "Pablo est content.", "Il regarde la pluie."]),
  ]),
  many([
    snail.ask("What does the bird think of the snail's plan? (**lent** means slow)", "The snail is too small and too slow", ["The snail is too noisy", "The snail is too big", "The snail is too young"]),
    snail.ask("What does **Mais l'escargot ne s'arrête pas** tell us?", "The snail keeps going", ["The snail goes home", "The snail falls asleep", "The snail is lost"]),
    snail.ask("How does the bird feel at the end?", "Surprised", ["Angry", "Bored", "Hungry"]),
    snail.ask("What is the lesson at the end of the story?", "With courage, you can go far", ["It is best to stay at home", "Birds are better than snails", "Fast is always best"]),
    snail.ask("Which word means **but**?", "Mais", ["Très", "Plus", "Loin"]),
  ]),
  many([
    minou.ask("Which word at the end of a line rhymes with **doux**?", "fou", ["lit", "nuit", "jour"]),
    minou.ask("Which word at the end of a line rhymes with **lit**?", "nuit", ["doux", "fou", "soir"]),
    minou.ask("What kind of text is this?", "A poem", ["A letter", "A recipe", "A shopping list"]),
    minou.ask("When does Minou sleep?", "In the day", ["In the evening", "At night", "In the morning only"]),
    minou.ask("Which line tells you that Minou is full of energy in the evening?", "Il joue le soir comme un fou,", ["Il dort le jour sur mon lit,", "Mon chat Minou est tout doux,", "Et il rêve toute la nuit."]),
  ]),
  many([
    party.ask("Which friends does Tom want to invite?", "Léa and Hugo", ["Léa and Chloé", "Hugo and Zoé", "Chloé and Max"]),
    party.ask("What are the children going to do at the party?", "Play in the garden and eat the cake", ["Swim in the sea and eat pizza", "Go to the cinema", "Go to the market"]),
    party.ask("What does **Demain** tell you?", "The birthday is tomorrow", ["The birthday was yesterday", "The birthday is next month", "The birthday is on Saturday"]),
    party.ask("How does Tom feel at the end?", "Very happy", ["Very tired", "A little cross", "Worried"]),
    party.ask("What does **Il va avoir onze ans** mean?", "He is going to be eleven", ["He has eleven brothers", "He is eleven years late", "He wants eleven cakes"]),
  ]),
  many([
    market.ask("What can you see at the market?", "Fruit, vegetables and cheese", ["Books and toys", "Fish and bread", "Shoes and hats"]),
    market.ask("What does Zoé say to Hugo?", "You must eat your lunch first", ["You can have two ice creams", "You must go home", "You can buy the cheese"]),
    market.ask("How does Hugo feel when Zoé says no?", "He is not happy", ["He is very happy", "He is asleep", "He is hungry for cheese"]),
    market.ask("What does Zoé do in the end?", "She buys a small ice cream for the two of them", ["She buys six ice creams", "She goes home", "She buys a big ice cream for Hugo"]),
    market.ask("How do the children feel at the end?", "Happy", ["Sad", "Angry", "Tired"]),
  ]),
  many([
    shepherd.ask("Which word at the end of a line rhymes with **moutons**?", "allons", ["bergère", "orage", "bruit"]),
    shepherd.ask("Which word at the end of a line rhymes with **bruit**?", "luit", ["orage", "allons", "chaumière"]),
    shepherd.ask("Which word at the end of a line rhymes with **bergère**?", "chaumière", ["moutons", "feuillage", "bruit"]),
    shepherd.ask("The poet says **Voici l'orage**. (An **orage** is a storm.) What is coming?", "A storm", ["The sun", "Some snow", "A shepherd"]),
    shepherd.ask("What colour are the sheep in the poem?", "White", ["Black", "Grey", "Brown"]),
  ]),
  many([
    card.ask("What is Tom going to do this evening?", "Eat at the restaurant", ["Visit the castle", "Swim in the sea", "Go to school"]),
    card.ask("What does Tom want to do tomorrow?", "Visit the castle", ["Eat an ice cream", "Go home", "Swim in the sea"]),
    card.ask("Where does Tom eat an ice cream?", "On the beach", ["At the restaurant", "In the castle", "At school"]),
    card.ask("The card ends with **Bises, Tom**. What does **Bises** mean here?", "A friendly goodbye, like 'love' or 'kisses'", ["A kind of food", "The name of a town", "A question"]),
    card.ask("Which sentence is about the weather?", "Il fait chaud et il y a du soleil.", ["Je suis à Nice avec ma famille.", "Demain, je veux visiter le château.", "Salut Léa !"]),
  ]),
];

const readingLevel3 = [
  letter.judge("Are the sentences true or false?", ["Chloé lives in Marseille", "Hugo is Chloé's brother", "The family is going to eat a pizza"], ["Chloé lives in Paris", "Hugo wants to look at the boats", "The family is going to the cinema"]),
  cat.judge("Are the sentences true or false?", ["Pablo is Léa's cat", "Pablo is grey", "It is raining today"], ["Pablo goes out today", "Léa gives Pablo fish", "Pablo is called Max"]),
  snail.judge("Are the sentences true or false?", ["The snail wants to see the sea", "The snail talks to a bird", "The snail arrives at the sea"], ["The bird helps the snail", "The snail stops after one day", "The snail is very big"]),
  minou.judge("Are the sentences true or false?", ["Minou sleeps on the bed in the day", "Minou plays in the evening", "Minou dreams at night"], ["Minou sleeps in the garden", "Minou plays in the morning", "Minou is a dog"]),
  party.judge("Are the sentences true or false?", ["The birthday is tomorrow", "Tom is going to be eleven", "Tom's mother makes a cake"], ["Tom is going to be twelve", "Tom's father makes the cake", "The party is at the swimming pool"]),
  market.judge("Are the sentences true or false?", ["They go to the market on Saturday", "Zoé buys six apples", "Hugo wants an ice cream"], ["They go to the market on Sunday", "Zoé buys bananas", "Hugo wants some cheese"]),
  shepherd.judge("Are the sentences true or false?", ["It is raining in the poem", "The poet speaks to a shepherdess", "The sheep are white"], ["It is sunny in the poem", "The poet is on a beach", "The sheep are black"]),
  card.judge("Are the sentences true or false?", ["Tom is in Nice", "It is hot", "Tom swims in the morning", "They are going to eat at the restaurant"], ["Tom is in London", "It is snowing", "Tom eats an ice cream in the morning", "Tom visits the castle this evening"]),
  cat.sequence("Put the events in the order they happen in the story.", ["It rains", "Pablo does not want to go out", "Pablo watches the rain at the window", "Léa gives Pablo some milk"]),
  snail.sequence("Put the events in the order they happen in the story.", ["The snail says he wants to see the sea", "The bird laughs at him", "The snail walks day after day", "The snail arrives at the sea"]),
  market.sequence("Put the events in the order they happen in the story.", ["Hugo and Zoé go to the market", "Zoé buys six apples", "Zoé says Hugo must eat lunch first", "Zoé buys a small ice cream for two"]),
  card.sequence("Put Tom's plans in order, from the morning to tomorrow.", ["Tom swims in the sea", "Tom eats an ice cream on the beach", "The family eats at the restaurant", "Tom visits the castle"]),
  minou.sequence("Put the lines of the poem in order.", ["Mon chat Minou est tout doux,", "Il dort le jour sur mon lit,", "Il joue le soir comme un fou,", "Et il rêve toute la nuit."]),
  cat.sentence("Build the sentence from the text that says: Pablo does not want to go out.", "Pablo ne veut pas sortir."),
  cat.sentence("Build the sentence from the text that says: Léa gives milk to Pablo.", "Léa donne du lait à Pablo."),
  snail.sentence("Build the sentence from the text that says: A small snail wants to see the sea.", "Un petit escargot veut voir la mer."),
  snail.sentence("Build the sentence from the text that says: With courage, you can go far.", "Avec du courage, on peut aller loin."),
  party.sentence("Build the sentence from the text that says: He is going to be eleven.", "Il va avoir onze ans."),
  market.sentence("Build the sentence from the text that says: Zoé buys six red apples.", "Zoé achète six pommes rouges."),
  card.sentence("Build the sentence from the text that says: I am in Nice with my family.", "Je suis à Nice avec ma famille."),
  card.sentence("Build the sentence from the text that says: Tomorrow, I want to visit the castle.", "Demain, je veux visiter le château."),
  shepherd.sentence("Build the line from the poem that says: Hurry, shepherdess, let us go!", "Bergère, vite, allons !"),
  minou.sentence("Build the line from the poem that says: He sleeps on my bed in the day.", "Il dort le jour sur mon lit,"),
];

const readingLevel4 = [
  many([
    letter.word("Type the French word that means **but** (Hugo wants an ice cream ... Chloé wants to see the boats).", "mais"),
    letter.word("Type the French word for **boats** in the letter.", "bateaux"),
    letter.ask("Which sentence in the letter asks Tom a question?", "Et toi, tu vas faire quoi ce week-end ?", ["Merci pour ta lettre !", "Écris-moi vite !", "J'habite à Marseille."], ),
    letter.ask("What kind of text is this?", "A letter to a friend", ["A fable with a lesson", "A poem", "A recipe"]),
  ]),
  many([
    cat.word("Type the French word for **grey** in the story.", "gris"),
    cat.word("Type the French word for **rain** in the story (la ___).", "pluie"),
    cat.ask("Which word tells you how Pablo feels at the end?", "content", ["gris", "pleut", "canapé"]),
    cat.ask("What kind of text is this?", "A short story", ["A letter to a friend", "A poem", "A shopping list"]),
  ]),
  many([
    snail.word("Type the French word for **sea** in the story.", "mer"),
    snail.word("Type the French word for **bird** in the story.", "oiseau"),
    snail.ask("Which sentence is the lesson (the moral) of the story?", "Avec du courage, on peut aller loin.", ["L'oiseau est très surpris.", "Il marche, il marche, jour après jour.", "Un petit escargot veut voir la mer."]),
    snail.ask("What kind of text is this?", "A fable with a lesson at the end", ["A letter to a friend", "A shopping list", "A weather report"]),
  ]),
  many([
    minou.word("Type the word in the poem that rhymes with **fou**.", "doux"),
    minou.word("Type the word in the poem that rhymes with **nuit**.", "lit"),
    minou.sorted("Which words rhyme with the ends of the poem?", ["Rhymes with doux", "Rhymes with lit"], [["fou", 0], ["genou", 0], ["chou", 0], ["nuit", 1], ["petit", 1], ["ami", 1]]),
    minou.ask("Which line tells you what Minou is like? (**doux** means soft or gentle)", "Mon chat Minou est tout doux,", ["Il dort le jour sur mon lit,", "Il joue le soir comme un fou,", "Et il rêve toute la nuit."]),
  ]),
  many([
    party.word("Type the French number for how old Tom is going to be.", "onze"),
    party.word("Type the French word for **tomorrow** in the first sentence.", "demain"),
    party.count("How many friends does Tom want to invite?", 2),
    party.ask("Which sentence shows that Tom is excited?", "Tom est très content !", ["Il va avoir onze ans.", "Sa mère prépare un gâteau.", "Son père achète des ballons."]),
  ]),
  many([
    market.word("Type the French number of apples Zoé buys.", "six"),
    market.word("Type the French word for **cheese** in the story.", "fromage"),
    market.ask("Which word in the last sentence means **happy**?", "heureux", ["enfants", "deux", "sont"]),
    market.ask("Why does Zoé buy a small ice cream for two?", "Hugo must eat lunch first, so they share a small one", ["The market has no big ice creams", "Zoé does not like ice cream", "Hugo has no money"]),
  ]),
  many([
    shepherd.word("Type the word in the poem that rhymes with **moutons**.", "allons"),
    shepherd.word("Type the word in the poem that rhymes with **bruit**.", "luit"),
    shepherd.word("Type the French word for **storm** in the last stanza.", "orage"),
    shepherd.ask("Which sentence best describes how the poem feels?", "A rainy day with a storm coming", ["A sunny day at the beach", "A birthday party", "A day at school"]),
  ]),
  many([
    card.word("Type the French word for **evening** (ce ___).", "soir"),
    card.word("Type the French word for **morning** (le ___).", "matin"),
    card.word("Type the French word for **family** in the card.", "famille"),
    card.ask("Which sentence tells you about the future?", "Ce soir, nous allons manger au restaurant.", ["Je suis à Nice avec ma famille.", "Il fait chaud et il y a du soleil.", "Le matin, je nage dans la mer."]),
  ]),
];

const readingLongerTexts = {
  rule: "Read a longer text once for the main idea, then again for the details. Look for names, numbers, times and places, and for little words like mais (but) that show a change. Letters begin with Cher or Salut and end with Bises. Poems have lines that rhyme, and fables end with a lesson.",
  hint: "Find the key word from the question in the French text, then read the words around it. For rhymes, listen for the last sound of each line.",
  levels: { 1: readingLevel1, 2: readingLevel2, 3: readingLevel3, 4: readingLevel4 },
};

/* ---------- Using a Dictionary ---------- */

const KIND_OF = { nm: "A masculine noun", nf: "A feminine noun", v: "A verb", adj: "An adjective" };
const ABBR_MEANS = { nm: "masculine noun (le word)", nf: "feminine noun (la word)", v: "verb", adj: "adjective" };
// [French word, abbreviation, English]
const ENTRIES = [
  ["chat", "nm", "cat"], ["livre", "nm", "book"], ["stylo", "nm", "pen"], ["vélo", "nm", "bike"], ["jardin", "nm", "garden"], ["sac", "nm", "bag"],
  ["maison", "nf", "house"], ["fenêtre", "nf", "window"], ["table", "nf", "table"], ["fleur", "nf", "flower"], ["pomme", "nf", "apple"], ["chaise", "nf", "chair"],
  ["manger", "v", "to eat"], ["jouer", "v", "to play"], ["chanter", "v", "to sing"], ["lire", "v", "to read"], ["dormir", "v", "to sleep"],
  ["grand", "adj", "big, tall"], ["petit", "adj", "small"], ["rouge", "adj", "red"], ["gentil", "adj", "kind"],
];
const NOUNS_ONLY = ENTRIES.filter((e) => e[1] === "nm" || e[1] === "nf");
const plain = (w) => w.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const alpha = (words) => [...words].sort((a, b) => (plain(a) < plain(b) ? -1 : 1));
const FIRSTS = [["chat", "arbre", "lune", "pomme"], ["maison", "dent", "fleur", "table"], ["jardin", "balle", "sac", "livre"], ["pain", "étoile", "robe", "vélo"], ["ami", "fromage", "nuit", "gâteau"], ["zoo", "soleil", "main", "rue"]];
const SAME_START = [
  ["chaise", "chat", "cheval", "chien"], ["jardin", "jeu", "jouer", "jus"], ["poisson", "pomme", "pont", "porte"],
  ["maison", "mardi", "matin", "mer"], ["fenêtre", "fille", "fleur", "frère"], ["lire", "lit", "livre", "lune"],
];
const ACCENTS = [["eau", "école", "élève", "enfant"], ["été", "étage", "étoile", "étudier"], ["pêche", "pain", "père", "pied"], ["forêt", "fort", "fois", "fond"]];
/** The letters every word starts with, so each ordering question has its own prompt. */
const prefix = (words) => {
  const ws = words.map(plain);
  let n = 0;
  while (ws.every((w) => w[n] === ws[0][n])) n += 1;
  return ws[0].slice(0, n);
};
const INFINITIVES = [
  ["ils mangent", "manger"], ["nous jouons", "jouer"], ["elle chante", "chanter"], ["vous dormez", "dormir"], ["ils regardent", "regarder"],
  ["tu danses", "danser"], ["je finis", "finir"], ["nous aimons", "aimer"], ["elles chantent", "chanter"], ["tu lis", "lire"],
];
const BASE_INFS = ["manger", "jouer", "chanter", "dormir", "regarder", "danser", "finir", "aimer", "lire"];
// [word, the dictionary line, sentence, which sense fits]
const SENSES = [
  ["glace", "nf 1 ice cream  2 mirror", "Léa mange une glace à la vanille.", "ice cream"],
  ["glace", "nf 1 ice cream  2 mirror", "Tom se regarde dans la glace.", "mirror"],
  ["tour", "1 nf tower  2 nm turn  3 nm ride", "La tour Eiffel est très haute.", "tower"],
  ["tour", "1 nf tower  2 nm turn  3 nm ride", "C'est mon tour de jouer !", "turn"],
  ["tour", "1 nf tower  2 nm turn  3 nm ride", "Hugo fait un tour à vélo.", "ride"],
  ["souris", "nf 1 mouse (animal)  2 computer mouse", "La souris mange du fromage.", "mouse (animal)"],
  ["souris", "nf 1 mouse (animal)  2 computer mouse", "Je clique avec la souris sur l'ordinateur.", "computer mouse"],
  ["carte", "nf 1 map  2 card  3 menu", "Au restaurant, le serveur donne la carte.", "menu"],
  ["carte", "nf 1 map  2 card  3 menu", "Tom écrit une carte pour l'anniversaire de Léa.", "card"],
  ["carte", "nf 1 map  2 card  3 menu", "Je regarde la carte de France.", "map"],
];
const SENSE_WORDS = {
  glace: ["ice cream", "mirror"], tour: ["tower", "turn", "ride"], souris: ["mouse (animal)", "computer mouse"], carte: ["map", "card", "menu"],
};
const senseWrongs = (rng, word, answer) => {
  const own = SENSE_WORDS[word].filter((s) => s !== answer);
  const others = Object.entries(SENSE_WORDS).filter(([w]) => w !== word).flatMap(([, s]) => s);
  return [...own, ...some(rng, others, 3 - own.length)];
};

const usingADictionary = {
  rule: "A dictionary lists words in alphabetical order, and accents are ignored: école goes under e. After each word you see a short letter code: nm is a masculine noun (le), nf is a feminine noun (la), v is a verb and adj is an adjective. Verbs are listed in the infinitive, so for ils mangent you look up manger. Some words have more than one meaning, so read the sentence to choose the right one: une glace can be an ice cream or a mirror.",
  hint: "Look at the first letter, then the second, then the third. For a verb, find the infinitive. For a word with two meanings, check which one fits the sentence.",
  levels: {
    1: [
      ...Object.entries(ABBR_MEANS).map(([a, means]) => (rng) => ch(`In a French dictionary, what does **${a}** stand for?`, means, some(rng, Object.entries(ABBR_MEANS).filter(([k]) => k !== a).map(([, v]) => v), 3), {})),
      ...ENTRIES.map(([w, a]) => (rng) => ch(`The dictionary says **${w} ${a}**. What kind of word is it?`, KIND_OF[a], some(rng, Object.values(KIND_OF), 3, [KIND_OF[a]]), fr(w))),
      ...FIRSTS.map((words) => (rng) => ch(`Which of these words comes first in a dictionary: ${words.join(", ")}?`, alpha(words)[0], some(rng, words, 3, [alpha(words)[0]]))),
      ...["poisson", "robe", "fenêtre", "gâteau", "zoo", "livre"].map((w) => (rng) => ch(`Under which letter do you find **${w}** in a dictionary?`, plain(w)[0].toUpperCase(), some(rng, "ABCDEFGHLMNPRST".split("").filter((l) => l !== plain(w)[0].toUpperCase()), 3), fr(w))),
    ],
    2: [
      ...SAME_START.map((words) => (rng) => ch(`Which word comes first in a dictionary? They all start with **${prefix(words)}**, so look at the next letter.`, alpha(words)[0], some(rng, words, 3, [alpha(words)[0]]))),
      ...ACCENTS.map((words) => od(`Put the words that start with **${prefix(words)}** in dictionary order. Remember that accents are ignored.`, alpha(words))),
      ...SAME_START.slice(0, 3).map((words) => od(`Put the words that start with **${prefix(words)}** in dictionary order.`, alpha(words))),
      ...["école", "été", "fenêtre", "forêt"].map((w) => ch(`Where do you look for **${w}** in a dictionary?`, `Under ${plain(w)[0].toUpperCase()}, as if the accent was not there`, [`Under a separate letter after ${plain(w)[0].toUpperCase()}`, "At the very end of the dictionary", "Under the letter of the accent"], fr(w))),
      st("Is the word a noun, a verb or an adjective?", ["noun (nm or nf)", "verb (v)", "adjective (adj)"],
        ENTRIES.map(([w, a]) => [w, a === "v" ? 1 : a === "adj" ? 2 : 0])),
      st("Is the noun masculine (nm) or feminine (nf)?", ["nm (le)", "nf (la)"], NOUNS_ONLY.map(([w, a]) => [w, a === "nm" ? 0 : 1])),
      st("Do you look up the word as it is, or find the infinitive first?", ["Look it up as it is", "Find the infinitive first"],
        [["chat", 0], ["grand", 0], ["maison", 0], ["rouge", 0], ["mangent", 1], ["jouons", 1], ["chante", 1], ["dormez", 1]]),
      ...INFINITIVES.map(([form, inf]) => (rng) => ch(`You read **${form}** in a story. Which word do you look up in the dictionary?`, inf, some(rng, BASE_INFS, 3, [inf]), fr(form))),
      ...SENSES.map(([word, senses, sentence, answer]) => (rng) => ch(`The dictionary says **${word}** ${senses}. Which meaning fits **${sentence}**`, answer, senseWrongs(rng, word, answer), fr(sentence))),
    ],
    3: [
      ...SAME_START.map((words) => od(`Put these words that start with **${prefix(words)}** in dictionary order.`, alpha(words))),
      ...ACCENTS.map((words) => od(`Put these words that start with **${prefix(words)}** in dictionary order. Accents are ignored.`, alpha(words))),
      ...INFINITIVES.filter(([, inf]) => !["lire", "aimer", "dormir"].includes(inf)).map(([form, inf]) => bd(`You read **${form}** in a story. Build the verb you look up in the dictionary.`, inf, { letters: true, ...fr(form) })),
      ...NOUNS_ONLY.map(([w, a, en]) => bd(`The dictionary says **${w} ${a} ${en}**. Build the French for **the ${en}**.`, `${a === "nm" ? "le" : "la"} ${w}`, fr(w))),
      ...NOUNS_ONLY.slice(0, 6).map(([w, a, en]) => bd(`The dictionary says **${w} ${a} ${en}**. Build the French for **a ${en}**.`, `${a === "nm" ? "un" : "une"} ${w}`, fr(w))),
      ...SENSES.map(([word, senses, sentence, answer]) => (rng) => ch(`The dictionary says **${word}** ${senses}. In **${sentence}** the word means…`, answer, senseWrongs(rng, word, answer), fr(sentence))),
      st("Do you look up the word as it is, or find the infinitive first?", ["Look it up as it is", "Find the infinitive first"],
        [["jardin", 0], ["petit", 0], ["table", 0], ["gentil", 0], ["regardent", 1], ["finissons", 1], ["danses", 1], ["écoutez", 1]]),
    ],
    4: [
      ...INFINITIVES.map(([form, inf]) => ty(`You read **${form}** in a story. Type the infinitive you look up in the dictionary.`, inf)),
      ...NOUNS_ONLY.map(([w, a, en]) => ty(`The dictionary says **${w} ${a} ${en}**. Type the little word for 'the' (le or la) that goes in front.`, a === "nm" ? "le" : "la", { sentence: `___ ${w}` })),
      ...Object.entries({ nm: "a masculine noun", nf: "a feminine noun", v: "a verb", adj: "an adjective" }).map(([a, en]) => ty(`Type the short code a dictionary uses for **${en}**.`, a)),
      bd("The dictionary says **pomme nf apple**. Build the French for **an apple**.", "une pomme", { more: ["un", "la"] }),
      bd("The dictionary says **stylo nm pen**. Build the French for **the pen**.", "le stylo", { more: ["la", "une"] }),
      (rng) => bd("Look up the verb. Build the French for: **We play.**", "Nous jouons", { more: some(rng, ["jouer", "jouez", "joue"], 2), ...fr("Nous jouons") }),
      (rng) => bd("Look up the verb. Build the French for: **Léa eats.**", "Léa mange", { more: some(rng, ["manger", "manges", "mangent"], 2), ...fr("Léa mange") }),
      (rng) => bd("Look up the verb. Build the French for: **You dance.** (use tu)", "Tu danses", { more: some(rng, ["danser", "dansez", "danse"], 2), ...fr("Tu danses") }),
      ch("A dictionary says **fleur nf flower**. How do you say 'the flower'?", "la fleur", ["le fleur", "les fleur", "une fleur"], fr("la fleur")),
      ch("A dictionary says **vélo nm bike**. How do you say 'a bike'?", "un vélo", ["une vélo", "la vélo", "des vélo"], fr("un vélo")),
      ...[
        ["Léa wants to know what **tour** means in **C'est mon tour !** (tour: 1 tower 2 turn 3 ride)", "turn", ["tower", "ride", "mirror"]],
        ["Tom reads **La souris mange du fromage.** (souris: 1 mouse (animal) 2 computer mouse) Which meaning fits?", "mouse (animal)", ["computer mouse", "mirror", "ride"]],
        ["Hugo reads **Je regarde la carte de France.** (carte: 1 map 2 card 3 menu) Which meaning fits?", "map", ["card", "menu", "tower"]],
        ["Zoé reads **Je veux une glace au chocolat.** (glace: 1 ice cream 2 mirror) Which meaning fits?", "ice cream", ["mirror", "mouse", "map"]],
      ].map(([q, a, w]) => ch(q, a, w)),
    ],
  },
};

/* ---------- Writing About Myself ---------- */

// [French, English]
const SELF = [
  ["Je m'appelle Léa", "My name is Léa"], ["J'ai dix ans", "I am ten years old"], ["J'habite à Londres", "I live in London"], ["J'aime le football", "I like football"],
  ["Je n'aime pas les maths", "I do not like maths"], ["J'ai un chat", "I have a cat"], ["J'ai les yeux bleus", "I have blue eyes"], ["J'ai deux frères", "I have two brothers"],
];
const SELF_EN = SELF.map((s) => s[1]);
const CONNECT = [["et", "and"], ["mais", "but"], ["aussi", "also, too"], ["parce que", "because"]];
const WRITE_BUILDS = [
  ["Je m'appelle Léa", "My name is Léa"], ["J'ai dix ans", "I am ten years old"], ["J'habite à Londres et j'ai un chat", "I live in London and I have a cat"],
  ["J'aime le sport mais je n'aime pas les maths", "I like sport but I do not like maths"], ["J'aime la musique parce que c'est amusant", "I like music because it is fun"],
  ["Mon frère s'appelle Paul et il a huit ans", "My brother is called Paul and he is eight years old"], ["J'ai les cheveux noirs et les yeux verts", "I have black hair and green eyes"],
  ["J'aime le tennis et j'aime la musique", "I like tennis and I like music"],
];
const ERRORS = [
  ["Je suis dix ans.", "J'ai dix ans.", ["Je suis dix an.", "J'ai dix an.", "Je ai dix ans."]],
  ["Je habite à Lyon.", "J'habite à Lyon.", ["Je habites à Lyon.", "J'habitez à Lyon.", "Je habite Lyon à."]],
  ["Je aime le chocolat.", "J'aime le chocolat.", ["J'aimes le chocolat.", "Je aimes le chocolat.", "J'aime chocolat le."]],
  ["Ma frère s'appelle Tom.", "Mon frère s'appelle Tom.", ["Mes frère s'appelle Tom.", "Ma frère s'appellent Tom.", "Mon frère appelle Tom."]],
  ["J'ai un sœur.", "J'ai une sœur.", ["J'ai le sœur.", "Je ai une sœur.", "J'ai un sœurs."]],
  ["J'ai deux chat.", "J'ai deux chats.", ["J'ai deux chat noirs.", "Je ai deux chats.", "J'ai deux un chat."]],
  ["Je aime pas le sport.", "Je n'aime pas le sport.", ["Je n'aime le sport pas.", "Je ne aime pas le sport.", "Je aime ne pas le sport."]],
];
const ME_THEM = [
  ["J'ai dix ans", 0], ["J'habite à Lyon", 0], ["J'aime lire", 0], ["Je suis grand", 0], ["Je m'appelle Hugo", 0],
  ["Il a dix ans", 1], ["Elle habite à Nice", 1], ["Il aime lire", 1], ["Elle est petite", 1], ["Il s'appelle Max", 1],
];

const writingAboutMyself = {
  rule: "Write about yourself with short sentences you know by heart, then adapt them by changing one word: J'ai dix ans, J'ai onze ans. J'habite à Londres, J'habite à Paris. Use et (and), mais (but), aussi (also) and parce que (because) to join your ideas. Check each sentence: J'ai for your age, j'habite and j'aime with J' before a vowel, and le, la or les after aimer.",
  hint: "Start from a sentence you know. Which word do you need to change? Check the little words too: un or une, le or la, mon or ma.",
  levels: {
    1: [
      ...SELF.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, SELF_EN, 3, [en]), fr(f))),
      ...CONNECT.map(([w, en]) => (rng) => ch(`What does **${w}** mean?`, en, some(rng, CONNECT.map((c) => c[1]), 3, [en]), fr(w))),
      ch("Which sentence tells someone your name?", "Je m'appelle Léa", ["J'habite à Léa", "J'ai Léa ans", "J'aime Léa"], fr("Je m'appelle Léa")),
      ch("Which sentence tells someone how old you are?", "J'ai onze ans", ["J'habite onze ans", "J'aime onze ans", "Je m'appelle onze ans"], fr("J'ai onze ans")),
      ch("You write **J'habite à Londres**. Which word do you change to say you live in Paris?", "Londres", ["habite", "à", "J'"], fr("J'habite à Londres")),
      ch("You write **J'ai dix ans**. Which word do you change to say you are eleven?", "dix", ["ans", "ai", "J'"], fr("J'ai dix ans")),
    ],
    2: [
      ch("Change **J'ai dix ans** to say you are eleven. Which sentence is right?", "J'ai onze ans", ["Je suis onze ans", "J'ai ans onze", "Tu as onze ans"]),
      ch("Change **J'habite à Londres** to say you live in Paris. Which sentence is right?", "J'habite à Paris", ["J'habite Paris à", "Je habite à Paris", "Elle habite à Paris"]),
      ch("Change **J'ai un chat** to say you have a sister. Which sentence is right?", "J'ai une sœur", ["J'ai un sœur", "J'ai la sœur", "J'ai sœur une"]),
      ch("Change **J'aime le football** to say you like music. Which sentence is right?", "J'aime la musique", ["J'aime le musique", "J'aime musique", "J'aime une musique"]),
      ch("Change **Je m'appelle Léa** to say your name is Hugo. Which sentence is right?", "Je m'appelle Hugo", ["Je t'appelle Hugo", "Il s'appelle Hugo", "J'appelle Hugo"]),
      ch("Change **J'ai deux frères** to say you have three brothers. Which sentence is right?", "J'ai trois frères", ["J'ai trois frère", "Je suis trois frères", "J'ai trois un frère"]),
      st("Is the sentence about me or about someone else?", ["About me", "About someone else"], ME_THEM),
      st("What does each little word do?", ["Adds an idea (and, also)", "Shows a contrast (but)", "Gives a reason (because)"], [["et", 0], ["aussi", 0], ["mais", 1], ["parce que", 2]]),
      ch("J'ai un chat ___ un chien. (I have a cat and a dog.) Which word fits?", "et", ["mais", "parce que", "aussi"]),
      ch("Je veux jouer dehors ___ il pleut. (I want to play outside, but it is raining.) Which word fits?", "mais", ["et", "parce que", "aussi"]),
      ch("J'aime l'été ___ il fait chaud. (I like summer because it is hot.) Which word fits?", "parce que", ["mais", "et", "aussi"]),
      ch("Tu aimes les chats ? Moi ___ ! (Me too!) Which word fits?", "aussi", ["mais", "et", "parce que"]),
    ],
    3: [
      ...WRITE_BUILDS.map(([f, en]) => bd(`Build the French for: **${en}**`, f, fr(f))),
      bd("Build the French for: **My name is Hugo. I am eleven. I live in Lyon.**", "Je m'appelle Hugo. J'ai onze ans. J'habite à Lyon.", fr("Je m'appelle Hugo. J'ai onze ans. J'habite à Lyon.")),
      bd("Build the French for: **I have a dog. He is called Max.**", "J'ai un chien. Il s'appelle Max.", fr("J'ai un chien. Il s'appelle Max.")),
      od("Put the self-description in order: name, age, home, then what you like.", ["Je m'appelle Léa.", "J'ai dix ans.", "J'habite à Londres.", "J'aime la musique."]),
      od("Put the letter in order: greeting, name, home, goodbye.", ["Salut Tom !", "Je m'appelle Chloé.", "J'habite à Marseille.", "À bientôt !"]),
      st("What does each sentence tell you?", ["Age", "Home", "What I like"],
        [["J'ai dix ans", 0], ["J'ai huit ans", 0], ["J'ai onze ans", 0], ["J'habite à Lyon", 1], ["J'habite à Paris", 1], ["J'habite à Londres", 1], ["J'aime lire", 2], ["J'adore le chocolat", 2], ["J'aime nager", 2]]),
      st("Is the sentence correct, or has it a mistake?", ["Correct", "Has a mistake"],
        [["J'ai dix ans", 0], ["Je m'appelle Léa", 0], ["J'aime les maths", 0], ["Je n'aime pas le sport", 0], ["J'ai une sœur", 0], ["Je suis dix ans", 1], ["Je appelle Léa", 1], ["J'aime maths", 1], ["Je ne aime pas le sport", 1], ["J'ai un sœur", 1]]),
      ...ERRORS.map(([wrong, right, wrongs]) => ch(`Léa writes **${wrong}** Which sentence fixes the mistake?`, right, wrongs, fr(right))),
    ],
    4: [
      ty("Type the missing word. English: **I like tennis but I do not like golf.**", "mais", { sentence: "J'aime le tennis ___ je n'aime pas le golf." }),
      ty("Type the missing word. English: **I have a cat and a dog.**", "et", { sentence: "J'ai un chat ___ un chien." }),
      ty("Type the missing word. English: **I like football. I like tennis too.**", "aussi", { sentence: "J'aime le football. J'aime ___ le tennis." }),
      ty("Type the missing word. English: **My brother is eight.**", "a", { sentence: "Mon frère ___ huit ans." }),
      ty("Type the missing word. English: **We live in London.**", "habitons", { sentence: "Nous ___ à Londres." }),
      ty("Type the missing word. English: **She is ten.**", "a", { sentence: "Elle ___ dix ans." }),
      ty("Type the missing word. English: **Do you have a cat?**", "as", { sentence: "Tu ___ un chat ?" }),
      ty("Type the missing word. English: **I like music.**", "la", { sentence: "J'aime ___ musique." }),
      ty("Type the French word for **ten**.", "dix", { picture: "🔟", pictureLabel: "ten" }),
      (rng) => bd("Build the French for: **My name is Hugo. I am eleven. I live in Lyon.**", "Je m'appelle Hugo. J'ai onze ans. J'habite à Lyon.", { more: some(rng, ["suis", "Londres.", "habite"], 2), ...fr("Je m'appelle Hugo. J'ai onze ans. J'habite à Lyon.") }),
      (rng) => bd("Build the French for: **My name is Chloé. I am twelve. I like reading.**", "Je m'appelle Chloé. J'ai douze ans. J'aime lire.", { more: some(rng, ["suis", "aimes", "treize"], 2), ...fr("Je m'appelle Chloé. J'ai douze ans. J'aime lire.") }),
      (rng) => bd("Build the French for: **I have a rabbit. He is called Pompon.**", "J'ai un lapin. Il s'appelle Pompon.", { more: some(rng, ["une", "Elle", "suis"], 2), ...fr("J'ai un lapin. Il s'appelle Pompon.") }),
      (rng) => bd("Build the French for: **I like sport. I do not like maths.**", "J'aime le sport. Je n'aime pas les maths.", { more: some(rng, ["la", "mais", "ne"], 2), ...fr("J'aime le sport. Je n'aime pas les maths.") }),
      ch("You want to say you like sport because it is fun. Which sentence do you write?", "J'aime le sport parce que c'est amusant", ["J'aime le sport mais c'est amusant", "J'aime le sport et parce amusant", "J'aime le sport aussi c'est amusant"], fr("J'aime le sport parce que c'est amusant")),
      ch("Adapt **J'aime le chocolat** to say that Léa likes it. Which sentence is right?", "Elle aime le chocolat", ["J'aime le chocolat Léa", "Elle aimes le chocolat", "Elle aime chocolat"], fr("Elle aime le chocolat")),
      ch("You want to tell a friend you have a brother and you are tall. Which is best?", "J'ai un frère et je suis grand", ["J'ai un frère mais je suis grand", "J'ai une frère et je suis grand", "J'ai un frère parce que grand"], fr("J'ai un frère et je suis grand")),
    ],
  },
};

export const reading = {
  "reading-longer-texts": readingLongerTexts,
  "using-a-dictionary": usingADictionary,
  "writing-about-myself": writingAboutMyself,
};

export const readingVisuals = {
  "reading-longer-texts": place("room", "An open storybook next to a fox, ready for a story.", [["📖", 140, 130, 90], ["🦊", 280, 130, 80]], "Read a longer text."),
  "using-a-dictionary": place("plain", "A thick dictionary and a magnifying glass.", [["📕", 140, 120, 90], ["🔎", 280, 120, 80]], "Look it up."),
  "writing-about-myself": place("room", "A child writing at a desk with a pencil.", [["🧒", 120, 160, 80], ["✏️", 250, 170, 60], ["📝", 330, 160, 60]], "Write about yourself."),
};

export const readingRules = {};
