import { ch, pk, st, buildTopic } from "../../../topicBank.js";

/** Year 6 punctuation: punctuating bullet points that list information. */
export const RULE = "Bullet points list information. Put a colon after the line that introduces them. Short phrases start with a lower-case letter and have no full stop; full sentences start with a capital letter and end with a full stop. Keep every bullet in the same style.";

/** `phrases` lists use lower-case, unpunctuated bullets; `sentences` lists use capitals and full stops. */
export const lists = [
  { style: "phrases", lead: "Bring these to the pool:", items: ["a towel", "a swimming costume", "a water bottle"] },
  { style: "phrases", lead: "The recipe needs:", items: ["two eggs", "200 grams of flour", "a pinch of salt"] },
  { style: "phrases", lead: "In the art room you can use:", items: ["paint", "clay", "chalk"] },
  { style: "phrases", lead: "Our class visited:", items: ["the castle", "the museum", "the harbour"] },
  { style: "phrases", lead: "Remember to pack:", items: ["a raincoat", "sun cream", "a packed lunch"] },
  { style: "phrases", lead: "The garden has:", items: ["a pond", "two apple trees", "a vegetable patch"] },
  { style: "phrases", lead: "Today we will practise:", items: ["running", "jumping", "throwing"] },
  { style: "phrases", lead: "The library sells:", items: ["bookmarks", "pencils", "notebooks"] },
  { style: "sentences", lead: "Follow these rules:", items: ["Walk quietly in the corridor.", "Hold the door for others.", "Keep the floor clear."] },
  { style: "sentences", lead: "Before the trip:", items: ["Hand in your form.", "Pack a lunch.", "Wear sensible shoes."] },
  { style: "sentences", lead: "To stay safe online:", items: ["Keep your password secret.", "Tell an adult if something worries you.", "Never share your address."] },
  { style: "sentences", lead: "Our science plan:", items: ["We will measure the water.", "We will heat it slowly.", "We will record the temperature."] },
  { style: "sentences", lead: "When the bell rings:", items: ["Stop what you are doing.", "Line up at the door.", "Wait for your teacher."] },
  { style: "sentences", lead: "Fire drill instructions:", items: ["Leave your bags.", "Walk to the field.", "Wait for the register."] },
  { style: "sentences", lead: "How to plant a seed:", items: ["Fill the pot with soil.", "Push the seed in gently.", "Water it well."] },
];

const hint = "First decide whether the bullets are short phrases or full sentences. Phrases: lower-case, no full stop. Sentences: capital letter and full stop. The line before the bullets ends with a colon.";
const cap = text => text[0].toUpperCase() + text.slice(1);
const lower = text => text[0].toLowerCase() + text.slice(1);
const noStop = text => text.replace(/\.$/, "");
/** The same bullet in the other style, so it needs fixing. */
const wrongStyle = (style, text) => (style === "phrases" ? `${cap(text)}.` : lower(noStop(text)));
/** A bullet with a single slip that makes the list inconsistent. */
const slip = (style, text) => (style === "phrases" ? `${cap(text)}.` : noStop(text));
const bullets = items => items.map(text => ({ type: "p", text: `• ${text}` }));
const asPassage = ({ lead, items }) => ({ blocks: [{ type: "p", text: lead }, ...bullets(items)] });
const flat = ({ lead, items }) => `${lead} ${items.map(text => `• ${text}`).join(" ")}`;
const at = (i, step) => lists[(i + step) % lists.length];

const styleName = { phrases: "short phrases", sentences: "full sentences" };
const rightRule = { phrases: "Start with a lower-case letter and end with no full stop.", sentences: "Start with a capital letter and end with a full stop." };
const wrongRules = { phrases: ["Start with a capital letter and end with a full stop.", "End each item with a comma.", "Start with a capital letter and end with an exclamation mark."], sentences: ["Start with a lower-case letter and end with no punctuation.", "End each item with a comma.", "Start with a lower-case letter and end with a colon."] };

const slot1 = lists.map(list => ch(
  `The bullets in this list are ${styleName[list.style]}. How should each bullet be punctuated?`, rightRule[list.style], wrongRules[list.style],
  { passage: asPassage(list), text: "The line before the bullets ends with a colon. Every bullet then follows the same style.", hint },
));

const slot2 = lists.map((list, i) => {
  const other = at(i, 7);
  const style = list.style;
  const pickGood = (items, n) => items.slice(0, n);
  const good = pickGood(list.items, 2);
  const brokenSource = list.items.slice(1, 3).concat(other.style === style ? other.items : []).slice(0, 2);
  return st(
    `Every bullet in this list is meant to be ${styleName[style]}. Sort the bullets: which are punctuated correctly and which need fixing (set ${i + 1})?`,
    ["Punctuated correctly", "Needs fixing"],
    [...good.map(text => [`• ${text}`, 0]), ...brokenSource.map(text => [`• ${wrongStyle(style, text)}`, 1])],
    { text: list.lead, hint },
  );
});

const slot3 = lists.map((list, i) => {
  const broken = (i % 3);
  const items = list.items.map((text, index) => (index === broken ? slip(list.style, text) : text));
  const tokens = [list.lead, ...items.map(text => `• ${text}`)];
  const answer = broken + 1;
  return pk(`Tap the one bullet that is punctuated differently from the others in this list of ${styleName[list.style]}.`, tokens, answer,
    { variant: "sentences", text: "The other bullets all follow the same style.", hinted: [answer, answer === 1 ? 2 : 1], hint });
});

const slot4 = lists.map(list => {
  const right = flat(list);
  const firstSlip = flat({ lead: list.lead, items: list.items.map((text, index) => (index === 0 ? slip(list.style, text) : text)) });
  const allWrong = flat({ lead: list.lead, items: list.items.map(text => wrongStyle(list.style, text)) });
  const comma = flat({ lead: `${list.lead.slice(0, -1)},`, items: list.items });
  return ch("Which bullet list is punctuated correctly? The bullets are shown with • between them.", right, [firstSlip, allWrong, comma],
    { text: `The list is introduced by: “${list.lead}” and its bullets are ${styleName[list.style]}.`, hint });
});

export const topic = { rule: RULE, hint, levels: { 1: slot1, 2: slot2, 3: slot3, 4: slot4 } };
export const buildBulletPointPunctuation = buildTopic(topic);
