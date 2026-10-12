import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const athelstanFirstKingOfEngland = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/", "https://www.clevelandart.org/art/1969.159.a"],
    [
  lesson("🏰", "Athelstan First King of England", [
    ["Athelstan was Alfred's grandson.", "How was Athelstan related to Alfred?", "grandson", "father", "brother"],
    ["He became king of a united England in AD 927.", "When did he unite England?", "AD 927", "AD 793", "AD 410"],
    ["Earlier rulers had controlled several separate kingdoms.", "What existed before unification?", "several kingdoms", "one Roman England", "no rulers at all"],
    ["Athelstan took control of York.", "Which city did Athelstan take control of?", "York", "Rome", "Alexandria"],
    ["He used laws and agreements as well as military power.", "What else did he use besides military power?", "laws and agreements", "only ship drawings", "only farming tools"],
    ["He is remembered as the first king of England.", "How is he remembered?", "first king of England", "first Roman emperor", "first king of Wessex"]], sort("Family or rule?", ["Family", "Rule"],
    [
    ["Alfred's grandson", 0],
    ["laws", 1],
    ["agreements", 1]],
    ["Alfred's grandson", "laws and agreements"]), false),
  lesson("🏰", "Athelstan First King of England", [
    ["Alfred ruled Wessex before Athelstan.", "Which ruler came first?", "Alfred", "Athelstan", "Cnut"],
    ["Edward the Elder and Aethelflaed expanded Anglo-Saxon control.", "Who expanded control before Athelstan's unification?", "Edward and Aethelflaed", "Caesar and Claudius", "Cnut and Edward the Confessor"],
    ["Athelstan united England in AD 927.", "Which event belongs to AD 927?", "Athelstan's unification", "Edington", "Roman withdrawal"],
    ["He won at Brunanburh in AD 937.", "Which came after unification?", "Brunanburh victory", "Edington", "Lindisfarne raid"],
    ["Athelstan died in AD 939.", "What happened in AD 939?", "Athelstan died", "Cnut became king", "Roman rule ended"],
    ["Cnut became king much later, in AD 1016.", "Who became king later?", "Cnut", "Alfred", "Caesar"]], order("Order the events, oldest first.", ["Alfred rules Wessex", "Athelstan unites England · AD 927", "Brunanburh · AD 937", "Athelstan dies · AD 939", "Cnut king · AD 1016"],
    ["before Athelstan", "AD 927", "AD 937", "AD 939", "much later, in AD 1016"]), true),
  detective(["Royal coins carry images or names claiming a ruler's authority.", "Moneyers made coins for exchange and royal authority.", "A ruler's name is evidence of a claim to power.", "A coin cannot prove everybody accepted that ruler.", "This pictured Anglo-Saxon coin predates Athelstan.", "We compare coins with charters and accounts."],
    [
    ["What can royal coins carry?", "images or names of rulers", "every farmer's voice", "every household's story", "Royal coins carry images or names claiming a ruler's authority."],
    ["Who made coins?", "moneyers", "only monks", "only shipbuilders", "Moneyers made coins for exchange and royal authority."],
    ["What does the ruler's name suggest?", "a claim to power", "everyone agreed with him", "no government existed", "A ruler's name is evidence of a claim to power."],
    ["What cannot a coin prove?", "everybody accepted the ruler", "its visible markings", "its metal shape", "A coin cannot prove everybody accepted that ruler."],
    ["Is this Athelstan's own coin?", "no, an earlier example", "yes, his exact coin", "yes, a modern pound", "This pictured Anglo-Saxon coin predates Athelstan."],
    ["What should we compare coins with?", "charters and accounts", "only legends", "only guesses", "We compare coins with charters and accounts."],
    ["Why were coins made?", "exchange and authority", "to record every battle", "only for modern museums", "Moneyers made coins for exchange and royal authority."]], {"image": "cma-anglo-saxon-coin"}),
  lesson("🏰", "Athelstan First King of England", [
    ["Unification changed the number of rulers controlling England.", "What changed through unification?", "the number of rulers", "the need for shelter", "the need for food"],
    ["Local communities still farmed and traded.", "What continued?", "farming and trade", "separate kings everywhere forever", "Roman governors"],
    ["A united kingdom did not mean everyone had identical customs.", "Were all customs identical?", "no", "yes, immediately", "yes, everywhere"],
    ["Laws and agreements helped rulers hold power.", "What helped hold power?", "laws and agreements", "only crowns", "only legends"],
    ["Earlier rulers' work helped make Athelstan's achievement possible.", "Whose work helped?", "earlier rulers'", "only modern historians'", "only Roman emperors'"],
    ["Unification was important, but later struggles continued.", "Did unification end every later struggle?", "no", "yes, forever", "yes, no further invasions"]], sort("Change or continuity?", ["Change", "Continuity"],
    [
    ["one ruler over England", 0],
    ["local farming", 1],
    ["local trading", 1]],
    ["Unification changed", "still farmed and traded"]), false),
]);
