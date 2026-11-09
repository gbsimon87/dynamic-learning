import { ch, bd, st, ty, some } from "../topicBank.js";
import { rule } from "../figures.js";
import { fr, vocab } from "../year5French/shared.js";
import { place } from "./figures.js";

// Strand "Describing". Every French word is on screen; the 🔊 button is optional help.

/* ---------- Describing People ---------- */

// [French, English]
const HAIR = [
  ["les cheveux longs", "long hair"],
  ["les cheveux courts", "short hair"],
  ["les cheveux blonds", "blond hair"],
  ["les cheveux bruns", "brown hair"],
  ["les cheveux roux", "red hair"],
  ["les cheveux frisés", "curly hair"],
];
const EYES = [
  ["les yeux bleus", "blue eyes"],
  ["les yeux verts", "green eyes"],
  ["les yeux marron", "brown eyes"],
];
const LOOKS = [...HAIR, ...EYES];
// [masculine, feminine, English]
const CHAR = [
  ["grand", "grande", "tall"],
  ["petit", "petite", "short"],
  ["mince", "mince", "slim"],
  ["gentil", "gentille", "kind"],
  ["drôle", "drôle", "funny"],
  ["timide", "timide", "shy"],
  ["sportif", "sportive", "sporty"],
];
const CHANGING = CHAR.filter((c) => c[0] !== c[1]);
const BOYS = ["Tom", "Hugo"];
const GIRLS = ["Léa", "Chloé"];
// [passage, the true description, three descriptions with one detail wrong]
const PROFILES = [
  ["Voici Hugo. Il est grand et sportif. Il a les yeux verts.", "Hugo is tall and sporty with green eyes.",
    ["Hugo is short and sporty with green eyes.", "Hugo is tall and shy with green eyes.", "Hugo is tall and sporty with blue eyes."]],
  ["Voici Léa. Elle est petite et timide. Elle a les cheveux longs et roux.", "Léa is short and shy with long red hair.",
    ["Léa is tall and shy with long red hair.", "Léa is short and funny with long red hair.", "Léa is short and shy with short red hair."]],
  ["Voici Tom. Il est mince et drôle. Il a les cheveux courts et bruns.", "Tom is slim and funny with short brown hair.",
    ["Tom is kind and funny with short brown hair.", "Tom is slim and funny with long brown hair.", "Tom is slim and shy with short brown hair."]],
  ["Voici Chloé. Elle est gentille et sportive. Elle a les yeux bleus et les cheveux frisés.", "Chloé is kind and sporty with blue eyes and curly hair.",
    ["Chloé is kind and shy with blue eyes and curly hair.", "Chloé is kind and sporty with green eyes and curly hair.", "Chloé is kind and sporty with blue eyes and long hair."]],
];

