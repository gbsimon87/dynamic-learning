import { rule } from "../figures.js";

// Pictures for Year 5 Relationships and health. They stay gentle and generic: emoji faces and
// everyday things, never harm, injury or bodies. A topic visual shows on the start screen and
// on level 1, so it only sets the scene and never shows an answer.
const spread = (emojis) => {
  const n = emojis.length;
  const size = n === 1 ? 100 : n === 2 ? 86 : 72;
  const xs = n === 1 ? [200] : n === 2 ? [130, 270] : [90, 200, 310];
  return emojis.map((e, i) => [e, xs[i], 118, size]);
};
const scene = (alt, emojis, extra = {}) => ({ type: "scene", backdrop: "plain", alt, items: spread(emojis), caption: "", ...extra });
const sceneRule = (when, alt, emojis, extra) => rule(when, scene(alt, emojis, extra));
const scale = (low, high, alt) => ({ type: "scale", low, high, label: "", alt, caption: "" });

export const TOPIC_VISUALS = {
  "families-who-care": scene("A family of four in front of their home.", ["🏡", "👨‍👩‍👧‍👦"], { backdrop: "meadow", caption: "Families care for each other." }),
  "good-friends": scene("Two friends side by side.", ["🧑‍🤝‍🧑"], { backdrop: "meadow", caption: "Friends." }),
  "sorting-out-a-falling-out": scene("Two children standing a little apart, thinking.", ["🧒", "🧒"], { backdrop: "meadow", caption: "Friends sometimes fall out." }),
  "courtesy-and-respect": scene("Three children waiting in a line.", ["🧒", "🧒", "🧒"], { backdrop: "meadow", caption: "Being polite and respectful." }),
  "naming-feelings": scene("A row of faces showing different feelings.", ["🙂", "😢", "😮"], { caption: "Faces show feelings." }),
  "calming-down-and-talking": scene("A child under a calm blue sky.", ["🧒", "🌤️"], { backdrop: "sky", caption: "Taking a moment." }),
  "active-outdoors-and-hobbies": scene("A tree and the sun in a park.", ["🌳", "☀️"], { backdrop: "meadow", caption: "Time outdoors." }),
  "online-safety-and-screen-time": scene("A tablet and a laptop.", ["📱", "💻"], { backdrop: "room", caption: "Screens." }),
  "roads-water-and-sun-safety": scene("A school crossing sign and the sun.", ["🚸", "☀️"], { backdrop: "street", caption: "Staying safe outdoors." }),
  "first-aid-and-999": scene("A first aid kit and a phone.", ["🧰", "📞"], { backdrop: "room", caption: "Knowing how to get help." }),
  "healthy-eating": scene("A shopping basket and a bowl of salad.", ["🛒", "🥗"], { backdrop: "room", caption: "Food." }),
  "sleep-and-rest": scene("A bed and the moon.", ["🛏️", "🌙"], { backdrop: "night", caption: "Rest." }),
  "teeth-hands-and-germs": scene("A pair of hands and a tooth.", ["🙌", "🦷"], { backdrop: "room", caption: "Looking after yourself." }),
};

