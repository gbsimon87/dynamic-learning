import { buildTopic, c, sorter, spell, typed } from "../year1Science/engine.js";

// Year 2 Uses of everyday materials (docs/curriculum/year-2-science.md). The
// statutory list is wood, metal, plastic, glass, brick, rock, paper and
// cardboard; the guidance supplies the examples (coins, cans, cars, table
// legs; matches, floors, telegraph poles; spoons not normally of glass) and
// the inventors John Dunlop, Charles Macintosh and John McAdam.

/* ---------- Materials and Their Uses ---------- */

const USE_RULE = "One material can be used for lots of things. The same thing can be made from different materials.";

const useNames = [
  c("What is the see-through part of a window made of?", "glass", ["wood", "brick", "cardboard"], { picture: "🪟", pictureLabel: "a window" }),
  c("What are coins made of?", "metal", ["paper", "glass", "wood"], { picture: "🪙", pictureLabel: "a coin" }),
  c("What are most cereal boxes made of?", "cardboard", ["glass", "metal", "rock"], { picture: "📦", pictureLabel: "a box" }),
  c("Many houses in the UK are built from ___.", "brick", ["paper", "glass", "cardboard"], { picture: "🏠", pictureLabel: "a house" }),
  c("What are matches made of?", "wood", ["glass", "rock", "metal"]),
  c("What are the pages of a book made of?", "paper", ["glass", "brick", "metal"], { picture: "📖", pictureLabel: "an open book" }),
  c("What are tins and drinks cans made of?", "metal", ["paper", "brick", "wood"], { picture: "🥫", pictureLabel: "a tin" }),
  c("What are telegraph poles made of?", "wood", ["glass", "paper", "cardboard"]),
  c("Bix's garden has a wall made of big stones dug from the ground. Which material is it made of?", "rock", ["paper", "glass", "cardboard"]),
  c("What is a bucket and spade for the beach usually made of?", "plastic", ["glass", "brick", "paper"]),
];

const useSorts = [
  sorter("Sort the things: what are they usually made of?", [["metal", "Metal"], ["wood", "Wood"], ["glass", "Glass"]], [
    ["coin", "metal"], ["drinks can", "metal"], ["car", "metal"], ["match", "wood"], ["floorboard", "wood"], ["telegraph pole", "wood"],
    ["window", "glass"], ["jam jar", "glass"],
  ], { rule: USE_RULE }),
  sorter("Sort the things: paper or cardboard?", [["paper", "Paper"], ["card", "Cardboard"]], [
    ["book page", "paper"], ["tissue", "paper"], ["newspaper", "paper"], ["envelope", "paper"],
    ["cereal box", "card"], ["shoebox", "card"], ["delivery box", "card"],
  ]),
  sorter("Sort the things: brick or plastic?", [["brick", "Brick"], ["plastic", "Plastic"]], [
    ["house wall", "brick"], ["chimney", "brick"], ["school wall", "brick"],
    ["washing-up bowl", "plastic"], ["lunchbox", "plastic"], ["water bottle", "plastic"], ["bucket", "plastic"],
  ]),
];

const useMany = [
  c("Which material is NOT normally used to make spoons?", "glass", ["plastic", "wood", "metal"], { rule: USE_RULE }),
  c("Coins, cans, cars and table legs are all made of the same material. Which one?", "metal", ["paper", "glass", "rock"], { rule: USE_RULE }),
  c("Matches, floors and telegraph poles are all made of the same material. Which one?", "wood", ["glass", "metal", "plastic"], { rule: USE_RULE }),
  c("Which of these is NOT usually made of metal?", "a window", ["a coin", "a car", "a drinks can"]),
  c("Which of these is NOT usually made of wood?", "a drinks can", ["a match", "a floorboard", "a telegraph pole"]),
  c("Which material would be no good for making a chair?", "paper", ["wood", "metal", "plastic"]),
];

const useSpell = [
  spell("wood", "🪵", "a log", "Matches and floorboards are made of ___. Make the word."),
  spell("metal", "🪙", "a coin", "Coins and cans are made of ___. Make the word."),
  spell("glass", "🪟", "a window", "Windows are made of ___. Make the word."),
  spell("brick", "🧱", "bricks", "Many houses are built from ___. Make the word."),
];

