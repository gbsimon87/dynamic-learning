/**
 * Teacher subject-knowledge briefings for Year 2 Science, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the programme of study in
 * docs/curriculum/year-2-science.md (the PDF text), using the requirement that
 * the topic's row in the mapping table names. Never paraphrase or alter it: a
 * test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points, the last one the boundary
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 1 (and EYFS) prior learning and the Year 3+ destination
 */
const HABITATS = "identify that most living things live in habitats to which they are suited and describe how different habitats provide for the basic needs of different kinds of animals and plants, and how they depend on each other";
const SEEDS = "observe and describe how seeds and bulbs grow into mature plants";
const PLANT_NEEDS = "find out and describe how plants need water, light and a suitable temperature to grow and stay healthy";
const OFFSPRING = "notice that animals, including humans, have offspring which grow into adults";
const HEALTH = "describe the importance for humans of exercise, eating the right amounts of different types of food, and hygiene";
const MATERIAL_USES = "identify and compare the suitability of a variety of everyday materials, including wood, metal, plastic, glass, brick, rock, paper and cardboard for particular uses";

export const YEAR2_SCIENCE_BRIEFINGS = {
  // ---------------------------------------------------------------- Living things and their habitats
  "living-dead-and-never-alive": {
    statutory: ["explore and compare the differences between things that are living, dead, and things that have never been alive"],
    inBrief: "Things are living, dead (once alive, or once part of something alive) or never alive. Sorting them, and arguing about the tricky cases, is how pupils learn what being alive means.",
    keyFacts: [
      "Living things grow, need water and air, and have young or make seeds. A useful class set of life processes is moving, breathing, sensing, growing, reproducing, needing food and water.",
      "Dead means it was once alive, or was once part of something alive: a bone, a fallen feather, a log, and also wood and paper, which come from trees.",
      "Never alive means it was never part of a living thing: rock, metal, plastic, glass, a brick. A flame, a cloud and a toy robot can move or grow but are never alive.",
      "A tree with no leaves in winter is not dead. It is resting and its leaves will grow again. A dry seed is alive, which is why it grows when watered.",
      "Boundary: sorting into three groups and giving a reason. The seven life processes by name and the idea of a cell are later.",
    ],
    misconceptions: [
      { mistake: "If it moves or grows, it must be alive (a flame, a cloud, a toy robot).", why: "Movement is the most visible sign of life for young children.", response: "Ask the other questions too: does it need food and water, does it have young? Build a class checklist and test the flame against it." },
      { mistake: "A bare tree in winter is dead.", why: "No leaves looks like no life.", response: "Revisit the same tree through the year and photograph it. Point to the buds already formed in winter." },
      { mistake: "A wooden spoon or a paper bag is 'never alive'.", why: "The object looks manufactured, so pupils forget its material came from a tree.", response: "Trace the material back: spoon, wood, tree. Use the question 'was it once part of something alive?'" },
    ],
    vocabulary: [
      { term: "living", meaning: "Alive now: it grows, needs water and air, and can have young or make seeds." },
      { term: "dead", meaning: "Was once alive, or was once part of something alive." },
      { term: "never alive", meaning: "Has never been part of a living thing, like a rock or a plastic cup." },
      { term: "grow", meaning: "Get bigger over time." },
      { term: "characteristic", meaning: "Something that is true of all living things, such as needing water." },
      { term: "sort", meaning: "Put things into groups because of something they share." },
    ],
    before: "In Year 1 pupils name common plants and animals and describe their structure and what their bodies can do. Their sense of 'living' has so far been informal.",
    next: "Year 3 pupils study the parts and needs of plants and the nutrition of animals. Year 4 pupils group living things and use classification keys. Year 5 pupils study life cycles and reproduction, and the life processes are named formally in key stage 3.",
  },

  "habitats": {
    statutory: [HABITATS],
    inBrief: "A habitat is the natural home of a variety of plants and animals. Living things are suited to where they live, which provides their food, water and shelter, and they depend on each other there.",
    keyFacts: [
      "Habitats pupils meet include seashore, woodland, ocean, rainforest, pond, desert and Arctic. A habitat provides food, water and shelter for the living things in it.",
      "Features suit a habitat: a polar bear's thick fur and fat keep it warm in the Arctic, a camel stores fat and copes with little water in the desert, a fish's gills and fins suit water.",
      "Living things depend on each other: plants give food and shelter, birds nest in trees, bees visit flowers and help them make seeds.",
      "'Suited to' does not mean it can only live there. It means the habitat gives it what it needs.",
      "Boundary: matching animals and plants to habitats and saying how a feature helps. The words adaptation and ecosystem are later.",
    ],
    misconceptions: [
      { mistake: "A habitat is just the place where an animal sleeps.", why: "Pupils think of their own home as a bedroom or a house.", response: "List everything an animal gets from its habitat (food, water, shelter, space) and compare with what pupils get at home." },
      { mistake: "Animals choose their habitat because they like it.", why: "Children explain behaviour through preference.", response: "Ask what would happen to a polar bear in a desert and use the answer to link features to place." },
      { mistake: "Plants are just scenery, not part of the habitat's food and shelter.", why: "Animals attract attention and plants do not move.", response: "Make a class web of arrows between plants and animals: leaves to caterpillar, tree to nest, flower to bee." },
    ],
    vocabulary: [
      { term: "habitat", meaning: "The natural home of a variety of plants and animals." },
      { term: "suited", meaning: "A good match for a place, because it has what is needed to live there." },
      { term: "shelter", meaning: "A safe place to rest, hide or raise young." },
      { term: "depend on", meaning: "Need something else in order to live well." },
      { term: "rainforest", meaning: "A warm, wet forest with tall trees and many kinds of animals and plants." },
      { term: "Arctic", meaning: "The very cold area around the North Pole." },
    ],
    before: "In Year 1 pupils identify and name common animals and plants, including birds, fish and trees, and in the Reception year they have noticed living things in the local area.",
    next: "Year 3 pupils study what plants need and how they vary. In Year 4 pupils recognise that environments can change and that this can pose dangers to living things. Year 6 pupils study how living things are adapted to suit their environment.",
  },

  "micro-habitats": {
    statutory: ["identify and name a variety of plants and animals in their habitats, including micro-habitats"],
    inBrief: "A micro-habitat is a very small habitat, such as under a log or stone or in leaf litter. Conditions there (damp or dry, shady or sunny) affect which small animals live in it.",
    keyFacts: [
      "Examples are under a log, under a stone, in leaf litter, on a stony path and under bushes. Each has its own conditions.",
      "Many minibeasts, such as woodlice and slugs, are found in damp, shady places. Others, such as ants, are often found in drier, sunnier ones.",
      "Minibeasts can be named from clues: a woodlouse has many legs and a hard shell-like body, a snail has a shell, a worm has no legs, a spider has eight legs, an insect has six.",
      "Pupils can count what they find and show it as a bar chart. Counts are one sample, not a rule for every log.",
      "Boundary: finding, naming and counting living things and linking them to conditions. Keys and sampling methods are Year 4 and later. Return animals gently and put the stone back.",
    ],
    misconceptions: [
      { mistake: "Spiders, woodlice and worms are all insects.", why: "'Bug' is used for any small animal.", response: "Count legs and sort: six legs and three body parts is an insect, eight legs is a spider. Use 'minibeast' for the whole group." },
      { mistake: "Minibeasts live under stones because they like to hide from us.", why: "Pupils think of the animal reacting to people.", response: "Compare under the stone with an open sunny patch and measure the damp and light, then link conditions to the animals found." },
      { mistake: "No animals in a micro-habitat means nothing lives there.", why: "Small or still animals are missed on a short search.", response: "Search again slowly with hand lenses and different spots. Record that one search is only a sample." },
    ],
    vocabulary: [
      { term: "micro-habitat", meaning: "A very small habitat, like the underside of a log or a stone." },
      { term: "minibeast", meaning: "A small animal without a backbone, such as a snail, worm, woodlouse or beetle." },
      { term: "leaf litter", meaning: "Fallen leaves on the ground that make a home for small animals." },
      { term: "damp", meaning: "A little bit wet." },
      { term: "shady", meaning: "Out of direct sunlight." },
      { term: "count", meaning: "Find out how many there are." },
    ],
    before: "In Year 1 pupils name common animals and plants and describe the structure of a variety of common animals. They have used the local area for observing living things.",
    next: "Year 4 pupils explore and use classification keys to name living things in their local and wider environment. Year 6 pupils classify living things into broad groups, including microorganisms, plants and animals.",
  },

  "simple-food-chains": {
    statutory: ["describe how animals obtain their food from plants and other animals, using the idea of a simple food chain"],
    inBrief: "A food chain shows what eats what, with arrows meaning 'is eaten by'. Every chain starts with a plant, because plants make their own food.",
    keyFacts: [
      "In grass, cow, human the arrow points from the food to the animal that eats it: the grass is eaten by the cow, and the cow is eaten by the human.",
      "Every food chain starts with a plant (or something that makes its own food). Animals cannot make their own food, so they eat plants or other animals.",
      "Some animals eat plants only, some eat animals only and some eat both. Pupils can say this without the labels herbivore, carnivore and omnivore, which are Year 1 vocabulary.",
      "Humans can be in a food chain. A chain shows one route only, as most animals eat several things.",
      "Boundary: chains of three or four links, built, ordered and completed. The words producer, predator and prey belong to Year 4.",
    ],
    misconceptions: [
      { mistake: "The arrow shows which way the animal goes, or who eats whom the wrong way round.", why: "Arrows usually mean 'go to' in maps and signs.", response: "Say 'is eaten by' aloud each time and keep it on the wall. Act out a chain, with the arrow carrying the food." },
      { mistake: "The sun, or the soil, is the first thing in the chain.", why: "Pupils know plants need sunlight and soil.", response: "Say that in a food chain we start with a living thing that is food. The plant makes its own food using light, and that is the first link." },
      { mistake: "Each animal eats only one thing, so a chain shows everything it eats.", why: "A line looks complete and final.", response: "Draw two chains that share an animal, such as a hedgehog eating beetles and slugs, and show the chains join up." },
    ],
    vocabulary: [
      { term: "food chain", meaning: "A line showing what eats what, starting with a plant." },
      { term: "arrow", meaning: "In a food chain it means 'is eaten by'." },
      { term: "eat", meaning: "Take in food to live and grow." },
      { term: "plant", meaning: "A living thing that makes its own food and is where every food chain starts." },
      { term: "link", meaning: "One living thing in the chain." },
      { term: "source of food", meaning: "Where a food comes from." },
    ],
    before: "In Year 1 pupils name carnivores, herbivores and omnivores and describe the structure of animals. They have not yet shown what eats what in a chain.",
    next: "Year 3 pupils learn that animals cannot make their own food and get nutrition from what they eat. Year 4 pupils construct and interpret food chains, identifying producers, predators and prey, and Year 6 pupils link this to adaptation.",
  },

  "where-food-comes-from": {
    statutory: ["describe how animals obtain their food from plants and other animals, using the idea of a simple food chain, and identify and name different sources of food"],
    inBrief: "Our food comes from plants or from animals. Tracing a food back to its source, such as bread to wheat or cheese to milk, shows pupils where the food chain begins.",
    keyFacts: [
      "Foods from plants include fruit, vegetables, bread (from wheat grain), rice, potatoes and chips (from potatoes).",
      "Foods from animals include milk, cheese (from milk), eggs, meat and fish, and honey, which bees make from nectar.",
      "Many meals mix sources. Pupils start with single foods, then trace short routes from field to plate, such as wheat, flour, bread.",
      "Everything we eat can be traced back to a plant, because animal foods come from animals that ate plants.",
      "Boundary: naming the source (plant or animal) and putting a short route in order. Food miles, farming methods and processing detail are not expected.",
    ],
    misconceptions: [
      { mistake: "Bread, cheese or chips come from the shop or a factory.", why: "Children meet food packaged and already made.", response: "Make a field to plate chain for one food, with pictures, such as potato, chips." },
      { mistake: "Eggs come from plants, or milk is only made in cartons.", why: "Food that is not meat is not linked to an animal.", response: "Sort a food box into 'from a plant' and 'from an animal' and talk about the animal part, such as hen, egg." },
      { mistake: "Honey comes from flowers directly.", why: "Bees and flowers are close together in pictures.", response: "Say that bees collect nectar from flowers and make it into honey, so honey is from an animal." },
    ],
    vocabulary: [
      { term: "source", meaning: "Where something comes from." },
      { term: "plant food", meaning: "Food that comes from a plant, such as an apple or a potato." },
      { term: "animal food", meaning: "Food that comes from an animal, such as milk or an egg." },
      { term: "wheat", meaning: "A plant whose grain is ground into flour to make bread." },
      { term: "farm", meaning: "A place where people grow plants or look after animals for food." },
      { term: "order", meaning: "Put steps one after another in the right sequence." },
    ],
    before: "In Year 1 pupils name carnivores, herbivores and omnivores and in Reception they have talked about healthy food. They have not traced foods back to their sources.",
    next: "Year 3 pupils learn that animals get nutrition from what they eat. Year 4 pupils construct food chains with producers, predators and prey, and in Year 5 pupils study the reproduction of plants and animals.",
  },

  // ---------------------------------------------------------------- Plants
  "seeds-and-bulbs": {
    statutory: [SEEDS],
    inBrief: "Seeds and bulbs both grow into new plants. A seed or bulb has a store of food inside, so it needs water to start growing but most do not need light at first.",
    keyFacts: [
      "Seeds are made by flowers, and a seed grows into a plant of the same kind. A bulb, such as a tulip, daffodil, snowdrop or onion, is a short stem with fleshy leaves that store food.",
      "An onion is a bulb, not a seed. A bean, sunflower or pea is a seed.",
      "Seeds and bulbs need water to grow. Most do not need light, because they have a store of food inside them.",
      "Germination means a seed starts to grow. 'Starts to grow' is the way to say it in Year 2.",
      "Boundary: telling seeds and bulbs apart and knowing what they need to start. How the food store is used and the process of germination in detail are later.",
    ],
    misconceptions: [
      { mistake: "Seeds need light to start growing.", why: "Pupils know plants need light and apply it to every stage.", response: "Sprout seeds in a cupboard on damp paper and compare with the windowsill. Explain that the store of food inside lasts until the leaves open to the light." },
      { mistake: "A bulb is a kind of seed.", why: "Both are planted and both grow into plants.", response: "Cut an onion in half and show the layers. Compare with a bean seed that has a coat and a small plant inside." },
      { mistake: "Seeds get their food from the soil as they sprout.", why: "Roots go into the soil and soil is called plant food.", response: "Say 'the seed has its own store of food'. Grow seeds on damp tissue to show they sprout without soil." },
    ],
    vocabulary: [
      { term: "seed", meaning: "A small part of a plant that can grow into a new plant." },
      { term: "bulb", meaning: "A plant part under the ground, such as an onion, that stores food and can grow into a plant." },
      { term: "germinate", meaning: "Start to grow." },
      { term: "store of food", meaning: "Food kept inside a seed or bulb to help it start growing." },
      { term: "mature plant", meaning: "A fully grown plant." },
      { term: "water", meaning: "What a seed or bulb needs to start growing." },
    ],
    before: "In Year 1 pupils identify and describe the basic structure of common flowering plants, including trees. They have seen plants but not followed a seed or bulb as it grows.",
    next: "Year 3 pupils describe the functions of the parts of a flowering plant and the requirements for plant growth. Year 3 also covers seed formation and dispersal, and Year 5 covers reproduction in plants.",
  },

  "from-seed-to-plant": {
    statutory: [SEEDS],
    inBrief: "A seed grows through stages: seed, sprouting seed, seedling, mature plant. The roots grow first, then the shoot, and the flowers of the mature plant make new seeds.",
    keyFacts: [
      "The stages in order are seed, sprouting seed (germination), seedling, mature plant. The mature plant makes flowers, which make new seeds, and the cycle begins again.",
      "The root emerges first and grows down to anchor the seed and take in water. The shoot then grows up towards the light.",
      "Growth can be measured with a ruler and shown on a bar chart, week by week. Growth in cm is found by subtracting one measurement from the next.",
      "Different plants grow at different speeds, so a chart is the evidence for one plant, not a rule for all.",
      "Boundary: ordering stages and reading growth from a chart. The names of the parts of a seed and the way a plant makes its food are later.",
    ],
    misconceptions: [
      { mistake: "The shoot grows first and the roots come later.", why: "Pupils see only what is above the soil.", response: "Grow a bean in a clear jar against the glass so the root can be watched." },
      { mistake: "A plant grows at the same rate every week.", why: "A simple picture suggests steady growth.", response: "Measure weekly and plot it. Notice that some weeks show more growth than others." },
      { mistake: "Once it is a mature plant, the story ends.", why: "Pupils read the life cycle as a line.", response: "Show that the flower makes seeds, and let pupils plant them or draw the cycle as a circle." },
    ],
    vocabulary: [
      { term: "seedling", meaning: "A very young plant that has just grown from a seed." },
      { term: "root", meaning: "The part that grows down into the soil." },
      { term: "shoot", meaning: "The part that grows up from a seed." },
      { term: "sprout", meaning: "Begin to grow." },
      { term: "mature plant", meaning: "A fully grown plant that can make flowers and seeds." },
      { term: "height", meaning: "How tall something is, measured in cm." },
    ],
    before: "In Year 1 pupils describe the basic structure of common flowering plants, including trees, and in Reception they have planted seeds and watched them grow.",
    next: "Year 3 pupils describe the functions of roots, stem, leaves and flowers and the part flowers play in the life cycle, including pollination, seed formation and seed dispersal. Year 5 pupils describe plant reproduction.",
  },

  "what-plants-need-to-grow": {
    statutory: [PLANT_NEEDS],
    inBrief: "Plants need water, light and a suitable temperature to grow and stay healthy. Without light the leaves go pale, without water the plant droops, and frost can damage it.",
    keyFacts: [
      "Without light, leaves turn pale and yellow. Without water, a plant droops. Both signs show the plant is unhealthy.",
      "A suitable temperature is warm enough to grow. Frost can damage a plant, and a very hot place can harm it too.",
      "Too much water can also harm a plant, because the roots can rot. The right amount matters.",
      "Different plants need different amounts, such as a cactus, which needs little water but a lot of light.",
      "Boundary: water, light and a suitable temperature. Air, nutrients from soil and room to grow are Year 3. Seeds and bulbs are different: they need water but most do not need light at first.",
    ],
    misconceptions: [
      { mistake: "More water is always better for a plant.", why: "Water is the most obvious thing pupils give a plant.", response: "Compare a plant watered a little with one in a pot kept soaking, and see which stays healthy." },
      { mistake: "Plants get their food from the soil, so they do not need light.", why: "Roots are in the soil and soil seems like the plant's meal.", response: "Put one plant in a cupboard and one on a windowsill, and compare their leaves over two weeks." },
      { mistake: "A plant that is drooping is dead.", why: "A droopy plant looks lifeless.", response: "Water a drooping plant and watch it recover. Say that it was unhealthy, not dead." },
    ],
    vocabulary: [
      { term: "water", meaning: "What a plant takes in through its roots to stay healthy." },
      { term: "light", meaning: "What a plant needs from the Sun or a lamp to stay healthy." },
      { term: "temperature", meaning: "How hot or cold something is." },
      { term: "healthy", meaning: "Growing well, with green leaves and a firm stem." },
      { term: "droop", meaning: "Hang down because there is not enough water." },
      { term: "frost", meaning: "Very cold weather that freezes water and can damage plants." },
    ],
    before: "In Year 1 pupils identify and describe the basic structure of common flowering plants, and observe changes across the four seasons, which links to plants in different weather.",
    next: "In Year 3 pupils explore the requirements of plants for life and growth (air, light, water, nutrients from soil, and room to grow) and how they vary from plant to plant. How plants make food using light is taught in key stage 3.",
  },

  "plant-experiments": {
    statutory: [PLANT_NEEDS],
    inBrief: "A comparative test changes one thing and keeps everything else the same, so any difference in the plants must be down to that one thing. Pupils read results and say what they found out.",
    keyFacts: [
      "In a test of light, two similar plants get the same water and temperature but only one gets light. Any difference in the leaves is because of light.",
      "In Bix's temperature test, seeds are in a warm, dark cupboard and a fridge. Both are dark, so only warmth changes.",
      "Results are recorded, for example a table, a drawing or a bar chart. Pupils say what they found, not what they expected.",
      "One test of a few plants is good evidence for those plants. It does not prove a rule for all plants.",
      "Boundary: informal fair testing (change one thing, keep the rest the same) with help. Predictions, variables by name and repeated readings come in Year 3 onwards.",
    ],
    misconceptions: [
      { mistake: "A test is fair if you change lots of things to give the plant the best chance.", why: "Pupils want the plant to do well, and mix care with testing.", response: "Ask 'what is the one thing we are changing?' and list what must stay the same: pot, soil, water, place." },
      { mistake: "The result is what we thought would happen.", why: "Children report expectation as observation.", response: "Record the observation first, then compare with the prediction and say if it matched." },
      { mistake: "One plant in the dark that is still green proves plants do not need light.", why: "A single result seems final.", response: "Keep the test going longer and use more than one plant, and talk about how the evidence changes." },
    ],
    vocabulary: [
      { term: "test", meaning: "Something we do to find out an answer." },
      { term: "fair test", meaning: "A test where only one thing is changed and the rest stays the same." },
      { term: "change", meaning: "The one thing we do differently, such as light or no light." },
      { term: "same", meaning: "Things we keep the same so the test is fair." },
      { term: "result", meaning: "What we found out from the test." },
      { term: "predict", meaning: "Say what you think will happen." },
    ],
    before: "In Year 1 pupils perform simple tests and observe closely using simple equipment, and they have grouped and classified living things and materials.",
    next: "Year 3 pupils set up simple practical enquiries, comparative and fair tests, take measurements using standard units and draw conclusions. Year 4 and later pupils plan tests with several variables.",
  },

  // ---------------------------------------------------------------- Animals, including humans
  "animals-and-their-offspring": {
    statutory: [OFFSPRING],
    inBrief: "Animals, including humans, have babies (offspring) that grow into adults. Many young animals have their own names, such as kitten, lamb, calf and joey.",
    keyFacts: [
      "Names of young: kitten (cat), puppy (dog), lamb (sheep), calf (cow), foal (horse), piglet (pig), chick (hen), duckling (duck), cub (lion), kid (goat), joey (kangaroo).",
      "Offspring grow into adults of the same kind. A kitten grows into a cat, not into a different animal.",
      "Some young look very like their parents, such as a lamb and a sheep. Some look very different, such as a tadpole and a frog.",
      "Humans are animals and have offspring too: babies grow into adults.",
      "Boundary: matching young with adults and noticing growth. How reproduction happens is not expected, as the programme of study says.",
    ],
    misconceptions: [
      { mistake: "A baby animal is a small version of every adult animal.", why: "Familiar pets and farm animals look like small adults.", response: "Compare a lamb with a sheep and a tadpole with a frog and ask which young look different from their parents." },
      { mistake: "A young animal and an adult are different kinds of animal, such as a chick and a hen.", why: "Different names suggest different animals.", response: "Say 'a chick is a young hen' and make pair cards for young and adult." },
      { mistake: "Humans are not animals, so human babies are not offspring.", why: "People often say 'people and animals'.", response: "Include humans in the pair cards and say that people are animals too." },
    ],
    vocabulary: [
      { term: "offspring", meaning: "The young of an animal or person." },
      { term: "adult", meaning: "A fully grown animal or person." },
      { term: "young", meaning: "Not yet grown up." },
      { term: "kitten, puppy, lamb, calf, foal", meaning: "The young of a cat, dog, sheep, cow and horse." },
      { term: "joey", meaning: "A young kangaroo." },
      { term: "grow", meaning: "Get bigger and change over time." },
    ],
    before: "In Year 1 pupils name a variety of common animals and compare the structure of animals, including pets. In Reception they have noticed that babies and animals grow.",
    next: "Year 3 pupils learn about nutrition, skeletons and muscles. Year 5 pupils describe the differences in the life cycles of a mammal, an amphibian, an insect and a bird, and the life process of reproduction.",
  },

  "growing-into-adults": {
    statutory: [OFFSPRING],
    inBrief: "Animals pass through stages as they grow, and for some the stages look very different. Humans grow through baby, toddler, child, teenager and adult.",
    keyFacts: [
      "Chicken: egg, chick, chicken. Butterfly: egg, caterpillar, pupa, butterfly (the pupa is also called a chrysalis). Frog: spawn, tadpole, frog. Sheep: lamb, sheep.",
      "Humans: baby, toddler, child, teenager, adult.",
      "A caterpillar changes completely inside the pupa. A tadpole grows legs, loses its tail and moves to land and water as a frog.",
      "Order matters: the stages follow one after another and repeat when the adult has young.",
      "Boundary: putting the stages in order and describing the changes. The words metamorphosis and life cycle, and how reproduction occurs, are not expected.",
    ],
    misconceptions: [
      { mistake: "A caterpillar is a young butterfly that just gets bigger.", why: "Lambs and kittens simply get bigger.", response: "Show photographs of each stage. Use 'pupa' and say that the body is changing inside." },
      { mistake: "Tadpoles are a kind of fish.", why: "They live in water and swim with a tail.", response: "Show a tadpole growing legs and losing its tail, ending as a frog." },
      { mistake: "Growing means getting bigger only.", why: "Height is the easy thing to measure.", response: "Talk about what a baby can do, then a toddler, a child and a teenager, and what changes." },
    ],
    vocabulary: [
      { term: "egg", meaning: "The first stage for many animals, from which the young hatches." },
      { term: "caterpillar", meaning: "The young stage of a butterfly that eats leaves and grows." },
      { term: "pupa", meaning: "The stage when a caterpillar is changing into a butterfly. Also called a chrysalis." },
      { term: "spawn", meaning: "The jelly-like eggs of a frog." },
      { term: "tadpole", meaning: "A young frog that lives in water and has a tail." },
      { term: "toddler", meaning: "A very young child who is learning to walk." },
    ],
    before: "In Year 1 pupils describe the structure of common animals, and in Reception they have watched caterpillars or chicks grow. They have not put the stages into an order.",
    next: "Year 5 pupils describe the differences in the life cycles of a mammal, an amphibian, an insect and a bird, and the changes as humans develop to old age.",
  },

  "what-animals-need-to-survive": {
    statutory: ["find out about and describe the basic needs of animals, including humans, for survival (water, food and air)"],
    inBrief: "All animals, including humans, need water, food and air to survive. Pupils separate what animals need from what they want, and think about how to care for pets.",
    keyFacts: [
      "Animals need water, food and air to survive. Without any one of them they cannot live for long.",
      "Needs are different from wants. A toy or a treat is a want. Food, water and air are needs.",
      "Fish need air too. Their gills take in the air that is in the water. Whales and dolphins are mammals and breathe air at the surface.",
      "Pets also need care, such as a clean, safe home, which is how people look after the needs of animals.",
      "Boundary: water, food and air, and sorting needs from wants. Oxygen, respiration and the other life processes are later.",
    ],
    misconceptions: [
      { mistake: "Fish do not need air.", why: "They never come up to breathe like we do.", response: "Say that air is dissolved in the water and gills take it in. A fish in water with no air would not survive." },
      { mistake: "Whales are fish and take in air through gills.", why: "They live in the sea and look like fish.", response: "Show whales surfacing to breathe, and sort them with mammals, which breathe air." },
      { mistake: "Animals need toys, sweets or a bed to survive.", why: "Pupils judge needs by what they like themselves.", response: "Sort cards into 'needs to live' and 'nice to have' and give a reason for each." },
    ],
    vocabulary: [
      { term: "survive", meaning: "Stay alive." },
      { term: "need", meaning: "Something a living thing must have to stay alive." },
      { term: "want", meaning: "Something nice to have that is not needed to stay alive." },
      { term: "air", meaning: "What animals breathe in to live." },
      { term: "gills", meaning: "The parts a fish uses to take in air from the water." },
      { term: "pet", meaning: "An animal we look after at home." },
    ],
    before: "In Year 1 pupils name and describe the structure of common animals, including pets, and in Reception they have talked about looking after living things.",
    next: "Year 3 pupils learn that animals need the right types and amount of nutrition and cannot make their own food. Year 6 pupils describe how nutrients and water are transported in animals.",
  },

  "exercise": {
    statutory: [HEALTH],
    inBrief: "Exercise keeps the body healthy. When we exercise our heart and breathing speed up, and regular activity makes the heart, muscles and bones stronger.",
    keyFacts: [
      "During exercise the heart beats faster and breathing speeds up. After resting they slow down again.",
      "Regular exercise helps the heart, muscles and bones to be stronger, and helps people feel good.",
      "NHS guidance says children should do an average of at least an hour of physical activity a day. Running, cycling, swimming, dancing and playing outside all count.",
      "Pupils can count breaths in one minute at rest and after exercise and show the results as a chart. Results are one set of data.",
      "Boundary: noticing the effects of exercise and why it matters. Names of muscles and the heart's structure are not expected.",
    ],
    misconceptions: [
      { mistake: "Exercise only means sport or PE lessons.", why: "Pupils link exercise to organised games.", response: "List active times in the day, such as walking to school, playing in the park and dancing." },
      { mistake: "A fast heart or fast breathing after running means something is wrong.", why: "Pupils feel the change and worry.", response: "Explain that the body needs more air and the heart moves it around faster when we are active, and that it slows when we rest." },
      { mistake: "You only need to exercise if you want to get thin.", why: "Adults talk about exercise as weight loss.", response: "Talk about strong muscles, a strong heart and bones, and feeling happy." },
    ],
    vocabulary: [
      { term: "exercise", meaning: "Moving your body in a way that makes you breathe faster and your heart beat faster." },
      { term: "heart", meaning: "The muscle that pumps blood around the body." },
      { term: "muscle", meaning: "A part of the body that helps it move." },
      { term: "bones", meaning: "The hard parts inside the body that hold it up." },
      { term: "breathe", meaning: "Take air in and let air out." },
      { term: "healthy", meaning: "Well and strong." },
    ],
    before: "In Year 1 pupils name the basic parts of the human body and the senses. In Reception they have talked about being active and healthy.",
    next: "Year 3 pupils learn that humans have skeletons and muscles for support, protection and movement. Year 6 pupils recognise the impact of diet, exercise, drugs and lifestyle on how their bodies function and describe the circulatory system.",
  },

  "healthy-eating": {
    statutory: [HEALTH],
    inBrief: "A healthy body needs the right amounts of different types of food. No single food is 'bad', but some, such as sugary foods, are best in small amounts now and then.",
    keyFacts: [
      "Eat lots of fruit and vegetables (at least five portions a day). Starchy foods such as bread, rice and pasta give energy.",
      "Beans, eggs and fish give protein for growing and repair. Milk and cheese help build strong bones and teeth.",
      "Sugary foods and drinks are best in small amounts and not too often, because too much sugar can harm teeth. Water is the best drink when thirsty.",
      "Describe foods as 'sometimes' or 'every day' foods, not 'good' and 'bad', so pupils do not feel anxious about food.",
      "Boundary: types of food and balance. The names of nutrients such as carbohydrate, protein and vitamins, and calorie counting, are not expected.",
    ],
    misconceptions: [
      { mistake: "Sweets and chocolate are bad and must never be eaten.", why: "Pupils hear food described as good or bad.", response: "Say that all foods can fit in a balanced diet. The question is how much and how often." },
      { mistake: "If a food is healthy, you can eat as much of it as you like.", why: "Pupils link healthy with unlimited.", response: "Talk about a balance of food types and the right amounts, using a plate with sections." },
      { mistake: "Fruit juice or squash is as good as water.", why: "They look and taste like something healthy.", response: "Look at labels for sugar and explain that water is best for being thirsty." },
    ],
    vocabulary: [
      { term: "healthy", meaning: "Good for your body and helps you to grow well." },
      { term: "diet", meaning: "All the food and drink a person has." },
      { term: "balanced", meaning: "Having a mix of different types of food in the right amounts." },
      { term: "energy", meaning: "What the body needs to move and grow." },
      { term: "protein", meaning: "A part of food, in beans, eggs and fish, that helps the body grow and repair." },
      { term: "sugar", meaning: "A sweet part of food that is best in small amounts." },
    ],
    before: "In Year 1 pupils name carnivores, herbivores and omnivores and in Reception they have talked about healthy food and drink.",
    next: "Year 3 pupils learn that humans need the right types and amount of nutrition. Year 4 pupils describe the human digestive system and teeth, and Year 6 pupils recognise the impact of diet and lifestyle.",
  },

  "hygiene": {
    statutory: [HEALTH],
    inBrief: "Hygiene means keeping clean to stop germs spreading and to stay healthy. Washing hands, brushing teeth and catching sneezes are everyday ways to do it.",
    keyFacts: [
      "Germs are tiny things too small to see that can make us ill. They spread from person to person and from surfaces.",
      "Wash hands with soap and water for about 20 seconds: after using the toilet, before eating and after touching pets or blowing your nose.",
      "Brush teeth twice a day for two minutes, in the morning and before bed.",
      "Catch a sneeze in a tissue, put it in the bin, then wash your hands. Do not share toothbrushes.",
      "Boundary: when and how to keep clean and why. The kinds of microorganism (bacteria and viruses) and how the body fights infection are later.",
    ],
    misconceptions: [
      { mistake: "You can see germs if you look carefully.", why: "Pupils think a dirty hand shows germs.", response: "Say that germs are too small to see. Use glitter on hands to show how things spread, then wash it off." },
      { mistake: "Hands are clean if they look clean or have been rinsed with water.", why: "Visible dirt is the only sign pupils use.", response: "Compare rinsing with washing with soap for 20 seconds, such as singing 'Happy Birthday' twice." },
      { mistake: "Being clean is only for when you are ill.", why: "Pupils link germs to illness only.", response: "Talk about everyday habits that keep everyone well, such as washing hands before eating." },
    ],
    vocabulary: [
      { term: "hygiene", meaning: "Keeping clean to stay healthy." },
      { term: "germs", meaning: "Tiny things, too small to see, that can make us ill." },
      { term: "spread", meaning: "Pass from one person or place to another." },
      { term: "soap", meaning: "What we use with water to wash germs off." },
      { term: "tissue", meaning: "A soft paper cloth used to catch a sneeze or wipe a nose." },
      { term: "infection", meaning: "An illness caused by germs." },
    ],
    before: "In Year 1 pupils name the parts of the human body and the senses. In Reception they have learned to wash hands and talked about staying healthy.",
    next: "Year 3 pupils learn about nutrition and skeletons, and in Year 6 pupils recognise the impact of diet, exercise, drugs and lifestyle on how their bodies function. Microorganisms are met in Year 6 classification and in key stage 3.",
  },

  // ---------------------------------------------------------------- Uses of everyday materials
  "materials-and-their-uses": {
    statutory: [MATERIAL_USES],
    inBrief: "Everyday objects are made from materials chosen because of their properties. Some materials are used for many things, and different materials can be used for the same thing.",
    keyFacts: [
      "The materials to know are wood, metal, plastic, glass, brick, rock, paper and cardboard.",
      "One material, many uses: metal for coins, cans, cars and table legs; wood for matches, floors and telegraph poles.",
      "One use, many materials: a spoon can be plastic, wood or metal, but not normally glass.",
      "A material is chosen for its properties, such as hard, strong, bendy, waterproof or see-through.",
      "Boundary: naming the eight materials and giving a reason a material suits a job. Technical words such as thermal conductor and opaque are not expected.",
    ],
    misconceptions: [
      { mistake: "An object has only one possible material, such as a spoon that is always metal.", why: "Pupils know their own spoon.", response: "Collect spoons in different materials and talk about which are better for a hot soup or a baby." },
      { mistake: "A material has only one use.", why: "Pupils link materials to the objects they see most.", response: "Hunt around the classroom for objects made of the same material, such as metal." },
      { mistake: "Brick and rock are the same material.", why: "Both are hard and used to build.", response: "Say that rock is found in nature, and bricks are made by people, often from clay." },
    ],
    vocabulary: [
      { term: "material", meaning: "What an object is made from." },
      { term: "property", meaning: "How a material looks, feels or behaves, such as hard or bendy." },
      { term: "suitable", meaning: "Good for a job." },
      { term: "wood", meaning: "A hard material from trees." },
      { term: "metal", meaning: "A hard, shiny material, such as steel or copper." },
      { term: "plastic", meaning: "A material made by people that can be many shapes and colours." },
    ],
    before: "In Year 1 pupils distinguish between an object and the material it is made from, name everyday materials including wood, plastic, glass, metal, water and rock, and describe their simple properties.",
    next: "Year 5 pupils compare and group materials by properties including hardness, solubility, transparency and conductivity, and give reasons for uses based on evidence from fair tests.",
  },

  "choosing-the-right-material": {
    statutory: [MATERIAL_USES],
    inBrief: "To choose a material for a job we compare properties such as strong, waterproof, see-through or light, and explain why it suits or does not suit the job.",
    keyFacts: [
      "A window needs to be see-through, so glass. An umbrella needs to keep rain off and be light, so a waterproof fabric or plastic on a thin frame.",
      "A property is a reason: 'it is waterproof so it keeps the rain out'. Pupils should give both the property and the job.",
      "A material that suits one job may not suit another, such as paper, which is light but not waterproof.",
      "Unusual and creative uses are welcome. A chocolate teapot is a joke that shows a good reason, because chocolate melts when it is hot. The three little pigs show why straw, sticks and bricks differ in strength.",
      "Boundary: comparing the suitability of materials with a reason. Measuring properties with fair tests is later.",
    ],
    misconceptions: [
      { mistake: "The best material is the strongest one for every job.", why: "Strong sounds like better.", response: "Ask whether a strong, heavy metal would make a good kite or a good pencil case, and why not." },
      { mistake: "A material is just good or bad, with no reason.", why: "Pupils give opinions, not properties.", response: "Give the sentence 'It is ___ so it is good for ___' and have pupils complete it." },
      { mistake: "Waterproof means strong.", why: "Both are good qualities in a coat or boot.", response: "Test paper, plastic and fabric for water and for tearing and see that the results differ." },
    ],
    vocabulary: [
      { term: "strong", meaning: "Hard to break or tear." },
      { term: "waterproof", meaning: "Does not let water through." },
      { term: "see-through", meaning: "Light passes through it so you can see what is behind." },
      { term: "light", meaning: "Not heavy." },
      { term: "suitable", meaning: "Right for the job." },
      { term: "reason", meaning: "The property that explains why a material is chosen." },
    ],
    before: "In Year 1 pupils describe the simple physical properties of everyday materials and compare and group them. They have not yet chosen materials for jobs.",
    next: "Year 5 pupils give reasons, based on evidence from comparative and fair tests, for the particular uses of everyday materials, including metals, wood and plastic.",
  },

  "squashing-bending-twisting-and-stretching": {
    statutory: ["find out how the shapes of solid objects made from some materials can be changed by squashing, bending, twisting and stretching"],
    inBrief: "Some solid objects can change shape when they are squashed, bent, twisted or stretched. Some go back to their shape afterwards and some stay changed.",
    keyFacts: [
      "The four actions: squashing (pressing), bending, twisting and stretching (pulling longer). Pupils should name the action.",
      "Materials differ: a sponge is easy to squash, a brick is hard to squash. Rubber bands stretch, but a metal spoon does not.",
      "Some objects go back to their shape (a sponge, a rubber band, a spring). Others stay changed (modelling clay, a bent wire, a squashed foil ball).",
      "A force (a push or a pull) is what changes the shape, but the word 'force' is not needed yet.",
      "Boundary: naming the action and describing the result. Elastic and plastic as technical terms and measuring forces are later.",
    ],
    misconceptions: [
      { mistake: "A hard material cannot change shape at all.", why: "Pupils think hard means fixed.", response: "Bend a thin metal strip or a ruler and show that even hard materials can change a little." },
      { mistake: "Bending and twisting are the same.", why: "Both change a shape without cutting it.", response: "Act them out: bend a straw, then twist a tea towel, and name each movement." },
      { mistake: "Everything that is squashed stays squashed.", why: "Clay and foil stay changed, so pupils generalise.", response: "Squash a sponge and a ball of clay and compare what happens when they let go." },
    ],
    vocabulary: [
      { term: "squash", meaning: "Press something so it gets flatter or smaller." },
      { term: "bend", meaning: "Make something curve without breaking." },
      { term: "twist", meaning: "Turn the two ends in different directions." },
      { term: "stretch", meaning: "Pull something so it gets longer." },
      { term: "shape", meaning: "What an object looks like round the edge." },
      { term: "solid", meaning: "Keeps its own shape unless something changes it." },
    ],
    before: "In Year 1 pupils describe the simple physical properties of everyday materials, such as hard or soft and stretchy or stiff.",
    next: "In Year 3 pupils study forces and how things move on different surfaces. In Year 5 pupils decide on materials using properties such as hardness and test them fairly.",
  },

  "inventors-of-new-materials": {
    statutory: [MATERIAL_USES],
    inBrief: "People have invented useful materials to solve problems. John Dunlop, Charles Macintosh and John McAdam each made something that is still used today.",
    keyFacts: [
      "John Dunlop made air-filled (pneumatic) tyres, to give his son's tricycle a less bumpy ride. Tyres with his name are still sold.",
      "Charles Macintosh made a waterproof fabric by putting rubber between two layers of cloth, which kept people dry in the rain. A 'mac' raincoat is named after him.",
      "John McAdam made roads from layers of small stones, which let rain drain away so they stayed firm instead of turning to mud. The word tarmac comes from his name.",
      "Each invention solved a problem by using a material with the right properties.",
      "Boundary: the three named people and the problem each solved. No dates are needed beyond 'long ago', and pupils design a material for a job only in simple terms.",
    ],
    misconceptions: [
      { mistake: "Materials such as rubber and tarmac have always existed in the same form.", why: "Pupils meet them as ordinary things.", response: "Ask what roads and coats were like before, and tell the story of the problem each person solved." },
      { mistake: "Inventors are all from long ago.", why: "Stories of inventors are historical.", response: "Ask pupils to design a new material for a modern job, such as a cycle helmet, and talk about new materials today." },
      { mistake: "McAdam's roads were made of tar.", why: "The word tarmac contains 'tar'.", response: "Say that his roads used layers of small stones, and that tar was added later to make tarmac." },
    ],
    vocabulary: [
      { term: "inventor", meaning: "A person who makes something new." },
      { term: "invention", meaning: "A new thing made to solve a problem." },
      { term: "tyre", meaning: "The rubber part around a wheel." },
      { term: "waterproof", meaning: "Does not let water through." },
      { term: "rubber", meaning: "A stretchy, waterproof material." },
      { term: "problem", meaning: "Something that needs solving." },
    ],
    before: "In Year 1 pupils name everyday materials and describe their properties. They have not yet met the people who developed new materials.",
    next: "Year 5 pupils compare materials by properties and give reasons for their uses from fair tests. Key stage 3 covers how new materials are developed from chemistry.",
  },
};