const describingPeople = {
  rule: "To say what someone looks like, use il a / elle a with les cheveux (hair) or les yeux (eyes): Elle a les cheveux longs et les yeux bleus. Hair and eyes are plural, so the colour or length ends in s (courts, verts), but roux and marron stay the same. To say what someone is like, use il est or elle est. Some words add an e for a girl (grand, grande), and some stay the same (drôle, timide).",
  hint: "Is it a boy (il) or a girl (elle)? Does the word describe hair, eyes or character?",
  levels: {
    1: [
      ...HAIR.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, LOOKS.map((l) => l[1]), 3, [en]), fr(f))),
      ...EYES.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, LOOKS.map((l) => l[1]), 3, [en]), fr(f))),
      ...CHAR.map(([m, , en]) => (rng) => ch(`What does **${m}** mean?`, en, some(rng, CHAR.map((c) => c[2]), 3, [en]), fr(`Il est ${m}`))),
      ch("What does **les cheveux** mean?", "hair", ["eyes", "hands", "ears"], fr("les cheveux")),
      ch("What does **les yeux** mean?", "eyes", ["hair", "ears", "hands"], fr("les yeux")),
    ],
    2: [
      ...HAIR.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, LOOKS.map((l) => l[0]), 3, [f]))),
      ...EYES.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, LOOKS.map((l) => l[0]), 3, [f]))),
      ...CHAR.map(([m, , en]) => (rng) => ch(`How do you say **He is ${en}.** in French?`, `Il est ${m}.`, some(rng, CHAR.map((c) => `Il est ${c[0]}.`), 3, [`Il est ${m}.`]))),
      ...CHANGING.flatMap(([m, f], i) => [
        ch(`Which sentence describes **${GIRLS[i % 2]}** (a girl)?`, `Elle est ${f}.`, [`Il est ${m}.`, `Elle est ${m}.`, `Il est ${f}.`]),
        ch(`Which sentence describes **${BOYS[i % 2]}** (a boy)?`, `Il est ${m}.`, [`Elle est ${f}.`, `Elle est ${m}.`, `Il est ${f}.`]),
      ]),
      st("Does the word change when you talk about a girl?", ["Changes for a girl", "Stays the same"], [...CHANGING.map(([m]) => [m, 0]), ...CHAR.filter((c) => c[0] === c[1]).map(([m]) => [m, 1])]),
      st("Is it about hair, eyes or character?", ["Hair", "Eyes", "Character"], [
        ["les cheveux longs", 0], ["les cheveux roux", 0], ["les cheveux frisés", 0],
        ["les yeux bleus", 1], ["les yeux verts", 1], ["les yeux marron", 1],
        ["gentil", 2], ["drôle", 2], ["timide", 2],
      ]),
    ],
    3: [
      bd("Build the French: **She has long hair.**", "Elle a les cheveux longs.", fr("Elle a les cheveux longs.")),
      bd("Build the French: **He has blue eyes.**", "Il a les yeux bleus.", fr("Il a les yeux bleus.")),
      bd("Build the French: **She has green eyes.**", "Elle a les yeux verts.", fr("Elle a les yeux verts.")),
      bd("Build the French: **He has short red hair.**", "Il a les cheveux courts et roux.", fr("Il a les cheveux courts et roux.")),
      bd("Build the French: **I have curly hair and brown eyes.**", "J'ai les cheveux frisés et les yeux marron.", fr("J'ai les cheveux frisés et les yeux marron.")),
      bd("Build the French: **She is tall and kind.**", "Elle est grande et gentille.", fr("Elle est grande et gentille.")),
      bd("Build the French: **He is short and funny.**", "Il est petit et drôle.", fr("Il est petit et drôle.")),
      bd("Build the French: **She is shy and sporty.**", "Elle est timide et sportive.", fr("Elle est timide et sportive.")),
      bd("Build the French: **He is sporty and kind.**", "Il est sportif et gentil.", fr("Il est sportif et gentil.")),
      bd("Build the French: **She is slim and funny.**", "Elle est mince et drôle.", fr("Elle est mince et drôle.")),
      bd("Build the French: **He is slim and he has blond hair.**", "Il est mince et il a les cheveux blonds.", fr("Il est mince et il a les cheveux blonds.")),
      ...PROFILES.map(([text, answer, wrong]) => ch(`Read this.\n\n${text}\n\nWhich description is true?`, answer, wrong, fr(text))),
      ...[["Léa", "Elle", "drôle"], ["Tom", "Il", "timide"], ["Chloé", "Elle", "gentille"], ["Hugo", "Il", "sportif"]].map(([name, pron, word]) =>
        ch(`The sentence is about ${name}. Which word fits? **___ est ${word}.**`, pron, ["Il", "Elle", "Ils", "Nous"].filter((x) => x !== pron))),
      st("Is the word for hair, eyes or character?", ["Hair", "Eyes", "Character"], [
        ["les cheveux blonds", 0], ["les cheveux bruns", 0], ["les cheveux courts", 0],
        ["les yeux verts", 1], ["les yeux bleus", 1], ["les yeux marron", 1],
        ["sportive", 2], ["gentille", 2], ["timide", 2],
      ]),
    ],
    4: [
      ty("Type the missing word. She is tall.\n\nElle est ___.", "grande"),
      ty("Type the missing word. She is short.\n\nElle est ___.", "petite"),
      ty("Type the missing word. She is kind.\n\nElle est ___.", "gentille"),
      ty("Type the missing word. She is sporty.\n\nElle est ___.", "sportive"),
      ty("Type the missing word. He is shy.\n\nIl est ___.", "timide"),
      ty("Type the missing word. He is slim.\n\nIl est ___.", "mince"),
      ty("Type the missing word. He has short hair.\n\nIl a les ___ courts.", "cheveux"),
      ty("Type the missing word. She has green eyes.\n\nElle a les ___ verts.", "yeux"),
      ty("Type the missing word. He has blue eyes.\n\nIl a les yeux ___.", "bleus"),
      ty("Type the missing word. She has red hair.\n\nElle a les cheveux ___.", "roux"),
      ty("Type the missing word. He has long hair.\n\nIl a les cheveux ___.", "longs"),
      bd("Build the French: **She is tall and kind.**", "Elle est grande et gentille.", { more: ["grand", "gentil"] }),
      bd("Build the French: **He is short and sporty.**", "Il est petit et sportif.", { more: ["petite", "sportive"] }),
      bd("Build the French: **She has blue eyes.**", "Elle a les yeux bleus.", { more: ["verts", "Il"] }),
      bd("Build the French: **He has long hair.**", "Il a les cheveux longs.", { more: ["courts", "Elle"] }),
      bd("Build the French: **I have green eyes and short hair.**", "J'ai les yeux verts et les cheveux courts.", { more: ["bleus", "longs"] }),
      ch("Léa is tall and kind. Which sentence describes her?", "Elle est grande et gentille.", ["Il est grand et gentil.", "Elle est grand et gentil.", "Elle est grande et gentil."]),
      ch("Tom is short and sporty. Which sentence describes him?", "Il est petit et sportif.", ["Elle est petite et sportive.", "Il est petite et sportive.", "Il est petit et sportive."]),
      ch("Chloé is shy and sporty. Which sentence describes her?", "Elle est timide et sportive.", ["Elle est timide et sportif.", "Il est timide et sportif.", "Il est timide et sportive."]),
      ch("Hugo has red hair and green eyes. Which sentence describes him?", "Il a les cheveux roux et les yeux verts.", ["Il a les cheveux verts et les yeux roux.", "Elle a les cheveux roux et les yeux verts.", "Il a les cheveux roux et les yeux bleus."]),
      ch("Léa has long hair and blue eyes. Which sentence describes her?", "Elle a les cheveux longs et les yeux bleus.", ["Elle a les cheveux bleus et les yeux longs.", "Il a les cheveux longs et les yeux bleus.", "Elle a les cheveux courts et les yeux bleus."]),
      ch("Tom is funny and slim. Which sentence describes him?", "Il est drôle et mince.", ["Elle est drôle et mince.", "Il est timide et mince.", "Il est drôle et grand."]),
    ],
  },
};