const useApply = [
  { type: "number", prompt: "Bix finds 5 spoons: plastic, wood, metal, wood and plastic. How many different materials are there?", answer: 3, hint: "Count each material only once." },
  c("Bix finds a key, a coin and a paper clip. Which material are they all made of?", "metal", ["paper", "glass"]),
  c("Bix sees glass used for a window, a jam jar and a vase. What does this show?", "One material can be used for many things.", ["Glass can only be used for windows.", "All jars are made of wood."]),
  c("Bix sees cups made of plastic, paper and china. What does this show?", "The same thing can be made from different materials.", ["Cups can only be made of plastic.", "Paper is the same as plastic."]),
];

const useTyped = [
  typed("Windows are usually made of ___. Type the missing word.", "glass"),
  typed("Coins and drinks cans are made of ___. Type the missing word.", "metal"),
  typed("Floorboards and matches are made of ___. Type the missing word.", "wood"),
  typed("The pages of a book are made of ___. Type the missing word.", "paper"),
];

/* ---------- Choosing the Right Material ---------- */

const CHOOSE_RULE = "Choose a material that suits the job. Think about whether it needs to be strong, waterproof, see-through or bendy.";

const chooseBest = [
  c("A window needs to let light in so you can see through it. Which material is best?", "glass", ["wood", "brick", "cardboard"], { rule: CHOOSE_RULE }),
  c("A raincoat needs to keep you dry. Which material is best?", "plastic", ["paper", "cardboard", "cotton"], { rule: CHOOSE_RULE }),
  c("A house wall needs to be strong and keep out the rain. Which material is best?", "brick", ["paper", "cardboard", "glass"], { rule: CHOOSE_RULE }),
  c("A saucepan goes on a hot cooker. Which material is best?", "metal", ["plastic", "paper", "cardboard"], { rule: CHOOSE_RULE }),
  c("A box to post a present needs to be light and fold flat. Which material is best?", "cardboard", ["glass", "brick", "rock"], { rule: CHOOSE_RULE }),
  c("A bucket for the beach needs to be light and not break if dropped. Which material is best?", "plastic", ["glass", "paper", "brick"], { rule: CHOOSE_RULE }),
  c("A letter needs to be light and easy to write on. Which material is best?", "paper", ["metal", "brick", "rock"], { rule: CHOOSE_RULE }),
];

const chooseWhy = [
  c("Why are saucepans made of metal?", "Metal is strong and does not melt on the cooker.", ["Metal is see-through.", "Metal is soft and squashy."]),
  c("Why are windows made of glass?", "You can see through glass.", ["Glass is soft and bendy.", "Glass soaks up water."]),
  c("Why are houses not made of paper?", "Paper is weak and gets soggy in the rain.", ["Paper is too heavy.", "Paper is see-through."]),
  c("Why would a chocolate teapot be no good?", "It would melt when hot tea goes in.", ["It would be too heavy.", "It would be see-through."]),
  c("Why are umbrellas not made of paper?", "Paper is not waterproof.", ["Paper is too heavy to hold.", "Paper is see-through."]),
  c("Why are drinking glasses not used at the swimming pool?", "Glass can break into sharp pieces.", ["Glass soaks up water.", "Glass is too soft."]),
];

const chooseSorts = [
  sorter("Which materials would make a good umbrella?", [["good", "Good for an umbrella"], ["bad", "Not good"]], [
    ["plastic", "good"], ["waterproof fabric", "good"],
    ["paper", "bad"], ["cardboard", "bad"], ["brick", "bad"], ["rock", "bad"],
  ], { rule: CHOOSE_RULE, hint: "An umbrella must keep the rain off and be light to hold." }),
  sorter("Which materials would make a strong wall?", [["good", "Good for a wall"], ["bad", "Not good"]], [
    ["brick", "good"], ["rock", "good"],
    ["paper", "bad"], ["cardboard", "bad"], ["jelly", "bad"], ["tissue", "bad"],
  ], { rule: CHOOSE_RULE }),
  sorter("Sort the materials: keeps water out, or lets water in?", [["out", "Keeps water out"], ["in", "Lets water in"]], [
    ["plastic", "out"], ["glass", "out"], ["metal", "out"], ["rubber", "out"],
    ["paper", "in"], ["cardboard", "in"], ["tissue", "in"], ["cotton", "in"],
  ], { rule: CHOOSE_RULE }),
];

