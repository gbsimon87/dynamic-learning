// Figures for the Year 5 Art bank. A figure draws what a question describes; it
// never prints the answer. Colour wheels always carry their colour names, and
// the one colour a question asks for is replaced by a question mark.
const art = (kind, extra = {}) => ({ type: "artwork", kind, ...extra });
const blocks = (count, each, unit, item, plural) => ({ type: "blocks", count, each, unit, item, ...(plural ? { plural } : {}) });
const picto = (unit, ...rows) => ({ type: "pictogram", unit, rows: rows.map(([label, count]) => ({ label, count })) });
const mix = (a, b) => ({ type: "mix", a, b });
const chips = (...names) => ({ type: "chips", names });
const swatch = (from, to, toLabel) => ({ type: "swatches", from, to, toLabel });
const opposite = (name) => ({ type: "wheel", opposite: name });

export const YEAR5_ART_TOPIC_VISUALS = {
  "sketchbooks-and-observation": { type: "sketchbook", subject: "apple", labels: true, caption: "Then look back at old pages to review and revisit your ideas." },
  "line-and-tone": { type: "pencils" },
  "perspective-and-proportion": { type: "perspective", kind: "road" },
  "talking-about-art": { type: "elements" },
  "the-colour-wheel": { type: "wheel", pairs: true, caption: "Primary: red, yellow, blue. Secondary: orange, green, purple. Opposite colours are complementary." },
  "colour-mood-and-mixing": { type: "colourMix" },
  "painting-techniques": { type: "paint" },
  "printmaking": { type: "print" },
  "sculpture-and-clay": { type: "ways" },
  "pattern-and-texture": { type: "pattern" },
  "artists-and-their-famous-works": { type: "gallery", alt: "Four famous works.", items: [
    { kind: "swirlSky", lines: ["Van Gogh", "The Starry", "Night"] }, { kind: "wave", lines: ["Hokusai", "The Great", "Wave"] },
    { kind: "lilies", lines: ["Monet", "Water", "Lilies"] }, { kind: "cans", lines: ["Warhol", "Pop art"] }] },
  "famous-sculptors": { type: "gallery", alt: "Three sculptures.", items: [
    { kind: "holed", lines: ["Hepworth", "smooth,", "with a hole"] }, { kind: "reclining", lines: ["Moore", "smooth,", "simple,", "with holes"] },
    { kind: "angel", lines: ["Gormley", "Angel of", "the North", "20 metres"] }], caption: "The Angel of the North is 20 metres tall." },
  "craft-makers-and-designers": { type: "gallery", alt: "Three makers' designs.", items: [
    { kind: "morris", lines: ["Morris", "leaves and", "flowers"] }, { kind: "teapot", lines: ["Clarice Cliff", "bright", "pottery"] },
    { kind: "chair", lines: ["Mackintosh", "buildings,", "furniture"] }] },
  "architects-and-buildings": { type: "gallery", alt: "Three buildings.", items: [
    { kind: "dome", lines: ["Wren", "St Paul's", "Cathedral"] }, { kind: "waveRoof", lines: ["Hadid", "flowing", "curves"] },
    { kind: "towers", lines: ["Gaudi", "Sagrada", "Familia"] }] },
};

