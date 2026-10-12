# Year 1 History: topic authoring brief

For whoever writes a Year 1 History topic file (person or agent). Plan 2 uses it for
topics 2–14. The worked example is `src/data/challenges/history/year1/toysThenAndNow.js`;
copy its shape exactly.

## Read first

- `src/data/challenges/history/year1/toysThenAndNow.js`: the format, and how every
  template names its `answeredBy` phrase.
- `src/data/challenges/history/engine.js`: the header comment explains the topic shape.
- `docs/history-curriculum/year-1-design-spec.md` §3 (your topic's content boundary)
  and §4 (the four slots, age settings, chronology, tone).
- `docs/curriculum/key-stage-1-history.md`, the Year 1 mapping row for your topic.
- `docs/history-curriculum/shared-design-spec.md` §3 and §5 (learning model, tone).

## The file

- Path: `src/data/challenges/history/year1/<camelCaseTopicId>.js`, exporting
  `export const <camelCaseTopicId> = { year: 1, references: [...], levels: {...}, banks: {...} }`.
- Template types: `choice` (`prompt`, `answer`, `wrong: [2 options]`, or `wrong: ["no"]`
  for yes/no), `sort` (`prompt`, `bins: [{id,label}] × 2–3`, `cards: [[label, binId]]`,
  at least 4 cards with every bin used), `order` (`prompt`, `labels` in the right order,
  3 or 4 distinct labels). Every template has a `hint` and an `answeredBy`.
- `answeredBy`: the exact words (any case) on that level's story card, or in the alt text
  of the template's own source picture or the story's picture, that give the answer. The
  lint checks the words are there; **you** check they really answer the question.
- Source rounds add `visual: { type: "source", image: "<id>" }`.

## Year 1 rules (the lint enforces the numbers)

- Story card: at most 30 words, each line one sentence of at most 10 words.
  A story has either `image: "<id>"` or `picture: "<emoji>"` + `pictureLabel`.
- 4 rounds per level; at least 6 templates available to each level; at least three
  round types across the topic. Banks are per level; don't share a bank across levels.
- Slots: 1 Meet it (choice, sort) · 2 Old or new? (sort, order: old/new, then/now,
  first/next/last) · 3 Picture detective (source photo where one exists; what it shows
  and what it can't tell us) · 4 Same or different? (compare then and now, or two people).
- **No years or dates anywhere** (not "1903", not "500 years ago"). Use the bands: "long,
  long ago", "long ago", "when grandparents were little", "today".
- Short, everyday words a 5–6 year old can follow when it's read aloud. British English.
- Wrong options must be clearly wrong, never arguably right. No trick questions.

## Truth rules (learned from the review of the toys pilot)

- **Never claim something is "today only" or "long ago only" unless it is.** Today's
  grandparents were born about 1955–1975: they had plastic toys, battery toys, TV,
  cars, aeroplanes, washing machines and supermarkets. Compare what was common, using
  "some" or "many", or compare with "long ago" (Victorian times; "long, long ago" is Elizabeth I and Columbus) where the contrast
  is true.
- Every fact must be true and taught by schools; add the sources you relied on to
  `references` (for example BBC Bitesize KS1 History, Royal Museums Greenwich, the
  Science Museum, NASA, the National Trust, Historic England).
- Don't put words in a famous person's mouth unless they really said them.

## Tone (approved, use verbatim where it applies)

- Columbus: "Columbus sailed to lands where people already lived." and "He and his men
  treated those people very unfairly."
- Elizabeth I and the Armada: "Her ships stopped the Spanish ships from landing." No
  fighting described.
- No deaths, wars or punishments described anywhere else in Year 1.

## Pictures available (id, then alt text: answers may come from these words)

| id | alt text |
|---|---|
| `loc-blackpool-beach` | An old coloured photo of a crowded beach at Blackpool. A tall tower and a long pier stand by the sea. People wear long coats and hats. |
| `loc-wright-first-flight` | A very old black-and-white photo. A plane with long flat wings flies just above the sand. A man runs beside it. |
| `nasa-neil-armstrong` | A photo of Neil Armstrong in a white space suit. He holds his helmet. A picture of the Moon is behind him. |
| `nasa-apollo-11-bootprint` | A photo of a bootprint in grey dust on the Moon. (It is Buzz Aldrin's bootprint; never say it is Armstrong's.) |
| `nasa-apollo-11-launch` | A photo of a tall white rocket taking off. Fire and smoke pour out at the bottom. |
| `elizabeth-i-armada-portrait` | A painting of Queen Elizabeth I. She wears a huge lace ruff, pearls and a big jewelled dress. Her hand rests on a globe. Ships are painted behind her. |
| `queen-victoria-bassano-1882` | A black-and-white photo of Queen Victoria. She wears a small crown, a long white veil and a necklace. |
| `loc-shakespeares-birthplace` | An old coloured photo of a very old house. It has a wooden frame, white walls, small windows and a steep roof. |
| `cma-two-children-with-toys`, `cma-child-with-drum` | 1850s photos of children with toys (used by Toys Then and Now). |

There is no photo for Homes, School, Street Names, Flying Then and Now's "now" plane or
Columbus: use emoji pictures, and make the Picture detective level about what pictures,
objects and grown-ups' memories tell us.

## Check before you finish

```bash
node scripts/check-history-topic.mjs src/data/challenges/history/year1/<file>.js
npx eslint src/data/challenges/history/year1/<file>.js
```

Both must pass. Only create your topic file(s). Do not edit `index.js`, wrappers, tests
or any other file; they are registered centrally.