/* ---------- Describing Places ---------- */

const ROOMS = [["la cuisine", "kitchen", "🍳"], ["la chambre", "bedroom", "🛏️"], ["le salon", "living room", "🛋️"], ["la salle de bains", "bathroom", "🛁"], ["le jardin", "garden", "🌳"]];
const ROOM_V = vocab(ROOMS);
const PREPS = [["sur", "on"], ["sous", "under"], ["devant", "in front of"], ["derrière", "behind"], ["entre", "between"], ["à côté de", "next to"], ["en face de", "opposite"]];
const PLACE_ADJ = [["calme", "calm"], ["animé", "lively"], ["grand", "big"], ["vieux", "old"], ["joli", "pretty"]];
const IL_Y_A = [
  ["Il y a un parc.", "There is a park."],
  ["Il y a une gare.", "There is a station."],
  ["Il y a des magasins.", "There are shops."],
  ["Il n'y a pas de cinéma.", "There is no cinema."],
];
const MASC = [["parc", "park"], ["cinéma", "cinema"], ["château", "castle"], ["supermarché", "supermarket"]];
const FEM = [["gare", "station"], ["piscine", "swimming pool"], ["poste", "post office"], ["bibliothèque", "library"], ["boulangerie", "bakery"]];
// [animal English, animal French, preposition English, preposition French, thing English, thing French, which sentence builds the French]
const SPOTS = [
  ["cat", "Le chat", "on", "sur", "bed", "le lit"],
  ["dog", "Le chien", "under", "sous", "chair", "la chaise"],
  ["cat", "Le chat", "in front of", "devant", "box", "la boîte"],
  ["dog", "Le chien", "behind", "derrière", "bed", "le lit"],
  ["cat", "Le chat", "next to", "à côté de", "box", "la boîte"],
  ["dog", "Le chien", "between", "entre", "two chairs", "les deux chaises"],
];
const spotEn = ([a, , p, , t]) => `The ${a} is ${p} the ${t}.`;
const spotFr = ([, a, , p, , t]) => `${a} est ${p} ${t}.`;
const WHERE = {
  "on": "On", "under": "Under", "in front of": "In front of", "behind": "Behind", "next to": "Next to", "between": "Between",
};
const PLACE_AGREE = [
  ["La ville est ___. (lively)", "animée", ["animé", "animés", "animées"]],
  ["La maison est ___. (pretty)", "jolie", ["joli", "jolis", "jolies"]],
  ["Le jardin est ___. (big)", "grand", ["grande", "grands", "grandes"]],
  ["La chambre est ___. (big)", "grande", ["grand", "grands", "grandes"]],
  ["Le château est ___. (old)", "vieux", ["vieille", "vieilles", "jolie"]],
  ["La rue est ___. (old)", "vieille", ["vieux", "vieilles", "jolie"]],
  ["Le village est ___. (calm)", "calme", ["calmes", "animé", "vieux"]],
];

