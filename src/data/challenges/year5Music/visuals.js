// Figures for the Year 5 Music bank. A figure never prints the answer to the
// question it sits on: it draws what the question describes, not what it asks for.
const c = "crotchet";
const bar = (time, ...bars) => ({ type: "rhythm", time, bars });
const stave = (...notes) => ({ type: "stave", notes });
const keys = (extra) => ({ type: "keyboard", ...extra });
const place = (name) => ({ type: "traditions", places: [name], legend: false });
const blocks = (...b) => ({ type: "structure", blocks: b });
const period = { type: "timeline" };

export const YEAR5_MUSIC_TOPIC_VISUALS = {
  "note-values-and-rests": { type: "noteTree" },
  "time-signatures": { type: "rhythm", counts: true, rows: [{ time: "2/4", bars: [[c, c]] }, { time: "3/4", bars: [[c, c, c]] }, { time: "4/4", bars: [[c, c, c, c]] }] },
  "counting-beats-in-a-bar": { type: "rhythm", time: "4/4", bars: [["minim", c, c]], counts: true, caption: "In 4/4 a full bar holds four crotchet beats." },
  "tempo-and-rhythm-words": { type: "tempo" },
  "the-stave-and-treble-clef": { type: "stave", names: true, notes: ["E4", "F4", "G4", "A4", "B4", "C5", "D5", "E5", "F5"], caption: "Lines: E G B D F. Spaces: F A C E." },
  "reading-notes-in-an-octave": keys({ names: true, solfege: true, octave: true, caption: "The musical alphabet from C up to the next C is one octave." }),
  "scales-and-tonality": keys({ names: true, marked: [0, 1, 2, 3, 4, 5, 6, 7], caption: "The C major scale uses all the white notes from C to C." }),
  "chords-and-triads": { type: "stave", chord: true, names: true, notes: ["C4", "E4", "G4"], caption: "The C major triad: C, E and G stacked together." },
  "dynamics-and-articulation": { type: "dynamics" },
  "musical-structure-and-texture": { type: "structure", rows: [{ title: "Ternary form", blocks: ["A", "B", "A"] }, { title: "Rondo", blocks: ["A", "B", "A", "C", "A"] }, { title: "Verse and chorus", blocks: ["Verse", "Chorus", "Verse", "Chorus"] }] },
  "instruments-of-the-orchestra": { type: "orchestra" },
  "composers-and-periods": { type: "timeline", marks: true },
  "musical-traditions-of-the-world": { type: "traditions" },
  "popular-music-styles": { type: "styles" },
};

