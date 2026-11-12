// Year 2 Science: purposes and illustrated examples, including supplied observations.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const intro = (title, learn, use, ex, model) => ({ title, learn: Array.isArray(learn) ? learn : [learn], use, ex, model });
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const science = (data, alt) => ({ renderer: "science", data, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });

export default defineIntroductions({
  year: 2, subject: "science",
  subjectIntro: intro("Ask questions and look for clues", ["Explore living things, growing plants and animal needs.", "Choose useful materials and explain what observations show."],
    "Science helps you care for a plant, notice animals' homes and choose a material for a job. You can compare things and record what happens.",
    "A paper towel soaks up water. A plastic sheet keeps it out. Each material is useful for a different job.",
    table("One observation, two useful jobs", ["Material", "What happens", "A useful job"], [["Paper towel", "Soaks up water", "Wiping a spill"], ["Plastic sheet", "Keeps water out", "Covering a toy in rain"]], "Paper towel soaks up water and helps wipe a spill. Plastic sheet keeps water out and can cover a toy in rain.")),
  quests: {
    "living-things-and-their-habitats": {
      intro: intro("Homes, needs and food", ["Compare living, dead and never-alive things.", "Explore habitats, small habitats and food chains."],
        "Use these ideas to understand a garden or pond. Look for how living things get what they need and depend on one another.",
        "Grass is eaten by a rabbit. The rabbit can be eaten by a fox. This food chain links a plant and two animals.",
        science({ type: "chain", links: ["grass", "rabbit", "fox"] }, "A food chain: grass is eaten by a rabbit, which is eaten by a fox. Each arrow points from the food to what eats it.")),
      topics: {
        "living-dead-and-never-alive": intro("Was it ever alive?", "Compare things that are living, dead or have never been alive.", "Sort things you find on a nature walk.", "A growing tree is living. A fallen leaf was part of a living tree. A pebble has never been alive.",
          pictures("Think about each thing's history", [["🌳", "Growing tree: living"], ["🍂", "Fallen leaf: once part of a living thing"], ["🪨", "Pebble: never alive"]], "A growing tree is living. A fallen leaf was once part of a living thing and goes in the dead group. A pebble has never been alive.")),
        habitats: intro("A home that meets needs", "Explain how a habitat provides food, water and shelter.", "Understand why different animals live in different places.", "A woodland can give a bird berries to eat and a tree for its nest. The bird depends on plants in its habitat.",
          pictures("A bird in a woodland", [["🐦", "Bird"], ["🫐", "Berries: food"], ["🌳", "Tree: a place for a nest"]], "A woodland bird can eat berries and build a nest in a tree. Plants help provide its food and shelter.")),
        "micro-habitats": intro("Small places full of life", "Find small habitats and compare the conditions and animals in them.", "Look for minibeasts while caring for their homes.", "The space under a log is a micro-habitat. It is often damp and shady, which suits woodlice and slugs.",
          pictures("Under a log", [["🪵", "Log: shade and shelter"], ["💧", "Damp ground"], ["🐌", "A snail may live here"]], "Under a log is a small habitat that is often damp and shaded. Snails, slugs and woodlice may live in this kind of place.")),
        "simple-food-chains": intro("Follow who eats what", "Use a simple food chain to show how animals get food.", "Explain how a plant can feed an animal that another animal eats.", "Lettuce is eaten by a snail. The snail is eaten by a thrush. Each arrow means 'is eaten by'.",
          science({ type: "chain", links: ["lettuce", "snail", "thrush"] }, "A three-part food chain: lettuce is eaten by a snail, which is eaten by a thrush. Arrows mean is eaten by.")),
        "where-food-comes-from": intro("From living things to our food", "Name plant and animal sources of familiar foods.", "Trace a food back to the plant or animal it came from.", "Bread is made with flour from wheat grain. Milk comes from an animal such as a cow.",
          pictures("Trace the source", [["🌾", "Wheat grain → flour → bread"], ["🐄", "Cow → milk"]], "Wheat plants produce grain, which can be ground into flour for bread. Cows produce milk.")),
      },
    },
    plants: {
      intro: intro("Watch plants grow", ["Follow seeds and bulbs as they grow.", "Explore what plants need and compare simple test results."],
        "Use these ideas to care for a plant and keep a growth record. Looking more than once helps you notice change.",
        "A bean seed sprouts a root and a shoot. It becomes a seedling with leaves, then a mature plant. A leafy plant needs light and water to stay healthy.",
        science({ type: "growth", stage: 2 }, "A bean seedling above the soil with two young leaves. A stem links it to roots below the soil. It is a young plant growing from a seed.")),
      topics: {
        "seeds-and-bulbs": intro("A small start for a new plant", "Recognise seeds and bulbs and describe how they start to grow.", "Choose what to plant in a pot or garden.", "A bean is a seed and an onion is a bulb. Both have stored food to help a new plant start growing.",
          pictures("Two ways to start", [["🫘", "Bean: a seed"], ["🧅", "Onion: a bulb"]], "A bean is a seed. An onion is a bulb. Both can grow into new plants and have stored food to support early growth.")),
        "from-seed-to-plant": intro("Follow a plant's changes", "Recognise and order stages from seed to mature plant.", "Keep a record of the changes in a plant you grow.", "A sprouting seed grows a root and a shoot. The root grows down and the shoot grows up.",
          science({ type: "growth", stage: 1 }, "A sprouting seed under the soil. A tiny root grows down from it and a shoot grows upwards. No leaves have opened yet.")),
        "what-plants-need-to-grow": intro("Help a plant stay healthy", "Find out why leafy plants need water, light and a suitable temperature.", "Choose a good place for a plant and care for it.", "A plant without water may droop. With enough water, light and suitable warmth, it can stay green and upright.",
          science({ type: "pots", plants: ["droopy", "healthy"] }, "Two example pot plants: Plant A droops above dry, cracked soil. Plant B has green leaves and stands upright. Going without water can make a plant droop.")),
        "plant-experiments": intro("Compare and find out", "Change one thing, keep other things the same and record what happens.", "Use evidence to answer a question about growing plants.", "In an example test, both plants get equal water. One has light and one has darkness. This compares the effect of light.",
          table("An example light test", ["Plant", "Light", "Water", "Starting size"], [["A", "Light", "Same amount", "Same size"], ["B", "Darkness", "Same amount", "Same size"]], "An example test starts with two same-sized plants and gives them equal water. Plant A is in light and Plant B in darkness. Only the light is changed.")),
      },
    },
    "animals-including-humans": {
      intro: intro("Growing and staying healthy", ["Match young animals to adults and follow changes as they grow.", "Explore animal needs, exercise, food and keeping clean."],
        "Use these ideas when caring for a pet and looking after your own body. Humans are animals with needs too.",
        "A kitten grows into a cat. It needs food, water and air. Growing changes its size, but it is still the same kind of animal.",
        pictures("Young and adult", [["🐈", "Kitten → adult cat"], ["🐑", "Lamb → adult sheep"]], "A kitten is a young cat and grows into an adult cat. A lamb is a young sheep and grows into an adult sheep.")),
      topics: {
        "animals-and-their-offspring": intro("Young animals and their adults", "Name familiar young animals and the adults they become.", "Describe the young animals you see on a farm or at home.", "A lamb grows into a sheep. A foal grows into a horse. These young animals are called offspring.",
          pictures("Match the young to the adult", [["🐑", "Lamb → sheep"], ["🐎", "Foal → horse"], ["🐈", "Kitten → cat"]], "A lamb is a young sheep, a foal is a young horse and a kitten is a young cat. Each grows into its adult form.")),
        "growing-into-adults": intro("Bodies change as they grow", "Follow and order stages as animals and humans grow.", "Explain why a young animal may look different from its adult.", "A chicken starts in an egg. A chick hatches from it and grows into an adult chicken.",
          pictures("Chicken stages", [["🥚", "1. Egg"], ["🐣", "2. Chick hatches"], ["🐔", "3. Adult chicken"]], "A chick hatches from an egg, then grows into an adult chicken. The pictures show these three stages in order.")),
        "what-animals-need-to-survive": intro("What animals must have", "Describe animals' basic needs for water, food and air.", "Check that a pet has the things it needs each day.", "A rabbit needs suitable food and fresh water. It also needs air to breathe. A toy cannot replace any of these needs.",
          pictures("Basic animal needs", [["🥬", "Suitable food"], ["💧", "Water"], ["🌬️", "Air to breathe"]], "Animals, including rabbits and humans, need suitable food, water and air to survive.")),
        exercise: intro("Notice your active body", "Describe simple changes during exercise and why being active helps the body.", "Notice how your breathing changes when you move and then rest.", "After running, a person's heart usually beats faster and they breathe faster. Exercise helps keep muscles and the heart strong.",
          pictures("Moving and resting", [["🏃", "Running: breathing usually speeds up"], ["🪑", "Resting: breathing slows again"]], "During running, breathing and heartbeat usually become faster. During rest after exercise, they slow again.")),
        "healthy-eating": intro("Different foods help in different ways", "Explain why we need the right amounts of different kinds of food.", "Think about variety when choosing a meal.", "Rice gives energy. Beans help with growth. Fruit and vegetables help keep us healthy. No single food does every job.",
          pictures("Variety in a meal", [["🍚", "Rice: energy"], ["🫘", "Beans: growth and repair"], ["🥕", "Vegetables: part of a varied diet"]], "Rice is a starchy food that supplies energy. Beans help with growth and repair. Vegetables add another useful food type to a varied meal.")),
        hygiene: intro("Keep clean and stop germs spreading", "Explain why washing hands, brushing teeth and covering sneezes matter.", "Use simple clean routines before meals and after using a tissue.", "After sneezing into a tissue, put it in a bin and wash your hands. This helps stop germs spreading.",
          pictures("After a sneeze", [["🤧", "Catch the sneeze in a tissue"], ["🗑️", "Put the tissue in a bin"], ["🧼", "Wash hands with soap and water"]], "A simple sneeze routine: catch it in a tissue, put the tissue in a bin and wash hands with soap and water.")),
      },
    },
    "uses-of-everyday-materials": {
      intro: intro("Materials with a job to do", ["Choose materials by their useful properties.", "Explore how some solid objects change shape.", "Meet people who developed useful materials."],
        "These ideas help you choose a rain cover, design a toy or explain why a material works well.",
        "A kite needs a material that is light and strong. A raincoat needs one that keeps water out. The best choice depends on the job.",
        pictures("Match properties to a job", [["🪁", "Kite: light and strong"], ["🧥", "Raincoat: waterproof and bendy"]], "A kite needs light, strong material. A raincoat needs material that keeps water out and bends as the wearer moves.")),
      topics: {
        "materials-and-their-uses": intro("Many materials, many uses", "Name materials used for familiar objects and compare their uses.", "Notice why the same object can be made from different materials.", "Spoons can be made from wood, metal or plastic. These materials can all make a useful spoon that holds its shape.",
          table("One object, different materials", ["Object", "Possible material"], [["Spoon", "Wood"], ["Spoon", "Metal"], ["Spoon", "Plastic"]], "A spoon may be made from wood, metal or plastic. Different materials can be suitable for the same kind of object.")),
        "choosing-the-right-material": intro("Choose it and explain why", "Use properties to explain why a material suits a job.", "Pick a cover that keeps a toy dry in rain.", "Clear plastic lets us see through a toy window. Cardboard blocks the view. The useful property here is being see-through.",
          table("Compare a toy-window choice", ["Material", "Can you see through it?"], [["Clear plastic", "Yes"], ["Cardboard", "No"]], "Clear plastic is see-through and can make a toy window. Cardboard is not see-through and would block the view.")),
        "squashing-bending-twisting-and-stretching": intro("Change the shape", "Name squashing, bending, twisting and stretching and compare what happens afterwards.", "Choose a material that can change shape in a useful way.", "A sponge springs back after being squashed. Play dough stays squashed. Different solid materials behave differently.",
          table("Press, let go and compare", ["Object", "After squashing and letting go"], [["Sponge", "Goes back towards its old shape"], ["Play dough", "Stays flattened"]], "When squashed and released, a sponge goes back towards its old shape, but play dough stays flattened.")),
        "inventors-of-new-materials": intro("New uses solve problems", "Meet people who found useful ways to use materials.", "Think about what properties a new design would need.", "Charles Macintosh put rubber between cloth layers to keep rain out. John Dunlop used air-filled tyres for a less bumpy ride.",
          pictures("Materials solving problems", [["🧥", "Macintosh: waterproof cloth"], ["🛞", "Dunlop: air-filled tyres"], ["🛣️", "McAdam: roads made with small stones"]], "Charles Macintosh developed waterproof cloth using rubber. John Dunlop developed air-filled tyres. John McAdam made roads with layers of small stones.")),
      },
    },
  },
});
