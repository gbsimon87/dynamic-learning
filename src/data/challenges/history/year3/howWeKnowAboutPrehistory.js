import { choice as c, sort as s, order as o, story, photoStory } from "../year2/authoring.js";

const timeline = { bands: ["Stone Age", "Bronze Age", "Iron Age", "Roman Britain", "Today"] };
const timeVisual = { type: "timeline", timeline };
const sourceVisual = { type: "source", image: "cma-flint-handaxe" };

// Each bank is explicitly authored: answers are on its own card/source.
// The Egyptian artefact is labelled honestly, not presented as a British find.
export const howWeKnowAboutPrehistory = {
  year: 3,
  references: [
    "https://historicengland.org.uk/education/schools-resources/teaching-activities/timeline-stone-age-to-iron-age/ — British period sequence and archaeological evidence.",
    "https://historicengland.org.uk/research/methods/archaeology/ — physical remains, controlled excavation, archives and finds.",
    "https://historicengland.org.uk/content/docs/research/historic-england-archaeological-recording-manual-2018 — recording finds and their context.",
    "https://www.clevelandart.org/art/1915.42 — Egyptian Palaeolithic flint hand axe, open access.",
  ],
  levels: {
    1: { story: story([
      "Prehistory is the time before people left written records in a place.",
      "Archaeologists study objects and remains to learn about the past.",
      "An artefact is an object made or changed by people.",
      "Tools and pottery are artefacts; animal bones are remains.",
      "Careful digs uncover and record these clues.",
    ], "🔍", "a magnifying glass for examining clues"), rounds: ["facts1", "sort1", "facts1", "facts1", "facts1"] },
    2: { story: { ...story([
      "In Britain, the Stone Age came before the Bronze Age.",
      "Next came the Iron Age, then Roman Britain.",
      "Today comes last on our timeline.",
      "BC means before year 1; those years count down.",
      "AD labels years from year 1 onwards.",
      "These bands show periods, not equal lengths of time.",
    ], "🕰️", "a clock representing time"), timeline }, rounds: ["facts2", "order2", "facts2", "sort2", "facts2"] },
    3: { story: photoStory([
      "This flint hand axe comes from Egypt.",
      "People chipped stone to shape it.",
      "The photo shows its uneven surface and worked edges.",
      "Those edges are evidence that someone shaped it.",
      "The photo cannot tell us the maker's name.",
      "Tools like this help archaeologists ask how people lived.",
    ], "cma-flint-handaxe"), rounds: ["facts3", "facts3", "facts3", "facts3", "facts3"] },
    4: { story: story([
      "Archaeologists record where they find an object before studying it.",
      "Its place helps explain how people used it.",
      "A worked stone suggests toolmaking; it cannot tell us someone's name.",
      "New finds can change our ideas about the past.",
      "We compare different clues, rather than guessing from one object.",
    ], "🧩", "a puzzle piece representing a clue"), rounds: ["facts4", "sort4", "facts4", "facts4", "facts4"] },
  },
  banks: {
    facts1: [
      c("What does prehistory mean?", "time before written records in a place", ["all time after writing began", "only the time before you were born"], "before people left written records in a place"),
      c("Who studies objects and remains from the past?", "archaeologists", ["weather forecasters", "people predicting the future"], "Archaeologists study objects and remains"),
      c("What is an artefact?", "an object made or changed by people", ["every natural stone", "only a written story"], "an object made or changed by people"),
      c("Which is an artefact in Bix's story?", "pottery", ["an unchanged animal bone", "a natural rock"], "Tools and pottery are artefacts"),
      c("Which clue does Bix call a remain?", "an animal bone", ["a pottery bowl", "a shaped tool"], "animal bones are remains"),
      c("What do careful digs do?", "uncover and record clues", ["hide all the clues", "only collect shiny things"], "Careful digs uncover and record"),
    ],
    sort1: [s("Artefact or animal remain?", ["Artefact", "Animal remain"], [["a tool made by people", 0], ["a pottery bowl", 0], ["an animal bone", 1]], ["Tools and pottery are artefacts", "animal bones are remains"])],
    facts2: [
      c("Which period came before the Bronze Age in Britain?", "Stone Age", ["Iron Age", "Roman Britain"], "Stone Age came before the Bronze Age", { visual: timeVisual }),
      c("Which period followed the Bronze Age?", "Iron Age", ["Stone Age", "Roman Britain"], "Next came the Iron Age", { visual: timeVisual }),
      c("Which band comes last on this timeline?", "Today", ["Iron Age", "Roman Britain"], "Today comes last", { visual: timeVisual }),
      c("What does BC mean?", "before year 1", ["after year 1", "only Roman times"], "BC means before year 1", { visual: timeVisual }),
      c("What does AD label?", "years from year 1 onwards", ["years before year 1", "only the Stone Age"], "AD labels years from year 1 onwards", { visual: timeVisual }),
      c("What do these time bands show?", "periods in order", ["equal lengths of time", "how long each person lived"], "bands show periods, not equal lengths", { visual: timeVisual }),
    ],
    order2: [o("Put the British periods in order, oldest first.", ["Stone Age", "Bronze Age", "Iron Age", "Roman Britain", "Today"], ["Stone Age came before the Bronze Age", "Next came the Iron Age, then Roman Britain", "Today comes last"])],
    sort2: [s("Which side of year 1 does each label describe?", ["BC", "AD"], [["before year 1", 0], ["year 1", 1], ["years after year 1", 1]], ["BC means before year 1", "AD labels years from year 1 onwards"])],
    facts3: [
      c("Where does this hand axe come from?", "Egypt", ["Britain", "we know no place for it"], "comes from Egypt", { visual: sourceVisual }),
      c("What material is this hand axe?", "flint stone", ["bronze metal", "iron metal"], ["flint hand axe", "chipped stone"], { visual: sourceVisual }),
      c("How did people shape it?", "by chipping stone", ["by printing paper", "by pouring melted iron"], "People chipped stone", { visual: sourceVisual }),
      c("What detail can you see on the hand axe?", "an uneven surface", ["a written name", "a wooden handle"], "uneven surface", { visual: sourceVisual }),
      c("What do the worked edges suggest?", "someone shaped the stone", ["we know the maker's name", "the tool was made of bronze"], "evidence that someone shaped it", { visual: sourceVisual }),
      c("What can this photo not tell us?", "the maker's name", ["the stone's visible shape", "that its surface is uneven"], "cannot tell us the maker's name", { visual: sourceVisual }),
      c("Which question could this tool help archaeologists explore?", "How did people shape stone?", ["What was the maker's name?", "What will happen tomorrow?"], ["People chipped stone to shape it", "help archaeologists ask how people lived"], { visual: sourceVisual }),
    ],
    facts4: [
      c("What should archaeologists record before studying a find?", "where they found it", ["only whether it is shiny", "a guessed owner's name"], "record where they find an object"),
      c("Why does the place of a find matter?", "it helps explain how people used it", ["it proves every person's name", "it makes all objects the same age"], "Its place helps explain how people used it"),
      c("What can a worked stone suggest?", "people made tools", ["the maker's exact name", "what every person believed"], "worked stone suggests toolmaking"),
      c("What could change our ideas about the past?", "new finds", ["ignoring all evidence", "guessing without clues"], "New finds can change our ideas"),
      c("What helps us build a stronger explanation?", "comparing different clues", ["guessing from one object", "forgetting where finds came from"], "compare different clues"),
      c("You find a shaped stone. Which claim needs more evidence?", "I know the maker's name", ["someone shaped this stone", "it suggests toolmaking"], "it cannot tell us someone's name"),
    ],
    sort4: [s("What can a worked stone support on its own?", ["Supported", "Needs more evidence"], [["someone shaped stone", 0], ["people made tools", 0], ["the maker's exact name", 1]], ["worked stone suggests toolmaking", "cannot tell us someone's name"])],
  },
};
