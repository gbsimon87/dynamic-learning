import { fact as f, groups as g, sentence as s, sequence as o, measurement as n } from "./engine.js";
import { rule } from "../figures.js";

// Evolution and inheritance. No genes or chromosomes (statutory note): offspring are alike but vary,
// characteristics are passed on, and over a very long time helpful ones can lead to evolution.
const scene = (backdrop, alt, items, extra = {}) => ({ type: "scene", backdrop, alt, items, ...extra });

const footprintTable = { headings: ["Fossil footprint", "Length of the footprint (cm)"], rows: [["Footprint A", 12], ["Footprint B", 45], ["Footprint C", 30]] };
const puppyTable = { headings: ["Puppy", "Mass at 8 weeks (kg)"], rows: [["Rex", 4], ["Bea", 6], ["Max", 5], ["Dot", 7]] };
const sunflowerTable = { headings: ["Plant grown from one sunflower's seeds", "Height (cm)"], rows: [["Plant A", 150], ["Plant B", 175], ["Plant C", 160], ["Plant D", 190]] };
const beakTable = { headings: ["Bird", "Beak", "Food it eats"], rows: [["Bird A", "Short and thick", "Seeds"], ["Bird B", "Long and thin", "Nectar"], ["Bird C", "Hooked and sharp", "Meat"]] };
const modelBeakTable = { headings: ["Model beak", "Seeds picked up in 1 minute"], rows: [["Pliers", 24], ["Tweezers", 12], ["Spoon", 3]] };
const flowerTable = { headings: ["Flowers", "Insect visits in 10 minutes"], rows: [["Bright and scented", 24], ["Bright, no scent", 14], ["Dull but scented", 9], ["Dull, no scent", 4]] };
const jarTable = { headings: ["Jar wrapped in", "Water temperature after 10 minutes (°C)"], rows: [["Nothing", 22], ["Feathers", 35], ["Fur", 38], ["Lard", 41]] };
const finchTable = { headings: ["Generation", "Finches with big beaks (out of 100)"], rows: [["Generation 1", 20], ["Generation 2", 35], ["Generation 3", 55], ["Generation 4", 70]] };
const foxTable = { headings: ["Fur", "Foxes alive in spring (out of 20)"], rows: [["Thick fur", 17], ["Medium fur", 11], ["Thin fur", 4]] };

