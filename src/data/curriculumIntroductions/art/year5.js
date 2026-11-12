// Year 5 Art & Design purpose screens. Knowledge and vocabulary; making happens with real materials.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const pics = (title, items, alt) => ({ renderer: "pictures", data: { title, items }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 5, subject: "art",
  subjectIntro: I("Welcome to Year 5 Art and Design", ["Draw, paint, print and sculpt with new techniques.", "Meet famous artists, makers and architects."],
    "Art teaches you to look closely and to share what you think and feel. The words and ideas you learn help you talk about any picture, building or object.",
    "Artists look at a bowl of fruit and see shapes, light, shadow and colour.",
    pics("Making art", [{ icon: "✏️", label: "Draw" }, { icon: "🎨", label: "Paint" }, { icon: "🏛️", label: "Build" }], "Three pictures with labels: a pencil for drawing, a palette for painting and a building.")),
  quests: {
    "sketchbooks-and-drawing": {
      intro: I("Sketchbooks and drawing", ["Look closely and record what you see.", "Explore line, tone, perspective and proportion."],
        "A sketchbook is a safe place to try ideas, make mistakes and see how your drawing improves. Drawing well starts with careful looking.",
        "Light pencil lines can show soft shadows, and dark lines can show strong ones.",
        pics("Drawing tools", [{ icon: "✏️", label: "Pencil" }, { icon: "📓", label: "Sketchbook" }, { icon: "🔍", label: "Look closely" }], "Three pictures with labels: a pencil, a sketchbook and a magnifying glass for looking closely.")),
      topics: {
        "sketchbooks-and-observation": I("Sketchbooks and observation", ["Record what you see in a sketchbook.", "Look back at old pages to improve."],
          "Notes and quick drawings help you remember ideas and choose the best one to develop.", "An artist may draw a leaf five times before choosing the best way to show it.",
          steps("Using a sketchbook", ["Look closely.", "Draw and make notes.", "Review your page.", "Try the idea again."], "Four steps for using a sketchbook: look closely, draw and make notes, review your page and try the idea again.")),
        "line-and-tone": I("Line and tone", ["Make thick, thin, straight and curved lines.", "Use light and dark tone to show shape."],
          "Tone makes a flat drawing look solid, like a ball with a shadow underneath.", "Pressing harder with a pencil makes a darker tone.",
          table("Tone", ["Pencil pressure", "Tone"], [["Light", "Pale"], ["Medium", "Grey"], ["Hard", "Dark"]], "A table showing that light pencil pressure makes a pale tone, medium pressure a grey tone and hard pressure a dark tone.")),
        "perspective-and-proportion": I("Perspective and proportion", ["Draw things getting smaller as they go far away.", "Compare the sizes of parts of a person or object."],
          "Perspective makes a road or railway look as if it goes into the distance. Good proportion makes people look natural.", "Railway lines look closer together far away.",
          pics("Near and far", [{ icon: "🛤️", label: "Railway lines" }, { icon: "🧍", label: "Person" }, { icon: "🌳", label: "Tree" }], "Three pictures with labels: railway lines, a person and a tree.")),
        "talking-about-art": I("Talking about art", ["Use art words to describe what you see.", "Give your own opinion with a reason."],
          "Describing art helps you understand it and listen to what others think.", "You might say: the dark colours make this painting feel quiet.",
          steps("Talk about a picture", ["Describe what you see.", "Say how it is made.", "Say how it makes you feel.", "Give a reason."], "Four steps to talk about a picture: describe what you see, say how it is made, say how it makes you feel and give a reason.")),
      },
    },
    "colour-and-painting": {
      intro: I("Colour and painting", ["Use the colour wheel and mix colours.", "Try different ways of painting."],
        "Colour can make a picture feel happy, calm or exciting. Knowing how to mix paint saves time and gives you the colour you want.",
        "Mixing blue and yellow makes green.",
        pics("Colours", [{ icon: "🔴", label: "Red" }, { icon: "🟡", label: "Yellow" }, { icon: "🔵", label: "Blue" }], "Three pictures with labels: red, yellow and blue circles.")),
      topics: {
        "the-colour-wheel": I("The colour wheel", ["Name primary, secondary and tertiary colours.", "Find complementary colours."],
          "The colour wheel helps you choose colours that go well together or stand out.", "Red and green are opposite each other, so they are complementary.",
          table("Colour wheel", ["Group", "Colours"], [["Primary", "Red, yellow, blue"], ["Secondary", "Orange, green, purple"]], "A table of colour groups: primary colours are red, yellow and blue, and secondary colours are orange, green and purple.")),
        "colour-mood-and-mixing": I("Colour mood and mixing", ["Link colours to feelings.", "Make tints and shades by adding white or black."],
          "Colours change how a picture feels. Warm colours feel lively and cool colours feel calm.", "Adding white to blue makes a lighter tint of blue.",
          table("Warm and cool", ["Feel", "Colours"], [["Warm", "Red, orange, yellow"], ["Cool", "Blue, green, purple"]], "A table of colour feelings: warm colours are red, orange and yellow, and cool colours are blue, green and purple.")),
        "painting-techniques": I("Painting techniques", ["Try washes, dabbing and thick paint.", "Choose a technique to suit your idea."],
          "Different ways of painting make different textures, such as soft skies or rough tree bark.", "A wash is thin, watery paint spread across the paper.",
          pics("Ways to paint", [{ icon: "🖌️", label: "Brush" }, { icon: "💧", label: "Wash" }, { icon: "🧽", label: "Sponge" }], "Three pictures with labels: a brush, a water drop for a wash and a sponge.")),
      },
    },
    "printing-sculpture-and-pattern": {
      intro: I("Printing, sculpture and pattern", ["Print a design more than once.", "Shape clay and explore pattern and texture."],
        "Printing lets you copy a design again and again, like patterns on wrapping paper. Sculpture is art you can walk around and touch.",
        "A potato cut into a shape can print the same shape many times.",
        pics("Making and printing", [{ icon: "🖨️", label: "Print" }, { icon: "🏺", label: "Clay" }, { icon: "🔷", label: "Pattern" }], "Three pictures with labels: a print, a clay pot and a pattern of shapes.")),
      topics: {
        "printmaking": I("Printmaking", ["Make a print block and print it.", "Repeat a design to make a pattern."],
          "Printmaking is used for fabrics, wallpaper and book illustrations.", "A print is a mirror image of its block, so letters must be carved back to front.",
          steps("A simple print", ["Make a design on a block.", "Roll ink on it.", "Press it onto paper.", "Lift to see the print."], "Four steps for a simple print: make a design on a block, roll ink on it, press it onto paper and lift to see the print.")),
        "sculpture-and-clay": I("Sculpture and clay", ["Name ways to shape clay.", "Learn how clay is joined and dried."],
          "Clay can be made into pots, tiles and figures that last a very long time once fired.", "Slip is runny clay used like glue to join two pieces.",
          pics("Clay words", [{ icon: "🏺", label: "Pot" }, { icon: "🤲", label: "Pinch" }, { icon: "🔥", label: "Kiln" }], "Three pictures with labels: a pot, hands pinching clay and a kiln.")),
        "pattern-and-texture": I("Pattern and texture", ["Spot repeating and symmetrical patterns.", "Describe how things feel or look like they feel."],
          "Pattern and texture are in fabrics, buildings and nature. Designers use them to make things interesting.", "Tree bark has a rough texture.",
          pics("Pattern and texture", [{ icon: "🦓", label: "Stripes" }, { icon: "🪨", label: "Rough" }, { icon: "🧶", label: "Soft" }], "Three pictures with labels: stripes, something rough and something soft.")),
      },
    },
    "artists-architects-and-designers": {
      intro: I("Artists, architects and designers", ["Meet famous artists and sculptors.", "Learn about craft makers and architects."],
        "People in the past made art and buildings that still inspire us. Learning about them gives you ideas for your own work.",
        "Vincent van Gogh painted bright, swirling skies.",
        pics("Makers", [{ icon: "🖼️", label: "Painting" }, { icon: "🗿", label: "Sculpture" }, { icon: "🏛️", label: "Building" }], "Three pictures with labels: a painting, a sculpture and a building.")),
      topics: {
        "artists-and-their-famous-works": I("Artists and their famous works", ["Match artists to their well-known pictures.", "Notice how each artist worked."],
          "Knowing famous works helps you recognise them in museums and books.", "Leonardo da Vinci painted the Mona Lisa.",
          table("Artists", ["Artist", "Famous work"], [["Leonardo da Vinci", "Mona Lisa"], ["Vincent van Gogh", "Sunflowers"], ["Claude Monet", "Water Lilies"]], "A table matching artists to works: Leonardo da Vinci with Mona Lisa, Vincent van Gogh with Sunflowers and Claude Monet with Water Lilies.")),
        "famous-sculptors": I("Famous sculptors", ["Name sculptors and their works.", "Compare carving, modelling and casting."],
          "Sculptures stand in towns and galleries and tell stories about people and places.", "Antony Gormley made the Angel of the North.",
          table("Sculptors", ["Sculptor", "Famous work"], [["Michelangelo", "David"], ["Barbara Hepworth", "Single Form"], ["Antony Gormley", "Angel of the North"]], "A table matching sculptors to works: Michelangelo with David, Barbara Hepworth with Single Form and Antony Gormley with Angel of the North.")),
        "craft-makers-and-designers": I("Craft makers and designers", ["Meet makers of textiles, pottery and furniture.", "See how design and craft work together."],
          "Craft makers make things that are useful and beautiful, from mugs to fabrics.", "William Morris designed patterned wallpaper and fabric.",
          pics("Crafts", [{ icon: "🧵", label: "Textiles" }, { icon: "☕", label: "Pottery" }, { icon: "🪑", label: "Furniture" }], "Three pictures with labels: textiles, pottery and furniture.")),
        "architects-and-buildings": I("Architects and buildings", ["Learn what an architect does.", "Match architects to famous buildings."],
          "Architects plan the buildings where we learn, live and work.", "Sir Christopher Wren designed St Paul's Cathedral.",
          table("Architects", ["Architect", "Building"], [["Christopher Wren", "St Paul's Cathedral"], ["Antoni Gaudi", "Sagrada Familia"], ["Zaha Hadid", "London Aquatics Centre"]], "A table matching architects to buildings: Christopher Wren with St Paul's Cathedral, Antoni Gaudi with Sagrada Familia and Zaha Hadid with London Aquatics Centre.")),
      },
    },
  } });
