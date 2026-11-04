import { fact as f, groups as g, sentence as s, sequence as o, measurement as n } from "./engine.js";
import { rule } from "../figures.js";

// Light. Light is drawn as straight rays and arrows always point TOWARDS the eye. Rainbows, bent
// straws and coloured filters are never explained (statutory note). Diagrams carried by a question
// are the thing being asked about; topic pictures only set the scene and never label an answer.
const scene = (backdrop, alt, items, extra = {}) => ({ type: "scene", backdrop, alt, items, ...extra });
const ray = (source, via, object, alt, labels = false) => ({ type: "lightPath", source, via, object, labels, alt });

const cardsTable = { headings: ["Arrangement of the three cards", "Did light reach the screen?"], rows: [["Holes in a straight line", "Yes"], ["Middle card moved 2 cm left", "No"], ["Middle card moved 2 cm right", "No"], ["Middle card taken away", "Yes"]] };
const reflectTable = { headings: ["Material", "Light reflected to the sensor (units)"], rows: [["Mirror", 90], ["Smooth foil", 70], ["Crumpled foil", 30], ["Black card", 5]] };
const puppetTable = { headings: ["Distance from the torch to the puppet (cm)", "Height of the shadow on the screen (cm)"], rows: [["20", 50], ["25", 40], ["40", 25], ["50", 20]] };

