// Year 2 Science: concepts, supplied observations and simple enquiry decisions.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

const science = (data, alt) => ({ renderer: "science", data, alt });
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const chart = (title, unit, bars, alt, step = 1) => ({ renderer: "bar-chart", data: { title, unit, step, bars: bars.map(([label, value]) => ({ label, value })) }, alt });

export default defineAssessmentBank({
  year: 2, subject: "science",
  quests: {
    "living-things-and-their-habitats": {
      "living-dead-and-never-alive": { objective: "Classify living, dead or once-living, and never-alive things using their histories.", items: [
        { q: "Which thing has never been alive?", a: "A pebble", d: ["A fallen leaf", "A wooden spoon"], practice: 1, why: "A pebble has never been alive. A leaf and the wood in a spoon were parts of living plants." },
        { q: "Sort these things. The dead group includes parts of things that were once alive.", sort: { bins: ["Living", "Dead or once living", "Never alive"], cards: [["A growing daisy", "Living"], ["A fallen feather", "Dead or once living"], ["A paper bag", "Dead or once living"], ["A glass marble", "Never alive"]] }, practice: 2, why: "The daisy is living. The feather came from a bird and paper came from a tree. Glass has never been alive." },
        { q: "An oak tree loses its leaves for winter and grows new ones in spring. Which group does it belong to?", a: "Living", d: ["Dead", "Never alive"], practice: 3, why: "A deciduous tree can be living even when it has no leaves. It grows new leaves in spring." },
      ] },
      habitats: { objective: "Relate habitat features to organisms' needs and describe simple dependencies.", items: [
        { q: "A place has salt water, waves and a sandy beach. Which habitat is it?", a: "Seashore", d: ["Woodland", "Desert"], practice: 1, why: "A seashore is where the land meets the sea." },
        { q: "A polar bear has thick fur and a layer of fat. How do these help it in the Arctic?", a: "They help it keep warm", d: ["They help it breathe under water", "They help it grow leaves"], practice: 2, model: pictures("An Arctic animal", [["🐻‍❄️", "Polar bear"]], "A polar bear."), why: "Thick fur and fat help a polar bear stay warm in a cold habitat." },
        { q: "Sort the examples by what the habitat provides.", sort: { bins: ["Food", "Water", "Shelter"], cards: [["Berries a bird eats", "Food"], ["A pond an animal drinks from", "Water"], ["A tree where a bird builds its nest", "Shelter"]] }, practice: 3, why: "Habitats provide things animals need. Berries are food, a pond supplies water, and a nest site offers shelter." },
      ] },
      "micro-habitats": { objective: "Recognise small habitats, use observations of their occupants and care for them during an enquiry.", items: [
        { q: "Why might woodlice live under a log?", a: "It is damp and shady", d: ["It is always hot and dry", "It has no air"], practice: 2, why: "Woodlice are suited to damp, shady places such as the space under a log." },
        { q: "These are example counts from under one log. How many woodlice were counted?", n: 6, practice: 3, model: chart("Example minibeast count", "Animals counted", [["Woodlice", 6], ["Slugs", 2], ["Spiders", 4]], "Example counts of three kinds of minibeast found under one log. Each scale step is one animal."), why: "The woodlice bar reaches 6. This record describes that example search, not every log." },
        { q: "Bix lifts a stone to look for minibeasts. What should Bix do when finished?", a: "Carefully put the stone back", d: ["Leave the animals in the Sun", "Take all the animals home"], practice: 4, why: "Putting the stone back keeps the animals' small habitat damp and shady." },
      ] },
      "simple-food-chains": { objective: "Read simple feeding relationships, understand arrow direction and order a food chain.", items: [
        { q: "In a food chain, what does an arrow mean?", a: "Is eaten by", d: ["Grows into", "Lives inside"], practice: 1, why: "The arrow points from the food to the animal that eats it." },
        { q: "Grass is eaten by a rabbit. The rabbit is eaten by a fox. Put the food chain in order, starting with the plant.", order: ["Grass", "Rabbit", "Fox"], practice: 3, why: "Grass comes first, then the rabbit that eats it, then the fox that eats the rabbit." },
        { q: "Complete this food chain. Which animal eats lettuce and can be eaten by a thrush?", a: "The snail", d: ["The grass", "The fox"], practice: 2, model: science({ type: "chain", links: ["lettuce", "?", "thrush"], gap: 1 }, "A food chain shows lettuce, a missing middle box and a thrush, joined by arrows."), why: "The snail eats the lettuce and is eaten by the thrush, so it belongs in the middle." },
      ] },
      "where-food-comes-from": { objective: "Identify plant and animal food sources and order simple field-to-plate stages.", items: [
        { q: "Which animal gives us the eggs shown here?", a: "Hen", d: ["Cow", "Sheep"], practice: 1, model: pictures("A food", [["🥚", "Eggs"]], "Hen-sized eggs used for food."), why: "Hens lay the eggs commonly used for food." },
        { q: "Sort these foods by their source.", sort: { bins: ["Plant", "Animal"], cards: [["Carrot", "Plant"], ["Rice", "Plant"], ["Milk", "Animal"], ["Fish", "Animal"]] }, practice: 2, why: "Carrots and rice come from plants. Milk and fish come from animals." },
        { q: "Put these steps for making bread in order.", order: ["Wheat grows", "Grain is collected", "Grain is ground into flour", "Flour is used to make bread"], practice: 3, why: "Wheat produces grain. The grain is made into flour, which is used to make bread." },
      ] },
    },
    plants: {
      "seeds-and-bulbs": { objective: "Recognise seeds and bulbs and explain their basic needs when starting to grow.", items: [
        { q: "What kind of plant part is an onion?", a: "A bulb", d: ["A flower", "A leaf"], practice: 1, model: pictures("A plant part", [["🧅", "Onion"]], "An onion."), why: "An onion is a bulb. It can grow into a new onion plant." },
        { q: "Sort these plant parts.", sort: { bins: ["Seed", "Bulb"], cards: [["Acorn", "Seed"], ["Bean", "Seed"], ["Onion", "Bulb"], ["Tulip bulb", "Bulb"]] }, practice: 2, why: "Acorns and beans are seeds. Onions and tulip bulbs are bulbs." },
        { q: "Most seeds can start to grow in the dark if they have water and warmth. What helps feed them at first?", a: "A store of food inside the seed", d: ["Food from a flower already above the soil", "Bits of stone inside the seed"], practice: 3, why: "Seeds have stored food to help them start growing. Later, a leafy plant needs light to stay healthy." },
      ] },
      "from-seed-to-plant": { objective: "Recognise growth stages, order them and use supplied growth observations.", items: [
        { q: "Which stage is shown?", a: "A seedling", d: ["An unsprouted seed", "A mature flowering plant"], practice: 1, model: science({ type: "growth", stage: 2 }, "A small young plant above the soil, with its first two leaves."), why: "A seedling is a young plant with its first leaves." },
        { q: "Put these stages of a bean plant in order.", order: ["Seed", "Sprouting seed", "Seedling", "Mature plant"], practice: 3, why: "A seed starts to sprout, becomes a seedling and grows into a mature plant." },
        { q: "In these example observations, how many centimetres did the plant grow from Week 1 to Week 3?", n: 5, unit: "cm", practice: 4, model: chart("Example plant heights", "Height in cm", [["Week 1", 1], ["Week 2", 3], ["Week 3", 6]], "Example measurements of the same plant's height over three weeks. The scale is in centimetres."), why: "It grew from 1 cm to 6 cm. 6 − 1 = 5 cm of growth." },
      ] },
      "what-plants-need-to-grow": { objective: "Identify plant needs and interpret visible signs of missing water or light.", items: [
        { q: "These example plants had the same light and warmth. One plant had no water for two weeks. Which plant looks droopy?", a: "Plant A", d: ["Plant B"], practice: 1, model: science({ type: "pots", plants: ["droopy", "healthy"] }, "Two pot plants. A bends down and has dry, cracked soil. B is green and stands upright."), why: "Plant A has drooped after going without water." },
        { q: "A leafy plant stays in a dark cupboard for two weeks. What is likely to happen to its leaves?", a: "They become pale and yellow", d: ["They stay healthy and bright green", "They turn into roots"], practice: 2, why: "Plants with leaves need light to stay healthy. In darkness their leaves can become pale and yellow." },
        { q: "Bix wants a leafy plant to grow and stay healthy. Which place is best?", a: "A light place with water and a suitable temperature", d: ["A dark freezer with no water", "A hot cupboard with no water"], practice: 4, why: "Plants need water, light and a suitable temperature: neither too hot nor too cold." },
      ] },
      "plant-experiments": { objective: "Plan a simple comparative test, keep conditions consistent and draw a conclusion from supplied results.", items: [
        { q: "Bix tests whether plants need light. One plant goes in light and one in darkness. What should Bix keep the same?", a: "The amount of water", d: ["How much light each plant gets", "Which plant is in darkness"], practice: 1, why: "Light is the thing being changed. Keeping the water the same helps make the comparison fair." },
        { q: "These example seeds had the same water. Both places were dark. Which conclusion fits the results?", a: "More seeds sprouted in the warm place", d: ["More seeds sprouted in the cold place", "Light made the seeds sprout"], practice: 2, model: table("Example seed-test results", ["Place", "Seeds planted", "Seeds sprouted"], [["Warm cupboard", "10", "9"], ["Cold fridge", "10", "1"]], "Example observations: ten seeds in each dark place, with equal water. Nine sprouted in a warm cupboard and one in a cold fridge."), why: "Nine sprouted in the warm place and one in the cold place. Both places were dark, so this comparison is about warmth." },
        { q: "Put these enquiry steps in order.", order: ["Ask a question", "Set up the comparison", "Watch and record", "Say what the results show"], practice: 3, why: "Start with a question, make a comparison, record what happens and then use the results to answer the question." },
      ] },
    },
    "animals-including-humans": {
      "animals-and-their-offspring": { objective: "Name familiar offspring and match them to the adults they become.", items: [
        { q: "What is a young sheep called?", a: "Lamb", d: ["Calf", "Kitten"], practice: 1, model: pictures("An adult animal", [["🐑", "Sheep"]], "An adult sheep."), why: "A young sheep is a lamb." },
        { q: "A foal grows into which adult animal?", a: "Horse", d: ["Cow", "Cat"], practice: 2, why: "A foal is a young horse." },
        { q: "Bix sees a mother cat with her young. What are the young cats called?", t: ["kittens", "kitten"], practice: 4, why: "Young cats are called kittens. They grow into adult cats." },
      ] },
      "growing-into-adults": { objective: "Recognise familiar animal and human growth stages and order their development.", items: [
        { q: "What does a tadpole grow into?", a: "Frog", d: ["Butterfly", "Chicken"], practice: 1, why: "A tadpole is a young frog. Its body changes as it grows." },
        { q: "Put these butterfly stages in order.", order: ["Egg", "Caterpillar", "Pupa", "Butterfly"], practice: 3, why: "A caterpillar hatches from an egg, becomes a pupa and later emerges as a butterfly." },
        { q: "Put these human stages in order from youngest to oldest.", order: ["Baby", "Toddler", "Child", "Teenager", "Adult"], practice: 3, why: "Humans grow through these stages, from a baby to an adult." },
      ] },
      "what-animals-need-to-survive": { objective: "Recognise animals' basic needs and apply them to simple care situations.", items: [
        { q: "Which set lists three things animals need to survive?", a: "Water, food and air", d: ["Toys, sweets and games", "Books, hats and pencils"], practice: 1, why: "Animals need water, food and air to survive." },
        { q: "Sort these things.", sort: { bins: ["Needed to survive", "Not needed to survive"], cards: [["Fresh water", "Needed to survive"], ["Suitable food", "Needed to survive"], ["Air", "Needed to survive"], ["A party hat", "Not needed to survive"]] }, practice: 2, why: "Water, food and air are basic needs. A party hat is a want rather than a need." },
        { q: "A pet rabbit has food and air. Its water bowl is empty. What does it need now?", t: "water", practice: 4, why: "The rabbit needs fresh water as well as food and air." },
      ] },
      exercise: { objective: "Explain simple effects and benefits of exercise and interpret supplied breathing observations.", items: [
        { q: "What usually happens to your heartbeat when you run?", a: "It gets faster", d: ["It stops", "It gets slower than when resting"], practice: 1, why: "Your heart usually beats faster during exercise." },
        { q: "These example observations count breaths in one minute. How many breaths were counted after running?", n: 45, practice: 2, model: chart("Example breathing counts", "Breaths in one minute", [["Resting", 20], ["After walking", 26], ["After running", 45]], "Example observations comparing breaths counted in one minute at rest, after walking and after running. The scale goes up in tens.", 10), why: "The after-running bar reaches 45, halfway between 40 and 50." },
        { q: "Why is being active good for your body?", a: "It helps keep your heart and muscles strong", d: ["It means you never need food", "It means you never need sleep"], practice: 4, why: "Exercise helps keep the heart, muscles and bones strong and healthy." },
      ] },
      "healthy-eating": { objective: "Recognise a variety of foods and explain why meals need different food types.", items: [
        { q: "Which food helps give you energy for playing?", a: "Rice", d: ["Water", "Salt"], practice: 1, why: "Rice is a starchy food that gives us energy. Water is needed too, but it does not give energy." },
        { q: "Sort these foods.", sort: { bins: ["Fruit or vegetable", "Other food"], cards: [["Apple", "Fruit or vegetable"], ["Carrot", "Fruit or vegetable"], ["Rice", "Other food"], ["Cheese", "Other food"]] }, practice: 2, why: "Apples are fruit and carrots are vegetables. Rice and cheese belong to other food groups." },
        { q: "Why should a lunch have different kinds of food?", a: "Different foods help our bodies in different ways", d: ["Only one kind of food is ever useful", "All foods do exactly the same job"], practice: 4, why: "A range of foods helps us get what we need for energy, growth and health." },
      ] },
      hygiene: { objective: "Explain simple hygiene routines and sequence safe handwashing and sneeze care.", items: [
        { q: "Why should you wash your hands before eating?", a: "To wash away dirt and germs", d: ["To make your hands grow", "To replace eating food"], practice: 1, why: "Washing with soap and water helps remove dirt and germs from hands." },
        { q: "Put these handwashing steps in order.", order: ["Wet hands", "Add soap and rub all over", "Rinse off the soap", "Dry hands"], practice: 3, why: "Wet hands first, use soap and rub all parts, then rinse and dry." },
        { q: "Bix sneezes into a tissue and puts it in a bin. What should Bix do next?", a: "Wash hands", d: ["Keep the used tissue for lunch", "Wipe the tissue on a table"], practice: 4, why: "Washing hands after using a tissue helps stop germs spreading." },
      ] },
    },
    "uses-of-everyday-materials": {
      "materials-and-their-uses": { objective: "Identify familiar uses and recognise that different materials can make the same object.", items: [
        { q: "Which material is a clear window pane usually made from?", a: "Glass", d: ["Brick", "Cardboard"], practice: 1, why: "Clear glass lets us see through a window." },
        { q: "Sort these objects by their stated material.", sort: { bins: ["Wood", "Metal"], cards: [["A wooden floorboard", "Wood"], ["A wooden match", "Wood"], ["A steel can", "Metal"], ["A copper coin", "Metal"]] }, practice: 2, why: "Floorboards and matches can be wood. Steel and copper are metals." },
        { q: "Which set lists three materials that can all make useful spoons?", a: "Wood, metal and plastic", d: ["Tissue, sponge and water", "Paper, wool and sand"], practice: 3, why: "Wood, metal and suitable plastic can hold their shape and scoop food." },
      ] },
      "choosing-the-right-material": { objective: "Choose materials for a purpose and justify choices using their properties.", items: [
        { q: "Bix needs to see through a toy window. Which material is best?", a: "Clear plastic", d: ["Wood", "Cardboard"], practice: 1, why: "Clear plastic is see-through. Wood and cardboard would block the view." },
        { q: "Why is a brick suitable for a wall?", a: "It is hard and strong", d: ["It is soft and stretchy", "It soaks up a spill like a towel"], practice: 2, why: "A wall needs a material that stays firm and supports its load. Brick is hard and strong." },
        { q: "In this example test, which sample would best keep a toy dry in rain?", a: "Sample B", d: ["Sample A", "Sample C"], practice: 4, model: table("Example rain-cover test", ["Sample", "What happened"], [["A", "Water soaked through"], ["B", "Water stayed outside"], ["C", "Water soaked through"]], "Three example cover samples were tested with water. A and C let water through; B kept it outside."), why: "Sample B kept the water outside. That is the useful property for a rain cover." },
      ] },
      "squashing-bending-twisting-and-stretching": { objective: "Name shape-changing actions and compare whether objects return to their previous shapes.", items: [
        { q: "Bix pulls both ends of an elastic band so it gets longer. What is Bix doing?", a: "Stretching", d: ["Squashing", "Twisting"], practice: 1, why: "Stretching means pulling something so it becomes longer." },
        { q: "A sponge is pressed flat and then let go. What usually happens?", a: "It goes back towards its old shape", d: ["It turns into glass", "It stays as flat as a sheet of paper"], practice: 2, why: "A sponge can spring back after it is squashed." },
        { q: "Bix presses a ball of play dough flat, then lets go. What will Bix notice?", a: "It stays flattened", d: ["It springs back into a ball", "It becomes a stone"], practice: 4, why: "Play dough keeps its changed shape after being squashed, unlike a sponge." },
      ] },
      "inventors-of-new-materials": { objective: "Connect named material developments with the problems they solved (knowledge and design reasoning, not a practical invention assessment).", items: [
        { q: "Who developed waterproof cloth for raincoats by using rubber between layers of cloth?", a: "Charles Macintosh", d: ["John Dunlop", "John McAdam"], practice: 1, why: "Charles Macintosh used rubber between cloth layers to help keep rain out." },
        { q: "Why did John Dunlop use air inside tyres?", a: "To make a ride less bumpy", d: ["To make wheels square", "To make the tricycle too heavy to move"], practice: 2, why: "Air-filled tyres cushion bumps, making the ride smoother." },
        { q: "Bix designs a material for a kite. Which pair of properties would be useful?", a: "Light and strong", d: ["Heavy and easy to tear", "Heavy and made of thick brick"], practice: 4, why: "A kite needs to be light enough to lift and strong enough to stay together." },
      ] },
    },
  },
});
