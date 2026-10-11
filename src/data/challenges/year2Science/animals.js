import { buildTopic, c, sorter, spell, typed } from "../year1Science/engine.js";
import { extremeChart } from "./charts.js";

// Year 2 Animals, including humans (docs/curriculum/year-2-science.md). The
// guidance asks for growth, not how reproduction happens, so offspring are
// named and ordered but never explained. Health facts follow NHS advice for
// children: an hour or more of activity a day, five portions of fruit and
// vegetables, teeth brushed twice a day for two minutes, hands washed with soap.

/* ---------- Animals and Their Offspring ---------- */

const YOUNG_RULE = "Offspring are the young of an animal. Many baby animals have their own names.";
const young = (adult, answer, wrong, extra = {}) => c(`What is a baby ${adult} called?`, answer, wrong, { rule: YOUNG_RULE, ...extra });

const youngNames = [
  young("cat", "kitten", ["puppy", "foal", "calf"], { picture: "🐈", pictureLabel: "a cat" }),
  young("dog", "puppy", ["kitten", "lamb", "calf"], { picture: "🐕", pictureLabel: "a dog" }),
  young("sheep", "lamb", ["foal", "kitten", "chick"], { picture: "🐑", pictureLabel: "a sheep" }),
  young("cow", "calf", ["lamb", "puppy", "duckling"], { picture: "🐄", pictureLabel: "a cow" }),
  young("horse", "foal", ["calf", "kitten", "chick"], { picture: "🐎", pictureLabel: "a horse" }),
  young("duck", "duckling", ["kitten", "foal", "piglet"], { picture: "🦆", pictureLabel: "a duck" }),
  young("pig", "piglet", ["lamb", "duckling", "foal"], { picture: "🐖", pictureLabel: "a pig" }),
  young("hen", "chick", ["calf", "puppy", "lamb"], { picture: "🐔", pictureLabel: "a hen" }),
  young("frog", "tadpole", ["chick", "kitten", "calf"], { picture: "🐸", pictureLabel: "a frog" }),
  young("kangaroo", "joey", ["kitten", "foal", "lamb"], { picture: "🦘", pictureLabel: "a kangaroo" }),
  young("lion", "cub", ["foal", "lamb", "chick"], { picture: "🦁", pictureLabel: "a lion" }),
];

const youngReverse = [
  c("A lamb grows into a ___.", "sheep", ["cow", "horse", "goat"], { rule: YOUNG_RULE }),
  c("A foal grows into a ___.", "horse", ["cow", "sheep", "dog"]),
  c("A kitten grows into a ___.", "cat", ["dog", "horse", "duck"]),
  c("A duckling grows into a ___.", "duck", ["hen", "swan", "owl"]),
  c("A calf grows into a ___.", "cow", ["horse", "sheep", "pig"]),
  c("A piglet grows into a ___.", "pig", ["sheep", "cow", "dog"]),
  c("What does the word 'offspring' mean?", "the young of an animal", ["a kind of food", "a place where animals live"]),
];

const youngSorts = [
  sorter("Sort them: baby animal or adult animal?", [["baby", "Baby"], ["adult", "Adult"]], [
    ["kitten", "baby"], ["lamb", "baby"], ["foal", "baby"], ["calf", "baby"], ["piglet", "baby"],
    ["cat", "adult"], ["sheep", "adult"], ["horse", "adult"], ["cow", "adult"], ["pig", "adult"],
  ], { rule: YOUNG_RULE }),
  sorter("Whose baby is it?", [["cat", "Cat"], ["dog", "Dog"], ["sheep", "Sheep"]], [
    ["kitten", "cat"], ["puppy", "dog"], ["lamb", "sheep"],
  ], { take: 3 }),
  sorter("Whose baby is it?", [["cow", "Cow"], ["horse", "Horse"], ["duck", "Duck"]], [
    ["calf", "cow"], ["foal", "horse"], ["duckling", "duck"],
  ], { take: 3 }),
  sorter("Whose baby is it?", [["pig", "Pig"], ["hen", "Hen"], ["kangaroo", "Kangaroo"]], [
    ["piglet", "pig"], ["chick", "hen"], ["joey", "kangaroo"],
  ], { take: 3 }),
  sorter("Whose baby is it?", [["frog", "Frog"], ["lion", "Lion"], ["goat", "Goat"]], [
    ["tadpole", "frog"], ["cub", "lion"], ["kid", "goat"],
  ], { take: 3 }),
];

