// Year 5 Music purpose screens. Vocabulary and notation ideas; singing and playing happen away from the screen.
import { defineIntroductions } from "../../../../shared/curriculumJourneyAuthoring.js";
const table = (caption, headings, rows, alt) => ({ renderer: "table", data: { caption, headings, rows }, alt });
const pics = (title, items, alt) => ({ renderer: "pictures", data: { title, items }, alt });
const steps = (title, list, alt) => ({ renderer: "lesson", data: { type: "steps", title, steps: list }, alt });
const I = (title, learn, use, ex, model) => ({ title, learn, use, ex, model });

export default defineIntroductions({ year: 5, subject: "music",
  subjectIntro: I("Welcome to Year 5 Music", ["Read rhythm and notes on the stave.", "Explore loud and soft, form and the orchestra."],
    "Music has its own written language, so players can share a tune without hearing it first. Knowing the words helps you talk about music you love.",
    "A composer writes notes on a stave, and a band can play them from the page.",
    pics("Music", [{ icon: "🥁", label: "Rhythm" }, { icon: "🎼", label: "Notes" }, { icon: "🎻", label: "Instruments" }], "Three pictures with labels: a drum for rhythm, a stave for notes and a violin for instruments.")),
  quests: {
    "rhythm-and-metre": {
      intro: I("Rhythm and metre", ["Learn how long each note lasts.", "Count beats in a bar and use speed words."],
        "Rhythm is the pattern of long and short sounds. Counting it helps a group play together at the same speed.",
        "A crotchet lasts one beat and a minim lasts two.",
        table("Note lengths", ["Note", "Beats"], [["Semibreve", "4"], ["Minim", "2"], ["Crotchet", "1"]], "A table of note lengths: a semibreve is 4 beats, a minim is 2 beats and a crotchet is 1 beat.")),
      topics: {
        "note-values-and-rests": I("Note values and rests", ["Know how long notes and rests last.", "Spot paired quavers and semiquavers."],
          "Rests are silences that are as important as notes. Knowing both helps you read a rhythm.", "A crotchet rest is one beat of silence.",
          table("Notes and rests", ["Name", "Beats"], [["Crotchet", "1"], ["Crotchet rest", "1"], ["Quaver", "half"]], "A table of names and beats: a crotchet is 1, a crotchet rest is 1 and a quaver is half a beat.")),
        "time-signatures": I("Time signatures", ["Read the two numbers at the start of a piece.", "Know 2/4, 3/4 and 4/4."],
          "The top number tells how many beats are in each bar, so a march and a waltz feel different.", "A waltz has three beats in every bar.",
          table("Time signatures", ["Time signature", "Crotchet beats in a bar"], [["2/4", "2"], ["3/4", "3"], ["4/4", "4"]], "A table of time signatures and the number of crotchet beats in a bar: 2/4 has 2, 3/4 has 3 and 4/4 has 4.")),
        "counting-beats-in-a-bar": I("Counting beats in a bar", ["Add up note lengths to fill a bar.", "Read a short rhythm."],
          "Counting beats lets you read a new rhythm and clap it correctly.", "In 4/4, a minim and two crotchets fill a bar.",
          steps("Fill a bar", ["Check the time signature.", "Add the note lengths.", "Match the total to the bar.", "Clap it."], "Four steps to fill a bar: check the time signature, add the note lengths, match the total to the bar and clap it.")),
        "tempo-and-rhythm-words": I("Tempo and rhythm words", ["Learn Italian words for speed.", "Know accelerando and rallentando."],
          "Speed words tell players how fast to go, so a lullaby is slow and a chase is fast.", "Allegro means fast and adagio means slow.",
          table("Speed words", ["Word", "Meaning"], [["Allegro", "Fast and lively"], ["Adagio", "Slow"], ["Accelerando", "Getting faster"]], "A table of speed words: allegro means fast and lively, adagio means slow and accelerando means getting faster.")),
      },
    },
    "pitch-and-notation": {
      intro: I("Pitch and notation", ["Read notes on the stave.", "Learn scales, chords and tonality."],
        "Pitch is how high or low a note sounds. The stave shows pitch, so tunes can be written down and played by anyone.",
        "Notes higher on the stave sound higher.",
        pics("Reading music", [{ icon: "🎼", label: "Stave" }, { icon: "🎹", label: "Keyboard" }, { icon: "🎶", label: "Notes" }], "Three pictures with labels: a stave, a keyboard and notes.")),
      topics: {
        "the-stave-and-treble-clef": I("The stave and treble clef", ["Know the five lines and four spaces.", "Name the notes on the treble clef."],
          "Reading the stave lets you play a tune from a page.", "The notes on the lines are E, G, B, D, F.",
          table("Notes on the stave", ["Place", "Notes from the bottom"], [["Lines", "E G B D F"], ["Spaces", "F A C E"]], "A table of notes on the treble clef from the bottom: the lines are E, G, B, D, F and the spaces are F, A, C, E.")),
        "reading-notes-in-an-octave": I("Reading notes in an octave", ["Read the notes from C to C.", "Link them to do re mi."],
          "An octave is the distance between one note and the next with the same name. It is the basis of most tunes.", "The notes in an octave are C D E F G A B C.",
          table("An octave", ["Name", "Sol-fa"], [["C", "do"], ["D", "re"], ["E", "mi"], ["F", "fa"]], "A table matching note names to sol-fa names: C is do, D is re, E is mi and F is fa.")),
        "scales-and-tonality": I("Scales and tonality", ["Know major and minor sounds.", "Build a scale from C to C."],
          "Major scales sound bright and minor scales sound sadder. Composers pick one to set a mood.", "The C major scale uses only white keys.",
          table("Major and minor", ["Mood", "Tonality"], [["Bright", "Major"], ["Sad or serious", "Minor"]], "A table of moods and tonality: a bright mood is major and a sad or serious mood is minor.")),
        "chords-and-triads": I("Chords and triads", ["Know a chord is notes played together.", "Build a triad on a note."],
          "Chords make the backing for songs. Guitarists and pianists play them all the time.", "The C major triad is C, E and G.",
          pics("A triad", [{ icon: "🎹", label: "C" }, { icon: "🎹", label: "E" }, { icon: "🎹", label: "G" }], "Three pictures of keys labelled with the notes of a triad: C, E and G.")),
      },
    },
    "dynamics-and-structure": {
      intro: I("Dynamics and structure", ["Learn loud and soft words.", "Explore how a piece is organised."],
        "Dynamics and shape give music feeling. Composers choose when to be loud and when to repeat a tune.",
        "A piece can start softly and grow louder.",
        table("Loud and soft", ["Word", "Meaning"], [["Forte", "Loud"], ["Piano", "Soft"]], "A table of dynamics: forte means loud and piano means soft.")),
      topics: {
        "dynamics-and-articulation": I("Dynamics and articulation", ["Know pp, p, mp, mf, f and ff.", "Tell staccato from legato."],
          "Changing volume and how notes are played makes music more expressive.", "Staccato notes are short and detached.",
          table("Dynamics", ["Mark", "Meaning"], [["pp", "Very soft"], ["mf", "Fairly loud"], ["ff", "Very loud"]], "A table of dynamic marks: pp means very soft, mf means fairly loud and ff means very loud.")),
        "musical-structure-and-texture": I("Musical structure and texture", ["Know ternary form and verse and chorus.", "Describe rounds and layers of sound."],
          "Structure helps you notice repeats, and texture tells how many layers play at once.", "Ternary form is A, B, A.",
          steps("Ternary form", ["Part A", "Part B", "Part A again"], "Three parts of ternary form: part A, part B and part A again.")),
      },
    },
    "instruments-and-listening": {
      intro: I("Instruments and listening", ["Meet the families of the orchestra.", "Explore composers, world music and popular styles."],
        "Music from other times and places helps you appreciate how many ways people make sound.",
        "A violin belongs to the strings family.",
        pics("Families", [{ icon: "🎻", label: "Strings" }, { icon: "🎺", label: "Brass" }, { icon: "🥁", label: "Percussion" }], "Three pictures with labels: strings, brass and percussion.")),
      topics: {
        "instruments-of-the-orchestra": I("Instruments of the orchestra", ["Name the four families.", "Know how each instrument makes sound."],
          "Knowing instruments helps you listen to a piece and pick out each part.", "A flute is a woodwind instrument.",
          table("Orchestra families", ["Family", "Example"], [["Strings", "Violin"], ["Woodwind", "Flute"], ["Brass", "Trumpet"], ["Percussion", "Timpani"]], "A table of orchestra families with an example each: strings violin, woodwind flute, brass trumpet and percussion timpani.")),
        "composers-and-periods": I("Composers and periods", ["Meet composers from Hildegard to Anna Clyne.", "Know which period each belongs to."],
          "Knowing composers shows how music changed over hundreds of years.", "Mozart wrote music in the Classical period.",
          table("Composers", ["Composer", "Period"], [["Hildegard of Bingen", "Early (medieval)"], ["Handel", "Baroque"], ["Mozart", "Classical"]], "A table of composers and periods: Hildegard of Bingen Early (medieval), Handel Baroque and Mozart Classical.")),
        "musical-traditions-of-the-world": I("Musical traditions of the world", ["Match traditions to countries.", "Learn their instruments."],
          "Music reflects the people and place it comes from, and traditions often use special instruments.", "Gamelan is music from Indonesia.",
          table("World music", ["Tradition", "Place"], [["Gamelan", "Indonesia"], ["Samba", "Brazil"], ["Steel pan", "Trinidad"]], "A table matching traditions to places: gamelan with Indonesia, samba with Brazil and steel pan with Trinidad.")),
        "popular-music-styles": I("Popular music styles", ["Name styles from blues to 90s indie.", "Describe what makes each style special."],
          "Popular styles shape the songs you hear on the radio and at parties.", "The blues often uses guitar and a twelve-bar pattern.",
          pics("Styles", [{ icon: "🎸", label: "Blues" }, { icon: "🎤", label: "Pop" }, { icon: "🎧", label: "Indie" }], "Three pictures with labels: a guitar for blues, a microphone for pop and headphones for indie.")),
      },
    },
  } });
