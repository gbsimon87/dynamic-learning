import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const theScotsComeFromIreland = year4Topic(["https://www.historicenvironment.scot/visit/all/kilmartin-glen-dunadd-fort/history-and-stories/", "https://www.historicenvironment.scot/visit/all/iona-abbey-and-nunnery/history-and-stories/"],
    [
  lesson("⛵", "The Scots Come from Ireland", [
    ["Early Scots had close links with Ireland.", "Where did early Scots have close links?", "Ireland", "Egypt", "Italy"],
    ["People crossed the sea to western parts of north Britain.", "Where did people travel?", "western north Britain", "the Nile valley", "Rome"],
    ["Their kingdom, Dál Riata, linked lands across the sea.", "What linked lands across the sea?", "Dál Riata", "Wessex", "Mercia"],
    ["The Scots spoke Gaelic.", "Which language did the Scots speak?", "Gaelic", "Latin only", "Old English only"],
    ["Picts lived in other parts of north Britain.", "Who also lived in north Britain?", "Picts", "Egyptian pharaohs", "Roman emperors"],
    ["Sea routes carried people, trade and ideas.", "What travelled along sea routes?", "people, trade and ideas", "only kings", "only soldiers"]], sort("People or connections?", ["People", "Connections"],
    [
    ["Scots", 0],
    ["Picts", 0],
    ["sea routes", 1]],
    ["Early Scots", "Picts lived", "Sea routes"]), false),
  lesson("⛵", "The Scots Come from Ireland", [
    ["Roman rule ended about AD 410.", "What is our starting event?", "Roman rule ending", "Edward's death", "Athelstan ruling England"],
    ["Dál Riata grew in the following centuries.", "When did Dál Riata grow?", "after Roman rule ended", "before the Stone Age", "after Edward died"],
    ["Dunadd was a royal centre from about AD 500.", "Which place was a royal centre?", "Dunadd", "Jorvik", "Canterbury"],
    ["Columba founded a monastery on Iona in AD 563.", "What did Columba found?", "a monastery on Iona", "a Roman fort", "a Viking market"],
    ["Iona existed before the Lindisfarne raid in AD 793.", "Which came first?", "Iona's monastery", "Lindisfarne raid", "Cnut's reign"],
    ["These communities changed over many generations.", "How long did change take?", "many generations", "one afternoon", "one week"]], order("Order the events, oldest first.", ["Roman rule ends · about AD 410", "Dunadd royal centre · about AD 500", "Iona monastery · AD 563", "Lindisfarne raid · AD 793"],
    ["Roman rule ended", "Dunadd was", "Columba founded", "before the Lindisfarne raid"]), true),
  detective(["Dunadd's rock has a footprint carving.", "It may have been used when kings took power.", "Craftworkers left moulds used to shape metal.", "Moulds show how metal objects were made.", "These clues do not name every person who travelled.", "Historians compare objects with written accounts."],
    [
    ["What is carved into Dunadd's rock?", "a footprint", "a printed letter", "a Roman portrait", "Dunadd's rock has a footprint carving."],
    ["What might the carving relate to?", "kings taking power", "modern bus travel", "Egyptian farming", "It may have been used when kings took power."],
    ["Who used the moulds?", "craftworkers", "modern photographers", "Roman emperors only", "Craftworkers left moulds used to shape metal."],
    ["What do moulds help explain?", "making metal objects", "everyone's spoken words", "every king's thoughts", "Moulds show how metal objects were made."],
    ["What cannot these clues name?", "every traveller", "a visible footprint", "metalworking equipment", "These clues do not name every person who travelled."],
    ["What do historians compare?", "objects and written accounts", "only guesses", "only modern stories", "Historians compare objects with written accounts."],
    ["Does 'may' mean we are completely certain?", "no", "yes, no doubt", "yes, proof of every king", "It may have been used when kings took power."]], {"scene": "dunadd"}),
  lesson("⛵", "The Scots Come from Ireland", [
    ["The sea connected communities rather than only separating them.", "What could the sea do?", "connect communities", "prevent all travel", "stop all trade"],
    ["People travelled for settlement, trade and power.", "Why did people travel?", "settlement, trade and power", "only holidays", "only to find Roman coins"],
    ["Scots and Picts were different groups.", "Were Scots and Picts the same group?", "no", "yes, one name", "yes, all from Rome"],
    ["Their contacts could involve cooperation or conflict.", "What could contacts involve?", "cooperation or conflict", "only peaceful meetings", "only isolation"],
    ["Gaelic is still spoken in parts of Scotland.", "Which language has a continuing link?", "Gaelic", "only ancient Latin", "only Egyptian"],
    ["We should compare evidence before describing migration.", "What helps describe migration carefully?", "comparing evidence", "one unsupported guess", "ignoring sea routes"]], sort("Moving people or sharing things?", ["Moving people", "Sharing things"],
    [
    ["settlement", 0],
    ["trade", 1],
    ["travelling across the sea", 0]],
    ["settlement, trade", "People travelled", "sea connected"]), false),
]);
