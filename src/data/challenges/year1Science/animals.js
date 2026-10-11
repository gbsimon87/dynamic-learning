import { buildTopic, c, sorter, spell, typed } from "./engine.js";

// Year 1 Animals, including humans (docs/curriculum/year-1-science.md).
// Group features are stated carefully: "most" where there are exceptions,
// and examples chosen so each sits clearly in one group.

/* ---------- Fish, Amphibians, Reptiles, Birds and Mammals ---------- */

const GROUP_RULE = "Fish have fins and gills. Amphibians have smooth, damp skin. Reptiles have dry, scaly skin. Birds have feathers and a beak. Mammals have hair or fur and feed their babies milk.";
const GROUPS = ["fish", "amphibian", "reptile", "bird", "mammal"];
const group = (prompt, answer, extra = {}) => c(prompt, answer, GROUPS.filter((g) => g !== answer), { rule: GROUP_RULE, ...extra });

const groupLearn = [
  group("A robin has feathers and a beak. What kind of animal is it?", "bird"),
  group("A goldfish lives in water. It has fins and breathes with gills. What kind of animal is it?", "fish"),
  group("A dog has fur and feeds its puppies milk. What kind of animal is it?", "mammal"),
  group("A snake has dry, scaly skin. What kind of animal is it?", "reptile"),
  group("A frog has smooth, damp skin. It starts life as a tadpole in water. What kind of animal is it?", "amphibian"),
  group("A penguin cannot fly, but it has feathers and a beak. What kind of animal is it?", "bird"),
  group("A cat has fur and feeds its kittens milk. What kind of animal is it?", "mammal"),
  group("A tortoise has dry, scaly skin and a hard shell. What kind of animal is it?", "reptile"),
  group("A shark lives in water. It has fins and breathes with gills. What kind of animal is it?", "fish"),
  group("A newt has smooth, damp skin and lays its eggs in water. What kind of animal is it?", "amphibian"),
];

const groupFacts = [
  c("What covers a bird's body?", "feathers", ["fur", "dry scales", "smooth, damp skin"]),
  c("Which animal is a mammal?", "whale", ["shark", "goldfish", "penguin"], { hint: "Mammals feed their babies milk." }),
  c("Which animal is a bird?", "penguin", ["bat", "goldfish", "frog"], { hint: "Birds have feathers." }),
  c("Which animal is an amphibian?", "frog", ["lizard", "goldfish", "robin"], { hint: "Amphibians have smooth, damp skin." }),
  c("Which animal is a reptile?", "crocodile", ["frog", "salmon", "owl"], { hint: "Reptiles have dry, scaly skin." }),
  c("Which animal is a fish?", "shark", ["whale", "dolphin", "frog"], { hint: "Fish breathe with gills." }),
  c("How do fish breathe under water?", "with gills", ["with feathers", "with a beak", "with fur"]),
  c("Baby frogs hatch from eggs in water. What are they called?", "tadpoles", ["chicks", "kittens", "puppies"]),
];

const groupSorts = [
  sorter("Sort the animals: bird or mammal?", [["bird", "Birds"], ["mammal", "Mammals"]], [
    ["🦉 owl", "bird"], ["🐧 penguin", "bird"], ["🦆 duck", "bird"], ["🐦 robin", "bird"],
    ["🐶 dog", "mammal"], ["🐋 whale", "mammal"], ["🦇 bat", "mammal"], ["🐰 rabbit", "mammal"],
  ], { rule: "Birds have feathers. Mammals have hair or fur." }),
  sorter("Sort the animals: amphibian or reptile?", [["amphibian", "Amphibians"], ["reptile", "Reptiles"]], [
    ["🐸 frog", "amphibian"], ["newt", "amphibian"], ["salamander", "amphibian"],
    ["🐍 snake", "reptile"], ["🦎 lizard", "reptile"], ["🐢 tortoise", "reptile"], ["🐊 crocodile", "reptile"],
  ], { rule: "Amphibians have smooth, damp skin. Reptiles have dry, scaly skin." }),
];