export const evolution = {
  "fossils-as-evidence": {
    rule: "Fossils are the remains or traces of living things that died long ago, usually preserved in rock. They give us information about plants and animals that lived millions of years ago, and show that living things have changed over time.",
    hint: "Think about what a fossil is, how it forms in rock, and what scientists can learn by comparing it with living things today.",
    facts: [
      f("What is a fossil?", "The preserved remains or traces of a living thing from long ago", "A rock that has been polished smooth", "A living thing that is hiding underground"),
      f("Many fossils show animals that lived how long ago?", "Millions of years ago", "Last week", "Only a few hundred years ago"),
      f("In which type of rock are fossils usually found?", "Sedimentary rock", "Igneous rock formed from cooled lava", "Newly formed lava"),
      f("What do we call a scientist who studies fossils?", "A palaeontologist", "An astronomer", "A meteorologist"),
      f("Which parts of an animal are most likely to become fossils?", "Hard parts such as bones, teeth and shells", "Soft parts such as skin and muscle", "Parts that are still alive"),
      f("What can fossils tell scientists?", "What living things looked like long ago", "What the weather will be next week", "How to melt rocks"),
      f("A fossil looks different from every animal alive today. What does this show?", "Living things have changed over time", "The fossil must be fake", "The animal is still living nearby"),
      f("Who found important fossils of sea reptiles in the cliffs at Lyme Regis in the early 1800s?", "Mary Anning", "Isaac Newton", "Jane Goodall"),
      f("How do we know about dinosaurs, which died out long before people lived?", "From their fossils", "From photographs", "From stories written by dinosaurs"),
      f("A shell is buried under layers of mud. What happens to the mud over millions of years?", "It is squashed and hardens into rock", "It turns into a living thing", "It floats away as a gas"),
      f("Why do scientists compare fossils with living animals today?", "To find out how living things have changed", "To make the fossils bigger", "To decide which one is prettier"),
      f("Which of these is a fossil?", "An ammonite shape preserved in stone", "A leaf that fell this morning", "A toy dinosaur"),
    ],
    sorts: [
      g("Sort each find: fossil or not a fossil?", ["Fossil", "Not a fossil"], [["A shell shape preserved in rock", 0], ["A dinosaur footprint in stone", 0], ["A fish skeleton turned to stone", 0], ["A shell on the beach from last week", 1], ["A chicken bone from dinner", 1], ["A plastic toy dinosaur", 1]]),
      g("Sort each statement about fossils.", ["True", "False"], [["Fossils are found in rock", 0], ["Many fossils are millions of years old", 0], ["Fossils help us learn about animals that are extinct", 0], ["Fossils form quickly in a few days", 1], ["Fossils are the remains of animals that died yesterday", 1], ["Fossils show that living things never change", 1]]),
      g("Sort each part of a dead animal by whether it often becomes a fossil.", ["Often becomes a fossil", "Rarely becomes a fossil"], [["Teeth", 0], ["Bones", 0], ["A hard shell", 0], ["Muscle", 1], ["The stomach", 1], ["The eyes", 1]]),
    ],
    structures: [
      o("Order how a fossil forms, starting with the first step.", ["An animal dies and sinks into mud", "Layers of mud and sand cover the body", "The hard parts slowly turn to stone", "Rock wears away and the fossil is found"]),
      s("Build a sentence about fossils.", "Fossils are the remains of ancient living things."),
      s("Build a sentence about Mary Anning.", "Mary Anning found fossils at Lyme Regis."),
      s("Build a sentence about palaeontologists.", "Palaeontologists study fossils to learn about the past."),
      g("Sort each question by whether fossils can help to answer it.", ["Fossils can help", "Fossils cannot help"], [["How big was the animal?", 0], ["What did its teeth look like?", 0], ["Did it live in the sea?", 0], ["What was its name?", 1], ["What song did it sing?", 1], ["What did it dream about?", 1]]),
    ],
    enquiries: [
      { ...n("Look at the fossil footprints. How many centimetres longer is footprint B than footprint A?", 33), table: footprintTable },
      { ...f("Look at the fossil footprints. Bigger animals make longer footprints. Which footprint was made by the biggest animal?", "Footprint B", "Footprint A", "Footprint C"), table: footprintTable },
      f("Mary Anning's discoveries showed skeletons that looked like no animal alive today. What did this help scientists to see?", "Animals that no longer exist once lived on Earth", "The sea has never changed", "Fossils grow from seeds"),
      f("Which of these is evidence from a fossil, rather than an opinion?", "The fossil has sharp teeth", "Fossils are the best thing in the world", "I think the museum is boring"),
      f("Leo finds a fossil fern in a rock. What does it show about the place long ago?", "Plants once grew there", "It was always a desert", "Ferns have never lived on Earth"),
      n("Fossil A is 250 million years old and fossil B is 100 million years old. How many millions of years older is fossil A?", 150),
      f("Leo makes model fossils by pressing a shell into clay. He tests whether pressing harder makes a deeper print. Which should he keep the same?", "The shell and the clay", "How hard he presses", "The depth of the print"),
      f("Why can scientists not be certain exactly what a long-extinct animal looked like?", "Only some parts of it became fossils", "Fossils are always fake", "Animals never leave fossils"),
      o("Order the steps a palaeontologist follows, starting with the first step.", ["Find a fossil in the rock", "Carefully dig it out and record where it was found", "Compare it with living animals and other fossils", "Share the findings with other scientists"]),
      s("Maya finds a fossil shell high on a hill and writes a conclusion.", "A sea animal lived here long ago."),
      g("Sort Ellie's notes about a fossil: evidence or opinion?", ["Evidence", "Opinion"], [["The fossil has 20 sharp teeth", 0], ["The rock around it is hard stone", 0], ["The shell print is 8 cm wide", 0], ["Fossils are boring", 1], ["Dinosaurs were the best animals", 1], ["This fossil is the prettiest", 1]]),
      o("Order these fossils from the oldest to the youngest.", ["A fossil 300 million years old", "A fossil 150 million years old", "A fossil 65 million years old", "A fossil 10 million years old"]),
    ],
  },

  "inheritance-and-variation": {
    rule: "Living things produce offspring of the same kind: dogs have puppies and cats have kittens. Offspring are alike their parents in some ways because characteristics are passed on, but they are not identical to their parents or to each other. These differences are called variation.",
    hint: "Offspring are the same kind as their parents and have some of their characteristics, but they are never exactly the same.",
    facts: [
      f("What are the young of an animal or plant called?", "Offspring", "Habitats", "Fossils"),
      f("A labrador has puppies. What kind of animals will the puppies be?", "Dogs", "Cats", "A mixture of dogs and cats"),
      f("What do we call the differences between living things of the same kind?", "Variation", "Evaporation", "Condensation"),
      f("Are offspring usually identical to their parents?", "No, they are alike in some ways but different in others", "Yes, they are exact copies", "No, they are completely different animals"),
      f("Which characteristic can be passed from parents to their offspring?", "Fur colour", "A scar from a cut", "A new haircut"),
      f("Two rabbits have four babies. What is true about the babies?", "They are all rabbits but may look a little different from each other", "They will all look exactly the same", "Some of them will be hamsters"),
      f("Which of these varies from one person to another?", "Eye colour", "Needing to eat", "Having a heart"),
      f("A labrador and a poodle have puppies. What are the puppies called?", "Crossbreeds, often called labradoodles", "Pure breeds", "Wolves"),
      f("Why are puppies in the same litter not all identical?", "Each puppy inherits a different mixture of characteristics from its parents", "Puppies copy each other", "Each puppy is a different kind of animal"),
      f("Why do dog breeders choose which dogs to breed together?", "To get puppies with the characteristics they want", "To turn the puppies into cats", "To stop puppies having parents"),
      f("A tulip plant makes seeds that grow into new tulip plants. What are the new plants like?", "Tulips, but with some differences", "Roses", "Exact copies of each other"),
      f("Which pair shows living things of the same kind that vary?", "Two cats, one black and one ginger", "A cat and a dog", "A rose and a daisy"),
    ],
    sorts: [
      g("Sort each characteristic: is it passed on from parents?", ["Passed on from parents", "Not passed on"], [["Eye colour", 0], ["Fur colour", 0], ["Natural hair colour", 0], ["A broken leg", 1], ["A scar from a cut", 1], ["Knowing how to read", 1]]),
      g("Sort what is the same and what can differ in a litter of kittens.", ["The same for all the kittens", "Can differ between kittens"], [["They are all cats", 0], ["They all have whiskers", 0], ["They all drink milk when newborn", 0], ["Fur colour", 1], ["Size", 1], ["Patterns on the fur", 1]]),
      g("Sort these statements about offspring.", ["True", "False"], [["Offspring are the same kind as their parents", 0], ["Brothers and sisters can look different", 0], ["A labradoodle has a labrador parent and a poodle parent", 0], ["All puppies look exactly like their mother", 1], ["A cat can have puppies", 1], ["Offspring are always identical to each other", 1]]),
    ],
    structures: [
      o("Order what happens when a labrador and a poodle have puppies, starting with the first step.", ["A labrador and a poodle are chosen as parents", "The mother has a litter of puppies", "Each puppy inherits a mixture from both parents", "Each puppy grows up looking slightly different"]),
      s("Build a sentence about offspring.", "Offspring are not identical to their parents."),
      s("Build a sentence about variation.", "Variation is the differences between offspring."),
      s("Build a sentence about labradoodles.", "A labradoodle has a labrador and a poodle parent."),
      g("Sort each example by whether it shows variation.", ["Shows variation", "Does not show variation"], [["One kitten is ginger and its sister is black", 0], ["One puppy is bigger than its brother", 0], ["Two sunflowers from one plant grow to different heights", 0], ["All the kittens have whiskers", 1], ["All the puppies have four legs", 1], ["Both sunflowers have petals", 1]]),
    ],
    enquiries: [
      { ...f("Look at the table of puppy masses. What does it show about puppies from one litter?", "They are the same kind but vary in mass", "They all have identical mass", "They are different kinds of animal"), table: puppyTable },
      { ...n("Look at the puppy masses. How many kilograms heavier is the heaviest puppy than the lightest puppy?", 3), table: puppyTable },
      { ...n("Look at the sunflowers. How many centimetres taller is the tallest plant than the shortest plant?", 40), table: sunflowerTable },
      { ...f("These sunflowers all grew from seeds of one parent plant. What is the best conclusion?", "Offspring of the same parent plant can vary in height", "Offspring are always the same height as the parent", "Taller sunflowers are always older"), table: sunflowerTable },
      f("Leo wants to find out whether seeds from one sunflower grow to different heights. Which should he keep the same?", "The soil, water and light each seed gets", "The height each plant grows to", "The number of leaves each plant grows"),
      f("Which of these is evidence that offspring vary?", "The five kittens have five different fur patterns", "I think kittens are cute", "My cat is the best cat"),
      f("Ellie says every puppy in a litter is identical. What evidence would show she is wrong?", "Measuring the puppies and finding different masses and colours", "Asking the puppies", "Taking a photo of just one puppy"),
      f("A farmer breeds only his fastest horses together. Why?", "Their foals may inherit the characteristic of being fast", "To turn the foals into donkeys", "Because slow horses are not horses"),
      o("Order the steps to investigate variation in a litter of puppies, starting with the first step.", ["Choose a characteristic to measure, such as mass", "Weigh each puppy", "Put the results in a table", "Describe how much the puppies vary"]),
      s("Leo writes a conclusion about his kittens.", "The kittens vary but are all cats."),
      g("Sort the claims about Maya's puppy table.", ["Supported by the results", "Not supported"], [["The puppies had different masses", 0], ["Dot was the heaviest puppy", 0], ["Rex was the lightest puppy", 0], ["The puppies all had the same mass", 1], ["Bea was the lightest puppy", 1], ["Max was heavier than Dot", 1]], { table: puppyTable }),
      o("Order these puppies from the lightest to the heaviest.", ["Rex, 4 kg", "Max, 5 kg", "Bea, 6 kg", "Dot, 7 kg"], { table: puppyTable }),
    ],
  },

  adaptation: {
    rule: "An adaptation is a feature or behaviour that helps a living thing survive in its habitat. Animals and plants are adapted in different ways, and each adaptation has advantages and sometimes disadvantages.",
    hint: "Ask what job the feature does for the animal or plant in the place where it lives.",
    facts: [
      f("What is an adaptation?", "A feature or behaviour that helps a living thing survive in its habitat", "A rock shaped by flowing water", "A fossil found in a cliff"),
      f("Why do fish have gills?", "To take oxygen from the water", "To breathe air at the surface", "To walk on land"),
      f("A dolphin has lungs, not gills. What must it do?", "Come to the surface to breathe air", "Stay underwater all the time", "Breathe through its fins"),
      f("What do tendrils help a climbing plant such as a pea do?", "Hold on to something and climb towards the light", "Soak up water from the soil", "Make seeds"),
      f("Why are many flowers brightly coloured and scented?", "To attract insects that carry pollen", "To scare insects away", "To hide in the grass"),
      f("A hummingbird has a long, thin beak. What is it good for?", "Reaching nectar inside flowers", "Cracking hard seeds", "Tearing meat"),
      f("A finch has a short, thick beak. What is it good for?", "Cracking seeds", "Reaching nectar deep inside flowers", "Catching fish"),
      f("Which adaptation helps an owl catch mice?", "Sharp, curved claws", "Webbed feet", "A very small beak"),
      f("What is an advantage of walking on two feet instead of four?", "The hands are free to carry and use things", "It helps an animal swim", "It gives an animal more legs"),
      f("What is a disadvantage of walking on two feet instead of four?", "It is harder to balance", "The hands cannot be used", "It makes an animal grow gills"),
      f("A water lily has leaves that float on the surface. How does this help the plant?", "The leaves can reach sunlight", "The leaves can catch fish", "The leaves stay in the dark"),
      f("Which feature helps a fish to swim quickly?", "A streamlined body", "Thick fur", "Four legs"),
    ],
    sorts: [
      g("Sort each adaptation by what it helps with.", ["Helps get food", "Helps avoid being eaten"], [["A heron's long beak", 0], ["A hawk's sharp claws", 0], ["A bee's long tongue", 0], ["A stick insect that looks like a twig", 1], ["A hedgehog's spines", 1], ["A skunk's bad smell", 1]]),
      g("Sort each animal by how it breathes.", ["Breathes with gills", "Breathes with lungs"], [["Salmon", 0], ["Goldfish", 0], ["Shark", 0], ["Dolphin", 1], ["Whale", 1], ["Dog", 1]]),
      g("Sort each plant feature by its job.", ["Helps a plant climb", "Helps a plant attract insects"], [["Tendrils on a pea plant", 0], ["Twining stems of a bean", 0], ["Hooks on a bramble stem", 0], ["Bright petals", 1], ["A sweet scent", 1], ["Nectar inside the flower", 1]]),
    ],
    structures: [
      o("Order how a flower and a bee help each other, starting with the first step.", ["A bee is attracted by a bright, scented flower", "The bee lands and drinks nectar", "Pollen sticks to the bee", "The bee carries the pollen to another flower"]),
      s("Build a sentence about gills.", "Gills take oxygen from the water."),
      s("Build a sentence about tendrils.", "Tendrils help climbing plants reach the light."),
      s("Build a sentence about adaptations.", "An adaptation helps a living thing survive."),
      g("A bird has a very long beak. Sort each effect.", ["Advantage", "Disadvantage"], [["It can reach nectar deep in flowers", 0], ["It can probe deep into mud for worms", 0], ["It can reach food that other birds cannot", 0], ["It cannot crack open hard nuts", 1], ["It is harder to use for picking up tiny seeds", 1], ["It can be damaged more easily", 1]]),
    ],
    enquiries: [
      { ...f("Look at the table. What pattern do the results show?", "The shape of a beak matches the food the bird eats", "All birds eat seeds", "Beak shape makes no difference to food"), table: beakTable },
      { ...n("Leo tests model beaks on seeds. How many more seeds did the pliers pick up than the spoon?", 21), table: modelBeakTable },
      { ...f("Looking at Leo's model beak results, which model beak is best for a bird that eats seeds?", "Pliers", "Tweezers", "Spoon"), table: modelBeakTable },
      f("Leo tests how well model beaks pick up seeds. Which should he keep the same?", "The time allowed and the type of seeds", "The type of model beak", "The number of seeds picked up"),
      f("A bird has webbed feet and a flat bill. Where is it most likely to live?", "On or near water", "In a desert", "Underground"),
      f("A heron stands in a pond with long legs and a long beak. What is the long beak most useful for?", "Catching fish and frogs in the water", "Cracking nuts", "Drinking nectar"),
      { ...n("Maya counts insect visits to flowers. How many more visits did the bright and scented flowers get than the dull flowers with no scent?", 20), table: flowerTable },
      { ...f("Looking at Maya's flower results, what do they suggest about bright, scented flowers?", "They attract more insects", "They attract fewer insects", "They have no effect on insects"), table: flowerTable },
      o("Order the steps of Leo's model beak test, starting with the first step.", ["Choose the model beaks and the seeds", "Time one minute for each beak", "Count the seeds each beak picked up", "Write a conclusion about the best beak"]),
      s("Maya writes a conclusion from her flower results.", "Bright scented flowers attracted the most insects."),
      g("Sort the claims about Leo's model beak results.", ["Supported by the results", "Not supported"], [["The pliers picked up the most seeds", 0], ["The spoon picked up the fewest seeds", 0], ["The tweezers beat the spoon", 0], ["The spoon was the best at picking up seeds", 1], ["All the beaks picked up the same number", 1], ["The tweezers picked up the most seeds", 1]], { table: modelBeakTable }),
      o("Order these flowers from the fewest insect visits to the most insect visits.", ["Dull, no scent", "Dull but scented", "Bright, no scent", "Bright and scented"], { table: flowerTable }),
    ],
  },

  "adapting-to-extreme-places": {
    rule: "Some places are very hot, very cold, very dry or very deep. Living things there have adaptations that help them survive: a cactus stores water, a camel's hump stores fat, and polar animals have thick fur or fat to keep warm.",
    hint: "Ask what is hard about the place, such as heat, cold, dryness or darkness, and how the feature helps with it.",
    facts: [
      f("Where does a cactus store water for dry weather?", "In its thick, fleshy stem", "In its flowers", "In its spines"),
      f("Why does a cactus have spines instead of broad leaves?", "To lose less water and to stop animals eating it", "To catch more sunlight", "To keep the cactus warm"),
      f("What does a camel's hump store?", "Fat that it can use for energy", "Water", "Sand"),
      f("How do a camel's wide, flat feet help it?", "They stop it sinking into soft sand", "They help it swim", "They help it climb trees"),
      f("Why do camels have long eyelashes?", "To keep sand out of their eyes", "To attract insects", "To keep warm"),
      f("What keeps a penguin warm in freezing air and water?", "A layer of fat and thick, waterproof feathers", "Thin, bare skin", "A coat of leaves"),
      f("Why is a polar bear's white fur useful?", "It helps the bear blend in with the snow and ice", "It helps the bear hide in the desert", "It makes the bear glow in the dark"),
      f("How is an Arctic fox adapted to the cold?", "It has thick fur and small, rounded ears", "It has thin fur and huge ears", "It sleeps in the sun all day"),
      f("Deep in the ocean it is very dark. How do some deep-sea fish cope?", "Some make their own light", "They need bright sunlight to see", "They live near the surface in the sun"),
      f("Which place is a cactus adapted to?", "A hot, dry desert", "The icy Arctic", "The deep sea"),
      f("Why do penguins huddle together in a big group?", "To share their body heat", "To find the sun", "To catch more fish"),
      f("Which feature keeps a seal warm in cold seas?", "A thick layer of fat called blubber", "Thin skin", "Long thin feathers"),
    ],
    sorts: [
      g("Sort each living thing by where it lives.", ["Hot desert", "Cold polar region", "Deep sea"], [["Camel", 0], ["Cactus", 0], ["Penguin", 1], ["Polar bear", 1], ["Anglerfish", 2], ["Giant squid", 2]]),
      g("Sort each adaptation by the animal it belongs to.", ["Camel", "Penguin"], [["Wide, flat feet", 0], ["A hump of fat", 0], ["Long eyelashes", 0], ["A thick layer of fat under the skin", 1], ["Waterproof feathers", 1], ["Flippers for swimming", 1]]),
      g("Sort these statements about extreme places.", ["True", "False"], [["A camel's hump stores fat", 0], ["Penguins have a layer of fat under the skin", 0], ["Some deep-sea animals make their own light", 0], ["A camel's hump stores water", 1], ["A cactus has thin leaves to lose water", 1], ["Penguins live in hot deserts", 1]]),
    ],
    structures: [
      o("Order how a camel survives a long desert journey, starting with the first step.", ["The camel eats plenty of food", "Fat is stored in its hump", "The camel travels for days with little food", "It uses the stored fat for energy"]),
      s("Build a sentence about camels.", "A camel stores fat in its hump."),
      s("Build a sentence about cactuses.", "A cactus stores water in its stem."),
      s("Build a sentence about polar bears.", "Thick fur and fat keep a polar bear warm."),
      g("Sort each adaptation by the problem it solves.", ["Helps keep warm in the cold", "Helps survive in the desert"], [["A seal's blubber", 0], ["A penguin's feathers", 0], ["An Arctic fox's thick fur", 0], ["A cactus's spines", 1], ["A camel's wide feet", 1], ["A camel's long eyelashes", 1]]),
    ],
    enquiries: [
      { ...n("The water in each jar started at 50 °C. By how many degrees did the water in the bare jar cool?", 28), table: jarTable },
      { ...n("Look at the jar results. How many degrees warmer was the water in the lard jar than in the bare jar?", 19), table: jarTable },
      { ...f("Looking at the jar results, which wrapping was the best insulator?", "Lard", "Nothing", "Feathers"), table: jarTable },
      f("Leo tests how well different wrappings keep warm water warm. Which should he keep the same?", "The starting temperature of the water and the size of the jars", "The material around the jar", "The final temperature"),
      f("Ellie's results show that fur and fat keep water warmer than no wrapping. What does this suggest about polar animals?", "Fur and fat help them stay warm", "They would be warmer without fur and fat", "Cold has no effect on them"),
      f("Maya wants to check what a camel's hump stores. Which is the best source?", "A science book or museum website written by experts", "A rumour from a friend", "A cartoon"),
      f("Leo reads that a fennec fox has huge ears. What problem might the ears help with?", "Losing extra heat in the hot desert", "Keeping warm in the snow", "Storing water"),
      f("Why does an Arctic fox grow a white coat in winter?", "It blends in with the snow", "It glows in the dark", "It gets darker to hide on the ice"),
      o("Order the steps of Leo's insulation test, starting with the first step.", ["Fill four jars with water at 50 °C", "Wrap each jar in a different material", "Measure the temperature after 10 minutes", "Compare the readings to find the best insulator"]),
      s("Ellie writes a conclusion about her jars.", "Lard kept the water the warmest."),
      g("Sort the claims about Ellie's jar results.", ["Supported by the results", "Not supported"], [["The jar with nothing around it cooled the most", 0], ["Lard kept the water warmest", 0], ["Fur kept the water warmer than feathers", 0], ["Feathers kept the water warmest", 1], ["The bare jar stayed at 50 °C", 1], ["Lard was the worst insulator", 1]], { table: jarTable }),
      o("Order the wrappings from the coldest water to the warmest water.", ["Nothing", "Feathers", "Fur", "Lard"], { table: jarTable }),
    ],
  },

  evolution: {
    rule: "Offspring vary, and some have characteristics that help them survive better in their habitat. They are more likely to survive, have young and pass those characteristics on. Over a very long time, this can lead to evolution: living things slowly change.",
    hint: "Ask which offspring survive and have young, and which characteristics they pass on.",
    facts: [
      f("What is evolution?", "Living things slowly changing over a very long time", "One animal changing in a single day", "A rock turning into a fossil"),
      f("Which scientist, together with Alfred Russel Wallace, developed the idea of evolution?", "Charles Darwin", "Galileo", "Marie Curie"),
      f("Which islands did Charles Darwin visit, where he studied finches?", "The Galápagos Islands", "The Isle of Wight", "The Orkney Islands"),
      f("Darwin noticed that finches on different islands had different what?", "Beak shapes", "Numbers of legs", "Colours of eggs"),
      f("Offspring in a group vary. Which ones are more likely to survive?", "Those best suited to their habitat", "Those that are always the biggest", "Those that look the same as everyone else"),
      f("What do surviving animals pass on to their offspring?", "Their helpful characteristics", "Injuries they got during their lives", "Things they learned at school"),
      f("Long ago some giraffes had slightly longer necks than others. Why were they more likely to survive when food was hard to find?", "They could reach leaves that others could not", "They could run faster through the trees", "They could swim better"),
      f("How long does it take for evolution to cause big changes?", "Many thousands or millions of years", "A few days", "One afternoon"),
      f("In a very cold place, which Arctic foxes were more likely to survive and have young?", "Those with thicker fur", "Those with thinner fur", "Those with no fur"),
      f("Alfred Russel Wallace worked out similar ideas to Darwin. What did he study?", "Animals and plants in the rainforests of South America and Asia", "Only rocks on the Moon", "Only fossils at Lyme Regis"),
      f("Does a single animal evolve during its own life?", "No, evolution happens over many generations", "Yes, in a few weeks", "Yes, whenever it wants to"),
      f("Which is evidence for evolution?", "Fossils that show how animals have changed over time", "A pupil's favourite animal", "A film about monsters"),
    ],
    sorts: [
      g("Sort each statement about evolution.", ["True", "False"], [["Offspring vary from each other", 0], ["Helpful characteristics can be passed on", 0], ["Evolution takes a very long time", 0], ["Animals change on purpose to fit in", 1], ["Evolution happens in a single lifetime", 1], ["Every offspring is identical", 1]]),
      g("Sort each variation by whether it would help an animal survive in the Arctic.", ["Helpful in the Arctic", "Not helpful in the Arctic"], [["Thick fur", 0], ["White fur in the snow", 0], ["A thick layer of fat", 0], ["Thin fur", 1], ["Dark fur on white snow", 1], ["Very large ears that lose heat", 1]]),
      g("Sort each clue by whether it is evidence for evolution.", ["Evidence", "Not evidence"], [["Fossils of animals that no longer exist", 0], ["Finches with different beaks on different islands", 0], ["Offspring that vary in their characteristics", 0], ["A pupil's guess", 1], ["A character in a film", 1], ["A rumour online", 1]]),
    ],
    structures: [
      o("Order how a helpful characteristic can spread, starting with the first step.", ["Offspring vary and some have longer necks", "Long-necked giraffes reach more food and survive", "The survivors have young and pass on long necks", "After a very long time most giraffes have long necks"]),
      s("Build a sentence about variation.", "Variation helps some offspring survive better."),
      s("Build a sentence about Charles Darwin.", "Darwin studied finches on the Galápagos Islands."),
      s("Build a sentence about evolution.", "Evolution happens slowly over many generations."),
      g("Food is only in tall trees. Sort what happens to the giraffes.", ["Longer-necked giraffes", "Shorter-necked giraffes"], [["They reach the high leaves", 0], ["They are more likely to survive", 0], ["They are more likely to have young", 0], ["They cannot reach the high leaves", 1], ["They are more likely to go hungry", 1], ["They are less likely to have young", 1]]),
    ],
    enquiries: [
      { ...f("A drought left only hard seeds. Look at the finch results. What pattern do they show?", "More finches had big beaks in each generation", "Fewer finches had big beaks in each generation", "The number of big beaks did not change"), table: finchTable },
      { ...n("Look at the finch results. How many more finches with big beaks were there in generation 3 than in generation 1?", 35), table: finchTable },
      { ...f("Ellie predicts generation 5 if the drought carries on. Which is the best prediction?", "Even more finches will have big beaks", "Fewer finches will have big beaks", "No finches will have beaks"), table: finchTable },
      { ...n("Look at the fox results. How many more thick-furred foxes than thin-furred foxes were alive in spring?", 13), table: foxTable },
      { ...f("Looking at the fox results, which foxes are most likely to have young that pass on their fur?", "Those with thick fur", "Those with medium fur", "Those with thin fur"), table: foxTable },
      f("Leo says, \"Giraffes stretched their necks, so their babies were born with longer necks.\" What is the scientific explanation?", "Giraffes with naturally longer necks survived better and passed on long necks", "Stretching makes the next babies' necks longer", "Giraffes chose to grow taller"),
      f("Which of these is evidence that living things have changed over time?", "Fossils that are different from living animals", "A friend's guess", "A story in a comic"),
      f("Darwin and Wallace each collected evidence from many places. Why is this important?", "More evidence makes an idea more reliable", "Evidence is only for fun", "Evidence makes ideas wrong"),
      o("Order the steps of Ellie's study of the foxes, starting with the first step.", ["Count the foxes with thick, medium and thin fur at the start", "Wait through the winter", "Count the foxes alive in the spring", "Compare how many of each fur type survived"]),
      s("Leo writes a conclusion about the foxes.", "Thick-furred foxes survived the winter best."),
      g("Sort the claims about the finch results.", ["Supported by the results", "Not supported"], [["Big beaks became more common", 0], ["Generation 3 had more big beaks than generation 2", 0], ["20 in every 100 finches had big beaks in generation 1", 0], ["Big beaks became less common", 1], ["Half the finches had big beaks in generation 1", 1], ["Generation 2 had the most big beaks", 1]], { table: finchTable }),
      o("Order the generations from the most big-beaked finches to the fewest.", ["Generation 4", "Generation 3", "Generation 2", "Generation 1"], { table: finchTable }),
    ],
  },
};