export const light = {
  "how-light-travels": {
    rule: "Light travels in straight lines. A light source, such as the Sun, a lamp or a torch, gives out its own light. The Moon is not a light source: it reflects light from the Sun. Light cannot bend round a corner, so a solid object blocks it.",
    hint: "Picture a straight line from the light. Does anything get in the way, and does the thing make its own light?",
    facts: [
      f("What is a light source?", "Something that gives out its own light", "Anything that we can see", "Anything that is shiny"),
      f("Which of these is a light source?", "The Sun", "The Moon", "A mirror"),
      f("Why can we see the Moon in the night sky?", "It reflects light from the Sun", "It makes its own light", "It is a star"),
      f("Which of these is a reflector, not a light source?", "A shiny spoon", "A candle flame", "A lit torch"),
      f("How does light travel?", "In straight lines", "In curves round corners", "In loops"),
      f("A torch shines through a hole in a card. What path does the light follow?", "A straight line", "A curve", "A zigzag"),
      f("When can light from a torch pass through holes in three cards?", "When the holes are lined up in a straight line", "When the holes are in different places", "When the torch is switched off"),
      f("Which of these is an artificial light source?", "A lamp", "The Moon", "A mirror"),
      f("Which of these is a natural light source?", "Lightning", "A television", "A torch"),
      f("Why can you not see a friend who is standing behind a wall?", "Light travels in straight lines and cannot pass through the wall", "Light curves round the wall", "Walls give out light"),
      f("What does a ray of light on a diagram show?", "The direction the light travels in", "How hot the light is", "How loud the light is"),
      f("A book is held in front of a torch. What happens to the light?", "It is blocked by the book", "It bends round the book", "It switches the torch off"),
    ],
    sorts: [
      g("Sort each object: light source or reflector?", ["Light source", "Reflector"], [["The Sun", 0], ["A lit candle", 0], ["A switched-on lamp", 0], ["The Moon", 1], ["A mirror", 1], ["A shiny coin", 1]]),
      g("Sort each light source: natural or artificial?", ["Natural", "Artificial"], [["The Sun", 0], ["Lightning", 0], ["A firefly", 0], ["A candle", 1], ["A street lamp", 1], ["A torch", 1]]),
      g("Sort these statements about light.", ["True", "False"], [["Light travels in straight lines", 0], ["A wall can block light", 0], ["The Moon reflects light from the Sun", 0], ["The Moon makes its own light", 1], ["Light bends round corners", 1], ["Mirrors give out their own light", 1]]),
    ],
    structures: [
      o("Order what happens when Mia switches on a torch in a dark room, starting with the first step.", ["The torch is switched on", "Light spreads out from the torch in straight lines", "The light hits the wall", "A bright patch appears on the wall"]),
      s("Build a sentence about light.", "Light travels in straight lines."),
      s("Build a sentence about the Moon.", "The Moon reflects light from the Sun."),
      s("Build a sentence about light sources.", "A light source gives out its own light."),
      g("Sort each situation by whether light can reach your eye.", ["Light can reach your eye", "Light is blocked"], [["You look straight at a lamp with nothing in between", 0], ["You look through a straight tube at a lamp", 0], ["You look at a candle through clear glass", 0], ["A wall is between you and the lamp", 1], ["A bent tube is between you and the lamp", 1], ["A thick book is between you and the torch", 1]]),
    ],
    enquiries: [
      { ...f("Look at Leo's results. What do they show?", "Light only reaches the screen when it has a straight path through the holes", "Light bends round the cards", "The cards make light"), table: cardsTable },
      { ...n("Leo tried four card arrangements. How many of them let light reach the screen?", 2), table: cardsTable },
      { ...f("Why did light not reach the screen when Leo moved the middle card?", "The holes were no longer in a straight line", "The torch ran out of battery", "Light bends when cards are moved"), table: cardsTable },
      f("Ellie moves the middle card in her three-card test. Which should she keep the same?", "The torch and the other two cards", "The position of the middle card", "Whether light reaches the screen"),
      f("Which fact shows that the Moon reflects light rather than making it?", "The half facing the Sun is bright and the other half is dark", "It is round", "It is far away"),
      f("Leo predicts that a straight tube lets him see a lamp but a bent tube does not. What idea is he using?", "Light travels in straight lines", "Light can bend round corners", "Light makes sound"),
      n("Maya has 9 objects in a dark room: 3 lit lamps, 2 lit torches, 1 lit candle, 2 mirrors and 1 book. How many of them are light sources?", 6),
      f("A beam of sunlight shines through a gap in the curtains and looks like a straight stripe in the dusty air. What does this suggest?", "Light travels in straight lines", "Light travels in curves", "Dust makes light"),
      o("Order the steps of Leo's test with three cards, starting with the first step.", ["Make a hole in the middle of each card", "Stand the cards up in a straight line", "Shine a torch through the first hole", "Check whether light reaches the last card"]),
      s("Leo writes a conclusion from his card results.", "Light needs a straight path to pass through."),
      g("Sort the claims about Leo's card results.", ["Supported by the results", "Not supported"], [["Light reached the screen when the holes were lined up", 0], ["Moving the middle card stopped the light", 0], ["Taking the middle card away let light through", 0], ["Moving the card to the right let light through", 1], ["Light always reached the screen", 1], ["Light bends to follow the holes", 1]], { table: cardsTable }),
      g("Maya sorts her notes from a dark-room test: evidence or opinion?", ["Evidence", "Opinion"], [["The beam looked straight in the dusty air", 0], ["The light stopped when Leo held up a book", 0], ["The screen stayed dark when the card was moved", 0], ["Torches are the best light sources", 1], ["Light is boring", 1], ["I think light bends because it wants to", 1]]),
    ],
  },

  "how-we-see-things": {
    rule: "We see an object when light goes into our eyes. The light can come straight from a light source, or it can travel from a light source, reflect off an object, and then travel into our eyes. Arrows on a light diagram point towards the eye, never out of it.",
    hint: "Follow the light on its journey. It always ends by going into the eye.",
    facts: [
      f("What must happen for you to see an object?", "Light from it must enter your eyes", "Your eyes must send out light", "The object must be warm"),
      f("A diagram shows light reaching an eye. Which way should the arrow point?", "Towards the eye", "Away from the eye", "Straight upwards"),
      f("Which of these shows how you see a lit lamp?", "Light travels from the lamp to your eye", "Light travels from your eye to the lamp", "Light stays inside the lamp"),
      f("How do you see a book, which is not a light source?", "Light from a source bounces off the book into your eyes", "Your eyes shine light on the book", "The book makes light inside itself"),
      f("What happens in a room with no light at all?", "You cannot see anything", "You can see everything", "You can only see white things"),
      f("Which of these can you see because it gives out light?", "A lit candle", "A book", "A coat"),
      f("Which of these can you see because it reflects light?", "A tree", "A lit lamp", "A switched-on torch"),
      f("What do we call light bouncing off a surface?", "Reflection", "Evaporation", "Insulation"),
      f("Which part of your body does light have to enter so that you can see?", "Your eyes", "Your ears", "Your nose"),
      f("Why can we see a red ball in a lit room?", "Light bounces off the ball into our eyes", "The ball sends out light by itself", "Our eyes send light to the ball"),
      f("Which of these is an example of light going from a source to an object and then to your eyes?", "Seeing a tree in the sunshine", "Looking at a lit candle", "Looking at a switched-on torch"),
      f("How does light travel from a lamp to your eye?", "In a straight line", "In a curve", "In a circle"),
    ],
    sorts: [
      g("Sort how you see each thing.", ["Gives out light", "Reflects light"], [["A lit candle", 0], ["A switched-on television", 0], ["A glowing torch", 0], ["A tree", 1], ["A book", 1], ["The Moon", 1]]),
      g("Sort each idea about seeing: correct or not correct?", ["Correct", "Not correct"], [["Arrows point towards the eye", 0], ["Light travels from a lamp to the eye", 0], ["Light bounces off a book into the eye", 0], ["Light travels from the eye to the book", 1], ["Eyes send out beams of light", 1], ["Arrows point away from the eye", 1]]),
      g("Sort these statements about seeing.", ["True", "False"], [["We see a mirror because it reflects light", 0], ["We cannot see in total darkness", 0], ["Light enters our eyes so that we can see", 0], ["Our eyes give out light so that we can see", 1], ["Only light sources can be seen", 1], ["We can see objects in complete darkness", 1]]),
    ],
    structures: [
      o("Order how Leo sees a book in a lit room, starting with the first step.", ["A lamp gives out light", "The light travels to the book", "The book reflects the light", "Light from the book enters Leo's eye"]),
      s("Build a sentence about seeing.", "We see when light enters our eyes."),
      s("Build a sentence about arrows.", "Arrows on light diagrams point towards the eye."),
      s("Build a sentence about a book.", "A book reflects light into our eyes."),
      { ...g("Look at the picture of a lamp, a book and an eye. Sort each statement.", ["True", "False"], [["Light goes from the lamp to the book", 0], ["Light goes from the book to the eye", 0], ["The book reflects light", 0], ["Light goes from the eye to the book", 1], ["The book gives out its own light", 1], ["Light goes from the eye to the lamp", 1]]), visual: ray("💡", "object", "📕", "A lamp, a book and an eye. An arrow goes from the lamp to the book, and another arrow goes from the book to the eye.") },
    ],
    enquiries: [
      { ...f("Look at Leo's diagram. Which statement is correct?", "Light goes from the torch to the toy, then to his eye", "Light goes from his eye to the toy", "Light goes from the toy to the torch"), visual: ray("🔦", "object", "🧸", "A torch, a toy bear and an eye. An arrow goes from the torch to the toy, and another arrow goes from the toy to the eye.") },
      { ...f("Look at the diagram. What does the object do to the light?", "It reflects the light into the eye", "It makes the eye send out light", "It stops the light from going anywhere"), visual: ray("🔦", "object", "🍎", "A torch, an apple and an eye, with labels. An arrow goes from the torch to the apple, and another arrow goes from the apple to the eye.", true) },
      f("Maya draws arrows from the eye to an apple. What is wrong with her diagram?", "The arrows should point towards the eye", "The apple should be bigger", "The arrows should be curved"),
      { ...f("Look at the diagram of a lamp and an eye. Which statement is true?", "The lamp is a light source and its light goes straight to the eye", "The lamp reflects light from the eye", "The eye gives out light to the lamp"), visual: ray("💡", null, "🍎", "A lamp and an eye with one arrow going from the lamp to the eye.") },
      n("Leo draws light going from a lamp to a book, and then from the book to his eye. How many arrows does he need?", 2),
      n("Maya looks directly at a switched-on lamp. How many arrows show the light going from the lamp to her eye?", 1),
      f("Leo predicts what he will see if he looks at a book in a room with no light at all. What should he predict?", "He will not be able to see it", "He will see it clearly", "The book will glow"),
      f("A cat's eyes seem to shine in car headlights. What is the most likely reason?", "They reflect the light from the headlights", "Cats make their own light", "The cat's eyes send light to the car"),
      o("Order the steps of Leo's investigation, starting with the first step.", ["Put a toy in a box with two small holes", "Look through one hole and describe what you see", "Shine a torch through the other hole", "Look again and describe what you see"]),
      s("Ellie writes a conclusion from her box test.", "The toy was seen when light bounced off it."),
      g("Sort each box test: can Leo see the toy, or not?", ["He can see the toy", "He cannot see the toy"], [["Light enters through the second hole", 0], ["A torch lights the toy", 0], ["Daylight comes through the holes", 0], ["The box is sealed with no holes", 1], ["The room is completely dark and there is no torch", 1], ["Both holes are covered", 1]]),
      o("Order what happens when Ellie sees a street lamp at night, starting with the first step.", ["The lamp gives out light", "The light travels in a straight line", "The light enters Ellie's eye", "Ellie sees the lamp"]),
    ],
  },

  "mirrors-and-periscopes": {
    rule: "A mirror reflects light: light bounces off its smooth, shiny surface and changes direction. The light still travels in straight lines. A periscope uses two mirrors to turn light twice, so you can see over or round things.",
    hint: "Follow the light in straight lines and turn it at each mirror.",
    facts: [
      f("What does a mirror do to light?", "It reflects it", "It makes it", "It soaks up all of it"),
      f("Which surface reflects light best?", "A smooth, shiny surface", "A rough, dull surface", "A bumpy, muddy surface"),
      f("Which of these would make the best mirror?", "Polished metal", "A woolly scarf", "A sheet of rough sandpaper"),
      f("What is a periscope used for?", "Seeing over or round something", "Hearing far-away sounds", "Making things hotter"),
      f("How many mirrors does a simple periscope have?", "Two", "One", "Five"),
      f("How are the mirrors in a simple periscope placed?", "Tilted, one at the top and one at the bottom", "Both flat on the floor", "Both at the top, facing away"),
      f("Why does a car have a rear-view mirror?", "To see traffic behind without turning round", "To see the road in front", "To make the car go faster"),
      f("Light from a lamp hits a mirror. What happens to the light?", "It bounces off in a new direction", "It goes straight through", "It disappears"),
      f("Why do cyclists wear reflective jackets?", "They reflect car headlights so drivers can see them", "They make their own light", "They soak up all the light"),
      f("When light bounces off a mirror, how does it travel?", "In straight lines", "In curves", "In loops"),
      f("How does the angle of light leaving a flat mirror compare with the angle it arrived at?", "They are equal", "The angle out is always twice as big", "There is no angle out"),
      f("Which of these can be used as a mirror?", "A flat sheet of smooth, shiny metal", "A brick", "A cotton sheet"),
    ],
    sorts: [
      g("Sort each surface by how well it reflects light.", ["Reflects light well", "Does not reflect light well"], [["A mirror", 0], ["Polished silver", 0], ["Smooth, shiny foil", 0], ["Rough cardboard", 1], ["A woolly jumper", 1], ["Dark, crumpled paper", 1]]),
      g("Sort each device by how many mirrors it uses.", ["Uses one mirror", "Uses two or more mirrors"], [["A bathroom mirror", 0], ["A car's rear-view mirror", 0], ["A dentist's mirror", 0], ["A simple periscope", 1], ["A submarine periscope", 1], ["A periscope made from a milk carton", 1]]),
      g("Sort these statements about mirrors.", ["True", "False"], [["Light bounces off a mirror", 0], ["A periscope lets you see over a wall", 0], ["Mirrors have smooth, shiny surfaces", 0], ["A rough surface makes a clear reflection", 1], ["A periscope has only one mirror", 1], ["Mirrors give out their own light", 1]]),
    ],
    structures: [
      o("Order how light travels through a periscope, starting with the first step.", ["Light from an object hits the top mirror", "The top mirror reflects the light down the tube", "The bottom mirror reflects the light sideways", "The light enters the viewer's eye"]),
      s("Build a sentence about mirrors.", "A mirror reflects light from its shiny surface."),
      s("Build a sentence about periscopes.", "A periscope uses two mirrors to turn light."),
      s("Build a sentence about rear-view mirrors.", "A rear-view mirror shows traffic behind a car."),
      { ...g("Look at the periscope. Sort each statement.", ["True", "False"], [["It has two mirrors", 0], ["The light is reflected twice", 0], ["The light follows a straight path between the mirrors", 0], ["It has one mirror", 1], ["The light bends in the tube by itself", 1], ["The light starts at the viewer's eye", 1]]), visual: { type: "periscope", labels: false, object: "🐦", alt: "A periscope with a mirror at the top and a mirror at the bottom. A bird is on the left and an eye is on the right." } },
    ],
    enquiries: [
      { ...f("Look at Maya's results. What do they show about smooth foil and crumpled foil?", "Smooth foil reflects more light than crumpled foil", "Crumpled foil reflects more light than smooth foil", "They reflect the same amount"), table: reflectTable },
      { ...n("Look at the results. How many more units of light did the mirror reflect than the black card?", 85), table: reflectTable },
      { ...n("Look at the results. How many more units of light did the smooth foil reflect than the crumpled foil?", 40), table: reflectTable },
      { ...f("Looking at the results, which material would make the best mirror in a periscope?", "The mirror", "The black card", "The crumpled foil"), table: reflectTable },
      f("Maya tests how well four materials reflect light from a torch. Which should she keep the same?", "The distance and angle of the torch and the sensor", "The material being tested", "The reading on the sensor"),
      f("Leo is deciding where to put a rear-view mirror on a model car. What should he do?", "Try different positions until the driver can see behind", "Put the mirror under the car", "Cover the mirror with card"),
      f("Ellie builds a periscope from a carton but sees nothing. Which mistake is most likely?", "One of the mirrors is tilted the wrong way", "The carton is too dry", "The room is too warm"),
      f("Leo uses a periscope to see over a wall. Why does it work?", "The top mirror is above the wall and reflects light down to his eye", "The mirrors make the wall shorter", "The mirrors make light bend through the wall"),
      o("Order the steps of Ellie's periscope build, starting with the first step.", ["Cut a window at each end of a carton", "Cut slanted slots near each end", "Slide a mirror into each slot", "Look through the bottom window to test it"]),
      s("Maya writes a conclusion from her foil test.", "Smooth surfaces reflect more light."),
      g("Sort the claims about Maya's reflection results.", ["Supported by the results", "Not supported"], [["The mirror reflected the most light", 0], ["Black card reflected the least light", 0], ["Smooth foil reflected more than crumpled foil", 0], ["Crumpled foil reflected more than smooth foil", 1], ["Black card reflected the most light", 1], ["All the materials reflected the same amount", 1]], { table: reflectTable }),
      o("Order the materials from the least light reflected to the most.", ["Black card", "Crumpled foil", "Smooth foil", "Mirror"], { table: reflectTable }),
    ],
  },

  "shadow-shapes": {
    rule: "A shadow forms when an opaque object blocks light. Because light travels in straight lines, the shadow has the same shape as the object. Moving an object closer to the light makes its shadow bigger, and moving it away makes the shadow smaller.",
    hint: "Light travels in straight lines, so think about the shape of the light that the object blocks.",
    facts: [
      f("What makes a shadow?", "An opaque object blocking the light", "Light bending round an object", "A light source being switched off"),
      f("Which word describes a material that blocks all light?", "Opaque", "Transparent", "Translucent"),
      f("Which word describes a material that lets all light through, so you can see clearly through it?", "Transparent", "Opaque", "Translucent"),
      f("Which word describes a material that lets some light through but you cannot see clearly through it?", "Translucent", "Opaque", "Transparent"),
      f("Which of these is transparent?", "Clear glass", "A wooden door", "A brick"),
      f("Which of these is opaque?", "A wooden door", "Clear glass", "A clear plastic bag"),
      f("Why does a shadow have the same shape as the object that makes it?", "Light travels in straight lines and the object blocks it", "Light bends round the object", "The object glows in the dark"),
      f("Leo holds a star-shaped card in front of a torch, with a wall behind. What shape is the shadow on the wall?", "A star", "A circle", "A square"),
      f("Leo moves his hand closer to a torch, with a wall behind. What happens to the shadow of his hand?", "It gets bigger", "It gets smaller", "It disappears"),
      f("Leo moves his hand further from the torch and nearer the wall. What happens to the shadow of his hand?", "It gets smaller", "It gets bigger", "It turns round"),
      f("Which material is best for making shadow puppets?", "Opaque card", "Clear plastic", "Clear glass"),
      f("On which side of an object is its shadow?", "The side away from the light", "The side facing the light", "Inside the object"),
    ],
    sorts: [
      g("Sort each material by how it lets light through.", ["Opaque", "Translucent", "Transparent"], [["Wood", 0], ["A metal sheet", 0], ["Tracing paper", 1], ["Frosted glass", 1], ["Clear glass", 2], ["Clear plastic wrap", 2]]),
      g("Sort these statements about shadows.", ["True", "False"], [["A shadow is dark because light is blocked", 0], ["A shadow forms on the side away from the light", 0], ["A shadow has the same shape as the object", 0], ["A shadow forms where the light is brightest", 1], ["Light bends round an object to make its shadow", 1], ["A transparent object makes a very dark shadow", 1]]),
      g("Sort each change by what it does to a shadow.", ["Shadow gets bigger", "Shadow gets smaller"], [["Moving the object closer to the torch", 0], ["Moving the torch closer to the object", 0], ["Moving a puppet nearer the torch", 0], ["Moving the object away from the torch", 1], ["Moving the torch away from the object", 1], ["Moving a puppet nearer the screen", 1]]),
    ],
    structures: [
      o("Order how a shadow forms on a screen, starting with the first step.", ["A torch gives out light", "The light travels in straight lines", "An opaque object blocks some of the light", "A dark shadow forms on the screen"]),
      s("Build a sentence about shadows.", "A shadow is made when light is blocked."),
      s("Build a sentence about opaque materials.", "Opaque materials block all of the light."),
      s("Build a sentence about shadow puppets.", "A puppet near the torch makes a bigger shadow."),
      { ...g("Look at the picture of a torch, an object and a screen. Sort each statement.", ["True", "False"], [["The torch is the light source", 0], ["The object blocks the light", 0], ["The shadow is on the screen", 0], ["The shadow is on the same side as the torch", 1], ["The screen is the light source", 1], ["Light bends round the object", 1]]), visual: { type: "shadow", shape: "square", hideShadow: false, labels: true, alt: "A torch shines on a square object. A square shadow is on the screen behind it. The torch, object and screen are labelled." } },
    ],
    enquiries: [
      { ...f("Look at Maya's results. What happens to the shadow as the puppet moves away from the torch?", "It gets smaller", "It gets bigger", "It stays the same size"), table: puppetTable },
      { ...n("Look at the results. How many centimetres taller was the shadow when the puppet was 20 cm from the torch than when it was 50 cm from the torch?", 30), table: puppetTable },
      { ...n("Look at the results. How tall, in centimetres, was the shadow when the puppet was 40 cm from the torch?", 25), table: puppetTable },
      { ...f("Looking at the results, at which distance from the torch did the puppet make the biggest shadow?", "20 cm", "25 cm", "50 cm"), table: puppetTable },
      f("Maya moves the puppet and measures its shadow. Which should she keep the same?", "The size of the puppet and the distance from the torch to the screen", "The distance from the torch to the puppet", "The height of the shadow"),
      f("Leo holds a triangle of card between a torch and a wall. His friend draws round the shadow. What shape does she draw?", "A triangle", "A circle", "A star"),
      f("Ellie tests tissue paper, thick card and clear plastic in front of a torch. Which will make the darkest shadow?", "Thick card", "Clear plastic", "Tissue paper"),
      f("Leo says a bigger shadow always means a bigger object. What should Maya say?", "Not always, because the shadow also depends on the distance from the light", "He is always right", "Shadows never change size"),
      o("Order the steps of Maya's shadow puppet test, starting with the first step.", ["Fix the torch and the screen 100 cm apart", "Place the puppet 20 cm from the torch and measure its shadow", "Move the puppet further away and measure again", "Compare the shadow heights in a table"]),
      s("Ellie writes a conclusion from the puppet results.", "Shadows get smaller as the puppet moves away."),
      g("Sort the claims about Maya's puppet results.", ["Supported by the results", "Not supported"], [["The shadow was 50 cm tall at 20 cm", 0], ["The shadow got smaller as the puppet moved away", 0], ["The smallest shadow was at 50 cm", 0], ["The shadow got bigger as the puppet moved away", 1], ["The shadow was 20 cm tall at 20 cm", 1], ["The shadow was the same size each time", 1]], { table: puppetTable }),
      o("Order the puppet positions from the biggest shadow to the smallest shadow.", ["20 cm from the torch", "25 cm from the torch", "40 cm from the torch", "50 cm from the torch"], { table: puppetTable }),
    ],
  },
};