const groupSorts3 = [
  sorter("Sort the animals into three groups.", [["fish", "Fish"], ["bird", "Birds"], ["mammal", "Mammals"]], [
    ["🐟 goldfish", "fish"], ["🦈 shark", "fish"], ["🐠 clownfish", "fish"],
    ["🦉 owl", "bird"], ["🐧 penguin", "bird"], ["🦆 duck", "bird"],
    ["🐶 dog", "mammal"], ["🐋 whale", "mammal"], ["🦇 bat", "mammal"], ["🐰 rabbit", "mammal"],
  ]),
  sorter("Sort the animals into three groups.", [["fish", "Fish"], ["amphibian", "Amphibians"], ["reptile", "Reptiles"]], [
    ["🐟 goldfish", "fish"], ["🦈 shark", "fish"], ["salmon", "fish"],
    ["🐸 frog", "amphibian"], ["newt", "amphibian"], ["salamander", "amphibian"],
    ["🐍 snake", "reptile"], ["🦎 lizard", "reptile"], ["🐢 tortoise", "reptile"],
  ]),
];

const groupSpell = [
  spell("bird", "🐦", "a small animal with feathers and a beak", "What kind of animal is this? Make the word."),
  spell("fish", "🐟", "an animal with fins and a tail", "What kind of animal is this? Make the word."),
  spell("mammal", "🐶", "a furry animal with four legs", "A dog has fur and feeds its puppies milk. What kind of animal is it? Make the word."),
  spell("reptile", "🐍", "a long animal with scaly skin", "A snake has dry, scaly skin. What kind of animal is it? Make the word."),
];

const groupApply = [
  c("Bix saw an animal flying at night. It has fur and feeds its babies milk. What kind of animal is it?", "mammal", ["bird", "reptile", "amphibian"]),
  c("Bix found jelly-like eggs in a pond. Tadpoles hatched and grew into frogs. What kind of animal laid the eggs?", "amphibian", ["fish", "bird", "reptile"]),
  c("A huge animal in the sea breathes air through a blowhole. It feeds its baby milk. What kind of animal is it?", "mammal", ["fish", "amphibian", "reptile"]),
  c("Bix held a pet with dry, scaly skin. It lays eggs on land. What kind of animal could it be?", "reptile", ["mammal", "bird", "amphibian"]),
  c("An animal has feathers but cannot fly. It swims in icy seas. What kind of animal is it?", "bird", ["fish", "mammal", "reptile"]),
];

const groupTyped = [
  typed("A robin has feathers and a beak. A robin is a ___. Type the missing word.", "bird"),
  typed("A goldfish has fins and gills. A goldfish is a ___. Type the missing word.", "fish"),
  typed("A cat has fur and feeds its kittens milk. A cat is a ___. Type the missing word.", "mammal"),
];

/* ---------- Carnivores, Herbivores and Omnivores ---------- */

const DIET_RULE = "Carnivores eat other animals. Herbivores eat only plants. Omnivores eat plants and animals.";
const DIETS = ["carnivore", "herbivore", "omnivore"];
const diet = (prompt, answer, extra = {}) => c(prompt, answer, DIETS.filter((d) => d !== answer), { rule: DIET_RULE, ...extra });

const dietLearn = [
  diet("A cow eats only grass and other plants. What is it?", "herbivore"),
  diet("A lion hunts and eats other animals. What is it?", "carnivore"),
  diet("A pig eats plants and animals. What is it?", "omnivore"),
  diet("A rabbit eats grass, leaves and other plants. What is it?", "herbivore"),
  diet("A shark eats fish and seals. What is it?", "carnivore"),
  diet("A brown bear eats berries, roots and fish. What is it?", "omnivore"),
  diet("A sheep eats only grass. What is it?", "herbivore"),
  diet("An owl eats mice and other small animals. What is it?", "carnivore"),
  diet("A fox eats mice, worms and berries. What is it?", "omnivore"),
];

const dietFacts = [
  c("What does a herbivore eat?", "only plants", ["only other animals", "plants and animals"]),
  c("What does a carnivore eat?", "other animals", ["only plants", "plants and animals"]),
  c("What does an omnivore eat?", "plants and animals", ["only plants", "only other animals"]),
  c("Which animal is a herbivore?", "giraffe", ["lion", "shark", "owl"], { hint: "A herbivore eats only plants." }),
  c("Which animal is a carnivore?", "tiger", ["cow", "rabbit", "sheep"], { hint: "A carnivore eats other animals." }),
  c("Which animal is an omnivore?", "bear", ["horse", "shark", "rabbit"], { hint: "An omnivore eats plants and animals." }),
  c("People can eat fruit, vegetables, meat and fish. What does that make people?", "omnivores", ["herbivores", "carnivores"]),
];

