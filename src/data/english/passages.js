/**
 * Original reading passages for Year 3, written for the app.
 *
 * Each passage is { id, year, kind, title, blocks, skills } where `blocks`
 * are ReadingPassage blocks ({ type: "p" | "h" | "line" | "item", text }).
 * `skills` lists the topics a passage was written to support, so a topic can
 * find its texts. passages.test.js keeps every one at 200 words or fewer and
 * in British spelling.
 *
 * Characters come from cast.js and keep their pronouns.
 */
export const PASSAGES = [
  {
    id: "lost-kite",
    year: 3,
    kind: "story",
    title: "The Lost Kite",
    skills: ["characters-feelings"],
    blocks: [
      { type: "p", text: "Leo had a brand-new kite. It was bright red, with a long, swishy tail. On Saturday, he took it to the hill with Amara and ran as fast as he could. The kite leapt into the sky. Leo whooped and let out more string." },
      { type: "p", text: "Then a strong gust of wind tugged at the kite. The string slipped through Leo’s fingers. The kite sailed away over the trees and was gone. Leo’s shoulders drooped and he stared at the empty sky without saying a word." },
      { type: "p", text: "Amara did not say anything either. Instead, she ran down the hill and into the woods. Ten minutes later, she came back, out of breath, holding the red kite above her head. Leo’s face lit up. “You’re the best friend ever!” he shouted, and he gave her a huge hug." },
    ],
  },
  {
    id: "priyas-song",
    year: 3,
    kind: "story",
    title: "Priya’s Song",
    skills: ["characters-feelings"],
    blocks: [
      { type: "p", text: "Tonight was the school concert, and Priya had to sing on her own. All afternoon her tummy felt fluttery. She kept practising the song under her breath, again and again." },
      { type: "p", text: "When her name was called, Priya walked onto the stage. Her legs felt wobbly. She looked out and saw her grandad in the front row. He gave her a big thumbs up." },
      { type: "p", text: "Priya took a deep breath and began to sing. Her voice was quiet at first, but it grew stronger and stronger. When she finished, the whole hall clapped and cheered. Priya smiled so widely that her cheeks ached." },
    ],
  },
  {
    id: "missing-sock",
    year: 3,
    kind: "story",
    title: "The Missing Sock",
    skills: ["characters-feelings"],
    blocks: [
      { type: "p", text: "Ellie was getting ready for football, but one of her socks was missing. She looked under the bed. She looked in the wash basket. She even looked in the fridge! “Where is it?” she groaned, stamping her foot." },
      { type: "p", text: "Just then, Ellie heard a strange snuffling noise coming from the garden. She crept outside. Behind the shed, Biscuit was lying in a pile of leaves with something stripy between his paws." },
      { type: "p", text: "It was the missing sock! Biscuit wagged his tail and dropped it at Ellie’s feet, as if he had found a treasure. Ellie tried to look cross, but she could not do it. She burst out laughing and gave Biscuit a pat." },
    ],
  },
  {
    id: "zayns-new-school",
    year: 3,
    kind: "story",
    title: "Zayn’s New School",
    skills: ["characters-feelings"],
    blocks: [
      { type: "p", text: "It was Zayn’s first day at a new school. He held Dad’s hand tightly at the gate. He did not know anyone, and his tummy felt full of butterflies." },
      { type: "p", text: "In the classroom, a girl with a big smile waved at him. “I’m Amara,” she said. “Do you want to sit next to me?” Zayn nodded shyly and sat down." },
      { type: "p", text: "At lunchtime, Amara showed him the climbing frame. They played tag with Leo until the bell rang. When Dad came to collect him, Zayn ran over, grinning. “Can I come back tomorrow?” he asked." },
    ],
  },
  {
    id: "broken-vase",
    year: 3,
    kind: "story",
    title: "The Broken Vase",
    skills: ["characters-feelings"],
    blocks: [
      { type: "p", text: "Leo was playing football in the living room, even though Mum had said no. He kicked the ball too hard. It hit Mum’s blue vase, and the vase smashed on the floor." },
      { type: "p", text: "Leo stared at the pieces. His face went hot, and he felt sick inside. He thought about hiding the pieces under the sofa. Then he heard Mum’s footsteps on the stairs." },
      { type: "p", text: "Leo took a deep breath. “Mum, I broke your vase. I’m really sorry,” he said quietly. Mum sighed, but then she gave him a hug. “Thank you for telling me the truth,” she said. Leo felt as if a heavy bag had been lifted off his back." },
    ],
  },
  {
    id: "ellies-birthday",
    year: 3,
    kind: "story",
    title: "Ellie’s Birthday",
    skills: ["characters-feelings"],
    blocks: [
      { type: "p", text: "On Ellie’s birthday, nobody said a word about it at breakfast. Dad read the paper. Her brother ate his toast. Ellie pushed her cereal around the bowl and did not eat a thing." },
      { type: "p", text: "All day at school, she kept wondering if everyone had forgotten. When she walked home, her feet felt as heavy as stones." },
      { type: "p", text: "Ellie opened the front door. “Surprise!” shouted her family and friends. The room was full of balloons, and Biscuit was wearing a party hat. Ellie gasped, and then she laughed until tears ran down her face." },
    ],
  },
];

export function findPassage(id) {
  const passage = PASSAGES.find((item) => item.id === id);
  if (!passage) throw new Error(`no passage "${id}"`);
  return passage;
}
