import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const mayaCitiesAndKings = year5Topic(["https://whc.unesco.org/en/list/64/", "https://whc.unesco.org/en/list/411/", "https://www.worldhistory.org/Maya_Civilization/"], [
  lesson("🗿", "Maya cities", [
    ["The Maya did not have one empire.", "Did the Maya have one empire?", "no", "yes, one empire", "yes, ruled from Rome"],
    ["They had many city-states, each with its own king.", "What did the Maya have instead?", "many city-states", "one big empire", "no cities"],
    ["Tikal, Palenque and Copan were famous Maya cities.", "Which were famous Maya cities?", "Tikal, Palenque and Copan", "Athens, Sparta and Corinth", "Jorvik, Mercia and Wessex"],
    ["A Maya king was called a holy lord.", "What was a Maya king called?", "a holy lord", "a pharaoh", "a consul"],
    ["Cities had stone temples, palaces and squares.", "What did cities have?", "stone temples, palaces and squares", "castles and moats", "pyramids of ice"],
    ["The Maya built without metal tools or wheeled carts.", "What did the Maya build without?", "metal tools and wheeled carts", "stone and wood", "people and time"]],
    sort("A city or a ruler?", ["A city", "A ruler"], [["Tikal", 0], ["Palenque", 0], ["Copan", 0], ["holy lord", 1]], ["Tikal", "Palenque", "Copan", "holy lord"])),
  lesson("📅", "Kings and cities in time", [
    ["Maya cities grew from about AD 250.", "When did Maya cities grow?", "from about AD 250", "from about 776 BC", "from AD 1500"],
    ["King Pakal ruled Palenque from AD 615 to 683.", "Which king ruled Palenque from AD 615 to 683?", "Pakal", "Alfred", "Athelstan"],
    ["Pakal was buried in a stone temple at Palenque.", "Where was Pakal buried?", "in a stone temple", "under the sea", "in an Egyptian pyramid"],
    ["Tikal's last known dated monument was set up in AD 869.", "When was Tikal's last known dated monument set up?", "AD 869", "AD 250", "AD 615"],
    ["By about AD 900, many southern cities were quiet.", "What were many southern cities like by about AD 900?", "quiet", "growing fast", "ruled by Rome"],
    ["Today Tikal, Palenque and Copan are World Heritage Sites.", "What are Tikal, Palenque and Copan today?", "World Heritage Sites", "modern cities", "football stadiums"]],
    order("Order the events, oldest first.", ["Cities grow · AD 250", "Pakal rules Palenque · AD 615", "Tikal's last dated monument · AD 869", "Southern cities quiet · about AD 900"], ["AD 250", "AD 615", "AD 869", "AD 900"]), MAYA_TIMELINE),
  detective(["A stela is a tall carved stone.", "Maya kings set up stelae to record important events.", "A stela may show a king with his name and a date.", "Stelae show kings as they wanted to be remembered.", "Kings rarely carved their defeats.", "Archaeologists compare stelae with burials and ruined buildings.", "Together these give a fuller picture."],
    [
    ["What is a stela?", "a tall carved stone", "a paper book", "a metal crown", "A stela is a tall carved stone."],
    ["Why did kings set up stelae?", "to record important events", "to hold up roofs", "to grow maize", "set up stelae to record important events"],
    ["What may a stela show?", "a king, his name and a date", "a Greek vote", "a photograph", "a king with his name and a date"],
    ["How do stelae show kings?", "as they wanted to be remembered", "exactly as they were in every detail", "as their enemies saw them", "as they wanted to be remembered"],
    ["What did kings rarely carve?", "their defeats", "their names", "their dates", "Kings rarely carved their defeats."],
    ["What do archaeologists compare stelae with?", "burials and ruined buildings", "modern adverts", "Greek vases", "compare stelae with burials and ruined buildings"],
    ["What do these sources give together?", "a fuller picture", "no picture at all", "a perfect picture", "Together these give a fuller picture."]], { picture: "🗿", pictureLabel: "A carved stone stela" }),
  lesson("🤔", "Friends and rivals", [
    ["Maya cities were sometimes allies and sometimes rivals.", "How did cities treat each other?", "sometimes allies, sometimes rivals", "always friends", "always at war"],
    ["Kings fought wars to gain power and captives.", "Why did kings fight wars?", "to gain power and captives", "to win Olympic prizes", "to find gold in Greece"],
    ["Kings also made peace through marriages.", "How else did kings make friends?", "through marriages", "through Olympic Games", "through voting slips"],
    ["Powerful cities, such as Tikal and Calakmul, led alliances.", "Which cities led alliances?", "Tikal and Calakmul", "Athens and Sparta", "Jorvik and York"],
    ["No single city ruled all the Maya for long.", "Did one city rule all the Maya for long?", "no", "yes, Tikal did", "yes, Palenque did"],
    ["This is like Greece, where city-states were separate but linked.", "What is this like?", "Greek city-states", "the Roman Empire", "Egypt's pharaohs"]],
    sort("Friendly or rivalry?", ["Friendly", "Rivalry"], [["marriages", 0], ["alliances", 0], ["wars", 1], ["rivals", 1]], ["marriages", "alliances", "wars", "rivals"])),
]);