const describingPlaces = {
  rule: "Name the rooms of a home: la cuisine, la chambre, le salon, la salle de bains, le jardin. To say what is in a town, use il y a un/une/des …: Il y a un parc. To say what is not there, use il n'y a pas de …: Il n'y a pas de cinéma. Words like sur, sous, devant, derrière, entre, à côté de and en face de tell you where things are. Adjectives agree with the place: la ville est animée, le village est calme.",
  hint: "Is the place masculine or feminine? Is something there, or is it not? For where, picture the cat and the box.",
  levels: {
    1: [
      ...ROOM_V.see, ...ROOM_V.picture,
      ...PREPS.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, PREPS.map((p) => p[1]), 3, [en]), fr(f))),
      ...PLACE_ADJ.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, PLACE_ADJ.map((p) => p[1]), 3, [en]), fr(f))),
      ...IL_Y_A.map(([f, en]) => (rng) => ch(`What does **${f}** mean?`, en, some(rng, IL_Y_A.map((p) => p[1]), 3, [en]), fr(f))),
    ],
    2: [
      ...ROOM_V.say,
      ...SPOTS.map((s) => (rng) => ch(`The ${s[0]} is **${s[2]}** the ${s[4]}. Which French word means **${s[2]}**?`, s[3], some(rng, PREPS.map((p) => p[0]), 3, [s[3]]))),
      ch("How do you say **opposite** in French?", "en face de", ["entre", "sous", "derrière"]),
      ...MASC.map(([n]) => ch(`Choose the little word: **Il y a ___ ${n}.**`, "un", ["une", "des", "de"])),
      ...FEM.map(([n]) => ch(`Choose the little word: **Il y a ___ ${n}.**`, "une", ["un", "des", "de"])),
      ...[...MASC, ...FEM].slice(0, 6).map(([n]) => ch(`Choose the little word: **Il n'y a pas ___ ${n}.**`, "de", ["un", "une", "des"])),
      st("Is it a room at home or a place in town?", ["Room at home", "Place in town"], [
        ...ROOMS.map(([f]) => [f, 0]), ["la gare", 1], ["la poste", 1], ["le cinéma", 1], ["la piscine", 1], ["le supermarché", 1], ["la bibliothèque", 1],
      ]),
      st("Is something there, or not?", ["There is …", "There is not …"], [
        ["Il y a un parc.", 0], ["Il y a une piscine.", 0], ["Il y a des magasins.", 0],
        ["Il n'y a pas de cinéma.", 1], ["Il n'y a pas de gare.", 1], ["Il n'y a pas de château.", 1],
      ]),
    ],
    3: [
      bd("Build the French: **There is a park.**", "Il y a un parc.", fr("Il y a un parc.")),
      bd("Build the French: **There is a swimming pool.**", "Il y a une piscine.", fr("Il y a une piscine.")),
      bd("Build the French: **There is no cinema.**", "Il n'y a pas de cinéma.", fr("Il n'y a pas de cinéma.")),
      bd("Build the French: **There is no station.**", "Il n'y a pas de gare.", fr("Il n'y a pas de gare.")),
      bd("Build the French: **In my town, there is a park.**", "Dans ma ville, il y a un parc.", fr("Dans ma ville, il y a un parc.")),
      bd("Build the French: **There is an old castle.**", "Il y a un vieux château.", fr("Il y a un vieux château.")),
      bd("Build the French: **My bedroom is pretty.**", "Ma chambre est jolie.", fr("Ma chambre est jolie.")),
      bd("Build the French: **The garden is big.**", "Le jardin est grand.", fr("Le jardin est grand.")),
      bd("Build the French: **The town is lively.**", "La ville est animée.", fr("La ville est animée.")),
      bd("Build the French: **The village is calm.**", "Le village est calme.", fr("Le village est calme.")),
      ...SPOTS.map((s) => bd(`Build the French: **${spotEn(s)}**`, spotFr(s), fr(spotFr(s)))),
      ...SPOTS.filter((s) => s[3] !== "entre").map((s) => ch(`Read: **${spotFr(s)}** Where is the ${s[0]}?`, `${WHERE[s[2]]} the ${s[4]}`,
        Object.keys(WHERE).filter((k) => k !== s[2]).slice(0, 3).map((k) => `${WHERE[k]} the ${s[4]}`), fr(spotFr(s)))),
      ...PLACE_AGREE.map(([sentence, answer, wrong]) => ch(`Choose the adjective that agrees: **${sentence}**`, answer, wrong)),
      st("Is something there, or not?", ["There is …", "There is not …"], [
        ["Il y a un parc.", 0], ["Il y a une gare.", 0], ["Il y a un cinéma.", 0],
        ["Il n'y a pas de parc.", 1], ["Il n'y a pas de piscine.", 1], ["Il n'y a pas de poste.", 1],
      ]),
    ],
    4: [
      ...ROOM_V.type,
      ty("Type the missing word. The cat is under the box.\n\nLe chat est ___ la boîte.", "sous"),
      ty("Type the missing word. The dog is on the bed.\n\nLe chien est ___ le lit.", "sur"),
      ty("Type the missing word. The cat is in front of the chair.\n\nLe chat est ___ la chaise.", "devant"),
      ty("Type the missing word. The dog is between two chairs.\n\nLe chien est ___ les deux chaises.", "entre"),
      ty("Type the missing word. There is a park.\n\nIl y a ___ parc.", "un"),
      ty("Type the missing word. There is a swimming pool.\n\nIl y a ___ piscine.", "une"),
      ty("Type the missing word. There is no cinema.\n\nIl n'y a pas ___ cinéma.", "de"),
      ty("Type the missing word. The village is calm.\n\nLe village est ___.", "calme"),
      ty("Type the missing word. I eat in the kitchen.\n\nJe mange dans la ___.", "cuisine"),
      ty("Type the missing word. I play in the garden.\n\nJe joue dans le ___.", "jardin"),
      bd("Build the French: **The dog is behind the bed.**", "Le chien est derrière le lit.", { more: ["devant", "la"] }),
      bd("Build the French: **There is a swimming pool.**", "Il y a une piscine.", { more: ["un", "pas"] }),
      bd("Build the French: **There is no park.**", "Il n'y a pas de parc.", { more: ["un", "une"] }),
      bd("Build the French: **My bedroom is pretty.**", "Ma chambre est jolie.", { more: ["joli", "Mon"] }),
      bd("Build the French: **The town is lively.**", "La ville est animée.", { more: ["animé", "Le"] }),
      bd("Build the French: **The cat is next to the box.**", "Le chat est à côté de la boîte.", { more: ["sur", "chien"] }),
      ch("A town has a park and a pool but no cinema. Which sentence is true?", "Il n'y a pas de cinéma.", ["Il y a un cinéma.", "Il n'y a pas de parc.", "Il n'y a pas de piscine."]),
      ch("A town has a station and shops but no library. Which sentence is true?", "Il n'y a pas de bibliothèque.", ["Il y a une bibliothèque.", "Il n'y a pas de gare.", "Il n'y a pas de magasins."]),
      ch("Léa's village is quiet and old. Which sentence describes it?", "Le village est calme et vieux.", ["Le village est animé et vieux.", "Le village est calme et joli.", "Le village est animé et grand."]),
      ch("Hugo's garden is big and pretty. Which sentence describes it?", "Le jardin est grand et joli.", ["Le jardin est calme et joli.", "Le jardin est grand et vieux.", "Le jardin est animé et vieux."]),
      ch("Read: **Ma chambre est jolie. Il y a un lit et une chaise. Le chat est sous la chaise.** Where is the cat?", "Under the chair", ["On the bed", "Behind the chair", "In the garden"], fr("Ma chambre est jolie. Il y a un lit et une chaise. Le chat est sous la chaise.")),
      ch("Chloé's town is big and lively, with no park. Which sentence is true?", "Il n'y a pas de parc.", ["Il y a un grand parc.", "La ville est calme.", "Il y a un parc."]),
    ],
  },
};

