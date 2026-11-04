import { fact as f, groups as g, sentence as s, sequence as o, measurement as n, keyVisual } from "./engine.js";
import { rule } from "../figures.js";

// Year 6 "Living things and their habitats". The topic picture only sets the scene: it never
// names a group or shows an answer. Key questions carry their own key, drawn from the supplied
// branches, so a learner always follows the key rather than guessing from the animal's name.
const scene = (backdrop, alt, items, extra = {}) => ({ type: "scene", backdrop, alt, items, ...extra });

// Four supplied keys. Following each one from the top reaches exactly one name.
const keyMinibeasts = keyVisual(
  [["Does it have a shell?", "Snail"], ["Does it have six legs?", "Ant"], ["Does it have eight legs?", "Spider"]],
  "Earthworm",
  "A classification key with three questions. Does it have a shell? Yes, snail. Does it have six legs? Yes, ant. Does it have eight legs? Yes, spider. If all are no, earthworm.",
);
const keyVertebrates = keyVisual(
  [["Does it have feathers?", "Robin"], ["Does it have fur?", "Fox"], ["Does it have dry scales and breathe with lungs?", "Lizard"], ["Does it have smooth, moist skin?", "Frog"]],
  "Salmon",
  "A classification key with four questions. Feathers: robin. Fur: fox. Dry scales and lungs: lizard. Smooth, moist skin: frog. If all are no, salmon.",
);
const keyPlants = keyVisual(
  [["Does it have flowers?", "Daisy"], ["Does it make cones?", "Pine tree"], ["Does it have large feathery fronds?", "Fern"]],
  "Moss",
  "A classification key with three questions. Flowers: daisy. Cones: pine tree. Large feathery fronds: fern. If all are no, moss.",
);
const keyGarden = keyVisual(
  [["Does it have a long body made of rings?", "Earthworm"], ["Does it have a shell on its back?", "Snail"], ["Does it have more than ten legs?", "Woodlouse"], ["Does it have wings?", "Bee"]],
  "Spider",
  "A classification key with four questions. Long ringed body: earthworm. Shell: snail. More than ten legs: woodlouse. Wings: bee. If all are no, spider.",
);
const keyed = (prompt, visual, answer, wrong) => ({ ...f(prompt, answer, ...wrong), visual });

const tallyTable = { headings: ["Broad group", "Living things found in the school grounds"], rows: [["Plants", 14], ["Animals", 9]] };
const woodTable = { headings: ["Minibeast", "Number found under the log"], rows: [["Ants", 12], ["Spiders", 4], ["Snails", 6], ["Worms", 3]] };
const reserveTable = { headings: ["Group", "Animals counted in the nature reserve"], rows: [["Fish", 5], ["Amphibians", 7], ["Reptiles", 2], ["Birds", 3], ["Mammals", 4]] };
const featuresTable = { headings: ["Animal", "Skin covering", "How it breathes"], rows: [["Salmon", "Scales", "Gills"], ["Adult frog", "Moist skin", "Lungs and skin"], ["Lizard", "Dry scales", "Lungs"], ["Robin", "Feathers", "Lungs"]] };
const mouldTable = { headings: ["Where the bread was kept", "Days until mould appeared"], rows: [["Fridge", 12], ["Cupboard", 6], ["Warm windowsill", 3]] };

