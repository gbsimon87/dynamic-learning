// Pictorial teaching summaries for every Year 4 Science topic.
// Source mapping: docs/curriculum/year-4-science.md. Symbols are paired with
// words; these examples appear in notes, never as answers beside a question.
export const YEAR4_SCIENCE_CONCEPTS = {
  "grouping-living-things": {
    title: "One living thing, different groups", flow: false,
    cards: [["🦋", "Animal", "A butterfly is an animal."], ["🦋", "Invertebrate", "It has no backbone."], ["🦋", "Insect", "It has six legs."]],
    note: "We can group the same living thing using different observable features.",
  },
  "classification-keys": {
    title: "Follow a yes-or-no question", flow: false,
    cards: [["🔍", "Does it have six legs?", "Look carefully before deciding."], ["🐜", "Yes", "An ant follows the six-leg branch."], ["🕷️", "No", "A spider has eight legs, so it follows the other branch."]],
    note: "A key uses a sequence of questions to narrow down an identification.",
  },
  "changing-environments": {
    title: "A changing pond habitat", flow: true,
    cards: [["🌿", "A healthy pond", "Plants provide shelter and food."], ["☀️", "A long dry spell", "The water level falls."], ["🐸", "Less water and shelter", "Some pond animals may struggle to survive."]],
    note: "Environmental changes can help some living things and harm others.",
  },
  "the-human-digestive-system": {
    title: "Follow the route of food", flow: true,
    cards: [["👄", "Mouth", "Teeth break food into smaller pieces."], ["〰️", "Oesophagus", "Moves food towards the stomach."], ["🥣", "Stomach", "Churns food and mixes it with digestive juices."], ["🌀", "Intestines", "Nutrients enter the body; water is absorbed before waste leaves."]],
    note: "Food travels along a connected route; the parts have different jobs.",
  },
  "teeth-and-their-functions": {
    title: "Different teeth, different jobs", flow: false,
    cards: [["🦷", "Incisors", "Front teeth cut and bite."], ["🦷", "Canines", "Pointed teeth tear food."], ["🦷", "Premolars and molars", "Broad surfaces crush and grind."]],
    note: "The shape and position of a tooth help it do its job.",
  },
  "food-chains": {
    title: "Arrows show food moving to an eater", flow: true,
    cards: [["🌱", "Grass", "A producer makes its own food."], ["🐇", "Rabbit", "Eats the grass."], ["🦊", "Fox", "Eats the rabbit."]],
    note: "Each arrow points from the food to the living thing that eats it.",
  },
  "solids-liquids-and-gases": {
    title: "Compare the three states", flow: false,
    cards: [["🧊", "Solid", "Keeps its own shape."], ["💧", "Liquid", "Flows and takes the shape of the bottom of its container."], ["💨", "Gas", "Spreads to fill its container."]],
    note: "Air is a gas mixture even though we usually cannot see it.",
  },
  "heating-and-cooling": {
    title: "A reversible change of state", flow: true,
    cards: [["🧊", "Ice: solid", "Warm it to melt it."], ["💧", "Water: liquid", "Cool it enough to freeze it again."]],
    note: "Heating and cooling can change a material's state without making a new material.",
  },
  "evaporation-and-condensation": {
    title: "From liquid to gas and back", flow: true,
    cards: [["💧", "Liquid water", "Evaporation happens at the surface."], ["💨", "Water vapour", "Water in its invisible gas state."], ["💧", "Liquid droplets", "Cooling vapour can cause condensation."]],
    note: "Evaporation can happen below boiling point; warmth can make it faster.",
  },
  "the-water-cycle": {
    title: "Water keeps moving", flow: true,
    cards: [["☀️", "Sun warms water", "Some water evaporates."], ["☁️", "Cloud droplets form", "Water vapour cools and condenses."], ["🌧️", "Rain falls", "Water collects and the cycle continues."]],
    note: "Clouds contain tiny water droplets or ice crystals, rather than invisible water vapour alone.",
  },
  "sounds-and-vibrations": {
    title: "A vibrating object makes sound", flow: true,
    cards: [["🥁", "Tap a drum gently", "The drum skin starts moving to and fro."], ["〰️", "Vibrations", "The skin vibrates and makes a sound."], ["👂", "Listen", "We can hear the sound when vibrations reach our ears."]],
    note: "A vibration can be too small or too quick for us to see clearly.",
  },
  "how-sound-travels": {
    title: "Sound needs a material to travel through", flow: true,
    cards: [["🔔", "Vibrating source", "A bell vibrates."], ["〰️", "A medium", "Air carries the vibrations."], ["👂", "Ear", "The vibrations reach a listener."]],
    note: "Solids, liquids and gases can carry sound; an empty vacuum cannot.",
  },
  "changing-pitch": {
    title: "Pitch means how high or low", flow: false,
    cards: [["🎸", "Shorter vibrating string", "A higher pitch."], ["🎸", "Longer vibrating string", "A lower pitch."]],
    note: "Compare strings with the same material, thickness and tension, changing only vibrating length.",
  },
  "volume-and-vibrations": {
    title: "Stronger vibrations make louder sounds", flow: false,
    cards: [["🔉", "Gentle tap", "Smaller vibrations and a quieter sound."], ["🔊", "Stronger tap", "Larger vibrations and a louder sound."]],
    note: "Compare the same instrument. Loudness is different from pitch; protect your hearing from very loud sounds.",
  },
  "sound-and-distance": {
    title: "Compare the same sound from different distances", flow: false,
    cards: [["🔔", "Same bell, same gentle strike", "Keep the sound source unchanged."], ["👂", "Listener nearby", "The sound is easier to hear."], ["🚶", "Listener farther away", "The sound is usually fainter."]],
    note: "Change distance while keeping the source and surroundings as similar as possible.",
  },
  "electrical-appliances-and-safety": {
    title: "Electricity can power appliances", flow: false,
    cards: [["🔋", "Battery power", "A torch can use cells."], ["🔌", "Mains power", "A fridge usually uses mains electricity."], ["🛑", "Keep safe", "Never put objects into sockets or touch damaged wires."]],
    note: "Classroom circuits use suitable cells, never mains electricity. Ask a grown-up about damaged equipment.",
  },
  "simple-series-circuits": {
    title: "Make one complete loop", flow: true,
    cards: [["🔋", "Cell", "Provides an electrical supply."], ["〰️", "Wires", "Join the components."], ["💡", "Bulb", "Is connected in the same loop."], ["🔋", "Back to the cell", "The loop joins both cell terminals."]],
    note: "A simple series circuit has one continuous path through its working components.",
  },
  "complete-and-incomplete-circuits": {
    title: "Trace every connection", flow: false,
    cards: [["⭕", "Complete loop", "A working bulb can light when joined across a suitable cell."], ["⛔", "Gap in the loop", "The path is broken, so the bulb will not light."]],
    note: "Both cell terminals must connect through the components; touching only one terminal is not enough.",
  },
  "switches": {
    title: "A switch controls the gap", flow: false,
    cards: [["⭕", "Closed switch", "Its contacts touch and complete the path."], ["⛔", "Open switch", "Its contacts separate and break the path."]],
    note: "Closed means the electrical path is joined; open means there is a gap.",
  },
  "conductors-and-insulators": {
    title: "Materials can complete or block a circuit", flow: false,
    cards: [["🥄", "Metal spoon", "Most metals are electrical conductors."], ["🪵", "Dry wooden stick", "Dry wood is usually an electrical insulator."], ["🧪", "Test safely", "Use a suitable cell in a classroom circuit with an adult."]],
    note: "Compare materials in the same complete test circuit; never test using mains electricity.",
  },
};