/* ---------- Describing Actions ---------- */

// [infinitive, il/elle, ils/elles, nous, emoji, English -ing]
const VERBS = [
  ["manger", "mange", "mangent", "mangeons", "🍴", "eating"],
  ["courir", "court", "courent", "courons", "🏃", "running"],
  ["jouer", "joue", "jouent", "jouons", "⚽", "playing"],
  ["chanter", "chante", "chantent", "chantons", "🎤", "singing"],
  ["danser", "danse", "dansent", "dansons", "💃", "dancing"],
  ["nager", "nage", "nagent", "nageons", "🏊", "swimming"],
  ["regarder", "regarde", "regardent", "regardons", "👀", "watching"],
  ["dessiner", "dessine", "dessinent", "dessinons", "🖍️", "drawing"],
  ["lire", "lit", "lisent", "lisons", "📖", "reading"],
  ["écouter", "écoute", "écoutent", "écoutons", "👂", "listening"],
];
const MANNER = [["bien", "well"], ["mal", "badly"], ["vite", "quickly"], ["lentement", "slowly"]];
const OFTEN = [["souvent", "often"], ["toujours", "always"], ["quelquefois", "sometimes"]];
const NEVER = "never";
const SUBJECTS = [["Tom", 1, "Tom"], ["Les enfants", 2, "The children"], ["Nous", 3, "We"], ["Léa", 1, "Léa"], ["Ils", 2, "They (boys)"], ["Elles", 2, "They (girls)"]];
const form = (v, n) => v[n];
const vous = (v) => (v[0] === "lire" ? "lisez" : `${v[0].slice(0, -2)}ez`);
const verbWrong = (v, n) => [1, 2, 3].filter((k) => k !== n).map((k) => v[k]).concat([vous(v)]).slice(0, 3);
const NAMES = [["Léa", "Elle"], ["Tom", "Il"], ["Hugo", "Il"], ["Chloé", "Elle"]];
const PASSAGE = "Tom mange une pomme. Léa court vite. Hugo et Chloé jouent au football.";

