// Year 1 Science: short knowledge, observation and classification checks.
import { defineAssessmentBank } from "../../curriculumJourneyAuthoring.js";

const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const science = (data, alt) => ({ renderer: "science", data, alt });
const chart = (title, unit, bars, alt) => ({ renderer: "bar-chart", data: { title, unit, step: 1, bars: bars.map(([label, value]) => ({ label, value })) }, alt });

export default defineAssessmentBank({
  year: 1, subject: "science",
  quests: {
    plants: {
      "wild-and-garden-plants": { objective: "Name common plants from visible clues and distinguish plants growing wild from plants deliberately planted.", items: [
        { q: "A plant has blue flowers shaped like little bells. What is it?", a: "Bluebell", d: ["Daisy", "Sunflower"], practice: 1, why: "Bluebells have blue, bell-shaped flowers." },
        { q: "Sort these plants by how they got there.", sort: { bins: ["Grew wild", "Planted by a person"], cards: [["A daisy grew by itself in a field", "Grew wild"], ["A nettle grew by itself by a path", "Grew wild"], ["Sam planted a tulip bulb", "Planted by a person"], ["Mia planted sunflower seeds", "Planted by a person"]] }, practice: 2, why: "The daisy and nettle grew without being planted. Sam and Mia planted the other two." },
        { q: "A yellow flower has become a fluffy white ball of seeds. Which plant is it?", a: "Dandelion", d: ["Rose", "Clover"], practice: 4, why: "A dandelion's yellow flower becomes a fluffy seed head." },
      ] },
      "deciduous-and-evergreen-trees": { objective: "Recognise evergreen and deciduous trees and describe a deciduous tree's year.", items: [
        { q: "Which tree is evergreen?", a: "Tree B", d: ["Tree A"], practice: 1, model: science({ type: "treePair", evergreenFirst: false }, "Two trees in winter. A has bare branches. B still has green needles."), why: "Tree B keeps its leaves in winter. Evergreen trees stay leafy through the year." },
        { q: "Which tree grows acorns?", a: "Oak", d: ["Holly", "Pine"], practice: 2, why: "Acorns are the seeds of an oak tree." },
        { q: "Put an oak tree's year in order. Start in spring.", order: ["New leaves open", "Full of green leaves", "Leaves turn brown and fall", "Bare branches"], practice: 3, why: "These changes follow spring, summer, autumn and winter. The cycle then starts again." },
      ] },
      "parts-of-a-flowering-plant": { objective: "Name basic flowering-plant parts and describe their positions.", items: [
        { q: "Which part does the arrow point to?", a: "The roots", d: ["The stem", "The petals"], practice: 1, model: science({ type: "plant", point: "roots" }, "A flowering plant. The arrow points to the thin branching parts below the soil."), why: "The roots are the branching parts under the soil." },
        { q: "Put these parts in order from the top of a sunflower to the bottom.", order: ["Flower", "Stem", "Roots"], practice: 3, why: "The flower is at the top. The stem goes down to the roots under the soil." },
        { q: "Bix finds a pip inside an apple. It can grow into a new plant. What is the pip?", t: "seed", practice: 4, why: "An apple pip is a seed. It can grow into a new apple tree." },
      ] },
      "parts-of-a-tree": { objective: "Name tree parts and describe their positions, including roots, trunk and blossom.", items: [
        { q: "Which part does the arrow point to?", a: "The trunk", d: ["The roots", "The leaves"], practice: 1, model: science({ type: "tree", point: "trunk" }, "A tree. The arrow points to the thick upright woody part above the ground."), why: "The trunk is the thick woody part that the branches grow from." },
        { q: "Sort these parts of a tree by where they are usually found.", sort: { bins: ["Above the ground", "Below the ground"], cards: [["Trunk", "Above the ground"], ["Branches", "Above the ground"], ["Leaves", "Above the ground"], ["Roots", "Below the ground"]] }, practice: 2, why: "The trunk, branches and leaves are above the ground. The roots spread through the soil." },
        { q: "An apple tree has flowers in spring. What are a tree's flowers called?", a: "Blossom", d: ["Bark", "Roots"], practice: 4, why: "A tree's flowers are called blossom. Bark is the outside of its trunk and branches." },
      ] },
    },
    "animals-including-humans": {
      "fish-amphibians-reptiles-birds-and-mammals": { objective: "Group common animals using stated body features rather than where they live or whether they fly.", items: [
        { q: "A shark has fins and gills. Which animal group does it belong to?", a: "Fish", d: ["Mammals", "Birds"], practice: 1, model: pictures("An animal", [["🦈", "Shark"]], "A shark."), why: "A shark is a fish. It has fins and breathes with gills." },
        { q: "Sort these animals.", sort: { bins: ["Birds", "Mammals"], cards: [["Penguin", "Birds"], ["Owl", "Birds"], ["Bat", "Mammals"], ["Whale", "Mammals"]] }, practice: 2, why: "Penguins and owls have feathers. Bats and whales are mammals that feed their babies milk." },
        { q: "An animal flies at night. It has fur and feeds its babies milk. Which group does it belong to?", a: "Mammals", d: ["Birds", "Reptiles"], practice: 4, why: "Fur and feeding babies milk are mammal clues. Flying alone does not make an animal a bird." },
      ] },
      "carnivores-herbivores-and-omnivores": { objective: "Identify animal diet groups from clearly stated foods.", items: [
        { q: "A lion eats other animals, not plants. Which word describes its diet?", a: "Carnivore", d: ["Herbivore", "Omnivore"], practice: 1, why: "A carnivore eats other animals." },
        { q: "An animal eats the foods shown. Which word describes its diet?", a: "Omnivore", d: ["Carnivore", "Herbivore"], practice: 3, model: pictures("Foods it eats", [["🍓", "Berries"], ["🐟", "Fish"], ["🌰", "Nuts"]], "A menu of berries, fish and nuts."), why: "Berries and nuts come from plants; fish are animals. An omnivore eats both." },
        { q: "Sort these diets.", sort: { bins: ["Herbivore", "Carnivore", "Omnivore"], cards: [["Eats only grass and leaves", "Herbivore"], ["Eats only mice and fish", "Carnivore"], ["Eats seeds and insects", "Omnivore"]] }, practice: 3, why: "Herbivores eat plants, carnivores eat animals, and omnivores eat both." },
      ] },
      "comparing-animal-bodies": { objective: "Compare body structures and count familiar animal legs.", items: [
        { q: "What does a duck have on its body?", a: "Feathers", d: ["Fur", "A shell"], practice: 1, model: pictures("Look at the animal", [["🦆", "Duck"]], "A duck."), why: "A duck is a bird. Birds have feathers." },
        { q: "How many legs does a dog usually have?", n: 4, practice: 2, why: "A dog usually has two front legs and two back legs: four." },
        { q: "A robin and a bat both fly. Which body part do they both have?", a: "Wings", d: ["Feathers", "Fins"], practice: 3, model: pictures("Compare two animals", [["🐦", "Robin"], ["🦇", "Bat"]], "A robin and a bat."), why: "Both have wings. A robin has feathers, but a bat does not." },
      ] },
      "parts-of-the-human-body": { objective: "Name and locate basic body parts (this screen does not assess drawing a body).", items: [
        { q: "Which part does the arrow point to?", a: "The elbow", d: ["The knee", "The shoulder"], practice: 1, model: science({ type: "body", point: "elbow" }, "A standing child. The arrow points to the bend halfway along the arm."), why: "The elbow is where the arm bends between the shoulder and hand." },
        { q: "Put these parts in order down an arm, starting nearest the body.", order: ["Shoulder", "Elbow", "Hand"], practice: 3, why: "The shoulder joins the arm to the body. The elbow is next, then the hand at the end." },
        { q: "What is the part where your leg bends between your thigh and lower leg?", t: "knee", practice: 4, why: "Your knee is the joint where your leg bends." },
      ] },
      "our-five-senses": { objective: "Associate senses with body parts and apply them to everyday situations.", items: [
        { q: "Which sense uses this body part?", a: "Smell", d: ["Hearing", "Sight"], practice: 1, model: pictures("A body part", [["👃", "Nose"]], "A nose."), why: "Your nose helps you smell things." },
        { q: "Sort these things by the sense you would use.", sort: { bins: ["Hearing", "Sight"], cards: [["A bell ringing", "Hearing"], ["A dog barking", "Hearing"], ["The colour of a flower", "Sight"], ["Colours in a picture", "Sight"]] }, practice: 2, why: "Ears hear sounds. Eyes see the colours in flowers and pictures." },
        { q: "Bix feels that a scarf is soft. Which body part senses the touch?", a: "Skin", d: ["Tongue", "Ears"], practice: 4, why: "Skin senses touch, including how soft or rough something feels." },
      ] },
    },
    "everyday-materials": {
      "objects-and-materials": { objective: "Distinguish an object from its material and recognise that one material can make different objects.", items: [
        { q: "A spoon is made of wood. Which word names the material?", a: "Wood", d: ["Spoon", "Stirring"], practice: 1, why: "The spoon is the object. Wood is what it is made of." },
        { q: "Sort the words.", sort: { bins: ["Object", "Material"], cards: [["Chair", "Object"], ["Bottle", "Object"], ["Metal", "Material"], ["Glass", "Material"]] }, practice: 2, why: "Chair and bottle name things. Metal and glass name what things can be made of." },
        { q: "A wooden chair and a wooden ruler are different objects. What do they have in common?", a: "They are made from the same material", d: ["They are the same object", "They are the same size"], practice: 3, why: "Both are made of wood, even though they have different shapes and jobs." },
      ] },
      "naming-everyday-materials": { objective: "Name familiar materials from unambiguous objects and descriptions.", items: [
        { q: "What material is a pebble made of?", a: "Rock", d: ["Paper", "Fabric"], practice: 1, model: pictures("An object", [["🪨", "Pebble"]], "A small pebble."), why: "A pebble is a small piece of rock." },
        { q: "Sort these objects by their material.", sort: { bins: ["Wood", "Metal"], cards: [["A log from a tree", "Wood"], ["A plank cut from a tree", "Wood"], ["A steel paperclip", "Metal"], ["An iron nail", "Metal"]] }, practice: 2, why: "Logs and tree planks are wood. Steel and iron are metals." },
        { q: "Bix turns on a tap. Which material flows out?", t: "water", practice: 4, why: "Water is a material. It can flow and fill a container." },
      ] },
      "properties-of-materials": { objective: "Use simple property words and classify from described observations.", items: [
        { q: "A sponge soaks up water. Which word describes it?", a: "Absorbent", d: ["Waterproof", "Transparent"], practice: 1, why: "Absorbent means it soaks up water." },
        { q: "Sort these samples using the observations.", sort: { bins: ["Hard", "Soft"], cards: [["Sample A does not squash when pressed", "Hard"], ["Sample B squashes easily when pressed", "Soft"], ["Sample C does not squash when pressed", "Hard"]] }, practice: 2, why: "Hard samples resist squashing. Soft samples squash easily." },
        { q: "Bix can see clearly through a piece of clear plastic. Which word describes it?", a: "Transparent", d: ["Opaque", "Absorbent"], practice: 4, why: "Transparent means you can see through it. Opaque means you cannot." },
      ] },
      "grouping-materials": { objective: "Choose materials by their properties and use supplied absorbency observations.", items: [
        { q: "Which material would keep rain out of a toy umbrella?", a: "Plastic sheet", d: ["Tissue paper", "Cotton wool"], practice: 1, why: "Plastic sheet keeps water out. Tissue paper and cotton wool soak it up." },
        { q: "Sort these objects by whether they soak up water.", sort: { bins: ["Absorbent", "Not absorbent"], cards: [["Sponge", "Absorbent"], ["Paper towel", "Absorbent"], ["Kitchen foil", "Not absorbent"], ["Glass marble", "Not absorbent"]] }, practice: 2, why: "A sponge and paper towel soak up water. Foil and glass do not." },
        { q: "These example results show drops of water soaked up. Which sample was the most absorbent?", a: "The sponge sample", d: ["The paper sample", "The glass sample"], practice: 4, model: chart("Example absorbency results", "Drops", [["Sponge", 8], ["Paper", 3], ["Glass", 0]], "Example results from three material samples. The scale counts drops of water soaked up."), why: "The sponge soaked up 8 drops, more than the paper or glass. It was the most absorbent sample in this example." },
      ] },
    },
    "seasonal-changes": {
      "the-four-seasons": { objective: "Recognise UK seasonal signs and the repeating order of seasons.", items: [
        { q: "Which season comes just after spring?", a: "Summer", d: ["Winter", "Autumn"], practice: 1, why: "The seasons go spring, summer, autumn, winter, then spring again." },
        { q: "Put the seasons in order. Start with autumn.", order: ["Autumn", "Winter", "Spring", "Summer"], practice: 3, why: "Winter follows autumn, then spring and summer. The seasons repeat each year." },
        { q: "In the UK, many leaves turn brown and fall from trees. Which season is this most likely to be?", a: "Autumn", d: ["Spring", "Summer"], practice: 4, model: pictures("A seasonal sign", [["🍂", "Fallen brown leaves"]], "Brown leaves that have fallen from trees."), why: "Many deciduous trees lose their leaves in autumn." },
      ] },
      "weather-and-the-seasons": { objective: "Describe weather, interpret an example record and choose clothing for the conditions.", items: [
        { q: "A cloud has drops of water falling from it. What is the weather like?", a: "Rainy", d: ["Snowy", "Sunny"], practice: 1, model: pictures("Weather", [["🌧️", "Water drops falling from a cloud"]], "A cloud with water drops falling from it."), why: "Water drops falling from clouds are rain." },
        { q: "This example weather record covers 14 days. How many days were rainy?", n: 5, practice: 2, model: chart("Example weather record", "Days", [["Sunny", 6], ["Rainy", 5], ["Cloudy", 2], ["Windy", 1]], "An example two-week record with one bar for each kind of weather. The scale counts days."), why: "The rainy bar reaches 5 on the scale, so five days were rainy." },
        { q: "It is snowy and cold. What would help Bix stay warm outside?", a: "A coat, hat and gloves", d: ["Shorts and a vest", "A swimming costume"], practice: 4, why: "A coat, hat and gloves help keep Bix warm in cold weather." },
      ] },
      "day-length-through-the-year": { objective: "Compare daylight across UK seasons and interpret approximate daylight models.", items: [
        { q: "In the UK, which season has the longest daylight?", a: "Summer", d: ["Winter", "Autumn"], practice: 1, why: "Summer has more hours of daylight than winter." },
        { q: "Each sun box is one hour. About how many hours of daylight are shown?", n: 8, practice: 2, model: science({ type: "days", rows: [{ label: "A winter day near London", light: 8 }] }, "A day shown as 24 one-hour boxes. Sun boxes show daylight; the other boxes show darkness."), why: "There are eight sun boxes, so the picture shows about eight hours of daylight." },
        { q: "Put these days in order from least to most daylight.", order: ["A day in December", "A day in March", "A day in June"], practice: 3, model: science({ type: "days", rows: [{ label: "A day in March", light: 12 }, { label: "A day in June", light: 16 }, { label: "A day in December", light: 8 }] }, "Approximate daylight near London, shown with one box per hour for each of three days."), why: "These example days have about 8 hours in December, 12 in March and 16 in June." },
      ] },
    },
  },
});