const youngSpell = [
  spell("lamb", "🐑", "a sheep", "A baby sheep is called a ___. Make the word."),
  spell("calf", "🐄", "a cow", "A baby cow is called a ___. Make the word."),
  spell("foal", "🐎", "a horse", "A baby horse is called a ___. Make the word."),
  spell("kitten", "🐈", "a cat", "A baby cat is called a ___. Make the word."),
  spell("piglet", "🐖", "a pig", "A baby pig is called a ___. Make the word."),
  spell("puppy", "🐕", "a dog", "A baby dog is called a ___. Make the word."),
];

const youngApply = [
  c("In spring, Bix sees a sheep with two small woolly babies in a field. What are the babies called?", "lambs", ["calves", "foals", "kittens"]),
  c("Bix's dog has had puppies. What will the puppies grow into?", "dogs", ["cats", "foxes", "wolves"]),
  c("Bix sees small black wriggly animals with tails in a pond. They will grow into frogs. What are they?", "tadpoles", ["ducklings", "fish", "worms"]),
  c("A joey lives in its mother's pouch. Which animal is its mother?", "a kangaroo", ["a horse", "a cow", "a duck"]),
  c("Do humans have offspring too?", "Yes, human babies grow into adults.", ["No, only farm animals do.", "No, humans never grow."]),
];

const youngTyped = [
  typed("A baby hen is called a ___. Type the missing word.", "chick"),
  typed("A baby lion is called a ___. Type the missing word.", "cub"),
  typed("A baby kangaroo is called a ___. Type the missing word.", "joey"),
];

/* ---------- Growing into Adults ---------- */

const ADULT_RULE = "Animals, including humans, grow and change until they are adults.";
const cycle = (prompt, labels, extra = {}) => ({ type: "order", prompt, labels, rule: ADULT_RULE, ...extra });

const adultOrders = [
  cycle("Put the chicken's life in order.", ["egg", "chick", "adult chicken"]),
  cycle("Put the butterfly's life in order.", ["egg", "caterpillar", "pupa", "butterfly"], { hint: "A pupa is also called a chrysalis." }),
  cycle("Put the frog's life in order.", ["frogspawn", "tadpole", "tadpole with legs", "frog"]),
  cycle("Put a human's life in order.", ["baby", "toddler", "child", "teenager", "adult"]),
  cycle("Put the sheep's life in order.", ["a lamb is born", "the lamb grows bigger", "it is now an adult sheep"]),
];

const adultNext = [
  c("A caterpillar grows. What does it turn into next?", "a pupa", ["an egg", "a tadpole", "a chick"], { rule: ADULT_RULE, hint: "It is also called a chrysalis." }),
  c("What hatches from frogspawn?", "tadpoles", ["caterpillars", "chicks", "ducklings"]),
  c("What hatches from a hen's egg?", "a chick", ["a calf", "a tadpole", "a caterpillar"]),
  c("What comes out of a pupa?", "a butterfly", ["a caterpillar", "a tadpole", "a frog"]),
  c("A tadpole grows legs. What does it become in the end?", "a frog", ["a fish", "a butterfly", "a duck"]),
  c("Which stage comes between toddler and teenager?", "child", ["baby", "adult"], { rule: ADULT_RULE }),
  c("A chick hatches from a hen's egg. What does it grow into?", "an adult chicken", ["a frog", "a cow", "a butterfly"]),
];

const adultFacts = [
  c("How do children change as they grow into adults?", "They get taller and bigger.", ["They get smaller.", "They grow feathers."]),
  c("Does a caterpillar look like the butterfly it grows into?", "No, it changes a lot.", ["Yes, it looks the same."]),
  c("Does a kitten look like the cat it grows into?", "Yes, but it is smaller.", ["No, it looks like a fish."]),
  c("Which animal changes the most as it grows up?", "a frog", ["a cat", "a dog", "a horse"], { hint: "Think about which baby looks nothing like its parent." }),
  c("A baby is tiny and is carried. A toddler is starting to explore. Which comes first?", "baby", ["toddler", "teenager"]),
];