const describingActions = {
  rule: "To say what someone is doing now, use the present tense: il mange, elle court, ils jouent, nous chantons. The ending changes with who is doing it: -e for il/elle, -ent for ils/elles and -ons for nous (with courir and lire: il court, il lit). Add a word to say how: bien (well), mal (badly), vite (quickly), lentement (slowly), or how often: souvent (often), toujours (always), quelquefois (sometimes).",
  hint: "Who is doing it: one person, more than one, or we? Then check the ending. Look for a word that says how or how often.",
  levels: {
    1: [
      ...VERBS.map((v) => (rng) => ch(`What does **il ${v[1]}** mean?`, `he is ${v[5]}`, some(rng, VERBS.map((x) => `he is ${x[5]}`), 3, [`he is ${v[5]}`]), fr(`il ${v[1]}`))),
      ...VERBS.map((v, i) => (rng) => {
        const [name, pron] = NAMES[i % NAMES.length];
        return ch(`${name} is ${v[5]} in the picture. Which French sentence describes it?`, `${pron} ${v[1]}.`, some(rng, VERBS.map((x) => `${pron} ${x[1]}.`), 3, [`${pron} ${v[1]}.`]), { picture: v[4], pictureLabel: `${name} is ${v[5]}`, ...fr(`${pron} ${v[1]}.`) });
      }),
      ...MANNER.map(([f, en]) => (rng) => ch(`What does **${f}** mean? (It says how someone does something.)`, en, some(rng, MANNER.map((m) => m[1]), 3, [en]), fr(f))),
      ...OFTEN.map(([f, en]) => (rng) => ch(`What does **${f}** mean? (It says how often.)`, en, some(rng, [...OFTEN.map((m) => m[1]), NEVER], 3, [en]), fr(f))),
    ],
    2: [
      ...VERBS.map((v) => (rng) => ch(`How do you say **he is ${v[5]}** in French?`, `il ${v[1]}`, some(rng, VERBS.map((x) => `il ${x[1]}`), 3, [`il ${v[1]}`]))),
      ...VERBS.slice(0, 5).map((v) => (rng) => ch(`How do you say **they are ${v[5]}** in French?`, `ils ${v[2]}`, some(rng, VERBS.map((x) => `ils ${x[2]}`), 3, [`ils ${v[2]}`]))),
      ...VERBS.slice(3, 8).map((v) => (rng) => ch(`How do you say **we are ${v[5]}** in French?`, `nous ${v[3]}`, some(rng, VERBS.map((x) => `nous ${x[3]}`), 3, [`nous ${v[3]}`]))),
      ...MANNER.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, MANNER.map((m) => m[0]), 3, [f]))),
      ...OFTEN.map(([f, en]) => (rng) => ch(`How do you say **${en}** in French?`, f, some(rng, [...OFTEN.map((m) => m[0]), "mal", "vite"], 3, [f]))),
      ...VERBS.map((v, i) => {
        const [subject, n] = SUBJECTS[i % SUBJECTS.length];
        return ch(`Choose the right verb form: **${subject} ___.** (${v[0]})`, form(v, n), verbWrong(v, n));
      }),
      st("Is it one person or more than one?", ["One person (il / elle)", "More than one (ils / elles)"], [
        ["il mange", 0], ["elle court", 0], ["il joue", 0], ["elle chante", 0], ["ils mangent", 1], ["elles courent", 1], ["ils jouent", 1], ["elles chantent", 1],
      ]),
      st("Does the word say how, or how often?", ["How (manner)", "How often"], [...MANNER.map(([f]) => [f, 0]), ...OFTEN.map(([f]) => [f, 1])]),
      st("Which ending does the verb have?", ["One person: -e", "Many people: -ent", "We: -ons"], [
        ["il joue", 0], ["elle chante", 0], ["il regarde", 0],
        ["ils jouent", 1], ["elles dansent", 1], ["ils nagent", 1],
        ["nous nageons", 2], ["nous chantons", 2], ["nous dessinons", 2],
      ]),
    ],
    3: [
      bd("Build the French: **He is eating an apple.**", "Il mange une pomme.", fr("Il mange une pomme.")),
      bd("Build the French: **She is running fast.**", "Elle court vite.", fr("Elle court vite.")),
      bd("Build the French: **They are playing football.**", "Ils jouent au football.", fr("Ils jouent au football.")),
      bd("Build the French: **We sing well.**", "Nous chantons bien.", fr("Nous chantons bien.")),
      bd("Build the French: **She draws slowly.**", "Elle dessine lentement.", fr("Elle dessine lentement.")),
      bd("Build the French: **He often swims.**", "Il nage souvent.", fr("Il nage souvent.")),
      bd("Build the French: **We always dance.**", "Nous dansons toujours.", fr("Nous dansons toujours.")),
      bd("Build the French: **They are listening to music.**", "Elles écoutent la musique.", fr("Elles écoutent la musique.")),
      bd("Build the French: **He is reading a book.**", "Il lit un livre.", fr("Il lit un livre.")),
      bd("Build the French: **She is playing tennis.**", "Elle joue au tennis.", fr("Elle joue au tennis.")),
      bd("Build the French: **We are watching TV.**", "Nous regardons la télé.", fr("Nous regardons la télé.")),
      ...VERBS.slice(0, 6).map((v) => (rng) => ch(`Tom and Hugo are ${v[5]} in the picture. Which French sentence describes it?`, `Ils ${v[2]}.`, some(rng, VERBS.map((x) => `Ils ${x[2]}.`), 3, [`Ils ${v[2]}.`]), { picture: v[4], pictureLabel: `Tom and Hugo are ${v[5]}`, ...fr(`Ils ${v[2]}.`) })),
      ch(`Read: **${PASSAGE}** Who is running fast?`, "Léa", ["Tom", "Hugo", "Chloé"], fr(PASSAGE)),
      ch(`Read: **${PASSAGE}** Who is eating an apple?`, "Tom", ["Léa", "Hugo", "Chloé"], fr(PASSAGE)),
      ch(`Read: **${PASSAGE}** What are Hugo and Chloé doing?`, "Playing football", ["Eating an apple", "Running fast", "Singing"], fr(PASSAGE)),
      ch("Read: **Léa chante bien. Tom chante mal.** Who sings well?", "Léa", ["Tom", "Both of them", "Neither of them"], fr("Léa chante bien. Tom chante mal.")),
      ch("Read: **Hugo joue souvent au tennis. Chloé joue quelquefois.** Who plays tennis most often?", "Hugo", ["Chloé", "Both the same", "Nobody"], fr("Hugo joue souvent au tennis. Chloé joue quelquefois.")),
      st("Does the word say how, or how often?", ["How (manner)", "How often"], [...MANNER.map(([f]) => [f, 0]), ...OFTEN.map(([f]) => [f, 1])]),
    ],
    4: [
      ty("Type the missing word. She runs fast.\n\nElle ___ vite.", "court"),
      ty("Type the missing word. He is eating an apple.\n\nIl ___ une pomme.", "mange"),
      ty("Type the missing word. They are playing football.\n\nIls ___ au football.", "jouent"),
      ty("Type the missing word. We sing well.\n\nNous ___ bien.", "chantons"),
      ty("Type the missing word. She often swims.\n\nElle ___ souvent.", "nage"),
      ty("Type the missing word. He is reading a book.\n\nIl ___ un livre.", "lit"),
      ty("Type the missing word. They are watching TV.\n\nIls ___ la télé.", "regardent"),
      ty("Type the missing word. We always dance.\n\nNous ___ toujours.", "dansons"),
      ty("Type the missing word. He plays badly.\n\nIl joue ___.", "mal"),
      ty("Type the missing word. She runs fast.\n\nElle court ___.", "vite"),
      ty("Type the missing word. Tom eats slowly.\n\nTom mange ___.", "lentement"),
      ty("Type the missing word. Léa sings well.\n\nLéa chante ___.", "bien"),
      ty("Type the missing word. He often swims.\n\nIl nage ___.", "souvent"),
      ty("Type the missing word. We always sing.\n\nNous chantons ___.", "toujours"),
      ty("Type the missing word. They (the girls) are playing.\n\n___ jouent.", "elles"),
      bd("Build the French: **She is running fast.**", "Elle court vite.", { more: ["courent", "Il"] }),
      bd("Build the French: **They are singing well.**", "Ils chantent bien.", { more: ["chante", "mal"] }),
      bd("Build the French: **We are eating an apple.**", "Nous mangeons une pomme.", { more: ["mange", "mangent"] }),
      bd("Build the French: **He often plays football.**", "Il joue souvent au football.", { more: ["jouent", "vite"] }),
      bd("Build the French: **She is drawing slowly.**", "Elle dessine lentement.", { more: ["bien", "dessinent"] }),
      ...NAMES.slice(0, 2).flatMap(([name, pron], i) => VERBS.slice(i * 4, i * 4 + 4).map((v) => (rng) => ch(`${name} is ${v[5]} in the picture. Which French sentence describes it?`, `${pron} ${v[1]}.`, some(rng, VERBS.map((x) => `${pron} ${x[1]}.`), 3, [`${pron} ${v[1]}.`]), { picture: v[4], pictureLabel: `${name} is ${v[5]}`, ...fr(`${pron} ${v[1]}.`) }))),
      ch("Léa sings well. Which sentence is right?", "Léa chante bien.", ["Léa chante mal.", "Léa chantent bien.", "Léa danse bien."]),
      ch("Tom and Hugo often swim. Which sentence is right?", "Tom et Hugo nagent souvent.", ["Tom et Hugo nage souvent.", "Tom et Hugo nagent toujours.", "Tom et Hugo dansent souvent."]),
      ch("Chloé always reads. Which sentence is right?", "Chloé lit toujours.", ["Chloé lit souvent.", "Chloé lisent toujours.", "Chloé écoute toujours."]),
      ch("We sometimes play tennis. Which sentence is right?", "Nous jouons quelquefois au tennis.", ["Nous jouons toujours au tennis.", "Nous jouent quelquefois au tennis.", "Nous chantons quelquefois au tennis."]),
    ],
  },
};