export const YEAR5_MUSIC_QUESTION_VISUALS = {
  "note-values-and-rests": [
    ["What is a crotchet rest?", bar("4/4", ["crotchetRest"])],
    ["What do we call notes that are joined together in twos by a beam?", bar("4/4", ["quavers"])],
    ["A piece has a semibreve and a minim. How many crotchet beats is that?", bar("4/4", ["semibreve"], ["minim"])],
    ["How many crotchet beats are in a minim and a crotchet?", bar("4/4", ["minim", c])],
  ],
  "time-signatures": [
    ["Asha sees a vertical line between two groups of notes. What is it?", bar("4/4", [c, c, c, c], ["minim", "minim"])],
    ["Ravi sees 4/4 at the start of a song. How many crotchet beats are in each bar?", bar("4/4", [])],
    ["Which rhythm fits one bar of 3/4?", bar("3/4", [])],
    ["A piece is in 3/4 and has 4 bars. How many crotchet beats are there altogether?", bar("3/4", [], [], [], [])],
    ["A piece is in 4/4 and has 5 bars. How many crotchet beats are there altogether?", bar("4/4", [], [], [], [], [])],
    ["A piece is in 2/4 and has 8 bars. How many crotchet beats are there altogether?", bar("2/4", [], [], [], [], [], [], [], [])],
  ],
  "counting-beats-in-a-bar": [
    ["A bar in 4/4 has a minim and a crotchet. Is it full?", bar("4/4", ["minim", c])],
    ["A bar in 3/4 has a minim and a crotchet. Is it full?", bar("3/4", ["minim", c])],
    ["A bar in 2/4 has a minim. Is it full?", bar("2/4", ["minim"])],
    ["A bar of 4/4 has a semibreve. How many more beats does it need?", bar("4/4", ["semibreve"])],
    ["What do you add to a bar of 4/4 that has three crotchets?", bar("4/4", [c, c, c])],
  ],
  "tempo-and-rhythm-words": [
    ["Ravi's song speeds up at the end. Which word describes it?", { type: "tempo", kind: "dots", dir: "faster" }],
    ["Asha's tune slows down at the end. Which word describes it?", { type: "tempo", kind: "dots", dir: "slower" }],
    ["Zara's metronome says 60. What does that mean?", { type: "tempo", kind: "metronome", value: 60 }],
    ["What is a metronome used for?", { type: "tempo", kind: "metronome" }],
    ["A metronome clicks 60 times a minute. How many clicks are there in 3 minutes?", { type: "tempo", kind: "metronome", value: 60 }],
  ],
  "the-stave-and-treble-clef": [
    ["Mia sees a note on the bottom line of a treble stave. Which note is it?", stave("E4")],
    ["Jo sees a note in the third space. Which note is it?", stave("C5")],
    ["Ravi sees a note on the middle line. Which note is it?", stave("B4")],
    ["Asha sees a note below the stave on a short extra line. Which note is it?", stave("C4")],
    ["Ben sees a note on the second line. Which note is it?", stave("G4")],
    ["Zara sees a note in the top space. Which note is it?", stave("E5")],
    ["Leo sees a note on the fourth line. Which note is it?", stave("D5")],
    ["Sam sees a note on the top line. Which note is it?", stave("F5")],
  ],
  "reading-notes-in-an-octave": [
    ["On a keyboard, where is the note C found?", keys({})],
    ["Mia sings do, re, mi. Which letters are these?", keys({ solfege: true, marked: [0, 1, 2] })],
    ["Jo sings so, la, ti. Which letters are these?", keys({ solfege: true, marked: [4, 5, 6] })],
    ["Leo plays from do up to so. Which letters does he play?", keys({ solfege: true, marked: [0, 1, 2, 3, 4] })],
  ],
  "scales-and-tonality": [
    ["Mia plays only the white notes from C to C. What scale is this?", keys({ marked: [0, 1, 2, 3, 4, 5, 6, 7] })],
    ["Jo plays only the white notes from A to A. What scale is this?", keys({ from: "A", marked: [0, 1, 2, 3, 4, 5, 6, 7] })],
    ["Ravi plays C D E G A. How many notes are in this scale?", keys({ names: true, marked: [0, 1, 2, 4, 5] })],
    ["Leo plays a tune with no sharps or flats starting and finishing on C. Which key is it in?", keys({ marked: [0, 1, 2, 3, 4, 5, 6, 7] })],
  ],
  "chords-and-triads": [
    ["Mia plays C, E and G together. Which chord is this?", { type: "stave", chord: true, notes: ["C4", "E4", "G4"] }],
    ["Jo plays A, C and E together. Which chord is this?", { type: "stave", chord: true, notes: ["A4", "C5", "E5"] }],
    ["Ravi plays G, B and D together. Which chord is this?", { type: "stave", chord: true, notes: ["G4", "B4", "D5"] }],
    ["Asha plays C then E then G one at a time. What has she played?", stave("C4", "E4", "G4")],
    ["Zara builds a chord from F. Which notes should she use?", stave("F4")],
  ],
  "dynamics-and-articulation": [
    ["Ravi sees a hairpin getting wider. What does it mean?", { type: "hairpin", dir: "open" }],
    ["Asha sees dots over the notes. How should she play them?", { type: "articulation", style: "staccato" }],
    ["Ben plays notes connected like a flowing river. What is this called?", { type: "articulation", style: "legato" }],
    ["Zara plucks the violin strings with her fingers. What is this called?", { type: "strings", action: "pluck" }],
  ],
  "musical-structure-and-texture": [
    ["Which form is this pattern: ABA?", blocks("A", "B", "A")],
    ["Which form is this pattern: A B A C A?", blocks("A", "B", "A", "C", "A")],
    ["Which form is this pattern: Verse then chorus then verse then chorus?", blocks("Verse", "Chorus", "Verse", "Chorus")],
    ["Which form is this pattern: A then B?", blocks("A", "B")],
    ["Ravi repeats a short pattern on a xylophone while a tune plays above. What is the pattern?", { type: "texture", layers: [{ label: "Tune", kind: "tune" }, { label: "Short pattern", kind: "repeat" }] }],
    ["Asha holds one low note while a tune plays above. What is it?", { type: "texture", layers: [{ label: "Tune", kind: "tune" }, { label: "One low note", kind: "flat" }] }],
    ["Sam sings a tune while a friend plays chords. What is this texture?", { type: "texture", layers: [{ label: "Sung tune", kind: "tune" }, { label: "Chords", kind: "tune2" }] }],
  ],
  "instruments-of-the-orchestra": [
    ["Mia hears a bow drawn over strings. Which family is playing?", { type: "strings", action: "bow" }],
    ["Ben is told to pluck the strings. Which word means this?", { type: "strings", action: "pluck" }],
    ["Zara hears a very fast shaking of the bow, giving a dark sound. What is it?", { type: "strings", action: "tremolo" }],
    ["A section has 8 violins and 6 cellos. How many players is that?", { type: "pictogram", unit: "player", rows: [{ label: "violins", count: 8 }, { label: "cellos", count: 6 }] }],
    ["An orchestra has 4 trumpets, 3 trombones, 4 horns and 1 tuba. How many brass players are there?", { type: "pictogram", unit: "player", rows: [{ label: "trumpets", count: 4 }, { label: "trombones", count: 3 }, { label: "horns", count: 4 }, { label: "tuba", count: 1 }] }],
  ],
  "composers-and-periods": [
    ["Which period was Hildegard of Bingen from?", period],
    ["Which period was George Frideric Handel from?", period],
    ["Which period was Wolfgang Amadeus Mozart from?", period],
    ["Which period was Modest Mussorgsky from?", period],
    ["Which period was Gustav Holst from?", period],
    ["Which period was Anna Clyne from?", period],
  ],
  "musical-traditions-of-the-world": [
    ["Which musical tradition is linked with Nigeria?", place("nigeria")],
    ["Which musical tradition is linked with South Africa?", place("southAfrica")],
    ["Which musical tradition is linked with Brazil?", place("brazil")],
    ["Which musical tradition is linked with Indonesia?", place("indonesia")],
    ["Which musical tradition is linked with India?", place("india")],
    ["Which musical tradition is linked with Punjab?", place("punjab")],
    ["Which musical tradition is linked with Trinidad?", place("trinidad")],
  ],
  "popular-music-styles": [
    ["Mia hears a trumpet solo made up on the spot over a band. Which style is it?", { type: "icons", names: ["trumpet"] }],
    ["Ben hears early guitar-led songs from the 1950s. Which style is it?", { type: "icons", names: ["guitar"] }],
    ["Leo hears Wonderwall, a 1990s guitar song from Manchester. Which style is it?", { type: "icons", names: ["guitar"] }],
    ["A disco track plays for 4 minutes. A DJ plays 5 tracks. How many minutes is that?", { type: "blocks", count: 5, each: 4, unit: "min", item: "track" }],
  ],
};