const adultSorts = [
  sorter("Sort them: young or grown-up?", [["young", "Young"], ["adult", "Grown-up"]], [
    ["tadpole", "young"], ["caterpillar", "young"], ["chick", "young"], ["toddler", "young"],
    ["frog", "adult"], ["butterfly", "adult"], ["chicken", "adult"], ["grandad", "adult"],
  ], { rule: ADULT_RULE }),
];

const adultSpell = [
  spell("pupa", undefined, undefined, "A caterpillar turns into a ___ before it becomes a butterfly. Make the word."),
  spell("adult", undefined, undefined, "A teenager grows into an ___. Make the word."),
  spell("tadpole", "🐸", "a frog", "A baby frog is called a ___. Make the word."),
];

const adultNumber = (a, b, what) => ({
  type: "number", prompt: `A ${what} was ${a} cm tall. One year later it was ${b} cm tall. How many centimetres did it grow?`, answer: b - a,
  hint: `Count on from ${a} to ${b}.`,
});
const adultApply = [
  c("Bix finds tiny eggs on a cabbage leaf. Later, small caterpillars eat the leaf. What will the caterpillars become?", "butterflies", ["frogs", "birds", "bees"]),
  c("Bix's little cousin is two and has just started to walk and talk. What stage is the cousin at?", "toddler", ["teenager", "adult"]),
  c("Bix sees frogspawn in March. What will Bix see in the pond a few weeks later?", "tadpoles", ["butterflies", "chicks", "kittens"]),
  adultNumber(100, 106, "child"),
  adultNumber(30, 42, "puppy"),
];

const adultTyped = [
  typed("A chicken's life: egg, ___, adult chicken. Type the missing word.", "chick"),
  typed("A frog's life: frogspawn, ___, frog. Type the missing word.", "tadpole"),
  typed("A human's life: baby, toddler, child, teenager, ___. Type the missing word.", "adult"),
];

/* ---------- What Animals Need to Survive ---------- */

const SURVIVE_RULE = "All animals, including humans, need water, food and air to survive.";

const surviveFacts = [
  c("What do all animals need to survive?", "water, food and air", ["toys, books and games", "sunglasses, hats and shoes"]),
  c("Which of these does a dog need to survive?", "water", ["a ball", "a collar", "a TV"]),
  c("Which of these do you need to survive?", "air to breathe", ["a games console", "a bike", "a teddy"], { rule: SURVIVE_RULE }),
  c("A fish lives under water. Does it need air?", "Yes. Its gills take in the air that is in the water.", ["No, fish do not need air.", "No, fish only need food."]),
  c("How does a whale get the air it needs?", "It swims up to breathe at the surface.", ["It does not need air.", "It eats air."]),
  c("Why do animals need food?", "to grow and have energy", ["to stay clean", "to keep dry"]),
  c("Which of these is food for a rabbit?", "grass and plants", ["stones", "plastic", "sand"]),
];

const surviveSorts = [
  sorter("Sort them: needed to survive, or not needed?", [["need", "Needed to survive"], ["want", "Not needed"]], [
    ["water", "need"], ["food", "need"], ["air", "need"],
    ["toys", "want"], ["a party hat", "want"], ["a TV", "want"], ["a bike", "want"], ["a phone", "want"],
  ], { rule: SURVIVE_RULE }),
];

const surviveSpell = [
  { ...spell("air", undefined, undefined, "We breathe this. Make the word."), rule: SURVIVE_RULE },
  spell("gills", "🐟", "a fish", "Fish use these to take in air from the water. Make the word."),
  spell("drink", undefined, undefined, "Animals need to ___ water every day. Make the word."),
  { ...spell("food", undefined, undefined, "Animals eat this to grow and have energy. Make the word."), rule: SURVIVE_RULE },
  { ...spell("water", "💧", "a drop of water", "All animals need to drink this. Make the word."), rule: SURVIVE_RULE },
];

const survivePets = [
  c("Bix looks after a goldfish. What must Bix give it?", "clean water and fish food", ["a blanket and a pillow", "toys and sweets"]),
  c("Bix's hamster lives in a cage. Why must the cage have holes in it?", "so air can get in", ["so the hamster can see the TV", "so the food falls out"]),
  c("Bix is going on holiday. What must the pet rabbit still get every day?", "food and fresh water", ["a bath and a haircut", "new toys"]),
  c("A bird feeder helps birds in winter. Which need does it give them?", "food", ["air", "toys"]),
  c("Bix fills a dish on a hot day so garden birds can drink. Which need does it give them?", "water", ["food", "toys"]),
];

