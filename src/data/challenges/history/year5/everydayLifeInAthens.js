import { lesson, detective, sort, order, year5Topic, GREEK_TIMELINE } from "./authoring.js";
export const everydayLifeInAthens = year5Topic(["https://www.britishmuseum.org/learn/schools", "https://www.worldhistory.org/Greek_Daily_Life/", "https://whc.unesco.org/en/list/404/"], [
  lesson("🏺", "Life in Athens", [
    ["Most Athenian families lived in houses of mud brick.", "What were most Athenian houses made from?", "mud brick", "marble", "glass"],
    ["Rooms opened onto a courtyard in the middle.", "What did the rooms open onto?", "a courtyard", "a long corridor", "the roof"],
    ["People ate bread, olives, figs, cheese and fish.", "Which food did Athenians eat?", "olives", "potatoes", "chocolate"],
    ["Olive oil was used for cooking, lamps and washing.", "What was olive oil used for?", "cooking, lamps and washing", "building walls", "making paper"],
    ["The agora was the market and meeting place.", "What was the agora?", "the market and meeting place", "a theatre for plays", "a stadium for races"],
    ["Enslaved people did hard work in homes, farms and mines.", "Who did hard work in mines?", "enslaved people", "the city's judges", "Athenian priests"]],
    sort("What they ate or where they lived?", ["What they ate", "Where they lived"], [["bread", 0], ["cheese", 0], ["fish", 0], ["mud brick", 1], ["courtyard", 1]], ["bread", "cheese", "fish", "mud brick", "courtyard"])),
  lesson("📅", "When this evidence is from", [
    ["Our evidence for daily life comes from about 500 to 300 BC.", "About when does our evidence come from?", "500 to 300 BC", "AD 500 to 700", "3000 to 2500 BC"],
    ["That is the time of Athens' democracy and great buildings.", "What was happening in Athens then?", "democracy and great buildings", "Roman rule of Britain", "Viking raids"],
    ["Athens began its democracy about 508 BC.", "When did democracy begin?", "about 508 BC", "about 800 BC", "336 BC"],
    ["The Parthenon was built between 447 and 432 BC.", "When was the Parthenon built?", "447 to 432 BC", "490 to 479 BC", "336 to 323 BC"],
    ["Alexander the Great became king in 336 BC.", "Who became king in 336 BC?", "Alexander the Great", "Pericles", "Julius Caesar"],
    ["By 146 BC, Rome ruled Greece.", "Who ruled Greece by 146 BC?", "Rome", "Persia", "Sparta"]],
    order("Order the events, oldest first.", ["Democracy begins · about 508 BC", "Parthenon begun · 447 BC", "Alexander king · 336 BC", "Rome rules Greece · 146 BC"], ["508 BC", "447", "336 BC", "146 BC"]), GREEK_TIMELINE),
  detective(["This drawing shows a painted Greek vase with runners on it.", "Vases were used to store oil, wine and water.", "The painted pictures show sport, work and stories about gods.", "A vase cannot tell us everything about life.", "Vase painters often chose special scenes, not ordinary days.", "Writers and buildings give us more clues.", "Our drawing is not a real vase."],
    [
    ["What does the drawing show?", "a painted vase with runners", "a coin with a king", "a map of Greece", "a painted Greek vase with runners"],
    ["What were vases used for?", "storing oil, wine and water", "building temples", "sailing ships", "store oil, wine and water"],
    ["What do vase pictures show?", "sport, work and stories about gods", "photographs of families", "maps of the sea", "sport, work and stories about gods"],
    ["Can a vase tell us everything about life?", "no", "yes, everything", "yes, how everyone voted", "A vase cannot tell us everything about life."],
    ["What did vase painters often choose?", "special scenes", "only ordinary days", "only maps", "chose special scenes, not ordinary days"],
    ["What else gives us clues?", "writers and buildings", "only vases", "modern adverts", "Writers and buildings give us more clues."],
    ["Is our drawing a real vase?", "no, it is our drawing", "yes, it is real", "yes, from a museum shelf", "Our drawing is not a real vase."]], { scene: "y5-amphora", picture: "🏺", pictureLabel: "A painted Greek vase" }),
  lesson("⚖️", "Rich and poor", [
    ["Rich and poor Athenians lived very differently.", "How did rich and poor Athenians live?", "very differently", "in the same way", "in the same houses"],
    ["Rich families had larger houses and enslaved workers.", "What did rich families have?", "larger houses and enslaved workers", "no houses", "pyramids"],
    ["Poor families worked their own land or small shops.", "How did poor families earn a living?", "worked land or small shops", "ruled the city", "wrote plays"],
    ["Boys from richer families went to school.", "Which children went to school?", "boys from richer families", "all girls", "all enslaved children"],
    ["Girls learned household skills at home.", "Where did girls learn skills?", "at home", "at the Olympic Games", "at the Parthenon"],
    ["Most of our evidence comes from men's writing.", "Whose writing gives most of our evidence?", "men's", "women's", "enslaved people's"]],
    sort("Rich or poor?", ["Rich families", "Poor families"], [["larger houses", 0], ["enslaved workers", 0], ["small shops", 1], ["own land", 1]], ["larger houses", "enslaved workers", "small shops", "land"])),
]);