export const lightVisuals = {
  "how-light-travels": scene("room", "A girl standing in a room beside a window.", [["🧒", 140, 140, 74], ["🪟", 290, 120, 90]]),
  "how-we-see-things": scene("room", "A girl looking at a book on a table.", [["🧒", 130, 140, 74], ["📖", 290, 160, 62]]),
  "mirrors-and-periscopes": scene("street", "A car and a bicycle on a street.", [["🚗", 130, 150, 78], ["🚲", 295, 150, 70]]),
  "shadow-shapes": scene("meadow", "A girl standing beside a tree.", [["🧒", 130, 150, 74], ["🌳", 290, 130, 94]]),
};

const darkBox = scene("lab", "A box and a torch on a bench.", [["📦", 130, 145, 74], ["🔦", 290, 140, 70]]);
const cards = scene("lab", "A torch and three cards standing in a row.", [["🔦", 90, 140, 62], ["📄", 190, 140, 56], ["📄", 250, 140, 56], ["📄", 310, 140, 56]]);
const foilTest = scene("lab", "A torch and a sheet of material on a bench.", [["🔦", 120, 140, 66], ["📄", 290, 140, 66]]);
const puppetTest = scene("lab", "A torch, a puppet and a screen on a bench.", [["🔦", 90, 140, 62], ["🦆", 200, 140, 62], ["🖼️", 310, 130, 70]]);