const surviveApply = [
  c("A cat has food and air, but its water bowl is empty. What does it need?", "water", ["a toy", "a collar"]),
  c("Why do divers carry tanks of air when they swim deep under the sea?", "They need air to breathe.", ["To make bubbles for fun.", "To keep warm."]),
  c("Bix says, 'A plant needs water, and so do animals.' Is Bix right?", "Yes", ["No", "Only on hot days"]),
  c("A camel can go a long time without drinking. Does it still need water to survive?", "Yes, all animals need water.", ["No, camels never need water.", "No, camels drink sand."]),
];

const surviveTyped = [
  typed("Animals need water, food and ___ to survive. Type the missing word.", "air"),
  typed("Animals need air, food and ___ to survive. Type the missing word.", "water"),
  typed("Fish use their ___ to take in air from the water. Type the missing word.", "gills"),
];

/* ---------- Exercise ---------- */

const EXERCISE_RULE = "Exercise keeps your heart, muscles and bones strong and healthy. Children need to be active for an hour or more every day.";

const exerciseFacts = [
  c("What happens to your heart when you exercise?", "It beats faster.", ["It stays the same.", "It beats slower."]),
  c("What happens to your breathing when you exercise?", "You breathe faster.", ["Your breathing stays the same.", "You breathe slower."]),
  c("Why is exercise good for you?", "It makes your heart and muscles stronger.", ["It makes your hair grow faster.", "It turns your teeth white."]),
  c("How long should children be active every day?", "an hour or more", ["five minutes", "no time at all"]),
  c("What else can exercise help you to do?", "sleep well and feel happy", ["stay awake all night", "never need to eat"]),
  c("How might you feel after a long race?", "hot and sweaty", ["cold and shivery", "exactly the same"]),
  c("What is the best drink after exercise?", "water", ["cola", "lemonade", "a milkshake"]),
];

const exerciseSorts = [
  sorter("Sort them: exercise or not exercise?", [["yes", "Exercise"], ["no", "Not exercise"]], [
    ["running", "yes"], ["swimming", "yes"], ["skipping", "yes"], ["riding a bike", "yes"], ["dancing", "yes"], ["playing football", "yes"], ["playing wheelchair basketball", "yes"], ["walking the dog", "yes"],
    ["watching TV", "no"], ["sleeping", "no"], ["reading on the sofa", "no"], ["sitting still", "no"],
  ], { rule: EXERCISE_RULE }),
];

const exerciseOrder = [
  { type: "order", prompt: "Put Bix's PE lesson in order.", labels: ["warm up gently", "play the game", "cool down slowly"] },
  { type: "order", prompt: "Put Bix's bike ride in order.", labels: ["put on a helmet", "ride to the park", "ride home slowly", "put the bike away"] },
  { type: "order", prompt: "Put the changes in order as Bix starts to run.", labels: ["Bix is sitting still", "Bix starts running", "Bix's heart beats faster", "Bix stops and has a drink of water"] },
];

const exerciseSpell = [
  spell("heart", "❤️", "a heart", "Exercise makes this part of your body stronger. It beats in your chest. Make the word."),
  spell("skip", undefined, undefined, "You can jump over a rope again and again. This is called a ___. Make the word."),
  spell("swim", "🏊", "someone in water", "This exercise happens in a pool. Make the word."),
  spell("run", "🏃", "someone moving fast", "When you ___, you move fast on your feet. Make the word."),
];

// Bix's own counts of breaths in one minute after each activity. Values are
// distinct; the axis counts in 10s so the chart fits.
const BREATH_SETS = [
  [["sitting still", 20], ["walking", 26], ["skipping", 38], ["running", 45]],
  [["reading", 18], ["walking", 24], ["dancing", 34], ["running", 42]],
];
const breathChart = (op) => extremeChart({ sets: BREATH_SETS, unit: "breaths", step: 10, op,
  prompt: (word) => `Bix counted breaths in one minute after each activity. After which activity did Bix breathe the ${word} times?` });

