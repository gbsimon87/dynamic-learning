import { lesson, detective, sort, order, year4Topic } from "./authoring.js";
export const theGreatVikingInvasion = year4Topic(["https://www.english-heritage.org.uk/members-area/kids/saxons-vikings/vikings-in-england/", "https://www.english-heritage.org.uk/learn/story-of-england/early-medieval/introduction/"],
    [
  lesson("⚔️", "The Great Viking Invasion", [
    ["A large Viking army arrived in England in AD 865.", "When did the large army arrive?", "AD 865", "AD 410", "AD 1066"],
    ["It is often called the Great Heathen Army.", "What name is often used?", "Great Heathen Army", "Roman legion", "Norman fleet"],
    ["'Heathen' reflects Christian writers' description of non-Christians.", "Whose viewpoint does 'heathen' reflect?", "Christian writers'", "every Viking's own name", "modern archaeologists only"],
    ["The army sought land and power, not only portable treasure.", "What did the army seek?", "land and power", "only souvenirs", "only books"],
    ["It conquered several Anglo-Saxon kingdoms.", "What did it conquer?", "several Anglo-Saxon kingdoms", "the Roman Empire", "Ancient Egypt"],
    ["The Danelaw had strong Scandinavian settlement and legal influence.", "What was important in the Danelaw?", "Scandinavian settlement and laws", "Roman governors", "Egyptian pharaohs"]], sort("Army or settlement area?", ["Army", "Settlement area"],
    [
    ["Great Heathen Army", 0],
    ["Danelaw", 1],
    ["Scandinavian communities", 1]],
    ["large Viking army", "Danelaw had strong Scandinavian settlement"]), false),
  lesson("⚔️", "The Great Viking Invasion", [
    ["The Lindisfarne raid happened in AD 793.", "Which happened first here?", "Lindisfarne raid", "large army arriving", "Edington"],
    ["The large army arrived later, in AD 865.", "Which happened in AD 865?", "large army arriving", "Lindisfarne raid", "Cnut becoming king"],
    ["York was captured in AD 866.", "Which town was captured in AD 866?", "York", "Rome", "Canterbury"],
    ["Alfred won at Edington in AD 878.", "Which event followed York's capture?", "Edington victory", "Roman withdrawal", "Lindisfarne raid"],
    ["Danelaw communities grew during these later decades.", "What grew in later decades?", "Danelaw communities", "Roman imperial government", "Ancient Sumer"],
    ["Different places changed at different times.", "Did every place change at once?", "no", "yes, one day", "yes, one battle"]], order("Order the events, oldest first.", ["Lindisfarne raid · AD 793", "Army arrives · AD 865", "York captured · AD 866", "Edington · AD 878"],
    ["AD 793", "later, in AD 865", "AD 866", "AD 878"]), true),
  detective(["Our map places the Danelaw mainly in northern and eastern England.", "Wessex lies in the south-west.", "We drew this map to explain a broad division.", "The boundary changed and was not a modern national border.", "The name Danelaw refers to Scandinavian legal influence.", "Our drawing cannot show every community's identity."],
    [
    ["Where does the map place the Danelaw?", "mainly north and east", "only south-west", "in Ireland", "Our map places the Danelaw mainly in northern and eastern England."],
    ["Where is Wessex shown?", "south-west", "north-east", "in Denmark", "Wessex lies in the south-west."],
    ["Who made this map?", "Learn with Bix", "a Viking commander", "Alfred himself", "We drew this map to explain a broad division."],
    ["What happened to the boundary?", "it changed", "it never changed", "it was today's border", "The boundary changed and was not a modern national border."],
    ["What does the name refer to?", "Scandinavian legal influence", "Roman imperial laws", "Egyptian writing", "The name Danelaw refers to Scandinavian legal influence."],
    ["What cannot the drawing show?", "every community's identity", "its Wessex label", "its broad division", "Our drawing cannot show every community's identity."],
    ["Why did we draw the map?", "to explain a broad division", "to show every family's origin", "to show today's borders", "We drew this map to explain a broad division."]], {"scene": "danelaw"}),
  lesson("⚔️", "The Great Viking Invasion", [
    ["An invasion seeking land differed from a short raid.", "How did this invasion differ?", "it sought land", "it was only one quick visit", "it sought no power"],
    ["Conquest changed rulers in several kingdoms.", "What did conquest change?", "rulers", "the need for water", "the need for food"],
    ["Settlement brought Scandinavian languages and customs.", "What did settlement bring?", "languages and customs", "only Roman emperors", "only Egyptian beliefs"],
    ["Existing communities did not all disappear.", "What happened to existing communities?", "many continued", "all vanished immediately", "all became identical"],
    ["Wessex resisted while other kingdoms were conquered.", "Which kingdom resisted?", "Wessex", "Ancient Egypt", "Rome"],
    ["Accounts and archaeology reveal different parts of this change.", "What reveals different parts?", "accounts and archaeology", "one map alone", "one stereotype"]], sort("Change or continuity?", ["Change", "Continuity"],
    [
    ["new rulers", 0],
    ["communities carrying on", 1],
    ["new customs", 0]],
    ["changed rulers", "communities did not all disappear", "brought Scandinavian languages and customs"]), false),
]);