const CARNIVORES = [["🦁 lion", "carnivore"], ["🐯 tiger", "carnivore"], ["🦈 shark", "carnivore"], ["🦉 owl", "carnivore"], ["🐍 snake", "carnivore"], ["🐊 crocodile", "carnivore"]];
const HERBIVORES = [["🐮 cow", "herbivore"], ["🐰 rabbit", "herbivore"], ["🐑 sheep", "herbivore"], ["🐴 horse", "herbivore"], ["🦒 giraffe", "herbivore"], ["🐘 elephant", "herbivore"]];
const OMNIVORES = [["🐷 pig", "omnivore"], ["🐻 brown bear", "omnivore"], ["🦊 fox", "omnivore"], ["🐔 chicken", "omnivore"]];

const dietSorts = [
  sorter("Sort the animals: carnivore or herbivore?", [["carnivore", "Carnivore"], ["herbivore", "Herbivore"]], [...CARNIVORES, ...HERBIVORES], { rule: DIET_RULE }),
  sorter("Sort the animals: herbivore or omnivore?", [["herbivore", "Herbivore"], ["omnivore", "Omnivore"]], [...HERBIVORES, ...OMNIVORES], { rule: DIET_RULE }),
];

const dietSorts3 = [
  sorter("Sort the animals by what they eat.", [["carnivore", "Carnivore"], ["herbivore", "Herbivore"], ["omnivore", "Omnivore"]], [...CARNIVORES, ...HERBIVORES, ...OMNIVORES]),
  sorter("Which animals eat meat, which eat plants, and which eat both?", [["carnivore", "Carnivore"], ["herbivore", "Herbivore"], ["omnivore", "Omnivore"]], [...CARNIVORES.slice(0, 4), ...HERBIVORES.slice(2), ...OMNIVORES]),
];

const menu = (picture, pictureLabel, answer) => c(`An animal eats only ${pictureLabel}. What is it?`, answer, DIETS.filter((d) => d !== answer), {
  picture, pictureLabel, hint: "Are the foods plants, animals, or both?",
});
const dietMenus = [
  menu("🥕 🥬 🌾", "carrots, lettuce and grass", "herbivore"),
  menu("🍎 🍃 🌿", "apples, leaves and other plants", "herbivore"),
  menu("🐟 🐭", "fish and mice", "carnivore"),
  menu("🐛 🐌 🐞", "caterpillars, snails and ladybirds", "carnivore"),
  menu("🍓 🐟 🌰", "berries, fish and nuts", "omnivore"),
  menu("🌽 🐛 🍎", "corn, caterpillars and apples", "omnivore"),
];

const dietApply = [
  c("Bix's pet rabbit is hungry. Which food should Bix give it?", "hay and leafy greens", ["sausages", "tinned fish", "ham"]),
  c("Bix watched a robin eat worms and berries. What is a robin?", "omnivore", ["herbivore", "carnivore"]),
  c("Bix saw a horse eating grass and hay all day. What is a horse?", "herbivore", ["carnivore", "omnivore"]),
  c("At the zoo, the keeper gives the tiger meat. What is a tiger?", "carnivore", ["herbivore", "omnivore"]),
  c("Bix's chickens eat seeds, corn and insects. What are chickens?", "omnivores", ["herbivores", "carnivores"]),
  c("Which animal would eat a carrot?", "rabbit", ["shark", "owl", "snake"]),
];

const dietTyped = [
  typed("A herbivore eats only ___. Type the missing word.", "plants"),
  typed("A carnivore eats other ___. Type the missing word.", "animals"),
  typed("A cow is a herbivore. It eats lots of ___. Type the missing word.", "grass"),
];

/* ---------- Comparing Animal Bodies ---------- */

