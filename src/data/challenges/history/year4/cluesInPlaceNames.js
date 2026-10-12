import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const cluesInPlaceNames = year4Topic(["https://heritage.suffolk.gov.uk/media/pdfs/teachingpackroyalresidencesnetwork__teachingforweb.pdf"],
    [
  lesson("🪧", "Clues in Place Names", [
    ["Old English words survive in many place names.", "What survives in many place names?", "Old English words", "only Roman numbers", "only Viking ship names"],
    ["The ending -ham often means a home or settlement.", "What can -ham mean?", "home or settlement", "river crossing", "fortified place"],
    ["The ending -ton often means an enclosed settlement.", "What can -ton mean?", "enclosed settlement", "open sea", "mountain peak"],
    ["The element -ing can refer to a group of people.", "What can -ing refer to?", "a group of people", "only a river", "only a church"],
    ["A ford is a shallow river crossing.", "What is a ford?", "shallow river crossing", "deep harbour", "hill fort"],
    ["The ending -bury can mean a fortified place.", "What can -bury mean?", "fortified place", "only a farm animal", "only a boat"]], sort("Settlement or crossing?", ["Settlement", "Crossing"],
    [
    ["-ham", 0],
    ["-ton", 0],
    ["-ford", 1]],
    ["-ham often means a home or settlement", "-ton often means an enclosed settlement", "ford is a shallow river crossing"]), false),
  lesson("🪧", "Clues in Place Names", [
    ["A settlement first received a name people used.", "What came first in this example?", "people used a name", "modern spelling", "our dictionary search"],
    ["A scribe later wrote the name in a record.", "What came after people used it?", "a scribe wrote it", "our dictionary search", "modern spelling first"],
    ["Spelling could change over generations.", "What could change over generations?", "spelling", "every river's direction", "every hill's height"],
    ["Today's spelling may differ from the earliest record.", "Which spelling may differ?", "today's spelling", "only a photograph", "only a coin design"],
    ["Historians compare old records with today's names.", "What do historians compare?", "old records and today's names", "only modern adverts", "only guesses"],
    ["One ending alone cannot give a settlement's exact date.", "Can an ending give an exact date?", "no", "yes, always", "yes, to the day"]], order("Order the events, oldest first.", ["People use a name", "Scribe records it", "Spelling changes", "Historians compare records"],
    ["first received a name", "scribe later wrote", "Spelling could change", "Historians compare"]), true),
  detective(["Our practice sign says Hamford; it is a made-up name.", "We drew it to practise recognising name elements.", "The story explains -ham as home or settlement.", "The story explains -ford as a shallow river crossing.", "Real research compares early spellings in documents.", "Similar endings can have different origins."],
    [
    ["Is Hamford here a real historical source?", "no, a made-up example", "yes, an ancient sign", "yes, a Roman document", "Our practice sign says Hamford; it is a made-up name."],
    ["Why did we draw the sign?", "to practise name elements", "to prove a village's age", "to record an ancient journey", "We drew it to practise recognising name elements."],
    ["What does -ham suggest here?", "home or settlement", "a mountain", "a king's crown", "The story explains -ham as home or settlement."],
    ["What does -ford suggest here?", "shallow river crossing", "a deep ocean", "a palace", "The story explains -ford as a shallow river crossing."],
    ["What helps real research?", "early document spellings", "only our made-up sign", "only one modern guess", "Real research compares early spellings in documents."],
    ["Why compare documents?", "endings can have different origins", "all endings mean the same", "modern names never change", "Similar endings can have different origins."],
    ["Who made this practice sign?", "Learn with Bix", "an Anglo-Saxon scribe", "an ancient king", "We drew it to practise recognising name elements."]], {"scene": "place-name"}),
  lesson("🪧", "Clues in Place Names", [
    ["Place names can preserve clues about earlier languages.", "What can place names preserve?", "earlier language clues", "every spoken conversation", "every person's birthday"],
    ["A -ford name may suggest a crossing.", "What might -ford suggest?", "a crossing", "a pyramid", "a monastery always"],
    ["A -bury name may suggest a fortified place.", "What might -bury suggest?", "a fortified place", "an ocean voyage", "a royal portrait"],
    ["These clues are starting points, not complete proof.", "Are name clues complete proof?", "no, starting points", "yes, every detail", "yes, exact dates"],
    ["Old spellings and archaeology can strengthen an explanation.", "What strengthens an explanation?", "old spellings and archaeology", "ignoring evidence", "inventing a story"],
    ["A surviving name is continuity even when buildings change.", "What can continue while buildings change?", "a place name", "every old roof", "every old wall"]], sort("Clue or stronger investigation?", ["Clue", "Investigation"],
    [
    ["a -ford ending", 0],
    ["a -bury ending", 0],
    ["comparing old spellings", 1]],
    ["-ford name may suggest", "-bury name may suggest", "Old spellings and archaeology"]), false),
]);