export const YEAR5_ART_QUESTION_VISUALS = {
  "sketchbooks-and-observation": [
    ["What are the notes written beside a sketch called?", { type: "sketchbook", subject: "apple", notes: true }],
    ["Mia draws a leaf, and next to it writes the date and 'veins are thin'. What are her notes called?", { type: "sketchbook", subject: "leaf", note: "veins are thin" }],
    ["Ben draws the sunflowers in a vase in front of him. What kind of drawing is this?", { type: "sketchbook", subject: "vase" }],
    ["Ravi makes 4 thumbnail sketches on each of 3 pages. How many thumbnail sketches is that?", blocks(3, 4, "thumbnails", "page")],
    ["Asha spends 5 minutes on each of 6 quick studies. How many minutes does she spend altogether?", blocks(6, 5, "minutes", "study", "studies")],
  ],
  "line-and-tone": [
    ["A ball is lit from the top left. Where is the darkest part of its shading?", art("lightBall")],
    ["Ben puts a lamp to the left of a pear. Where should he draw its cast shadow?", art("lightPear")],
    ["Asha uses dots to show the rough skin of an orange. Which technique is this?", art("orangeDots")],
    ["Zara draws two sets of lines crossing over each other. Which technique is this?", art("cross")],
    ["Jo draws hatching with 6 lines in each patch and makes 4 patches. How many lines is that?", blocks(4, 6, "lines", "patch", "patches")],
  ],
  "perspective-and-proportion": [
    ["Mia draws a long road going to the horizon. Where should the road edges meet?", { type: "perspective", kind: "open" }],
    ["Ben draws a cube from a corner, using two points on the horizon. Which perspective is that?", { type: "perspective", kind: "cube" }],
    ["Ravi's drawing has the eyes near the top of a head. Which advice would improve it?", art("faceHigh")],
    ["An adult is about 7 heads tall. A head is 4 cm in a drawing. How tall is the adult in centimetres?", blocks(7, 4, "cm", "head")],
    ["Jo draws 2 vanishing points on each of 5 cubes. How many vanishing points is that?", blocks(5, 2, "points", "cube")],
    ["Mia draws 3 lamp posts in a row, then adds 4 more. How many lamp posts are there?", picto("lamp post", ["first row", 3], ["added", 4])],
  ],
  "talking-about-art": [
    ["Mia looks at a picture of a bowl of pears and a jug. What type of picture is it?", art("pears")],
    ["Ravi paints blocks of bright colour with no real objects. What type of art is this?", art("blocks")],
    ["Jo says, 'The red draws my eye first.' What is the red in the picture?", art("focal")],
    ["A gallery wall has 3 portraits, 4 landscapes and 2 still lifes. How many pictures are there?", picto("picture", ["portraits", 3], ["landscapes", 4], ["still lifes", 2])],
    ["Mia describes 5 pictures each day for 4 days. How many pictures does she describe?", blocks(4, 5, "pictures", "day")],
  ],
  "the-colour-wheel": [
    ["Mixing red and yellow paint makes which colour?", mix("red", "yellow")],
    ["Mixing blue and yellow paint makes which colour?", mix("blue", "yellow")],
    ["Mixing red and blue paint makes which colour?", mix("red", "blue")],
    ["Which colour is complementary to red?", opposite("red")],
    ["Which colour is complementary to blue?", opposite("blue")],
    ["Which colour is complementary to yellow?", opposite("yellow")],
    ["Jo puts blue next to orange to make a poster pop. What are blue and orange?", chips("blue", "orange")],
    ["Leo paints with yellow, orange and red. What are these colours called together?", chips("yellow", "orange", "red")],
    ["Mia has only red, yellow and blue paint. Which colour can she NOT mix from them?", chips("red", "yellow", "blue")],
    ["Asha mixes yellow with a little green. Which type of colour does she make?", mix("yellow", "green")],
    ["Jo paints 4 complementary pairs. How many colours does he use?", blocks(4, 2, "colours", "pair")],
  ],
  "colour-mood-and-mixing": [
    ["Ravi has pale blue paint. Which has he added to blue?", swatch("blue", "tint", "pale blue")],
    ["Asha has navy paint. Which has she added to blue?", swatch("blue", "shade", "navy")],
    ["Which makes pink from red?", swatch("red", "tint", "pink")],
    ["Which makes dark red from red?", swatch("red", "shade", "dark red")],
    ["Mia mixes 2 drops of white into a blue pot. She does this for 6 pots. How many drops is that?", blocks(6, 2, "drops", "pot")],
    ["A tint chart has 5 squares and a shade chart has 5 squares. How many squares are there?", picto("square", ["tint chart", 5], ["shade chart", 5])],
  ],
  "painting-techniques": [
    ["Mia wants a soft, blended sunset on wet paper. Which technique should she use?", art("blend")],
    ["Jo wants rough, scratchy marks for tree bark. Which technique should he use?", art("scratchy")],
    ["Ravi wants thick, ridged paint on his sunflower picture. Which technique is that?", art("ridged")],
    ["Asha wants to paint with only tiny dots of colour. Which technique is that?", art("pointDots")],
    ["Mia mixes 3 colours on each of 4 palettes. How many mixed colours is that?", blocks(4, 3, "colours", "palette")],
    ["Jo paints 5 dots of colour in each row and makes 6 rows. How many dots is that?", blocks(6, 5, "dots", "row")],
  ],
  "printmaking": [
    ["Mia carves the letter S into lino and prints it. How does it print?", art("blockS")],
    ["Jo carves away the middle of a block and prints it. What does the middle look like?", art("blockHole")],
    ["Ravi cuts a star from card and paints through it. What has he made?", art("stencil")],
    ["Leo marks a print 4/12. What does that tell us?", art("edition", { text: "4/12" })],
    ["What does the number 3/10 on a print tell you?", art("edition", { text: "3/10" })],
    ["Mia prints 5 stars on each of 4 pages. How many stars is that?", blocks(4, 5, "stars", "page")],
  ],
  "sculpture-and-clay": [
    ["Sam makes a pot from rings of rolled clay. Which hand-building method is this?", art("coil")],
    ["Leo's pot has a trapped air bubble. What could happen in the kiln?", art("bubble")],
    ["Ravi pours plaster into a mould to make a copy. Which method is this?", art("mould")],
    ["Asha glues cardboard tubes and boxes into a robot. Which method is this?", art("robot")],
    ["Mia rolls 6 coils for a pot and 4 for a lid. How many coils is that?", picto("coil", ["for the pot", 6], ["for the lid", 4])],
  ],
  "pattern-and-texture": [
    ["Mia stamps the same leaf shape again and again across a page. What is she making?", art("leaves")],
    ["Ravi tiles a page with triangles and leaves no gaps. What is this called?", art("triangles")],
    ["Asha folds paper, cuts a shape, and opens it to find both sides match. What is this called?", art("fold")],
    ["Jo rubs a pencil over paper on a brick wall. What is he recording?", art("rubbing")],
    ["A pattern repeats 4 stars in each row, and there are 5 rows. How many stars are there?", blocks(5, 4, "stars", "row")],
  ],
  "artists-and-their-famous-works": [
    ["Mia sees a night sky full of swirling brushstrokes. Which artist painted The Starry Night?", art("swirlSky")],
    ["Jo likes a woodblock print of a huge wave and Mount Fuji. Which artist made it?", art("wave")],
    ["Ravi studies a painting that is made of lots of tiny dots. Which artist is famous for this?", art("pointDots")],
    ["Ben sees repeated pictures of soup cans. Which artist is this?", art("cans")],
    ["Zara admires a huge painting of a flower close up, with petals filling the page. Which artist painted like this?", art("flower")],
    ["Leo likes a painting made from a grid of black lines and red, blue and yellow blocks. Who painted it?", art("grid")],
    ["Sam sees small stick-like people in a busy northern town. Which English artist painted these?", art("matchstick")],
    ["Mia visits a gallery with 4 rooms. Each room has 6 paintings. How many paintings is that?", blocks(4, 6, "paintings", "room")],
  ],
  "famous-sculptors": [
    ["Mia sees a huge steel figure with wings beside a road in Gateshead. Who made it?", art("angel")],
    ["Jo sees a smooth reclining figure with a hole through it. Who might have made it?", art("reclining")],
    ["Ravi sees balanced shapes that move in a breeze. What are they?", art("mobile")],
    ["Zara sees a shiny steel sculpture shaped like a bean in Chicago. What is it called?", art("bean")],
    ["Leo likes tall, thin bronze figures. Which sculptor made them?", art("thin")],
    ["Jo makes 3 mobiles with 5 shapes each. How many shapes is that?", blocks(3, 5, "shapes", "mobile")],
    ["Mia's statue models are 15 cm tall. She makes 4 models and stands them in a row. What is their combined height in cm if stacked?", blocks(4, 15, "cm", "model")],
  ],
  "craft-makers-and-designers": [
    ["Mia sees wallpaper with a repeating pattern of strawberries and birds. Which designer is linked with this?", art("strawberry")],
    ["Jo sees a teapot painted in bright orange and yellow Art Deco shapes. Which maker is this?", art("teapot")],
    ["Zara sees a tall chair with a high back made for a Glasgow tearoom. Which designer might have made it?", art("chair")],
    ["Asha makes a picture from small pieces of coloured glass. What is it?", art("mosaic")],
    ["Ben stitches a pattern on a cushion. What is the craft called?", art("cushion")],
    ["A mosaic has 8 rows of 7 tiles. How many tiles is that?", blocks(8, 7, "tiles", "row")],
    ["Mia weaves 6 rows in a minute for 5 minutes. How many rows is that?", blocks(5, 6, "rows", "minute")],
  ],
  "architects-and-buildings": [
    ["Mia sees a big round dome on a London cathedral. Which architect designed it?", art("dome")],
    ["Jo sees a swimming pool roof that curves like a wave in London. Which architect designed it?", art("waveRoof")],
    ["Ravi sees a building with towers that look like melting stone, in Barcelona. Which architect designed it?", art("towers")],
    ["Asha sees a pointed glass skyscraper in London nicknamed the Gherkin. Who designed it?", art("gherkin")],
    ["Ben sees a house built over a waterfall in the USA. Who designed Fallingwater?", art("waterfallHouse")],
    ["Zara sees a harbour building with sail-shaped roofs. Which building is it?", art("sails")],
    ["Leo looks at a huge glass and iron hall built for the Great Exhibition in 1851. What is it?", art("glassHall")],
    ["A model of a tower is built with 6 layers of 4 blocks. How many blocks is that?", blocks(6, 4, "blocks", "layer")],
    ["A building has 3 floors of 8 windows each. How many windows is that?", blocks(3, 8, "windows", "floor")],
  ],
};