export const describing = {
  "describing-people": describingPeople,
  "describing-places": describingPlaces,
  "describing-actions": describingActions,
};

export const describingVisuals = {
  "describing-people": place("plain", "Three different people standing side by side: one tall, one shorter and one small.", [["🧑", 90, 140, 76], ["🧒", 200, 150, 60], ["👩", 310, 135, 88]], "Who is who?"),
  "describing-places": place("street", "A small street with two houses.", [["🏠", 110, 135, 92], ["🏡", 290, 135, 92]], "Describe a place."),
  "describing-actions": place("plain", "A boy and a girl, with a magnifying glass between them, looking closely at a scene.", [["🧒", 100, 140, 80], ["🔍", 200, 130, 56], ["🧑", 300, 140, 80]], "What are they doing?"),
};

const ANIMALS = { cat: "🐱", dog: "🐶" };
const THINGS = { box: "📦", chair: "🪑", bed: "🛏️", "two chairs": "🪑" };
/** The picture for "the cat is <prep> the <thing>", drawn from the English only. */
const spotPicture = (animal, prep, thing) => {
  const a = ANIMALS[animal];
  const t = THINGS[thing];
  const items = {
    "on": [[t, 200, 150, 100], [a, 200, 80, 56]],
    "under": [[t, 200, 90, 100], [a, 200, 170, 56]],
    "in front of": [[t, 200, 100, 110], [a, 200, 175, 64]],
    "behind": [[a, 200, 95, 64], [t, 200, 140, 110]],
    "next to": [[t, 140, 130, 100], [a, 275, 140, 60]],
    "between": [[t, 90, 130, 88], [a, 200, 140, 60], [t, 310, 130, 88]],
  }[prep];
  return items ? place("room", `The ${animal} is ${prep} the ${thing}.`, items) : null;
};
const PREP_RE = "(on|under|in front of|behind|next to|between)";
const THING_RE = "(box|chair|bed|two chairs)";
export const describingRules = {
  "describing-places": [
    rule(new RegExp(`^The (cat|dog) is \\*\\*${PREP_RE}\\*\\* the ${THING_RE}\\.`), (q, m) => spotPicture(m[1], m[2], m[3]), [2]),
    rule(new RegExp(`^Build the French: \\*\\*The (cat|dog) is ${PREP_RE} the ${THING_RE}\\.\\*\\*`), (q, m) => spotPicture(m[1], m[2], m[3]), [3]),
  ],
};
