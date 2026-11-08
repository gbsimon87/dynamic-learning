import { buildReadingTopic } from "./readingQuest.js";

const items = [
  ["Dark clouds gathered and the wind lifted the picnic blanket.", "It will probably rain soon.", "The sun will become hotter.", "The picnic will move indoors because it is night."],
  ["Aisha put on her helmet and checked the bicycle brakes.", "Aisha is likely to cycle.", "Aisha is likely to go swimming.", "Aisha is likely to bake a cake."],
  ["The puppy sniffed the open kitchen door and wagged its tail.", "The puppy may run into the kitchen.", "The puppy may nap upstairs.", "The puppy may start reading."],
  ["Ben heard the last train announcement and saw people hurry to the platform.", "Ben should hurry to the platform.", "Ben should unpack a suitcase.", "Ben should wait for a bus at home."],
  ["The first snowflakes landed on the empty playground.", "The playground may soon be covered in snow.", "The playground will become sandy.", "The children will need sun cream."],
  ["Maya hid the birthday card behind her back as Dad entered.", "Maya is likely planning a surprise.", "Maya is likely returning a library book.", "Maya is likely practising a song."],
  ["The tide had gone out, leaving wet rocks and pools on the beach.", "Small sea creatures may be visible in the pools.", "The beach will have deep snow.", "The boats will be floating higher."],
  ["A crack appeared in the dam and workers brought sandbags.", "The workers may try to stop water escaping.", "The workers may plant flowers.", "The workers may paint the dam."],
  ["Omar saved his coins each week and circled a telescope in a catalogue.", "Omar may be saving to buy a telescope.", "Omar may be learning to cook.", "Omar may be choosing a new coat."],
  ["The stage lights dimmed and the audience became quiet.", "A performance is likely to begin.", "A sports match is likely to end.", "The audience is likely to leave for lunch."],
  ["Priya packed water, a map and a waterproof coat.", "Priya is likely going on an outdoor walk.", "Priya is likely going to a cinema.", "Priya is likely staying in bed."],
  ["The librarian placed a NEW ARRIVALS sign beside unopened boxes.", "New books may soon be put on the shelves.", "The library may close forever.", "The boxes may be used for a game."],
  ["A bee flew repeatedly between the hive and the lavender.", "The bee may be collecting nectar.", "The bee may be building a nest in a tree.", "The bee may be looking for a pond."],
  ["The goalkeeper tied her laces as the referee raised a whistle.", "The match is likely about to start.", "The team is likely about to eat breakfast.", "The goalkeeper is likely about to go shopping."],
  ["The power flickered and every computer screen went black.", "The class may need to stop using computers.", "The class may begin a video call.", "The room may become brighter."],
].map(([detail, answer, ...wrong]) => ({ prompt: `What is the most sensible prediction from this detail? ${detail}`, answer, wrong }));

export const { topic, build: buildPredictingFromDetails } = buildReadingTopic({
  rule: "A prediction is a sensible next idea, based on clues in the text. It is not a wild guess.",
  hint: "Point to the detail that makes one future event more likely than the others.", items,
});