const bodyLearn = [
  c("What does a fish use to swim?", "fins", ["wings", "legs", "feathers"], { picture: "🐟", pictureLabel: "a fish" }),
  c("What does a bird use to fly?", "wings", ["fins", "gills", "fur"], { picture: "🐦", pictureLabel: "a small bird" }),
  c("What covers a dog's body?", "fur", ["feathers", "scales", "a shell"], { picture: "🐶", pictureLabel: "a dog" }),
  c("What covers a duck's body?", "feathers", ["fur", "scales", "a shell"], { picture: "🦆", pictureLabel: "a duck" }),
  c("What covers a snake's body?", "scales", ["fur", "feathers", "a shell"], { picture: "🐍", pictureLabel: "a snake" }),
  c("What does a tortoise have on its back?", "a hard shell", ["wings", "feathers", "fins"], { picture: "🐢", pictureLabel: "a tortoise" }),
  c("A bird has no teeth. What does it peck with?", "a beak", ["gills", "fins", "a shell"], { picture: "🐔", pictureLabel: "a hen" }),
  c("What is a frog's skin like?", "smooth and damp", ["covered in feathers", "covered in fur", "dry and scaly"], { picture: "🐸", pictureLabel: "a frog" }),
];

const legs = (prompt, answer, picture, pictureLabel) => ({ type: "number", prompt, answer, picture, pictureLabel, hint: "Picture the animal and count." });
const bodyCount = [
  legs("How many legs does a bird have?", 2, "🐔", "a hen"),
  legs("How many legs does a dog have?", 4, "🐶", "a dog"),
  legs("How many legs does a snake have?", 0, "🐍", "a snake"),
  legs("How many legs does a fish have?", 0, "🐟", "a fish"),
  legs("How many legs does a frog have?", 4, "🐸", "a frog"),
  legs("How many legs does a person have?", 2, "🧍", "a person standing"),
  legs("How many wings does a bird have?", 2, "🐦", "a small bird"),
  legs("How many legs does a lizard have?", 4, "🦎", "a lizard"),
];

const bodySorts = [
  sorter("Sort the animals: legs or no legs?", [["legs", "Has legs"], ["none", "No legs"]], [
    ["🐶 dog", "legs"], ["🦆 duck", "legs"], ["🐸 frog", "legs"], ["🦎 lizard", "legs"], ["🐱 cat", "legs"],
    ["🐍 snake", "none"], ["🐟 goldfish", "none"], ["🐋 whale", "none"],
  ]),
  sorter("Sort the animals: can it fly or not?", [["fly", "Can fly"], ["not", "Cannot fly"]], [
    ["🦉 owl", "fly"], ["🦇 bat", "fly"], ["🦆 duck", "fly"], ["🐦 robin", "fly"],
    ["🐧 penguin", "not"], ["🐶 dog", "not"], ["🐟 goldfish", "not"], ["🐍 snake", "not"],
  ], { hint: "Not every bird can fly, and one mammal can." }),
];

const bodySorts3 = [
  sorter("What covers each pet's body?", [["fur", "Fur"], ["feathers", "Feathers"], ["scales", "Scales"]], [
    ["🐱 cat", "fur"], ["🐰 rabbit", "fur"], ["🐹 hamster", "fur"], ["🐶 dog", "fur"],
    ["budgie", "feathers"], ["🐔 hen", "feathers"], ["🦜 parrot", "feathers"],
    ["🐍 snake", "scales"], ["🐟 goldfish", "scales"], ["🦎 lizard", "scales"],
  ]),
];

const bodyCompare = [
  c("What do a robin and a penguin both have?", "feathers", ["fur", "fins", "gills"]),
  c("What do a cat and a dog both have?", "fur", ["feathers", "fins", "a beak"]),
  c("What do a goldfish and a shark both have?", "fins", ["fur", "feathers", "legs"]),
  c("What does a bird have that a dog does not?", "feathers", ["legs", "eyes", "a tail"]),
  c("What does a fish have that a cat does not?", "fins", ["eyes", "a mouth", "a tail"]),
  c("How is a snake different from a lizard?", "A snake has no legs.", ["A snake has feathers.", "A snake has fur.", "A snake has fins."]),
  c("A bat and a bird both have wings. What does a bat have that a bird does not?", "fur", ["wings", "eyes", "a head"]),
];

const bodySpell = [
  spell("beak", "🐔", "a hen", "What does a hen peck with? Make the word."),
  spell("fins", "🐟", "a fish", "What does a fish swim with? Make the word."),
  spell("fur", "🐰", "a rabbit", "What covers a rabbit's body? Make the word."),
  spell("wings", "🦆", "a duck", "What does a duck fly with? Make the word."),
  spell("shell", "🐢", "a tortoise", "What does a tortoise have on its back? Make the word."),
];