export const FIGURE_RULES = {
  "families-who-care": [
    sceneRule(/^Mia's grandma looks after her/, "A grandma and a girl at home.", ["👵", "🧒"], { backdrop: "room" }),
    sceneRule(/^Sam's friend lives with foster carers/, "A boy and his friend outside a home.", ["🏠", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^Ravi's friend celebrates a festival/, "Two friends with party decorations.", ["🎉", "🧒", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^Zoe feels worried about something/, "A girl with a worried face thinking.", ["😟", "💭"]),
    sceneRule(/^Dev's dad is tired after work/, "A tired dad and his son at home.", ["🥱", "🧒"], { backdrop: "room" }),
  ],
  "good-friends": [
    sceneRule(/^Ben is new at school and nobody knows him/, "A new boy with a school bag.", ["🎒", "🧒"], { backdrop: "street" }),
    sceneRule(/^Zoe notices a child alone at playtime/, "A child standing alone in the playground.", ["🧒"], { backdrop: "meadow" }),
    sceneRule(/^Zoe feels lonely at lunch/, "A girl sitting alone with her lunch.", ["🧒", "🍽️"], { backdrop: "room" }),
    sceneRule(/^Raj breaks a friend's pencil by mistake/, "A pencil and a boy looking sorry.", ["✏️", "😟"]),
    sceneRule(/^Dev's friend wants to play something different today/, "A football and a board game.", ["⚽", "🎲"], { backdrop: "meadow" }),
  ],
  "sorting-out-a-falling-out": [
    sceneRule(/^Two friends both want the football/, "Two children and one football.", ["🧒", "⚽", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^Ana is angry after an argument/, "A girl with an angry face.", ["😠"]),
    sceneRule(/^Zoe is sent an unkind message online/, "A phone showing a message.", ["📱", "💬"]),
    sceneRule(/^Raj sees a child being left out again and again/, "A child standing alone beside a group playing.", ["🧒", "🧒", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^Dev and Eli cannot agree on a game/, "Two children and two different games.", ["🎮", "🎲"], { backdrop: "room" }),
  ],
  "courtesy-and-respect": [
    sceneRule(/^Ana wants to speak but someone else is talking/, "Someone talking and a girl with her hand up.", ["🗣️", "🙋"]),
    sceneRule(/^Ben is first in the queue and Cara is behind/, "Two children in a queue.", ["🧒", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^A new child speaks with an accent/, "A new child talking to others.", ["🧒", "💬"]),
    sceneRule(/^Raj hears someone say all girls are bad at football/, "A football and a boy listening.", ["⚽", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^Mia is asked to move seats politely/, "A chair and a girl.", ["🪑", "🧒"], { backdrop: "room" }),
  ],
  "naming-feelings": [
    rule(/^Order these feelings from the least angry to the most angry/, scale("a little angry", "very angry", "An arrow from a little angry on the left to very angry on the right.")),
    rule(/^Order these feelings from the least happy to the most happy/, scale("a little happy", "very happy", "An arrow from a little happy on the left to very happy on the right.")),
    sceneRule(/^Zoe's picnic is cancelled by rain/, "A picnic basket and rain clouds.", ["🧺", "🌧️"], { backdrop: "meadow" }),
    sceneRule(/^Ben has a test tomorrow/, "A test paper and a pencil.", ["📝", "✏️"], { backdrop: "room" }),
    sceneRule(/^Dev walks into a surprise party/, "Party decorations in a room.", ["🎉", "🎈"], { backdrop: "room" }),
    rule(/^A feelings chart has (\d+) happy faces and (\d+) worried faces/, (q, m) => ({ type: "counters", icon: "😊", markIcon: "😟", total: Number(m[1]) + Number(m[2]), marked: Number(m[2]), label: `${m[1]} happy faces and ${m[2]} worried faces (the worried ones are ticked)`, alt: `A feelings chart with ${m[1]} happy faces and ${m[2]} worried faces. The worried faces have a tick.` })),
    rule(/^Mia's worry is (\d+) out of (\d+) before she talks to someone and (\d+) out of \d+ after/, (q, m) => ({ type: "meter", items: [["Before talking", Number(m[1]), Number(m[2])], ["After talking", Number(m[3]), Number(m[2])]], alt: `Two bars out of ${m[2]}. Before talking the worry is ${m[1]} out of ${m[2]}. After talking it is ${m[3]} out of ${m[2]}.`, caption: "" })),
  ],
  "calming-down-and-talking": [
    sceneRule(/^Mia is very cross after losing a game/, "A girl with an angry face and a board game.", ["😠", "🎲"]),
    sceneRule(/^Ben feels worried about a test/, "A worried face and a test paper.", ["😟", "📝"]),
    sceneRule(/^Dev's heart is racing before a talk/, "A boy about to give a talk with a microphone.", ["🎤", "🧒"], { backdrop: "room" }),
    sceneRule(/^Zoe is upset and wants a quiet moment/, "A girl who is upset.", ["😢"]),
    sceneRule(/^Ana's friend says it is silly to ask for help/, "A girl putting her hand up and a friend speaking.", ["🙋", "💬"]),
  ],
  "active-outdoors-and-hobbies": [
    rule(/^Order these activities from the gentlest to the most energetic/, scale("gentlest", "most energetic", "An arrow from the gentlest activity on the left to the most energetic on the right.")),
    rule(/^Order these from the least active to the most active/, scale("least active", "most active", "An arrow from the least active on the left to the most active on the right.")),
    sceneRule(/^Mia feels grumpy after sitting inside all day/, "A grumpy girl at home.", ["😠", "🏠"], { backdrop: "room" }),
    sceneRule(/^Ana likes drawing in her free time/, "A paintbrush and a palette.", ["🎨", "🖌️"]),
    sceneRule(/^Dev walks to school each day/, "A boy walking to school.", ["🚶", "🏫"], { backdrop: "street" }),
    sceneRule(/^Zoe feels tired/, "A tired girl.", ["🥱"]),
    sceneRule(/^Raj is nervous about trying a new club/, "A boy at the door of a club.", ["🧒", "🚪"], { backdrop: "room" }),
  ],
  "online-safety-and-screen-time": [
    sceneRule(/^A website asks for Mia's home address to enter a game/, "A game on a screen asking for an address.", ["🎮", "📝"], { backdrop: "room" }),
    sceneRule(/^Ben receives an unkind message/, "A phone showing a message.", ["📱", "💬"]),
    sceneRule(/^Ana wants to post a photo of her friend/, "A camera and a friend.", ["📷", "🧒"]),
    sceneRule(/^Dev's game asks him to buy extra coins/, "A game with coins.", ["🎮", "🪙"], { backdrop: "room" }),
    sceneRule(/^Zoe has played for hours and her eyes are tired/, "A tired girl at a tablet.", ["🥱", "📱"], { backdrop: "room" }),
    sceneRule(/^A player online says he is 10 but Raj has never met him/, "A player in a game chat and a boy wondering.", ["💬", "🤔"]),
  ],
  "roads-water-and-sun-safety": [
    sceneRule(/^Mia's ball rolls into the road/, "A ball rolling towards a road.", ["⚽", "🛣️"], { backdrop: "street" }),
    sceneRule(/^Ben is at a zebra crossing/, "A school crossing sign beside a zebra crossing.", ["🚸", "🧒"], { backdrop: "street" }),
    sceneRule(/^Ana is out on a hot sunny afternoon/, "The sun shining on a girl.", ["☀️", "🧒"], { backdrop: "meadow" }),
    sceneRule(/^Dev sees the barriers coming down at a level crossing/, "Barriers beside a railway line and a train.", ["🚧", "🚆"], { backdrop: "street" }),
    sceneRule(/^Order the steps for crossing a road/, "A traffic light.", ["🚦"], { backdrop: "street" }),
  ],
  "first-aid-and-999": [
    rule(/^Ana is on the phone to 999/, { type: "scene", backdrop: "room", alt: "A girl on the phone to 999.", caption: "", items: [["🧒", 130, 160, 80], ["📞", 290, 170, 56]], bubbles: [{ x: 250, y: 70, text: "999", tail: "bl", w: 110 }] }),
    sceneRule(/^Raj sees an accident and wants to film it/, "A boy holding up a phone.", ["📱", "🧒"], { backdrop: "street" }),
    sceneRule(/^Ben grazes his knee on the playground/, "A boy in the playground.", ["🧒", "🏫"], { backdrop: "meadow" }),
    sceneRule(/^Mia sees a car crash and someone is hurt/, "A girl at the side of a road.", ["🧒", "🚗"], { backdrop: "street" }),
    sceneRule(/^A first aid kit has 12 plasters/, "A first aid kit.", ["🧰"], { backdrop: "room" }),
  ],
  "healthy-eating": [
    sceneRule(/^Mia's lunchbox has a sandwich, an apple and carrot sticks/, "A lunchbox with a sandwich, an apple and carrot sticks.", ["🥪", "🍎", "🥕"], { backdrop: "room" }),
    sceneRule(/^Ben is thirsty after football/, "A hot boy and a football.", ["🥵", "⚽"], { backdrop: "meadow" }),
    sceneRule(/^Ana had porridge and a banana for breakfast/, "A bowl of porridge and a banana.", ["🥣", "🍌"], { backdrop: "room" }),
    sceneRule(/^Dev has a slice of birthday cake at a party/, "A slice of cake at a party.", ["🍰", "🎉"], { backdrop: "room" }),
    sceneRule(/^Zoe wants to plan a healthy meal/, "A notepad and a pencil for planning a meal.", ["📝", "🍽️"], { backdrop: "room" }),
    sceneRule(/^Raj is helping to cook/, "A boy in the kitchen.", ["🧒", "🍳"], { backdrop: "room" }),
  ],
  "sleep-and-rest": [
    rule(/^Mia goes to bed at (\d+) o'clock in the evening and wakes up at (\d+) o'clock in the morning/, (q, m) => ({ type: "clocks", times: [[Number(m[1]), 0, "Bedtime"], [Number(m[2]), 0, "Wake up"]], alt: `Two clocks. Bedtime is at ${m[1]} o'clock in the evening. Wake up is at ${m[2]} o'clock in the morning.`, caption: "" })),
    sceneRule(/^Mia is up late playing on a tablet/, "A tablet in the dark of night.", ["🌙", "📱"], { backdrop: "night" }),
    sceneRule(/^Ben cannot sleep/, "A boy lying awake in bed.", ["🛏️", "🧒"], { backdrop: "night" }),
    sceneRule(/^Dev has a bright light on all night/, "A bright light and a bed.", ["💡", "🛏️"], { backdrop: "room" }),
    sceneRule(/^Raj drinks cola at bedtime/, "A fizzy drink and the moon.", ["🥤", "🌙"], { backdrop: "night" }),
    sceneRule(/^Ana feels worried at bedtime/, "A worried girl with the moon outside.", ["😟", "🌙"], { backdrop: "night" }),
  ],
  "teeth-hands-and-germs": [
    sceneRule(/^Mia has finished brushing/, "A toothbrush.", ["🪥"], { backdrop: "room" }),
    sceneRule(/^Ben has sticky hands after playing outside/, "A boy with sticky hands and a sandwich.", ["🙌", "🥪"], { backdrop: "meadow" }),
    sceneRule(/^Ana feels a sneeze coming/, "A girl about to sneeze.", ["🤧"]),
  ],
};
