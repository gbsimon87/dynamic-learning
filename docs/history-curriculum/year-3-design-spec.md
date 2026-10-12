# Year 3 History: design spec

**Status:** Approved by the owner, 2026-10-12.
**Tracker:** [HISTORY_TRACKER.md](HISTORY_TRACKER.md). Read it first when resuming.
**Shared spec:** [shared-design-spec.md](shared-design-spec.md): engine, images, tone,
registration and testing for all years. This file holds only what is specific to Year 3.
**Source:** [key-stage-2-history.md](../curriculum/key-stage-2-history.md) (statutory, verbatim).

## 1. Goal

Year 3 History in Curriculum Mode: three units, 22 topics, 88 challenges, for
children aged 7–8.

**Success means:** a Year 3 child can choose History, work through all 22 topics in
order, and earn progress, rewards and certificates as in other subjects; every question
is answerable from its story card and source; every fact traces to a reference; every
image has a recorded open licence.

## 2. Units (approved 2026-10-12)

KS2 is not split into years by the curriculum. Year 3 takes the first two British units,
which run in date order, and the first world unit:

- changes in Britain from the Stone Age to the Iron Age
- the Roman Empire and its impact on Britain
- the achievements of the earliest civilizations (overview, with Ancient Egypt as the
  depth study)

Year 4 continues the British story (see [year-4-design-spec.md](year-4-design-spec.md)).

## 3. Topics

Category and topic titles become IDs through `toKebabCase()` and are used as URL
segments and progress keys. **They are fixed once shipped.** Any rename later is a
progress migration (see the `curriculum-progress` skill).

Topics are listed in release order. Each maps to the statutory bullet its category
serves; *italic* text is the non-statutory example it draws on.

### Stone Age to Iron Age

Statutory: *changes in Britain from the Stone Age to the Iron Age*

| # | Icon | Topic | Content boundary |
|---|---|---|---|
| 1 | 🔍 | How We Know About Prehistory | Prehistory means no writing; archaeologists, artefacts, digs; BC on a timeline |
| 2 | 🦣 | Stone Age Hunter-Gatherers | Hunting, gathering, flint tools, fire, moving with the seasons |
| 3 | 🏘️ | The First Farmers and Skara Brae | *Late Neolithic hunter-gatherers and early farmers, for example, Skara Brae* |
| 4 | 🪨 | Stonehenge and the Bronze Age | *Bronze Age religion, technology and travel, for example, Stonehenge* |
| 5 | 🏰 | Iron Age Hill Forts | *Iron Age hill forts: tribal kingdoms, farming, art and culture* |
| 6 | 📈 | From Stone to Iron | Review of change and continuity across the whole period |

### Roman Britain

Statutory: *the Roman Empire and its impact on Britain*

| # | Icon | Topic | Content boundary |
|---|---|---|---|
| 7 | ⚔️ | The Roman Empire and Its Army | *The Roman Empire by AD 42 and the power of its army* |
| 8 | 🚢 | Julius Caesar Tries to Invade | *Julius Caesar's attempted invasion in 55-54 BC* |
| 9 | 🏛️ | Claudius Conquers Britain | *Successful invasion by Claudius and conquest*, AD 43 |
| 10 | 🛡️ | Boudica Fights Back | *British resistance, for example, Boudica* |
| 11 | 🧱 | Hadrian's Wall | *Including Hadrian's Wall*: why it was built, life on the frontier |
| 12 | 🛁 | Roman Towns, Roads and Baths | *'Romanisation' of Britain: sites such as Caerwent and the impact of technology* |
| 13 | 🏺 | Roman Gods and Early Christianity | *Culture and beliefs, including early Christianity* |
| 14 | 🛣️ | How the Romans Changed Britain | Impact: what changed, what lasted, what we still use |

### The First Civilisations

Statutory: *the achievements of the earliest civilizations – an overview of where and
when the first civilizations appeared and a depth study of one of the following: …
Ancient Egypt …*

| # | Icon | Topic | Content boundary |
|---|---|---|---|
| 15 | 🗺️ | Where the First Civilisations Began | Overview: Sumer, Indus Valley, Ancient Egypt, Shang Dynasty; where and when; rivers |
| 16 | 💡 | What the First Civilisations Gave Us | Overview: writing, cities, the wheel, laws, farming surplus |
| 17 | 🌊 | The River Nile | Depth: the flood, farming, why Egypt grew along the river |
| 18 | 🔺 | Pharaohs and Pyramids | Depth: rulers, how and why pyramids were built |
| 19 | 📜 | Hieroglyphs | Depth: Egyptian writing, scribes, the Rosetta Stone |
| 20 | ⚱️ | Egyptian Gods and Mummies | Depth: beliefs, afterlife, mummification (told gently) |
| 21 | 🌾 | Everyday Life in Ancient Egypt | Depth: homes, jobs, food, children, games |
| 22 | 👑 | Tutankhamun's Tomb | Depth: Howard Carter, 1922, what the tomb tells us |

Spelling: titles use "Civilisations" (the curriculum's aims and the app use British
spelling; only the statutory bullet uses "civilizations").

## 4. Learning design

Uses the shared model: story card, then five rounds (shared spec §3).

### The four challenges

The four slots follow the historical concepts named in the KS2 introduction and aims.

| Slot | Working name | Focus | Main rounds |
|---|---|---|---|
| 1 | Meet it | Key facts and words | choice, sort |
| 2 | When was it? | Chronology and period vocabulary | order, timeline |
| 3 | History detective | What a source tells us, and what it can't | source |
| 4 | Think like a historian | Change and continuity, similarity and difference, cause and consequence, significance | choice, sort |

### Age settings

Story cards of at most 60 words with sentences of at most 16 words; five rounds per run
from a bank of at least seven; three options per choice (shared spec §3).

### Chronology for 7–8 year olds

- Timelines run left (older) to right (newer) with named, coloured bands (Stone Age,
  Bronze Age, Iron Age, Romans, today), not raw BC numbers.
- BC and AD are introduced in topic 1 in one sentence: "BC means before year 1; those
  years count down." Raw BC arithmetic is never assessed.
- Prehistoric dates use "about" and round numbers ("about 5,000 years ago").

### Tone for this year

The shared rules (shared spec §5) at a 7–8 level, for example: "The Romans fought the
Britons and won." "Some people were enslaved." "Egyptians preserved bodies as mummies."
Boudica's revolt is told as resistance, with no description of the burning of towns
beyond "her army attacked Roman towns".

### Key dates used

Stonehenge about 5,000 years ago; Skara Brae about 5,000 years ago; Caesar 55 and 54 BC;
Claudius AD 43; Boudica about AD 60–61; Hadrian's Wall started AD 122; Romans leave about
AD 410; the pyramids at Giza about 4,500 years ago; Tutankhamun's tomb found 1922.

### Likely images

Flint hand axe, Skara Brae houses, Stonehenge, a Bronze Age axe, an Iron Age torc,
Roman coins, Hadrian's Wall, a Roman mosaic, the Rosetta Stone, Egyptian tomb
paintings, a mummy case, Tutankhamun's mask. All must meet shared spec §6.

## 5. Year 3 specifics for the build

- Dataset `src/data/year3HistoryCurriculum.js`; registry entry `{ year: 3, subject: "history" }`.
- Fill the Year 3 rows of the mapping section in `docs/curriculum/key-stage-2-history.md`,
  and record the Years 3–6 split and what Year 3 leaves out.
- Topic data in `src/data/challenges/history/year3/`.
- Everything else follows the shared spec (§4 engine, §8 registration, §9 testing,
  §10 delivery).
