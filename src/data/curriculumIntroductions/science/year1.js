// Year 1 Science purpose screens, with observations and concrete examples.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";

const intro = (title, learn, use, ex, model) => ({ title, learn: Array.isArray(learn) ? learn : [learn], use, ex, model });
const pictures = (title, items, alt) => ({ renderer: "pictures", data: { title, items: items.map(([icon, label]) => ({ icon, label })) }, alt });
const science = (data, alt) => ({ renderer: "science", data, alt });
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });

export default defineIntroductions({
  year: 1, subject: "science",
  subjectIntro: intro("Look closely with Bix", ["Name plants, animals and parts of your body.", "Explore materials, weather and the seasons."],
    "Science helps you notice things on a walk. You can look for clues, compare what you find and say what you see.",
    "A duck has feathers. A dog has fur. Looking at their bodies helps us tell how they are alike and different.",
    pictures("Look for body clues", [["🦆", "Duck: feathers"], ["🐕", "Dog: fur"]], "A duck has feathers on its body. A dog has fur. Their body coverings are different.")),
  quests: {
    plants: {
      intro: intro("Meet the plants around you", ["Name common plants and trees.", "Spot their parts and look for changes through the year."],
        "Use these clues to talk about plants in a park, a garden or a wood. Look closely without pulling plants up.",
        "An oak has broad leaves in summer. In winter its branches may be bare. A pine keeps green needles through the year.",
        pictures("Two kinds of tree", [["🌳", "Oak: loses leaves in autumn"], ["🌲", "Pine: keeps green needles"]], "An oak loses its leaves in autumn. A pine keeps green needle-like leaves through the year.")),
      topics: {
        "wild-and-garden-plants": intro("Name a plant from its clues", "Look at flowers and leaves to name common plants.", "Spot familiar plants on a walk.", "A sunflower has a tall stem and a large yellow flower. A tulip has a cup-shaped flower.",
          pictures("Flower clues", [["🌻", "Sunflower: large yellow flower"], ["🌷", "Tulip: cup-shaped flower"]], "A sunflower has a tall stem and a large yellow flower. A tulip has a cup-shaped flower.")),
        "deciduous-and-evergreen-trees": intro("Trees through the year", "Name trees and compare their leaves in winter.", "Find out why some winter trees are bare while others are green.", "A deciduous tree loses its leaves in autumn. An evergreen tree keeps leaves through the year.",
          science({ type: "treePair", evergreenFirst: true }, "Two trees in winter: Tree A keeps its green needles and is evergreen. Tree B has bare branches and represents a deciduous tree.")),
        "parts-of-a-flowering-plant": intro("Look at a flowering plant", "Name the flower, petals, leaves, stem and roots.", "Use the right words when you draw or describe a plant.", "The flower is at the top. Its stem reaches down towards roots under the soil.",
          science({ type: "plant", point: "roots" }, "A flowering plant has a flower and petals at the top, leaves on its stem and roots below the soil. The arrow points to the roots.")),
        "parts-of-a-tree": intro("Explore a tree's parts", "Name a tree's trunk, branches, leaves, roots, bark, blossom and fruit.", "Describe what you see on a tree walk.", "Branches grow out from the thick trunk. Roots spread under the ground. Bark covers the trunk.",
          science({ type: "tree", point: "trunk" }, "A tree with leaves on branches, a thick upright trunk and roots below the ground. The arrow points to the trunk. Bark is the trunk's outer covering.")),
      },
    },
    "animals-including-humans": {
      intro: intro("Animals and you", ["Name animal groups and compare their bodies and foods.", "Find body parts and link them to the five senses."],
        "These ideas help you describe an animal and explain how you notice the world. Humans are animals too.",
        "Your ears help you hear a bell. Your eyes help you see its colour. Different body parts help with different senses.",
        pictures("Body parts and senses", [["👂", "Ears: hearing"], ["👁️", "Eyes: sight"], ["👃", "Nose: smell"]], "Ears are linked with hearing, eyes with sight and the nose with smell.")),
      topics: {
        "fish-amphibians-reptiles-birds-and-mammals": intro("Look for animal group clues", "Name fish, amphibians, reptiles, birds and mammals.", "Use body clues to group an animal you see.", "A penguin has feathers, so it is a bird. A bat has fur and feeds its babies milk, so it is a mammal.",
          pictures("Flying is not the only clue", [["🐧", "Penguin: bird, with feathers"], ["🦇", "Bat: mammal, with fur"]], "A penguin is a bird with feathers even though it does not fly. A bat is a mammal with fur even though it can fly.")),
        "carnivores-herbivores-and-omnivores": intro("What does an animal eat?", "Group animals by whether they eat plants, animals or both.", "Understand why animals need different foods.", "A cow eats plants and is a herbivore. A lion eats animals and is a carnivore. An omnivore eats both.",
          pictures("Food gives us clues", [["🐄", "Cow: plants — herbivore"], ["🦁", "Lion: animals — carnivore"], ["🐔", "Chicken: plants and animals — omnivore"]], "A cow eats plants and is a herbivore. A lion eats animals and is a carnivore. A chicken eats seeds and insects and is an omnivore.")),
        "comparing-animal-bodies": intro("Alike and different", "Compare animal coverings, legs, wings, fins and beaks.", "Explain how two animals' bodies are alike or different.", "A robin and a bat both have wings. The robin has feathers, but the bat has fur.",
          pictures("Compare two flying animals", [["🐦", "Robin: wings and feathers"], ["🦇", "Bat: wings and fur"]], "A robin and a bat both have wings. A robin has feathers while a bat has fur.")),
        "parts-of-the-human-body": intro("Name the parts of your body", "Find and name familiar body parts.", "Use clear words to describe where a sleeve or shoe fits.", "Your arm joins your body at the shoulder. It bends at the elbow. Your hand is at its end.",
          science({ type: "body", point: "elbow" }, "A standing child with head, neck, arms, hands, legs and feet. The arrow points to the elbow, where the arm bends between the shoulder and hand.")),
        "our-five-senses": intro("Use your senses", "Link sight, hearing, smell, taste and touch to body parts.", "Explain how you notice sounds, colours, smells and textures.", "You use your nose to smell a flower and your skin to feel a soft scarf.",
          pictures("Body parts and their senses", [["👁️", "Eyes: sight"], ["👂", "Ears: hearing"], ["👃", "Nose: smell"], ["👅", "Tongue: taste"], ["✋", "Skin: touch"]], "Eyes help with sight, ears with hearing, the nose with smell, the tongue with taste and skin with touch.")),
      },
    },
    "everyday-materials": {
      intro: intro("What are things made of?", ["Tell an object from its material.", "Name, describe and group materials."],
        "Look at things at home or school. Their materials help explain why they feel different and suit different jobs.",
        "A spoon is an object. It may be made of wood or metal. A sponge soaks up water, while a plastic sheet keeps it out.",
        table("Objects and materials", ["Object", "Material", "A useful property"], [["Spoon", "Wood", "Hard"], ["Rain cover", "Plastic sheet", "Keeps water out"]], "A spoon can be made of hard wood. A rain cover can be made of plastic sheet that keeps water out.")),
      topics: {
        "objects-and-materials": intro("Object or material?", "Tell the name of a thing from the name of its material.", "Describe what a classroom object is made of.", "A spoon is an object. Wood is a material. A wooden spoon and a wooden ruler are different objects made of the same material.",
          table("One material, two objects", ["Object", "Material"], [["Spoon", "Wood"], ["Ruler", "Wood"]], "A spoon and a ruler are different objects. These two examples are both made of wood.")),
        "naming-everyday-materials": intro("Meet familiar materials", "Name materials such as wood, plastic, glass, metal, water and rock.", "Use a material's name when you describe an object.", "A log is made of wood. A pebble is made of rock. Water is a material too.",
          pictures("Name what things are made of", [["🪵", "Log: wood"], ["🪨", "Pebble: rock"], ["💧", "Water"]], "A log is made of wood, a pebble is made of rock, and a drop from a tap is water.")),
        "properties-of-materials": intro("What is a material like?", "Use words such as hard, soft, rough, smooth and absorbent.", "Compare samples by looking and by using simple observations.", "A sponge soaks up water, so it is absorbent. A rock does not squash easily, so it is hard.",
          pictures("Two property clues", [["🧽", "Sponge: soft and absorbent"], ["🪨", "Rock: hard"]], "A sponge squashes easily and soaks up water, so it is soft and absorbent. A rock does not squash easily, so it is hard.")),
        "grouping-materials": intro("Find a material for the job", "Group materials by shared properties and compare simple test results.", "Choose something to wipe up a spill or keep rain out.", "A paper towel soaks up water. Foil does not. The towel is better for wiping up a spill.",
          table("Compare what happened", ["Sample", "Water observation"], [["Paper towel", "Soaked up water"], ["Foil", "Did not soak up water"]], "In this example, a paper towel soaked up water while foil did not. The towel is useful for wiping up a spill.")),
      },
    },
    "seasonal-changes": {
      intro: intro("Watch the year change", ["Name the four seasons in order.", "Notice weather, trees and changing daylight in the UK."],
        "These clues help you describe a walk and choose clothes for the weather. Looking again over time helps you spot changes.",
        "Summer usually has longer daylight than winter. Many trees lose leaves in autumn and grow new leaves in spring.",
        pictures("A year keeps turning", [["🌸", "Spring: new growth"], ["☀️", "Summer: longer daylight"], ["🍂", "Autumn: falling leaves"], ["❄️", "Winter: shorter daylight"]], "The year goes spring, summer, autumn, winter and back to spring. These pictures show common UK signs, not weather guaranteed every day.")),
      topics: {
        "the-four-seasons": intro("A cycle of four seasons", "Name the UK seasons and spot changes in nature.", "Describe changes you notice on the same walk through the year.", "Spring comes after winter. New leaves open on many trees. Summer follows, then autumn and winter again.",
          pictures("The season cycle", [["🌸", "1. Spring"], ["☀️", "2. Summer"], ["🍂", "3. Autumn"], ["❄️", "4. Winter — then spring again"]], "The repeating order is spring, summer, autumn and winter, followed by spring again.")),
        "weather-and-the-seasons": intro("Describe today's weather", "Name weather and compare what is more likely in each season.", "Choose clothes to suit the weather outside.", "Snow is more likely in a UK winter. Rain can fall in any season. A weather record tells us what happened on particular days.",
          pictures("Watch what falls", [["🌧️", "Rain: water drops"], ["🌨️", "Snow: snowflakes"], ["☀️", "Sunny: clear sunshine"]], "Rain falls as water drops, snow falls as snowflakes and sunny weather has sunshine. Rain can happen in any UK season.")),
        "day-length-through-the-year": intro("More light or less light?", "Compare the hours of daylight through the UK year.", "Explain why it may be light at bedtime in summer but dark after school in winter.", "Near London, a June day has about 16 hours of daylight. A December day has about 8.",
          science({ type: "days", rows: [{ label: "June near London", light: 16 }, { label: "December near London", light: 8 }] }, "Two days shown in one-hour boxes. The June example has sixteen daylight boxes; the December example has eight. These are rounded amounts of daylight near London.")),
      },
    },
  },
});