const exerciseApply = [
  c("Bix played inside on a screen all day. What would be a healthy change tomorrow?", "play outside and run around", ["stay on the screen longer", "watch two more films"]),
  c("After a race, Bix's heart is beating fast. What is happening?", "Bix's heart is working harder to help Bix run.", ["Bix is cold.", "Bix is asleep."]),
  c("Which day is the most active?", "walking to school, then football after school", ["going to school by car, then TV all evening", "staying in bed all day"]),
  c("Bix feels hot and sweaty after dancing. What should Bix do?", "have a drink of water", ["put on a thick coat", "run even faster"]),
];

const exerciseTyped = [
  typed("When you exercise, your ___ beats faster. Type the missing word.", "heart"),
  typed("After exercise, plain ___ is the best drink. Type the missing word.", "water"),
  typed("Children should be active for an ___ or more every day. Type the missing word.", "hour"),
];

/* ---------- Healthy Eating ---------- */

const EAT_RULE = "Eat lots of fruit and vegetables. Bread, rice and pasta give you energy. Sweets, cakes and crisps are for small amounts now and then.";

const eatFacts = [
  c("Which food should we eat lots of?", "fruit and vegetables", ["sweets", "cakes", "crisps"]),
  c("Which food gives you energy for running and playing?", "pasta", ["water", "salt", "a lollipop stick"]),
  c("Milk and cheese help to keep your ___ strong.", "bones and teeth", ["hair and nails", "clothes and shoes"]),
  c("Which drink has no sugar and is best when you are thirsty?", "water", ["cola", "lemonade"]),
  c("Beans, eggs and fish help your body to ___.", "grow and mend", ["stay up late", "turn green"]),
  c("Why should we eat only a little sugary food?", "Too much sugar can harm your teeth.", ["Sugar makes you invisible.", "Sugary food has no taste."]),
  c("Which is a vegetable?", "carrot", ["apple", "cheese", "bread"]),
  c("Which is a fruit?", "banana", ["carrot", "pasta", "egg"]),
];

const eatSorts = [
  sorter("Sort the foods: eat lots, or only a little now and then?", [["lots", "Eat lots"], ["little", "Only a little"]], [
    ["apple", "lots"], ["carrot", "lots"], ["banana", "lots"], ["broccoli", "lots"], ["peas", "lots"],
    ["sweets", "little"], ["cake", "little"], ["biscuits", "little"], ["fizzy drink", "little"], ["crisps", "little"],
  ], { rule: EAT_RULE }),
  sorter("Sort the foods into groups.", [["fruitveg", "Fruit and vegetables"], ["starchy", "Bread, rice and pasta"], ["dairy", "Milk and cheese"]], [
    ["apple", "fruitveg"], ["carrot", "fruitveg"], ["pear", "fruitveg"], ["rice", "starchy"], ["toast", "starchy"], ["spaghetti", "starchy"],
    ["yoghurt", "dairy"], ["cheese", "dairy"],
  ]),
  sorter("Sort the foods into groups.", [["fruitveg", "Fruit and vegetables"], ["protein", "Beans, eggs and fish"], ["dairy", "Milk and cheese"]], [
    ["banana", "fruitveg"], ["peas", "fruitveg"], ["beans", "protein"], ["eggs", "protein"], ["fish", "protein"], ["lentils", "protein"],
    ["milk", "dairy"], ["yoghurt", "dairy"],
  ]),
];

const eatLunch = [
  c("Which lunchbox is the healthiest?", "a cheese sandwich, an apple and water", ["crisps, chocolate and cola", "three biscuits and a fizzy drink"], { rule: EAT_RULE }),
  c("Which dinner has the most vegetables?", "fish with peas, carrots and rice", ["a burger with chips", "a pizza with cheese"]),
  c("Which snack is best for every day?", "a banana", ["a chocolate bar", "a bag of sweets"]),
  c("Which is the healthiest breakfast?", "porridge with fruit", ["a can of cola", "a bag of sweets"]),
  c("Which is a treat for now and then?", "a slice of birthday cake", ["an apple", "a glass of water"]),
];

const fiveADay = { type: "number", prompt: "How many portions of fruit and vegetables should we try to eat every day?", answer: 5, hint: "It is the number after 4.", rule: EAT_RULE };
const portionCount = (fruit, veg) => ({ type: "number", prompt: `Bix ate ${fruit} portions of fruit and ${veg} portions of vegetables today. How many portions is that in total?`, answer: fruit + veg, hint: `Add ${fruit} and ${veg}.` });

