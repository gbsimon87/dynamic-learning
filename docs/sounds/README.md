# Sounds

Every sound the app plays, where it came from, and how to change one.

The files live in [`public/sounds/`](../../public/sounds/) and are wired to
scenarios in [`src/components/celebration/sound/cues.js`](../../src/components/celebration/sound/cues.js).
Callers only ever name a scenario (`playCue("topic")`), so replacing a sound
never touches a component.
The navbar 🔊 button mutes every cue on the device and fades out anything
already playing, so a long file (the year fanfare) is cut off at once.

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
| 15 | Level-up step (with Bix) | `levelUp` | `level-up.mp3` | 2984 | Funny melody audio logo |
| 16 | Streak step (the day's first finished challenge) | `streak` | `badge.mp3` | 2317 | Uplifting flute notification *(shares #9, by choice)* |

#2317 now plays for both badges and streaks, so a day with both hears it twice.
Swapping `streak`'s `src` in `cues.js` to its own file is a one-line change.

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
| Rewards | -18 LUFS | `success`, `sticker`, `badge` (also `streak`), `levelUp` |
| Fanfares | -16 LUFS | `topic`, `quest`, `subjectYear` / `certificate` |
| Wrong answer | -24 LUFS | `wrong` — the quietest in the app, so a mistake never stings |

Plus silence trimmed, a 5 ms fade-in, a 150 ms fade-out, and peaks limited
below -1 dBFS. 128 kbps MP3 — every browser decodes it, older iPhones included.
The whole set is about 600 KB. It downloads only when a curriculum challenge
page opens, and is decoded on the first tap there.

## Changing a sound

1. Find a replacement: open [`mixkit-audition.html`](mixkit-audition.html) in
   Chrome (online — it streams Mixkit's previews), or browse
   [`mixkit-catalogue.json`](mixkit-catalogue.json), the 147 sounds from
   Mixkit's game, achievement, bonus, win, notification and magic categories.
2. Change that row's Mixkit id in `PLAN` in
   [`process-sounds.py`](process-sounds.py).
3. Download the originals and rebuild — the steps are at the top of that
   script, whose download id list includes 2984 (`level-up`). It needs ffmpeg (`brew install ffmpeg`). Re-running it with
   unchanged ids reproduces the current files byte for byte.
4. `npm test` checks every cue's file exists; then play the moment in the app.

Recorded files always have a synthesised fallback in `cues.js`, so a missing
or failed file degrades to a tone, never to silence — which is also why a
missing file would go unnoticed without the test.

## Licence

**Mixkit Sound Effects Free License**, read 2026-09-29 (text supplied from the
pop-up on [mixkit.co/license](https://mixkit.co/license/)):

> Items under the Mixkit Sound Effects Free License can be used in your
> commercial and non-commercial projects for free.
>
> You are licensed to use the Item to create an End Product that incorporates
> the Item as well as other things, so that it is larger in scope and different
> in nature than the Item. You're permitted to download, copy, modify,
> distribute and publicly perform the Sound Effect Items on any web or social
> media platform, in podcasts and in video games, as well as in films and
> presentations distributed on CDs, DVDs, via TV or radio broadcast or internet
> based video on demand services.
>
> You can't redistribute the Item on its own, as stock, in a tool or template,
> or with source files. You're also not allowed to claim them as your own or
> register them on any rights management service.

What that means here:

- ✅ **Playing them in the app is covered.** The app is an End Product "larger
  in scope and different in nature" than the sounds, on a web platform, and it
  may be commercial. Modifying them (the trimming and loudness matching) is
  allowed. No attribution is required.
- ✅ **Keeping them in this public repository — decided 2026-09-29.** Committing
  the files to a public GitHub repo lets anyone download them on their own,
  which reads close to "redistribute the Item on its own … or with source
  files". The project owner took legal advice, was told it is acceptable, and
  chose to keep `public/sounds/` in the public repo. Revisit this if the
  licence text or the repository's purpose changes.
- ❌ Never publish them as a sound pack, in a template or starter kit, or
  register them with a content-ID / rights-management service.
- The saved audition page and catalogue only link to Mixkit's own previews;
  they contain no audio, so they are not a redistribution.