export const living = {
  "classifying-living-things": {
    rule: "Scientists sort living things into groups using features we can observe. The broad groups are micro-organisms, plants and animals, and each broad group can be split into smaller groups. Carl Linnaeus was a pioneer of classification who built a system for naming and grouping living things.",
    hint: "Look for features you can observe, then ask which group shares them.",
    facts: [
      f("Which three broad groups does this topic sort living things into?", "Micro-organisms, plants and animals", "Rocks, metals and plastics", "Roots, stems and leaves"),
      f("Which scientist is known as a pioneer of classification?", "Carl Linnaeus", "Isaac Newton", "Thomas Edison"),
      f("What does classifying mean?", "Sorting things into groups using their features", "Giving things a new name each day", "Counting how many there are"),
      f("Which of these is an observable characteristic of a plant?", "The colour of its leaves", "Its owner's name", "How much it costs"),
      f("Which broad group do oak trees belong to?", "Plants", "Animals", "Micro-organisms"),
      f("Which broad group is made up of living things too small to see without a microscope?", "Micro-organisms", "Plants", "Animals"),
      f("Which broad group do all insects belong to?", "Animals", "Plants", "Micro-organisms"),
      f("What can a broad group such as animals be split into?", "Smaller groups, such as vertebrates and invertebrates", "Nothing, it cannot be split", "Only rocks and water"),
      f("How do plants and animals differ in how they get their food?", "Plants make their own food using sunlight, and animals eat food", "Animals make food from sunlight, and plants eat food", "Neither of them needs food"),
      f("Why do scientists put living things into groups?", "It helps them find similarities and differences", "It makes living things smaller", "It stops living things from changing"),
      f("What did Carl Linnaeus help scientists to do?", "Name and group living things in a system", "Build the first microscope", "Discover gravity"),
      f("Which observable feature is usually true of plants?", "They stay fixed in one place", "They hunt for their food", "They move from place to place"),
    ],
    sorts: [
      g("Sort each living thing into its broad group.", ["Plants", "Animals"], [["Oak tree", 0], ["Daisy", 0], ["Fern", 0], ["Rabbit", 1], ["Spider", 1], ["Trout", 1]]),
      g("Which broad group does each feature describe?", ["Plants", "Animals"], [["Makes its own food using sunlight", 0], ["Has leaves and roots", 0], ["Usually stays in one place", 0], ["Eats food to get energy", 1], ["Can usually move from place to place", 1], ["Gets food by eating plants or other animals", 1]]),
      g("Sort each living thing into one of the three broad groups.", ["Micro-organism", "Plant", "Animal"], [["Bacterium", 0], ["Yeast", 0], ["Grass", 1], ["Sunflower", 1], ["Earthworm", 2], ["Eagle", 2]]),
    ],
    structures: [
      s("Build a sentence about classification.", "Scientists classify living things into groups."),
      s("Build a sentence about Linnaeus.", "Carl Linnaeus helped to name living things."),
      s("Build a sentence about plants.", "Plants make their own food."),
      o("Order these groups from the biggest group to the smallest group.", ["Living things", "Animals", "Vertebrates", "Mammals"]),
      g("Which of these are broad groups, and which are smaller groups inside them?", ["Broad group", "Smaller group inside a broad group"], [["Plants", 0], ["Micro-organisms", 0], ["Animals", 0], ["Fish", 1], ["Insects", 1], ["Mammals", 1]]),
    ],
    enquiries: [
      { ...f("Look at Ellie's tally. Which broad group did she find most of?", "Plants", "Animals", "Micro-organisms"), table: tallyTable },
      { ...n("Look at Ellie's tally. How many living things did she find altogether?", 23), table: tallyTable },
      { ...n("Look at Ellie's tally. How many more plants than animals did she find?", 5), table: tallyTable },
      f("Maya finds a creature in the garden that eats leaves, has six legs and can move. Which broad group is it in?", "Animals", "Plants", "Micro-organisms"),
      f("Ellie finds something on the pond that makes its own food from sunlight, has green leaves and stays in one place. Which broad group is it in?", "Plants", "Animals", "Micro-organisms"),
      f("Leo wants to classify some living things from the garden. What is the best first step?", "Look closely at each one and record what he observes", "Guess the group from the name", "Choose the biggest one first"),
      f("Maya says, 'A spider is a plant because it lives in the garden.' Why is she wrong?", "Where it lives does not decide its group, its features do", "Spiders are too small to be in a group", "Spiders live in water"),
      f("What kind of evidence did Linnaeus use to group living things?", "Similarities and differences in what they look like", "What colour the scientist liked", "How noisy they were"),
      o("Order Leo's steps to classify an unfamiliar plant, starting with the first step.", ["Look closely at the plant", "Record its observable features", "Compare the features with groups you know", "Decide which group it belongs to"]),
      { ...s("Use Ellie's tally to build a conclusion.", "There were more plants than animals."), table: tallyTable },
      g("Maya sorts what she wrote in her notebook. Is each statement an observation or an opinion?", ["Observation", "Opinion"], [["The leaf is green", 0], ["The animal has six legs", 0], ["The plant has no flowers", 0], ["Spiders are scary", 1], ["Daisies are the best plants", 1], ["Snails are boring", 1]]),
      g("Ellie reviews claims about classification. Sort each claim.", ["Supported by science", "Not supported"], [["Living things can be sorted by their features", 0], ["Groups can be split into smaller groups", 0], ["Animals, plants and micro-organisms are broad groups", 0], ["Plants are animals that stay still", 1], ["A group can never have smaller groups inside it", 1], ["Living things are sorted only by how big they are", 1]]),
    ],
  },

  "vertebrate-groups": {
    rule: "Vertebrates are animals with a backbone, and they are sorted into five groups. Fish have gills and scales, amphibians have moist skin, reptiles have dry scales, birds have feathers, and mammals have hair or fur and feed their young on milk. We place an animal in a group by its characteristics, not by where it lives.",
    hint: "Check its skin covering, how it breathes and how its young begin life.",
    facts: [
      f("What do all vertebrates have?", "A backbone", "Six legs", "A hard outer shell"),
      f("Which animal group has gills, scales and fins?", "Fish", "Birds", "Mammals"),
      f("Which animal group has moist skin and starts life in water?", "Amphibians", "Reptiles", "Birds"),
      f("Which animal group has dry, scaly skin and lays eggs on land?", "Reptiles", "Mammals", "Fish"),
      f("Which animal group has feathers?", "Birds", "Mammals", "Reptiles"),
      f("Which animal group feeds its young on milk?", "Mammals", "Birds", "Fish"),
      f("A frog is an amphibian. What does that tell you about its skin?", "It is moist and smooth", "It is covered in feathers", "It is covered in dry scales"),
      f("Which of these is a reptile?", "Snake", "Frog", "Salmon"),
      f("Which of these is a mammal?", "Dolphin", "Shark", "Crocodile"),
      f("Which of these is a fish?", "Trout", "Newt", "Dolphin"),
      f("How do fish breathe in water?", "With gills", "With lungs", "Through their feathers"),
      f("Which of these animals is a bird?", "Owl", "Bat", "Lizard"),
    ],
    sorts: [
      g("Sort each animal into its group.", ["Fish", "Amphibian", "Reptile"], [["Salmon", 0], ["Cod", 0], ["Frog", 1], ["Newt", 1], ["Snake", 2], ["Crocodile", 2]]),
      g("Sort the animals into mammals and birds.", ["Mammal", "Bird"], [["Bat", 0], ["Dolphin", 0], ["Horse", 0], ["Penguin", 1], ["Owl", 1], ["Ostrich", 1]]),
      g("Sort each animal by whether it has a backbone.", ["Has a backbone", "No backbone"], [["Goldfish", 0], ["Sparrow", 0], ["Snake", 0], ["Beetle", 1], ["Snail", 1], ["Earthworm", 1]]),
    ],
    structures: [
      s("Build a sentence about vertebrates.", "Vertebrates are animals with a backbone."),
      s("Build a sentence about mammals.", "Mammals feed their young on milk."),
      s("Build a sentence about fish.", "Fish use gills to breathe."),
      o("Order the life of a frog, starting with the eggs.", ["Frogspawn in a pond", "Tadpole with gills", "Froglet with four legs", "Adult frog on land"]),
      g("Which of these facts are true of birds, and which are true of amphibians?", ["Birds", "Amphibians"], [["Has feathers", 0], ["Lays hard-shelled eggs", 0], ["Has a beak", 0], ["Has moist skin", 1], ["Lays jelly-covered eggs in water", 1], ["Young breathe with gills at first", 1]]),
    ],
    enquiries: [
      f("Leo finds an animal with a backbone, feathers and a beak. Which group does it belong to?", "Birds", "Mammals", "Reptiles"),
      f("Maya finds an animal with a backbone, dry scales and four legs. It lays its eggs on land. Which group does it belong to?", "Reptiles", "Amphibians", "Fish"),
      f("Ellie says a whale is a fish because it lives in the sea. Which observation shows she is wrong?", "It breathes air with lungs and feeds its young milk", "It is very big", "It has a tail"),
      f("Leo says a bat is a bird because it flies. Which characteristic shows it is a mammal?", "It has fur and feeds its young milk", "It can fly at night", "It sleeps in the day"),
      { ...f("Look at Maya's table. Which animal belongs in the group of birds?", "Robin", "Salmon", "Lizard"), table: featuresTable },
      { ...f("Look at Maya's table. Which animal breathes with gills?", "Salmon", "Robin", "Lizard"), table: featuresTable },
      { ...n("Look at Leo's survey. How many animals did he count altogether?", 21), table: reserveTable },
      { ...n("Look at Leo's survey. How many more amphibians than reptiles did he count?", 5), table: reserveTable },
      o("Order Maya's steps to classify an unknown vertebrate, starting with the first step.", ["Check that it has a backbone", "Look at its skin covering", "Check how it breathes and how it has young", "Name its group"]),
      s("Leo writes a conclusion about a whale.", "A whale is a mammal because it breathes air."),
      g("Maya sorts clues about two animal groups.", ["Reptile", "Bird"], [["Has dry, scaly skin", 0], ["Basks in the sun to warm up", 0], ["Includes snakes and lizards", 0], ["Is covered in feathers", 1], ["Has a beak", 1], ["Has wings and feathers", 1]]),
      g("Leo checks claims about vertebrates.", ["True", "False"], [["Fish have gills", 0], ["Mammals have hair or fur", 0], ["Birds have feathers", 0], ["Reptiles have moist skin", 1], ["Amphibians have feathers", 1], ["All vertebrates live in water", 1]]),
    ],
  },

  "invertebrate-groups": {
    rule: "Invertebrates are animals with no backbone, and most animals are invertebrates. Insects have six legs, spiders have eight, snails have a soft body with one foot, and worms have a long body with no legs. We group them by features such as the number of legs, body parts and whether they have a shell.",
    hint: "Count the legs and look at the body: shell, rings or no legs.",
    facts: [
      f("Which statement is true of invertebrates?", "They have no backbone", "They all have six legs", "They all live in water"),
      f("How many legs does an insect have?", "Six", "Four", "Eight"),
      f("How many legs does a spider have?", "Eight", "Six", "Ten"),
      f("Which invertebrate has a long, soft body and no legs?", "Earthworm", "Beetle", "Spider"),
      f("Which invertebrate carries a shell on its back?", "Snail", "Ant", "Earthworm"),
      f("Which of these is an insect?", "Ladybird", "Spider", "Snail"),
      f("How many body parts does an insect have?", "Three", "Two", "Five"),
      f("How many body parts does a spider have?", "Two", "Three", "One"),
      f("Which feature do insects have that spiders do not?", "Antennae", "Legs", "Eyes"),
      f("What do we call an animal with no backbone?", "An invertebrate", "A vertebrate", "An amphibian"),
      f("Which of these animals is an invertebrate?", "Butterfly", "Frog", "Robin"),
      f("Which invertebrates move along on one muscular foot?", "Snails and slugs", "Insects", "Spiders"),
    ],
    sorts: [
      g("Sort each animal into its group.", ["Insect", "Spider"], [["Ant", 0], ["Beetle", 0], ["Butterfly", 0], ["Garden spider", 1], ["House spider", 1], ["Wolf spider", 1]]),
      g("Which group does each description fit?", ["Insects", "Spiders", "Worms and snails"], [["Six legs", 0], ["Three body parts", 0], ["Eight legs", 1], ["Two body parts", 1], ["Soft body with no legs", 2], ["Some carry a hard spiral shell", 2]]),
      g("Which of these animals have a backbone, and which do not?", ["Vertebrate", "Invertebrate"], [["Rabbit", 0], ["Pigeon", 0], ["Frog", 0], ["Slug", 1], ["Wasp", 1], ["Centipede", 1]]),
    ],
    structures: [
      s("Build a sentence about insects.", "Insects have six legs and three body parts."),
      s("Build a sentence about spiders.", "Spiders have eight legs."),
      s("Build a sentence about invertebrates.", "Invertebrates are animals with no backbone."),
      o("Order these animals from the fewest legs to the most legs.", ["Earthworm (no legs)", "Ant (6 legs)", "Spider (8 legs)", "Woodlouse (14 legs)"]),
      g("Is each statement about invertebrates true or false?", ["True", "False"], [["A snail has no backbone", 0], ["A beetle is an insect", 0], ["A worm has no legs", 0], ["A spider is an insect", 1], ["Insects have eight legs", 1], ["Worms have a backbone", 1]]),
    ],
    enquiries: [
      f("Leo finds an animal with six legs, three body parts and two antennae. Which group does it belong to?", "Insects", "Spiders", "Worms"),
      f("Maya finds an animal with eight legs and two body parts. Which group does it belong to?", "Spiders", "Insects", "Snails"),
      f("Ellie finds a creature with a long soft body and no legs in the soil. What is it most likely to be?", "A worm", "A beetle", "A snail"),
      f("Leo says a spider is an insect because it is a minibeast. Which fact shows he is wrong?", "A spider has eight legs but insects have six", "Spiders spin webs", "Spiders are small"),
      { ...n("Look at Maya's table. How many minibeasts did she find altogether?", 25), table: woodTable },
      { ...n("Look at Maya's table. How many more ants than spiders did she find?", 8), table: woodTable },
      { ...f("Look at Maya's table. Which minibeast did she find the fewest of?", "Worms", "Ants", "Snails"), table: woodTable },
      n("Leo counts 4 spiders in a shed. How many legs do the 4 spiders have altogether?", 32),
      o("Order Leo's steps to identify a minibeast, starting with the first step.", ["Look closely with a magnifying glass", "Count its legs", "Check for wings and body parts", "Name its group"]),
      s("Build a conclusion about spiders and insects.", "Spiders are not insects because they have eight legs."),
      g("Leo sorts what he saw in the garden into the right group.", ["Insects", "Not insects"], [["Bee", 0], ["Ant", 0], ["Butterfly", 0], ["Spider", 1], ["Snail", 1], ["Earthworm", 1]]),
      g("Ellie looks at her notes. Is each statement an observation or an opinion?", ["Observation", "Opinion"], [["The beetle has six legs", 0], ["The snail has a spiral shell", 0], ["The worm has no legs", 0], ["Beetles are the best minibeast", 1], ["Ants are the cutest", 1], ["Worms are boring", 1]]),
    ],
  },

  "micro-organisms": {
    rule: "Micro-organisms are living things so small that you need a microscope to see them. Bacteria and some fungi, such as yeast and mould, are micro-organisms. Many are helpful, such as the yeast that makes bread rise, but some can make us ill, so we wash our hands.",
    hint: "Think tiny, living and needing a microscope. Then ask whether the example helps us or harms us.",
    facts: [
      f("What do you need to see most micro-organisms?", "A microscope", "A ruler", "A thermometer"),
      f("Which of these is a micro-organism?", "Bacteria", "A daisy", "A spider"),
      f("What does yeast do in bread dough?", "Makes gas that makes the dough rise", "Turns the dough blue", "Makes the dough shrink"),
      f("Which food is made with the help of micro-organisms?", "Yoghurt", "A raw carrot", "An apple"),
      f("What is the fuzzy green or blue growth on old bread?", "Mould", "Sugar", "Flour"),
      f("Why should you wash your hands before eating?", "To remove germs that could make you ill", "To make your hands warmer", "To make food taste sweeter"),
      f("What can some harmful micro-organisms cause?", "Illness, such as a tummy bug", "Growing taller", "Stronger bones"),
      f("How can we slow down food going mouldy?", "Keep it cool, such as in a fridge", "Leave it in a warm, damp place", "Open the bag in the sun"),
      f("Are all micro-organisms harmful?", "No, many are helpful", "Yes, all of them are harmful", "Yes, they all cause illness"),
      f("Which of these micro-organisms is a fungus?", "Yeast", "A bacterium", "A daisy"),
      f("Which of these is made using yeast?", "Bread", "A pencil", "Water"),
      f("What helps micro-organisms such as mould to grow quickly?", "Warmth, moisture and food", "Cold, dry places with no food", "Bright sunlight and metal"),
    ],
    sorts: [
      g("Is each micro-organism helpful or harmful to people?", ["Helpful", "Harmful"], [["Yeast in bread dough", 0], ["Bacteria that make yoghurt", 0], ["Bacteria in the gut that help digestion", 0], ["Bacteria that cause food poisoning", 1], ["Mould on old bread", 1], ["Bacteria that cause tooth decay", 1]]),
      g("Sort each living thing by whether you need a microscope to see it.", ["Need a microscope", "Can see with eyes alone"], [["A bacterium", 0], ["A yeast cell", 0], ["A single mould spore", 0], ["A snail", 1], ["A bee", 1], ["A daisy", 1]]),
      g("Which actions help stop micro-organisms spreading, and which help them spread?", ["Helps stop germs spreading", "Helps germs spread"], [["Washing hands with soap", 0], ["Coughing into a tissue", 0], ["Keeping food in a fridge", 0], ["Leaving food out in the warm", 1], ["Eating with unwashed hands", 1], ["Sneezing without covering your nose", 1]]),
    ],
    structures: [
      s("Build a sentence about micro-organisms.", "Micro-organisms are too small to see."),
      s("Build a sentence about yeast.", "Yeast helps bread dough to rise."),
      s("Build a sentence about handwashing.", "Washing hands removes harmful germs."),
      o("Order what happens when yeast is added to bread dough, starting with the first step.", ["Yeast is mixed with flour and warm water", "The yeast feeds on sugar", "The yeast makes bubbles of gas", "The dough rises"]),
      g("Is each statement about micro-organisms true or false?", ["True", "False"], [["Bacteria are micro-organisms", 0], ["Yeast is a helpful fungus", 0], ["Some micro-organisms can make us ill", 0], ["All micro-organisms are harmful", 1], ["You can see bacteria with your eyes alone", 1], ["Mould is a type of plant", 1]]),
    ],
    enquiries: [
      { ...f("Look at Maya's results. Where did the bread go mouldy fastest?", "On the warm windowsill", "In the fridge", "In the cupboard"), table: mouldTable },
      { ...n("Look at Maya's results. How many more days did the bread in the fridge take to go mouldy than the bread on the warm windowsill?", 9), table: mouldTable },
      { ...f("Look at Maya's results. What pattern do they show?", "The warmer the place, the faster the mould appeared", "The warmer the place, the slower the mould appeared", "The place made no difference"), table: mouldTable },
      f("Leo plans to test how temperature affects mould on bread. Which variable should he keep the same?", "The type and age of the bread", "The temperature", "The number of days until mould appears"),
      f("Ellie says all micro-organisms are germs. Which example shows she is wrong?", "Yeast that makes bread rise", "Bacteria that cause tummy bugs", "Mould on old fruit"),
      f("Leo's dough rises faster in a warm kitchen than in a cold one. What is the best explanation?", "Yeast is more active when it is warm", "Cold dough has no flour in it", "Warm kitchens make yeast bigger"),
      f("Ellie washes her hands after gardening. Why is this a good idea?", "To remove micro-organisms that could make her ill", "To make her hands bigger", "To help the plants grow"),
      f("Maya sees a green fuzzy patch on cheese. What is the safest thing to do?", "Tell a grown-up and do not eat it", "Taste a tiny bit to check", "Scrape it off and eat the rest"),
      o("Order Maya's steps to test where bread goes mouldy fastest, starting with the first step.", ["Put equal slices of bread in three places", "Check each slice every day", "Record the day mould first appears", "Compare the results and write a conclusion"]),
      { ...s("Build a conclusion from Maya's results.", "Bread went mouldy fastest in the warm place."), table: mouldTable },
      { ...g("Leo reviews claims about his bread test. Is each one supported by the results?", ["Supported by the results", "Not supported"], [["Bread in the fridge lasted longest", 0], ["Bread on the windowsill went mouldy first", 0], ["Mould took 6 days to appear in the cupboard", 0], ["Bread in the cupboard lasted longest", 1], ["Mould appeared faster in colder places", 1], ["All the bread went mouldy on the same day", 1]]), table: mouldTable },
      g("Is each micro-organism used to make food, or does it spoil food?", ["Used to make food", "Spoils food"], [["Yeast in bread", 0], ["Bacteria in yoghurt", 0], ["Bacteria in cheese", 0], ["Mould on old bread", 1], ["Bacteria in milk left out", 1], ["Mould on old fruit", 1]]),
    ],
  },

  "classification-keys": {
    rule: "A classification key is a set of yes or no questions that helps you name a living thing. Each question splits a group into smaller groups until only one living thing is left. A good key question is about a feature you can see.",
    hint: "Start at the top question and answer it for your animal. Follow Yes or No until you reach a name.",
    facts: [
      keyed("Use the key to identify an animal with no shell and six legs.", keyMinibeasts, "Ant", ["Spider", "Earthworm"]),
      keyed("Use the key to identify an animal with no shell, which does not have six legs but has eight.", keyMinibeasts, "Spider", ["Snail", "Earthworm"]),
      keyed("Use the key to identify an animal with smooth, moist skin and no fur or feathers.", keyVertebrates, "Frog", ["Lizard", "Salmon"]),
      keyed("Use the key to identify a plant that makes cones and has no flowers.", keyPlants, "Pine tree", ["Daisy", "Fern"]),
      keyed("Use the key to identify a plant that has flowers.", keyPlants, "Daisy", ["Moss", "Fern"]),
      f("What is a classification key?", "A set of yes or no questions used to identify living things", "A tool for opening a laboratory", "A list of animals in alphabetical order"),
      f("How many answers does each question in a key have?", "Two: yes or no", "Three", "As many as you like"),
      f("Which question would work well in a key?", "Does it have wings?", "Is it pretty?", "Do I like it?"),
      f("Why is 'Is it nice?' a poor key question?", "People may answer differently, because it is an opinion", "It has too many letters", "It asks about the number of legs"),
      keyed("Use the key to identify an animal with a shell on its back and no long body made of rings.", keyGarden, "Snail", ["Woodlouse", "Earthworm"]),
      keyed("Use the key to identify an animal with fourteen legs, no shell, and no long body made of rings.", keyGarden, "Woodlouse", ["Bee", "Spider"]),
      keyed("Use the key to identify an animal with gills and scales, and no feathers or fur.", keyVertebrates, "Salmon", ["Lizard", "Frog"]),
    ],
    sorts: [
      g("Which of these are good key questions, and which are poor ones?", ["Good key question", "Poor key question"], [["Does it have wings?", 0], ["Does it have six legs?", 0], ["Is its skin covered in fur?", 0], ["Is it beautiful?", 1], ["Is it a nice animal?", 1], ["Would I like it as a pet?", 1]]),
      g("Answer the key question 'Does it have six legs?' for each animal.", ["Yes", "No"], [["Ant", 0], ["Bee", 0], ["Beetle", 0], ["Spider", 1], ["Snail", 1], ["Earthworm", 1]]),
      g("Answer the key question 'Does it have feathers?' for each animal.", ["Yes", "No"], [["Robin", 0], ["Owl", 0], ["Penguin", 0], ["Fox", 1], ["Frog", 1], ["Salmon", 1]]),
    ],
    structures: [
      s("Build a sentence about keys.", "A key asks yes or no questions."),
      s("Build a sentence about key questions.", "Each question splits a group in two."),
      s("Build a sentence about features.", "Good key questions are about observable features."),
      o("Order the steps to make a classification key, starting with the first step.", ["Collect the living things you want to sort", "List features you can see on each one", "Write a yes or no question about one feature", "Test the key by naming each living thing"]),
      { ...g("Look at this key. Which animals can it name, and which can it not name?", ["Can be named by this key", "Cannot be named by this key"], [["Snail", 0], ["Ant", 0], ["Earthworm", 0], ["Robin", 1], ["Fox", 1], ["Frog", 1]]), visual: keyMinibeasts },
    ],
    enquiries: [
      keyed("Leo finds a minibeast with no shell, eight legs and two body parts. Use the key. What is it?", keyMinibeasts, "Spider", ["Ant", "Snail"]),
      keyed("Maya finds an animal covered in fur with no feathers. Use the key. What is it?", keyVertebrates, "Fox", ["Robin", "Lizard"]),
      { ...n("Look at the key. How many different animals can it identify?", 5), visual: keyVertebrates },
      keyed("Ellie finds a green plant with no flowers and no cones. It has large feathery fronds. Use the key. What is it?", keyPlants, "Fern", ["Moss", "Daisy"]),
      { ...n("A plant gets the answer No to every question in this key. How many questions does Maya answer before she reaches its name?", 3), visual: keyPlants },
      keyed("Leo answers No to all four questions in this key. Which animal does he identify?", keyGarden, "Spider", ["Bee", "Woodlouse"]),
      f("Maya wants to add a slug to her key. Which question could tell a slug apart from a snail?", "Does it have a shell?", "Does it have a backbone?", "Does it live in the garden?"),
      f("Ellie's key has the question 'Is it small?' What is wrong with it?", "Small is not exact, so people may disagree", "It has too many words", "It has too few words"),
      o("Order Leo's steps to use a key to identify an animal, starting with the first step.", ["Look closely at the animal", "Read the first question and answer it", "Follow the yes or no route", "Stop when you reach a name"]),
      s("Maya writes what a key is for.", "A key helps us name living things."),
      g("Ellie tests her key with the question 'Does it have wings?' Sort each animal by its answer.", ["Yes", "No"], [["Bee", 0], ["Butterfly", 0], ["Robin", 0], ["Spider", 1], ["Snail", 1], ["Earthworm", 1]]),
      g("Leo checks his key questions. Which ones ask about a feature you can observe?", ["Can observe", "Cannot observe"], [["Does it have gills?", 0], ["Does it have a backbone?", 0], ["Does it have wings?", 0], ["Does it feel brave?", 1], ["Does it dream?", 1], ["Is it ten years old?", 1]]),
    ],
  },
};

