/**
 * Teacher subject-knowledge briefings for Year 3 Science, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the programme of study in
 * docs/curriculum/year-3-science.md (the PDF text). Never paraphrase or alter it:
 * a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: Year 1 and Year 2 prior learning and the Year 4+ destination
 */
export const YEAR3_SCIENCE_BRIEFINGS = {
  // ---------------------------------------------------------------- Plants
  "parts-of-flowering-plants": {
    statutory: ["identify and describe the functions of different parts of flowering plants: roots, stem/trunk, leaves and flowers"],
    inBrief: "Every part of a flowering plant has a job to do. Linking each part's structure to its function is the first step in explaining how a whole plant lives and grows.",
    keyFacts: [
      "Roots hold (anchor) the plant in the soil and take in water and dissolved nutrients.",
      "The stem holds leaves and flowers up towards the light and carries water and nutrients around the plant. A trunk is the woody stem of a tree.",
      "Leaves are where a plant makes its own food using light. Pupils can be told that plants make their own food, but not how it happens.",
      "Flowers are the parts involved in reproduction: they help the plant make seeds, which grow into new plants.",
      "Boundary: naming the four parts and what each does. The chemistry of food-making and the inner parts of a flower are not Year 3 expectations.",
    ],
    misconceptions: [
      { mistake: "Plants get their food from the soil.", why: "Roots take in material from the soil and gardeners talk about 'plant food', so soil looks like a food source.", response: "Use the words consistently: soil supplies nutrients that help growth, but the plant makes its food in its leaves using light." },
      { mistake: "Trees are not flowering plants.", why: "Flowers on oak, ash or birch are small and easily missed, so only showy blossom counts.", response: "Look for flowers on a local tree in spring, such as catkins or blossom, and link them to the seeds, nuts or fruit that follow." },
      { mistake: "The stem is only there to hold the plant up.", why: "Support is the visible job; the water carried inside the stem cannot be seen.", response: "Stand a cut stem in coloured water and observe where the colour goes, then name both jobs." },
    ],
    vocabulary: [
      { term: "root", meaning: "The part under the soil that holds the plant in place and takes in water and nutrients." },
      { term: "stem", meaning: "The part that holds up the leaves and flowers and carries water and nutrients around the plant." },
      { term: "trunk", meaning: "The thick, woody stem of a tree." },
      { term: "leaf", meaning: "The flat part where the plant makes its food using light." },
      { term: "flower", meaning: "The part that helps the plant make seeds." },
      { term: "function", meaning: "The job a part does." },
      { term: "nutrients", meaning: "Substances in the soil that help a plant to grow." },
    ],
    before: "In Year 1 pupils identify and describe the basic structure of common flowering plants, including trees. In Year 2 they see how seeds and bulbs grow into mature plants.",
    next: "Year 5 pupils describe the life process of reproduction in some plants, and Year 6 pupils classify plants and meet how organisms are adapted to their environments. The detailed work on how leaves make food comes in key stage 3.",
  },

  "what-plants-need-to-grow": {
    statutory: ["explore the requirements of plants for life and growth (air, light, water, nutrients from soil, and room to grow) and how they vary from plant to plant"],
    inBrief: "Plants need air, light, water, nutrients from soil and room to grow, but the amounts differ from plant to plant. A fair test changes one thing and keeps everything else the same.",
    keyFacts: [
      "Light is used by leaves to make food. Water is taken in by roots. Air surrounds the leaves. Nutrients dissolved in soil water help growth. Roots and shoots need space.",
      "Nutrients are not the plant's food. Plants make their own food, so a fertiliser helps growth but does not feed the plant in the way meals feed an animal.",
      "Needs vary: a cactus needs little water and a bog plant a lot; some plants cope with shade and others need bright light.",
      "A fair test changes one factor (such as light), measures one result (such as height in cm) and keeps the plant, soil, water and place the same. Use several plants per condition.",
      "Boundary: investigating and explaining requirements. Temperature is Year 2, and photosynthesis and respiration are not expected.",
    ],
    misconceptions: [
      { mistake: "Plants eat soil, so more soil or fertiliser always means faster growth.", why: "Soil is where roots are, and plants are often described as being 'fed'.", response: "Compare plants with the same light and water but different soil amounts. Discuss why more is not always better and use 'nutrients', not 'food'." },
      { mistake: "A plant in the dark will grow just as well if it gets enough water.", why: "Water is the need pupils see supplied most often, so it feels like the only important one.", response: "Grow two similar plants, one on a windowsill and one in a cupboard, and record height and leaf colour over time." },
      { mistake: "Every plant needs the same amount of water and light.", why: "Pupils generalise from one plant they care for at home.", response: "Compare the natural homes of a cactus and a fern and ask what that suggests about their needs." },
    ],
    vocabulary: [
      { term: "requirement", meaning: "Something a living thing must have to stay alive and grow." },
      { term: "nutrients", meaning: "Substances in the soil that help a plant to grow. They are not the plant's food." },
      { term: "fair test", meaning: "A test where only one thing is changed and everything else is kept the same." },
      { term: "variable", meaning: "Something that can change in a test, such as the amount of light." },
      { term: "prediction", meaning: "What you think will happen, and why." },
      { term: "conclusion", meaning: "What the evidence tells us, in words that match the results." },
    ],
    before: "In Year 2 pupils find out and describe how plants need water, light and a suitable temperature to grow and stay healthy.",
    next: "Year 4 pupils look at how habitats and environments change, Year 5 at plant reproduction, and Year 6 at adaptation to environments. How plants use light to make food is taught in key stage 3.",
  },

  "water-transport-in-plants": {
    statutory: ["investigate the way in which water is transported within plants"],
    inBrief: "Roots take in water and the stem carries it up to the leaves and flowers. Coloured water makes the invisible journey visible.",
    keyFacts: [
      "Water enters through the roots, travels up through tiny tubes in the stem or trunk, and reaches the leaves and flowers.",
      "In the classic test a white carnation or a celery stalk with a fresh cut stands in coloured water. Colour appears in the veins of the petals or leaves, usually within hours and clearer after a day.",
      "Cut stems have no roots, so water enters at the cut end. This shows the stem's route, not the way roots take in water.",
      "Pupils should observe and record stages in order and explain what the evidence shows. Bix uses a staged observation model, not a timed experiment.",
      "Boundary: the route roots to stem to leaves or flower. The names xylem and transpiration and why water moves upwards are later.",
    ],
    misconceptions: [
      { mistake: "The petals soak up the dye like a sponge dipped in water.", why: "Pupils know that fabrics absorb liquid from the surface.", response: "Point out that only the stem touches the coloured water, so the colour had to travel up it. Slice a celery stalk across to see coloured dots." },
      { mistake: "Water only goes into a plant through its leaves or flowers.", why: "Rain falls on leaves, so it seems that is where water gets in.", response: "Compare a plant with its roots in water and one without. Use arrows to trace the route soil, roots, stem, leaves." },
      { mistake: "Plants drink once and then store all the water.", why: "Animals drink and then hold the water in their bodies.", response: "Water a plant, wait, and notice how the soil dries. Say that the water keeps moving through the plant." },
    ],
    vocabulary: [
      { term: "transport", meaning: "Carry something from one place to another." },
      { term: "absorb", meaning: "Take in, as roots take in water." },
      { term: "stem", meaning: "The part that carries water between roots and leaves." },
      { term: "dye", meaning: "Coloured liquid used to show where water goes." },
      { term: "evidence", meaning: "What we observe that helps us explain something." },
      { term: "route", meaning: "The path water takes through the plant." },
    ],
    before: "In Year 2 pupils learn that plants need water to grow and stay healthy. They have not yet traced where the water goes.",
    next: "Year 6 pupils describe how nutrients and water are transported within animals. Transport in plants (xylem, transpiration) returns in key stage 3.",
  },

  "pollination-and-seed-formation": {
    statutory: ["explore the part that flowers play in the life cycle of flowering plants, including pollination, seed formation and seed dispersal"],
    inBrief: "Flowers are where seeds are made. Pollen moves between flowers (pollination), and seeds can then form that grow into new plants, so the life cycle goes round again.",
    keyFacts: [
      "Pollination is pollen moving from the pollen-making part of a flower to the receiving part of a flower. Bees and other insects, wind and some other animals carry pollen.",
      "Insects visit many flowers for sweet nectar and carry pollen as they go. Insect-pollinated flowers are often scented or brightly coloured; wind-pollinated flowers are often small with lots of light pollen.",
      "After pollination, seeds can begin to form inside the flower, often within a fruit, pod or capsule. A grain of pollen does not turn into a seed.",
      "The life cycle runs: seed, germination, seedling, adult plant, flower, pollination, seed formation, dispersal.",
      "Boundary: the sequence and the role of the flower. Fertilisation, the names of the inner flower parts and sexual versus asexual reproduction are later.",
    ],
    misconceptions: [
      { mistake: "Pollen is a seed, or turns into one.", why: "Pollen and seeds are both small and dust-like, and both are linked to reproduction.", response: "Compare them side by side. Say that pollen is moved to a flower and helps seeds to form inside it. Use the words 'help' and 'later'." },
      { mistake: "Bees are trying to pollinate flowers.", why: "Pupils attribute purpose to the animal's action.", response: "Explain that bees visit for nectar and pollen to eat. Pollen sticks to them and moves by accident, which is why the plant benefits." },
      { mistake: "Pollination and germination are the same thing.", why: "Both words are long and both are about 'making' plants.", response: "Use a timeline card for each stage. Pollination is before the seed forms, germination is when a seed starts to grow." },
    ],
    vocabulary: [
      { term: "pollen", meaning: "A fine powder made by flowers that is needed to make seeds." },
      { term: "pollination", meaning: "Pollen moving from one part of a flower to the receiving part of a flower." },
      { term: "nectar", meaning: "A sweet liquid in some flowers that insects feed on." },
      { term: "seed", meaning: "The part that can grow into a new plant." },
      { term: "germination", meaning: "A seed starting to grow into a seedling." },
      { term: "life cycle", meaning: "The stages a living thing goes through, ending where it began." },
    ],
    before: "In Year 2 pupils observe and describe how seeds and bulbs grow into mature plants. They have not studied what flowers do.",
    next: "Year 5 pupils describe the life process of reproduction in some plants and compare life cycles. Fertilisation and the inner flower structures are key stage 3.",
  },

  "seed-dispersal": {
    statutory: ["explore the part that flowers play in the life cycle of flowering plants, including pollination, seed formation and seed dispersal"],
    inBrief: "Seeds travel away from the parent plant in different ways. The shape of a seed or fruit gives a clue to how it may travel, which helps seedlings find space, light and water.",
    keyFacts: [
      "Wind: light seeds with wings, tufts or parachutes, such as sycamore and dandelion.",
      "Animals: hooked burrs catch on fur, and fleshy fruits are eaten with seeds passing out of the animal elsewhere. Squirrels and birds also carry and bury nuts and seeds.",
      "Water: seeds or fruits that float, such as coconuts, can be carried by rivers or the sea. Other plants have pods that burst open and fling seeds out, and heavy fruits simply fall.",
      "Features suggest a likely method, but only what actually happens shows the method used. Many plants use more than one.",
      "Boundary: matching features to methods and explaining why moving away helps. Seed structure and germination conditions are not the focus here.",
    ],
    misconceptions: [
      { mistake: "Seeds all fall straight down beneath the parent plant.", why: "Pupils picture gravity only, and the parent plant is the place they usually see seeds.", response: "Drop a winged seed and a flat seed from the same height and compare. Use real hooked seeds on a woolly jumper." },
      { mistake: "Plants choose where their seeds go or send them on purpose.", why: "Pupils explain events through purpose.", response: "Say that the plant has features that make travel more likely and that where a seed lands is chance. Many seeds do not land well." },
      { mistake: "A seed with wings must always travel by wind.", why: "A feature is treated as proof of the method.", response: "Ask what was observed. A feature gives a prediction and an observation of movement gives the evidence." },
    ],
    vocabulary: [
      { term: "seed dispersal", meaning: "Seeds being moved away from the parent plant." },
      { term: "parent plant", meaning: "The plant the seed came from." },
      { term: "fruit", meaning: "The part of a plant that holds seeds." },
      { term: "burr", meaning: "A seed case with hooks that catches on fur or clothes." },
      { term: "competition", meaning: "When plants have to share light, water and room, so each gets less." },
      { term: "feature", meaning: "A part of a seed or fruit that you can observe." },
    ],
    before: "In Year 2 pupils observe seeds and bulbs growing into plants and describe how plants need water, light and a suitable temperature.",
    next: "Year 5 pupils study reproduction and life cycles of plants and animals. Adaptation, including how plants and seeds suit their environments, returns in Year 6.",
  },

  // ------------------------------------------------ Animals, including humans
  "nutrition-for-animals-and-humans": {
    statutory: ["identify that animals, including humans, need the right types and amount of nutrition, and that they cannot make their own food; they get nutrition from what they eat"],
    inBrief: "Animals, including humans, cannot make their own food. They get nutrition from what they eat, so they need the right types and amounts of food to get energy, grow and stay healthy.",
    keyFacts: [
      "Plants make their own food using light. Animals do not, so they eat plants, other animals or both. Herbivores eat plants, carnivores eat animals and omnivores eat both.",
      "Humans are animals. A healthy human diet includes carbohydrates, protein, fats, vitamins, minerals, fibre and water, in the right amounts.",
      "A food can contain several nutrients, and different foods give different mixes. A balanced diet means eating a variety of foods.",
      "Different animals need different foods: giraffes eat leaves and lions eat meat. Use attributed sources such as the NHS Eatwell Guide for human diets.",
      "Boundary: types and amounts of food, and where nutrition comes from. Digestion and teeth are Year 4. Keep talk about food neutral, with no judging of foods or bodies.",
    ],
    misconceptions: [
      { mistake: "Plants eat soil, so they get food the same way animals do.", why: "Pupils apply what they know about animals to plants.", response: "Contrast clearly: plants make their own food using light, animals must take food in." },
      { mistake: "Some foods are 'good' and others are 'bad', so only 'good' foods are needed.", why: "Messages heard at home and in the media simplify food into two groups.", response: "Talk about amounts and variety. Every food group has a job, and the Eatwell Guide shows proportions." },
      { mistake: "Any food or drink gives the body the nutrition it needs.", why: "Pupils do not separate eating something from getting a useful mix of nutrients.", response: "Ask what each food gives the body. Define nutrients and sort foods by the main nutrient they provide." },
    ],
    vocabulary: [
      { term: "nutrition", meaning: "Getting and using nutrients from food." },
      { term: "nutrients", meaning: "The useful substances in food that help bodies get energy, grow and stay healthy." },
      { term: "diet", meaning: "The foods an animal usually eats." },
      { term: "herbivore, carnivore, omnivore", meaning: "An animal that eats plants, an animal that eats animals, an animal that eats both." },
      { term: "balanced", meaning: "Having the right types and amounts, not too much or too little." },
      { term: "energy", meaning: "What the body needs to move, grow and keep working." },
    ],
    before: "In Year 1 pupils identify carnivores, herbivores and omnivores. In Year 2 they describe the importance of eating the right amounts of different types of food and use simple food chains.",
    next: "Year 4 pupils describe the simple functions of the digestive system, the types of teeth and food chains. Year 6 pupils look at how diet, exercise and lifestyle affect the body.",
  },

  "skeletons-for-support-and-protection": {
    statutory: ["identify that humans and some other animals have skeletons and muscles for support, protection and movement"],
    inBrief: "A skeleton holds a body up, protects soft parts and, with muscles, lets it move. Some animals have bones inside, some have a hard covering outside and some have neither.",
    keyFacts: [
      "Support: the skeleton gives the body its shape and holds it up. Protection: the skull protects the brain and the rib cage protects the heart and lungs. Movement: bones move at joints, pulled by muscles.",
      "The backbone (spine) is made of many small bones. Animals with a backbone (fish, amphibians, reptiles, birds and mammals) have an internal skeleton, usually of bone. Sharks and rays have cartilage instead.",
      "Some animals, such as crabs and insects, have an exoskeleton, a hard covering on the outside. Snails have a shell. Earthworms have no hard skeleton, and their soft bodies are supported in other ways.",
      "Not having a backbone does not mean having no support or protection.",
      "Boundary: main bones of the human skeleton and their jobs, and comparing animals. Bone names beyond the skull, ribs, spine and limb bones are not expected.",
    ],
    misconceptions: [
      { mistake: "Bones are dead, hard and never change.", why: "Skeletons seen in museums look like dry sticks.", response: "Explain that living bones are alive: they grow as we grow and can repair themselves after a break." },
      { mistake: "Animals with no backbone have no skeleton or no protection.", why: "'Skeleton' is linked with bones inside the body.", response: "Sort animals by backbone, and separately by outer covering. Show a crab shell and a snail shell and ask what they do." },
      { mistake: "The skeleton is only for movement.", why: "Pupils think of bones when they run and jump.", response: "Feel the skull, ribs and spine and ask what is underneath. Ask what would happen if you fell and had no skull." },
    ],
    vocabulary: [
      { term: "skeleton", meaning: "The framework of a body that supports it and gives it shape." },
      { term: "support", meaning: "Holding the body up and giving it shape." },
      { term: "protection", meaning: "Shielding soft parts from harm." },
      { term: "backbone (spine)", meaning: "The line of small bones down the middle of the back." },
      { term: "exoskeleton", meaning: "A hard supporting covering on the outside of the body, as in insects and crabs." },
      { term: "skull", meaning: "The bones of the head that protect the brain." },
      { term: "rib cage", meaning: "The curved bones around the chest that protect the heart and lungs." },
    ],
    before: "In Year 1 pupils describe and compare the structure of common animals (fish, amphibians, reptiles, birds and mammals) and name basic parts of the human body.",
    next: "Year 4 pupils study the digestive system and Year 6 pupils the circulatory system, extending the idea of body parts working together. The skeleton and muscles are studied in more depth in key stage 3.",
  },

  "muscles-and-movement": {
    statutory: ["identify that humans and some other animals have skeletons and muscles for support, protection and movement"],
    inBrief: "Muscles move bones by pulling on them. Muscles work in pairs, so one pulls the bone one way and the other pulls it back.",
    keyFacts: [
      "Muscles can only pull, never push. When a muscle contracts (gets shorter) it pulls on the bone it is attached to.",
      "Muscles are joined to bones by tendons. Bones meet at joints, such as the elbow, where movement happens.",
      "In the upper arm, the front muscle (biceps) contracts to bend the arm and the back muscle (triceps) contracts to straighten it. Bix uses a simplified pair of arm muscles.",
      "Bones are stiff and do not bend. Movement happens at joints because muscles pull across them.",
      "Boundary: the idea of muscles pulling bones in pairs. Names of muscles beyond the arm model, types of joint and the heart as a muscle are not Year 3 expectations.",
    ],
    misconceptions: [
      { mistake: "Muscles push the bone to straighten the arm.", why: "Pupils think of pushing a door to open it.", response: "Use a model with card bones and elastic or string 'muscles' to show that each one can only pull. Straightening needs the other muscle to pull." },
      { mistake: "The bones bend when we bend the arm.", why: "A bending arm looks like a bending stick.", response: "Feel the forearm and the upper arm bones and find where the elbow joint is. Ask where the bones meet." },
      { mistake: "The muscle that is not pulling has gone limp and stopped working.", why: "'Relax' sounds as if nothing is happening.", response: "Say that the relaxed muscle is lengthened by the other muscle pulling. Feel the front and back of the arm as it bends and straightens." },
    ],
    vocabulary: [
      { term: "muscle", meaning: "A body part that can get shorter to pull on bones and make them move." },
      { term: "contract", meaning: "When a muscle gets shorter as it pulls." },
      { term: "relax", meaning: "When a muscle stops contracting and can be lengthened again." },
      { term: "joint", meaning: "A place where two bones meet, such as the elbow." },
      { term: "tendon", meaning: "A strong cord that joins a muscle to a bone." },
      { term: "movement", meaning: "Changing position or shape." },
    ],
    before: "In Year 1 pupils name basic parts of the human body, and in Year 2 they learn about the importance of exercise for humans.",
    next: "Year 6 pupils learn how exercise and lifestyle affect the way the body functions, and the circulatory system includes the heart. The muscular system is studied properly in key stage 3.",
  },

  // ---------------------------------------------------------------- Rocks
  "comparing-and-grouping-rocks": {
    statutory: ["compare and group together different kinds of rocks on the basis of their appearance and simple physical properties"],
    inBrief: "Rocks differ in how they look and how they behave. Pupils observe and test rocks, then sort them into groups using clear criteria.",
    keyFacts: [
      "Appearance: colour, whether there are visible grains or crystals, bands or layers, and whether a fossil is present. A hand lens helps.",
      "Simple physical properties: how hard (does it scratch easily?), whether it takes in water, whether it is rough or smooth, and how heavy it feels.",
      "Rocks with visible rounded grains are often sedimentary. Rocks with interlocking crystals are often igneous, and some metamorphic rocks have bands. The three names are not required in Year 3.",
      "Grouping needs a criterion, such as 'has visible grains'. The same rocks can be sorted in different ways, and a rock cannot be identified from colour alone.",
      "Boundary: observing, testing and grouping. The rock cycle and how each rock type forms are not Year 3 expectations. Keep a local focus, such as buildings and gravestones.",
    ],
    misconceptions: [
      { mistake: "Rocks of the same colour are the same kind of rock.", why: "Colour is the quickest feature to see.", response: "Look at the same rocks with a hand lens and test them for hardness and water. Regroup using a different criterion." },
      { mistake: "A rock that is 'soft' will break easily; a 'hard' rock is unbreakable.", why: "Hardness (resistance to scratching) is mixed up with toughness (not breaking).", response: "Scratch test rocks and talk about what the test actually shows: how easily the surface is scratched, not how easily the rock shatters." },
      { mistake: "A rock that takes in water lets water pass through it.", why: "Pupils merge two different properties.", response: "Compare a drop on a rock that darkens and soaks in with water poured through a sample. Record the two results separately." },
    ],
    vocabulary: [
      { term: "property", meaning: "Something about a material that we can observe or test." },
      { term: "grain", meaning: "A small piece of material, such as sand, that a rock is made of." },
      { term: "crystal", meaning: "A mineral with a regular, ordered structure that can sometimes be seen in a rock." },
      { term: "hard, soft", meaning: "Hard materials are difficult to scratch; soft materials scratch easily." },
      { term: "permeable", meaning: "Lets water soak into or through it." },
      { term: "specimen", meaning: "A sample of a rock to study." },
      { term: "criterion", meaning: "A rule used to sort things into groups." },
    ],
    before: "In Year 1 pupils name rock among everyday materials, describe simple physical properties and group materials. In Year 2 they compare the suitability of materials such as brick and rock.",
    next: "There is no rocks topic in Years 4 to 6. Year 5 pupils group materials by properties such as hardness and solubility, and key stage 3 introduces the rock cycle and rock types.",
  },

  "how-fossils-form": {
    statutory: ["describe in simple terms how fossils are formed when things that have lived are trapped within rock"],
    inBrief: "A fossil is the preserved evidence of something that once lived. It forms when a plant or animal is buried and trapped in rock over a very long time.",
    keyFacts: [
      "A fossil can be a shell, bone, tooth or leaf turned to stone, or an imprint, such as a footprint or the shape left by a shell. Fossils are found in rocks that formed from layers of mud, sand or other sediment.",
      "Simple account: a living thing dies, it is quickly buried by sediment, the soft parts rot away, minerals can fill or replace the hard parts or leave a mould, and the sediment slowly becomes rock.",
      "It takes a very long time, usually millions of years. Later, erosion or digging may expose the fossil.",
      "Most living things never become fossils, because they are eaten, rot or are not buried in time.",
      "Boundary: a simple, ordered account. Types of rock, geological time periods and exact processes are not Year 3 expectations.",
    ],
    misconceptions: [
      { mistake: "Fossils are the actual bones or shells, just old.", why: "Fossils look like bones and are labelled with the animal's name.", response: "Pass round a fossil and a modern shell. Explain that in many fossils the original material has been replaced or an imprint left behind." },
      { mistake: "Every animal that died became a fossil.", why: "Museum displays suggest fossils are everywhere.", response: "Ask what usually happens to a dead animal in a wood. Compare with conditions that help fossils form, such as quick burial in mud or sand." },
      { mistake: "Fossils formed in a few years, or people can dig them up as soon as they are made.", why: "Pupils have little feeling for how long millions of years is.", response: "Use a long timeline strip, for example a metre for the age of the Earth, to show how small a human lifetime is." },
    ],
    vocabulary: [
      { term: "fossil", meaning: "The preserved remains or imprint of a living thing from long ago, found in rock." },
      { term: "sediment", meaning: "Loose material such as mud or sand that settles in layers." },
      { term: "mould", meaning: "A hollow shape left behind when buried remains dissolve away." },
      { term: "mineral", meaning: "A natural material from the ground that can help preserve remains." },
      { term: "erosion", meaning: "Wearing away of rock, which can bring a buried fossil to the surface." },
      { term: "preserved", meaning: "Kept safe from rotting away." },
    ],
    before: "In Year 2 pupils learn about things that are living, dead and never alive, and about habitats. They have not yet met fossils as evidence.",
    next: "Year 6 pupils recognise that living things have changed over time and that fossils give information about living things that inhabited the Earth millions of years ago.",
  },

  "what-soil-is-made-from": {
    statutory: ["recognise that soils are made from rocks and organic matter"],
    inBrief: "Soil is a mixture of tiny pieces of rock and organic matter from dead plants and animals, with air, water and living things. It takes a very long time to form.",
    keyFacts: [
      "Rock particles: over a long time, weather and other processes break rocks into smaller and smaller pieces such as sand, silt and clay.",
      "Organic matter: the decaying remains of plants and animals, such as leaves, which are broken down by living things such as worms and fungi and mixed into the soil. It is dark and adds nutrients.",
      "Soil also holds air, water and living things. Different soils have different mixtures, so colour alone does not show what is in a soil.",
      "Soil forms very slowly, taking hundreds or thousands of years, so it is worth looking after.",
      "Boundary: soils made from rocks and organic matter. Soil layers (profiles), the names of soil types and chemistry are not Year 3 expectations.",
    ],
    misconceptions: [
      { mistake: "Soil is just brown dirt, a single material.", why: "Soil looks the same colour all through at a glance.", response: "Shake a soil sample in a jar of water and let it settle. Pupils see layers of stones, sand, finer particles and floating organic matter." },
      { mistake: "Soil is made only of rock bits.", why: "Pupils notice grit and stones and forget the darker material.", response: "Look at a handful with a hand lens and find leaf fragments and roots. Compare sandy soil with compost." },
      { mistake: "Soil is made quickly, for example, when we dig or mix it.", why: "Pupils see mixing, not formation.", response: "Distinguish mixing existing soil from making new soil. Put the formation time on the long timeline used for fossils." },
    ],
    vocabulary: [
      { term: "soil", meaning: "A mixture of rock pieces, organic matter, air, water and living things that plants grow in." },
      { term: "organic matter", meaning: "Material from things that were once alive, such as dead leaves." },
      { term: "decay", meaning: "When dead plants and animals slowly break down." },
      { term: "particle", meaning: "A very small piece of something." },
      { term: "sand, silt, clay", meaning: "Rock particles of different sizes, with sand the largest and clay the smallest." },
      { term: "compost", meaning: "Decayed plant matter used to improve soil." },
    ],
    before: "In Year 2 pupils study habitats and micro-habitats and how plants grow. They have not met soil as a mixture made from rock and organic matter.",
    next: "Soil is not a separate topic in Years 4 to 6, but it supports work on habitats and environments. Soil science is developed in key stage 3 science and geography.",
  },

  // ---------------------------------------------------------------- Light
  "light-and-darkness": {
    statutory: ["recognise that they need light in order to see things and that dark is the absence of light"],
    inBrief: "We see when light from a source, or light reflected off an object, enters our eyes. Dark is not a thing: it is what we have when there is no light.",
    keyFacts: [
      "A light source gives out its own light, such as the Sun, a lamp or a torch. Most things, including books and the Moon, are seen because they reflect light.",
      "Light has to reach our eyes for us to see. In complete darkness nothing can be seen, but the objects are still there.",
      "Dark is the absence of light, not a substance that fills a space. Sometimes there is a little light, which makes it dim rather than dark.",
      "Eyes do not send out beams to see. Seeing works because light enters the eye.",
      "Boundary: light is needed to see, and darkness is its absence. Pupils do not need to explain that light travels in straight lines (Year 6) or how the eye works.",
    ],
    misconceptions: [
      { mistake: "We see because our eyes send out something to the object.", why: "'Looking at' feels like an active reaching out.", response: "Put an object in a dark box, remove the lid and discuss the light that reaches the eye. Show that nothing is seen if the box is shut." },
      { mistake: "Dark is something that fills a room, like a cloud.", why: "People say 'darkness falls' and 'it is full of darkness'.", response: "Switch a light on and off and ask what has changed. Use the phrase 'no light' rather than 'lots of dark'." },
      { mistake: "Objects disappear in the dark.", why: "If we cannot see something it seems not to be there.", response: "Feel for the object in the box while it is dark, then open the lid to show it is in the same place." },
    ],
    vocabulary: [
      { term: "light source", meaning: "Something that gives out its own light, such as the Sun or a torch." },
      { term: "dark", meaning: "The absence of light." },
      { term: "reflect", meaning: "Bounce off a surface." },
      { term: "see", meaning: "Light enters our eyes and our brain makes sense of it." },
      { term: "absence", meaning: "Not being there." },
      { term: "dim", meaning: "Having only a little light." },
    ],
    before: "In Year 1 pupils name the human sense of sight and link it to the eyes, and observe day length across the seasons. Light itself has not been studied.",
    next: "Year 6 pupils recognise that light appears to travel in straight lines and use that to explain that objects are seen because they give out or reflect light into the eye.",
  },

  "reflected-light": {
    statutory: ["notice that light is reflected from surfaces"],
    inBrief: "When light hits a surface it bounces off. Reflected light is what lets us see most things, and smooth shiny surfaces give clear images, such as in a mirror.",
    keyFacts: [
      "Light from a source reaches a surface, bounces off it and may then reach our eyes. This path is shown as source, then surface, then eye.",
      "Most objects we see are not light sources. We see them because they reflect light from a source.",
      "Smooth, shiny surfaces, such as mirrors and still water, reflect light in a regular way and give clear images. Rough or dull surfaces, such as paper, also reflect light but scatter it in many directions.",
      "Not seeing a clear image does not mean no light was reflected.",
      "Boundary: noticing and describing reflection. Measuring angles and the law of reflection are not expected, and the arrows in Bix show direction only.",
    ],
    misconceptions: [
      { mistake: "Only shiny things reflect light.", why: "Mirrors are the obvious example.", response: "Shine a torch at a sheet of paper and a mirror in a dim room. Show that we see the paper because it reflects light." },
      { mistake: "Mirrors make their own light or images.", why: "A bright image looks like it comes from the mirror.", response: "Show that a mirror in a dark box shows nothing, and that the image appears only when a torch lights the object." },
      { mistake: "Light bounces off a surface in any direction, so you cannot predict where it goes.", why: "Pupils have not yet seen a clear reflection path.", response: "Use a torch with a narrow beam and a mirror, and mark the incoming and reflected paths on paper." },
    ],
    vocabulary: [
      { term: "reflect", meaning: "Light bounces off a surface." },
      { term: "surface", meaning: "The outside of an object." },
      { term: "mirror", meaning: "A smooth, shiny surface that gives a clear reflected image." },
      { term: "light source", meaning: "Something that gives out its own light." },
      { term: "image", meaning: "The picture you see when light is reflected, as in a mirror." },
      { term: "scatter", meaning: "Spread out in many directions." },
    ],
    before: "Pupils have not met reflection in key stage 1. In Year 2 they compare materials such as glass, metal and plastic for their suitability, which is a useful link for shiny surfaces.",
    next: "Year 6 pupils use the idea that light travels in straight lines to explain that objects are seen because they give out or reflect light into the eye. Reflection angles and periscopes come in key stage 3.",
  },

  "protecting-our-eyes-from-sunlight": {
    statutory: ["recognise that light from the sun can be dangerous and that there are ways to protect their eyes"],
    inBrief: "Sunlight can damage eyes. We never look directly at the Sun, even through sunglasses, and we can protect our eyes with the right sunglasses and by looking away.",
    keyFacts: [
      "The Sun is very bright, and its light includes ultraviolet (UV) light that we cannot see. It can harm eyes.",
      "Never look directly at the Sun. Sunglasses do not make this safe, because dark lenses do not make the Sun safe to stare at.",
      "For ordinary outdoor use, choose sunglasses that carry a UV protection label. Lens darkness does not show UV protection, so a grown-up should check the label. A hat with a brim also helps.",
      "The same rule applies to binoculars and telescopes, which make looking at the Sun far more dangerous.",
      "Boundary: safety awareness. There are no sun-viewing experiments. Eclipse viewing and the wave nature of light are not Year 3 expectations. The guidance is general and not medical advice.",
    ],
    misconceptions: [
      { mistake: "Dark sunglasses make it safe to look at the Sun.", why: "Darker lenses seem to reduce the glare to a comfortable level.", response: "State the rule clearly: never look directly at the Sun, with or without sunglasses. Do not test it." },
      { mistake: "The darkest glasses give the best UV protection.", why: "Dark colour and protection seem to go together.", response: "Read a label together. Explain that UV protection is a property of the lens, not the colour, and that the label is what to check." },
      { mistake: "On a cloudy day, or in winter, eyes need no protection.", why: "Pupils judge danger by how bright or warm it feels.", response: "Explain that UV light still reaches us through cloud and that glare from snow or water adds to it. Keep the rule to never look at the Sun." },
    ],
    vocabulary: [
      { term: "ultraviolet (UV)", meaning: "An invisible part of sunlight that can harm eyes and skin." },
      { term: "protect", meaning: "Keep safe from harm." },
      { term: "sunglasses", meaning: "Glasses with tinted lenses, which should have a UV protection label." },
      { term: "glare", meaning: "Light so bright that it is hard or uncomfortable to look at." },
      { term: "label", meaning: "Printed information, such as UV protection, that a grown-up can check." },
      { term: "dangerous", meaning: "Likely to cause harm." },
    ],
    before: "In Year 1 pupils observe seasonal changes and weather, and teachers warn that it is not safe to look directly at the Sun.",
    next: "Year 6 pupils use the idea that light travels in straight lines to explain how we see. Light safety is built on in key stage 3, for example in work on waves and the electromagnetic spectrum.",
  },

  "how-shadows-form": {
    statutory: ["recognise that shadows are formed when the light from a light source is blocked by an opaque object"],
    inBrief: "A shadow is a dark patch where an opaque object blocks light from a source. The object does not make darkness: it stops light getting through.",
    keyFacts: [
      "To make a shadow you need a light source, an opaque object and a surface (screen) for the shadow to fall on.",
      "Opaque materials let no light through. Transparent materials let light through so we can see clearly through them, and translucent ones let some light through.",
      "The shadow is on the side of the object away from the light. Moving the lamp changes where the shadow is.",
      "A shadow has the same shape as the outline of the object. It is the absence of light in that place and not a thing in its own right.",
      "Boundary: why shadows form. Why shadows change size is the next topic, and the idea that light travels in straight lines is explained in Year 6.",
    ],
    misconceptions: [
      { mistake: "The object makes its own darkness or shadow.", why: "A shadow seems to belong to the object and moves with it.", response: "Switch off the lamp and the shadow vanishes. Show that the shadow needs light, an object and a screen." },
      { mistake: "Shadows only happen outside, or only when the Sun is out.", why: "The Sun is the shadow-maker pupils know best.", response: "Make shadows with a torch indoors, and also find shadows from lamps and from the Sun." },
      { mistake: "A shadow is always black and has no detail.", why: "Shadows in drawings and silhouettes are shown as solid black.", response: "Shine a torch through translucent materials such as tissue paper or thin plastic and compare the shadows with opaque cardboard." },
    ],
    vocabulary: [
      { term: "shadow", meaning: "A dark area where an object blocks light." },
      { term: "light source", meaning: "Something that gives out light, such as a lamp or the Sun." },
      { term: "opaque", meaning: "Does not let light pass through." },
      { term: "transparent", meaning: "Lets light pass through so you can see clearly." },
      { term: "translucent", meaning: "Lets some light through, but not clearly." },
      { term: "block", meaning: "Stop light from getting through." },
    ],
    before: "In Year 1 pupils describe the simple physical properties of everyday materials. Shadows have not been studied.",
    next: "Year 6 pupils use the idea that light travels in straight lines to explain why shadows have the same shape as the objects that cast them.",
  },

  "changing-shadow-size": {
    statutory: ["find patterns in the way that the size of shadows change"],
    inBrief: "The size of a shadow changes when the light source or the object moves. Pupils find a pattern by changing one thing at a time and measuring the shadow.",
    keyFacts: [
      "With the screen fixed, moving the light source closer to the object makes the shadow bigger, and moving it further away makes the shadow smaller.",
      "With the light fixed, moving the object closer to the light makes the shadow bigger, and moving it closer to the screen makes the shadow smaller.",
      "Outdoors, the Sun's shadows are long when the Sun is low (morning and evening) and short when it is high (midday). In Bix, only a lamp, an object and a screen are used.",
      "A fair test changes one position at a time, keeps the object, screen and lamp otherwise the same and measures the shadow height in centimetres. Bix rounds to whole centimetres.",
      "Boundary: describing the pattern from measurements. Pupils do not need to calculate shadow sizes or explain with geometry. Real torches are not perfect point sources.",
    ],
    misconceptions: [
      { mistake: "A bigger object always makes a bigger shadow, whatever else changes.", why: "Size of the shadow is linked only to the object in everyday experience.", response: "Test the same object at three distances and record the shadows. Then try two objects at the same distance." },
      { mistake: "Moving the object closer to the screen makes the shadow bigger.", why: "The shadow gets closer, so it feels bigger.", response: "Measure and compare. Draw the light paths as lines from the lamp past the edges of the object to the screen." },
      { mistake: "Changing the lamp and the object at the same time still tells you what happened.", why: "Pupils do not yet see why a single change matters.", response: "Ask what caused the change. Repeat with only one change and compare the two records." },
    ],
    vocabulary: [
      { term: "pattern", meaning: "Something that happens in the same way each time." },
      { term: "distance", meaning: "How far apart two things are." },
      { term: "measure", meaning: "Find out a size with equipment and standard units, such as centimetres." },
      { term: "fair test", meaning: "A test where only one thing changes." },
      { term: "screen", meaning: "The surface where we look for the shadow." },
      { term: "source", meaning: "The lamp or other light that gives out the light." },
    ],
    before: "In Year 2 pupils gather and record data. Shadows have not been studied before Year 3.",
    next: "Year 6 pupils use the idea that light travels in straight lines to explain shadow shape. Key stage 3 explains size using ray diagrams.",
  },

  // ---------------------------------------------------------------- Forces and magnets
  "movement-on-different-surfaces": {
    statutory: ["compare how things move on different surfaces"],
    inBrief: "Things move differently on different surfaces. A fair test shows which surface lets an object travel furthest, and the pattern is explained by friction between surfaces.",
    keyFacts: [
      "Friction is a force between two surfaces that rub or slide against each other. It acts against movement and slows moving things down.",
      "Rough, grippy surfaces, such as carpet or sandpaper, give more friction. Smooth surfaces, such as polished wood or plastic, give less, so a toy car travels further.",
      "A fair test uses the same object, the same starting height or push, and the same distance from the start, and changes only the surface. The distance travelled is measured in centimetres or metres.",
      "Repeated tests give more reliable results, and the results can be used to predict what would happen on another surface. Compare only the samples that were tested.",
      "Boundary: comparing, grouping and predicting. Gravity, air resistance and water resistance are Year 5. The word friction may be introduced but pupils are not expected to explain it in detail.",
    ],
    misconceptions: [
      { mistake: "A moving object stops because it runs out of push.", why: "Everyday experience shows things always slow down on their own.", response: "Compare a toy car on a smooth surface with one on carpet and ask what is different. Introduce friction as a force that works against movement." },
      { mistake: "Smooth surfaces have no friction.", why: "Smooth is linked with slippery.", response: "Compare how far a car travels on several surfaces. Smooth surfaces have less friction, not none." },
      { mistake: "The test shows what every toy will do on every surface.", why: "Pupils generalise from one result.", response: "Say 'for this car, on these two surfaces'. Predict, then test a new toy on the same surfaces." },
    ],
    vocabulary: [
      { term: "surface", meaning: "The outside layer of something that an object moves across." },
      { term: "friction", meaning: "A force that acts between surfaces that rub together and slows movement." },
      { term: "force", meaning: "A push or a pull." },
      { term: "rough, smooth", meaning: "Rough surfaces are bumpy or grippy; smooth surfaces are even and slippery." },
      { term: "fair test", meaning: "A test where only one thing changes." },
      { term: "distance", meaning: "How far something travels." },
    ],
    before: "Forces have no separate Key Stage 1 programme of study. In Year 2 pupils squash, bend, twist and stretch materials, which uses pushes and pulls, and in Year 1 they describe the properties of materials.",
    next: "Year 5 pupils explain the effects of air resistance, water resistance and friction, and learn about gravity, levers, pulleys and gears.",
  },

  "contact-and-magnetic-forces": {
    statutory: ["notice that some forces need contact between two objects, but magnetic forces can act at a distance"],
    inBrief: "Most forces, such as a push or a pull by hand, need contact. Magnetic forces can act across a gap, without touching.",
    keyFacts: [
      "A force is a push or a pull. Pushing a door, kicking a ball and pulling a rope are contact forces: the objects touch.",
      "A magnet can pull or push another magnet or a magnetic material across a gap. This is a non-contact force.",
      "A gap alone does not prove a magnetic force: look at what is moving and what it is moving towards or away from. Other forces can act at a distance, such as gravity in Year 5.",
      "Magnetic forces can pass through thin non-magnetic materials, such as paper or a table top, but they weaken as the distance increases.",
      "Boundary: noticing the difference between contact and at-a-distance. Naming forces such as gravity and magnetism as 'non-contact forces' is later, and no force measurement is needed.",
    ],
    misconceptions: [
      { mistake: "All forces need things to touch.", why: "The forces pupils feel, such as pushing and pulling, involve contact.", response: "Use two magnets with a gap between them and a paper-clip on a string below a magnet. Move the magnet and watch the object move without touching." },
      { mistake: "If an object is not touching the magnet, nothing is pulling it.", why: "A force is difficult to see directly.", response: "Ask what makes the clip move. Show that a bigger gap gives less movement." },
      { mistake: "Magnets only work if there is air between them.", why: "Pupils think the force travels through something visible.", response: "Test a magnet through paper, card and a hand. The force still acts through them." },
    ],
    vocabulary: [
      { term: "force", meaning: "A push or a pull." },
      { term: "contact", meaning: "Touching." },
      { term: "magnetic force", meaning: "The pull or push of a magnet, which can act across a gap." },
      { term: "attract", meaning: "Pull together." },
      { term: "repel", meaning: "Push apart." },
      { term: "gap", meaning: "The space between two objects." },
    ],
    before: "Forces have no separate Key Stage 1 programme of study. Pupils have used pushes and pulls in play and in Year 2 when changing the shape of materials.",
    next: "Year 5 pupils learn about gravity as a force that acts at a distance, along with air resistance, water resistance and friction.",
  },

  "magnetic-materials": {
    statutory: ["compare and group together a variety of everyday materials on the basis of whether they are attracted to a magnet, and identify some magnetic materials", "observe how magnets attract or repel each other and attract some materials and not others"],
    inBrief: "Only some materials are attracted to a magnet. Magnetic materials include iron and steel, and not all metals are magnetic.",
    keyFacts: [
      "Magnetic materials are those that are noticeably attracted to a magnet. Iron, nickel, cobalt and steel (which contains iron) are magnetic.",
      "Many metals are not magnetic, including aluminium, copper, gold and silver. Plastic, wood, glass, paper and fabric are not attracted either.",
      "A magnetic object is not necessarily a magnet itself. Items such as steel paper-clips and iron nails are attracted by a magnet but do not attract other things by themselves.",
      "Test fairly with the same magnet, similar-sized pieces and the same starting gap, then sort the results into a table or Venn diagram. Check a material before predicting, since some coins and cans contain steel.",
      "Boundary: sorting everyday materials as magnetic or not. How magnetism works inside a material and the other magnetic elements are not Year 3 expectations.",
    ],
    misconceptions: [
      { mistake: "A magnet attracts all metals.", why: "The materials pupils test first, such as paper-clips and nails, are metal.", response: "Test aluminium foil, copper wire and a steel nail side by side. Sort them and say 'some metals' rather than 'metals'." },
      { mistake: "Shiny things are magnetic.", why: "Shininess is linked with metal in pupils' minds.", response: "Test shiny non-metals, such as foil-covered card, and a dull piece of iron. Colour and shine do not decide it." },
      { mistake: "Anything attracted to a magnet is also a magnet.", why: "Attraction seems to be a property of magnets only.", response: "Pick up a paper-clip with a magnet and ask if the paper-clip attracts another. Test whether it does." },
    ],
    vocabulary: [
      { term: "magnet", meaning: "An object that attracts some materials and can attract or repel another magnet." },
      { term: "magnetic material", meaning: "A material that is attracted to a magnet, such as iron or steel." },
      { term: "non-magnetic", meaning: "Not attracted to a magnet." },
      { term: "attract", meaning: "Pull towards." },
      { term: "material", meaning: "What an object is made from." },
      { term: "property", meaning: "Something about a material that we can observe or test." },
    ],
    before: "In Year 1 pupils identify and name everyday materials such as metal and group them by simple physical properties. In Year 2 they compare the suitability of materials for particular uses.",
    next: "Year 5 pupils group materials by properties that include response to magnets, along with hardness, solubility, transparency and conductivity.",
  },

  "magnets-and-their-poles": {
    statutory: ["describe magnets as having two poles", "observe how magnets attract or repel each other and attract some materials and not others"],
    inBrief: "Every magnet has two poles, a north pole and a south pole. The pull is strongest at the poles, and opposite poles attract while matching poles repel.",
    keyFacts: [
      "Bar magnets have a pole at each end. Ring, horseshoe and button magnets also have two poles, in different places.",
      "The two poles are called north (N) and south (S). The pull of a magnet is strongest at its poles.",
      "A magnet always has both poles. If a bar magnet is cut in half, each piece is a magnet with its own north and south pole.",
      "Unlike (different) poles attract. Like (matching) poles repel. Pupils should observe this with real magnets.",
      "Boundary: describing and observing the two poles. Magnetic fields, how a compass works and the Earth's magnetism are not Year 3 expectations. Check the pole markings on real magnets.",
    ],
    misconceptions: [
      { mistake: "A magnet has just one pole, or the poles are only at the ends of a bar.", why: "Pupils think of the 'pulling end' as the magnet.", response: "Use iron filings or paper-clips to show where the pull is strongest on a bar and a ring magnet. Count the poles." },
      { mistake: "North poles attract each other because they are the same.", why: "Pupils expect 'same' to mean 'together'.", response: "Let pupils feel two matching ends push apart, then turn one magnet round and feel the pull. Record the result." },
      { mistake: "If you cut a magnet, you get a north-only piece and a south-only piece.", why: "Each part looks as if it must have one pole.", response: "Show a diagram of a magnet cut in half, then test two small magnets joined end to end and pulled apart. Each piece always has two poles." },
    ],
    vocabulary: [
      { term: "pole", meaning: "An end of a magnet where the magnetic pull is strongest." },
      { term: "north pole (N)", meaning: "One of the two poles of a magnet." },
      { term: "south pole (S)", meaning: "The other pole of a magnet." },
      { term: "attract", meaning: "Pull together." },
      { term: "repel", meaning: "Push apart." },
      { term: "bar magnet", meaning: "A rectangular magnet with a pole at each end." },
    ],
    before: "Magnets have no key stage 1 programme of study. Pupils may have played with magnets, but not named poles.",
    next: "Year 5 pupils look at forces including gravity and friction. Magnetic fields, field lines and the Earth's magnetic field are in key stage 3.",
  },

  "predicting-attraction-and-repulsion": {
    statutory: ["predict whether two magnets will attract or repel each other, depending on which poles are facing"],
    inBrief: "Whether two magnets attract or repel depends on which poles face each other. Pupils use the rule to predict and then test.",
    keyFacts: [
      "Facing poles that are different (N and S) attract. Facing poles that are the same (N and N, or S and S) repel.",
      "Only the two ends nearest the gap matter. Read the facing poles, not the far ends.",
      "A prediction is a statement with a reason, such as 'These will repel because both facing poles are north'. Testing then confirms or challenges it.",
      "Repulsion is the only test that shows both objects are magnets, because a magnet attracts both magnets and magnetic materials.",
      "Boundary: predicting for two bar magnets with marked poles. The strength of the force at different distances and magnetic field patterns are not Year 3 expectations.",
    ],
    misconceptions: [
      { mistake: "Reads the far ends instead of the facing ends.", why: "Pupils look at the labels they can see most easily.", response: "Cover the far ends with paper. Ask which two ends are closest and use only those." },
      { mistake: "Thinks a pair of magnets repel every time, or attract every time.", why: "Pupils generalise from the first pair they test.", response: "Turn one magnet round and test again. Record both results in a table." },
      { mistake: "Believes a bigger or stronger magnet always attracts.", why: "Strength is mixed up with direction of the force.", response: "Test a strong and a weak magnet with the same facing poles. Strength changes how strong the push or pull is, not whether it is a push or a pull." },
    ],
    vocabulary: [
      { term: "predict", meaning: "Say what you think will happen, with a reason." },
      { term: "facing poles", meaning: "The two poles nearest each other across the gap." },
      { term: "like poles", meaning: "Two poles that are the same, such as N and N." },
      { term: "unlike poles", meaning: "Two poles that are different, such as N and S." },
      { term: "attract", meaning: "Pull together." },
      { term: "repel", meaning: "Push apart." },
    ],
    before: "Pupils have not studied magnets in key stage 1. In Year 3 they have observed poles and attraction in the preceding topics.",
    next: "Year 5 pupils study forces such as gravity and friction. Magnetic fields and electromagnets are in key stage 3.",
  },
};
