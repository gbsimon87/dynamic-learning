/**
 * The app's sound cues, one per SCENARIO, by name.
 *
 * Callers only ever say `playCue("topic")`; what a cue sounds like lives here.
 * Each cue plays a recorded file from public/sounds/ (`src`) and falls back to
 * a synthesised tone (`synth`) if the file cannot load, so a missing file or a
 * failed request never leaves a moment silent.
 *
 * The recordings are Mixkit sound effects, chosen by ear, then trimmed, faded
 * and loudness-matched in three tiers (answers -20 LUFS, rewards -18, fanfares
 * -16; the wrong-answer boop -24 so it never stings). Which Mixkit id each file
 * came from, and how to re-process or replace one: docs/sounds/README.md.
 *
 * `synth(tone, t)` schedules notes from time `t`; `tone(freq, start, length,
 * options)` is supplied by the player.
 */

// Note frequencies, Hz.
const N = {
  G4: 392, C5: 523.25, E5: 659.25, G5: 783.99, A5: 880, B5: 987.77,
  C6: 1046.5, D6: 1174.66, E6: 1318.51, G6: 1567.98, C7: 2093,
};

function arpeggio(tone, t, notes, gap, length, options) {
  notes.forEach((note, index) => tone(note, t + index * gap, length, options));
}

const SYNTH = {
  /** A correct answer: two quick bright notes. */
  chime: {
    synth: (tone, t) => arpeggio(tone, t, [N.E6, N.G6], 0.07, 0.35, { gain: 0.22 }),
  },

  /** A challenge finished. */
  success: {
    synth: (tone, t) => arpeggio(tone, t, [N.C5, N.E5, N.G5, N.C6], 0.09, 0.5, { gain: 0.24 }),
  },

  /** A badge or sticker flips into view: a rising shimmer and a bell. */
  reveal: {
    synth: (tone, t) => {
      arpeggio(tone, t, [N.G5, N.B5, N.D6, N.G6], 0.05, 0.25, { gain: 0.14 });
      tone(N.C7, t + 0.24, 1.1, { gain: 0.12 });
      tone(N.G6, t + 0.24, 1.1, { gain: 0.1 });
    },
  },

  /** A topic finished. */
  fanfareSmall: {
    synth: (tone, t) => {
      arpeggio(tone, t, [N.C5, N.E5, N.G5], 0.11, 0.3, { gain: 0.22, type: "square", soft: true });
      [N.C6, N.E6, N.G6].forEach((note) => tone(note, t + 0.36, 0.9, { gain: 0.12 }));
    },
  },

  /** A quest (category) finished. */
  fanfare: {
    synth: (tone, t) => {
      const brass = { gain: 0.2, type: "sawtooth", soft: true };
      tone(N.G4, t, 0.18, brass);
      tone(N.C5, t + 0.2, 0.18, brass);
      tone(N.E5, t + 0.4, 0.18, brass);
      tone(N.G5, t + 0.6, 0.5, brass);
      tone(N.E5, t + 1.0, 0.16, brass);
      [N.C6, N.E6, N.G6].forEach((note) => tone(note, t + 1.2, 1.2, { gain: 0.1 }));
      tone(N.G5, t + 1.2, 1.2, brass);
    },
  },

  /** A whole subject or year: the biggest moment the app has. */
  fanfareBig: {
    synth: (tone, t) => {
      const brass = { gain: 0.2, type: "sawtooth", soft: true };
      [N.C5, N.E5, N.G5].forEach((note) => tone(note, t, 0.25, brass));
      [N.C5, N.E5, N.G5].forEach((note) => tone(note, t + 0.3, 0.25, brass));
      [N.E5, N.A5, N.C6].forEach((note) => tone(note, t + 0.6, 0.4, brass));
      [N.G5, N.C6, N.E6].forEach((note) => tone(note, t + 1.05, 1.6, brass));
      arpeggio(tone, t + 1.05, [N.C6, N.E6, N.G6, N.C7], 0.08, 1.2, { gain: 0.08 });
    },
  },
};

/** A single soft low note, for the wrong-answer fallback. */
SYNTH.boop = {
  synth: (tone, t) => tone(330, t, 0.25, { gain: 0.12, type: "sine" }),
};

const file = (name) => `/sounds/${name}.mp3`;

export const CUES = {
  /** A correct answer, any question but the last. Heard 4–6× a challenge. */
  correct: { src: file("correct"), synth: SYNTH.chime.synth },
  /** A correct answer to the LAST question; `success` follows ~1s later. */
  correctLast: { src: file("correct-last"), synth: SYNTH.chime.synth },
  /** Three (then six, nine…) questions right first time in a row. */
  combo: { src: file("combo"), synth: SYNTH.reveal.synth },
  /** A wrong answer. Deliberately the quietest file. */
  wrong: { src: file("wrong"), synth: SYNTH.boop.synth },
  /** The celebration's progress ring filling. */
  progress: { src: file("progress"), synth: SYNTH.chime.synth },
  /** A practice replay of an already-finished challenge ends. */
  practice: { src: file("practice"), synth: SYNTH.chime.synth },
  /** A challenge finished for the first time, no bigger milestone. */
  success: { src: file("success"), synth: SYNTH.success.synth },
  /** "New sticker!" — a topic's sticker drops in. */
  sticker: { src: file("sticker"), synth: SYNTH.reveal.synth },
  /** "New badge!" — each badge flips over. */
  badge: { src: file("badge"), synth: SYNTH.reveal.synth },
  /** "New picture unlocked!" */
  unlock: { src: file("unlock"), synth: SYNTH.chime.synth },
  /** A whole topic finished. */
  topic: { src: file("topic"), synth: SYNTH.fanfareSmall.synth },
  /** A whole quest (category) finished. */
  quest: { src: file("quest"), synth: SYNTH.fanfare.synth },
  /** A whole subject or year finished — the biggest moment. */
  subjectYear: { src: file("subject-year"), synth: SYNTH.fanfareBig.synth },
  /** The year certificate step. Shares the finale fanfare, by choice. */
  certificate: { src: file("subject-year"), synth: SYNTH.fanfare.synth },
};
