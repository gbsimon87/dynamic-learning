# Play children might choose — Learn with Bix

**Recommendation shortlist · 21 October 2026 · audience: children aged 7**

This document retains ten recommendations: the original top five and five additions selected after analysing 15 new candidates. Unselected first-round ideas and the defer list have been removed. Apart from those marked as prototyped in [Progress](#progress), these are proposals, not approved backlog items or implementation specifications. A prototype is added to [PROJECT_IDEAS.md](PROJECT_IDEAS.md) when it is built; the others stay here only.

## Progress

| # | Idea | Status | Notes |
|---|---|---|---|
| 3 | Secret Rule Zoo | Prototyped 22 October 2026; not yet playtested | [`/rule-zoo`](../src/pages/skills/math/RuleZoo.jsx), Skills Mode → Maths. Backlog row #43 |
| 1, 2, 4–10 | The other nine | Not started | Next candidates: Fold-a-Friend (the other small first experiment) or Bix Gets It Wrong |

Update this table when a prototype is built or playtested.

## Opportunities in the existing direction

The backlog has strong foundations: read-aloud, accessibility, Bix, short rounds, practical missions and a clear rejection of pressure. It already considers Story Maker (#13), adaptive questions (#10), more mini-games (#20), a wardrobe and den (#24–25), bosses (#26), teaching a grown-up (#28), shared play (#29), collections (#31) and a story adventure (#33). Those should not be presented again as discoveries.

The shipped product also matters: badges, XP, streaks, trophies, jokes, daily puzzles and brain breaks already exist. Skills Mode includes Robot Moves, Chart Detective, Money Match and other practice games; the Solar System already supports exploration. The current knowledge document lists 20 implemented curriculum pathways across Years 1–4 and five subjects. More content and celebration alone are unlikely to supply the missing kind of play.

The strongest gaps are:

- **Consequences children can manipulate.** Many activities still ask for an answer. There is room for tools, characters and systems whose behaviour changes because of the child's decisions.
- **Making something worth showing.** Story Maker is a start; playable puzzles, performances, patterns and functioning inventions offer different kinds of authorship.
- **Investigation with genuine uncertainty.** Let children choose which clue or experiment to try, rather than follow a prescribed question sequence.
- **Several good solutions.** Most school exercises converge on one answer. Designing, optimising and expressing an intention can support meaningful replay.
- **Mastery without a reward economy.** A working bridge, a successfully communicated instruction or a solved mystery can be its own satisfying outcome.
- **Personalisation through agency.** Choosing creatures, gifts, silly messages, tools and challenge size can work before persistent adaptive modelling exists.

There are documentation differences to respect. The backlog says offline installation is wholly unbuilt; the newer knowledge document records home-screen installation, with no offline caching. The agent guide describes browser-only progress, while the project documents describe production API/MongoDB and a browser-storage development driver. This exploration makes no changes to either storage or unlocks. It also does not treat implemented pathways as proof of complete statutory coverage or completed device review.

## What the research supports — and what remains a guess

Habgood and Ainsworth's research with children aged 7–11 compared versions of a mathematics game in which the learning was integrated into play or separated from it. Its findings support investigating integrated mechanics. The samples were small and the result concerns a particular game; it cannot establish that any proposal here will work. [Original research and accepted manuscript](https://shura.shu.ac.uk/3556/).

The LEGO Foundation describes play through joy, meaning, active engagement, iteration and social interaction. I use these as design prompts, rather than a requirement that every minute contain all five. [Learning through play](https://le-www-live-s.legocdn.com/sc/media/files/lei/learningthroughplay_leaflet_june2017-9eff7ca5b925d411d4effe880aa1a27b.pdf).

There is also an existing product landscape. ScratchJr demonstrates creative programming for ages 5–7; Toca Boca Jr promotes experimentation and world building for a younger audience; PBS describes Odd Squad as mathematical problem solving for ages 5–8. Creation, simulation and missions are therefore established approaches, not unique inventions. Bix's opportunity is to combine clear, age-appropriate educational models with unusually good small interactions. These product descriptions do not prove learning effectiveness. [ScratchJr research team](https://sites.bc.edu/devtech/scratchjr/), [Toca Boca Jr](https://www.tocaboca.com/toca-boca-jr), [PBS Odd Squad](https://www.pbs.org/parents/shows/odd-squad).

The new shortlist also draws on established activity structures. NRICH's packing activity uses containers and objects to prompt reasoning about shape, fit and quantity; it targets ages 3–5, so it is a design reference rather than evidence for the proposed seven-year-old game. Parcel Pals adds rotation and multi-piece constraints that need their own age-appropriate testing. [NRICH Packing](https://nrich.maths.org/eyfs-activities/packing). The EEF synthesis supports purposeful spoken interaction as an educational approach, but does not establish that an unsupervised app or Copycat Club will produce the same results. [EEF oral language evidence](https://educationendowmentfoundation.org.uk/education-evidence/teaching-learning-toolkit/oral-language-interventions).

Curriculum connections for the additions were checked against the repository's [Year 2 maths programme and mapping](curriculum/year-2-maths.md) and [primary spoken-language programme](curriculum/english-spoken-language-years-1-to-6.md). These establish suitable areas to explore, not formal approval of new activities or full curriculum coverage.

All enjoyment, replayability and effort judgements below are **design hypotheses**, not findings from testing Bix with children. The first-person examples are imagined walkthroughs, not quotations from research participants.

## Shared design rules

Start with one thing to do and optional spoken instructions; aim for a first meaningful action within 10–20 seconds. A seven-year-old is not a single ability level: offer pictures, replayable speech, adjustable help and visible text without assuming fluent reading. Avoid fixed claims about a universal attention span.

A satisfying small activity should fit into roughly 2–5 minutes, with an obvious ending. Longer projects should consist of small complete steps. Returning should mean pursuing an idea, revisiting a creation or trying a different approach. Nothing deteriorates while the child is away; no expiring events, attendance rewards or surprise loot are needed.

Use tap-to-select/tap-to-place and keyboard alternatives wherever dragging appears. Both themes, large touch targets, reduced motion and sound-off equivalence are part of the design. Audio activities need visible representations and an alternative route; silent play may practise a different skill, which should be stated honestly.

Children can choose “show me”, “let me try” or “make it trickier”. Optional support responds to the current session; it must not secretly classify the child or require new attempt tracking. Interest choices change materials and characters while preserving the underlying learning challenge.

For Curriculum Mode, these experiences would supplement relevant topics, with exact mappings reviewed before implementation. They should not automatically award existing challenge completions. A “new mode” below means a possible future home called **Bix's Workshop**, not a recommendation to build another navigation layer immediately. Prototype its activities through Skills Mode first.

**Complexity:** Low means a tightly bounded activity using existing controls and modest authored content; medium means a new interaction or rule engine plus content tooling; high means substantial simulation, authoring, asset or validation work. Estimates include educational review, accessibility and content production, not just React code. None implies a delivery date.

## Original five recommendations

The numbering follows the original recommendation ranking.

### 1. Bix's Repair Shed

**The experience:** A toy vehicle cannot cross a gap or carry its cargo. Children choose lengths, supports and material properties, test a repair and inspect what happened.

**Why it's fun:** Building something that works, harmless collapses and choosing an unexpectedly successful solution.

**Educational value:** Measurement, shape, comparison, materials and a plan–test–revise cycle. Different solutions can meet the same requirement.

**Where it belongs:** Skills Mode initially; possible Workshop anchor with Curriculum Mode links.

**Example interaction — about two minutes:** “A snail's delivery cart can't cross a six-square stream. I choose a four-square plank; it falls short. I join two three-square pieces, but the middle bends under the cart. I add a support underneath. The cart crosses carrying its cabbage. Now I try making the same bridge with fewer pieces.”

**Implementation complexity:** **Medium** for a grid and explicit support rules; realistic physics and arbitrary construction would be high.

**Replay and weak point:** Change gaps, loads and available pieces, then invite child-set challenges. Unclear collapses feel unfair; show which rule caused the result. A child's intuition about real materials must not be contradicted by arbitrary game logic.

### 2. Word Wizard Theatre

**The experience:** Build a short sentence from word tiles and see characters act it out. Change a word or punctuation mark to deliberately change the scene.

**Why it's fun:** Words become mischievous controls: the child can make a giant tiptoe or ask a dragon a question.

**Educational value:** Sentence meaning, verbs, adjectives, word order and punctuation. A controlled vocabulary keeps the relationship between language and action explicit.

**Where it belongs:** Skills Mode English, with Curriculum Mode sentence work links. Adjacent to Story Maker (#13), but focused on immediate semantic changes rather than assembling a whole narrative.

**Example interaction — about two minutes:** “My tiles say 'The tiny dragon walks.' I swap tiny for enormous: the dragon fills the stage. I change walks to tiptoes, and it squeezes past a sleeping mouse. I make 'Is the dragon asleep?' and watch the question acted out. I keep two versions to show Mum.”

**Implementation complexity:** **Medium** with an authored vocabulary and supported sentence patterns; unrestricted text understanding would be high and is unnecessary.

**Replay and weak point:** Children can invent and compare scenes. A few stock animations will wear thin; add meaningful combinations rather than hundreds of decorative synonyms. Do not show unsupported language as grammatically wrong.

### 3. Secret Rule Zoo

**The experience:** Invented creatures approach two enclosures. The child experiments to discover the keeper's hidden sorting rule, then creates a rule for Bix to investigate.

**Why it's fun:** A tiny detective game with a satisfying “I've worked it out!” moment, followed by a chance to stump Bix.

**Educational value:** Classification, attributes, counterexamples and logical reasoning. Fictional creatures avoid teaching invented traits as animal facts.

**Where it belongs:** Skills Mode. Distinct from Word Sorter and the proposed Odd or Even Sort: discovering and testing the rule is the central action.

**Example interaction — about two minutes:** “A spotted creature gets into the left pen. A striped one doesn't. I think it's spots, but a spotted creature with no horns goes right. I test a horned stripy one. It goes left! I tap the horns clue, then make my own 'has wings' zoo and watch Bix test creatures.”

**Implementation complexity:** **Low** for a small creature set, one hidden attribute and curated unambiguous deals. Combining rules would raise complexity.

**Replay and weak point:** Rotate rules and allow authorship. Rule pools must include informative counterexamples; otherwise children can only guess. Do not punish a plausible theory before enough evidence exists.

**Prototype (22 October 2026):** built as a bounded Skills Mode game at `/rule-zoo`. How it answers the points above:

- **One hidden attribute.** The rule is one of five visible features: horns, wings, spots, four legs or one eye. Colour varies but is never the rule. *Easier* varies three features; *Trickier* varies all five.
- **Evidence first.** The two creatures already in the pens fit every possible rule, so the child must test before they can know.
- **Informative deals.** The child chooses which of three waiting creatures to test. While more than one rule is possible, at least two of the three can rule one out, and no two look alike.
- **No punishment for a plausible theory.** A guess that fits every creature sorted so far gets "fits so far, test another creature". A guess the evidence contradicts is answered by highlighting the creature that disproves it.
- **Optional support.** "Help me think" lists which clues are still possible, for the current zoo only.
- **Authorship.** In *Stump Bix*, the child chooses a rule and sorts each creature Bix asks about, so applying their own rule is the learning action. Bix tests the creature that splits the remaining rules most evenly and names the rule once only one is left.
- **No pressure, no storage.** There is no timer and nothing is saved.
- **Not built yet:** combined rules and child-designed creatures.
- **Playtest focus:** whether children choose a test on purpose to rule something out, rather than tapping at random until they succeed.

### 4. Monster Picnic

**The experience:** Friendly creatures request a picnic. Children portion food, fill cups and rearrange seats to satisfy a few visible needs. The creatures react directly to what is served; there is no queue or service timer.

**Why it's fun:** Pretend play, funny preferences and arranging an attractive meal. Children can deliberately try an absurd serving, then fix it.

**Educational value:** Equal sharing, halves and quarters, counting, capacity comparison and reading simple requests. Food pieces make quantities inspectable.

**Where it belongs:** Skills Mode; selected Curriculum Mode maths missions. Goes beyond Money Match: the mathematical action is preparing and sharing, not answering a price question.

**Example interaction — about two minutes:** “Four monsters want sandwiches. I cut two identical sandwiches in half and give everyone one half. A tiny monster wants half a cup of juice. I pour to the marked halfway line. Then a fifth visitor arrives; I choose to make another sandwich instead of starting again. I can photograph the picnic inside the game.”

**Implementation complexity:** **Medium**; bounded portion states and fill levels rather than free-form fluid physics.

**Replay and weak point:** Vary group size, ingredients and constraints; allow a child-designed picnic. Repeated orders would turn it into a worksheet. Keep pretending and rearranging available without extra arithmetic demands.

### 5. Bix Gets It Wrong

**The experience:** Bix tries a practical task and makes one visible mistake. The child can change his arrangement, show a counterexample or choose a short explanation. Bix retries using the correction.

**Why it's fun:** “I'm the expert!” Correcting a confidently silly character offers humour and control, particularly when the repaired result visibly works.

**Educational value:** Explaining reasoning, checking equal groups, spotting misconceptions and comparing examples. Explanations can use pictures rather than writing.

**Where it belongs:** Skills Mode first; optional Curriculum Mode topic companion. Related to Teach the grown-up (#28), but the app supplies a responsive learner and the child repairs an action rather than marks a quiz.

**Example interaction — about 90 seconds:** “Bix says he's shared eight strawberries fairly. He's given one puppet six and the other two! I tap the strawberries to move two across. Both puppets now have four. Bix asks why this works. I choose the matching equal-baskets picture. Then I make him a fair picnic with six strawberries and three plates.”

**Implementation complexity:** **Low** for one equal-sharing pack using fixed illustrations, selectable objects and authored reactions.

**Replay and weak point:** Different misconceptions offer new reasoning. A stream of obvious errors would become patronising; Bix must sometimes be right, and repairs need more than a yes/no response.

## Five additions selected from 15 new ideas

A second round considered 15 fresh candidates against the same five criteria used for the original shortlist: enjoyment, educational value, replayability, differentiation and value for development effort. It also checked whether the central action was distinct from existing games, the backlog and the first exploration. Only the five strongest candidates are retained here; the other ten are not recommendations.

These additions deliberately favour manageable experiments. Three involve spatial reasoning, but their actions differ: fitting objects into a constrained space, predicting a reflection, and communicating an unseen arrangement. They need separate playtests; success with one would not validate all three. None of these is unique as a game genre. Their potential lies in execution for seven-year-olds and the connection between play and learning.

### 6. Balance Beasts

**The experience:** Two pans hang from a friendly creature's equal-arm balance. Children place small weighted creatures on each side, swap equivalent groups and try to keep a chosen passenger balanced. They can also invent a balanced arrangement of their own.

**Why it's fun:** The scale visibly responds to every choice, the passengers wobble and react, and children can make a big creature balance against several tiny ones. Finding a surprisingly different combination feels like discovering a trick.

**Educational value:** Equality, number composition, comparison and inverse reasoning. Labelled tokens can make an equality such as 6 = 4 + 2 visible; unlabelled comparison rounds explore heavier, lighter and equal mass. Keep these round types explicit: number value and real-world mass are not interchangeable.

**Where it belongs:** Skills Mode maths, with optional Curriculum Mode links to equality and comparing measurements. Unlike Repair Shed, children reason about equivalent quantities on a fixed apparatus; they do not construct a support system. Unlike Monster Picnic, equality does not require equal numbers of objects.

**Example interaction — about two minutes:** “A six-unit beast sits on the left pan. I put two two-unit beasts on the right: that side is still lighter. I add another and the pans settle level. Then Bix asks whether I can balance the six using only two passengers. I swap my three twos for a four and a two. Both sides still balance! I make my own arrangement and test it.”

**Implementation complexity:** **Medium** for an accessible pan editor, deterministic comparison, bounded puzzle generation and readable balance motion. Fixed hanging pans and equal arm lengths avoid needing a general physics engine. A reduced-motion version shows the tilt state without swinging.

**Replay and weak point:** Different available tokens, several valid decompositions and child-made balances support revisiting. If every round simply means “make six”, it becomes arithmetic practice with a wobble. Test whether children intentionally swap equivalent groups. Do not score by speed or require them to memorise an arbitrary weight for every species.

### 7. Parcel Pals

**The experience:** Pack a small delivery box with oddly shaped gifts. Rotate and rearrange the pieces, compare possible boxes and close the lid to see the recipient unpack the result. Each item has a clear grid footprint; everything is visible from above.

**Why it's fun:** Squeezing everything into a box gives the satisfaction of a good jigsaw, with the extra freedom to find another arrangement. Children's choices determine the parcel and its little reveal.

**Educational value:** Spatial reasoning, quarter turns, comparing lengths, composing shapes and planning ahead. Counting occupied squares can be an optional comparison tool, without presenting formal area calculation as a Year 2 requirement.

**Where it belongs:** Skills Mode geometry, with selected Curriculum Mode links after mapping review. Unlike Shape Explorer, the child uses shape properties to achieve a packing goal. Unlike Repair Shed, this is a spatial fit problem rather than a structure-and-load problem.

**Example interaction — about two minutes:** “Bix wants to send a long toy train, a square book and an L-shaped cushion. The train blocks the last space, so I turn it a quarter turn and move the book. Everything fits! I try a narrower box, but it is too short for the train in either direction. I return to my first box, choose a wrapping pattern and watch the recipient unpack it.”

**Implementation complexity:** **Medium** for grid placement, accessible rotate controls, collision checks and a small validated puzzle bank. Start with four or five flat pieces and fixed footprints; 3D packing, squashing objects and arbitrary rotations are outside the initial scope.

**Replay and weak point:** Vary piece combinations and box outlines, allow multiple solutions and offer a pack-your-own parcel activity. Random sets must be checked for solvability. A tight single-solution puzzle can frustrate a child; offer an extra-space box and a hint that demonstrates a useful move. Wrapping animations alone will not sustain interest.

### 8. Fold-a-Friend

**The experience:** Decorate one half of a folded digital sheet, predict where features will appear, then unfold it into a symmetrical creature. Children can make their own creatures or reconstruct one from a visible target.

**Why it's fun:** “I drew one wing and made two!” A few choices create a surprising, personal character. A child can make a silly butterfly, a four-eyed alien or a smiling paper mask, then deliberately change its appearance.

**Educational value:** Line symmetry, equal distance from a mirror line, comparing shapes and predicting a transformation. The starting activities use a vertical line, matching the Year 2 boundary in the repository's programme mapping. Other axes would be separately labelled enrichment or later-year content.

**Where it belongs:** Skills Mode creative geometry and a Curriculum Mode symmetry companion. Unlike Word Wizard Theatre, the child controls a geometric transformation rather than a sentence; unlike a wardrobe, the creature is constructed through the learning action.

**Example interaction — about 90 seconds:** “I put an eye near the fold and a wing near the edge. Before unfolding, I tap where I think the second eye will appear. My creature opens with two close-together eyes! I move the first eye farther from the fold, predict again and see both eyes spread apart. Then I try a different wing shape on my next creature and keep the version I like.”

**Implementation complexity:** **Low** for a vertical fold, a small grid, selectable shape stamps, reflected placement and an instant reveal. Freehand drawing, arbitrary folds and realistic paper animation are unnecessary for the first version. A static before-and-after view can provide the same information.

**Replay and weak point:** Free creation plus target reconstruction gives more purpose than repeatedly pressing “unfold”. If the tool always supplies the other half without asking children to predict or rebuild anything, it may be a fun art toy with weak evidence of symmetry understanding. Keep maker play available, and test transfer using a different target rather than interrupting every drawing with a question.

### 9. Secret Message Club

**The experience:** Decode a short picture-symbol note using a visible key, carry out its silly instruction, then make a note for Bix or someone sharing the device. The goal is to communicate a message that another person can recover.

**Why it's fun:** Secret-agent pretend play gives reading an immediate purpose. Children enjoy revealing a message and creating something a grown-up has to work out.

**Educational value:** Letter recognition, keeping track of a consistent symbol-to-letter relationship, word boundaries, reading short instructions and checking whether a message communicates the intended meaning. This is not a phonics substitute or a test of fluency; matching symbols alone does not demonstrate reading comprehension.

**Where it belongs:** Skills Mode English enrichment. Related to shared play (#29), but the learning action is encoding and interpreting language rather than taking turns answering questions. Unlike the earlier route-puzzle proposal, the created object is a readable message, not a sequence of movement commands.

**Example interaction — about two minutes:** “Bix gives me six symbols grouped into three words. The key helps me uncover 'DO A HOP'. I choose the hopping picture to show I've understood, then hop if I want to. I make 'BE A CAT' using a short phrase bank and give the tablet to Dad. He decodes my note and does a ridiculous meow. When I'm playing alone, Bix decodes and performs it.”

**Implementation complexity:** **Low** for a fixed symbol alphabet, short authored phrases, tap-to-replace letters, a phrase composer and a few Bix reactions. No messaging service, microphone, free-text interpretation or cross-device sharing is needed. Symbols must differ by shape as well as colour.

**Replay and weak point:** Messages the child chooses to send provide purpose; remapping symbols alone is cosmetic variation. Long manual substitution quickly becomes tedious, so begin with two or three short words, keep the key visible and allow letters or a whole word to be revealed. Bix's solo performance catalogue will be finite; real shared play may be the stronger version.

### 10. Copycat Club

**The experience:** One player sees a tiny arrangement of objects while the other has the same loose pieces. The first describes it without showing it; the second can ask for clarification. They compare their finished arrangements and switch roles. A solo version gives authored spoken and visible clues from Bix.

**Why it's fun:** A playful communication challenge produces funny mismatches: “I said the duck was behind the box!” Children can be the director, discover that a better clue changes the result, and immediately try again.

**Educational value:** Positional vocabulary, listening, ordering information, asking clarifying questions and considering what someone else knows. Shared spoken play practises oral communication; the solo tile-based route practises comprehension and position without claiming to assess a child's speech.

**Where it belongs:** Skills Mode shared play with a solo entry point; optional Curriculum Mode links to positional language. Extends pass-and-play (#29) with an information gap that makes communication necessary. Unlike Bix Gets It Wrong, nobody has made a predetermined mistake: the two players jointly resolve missing or ambiguous information.

**Example interaction — about two minutes:** “I see a duck between two blocks, with a flag on the left block. I hide the picture and tell my sister what to build. She asks which block has the flag. I add that detail. We reveal our scenes: the duck matches, but the flag is on the other side. We work out that we were facing different ways, choose the same front edge and try again with swapped roles.”

**Implementation complexity:** **Medium** for a shared-device reveal flow, small arrangement editor, comparison view and a curated solo clue bank. Define a common viewing direction and permit supported expressions rather than trying to interpret unrestricted speech. Human players judge their conversation; no recording is needed.

**Replay and weak point:** Child-created scenes and changing partners generate meaningful variation. A child playing alone may find scripted instructions less compelling; test that separately and do not let the two-player version depend on equally fluent readers. Use three objects first, replayable clues and a shared orientation marker. It must feel collaborative rather than like a test of remembering a long instruction.

## Rankings and development priorities

### Original shortlist ranking

Scores below are comparative product judgements, not measurements. Each dimension is 1–5, higher is better. “Value for effort” rates the bounded version described above, including authoring and accessibility. Weighted total = enjoyment 30%, educational value 25%, replayability 20%, differentiation 10%, value for effort 15%. Equal scores are broken by the quality of the learning-through-action loop.

| Rank | Idea | Enjoyment | Education | Replay | Differentiation | Value for effort | Weighted / 5 |
|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Bix's Repair Shed | 5 | 5 | 5 | 3 | 4 | 4.65 |
| 2 | Word Wizard Theatre | 5 | 4 | 5 | 3 | 4 | 4.40 |
| 3 | Secret Rule Zoo | 4 | 5 | 4 | 3 | 5 | 4.30 |
| 4 | Monster Picnic | 5 | 4 | 4 | 2 | 4 | 4.10 |
| 5 | Bix Gets It Wrong | 4 | 5 | 3 | 3 | 5 | 4.10 |

**1. Repair Shed offers the strongest core loop.** Children want an object to work, and measurement and revision make it work. Several solutions enable replay without cosmetic randomisation. Its main risk is unclear or scientifically misleading rules. Prototype one bridge problem, not a workshop full of tools.

**2. Word Wizard Theatre makes literacy an expressive tool.** A child has a reason to care which verb or adjective they choose because it changes their creation. Its risk is a shallow animation catalogue; test whether children intentionally communicate a new meaning after the first laugh.

**3. Secret Rule Zoo is the strongest small experiment.** It can offer real hypothesis testing with relatively little infrastructure. Its ceiling is lower than a construction sandbox, but it is a good way to learn whether Bix's audience enjoys evidence-led play. Start with one-attribute rules and informative creature sets.

**4. Monster Picnic supplies approachable pretend play.** Manipulating portions creates a natural reason for maths and gives children useful choices. Its differentiation is weak in a crowded pretend-play category. Retain it only if children enjoy planning and rearranging, not merely watching creatures eat.

**5. Bix Gets It Wrong is the best inexpensive character-led trial.** It turns an existing mascot into someone whose actions the child can influence. However, easily corrected mistakes and scripted surprise will wear out. Require substantive repair and varied reasoning before producing a large pack.

### Ranking of the five additions

The same scale and weights apply. Scores compare concepts within this new round; small numerical differences are not reliable distinctions. Parcel Pals and Fold-a-Friend tie: Parcel Pals ranks first for a more explicit problem-solving goal, while Fold-a-Friend is the cheaper prototype.

| New-round rank | Idea | Enjoyment | Education | Replay | Differentiation | Value for effort | Weighted / 5 |
|---|---|---:|---:|---:|---:|---:|---:|
| 1 | Balance Beasts | 5 | 5 | 4 | 3 | 4 | 4.45 |
| 2 | Parcel Pals | 5 | 4 | 5 | 3 | 4 | 4.40 |
| 3 | Fold-a-Friend | 5 | 4 | 5 | 3 | 4 | 4.40 |
| 4 | Secret Message Club | 5 | 4 | 4 | 3 | 4 | 4.20 |
| 5 | Copycat Club | 4 | 5 | 4 | 3 | 4 | 4.15 |

**Balance Beasts** has the clearest new learning loop: equivalent groups make the apparatus balance. **Parcel Pals** offers deeper spatial puzzles and several valid answers. **Fold-a-Friend** offers the quickest route to a personal creation, provided prediction and reconstruction carry the geometry. **Secret Message Club** makes reading useful within pretend play, but needs to avoid tedious transcription. **Copycat Club** adds purposeful human communication; its solo appeal and access for less fluent speakers need separate testing.

### What to prototype next

Keep **Repair Shed** as the strongest overall product candidate. For a small first experiment, choose **Secret Rule Zoo** for reasoning or **Fold-a-Friend** for creative play; the prototypes answer different questions. **Secret Rule Zoo was chosen and prototyped first** (see [Progress](#progress)); playtest it before building Fold-a-Friend, so the two results stay separate. **Bix Gets It Wrong** remains a low-cost way to test whether a responsive Bix adds value. Test **Copycat Club** with pairs before investing in a solo engine.

Build one small activity at a time. In particular, do not assume children who like fitting shapes will also enjoy symmetry or spoken description. For every retained idea, its stated weak point should determine the playtest: deliberate equivalence swaps, an intentionally revised layout, an accurate reflection prediction, comprehension of a decoded note, or a useful clarifying question. More animation is not the remedy when that central action fails to engage.

## Personalisation and longer-term progression

Let children choose a starting interest and change it whenever they like: creatures, making, theatre or secret messages. Interests should reveal different worthwhile activities, not simply recolour the same question. Keep access to the whole selection.

Within an activity, provide manipulatives, a short demonstration and explicit challenge choices. A supported child might share six objects between two plates; another might find two ways to share twelve between three. Do not infer ability from speed or a single wrong move. Session-only suggestions can be trialled before designing any persistent adaptation.

Longer-term progression should expand expressive capability: a child who understands two supports can attempt a wider span; someone who can pack three gifts can try a tighter box with four. New tools can be offered alongside tutorials without requiring repetitive earning. Keep familiar simple tools available. Saved creations, if pursued, need their own design for both storage drivers and a deliberate persistence review; this document does not specify a schema.

Bix should notice concrete actions: “You moved the support under the join” is more useful than “You're a genius!” Use short authored reactions tied to visible state. None of these proposals needs an open-ended AI companion or a generated conversation system. The child controls the experiment, the character or the performance; Bix helps them see what happened.

## How to find out whether children would choose it

Test rough interactive prototypes before expensive art. With appropriate grown-up consent and child assent, invite a small, varied group of seven-year-olds, including less fluent readers and children with different access needs. A first round of roughly 6–8 children is useful for finding problems, not estimating population-wide preferences. Use disposable profiles and avoid new production analytics for this exploration.

1. **First encounter:** give one short invitation and observe whether the child can make something meaningful happen without an adult directing each step. If they cannot, distinguish a confusing interface from an uninteresting concept.
2. **Genuine choice:** offer the prototype alongside two familiar activities and an easy option to stop or do something off-screen. Avoid asking “Was it fun?” as the main measure. Observe what they choose, while recognising novelty and setting effects.
3. **Learning in action:** look for a prediction, a purposeful revision or an explanation. Then offer a different layout or example using the same concept. Random trial until success is weaker evidence than a reasoned change; an unsolicited verbal explanation is not required.
4. **Return visit:** repeat on separate occasions, including a third or fourth encounter if feasible. Ask which creation or question they want to return to. Do not prompt a return through prizes or a character asking to be cared for.
5. **Stopping:** check that reaching a satisfying end is easy and that leaving causes no perceived loss. Longer sessions are not inherently better.

For each candidate, record voluntary choice, help needed, purposeful actions, concept transfer and the reason for stopping. Keep individual observations rather than presenting a tiny sample as precise percentages. A candidate merits further work when children can use it independently, choose it again after novelty and demonstrate something beyond accidental success. If those signals split, revise the mechanics or learning claim before adding more content.

The strongest invitation is concrete: **“Can you make this work?”**, **“What happens if you change that?”**, or **“What will you make?”** The learning should help the child answer a question they now care about.