const eatSpell = [
  spell("apple", "🍎", "a red fruit", "This crunchy fruit can be red or green. Make the word."),
  spell("water", "💧", "a drop of water", "Plain ___ has no sugar and is the best drink when you are thirsty. Make the word."),
  spell("bread", "🍞", "a loaf", "Toast is made from this. Make the word."),
  spell("banana", "🍌", "a yellow fruit", "This long yellow fruit has a skin you peel. Make the word."),
  spell("carrot", "🥕", "an orange vegetable", "This orange vegetable grows under the ground. Make the word."),
];

const eatApply = [
  c("Bix has had 3 portions of fruit and vegetables today. Which snack would add one more?", "carrot sticks", ["crisps", "a biscuit"]),
  c("Bix had cake at a party. What is a good choice for tea?", "pasta with vegetables", ["more cake", "sweets"]),
  c("Bix wants a snack that helps make strong bones and teeth. Which is best?", "a yoghurt", ["a lollipop", "a fizzy drink"]),
  c("Bix's plate has pasta and cheese. What could Bix add to make it more balanced?", "some vegetables", ["some sweets", "a fizzy drink"]),
];

const eatTyped = [
  typed("Plain ___ has no sugar and is the best drink when you are thirsty. Type the missing word.", "water"),
  fiveADay,
  portionCount(2, 3),
  portionCount(1, 3),
];

/* ---------- Hygiene ---------- */

const HYGIENE_RULE = "Hygiene means keeping clean. It stops germs spreading and keeps us healthy.";

const hygieneFacts = [
  c("When should you wash your hands?", "before you eat", ["only on your birthday", "never"], { rule: HYGIENE_RULE }),
  c("What should you use to wash your hands?", "soap and water", ["just a towel", "mud"]),
  c("What are germs?", "tiny living things that can make us ill", ["big animals", "a kind of sweet"], { rule: HYGIENE_RULE }),
  c("Can you see germs with just your eyes?", "No, they are too small.", ["Yes, they are big and green."]),
  c("How often should you brush your teeth?", "twice a day", ["once a week", "never"]),
  c("What should you do when you sneeze?", "Catch it in a tissue and put it in the bin.", ["Sneeze on your friend.", "Sneeze into your hands and touch the food."]),
  c("When should you always wash your hands?", "after using the toilet", ["after brushing your hair", "after putting on socks"]),
  c("Why should you wash your hands after stroking a pet?", "Pets can carry germs.", ["Pets are dirty all over.", "It makes the pet happy."]),
];

const hygieneSorts = [
  sorter("Sort them: stops germs or spreads germs?", [["stop", "Stops germs"], ["spread", "Spreads germs"]], [
    ["washing hands with soap", "stop"], ["sneezing into a tissue", "stop"], ["brushing your teeth", "stop"], ["having a bath", "stop"],
    ["sneezing into your hands, then touching food", "spread"], ["sharing a toothbrush", "spread"], ["not washing hands after the toilet", "spread"], ["licking fingers, then sharing snacks", "spread"],
  ], { rule: HYGIENE_RULE }),
];

const hygieneOrder = [
  { type: "order", prompt: "Put the steps for washing your hands in order.", labels: ["wet your hands", "add soap", "rub all over for 20 seconds", "rinse off the soap", "dry your hands"] },
  { type: "order", prompt: "Put Bix's tooth brushing in order.", labels: ["put toothpaste on the brush", "brush every tooth for two minutes", "spit out the toothpaste", "rinse the toothbrush"] },
  { type: "order", prompt: "Put what to do when you sneeze in order.", labels: ["catch the sneeze in a tissue", "put the tissue in the bin", "wash your hands"] },
];

const hygieneSpell = [
  { ...spell("soap", "🧼", "a bar of soap", "Wash your hands with ___ and water. Make the word."), rule: HYGIENE_RULE },
  spell("germs", undefined, undefined, "Tiny living things that can make us ill are called ___. Make the word."),
  spell("tissue", undefined, undefined, "Catch a sneeze in a ___. Make the word."),
  spell("teeth", "🪥", "a toothbrush", "Brush your ___ twice a day. Make the word."),
];