export const lightRules = {
  "how-light-travels": [
    rule(/A beam of sunlight shines through a gap in the curtains/, scene("room", "Sunlight coming through a window.", [["🪟", 200, 120, 96], ["☀️", 90, 70, 56]])),
    rule(/Ellie moves the middle card/, cards),
    rule(/Order the steps of Leo's test with three cards/, cards),
    rule(/Why can you not see a friend who is standing behind a wall/, scene("street", "A girl, a brick wall and a friend standing behind it.", [["🧒", 90, 150, 66], ["🧱", 200, 140, 92], ["🧒", 315, 150, 50]])),
  ],
  "how-we-see-things": [
    rule(/A cat's eyes seem to shine in car headlights/, scene("night", "A cat at night near a car.", [["🐈", 120, 150, 70], ["🚗", 290, 150, 76]])),
    rule(/Order the steps of Leo's investigation/, darkBox),
    rule(/Ellie writes a conclusion from her box test/, darkBox),
    rule(/Maya looks directly at a switched-on lamp/, scene("room", "A girl looking at a lamp.", [["🧒", 130, 150, 72], ["💡", 290, 130, 66]])),
  ],
  "mirrors-and-periscopes": [
    rule(/Ellie builds a periscope from a carton/, scene("room", "A carton and a pair of scissors on a table.", [["📦", 140, 140, 72], ["✂️", 290, 145, 58]])),
    rule(/Leo is deciding where to put a rear-view mirror on a model car/, scene("room", "A toy car on a table.", [["🚗", 200, 140, 90]])),
    rule(/Maya tests how well four materials reflect light/, foilTest),
    rule(/Order the steps of Ellie's periscope build/, scene("room", "A carton and a pair of scissors on a table.", [["📦", 140, 140, 72], ["✂️", 290, 145, 58]])),
  ],
  "shadow-shapes": [
    rule(/Leo holds a star-shaped card in front of a torch/, { type: "shadow", shape: "star", hideShadow: true, labels: false, alt: "A torch shining at a star-shaped card, with a screen behind it. The shadow on the screen is hidden behind a question mark." }),
    rule(/Leo holds a triangle of card between a torch and a wall/, { type: "shadow", shape: "triangle", hideShadow: true, labels: false, alt: "A torch shining at a triangle of card, with a screen behind it. The shadow on the screen is hidden behind a question mark." }),
    rule(/Order the steps of Maya's shadow puppet test/, puppetTest),
    rule(/Maya moves the puppet and measures its shadow/, puppetTest),
  ],
};