const bodyApply = [
  c("Bix found an animal with feathers, a beak and two legs. What could it be?", "hen", ["cat", "goldfish", "lizard"]),
  c("Bix's pet has four legs, fur and long ears. Which pet is it?", "rabbit", ["goldfish", "budgie", "tortoise"]),
  c("Bix's pet lives in a tank of water and swims with fins. Which pet is it?", "goldfish", ["hamster", "budgie", "cat"]),
  c("Bix's pet has a hard shell and scaly legs. Which pet is it?", "tortoise", ["hamster", "budgie", "rabbit"]),
  c("Bix's pet has feathers and sings in a cage. Which pet is it?", "budgie", ["hamster", "goldfish", "tortoise"]),
];

const bodyTyped = [
  typed("A bird is covered in ___. Type the missing word.", "feathers"),
  typed("A fish swims with its ___. Type the missing word.", "fins"),
  typed("A dog is covered in ___. Type the missing word.", "fur"),
];

/* ---------- Parts of the Human Body ---------- */

const PART_HINTS = {
  hair: "It grows on top of your head.", head: "Your face is on it.", eye: "You see with it.", ear: "You hear with it.",
  nose: "You smell with it.", mouth: "You eat and talk with it.", neck: "It joins your head to your body.",
  shoulder: "It is at the top of your arm.", arm: "It is between your shoulder and your hand.", elbow: "Your arm bends here.",
  hand: "It is at the end of your arm.", leg: "You stand on two of these.", knee: "Your leg bends here.", foot: "It is at the end of your leg.",
};
// Wrong options are parts far from the arrow, so a near-miss never looks right.
const FAR = {
  hair: ["knee", "foot", "elbow"], head: ["knee", "foot", "hand"], eye: ["knee", "foot", "elbow"], ear: ["knee", "foot", "hand"],
  nose: ["knee", "elbow", "foot"], mouth: ["knee", "foot", "elbow"], neck: ["knee", "foot", "hand"], shoulder: ["knee", "foot", "nose"],
  arm: ["knee", "nose", "foot"], elbow: ["knee", "neck", "foot"], hand: ["foot", "ear", "knee"], leg: ["arm", "neck", "ear"],
  knee: ["elbow", "neck", "ear"], foot: ["hand", "ear", "neck"],
};
const bodyPoint = (part) => c("Which part of the body is the arrow pointing to?", part, FAR[part], { visual: { type: "body", point: part }, hint: PART_HINTS[part] });
const humanLearn = Object.keys(FAR).map(bodyPoint);

const humanFacts = [
  c("Which body part bends in the middle of your leg?", "knee", ["elbow", "neck", "shoulder"]),
  c("Which body part bends in the middle of your arm?", "elbow", ["knee", "neck", "foot"]),
  c("What joins your head to your body?", "neck", ["knee", "elbow", "foot"]),
  c("What do you use to chew your food?", "teeth", ["ears", "elbows", "knees"]),
  c("What grows on top of your head?", "hair", ["teeth", "knees", "elbows"]),
  c("What is at the end of your arm?", "hand", ["foot", "knee", "ear"]),
  c("What is at the end of your leg?", "foot", ["hand", "elbow", "ear"]),
  c("Which part of your body has your face on it?", "head", ["knee", "foot", "elbow"]),
];

const humanSorts = [
  sorter("Sort the body parts: on your head or not?", [["head", "On your head"], ["not", "Not on your head"]], [
    ["eyes", "head"], ["ears", "head"], ["nose", "head"], ["mouth", "head"], ["hair", "head"],
    ["knee", "not"], ["elbow", "not"], ["foot", "not"], ["hand", "not"],
  ]),
  sorter("Sort the body parts: part of an arm or part of a leg?", [["arm", "Arm"], ["leg", "Leg"]], [
    ["elbow", "arm"], ["hand", "arm"], ["fingers", "arm"], ["wrist", "arm"],
    ["knee", "leg"], ["foot", "leg"], ["toes", "leg"], ["ankle", "leg"],
  ]),
];

const humanOrder = [
  { type: "order", prompt: "Put the body parts in order from the top of your body to the bottom.", labels: ["head", "shoulders", "knees", "toes"], hint: "Sing the song: head, shoulders..." },
  { type: "order", prompt: "Put the body parts in order from the top of your body to the bottom.", labels: ["hair", "neck", "knee", "foot"] },
  { type: "order", prompt: "Put the body parts in order from the top of your body to the bottom.", labels: ["eyes", "mouth", "neck"] },
];