const chooseApply = [
  c("In the story, the wolf blew down the houses of straw and sticks. Which house stayed up?", "the house of bricks", ["the house of straw", "the house of sticks"]),
  c("Bix wants a bowl for the dog that will not break if it falls. Which is best?", "a metal bowl", ["a glass bowl", "a china bowl"]),
  c("Bix wants to make a model boat that floats and does not get soggy. Which material is best?", "plastic", ["paper", "cardboard"]),
  c("Bix wants curtains that keep out light at night. Which is best?", "thick fabric", ["clear plastic", "glass"]),
  c("Bix makes a bridge for toy cars from paper. It sags. What would be better?", "wood", ["tissue", "jelly"]),
];

const chooseTyped = [
  typed("A material that keeps water out is ___. Type the missing word.", "waterproof"),
  typed("Windows are made of glass because you can see ___ it. Type the missing word.", "through"),
  typed("Saucepans are made of ___ because it does not melt on the cooker. Type the missing word.", "metal"),
  typed("Paper is too weak for a house wall. Houses are built from ___. Type the missing word.", "brick"),
];

/* ---------- Squashing Bending Twisting and Stretching ---------- */

const SHAPE_RULE = "You can change the shape of some solid objects by squashing, bending, twisting or stretching them.";
const ACTIONS = ["squashing", "bending", "twisting", "stretching"];
const action = (prompt, answer, extra = {}) => c(prompt, answer, ACTIONS.filter((a) => a !== answer), { rule: SHAPE_RULE, ...extra });

const shapeActions = [
  action("Bix pulls an elastic band to make it longer. What is Bix doing?", "stretching"),
  action("Bix presses a ball of play dough flat with both hands. What is Bix doing?", "squashing"),
  action("Bix turns the two ends of a pipe cleaner round in opposite directions. What is Bix doing?", "twisting"),
  action("Bix makes a straight straw into a corner shape. What is Bix doing?", "bending"),
  action("Bix sits on a beanbag and makes it flatter. What is Bix doing to the beanbag?", "squashing"),
  action("Bix wrings out a wet flannel by turning the ends. What is Bix doing?", "twisting"),
  action("Bix pulls a spring so it gets longer. What is Bix doing?", "stretching"),
  action("Bix makes a paper clip go into a new shape, like a hook. What is Bix doing?", "bending"),
];

const shapeSorts = [
  sorter("Sort them: easy to squash or hard to squash?", [["easy", "Easy to squash"], ["hard", "Hard to squash"]], [
    ["sponge", "easy"], ["play dough", "easy"], ["marshmallow", "easy"], ["foam ball", "easy"],
    ["rock", "hard"], ["brick", "hard"], ["glass marble", "hard"], ["metal spoon", "hard"],
  ], { rule: SHAPE_RULE }),
  sorter("Bix squashes, bends or stretches each one, then lets go. Does it go back to its shape, or stay changed?", [["back", "Goes back"], ["stays", "Stays changed"]], [
    ["elastic band", "back"], ["sponge", "back"], ["spring", "back"], ["rubber ball", "back"],
    ["play dough", "stays"], ["kitchen foil", "stays"], ["clay", "stays"], ["paper clip", "stays"],
  ], { hint: "Think about what happens when you let go." }),
  sorter("Sort the actions.", [["squash", "Squash"], ["bend", "Bend"], ["stretch", "Stretch"]], [
    ["sit on a cushion", "squash"], ["press play dough flat", "squash"], ["fold a pipe cleaner", "bend"], ["make a straw into a corner", "bend"],
    ["pull an elastic band", "stretch"], ["pull a spring", "stretch"],
  ], { rule: SHAPE_RULE }),
  sorter("Sort the actions: twist or stretch?", [["twist", "Twist"], ["stretch", "Stretch"]], [
    ["wring out a wet flannel", "twist"], ["twist a pipe cleaner round a pencil", "twist"], ["turn the lid of a jar", "twist"],
    ["pull an elastic band longer", "stretch"], ["pull a spring longer", "stretch"], ["pull on a stretchy sock", "stretch"],
  ], { rule: SHAPE_RULE }),
];

