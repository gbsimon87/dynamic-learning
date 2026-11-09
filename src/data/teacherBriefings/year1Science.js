/**
 * Teacher subject-knowledge briefings for Year 1 Science, one per topic id.
 *
 * These notes are authored for teachers and have NOT been content-reviewed yet.
 * Each `statutory` string is quoted verbatim from the programme of study in
 * docs/curriculum/year-1-science.md (the PDF text). Never paraphrase or alter it:
 * a test checks every quote against that file.
 *
 * Shape of each entry:
 *   statutory: 1-2 verbatim quotes
 *   inBrief: the essential idea
 *   keyFacts: 3-5 subject-knowledge points
 *   misconceptions: [{ mistake, why, response }]
 *   vocabulary: [{ term, meaning }]
 *   before / next: EYFS prior learning and the Year 2+ destination
 */
export const YEAR1_SCIENCE_BRIEFINGS = {
  // ---------------------------------------------------------------- Plants
  "wild-and-garden-plants": {
    statutory: ["identify and name a variety of common wild and garden plants"],
    inBrief: "Pupils learn the names of common plants and notice the clues that identify them, such as petal colour, leaf shape or a seed head. Wild plants grow by themselves; garden plants are usually planted by people.",
    keyFacts: [
      "Identify a plant from clues you can see: flower colour and shape, leaf shape, hairs or stings, and seed heads. Daisy, dandelion, buttercup, clover, bluebell, poppy and stinging nettle are common wild plants.",
      "Sunflowers, tulips, roses, daffodils and lavender are usually planted in gardens. Tulips and daffodils grow from bulbs.",
      "The wild or garden label describes where a plant usually grows, not what it is. A daffodil can be found growing wild, and a poppy can be planted in a garden, so the safest word is 'usually'.",
      "Pupils should be taught never to touch or taste a plant they do not know. Stinging nettles and thorns on roses are good reasons to look first and touch second.",
      "Boundary: naming common plants from clear features and sorting wild from garden. Scientific names, plant families and identification keys are not expected.",
    ],
    misconceptions: [
      { mistake: "A plant growing in a garden must be a garden plant.", why: "Pupils judge by where they last saw a plant, and weeds such as dandelions turn up in gardens.", response: "Ask who planted it. If nobody did, it is wild. Look at a lawn or pavement crack and name the wild plants growing there." },
      { mistake: "Wild plants are always small or plain, and garden plants are always big and colourful.", why: "Daisies and clover are small, and showy flowers such as tulips and roses are common in gardens.", response: "Find a wild plant with a bright flower, such as a poppy or bluebell, and a plain garden plant, such as a herb, and compare." },
      { mistake: "Any plant that looks pretty is safe to pick, taste or smell closely.", why: "Young children link attractive colours and smells with safety.", response: "Set a clear rule: look and draw, never taste, and ask an adult before touching. Show a stinging nettle from a safe distance." },
    ],
    vocabulary: [
      { term: "wild plant", meaning: "A plant that grows by itself. Nobody planted it." },
      { term: "garden plant", meaning: "A plant that is usually planted by people." },
      { term: "petal", meaning: "The coloured part of a flower." },
      { term: "bulb", meaning: "A plant part under the ground that grows into a new plant, such as a tulip or daffodil." },
      { term: "seed head", meaning: "The part of a plant where the seeds grow, such as the dandelion's fluffy ball." },
      { term: "identify", meaning: "Find out what something is by looking closely at its clues." },
    ],
    before: "In the Early Years pupils talk about the natural world, notice features of plants they see outdoors, and may plant seeds or bulbs. Many already know daisies, dandelions and sunflowers by name.",
    next: "In Year 2 pupils identify and name plants and animals in their habitats, including micro-habitats, and watch seeds and bulbs grow. In Year 4 they use classification keys to group and name living things.",
  },

  "deciduous-and-evergreen-trees": {
    statutory: [
      "identify and name a variety of common wild and garden plants, including deciduous and evergreen trees",
    ],
    inBrief: "Deciduous trees lose their leaves in autumn and are bare in winter. Evergreen trees keep leaves all year round, so they still look green in winter.",
    keyFacts: [
      "Common deciduous trees: oak (acorns), horse chestnut (conkers), sycamore (winged seeds), silver birch (white bark) and apple.",
      "Common evergreens: holly (prickly leaves and red berries), pine and fir (needles and cones).",
      "An oak's year in order: new leaves open in spring, it is full of green leaves in summer, the leaves turn brown and fall in autumn, and it has bare branches in winter.",
      "Evergreen trees do lose leaves, but a few at a time throughout the year, so the tree is never bare. Needles and holly leaves are leaves.",
      "Boundary: telling apart the two kinds and naming common examples from clues such as seeds, cones and bark. Why trees lose leaves is not expected, and neither is identifying trees from leaf shape alone.",
    ],
    misconceptions: [
      { mistake: "Evergreen trees never lose any leaves.", why: "The tree always looks green, so pupils assume nothing ever falls.", response: "Look under a pine or holly tree for old needles and leaves. Explain that it sheds a few at a time, while deciduous trees lose them all at once." },
      { mistake: "Deciduous trees are dead in winter.", why: "Bare branches look lifeless.", response: "Look closely at the twigs for buds. Visit the same tree each season and photograph it to show new leaves coming back." },
      { mistake: "Only trees with needles are evergreen, or all trees with needles stay the same.", why: "Pine and fir are the best-known examples, and holly with its broad leaves is overlooked.", response: "Find a holly or laurel and compare. Sort real leaves into 'needles' and 'broad leaves', then ask which tree keeps its leaves in winter." },
    ],
    vocabulary: [
      { term: "deciduous", meaning: "A tree that loses all its leaves in autumn." },
      { term: "evergreen", meaning: "A tree that keeps its leaves all year, so it stays green in winter." },
      { term: "needle", meaning: "A thin, pointed leaf, as on pine and fir trees." },
      { term: "cone", meaning: "The hard, scaly seed holder of a pine or fir tree." },
      { term: "bare", meaning: "With no leaves." },
      { term: "bud", meaning: "A small lump on a twig that opens into a leaf or flower." },
    ],
    before: "In the Early Years pupils notice changes in the seasons, collect autumn leaves, conkers and acorns, and talk about trees they see on walks.",
    next: "In Year 2 pupils name plants in their habitats and learn how seeds and bulbs grow. In Year 3 they study the functions of plant parts. In Year 4 they use keys to group living things.",
  },

  "parts-of-a-flowering-plant": {
    statutory: [
      "identify and describe the basic structure of a variety of common flowering plants",
    ],
    inBrief: "Pupils name the main parts of a flowering plant and say simply where each is and what it looks like. Describing structure comes before explaining what each part does.",
    keyFacts: [
      "The parts to name: flower, petal, leaf, stem, roots, bulb, seed and fruit.",
      "Roots are under the ground. The stem, leaves and flower are above it. A bulb is a store under the ground for plants such as tulips and daffodils.",
      "A seed grows into a new plant. A fruit is the part that holds the seeds, such as an apple or a tomato.",
      "Many plants grow from seeds and some from bulbs. Pupils can plant seeds and bulbs and observe them as they grow.",
      "Boundary: naming and describing where the parts are. Explaining the functions of roots, stem and leaves is a Year 3 requirement, and the inner parts of a flower are later still.",
    ],
    misconceptions: [
      { mistake: "A fruit is only something sweet that you eat, so a tomato or a pea pod is not a fruit.", why: "Everyday use of 'fruit' means sweet things in a fruit bowl.", response: "Cut open a tomato or pepper and find the seeds. Say that a fruit holds seeds, and keep to examples the pupils can see." },
      { mistake: "Roots are only found on big trees, or a plant's roots are just the same as its stem.", why: "Roots are hidden, so pupils seldom see them.", response: "Carefully dig up a weed or a seedling and look at its roots. Draw it and label it with arrows." },
      { mistake: "A bulb is a type of seed.", why: "Bulbs are small, are planted in the soil and grow into new plants, just as seeds do.", response: "Cut a bulb in half and compare it with a seed. Say that seeds and bulbs are different, and both can grow into a new plant." },
    ],
    vocabulary: [
      { term: "flower", meaning: "The part of a plant that is often colourful and can make seeds." },
      { term: "petal", meaning: "One of the coloured parts around the middle of a flower." },
      { term: "leaf", meaning: "A flat, usually green part that grows from the stem." },
      { term: "stem", meaning: "The part that holds the plant up and joins the leaves and flower to the roots." },
      { term: "roots", meaning: "The parts that grow under the ground." },
      { term: "bulb", meaning: "A part under the ground that grows into a new plant, such as a daffodil." },
      { term: "seed", meaning: "A small part that grows into a new plant." },
      { term: "fruit", meaning: "The part of a plant that holds the seeds." },
    ],
    before: "In the Early Years pupils plant seeds or bulbs, watch them grow, and talk about what they notice about roots, stems, leaves and flowers.",
    next: "In Year 2 pupils observe how seeds and bulbs grow into mature plants and what plants need to stay healthy. In Year 3 they identify and describe the functions of the parts of flowering plants.",
  },

  "parts-of-a-tree": {
    statutory: [
      "identify and describe the basic structure of a variety of common flowering plants, including trees",
    ],
    inBrief: "Trees are plants and have a structure that pupils can name: trunk, branches, leaves and roots, plus blossom, fruit and bark. Some parts are above the ground and some are below.",
    keyFacts: [
      "The trunk is the thick stem of a tree. Branches grow out of the trunk, and leaves grow on the branches.",
      "The roots are below the ground and are not seen unless soil has worn away or the tree has fallen.",
      "Bark is the tough outer covering of the trunk and branches. Its look can help to identify a tree, such as the white, papery bark of a silver birch.",
      "Trees are flowering plants. Their blossom can be small and easy to miss, and it turns into fruit or nuts that hold seeds.",
      "Boundary: naming and describing the main parts and sorting them as above or below ground. The jobs of the parts, such as moving water, are not expected until Year 3.",
    ],
    misconceptions: [
      { mistake: "Trees are not plants, or are not flowering plants.", why: "Trees are big and woody, and their flowers are small, so they look different from garden flowers.", response: "Look at blossom on an apple, cherry or hawthorn in spring, then find the fruit later. Say that trees are plants with a trunk instead of a soft stem." },
      { mistake: "A tree's roots are as small as the part of the tree that you can see at the base.", why: "Roots are hidden, so pupils cannot picture how far they spread.", response: "Draw the tree with roots on a long strip of paper below the ground line. Say that roots are often as wide as the branches." },
      { mistake: "Branches and the trunk are different from the stem of a plant.", why: "Woody parts do not look like a green flower stem.", response: "Compare a sunflower stem and a tree trunk side by side. Say that the trunk is a tree's very thick stem." },
    ],
    vocabulary: [
      { term: "trunk", meaning: "The thick, woody stem of a tree." },
      { term: "branch", meaning: "A part that grows out from the trunk and holds the leaves." },
      { term: "bark", meaning: "The tough covering on the outside of a trunk and branches." },
      { term: "blossom", meaning: "The flowers on a tree, often in spring." },
      { term: "roots", meaning: "The parts of a tree that grow under the ground." },
      { term: "fruit", meaning: "The part of a tree that holds the seeds, such as an apple." },
    ],
    before: "In the Early Years pupils explore trees outdoors, make bark rubbings and collect leaves and seeds, using words such as tall, thick and rough.",
    next: "In Year 3 pupils identify and describe the functions of roots, stem or trunk, leaves and flowers. Year 5 pupils study the life processes of reproduction in plants.",
  },

  // ------------------------------------------------- Animals, including humans
  "fish-amphibians-reptiles-birds-and-mammals": {
    statutory: [
      "identify and name a variety of common animals including fish, amphibians, reptiles, birds and mammals",
    ],
    inBrief: "Animals can be sorted into five groups using features that can be seen. Sorting by features, rather than by where an animal lives, is the key idea.",
    keyFacts: [
      "Fish live in water, have fins and breathe with gills. Examples: goldfish, salmon, shark.",
      "Amphibians have smooth, damp skin and lay eggs in water. Young frogs are tadpoles. Examples: frog, newt.",
      "Reptiles have dry, scaly skin. Examples: snake, lizard, tortoise, crocodile.",
      "Birds have feathers, a beak and wings, and lay eggs. Penguins are birds that cannot fly. Mammals have hair or fur and feed their babies milk. Whales, dolphins and bats are mammals.",
      "Boundary: five groups, sorted from a few clear features. Vertebrate and invertebrate groups, classification keys and unusual cases such as the platypus are not expected.",
    ],
    misconceptions: [
      { mistake: "Whales and dolphins are fish because they live in water.", why: "Pupils group by habitat and by shape.", response: "Compare features: they breathe air, have no gills and feed milk to their young, so they are mammals. Sort by features first and habitat second." },
      { mistake: "Bats are birds because they fly.", why: "Flying is the most obvious feature.", response: "Look at a photo of a bat. Fur, not feathers, and milk for its young show that it is a mammal." },
      { mistake: "Penguins are not birds because they cannot fly.", why: "Pupils think that all birds fly.", response: "Check the list of bird features: feathers, a beak and wings. A penguin has all three, so it is a bird." },
    ],
    vocabulary: [
      { term: "fish", meaning: "An animal that lives in water, has fins and breathes with gills." },
      { term: "amphibian", meaning: "An animal with smooth, damp skin that starts life in water, such as a frog." },
      { term: "reptile", meaning: "An animal with dry, scaly skin, such as a snake." },
      { term: "bird", meaning: "An animal with feathers, wings and a beak." },
      { term: "mammal", meaning: "An animal with hair or fur that feeds its babies milk." },
      { term: "gills", meaning: "The parts a fish uses to breathe under water." },
      { term: "feature", meaning: "Something you can see about an animal that helps you group it." },
    ],
    before: "In the Early Years pupils talk about animals they know, such as pets and farm animals, and look at the differences between living things.",
    next: "In Year 2 pupils learn about habitats, food chains and how animals have offspring. In Year 4 they group living things using classification keys, and in Year 6 they classify living things into broad groups.",
  },

  "carnivores-herbivores-and-omnivores": {
    statutory: [
      "identify and name a variety of common animals that are carnivores, herbivores and omnivores",
    ],
    inBrief: "Animals can be grouped by what they eat. Carnivores eat other animals, herbivores eat only plants, and omnivores eat both plants and animals.",
    keyFacts: [
      "Carnivores include lions, tigers, sharks, owls, snakes and crocodiles.",
      "Herbivores include cows, rabbits, sheep, horses, giraffes and elephants.",
      "Omnivores include pigs, brown bears, foxes and chickens.",
      "Pupils decide from what an animal eats, not from how it looks. A big, strong animal is not always a carnivore, and a small animal might be.",
      "Boundary: naming clear-cut examples and grouping them. Food chains are Year 2, and producers, predators and prey are Year 4. Mixed or changing diets, such as those of dogs or hedgehogs, are left for later.",
    ],
    misconceptions: [
      { mistake: "Big, fierce-looking animals are always carnivores.", why: "Teeth, size and strength suggest hunting.", response: "Compare an elephant and a lion. Look at what each eats, not at how big it is." },
      { mistake: "Omnivores are only humans, or herbivores eat a little meat as well.", why: "Pupils may connect omnivores only with their own diet.", response: "Name an animal such as a pig or a fox and list what it eats. Say that herbivores eat only plants, and omnivores eat plants and animals." },
      { mistake: "An animal that eats insects is a herbivore.", why: "Insects are small, so pupils do not count them as animals.", response: "Explain that insects are animals. A bird or a frog that eats insects is eating animals, so it is a carnivore or omnivore." },
    ],
    vocabulary: [
      { term: "carnivore", meaning: "An animal that eats other animals." },
      { term: "herbivore", meaning: "An animal that eats only plants." },
      { term: "omnivore", meaning: "An animal that eats both plants and animals." },
      { term: "diet", meaning: "The food that an animal usually eats." },
      { term: "prey", meaning: "An animal that is eaten by another animal." },
    ],
    before: "In the Early Years pupils talk about what animals eat, feed pets or birds, and think about healthy food for themselves.",
    next: "In Year 2 pupils describe how animals get food from plants and other animals using simple food chains. In Year 4 they construct food chains with producers, predators and prey.",
  },

  "comparing-animal-bodies": {
    statutory: [
      "describe and compare the structure of a variety of common animals (fish, amphibians, reptiles, birds and mammals, including pets)",
    ],
    inBrief: "Pupils look closely at animal bodies and say what is the same and what is different. Body coverings, wings, fins, beaks, shells and legs all help to describe and group animals.",
    keyFacts: [
      "Body coverings: fish have scales, amphibians have smooth, damp skin, reptiles have dry scales, birds have feathers, and mammals have hair or fur.",
      "Birds have two wings and two legs. Fish have fins and no legs. Many mammals have four legs, though humans have two and whales have flippers.",
      "A tortoise has a shell as well as scaly skin, and a snail has a shell but is not a reptile.",
      "Comparing means saying what two animals share and what one has that the other does not, for example 'a dog and a cat both have fur and four legs, but a cat is smaller'.",
      "Boundary: describing and comparing visible structure, including pets. Explaining how structure suits a habitat is Year 2 and later.",
    ],
    misconceptions: [
      { mistake: "Animals with wings are all birds.", why: "Bats, butterflies and bees all have wings.", response: "Compare the wings and covering of a bird, a bat and a bee. Only the bird has feathers." },
      { mistake: "Animals with shells are all the same kind of animal.", why: "A tortoise and a snail both have a shell.", response: "Compare a tortoise and a snail: legs, skin and body. Say that a shell is one feature and many features matter." },
      { mistake: "Two animals are either completely the same or completely different.", why: "Young children compare in all-or-nothing terms.", response: "Use a two-circle overlap diagram of two pets and ask for one thing in the middle and one in each side." },
    ],
    vocabulary: [
      { term: "structure", meaning: "The parts that make up an animal's body and how they are arranged." },
      { term: "compare", meaning: "Say how two things are the same and how they are different." },
      { term: "scales", meaning: "Small, hard plates covering the skin of fish and reptiles." },
      { term: "feathers", meaning: "The light coverings of a bird's body." },
      { term: "fins", meaning: "The flat parts a fish uses to swim." },
      { term: "beak", meaning: "The hard, pointed mouth of a bird." },
      { term: "shell", meaning: "A hard covering on the outside of some animals' bodies." },
    ],
    before: "In the Early Years pupils talk about the features of animals they see, using words about size, colour, texture and number of legs.",
    next: "In Year 2 pupils learn that animals have offspring that grow into adults and that animals live in habitats that suit them. In Year 3 they learn that humans and some other animals have skeletons.",
  },

  "parts-of-the-human-body": {
    statutory: [
      "identify, name, draw and label the basic parts of the human body",
    ],
    inBrief: "Pupils learn the names of the main parts of the body and can point to them, label them and draw them. Knowing the correct names is the first step in talking about how bodies work.",
    keyFacts: [
      "Parts to name: head, neck, arms, elbows, legs, knees, face, ears, eyes, hair, mouth and teeth.",
      "Pupils should practise the names with games, actions, songs and rhymes, and also practise spelling them.",
      "A label points to a part with a line or arrow. In Bix, pupils name and spell the labels on a diagram.",
      "Use the correct terms and treat all bodies respectfully. Say 'elbow' and 'knee' rather than only 'bendy part'.",
      "Boundary: outside body parts only. Inner organs, the skeleton and the digestive system are later (Year 3 and Year 4).",
    ],
    misconceptions: [
      { mistake: "The elbow is part of the hand, or the knee is the top of the leg.", why: "Pupils know the big parts but find the joints in between harder to locate.", response: "Bend and straighten the joint. Ask 'where does it bend?' and then point to and name the joint." },
      { mistake: "Hair and teeth are not body parts, because they are not alive or do not feel anything.", why: "Pupils may feel that a part must have a job or a feeling to be a part.", response: "Point out that teeth and hair grow on the body and are parts of it. Compare with finding a tooth on the floor." },
      { mistake: "Left and right label the wrong arm or leg when pupils face one another.", why: "Mirror images of a partner reverse left and right.", response: "Label body parts first without 'left' or 'right', and add them later with the pupils facing the same way as the diagram." },
    ],
    vocabulary: [
      { term: "head", meaning: "The top part of the body with the face and hair." },
      { term: "neck", meaning: "The part that joins the head to the body." },
      { term: "elbow", meaning: "The joint in the middle of the arm." },
      { term: "knee", meaning: "The joint in the middle of the leg." },
      { term: "label", meaning: "A word that tells you the name of a part." },
      { term: "diagram", meaning: "A drawing that shows the parts of something with labels." },
    ],
    before: "In the Early Years pupils learn the names of body parts through songs and games and begin to talk about how their bodies work and how to keep them healthy.",
    next: "In Year 2 pupils learn what humans need to survive and how exercise, food and hygiene matter. In Year 3 they learn about skeletons and muscles, and in Year 4 about the digestive system and teeth.",
  },

  "our-five-senses": {
    statutory: [
      "say which part of the body is associated with each sense",
    ],
    inBrief: "We find out about the world with five senses. Each sense is linked to a part of the body: eyes for sight, ears for hearing, nose for smell, tongue for taste and skin for touch.",
    keyFacts: [
      "Sight uses the eyes, hearing uses the ears, smell uses the nose, taste uses the tongue, and touch uses the skin.",
      "Skin covers the whole body, so we can feel with our hands, feet and every other part.",
      "We often use several senses together. Eating uses taste and smell, and also sight, touch and sound.",
      "Safety: never taste, smell closely or touch an unknown plant, berry or substance. Use taste only for food that an adult has said is safe.",
      "Boundary: matching each sense to its body part in everyday situations. How the brain and nerves work is not expected.",
    ],
    misconceptions: [
      { mistake: "We taste with our mouth or lips only, or we smell with our mouth.", why: "Food goes in the mouth, and flavour comes from taste and smell together.", response: "Hold your nose while tasting a small safe food and notice how the flavour changes. Say that the tongue tastes and the nose smells." },
      { mistake: "Touch is just the hands.", why: "Hands are used most to explore.", response: "Touch a cool surface with an elbow, a cheek and a foot. Say that skin all over the body feels." },
      { mistake: "Bright berries that smell nice are safe to taste.", why: "Young children link colour and smell with food.", response: "Repeat the rule: we never taste a berry or plant outdoors unless an adult says it is safe." },
    ],
    vocabulary: [
      { term: "sense", meaning: "A way that your body finds out about the world." },
      { term: "sight", meaning: "Seeing, with your eyes." },
      { term: "hearing", meaning: "Hearing sounds, with your ears." },
      { term: "smell", meaning: "Smelling things, with your nose." },
      { term: "taste", meaning: "Tasting food and drink, with your tongue." },
      { term: "touch", meaning: "Feeling things, with your skin." },
    ],
    before: "In the Early Years pupils explore with their senses, such as feeling different textures, listening to sounds and smelling flowers or food.",
    next: "In Year 2 pupils learn what humans need to survive and stay healthy. In Year 4 pupils study how sound travels to the ear, and in Year 6 they learn how light lets us see.",
  },

  // ------------------------------------------------------ Everyday materials
  "objects-and-materials": {
    statutory: [
      "distinguish between an object and the material from which it is made",
    ],
    inBrief: "An object is a thing, and a material is what the thing is made from. A spoon is the object, and metal is the material.",
    keyFacts: [
      "Objects have names such as chair, cup, coat and window. Materials have names such as wood, plastic, glass, fabric and metal.",
      "The same object can be made from different materials: a cup can be plastic, glass or metal.",
      "Different objects can be made from the same material: a window, a bottle and a jar can all be glass.",
      "Some objects are made from more than one material. A pencil has wood, graphite and often metal and rubber.",
      "Boundary: separating the object word from the material word. Properties and why a material suits a job come in the next topics, and uses of materials are Year 2.",
    ],
    misconceptions: [
      { mistake: "Wood is an object, or 'chair' is a material.", why: "Pupils use object and material words together without seeing the difference.", response: "Use the sentence 'The ___ is made of ___.' to place each word, as in 'The chair is made of wood.'" },
      { mistake: "An object can only be made of one material.", why: "Examples at this age usually name one.", response: "Look at a pencil, a shoe or a bike and list its materials together." },
      { mistake: "Water, rock and air are not materials, only man-made things are.", why: "Pupils link 'material' with fabric or craft materials.", response: "Say that a material is what something is made from, and some materials come from nature, such as wood, rock and wool." },
    ],
    vocabulary: [
      { term: "object", meaning: "A thing, such as a chair, cup or coat." },
      { term: "material", meaning: "What a thing is made from, such as wood or plastic." },
      { term: "made of", meaning: "Words that link an object to its material." },
      { term: "natural", meaning: "Comes from nature, such as wood, rock and wool." },
      { term: "man-made", meaning: "Made by people, such as plastic." },
    ],
    before: "In the Early Years pupils handle and talk about everyday objects and describe how they look and feel.",
    next: "In Year 2 pupils compare the suitability of materials for particular uses and see how some solid objects can change shape. In Year 5 they study the properties and changes of materials in more depth.",
  },

  "naming-everyday-materials": {
    statutory: [
      "identify and name a variety of everyday materials, including wood, plastic, glass, metal, water, and rock",
    ],
    inBrief: "Pupils learn to name common materials and spot them in objects around them. The statutory list is wood, plastic, glass, metal, water and rock, and pupils should meet others such as paper, fabric, rubber, brick and foil.",
    keyFacts: [
      "Wood comes from trees. Rock is a natural solid from the ground. Water is a liquid. These are natural materials.",
      "Plastic is man-made, glass is made by heating sand, and metals such as iron and aluminium are taken from rocks called ores.",
      "Paper is made from wood, fabric from fibres such as cotton or wool, and rubber from tree sap or man-made sources.",
      "Pupils name the material by looking, feeling and thinking about what the object is usually made from. A material name tells us what it is made of, not what it is for.",
      "Boundary: naming a wide range of materials in familiar objects. Why a material suits a job and the properties of materials follow in the next topics.",
    ],
    misconceptions: [
      { mistake: "All metal is the same, or all metal is silver-coloured.", why: "Pupils see only a few metal objects, such as spoons and tins.", response: "Look at copper pipes, a gold-coloured ring and an aluminium can together. Say that there are many metals." },
      { mistake: "Plastic is a single material, so every plastic thing feels the same.", why: "Plastic is common, so pupils treat it as one thing.", response: "Compare a hard plastic ruler, a bendy straw and a soft bag. Say that plastics come in many kinds." },
      { mistake: "Water is not a material because we do not make things from it.", why: "Pupils think a material must be solid.", response: "Say that water is one of the statutory materials. Talk about ice and water in a puddle, and note that a bottle holds a material." },
    ],
    vocabulary: [
      { term: "wood", meaning: "A material from trees." },
      { term: "plastic", meaning: "A man-made material that can be made in many shapes." },
      { term: "glass", meaning: "A hard material that you can usually see through." },
      { term: "metal", meaning: "A hard material that is often shiny, such as iron or aluminium." },
      { term: "rock", meaning: "A hard natural material from the ground." },
      { term: "fabric", meaning: "A material made from threads, such as cotton." },
    ],
    before: "In the Early Years pupils explore the look and feel of different materials and use words such as hard, soft, shiny and rough.",
    next: "In Year 2 pupils name the suitability of wood, metal, plastic, glass, brick, rock, paper and cardboard for different uses. In Year 5 they group materials by properties such as hardness and conductivity.",
  },

  "properties-of-materials": {
    statutory: [
      "describe the simple physical properties of a variety of everyday materials",
    ],
    inBrief: "A property is how a material looks, feels or behaves. Pupils describe materials with pairs of words such as hard and soft, and check by simple tests.",
    keyFacts: [
      "Property pairs: hard/soft, stretchy/stiff, shiny/dull, rough/smooth, bendy/not bendy, waterproof/not waterproof, absorbent/not absorbent, opaque/transparent.",
      "Transparent means that you can see clearly through it, and opaque means that you cannot. A material that lets some light through but is not clear is translucent, which is not needed in Year 1.",
      "Waterproof means that water does not soak in or go through. Absorbent means that it soaks water up, like a sponge or a paper towel.",
      "A property belongs to a material, not to one object. Properties help us choose a material, but each pair is a scale, so something can be quite hard or very soft.",
      "Boundary: describing and testing with simple words. Solubility, conductivity and the shapes of solids are later, in Year 2 and Year 5.",
    ],
    misconceptions: [
      { mistake: "Hard and strong mean the same thing.", why: "Pupils use the words together for tough objects.", response: "Compare a thick sponge, which is soft, with a thin glass, which is hard. Test with a squeeze and ask what is meant." },
      { mistake: "Transparent means clear or empty, so a window has no material.", why: "We look through glass as if it were not there.", response: "Tap a window and a clear plastic bag. Say that they are both materials, and light passes through." },
      { mistake: "Waterproof things absorb water.", why: "The words are similar in length and both relate to water.", response: "Test a sponge and a plastic tray with a few drops of water and record: one soaks in (absorbent) and one does not (waterproof)." },
    ],
    vocabulary: [
      { term: "property", meaning: "A word that describes how a material looks, feels or behaves." },
      { term: "hard / soft", meaning: "Hard does not squash easily. Soft squashes easily." },
      { term: "stretchy / stiff", meaning: "Stretchy gets longer when pulled. Stiff does not." },
      { term: "shiny / dull", meaning: "Shiny reflects light. Dull does not." },
      { term: "waterproof", meaning: "Does not let water through." },
      { term: "absorbent", meaning: "Soaks up water." },
      { term: "transparent", meaning: "You can see clearly through it." },
      { term: "opaque", meaning: "You cannot see through it." },
    ],
    before: "In the Early Years pupils feel and describe materials using words such as soft, rough, smooth and shiny, and notice what happens when things get wet.",
    next: "In Year 2 pupils compare the suitability of materials for uses and test how solids change shape. In Year 5 they group materials by hardness, solubility, transparency and conductivity.",
  },

  "grouping-materials": {
    statutory: [
      "compare and group together a variety of everyday materials on the basis of their simple physical properties",
    ],
    inBrief: "Pupils sort materials into groups by a property they share, and choose the best material for a job. This is the first step in using properties to make choices.",
    keyFacts: [
      "Group by one property at a time, such as 'waterproof' or 'not waterproof', and say the reason for the group.",
      "Odd one out: find the material that does not share the property of the others.",
      "Choose the best material for a job from its properties: an umbrella needs a waterproof, bendy material; curtains need an opaque, soft one; a bookshelf needs a hard, stiff one.",
      "A simple test, such as dripping water on materials and seeing which soak it up, gives evidence for the grouping.",
      "Boundary: grouping by simple properties and suggesting a suitable material. Fair tests with measuring are not expected, and detailed use of materials is Year 2.",
    ],
    misconceptions: [
      { mistake: "A material has only one property, so it can only go in one group.", why: "Pupils sort by the first thing they notice.", response: "Sort the same set twice by different properties, such as shiny/dull and then bendy/not bendy." },
      { mistake: "The best material is the strongest or the most expensive one.", why: "Pupils think of one 'best' for every job.", response: "Ask what the job needs. For a dog basket, soft and warm matter more than hard." },
      { mistake: "A material that looks absorbent will soak up water, without trying it.", why: "Pupils judge from the look instead of testing.", response: "Predict, then test with a few drops of water and record the results before the sorting." },
    ],
    vocabulary: [
      { term: "group", meaning: "Put things together because they share something." },
      { term: "sort", meaning: "Put things into groups using a rule." },
      { term: "odd one out", meaning: "The one that does not share the property of the others." },
      { term: "test", meaning: "Try something out to find the answer." },
      { term: "suitable", meaning: "Good for the job." },
      { term: "predict", meaning: "Say what you think will happen." },
    ],
    before: "In the Early Years pupils sort and match objects by colour, size and texture, and say why they have put things together.",
    next: "In Year 2 pupils compare the suitability of materials for particular uses and explore how shapes change by squashing, bending, twisting and stretching. In Year 5 they give reasons for uses based on fair-test evidence.",
  },

  // ------------------------------------------------------- Seasonal changes
  "the-four-seasons": {
    statutory: ["observe changes across the four seasons"],
    inBrief: "The year has four seasons in a repeating order: spring, summer, autumn, winter, then spring again. Each season brings changes that pupils can see in nature.",
    keyFacts: [
      "The cycle never stops. Any season can be the start, and after winter comes spring.",
      "Signs of the seasons in the UK: new leaves, blossom and lambs in spring; long, warm days and full leaves in summer; falling and brown leaves, conkers and acorns in autumn; bare trees, frost and short days in winter.",
      "The seasons are linked to the Earth's tilt as it travels around the Sun. Pupils do not need this explanation yet.",
      "Observing means looking closely at the same place through the year, for example a tree, and drawing, photographing or recording it each season.",
      "Boundary: naming the seasons, their order and signs in nature. Why the seasons happen is Year 5.",
    ],
    misconceptions: [
      { mistake: "The year begins with winter, or the seasons start on the same date everywhere.", why: "Calendars begin in January, which is in the middle of winter.", response: "Draw the seasons as a circle with no start or end. Say that the order repeats, so autumn is followed by winter and then spring." },
      { mistake: "Seasons are the same all over the world.", why: "Pupils generalise from where they live.", response: "Say that the Bix seasons describe the UK. In some places the year has different seasons, such as wet and dry." },
      { mistake: "In winter all the plants die, and in summer all the animals are active.", why: "Bare trees and hibernation are visible signs.", response: "Look at buds on bare trees and evergreens in winter, and ask what animals do in each season." },
    ],
    vocabulary: [
      { term: "season", meaning: "One of the four parts of the year: spring, summer, autumn and winter." },
      { term: "spring", meaning: "The season after winter, when new leaves and flowers appear." },
      { term: "summer", meaning: "The warmest season, with the longest days." },
      { term: "autumn", meaning: "The season when leaves turn brown and fall." },
      { term: "winter", meaning: "The coldest season, with the shortest days." },
      { term: "cycle", meaning: "Something that repeats in the same order." },
    ],
    before: "In the Early Years pupils talk about the seasons, go on seasonal walks, and notice changes in weather, plants and animals.",
    next: "In Year 2 pupils see how plants and animals live in different habitats. In Year 3 they study light and shadows, and in Year 5 they use the Earth's movement to explain day and night.",
  },

  "weather-and-the-seasons": {
    statutory: ["observe and describe weather associated with the seasons"],
    inBrief: "Weather is what the air outside is like each day, and different seasons usually bring different weather. We say a season is 'most likely' to have some weather, never 'only'.",
    keyFacts: [
      "Weather words: sunny, rainy, snowy, cloudy, windy, foggy and stormy.",
      "In the UK, summer is usually warmest and sunniest, winter is usually coldest, and snow is most likely in winter. Rain, wind and cloud can come in any season.",
      "Pupils can record weather in a table, a chart or a pictogram over two weeks and compare what they find.",
      "Weather decides what we wear: a coat and boots for rain, a hat and sunscreen for hot sun.",
      "Safety: never look directly at the Sun, even when wearing dark glasses. Boundary: describing weather and linking it to seasons. Measuring temperature and rainfall is not expected.",
    ],
    misconceptions: [
      { mistake: "It only rains in autumn, or snow can only fall in winter.", why: "Pupils link each season with one kind of weather.", response: "Record the weather for two weeks and show that the same kind can happen in several seasons. Use 'most likely'." },
      { mistake: "Weather and the season are the same thing.", why: "Pupils use 'it is winter' and 'it is cold' together.", response: "Say that the season is the part of the year, and weather is what it is like today. A warm day in winter shows the difference." },
      { mistake: "Dark glasses make it safe to look at the Sun.", why: "Sunglasses reduce brightness, so they seem protective.", response: "State the rule clearly: never look at the Sun, even with sunglasses." },
    ],
    vocabulary: [
      { term: "weather", meaning: "What it is like outside today: sunny, rainy, windy and so on." },
      { term: "sunny", meaning: "Bright, with the Sun shining." },
      { term: "cloudy", meaning: "Covered by clouds." },
      { term: "windy", meaning: "With strong moving air." },
      { term: "foggy", meaning: "With thick mist near the ground, which makes it hard to see far." },
      { term: "pictogram", meaning: "A chart that uses pictures to show counts." },
    ],
    before: "In the Early Years pupils talk about the weather each day, dress for it, and notice how it changes through the year.",
    next: "In Year 2 pupils learn how plants and animals live in habitats and what they need. In Year 3 pupils study light, and in Year 5 they learn about the Sun, Earth and Moon.",
  },

  "day-length-through-the-year": {
    statutory: ["observe and describe weather associated with the seasons and how day length varies"],
    inBrief: "The number of hours of daylight changes through the year: days are longest in summer and shortest in winter. Pupils compare day lengths using simple pictures and numbers.",
    keyFacts: [
      "In London there are about 8 hours of daylight in December, about 12 in March and in September, and about 16 in June. These figures are rounded.",
      "Day length changes gradually: days get longer from winter to summer and shorter from summer to winter.",
      "Daylight is the time between sunrise and sunset. Bix shows each hour as a box, and a sun box is an hour of daylight.",
      "The length of the day is linked to the season, and these numbers are for the UK. Places closer to the equator have days that stay nearer to 12 hours.",
      "Boundary: comparing and describing day lengths with simple counts. The Earth's tilt and rotation, and measuring sunrise times, are Year 5.",
    ],
    misconceptions: [
      { mistake: "The Sun moves further away in winter, so the days are shorter.", why: "Winter feels colder, so the Sun seems far away.", response: "Say that the reason is later work. For now, record the sunrise and sunset times, and note that the days are shorter in winter." },
      { mistake: "A day in winter has fewer hours than in summer.", why: "Day length can be mixed up with a whole day of 24 hours.", response: "Say that every day has 24 hours, but the daylight part is longer in summer. Show 24 boxes with only some marked as sun." },
      { mistake: "Day length is the same everywhere in the world.", why: "Pupils generalise from where they live.", response: "Say that these numbers describe the UK, and day length is different in other places." },
    ],
    vocabulary: [
      { term: "daylight", meaning: "The time of day when it is light outside." },
      { term: "day length", meaning: "How many hours of daylight there are." },
      { term: "sunrise", meaning: "When the Sun first comes up in the morning." },
      { term: "sunset", meaning: "When the Sun goes down in the evening." },
      { term: "longer / shorter", meaning: "Words for comparing how many hours of daylight there are." },
      { term: "hour", meaning: "A length of time. There are 24 in a day." },
    ],
    before: "In the Early Years pupils notice that it gets dark earlier in winter and talk about day and night in their routines.",
    next: "In Year 3 pupils learn how shadows are formed and find patterns in how their size changes. In Year 5 they use the Earth's rotation to explain day and night and the apparent movement of the Sun.",
  },
};