// Topic pictures set the scene only. None names a group or shows the answer to a level 1 question.
export const livingVisuals = {
  "classifying-living-things": scene("meadow", "A meadow with a tree, flowers, a bee, a rabbit and a bird.", [["🌳", 70, 130, 80], ["🌼", 150, 160, 54], ["🐝", 210, 90, 44], ["🐇", 275, 160, 60], ["🐦", 340, 100, 46]]),
  "vertebrate-groups": scene("pond", "A pond with a fish, a frog, a duck and a dog beside it.", [["🐟", 90, 160, 54], ["🐸", 165, 150, 56], ["🦆", 245, 140, 60], ["🐕", 335, 150, 62]]),
  "invertebrate-groups": scene("meadow", "A meadow with a caterpillar, a snail, a spider and a bee.", [["🐛", 90, 165, 52], ["🐌", 170, 170, 52], ["🕷️", 250, 120, 52], ["🐝", 330, 90, 52]]),
  "micro-organisms": scene("lab", "A scientist in a laboratory with a dish and a notebook.", [["🧑‍🔬", 120, 130, 80], ["🧫", 235, 145, 62], ["📓", 330, 150, 52]]),
  "classification-keys": scene("meadow", "A clipboard beside a caterpillar, a snail and a bee in a garden.", [["📋", 80, 140, 70], ["🐛", 170, 165, 50], ["🐌", 245, 170, 50], ["🐝", 330, 100, 50]]),
};