const shapeFacts = [
  c("Which of these can you stretch?", "an elastic band", ["a rock", "a glass", "a brick"], { rule: SHAPE_RULE }),
  c("Which of these can you squash with your hands?", "a sponge", ["a brick", "a metal spoon", "a marble"], { rule: SHAPE_RULE }),
  c("Which of these can you bend?", "a pipe cleaner", ["a rock", "a brick", "a marble"], { rule: SHAPE_RULE }),
  c("Bix squashes a sponge and lets go. What happens?", "It goes back to its shape.", ["It stays flat.", "It turns into water."]),
  c("Bix squashes play dough and lets go. What happens?", "It stays squashed.", ["It jumps back into a ball.", "It turns into glass."]),
  c("Why can you not squash a rock with your hands?", "Rock is very hard.", ["Rock is too bendy.", "Rock is stretchy."]),
];

const shapeSpell = [
  spell("bend", undefined, undefined, "You can ___ a straw to make a corner. Make the word."),
  spell("twist", undefined, undefined, "Turning the ends of a pipe cleaner in opposite directions is a ___. Make the word."),
  spell("squash", undefined, undefined, "You can ___ a sponge by pressing it. Make the word."),
  spell("stretch", undefined, undefined, "You can ___ an elastic band by pulling it. Make the word."),
];

const shapeApply = [
  c("Bix holds both ends of a play dough snake and pulls it longer. What is Bix doing?", "stretching", ["squashing", "twisting"], { rule: SHAPE_RULE }),
  c("Bix wants a material for a hairband that stretches and goes back to its shape. Which is best?", "elastic", ["glass", "paper"]),
  c("Bix wants a pencil case that does not squash in a bag. Which is best?", "hard plastic", ["tissue paper", "play dough"]),
  c("Bix bends a metal paper clip, then lets go. What happens?", "It stays bent.", ["It springs back straight.", "It breaks into dust."]),
  c("Bix twists a balloon to make a balloon dog. Why does it not pop?", "The rubber is stretchy and can twist.", ["Balloons are made of glass.", "Balloons are hard like rock."]),
];

const shapeTyped = [
  typed("Squash, bend, twist or stretch? When you pull an elastic band, you ___ it. Type the missing word.", "stretch"),
  typed("Squash, bend, twist or stretch? When you press a sponge flat, you ___ it. Type the missing word.", "squash"),
  typed("Squash, bend, twist or stretch? When you make a straw into a corner shape, you ___ it. Type the missing word.", "bend"),
  typed("Squash, bend, twist or stretch? When you wring out a wet flannel, you ___ it. Type the missing word.", "twist"),
];

/* ---------- Inventors of New Materials ---------- */

const INVENT_RULE = "Long ago, inventors found new ways to use materials like rubber, air and stone.";

const inventWho = [
  c("Who made tyres filled with air?", "John Dunlop", ["Charles Macintosh", "John McAdam"], { rule: INVENT_RULE, hint: "His name is on lots of bike and car tyres today." }),
  c("Who made a waterproof fabric for raincoats?", "Charles Macintosh", ["John Dunlop", "John McAdam"], { rule: INVENT_RULE, hint: "A raincoat called a 'mac' is named after him." }),
  c("Who made roads from layers of small stones?", "John McAdam", ["John Dunlop", "Charles Macintosh"], { rule: INVENT_RULE, hint: "His name is hidden in the word 'tarmac'." }),
  c("Which kind of raincoat is named after Charles Macintosh?", "a mac", ["a poncho", "a cagoule"], { rule: INVENT_RULE, hint: "Listen to the start of his name." }),
  c("What did John Dunlop fill his tyres with?", "air", ["water", "sand", "stones"], { rule: INVENT_RULE }),
  c("What did Charles Macintosh put between two layers of cloth?", "rubber", ["paper", "sand", "glass"], { hint: "Wellies and balloons are made of it." }),
];

const inventWhy = [
  c("Why did John Dunlop make air-filled tyres?", "to make his son's tricycle less bumpy", ["to make the tricycle heavier", "to paint the tricycle"]),
  c("What problem did Charles Macintosh's fabric solve?", "It kept people dry in the rain.", ["It kept people cool in the sun.", "It made coats see-through."]),
  c("Before John McAdam, many roads turned to mud in the rain. Why were his roads better?", "Rain ran off them, so they stayed firm.", ["They were made of jelly.", "They were soft and squashy."]),
  c("Why were Macintosh's coats better than wool coats in the rain?", "The rubber kept the rain out.", ["They were made of paper.", "They had holes to let rain out."]),
  c("Why does an air-filled tyre give a smoother ride?", "The air squashes a little over bumps.", ["The air makes the bike heavier.", "The air makes the wheels square."]),
];

