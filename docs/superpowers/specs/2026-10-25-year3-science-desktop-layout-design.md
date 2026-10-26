# Year 3 Science: desktop layout and question hierarchy

## Intent

Year 3 Science challenges (21 games, 4 challenges each) are rendered as one
flat list of elements inside the shared `.challenge-container` card, which is
capped at 760px. On a desktop the card leaves most of the screen empty, and
the order of its contents is poor: in "Parts of flowering plants", challenge 4,
seven elements (science words, hear button, figure, caption, credits, the
observation card, an answer slot) sit between the question and the answer
tiles. The figure is also far from the things that refer to it.

Fix both for every Year 3 Science challenge: use the width on desktop, and
give every question the same clear order, so a 6–8 year old reads the question,
looks at the picture, and answers without scrolling past clutter.

## Decided with the user

- **Layout "C": big stage, narrow side panel.** On desktop the figure takes
  about 60% on the left. A bordered answering panel takes about 40% on the
  right. Title and progress span the full width above both.
- **The right panel holds only what is needed to answer**, in this order:
  1. Prompt, with a small 🔊 icon button and a small "Science words" chip
     beside it (the chip opens a pop-over; it is no longer a row in the flow).
  2. Evidence (e.g. the observation card), only when the question needs it.
  3. Answer area (slot and tiles, choices, bins, table, label tray). Its
     instruction line ("Use one ending…") becomes the answer area's label.
  4. Hint, Check and feedback together at the bottom, so the hint and
     feedback are never off-screen from the button.
- **The left column holds what the child looks at**: the figure (large),
  then caption and credits (small), then any reference material the game has
  (e.g. the level 1 parts-and-jobs table).
- Observation card stays on the right, between prompt and answers.
- Phone and tablet portrait: everything stacks as title, prompt, figure,
  evidence, answers, Check.

## Goals

- Every Year 3 Science challenge uses the same slot order, so hierarchy is
  consistent across topics.
- Desktop uses the width; at most one element (evidence) between prompt and
  answers.
- No change to what is taught, to questions, to answer checking, or to how
  challenges report completion.

## Non-goals

- No changes to maths, English, geography, history, or other science years.
  Their cards stay at 760px. (Year 1, 2 and 4 science are not in scope;
  sharing the layout later should be possible but is not required.)
- No change to curriculum content, question text, generators, or tests of
  answer correctness.
- No changes to stored progress, the storage key, or unlock rules
  (see the `curriculum-progress` skill; nothing here should go near them).
- No redesign of the figures themselves, beyond letting them grow.

## Anti-goals (failure even if it "works")

- Any control smaller or harder to tap than today (large touch targets,
  audience is 6–8).
- Light or dark theme breakage; colour must keep coming from the `--light-*`
  / `--dark-*` tokens via the kit variables.
- Hint, feedback, or the Check button pushed off-screen or visually detached
  on desktop.
- A right half left empty on games with no figure.
- The read-aloud still reading the question in the right order.

## Constraints

- React and Vite app. Read the `add-curriculum-challenge` skill before
  touching a challenge, and `AGENTS.md` non-negotiables.
- `ChallengeShell` owns progress, feedback, the lock and `onComplete`. That
  contract must not change.
- Verification: `npm run lint`, `npm test`, `npm run build`. Browser checks
  are a last resort: one batched pass for layout only (real layout and
  overlap, desktop and phone widths, both themes). Tests in
  `tests/components/` drive challenges in jsdom and must keep passing.

## Proposed shape (builder may refine)

- A shared science round layout component with named slots: prompt (and its
  read-aloud text), science words, figure, caption/credit, reference,
  evidence, answer, hint, and the Check button state. Games stop assembling
  their own flat fragment and fill the slots.
- `ChallengeShell` gets a way to opt into a wider card (about 1120px) for
  science, and to place its feedback line inside the right panel next to
  Check on desktop, while staying where it is today for every other subject.
- Slot-less games (no figure) fall back to a single comfortably wide column.
- Games where the figure is the interaction (label dragging, explorers, test
  rigs) put the figure on the left and the tray, controls and readouts in
  the right panel.
- Figure sticks to the top of the viewport on desktop when the right panel
  is taller than the viewport.

## Calls made while writing this (not yet confirmed by the user)

- **One DOM order serves both layouts.** Source order is: prompt (with 🔊
  and Science words chip), figure, caption and credits, reference, evidence,
  answer, hint, Check, feedback. On desktop the figure column is placed left
  by the grid. On phones the order above is what the child sees. The 🔊
  button and the chip stay beside the prompt at every width. Hint and
  feedback stay adjacent to Check at every width.
- **Two columns from 1024px wide.** Below that (tablet portrait, phones, and
  narrow windows) the layout stacks. The 60/40 split must keep tiles and
  tables usable at 1024px; if the answer panel is too tight at that width,
  raise the threshold rather than shrink targets.
- **Check and Hint are rendered by each game today; feedback is rendered by
  `ChallengeShell`.** The shell's props and its `onComplete` contract do not
  change. Moving feedback next to Check is done by letting the layout
  component place it (for example via a context or portal that science
  rounds opt into). If that proves impossible without a contract change,
  stop and ask.
- **All 21 games migrate**, including interactive ones (label dragging,
  explorers, test rigs). A game may need a bespoke arrangement inside the
  shared layout, but none stays on the old flat layout. Drag targets and
  readouts must keep working in the left stage.
- **Sticky applies to the figure only**, not to caption, credits or
  reference. If the figure is taller than the viewport it does not stick.
- **Read-aloud order** is prompt, then evidence, then the answer's
  instruction. Each game's read-aloud text keeps its current content; the
  slot supplies it explicitly, not by reading the DOM.
- **Games with no figure** use a centred single column at the existing
  760px width, not the wide card, so there is no empty half. Games with a
  figure use the wide card (about 1120px).

## Left to the builder

- Exact breakpoints, widths, gaps and the 60/40 ratio.
- Component and file names, CSS organisation.
- How the Science words pop-over and the icon read-aloud button are built,
  provided they meet touch-target and keyboard/screen-reader standards.
- Migration order across the 21 games, and how to group similar games.
- How feedback is moved into the panel without changing the shell contract.

## Scope check

21 games, about 1,200 lines in total, plus the shared shell and kit CSS. It
is one project, not independent ones, because every game depends on the
shared layout. Order: layout component and shell change first, proven on
Parts of flowering plants, then the rest.