const spellBody = (answer, part) => ({ ...spell(answer, undefined, undefined, "Make the name of the body part the arrow points to."), visual: { type: "body", point: part } });
const humanSpell = [spellBody("hand", "hand"), spellBody("knee", "knee"), spellBody("neck", "neck"), spellBody("nose", "nose"), spellBody("foot", "foot")];

const humanApply = [
  c("Bix waves hello. Which body part does Bix wave?", "hand", ["foot", "knee", "neck"]),
  c("Bix kicks a ball. Which body part does Bix kick with?", "foot", ["hand", "elbow", "ear"]),
  c("Bix nods to say yes. Which body part lets the head move?", "neck", ["elbow", "knee", "foot"]),
  c("Bix brushes them twice a day. They help Bix chew. What are they?", "teeth", ["ears", "knees", "elbows"]),
  c("Bix puts on a woolly hat. Which body part does it go on?", "head", ["foot", "knee", "hand"]),
  c("Bix kneels down on the grass. Which body parts touch the ground?", "knees", ["elbows", "ears", "shoulders"]),
];

const humanTyped = [
  typed("Your arm bends at your ___. Type the missing word.", "elbow"),
  typed("You chew your food with your ___. Type the missing word.", "teeth"),
  typed("At the end of your leg is your ___. Type the missing word.", "foot"),
];

/* ---------- Our Five Senses ---------- */

const SENSES = ["sight", "hearing", "smell", "taste", "touch"];
const PARTS = ["eyes", "ears", "nose", "tongue", "skin"];
const sense = (prompt, answer, extra = {}) => c(prompt, answer, SENSES.filter((s) => s !== answer), extra);
const part = (prompt, answer, extra = {}) => c(prompt, answer, PARTS.filter((p) => p !== answer), extra);
const SENSE_RULE = "We see with our eyes, hear with our ears, smell with our nose, taste with our tongue and feel with our skin.";

const senseLearn = [
  sense("Which sense do you use your eyes for?", "sight", { picture: "👀", pictureLabel: "two eyes", rule: SENSE_RULE }),
  sense("Which sense do you use your ears for?", "hearing", { picture: "👂", pictureLabel: "an ear", rule: SENSE_RULE }),
  sense("Which sense do you use your nose for?", "smell", { picture: "👃", pictureLabel: "a nose", rule: SENSE_RULE }),
  sense("Which sense do you use your tongue for?", "taste", { picture: "👅", pictureLabel: "a tongue", rule: SENSE_RULE }),
  sense("Your skin feels things. Which sense is this?", "touch", { picture: "✋", pictureLabel: "an open hand", rule: SENSE_RULE }),
  part("Which body part do you use to hear?", "ears", { rule: SENSE_RULE }),
  part("Which body part do you use to smell?", "nose", { rule: SENSE_RULE }),
  part("Which body part do you use to taste?", "tongue", { rule: SENSE_RULE }),
  part("Which body part do you use to see?", "eyes", { rule: SENSE_RULE }),
  part("Which body part tells you that a blanket is soft?", "skin", { rule: SENSE_RULE }),
];

const senseFacts = [
  sense("Bix listens to birds singing. Which sense is Bix using?", "hearing"),
  sense("Bix smells fresh bread. Which sense is Bix using?", "smell"),
  sense("Bix tastes a lemon. It is sour! Which sense is Bix using?", "taste"),
  sense("Bix strokes a soft kitten. Which sense is Bix using?", "touch"),
  sense("Bix looks at a rainbow. Which sense is Bix using?", "sight"),
  sense("Bix hears a fire engine. Which sense is Bix using?", "hearing"),
  sense("Bix feels how cold the snow is. Which sense is Bix using?", "touch"),
];

const senseSorts = [
  sorter("Do you hear it or smell it?", [["hear", "You hear it"], ["smell", "You smell it"]], [
    ["a dog barking", "hear"], ["thunder", "hear"], ["a whistle", "hear"], ["a song", "hear"],
    ["the smell of toast", "smell"], ["a stinky bin", "smell"], ["the smell of baking cakes", "smell"],
  ]),
  sorter("Do you find out by tasting or by touching?", [["taste", "Taste"], ["touch", "Touch"]], [
    ["how sweet a strawberry is", "taste"], ["how sour a lemon is", "taste"], ["how salty crisps are", "taste"],
    ["how soft a pillow is", "touch"], ["how rough bark is", "touch"], ["how cold an ice cube is", "touch"],
  ]),
];