const hygieneNumbers = [
  { type: "number", prompt: "How many times a day should you brush your teeth?", answer: 2, hint: "Once in the morning and once before bed." },
  { type: "number", prompt: "For how many minutes should you brush your teeth each time?", answer: 2, hint: "It is more than 1 and less than 3." },
  { type: "number", prompt: "You should rub your hands with soap for at least how many seconds?", answer: 20, hint: "It is about as long as singing 'Happy Birthday' twice." },
];

const hygieneApply = [
  c("Bix has been playing in the garden and is about to eat lunch. What should Bix do first?", "wash hands with soap", ["eat straight away", "wipe hands on a jumper"]),
  c("Bix's friend has a cold and sneezes. What is the best thing for them to do?", "use a tissue, bin it, then wash their hands", ["sneeze into their hands and hold yours", "wipe their nose on a sleeve"]),
  c("Why should you not share a toothbrush?", "It can pass germs from one person to another.", ["It makes the toothbrush taste funny.", "There is nothing wrong with it."]),
  c("Bix has been helping to feed the chickens. What should Bix do next?", "wash hands with soap and water", ["lick the spoon", "have a snack straight away"]),
];

const hygieneTyped = [
  typed("Tiny living things that can make us ill are called ___. Type the missing word.", "germs"),
  typed("Wash your hands with soap and ___. Type the missing word.", "water"),
  typed("You should brush your ___ twice a day. Type the missing word.", "teeth"),
];

export const animalBuilders = {
  "animals-and-their-offspring": buildTopic({
    banks: { names: youngNames, reverse: youngReverse, sorts: youngSorts, spell: youngSpell, apply: youngApply, typed: youngTyped },
    levels: {
      1: ["names", "names", "names", "names", "names"],
      2: ["sorts", "reverse", "reverse", "sorts", "reverse"],
      3: ["spell", "sorts", "spell", "names", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "growing-into-adults": buildTopic({
    banks: { next: adultNext, facts: adultFacts, sorts: adultSorts, orders: adultOrders, spell: adultSpell, apply: adultApply, typed: adultTyped },
    levels: {
      1: ["next", "next", "next", "next", "next"],
      2: ["sorts", "facts", "facts", "next", "facts"],
      3: ["orders", "spell", "orders", "spell", "orders"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "what-animals-need-to-survive": buildTopic({
    banks: { facts: surviveFacts, sorts: surviveSorts, pets: survivePets, spell: surviveSpell, apply: surviveApply, typed: surviveTyped },
    levels: {
      1: ["facts", "facts", "facts", "facts", "facts"],
      2: ["sorts", "pets", "pets", "facts", "pets"],
      3: ["spell", "pets", "spell", "facts", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  exercise: buildTopic({
    banks: { facts: exerciseFacts, sorts: exerciseSorts, order: exerciseOrder, spell: exerciseSpell, charts: [breathChart("most"), breathChart("least")], apply: exerciseApply, typed: exerciseTyped },
    levels: {
      1: ["facts", "facts", "facts", "facts", "facts"],
      2: ["sorts", "facts", "charts", "facts", "charts"],
      3: ["order", "spell", "order", "spell", "facts"],
      4: ["apply", "typed", "charts", "apply", "typed"],
    },
  }),
  "healthy-eating": buildTopic({
    banks: { facts: eatFacts, sorts: eatSorts, lunch: eatLunch, spell: eatSpell, apply: eatApply, typed: eatTyped },
    levels: {
      1: ["facts", "facts", "facts", "facts", "facts"],
      2: ["sorts", "facts", "lunch", "sorts", "lunch"],
      3: ["spell", "lunch", "spell", "lunch", "spell"],
      4: ["apply", "typed", "apply", "lunch", "typed"],
    },
  }),
  hygiene: buildTopic({
    banks: { facts: hygieneFacts, sorts: hygieneSorts, order: hygieneOrder, spell: hygieneSpell, numbers: hygieneNumbers, apply: hygieneApply, typed: hygieneTyped },
    levels: {
      1: ["facts", "facts", "facts", "facts", "facts"],
      2: ["sorts", "facts", "numbers", "facts", "numbers"],
      3: ["order", "spell", "order", "spell", "facts"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
};