const inventSorts = [
  sorter("Who made what?", [["dunlop", "Dunlop"], ["macintosh", "Macintosh"], ["mcadam", "McAdam"]], [
    ["air-filled tyre", "dunlop"], ["smoother tricycle ride", "dunlop"],
    ["waterproof raincoat", "macintosh"], ["rubber between cloth", "macintosh"],
    ["layers of small stones", "mcadam"], ["firm roads in the rain", "mcadam"],
  ], { rule: INVENT_RULE, take: 6 }),
];

const inventOrders = [
  { type: "order", prompt: "Put John Dunlop's story in order.", labels: ["his son's tricycle had hard wheels", "the rides were very bumpy", "Dunlop made tyres filled with air", "the rides were much smoother"] },
  { type: "order", prompt: "Put Charles Macintosh's story in order.", labels: ["rain soaked through people's coats", "Macintosh put rubber between two layers of cloth", "coats made from it kept the rain out"] },
  { type: "order", prompt: "Put John McAdam's story in order.", labels: ["roads turned to mud in the rain", "McAdam laid layers of small stones", "rain ran off and the roads stayed firm"] },
  { type: "order", prompt: "Bix's bike tyre is flat. Put what happens in order.", labels: ["the tyre is flat and the ride is bumpy", "Bix pumps air into the tyre", "the tyre is firm and bouncy", "the ride is smooth"] },
];

const inventDesign = [
  c("Bix wants to invent a new material for a swimming cap. What must it be?", "stretchy and waterproof", ["hard and see-through", "heavy and soggy"]),
  c("Bix wants to invent a new material for a kite. What must it be?", "light and strong", ["heavy and soft", "made of brick"]),
  c("Bix wants to invent a material for wellies. What must it be?", "waterproof and bendy", ["see-through and soggy", "hard like glass"]),
  c("Bix wants to invent a material for a bike helmet. What must it be?", "strong and hard to break", ["soft like tissue", "stretchy like an elastic band"]),
  c("Bix wants to invent a material for a doll's house window. What must it be?", "see-through", ["soggy", "soft like tissue"]),
  c("Bix wants to invent a material for a lunchbox. What must it be?", "strong and waterproof", ["soggy and weak", "heavy like brick"]),
];

const inventTyped = [
  typed("John Dunlop filled his tyres with ___. Type the missing word.", "air"),
  typed("Charles Macintosh used ___ to make cloth waterproof. Type the missing word.", "rubber"),
  typed("John Dunlop made tyres for his son's ___. Type the missing word.", "tricycle"),
];

export const materialBuilders = {
  "materials-and-their-uses": buildTopic({
    banks: { names: useNames, sorts: useSorts, many: useMany, spell: useSpell, apply: useApply, typed: useTyped },
    levels: {
      1: ["names", "names", "names", "names", "names"],
      2: ["sorts", "names", "many", "sorts", "many"],
      3: ["many", "spell", "sorts", "spell", "many"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "choosing-the-right-material": buildTopic({
    banks: { best: chooseBest, why: chooseWhy, sorts: chooseSorts, apply: chooseApply, typed: chooseTyped },
    levels: {
      1: ["best", "best", "best", "best", "best"],
      2: ["sorts", "why", "best", "sorts", "why"],
      3: ["why", "why", "sorts", "why", "best"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "squashing-bending-twisting-and-stretching": buildTopic({
    banks: { actions: shapeActions, sorts: shapeSorts, facts: shapeFacts, spell: shapeSpell, apply: shapeApply, typed: shapeTyped },
    levels: {
      1: ["actions", "actions", "actions", "actions", "actions"],
      2: ["sorts", "facts", "facts", "sorts", "facts"],
      3: ["spell", "sorts", "spell", "actions", "spell"],
      4: ["apply", "typed", "apply", "apply", "typed"],
    },
  }),
  "inventors-of-new-materials": buildTopic({
    banks: { who: inventWho, why: inventWhy, sorts: inventSorts, orders: inventOrders, design: inventDesign, typed: inventTyped },
    levels: {
      1: ["who", "who", "who", "who", "who"],
      2: ["sorts", "why", "why", "who", "why"],
      3: ["orders", "why", "orders", "design", "orders"],
      4: ["design", "why", "design", "typed", "typed"],
    },
  }),
};
