import { lesson, detective, sort, order, year5Topic, MAYA_TIMELINE } from "./authoring.js";
export const mayaGodsAndTheBallGame = year5Topic(["https://www.worldhistory.org/Maya_Civilization/", "https://www.britannica.com/topic/Maya-people", "https://www.worldhistory.org/Popol_Vuh/"], [
  lesson("🏀", "Gods and the ball game", [
    ["The Maya believed in many gods.", "What did the Maya believe in?", "many gods", "one god only", "no gods"],
    ["Chaac was the god of rain and storms.", "Who was the god of rain?", "Chaac", "Zeus", "Kukulkan"],
    ["The maize god was important for growing food.", "Which god mattered for growing food?", "the maize god", "Poseidon", "Ra"],
    ["Kukulkan was a feathered snake god.", "Which god was a feathered snake?", "Kukulkan", "Chaac", "Zeus"],
    ["The Maya played a ball game with a heavy rubber ball.", "What was the ball made from?", "rubber", "wood", "stone"],
    ["Players could not use their hands, but hit the ball with their hips.", "How did players hit the ball?", "with their hips", "with their hands", "with sticks"]],
    sort("A god or the game?", ["A god", "The game"], [["Chaac", 0], ["Kukulkan", 0], ["rubber ball", 1], ["hips", 1]], ["Chaac", "Kukulkan", "rubber ball", "hips"])),
  lesson("📅", "Gods and games through time", [
    ["Ball games in this region are very old, from about 1600 BC.", "How old are ball games in this region?", "from about 1600 BC", "from about AD 1500", "from about AD 900"],
    ["The Maya built stone ball courts in many cities from about AD 250.", "When did the Maya begin stone ball courts?", "from about AD 250", "from about 1600 BC", "from about AD 1500"],
    ["Chichen Itza's huge ball court was used about AD 900.", "Where was a huge ball court used about AD 900?", "Chichen Itza", "Athens", "Olympia"],
    ["A Maya book called the Popol Vuh was written down in the 1500s.", "When was the Popol Vuh written down?", "in the 1500s", "about 1600 BC", "about AD 250"],
    ["It tells the story of twin heroes who played ball against gods.", "Whom did the twin heroes play?", "gods", "Spanish soldiers", "Greek athletes"],
    ["Today, a form of the ball game is still played in parts of Mexico.", "Where is a form of the game still played?", "parts of Mexico", "Greece", "Rome"]],
    order("Order the events, oldest first.", ["Early ball games · about 1600 BC", "Stone ball courts · from AD 250", "Huge court at Chichen Itza · about AD 900", "Popol Vuh written · 1500s"], ["1600 BC", "AD 250", "AD 900", "1500s"]), MAYA_TIMELINE),
  detective(["Carved stone panels show Maya players in heavy padding.", "Players wore padding on their hips and arms to protect themselves.", "Some carvings link the game with rituals and offerings.", "Carvings suggest that sometimes people were sacrificed after a ritual game.", "Historians are careful, because not every game was a ritual.", "Many games may have been for sport and for fun.", "We have few written rules for how the game worked."],
    [
    ["What do carved panels show?", "players in heavy padding", "sailors in longships", "farmers with ploughs", "Maya players in heavy padding"],
    ["Why did players wear padding?", "to protect themselves", "to look like gods", "to keep warm", "to protect themselves"],
    ["What do some carvings link the game with?", "rituals and offerings", "Olympic prizes", "chariot races", "rituals and offerings"],
    ["What do carvings suggest?", "sometimes people were sacrificed after a ritual game", "no one was ever hurt", "every game ended with a feast", "sometimes people were sacrificed after a ritual game"],
    ["Why are historians careful?", "not every game was a ritual", "every game was a ritual", "no game was ever played", "not every game was a ritual"],
    ["What may many games have been for?", "sport and fun", "only war", "only farming", "for sport and for fun"],
    ["What do we have few of?", "written rules", "carvings", "stone courts", "We have few written rules"]], { picture: "🏀", pictureLabel: "A Maya ball game" }),
  lesson("🤔", "Beliefs and rituals", [
    ["Gods explained rain, sun and the growing of maize.", "What did gods explain?", "rain, sun and growing maize", "Olympic winners", "Greek votes"],
    ["Rituals were meant to keep the world in balance.", "What were rituals meant to do?", "keep the world in balance", "win races", "earn wages"],
    ["Priests and kings led important ceremonies.", "Who led important ceremonies?", "priests and kings", "farmers only", "traders only"],
    ["Some rituals involved offerings of food, jade and incense.", "What were some offerings?", "food, jade and incense", "steel and glass", "paper money"],
    ["Sacrifice happened, and historians study it from carvings and paintings.", "How do historians study sacrifice?", "from carvings and paintings", "from television", "from modern newspapers"],
    ["Maya and Greek beliefs differ, but both used myths and temples.", "What did Maya and Greek beliefs both use?", "myths and temples", "only books", "only schools"]],
    sort("Who led or what was offered?", ["Who led", "What was offered"], [["priests", 0], ["kings", 0], ["jade", 1], ["incense", 1]], ["Priests", "kings", "jade", "incense"])),
]);
