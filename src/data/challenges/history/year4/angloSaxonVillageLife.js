import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const angloSaxonVillageLife = year4Topic(["https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/", "https://www.english-heritage.org.uk/learn/teaching-resources/story-of-1066/collectible-6/"],
    [
  lesson("🏡", "Anglo-Saxon Village Life", [
    ["Most Anglo-Saxon people lived in farming communities.", "Where did most people live?", "farming communities", "Roman palaces", "Viking warships"],
    ["Many houses used timber, with thatched roofs.", "Which materials were common?", "timber and thatch", "glass walls only", "plastic and steel"],
    ["Farmers grew crops and kept animals.", "What did farmers do?", "grow crops and keep animals", "print books", "build pyramids"],
    ["People made bread and cooked over fires.", "How did people cook?", "over fires", "in electric ovens", "in microwaves"],
    ["Craftworkers made pottery, cloth and tools.", "What did craftworkers make?", "pottery, cloth and tools", "only ships", "only crowns"],
    ["Life differed between wealthy and poorer households.", "Were all households alike?", "no", "yes, equally wealthy", "yes, identical homes"]], sort("Growing food or making objects?", ["Growing food", "Making objects"],
    [
    ["keeping animals", 0],
    ["growing crops", 0],
    ["weaving cloth", 1],
    ["making pottery", 1]],
    ["grew crops and kept animals", "made pottery, cloth and tools"]), false),
  lesson("🏡", "Anglo-Saxon Village Life", [
    ["Roman rule ended before Anglo-Saxon villages grew.", "What came before the villages?", "Roman rule", "Cnut's reign", "Edward's death"],
    ["Farming communities grew during the Anglo-Saxon centuries.", "When did these communities grow?", "Anglo-Saxon centuries", "only after 1066", "only today"],
    ["Many existed before the Lindisfarne raid in AD 793.", "Which came later than many villages?", "Lindisfarne raid", "Roman rule", "Stone Age farming"],
    ["Viking settlers later joined some communities.", "Who later joined some communities?", "Viking settlers", "Egyptian pharaohs", "Roman emperors"],
    ["Farming continued into Edward's reign.", "What continued into Edward's reign?", "farming", "Roman government", "one unchanged kingdom"],
    ["The sequence covers centuries, not a single lifetime.", "What does this sequence cover?", "centuries", "one afternoon", "one week"]], order("Order the events, oldest first.", ["Roman rule ends", "Anglo-Saxon villages grow", "Lindisfarne raid · AD 793", "Edward rules · AD 1042–1066"],
    ["Roman rule ended before", "villages grew", "before the Lindisfarne raid", "continued into Edward"]), true),
  detective(["Archaeologists find postholes where timber buildings stood.", "Broken pottery gives clues about cooking and storage.", "Seeds and animal bones give clues about food.", "Craftworkers made pottery for use, not for future museums.", "A house reconstruction uses evidence and some educated guesses.", "One house does not show every household."],
    [
    ["What can postholes show?", "where buildings stood", "everyone's names", "the sound of songs", "Archaeologists find postholes where timber buildings stood."],
    ["What can pottery suggest?", "cooking and storage", "a king's private thoughts", "every villager's name", "Broken pottery gives clues about cooking and storage."],
    ["Which clues help investigate food?", "seeds and animal bones", "only crowns", "only written laws", "Seeds and animal bones give clues about food."],
    ["Why was pottery made?", "for everyday use", "for modern museums only", "to record every voice", "Craftworkers made pottery for use, not for future museums."],
    ["What does a reconstruction combine?", "evidence and educated guesses", "only photographs", "certain knowledge of every detail", "A house reconstruction uses evidence and some educated guesses."],
    ["What cannot one house represent?", "every household", "its own postholes", "its building materials", "One house does not show every household."],
    ["Who made the pottery?", "craftworkers", "modern curators only", "only kings", "Craftworkers made pottery for use, not for future museums."]], {"scene": "village"}),
  lesson("🏡", "Anglo-Saxon Village Life", [
    ["People depended on crops, animals and craft skills.", "What did people depend on?", "crops, animals and craft skills", "only treasure", "only raids"],
    ["A poor harvest could make food scarce.", "What might cause food shortages?", "a poor harvest", "extra crops", "more stored grain"],
    ["Farmers and craftworkers supported each other's work.", "Who supported each other?", "farmers and craftworkers", "only kings and emperors", "only raiders"],
    ["Women, men and children had work to do.", "Who had work to do?", "women, men and children", "only kings", "only soldiers"],
    ["Rulers changed, but families still needed food and shelter.", "What shows continuity?", "needing food and shelter", "new rulers", "new borders"],
    ["Objects help tell stories that written accounts may overlook.", "What can objects help reveal?", "overlooked everyday lives", "everyone's exact thoughts", "every spoken sentence"]], sort("Cause or continuing need?", ["Cause", "Continuing need"],
    [
    ["poor harvest", 0],
    ["needing food", 1],
    ["needing shelter", 1]],
    ["poor harvest could make food scarce", "still needed food and shelter"]), false),
]);
