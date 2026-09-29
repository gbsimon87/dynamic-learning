# Sounds

Every sound the app plays, where it came from, and how to change one.

The files live in [`public/sounds/`](../../public/sounds/) and are wired to
scenarios in [`src/components/celebration/sound/cues.js`](../../src/components/celebration/sound/cues.js).
Callers only ever name a scenario (`playCue("topic")`), so replacing a sound
never touches a component.

## Scenario → sound

All from [Mixkit](https://mixkit.co/free-sound-effects/), chosen by ear on
2026-09-29 using [`mixkit-audition.html`](mixkit-audition.html).

| # | Scenario | Cue | File | Mixkit # | Mixkit title |
|---|---|---|---|---|---|
| 1 | Correct answer, any question but the last | `correct` | `correct.mp3` | 2870 | Correct answer tone |
| 2 | Correct answer to the last question | `correctLast` | `correct-last.mp3` | 2020 | Small win |
| 3 | Challenge finished for the first time, no bigger milestone | `success` | `success.mp3` | 600 | Achievement bell |
| 4 | Practice replay of an already-finished challenge ends | `practice` | `practice.mp3` | 1938 | Melodic bonus collect |
| 5 | Whole topic finished (headline step) | `topic` | `topic.mp3` | 2063 | Completion of a level |
| 6 | Whole quest finished (headline step) | `quest` | `quest.mp3` | 2059 | Game level completed |
| 7 | Whole subject or year finished (headline step) | `subjectYear` | `subject-year.mp3` | 226 | Medieval show fanfare announcement |
| 8 | "New sticker!" step | `sticker` | `sticker.mp3` | 2633 | Sweeping sparkle presentation intro |
| 9 | Each "New badge!" step | `badge` | `badge.mp3` | 2317 | Uplifting flute notification |
| 10 | "New picture unlocked!" step | `unlock` | `unlock.mp3` | 2064 | Bonus extra in a video game |
| 11 | Year certificate step | `certificate` | `subject-year.mp3` | 226 | *(shares #7)* |
| 12 | Combo: 3, 6, 9… questions right first time in a row | `combo` | `combo.mp3` | 2014 | Wind chimes |
| 13 | A wrong answer | `wrong` | `wrong.mp3` | 946 | Wrong answer fail notification |
| 14 | The celebration's progress ring filling | `progress` | `progress.mp3` | 3062 | Magic wand sparkle |

Silent by design: the Continue and Skip buttons, the "Ready for more?" step,
the Trophy Room, and all of Skills Mode.

When a moment earns several milestones at once, only the biggest plays — the
last challenge of a quest plays `quest`, not `topic` and `success` too.

## Loudness

The originals ranged from -9 to -18 LUFS, which is what makes a mixed set of
free sounds feel cheap. Each file is gain-matched to its tier:

| Tier | Target | Cues |
|---|---|---|
| Frequent | -20 LUFS | `correct`, `correctLast`, `combo`, `progress`, `practice`, `unlock` |
| Rewards | -18 LUFS | `success`, `sticker`, `badge` |
| Fanfares | -16 LUFS | `topic`, `quest`, `subjectYear` / `certificate` |
| Wrong answer | -24 LUFS | `wrong` — the quietest in the app, so a mistake never stings |

Plus silence trimmed, a 5 ms fade-in, a 150 ms fade-out, and peaks limited
below -1 dBFS. 128 kbps MP3 — every browser decodes it, older iPhones included.
The whole set is about 600 KB and is preloaded on the first tap.

## Changing a sound

1. Find a replacement: open [`mixkit-audition.html`](mixkit-audition.html) in
   Chrome (online — it streams Mixkit's previews), or browse
   [`mixkit-catalogue.json`](mixkit-catalogue.json), the 147 sounds from
   Mixkit's game, achievement, bonus, win, notification and magic categories.
2. Change that row's Mixkit id in `PLAN` in
   [`process-sounds.py`](process-sounds.py).
3. Download the originals and rebuild — the steps are at the top of that
   script. It needs ffmpeg (`brew install ffmpeg`). Re-running it with
   unchanged ids reproduces the current files byte for byte.
4. `npm test` checks every cue's file exists; then play the moment in the app.

Recorded files always have a synthesised fallback in `cues.js`, so a missing
or failed file degrades to a tone, never to silence — which is also why a
missing file would go unnoticed without the test.

## Licence

Mixkit's sound effects are free under the **Mixkit Sound Effects Free
License**. ⚠️ Its full text only loads in a pop-up on
[mixkit.co/license](https://mixkit.co/license/), so it was **not** read when
these were added. Before a public release, open "Sound Effects Free License"
there and confirm it covers use inside an app, then note the date here.