const senseSorts3 = [
  sorter("Which body part would you use?", [["eyes", "Eyes"], ["ears", "Ears"], ["nose", "Nose"]], [
    ["the colours of a rainbow", "eyes"], ["the pictures in a book", "eyes"],
    ["a loud drum", "ears"], ["a doorbell ringing", "ears"], ["birds singing", "ears"],
    ["the smell of toast", "nose"], ["a smelly sock", "nose"],
  ]),
  sorter("Which body part would you use?", [["tongue", "Tongue"], ["skin", "Skin"], ["ears", "Ears"]], [
    ["how sweet a strawberry is", "tongue"], ["how sour a lemon is", "tongue"],
    ["how rough bark is", "skin"], ["how cold an ice cube is", "skin"],
    ["a bell ringing", "ears"], ["a dog barking", "ears"],
  ]),
];

const senseSpell = [
  spell("eyes", "👀", "two eyes", "What do you see with? Make the word."),
  spell("ears", "👂", "an ear", "What do you hear with? Make the word."),
  spell("nose", "👃", "a nose", "What do you smell with? Make the word."),
  spell("tongue", "👅", "a tongue", "What do you taste with? Make the word."),
  spell("skin", "✋", "an open hand", "What covers your body and feels things? Make the word."),
];

const senseApply = [
  sense("Bix covers both ears. Which sense is harder to use now?", "hearing"),
  sense("Bix wears a blindfold. Which sense can Bix not use?", "sight"),
  c("Bix has a blocked nose from a cold. Which sense is harder to use?", "smell", ["sight", "hearing", "touch"]),
  c("Bix wants to know if the bath water is too hot. Which sense should Bix use, carefully?", "touch", ["sight", "hearing", "taste"]),
  c("Bix wants to find out which crisps are the saltiest. Which sense should Bix use?", "taste", ["hearing", "sight", "touch"]),
  c("Bix finds some berries on a walk. What should Bix do?", "Ask a grown-up and do not eat them", ["Taste one to find out", "Eat them all"]),
];

const senseTyped = [
  typed("You hear with your ___. Type the missing word.", "ears"),
  typed("You see with your ___. Type the missing word.", "eyes"),
  typed("You smell with your ___. Type the missing word.", "nose"),
];

export const animalBuilders = {
  "fish-amphibians-reptiles-birds-and-mammals": buildTopic({
    banks: { learn: groupLearn, facts: groupFacts, sorts: groupSorts, sorts3: groupSorts3, spell: groupSpell, apply: groupApply, typed: groupTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["sorts3", "spell", "sorts3", "spell", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "carnivores-herbivores-and-omnivores": buildTopic({
    banks: { learn: dietLearn, facts: dietFacts, sorts: dietSorts, sorts3: dietSorts3, menus: dietMenus, apply: dietApply, typed: dietTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "facts", "sorts", "facts", "facts"],
      3: ["sorts3", "menus", "sorts3", "menus", "menus"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "comparing-animal-bodies": buildTopic({
    banks: { learn: bodyLearn, count: bodyCount, sorts: bodySorts, sorts3: bodySorts3, compare: bodyCompare, spell: bodySpell, apply: bodyApply, typed: bodyTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "count", "compare", "sorts", "count"],
      3: ["sorts3", "compare", "spell", "compare", "spell"],
      4: ["apply", "count", "apply", "apply", "typed"],
    },
  }),
  "parts-of-the-human-body": buildTopic({
    banks: { learn: humanLearn, facts: humanFacts, sorts: humanSorts, order: humanOrder, spell: humanSpell, apply: humanApply, typed: humanTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["order", "spell", "order", "spell", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "our-five-senses": buildTopic({
    banks: { learn: senseLearn, facts: senseFacts, sorts: senseSorts, sorts3: senseSorts3, spell: senseSpell, apply: senseApply, typed: senseTyped },
    levels: {
      1: ["learn", "learn", "learn", "learn", "learn"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["sorts3", "spell", "sorts3", "spell", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
};