// Question rules draw only what the question says. They never show or label an answer.
export const livingRules = {
  "classifying-living-things": [
    rule(/^Maya finds a creature in the garden/, scene("meadow", "A garden with a magnifying glass lying on the grass.", [["🔍", 200, 140, 84], ["🌿", 90, 165, 52], ["🌿", 320, 165, 52]]), [4]),
    rule(/^Ellie finds something on the pond/, scene("pond", "A pond with a magnifying glass beside it.", [["🔍", 200, 140, 84], ["🌿", 320, 170, 50]]), [4]),
  ],
  "vertebrate-groups": [
    rule(/^Leo finds an animal with a backbone, feathers and a beak/, scene("meadow", "A magnifying glass on a meadow beside a tree.", [["🔍", 140, 140, 80], ["🌳", 290, 125, 90]]), [4]),
  ],
  "invertebrate-groups": [
    rule(/^Ellie finds a creature with a long soft body/, scene("meadow", "A magnifying glass over some soil in a garden.", [["🔍", 150, 140, 80], ["🌱", 290, 160, 60]]), [4]),
  ],
  "micro-organisms": [
    rule(/^Maya sees a green fuzzy patch on cheese/, scene("room", "A block of cheese on a kitchen table.", [["🧀", 200, 140, 90]]), [4]),
    rule(/^Leo's dough rises faster in a warm kitchen/, scene("room", "A loaf of bread in a warm kitchen.", [["🍞", 160, 140, 80], ["☀️", 300, 90, 56]]), [4]),
  ],
};
