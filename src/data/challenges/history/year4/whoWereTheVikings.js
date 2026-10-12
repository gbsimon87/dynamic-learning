import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const whoWereTheVikings = year4Topic(["https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/", "https://www.vikingeskibsmuseet.dk/en/professions/education/"],
    [
  lesson("🐉", "Who Were the Vikings", [
    ["Viking travellers came from Scandinavia.", "Where did Viking travellers come from?", "Scandinavia", "Ancient Egypt", "Rome"],
    ["This includes areas now called Norway, Denmark and Sweden.", "Which countries are in Scandinavia?", "Norway, Denmark and Sweden", "Spain, Italy and Greece", "Egypt, Iraq and India"],
    ["Longships used sails and oars.", "What powered longships?", "sails and oars", "steam engines", "electric motors"],
    ["Shallow hulls helped ships travel along rivers.", "What helped river travel?", "shallow hulls", "very deep hulls", "no hulls"],
    ["People travelled to raid, trade and settle.", "Why did people travel?", "raid, trade and settle", "only to raid", "only for holidays"],
    ["Many Scandinavian people were farmers and craftworkers.", "What work did many people do?", "farming and crafts", "only raiding", "only royal ruling"]], sort("Ship features or activities?", ["Ship features", "Activities"],
    [
    ["sails", 0],
    ["oars", 0],
    ["trading", 1],
    ["farming", 1]],
    ["sails and oars", "trade", "farmers"]), false),
  lesson("🐉", "Who Were the Vikings", [
    ["Anglo-Saxon kingdoms existed before the famous Viking raids.", "What existed before these raids?", "Anglo-Saxon kingdoms", "Norman England", "Cnut's empire"],
    ["The Lindisfarne raid happened in AD 793.", "Which raid is labelled AD 793?", "Lindisfarne", "Great army arriving", "Edington"],
    ["A large Viking army arrived in AD 865.", "What happened in AD 865?", "a large army arrived", "Roman rule ended", "Edward died"],
    ["Viking settlers later built lives in places such as York.", "What did later settlers do?", "build lives in York", "return everyone to Rome", "build Egyptian pyramids"],
    ["Cnut became king of England in AD 1016.", "Who became king in AD 1016?", "Cnut", "Alfred", "Caesar"],
    ["Raiding, trading and settlement could overlap.", "Did these activities always happen in separate stages?", "no, they could overlap", "yes, never together", "yes, one activity each century"]], order("Order the events, oldest first.", ["Anglo-Saxon kingdoms", "Lindisfarne raid · AD 793", "Great army arrives · AD 865", "Cnut king · AD 1016"],
    ["kingdoms existed before", "raid happened in AD 793", "army arrived in AD 865", "Cnut became king"]), true),
  detective(["Our longship drawing shows a sail, oars and a shallow hull.", "We made this teaching drawing from ship evidence.", "Shipbuilders made real ships for journeys.", "A drawing can help explain how a ship worked.", "It does not prove every ship looked exactly alike.", "Excavated ships offer evidence to check reconstructions."],
    [
    ["What features can you see?", "sail, oars and shallow hull", "steam engine and funnel", "electric motor and wheels", "Our longship drawing shows a sail, oars and a shallow hull."],
    ["Who made this drawing?", "Learn with Bix", "a Viking sailor", "an Anglo-Saxon monk", "We made this teaching drawing from ship evidence."],
    ["Why were real ships made?", "for journeys", "to display in modern classrooms", "to photograph battles", "Shipbuilders made real ships for journeys."],
    ["What can this drawing help explain?", "how a ship worked", "every sailor's thoughts", "a particular raid's date", "A drawing can help explain how a ship worked."],
    ["What does it not prove?", "all ships were identical", "the drawing has oars", "the drawing has a sail", "It does not prove every ship looked exactly alike."],
    ["What can check a reconstruction?", "excavated ships", "only a modern cartoon", "only a guess", "Excavated ships offer evidence to check reconstructions."],
    ["Who made real ships?", "shipbuilders", "modern curators only", "Roman emperors only", "Shipbuilders made real ships for journeys."]], {"scene": "longship"}),
  lesson("🐉", "Who Were the Vikings", [
    ["Calling everyone only a raider gives an incomplete picture.", "Why avoid calling everyone only a raider?", "it leaves out other lives", "everyone was a king", "no raids happened"],
    ["Trade moved goods and ideas between places.", "What did trade move?", "goods and ideas", "only armies", "only kings"],
    ["Settlement changed families, languages and communities.", "What could settlement change?", "languages and communities", "only weather", "only tides"],
    ["Raids harmed people and communities.", "What did raids do?", "harm people and communities", "only help everyone", "never affect people"],
    ["Farming remained important for food.", "What remained important for food?", "farming", "only treasure", "only longships"],
    ["Different sources help us compare these different activities.", "How can we compare activities?", "use different sources", "use one stereotype", "ignore finds"]], sort("Harm or everyday work?", ["Harm", "Everyday work"],
    [
    ["raiding", 0],
    ["farming", 1],
    ["making goods", 1]],
    ["Raids harmed", "Farming remained", "Trade moved goods"]), false),
]);