export const evolutionVisuals = {
  "fossils-as-evidence": scene("lab", "A shell, a bone and a magnifying glass on a bench.", [["🐚", 100, 140, 62], ["🦴", 200, 145, 62], ["🔍", 300, 135, 66]]),
  "inheritance-and-variation": scene("meadow", "A dog with two puppies on a meadow.", [["🐕", 140, 140, 80], ["🐶", 250, 165, 48], ["🐶", 315, 170, 44]]),
  adaptation: scene("meadow", "A small bird, a fish and a climbing plant.", [["🐦", 90, 110, 64], ["🐟", 200, 150, 60], ["🌱", 310, 150, 66]]),
  "adapting-to-extreme-places": scene("plain", "A sandy desert on one side and an icy mountain on the other.", [["🏜️", 110, 135, 82], ["🏔️", 290, 135, 82]]),
  evolution: scene("meadow", "A tropical island with a bird and a tortoise.", [["🏝️", 120, 135, 82], ["🐦", 250, 100, 56], ["🐢", 320, 170, 56]]),
};

export const evolutionRules = {
  "fossils-as-evidence": [
    rule(/Leo makes model fossils by pressing a shell into clay/, scene("lab", "A shell and a ball of clay on a bench.", [["🐚", 130, 140, 66], ["🟤", 290, 145, 62]])),
    rule(/Maya finds a fossil shell high on a hill/, scene("meadow", "A shell lying on a grassy hill.", [["⛰️", 140, 130, 90], ["🐚", 290, 160, 56]])),
    rule(/Leo finds a fossil fern in a rock/, scene("meadow", "A fern leaf shape in a rock.", [["🪨", 150, 140, 80], ["🌿", 280, 140, 66]])),
    rule(/Order the steps a palaeontologist follows/, scene("lab", "A magnifying glass and a notebook.", [["🔍", 140, 135, 70], ["📓", 280, 140, 66]])),
  ],
  "inheritance-and-variation": [
    rule(/A labrador and a poodle have puppies/, scene("meadow", "A labrador, a poodle and a puppy.", [["🐕", 110, 140, 70], ["🐩", 220, 140, 70], ["🐶", 320, 165, 46]])),
    rule(/A farmer breeds only his fastest horses/, scene("meadow", "A farmer and a horse in a field.", [["🧑‍🌾", 120, 140, 70], ["🐎", 270, 140, 76]])),
    rule(/Leo wants to find out whether seeds from one sunflower/, scene("room", "Three pots with seedlings, all the same size.", [["🌱", 90, 140, 54], ["🌱", 200, 140, 54], ["🌱", 310, 140, 54]])),
    rule(/Leo writes a conclusion about his kittens/, scene("room", "Three kittens.", [["🐱", 110, 140, 62], ["🐈", 210, 140, 62], ["🐱", 310, 140, 62]])),
  ],
  adaptation: [
    rule(/Leo tests how well model beaks pick up seeds/, scene("lab", "A spoon, some seeds and a stopwatch on a bench.", [["🥄", 110, 140, 62], ["🌰", 210, 145, 54], ["⏱️", 310, 140, 60]])),
    rule(/Order the steps of Leo's model beak test/, scene("lab", "A spoon, some seeds and a stopwatch on a bench.", [["🥄", 110, 140, 62], ["🌰", 210, 145, 54], ["⏱️", 310, 140, 60]])),
    rule(/Maya writes a conclusion from her flower results/, scene("meadow", "Flowers with a bee.", [["🌸", 120, 150, 66], ["🌼", 220, 150, 66], ["🐝", 290, 90, 46]])),
    rule(/A heron stands in a pond/, scene("pond", "A tall bird standing in a pond.", [["🦩", 200, 120, 92]])),
  ],
  "adapting-to-extreme-places": [
    rule(/Leo tests how well different wrappings keep warm water warm/, scene("lab", "Four glasses of warm water on a bench.", [["🥛", 80, 140, 54], ["🥛", 160, 140, 54], ["🥛", 240, 140, 54], ["🥛", 320, 140, 54]])),
    rule(/Order the steps of Leo's insulation test/, scene("lab", "Four glasses of warm water on a bench.", [["🥛", 80, 140, 54], ["🥛", 160, 140, 54], ["🥛", 240, 140, 54], ["🥛", 320, 140, 54]])),
    rule(/Leo reads that a fennec fox has huge ears/, scene("plain", "A fox.", [["🦊", 200, 130, 92]])),
    rule(/Why does an Arctic fox grow a white coat in winter/, scene("plain", "A fox.", [["🦊", 200, 130, 92]])),
  ],
  evolution: [
    rule(/Leo says, "Giraffes stretched their necks/, scene("meadow", "A giraffe beside a tall tree.", [["🦒", 140, 125, 96], ["🌳", 300, 130, 86]])),
    rule(/Order the steps of Ellie's study of the foxes/, scene("plain", "A notebook and a fox.", [["📓", 130, 140, 64], ["🦊", 280, 130, 76]])),
    rule(/Ellie predicts generation 5/, scene("sky", "A small bird flying.", [["🐦", 200, 110, 90]])),
    rule(/Darwin and Wallace each collected evidence/, scene("lab", "A notebook and a magnifying glass.", [["📓", 130, 140, 64], ["🔍", 280, 135, 66]])),
  ],
};
